# Process Mining Algorithms — Deep Dive

## 1. Alpha Miner Family

### Alpha Algorithm (α, 2000)

The pioneering process discovery algorithm. Developed by Wil van der Aalst, Ton Weijters, and Laura Maruster.

**Input**: Event log L
**Output**: Petri net (WF-net)

**Step 1 — Derive four ordering relations from L:**

| Relation | Notation | Definition |
|----------|----------|------------|
| Direct Succession | x > y | Traces contain "xy" consecutively |
| Causality | x → y | x > y AND NOT y > x |
| Parallelism | x ‖ y | x > y AND y > x |
| Choice | x # y | NOT x > y AND NOT y > x |

These four relations form the **footprint** of a log.

**Step 2 — Algorithm:**
1. Extract all transition names into set T_L
2. Identify T_I (initial transitions: first activities in traces)
3. Identify T_O (terminal transitions: last activities in traces)
4. Find all maximal pairs (A, B) where:
   - For all a ∈ A, b ∈ B: a → b
   - All elements within A are pairwise in #
   - All elements within B are pairwise in #
5. Create places connecting each (A, B) pair
6. Connect start place i to all transitions in T_I
7. Connect all transitions in T_O to final place o

**Limitations:**
- Cannot handle short loops of length 1 or 2
- Cannot capture non-local dependencies
- Cannot discover implicit places
- No noise handling
- Assumes complete logs (all possible directly-follows relations observed)

### Alpha+ Algorithm

Extends Alpha to handle **short loops** (length 1 and 2).

**New relations:**
- a △ b: subsequence "aba" exists in logs
- a ◇ b: both "aba" and "bab" appear

**Redefined relations:**
- Causality: a → b iff a > b AND (NOT b > a OR a ◇ b)
- Parallelism: a ‖ b iff a > b AND b > a AND NOT a ◇ b

Pre-processes length-1 loops ("tt" patterns), removes them, applies standard Alpha, reconnects.

### Alpha++

Handles **non-free-choice constructs** where choices and synchronizations are intertwined.

### Alpha# / Alpha$

Further extensions for additional patterns and improved practical applicability.

---

## 2. Heuristic Miner (2006)

Developed by **Ton Weijters** to address Alpha Miner's sensitivity to noise.

**Key principle**: "Infrequent paths should not be incorporated into the model."

**How it works:**
1. Like Alpha, starts with directly-follows graph
2. Calculates **dependency measures** between activities based on frequencies
3. Applies **threshold-based filtering**: only relations above a frequency threshold are retained
4. Produces a **Causal net** (Heuristics net)

**Dependency measure** between activities a and b:

```
            |a > b| - |b > a|
d(a,b) = ─────────────────────
            |a > b| + |b > a| + 1
```

Where |a > b| = number of times a is directly followed by b in the log.

**Advantages over Alpha:**
- Robust to noise (filters out infrequent/exceptional behavior)
- Handles incomplete data
- Configurable thresholds for sensitivity
- Handles long-distance dependencies better

**Output**: Causal net / Heuristics net (convertible to Petri net)

---

## 3. Inductive Miner Family (2013)

Developed by **Sander J.J. Leemans, Dirk Fahland, and Wil van der Aalst** at TU Eindhoven.

**Core mechanism (divide-and-conquer):**
1. Build a directly-follows graph from the event log
2. Detect **cuts** (partitions) in the graph
3. Recursively split the log into sub-logs
4. Construct a **process tree** from the recursive decomposition

**Four types of cuts:**

| Cut Type | Condition | Process Tree Operator |
|----------|-----------|----------------------|
| Sequence | Activities flow from group A to B but not B to A | → (Sequence) |
| Exclusive Choice | No edges cross the partition | × (Choice) |
| Parallel | Start/end activities with DFs in both directions between groups | + (Parallel) |
| Loop | Activities split into "do" and "redo" parts | ↺ (Loop) |

