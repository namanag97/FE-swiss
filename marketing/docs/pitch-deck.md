# SANCALANA — PITCH DECK

Each section below = one slide. Notes below each slide are speaker notes / talking points.

---

## SLIDE 1: COVER

```
SANCALANA

See how your business actually runs.

Process Intelligence Platform
```

*No tagline soup. No "AI-powered next-gen platform." Just what it does.*

---

## SLIDE 2: THE PROBLEM — NOBODY KNOWS

```
Your company runs on processes.
Every process spans 3-5 systems.
Nobody knows how they actually work.

┌─────────────────────────────────────────────────┐
│                                                 │
│   What leadership thinks happens:               │
│                                                 │
│   Request → Approve → PO → Receive → Pay       │
│   (5 steps, 10 days)                            │
│                                                 │
│                                                 │
│   What actually happens:                        │
│                                                 │
│   ██████████████████████████████████████████     │
│   47 variants. 23% rework. 6 approval loops.   │
│   (5-90 days. Nobody knows why.)                │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Speaker notes:** "Every company we talk to believes their process has 5-8 steps. When we show them the data, it's 47 variants. The reaction is always the same: 'We had no idea.'"

---

## SLIDE 3: THE INVESTIGATION TAX

```
Every quarter, the same fire drill:

   "Why is our cycle time getting worse?"

   3 analysts. 4 systems. 2 weeks. 1 PowerPoint.

   Repeat next quarter.


This costs enterprises $500K-$2M/year
in analyst time alone.

We call this the Investigation Tax.
```

**Speaker notes:** "Dashboards tell you WHAT happened — 'average cycle time is 22 days.' They can't tell you WHY. Which step? Which vendor? Which region? That requires a two-week investigation every time someone asks."

---

## SLIDE 4: WHAT SANCALANA DOES

```
We connect to your systems.
We reconstruct what actually happened.
You see everything.

   ┌──────────────┐
   │  SAP         │──┐
   │  Salesforce   │──┤    ┌─────────────────────────┐
   │  ServiceNow  │──┼───→│     SANCALANA            │
   │  Oracle      │──┤    │                           │
   │  Jira        │──┤    │  Every path.              │
   │  Workday     │──┤    │  Every bottleneck.        │
   │  Dynamics365 │──┤    │  Every deviation.         │
   │  Coupa       │──┤    │  Every root cause.        │
   │  Ariba       │──┤    │                           │
   │  Any SQL DB  │──┘    │  In seconds, not weeks.   │
   └──────────────┘       └─────────────────────────┘
```

**Speaker notes:** "We have 16 production connectors today. SAP OData, Salesforce, ServiceNow, Jira, Workday, Dynamics 365, Coupa, Ariba, Oracle, any JDBC database, Snowflake, Databricks, BigQuery, file uploads, Delta Sharing, and Kafka. We're not a demo — this is real data integration."

---

## SLIDE 5: LIVE DEMO PLACEHOLDER

```
[THIS SLIDE IS A LIVE DEMO]

Connect to SAP → See process map → Filter by vendor →
Root cause analysis → Quantified finding

Time: 4 minutes.
```

**Speaker notes:** "This is where you show the product. No slides. Open Sancalana, connect a sample dataset, show the process map rendering. Filter it. Run RCA. Show the finding. The product IS the pitch."

---

## SLIDE 6: THE MARKET

```
Process Mining Market

   $2.3B today → $15-21B by 2030
   33% CAGR (Gartner)

   Only 25% of enterprises have adopted.
   75% haven't started.

   ┌─────────────────────────────────────────┐
   │                                         │
   │  Celonis: $771M ARR, 1,400 customers    │
   │  The other 98% of enterprises:          │
   │                                         │
   │  "Too expensive. Too slow. Too complex."│
   │                                         │
   └─────────────────────────────────────────┘
```

**Speaker notes:** "Celonis proved the market. $771M ARR, Fortune 500 customers, $8B in realized value. But their model requires $1.5-5M year one investment, 15-20 person CoE, and 6-12 months before first value. That works for Siemens. It doesn't work for 98% of enterprises."

---

## SLIDE 7: THE EVIDENCE — REAL QUOTES

```
From Celonis's own users:

