# Sancalana — Detailed Value Equation Model

## How to Use This Document

This is the **operational value model** for Sancalana. It takes a prospect's actual business inputs and produces a quantified dollar value of what process mining delivers to their organization. Use it for:
- Sales discovery conversations (live calculation with the prospect)
- Business case documents for CFO/procurement
- Pricing decisions (price should be 10-20% of projected value)
- Marketing content (industry-specific ROI claims)
- Internal prioritization (which segments get the most value?)

---

# SECTION 1: THE MASTER VALUE EQUATION

## 1.1 The Formula

```
TOTAL VALUE TO CUSTOMER =
    Direct Savings (hard $)
  + Working Capital Freed ($ × cost of capital)
  + Revenue Protected/Accelerated ($)
  + Risk & Compliance Value ($ × probability)
  + Productivity Gains (hours × loaded cost)
  + Strategic/Optionality Value (qualitative, not in primary calc)
  ─────────────────────────────────────────
  MINUS
    Sancalana Cost (license + implementation + internal effort)
  ─────────────────────────────────────────
  = NET VALUE DELIVERED
```

## 1.2 Customer Input Variables

Before calculating value, collect these during discovery:

### Company Profile
| Variable | Symbol | How to Get It | Example |
|----------|--------|---------------|---------|
| Annual revenue | `REV` | Public filings, ask directly | $2B |
| Annual addressable spend (AP) | `AP_SPEND` | Ask CFO/finance team | $800M |
| Annual receivables (AR) | `AR_REV` | Ask CFO/finance team | $1.5B |
| Number of employees | `EMP` | Public/LinkedIn | 15,000 |
| Industry | `IND` | Known | Manufacturing |
| ERP system | `ERP` | Ask IT/discovery | SAP ECC |
| Number of suppliers | `SUPPLIERS` | Ask procurement | 5,000 |
| Number of customers | `CUSTOMERS` | Ask sales/finance | 2,000 |

### Process Volume Metrics
| Variable | Symbol | How to Get It | Example |
|----------|--------|---------------|---------|
| Annual purchase orders | `PO_VOL` | Ask procurement | 200,000 |
| Annual invoices processed (AP) | `INV_VOL` | Ask AP team | 500,000 |
| Annual sales orders | `SO_VOL` | Ask order management | 150,000 |
| Annual IT tickets | `TICKET_VOL` | Ask IT/ServiceNow | 100,000 |
| Current cost per invoice | `COST_INV` | Ask AP; if unknown, use $12 | $12 |
| Current cost per PO | `COST_PO` | Ask procurement; if unknown, use $8 | $8 |
| Current cost per ticket | `COST_TICKET` | Ask IT; if unknown, use $20 | $20 |

### Current Performance Metrics (Baseline)
| Variable | Symbol | How to Get It | Default if Unknown |
|----------|--------|---------------|-------------------|
| Cash discount capture rate | `CD_RATE` | Ask AP | 50% |
| Average cash discount % | `CD_PCT` | Ask AP | 2% |
| Current DSO (days sales outstanding) | `DSO` | Ask finance | 55 days |
| Current DPO (days payable outstanding) | `DPO` | Ask finance | 35 days |
| Invoice STP (straight-through processing) rate | `STP_RATE` | Ask AP | 40% |
| Sales order automation rate | `SO_AUTO` | Ask order mgmt | 35% |
| ITSM first-contact resolution rate | `FCR_RATE` | Ask IT | 65% |
| SLA adherence rate | `SLA_RATE` | Ask IT | 88% |
| Company's cost of capital (WACC) | `WACC` | Ask finance; if unknown, use 10% | 10% |
| Fully loaded cost per FTE | `FTE_COST` | Ask HR; if unknown, use industry default | $80K (India: $25K) |
| Hours per FTE per year | `FTE_HOURS` | Standard | 2,000 |

---

# SECTION 2: VALUE LEVER FORMULAS — PROCURE-TO-PAY (P2P)

P2P is the most common starting point. Highest data readiness, fastest ROI, most benchmarks.

## 2.1 Cash Discount Capture

**What it is:** Companies negotiate early-payment discounts (typically 2/10 Net 30 — 2% discount if paid within 10 days). Most companies miss 40-60% of these because invoices get stuck in approval workflows.

**Formula:**
```
Annual Cash Discount Value =
    AP_SPEND
  × DISCOUNT_ELIGIBLE_PCT       (% of spend eligible for discounts; default 30%)
  × CD_PCT                       (average discount rate; default 2%)
  × (TARGET_CD_RATE - CD_RATE)   (improvement in capture; target 90-95%)

Example ($800M AP spend):
= $800M × 30% × 2% × (92% - 50%)
= $800M × 0.30 × 0.02 × 0.42
= $2.016M / year
```

**Benchmark range:** $0.5M - $40M/year depending on company size
- Deutsche Telekom: EUR 40M/year (96% capture on EUR 7B spend)
- Fresenius Kabi: captured additional $550K (from 40% → 97%)

**Confidence level:** HIGH (80%) — this is a hard saving that shows up on P&L

