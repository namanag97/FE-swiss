# Process Mining Domain Maps — Use Cases by Business Process

## 1. Procure-to-Pay (P2P)

### Sub-Processes
1. Requisition Creation and Approval
2. Supplier Selection and Sourcing
3. Purchase Order (PO) Creation and Dispatch
4. Goods Receipt / Service Entry
5. Invoice Receipt and Verification
6. Three-Way Matching (PO vs. Goods Receipt vs. Invoice)
7. Payment Processing and Settlement
8. Supplier Evaluation and Management

### Key KPIs

| KPI | Description |
|-----|-------------|
| Invoice Processing Time | End-to-end from invoice receipt to payment |
| Three-Way Match Rate | % invoices passing automated matching without manual intervention |
| Cash Discount Realization Rate | % of available early-payment discounts captured |
| Late Payment Rate | % invoices paid after due date |
| Maverick Buying Rate | % purchases outside approved contracts/catalogs |
| PO Accuracy Rate | % purchase orders requiring no amendments |
| Duplicate Payment Rate | Frequency of double payments |
| Touchpoints per Invoice | Number of human interactions per invoice |
| First-Time-Right Rate | % invoices processed correctly on first pass |
| Cost per Invoice | Total processing cost per invoice |

### Common Process Mining Findings
- Maverick spending bypassing approved suppliers
- Split POs to circumvent approval thresholds
- Rework loops from PO/invoice mismatches
- Three-way matching bottlenecks (missing goods receipts)
- Late payments caused by approval routing delays
- Duplicate invoices hiding in high-volume flows
- Retroactive PO creation (invoice before PO)
- Supplier pricing deviations from contract terms

### SAP Tables
EKKO (PO Header), EKPO (PO Items), EKBE (PO History), RBKP (Invoice Header), RSEG (Invoice Items), BKPF (Accounting Header), BSEG (Accounting Items), EBAN (Purchase Requisition)

---

## 2. Order-to-Cash (O2C)

### Sub-Processes
1. Order Entry / Sales Order Creation
2. Credit Check and Management
3. Order Fulfillment / Picking and Packing
4. Shipping and Delivery
5. Invoicing / Billing
6. Accounts Receivable Management
7. Cash Application and Payment Matching
8. Dispute and Deduction Management
9. Dunning and Collections

### Key KPIs

| KPI | Description |
|-----|-------------|
| Days Sales Outstanding (DSO) | Average days to collect payment after invoice |
| Collection Effectiveness Index (CEI) | Ratio of collected receivables to total due |
| Invoice Accuracy Rate | % error-free invoices |
| Order-to-Delivery Cycle Time | Time from order to delivery |
| Perfect Order Rate | % orders: on time, complete, damage-free, correct docs |
| Dispute Resolution Time | Average time to resolve customer disputes |
| Cash Application Accuracy | % payments correctly auto-matched to invoices |
| On-Time Delivery Rate | % delivered by promised date |
| Return Rate | % orders returned |
| Revenue Leakage Rate | Revenue lost through pricing errors, unapplied credits |

### Common Findings
- Credit blocks causing unnecessary delays for low-risk customers
- Manual order re-entry errors from multiple channels
- Delivery scheduling bottlenecks invisible in standard reporting
- High variance in invoice creation timing after delivery
- Collections teams disconnected from credit decisions
- Unnecessary manual touchpoints in cash application
- Rework loops between sales, logistics, and finance

### SAP Tables
VBAK (Sales Order Header), VBAP (Sales Order Items), LIKP (Delivery Header), LIPS (Delivery Items), VBRK (Billing Header), VBRP (Billing Items), BKPF, BSEG

---

## 3. Record-to-Report (R2R)

### Sub-Processes
1. Data Collection and Transaction Recording
2. Journal Entry Creation and Posting
3. Intercompany Transactions and Eliminations
4. Account Reconciliation (Balance Sheet, Bank, Intercompany)
5. Period-End Adjustments (Accruals, Provisions, Revaluations)
6. Financial Close (Sub-ledger, General Ledger)
7. Financial Statement Preparation
8. Management Reporting
9. Statutory and Regulatory Reporting
10. Audit Support and Documentation

### Key KPIs

