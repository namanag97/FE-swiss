# Quality Dimensions for Process Models

The four quality criteria for discovered process models, formalized by Buijs, van Dongen, and van der Aalst.

```
                    The Quality Trade-Off

        High Fitness ◄──────────────────► High Simplicity
              │                                  │
              │     IDEAL MODEL                  │
              │     (balanced across              │
              │      all four dimensions)         │
              │                                  │
     High Precision ◄──────────────────► High Generalization
```

---

## 1. Replay Fitness (F)

**Question**: "Can the model reproduce the behavior observed in the log?"

**Range**: [0, 1] where 1 = perfect fitness

### Measurement Techniques

**Token-Based Fitness:**

```
f = ½ × (1 - m/c) + ½ × (1 - r/p)
```

Where:
- p = produced tokens
- c = consumed tokens
- m = missing tokens (needed but not available)
- r = remaining tokens (left over after replay)

If log replays correctly (no missing/remaining tokens): f = 1.

**Alignment-Based Fitness** (more rigorous):

For each trace, compute the optimal alignment:
- Synchronous moves (cost = 0): log and model agree
- Log moves (cost > 0): event in log, no model transition
- Model moves (cost > 0): model transition, no log event

```
Fitness = 1 - (Σ optimal alignment costs) / (Σ maximum possible costs)
```

Uses A* search for optimal alignments. Guarantees finding the closest model run.

---

## 2. Precision (P)

**Question**: "Does the model allow behavior NOT observed in the log?"

A "flower model" (allows everything) has perfect fitness but terrible precision. Precision penalizes overly permissive models.

**Range**: [0, 1] where 1 = perfectly precise (only observed behavior allowed)

### Measurement Techniques

**ETC (Escaping Edges):**

For each state in the prefix automaton, compare the weighted number of non-escaping edges to total edges.

Variants:
- **ETC-one**: randomly picks one alignment
- **ETC-rep**: selects a representative set
- **ETC-all**: uses all optimal alignments

**Anti-Alignment Based Precision:**

An **anti-alignment** is a model run that maximally deviates from any observed trace. If it's easy to find highly deviating model runs, the model is imprecise.

Both Hamming distance and Levenshtein distance variants exist (Levenshtein preferred).

**Advanced Behavioral Appropriateness (aBA):**

Compares follows/precedes relations in model and log.

---

## 3. Generalization (G)

**Question**: "Will the model work for future, unseen cases?"

Guards against **overfitting** — a model that only accepts exactly the observed traces.

**Range**: [0, 1] where 1 = perfect generalization

### Measurement Techniques

**k-fold Cross-Validation Analog:**
Remove individual traces from the log, check if the model still covers them (leave-one-out).

**Anti-Alignment Based Generalization:**
Remove a trace from the log, compute anti-alignment on reduced log. If the anti-alignment is very different from the removed trace, the model does not generalize.

**Frequency-Based:**
Consider how many times each part of the model was exercised during replay. Parts visited more often are more likely to generalize.

---

## 4. Simplicity (S)

**Question**: "Is the model as simple as possible while still explaining the behavior?"

Based on **Occam's Razor**: the simplest model that explains the data is preferred.

### Measurement Techniques

| Metric | What It Measures |
|--------|-----------------|
| **Size** | Number of nodes (places + transitions) and arcs |
| **CFC (Control Flow Complexity)** | Splits: XOR = n outgoing arcs, AND = 1, OR = 2^n - 1 |
| **Extended Cardoso (ECaM)** | Subsets of places reachable from each place |
| **Average Connector Degree** | Average input/output arcs per routing element |
| **Density** | Ratio of arcs to maximum possible arcs |
| **Structuredness** | Degree of block-structuring (matched splits/joins) |
| **Entropy-Based** | Information-theoretic complexity |

---

## The Fundamental Trade-Off

These four dimensions are **in tension**:

| If You Maximize... | You Risk... | Example |
|--------------------|-------------|---------|
| Fitness alone | Overfitting → spaghetti model | Model with one path per trace |
| Precision alone | Overfitting → no generalization | Model accepts only exact observed traces |
| Generalization alone | Underfitting → flower model | Model accepts any sequence of activities |
| Simplicity alone | Loss of accuracy | Trivially simple model missing real behavior |

**Critical insight**: Existing discovery algorithms typically optimize at most two of the four dimensions. Precision, generalization, and simplicity only make sense to evaluate **if fitness is already acceptable**.

**The ideal model** strikes a balance: high enough fitness to represent reality, precise enough to not allow nonsense, general enough to handle unseen cases, and simple enough to be understandable.

---

## Practical Evaluation Workflow

```
1. Discover model from event log
2. Measure FITNESS first
   └── If fitness < threshold → model is useless, try different algorithm
3. If fitness is acceptable:
   ├── Measure PRECISION → is the model too permissive?
   ├── Measure GENERALIZATION → is the model too restrictive?
   └── Measure SIMPLICITY → is the model too complex?
4. Adjust algorithm parameters / try alternative algorithm
5. Repeat until satisfactory balance achieved
```
