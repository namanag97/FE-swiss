# Gameplan: Building a Celonis Competitor from Bangalore

## The Core Thesis

Celonis is a $7.7B company selling $500K-$2.3M/year contracts to Fortune 500s, requiring 3-6 month implementations with Big 4 consultants. **That leaves the entire mid-market, the India market, the self-serve market, and the "modern data stack" market completely underserved.**

You don't beat Celonis by being a cheaper Celonis. You beat them by being a fundamentally different product for a market they can't economically serve.

---

## Where Celonis Is Vulnerable

| Vulnerability | Why It Matters |
|--------------|----------------|
| **Price**: $100K-$2.3M/year | Entire mid-market ($50M-$500M revenue companies) is priced out |
| **Implementation**: 4-12 weeks minimum, often 4-5 months | Companies want value in days, not months |
| **Consulting dependency**: Needs SIs for most deployments | Adds $200K-$2M in consulting on top of license |
| **Opaque pricing**: Can't buy self-serve | No PLG (product-led growth) motion at all |
| **PQL**: Proprietary query language | Locks customers in; engineers prefer SQL/Python |
| **SAP-centric DNA**: Best connectors are SAP | Oracle, Salesforce, ServiceNow customers underserved |
| **Heavy platform**: Overkill for a team that just wants to understand one process | Small teams bounced to "Celonis Snap" (limited) |
| **Celonis vs SAP lawsuit**: Data access uncertainty | SAP customers nervous about third-party PM tools |

---

## The Wedge: Pick ONE of These

Don't try to be "Celonis but cheaper." Pick a wedge that gives you unfair advantage:

### Option A: "Datadog for Business Processes" (Recommended)
**Bet**: Process mining becomes infrastructure, not a consulting project. Engineers and data teams should be able to instrument their business processes like they instrument their code.

- Open-source core (like Grafana, Metabase, PostHog)
- SQL-native (no proprietary query language)
- Runs on YOUR data warehouse (Snowflake, Databricks, BigQuery, Postgres)
- Self-serve setup in <1 hour
- Free tier → paid for teams/enterprise
- PLG motion: developers and data engineers adopt bottom-up

**Why this wins**: The "modern data stack" generation (dbt, Fivetran, Snowflake users) has no process mining tool that speaks their language. Celonis wants to be a walled garden. You want to be the open layer.

### Option B: "Vertical PM for Indian Manufacturing"
**Bet**: Dominate one vertical in one geography with 10x better out-of-box experience.

- Pre-built for Indian manufacturing (steel, auto, pharma, FMCG)
- SAP India connectors with GST/RBI compliance built in
- Hindi/regional language UI for plant-floor users
- Priced for India ($10K-$50K/year)
- Partner with 2-3 Indian SIs (Tech Mahindra, LTIMindtree, ITC Infotech)

**Why this wins**: Celonis doesn't care about a $20K deal with a mid-size Indian manufacturer. You do.

### Option C: "PM for GCCs"
**Bet**: 2,100+ GCCs in India need process excellence but can't justify $500K Celonis licenses for their India operations.

- Positioned as the "process intelligence layer for shared services"
- Pre-built for GCC use cases: F&A, HR ops, procurement, IT service desk
- Global HQ can see dashboards; India team runs analysis
- $30K-$100K/year — approved within India CoE budgets
- Land in Bangalore GCCs, expand to global parent

**Why this wins**: 870 GCCs within driving distance of your office. Celonis has ~200 people in India selling to the top 50. You can cover the next 500.

---

## Recommended Path: Option A ("Datadog for Processes")

This has the largest TAM, strongest moat, and best venture story. Here's the full plan:

---

## Phase 0: Foundation (Month 0-2)

### Team (4-5 people to start)
- **You** (CEO/Product): Vision, customers, fundraising
- **CTO/Founding Engineer**: Systems architect, Rust/Go for the core engine
- **Backend Engineer**: Connectors, data pipeline, SQL engine
- **Frontend Engineer**: Process visualization, dashboards (React/Next.js)
- **Data Engineer (part-time/advisor)**: SAP/Oracle extraction expertise

Don't hire PM domain experts yet. Hire engineers who've built data infrastructure (ex-Hasura, ex-Razorpay, ex-Postman, ex-Freshworks type talent in Bangalore).

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Core language | Rust or Go | Performance for graph processing at scale; credibility with infra engineers |
| Query language | SQL (not proprietary) | Every data engineer knows SQL. Don't invent PQL. |
| Data model | Run on customer's warehouse | Zero-copy. No data movement. Compute pushdown to Snowflake/Postgres/BigQuery. |
| Process discovery | Fork/wrap pm4py algorithms | Don't reinvent Alpha/Inductive miners. Wrap proven OSS. |
| Visualization | Custom React components | Process maps are the product. This must be beautiful and fast. |
| Deployment | Cloud SaaS + self-hosted option | SaaS for SMB, self-hosted for enterprise/regulated industries |
| Open source | Core engine open-source (Apache 2.0) | Community, trust, adoption. Monetize on team features + cloud. |

