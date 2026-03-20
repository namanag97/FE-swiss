# Sancalana — Infrastructure Cost Model (Reference-Based)

All numbers sourced from real deployments, financial filings, and vendor pricing pages. No vibes.

---

# REFERENCE POINTS

## What Comparable Companies Actually Spend

### Public Company COGS (from SEC Filings)

| Company | Revenue | Cost of Revenue | Gross Margin | Infra as % Rev |
|---------|---------|----------------|--------------|----------------|
| Datadog | $3.43B | $687M | 80% | ~15% |
| Snowflake | $3.63B | $1.21B | 67% | ~24% (AWS $350M/yr commitment) |
| MongoDB | $2.01B | $535M | 73% | ~18% |
| Elastic | $1.48B | ~$370M | 75% | ~16% |
| Databricks | $5.4B ARR | ~$1.4B | 74% (declining) | ~20% |

**Median SaaS hosting cost: 5% of ARR** (SaaS Capital 2025 survey, 1,000+ companies)
**Data-heavy SaaS: 15-24% of revenue as infrastructure COGS**

### Celonis (Private, Partial Data)

- ARR: ~$771M (2023), growing ~39% YoY
- Employees: 3,797 (Feb 2026)
- ARR/employee: ~$203K
- Customers: 1,400+
- Average ARR/customer: ~$550K (skewed by large enterprise)
- Database: Custom-built **SaolaDB** (in-memory column store)
- Infra: Hundreds of Kubernetes clusters on AWS/Azure/GCP
- Gross margin: Not disclosed, estimated 70-75% based on comparable companies
- Estimated infra spend: $115-190M/year (15-25% of ARR)
- Estimated infra per customer: ~$82K-$136K/year ($6.8K-$11.3K/month)

### IBM Process Mining Hardware Requirements (Published)
- Minimum for 10M events: **16 cores, 64 GB RAM, 300 GB storage**
- Desktop process mining (Minit/Microsoft): **32-48 GB RAM, 8-16 cores, NVMe SSD** for 50-100 GB event logs

---

# SANCALANA INFRASTRUCTURE: COMPONENT-BY-COMPONENT

## 1. StarRocks (OLAP Query Engine)

### Reference: StarRocks Production Sizing (from docs.starrocks.io)

**FE Node (query planning, metadata):**
- Minimum: 8 cores, 16 GB RAM, 100 GB HDD
- Recommended: 8 cores, 32 GB RAM
- Need 3 for HA (1 leader + 2 followers)

**BE Node (data storage, query execution):**
- Minimum: 16 cores, 64 GB RAM
- Ratio: 1 vCPU : 4 GB RAM
- Disk: up to 10 TB/node, SSD/NVMe preferred, >150 MB/s throughput
- Storage formula: `Raw data × Replica count (3) / Compression ratio (3-5x)`

### Real AWS Pricing (us-east-1, on-demand)

| Role | Instance | Specs | $/month |
|------|----------|-------|---------|
| FE | r6i.xlarge | 4 vCPU, 32 GB | $184 |
| FE | r6i.2xlarge | 8 vCPU, 64 GB | $367 |
| BE (compute) | r6i.4xlarge | 16 vCPU, 128 GB | $736 |
| BE (storage-opt) | i3.2xlarge | 8 vCPU, 61 GB, 1.9TB NVMe | $456 |
| BE (large) | r6i.8xlarge | 32 vCPU, 256 GB | $1,472 |

### Sancalana StarRocks Cluster Configurations

**Phase 1: 0-20 customers (shared cluster)**
```
3× FE (r6i.xlarge)      = 3 × $184  = $552/month
3× BE (r6i.4xlarge)     = 3 × $736  = $2,208/month
EBS gp3 (1 TB per BE)   = 3 × $80   = $240/month
─────────────────────────────────────────────────
TOTAL                                  $3,000/month
Per customer (20):                     $150/month
```