## 2.2 Duplicate Payment Prevention

**What it is:** Companies accidentally pay the same invoice multiple times. Industry average: 0.1-0.5% of total AP spend is duplicated. Process mining catches patterns human reviewers miss.

**Formula:**
```
Annual Duplicate Prevention Value =
    AP_SPEND
  × DUPLICATE_RATE               (current duplicate rate; default 0.3%)
  × RECOVERY_RATE                (% of duplicates preventable; default 80%)

Example ($800M AP spend):
= $800M × 0.003 × 0.80
= $1.92M / year
```

**Benchmark range:** $0.2M - $5M/year
- Deutsche Telekom: EUR 3M/year
- Industrial manufacturer: $620K recovered per quarter + $300K/quarter ongoing

**Confidence level:** HIGH (90%) — directly verifiable from payment records

## 2.3 Maverick Spend Reduction

**What it is:** Purchases made outside negotiated contracts (wrong supplier, wrong price, bypassing procurement). Process mining identifies who, when, and why.

**Formula:**
```
Annual Maverick Spend Value =
    AP_SPEND
  × MAVERICK_RATE                (current off-contract %; default 20%)
  × MAVERICK_PREMIUM             (premium paid for off-contract; default 15%)
  × CAPTURE_RATE                 (% of maverick spend we can redirect; default 40%)

Example ($800M AP spend):
= $800M × 0.20 × 0.15 × 0.40
= $9.6M / year
```

**Note:** This is often the largest value lever but hardest to realize — requires organizational change, not just visibility.

**Benchmark range:** $1M - $15M/year
- Global medical device company: >$1M in 3 months

**Confidence level:** MEDIUM (50%) — requires behavior change, not just detection

## 2.4 Invoice Processing Cost Reduction

**What it is:** Increasing straight-through processing (STP) rate reduces the cost per invoice. Manual invoices cost $12-15; automated invoices cost $2-5.

**Formula:**
```
Annual Invoice Processing Value =
    INV_VOL
  × (COST_INV - TARGET_COST_INV)
  × (TARGET_STP - STP_RATE)

Simplified version:
= INV_VOL × COST_INV × STP_IMPROVEMENT × AUTOMATION_SAVINGS_PCT

Where:
- STP_IMPROVEMENT = (TARGET_STP - STP_RATE); target 80-85%
- AUTOMATION_SAVINGS_PCT = 65% (avg cost reduction per automated invoice)

Example (500K invoices, $12/invoice, STP from 40% to 80%):
= 500,000 × $12 × 0.40 × 0.65
= $1.56M / year

Alternative (FTE-based calculation):
= INVOICES_PER_FTE_CURRENT vs INVOICES_PER_FTE_TARGET
  → FTEs freed × FTE_COST

Industry benchmark:
- Manual: ~5,000 invoices/FTE/year
- Automated: ~20,000 invoices/FTE/year
- 500K invoices: 100 FTEs manual → 25 FTEs automated = 75 FTEs freed
- At $80K loaded cost: 75 × $80K = $6M (but realistic reallocation is ~40%)
- Realistic value: $2.4M
```

**Benchmark range:** $0.5M - $6M/year
- Tech Data: 95% automated invoicing
- Forrester composite: $1.7M from invoice automation (3 years)

**Confidence level:** MEDIUM-HIGH (70%) — depends on ERP/AP system capabilities

## 2.5 P2P Cycle Time Reduction (Working Capital)

**What it is:** Faster P2P cycle time means better DPO management. Each day of DPO improvement frees working capital.

**Formula:**
```
Working Capital Value =
    (AP_SPEND / 365)              (daily AP spend)
  × DPO_IMPROVEMENT_DAYS          (days of DPO improvement; benchmark 10-30 days)
  × WACC                          (cost of capital; default 10%)

Example ($800M AP spend, 15 days DPO improvement, 10% WACC):
= ($800M / 365) × 15 × 0.10
= $2.19M × 15 × 0.10
= $329K / year in financing cost savings

But the WORKING CAPITAL FREED is:
= $2.19M × 15 = $32.9M freed on balance sheet
```

**Benchmark range:**
- Working capital freed: $5M - $50M
- Annual financing value: $200K - $5M
- IQVIA: $600K freed, +32 days DPO
- Accenture: $35M working capital freed

**Confidence level:** MEDIUM (50%) — depends on payment term flexibility

## 2.6 Total P2P Value Summary

```
TOTAL P2P VALUE =
    Cash Discounts         ($2.0M)    × 80% confidence = $1.60M
  + Duplicate Prevention   ($1.9M)    × 90% confidence = $1.73M
  + Maverick Spend         ($9.6M)    × 50% confidence = $4.80M
  + Invoice Processing     ($1.6M)    × 70% confidence = $1.09M
  + Working Capital (fin)  ($0.3M)    × 50% confidence = $0.16M
  ─────────────────────────────────────────────────────────────
  CONSERVATIVE TOTAL (weighted)     = $9.38M / year

  For a company with $800M AP spend.

  Rule of thumb: P2P value ≈ 0.5-2% of AP spend (conservative)
```