**Key property**: Guarantees **soundness by construction** — the resulting process tree is always a valid, sound model.

### Variants

| Variant | Description |
|---------|-------------|
| **IM** | Baseline algorithm |
| **IMf** | Filters infrequent behavior before cut detection |
| **IMd** | Uses directly-follows relations with different cut detection |
| **IMc** | Applies heuristic cuts |
| **AIM** | Approximate Inductive Miner — combines filtering and heuristics for scalability |
| **PIM** | Probabilistic — balances accuracy and simplicity using probabilistic methods |

**Why it's preferred**: Most widely recommended algorithm due to formal guarantees, flexibility, and scalability.

---

## 4. Fuzzy Miner (2007)

Developed by **Christian W. Gunther** for large, unstructured, noisy event logs.

**Core idea**: Use significance/correlation metrics to interactively simplify the model at the desired level of detail.

**Key metrics:**

| Metric | Purpose |
|--------|---------|
| Unary significance | How important is an individual activity? |
| Binary significance | How important is a relation between two activities? |
| Binary correlation | How closely related are two activities? |

**How it works:**
1. Compute significance for all activities and relations
2. Remove insignificant activities and edges below threshold
3. Cluster remaining low-significance activities into aggregate nodes
4. Allow interactive zoom in/out to explore different detail levels

**Output**: Fuzzy model (simplified adaptive visualization)

**Best for**: Highly variable processes that produce "spaghetti" with other algorithms

---

## 5. Genetic Miner

Uses **evolutionary algorithms** inspired by natural selection.

**How it works:**
1. Initialize a population of random candidate process models
2. Evaluate each model's **fitness** by replaying the event log
3. **Select** fittest individuals for reproduction
4. Apply **crossover**: combine fragments of two parent models
5. Apply **mutation**: randomly modify model elements
6. Repeat for N generations until convergence

**Advantages:**
- Explores broadly across the solution space
- Can handle noise and incompleteness
- Not constrained by specific structural assumptions

**Disadvantages:**
- Non-deterministic (different runs may produce different results)
- More computationally expensive than deterministic approaches
- No formal guarantees on output quality

---

## 6. Region-Based Mining

Grounded in **Petri net synthesis theory** (theory of regions).

### State-Based Regions
1. Construct a transition system from the event log
2. Find "General Excitation Regions"
3. Build Petri net places from those regions

### Language-Based Regions
1. Derive a prefix-closed language from the event log
2. Use algebraic constraints to define valid places
3. Solve a system of **linear inequalities** to determine places
4. Construct Petri net from solutions

**Advantage**: Can produce models with more concurrency than footprint-based approaches.

**Mathematically grounded** in formal language theory (Josep Carmona's contributions).

---

## 7. Other Notable Algorithms

### ILP Miner
Uses Integer Linear Programming to find optimal Petri net structure. Guarantees perfect fitness but may produce overly complex models.

### Split Miner
Focuses on producing **sound BPMN models** with high quality across all four dimensions.

### Declare Miner / MINERful
Mine **declarative models** — constraint-based representations using LTL templates rather than explicit control-flow paths. Better for flexible/knowledge-intensive processes.

### Social Network Miner
Mines the **organizational perspective** — discovers social networks, handover patterns, role structures from resource information in event logs.

### Transition System Miner
Constructs transition systems as intermediate representations. Transition systems can then be converted to Petri nets using region theory or used directly for analysis.

---

## Algorithm Selection Guide

| Scenario | Recommended Algorithm |
|----------|----------------------|
| Clean data, simple process | Alpha Miner |
| Noisy data, need robustness | Heuristic Miner |
| Need formal guarantees, scalability | Inductive Miner (IMf) |
| Highly unstructured process | Fuzzy Miner |
| Exploring solution space broadly | Genetic Miner |
| Need maximal concurrency discovery | Region-Based |
| Flexible / knowledge-intensive process | Declare Miner |
| Need sound BPMN output | Split Miner |