**Phase 2: 20-100 customers (medium cluster)**
```
3× FE (r6i.2xlarge)     = 3 × $367  = $1,101/month
5× BE (r6i.4xlarge)     = 5 × $736  = $3,680/month
EBS gp3 (2 TB per BE)   = 5 × $160  = $800/month
─────────────────────────────────────────────────
TOTAL                                  $5,581/month
Per customer (100):                    $56/month
```

**Phase 3: 100-500 customers (shared-data mode, S3 backend)**
```
3× FE (r6i.2xlarge)       = $1,101/month
8× CN (c6i.4xlarge)       = 8 × $490 = $3,920/month  (stateless compute nodes)
S3 storage (50 TB)        = 50 × $23 = $1,150/month
S3 requests               = ~$200/month
─────────────────────────────────────────────────
TOTAL                                  $6,371/month
Per customer (500):                    $13/month
```

**Key reference:** Fanatics runs 6 PB on StarRocks + Iceberg on S3, cut Snowflake costs 90%. StarRocks total hardware+software cost = 12.6% of Snowflake for equivalent workload.

### StarRocks vs Alternative OLAP Costs

| Engine | Cost for equivalent workload | Relative |
|--------|------------------------------|----------|
| StarRocks (self-managed) | $3,000/month | 1x |
| ClickHouse Cloud | $3,100-5,900/month | 1-2x |
| Snowflake (equivalent queries) | $8,870-46,000/month | 3-15x |
| CelerData (managed StarRocks) | ~$3,500-5,000/month | 1.2-1.7x |

Source: ClickHouse vs Snowflake benchmark (clickhouse.com), Fanatics case study, CelerData $0.65/CCU pricing.

---

## 2. Kafka / Streaming

### Option A: AWS MSK Provisioned (cheapest managed)

**Small cluster (3 brokers):**
```
3× kafka.m5.large         = 3 × $153 = $459/month
1 TB EBS storage           = $100/month
Data transfer (est)        = $50/month
─────────────────────────────────────────────────
TOTAL                                  $609/month
```

Source: AWS MSK pricing page. kafka.m5.large = $0.21/hr.

**Capacity:** 3× m5.large handles ~100 MB/s throughput. At 200 bytes/event, that's 500K events/sec — enough for hundreds of customers.

### Option B: AWS MSK Serverless

```
Cluster-hour:   $0.75/hr × 730         = $548/month (fixed)
50 partitions:  50 × $0.0015 × 730     = $55/month
Data in:        500 GB/month × $0.10   = $50/month
Data out:       500 GB/month × $0.05   = $25/month
Storage:        200 GB × $0.10         = $20/month
─────────────────────────────────────────────────
TOTAL                                   $698/month
```

Source: aws.amazon.com/msk/pricing. Serverless is MORE expensive at low throughput because of the $548/month cluster-hour floor.

### Option C: Redpanda Serverless

```
Ingress:     500 GB/month × $0.045    = $22.50/month
Egress:      500 GB/month × $0.04     = $20.00/month
Compute:     $0.10/hr × 730           = $73.00/month
Storage:     200 GB × $0.09           = $18.00/month
Partitions:  50 × $0.0015 × 730       = $55.00/month
─────────────────────────────────────────────────
TOTAL                                  $188.50/month
```

Source: redpanda.com/blog/new-redpanda-serverless. **3.2x cheaper than MSK Provisioned, 3.7x cheaper than MSK Serverless.**

### Option D: Self-Managed Kafka on EC2

```
3× m5.large (brokers)     = 3 × $70  = $210/month  (reserved 1yr)
EBS gp3 (1 TB total)      = $80/month
ZooKeeper (3× t3.small)   = 3 × $15  = $45/month
─────────────────────────────────────────────────
TOTAL                                  $335/month
+ DevOps overhead: 0.1 FTE = ~$1,000/month (India)
TOTAL WITH OPERATIONS                  $1,335/month
```

