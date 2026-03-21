---
marp: true
theme: uncover
paginate: true
backgroundColor: #0a0a0a
color: #e5e5e5
style: |
  section {
    font-family: 'Inter', 'Helvetica Neue', sans-serif;
    font-size: 28px;
    padding: 40px 60px;
  }
  h1 {
    color: #ffffff;
    font-size: 52px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  h2 {
    color: #ffffff;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  h3 {
    color: #a3a3a3;
    font-size: 24px;
    font-weight: 400;
  }
  strong {
    color: #60a5fa;
  }
  em {
    color: #a3a3a3;
    font-style: normal;
  }
  code {
    background: #1a1a2e;
    color: #60a5fa;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 22px;
  }
  pre {
    background: #111127;
    border: 1px solid #1e1e3f;
    border-radius: 12px;
    padding: 24px;
    font-size: 18px;
    line-height: 1.5;
  }
  pre code {
    background: none;
    padding: 0;
    font-size: 18px;
  }
  table {
    font-size: 20px;
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  th {
    background: #1a1a2e;
    color: #60a5fa;
    padding: 10px 16px;
    text-align: left;
    border-bottom: 2px solid #2d2d5e;
  }
  td {
    padding: 8px 16px;
    border-bottom: 1px solid #1a1a2e;
  }
  blockquote {
    border-left: 4px solid #60a5fa;
    padding: 8px 20px;
    margin: 16px 0;
    background: #111127;
    border-radius: 0 8px 8px 0;
    font-size: 22px;
  }
  blockquote p {
    margin: 4px 0;
  }
  section.lead {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  section.lead h1 {
    font-size: 72px;
  }
  section.lead h3 {
    font-size: 28px;
    margin-top: 20px;
  }
  ul {
    line-height: 1.6;
  }
  li {
    margin-bottom: 8px;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  footer {
    color: #525252;
    font-size: 14px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->

# SANCALANA

### See how your business actually runs.

*Process Intelligence Platform*

---

# The Problem

Every company runs on processes.
Every process spans 3-5 systems.

**Nobody knows how they actually work.**

<div class="columns">
<div>

### What leadership thinks

Request → Approve → PO → Receive → Pay

*5 steps. 10 days.*

</div>
<div>

### What actually happens

**47 variants.** 23% rework.
6 approval loops. Manual workarounds.

*5 to 90 days. Nobody knows why.*

</div>
</div>

---

# The Investigation Tax

Every quarter, the same fire drill:

> **"Why is our cycle time getting worse?"**
> 3 analysts. 4 systems. 2 weeks. 1 PowerPoint.
> Repeat next quarter.

This costs enterprises **$500K — $2M / year** in analyst time.

Dashboards show **what** happened.
They cannot tell you **why**.

---

# What Sancalana Does

We connect to your systems.
We reconstruct what actually happened.
You see everything.

| Source Systems | What You Get |
|---|---|
| SAP, Oracle, Salesforce | Every process path |
| ServiceNow, Jira | Every bottleneck |
| Workday, Dynamics 365 | Every deviation |
| Coupa, Ariba | Every root cause |
| Snowflake, Databricks, BigQuery | **In seconds, not weeks** |
| Any SQL database, Kafka, files | |

**16 production connectors.** Not a demo.

---

<!-- _class: lead -->

# Live Demo

*Connect to SAP → Process map → Filter → Root cause → Finding*

**4 minutes.**

---

# The Market

**Process mining: $2.3B today → $15-21B by 2030** *(33% CAGR, Gartner)*

Only **25% of enterprises** have adopted.

Celonis proved the market:
- **$771M ARR**, 1,400 customers
- **$8.1B in realized savings** across customers
- Deutsche Telekom: **€66M** P2P savings
- GE Healthcare: **$1.3B** free cash flow improvement

But their model requires **$1.5-5M year one** and **6-12 months** to first value.

That works for Siemens. Not for 98% of enterprises.

---

# Real Users, Real Frustrations

> "In **90% of cases**, plug & play is not possible."
> *— Celonis G2 Review*

> "If you need to do something custom, **it'll take weeks.**"
> *— PeerSpot Review*

> "We spent **an awful lot of money** and finished up **12-18 months later with no solution.**"
> *— Pfizer, Director of Customer Service*

> "**Over 2 in 3** process mining solutions led to **disappointing results.**"
> *— HFS Research*

These aren't our claims. These are public reviews and research.

---

# Why This Happens

Celonis was built in 2011. The world has changed.

| 2011 | 2026 |
|---|---|
| Data trapped in on-prem SAP | Data in cloud warehouses |
| Custom extraction scripts | Standard APIs and CDC |
| 6-month ETL projects | Connect and query |
| Proprietary PQL | SQL-native |
| $2M to start | See value first, pay later |
| 15-person CoE | Self-serve |

**The hard problem of 2011 isn't hard anymore.**
**But Celonis's architecture is locked in.**

---

# What We Built

**60+ Rust crates. Production-grade. From scratch.**

<div class="columns">
<div>

### 16 Connectors
- SAP OData V4
- Salesforce (REST + Bulk)
- ServiceNow
- Jira Cloud / Server
- Dynamics 365
- Workday
- Coupa / Ariba
- Oracle, PostgreSQL, MySQL
- Snowflake, Databricks, BigQuery
- Kafka, Delta Sharing, Files

</div>
<div>

### 22 Algorithms
- Inductive Miner (IM/IMf/IMd)
- Heuristic Miner
- Split Miner
- Conformance Checking
- Root Cause Analysis (CART)
- Bottleneck Analysis
- Anomaly Detection
- Social Network Mining
- Predictive Monitoring (ONNX)
- Process Simulation (Monte Carlo)
- CEP Pattern Matching (NFA)

</div>
</div>

---

# Architecture

```
 Frontend ──→ svc-gateway ──→ svc-pipeline ──→ StarRocks
              (16 connectors)  (Kafka→OCEL      (OLAP queries)
              (auth, jobs)      →Parquet→Iceberg
                                →MV refresh)

             svc-query ────────────────────────→ StarRocks
              (TQL engine, 70+ UDFs)
              (Knowledge Model, CEP, RCA)

             svc-platform                        Iceberg + S3
              (RBAC, billing, actions, studio)   (infinite storage)
```

**5 services. Not fifty.** Kafka for streaming. StarRocks for sub-second queries. Iceberg for cheap infinite storage on S3.

---

# TQL — Process-Aware SQL

```sql
-- Find all cases where a 3-way match failed
-- and the invoice was paid anyway
SELECT case_id, total_amount, vendor
FROM events
MATCH_RECOGNIZE (
    PARTITION BY case_id
    ORDER BY timestamp
    PATTERN (Invoice FailedMatch+ Payment)
    DEFINE
        Invoice    AS activity = 'Invoice Received',
        FailedMatch AS activity = '3-Way Match Failed',
        Payment    AS activity = 'Payment Released'
)
WHERE total_amount > 100000
```

**SQL:2016 MATCH_RECOGNIZE** for sequence pattern detection.
**70+ built-in functions:** `CALC_LIFT()`, `DECISION_TREE()`, `DISCOVER_DFG()`, `SLA_COMPLIANCE()`

Any analyst who knows SQL can write TQL.

---

# Object-Centric (OCEL 2.0) — Native

<div class="columns">
<div>

### Traditional Process Mining
One case ID per event.

*"What happened to Order 123?"*

Limited. Can't track items, invoices, payments as connected objects.

Celonis retrofitted OCPM in 2023.

</div>
<div>

### Sancalana — OCEL 2.0 Native
Events link to multiple objects.

*"What happened to this order, its items, its invoice, and its payment — all connected."*

Events, objects, E2O relations, O2O relations. From day one.

</div>
</div>

---

# AI-Native — MCP Server

**19 process intelligence tools** for any AI agent.

> *"Show me the top bottlenecks in our P2P process"*
>
> Claude / Copilot / watsonx → MCP Protocol → Sancalana
>
> *"Activity 'Manual 3-Way Match' adds 4.2 days to 23% of cases. Vendor Acme Corp accounts for 67% of these delays."*

Not a chatbot wrapper.
A **protocol-level integration** that works with any MCP-compatible LLM.

---

# Honest Comparison

|  | **Celonis** | **Sancalana** |
|---|---|---|
| Connectors | 100+ | 16 |
| Years in market | 13 | 1 |
| Fortune 500 logos | 625+ | Not yet |
| **Year 1 cost** | **$1.5-5M** | **$60-100K** |
| **Time to first insight** | **4-6 months** | **1-2 weeks** |
| **Implementation** | **Consultants required** | **Self-serve** |
| Query language | PQL (proprietary) | TQL (SQL-based) |
| OCEL 2.0 | Retrofitted (2023) | Native |
| AI integration | Copilot only | MCP (any LLM) |

**We don't claim to be better. We claim to be the right starting point.**

---

# The Value

Process mining finds real money:

| Value Lever | Annual Range |
|---|---|
| Cash discount capture | $1 — 40M |
| Duplicate payment prevention | $0.2 — 5M |
| Invoice processing savings | $0.5 — 6M |
| DSO reduction (cash flow) | $1 — 20M |
| ITSM optimization | $0.5 — 5M |
| S/4HANA migration de-risking | $1 — 5M |

**Forrester TEI: 383% ROI, < 6 month payback.**

The value is in the technique, not the vendor.
We deliver the same technique at a fraction of the cost and time.

---

# Who This Is For

**Sweet spot:** $200M — $5B revenue. SAP or Oracle. At least one broken process.

### Best for:
- **GCCs in India** — process excellence mandates, global budgets, need to prove value to HQ
- **S/4HANA migration** — 15,000 SAP customers in India, 2027 deadline
- **Finance teams** — tired of the quarterly investigation fire drill
- **Ops leaders** — told to "do process mining" without a $2M budget

### India first:
- 2,100+ GCCs in Bangalore
- $140M+ process mining market, fastest-growing region
- Proximity, trust, cost advantage

---

# Go-To-Market

| Phase | Timeline | Target | Motion |
|---|---|---|---|
| **Beachhead** | Year 1 | GCCs + SAP cos in Bangalore | Founder-led, free pilot |
| **Expand** | Year 2 | India enterprise + boutique SIs | Direct + channel |
| **Scale** | Year 3 | SEA + Middle East + PLG | Partners + self-serve |

**Unit Economics:**

| Metric | Target |
|---|---|
| ACV | $60-100K (GCC), $30-50K (mid-market) |
| Infra cost / customer | $1,716 / year (at 50 customers) |
| Gross margin | **97%** |
| CAC | $15-30K (founder-led) |
| LTV:CAC | > 5x |

---

# Business Model

| Tier | Price | Includes |
|---|---|---|
| **Free** | $0 | 1 connector, 1M events, daily refresh |
| **Pro** | $30-50K/yr | 5 connectors, hourly refresh, KPIs |
| **Enterprise** | $100-300K/yr | Unlimited, real-time, SLA, actions |
| **GCC** | $60-150K/yr | Global pricing, dedicated support |

**Cost advantage is structural:**

StarRocks + Iceberg on S3 vs in-memory SaolaDB.
Multi-tenant shared cluster vs per-tenant isolation.
India engineering vs Munich + NYC.

---

<!-- _class: lead -->

# The Ask

Give us access to **one process** in **one system**.

We'll show you the map, the bottlenecks,
and a quantified finding.

**In two weeks. Free.**

If it's valuable, we talk.
If it's not, you've lost nothing.

### hello@sancalana.com

---

# Appendix: Technical Depth

<div class="columns">
<div>

### 22 Algorithms (Built)
- Inductive Miner (IM / IMf / IMd)
- Heuristic Miner
- Alpha Miner
- Split Miner
- Fuzzy Miner
- OCEL Discovery
- Declare Mining
- Conformance (token replay)
- Conformance (alignment)
- OCEL Conformance
- Footprint Matrix

</div>
<div>

### (continued)
- Log Skeleton
- Temporal Profile
- RCA (CART + MAD outlier)
- Bottleneck Analysis
- Social Network Mining
- Org Mining
- Concept Drift
- Decision Mining
- Predictive Monitor (ONNX)
- Anomaly Detection
- Process Simulation (Monte Carlo)
- CEP (NFA pattern matching)

</div>
</div>

**60+ Rust crates** | **14 Python packages** | **Kubernetes + Helm ready**

---

# Appendix: Infrastructure Stack

| Component | Technology | Role |
|---|---|---|
| OLAP Engine | StarRocks 4.0.3 | Sub-second queries |
| Streaming | Apache Kafka (KRaft) | Event ingestion |
| Table Format | Apache Iceberg V2 | Versioned data lake |
| Catalog | Apache Polaris | Iceberg REST catalog |
| Storage | S3 / MinIO | Infinite, cheap |
| Metadata | PostgreSQL 16 | Connections, KM, RBAC |
| Tracing | Jaeger (OpenTelemetry) | Distributed tracing |
| Logging | Loki + Promtail | Centralized logs |
| CI/CD | Azure Pipelines | Build + test |
| Deploy | Kubernetes + Helm | Production-grade |
