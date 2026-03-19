# Celonis Platform — End-to-End Technical Deep Dive

## Platform Architecture

```
Source Systems ──► Data Core (extraction/CDC/zero-copy)
                        │
                   Data Pools (raw tables)
                        │
                   Transformations (CeloSQL)
                        │
                   Object-Centric Data Model (OCDM)
                        │
                   Process Intelligence Graph
                   (enriched with Knowledge Model context)
                        │
              ┌─────────┼─────────┐
              │         │         │
         Studio    Process    Action Flows /
        Views/Apps  Copilot   Orchestration
              │         │         │
              └─────────┼─────────┘
                        │
                  Write-back to source systems
```

---

## 1. Core Components

### Data Core (formerly Celocore)
The data infrastructure layer. Handles ingestion, storage, and query execution.
- **Scale**: 5.6 trillion rows queried, 2 petabytes loaded, 47,000+ active processes
- **Performance**: 20x over alternatives; dashboard load times under 1 second (95% reduction)
- **PQL Engine**: Column-store in-memory database executing ~2 million queries/day at ~370ms average
- **Zero-copy integration**: Databricks (Delta Sharing) and Microsoft Fabric — no data duplication

### Process Intelligence Graph (PI Graph)
A graph data structure where nodes are business objects (Purchase Orders, Invoices, Deliveries, Vendors) and events, connected by typed relationships.

**How it differs from a regular process model**: Traditional PM produces a linear event log with one case ID. The PI Graph is object-centric — a single event ("Create Delivery") can reference multiple objects simultaneously. Continuously updated as new data flows in. Enriched with KPIs, SLAs, benchmarks, process models, enterprise architecture. 60+ pre-built objects and events.

### Knowledge Model (KM)
The semantic/business logic layer between raw data and UI. Contains:
- **Records**: Table/object representations
- **KPIs**: Defined via PQL formulas
- **Filters**: Global or component-scoped PQL statements
- **Variables**: String/number/boolean/object types with unique keys

### Studio
Development environment for apps, views, Knowledge Models, Action Flows, and Process Copilots. Package-based asset management with versioning and deployment.

### Orchestration Engine
Acquired from Emporix, now GA. Coordinates end-to-end process execution across AI agents, human tasks, and system automations. Each step is stateful. Uses trigger events from the PI Graph. Supports conditional logic, timer events, forms with localization, dynamic routing based on multi-dimensional data.

### Action Engine / Action Flows
Low-code/no-code automated workflows built from modules. 80+ third-party integrations. Execution uses cycles and phases with cron-based scheduling, data-job triggers, or manual triggers. Error handling: Break, Commit, Ignore, Resume, Rollback. Rate limit: 500 calls/minute for MCP assets.

### Process Copilot
GenAI conversational interface. Takes natural language, infers intent, generates PQL against the Knowledge Model, returns insights. Can read/write Process Explorer filters, export CSV/PNG, generate emails. Deployable in Slack, Microsoft Teams, or custom systems via AI API.

---

## 2. Data Extraction Architecture

### Three Paradigms

**1. SAP-Specific CDC (Real-Time)**
On-premise middleware between Celonis cloud and SAP. Polls Celonis for job requests, passes parameters to RFC module `/CELONIS/FM_NEW_EXTRACT`. RFC extracts data, writes CSV files in 50k-row chunks to network share. Extractor fetches and pushes to cloud.

For CDC: Transaction `/CELONIS/CLMAN_UI` creates change log tables and installs **database triggers** on source tables capturing INSERT/UPDATE/DELETE. RFC `/CELONIS/EX_CL_NEW` extracts only changed rows, then `/CELONIS/EX_CL_SET_EXTRACTED` flags as processed. True change data capture at the SAP database level.

**2. Batch Extraction**
- Native Extractors: Salesforce, Oracle Fusion, SAP Ariba, Coupa, ServiceNow, Workday
- JDBC Extractors: Any SQL database (Infor LN, BlueYonder, IBM AS/400, QAD, PEGA)
- Python Extractors: Custom
- Kafka Connector: Streaming (open-source, Apache 2.0)
- Extractor Builder: Custom REST/OData APIs returning JSON/XML

**3. Zero-Copy Federation**
Databricks Delta Sharing — raw data stays in lakehouse; transformations reference it at query time. Microsoft Fabric support also available. No extraction needed.

**1,000+ connectors** including Oracle EBS, Salesforce, SAP S/4HANA, ServiceNow, Workday, Snowflake, BigQuery, Azure SQL, PostgreSQL, MySQL, Teradata.

---

## 3. CeloSQL vs PQL

| | CeloSQL | PQL |
|---|---------|-----|
| **Purpose** | Transformation (write) — building the OCDM | Query (read-only) — analytics |
| **Syntax** | Loosely based on Vertica SQL | Omits FROM/WHERE/JOIN (data model pre-defined) |
| **Data types** | BIGINT, BOOLEAN, DATE, DECIMAL, DOUBLE, INTERVAL, TIME, TIMESTAMP, VARBINARY, VARCHAR | 150+ operators including process-specific + ML operators |

---

## 4. OCPM Implementation

**Legacy case-centric**: Events forced into single linear case. One PO with 5 invoices → events duplicated across 5 "cases" → misleading stats.

**OCPM approach**: Events link to all relevant objects natively. One "Create Invoice" event references Invoice, PO, and Vendor simultaneously. No duplication.

