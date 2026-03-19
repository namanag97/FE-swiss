# Process Intelligence Startup — Strategy Workbook

This is a working document. Fill in the blanks, pressure-test assumptions, iterate.

Reference docs:
- `../b2b-saas-strategy-frameworks.md` — VC evaluation criteria, unit economics, TAM/SAM/SOM methods, GTM frameworks, financial modeling, pitch deck structure
- `../disruption-playbooks.md` — How Freshworks, Postman, Zoho, Datadog, Snowflake, Grafana actually did it

---

## 1. SEQUOIA COMPANY BRIEF

Fill each section in 2-3 sentences max. If you can't, you don't understand it yet.

### Company Purpose
*One declarative sentence. Not features — intent.*

> [YOUR ANSWER]

### Problem
*What pain does the customer experience today? Why do current solutions fall short?*

Key data from our research:
- Celonis costs $500K-$2.3M/year with 4-12 week implementations
- 52% of companies cite lack of expertise as primary deployment barrier
- Data extraction consumes 80% of project resources
- ~70% of transformation programs fail (McKinsey)
- India PM market: ~$140M (2026), mostly untapped below Fortune 500

> [YOUR ANSWER — state the pain in the customer's words, not yours]

### Solution
*What is your breakthrough approach? Why is it unique, compelling, durable?*

> [YOUR ANSWER]

### Why Now?
*What changed in the market that makes this possible today but not 3 years ago?*

Timing signals from research:
- SAP ECC end-of-maintenance 2027 → 15,000+ Indian SAP customers must migrate → need process discovery
- OCEL 2.0 standard (2024) makes object-centric PM interoperable
- pm4py and open-source PM algorithms are mature
- Cloud data warehouses (Snowflake/Databricks) ubiquitous → data already centralized
- LLMs enable natural-language process querying for first time
- 2,100+ GCCs in India with process excellence mandates
- Celonis vs SAP antitrust lawsuit creates market uncertainty
- Agentic AI needs process context — PM becomes infrastructure, not analytics

> [YOUR ANSWER — pick the 2-3 most compelling, don't list everything]

### Market Potential
*See TAM/SAM/SOM model below*

### Competition
*See competitive matrix below*

### Business Model
*See unit economics model below*

### Team
*Who are you and why are you the right people to build this?*

> [YOUR ANSWER]

### Vision
*What does this company look like at $100M ARR?*

> [YOUR ANSWER]

---

## 2. TAM / SAM / SOM

### Method: Bottom-Up (preferred by VCs)

**TAM (Total Addressable Market)**
= Total number of companies that could use process mining × average annual spend

| Segment | Companies | Avg Spend | = TAM |
|---------|-----------|-----------|-------|
| Global enterprise (>$1B rev) | ~60,000 | $200K/year | $12B |
| Global mid-market ($50M-$1B) | ~200,000 | $30K/year | $6B |
| Global SMB ($10M-$50M) | ~500,000 | $6K/year | $3B |
| **Total TAM** | | | **$21B** |

*Cross-check: Analyst estimates range $12B-$58B by 2028-2034. Your bottom-up should land in a similar range.*

**SAM (Serviceable Addressable Market)**
= Segment you can realistically reach with your product and GTM

| Filter | Reduction |
|--------|-----------|
| Geography (India + English-speaking markets) | 40% of TAM |
| Has ERP/warehouse data | 60% of filtered |
| Tech-forward (data team exists) | 50% of filtered |
| **SAM** | **~$2.5B-$5B** |

**SOM (Serviceable Obtainable Market)**
= What you can capture in 3-5 years

| Assumption | Value |
|-----------|-------|
| SAM | $3B |
| Realistic market share (Year 5) | 1-2% |
| **SOM** | **$30M-$60M ARR** |

> [FILL IN YOUR OWN NUMBERS — pressure test each assumption]

---

## 3. COMPETITIVE POSITIONING MATRIX

Rate each competitor 1-5 on dimensions that matter to YOUR target customer:

| Dimension | Celonis | SAP Signavio | UiPath PM | Microsoft PM | Apromore | **YOU** |
|-----------|---------|-------------|-----------|-------------|----------|---------|
| Time to value | 2 | 2 | 3 | 3 | 3 | ? |
| Price (5=cheapest) | 1 | 2 | 2 | 4 | 3 | ? |
| Ease of setup | 1 | 2 | 2 | 3 | 3 | ? |
| Depth of analysis | 5 | 4 | 3 | 2 | 4 | ? |
| SAP integration | 5 | 5 | 3 | 2 | 2 | ? |
| Non-SAP support | 3 | 2 | 3 | 3 | 3 | ? |
| Self-serve / PLG | 1 | 1 | 1 | 3 | 2 | ? |
| Open-source/extensible | 1 | 1 | 1 | 1 | 3 | ? |
| India market fit | 2 | 2 | 2 | 3 | 2 | ? |
| AI/LLM capabilities | 4 | 3 | 3 | 3 | 2 | ? |
| Action/automation | 5 | 3 | 5 | 4 | 2 | ? |

> [FILL IN YOUR COLUMN — where do you score 5 that incumbents score 1-2? That's your wedge.]

### Christensen Disruption Analysis

Celonis is a **sustaining innovation** company — they keep making their product better for their best customers (Fortune 500). This creates a **low-end disruption opportunity**:

```
                    Performance
                    │
Celonis trajectory  │         ╱ ← Overshooting mid-market needs
                    │       ╱
                    │     ╱
                    │   ╱
What mid-market     │─╱─────────── ← "Good enough" threshold
actually needs      │╱
                    │
YOUR trajectory     │    ╱
                    │  ╱
                    │╱
                    └────────────── Time
```

**The question**: What is "good enough" for the mid-market? What features can you OMIT?

Celonis features mid-market doesn't need:
- [ ] Orchestration Engine (they don't have 50 systems to orchestrate)
- [ ] 1,000+ connectors (they use 2-3 systems)
- [ ] Object-centric PM (they have simple processes)
- [ ] Enterprise RBAC/SSO (team of 5 doesn't need it)

What they DO need:
- [ ] See their process in 1 hour, not 3 months
- [ ] Understand bottlenecks without hiring a consultant
- [ ] Cost <$500/month (credit card purchase, no procurement)
- [ ] Works with their existing data (warehouse, CSV, database)

> [VALIDATE THIS WITH CUSTOMER INTERVIEWS — don't assume]

---

## 4. BUSINESS MODEL & UNIT ECONOMICS

### Pricing Tiers (Draft — validate with customers)

| Tier | Price | Target | Key Features |
|------|-------|--------|-------------|
| Free | $0 | Individual analysts, students | 1 user, 1 source, limited events |
| Team | $___/mo | Small teams (5-15 people) | Multi-user, dashboards, alerts |
| Business | $___/mo | Mid-market ops teams | SSO, API, unlimited sources |
| Enterprise | Custom | Large orgs, GCCs | Self-hosted, SLA, custom connectors |

> [FILL IN PRICES — talk to 20 prospects first]

### Unit Economics Model

| Metric | Formula | Your Target | Benchmark (Good) |
|--------|---------|-------------|-----------------|
| ACV (Avg Contract Value) | Total ARR / # customers | $___/year | Varies by segment |
| CAC (Customer Acquisition Cost) | Total S&M spend / new customers | $___ | — |
| LTV (Lifetime Value) | ACV × gross margin × (1/churn rate) | $___ | — |
| LTV:CAC ratio | LTV / CAC | ___:1 | >3:1 good, >5:1 great |
| CAC payback (months) | CAC / (ACV × gross margin / 12) | ___ months | <18 good, <12 great |
| Gross margin | (Revenue - COGS) / Revenue | ___% | >70% good, >80% great |
| Net Revenue Retention | (Starting ARR + expansion - contraction - churn) / Starting ARR | ___% | >110% good, >130% great |
| Burn multiple | Net burn / Net new ARR | ___ | <2x good, <1.5x great |
| Magic number | Net new ARR / Prior quarter S&M | ___ | >0.75 good, >1.0 great |

### Revenue Build (3-Year)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Customers (start of year) | 0 | __ | __ |
| New customers added | __ | __ | __ |
| Churned customers | __ | __ | __ |
| Customers (end of year) | __ | __ | __ |
| Average ACV | $__ | $__ | $__ |
| **ARR (end of year)** | **$__** | **$__** | **$__** |
| Revenue (recognized) | $__ | $__ | $__ |
| Gross margin % | __% | __% | __% |
| Headcount | __ | __ | __ |
| Total burn | $__ | $__ | $__ |
| **Cash required** | **$__** | **$__** | **$__** |

> [MODEL THIS IN A SPREADSHEET — this is the core of your fundraising story]

---

## 5. GO-TO-MARKET STRATEGY

### Choose Your GTM Motion

| Motion | When to Use | Examples | Fits PM If... |
|--------|-------------|---------|---------------|
| **PLG** | Low ACV (<$10K), self-serve possible, viral/network effects | Postman, Figma, Notion | You can deliver value in <1 hour without sales |
| **Sales-Led** | High ACV (>$50K), complex buyer, long sales cycle | Celonis, Snowflake | You're targeting enterprise/GCCs from day 1 |
| **Channel-Led** | Established SI relationships, complex implementation | SAP Signavio | You partner with TCS/Infosys/Wipro to sell |
| **Community-Led** | Developer/analyst tool, open-source core | Grafana, dbt | You build for the practitioner, not the buyer |

> [PICK ONE PRIMARY MOTION — you can add a second later. Trying all 4 at once kills startups.]

### Bowling Pin Strategy (Geoffrey Moore)

Pick your **first pin** — the narrowest, most winnable segment:

```
       [Pin 1]          [Pin 2]         [Pin 3]
    First segment    Adjacent segment   Next adjacent
    ┌───────────┐    ┌───────────┐    ┌───────────┐
    │           │    │           │    │           │
    │  ??? ──── │───>│  ??? ──── │───>│  ??? ──── │───> Mass market
    │           │    │           │    │           │
    └───────────┘    └───────────┘    └───────────┘
```

Possible first pins for process mining from Bangalore:

| Pin | Why It Might Work | Risk |
|-----|-------------------|------|
| Bangalore GCCs doing P2P on SAP | Proximity, budget, clear use case | Small # of accounts |
| Indian IT services (internal ops) | They know PM, use SAP, huge orgs | They'll build it themselves |
| Indian mid-market manufacturers | 15K SAP customers, S/4HANA migration | Long sales cycle, low budget |
| Global data teams (via PLG) | Huge market, self-serve | Competitive, needs great product |
| Indian banks (compliance) | RBI mandate, regulatory pull | Slow procurement, risk-averse |

> [PICK ONE. Talk to 20 prospects in that segment before committing.]

---

## 6. WEDGE STRATEGY

**The wedge = your initial product that is 10x better than alternatives for a specific use case.**

Every company in the disruption playbooks started with a wedge:
- Freshworks: Helpdesk for SMBs (not full CRM)
- Postman: API testing for individuals (not API platform)
- Datadog: Infrastructure monitoring (not full observability)
- Snowflake: Cloud data warehouse (not data platform)
- Grafana: Visualization layer (not full stack)

### Your Wedge Options

| Wedge | 10x Claim | Expand To |
|-------|-----------|-----------|
| "Process maps from your warehouse in 5 minutes" | 100x faster than Celonis setup | Full PM platform |
| "P2P audit for Indian SAP customers" | Pre-built, India-priced, GST-aware | All SAP processes |
| "Process observability for data teams" | SQL-native, fits modern data stack | Enterprise PM |
| "AI process analyst" | Ask questions in English, get answers | Full PM + actions |
| "Compliance monitoring for Indian banks" | RBI-mandate ready, pre-built | All BFSI processes |

> [PICK ONE. The best wedge is one where you have unfair advantage (domain, relationships, or technical).]

---

## 7. KEY QUESTIONS TO ANSWER BEFORE BUILDING

These are the questions that separate a plan from a real company. Answer each with evidence, not opinion.

### Customer Discovery (talk to 30+ people)
- [ ] Who has this problem most acutely? (Title, company size, industry)
- [ ] How do they solve it today? (Celonis? Excel? Consultants? Nothing?)
- [ ] What would they pay? (Ask: "If this existed, what budget would it come from?")
- [ ] What's the trigger event? (S/4HANA migration? Audit finding? New VP Ops?)
- [ ] Who signs the check? (Data team lead? VP Ops? CIO? Credit card?)
- [ ] What's the buying process? (Self-serve? POC? RFP? Committee?)

### Technical Validation
- [ ] Can you deliver the wedge value in <1 hour? (Build a prototype and test)
- [ ] What's the hardest technical problem? (SAP extraction? Graph rendering at scale? Real-time?)
- [ ] Build vs buy vs wrap? (Use pm4py? Build from scratch? Wrap open-source?)
- [ ] What's your data architecture? (Warehouse-native? Own storage? Hybrid?)

### Business Validation
- [ ] Can you get 3 LOIs (letters of intent) before writing production code?
- [ ] Is there a design partner willing to use the product weekly and give feedback?
- [ ] What's the minimum team to ship v1? (2 engineers + 1 designer? 4 engineers?)

---

## 8. FUNDRAISING BENCHMARKS

### What VCs Want to See by Stage

| Metric | Pre-Seed | Seed | Series A |
|--------|----------|------|----------|
| ARR | $0 | $0-$500K | $1-3M |
| Customers | 0-3 design partners | 10-30 paying | 50-100+ |
| Team | 2-3 founders | 5-10 | 15-30 |
| Raise | $250K-$1M | $1-4M | $5-15M |
| Key proof point | Problem validated, prototype | PMF signals, retention | Repeatable GTM, unit economics |

### Indian B2B SaaS Benchmarks
- BrowserStack: Bootstrapped 7 years to $20M ARR before raising
- Freshworks: $100M ARR (2018) → IPO (2021) at $300M+ ARR
- Postman: "Ramen profitable" on $10 in-app purchases before raising $1M
- Zoho: Never raised. $1.4B revenue. $12.5B valuation.

### Investor Targets (India-focused B2B SaaS)
- **Pre-seed/Angels**: Kunal Shah, Nithin Kamath, ex-Freshworks/Razorpay founders, iSeed, Speciale Invest
- **Seed**: Blume Ventures, Together Fund, 3one4 Capital, Lightspeed India Scout
- **Series A**: Accel India, Peak XV (Sequoia), Nexus VP, Lightspeed India, Elevation Capital
- **Series A (US)**: Bessemer, a16z, Benchmark, Unusual Ventures (if strong PLG metrics)

---

## 9. 90-DAY PLAN

### Month 1: Validate
- [ ] Customer discovery: 30 conversations (GCC heads, VP Ops, data leads, SAP consultants)
- [ ] Document findings: Who has the pain? How bad? What would they pay?
- [ ] Technical prototype: Can you render a process map from a Postgres table in <5 minutes?
- [ ] Competitive deep-dive: Get Celonis Snap account, Apromore CE, pm4py — understand UX firsthand
- [ ] Pick your wedge based on evidence

### Month 2: Prototype
- [ ] Build working prototype of your wedge
- [ ] Get 3 design partners using it weekly
- [ ] Start fundraising conversations (even if not raising yet — build relationships)
- [ ] Incorporate company

### Month 3: Iterate
- [ ] Ship improvements based on design partner feedback
- [ ] Get first LOI or paid pilot
- [ ] Close pre-seed if raising
- [ ] Start content (blog, community) in your wedge area

---

## 10. DECISION LOG

Track every major decision. Future you will thank present you.

| Date | Decision | Alternatives Considered | Rationale | Revisit By |
|------|----------|------------------------|-----------|------------|
| | | | | |
| | | | | |
| | | | | |