### Recommendation

| Phase | Best Option | Cost | Why |
|-------|------------|------|-----|
| 0-20 customers | Redpanda Serverless | $189/month | Cheapest, zero ops |
| 20-100 | MSK Provisioned | $609/month | Predictable, AWS-native |
| 100+ | Self-managed or MSK | $335-609/month | Volume justifies ops |

---

## 3. Iceberg + S3 Storage

### Storage Costs (from aws.amazon.com/s3/pricing)

```
S3 Standard:        $0.023/GB/month = $23/TB/month
S3 Standard-IA:     $0.0125/GB/month = $12.50/TB/month
S3 Glacier IR:      $0.004/GB/month = $4/TB/month
```

### Per-Customer Storage Calculation

Event size: ~130 bytes raw → ~18 bytes compressed (Parquet, 7x compression from your architecture)

```
Customer Tier    Events/Year    Compressed    Iceberg Overhead (3x)    S3 Cost/month
─────────────────────────────────────────────────────────────────────────────────────
Small (1M)       1M             18 MB         54 MB                    $0.0012
Mid-market       10M            180 MB        540 MB                   $0.012
Enterprise       100M           1.8 GB        5.4 GB                   $0.12
Large Enterprise 1B             18 GB         54 GB                    $1.24
Mega             10B            180 GB        540 GB                   $12.42
```

**Why 3x overhead for Iceberg:**
- Metadata files (manifest lists, manifests): ~5%
- Snapshot history (90-day retention, daily snapshots): ~1.5-2x
- Replica/compaction temporary: ~0.5x
- Source: Iceberg docs + Onehouse analysis showing up to 98% can be historical without snapshot expiry

### Materialized Views in StarRocks

MVs stored in StarRocks BE nodes (already counted in StarRocks cost). Typically 30-50% additional storage vs raw data.

### Compaction Cost

```
Using AWS EMR for Iceberg compaction:
  Cost per GB compacted: $0.0017 (source: Onehouse benchmark)

  Mid-market customer (540 MB, weekly compaction):
  = 0.54 GB × $0.0017 × 4 = $0.004/month

  Enterprise customer (5.4 GB, weekly compaction):
  = 5.4 × $0.0017 × 4 = $0.04/month

Compaction cost is negligible.
```

### Total Storage Cost

```
50 mid-market customers:
  S3: 50 × 540 MB = 27 GB × $0.023  = $0.62/month
  Compaction: 50 × $0.004            = $0.20/month
  S3 requests (PUT/GET): ~50K/month  = $0.25/month
  ──────────────────────────────────────────────
  TOTAL                                $1.07/month

Storage is essentially free at this scale.
Even at 500 customers with 100M events each:
  S3: 2.7 TB × $0.023 = $62/month
```

---

## 4. Compute — The 4 Services

### Reference Sizing (from IBM Process Mining published requirements)

IBM's minimum for 10M events: 16 cores, 64 GB RAM. But IBM runs everything in one process. Sancalana's microservices can be much lighter individually because the heavy compute is in StarRocks.

### Service-by-Service Sizing

**svc-gateway (8080) — auth, workspaces, connections, jobs, ingestion**
```
Profile: I/O bound, low CPU. Handles HTTP requests, JWT validation,
         proxies to other services, receives ingestion payloads.
         Stateless — scales horizontally.

Sizing: 2 vCPU, 4 GB RAM per instance
AWS:    t3.medium ($30/month on-demand, $19/month reserved)
        or Fargate: 1 vCPU, 2 GB = $29/month

Scaling:
  0-50 customers:   1 instance  = $30/month
  50-200 customers:  2 instances = $60/month
  200-1000:          3 instances = $90/month (behind ALB)
```