"In 90% of cases, plug & play is not possible."
                                        — G2 Review

"If you need to do something custom, it'll take weeks."
                                        — PeerSpot Review

"We spent an awful lot of money — I mean, a lot of
money — and finished up 12-18 months later with
no solution."
                              — Pfizer, Director of CS

"Over 2 in 3 process mining solutions led to
disappointing results."
                                    — HFS Research

80% of project time is spent on data preparation.
                              — Gartner Market Guide
```

**Speaker notes:** "These aren't our claims. These are Celonis's own users on public review platforms. The Pfizer quote is from their Director of Customer Service at a public conference. HFS Research found two-thirds of process mining projects disappoint. The gap is real."

---

## SLIDE 8: WHY THIS HAPPENS

```
Celonis was built in 2011.

   2011                          2026
   ─────────────────────────────────────
   Data in on-prem SAP           Data in cloud warehouses
   Custom extraction scripts     Standard APIs & CDC
   6-month ETL projects          Connect and query
   Proprietary PQL               SQL-native
   $2M to start                  See value first, pay later
   15-person CoE                 Self-serve


   The world moved. The tooling didn't.
```

**Speaker notes:** "Celonis built SaolaDB, a custom in-memory database, and proprietary PQL query language because in 2011 that was the only way. Today, your data is already in Snowflake or S/4HANA with clean APIs. The hard problem of 2011 isn't hard anymore. But Celonis's architecture is locked in."

---

## SLIDE 9: SANCALANA — WHAT WE BUILT

```
Modern process intelligence, from scratch.

   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │  60+ Rust crates. Production-grade.             │
   │                                                 │
   │  16 connectors         22 algorithms            │
   │  SAP OData             Inductive Miner          │
   │  Salesforce             Heuristic Miner          │
   │  ServiceNow            Conformance Check        │
   │  Jira                  Root Cause Analysis      │
   │  Dynamics 365          Bottleneck Analysis      │
   │  Workday               Anomaly Detection        │
   │  Coupa / Ariba         Social Network Mining    │
   │  Any JDBC / SQL        Concept Drift            │
   │  Snowflake             Predictive Monitoring    │
   │  Databricks            Process Simulation       │
   │  BigQuery              CEP Pattern Matching     │
   │  Kafka / Delta Sharing Decision Mining          │
   │                                                 │
   │  TQL query engine: 70+ functions                │
   │  OCEL 2.0 native (object-centric)               │
   │  Knowledge Model with versioned KPIs            │
   │  Action Engine with write-back                  │
   │  MCP server for AI agents (19 tools)            │
   │                                                 │
   └─────────────────────────────────────────────────┘
```

**Speaker notes:** "This is not a wrapper around pm4py. We wrote 60+ Rust crates from scratch. 16 production connectors. 22 process mining algorithms. A custom query language (TQL) with 70+ built-in functions and SQL MATCH_RECOGNIZE for sequence pattern detection. Full OCEL 2.0 — object-centric, not just case-centric. Knowledge Model with versioned KPIs. Action Engine that writes back to source systems. And an MCP server so AI agents like Claude can query your processes directly."

---

## SLIDE 10: ARCHITECTURE

```
                    ┌─────────────┐
                    │  Frontend   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───┐ ┌──────▼──────┐
       │ svc-gateway  │ │ svc- │ │ svc-platform│
       │              │ │query │ │             │
       │ 16 connectors│ │      │ │ RBAC        │
       │ Ingestion    │ │ TQL  │ │ Billing     │
       │ Auth         │ │ KM   │ │ Actions     │
       │ Jobs         │ │ CEP  │ │ Studio      │
       └──────┬───────┘ │ RCA  │ └─────────────┘
              │         └──┬───┘
              │            │
       ┌──────▼──────┐     │
       │ svc-pipeline │     │
       │              │     │
       │ Kafka → OCEL │     │
       │ → Parquet    │     │
       │ → Iceberg    │     │
       │ → MV refresh │     │
       └──────┬───────┘     │
              │             │
       ┌──────▼─────────────▼──────┐
       │         StarRocks          │
       │    (OLAP Query Engine)     │
       ├────────────────────────────┤
       │         Iceberg            │
       │      (Table Format)        │
       ├────────────────────────────┤
       │         S3 / MinIO         │
       │     (Object Storage)       │
       └────────────────────────────┘
