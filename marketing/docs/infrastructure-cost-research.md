# Infrastructure & Deployment Cost Research: Process Mining Platforms

**Research Date: March 2026**
**Methodology: Web research from engineering blogs, SEC filings, case studies, official documentation, job postings, and pricing pages**

---

## 1. Celonis Infrastructure & Architecture

### Technology Stack (Confirmed)

| Component | Technology |
|-----------|-----------|
| **Core Database** | **Celonis SaolaDB** -- custom-built analytical column-store **in-memory** database, combining relational and graph database techniques |
| **Query Engine** | **PQL (Process Query Language) Engine** -- independent language (not SQL extension), 150+ process operators, optimized for single-server multi-core scaling |
| **Historical DB** | **Vertica** (legacy, migrated away to ETL Engine / SaolaDB) |
| **ETL** | Custom ETL Engine (migrated from Vertica SQL to SparkSQL, ~90% auto-translated) |
| **Streaming** | **Apache Kafka** via Lenses.io (acquired Oct 2021), Kafka Connect framework |
| **Container Orchestration** | **Kubernetes** (EKS, AKS, GKE) -- hundreds of clusters across AWS, Azure, GCP |
| **IaC / DevOps** | Terraform, Kustomize, Ansible, GitHub Actions, Datadog, Grafana |
| **Languages** | Java, Python, JavaScript, Go |
| **Cloud** | Multi-cloud: AWS (primary, via ROSA/OpenShift), Azure, GCP |
| **ML/AI** | Amazon Bedrock, SageMaker |

### Architecture Key Details

- **SaolaDB is snapshot-based**: data is not continuously updated; bulk update mechanism loads point-in-time snapshots from source systems
- **Single-server scaling philosophy**: PQL Engine focuses on scaling with CPU cores within one server (not distributed across network) to minimize latency
- **In-memory compression**: lightweight compression techniques for large-scale data, inspired by Lang et al.
- **Multi-instance architecture**: each customer gets isolated instances for security/compliance

### Celonis Scale & Financials

| Metric | Value | Source |
|--------|-------|--------|
| **ARR (2023)** | ~$771M (39% YoY from $400M in 2021) | Contrary Research, GetLatka |
| **Customers** | 1,400+ across 16 industries | Contrary Research |
| **Employees** | 3,128 (2024) | Contrary Research |
| **Valuation (Series D, Aug 2022)** | $13.2B | Contrary Research |
| **Secondary market valuation (Jun 2024)** | ~$7.7B (~10x revenue) | Contrary Research |
| **Market share (2021)** | 44.4% of process mining market | Contrary Research |
| **Entry pricing** | ~$30K/year (1-yr sub, 3-yr minimum contract) | Contrary Research |
| **Typical enterprise range** | $15K-$200K+/year per implementation | TrustRadius, PeerSpot |
| **Large enterprise CoE** | $1M+ annually | ProcessMaker pricing guide |

### Celonis Infrastructure Implications

- **Hundreds of Kubernetes clusters** managed across 3 cloud providers (confirmed by job postings: "managing hundreds of Kubernetes clusters and millions of cloud resources")
- Multi-cloud strategy with OpenShift on AWS (ROSA) as primary
- Chief Engineering Officer Vaish Sashikanth (formerly VP Engineering at YouTube) -- indicates significant engineering scale
- Celonis Academy has 300,000+ learners -- platform serves massive user base

---

## 2. StarRocks Deployment Costs

### Minimum Production Configuration

| Node Role | Count | CPU | RAM | Storage |
|-----------|-------|-----|-----|---------|
| **FE (Frontend)** | 3 (1 Leader + 2 Followers) | 8 cores | 16 GB | 100 GB HDD |
| **BE (Backend)** | 3+ | 16 cores | 64 GB | Formula-based (see below) |
| **CN (Compute, optional)** | Elastic | Varies | Varies | None (stateless) |

**BE Storage Formula**: Raw data size x Replica count (default 3) / Compression ratio (3:1 to 5:1 typical)

