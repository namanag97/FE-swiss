# Process Mining — Technical Architecture & Data Engineering

## 1. Building an Event Log from SAP (P2P Example)

### SAP Table Map for P2P

| Type | Table | Purpose |
|------|-------|---------|
| Header | EBAN | Purchase Requisition |
| Header | EKKO | Purchase Order |
| Items | EKPO | PO line items |
| History | EKBE | Goods/Invoice receipt history |
| Transaction | MKPF | Material document headers (GR) |
| Items | MSEG | Material document items (GR lines) |
| Transaction | RBKP | Invoice document headers |
| Items | RSEG | Invoice document line items |
| Transaction | BKPF | Accounting document headers (Payments) |
| Items | BSEG | Accounting document line items |
| Change | CDHDR | Change document headers |
| Change | CDPOS | Change document items (old/new values) |

### Concrete SQL

```sql
-- PO Created
SELECT EKKO.EBELN AS case_id, 'PO Created' AS activity,
       EKKO.AEDAT AS timestamp, EKKO.ERNAM AS resource
FROM EKKO WHERE EKKO.BSART = 'NB' AND EKKO.BUKRS = '1000'

UNION ALL

-- PO Approved (from change documents)
SELECT CDPOS.OBJECTID AS case_id, 'PO Approved' AS activity,
       CDHDR.UDATE AS timestamp, CDHDR.USERNAME AS resource
FROM CDHDR JOIN CDPOS ON CDHDR.CHANGENR = CDPOS.CHANGENR
WHERE CDHDR.OBJECTCLAS = 'EINKBELEG' AND CDPOS.FNAME = 'FRGZU'

UNION ALL

-- Goods Receipt
SELECT MSEG.EBELN AS case_id, 'Goods Receipt' AS activity,
       MKPF.BUDAT AS timestamp, MKPF.USNAM AS resource
FROM MSEG JOIN MKPF ON MSEG.MBLNR = MKPF.MBLNR AND MSEG.MJAHR = MKPF.MJAHR
WHERE MSEG.BWART = '101'

UNION ALL

-- Invoice Received
SELECT RSEG.EBELN AS case_id, 'Invoice Received' AS activity,
       RBKP.BUDAT AS timestamp, RBKP.USNAM AS resource
FROM RSEG JOIN RBKP ON RSEG.BELNR = RBKP.BELNR AND RSEG.GJAHR = RBKP.GJAHR

UNION ALL

-- Payment
SELECT BSEG.EBELN AS case_id, 'Payment' AS activity,
       BKPF.BUDAT AS timestamp, BKPF.USNAM AS resource
FROM BSEG JOIN BKPF ON BSEG.BUKRS = BKPF.BUKRS
  AND BSEG.BELNR = BKPF.BELNR AND BSEG.GJAHR = BKPF.GJAHR
WHERE BKPF.BLART = 'KZ'

ORDER BY case_id, timestamp;
```

### Case ID Choice — Critical Decision

| Grain | Field | Pros | Cons |
|-------|-------|------|------|
| PO Header | EBELN | Simple, natural | Loses line-item detail |
| PO Item | EBELN+EBELP | Precise | One invoice may cover multiple items (convergence) |
| Object-Centric (OCEL) | Multiple | Avoids choosing; events reference all objects | Requires OCPM-capable tool |

### CDHDR/CDPOS Change Documents

SAP's change document tables are a goldmine. CDHDR stores: CHANGENR, OBJECTCLAS (e.g., EINKBELEG for purchasing), OBJECTID (document number), UDATE/UTIME, USERNAME, TCODE. CDPOS stores: TABNAME, FNAME (field), VALUE_OLD, VALUE_NEW.

**Caveat**: One user action can trigger 5-10 change records. Group by CHANGENR to avoid inflating event counts.

### Activity Concept by Table Type
- **Record tables** (EBAN, EKKO): "Create [document]"
- **Transaction tables** (BKPF): Lookup TSTCT table for human-readable name (TCODE 'MIRO' → "Enter Incoming Invoice")
- **Change tables** (CDHDR/CDPOS): Derive from field changes (LFDAT old vs new → "Postpone Delivery")

---

## 2. Data Transformation Patterns

### Activity Mapping
```sql
CASE
  WHEN raw_activity = 'ME21N' THEN 'Create Purchase Order'
  WHEN raw_activity = 'MIGO' THEN 'Post Goods Receipt'
  WHEN raw_activity = 'MIRO' THEN 'Enter Invoice'
  WHEN raw_activity = 'F110' THEN 'Execute Payment Run'
END AS mapped_activity
```

### Timestamp Handling
- SAP stores dates (AEDAT) and times (AEZET) separately → concatenate and cast
- SAP format: YYYYMMDD ('20260115') — requires conversion
- Zero timestamps: '00000000' or '99991231' → filter or NULL
- Normalize all to UTC before merging multi-system logs

