# Process Mining Ontology — Core Concepts & Formal Definitions

## 1. Event Data Entities (The Log Layer)

The foundation of all process mining is event data. Every entity below has a formal definition rooted in set theory.

### 1.1 Event

The atomic unit of observation. An event records that *something happened* at a specific point in time.

**Formal**: An event e is characterized by a set of attributes. At minimum: an activity label, a timestamp, and a case identifier.

### 1.2 Trace

An ordered sequence of events belonging to the same case.

**Formal**: A trace σ = ⟨e₁, e₂, ..., eₙ⟩ where each eᵢ belongs to the same case and events are ordered by timestamp.

### 1.3 Case (Process Instance)

A uniquely identifiable instance of a process — one purchase order, one patient visit, one IT ticket.

**Formal**: A case c is identified by a case ID and contains exactly one trace.

### 1.4 Activity

A well-defined step in a process (the "what happened"). Labels events with their action type.

**Examples**: "Create Purchase Order", "Approve Invoice", "Ship Goods"

### 1.5 Resource

The actor (person, system, role, department) that performed the event. The "who".

### 1.6 Timestamp

The date/time when the event occurred. The "when". Enables temporal ordering and performance analysis.

### 1.7 Attribute

Any named property attached to a log, trace, or event. Carries additional data (cost, priority, location, etc.).

### 1.8 Event Log

A multiset of traces. The complete dataset for process mining.

**Formal**: An event log L is a multiset of traces over a set of activities A: L ∈ B(A*) where B denotes a multiset (bag) and A* is the set of all finite sequences over A.

### 1.9 Classifier

A function that assigns each event an identity (e.g., activity name), enabling comparison and grouping. Composed of one or more attribute keys (e.g., `concept:name + lifecycle:transition`).

---

## 2. Entity Relationships

```
Event Log ──contains──▶ Traces ──contains──▶ Events
Event ──has──▶ Activity (label)
Event ──has──▶ Timestamp
Event ──has──▶ Resource (optional)
Event ──has──▶ Attributes (0..*)
Event ──has──▶ Lifecycle Transition
Trace ──identified-by──▶ Case ID

Process Model ──represents──▶ Process
Event Log ──input-to──▶ Discovery ──produces──▶ Process Model
Event Log + Process Model ──input-to──▶ Conformance Checking ──produces──▶ Diagnostics
Event Log + Process Model ──input-to──▶ Enhancement ──produces──▶ Enriched Model
```

---

## 3. Process Model Entities (The Model Layer)

### 3.1 Petri Net Family

**Petri Net**: A bipartite directed graph N = (P, T, F) where:
- P = places (conditions/states, drawn as circles)
- T = transitions (events/actions, drawn as rectangles)
- F ⊆ (P × T) ∪ (T × P) = flow relation (directed arcs)

**Marked Petri Net**: (N, M) where M: P → ℕ is a marking (token distribution)

**Workflow Net (WF-net)**: A Petri net with:
- A single source place i (no incoming arcs)
- A single sink place o (no outgoing arcs)
- Every node on a path from i to o

**Sound WF-net**: A WF-net where:
1. From any reachable marking, the final marking [o] is reachable (option to complete)
2. The only marking with a token in o is [o] (proper completion)
3. There are no dead transitions (no useless steps)

**Free-Choice Net**: For all transitions t₁, t₂: if •t₁ ∩ •t₂ ≠ ∅ then •t₁ = •t₂ (choices and synchronizations are cleanly separated)

**Marked Graph**: Each place has at most one input and one output transition

**State Machine**: Each transition has at most one input and one output place

### 3.2 Process Trees

Hierarchical representation where leaves are activities and internal nodes are operators:
- **→ (Sequence)**: execute children left to right
- **× (Exclusive Choice)**: execute exactly one child
- **+ (Parallel)**: execute all children concurrently (interleaved)
- **↺ (Loop)**: execute the "do" part, then optionally the "redo" part, then repeat

**Key property**: Process trees guarantee soundness by construction.

### 3.3 Causal Nets (C-nets)

**Formal**: A tuple (A, aᵢ, aₒ, D, I, O) where:
- A = set of activities
- aᵢ = start activity, aₒ = end activity
- D = set of dependencies
- I = function mapping each activity to input bindings
- O = function mapping each activity to output bindings