### AWS Cost Estimates (StarRocks)

**Benchmark Configuration** (from StarRocks vs Snowflake comparison):
- **16 x r5.2xlarge** instances (8 vCPU, 64 GB RAM each) = 128 total CPU cores
- **Cost: $0.504/hr per instance x 16 = $8.06/hr ($5,803/month)**
- Performance: **2x faster than Snowflake XL warehouse** (128 cores, $32/hr = $23,040/month)
- **StarRocks is ~4x cheaper per query** (2x faster at 1/4 the hourly cost)

**Minimum Production Cluster** (3 FE + 3 BE):
- 3 x m5.xlarge (FE, 4 vCPU, 16 GB): $0.192/hr x 3 = $0.576/hr = ~$415/month
- 3 x r5.2xlarge (BE, 8 vCPU, 64 GB): $0.504/hr x 3 = $1.512/hr = ~$1,089/month
- **Total minimum cluster: ~$1,500/month** (before storage/networking)
- With reserved instances (1-yr): ~$900-1,000/month

### CelerData (Managed StarRocks)

- Available on AWS Marketplace as BYOC (Bring Your Own Cloud)
- Pay-as-you-go model, no fixed pricing published
- Deploys in customer's own cloud account
- Contact sales for pricing (custom quotes)

### Key Case Study: Fanatics (6PB Scale)

| Metric | Value |
|--------|-------|
| **Data volume** | 6 PB on Iceberg, accessible via StarRocks |
| **Daily events** | ~1 billion from 800+ event types |
| **Datasets** | 120,000+ |
| **Kafka ingestion** | ~100,000 messages/second stable |
| **Tables/views** | Multiple thousands on single cluster |
| **Routine loads** | ~800 running with low overhead |
| **Snowflake reduction** | Up to 95% usage, ~90% cost savings |
| **Query improvement** | 10x faster than Athena (which had >30s median) |
| **Tablet size** | Optimized to ~1 GB |

### Key Case Study: Fresha (UK)

- Moved homepage analytics from Postgres to StarRocks
- **p95 latency: ~20s (Postgres) -> ~200ms (StarRocks)** with minute-level freshness
- Architecture: single ingestion spine with 3 lanes (real-time to StarRocks, historical to Iceberg/Paimon, search to Elasticsearch)

---

## 3. Kafka / Streaming Costs at Scale

### AWS MSK (Managed Streaming for Kafka)

**Standard Broker Pricing:**

| Instance | vCPU | RAM | Hourly Cost |
|----------|------|-----|-------------|
| kafka.t3.small | 2 | 2 GB | $0.0456 |
| kafka.m5.large | 2 | 8 GB | $0.21 |
| kafka.m7g.large | 2 | 8 GB | $0.204 |
| kafka.m5.xlarge | 4 | 16 GB | $0.42 |

**Express Broker Pricing:**

| Instance | vCPU | RAM | Hourly Cost |
|----------|------|-----|-------------|
| express.m7g.large | 2 | 8 GB | $0.408 |
| express.m7g.4xlarge | 16 | 64 GB | $3.264 |
| express.m7g.16xlarge | 64 | 256 GB | $13.056 |

**Storage**: $0.10/GB-month (EBS), with 3x replication = 3x storage cost

**Real-World MSK Cost Examples:**
- Small production (3 x kafka.m5.large, 1TB storage, 100 GB transfer): **$566/month**
- MSK Serverless (50 partitions, 500 GB storage, 1 TB data): **$746/month**
- 1 GiB/s Kafka workload on MSK: **$226,671/month** (extreme case from AutoMQ benchmarks)

**MSK Serverless Pricing:**

| Component | Price |
|-----------|-------|
| Cluster-hours | $0.75/hour |
| Partition-hours | $0.0015/hour |
| Storage | $0.10/GiB-month |
| Data In | $0.10/GiB |
| Data Out | $0.05/GiB |

### Confluent Cloud