### Multi-System Merging
Three problems to solve:
1. **Common Case ID**: Find shared business identifier across systems (SAP PO# in Salesforce custom field, ServiceNow ticket ID in SAP text field)
2. **Timestamp Alignment**: Convert all to UTC (`CONVERT_TIMEZONE('Europe/Berlin', 'UTC', sap_timestamp)`)
3. **Activity Granularity**: SAP may record 50 events per PO, Salesforce 5 stage changes → aggregate or keep `source_system` column for filtering

When no shared ID exists: **Correlation Miner** (pm4py) discovers relationships using control flow, timestamps, and attributes.

---

## 3. Production Pipeline Architecture

```
[Source Systems]
    │
    ▼
[Ingestion] ── Fivetran/Airbyte/Celonis OPC/CDC
    │
    ▼
[Transformation] ── dbt / CeloSQL / Spark SQL
    │  staging: raw 1:1 copy
    │  intermediate: joins, activity mapping, TS normalization
    │  marts: event_log (case_id, activity, timestamp + attributes)
    │
    ▼
[Storage] ── Snowflake / Databricks / BigQuery / Redshift
    │
    ▼
[PM Analysis] ── Celonis / SAP Signavio / pm4py / Power Automate
    │
    ▼
[Actions] ── Dashboards, RPA triggers, webhooks, alerts
```

### dbt Incremental Event Log Model
```sql
{{ config(materialized='incremental', unique_key='event_id') }}

SELECT
    {{ dbt_utils.generate_surrogate_key(['case_id','activity','timestamp']) }} AS event_id,
    case_id, activity, timestamp, resource, source_system, _loaded_at
FROM {{ ref('int_merged_events') }}
{% if is_incremental() %}
WHERE _loaded_at > (SELECT MAX(_loaded_at) FROM {{ this }})
{% endif %}
```

### Batch vs Streaming

| | Batch | Streaming |
|---|-------|-----------|
| Extraction | Scheduled delta (every 6 hrs) | Celonis Kafka Connector / CDC |
| Latency | Minutes to hours | Seconds |
| Best for | Historical analysis, compliance | Real-time monitoring, SLA alerts |
| Tools | dbt, Fivetran, scheduled SQL | Kafka, Debezium, Spark Streaming |

---

## 4. Scaling to Billions of Events

### Distributed Discovery (Spark)
Research demonstrates Alpha Miner scaled to 64 GB logs (~1.17B events) using Apache Spark. Near-linear runtime reduction from 2→16 workers.

### PM4Py-GPU (NVIDIA RAPIDS)
Replaces pandas with cuDF for >10x speedup on CSV/Parquet ingestion, DFG computation, variant computation, filtering. Requires CUDA-capable GPU.

### Performance Optimization Techniques

**Pre-aggregate DFG in warehouse:**
```sql
WITH ordered AS (
    SELECT case_id, activity,
           LEAD(activity) OVER (PARTITION BY case_id ORDER BY timestamp) AS next_activity,
           LEAD(timestamp) OVER (PARTITION BY case_id ORDER BY timestamp) AS next_ts
    FROM event_log
)
SELECT activity AS source, next_activity AS target,
       COUNT(*) AS frequency,
       AVG(DATEDIFF('second', timestamp, next_ts)) AS avg_duration_sec
FROM ordered WHERE next_activity IS NOT NULL
GROUP BY 1, 2 ORDER BY frequency DESC;
```

**Other techniques**: Partition by date/company code, columnar storage (Parquet/ORC), materialized variant frequency tables.

### Data Sampling (Preserving Complete Traces)
```sql
-- Random 10% of CASES (not events)
SELECT * FROM event_log
WHERE case_id IN (
    SELECT case_id FROM (SELECT DISTINCT case_id FROM event_log) SAMPLE (10)
);
```

Never sample individual events randomly — this destroys process flow.

---

## 5. pm4py in Practice

### Core Capabilities (Code)

```python
import pm4py
import pandas as pd

# Load
df = pd.read_csv('events.csv')
df = pm4py.format_dataframe(df, case_id='order_number',
                            activity_key='step_name', timestamp_key='event_time')

# Discover (all algorithms)
dfg, start, end = pm4py.discover_dfg(df)                    # DFG
tree = pm4py.discover_process_tree_inductive(df)             # Process Tree
net, im, fm = pm4py.discover_petri_net_inductive(df, noise_threshold=0.2)  # Petri Net
bpmn = pm4py.discover_bpmn_inductive(df)                     # BPMN
heur_net = pm4py.discover_heuristics_net(df)                 # Heuristics Net

# Conformance
fitness = pm4py.fitness_alignments(df, net, im, fm)          # Alignment-based
precision = pm4py.precision_alignments(df, net, im, fm)      # Precision

# Filter
filtered = pm4py.filter_variants_top_k(df, 5)               # Top 5 variants
filtered = pm4py.filter_time_range(df, '2026-01-01', '2026-03-01')
```

### Integration with scikit-learn

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Extract per-case features
features = df.groupby('case:concept:name').agg(
    num_events=('concept:name', 'count'),
    num_unique=('concept:name', 'nunique'),
    duration=('time:timestamp', lambda x: (x.max()-x.min()).total_seconds())
).reset_index()

# Cluster
X = StandardScaler().fit_transform(features[['num_events','num_unique','duration']])
features['cluster'] = KMeans(n_clusters=3).fit_predict(X)

# Per-cluster process discovery
for c in range(3):
    cluster_df = df[df['case:concept:name'].isin(
        features[features['cluster']==c]['case:concept:name'])]
    pm4py.save_vis_bpmn(pm4py.discover_bpmn_inductive(cluster_df), f'cluster_{c}.png')
```

### pm4py vs Commercial Tools

| | pm4py | Celonis |
|---|-------|---------|
| Cost | Free | 6-7 figures/year |
| Setup | `pip install pm4py` | Weeks to months |
| Connectors | None (manual) | 1,000+ |
| UI | Code-only | Drag-and-drop studio |
| Scalability | Single machine (GPU optional) | Distributed cloud |
| Actions | None | 80+ integration modules |
| OCEL | Native | Native (PI Graph) |
| Best for | Data scientists, research | Enterprise operations |

---

## 6. Security & Privacy

### GDPR Implications
Event logs contain personal data: employee names/IDs (resource field), customer identifiers (case attributes), work patterns (timestamps), behavioral patterns (activity sequences).

Relevant GDPR articles: Art. 5 (data minimization), Art. 6 (lawful basis — typically "legitimate interest"), Art. 9 (special categories — health data), Art. 17 (right to erasure), Art. 25 (privacy by design).

### Anonymization Techniques

**Filtering**: Remove PII columns entirely before analysis.

**Pseudonymization**:
```python
import hashlib
def pseudonymize(value, salt='secret'):
    return hashlib.sha256(f"{salt}{value}".encode()).hexdigest()[:12]
df['resource'] = df['resource'].apply(pseudonymize)
```

**TLKC-Privacy Model** (Rafiei & van der Aalst): Group-based anonymization extending k-anonymity for sequential trace data. Trade-off: can suppress up to 87% of activities.

**Differential Privacy** (Mannhardt et al.): Adds calibrated noise to DFG frequencies, variant frequencies, performance indicators. Mathematically provable guarantees.

**Tool**: PC4PM (github.com/m4jidRafiei/PC4PM) implements TLKC and other models for pm4py.

### 16 Data Quality Problems (Fluxicon Catalog)

| # | Problem | Fix |
|---|---------|-----|
| 1 | Formatting errors | Fix CSV escaping |
| 2 | Missing events (gaps) | Filter to continuous portions |
| 3 | Missing attribute values | Consult domain experts |
| 4 | Missing attribute history | Use as case-level only |
| 5 | Missing/overloaded Case IDs | Remove suspicious cases |
| 6 | Missing activities (unrecorded) | Manual collection |
| 7 | Missing timestamps | Ignore, borrow from neighbors |
| 8 | Overwritten repetitions | Column→row format transform |
| 9 | Zero timestamps (1900/1970/2999) | Remove or trim timeframe |
| 10 | Wrong timestamp pattern | Re-import with correct format |
| 11 | Same-timestamp activities | Sort by sequence number |
| 12 | Mixed granularities | Scale to coarsest |
| 13 | Unwanted parallelism | Single timestamp; correct source |
| 14 | Wrong TS column config | Reconfigure as "Other" attribute |
| 15 | Recorded ≠ actual time | Analyze at coarser scale |
| 16 | Different clocks across systems | Apply fixed offset correction |

---

## 7. Integration Patterns

### PM → BI (Power BI, Tableau)
- **Celonis + Power BI**: Microsoft-certified connector imports Knowledge Model Records as native Power BI tables
- **PAFnow** (now Celonis): Power BI custom visual rendering process maps directly inside reports
- **Tableau**: Connect to same warehouse feeding PM tool; build dashboards from event_log with calculated fields for process flow

### PM → RPA
```
Celonis identifies: "Invoice blocked 3+ days, price mismatch, <$5K"
    │
    ▼
Action Flow triggered
    │
    ├── Automation Anywhere module → trigger bot to release payment block
    ├── UiPath module → trigger robot to update SAP
    ├── HTTP module → POST to internal API
    └── Power Automate module → trigger desktop flow
```

### Webhooks
- Each Action Flow gets a unique webhook URL
- External systems trigger flows via HTTP
- Requests queued (one queue per webhook)
- Supports GET/POST with configurable auth (Basic, OAuth, API Key)

### Real-Time Monitoring Architecture
```
Source Systems → CDC (Debezium/SAP OPC) → Kafka
    → Celonis Kafka Connector (open-source, Apache 2.0)
    → Celonis Real-Time Layer → PI Graph
    → Live dashboards / Alert engine / Action Flow triggers
```

Celonis Kafka Connector (developed by Lenses.io, acquired by Celonis 2021) runs as Kafka Connect sink connector.