```

**Speaker notes:** "Five services. Not sixteen, not a hundred. Gateway handles ingestion from any source. Pipeline transforms raw data into OCEL format, writes to Iceberg tables on S3, refreshes materialized views in StarRocks. Query engine parses TQL, compiles to StarRocks SQL, executes, returns results. Platform handles RBAC, billing, actions. Clean separation. Kafka for streaming, StarRocks for sub-second queries, Iceberg for cheap infinite storage."

---

## SLIDE 11: WHY RUST

```
Why we wrote a process mining platform in Rust:

   Memory safety without garbage collection.
   Zero-cost abstractions.
   Predictable latency (no GC pauses).

   Result:
   ┌──────────────────────────────────────┐
   │                                      │
   │  50,000 events/second ingestion      │
   │  Sub-second process map rendering    │
   │  10M events in ~130 MB memory        │
   │  No JVM. No Python GIL.             │
   │  Single binary per service.          │
   │                                      │
   └──────────────────────────────────────┘

   Celonis: Java/Scala + custom C++ (SaolaDB)
   Sancalana: Rust + StarRocks + Iceberg

   Different era. Different choices.
```

**Speaker notes:** "We chose Rust because process mining is CPU and memory intensive. You're joining millions of events across thousands of cases, computing variants, running conformance checks. Java's garbage collector creates unpredictable latency spikes. Python's GIL limits concurrency. Rust gives us C++ performance with memory safety. Each service compiles to a single binary — no dependency hell, no JVM tuning."

---

## SLIDE 12: OBJECT-CENTRIC (OCEL 2.0)

```
Traditional process mining:           Sancalana:
One case ID per event.               Events link to multiple objects.

   Order 123                         Order 123
     → Create                          → Create  ──→ Item A, Item B
     → Approve                         → Approve ──→ Item A
     → Ship                            → Ship    ──→ Item A, Item B
     → Invoice                         → Invoice ──→ Invoice 456
     → Pay                             → Pay     ──→ Invoice 456, Payment 789

   "What happened to                 "What happened to this order,
    this order?"                      its items, its invoice, and
                                      its payment — all connected."

   Celonis launched OCPM in 2023.
   We built OCEL 2.0 native from day one.
```

**Speaker notes:** "Traditional process mining tracks one case ID. But real processes aren't linear — one purchase order creates multiple goods receipts, multiple invoices, multiple payments. OCEL 2.0 connects events to objects. We store events, objects, event-to-object relations, and object-to-object relations natively. This isn't a feature we bolted on — it's the foundation."

---

## SLIDE 13: TQL — THE QUERY LANGUAGE

```
TQL: Process-aware SQL.

   -- Find all P2P cases where a 3-way match failed
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

   70+ built-in functions:
   CALC_LIFT()  DECISION_TREE()  DISCOVER_DFG()
   SLA_COMPLIANCE()  CYCLE_TIME()  VARIANT_ANALYSIS()
   FUZZY_MATCH()  BUSINESS_TIME()  EDIT_DISTANCE()
```

**Speaker notes:** "TQL looks like SQL because it is. Any analyst who knows SQL can write TQL. But it extends SQL with MATCH_RECOGNIZE — the SQL:2016 standard for sequence pattern matching. This means you can find process patterns, not just filter rows. 70+ built-in functions for process mining operations. And because it compiles to StarRocks SQL, it runs on a production OLAP engine, not a toy."

---

## SLIDE 14: AI-NATIVE

```
MCP Server: 19 process intelligence tools
for AI agents.

   "Show me the top bottlenecks in our P2P process"

   Claude / Copilot / watsonx
      ↓
   MCP Protocol
      ↓
   Sancalana Process Intelligence
      ↓
   "Activity 'Manual 3-Way Match' adds 4.2 days
    to 23% of cases. Vendor Acme Corp accounts
    for 67% of these delays. Root cause:
    missing PO reference on invoice."