| KPI | Description |
|-----|-------------|
| Period-End Close Cycle Time | Days to close books after period end |
| Journal Entry Compliance Rate | Adherence to authorization/coding standards |
| Reconciliation Accuracy Rate | Precision of account reconciliations |
| Automation Rate | % journal entries created automatically |
| First-Time Error-Free Entries | % entries requiring no correction |
| Adjusting Entry Rate | Number of post-close adjustments |
| Audit Finding Rate | Issues flagged in audit |

### Common Findings
- Rework in journal entry posting (incorrect account coding)
- Intercompany reconciliation bottlenecks delaying close
- Manual reconciliation steps that could be automated
- Late sub-ledger closes cascading to general ledger
- Inconsistent close procedures across entities/regions
- Excessive post-close adjusting entries (upstream data quality)

---

## 4. Hire-to-Retire (H2R)

### Sub-Processes
1. Workforce Planning and Headcount Approval
2. Job Requisition and Posting
3. Candidate Screening and Selection
4. Offer Management and Negotiation
5. Pre-boarding and Background Checks
6. Onboarding (IT provisioning, training, policy acknowledgment)
7. Compensation and Benefits Administration
8. Performance Management
9. Learning and Development
10. Internal Mobility and Transfers
11. Leave Management
12. Offboarding / Separation / Retirement

### Key KPIs

| KPI | Description |
|-----|-------------|
| Time-to-Hire | Days from requisition to start date |
| Onboarding Cycle Time | Days to complete all onboarding steps |
| Time-to-Productivity | Time until new hire reaches expected performance |
| Employee Turnover Rate | Voluntary + involuntary separation rates |
| Onboarding Completion Rate | % steps completed on time |
| Cost-per-Hire | Total recruitment cost per hire |
| Offer Acceptance Rate | % offers accepted |
| Offboarding Compliance Rate | % separations following complete protocol |

### Common Findings
- Approval bottlenecks in position creation
- Background check delays extending time-to-hire
- Inconsistent onboarding across departments
- IT provisioning as persistent bottleneck
- Non-compliant offboarding (access not revoked, equipment not returned)

### Data Sources
Workday, SAP SuccessFactors, ADP Workforce Now, UKG Pro, Ceridian Dayforce

---

## 5. Plan-to-Produce

### Sub-Processes
1. Demand Planning and Forecasting
2. Material Requirements Planning (MRP)
3. Production Order Creation
4. Production Scheduling and Sequencing
5. Raw Material Staging and Availability Check
6. Production Execution
7. Quality Inspection and Testing
8. Goods Receipt from Production
9. Engineering Change Management
10. Scrap and Rework Processing

### Key KPIs

| KPI | Description |
|-----|-------------|
| OEE (Overall Equipment Effectiveness) | Availability × Performance × Quality (100% = perfect) |
| First Pass Yield (FPY) | % units correct without rework |
| Cycle Time | Time to complete one unit |
| Takt Time | Required pace to meet demand |
| Schedule Adherence | Closeness to planned schedule |
| Scrap Rate | % defective/unusable output |
| Changeover Time | Time lost switching between runs |

### Common Findings
- Rework loops correlated with specific machines/operators/materials
- Production order sequence deviations from plan
- Quality deviations causing throughput delays
- Engineering changes creating cascading disruptions
- Bottlenecks at specific workstations
- Unplanned downtime patterns not visible in standard MES reporting

---

## 6. Issue-to-Resolution (ITSM)

### Sub-Processes
1. Incident Logging and Categorization
2. Priority and Severity Assignment
3. Initial Diagnosis / L1 Support
4. Escalation to L2 and L3 Support
5. Investigation and Root Cause Analysis
6. Resolution Implementation
7. User Confirmation and Closure
8. Knowledge Base Update
9. Problem Management (recurring incidents)
10. Change Management (if needed)

### Key KPIs

| KPI | Description |
|-----|-------------|
| MTTR (Mean Time to Resolve) | Average incident creation → resolution time |
| First-Contact Resolution (FCR) | % resolved at L1 without escalation |
| SLA Adherence Rate | % incidents resolved within SLA |
| Reassignment Count | Times a ticket bounces between groups |
| Reopen Rate | % incidents reopened after resolution |
| Backlog Aging | Number and age of open unresolved incidents |
| Cost per Ticket | Total resolution cost per ticket |
| CSAT Score | Customer satisfaction |

