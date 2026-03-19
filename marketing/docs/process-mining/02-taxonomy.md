# Process Mining Taxonomy — Complete Type Classification

## The Three Fundamental Types

```
                    PROCESS MINING
                         │
          ┌──────────────┼──────────────┐
          │              │              │
     DISCOVERY     CONFORMANCE    ENHANCEMENT
     (Play-In)     (Play-Out)     (Extend/Repair)
          │              │              │
    Produces model  Compares model   Improves model
    from event log  against log      using log data
```

---

## Type 1: Process Discovery

Takes an event log and produces a process model **without any prior model**.

### By Output Representation

| Sub-type | Output | Description |
|----------|--------|-------------|
| DFG Discovery | Directly-Follows Graph | Simplest form; nodes = activities, arcs = sequential relations with frequency/performance |
| Petri Net Discovery | Place/transition net | Compact representation of concurrency, choice, loops |
| BPMN Discovery | BPMN 2.0 diagram | Industry-standard integrating control-flow, subprocesses, data, resources |
| Process Tree Discovery | Hierarchical tree | Operator nodes (→, ×, +, ↺) with activity leaves; guarantees soundness |
| Causal Net Discovery | C-net | Input/output bindings per activity; flexible representation |
| Declarative Discovery | Declare model (LTL) | Constraint-based; defines rules rather than exact paths |

### By Perspective

| Perspective | Focus | Example Output |
|------------|-------|----------------|
| Control-flow | Activity ordering and dependencies | Process model (Petri net, BPMN) |
| Organizational | Who performs what, handover patterns | Social network, role hierarchy |
| Case / Data | What data conditions drive routing | Decision tree at split points |
| Time / Performance | When things happen, how long they take | Performance-annotated model |

---

## Type 2: Conformance Checking

Compares an **existing process model** with an **event log** to detect deviations. Answers: "Are we following the rules?"

### Techniques

**Token-Based Replay**
- Heuristic technique using four counters:
  - Produced tokens (p), Consumed tokens (c), Missing tokens (m), Remaining tokens (r)
- Fitness = ½ × (1 - m/c) + ½ × (1 - r/p)
- Easy to implement but local decision-making can produce misleading results

**Alignment-Based Conformance** (Gold standard)
- Exhaustive search for optimal alignment between observed trace and model
- Three move types:
  - **Synchronous move**: log and model advance together (cost = 0)
  - **Log move**: event in log, no corresponding model transition (deviation)
  - **Model move**: model transition, no corresponding log event (deviation)
- Uses A* search to find minimum-cost alignment
- Guarantees finding the closest model run

**Footprint Comparison**
- Compares footprint matrices derived from model and log
- Relations: direct succession (>), causality (→), parallelism (||), choice (#)
- If matrices identical → log conforms to model

**Declarative Conformance (LTL Checking)**
- Checks whether traces satisfy LTL constraints from a Declare model

**Anti-Alignment Based**
- Finds model runs that maximally deviate from observed behavior
- Used for measuring precision

**Multi-Perspective Conformance**
- Extends beyond control-flow to include data, time, and resource perspectives

### Two Types of Discrepancies

1. **Unfitting log behavior**: Behavior observed in reality but NOT allowed by the model
2. **Additional model behavior**: Behavior allowed in model but NEVER observed in reality

---

## Type 3: Enhancement

Uses event log information to **extend or improve** an existing process model.

### Sub-types

**Model Repair**
- Modifies the model structure to better reflect observed reality
- Addresses structural discrepancies

**Model Extension**
- Adds new perspectives by cross-correlating model with log:

| Extension Type | What It Adds |
|---------------|-------------|
| Performance | Timing/bottleneck information (highlighting slow transitions) |
| Organizational | Resource/role annotations |
| Decision Point | Data conditions at routing decisions |
| Cost | Cost information per activity |
| Probability | Routing probabilities at decision points |

---

## Complete Algorithm Family Tree

```
PROCESS DISCOVERY ALGORITHMS
│
├── Footprint-Based
│   ├── Alpha Miner (α, 2000) — van der Aalst, Weijters, Maruster
│   ├── Alpha+ (handles short loops)
│   ├── Alpha++ (non-free-choice constructs)
│   ├── Alpha# (additional patterns)
│   └── Alpha$ (improved practical applicability)
│
├── Frequency-Based
│   └── Heuristic Miner (2006) — Weijters
│       └── Uses dependency measures with frequency thresholds
│
├── Divide-and-Conquer
│   └── Inductive Miner Family (2013) — Leemans, Fahland, van der Aalst
│       ├── IM (baseline)
│       ├── IMf (infrequent filtering)
│       ├── IMd (directly-follows based)
│       ├── IMc (heuristic cuts)
│       ├── AIM (approximate, scalable)
│       └── PIM (probabilistic)
│
├── Abstraction-Based
│   └── Fuzzy Miner (2007) — Gunther
│       └── Significance/correlation metrics for interactive simplification
│
├── Evolutionary
│   └── Genetic Miner
│       └── Selection, crossover, mutation of candidate models
│
├── Theory-of-Regions
│   ├── State-Based Regions (transition system → Petri net)
│   └── Language-Based Regions (prefix-closed language → Petri net via linear inequalities)
│
├── Optimization-Based
│   └── ILP Miner (Integer Linear Programming)
│
├── Declarative
│   ├── Declare Miner
│   └── MINERful
│
└── Specialized
    ├── Split Miner (sound BPMN models)
    ├── Social Network Miner (organizational perspective)
    └── Transition System Miner (intermediate representation)
```