---

# SECTION 3: VALUE LEVER FORMULAS — ORDER-TO-CASH (O2C)

## 3.1 DSO Reduction (Cash Flow)

**What it is:** Collecting receivables faster reduces DSO and frees working capital. Process mining identifies which customers pay late, which processes cause delays, and where collection efforts should focus.

**Formula:**
```
Working Capital Freed =
    (AR_REV / 365)                 (daily revenue)
  × DSO_IMPROVEMENT_DAYS           (target: 5-20 days improvement)

Annual Financing Value =
    Working Capital Freed × WACC

Example ($1.5B AR revenue, 10-day DSO improvement, 10% WACC):
Working Capital Freed = ($1.5B / 365) × 10 = $41.1M
Annual Financing Value = $41.1M × 0.10 = $4.11M / year
```

**Benchmark range:**
- DSO improvement: 5-20 days
- Working capital freed: $10M - $200M+ (GE Healthcare: $1.3B)
- Annual financing value: $1M - $20M+

**Confidence level:** MEDIUM-HIGH (60%) — proven, but requires collection process changes

## 3.2 Order Block Removal (Revenue Acceleration)

**What it is:** Sales orders get blocked for credit checks, pricing discrepancies, inventory issues. Process mining identifies which blocks are unnecessary and automates resolution.

**Formula:**
```
Revenue Acceleration Value =
    SO_VOL
  × AVG_ORDER_VALUE               (average order value)
  × BLOCK_RATE                    (% of orders blocked; default 15-25%)
  × UNNECESSARY_BLOCK_PCT          (% of blocks that are avoidable; default 40%)
  × DAYS_BLOCKED                   (avg days orders stay blocked; default 3-5 days)
  × (REVENUE_IMPACT_PER_DAY)       (daily cost of delayed revenue)

Simplified:
= ANNUAL_BLOCKED_REVENUE × (DAYS_SAVED / 365) × MARGIN_RATE

Example ($1.5B revenue, 20% blocked, 40% avoidable, 4 days saved):
Blocked revenue = $1.5B × 0.20 = $300M
Avoidable blocked revenue = $300M × 0.40 = $120M
Revenue acceleration = $120M × (4 / 365) = $1.32M (gross margin impact)
At 40% margin: $1.32M × 0.40 = $526K / year
```

**Benchmark range:** $0.5M - $5M/year
- Forrester composite: $3.3M over 3 years from order block removal
- PepsiCo: order rejection 30% → 4%

**Confidence level:** MEDIUM (50%)

## 3.3 Sales Order Automation

**What it is:** Increasing straight-through processing for sales orders reduces manual intervention, speeds fulfillment, and reduces errors.

**Formula:**
```
Order Automation Value =
    SO_VOL
  × COST_PER_MANUAL_ORDER          (default $15-25)
  × (TARGET_SO_AUTO - SO_AUTO)      (automation improvement; target 80-86%)

Example (150K orders, $20/manual order, automation from 35% to 80%):
Manual orders currently: 150K × (1 - 0.35) = 97,500
Manual orders target: 150K × (1 - 0.80) = 30,000
Orders automated: 67,500
Value = 67,500 × $20 × 0.65 (saving per automated order) = $877K / year
```

**Benchmark range:** $0.5M - $25M/year
- Forrester composite: $24.5M from delivery cycle optimization (3 years)
- Siemens: 24% automation rate increase, 10M fewer manual touches/year

**Confidence level:** MEDIUM (50%) — depends on ERP capabilities

## 3.4 Customer Retention (Revenue Protection)

**What it is:** Better order fulfillment and delivery performance reduces customer churn.

**Formula:**
```
Revenue Protection Value =
    AR_REV
  × CHURN_REDUCTION                 (% point churn improvement attributable to PM)
  × GROSS_MARGIN

Example ($1.5B revenue, 0.5% churn reduction, 40% margin):
= $1.5B × 0.005 × 0.40
= $3.0M / year
```

**Confidence level:** LOW (25%) — hard to attribute directly to process mining

## 3.5 Total O2C Value Summary

```
TOTAL O2C VALUE =
    DSO Reduction (financing)  ($4.1M)   × 60% = $2.46M
  + Order Block Removal        ($0.5M)   × 50% = $0.26M
  + Order Automation           ($0.9M)   × 50% = $0.44M
  + Customer Retention         ($3.0M)   × 25% = $0.75M
  ────────────────────────────────────────────────────────
  CONSERVATIVE TOTAL (weighted)         = $3.91M / year

  Plus: $41.1M working capital freed (balance sheet impact)

  Rule of thumb: O2C value ≈ 0.2-1% of AR revenue (conservative)
```

---

# SECTION 4: VALUE LEVER FORMULAS — IT SERVICE MANAGEMENT (ITSM)

## 4.1 Ticket Cost Reduction

**Formula:**
```
Ticket Cost Value =
    TICKET_VOL
  × (COST_TICKET - TARGET_COST_TICKET)

Where TARGET_COST_TICKET = COST_TICKET × (1 - COST_REDUCTION_PCT)
Default COST_REDUCTION_PCT = 35%

Example (100K tickets, $20/ticket, 35% cost reduction):
= 100,000 × ($20 - $13)
= $700K / year
```

