# Process Mining — Full Historical Timeline

## Pre-History (1939-1995)

**1939** — Carl Adam Petri, age 13, invents the graphical notation that would become Petri nets to describe chemical processes.

**1962** — Petri formalizes his invention in his PhD dissertation *"Kommunikation mit Automaten"* (Communication with Automata) at TH Darmstadt. English translation published 1966 as part of MIT Information Systems Theory Project. This work founds the subfield of concurrency theory in computer science.

**Early 1990s** — August-Wilhelm Scheer at University of Saarland develops Event-Driven Process Chains (EPCs) as part of the ARIS framework. SAP adopts EPCs to document SAP R/3 processes.

**1992** — Wil van der Aalst completes his PhD in mathematics at Eindhoven University of Technology (TU/e): *"Timed Colored Petri Nets and Their Application to Logistics."* Joins TU/e as assistant professor, heading the SMIS research group.

**Mid-1990s** — Workflow management systems (WfMS) emerge as major enterprise technology. Van der Aalst develops **Workflow nets (WF-nets)** — a subclass of Petri nets for modeling process instance lifecycles.

---

## The Birth (1995-2003)

**1995-1998** — Jonathan E. Cook and Alexander L. Wolf at University of Colorado pioneer early process discovery for software engineering. Their 1998 paper *"Discovering Models of Software Processes from Event-Based Data"* describes three methods (neural networks, algorithmic, Markovian).

**1998** — Independently, Rakesh Agrawal, Dimitrios Gunopulos, and Frank Leymann publish *"Mining Process Models from Workflow Logs"* at EDBT, applying sequential pattern mining to IBM FlowMark logs.

**~1998** — Van der Aalst recognizes the core problem: "workflow technology suffered from the problem that process models made by hand had little to do with the real processes." Pivots from pure modeling to learning models from event data.

**1999** — Van der Aalst writes the proposal *"Process Design by Discovery: Harvesting Workflow Knowledge from Ad-hoc Processes"* — **coining the term "process mining."**

**2000** — The **Alpha algorithm** is developed by Wil van der Aalst, Ton Weijters, and Laura Maruster. First practical algorithm for process discovery — constructs Petri nets from event logs using footprint matrices.

**2002** — Van der Aalst and Kees van Hee publish *"Workflow Management: Models, Methods, and Systems"* (MIT Press).

**2003** — Van der Aalst, Weijters, and Maruster publish *"Workflow Mining: A Survey of Issues and Approaches"* — consolidating the emerging field.

---

## The ProM Era (2004-2008)

**2004** — **ProM 1.0 released** with 29 plug-ins. Common open-source framework sharing functionalities (log loading, visualization). Pluggable Java architecture. De facto academic standard. Now has 1,500+ plug-ins.

**2004** — Token-based replay for conformance checking developed. Four counters: produced, consumed, missing, remaining tokens.

**2004-2006** — Pioneering work on organization mining and decision mining expands process mining beyond pure control-flow.

