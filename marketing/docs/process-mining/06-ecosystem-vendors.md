# Process Mining Ecosystem — Vendors, Tools & Market

## 1. Vendor Landscape

### Tier 1 — Market Leaders

**Celonis** (Munich, Germany; founded 2011)
- Dominant market leader; $13B valuation (2022)
- Total funding: $1.37B; ~3,800 employees
- Product: Celonis Process Intelligence Platform (Celocore + OCPM)
- Chief Scientist: Prof. Wil van der Aalst
- Leader in 2025 Gartner MQ (furthest Vision, highest Execution), Forrester Wave Q3 2025, Everest PEAK Matrix 2025 (6th consecutive year)
- Key evolution: Process Mining → Execution Management System (2020) → Process Intelligence → AI-driven orchestration
- Partnered with Microsoft Fabric (2025), Lobster (2025)
- Mondelez selected Celonis for SAP S/4HANA overhaul (Feb 2026)

**SAP Signavio** (acquired by SAP, ~$1.2B, 2021)
- Leader in 2025 Gartner MQ (3rd consecutive year)
- Products: SAP Signavio Process Intelligence + Process Insights (v17.4)
- Deep integration with SAP S/4HANA migration workflows
- 2024 cloud release — SaaS as default even for regulated clients

**IBM** (acquired myInvenio, April 2021)
- Leader in 2025 Gartner MQ
- One-stop-shop: AI-powered automation (process mining + RPA + document processing + workflow)
- myInvenio (originally Cognitive Technology, Malta) integrated into IBM Cloud Pak

**Microsoft** (acquired Minit, March 2022)
- Minit was a Slovak company (founded 2014)
- Integrated as Power Automate Process Mining
- Part of broader Microsoft Power Platform ecosystem
- Adding OCPM capabilities in preview

**UiPath**
- Leader in 2025 Gartner MQ
- Products: Process Mining, Task Mining, Communications Mining (v2024.10)
- Q4 FY2025 revenue: $424M
- Previously acquired ProcessGold and StepShot
- Autopilot and Agent Builder for AI-enhanced automation (March 2025)

### Tier 2 — Major Contenders

| Vendor | Key Detail |
|--------|-----------|
| **Software AG ARIS** | Leader in 2025 Gartner MQ (3rd year). ARIS v10 SR27. Comprehensive BPM + PM + enterprise architecture. |
| **MEHRWERK / mpmX** | Leader in 2025 Gartner MQ (3rd year). Acquired by Fortino Capital (July 2025). 150+ enterprise customers, strong DACH region. |
| **Appian** | Acquired Lana Labs (Berlin, Aug 2021). Integrated into Appian low-code platform. |
| **Pegasystems** | Acquired EverFlow/Accelera Labs (May 2022). Cloud-only with GenAI Blueprint. Plans for headless PM, OCPM, AI agents. |
| **iGrafx** | Leader in Forrester Wave Q3 2025. Decades of process modeling experience. GenAI assistant "Pia". |
| **Apromore** | Leader + Star Performer in Everest 2025 PEAK Matrix. Full Spectrum Process Intelligence. Open-source Community Edition. |

### Tier 3 — Niche / Emerging

| Vendor | Key Detail |
|--------|-----------|
| **ABBYY Timeline** | Challenger in 2025 Gartner MQ (v6.13). Originally TimelinePI (2015). Strong in discovery + task mining. |
| **QPR Software** | Visionary in 2025 Gartner MQ. Finland, founded 1991. QPR ProcessAnalyzer v2024.7. |
| **ServiceNow** | Plans: GenAI for process generation; agentic AI; replatformed UltimateSuite for task mining. |
| **Nintex** | Nintex Process Manager (April 2025). Best for midsize. Consumption-based pricing. |
| **KYP.ai** | Strong Performer in Forrester Wave Q3 2025. Leader in Everest DII PEAK Matrix. "Process intelligence for agentic AI." |
| **Skan.ai** | Captures/analyzes digital interactions within enterprise systems. |
| **Disco / Fluxicon** | Founded by Gunther & Rozinat (2009). Desktop tool, fastest algorithms. ~700 universities. Hosts Process Mining Camp. |
| **UpFlux** | AI-driven PM. Included in Everest PEAK Matrix 2025. |