## 4.2 SLA Penalty Avoidance

**Formula:**
```
SLA Value =
    TICKET_VOL
  × (1 - SLA_RATE)                  (current SLA breach %)
  × SLA_IMPROVEMENT                  (% reduction in breaches; default 40-60%)
  × AVG_SLA_PENALTY                  (avg penalty per breach; default $50-500)

Example (100K tickets, 12% breach rate, 50% improvement, $100/breach):
= 100,000 × 0.12 × 0.50 × $100
= $600K / year
```

## 4.3 Productivity Gain (Faster Resolution)

**Formula:**
```
Productivity Value =
    TICKET_VOL
  × AVG_RESOLUTION_TIME_HOURS        (current avg; default 12 hours)
  × RESOLUTION_IMPROVEMENT            (% reduction; default 40%)
  × (FTE_COST / FTE_HOURS)            (cost per hour)
  × AFFECTED_EMPLOYEE_FACTOR          (productivity of requestor + resolver)

Simplified (just IT staff time):
= TICKET_VOL × TIME_SAVED_PER_TICKET × HOURLY_RATE

Example (100K tickets, 2 hours saved per ticket, $40/hour):
= 100,000 × 2 × $40
= $8.0M / year (gross)
× 25% attributable to PM = $2.0M / year
```

**Note:** LinkedIn reported 300,000+ working hours returned to employees through ITSM process mining.

## 4.4 Total ITSM Value Summary

```
TOTAL ITSM VALUE =
    Ticket Cost Reduction    ($700K)   × 70% = $490K
  + SLA Penalty Avoidance    ($600K)   × 60% = $360K
  + Productivity Gain        ($2.0M)   × 25% = $500K
  ───────────────────────────────────────────────────
  CONSERVATIVE TOTAL (weighted)       = $1.35M / year

  Rule of thumb: ITSM value ≈ $8-15 per ticket per year
```

---

# SECTION 5: VALUE LEVER FORMULAS — SUPPLY CHAIN

## 5.1 Inventory Optimization

**Formula:**
```
Inventory Value =
    ANNUAL_COGS
  × (CURRENT_DIO - TARGET_DIO) / 365     (inventory days improvement)
  × WACC

Working Capital Freed =
    (ANNUAL_COGS / 365) × DIO_IMPROVEMENT

Example ($600M COGS, 10 days DIO improvement, 10% WACC):
Working Capital Freed = ($600M / 365) × 10 = $16.4M
Annual Financing Value = $16.4M × 0.10 = $1.64M / year
```

**Benchmark:** Siemens: $8.7M EVA from digital inventory optimization

## 5.2 Logistics & Transportation

**Formula:**
```
Logistics Value =
    ANNUAL_LOGISTICS_COST
  × OPTIMIZATION_PCT                      (consolidation + routing; default 10-20%)

Example ($50M logistics spend, 15% optimization):
= $50M × 0.15
= $7.5M / year
```

**Benchmark:** Forrester composite: $5.7M transportation savings (3 years)

## 5.3 On-Time Delivery Improvement

**Formula:**
```
OTD Value =
    LATE_DELIVERY_PENALTY_COST
  + (CUSTOMER_SATISFACTION_IMPACT × REVENUE_AT_RISK × CHURN_REDUCTION)
  + EXPEDITING_COST_SAVED

Example:
Late delivery penalties avoided: $500K
Reduced expediting costs: $200K
Customer retention: $1M
Total = $1.7M / year
```

## 5.4 Total Supply Chain Value

```
TOTAL SUPPLY CHAIN VALUE =
    Inventory (financing)    ($1.6M)   × 50% = $0.82M
  + Logistics               ($7.5M)   × 40% = $3.00M
  + On-Time Delivery         ($1.7M)   × 40% = $0.68M
  ─────────────────────────────────────────────────────
  CONSERVATIVE TOTAL (weighted)       = $4.50M / year

  Plus: $16.4M working capital freed (balance sheet)
```

---

# SECTION 6: VALUE LEVER FORMULAS — COMPLIANCE & RISK

## 6.1 Audit Cost Reduction

**Formula:**
```
Audit Value =
    NUMBER_OF_AUDITS_PER_YEAR
  × AVG_AUDIT_PREPARATION_COST            (internal labor + documentation)
  × PREPARATION_TIME_REDUCTION              (PM enables continuous monitoring; default 60-80%)

Example (4 audits/year, $150K prep cost each, 70% reduction):
= 4 × $150K × 0.70
= $420K / year
```

**Benchmark:** Saint-Gobain: 240 weeks/year saved on internal audits

## 6.2 Regulatory Penalty Avoidance

**Formula:**
```
Compliance Value =
    Σ (PENALTY_AMOUNT × PROBABILITY_WITHOUT_PM)
  - Σ (PENALTY_AMOUNT × PROBABILITY_WITH_PM)

India-specific examples:
- GST non-compliance penalty: up to 100% of tax due
- SEBI late disclosure: INR 1L/day
- RBI violations: varies, can be crores
```