| Tier | eCKU Cost | Data Transfer | Storage |
|------|-----------|---------------|---------|
| Basic | Free (1st), then $0.14/hr | $0.05/GB | $0.08/GB-month |
| Standard | $0.75/hour | $0.04-$0.05/GB | $0.08/GB-month |
| Enterprise | $2.25/hour | $0.02-$0.05/GB | $0.08/GB-month |

**Real-World Confluent Cloud Examples:**
- 1 GB produce + store + consume: **~$1/month**
- Real-time inventory management system: **~$7,000/month budget**
- Confluent Cloud is **8-24x more expensive** than self-managed vanilla Kafka
- Networking represents **>50% of Kafka infrastructure costs** in multi-AZ deployments

### Redpanda vs Kafka

| Workload | Redpanda Nodes | Kafka Nodes | Annual Savings |
|----------|---------------|-------------|----------------|
| 50 MB/sec | 3 | 3+ (plus ZK/SR) | Up to $12,969 |
| 500 MB/sec | 3 | 9 (plus ZK/SR) | $80,000-$150,000 |
| 1 GB/sec | 3 | 9 (plus ZK/SR) | $80,000-$150,000 |

**Redpanda Enterprise with Tiered Storage:**
- Small workload: $70,000 annual savings
- Large workload: **up to $1.2M annually**

**Instance types tested**: i3en.xlarge, i3en.large, is4gen.medium (Graviton/ARM)

**Redpanda Serverless**: Base compute $0.10/hr, ingress $0.045/GB, egress $0.04/GB, storage $0.09/GB-month

### Other Managed Kafka Options

| Provider | Pricing |
|----------|---------|
| Aiven Kafka Startup | $290/month |
| Aiven Kafka Business | $725/month |
| Aiven Kafka Premium | $2,800/month |

---

## 4. Apache Iceberg Storage Costs

### S3 Storage Base Costs

| Tier | Per GB | Per TB |
|------|--------|--------|
| **S3 Standard (first 50 TB)** | $0.023 | **$23/TB/month** |
| **S3 Standard (50-500 TB)** | $0.022 | $22/TB/month |
| **S3 Standard (500+ TB)** | $0.021 | $21/TB/month |
| **S3 Tables (Iceberg-native)** | $0.0265 | $27.14/TB/month |
| S3 Infrequent Access | $0.0125 | $12.50/TB/month |
| Glacier Deep Archive | $0.001 | $1/TB/month |

### Iceberg-Specific Overhead

- **Metadata/snapshot accumulation**: Every committed transaction creates a new snapshot; old data files persist until explicitly expired
- **Without housekeeping**: Up to **98% of storage can be historical/orphaned data**
- **Compaction reduces query costs by 30-40%** (small-file overhead reduction)
- **S3 request costs**: $0.40 per million GETs -- small file problems generate significant metadata/LIST overhead
- **Default target file size**: 512 MB (configurable via `write.target-file-size-bytes`)

### S3 Tables vs Self-Managed Iceberg

- S3 Tables storage is **15% more expensive** than Standard S3
- Compaction cost differential is dramatic:
  - **S3 Tables compaction (100 GB)**: $5.04
  - **EMR self-managed compaction (100 GB)**: $0.17 (**~29x cheaper**)
  - For 953.7 GB: S3 Tables costs $47.69 vs Onehouse $2.29 (**20.8x cheaper**)
- S3 Tables compaction delay: 2.5-3 hours vs self-managed ~30 minutes

### Iceberg vs Hive Cost Impact

- Organizations report **5x storage cost reduction** after migrating from Hive to Iceberg
- Hive hidden costs: compaction jobs, oversized partitions, query inefficiencies
- Hive metadata: O(N) directory listings vs Iceberg O(1) RPC for snapshot access
- Hive requires RDBMS for metastore + directory listing costs on S3

### Real-World Iceberg Deployment: Insider Engineering

- **90% reduction in S3 costs** after migrating to Iceberg format
- Key driver: elimination of redundant data copies and improved partition pruning

---

## 5. OLAP Platform Comparison Costs