**svc-pipeline (8081) — Kafka→OCEL→Parquet→Iceberg→MV refresh**
```
Profile: CPU + I/O heavy DURING processing, idle between.
         Bursty — runs for minutes every 15min/1hr/daily per tenant.
         This is NOT always-on compute. It's batch.

Sizing: 4 vCPU, 8 GB RAM (burst to 8 vCPU during refresh)
AWS:    c6i.xlarge ($124/month on-demand, $76/month reserved)
        or Fargate Spot: 4 vCPU, 8 GB = ~$87/month full utilization
        but actual utilization is ~10-20% (batch), so:
        Fargate Spot (actual): ~$15-25/month per customer

Key cost driver: MV refresh frequency
  Daily refresh:   ~2 min compute/day = $2/month per customer (Fargate)
  Hourly refresh:  ~2 min × 24 = 48 min/day = $10/month per customer
  15-min refresh:  ~2 min × 96 = 192 min/day = $40/month per customer

Recommendation: Price refresh frequency into tiers.
  Free:        daily refresh
  Pro:         hourly refresh
  Enterprise:  15-minute or streaming
```

**svc-query (8089) — TQL→StarRocks, KM, Explorer, CEP**
```
Profile: CPU + memory heavy during queries. Parses TQL, translates
         to StarRocks SQL, manages Knowledge Model evaluation,
         runs Complex Event Processing rules.
         Stateless but needs memory for query planning cache.

Sizing: 4 vCPU, 8 GB RAM per instance
AWS:    r6i.xlarge ($184/month) or c6i.xlarge ($124/month)

Scaling:
  0-50 customers:   1 instance  = $124/month
  50-200:           2 instances = $248/month
  200-1000:         4 instances = $496/month

Note: Most query compute is in StarRocks. svc-query is a thin
translation layer. The real cost is the StarRocks cluster.
```

**svc-platform (8085) — RBAC, billing, provisioning, actions, studio**
```
Profile: Lightweight CRUD. Low CPU, low memory.
         Stateless. Can serve 500+ tenants on one instance.

Sizing: 2 vCPU, 4 GB RAM
AWS:    t3.medium ($30/month on-demand, $19/month reserved)

Scaling:
  0-200 customers:  1 instance  = $30/month
  200-1000:         2 instances = $60/month
```

### Supporting Infrastructure

```
PostgreSQL (metadata, RBAC, billing):
  RDS db.t3.medium (2 vCPU, 4 GB):    $50/month
  Storage (50 GB gp3):                  $4/month
  Multi-AZ:                            +$50/month
  TOTAL:                                $104/month

Redis (session cache, rate limiting):
  ElastiCache t3.small (1 node):       $25/month

ALB (load balancer):
  Fixed:                               $16/month
  Per LCU:                             ~$10/month
  TOTAL:                               $26/month

Route 53 + ACM:                        $2/month

CloudWatch / Monitoring:               $30/month

Secrets Manager:                       $5/month
```

---

# FULL COST MODEL: ASSEMBLED

## Phase 1: 0-20 Customers

```
INFRASTRUCTURE COST BREAKDOWN:

StarRocks (3 FE + 3 BE, shared cluster)
  3× r6i.xlarge (FE)                    $552
  3× r6i.4xlarge (BE)                   $2,208
  3× 1TB EBS gp3                        $240
                                        ────────
  StarRocks subtotal:                    $3,000/month

Kafka/Streaming (Redpanda Serverless)
  Ingestion + egress + compute           $189/month

Storage (S3 + Iceberg)
  20 customers × 540 MB avg              $0.25/month
  (effectively free)

Compute (4 services)
  svc-gateway (t3.medium)                $30
  svc-pipeline (c6i.xlarge, shared)      $124
  svc-query (c6i.xlarge)                 $124
  svc-platform (t3.medium)               $30
                                        ────────
  Services subtotal:                     $308/month

Supporting Infrastructure
  RDS PostgreSQL (Multi-AZ)              $104
  ElastiCache Redis                      $25
  ALB                                    $26
  Route 53 + ACM                         $2
  CloudWatch                             $30
  Secrets Manager                        $5
                                        ────────
  Supporting subtotal:                   $192/month

════════════════════════════════════════════════════
TOTAL MONTHLY INFRASTRUCTURE:            $3,689/month
════════════════════════════════════════════════════

Per customer (at 1 customer):            $3,689/month
Per customer (at 5 customers):           $738/month
Per customer (at 10 customers):          $369/month
Per customer (at 20 customers):          $184/month

ANNUAL (at 20 customers):               $44,268/year total
Per customer:                            $2,213/year
```