## 6.3 S/4HANA Migration De-Risking

**Formula:**
```
Migration Value =
    MIGRATION_BUDGET
  × OVERRUN_PROBABILITY_WITHOUT_PM         (industry avg: 60-70% of migrations overrun)
  × AVG_OVERRUN_PCT                         (typical: 50-100%)
  × OVERRUN_REDUCTION_WITH_PM               (PM reduces overrun by 30-50%)

Example ($10M migration budget, 65% overrun probability, 75% avg overrun, 40% reduction):
Expected overrun without PM = $10M × 0.65 × 0.75 = $4.875M
Expected overrun with PM = $4.875M × (1 - 0.40) = $2.925M
Migration PM Value = $4.875M - $2.925M = $1.95M
```

**Confidence level:** MEDIUM (40%) — compelling but hard to prove counterfactual

---

# SECTION 7: TOTAL VALUE MODEL — PUTTING IT ALL TOGETHER

## 7.1 Value Model by Company Size

### Scenario A: Large Enterprise ($5B+ revenue)

```
Input Assumptions:
- Revenue: $5B
- AP Spend: $2B
- AR Revenue: $4B
- Invoices: 2M/year
- POs: 500K/year
- IT Tickets: 300K/year
- Employees: 50,000
- WACC: 10%

VALUE CALCULATION:

P2P Value:
  Cash discounts:        $2B × 30% × 2% × 42%     = $5.04M  × 80% = $4.03M
  Duplicate prevention:  $2B × 0.3% × 80%           = $4.80M  × 90% = $4.32M
  Maverick spend:        $2B × 20% × 15% × 40%      = $24.0M  × 50% = $12.0M
  Invoice processing:    2M × $12 × 0.40 × 0.65      = $6.24M  × 70% = $4.37M
  Working capital:       ($2B/365) × 15 × 10%         = $822K   × 50% = $411K
P2P TOTAL (weighted):                                            $25.1M

O2C Value:
  DSO reduction:         ($4B/365) × 10 × 10%         = $10.96M × 60% = $6.58M
  Order block removal:   $4B × 20% × 40% × (4/365)    = $3.51M  × 50% = $1.75M
  Order automation:      calculated                     = $2.19M  × 50% = $1.10M
O2C TOTAL (weighted):                                             $9.43M

ITSM Value:
  Ticket cost reduction: 300K × $7                     = $2.10M  × 70% = $1.47M
  SLA penalties:         300K × 12% × 50% × $100       = $1.80M  × 60% = $1.08M
  Productivity:          300K × 2hrs × $40 × 25%        = $6.0M  × 25% = $1.50M
ITSM TOTAL (weighted):                                            $4.05M

Supply Chain Value:
  Inventory:             calculated                     = $4.11M  × 50% = $2.05M
  Logistics:             $150M × 15%                    = $22.5M  × 40% = $9.00M
  On-time delivery:      calculated                     = $4.25M  × 40% = $1.70M
SC TOTAL (weighted):                                              $12.75M

Compliance:
  Audit reduction:       8 × $200K × 70%                = $1.12M × 60% = $672K
  Migration de-risk:     if applicable                   = $1.95M × 40% = $780K
Compliance TOTAL:                                                  $1.45M

═══════════════════════════════════════════════════════════════
TOTAL ANNUAL VALUE (CONSERVATIVE, WEIGHTED):           $52.8M / year
═══════════════════════════════════════════════════════════════

Working Capital Freed (balance sheet):
  AP (DPO): $82.2M  +  AR (DSO): $109.6M  +  Inventory: $41.1M = $232.9M

Value as % of Revenue: 1.06%
Recommended Sancalana Price: $500K-$2M/year (1-4% of value delivered)
ROI at $1M price: 52.8x
```

### Scenario B: Mid-Market Enterprise ($500M-$2B revenue)

```
Input Assumptions:
- Revenue: $1B
- AP Spend: $400M
- AR Revenue: $800M
- Invoices: 300K/year
- POs: 100K/year
- IT Tickets: 50K/year
- Employees: 5,000
- WACC: 12%

VALUE CALCULATION:

P2P Value:
  Cash discounts:        $400M × 30% × 2% × 42%    = $1.01M  × 80% = $806K
  Duplicate prevention:  $400M × 0.3% × 80%          = $960K   × 90% = $864K
  Invoice processing:    300K × $12 × 0.40 × 0.65     = $936K   × 70% = $655K
P2P TOTAL (weighted):                                            $2.33M

O2C Value:
  DSO reduction:         ($800M/365) × 8 × 12%        = $2.10M  × 60% = $1.26M
  Order automation:      calculated                     = $439K   × 50% = $219K
O2C TOTAL (weighted):                                            $1.48M

ITSM Value:
  Ticket cost:           50K × $7                      = $350K   × 70% = $245K
  SLA + Productivity:    calculated                     = $750K   × 40% = $300K
ITSM TOTAL (weighted):                                            $545K

═══════════════════════════════════════════════════════════════
TOTAL ANNUAL VALUE (CONSERVATIVE, WEIGHTED):           $4.35M / year
═══════════════════════════════════════════════════════════════

Value as % of Revenue: 0.44%
Recommended Sancalana Price: $50K-$150K/year (1-3% of value delivered)
ROI at $100K price: 43.5x
```