### Snowflake

| Metric | Value | Source |
|--------|-------|--------|
| **Credit cost (on-demand)** | $2-4 each | Snowflake docs |
| **Credit cost (annual commit)** | $1.50-2.50 each | Snowflake docs |
| **XL warehouse** | 16 credits/hr = **$32/hr** | Snowflake docs |
| **Billing minimum** | 60 seconds per warehouse resume | Snowflake docs |
| **FY2025 Revenue** | $3.63B | SEC filing |
| **FY2025 Gross Margin** | 66.5% (GAAP) | SEC filing |
| **COGS as % of revenue** | ~33% | SEC filing |
| **Cloud infra as % of COGS** | 64% (FY2024), 72% (Q3 FY2026) | SEC filing |
| **Cloud infra as % of revenue** | ~20-24% | Calculated |

**Key insight**: Snowflake spends ~20-24% of revenue on cloud infrastructure (AWS/Azure/GCP), meaning for every $1 of revenue, they pay $0.20-0.24 to cloud providers.

### Databricks

| Metric | Value | Source |
|--------|-------|--------|
| **DBU pricing** | $0.07/DBU (basic) to $0.65+/DBU (enterprise) | Databricks pricing |
| **ARR run rate** | $4.8B | Dec 2025 reporting |
| **Gross margin** | 74% (down from 77%, due to AI compute) | Sacra research |
| **Net dollar retention** | 140% | Sacra research |
| **Typical enterprise spend** | $50K-$150K/month (100TB+ orgs) | Industry reports |
| **Per-user cost** | $800-1,500/month (50-200 analysts) | Industry reports |
| **Valuation** | $134B (Dec 2025) | News reports |

**Key insight**: Cloud infrastructure costs often **exceed DBU charges** (50-200% of DBU spend), meaning total platform cost = DBU charges + 1.5-3x in cloud infra.

### ClickHouse Cloud

| Configuration | Monthly Cost |
|---------------|-------------|
| **Minimum production** | ~$500/month |
| **Mid-range** | $2,000-5,000/month |
| **Large** | Up to $100,000/month |
| **Compute pricing** | $0.22-0.39/compute unit-hour |
| **Storage** | ~$50/TB compressed (~$25.30/TB raw) |

**Self-hosted ClickHouse on AWS:**
- 3-node m6i.2xlarge (8 vCPU, 32 GB): **~$841/month compute**
- 6-node cluster: **~$1,682/month compute**
- Bare metal (OpenMetal): **~$5,514/month** vs AWS on-demand **~$24,048/month** for comparable 50TB

**Note**: ClickHouse Cloud implemented ~30% price increase in Jan 2025.

---

## 6. Process Mining Platform Hardware Requirements

### Microsoft Power Automate Process Mining (Minit)

| Event Log Size (CSV) | Process Model Size | Minimal RAM | Optimal RAM | Minimal CPU | Optimal CPU | Optimal Disk |
|----------------------|-------------------|-------------|-------------|-------------|-------------|-------------|
| 0-10 GB | 0-3 GB | 8 GB | 16 GB | 2 cores | 4 cores | SSD 100 GB |
| 10-50 GB | 3-15 GB | 16 GB | 32 GB | 4 cores | 8 cores | NVMe 200 GB |
| 50-100 GB | 15-30 GB | 32 GB | 48 GB | 8 cores | 16 cores | NVMe 400 GB |
| 100-150 GB | 30-45 GB | 48 GB | 64 GB | 8 cores | 16 cores | NVMe 600 GB |

**Key insight**: Process model file is typically **20-30% of original CSV** event log size. This is a **desktop** client -- server requirements are higher.

### IBM Process Mining

| Component | CPU | RAM | Storage |
|-----------|-----|-----|---------|
| **Process Mining Server** | >= 16 cores @ 2.3 GHz | >= 64 GB | >= 300 GB |
| **Task Mining Backend** | >= 8 cores @ 2.3 GHz | >= 16 GB | >= 300 GB |
| **Task Mining Agent** | >= 1 GHz | >= 8 GB | >= 40 GB SSD |