## Phase 2: 20-100 Customers

```
StarRocks (3 FE + 5 BE, medium cluster)
  3× r6i.2xlarge (FE)                   $1,101
  5× r6i.4xlarge (BE)                   $3,680
  5× 2TB EBS gp3                        $800
                                        ────────
  StarRocks subtotal:                    $5,581/month

Kafka (MSK Provisioned, 3 brokers)
  3× kafka.m5.large                      $459
  1 TB EBS                               $100
  Transfer                               $50
                                        ────────
  Kafka subtotal:                        $609/month

Storage (S3 + Iceberg)
  100 customers × 1 GB avg               $2.30/month

Compute (4 services, scaled)
  svc-gateway (2× t3.medium)             $60
  svc-pipeline (2× c6i.xlarge)           $248
  svc-query (2× c6i.xlarge)              $248
  svc-platform (t3.medium)               $30
                                        ────────
  Services subtotal:                     $586/month

Supporting Infrastructure
  RDS PostgreSQL (Multi-AZ, r6g.large)   $200
  ElastiCache Redis (r6g.large)          $90
  ALB                                    $30
  Monitoring + misc                      $50
                                        ────────
  Supporting subtotal:                   $370/month

════════════════════════════════════════════════════
TOTAL MONTHLY INFRASTRUCTURE:            $7,148/month
════════════════════════════════════════════════════

Per customer (at 50 customers):          $143/month  = $1,716/year
Per customer (at 100 customers):         $71/month   = $858/year
```

## Phase 3: 100-500 Customers (Shared-Data StarRocks)

```
StarRocks (shared-data, S3 backend)
  3× r6i.2xlarge (FE)                   $1,101
  8× c6i.4xlarge (CN, stateless)        $3,920
  S3 storage (50 TB)                     $1,150
  S3 requests                            $200
                                        ────────
  StarRocks subtotal:                    $6,371/month

Kafka (MSK Provisioned, 5 brokers)
  5× kafka.m5.large                      $765
  5 TB EBS                               $500
  Transfer                               $100
                                        ────────
  Kafka subtotal:                        $1,365/month

Storage (S3 + Iceberg)
  500 customers × 2 GB avg               $23/month

Compute (4 services, scaled)
  svc-gateway (3× t3.large)              $135
  svc-pipeline (4× c6i.xlarge)           $496
  svc-query (4× c6i.2xlarge)             $992
  svc-platform (2× t3.medium)            $60
                                        ────────
  Services subtotal:                     $1,683/month

Supporting Infrastructure                $500/month

════════════════════════════════════════════════════
TOTAL MONTHLY INFRASTRUCTURE:            $9,942/month
════════════════════════════════════════════════════

Per customer (at 200 customers):         $50/month   = $597/year
Per customer (at 500 customers):         $20/month   = $239/year
```

---

# UNIT ECONOMICS SUMMARY

## Cost Per Customer by Scale