Output bindings create obligations; input bindings remove obligations. Behavior is restricted to valid binding sequences.

### 3.4 BPMN (Business Process Model and Notation)

Industry standard (OMG, BPMN 2.0 since 2011) integrating:
- **Tasks**: atomic work units
- **Gateways**: Exclusive (XOR), Parallel (AND), Inclusive (OR), Event-based
- **Events**: Start, Intermediate, End (with subtypes: message, timer, error, signal, etc.)
- **Sequence Flows**: connecting elements within a pool
- **Message Flows**: connecting elements across pools
- **Pools/Lanes**: organizational partitioning

### 3.5 Declare (Declarative Models)

Constraint-based models using LTL on finite traces (LTLf). Rather than prescribing exact paths, they define rules that must hold.

**Key constraint templates**:

| Template | Meaning | LTL |
|----------|---------|-----|
| Existence(A, n) | A occurs at least n times | — |
| Absence(A, n) | A occurs at most n-1 times | — |
| Init(A) | A is the first activity | — |
| Response(A, B) | If A occurs, B eventually follows | □(a → ◇b) |
| Precedence(A, B) | B only occurs if A has occurred before | (¬b U a) ∨ □(¬b) |
| Succession(A, B) | Response + Precedence combined | — |
| ChainResponse(A, B) | A must be immediately followed by B | □(a → ○b) |
| ChainPrecedence(A, B) | B must be immediately preceded by A | □(○b → a) |
| NotCoExistence(A, B) | A and B never both occur in same case | — |
| AlternateResponse(A, B) | After each A, B must occur before next A | — |

---

## 4. Lifecycle Model (XES Standard)

The XES lifecycle extension defines 13 transitions for activity instances:

```
             ┌──────────────────────────────────────────────────┐
             │                    OPEN                          │
             │  ┌─────────────────┐  ┌───────────────────────┐ │
  schedule   │  │  NOT RUNNING    │  │      RUNNING          │ │
────────────>│  │                 │  │                       │ │
             │  │  Ready ─assign─>│  │  InProgress           │ │
             │  │  Assigned ──────│──│──start──> InProgress  │ │
             │  │    ↻ reassign   │  │    ↻ suspend/resume   │ │
             │  └─────────────────┘  └───────────────────────┘ │
             └──────────────────────────────────────────────────┘
                       │                        │
                manualskip/                  complete ──> Closed.Completed
                withdraw                    ate_abort ──> Closed.Aborted (case continues)
                   │                        pi_abort ──> Closed.Aborted (case also aborted)
                   ▼
             Closed.Cancelled
```

| Transition | From | To |
|-----------|------|-----|
| schedule | (Start) | Open.NotRunning.Ready |
| assign | Ready | Assigned |
| reassign | Assigned | Assigned |
| start | Assigned | InProgress |
| suspend | InProgress | Suspended |
| resume | Suspended | InProgress |
| complete | InProgress | Closed.Completed |
| autoskip | (Start) | Closed.Cancelled.Obsolete |
| manualskip | NotRunning | Closed.Cancelled.Obsolete |
| withdraw | NotRunning | Closed.Cancelled.Exited |
| ate_abort | Running | Closed.Cancelled.Aborted |
| pi_abort | Open | Closed.Cancelled.Aborted |

---

## 5. Event Data Standards

### 5.1 XES (eXtensible Event Stream) — IEEE 1849

**Adopted**: 2010 by IEEE TF-PM. **IEEE Standard**: 1849-2016, superseded by 1849-2023. **Format**: XML-based.

**Hierarchical structure**:
```
Log
├── Attributes (log-level)
├── Extensions (declared)
├── Classifiers (defined)
├── Trace 1
│   ├── Attributes (trace-level, e.g., case ID)
│   ├── Event 1
│   │   ├── concept:name = "Register"
│   │   ├── time:timestamp = "2024-01-15T10:30:00"
│   │   ├── org:resource = "John"
│   │   └── lifecycle:transition = "complete"
│   ├── Event 2 ...
│   └── ...
├── Trace 2 ...
└── ...
```