Note: These are **minimum** specs for up to **10 million events per project**.

**IBM Pricing**: Starting at **$4,250/month** (3 projects, 20M events, 3 business users, 1 analyst)
**On-premises**: $32,081-$38,500/year per installation

### UiPath Process Mining

- Requires SQL Server (UTC timezone, port 1433)
- Multi-node HA requires 3+ server nodes behind load balancer
- Actual resources depend on data volume and concurrent users
- Recommended: start with "Large" configuration and scale as needed

### pm4py (Open Source)

- Standard Python requirements (numpy, pandas, etc.)
- **MicroPM4Py** variant runs on Raspberry Pi 3 B+ (1 GB RAM)
- Web services: Flask-based, single-core limitation
- No published hardware specs for production deployments

---

## 7. SaaS COGS & Infrastructure Cost Benchmarks

### Industry Benchmarks

| Metric | Range | Notes |
|--------|-------|-------|
| **SaaS gross margin** | 60-90% | Typical range |
| **SaaS COGS** | 10-40% of revenue | Infrastructure + support + 3rd party |
| **Cloud infra as % of COGS** | 50-80% | Primary COGS component |
| **Cloud infra as % of revenue** | 10-25% | Varies by platform intensity |
| **Example: Cost per customer** | $30/customer (at 1,000 customers, $30K cloud spend) | Varies enormously by platform |

### Specific Company COGS Data

| Company | Gross Margin | Cloud Infra % of Revenue | Notes |
|---------|-------------|--------------------------|-------|
| **Snowflake** | 66.5% | 20-24% | Cloud infra = 64-72% of COGS |
| **Databricks** | 74% (declining) | 15-20% (estimated) | AI usage pushing margins down |
| **Celonis** | Not public (private company) | Estimated 15-25% | Heavy in-memory compute + multi-cloud |

### Process Mining Specific COGS Considerations

Process mining platforms are **more infrastructure-intensive** than typical SaaS because:
1. **In-memory databases** require high-RAM instances (r5/r6i class, $0.50+/hr per node)
2. **Data ingestion** requires streaming infrastructure (Kafka/streaming costs)
3. **Event log storage** grows linearly with customer data volume
4. **Compute-intensive analysis**: process discovery, conformance checking, and variant analysis are CPU-bound
5. **Per-customer isolation** (Celonis multi-instance model) means dedicated compute per customer

---

## 8. AWS Reference Architecture Costs for Analytics Platform

### Estimated Monthly Cost: Process Mining SaaS (Per Customer)

Based on research, here's a modeled cost estimate for a process mining platform serving one enterprise customer:

| Component | Configuration | Monthly Cost |
|-----------|--------------|-------------|
| **StarRocks (OLAP)** | 3 FE (m5.xlarge) + 3 BE (r5.2xlarge) | $1,500 |
| **Kafka/Streaming** | 3 MSK m5.large brokers + 1TB storage | $566 |
| **S3 Storage** | 5 TB (Iceberg format) | $115 |
| **Kubernetes (EKS)** | Control plane + worker nodes | $73 (control) + $500-1,000 (workers) |
| **RDS (metadata)** | db.r5.large PostgreSQL | $262 |
| **Data transfer** | Cross-AZ + egress (~500GB) | $200-400 |
| **Monitoring** | Datadog/CloudWatch | $100-200 |
| **TOTAL per customer** | | **$3,300-$4,100/month** |

With reserved instances (1-yr) and optimization: **~$2,000-2,500/month per customer**

### At Scale (Shared Infrastructure, 100+ Customers)