### Acquisition Timeline

| Year | Acquirer | Target | Rationale |
|------|----------|--------|-----------|
| 2019 | ABBYY | TimelinePI | Document intelligence + PM |
| 2019 | UiPath | ProcessGold | RPA + PM |
| 2021 | IBM | myInvenio | AI automation one-stop-shop |
| 2021 | SAP | Signavio | BPM + PM for S/4HANA |
| 2021 | Appian | Lana Labs | Low-code + PM |
| 2022 | Microsoft | Minit | Power Platform PM |
| 2022 | Pegasystems | EverFlow | Hyperautomation + PM |
| 2023 | Celonis | Symbioworld | AI-driven BPM |
| 2025 | Fortino Capital | MEHRWERK | Independent growth |

---

## 2. Open-Source Tools

| Tool | Language | Description |
|------|----------|-------------|
| **ProM** | Java | Seminal academic tool. 1,500+ plug-ins. De facto reference for academic PM. TU Eindhoven. |
| **pm4py** | Python | Leading Python library. Bridges PM and data science. Discovery, conformance, performance. RWTH Aachen / Fraunhofer FIT. |
| **bupaR** | R | Suite of 8 R packages for business process analysis. Academic/statistical contexts. |
| **Apromore CE** | — | Community Edition of Apromore platform. More advanced than ProM for interactive analysis. |

---

## 3. Adjacent Technology Map

```
                    HYPERAUTOMATION STACK
    ┌──────────────────────────────────────────────┐
    │                                              │
    │  DISCOVER          DETAIL           EXECUTE  │
    │  ┌──────────┐   ┌──────────┐   ┌──────────┐ │
    │  │ Process  │   │ Task     │   │ RPA      │ │
    │  │ Mining   │──>│ Mining   │──>│          │ │
    │  └──────────┘   └──────────┘   └──────────┘ │
    │       │                              │       │
    │       ▼                              ▼       │
    │  ┌──────────┐                  ┌──────────┐  │
    │  │ BPM      │                  │ Low-Code │  │
    │  │ Modeling │                  │ Workflow │  │
    │  └──────────┘                  └──────────┘  │
    │       │                              │       │
    │       └──────────┐  ┌────────────────┘       │
    │                  ▼  ▼                         │
    │            ┌────────────┐                     │
    │            │  AI / ML   │                     │
    │            │  Agents    │                     │
    │            └────────────┘                     │
    │                  │                            │
    │                  ▼                            │
    │          ┌──────────────┐                     │
    │          │ Digital Twin │                     │
    │          │ of Operations│                     │
    │          └──────────────┘                     │
    └──────────────────────────────────────────────┘
```

| Category | Relationship to Process Mining |
|----------|-------------------------------|
| **RPA** | PM discovers automation opportunities; RPA executes them |
| **Task Mining** | Micro-level (desktop clicks/keystrokes) vs PM's macro-level (system events). Complementary. |
| **BPM** | BPM = ideal model (prescriptive); PM = actual execution (descriptive). Converging. |
| **BI** | PM adds process context to traditional dashboards. PM = process-specific drill-down. |
| **Digital Twins** | PM creates "living digital twin" of operations for what-if simulation. |
| **iPaaS** | Facilitates event log extraction across source systems (ERP, CRM, SCM). |
| **Low-Code** | Discovered processes jump-start automation in low-code platforms (Appian model). |
| **AI/ML** | GenAI for NL querying; ML for prediction; Agentic AI for autonomous action. |

---

## 4. Market Data

### Market Size Estimates