**How to build**: Data Modeling Assistant → define object types, event types, relationships. CeloSQL for custom transformations. PQL for analytics.

**OCPM-specific PQL functions**: `LINK_FILTER`, `LINK_PATH`, `LINK_OBJECTS` for navigating multi-object relationships. Analysis tools: Performance Spectrum, Instance Explorer, OCPM Perspectives.

---

## 5. Action & Write-Back

### SAP Write-Back
Connects via on-premise Celonis Agent using RFC calls. Pre-built actions: "Generate Transaction", "Open Prefilled WebGUI Transaction". Generic RFC Call module invokes any remote-enabled function module (including custom Z-functions). Auto-generates input fields from FM parameter definitions. Required SAP role: `AUTOMATION_BASIS`.

### Other Write-Back Integrations
- **ServiceNow**: Full CRUD on tables (create/update/search records)
- **Salesforce**: OAuth connection, standard API operations
- **80+ modules**: Microsoft 365, Google Workspace, Slack, WhatsApp Business, Amazon S3, Box, Snowflake, BigQuery, Databricks, GitHub, UiPath, Automation Anywhere, DocuSign, Workday, Oracle Fusion, Coupa, Infor M3, SAP Ariba
- **Universal**: HTTP/SOAP/FTP/SFTP/JSON/XML/CSV/XLSX modules

---

## 6. AI Capabilities

### AgentC Suite
Framework for feeding process intelligence to external AI agents. Integrates with Microsoft Copilot Studio, IBM watsonx Orchestrate, Amazon Bedrock Agents, Salesforce Agentforce, CrewAI.

### MCP Server Asset
Industry's first Model Context Protocol server for process intelligence (Celosphere 2025). Provides AI agents with tools to search data models, get real-time KPIs, trigger actions, write decisions back. Supports MCP protocol and OpenAPI. Rate limit: 500 calls/minute. Auth: OAuth 2.0 (production), Application Keys (dev/test).

### ML Workbench
Custom ML algorithms integrated into Celonis dashboards. Use cases: Planning Parameter Optimization (consumption pattern analysis), Free-Text Requisition (material recommendations).

### Annotation Builder
No-code GenAI tool generating decision recommendations shown in analytics views.

---

## 7. SDK & APIs

### PyCelonis SDK (Python)
Client library for Celonis EMS API. Python 3.8/3.9/3.10. Covers Studio (analyses, KMs, Action Flows, packages), Data Integration (pools, tables, models, push jobs), and **SaolaPy** (pandas-like query engine for PQL execution with Series/DataFrame operations).

### REST APIs
- Standard Data Ingestion API (push real-time data)
- CPM Reporting API
- Process Intelligence APIs (Knowledge Model, Event Subscription, AI/Chat)
- Platform Usage APIs (audit logs, team management)
- ML Workbench APIs

### Authentication
OAuth 2.0 with scopes, API Keys, Application Keys. SAML SSO and OIDC for platform access.

---

## 8. Marketplace
- **500+ ready-to-install assets**: Apps, Connectors, Action Flows, Experiences
- **20+ Process Connector Templates**: Pre-configured pipelines per source system
- Contributors: Celonis-built + ecosystem partner-built
- Examples: Accounts Payable, Accounts Receivable, P2P, O2C, Three-Way Matching

---

## 9. Pricing

Pricing is opaque by design:
- **Model**: SaaS subscription. Not consumption-based. Varies by users, data volume, features.
- **Entry point**: ~$30K/year for base subscription
- **Enterprise contracts**: $100K-$2.3M+/year. Multi-year (3-year minimum typical). ~20% discount for multi-year commitments.
- **Free tier**: Celonis Snap (limited functionality, 3,500+ registrants)
- **Financials**: ~$771M ARR (2023), 39% growth. 1,400+ customers. Secondary market valuation ~$7.7B (2024), down from $13.2B peak. Total funding: $2.4B. 44.4% PM market share (2021).

---

## 10. Implementation Timeline

### Celonis Methodology: 3 Phases

**Initiate (2-4 weeks)**: Requirements workshops, feasibility assessment, value opportunity identification, project planning.

**Implement (4-12 weeks)**: Data extraction setup, transformation/modeling, data model validation, app/view configuration, UAT, asset validation.

**Adopt (ongoing)**: Power user identification, continuous enablement, tracking common questions, handover.

### Real-World Benchmarks
- Out-of-the-box (Marketplace connectors/apps): **1-2 months** end-to-end
- Complex custom use cases (e.g., Three-Way Matching): **4-5 months** for first market
- Rollout to additional units after initial deployment: **< 1 month**
- SAP extraction setup: 1-3 weeks

### Typical Project Team
Celonis Solution Architect, customer IT/data engineer, customer process owner/BA, optionally a system integrator (Accenture, Deloitte, EY). Power users identified during Adopt phase.

---

## 11. Security & Compliance

- ISO 9001:2015, ISO 27001:2013, ISO 27701:2019
- SOC 1 Type 2, SOC 2 Type 1 and Type 2 (first PM vendor)
- CSA-STAR Level 1, TISAX (automotive)
- GDPR compliant data processing
- Encryption: AES-128 minimum for connections, AES-256 for data at rest and backups
- RBAC: Granular permissions at platform/data pool/data model/analysis/action flow level
- OAuth 2.0, SAML, OIDC, 2FA, IP restrictions, session timeouts, audit logs