| Component | Configuration | Monthly Cost |
|-----------|--------------|-------------|
| **StarRocks cluster** | 3 FE + 12 BE (shared) | $5,500 |
| **Kafka cluster** | 9 MSK m5.xlarge brokers | $3,600 |
| **S3 Storage** | 500 TB total | $11,000 |
| **Kubernetes** | 50+ worker nodes | $15,000 |
| **RDS cluster** | Multi-AZ Aurora | $2,000 |
| **Data transfer** | | $5,000 |
| **Monitoring/Ops** | | $2,000 |
| **TOTAL** | | **~$44,000/month** |
| **Per customer (100 customers)** | | **~$440/month** |
| **Per customer (500 customers)** | | **~$90-150/month** |

**Key insight**: Infrastructure cost per customer drops dramatically with scale due to shared compute and storage. At 500+ customers, infrastructure COGS could be as low as **$100-200/month per customer**.

---

## 9. Key Comparative Insights

### Cost Per Hour of Equivalent Compute

| Platform | 128 CPU cores | $/hour |
|----------|-------------|--------|
| **Snowflake XL** | 128 cores | $32.00 |
| **StarRocks (16x r5.2xlarge)** | 128 cores | $8.06 |
| **ClickHouse Cloud** | ~128 cores | $12-25 (estimated) |
| **Databricks (16x r5.2xlarge + DBUs)** | 128 cores | $8.06 + ~$5-10 DBUs = $13-18 |

### Storage Cost Per TB/Month

| Solution | $/TB/month |
|----------|-----------|
| **S3 Standard** | $23 |
| **S3 Tables (Iceberg)** | $27 |
| **Snowflake storage** | $23-40 (compressed) |
| **ClickHouse Cloud** | $25-50 (compressed) |
| **StarRocks local (EBS gp3)** | $80/TB (raw EBS) |
| **StarRocks shared-data (S3)** | $23/TB |

### Annual Streaming Cost Comparison (500 MB/sec workload)

| Solution | Annual Cost |
|----------|------------|
| **Self-managed Kafka (9 nodes)** | ~$80K-120K |
| **AWS MSK (9 brokers)** | ~$100K-150K |
| **Confluent Cloud Enterprise** | ~$150K-300K |
| **Redpanda (3 nodes)** | ~$30K-50K |

---

## Sources