### Scenario C: GCC in India (Shared Services Center)

```
Input Assumptions:
- Processes managed: Global P2P + O2C for parent company
- AP Spend processed: $500M (global parent's AP flowing through GCC)
- Invoices: 400K/year
- Employees in GCC: 2,000
- FTE cost (India): $25K loaded
- GCC must justify value to global HQ

VALUE CALCULATION:

P2P Value (processed through GCC):
  Cash discounts:        $500M × 30% × 2% × 42%    = $1.26M  × 80% = $1.01M
  Duplicate prevention:  $500M × 0.3% × 80%          = $1.20M  × 90% = $1.08M
  Invoice processing:    400K × $5 × 0.40 × 0.65      = $520K   × 70% = $364K
  (Note: India cost per invoice is lower ~$5 vs $12)
P2P TOTAL:                                                       $2.45M

FTE Productivity (GCC-specific value):
  Process analyst time saved: 10 FTEs × 30% × $25K    = $75K    × 70% = $52K
  (This is small in $ but HUGE in GCC narrative —
   "we freed 3 FTEs for higher-value innovation work")

GCC STRATEGIC VALUE (not in $ calc but critical for sale):
  - "Innovation hub" narrative for global HQ reporting
  - IP creation (custom process models)
  - Benchmark data for global process standardization
  - AI/ML capability demonstration

═══════════════════════════════════════════════════════════════
TOTAL ANNUAL VALUE (CONSERVATIVE):                     $2.50M / year
═══════════════════════════════════════════════════════════════

Recommended Sancalana Price: $30K-$100K/year (GCC budget, global pricing)
ROI at $60K price: 41.7x
```

---

# SECTION 8: THE SANCALANA ADVANTAGE — TIME-TO-VALUE DELTA

This is Sancalana's unique value lever that Celonis CANNOT claim.

## 8.1 Implementation Cost Savings

```
IMPLEMENTATION COST DELTA:

Celonis:
  Software (Year 1):           $500K - $2.3M
  SI/Consulting:               $200K - $2M
  Internal CoE (15-20 FTEs):   $1.2M - $3M/year (US) or $375K-$500K (India)
  Timeline:                    6-12 months to first value
  TOTAL YEAR 1 COST:           $1.9M - $7.3M

Sancalana:
  Software (Year 1):           $50K - $200K
  Implementation:              $0 - $50K (self-serve or light-touch)
  Internal effort (1-2 FTEs):  $80K - $160K (US) or $25K-$50K (India)
  Timeline:                    Days-weeks to first value
  TOTAL YEAR 1 COST:           $130K - $410K

IMPLEMENTATION COST SAVINGS:  $1.5M - $6.9M (Year 1)
```

## 8.2 Delayed Value Capture

```
FASTER TIME-TO-VALUE:

If total annual PM value = $V:

Celonis: 6 months to first value → 6 months of value in Year 1
  Year 1 captured value = V × (6/12) = 0.5V

Sancalana: 1 month to first value → 11 months of value in Year 1
  Year 1 captured value = V × (11/12) = 0.917V

ADDITIONAL VALUE FROM SPEED = 0.417V

Example (if V = $5M/year):
Additional value = $5M × 0.417 = $2.08M in Year 1
```

## 8.3 Reduced Organizational Risk

```
RISK VALUE:

Probability of PM implementation failure:
  Celonis (complex implementation): ~25-30%
  Sancalana (simple implementation): ~10-15%

Expected cost of failure:
  Celonis: 27.5% × ($2M wasted + $5M opportunity cost) = $1.93M risk-adjusted
  Sancalana: 12.5% × ($150K wasted + $2M opportunity cost) = $269K risk-adjusted

RISK REDUCTION VALUE: $1.93M - $269K = $1.66M
```

## 8.4 Total Sancalana Advantage

```
THE SANCALANA DELTA (vs. Celonis):

  Implementation savings:    $1.5M - $6.9M
  Faster value capture:      $2.08M (first year)
  Risk reduction:            $1.66M
  ────────────────────────────────────
  TOTAL SANCALANA ADVANTAGE: $5.24M - $10.64M in Year 1

This is the value Sancalana delivers ABOVE AND BEYOND process mining value itself.
Even if Sancalana's ongoing PM value is only 70% of Celonis's,
the implementation delta makes the total 3-year TCO/TCV far superior.

3-YEAR COMPARISON ($5B company, $52.8M annual PM value):

Celonis (3-year):
  Benefits: $52.8M × 2.5 years effective     = $132.0M
  Costs: $2.3M/yr license + $7.3M Year 1     = $16.5M
  NET VALUE:                                    $115.5M

Sancalana (3-year, at 70% of Celonis PM value):
  Benefits: $37.0M × 2.92 years effective     = $108.0M
  Costs: $200K/yr license + $410K Year 1      = $1.01M
  NET VALUE:                                    $107.0M

SANCALANA ROI: 10,594%  vs  CELONIS ROI: 700%

The buyer gets ~93% of the net value at ~6% of the cost.
```