Not "AI-powered" marketing.
An actual protocol server that any LLM can call.
```

**Speaker notes:** "We built an MCP server — the Model Context Protocol that Anthropic created — with 19 tools that any AI agent can call. This means your AI assistant can query process data, run root cause analysis, check KPI status, and explain findings in natural language. This isn't a chatbot wrapper. It's a protocol-level integration that works with Claude, Copilot, watsonx, or any MCP-compatible agent."

---

## SLIDE 15: CELONIS VS SANCALANA — HONEST COMPARISON

```
                        Celonis              Sancalana
─────────────────────────────────────────────────────────────
Connectors              100+                 16
Years in market         13                   1
Fortune 500 logos       Yes (625+)           No
Process depth           Deepest              Growing
SI ecosystem            All major SIs        Direct only
Certifications          SOC2, ISO, HIPAA     In progress

Year 1 cost             $1.5-5M              $60-100K
Time to first insight   4-6 months           1-2 weeks
Implementation          Consultants required Self-serve
Query language          PQL (proprietary)    TQL (SQL-based)
OCEL 2.0                Retrofitted (2023)   Native
Architecture            SaolaDB (2011)       StarRocks+Iceberg
AI integration          Copilot              MCP (any LLM)


We don't claim to be better than Celonis.
We claim to be the right starting point.
```

**Speaker notes:** "We're not hiding anything. Celonis has 100+ connectors, we have 16. They have 13 years, we have 1. They have Fortune 500 logos, we don't. But — year one cost is $60-100K vs $1.5-5M. Time to first insight is weeks vs months. No consultants needed. SQL-based query language vs proprietary PQL. Native OCEL 2.0. Modern architecture. And we integrate with any LLM via MCP, not just one copilot."

---

## SLIDE 16: THE VALUE

```
What process mining finds:

   ┌────────────────────────────────────────────────┐
   │  Cash discount capture      $1-40M/year        │
   │  Duplicate payment prevention  $0.2-5M/year    │
   │  Invoice processing savings    $0.5-6M/year    │
   │  DSO reduction (cash flow)     $1-20M/year     │
   │  ITSM optimization             $0.5-5M/year    │
   │  S/4HANA migration de-risk     $1-5M           │
   ├────────────────────────────────────────────────┤
   │                                                │
   │  Forrester TEI (Celonis): 383% ROI, <6mo payback│
   │  Deutsche Telekom: €66M in P2P savings         │
   │  GE Healthcare: $1.3B free cash flow increase  │
   │                                                │
   │  These results are from process mining.        │
   │  Not from Celonis specifically.                │
   │  The value is in the technique.                │
   │  We deliver the same technique,                │
   │  at a fraction of the cost and time.           │
   │                                                │
   └────────────────────────────────────────────────┘
```

**Speaker notes:** "Process mining as a technique delivers real, measurable value. The Forrester study showed 383% ROI and less than 6 months payback. Those results come from finding bottlenecks, duplicate payments, missed discounts — things that exist in every company. We deliver the same analytical technique, the same algorithms, the same findings. The difference is how fast and how much it costs to get there."

---

## SLIDE 17: WHO THIS IS FOR

```
Sweet spot:

   ✓ $200M - $5B revenue
   ✓ Running SAP, Oracle, or ServiceNow
   ✓ At least one process they suspect is broken
   ✓ Want to see results before committing $2M

Best for:
   → GCCs in India (process excellence mandates, global budgets)
   → S/4HANA migration (2027 deadline = 15,000 SAP customers in India)
   → Finance teams tired of the quarterly investigation tax
   → Operations leaders told to "do process mining" without $2M budget

India first:
   → 2,100+ GCCs in Bangalore alone
   → $140M+ process mining market, fastest-growing region
   → 15,000 SAP customers facing 2027 migration deadline