**2005** — First International Workshop on Business Process Intelligence (BPI'05) in Nancy, France.

**2006** — **Heuristic Miner** developed by Ton Weijters. Uses frequency-based dependency measures for robust analysis. Addresses Alpha Miner's noise sensitivity.

**2007** — **Fuzzy Miner** developed by Christian W. Gunther. Designed for large, unstructured, noisy event logs. Uses significance/correlation metrics for interactive simplification.

---

## Institutionalization (2009-2012)

**October 2009** — **IEEE Task Force on Process Mining** established within IEEE CIS Data Mining Technical Committee, headquartered at TU/e. Goal: promoting research, development, education, and understanding of process mining. ~750 members, 80+ organizations.

**2009** — Fluxicon founded by Christian W. Gunther and Anne Rozinat (both PhD graduates from van der Aalst's group). Later develop **Disco**, one of the first commercial process mining tools.

**2010** — XES (eXtensible Event Stream) adopted by IEEE TF-PM as the standard format for logging events.

**2011** — **Process Mining Manifesto** published. 75+ authors from 50+ organizations. Defines 6 guiding principles, 11 challenges, 5 maturity levels. Translated into 16+ languages.

**2011** — Van der Aalst publishes *"Process Mining: Discovery, Conformance and Enhancement of Business Processes"* (Springer) — the foundational textbook.

**2011** — **Celonis founded** by Alexander Rinke, Bastian Nominacher, and Martin Klenk as a TU Munich spin-off. Discovered that enterprise IT systems automatically collect transaction data revealing process inefficiencies. Bootstrapped with TUM EXIST scholarship. Profitable within a year, landed Siemens as early client.

**~2011** — **Alignment-based conformance checking** developed by Adriansyah, Munoz-Gama, Carmona, van Dongen, and van der Aalst. Converts alignment to shortest-path problem using A* search. Supersedes token-based replay as gold standard.

---

## Commercialization (2013-2018)

**2014** — **Inductive Miner** developed by Sander Leemans, Dirk Fahland, and Wil van der Aalst. Divide-and-conquer on directly-follows graphs. Recursively builds block-structured process trees. Guarantees soundness.

**2016** — **IEEE Std 1849-2016 (XES Standard)** officially published (November 11). IEEE CIS Standards Committee. XML-based structure for transporting, storing, and exchanging event data.

**June 2016** — Celonis receives $27.5M Series A (83North, Accel).

**2017** — Van der Aalst awarded **Alexander von Humboldt Professorship** (Germany's most valuable research award, 5 million euros). Moves to RWTH Aachen University to establish Process and Data Science (PADS) group. Becomes Chief Scientist at Celonis.

**2018** — Van der Aalst publishes second edition: *"Process Mining: Data Science in Action"* (Springer).

**December 2018** — **PM4Py 1.0** released. Open-source Python library by Alessandro Berti, Sebastiaan van Zelst, and Wil van der Aalst at RWTH Aachen. Bridges process mining and Python data science ecosystem.

**June 2018** — Celonis raises $50M Series B at $1 billion valuation.

---

## Market Explosion (2019-2026)

**2019** — UiPath acquires ProcessGold. First **ICPM** (International Conference on Process Mining) in Aachen: 420+ participants (~33% academics, ~23% tool providers, ~43% end users/consultants).

**November 2019** — Celonis closes $290M Series C at $2.5 billion valuation.

**2020** — **OCEL 1.0** released. Standard format for object-centric event logs where events relate to multiple objects simultaneously. Celonis introduces "Execution Management System" concept.

**2021** — SAP acquires Signavio (~$1.2B). Celonis raises $1B Series D at **$11B valuation** — Germany's most valuable startup. Appian acquires Lana Labs. IBM acquires myInvenio.

**2022** — Microsoft acquires Minit (integrated into Power Automate). Celonis reaches ~$13B valuation. Pegasystems acquires EverFlow. Process mining software market ~$342M.

**2023** — Market grows to ~$517M. Gartner publishes **first-ever Magic Quadrant for Process Mining Tools** (Celonis = Leader). IEEE 1849-2023 supersedes 2016 XES standard. Celonis acquires Symbioworld. **OCEL 2.0** specification formalized (E2O qualifiers, O2O relations, dynamic attributes).

**2024** — Market reaches estimated $1.1-1.4B. Object-centric process mining peaks in practical application. OCEL 2.0 exchange formats finalized (SQLite, XML, JSON). Gartner MQ expanded to more vendors.

**2025** — Gartner MQ: 16 vendors evaluated. Celonis furthest on Vision, highest on Execution. Market projections: $2-4B. Generative AI infuses all major platforms. Forrester predicts process intelligence will rescue 30% of failed AI projects in 2026. Fortino Capital acquires MEHRWERK.

**2026** — Market projected $2.3-5.5B. 80% of organizations plan to integrate process mining into 10%+ of operations (Gartner). Mondelez selects Celonis for SAP S/4HANA overhaul. Celonis vs. SAP antitrust lawsuit proceeds to discovery.

---

## Key Researchers

### Wil van der Aalst (TU/e → RWTH Aachen → Celonis)
- "The Godfather of Process Mining" — coined the term, developed foundational algorithms, created the field
- H-index: 188, 170,000+ citations, 1,100+ publications
- ACM Fellow (2020), IEEE Fellow, IFIP Fellow
- Alexander von Humboldt Professorship (2018)
- Honorary degrees: Moscow HSE, Tsinghua University, Hasselt University
- Key: Alpha algorithm, workflow nets, WF-net soundness, textbooks (2011, 2016), OCEL standard

### Boudewijn van Dongen (TU/e)
- Full Professor, Chair of Process Analytics group
- IEEE TF-PM steering committee founding member
- Key: ProM framework, alignment-based conformance, XES standard

### Josep Carmona (Universitat Politecnica de Catalunya)
- IEEE TF-PM steering committee
- Key: Theory of regions applied to PM, alignment-based precision, co-authored *"Conformance Checking"* (Springer)

### Sander J.J. Leemans (Queensland University of Technology)
- Key: Inductive Miner family, directly-follows-based discovery, Inductive visual Miner

### Ton Weijters (TU/e)
- Co-developer Alpha algorithm
- Developer: Heuristic Miner

### Christian W. Gunther (Fluxicon)
- Developer: Fuzzy Miner (2007)
- Co-founded Fluxicon (2009) with Anne Rozinat; created Disco

### Massimiliano de Leoni (University of Padua)
- Predictive process monitoring, recommender systems, decision mining

### Alessandro Berti (RWTH Aachen)
- Lead developer PM4Py
- Research: quantum computing applications in process mining (2025)

### Marlon Dumas (University of Tartu)
- Co-founder Apromore
- Co-author *"Fundamentals of Business Process Management"*

### Jan Mendling (Humboldt-Universitat zu Berlin)
- Einstein-Professor of Process Science
- Co-founder Noreja, co-author *"Fundamentals of BPM"*

### Arya Adriansyah
- Developed alignment-based conformance checking framework using A* search (gold standard)