---

# SECTION 9: QUICK ESTIMATION RULES OF THUMB

For fast back-of-envelope calculations during initial conversations:

## 9.1 Revenue-Based Rules

| Company Revenue | Conservative Annual PM Value | Aggressive Annual PM Value |
|----------------|-----------------------------|-----------------------------|
| $100M | $200K - $500K | $500K - $1.5M |
| $500M | $1M - $2.5M | $2.5M - $7.5M |
| $1B | $2M - $5M | $5M - $15M |
| $5B | $10M - $25M | $25M - $75M |
| $20B | $40M - $100M | $100M - $300M |

**Quick formula:** `Annual PM Value ≈ Revenue × 0.2% to 1.5%`

Conservative: Revenue × 0.2% (hard savings only, single process)
Moderate: Revenue × 0.5% (hard + efficiency, 2-3 processes)
Aggressive: Revenue × 1.5% (all value levers, 5+ processes)

## 9.2 Spend-Based Rules

| Metric | Quick Value Estimate |
|--------|---------------------|
| AP Spend | 0.5-2% of AP spend (P2P value) |
| AR Revenue | 0.2-1% of AR (O2C value) |
| IT Ticket Volume | $8-15 per ticket per year (ITSM value) |
| Logistics Spend | 10-20% savings (supply chain) |
| Migration Budget | 15-30% of budget (de-risking value) |

## 9.3 Per-Process Rules

| First Process | Typical Value | Time to Value |
|--------------|---------------|---------------|
| P2P | $2-10M/year (large enterprise) | 2-4 weeks |
| O2C | $3-25M/year (large enterprise) | 4-8 weeks |
| ITSM | $1-5M/year (large enterprise) | 1-2 weeks |
| Supply Chain | $5-15M/year (large enterprise) | 4-8 weeks |

## 9.4 India-Specific Adjustments

| Factor | Adjustment |
|--------|-----------|
| FTE costs | Use $25K loaded (India) vs $80K (US) — reduces FTE-based value calculations |
| AP spend | Indian companies often have lower absolute spend → lower absolute value |
| GCCs | Use global parent company metrics, not India entity alone |
| Cost per invoice | India: ~$5 vs US: ~$12 |
| WACC | India: 12-15% vs US: 8-10% (higher WACC = working capital value is HIGHER in India) |
| Payment terms | India: Net 60-90 is common → DPO/DSO values are larger |

**Key insight for India:** Working capital value is HIGHER in India because WACC is higher. A company paying 14% cost of capital gets more value from freeing working capital than one paying 8%.

---

# SECTION 10: PRICING MODEL DERIVED FROM VALUE

## 10.1 Value-Based Pricing Framework

```
PRICING RULE: Price at 5-15% of conservative annual value delivered

Large Enterprise ($5B+ rev):
  Annual PM value: $25-50M
  Price range: $500K - $2M/year
  Sweet spot: $1M/year

Mid-Market ($500M-$2B rev):
  Annual PM value: $2-5M
  Price range: $50K - $200K/year
  Sweet spot: $100K/year

GCC:
  Annual PM value: $1-3M
  Price range: $30K - $100K/year
  Sweet spot: $60K/year

Indian Enterprise ($100M-$500M rev):
  Annual PM value: $200K-$1M
  Price range: $15K - $50K/year
  Sweet spot: $30K/year
```

## 10.2 Price-to-Value Conversation Guide

```
Framing for the CFO:

"Based on our analysis of your P2P process:
 - You're capturing 50% of available cash discounts on $400M spend
 - At 92% capture (industry best practice), that's $1.01M additional per year
 - Your duplicate payment rate is 0.3%, costing roughly $960K per year
 - Conservative total P2P value: $2.3M per year

 Sancalana costs $100K per year.
 That's a 23:1 return.
 Payback period: 16 days.

 And that's just P2P.
 O2C and ITSM add another $2M+ per year."
```

---

# SECTION 11: VALUE MODEL VALIDATION CHECKLIST

Before presenting a value model to a customer, validate:

## 11.1 Data Quality Checks

- [ ] All input numbers come from the CUSTOMER, not our assumptions
- [ ] Baseline metrics are verified (not guessed)
- [ ] Volume numbers are annual, not monthly/quarterly (common error)
- [ ] Spend figures are AP-addressable, not total company spend
- [ ] Revenue figures match the scope we're analyzing (not consolidated)

## 11.2 Credibility Checks

- [ ] No single value lever accounts for >50% of total (diversified value)
- [ ] Confidence weights are applied (not presenting gross numbers as expected)
- [ ] Sensitivity analysis shows positive ROI even at 40% of projected benefits
- [ ] Comparable case studies support the projected ranges
- [ ] Implementation timeline is realistic (not over-promising)

## 11.3 Presentation Checks