### Architecture

```
Customer's Data Warehouse (Snowflake/PG/BigQuery/Databricks)
         │
         │  SQL queries (compute pushdown)
         │
    ┌────▼────────────────────────────┐
    │   YOUR PRODUCT                  │
    │                                 │
    │  ┌─────────┐  ┌──────────────┐ │
    │  │Connector │  │ Event Log    │ │
    │  │Framework │─>│ Builder      │ │
    │  │(SAP,SF,  │  │ (SQL-based   │ │
    │  │ SN,Oracle│  │  transforms) │ │
    │  └─────────┘  └──────┬───────┘ │
    │                      │         │
    │              ┌───────▼───────┐  │
    │              │ Process Engine│  │
    │              │ (Discovery,   │  │
    │              │  Conformance, │  │
    │              │  Performance) │  │
    │              └───────┬───────┘  │
    │                      │         │
    │              ┌───────▼───────┐  │
    │              │ Visualization │  │
    │              │ & Dashboards  │  │
    │              └───────────────┘  │
    └────────────────────────────────┘
```

**Key insight**: Don't store the data. Query it in place. This eliminates 80% of the implementation pain (no ETL, no data movement, no security concerns about copying production data). This is your #1 architectural differentiator vs Celonis.

---

## Phase 1: MVP (Month 2-5)

### Build the minimum product that delivers value in <1 hour

**Week 1 experience for a user:**
1. Sign up (Google/GitHub SSO)
2. Connect your database (Postgres/Snowflake connection string)
3. Point to a table, tell us which columns are case_id, activity, timestamp
4. See your process map in 30 seconds
5. Click to see variants, bottlenecks, cycle times

That's it. No connectors, no ETL, no PQL. Just "point at your event log and see your process."

### MVP Feature Set
- [ ] Database connectors: Postgres, Snowflake, BigQuery (start with 3)
- [ ] Event log configuration: pick columns for case_id / activity / timestamp
- [ ] Process discovery: DFG (directly-follows graph) with frequency + performance overlay
- [ ] Variant analysis: top N variants ranked by frequency and duration
- [ ] Bottleneck detection: highlight slowest transitions
- [ ] Basic filtering: by time range, by activity, by case attribute
- [ ] Shareable dashboards (link sharing, no login required for viewing)
- [ ] Export: PNG, CSV