**7 Attribute Types**: String, Date, Integer, Float, Boolean, ID, List (composite)

**Standard Extensions**:

| Extension | Prefix | Scope | Purpose |
|-----------|--------|-------|---------|
| Concept | concept: | Log, Trace, Event | Names (process, case ID, activity) |
| Time | time: | Event | ISO 8601 timestamp |
| Lifecycle | lifecycle: | Event | Activity lifecycle transition |
| Organizational | org: | Event | Resource, role, group |
| Cost | cost: | Event | Total cost, currency |
| ID | identity: | All | Unique identifier |
| Semantic | semantic: | Any | Links to external models |
| Micro | micro: | Event | Sub-event hierarchies |

### 5.2 OCEL 2.0 (Object-Centric Event Logs)

**Purpose**: Overcomes the single-case-ID limitation of XES. Events can relate to multiple objects of multiple types simultaneously.

**Formal definition**: L = (E, O, EA, OA, evtype, time, objtype, eatype, oatype, eaval, oaval, E2O, O2O) where:
- E = events, O = objects
- EA = event attributes, OA = object attributes
- evtype, objtype = type assignments
- eaval = event attribute values
- oaval = object attribute values (time-indexed for dynamic attributes)
- **E2O ⊆ E × U_qual × O** = qualified event-to-object relationships
- **O2O ⊆ O × U_qual × O** = qualified object-to-object relationships

**Key innovations over OCEL 1.0**:
- Qualified E2O relationships (annotated with relationship nature)
- Object-to-Object (O2O) relationships
- Dynamic object attributes (values change over time)

**Exchange formats**: SQLite, XML, JSON

**Why it matters**: Real processes involve multiple interacting objects. A single event (e.g., "create shipment") may reference 1 order, 1 customer, 10 items, 3 packages. Forcing this into a single case ID causes convergence (merging cases) or divergence (duplicating events).

| Traditional PM | Object-Centric PM |
|----------------|-------------------|
| One case ID per event | Events reference multiple objects |
| Flat event log | Graph-based event data |
| Re-extract for each analysis angle | Single extraction, multiple views |
| Misses cross-object dependencies | Reveals inter-object bottlenecks |

### 5.3 CSV (Intermediate Format)

Rows = events, columns = attributes. Minimum required: Case ID, Activity Name, Timestamp. Commonly used as intermediate format between source systems and process mining tools.

---

## 6. The Four Perspectives

### 6.1 Control-Flow Perspective

**Focus**: Ordering and dependencies of activities — "what happened and in what order?"

**Reveals**: Standard flows, variant patterns, deviations, parallelism, choices, loops, deadlocks

**Techniques**: All discovery algorithms, DFG construction, variant analysis

### 6.2 Organizational Perspective

**Focus**: Resources involved — "who performed what?"

**Social Network Mining Metrics**:

| Metric | Definition |
|--------|-----------|
| Handover of Work | i completes activity, j completes the next → work transfer |
| Subcontracting | j executes activity between two of i's activities |
| Working Together | How often two individuals work on the same case |
| Similar Activities | Who performs the same types of activities (role similarity) |
| Reassignment | How often work transfers between resources |

**Reveals**: Interaction patterns, bottleneck resources, ping-pong behavior, role structures

### 6.3 Case / Data Perspective

**Focus**: Properties of different cases — "what characterizes this case?"

**Critical insight**: Choosing different case identifiers fundamentally changes findings. Example: analyzing by Service ID showed 98% FCR, but switching to Customer ID revealed only 82% — exposing 3,000+ hidden repeat contacts.

**Techniques**: Decision mining, case clustering, attribute correlation, predictive monitoring

### 6.4 Time Perspective

**Focus**: Timing and frequency — "when and how long?"

**Key measures**:
- **Throughput time**: total case duration (start to end)
- **Waiting time**: idle time between activities
- **Processing time**: active work time per activity
- **Sojourn time**: waiting + processing time

**Timestamp interpretation matters**:
- Start → Complete = active work duration
- Scheduled → Complete = total availability-to-resolution
- Scheduled → Start = queue wait time

**Techniques**: Dotted charts, performance overlay, bottleneck detection, cycle time analysis