- [ ] Lead with hard savings (CFO approved without debate)
- [ ] Separate "identified" from "weighted/conservative" (shows intellectual honesty)
- [ ] Include a "do nothing" cost (cost of status quo)
- [ ] Show payback period in DAYS not months (sounds better: "47 days" vs "1.5 months")
- [ ] Have 3 scenarios: conservative, base, optimistic

## 11.4 India-Specific Checks

- [ ] FTE costs use India rates (not US)
- [ ] Pricing is in INR for Indian enterprises (not USD)
- [ ] GCC value is framed as "global impact" not "India cost savings"
- [ ] Payment terms account for Net 60-90 norms
- [ ] Negotiation buffer built into list pricing (30-40% above target)

---

# SECTION 12: COMPETITIVE VALUE COMPARISON

## 12.1 Sancalana vs. Celonis — Value Delivered Per Dollar Spent

```
FOR A $1B REVENUE COMPANY:

                        Celonis              Sancalana
───────────────────────────────────────────────────────────
Annual PM Value         $5M                  $3.5M (70% of Celonis)
Annual License          $200K                $100K
Implementation (Y1)     $500K                $25K
Internal FTEs           5 FTEs ($400K)       1 FTE ($80K)
Annual Total Cost       $600K (Y1: $1.1M)    $180K (Y1: $205K)

VALUE PER $ SPENT       $8.33                $19.44
ROI                     733%                 1,844%
PAYBACK                 ~3 months            ~17 days

Time to First Value     4-6 months           1-2 weeks
───────────────────────────────────────────────────────────

KEY INSIGHT:
Sancalana delivers 2.3x more value PER DOLLAR even if the
absolute PM value is 30% lower than Celonis.

The efficiency gap is the value proposition.
```

## 12.2 How to Use This in Sales

**For the CFO:** "You get 70% of the value at 15% of the cost. The ROI is 2.5x better."

**For the VP Ops:** "You see results in weeks, not months. No 6-month project before you know if this works."

**For the CIO:** "No ETL. No consultants. No 15-person CoE. Connect to your data warehouse and go."

**For the Champion:** "Bring a $2M finding to your next board meeting. We'll have it ready in 2 weeks. Try getting that from Celonis in 2 weeks."

---

# APPENDIX A: INDUSTRY-SPECIFIC VALUE MULTIPLIERS

Different industries have different value profiles from process mining:

| Industry | Primary Value Lever | Value Multiplier (vs. avg) | Why |
|----------|-------------------|---------------------------|-----|
| **Manufacturing** | Supply chain + P2P | 1.2x | Complex processes, high spend |
| **Financial Services** | Compliance + O2C | 1.3x | Regulatory penalties are severe |
| **Pharma** | R2R + Compliance | 1.4x | FDA/GxP compliance drives premium |
| **Telecom** | P2P + ITSM | 1.1x | High invoice volumes, many suppliers |
| **Retail/FMCG** | Supply chain + O2C | 1.2x | Inventory + order management |
| **IT Services** | ITSM + Shared Services | 0.9x | Lower spend, but cleaner data |
| **Energy/Utilities** | P2P + Compliance | 1.3x | Large capex, regulatory |
| **Healthcare** | Patient journey + R2R | 1.2x | Compliance + clinical value |
| **Government/PSU** | P2P + Compliance | 0.8x | Lower spend, longer cycles |

**Usage:** Multiply the standard value model outputs by the industry multiplier.

---

# APPENDIX B: DISCOVERY QUESTIONS THAT FEED THE MODEL

These are the questions to ask during sales discovery to populate the value model:

### P2P Discovery
1. "What's your total annual AP spend across all entities?"
2. "How many invoices do you process per year?"
3. "What's your current cash discount capture rate? What's your average discount term?"
4. "When was the last time you found a duplicate payment? How much was it?"
5. "What percentage of your purchases go through negotiated contracts vs. off-contract?"
6. "How many people touch an average invoice from receipt to payment?"
7. "What's your current invoice STP/touchless rate?"

### O2C Discovery
8. "What's your current DSO? What's your target?"
9. "What percentage of sales orders get blocked? For how long on average?"
10. "What's your sales order automation rate?"
11. "What does a 1-day DSO improvement mean in working capital for you?"

### ITSM Discovery
12. "How many IT tickets do you process annually?"
13. "What's your average resolution time? First-contact resolution rate?"
14. "What are your SLA targets? What penalties apply for breaches?"
15. "How many ticket reassignments happen on average?"

### Strategic Discovery
16. "Are you planning an S/4HANA migration? When? What's the budget?"
17. "How many process variants do you think you have in P2P? (Hint: it's always more than they think)"
18. "How long does it take your team to investigate a process issue today? Hours? Days?"
19. "What happens when audit finds a process deviation?"
20. "If I could show you one thing about how your business actually runs vs. how you think it runs, what would matter most?"

---

*This value model is designed to be used as a living document. Update benchmarks as Sancalana collects its own customer data. The most powerful version of this model uses Sancalana's OWN customer results, not Celonis benchmarks. Every successful pilot adds to the credibility of these numbers.*

*Version 1.0 — March 2026*