### What to NOT build yet
- SAP/Oracle connectors (too complex for MVP)
- Conformance checking (niche use case initially)
- Action engine / automation (that's Phase 3)
- OCPM / object-centric (Phase 3)
- AI/LLM features (Phase 2)
- Mobile app

---

## Phase 2: Product-Market Fit (Month 5-12)

### Find 10 Paying Customers

**Target profile for first 10:**
- Mid-market companies ($50M-$500M revenue)
- Already have data in a warehouse (Snowflake/BigQuery/Postgres)
- Have a data team (2+ data engineers/analysts)
- Feel pain in a specific process (P2P, O2C, support tickets, onboarding)
- Based in India OR India GCCs of global companies

**Where to find them:**
- Bangalore GCCs (literally walk to their offices)
- dbt community / Snowflake community meetups in Bangalore
- Indian SaaS founders network (they all have ops processes)
- LinkedIn outbound to "Head of Data" / "VP Operations" at Indian mid-market
- Process Mining subreddit / community for early adopters globally

### Pricing (Land-and-Expand)

| Tier | Price | Target |
|------|-------|--------|
| **Free** | $0 forever | 1 user, 1 data source, 100K events/month |
| **Team** | $499/month | 10 users, 3 data sources, 5M events/month, shared dashboards |
| **Business** | $1,999/month | Unlimited users, unlimited sources, 50M events, SSO, API |
| **Enterprise** | Custom ($30K-$100K/year) | Self-hosted, SLA, dedicated support, custom connectors |

**Why this pricing**: A VP Ops at a $200M Indian company can approve $499/month on a credit card. They can NEVER approve a $100K Celonis contract. This is how you win deals Celonis doesn't even know exist.

### Features to Add

**Month 5-8:**
- [ ] SAP connector (start with EKKO/EKPO/BKPF — P2P only)
- [ ] Salesforce connector (Opportunities → Lead-to-Revenue)
- [ ] ServiceNow connector (Incidents → Issue-to-Resolution)
- [ ] Pre-built templates: P2P, O2C, ITSM (3 templates, not 50)
- [ ] Alerts: "Notify me when avg cycle time exceeds X days"
- [ ] Team collaboration: comments, annotations on process maps

**Month 8-12:**
- [ ] AI: "Ask a question about your process" (LLM → SQL → visualization)
- [ ] Root cause analysis: "Why are these cases slow?" (automatic attribute correlation)
- [ ] Conformance checking (basic: define expected path, highlight deviations)
- [ ] Embeddable dashboards (iframe into customer's internal tools)
- [ ] API for programmatic access

---

## Phase 3: Scale (Month 12-24)

### Expand on Three Axes

**Axis 1: More connectors**
- Oracle EBS/Fusion, Microsoft Dynamics 365, Workday, Zoho, Freshdesk
- Generic REST API connector (configure any API)
- Kafka connector for streaming

**Axis 2: Action layer**
- Webhooks: trigger external systems when PM detects issues
- Slack/Teams notifications
- Simple automations: "When invoice blocked >3 days, send alert to manager"
- RPA integration: trigger UiPath/Automation Anywhere bots
- Don't build a full orchestration engine — integrate with existing ones

**Axis 3: Advanced analytics**
- Object-centric process mining (OCEL 2.0)
- Predictive: "This case will likely breach SLA" (ML on case features)
- Simulation: "What if we add 2 people to the approval team?"
- Benchmarking across departments/regions

### Go-to-Market Evolution

**India (Month 0-12):**
- Direct sales to Bangalore GCCs and Indian mid-market
- 2-3 SI partnerships (start with one mid-tier like ITC Infotech or LTIMindtree — Big 4 won't partner with a seed-stage startup)
- Celonis Academic Alliance covers universities — you cover bootcamps and startup communities

**Global (Month 12-24):**
- PLG-driven: global users sign up via the free tier
- Content marketing: "Process Mining with SQL" tutorials, YouTube, blog
- Open-source community building (GitHub stars, contributors)
- US sales hire when ARR hits $1M

---

## Fundraising Plan

### Pre-Seed / Seed (Month 0-3)
- **Raise**: $500K-$1.5M
- **From**: Indian angels (Kunal Shah, Nithin Kamath, ex-Freshworks/Razorpay founders), Blume Ventures, Lightspeed India, Together Fund
- **Pitch**: "Celonis is the Salesforce of process intelligence — $7.7B, 383% customer ROI, $2.3B market growing 45% CAGR. But it's enterprise-only, $500K+ contracts, 6-month implementations. We're building the Metabase/PostHog equivalent — open-source, SQL-native, runs on your warehouse, deploys in 1 hour. Starting with India's 15,000 SAP customers and 2,100 GCCs."

### Series A (Month 12-18)
- **Raise**: $5M-$15M
- **From**: Accel India, Sequoia India (Peak XV), Nexus VP, or US firms (Andreessen, Benchmark) if strong PLG metrics
- **Metrics needed**: $500K-$1M ARR, 50+ paying customers, 1000+ free tier users, strong NRR (>120%)

---

## Competitive Moat Over Time

| Year 1 Moat | Year 2 Moat | Year 3+ Moat |
|-------------|-------------|--------------|
| Speed to value (<1 hr) | Open-source community | Network effects (shared process templates) |
| India pricing | Connector ecosystem | Data moat (benchmarking across customers) |
| SQL-native (no PQL) | AI/LLM integration | Platform ecosystem (marketplace) |
| Runs on your warehouse | Pre-built vertical templates | Brand as "the open PM platform" |

---

## What to Name It

The name should signal: modern, developer-friendly, process-aware.

Avoid: anything with "mining" (sounds old-school), anything with "AI" (overplayed), anything with "process" (boring enterprise).

Good directions:
- **Metaphors for flow/path**: Meridian, Flux, Drift, Current, Traverse
- **Metaphors for visibility**: Prism, Lens, Signal, Beacon
- **Short & technical**: Axon, Helix, Lumen, Nexus

(Check domain availability before falling in love)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| **Celonis drops pricing for India** | Your moat is architecture (warehouse-native, open-source), not just price |
| **SAP/Microsoft bundles PM for free** | They'll bundle basic PM. You compete on depth + openness + modern UX |
| **PM stays enterprise-only, no mid-market** | Hedge with GCC play (enterprise budgets, India operations) |
| **Can't build SAP connectors fast enough** | Start with warehouse-native approach (customer's data team extracts to warehouse, you analyze). Add connectors later. |
| **Open-source gets forked** | Apache 2.0 + cloud features. Same model as Grafana/PostHog/Metabase — OSS core, paid cloud. |
| **Data teams don't care about PM** | Frame it as "observability for business processes" — data teams already care about observability |

---

## 90-Day Action Plan

### Month 1
- [ ] Validate thesis: Talk to 30 potential customers (GCC heads, VP Ops, data team leads)
- [ ] Technical spike: Build DFG visualization from Postgres event log (prove <1 hour time-to-value)
- [ ] Register company, open bank account
- [ ] Start fundraising conversations

### Month 2
- [ ] Hire founding engineer #1
- [ ] Build: database connectors (Postgres + Snowflake), event log config UI, DFG renderer
- [ ] Get 3 design partners committed (free access in exchange for feedback)
- [ ] Close pre-seed round

### Month 3
- [ ] Hire engineer #2 (frontend)
- [ ] Ship private beta to design partners
- [ ] Build: variant analysis, bottleneck detection, basic filtering
- [ ] Start content: "Process Mining with SQL" blog series
- [ ] Get first LOIs (letters of intent) for paid tier

---

## The One-Liner

**"Open-source process intelligence that runs on your data warehouse. See how your business actually works in 30 minutes, not 6 months."**