### Celonis
- [Celonis AWS Partnership](https://www.celonis.com/partner/technology-partners/aws/)
- [Celonis PQL Documentation](https://docs.celonis.com/en/pql---process-query-language.html)
- [Celonis PQL Research Paper](https://www.researchgate.net/publication/360196445_Celonis_PQL_A_Query_Language_for_Process_Mining)
- [Celonis Business Breakdown - Contrary Research](https://research.contrary.com/company/celonis)
- [Celonis Engineering Careers](https://careers.celonis.com/join-us/teams/engineering)
- [Celonis K8s Platform Engineer Job](https://job-boards.greenhouse.io/celonis/jobs/7518676003)
- [Celonis Revenue - GetLatka](https://getlatka.com/companies/celonis)
- [Celonis Mirrord Blog](https://careers.celonis.com/blog/mirrord-celonis)
- [Red Hat + Celonis OpenShift](https://www.redhat.com/en/about/press-releases/red-hat-and-celonis-make-hybrid-multicloud-reality-intelligent-business-execution)
- [Celonis Lenses.io Acquisition](https://marathon.vc/blog/celonis-acquires-lenses-io)
- [Celonis StackShare](https://stackshare.io/celonis/celonis)
- [Celonis ETL Engine Docs](https://docs.celonis.com/en/etl-engine.html)

### StarRocks / CelerData
- [StarRocks Cluster Planning](https://docs.starrocks.io/docs/deployment/plan_cluster/)
- [StarRocks Best Practices](https://www.starrocks.io/blog/starrocks-best-practices-capacity-planning-and-deployment)
- [Fanatics Case Study - CelerData](https://celerdata.com/blog/from-snowflake-to-starrocksapache-iceberg-how-fanatics-cut-90-of-analytics-cost-at-6pb-scale)
- [StarRocks vs Snowflake Cost](https://medium.com/starrocks-engineering/how-to-reduce-snowflake-costs-by-80-deb87aa69bc5)
- [Fresha StarRocks Deployment](https://medium.com/fresha-data-engineering/how-we-accidentally-became-one-of-uks-first-starrocks-production-pioneers-7db249f10010)
- [CelerData AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-pgt3yj4buvue4)

### Kafka / Streaming
- [AWS MSK Pricing](https://aws.amazon.com/msk/pricing/)
- [AWS MSK Pricing Analysis - AutoMQ](https://www.automq.com/blog/understanding-aws-msk-pricing)
- [Apache Kafka Pricing Guide - Airbyte](https://airbyte.com/data-engineering-resources/apache-kafka-pricing)
- [Confluent Cloud Pricing](https://www.confluent.io/confluent-cloud/pricing/)
- [Kafka Hidden Infrastructure Costs - Confluent](https://www.confluent.io/blog/understanding-and-optimizing-your-kafka-costs-part-1-infrastructure/)
- [Redpanda vs Kafka TCO](https://www.redpanda.com/blog/is-redpanda-better-than-kafka-tco-comparison)

### Apache Iceberg
- [Iceberg Reduced S3 Cost by 90% - Insider Engineering](https://medium.com/insiderengineering/apache-iceberg-reduced-our-amazon-s3-cost-by-90-997cde5ce931)
- [S3 Tables 20x Cost Surprise - Onehouse](https://www.onehouse.ai/blog/s3-managed-tables-unmanaged-costs-the-20x-surprise-with-aws-s3-tables)
- [AWS Iceberg Best Practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/apache-iceberg-on-aws/best-practices-storage.html)
- [Iceberg Storage Monitoring](https://medium.com/@shahsoumil519/monitoring-iceberg-table-storage-active-data-vs-time-travel-overhead-s3tables-35tb-170gb-fa177fe580d4)

### OLAP Platforms
- [Snowflake Compute Cost Docs](https://docs.snowflake.com/en/user-guide/cost-understanding-compute)
- [Snowflake Gross Margin - GuruFocus](https://www.gurufocus.com/term/gross-margin/SNOW)
- [Snowflake FY2025 Results](https://www.snowflake.com/en/news/press-releases/snowflake-reports-financial-results-for-the-fourth-quarter-and-full-year-of-fiscal-2025/)
- [Databricks Pricing](https://www.databricks.com/product/pricing)
- [Databricks Revenue - Sacra](https://sacra.com/c/databricks/)
- [ClickHouse Pricing](https://clickhouse.com/pricing)
- [Self-Hosted ClickHouse Cost - Tinybird](https://www.tinybird.co/blog/self-hosted-clickhouse-cost)
- [ClickHouse Cloud Pricing Changes - Quesma](https://quesma.com/blog/clickhouse-pricing/)
- [OLAP on Bare Metal - OpenMetal](https://openmetal.io/resources/blog/dedicated-servers-blog/olap-databases-bare-metal-dedicated-servers/)

### Process Mining Requirements
- [Power Automate Process Mining Desktop Sizing - Microsoft](https://learn.microsoft.com/en-us/power-automate/minit/process-mining-desktop-sizing)
- [IBM Process Mining System Requirements](https://www.ibm.com/docs/en/process-mining/2.0.0?topic=installation-system-requirements)
- [UiPath Process Mining Architecture](https://docs.uipath.com/process-mining/automation-cloud/latest/user-guide/process-mining-automation-cloud-architecture-overview)
- [Process Mining Pricing Guide - ProcessMaker](https://www.processmaker.com/blog/how-much-does-process-mining-cost-2024-pricing-guide/)
- [IBM Process Mining Pricing](https://www.ibm.com/products/process-mining/pricing)

### AWS / Storage
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [AWS Data Lakes Cost Modeling](https://d1.awsstatic.com/whitepapers/cost-modeling-data-lakes.pdf)
- [SaaS COGS Guide - CloudZero](https://www.cloudzero.com/blog/saas-cogs/)
- [Cost Per Customer - nOps](https://www.nops.io/blog/how-can-you-measure-your-aws-cost-per-customer-saas/)
