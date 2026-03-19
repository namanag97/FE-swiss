# Process Mining — Intellectual Foundations

## 1. Petri Nets (Carl Adam Petri, 1939/1962)

The mathematical bedrock of process mining.

### Definition
A bipartite directed graph with two types of nodes:
- **Places** (P): conditions/states, drawn as circles
- **Transitions** (T): events/actions, drawn as rectangles
- **Arcs** (F): directed connections, F ⊆ (P × T) ∪ (T × P)
- **Tokens**: indicate current state (marking)

### Key Properties
- **Reachability**: Can marking M' be reached from M?
- **Liveness**: Can every transition eventually fire from any reachable marking?
- **Boundedness**: Is the number of tokens in any place bounded?
- **Deadlock-freedom**: Is there always at least one enabled transition?

### Petri's Guiding Principles
1. Concurrency should be a starting point, not an afterthought
2. Formalisms should be consistent with the laws of physics

### Why It Matters for PM
- Process discovery algorithms produce Petri nets as output (Alpha Miner, Region-based)
- Conformance checking replays tokens on Petri nets
- Soundness analysis uses Petri net theory
- Workflow nets are a direct subclass designed for process modeling

---

## 2. Workflow Nets (Wil van der Aalst, 1990s)

A subclass of Petri nets designed to model the lifecycle of a process instance.

### Definition
A WF-net has:
- A single **source place** i (no incoming arcs) — process start
- A single **sink place** o (no outgoing arcs) — process end
- Every node lies on a path from i to o

### Soundness Property
A WF-net N is **sound** iff:
1. **Option to complete**: For every reachable marking M, the final marking [o] is reachable from M
2. **Proper completion**: The only marking with a token in o is [o] itself
3. **No dead transitions**: Every transition can participate in at least one firing sequence from [i] to [o]

### Relationship to PM
- Alpha algorithm produces WF-nets
- Inductive Miner produces process trees that map to sound WF-nets
- Soundness is the fundamental correctness criterion for discovered models

---

## 3. Business Process Model and Notation (BPMN)

### History
- Early 2000s: Introduced by Business Process Management Initiative (BPMI)
- 2005: Maintained by Object Management Group (OMG)
- 2011: BPMN 2.0 — adds execution semantics alongside graphical notation

### Core Elements

| Element | Symbol | Purpose |
|---------|--------|---------|
| Task | Rounded rectangle | Atomic work unit |
| XOR Gateway | Diamond with X | Exclusive choice (one path) |
| AND Gateway | Diamond with + | Parallel split/join (all paths) |
| OR Gateway | Diamond with O | Inclusive choice (one or more) |
| Start Event | Thin circle | Process begins |
| End Event | Thick circle | Process ends |
| Sequence Flow | Solid arrow | Order of activities |
| Message Flow | Dashed arrow | Cross-participant communication |
| Pool/Lane | Container | Organizational unit |

### Relationship to PM
- Target representation for discovery (Split Miner produces BPMN)
- Normative modeling language for conformance checking
- PM provides data-driven complement to manual BPMN modeling

---

## 4. Event-Driven Process Chains (EPCs)

### History
- Early 1990s: August-Wilhelm Scheer, University of Saarland
- Part of ARIS (Architecture of Integrated Information Systems) framework
- Adopted by SAP to document R/3 processes

### Structure
Alternating sequences of:
- **Events** (hexagons): conditions/states
- **Functions** (rounded rectangles): activities
- **Logical operators**: AND, OR, XOR

### Relationship to PM
- Important predecessor modeling language
- SAP process documentation uses EPCs
- PM can discover and compare against EPC models

---

## 5. Formal Language Theory

### Theory of Regions
Mathematical framework for synthesizing Petri nets from languages (sets of allowed traces).

**PM Application**: Region-based discovery (Josep Carmona):
1. Observe traces (the "language")
2. Apply region theory to construct a Petri net
3. Produces models with maximal concurrency

### Footprint Matrices
The Alpha algorithm encodes formal language relationships:
- **Direct succession** (>): "ab" appears
- **Causality** (→): a > b but not b > a
- **Parallelism** (‖): a > b and b > a
- **Choice** (#): neither a > b nor b > a

### Process Algebras
- **CSP** (Hoare), **CCS** (Milner), **ACP** (Bergstra & Klop)
- Influenced process tree operators (sequence, parallel, choice, loop)
- Provide foundations for behavioral equivalence checking

---

## 6. Data Science Connections

| Technique | PM Application |
|-----------|---------------|
| Sequence mining | Trace analysis, pattern discovery |
| Clustering | Grouping similar process variants |
| Classification | Predictive outcome monitoring |
| Regression | Remaining time prediction |
| LSTM networks | Next activity and duration prediction |
| CNNs | Process outcome forecasting |
| Graph neural networks | Object-centric predictive monitoring |
| Generative AI / LLMs | Natural language process querying |
| Reinforcement learning | Process optimization |
| Decision trees | Decision point analysis |
| Anomaly detection | Deviation identification |

**Key distinction**: Traditional data science treats data as flat tables. Process mining preserves and exploits **temporal ordering** and **case structure**. Generic ML without process-aware preprocessing produces inferior results.

---

## 7. Relationship to Broader Fields

```
                    FORMAL METHODS
                    (Petri nets, process algebras,
                     temporal logic)
                         │
    OPERATIONS ──────────┼──────────── DATA SCIENCE
    RESEARCH             │             (ML, statistics,
    (optimization,       │              pattern mining)
     simulation,         │
     queuing)       PROCESS MINING
                         │
    INDUSTRIAL ──────────┼──────────── BUSINESS PROCESS
    ENGINEERING          │             MANAGEMENT
    (workflow,           │             (modeling, governance,
     efficiency)         │              lifecycle)
                         │
                    MANAGEMENT
                    SCIENCE
```

| Field | Relationship |
|-------|-------------|
| **Computer Science** | Home discipline. Origins in concurrent systems, formal methods, databases. Drives algorithm development. |
| **Operations Research** | Shared focus on optimization, simulation, queuing. Production/logistics concepts shaped PM. |
| **Industrial Engineering** | Application domain. Manufacturing optimization, quality management, lean/six sigma. PM extends time-motion studies digitally. |
| **BPM** | Conceptual framework (design → model → execute → monitor → optimize). PM is "the missing link between model-based and data-oriented analysis." |
| **Management Science** | PM provides evidence-based insights for decisions. Bridging to org behavior and strategy remains active challenge. |

Van der Aalst positioned process mining at **"the intersection of data science and process science"** — leveraging data science infrastructure (Python, Jupyter, pandas via PM4Py) while contributing a unique process-aware perspective.