```

---

## SLIDE 18: GO-TO-MARKET

```
                 INDIA BEACHHEAD
                 ┌───────────────────┐
    Year 1       │  GCCs + SAP cos   │
    5-10 logos   │  in Bangalore     │
                 │  Direct sales     │
                 │  Free pilot model │
                 └────────┬──────────┘
                          │
    Year 2       ┌────────▼──────────┐
    30-50 logos  │  India enterprise  │
                 │  + boutique SIs    │
                 │  3-5 verticals    │
                 └────────┬──────────┘
                          │
    Year 3       ┌────────▼──────────┐
    100+ logos   │  SEA + Middle East │
                 │  Major SI partners │
                 │  PLG freemium     │
                 └───────────────────┘

   CAC target: $15-30K (founder-led sales)
   ACV target: $60-100K (GCC), $30-50K (mid-market India)
   LTV:CAC: >5x at 90%+ gross margin
```

---

## SLIDE 19: BUSINESS MODEL

```
Pricing:

   Free         1 connector, 1M events, community support
   Pro          $30-50K/yr — hourly refresh, 5 connectors
   Enterprise   $100-300K/yr — real-time, unlimited, SLA
   GCC          Global pricing — $60-150K/yr


Unit economics at 50 customers:

   Infrastructure:      $7,148/month
   Per customer:        $143/month = $1,716/year
   At $60K ACV:         97% gross margin

   Celonis estimated:   $138K-$165K/customer/year infra
   Sancalana:           $1,716/customer/year infra

   This cost advantage is structural:
   StarRocks + Iceberg on S3 vs in-memory SaolaDB.
   Multi-tenant shared cluster vs per-tenant isolation.
   India engineering team vs Munich + NYC.
```

---

## SLIDE 20: THE ASK

```
We're not asking you to sign a contract.

We're asking:

   Give us access to one process.
   In one system.
   We'll show you the map, the bottlenecks,
   and a quantified finding.

   In two weeks. Free.

   If it's valuable, we talk.
   If it's not, you've lost nothing.


hello@sancalana.com
sancalana.com
```

---

## SLIDE 21: APPENDIX — TEAM

```
[ADD YOUR TEAM HERE]

Key points to include:
- Technical depth (60+ Rust crates, solo or small team = impressive velocity)
- Domain expertise (process mining research depth shown in docs)
- India presence (cost advantage, proximity to GCC market)
```

---

## SLIDE 22: APPENDIX — TECHNICAL DEPTH

```
What's actually built (not planned — built):

Process Mining Algorithms:        Infrastructure:
├── Inductive Miner (IM/IMf/IMd)  ├── StarRocks 4.0.3 (OLAP)
├── Heuristic Miner               ├── Apache Kafka (KRaft)
├── Alpha Miner                   ├── Apache Iceberg V2
├── Split Miner                   ├── Apache Polaris (catalog)
├── Fuzzy Miner                   ├── PostgreSQL 16
├── OCEL Discovery                ├── MinIO (S3)
├── Declare Mining                ├── Jaeger (tracing)
├── Conformance (token replay)    ├── Loki (logging)
├── Conformance (alignment)       └── Kubernetes + Helm
├── OCEL Conformance
├── Footprint Matrix              Languages:
├── Log Skeleton                  ├── Rust (60+ crates)
├── Temporal Profile              ├── Python (14 packages)
├── RCA (CART + MAD outlier)      └── TypeScript (frontend)
├── Bottleneck Analysis
├── Social Network Mining         Deployment:
├── Org Mining                    ├── Docker Compose (dev)
├── Concept Drift                 ├── Kubernetes manifests
├── Decision Mining               ├── Helm charts
├── Predictive Monitor (ONNX)     ├── Azure Pipelines CI
├── Anomaly Detection             └── 14-container stack
├── Process Simulation (Monte Carlo)
└── CEP (NFA pattern matching)
```

---

*Deck designed for: Investor meetings, enterprise prospect presentations, partnership conversations.*

*The product is the pitch. Every slide after the demo is supporting evidence. If the demo doesn't land, no slide will save it.*