### Common Findings
- Excessive "ping-pong" reassignments (resolution time drops 65% when optimized)
- Tickets reopened from incomplete resolution
- Misrouting at categorization causing unnecessary escalation
- SLA breaches correlated with specific teams/periods/ticket types
- Automation candidates: routine tickets with repetitive resolution paths
- Knowledge base gaps causing repeated incidents

### Data Sources
ServiceNow (primary), Jira Service Management, BMC Remedy, Zendesk

---

## 7. Patient-to-Outcome (Healthcare)

### Sub-Processes
1. Patient Registration and Intake
2. Insurance Verification and Pre-authorization
3. Triage and Initial Assessment
4. Diagnostic Testing and Lab Orders
5. Clinical Decision-Making and Treatment Planning
6. Treatment Delivery
7. Inpatient Stay Management
8. Discharge Planning
9. Post-Discharge Follow-up
10. Billing and Claims Submission

### Key KPIs

**Time**: Length of Stay (LOS), Wait Time (ED/OR/radiology), Door-to-Treatment Time, Discharge Processing Time

**Clinical**: Readmission Rate (30-day), Mortality Rate, Complication Rate, Clinical Pathway Adherence

**Financial**: Cost per Case, Revenue per Bed Day, Claim Denial Rate, Revenue Cycle Time

**Resource**: Bed Occupancy Rate, Staff Utilization, OR Utilization, Equipment Turnaround Time

### Common Findings
- Patient flow bottlenecks in ED-to-bed transitions
- Duplicate insurance verifications ($5M+ savings found at one hospital)
- Compliance improving from 40% to 87% with PM
- Unnecessary diagnostic test ordering creating delays
- Discharge delays (pharmacy, transport, paperwork)
- Clinical pathway variation for same diagnosis across departments

---

## 8. Claim-to-Settlement (Insurance)

### Sub-Processes
1. First Notice of Loss (FNOL) / Claim Intake
2. Claim Registration and Documentation
3. Coverage Verification
4. Claim Assessment and Investigation
5. Fraud Screening and Detection
6. Loss Adjustment and Estimation
7. Approval and Authorization
8. Payment / Settlement
9. Subrogation and Recovery
10. Claim Closure

### Key KPIs

| KPI | Description |
|-----|-------------|
| STP Rate | % claims processed without manual intervention |
| Claims Cycle Time | FNOL to settlement |
| Leakage Rate | Money paid on fraudulent/inflated claims not caught |
| Re-open Rate | Claims reopened after settlement |
| Fraud Alert Rate | % claims flagged for review |
| Investigation-to-Recovery Ratio | Value recovered vs investigation cost |

### Common Findings
- Bottlenecks in document processing and handoffs
- Fraud patterns: frequent claims from same customer, similar characteristics
- Manual steps persisting where automation should exist (STP candidates)
- Coverage verification delays causing downstream cascading
- Inconsistent adjudication paths for similar claim types

---

## 9. Lead-to-Revenue (Sales)

### Sub-Processes
1. Lead Generation and Capture
2. Lead Qualification and Scoring
3. MQL to SQL Handoff
4. Opportunity Creation and Pipeline Entry
5. Needs Analysis and Solution Design
6. Proposal / Quote Generation
7. Negotiation and Contracting
8. Close (Won/Lost)
9. Order Handoff to Fulfillment
10. Account Management and Expansion

### Key KPIs

| KPI | Description |
|-----|-------------|
| Lead-to-Opportunity Conversion | % leads becoming qualified opportunities |
| Win Rate | % opportunities resulting in closed-won |
| Sales Cycle Length | Average days from opportunity to close |
| Pipeline Velocity | (Opportunities × Win Rate × Avg Deal) / Cycle Length |
| Stage Duration | Average time in each pipeline stage |
| Average Deal Size | Mean contract value |
| CAC | Customer Acquisition Cost |
| Pipeline Coverage Ratio | Pipeline value vs quota |

**Industry benchmarks**: SQL-to-opportunity ~42% (mid-market B2B SaaS); opportunity-to-close ~39%; lead-to-customer end-to-end 1-5%.

### Common Findings
- Bottleneck stages where deals stall (often proposal or legal review)
- Sales handoff failures between marketing and sales
- Zombie deals lingering without advancement
- Inconsistent quoting extending cycle times
- High-value deals receiving same treatment as low-value
- CRM data hygiene distorting pipeline accuracy

### Data Sources
Salesforce, HubSpot, Microsoft Dynamics 365, Pipedrive