| Customers | Monthly Infra | Per Customer/mo | Per Customer/yr | At $30K price | At $100K price |
|-----------|---------------|-----------------|-----------------|---------------|----------------|
| 1 | $3,689 | $3,689 | $44,268 | -47% margin | 56% margin |
| 5 | $3,689 | $738 | $8,856 | 70% margin | 91% margin |
| 10 | $3,689 | $369 | $4,428 | 85% margin | 96% margin |
| 20 | $3,689 | $184 | $2,213 | 93% margin | 98% margin |
| 50 | $7,148 | $143 | $1,716 | 94% margin | 98% margin |
| 100 | $7,148 | $71 | $858 | 97% margin | 99% margin |
| 200 | $9,942 | $50 | $597 | 98% margin | 99% margin |
| 500 | $9,942 | $20 | $239 | 99% margin | 99% margin |

## Where the Money Actually Goes

At Phase 1 (20 customers), $3,689/month:

```
StarRocks cluster        $3,000    81.3%  ← DOMINATES
Compute (4 services)       $308     8.3%
Supporting infra           $192     5.2%
Kafka/Streaming            $189     5.1%
S3 Storage                  $0.25   0.0%
─────────────────────────────────────────
                         $3,689   100.0%
```

**StarRocks is 81% of your cost.** Everything else is noise.

At Phase 2 (100 customers), $7,148/month:

```
StarRocks cluster        $5,581    78.1%  ← STILL DOMINATES
Kafka                      $609     8.5%
Compute (4 services)       $586     8.2%
Supporting infra           $370     5.2%
S3 Storage                  $2.30   0.0%
```

---

# COST OPTIMIZATION OPPORTUNITIES

## 1. Reserved Instances (Biggest Win)

```
StarRocks Phase 1 (on-demand → 1-year reserved, no upfront):
  FE: $552 → $350/month (37% savings)
  BE: $2,208 → $1,400/month (37% savings)

  NEW TOTAL: $1,750 + $240 EBS = $1,990/month
  SAVINGS: $1,010/month (34%)

Full infra with RI: $3,689 → $2,679/month
```

## 2. StarRocks Shared-Data Mode (from Phase 1)

Skip NVMe/EBS-attached BEs entirely. Use stateless Compute Nodes + S3.

```
3× FE (r6i.xlarge)           $552
3× CN (c6i.2xlarge)          $744    (vs $2,208 for BE r6i.4xlarge)
S3 (5 TB)                    $115
─────────────────────────────
StarRocks total:              $1,411  (vs $3,000 → 53% savings)
```

Trade-off: 20-30% slower queries on cache miss (cold S3 read). Acceptable for most customers.

## 3. Spot/Preemptible for svc-pipeline

Pipeline is batch — perfect for Spot instances.

```
svc-pipeline on Spot: $124 → ~$40/month (68% savings)
```

## 4. Tiered Refresh as Pricing Lever

```
Free tier:        daily MV refresh    → $2/customer/month pipeline compute
Pro:              hourly refresh      → $10/customer/month
Enterprise:       15-min refresh      → $40/customer/month
```

This is real cost difference, making it a natural pricing tier.

## 5. Full Optimized Phase 1

```
StarRocks shared-data (RI)    $900
Redpanda Serverless           $189
Compute (4 services, RI)      $200
Supporting (RI)               $150
S3                            $1
──────────────────────────────────
TOTAL:                         $1,440/month

Per customer (20):             $72/month = $864/year
```

At $30K/year price: **97.1% gross margin**

---

# COMPARISON: SANCALANA vs CELONIS INFRASTRUCTURE

## Celonis Cost Structure (Estimated)

```
Celonis serves ~1,400 customers on ~$771M ARR.

If COGS is ~25-30% (comparable to Snowflake/data platforms):
  Infrastructure spend: $193M-$231M/year
  Per customer: $138K-$165K/year = $11.5K-$13.8K/month

But Celonis runs SaolaDB (custom in-memory DB), which requires:
  - Very large memory instances (data must fit in RAM)
  - Per-tenant compute isolation (enterprise requirement)
  - Global multi-region presence (AWS + Azure + GCP)
  - Hundreds of K8s clusters

Their architecture is inherently more expensive because:
  1. In-memory DB (SaolaDB) needs RAM proportional to data
  2. Per-tenant isolation = no resource sharing
  3. Multi-cloud = redundant infra across 3 providers
  4. 2,500+ employee org overhead
```