| Source | 2024/2025 Value | Forecast | CAGR |
|--------|----------------|----------|------|
| Fortune Business Insights | $3.66B (2025) | $58.18B by 2034 | 34.4% |
| Markets and Markets | $1.8B (2023) | $12.1B by 2028 | 45.6% |
| Grand View Research | $1.4B (2024) | $21.92B by 2030 | 59.4% |
| Mordor Intelligence | $0.72B (2025) | $2.01B by 2031 | 18.64% |
| Gartner | ~$2.3B (2025) | — | ~33% |

*Wide variance reflects different scope definitions — some include adjacent capabilities.*

### Regional Distribution (2025)

| Region | Share | Notes |
|--------|-------|-------|
| **Europe** | 44.2% | Process culture, GDPR compliance, German industrial firms |
| **North America** | 33.7% | Tech innovation hub, early adoption |
| **Asia-Pacific** | Fastest growth (24.9% CAGR) | Industry 4.0, digital transformation budgets |

### Vertical Distribution (2024-2025)

| Vertical | Share | Key Use Cases |
|----------|-------|---------------|
| **BFSI** | 29% | AML, credit approval, fraud detection, claims |
| **Healthcare** | Fastest growth (24.6% CAGR) | Patient pathways, revenue cycle, HIPAA |
| **Manufacturing** | Significant | Production, quality, supply chain |
| **Telecom** | Growing | Onboarding, network expansion, SLA |
| **Government** | Growing | Procurement transparency, sustainability |

---

## 5. Analyst Reports

### Gartner Magic Quadrant for Process Mining Platforms 2025
- April 15, 2025 | Analysts: Srivastava, Kerremans, Sugden
- **16 vendors** evaluated
- Leaders: Celonis, IBM, SAP Signavio, ARIS, MEHRWERK/mpmX
- Challengers: ABBYY
- Visionaries: QPR Software

### Forrester Wave: Process Intelligence Software, Q3 2025
- **15 vendors** across 26 weighted criteria
- Leaders: Celonis, iGrafx
- Strong Performers: KYP.ai

### Everest Group PEAK Matrix 2025
- **23 vendors** (most comprehensive coverage)
- Leaders: Celonis (6th year), Apromore (Star Performer), IBM, UiPath, ABBYY, Microsoft, SAP Signavio

---

## 6. Evolution Path

```
PHASE 1: PROCESS MINING (2004-2016)
│ Academic origins. Discovery + Conformance + Enhancement.
│ Tools: ProM, Disco. Standard: XES.
│ Focus: "What happened?"
│
▼
PHASE 2: PROCESS INTELLIGENCE (2017-2022)
│ Expansion: task mining, simulation, predictive analytics.
│ Celonis EMS (2020). Forrester adopts "process intelligence" term.
│ Digital twin concept applied. OCEL 1.0 (2020).
│ Focus: "Why did it happen? What will happen?"
│
▼
PHASE 3: PROCESS ORCHESTRATION (2023-present)
  Coordinating actions across silos. Celonis Orchestration Engine.
  Agentic AI acting on process intelligence. OCEL 2.0.
  Focus: "What should we do? Do it automatically."
```

---

## 7. Key Conferences & Standards

### Conferences

| Conference | Type | Details |
|-----------|------|---------|
| **ICPM** | Academic + Industry | Flagship PM conference. IEEE CIS co-sponsored. ICPM 2025: Montevideo. ICPM 2026 Industry Days: Karlsruhe. |
| **BPM** | Academic | Premier BPM conference. PM is a major track. Annual, rotating locations. |
| **Process Mining Camp** | Practitioner | Hosted by Fluxicon since 2012. Eindhoven. 2-3 days, practice-focused. |
| **Celosphere** | Industry | Celonis annual conference. Major product announcements. |

### Standards Bodies

| Body | Key Outputs |
|------|-------------|
| **IEEE Task Force on Process Mining** | Process Mining Manifesto (16 languages). XES Standard (1849-2016, 1849-2023). ICPM conference series. Public datasets + courses. |
| **OCEL Standard** | OCEL 1.0 (2020), OCEL 2.0 (2024). Three formats: SQLite, XML, JSON. RWTH Aachen PADS group. |