## Sancalana Advantage

```
                            Celonis (est)       Sancalana (Phase 2)
──────────────────────────────────────────────────────────────────
Infra per customer/year     $138K-$165K         $858
Ratio                       1x                  0.005x-0.006x

WHY:
1. StarRocks + Iceberg on S3 vs in-memory SaolaDB
   → Data on cheap object storage, not expensive RAM
2. Multi-tenant shared cluster vs per-tenant isolation
   → Amortize across customers
3. Single cloud (AWS) vs multi-cloud
   → No redundant infra
4. 5-person eng team vs 1,000+ eng team
   → No organizational overhead in COGS
5. Serverless streaming vs always-on Kafka clusters
   → Pay per event, not per cluster

This cost advantage is STRUCTURAL, not temporary.
Celonis cannot match it without re-architecting their platform.
```

---

# BREAKEVEN ANALYSIS

## How Many Customers to Cover Infrastructure?

```
Phase 1 infra: $3,689/month = $44,268/year

At $30K/year ACV:
  Breakeven: 2 customers (covers infra)
  10 customers: $300K revenue, $44K infra, 85% margin

At $100K/year ACV:
  Breakeven: 1 customer (covers infra from day 1)

At GCC pricing ($60K/year):
  Breakeven: 1 customer
```

## Including People Cost (India Team)

```
                            Monthly     Annual
Engineering (5 people)      $12,500     $150,000
Sales/GTM (2 people)        $5,000      $60,000
Infrastructure              $3,689      $44,268
Tools/SaaS (HubSpot etc)    $500        $6,000
──────────────────────────────────────────────────
TOTAL BURN:                 $21,689     $260,268

At $60K ACV: need 5 customers to break even on full burn
At $100K ACV: need 3 customers
```

---

# APPENDIX: REFERENCE SOURCES

All numbers sourced from:

**StarRocks:**
- docs.starrocks.io/docs/deployment/plan_cluster/
- starrocks.io/blog/starrocks-best-practices-capacity-planning-and-deployment
- celerdata.com/blog/from-snowflake-to-starrocksapache-iceberg-how-fanatics-cut-90-of-analytics-cost-at-6pb-scale
- CelerData pricing: $0.65/CCU (docs.celerdata.com/BYOC/docs/usage_and_billing/)

**Kafka/Streaming:**
- aws.amazon.com/msk/pricing/
- redpanda.com/blog/new-redpanda-serverless
- confluent.io/confluent-cloud/pricing/
- Redpanda vs Kafka TCO: redpanda.com/blog/is-redpanda-better-than-kafka-tco-comparison

**Iceberg/S3:**
- aws.amazon.com/s3/pricing/
- onehouse.ai/blog/s3-managed-tables-unmanaged-costs
- EMR compaction at $0.0017/GB (Onehouse benchmark)

**Public Company Financials:**
- Datadog FY2025: $3.43B revenue, 80% gross margin
- Snowflake FY2025: $3.63B revenue, 67% gross margin
- MongoDB FY2025: $2.01B revenue, 73% gross margin
- Databricks: $5.4B ARR, 74% gross margin (declining)

**Celonis:**
- ~$771M ARR (2023), 3,797 employees (2026)
- Custom SaolaDB, hundreds of K8s clusters
- Entry pricing ~$30K/year, enterprise $1M+/year

**SaaS Benchmarks:**
- SaaS Capital 2025: median hosting = 5% of ARR
- Bessemer: target SaaS gross margin 75%+
- Data-heavy SaaS: 15-24% of revenue as infra COGS

**Process Mining Hardware:**
- IBM Process Mining minimum: 16 cores, 64 GB RAM, 300 GB storage (10M events)

*Version 1.0 — March 2026*
