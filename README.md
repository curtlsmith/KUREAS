# KUREAS — Knowledgebase with Uncertainty for Risk Engineering Analysis of Systems

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"/>
  <img src="https://img.shields.io/badge/platform-browser-green.svg" alt="Platform: Browser"/>
  <img src="https://img.shields.io/badge/framework-React_18-61dafb.svg" alt="React 18"/>
  <img src="https://img.shields.io/badge/styling-Tailwind_CSS-38bdf8.svg" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/server-none_required-orange.svg" alt="No Server Required"/>
</p>

KUREAS is a suite of open-source browser-based modules for complex system or facility reliability analysis and probabilistic risk assessment (PRA). Each module is a standalone HTML file — no server, no build step, no installation. Open in any modern browser and start working.

Designed for reliability, risk, safety, and system engineers performing what-if performance analysis, KUREAS provides professional-grade functionality for small and large technical projects.

The suite includes full [SAPHIRE](https://saphire.inl.gov) file format interoperability and adherence to the SAPHIRE NUREG guidelines ([NUREG/CR-7039](https://www.nrc.gov/reading-rm/doc-collections/nuregs/contract/cr7039/index)), as well as [OpenPSA Model Exchange Format](https://open-psa.github.io/) export support.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Module Overview](#module-overview)
- [KUREAS-HA — Hazard Analysis](#kureas-ha--hazard-analysis)
- [KUREAS-FTL — Fault Tree Logic Editor](#kureas-ftl--fault-tree-logic-editor)
- [KUREAS-ETL — Event Tree Logic](#kureas-etl--event-tree-logic)
- [KUREAS-SYS — System Evaluation](#kureas-sys--system-evaluation)
- [KUREAS-SEQ — Process Operational Logic (coming soon)](#kureas-seq--process-operational-logic)
- [KUREAS-REPORT — Report Generator (coming soon)](#kureas-report--report-generator)
- [KUREAS-KNOW — Knowledge Base Editor (coming soon)](#kureas-know--knowledge-base-editor)
- [Data Flow](#data-flow)
- [File Formats](#file-formats)
- [Technical Stack](#technical-stack)
- [Regulatory References](#regulatory-references)
- [License](#license)

---

## Quick Start

1. Clone or download the repository.
2. Open any `.html` file in a modern browser (Chrome, Edge, Firefox, Safari).
3. There is no step 3.

Each module is entirely self-contained. All dependencies are loaded from CDNs at runtime. No Node.js, no `npm install`, no build process.

---

## Module Overview

| Module | File | Version | Purpose |
|--------|------|---------|---------|
| **KUREAS-HA** | `KUREAS-HA.html` | v1.1 | Hazard analysis, initiating event frequency quantification, and screening |
| **KUREAS-FTL** | `KUREAS-FTL.html` | v1.1 | Fault tree logic editing, visualization, and analysis |
| **KUREAS-ETL** | `KUREAS-ETL.html` | v1.0 | Event tree logic visualization with SAPHIRE file import |
| **KUREAS-SYS** | `KUREAS-SYS.html` | v1.0 | System modeling, FMEA, failure analysis, and importance measures |
| **KUREAS-SEQ (planned)** | `KUREAS-SEQ.html` | v1.0 | Process Operational Logic (POL) diagrams and event tree generation |
| **KUREAS-REPORT (planned)** | `KUREAS-REPORT.html` | v1.0 | Integrated report assembly from all module outputs |
| **KUREAS-KNOW (planned)** | `KUREAS-KNOW.html` | v1.0 | General-purpose `.KNOW` file viewer and editor |

---

## KUREAS-HA — Hazard Analysis

Comprehensive hazard identification, screening, and frequency quantification for complex facility initiating event analysis.

### Features

- **Hierarchical hazard list** — 4-level tree structure (Category → Group → Type → Event) with start-from-scratch, load from JSON/CSV, or merge with existing lists
- **Multi-state analysis** — analyze hazards across multiple plant operating states (e.g., full power, low power, shutdown) with configurable time fractions and reorderable state columns
- **Multiple occurrence models:**
  - **Frequency** — direct frequency with lognormal, normal, gamma, beta, uniform, log-uniform, histogram, or constrained noninformative (CNI) distributions
  - **Probability per Opportunity** — opportunity rate × conditional probability with the same distribution suite
  - **Hazard Curve** — tabular magnitude vs. frequency data with paste-from-Excel support
  - **NUREG-2169 Fire Ignition** — built-in Table 4-4 data with multi-source bin selection, component count scaling, and propagation factor: `Final Freq = (Table Freq / # Components) × Propagation Factor`
  - **Screening** — screen out hazards by low frequency, low consequence, or not applicable, with screening rationale preserved in reports
- **Hazard categorization** — configurable frequency-based categories (e.g., Anticipated, Design Basis, Beyond Design Basis) with customizable names, frequency range boundaries, and display in reports and exports
- **Hazard frequency visualization** — interactive logarithmic frequency plot across all operating states with color-coded state overlays
- **Rich text documentation** — per-hazard supporting information using a built-in rich text editor with font control, headings, and lists
- **In-browser report preview** — full report rendered in an iframe with download (.doc) and print options
- **Report sections** — facility info, operating schedule, hazard summary table, individual hazard details, fire hazards (NUREG-2169), screened hazards, and unanalyzed hazards
- **Export** — Word (.doc) report, Markdown (.md), SAPHIRE files (.BEI, .BED, .FTL), and Excel-compatible CSV hazard summary
- **Settings** — font size, font family, background theme, operating state colors, default states, hazard categorization scheme

---

## KUREAS-FTL — Fault Tree Logic Editor

Full fault tree authoring, visualization, and analysis environment with SAPHIRE and OpenPSA interoperability.

### Features

- **Create or import** — start a blank project from scratch or import SAPHIRE MAR-D files (.FTL, .BED, .BEI, .GTD, .FTC) via multi-file selection; also loads native `.KNOW_FTL` project files
- **Full editing** — add, delete, rename, and edit gates and basic events; modify descriptions, probabilities, and notes; copy/paste sub-tree structures; drag-and-drop basic events and fault trees onto the canvas
- **Scope-aware editing** — when editing shared nodes (appearing in multiple locations), choose to apply changes to one instance or all instances across the project; name conflict detection prevents collisions between gates and basic events
- **Gate types** — AND, OR, NOT, NAND, N-of-M Voting, and Transfer gates; Transfer gates auto-resolve to display referenced sub-trees
- **Interactive canvas** — zoom, pan, expand/collapse, click-to-edit, right-click-to-pin, and search by name
- **Cut set analysis** — load cut sets from `.FTC` files; floating, draggable results window sorted by probability contribution with fault tree top event probability
- **Basic Event List** — floating, draggable/resizable window listing all basic events with inline editing and drag-to-canvas functionality
- **Change tracking** — append-only change log with timestamps (View Changes button); undo support (Ctrl+Z, up to 50 levels); unsaved changes warning on close
- **Export** — SAPHIRE MAR-D (.FTL), KUREAS native (.KNOW_FTL), and OpenPSA Model Exchange Format (.xml) with per-tree selection
- **Report generation** — Word (.doc) and Markdown with selectable trees, cut set limits, configurable headers, progress indicator, and saved preferences; in-browser preview with print
- **Settings** — font size, node size, color mode (full color / grayscale / single custom color), font family, connection lines (arrows / no arrows / dotted), line style (curved down / curved up / straight), line thickness, background (light / dark / blue grid / engineering green), probability display, default zoom level
- **Persistence** — projects stored in IndexedDB for browser-session persistence; save to `.KNOW_FTL` files for portable backup

---

## KUREAS-ETL — Event Tree Logic

Event tree visualization tool implementing a backwards-recursive algorithm that correctly mirrors SAPHIRE's ETL format branching logic.

### Features

- **SAPHIRE file import** — reads `.ETL` (event tree logic) files including headers, top event types, logic sections, sequence metadata, and top event descriptions
- **Additional file support** — `.BED` (basic event descriptions), `.BEI` (basic event information), and `.SQC` (sequence cut sets) for enriched analysis
- **Backwards algorithm** — proprietary rendering approach that works from end states back to the initiating event, producing correct branch placement matching SAPHIRE's own layout logic
- **Interactive canvas** — pan and zoom with click-to-hide/show individual sequences
- **Branch labeling modes** — show success/failure labels, show S/F abbreviations, or hide branch labels
- **Color modes** — full color, black and white, or grayscale rendering for print-ready output
- **Sequence analysis** — view sequence paths with end states, transfer flags, and frequency data
- **Cut set integration** — associate sequence-level cut sets from `.SQC` files with visual sequences
- **Multi-tree support** — load files containing multiple event trees and navigate between them

---

## KUREAS-SYS — System Evaluation

System-level knowledge management: define structures, systems, and components (SSCs), analyze failure modes, model system success logic, derive fault trees, and calculate importance measures.

### Features

- **6-pane workspace** — Component List (Pane A), System Info bar (Pane B), SSCs in System (Pane C), Supercomponents (Pane D), "How the System Works" logic editor (Pane E), and Edit SSC details (Pane F); all panes are resizable
- **SSC management** — define SSCs with name, description, SSC type, and component type; add multiple failure modes per SSC with individual probability data; duplicate, edit, and delete SSCs and failure modes
- **Probability types:**
  - **FM0: Direct Probability** — mean value with distribution parameters (CNI, Lognormal, Normal, Gamma, Beta, Uniform, etc.)
  - **FM1: Demand (Binomial)** — demand probability and number of demands
  - **FM2: Fails While Operating (Poisson)** — failure rate × mission time
  - **FM3: Fails in Standby** — failure rate × inspection interval
  - **FM4: Fails While Operating with Repair** — failure rate, mission time, and repair time
  - **FM5: Logic T/F Flag** — house events (TRUE/FALSE)
  - **Qualitative** — Low / Medium / High mapped to configurable probability values in Settings
  - **Linked System** — probability computed from another `.KNOW_SYS` file (resolved automatically in failure analysis)
  - **Screened** — excluded from analysis (probability = 0)
- **System Modeling Script** — "How the System Works" text editor with clickable keyword/SSC insertion, line numbers, and syntax highlighting; keywords include `SYSTEM WORKS =`, `AND`, `OR`, `NOT`, `RELIES ON`, `WORKS`, `FAILS`, `UNLESS`, `WHEN`, `IF`/`THEN`, `IS TRUE`/`IS FALSE`, `ARE IN`/`ARE NOT IN`, comparison operators, variables, and modules
- **Check Script** — validates logic for syntax errors, unmatched parentheses, and unknown identifiers; auto-creates missing SSCs
- **"How the System Fails" modal** — full-screen failure analysis with:
  - Fault tree text view and interactive graphic (canvas with zoom/pan)
  - Minimal cut sets with MCUB probability
  - Importance measures table: RIR, RRR, Probability of Contribution (PC), and SWIM
  - Configurable scatter plot of any two importance measures with labeled data points
- **FMEA editor** — full-screen modal with SSC list and auto-generated Mermaid.js FMEA block diagrams; add effects, severity, detection, and mitigation fields per failure mode
- **Supercomponents** — group SSCs into logical assemblies for organization
- **Boundary conditions** — import from KUREAS-SEQ files for use in system logic
- **Reliability database** — load `.relDB` or `.fmeaDB` files into the Component List (Pane A); drag components to add them to the system; export SSC data back to `.relDB` or `.fmeaDB`
- **Import** — boundary conditions from SEQ files; basic events from `.KNOW_FTL` files (creates SSCs with probability data)
- **Export** — Reliability Database (.relDB), FMEA Database (.fmeaDB), KUREAS-FTL Fault Tree (.KNOW_FTL with pre-computed cut sets)
- **Report generation** — Word (.doc) and Markdown (.md) with 11 configurable sections: System Name, Extended Description, SSC Information, FMEA Information, System Works Expression, Supercomponent Information, Fault Tree Logic, Fault Tree Graphics, Fault Tree Cut Sets, Importance Measure Graphic, Importance Measure Table; in-browser preview with print
- **Settings** — font size, font family, background (light / dark / gray), probability display digits, SSC sort order, qualitative probability mapping (Low/Medium/High values), and layout reset

---

## KUREAS-SEQ — Process Operational Logic

Define accident sequences using Process Operational Logic (POL) diagrams — flowcharts that capture the logical progression from initiating events through system responses to end states.

### Features

- **POL diagram editor** — create flowcharts with node types: Initiating Event, Function, Transition, and End State; rendered using Mermaid.js
- **Shared POL diagrams** — reusable sub-diagrams referenced from multiple main POLs with override/reset capabilities
- **Hazard data integration** — import `HA_*.KNOW` files to populate initiating events with frequencies and operating state assignments
- **Boundary conditions** — Boolean, State, Percent, and User-Defined types; integrated with NUREG-2169 fire ignition data
- **Operating state modeling** — nodes can reference and transition between defined plant operating states
- **Event tree generation** — automatically generate event tree structures from POL diagram logic with Mermaid code clipboard copy and PNG export
- **Rich text notes** — attach formatted documentation to any node
- **Report generation** — Word (.doc) export with sequence documentation

---

## KUREAS-REPORT — Report Generator

Central integration hub that assembles data from all other KUREAS modules into cohesive safety analysis reports.

### Features

- **Multi-source loading** — load `.KNOW` files from any KUREAS module (HA, SYS, SEQ); auto-detects file type and extracts available elements
- **Drag-and-drop assembly** — drag elements from loaded files into the report; reorder by dragging within the report structure
- **Custom elements** — add free-form text sections with rich text editing, tables, and formatted content
- **Insertable elements** — create reusable report sections (boilerplate text, standard tables); save to `.ELEMENTS` files and load into any future report
- **Reference manager** — grid-based reference editor with save/load to `.KNOW` files
- **Word export** — generate Word-compatible (.doc) reports with proper font sizing and embedded content
- **Project persistence** — save editable report as `REPORT_*.KNOW` for continued editing

---

## KUREAS-KNOW — Knowledge Base Editor

General-purpose viewer and editor for the `.KNOW` file format used across all KUREAS modules.

### Features

- **File browser** — open any `.KNOW` file to browse its contents in a structured tree view
- **Auto-detection** — recognizes file type (HA, SYS, SEQ, REPORT) and displays with appropriate formatting
- **Direct editing** — edit values, add or remove fields, and save modified files
- **Folder operations** — work with a directory of `.KNOW` files simultaneously (requires File System Access API: Chrome, Edge, or Opera)
- **Debugging tool** — inspect data structures, troubleshoot integration issues between modules

---

## Data Flow

```
  ┌──────────────┐           ┌──────────────┐
  │  KUREAS-HA   │           │  KUREAS-SYS  │
  │  (Hazards)   │           │  (Systems)   │
  └──────┬───────┘           └──────┬───────┘
         │ HA_*.KNOW                │ .KNOW_SYS / .KNOW_FTL
         ▼                          ▼
  ┌──────────────┐           ┌──────────────┐
  │  KUREAS-SEQ  │           │  KUREAS-FTL  │
  │  (Sequences) │           │ (Fault Trees)│
  └──────┬───────┘           └──────┬───────┘
         │ SEQ_*.KNOW               │ .KNOW_FTL / .FTL
         ▼                          ▼
  ┌──────────────┐           ┌──────────────┐
  │  KUREAS-ETL  │◄─────────│  SAPHIRE     │
  │ (Event Trees)│  .ETL     │  (external)  │
  └──────┬───────┘           └──────────────┘
         │
         ▼  All .KNOW files
  ┌──────────────┐
  │ KUREAS-REPORT│
  │  (Reports)   │
  └──────────────┘
```

Modules are not strictly sequential — you can start with any module, work in parallel, and iterate. The `.KNOW` file system enables seamless data exchange.

---

## File Formats

### KUREAS Native Files

| Pattern | Module | Contents |
|---------|--------|----------|
| `HA_*.KNOW` | KUREAS-HA | Hazard lists, analysis data, operating states, settings |
| `*.KNOW_FTL` | KUREAS-FTL | Fault tree logic, basic events, probabilities, notes, cut sets, change log |
| `*.KNOW_SYS` | KUREAS-SYS | SSC hierarchy, failure modes, system logic, supercomponents, boundary conditions |
| `SEQ_*.KNOW` | KUREAS-SEQ | POL diagrams, boundary conditions, operating state data |
| `REPORT_*.KNOW` | KUREAS-REPORT | Report structure, assembled elements, references, source data |
| `*.ELEMENTS` | KUREAS-REPORT | Reusable insertable report elements |
| `*.relDB` | KUREAS-SYS | CSV-format reliability database (system, SSC type, component type, failure modes, distributions) |
| `*.fmeaDB` | KUREAS-SYS | JSON-format FMEA database (full round-trip with severity, detection, mitigation) |

### SAPHIRE Interoperability

| Extension | Description | Used By |
|-----------|-------------|---------|
| `.FTL` | Fault tree logic | KUREAS-FTL (import/export), KUREAS-HA (export) |
| `.BED` | Basic event descriptions | KUREAS-FTL, KUREAS-ETL |
| `.BEI` | Basic event information (probabilities) | KUREAS-FTL, KUREAS-ETL |
| `.GTD` | Gate type descriptions | KUREAS-FTL |
| `.FTC` | Fault tree cut sets | KUREAS-FTL |
| `.ETL` | Event tree logic | KUREAS-ETL |
| `.SQC` | Sequence cut sets | KUREAS-ETL |

### OpenPSA Support

KUREAS-FTL exports to the **OpenPSA Model Exchange Format (MEF)** — an XML-based standard for fault tree data exchange between PSA tools.

---

## Technical Stack

All modules are single-file HTML applications with dependencies loaded from CDNs:

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component framework |
| **Babel Standalone** | JSX transformation at runtime |
| **Tailwind CSS** | Utility-first styling |
| **HTML5 Canvas** | Fault tree, event tree, and importance measure rendering |
| **Mermaid.js** | FMEA diagrams, POL flowcharts (KUREAS-SYS, KUREAS-SEQ) |
| **IndexedDB** | Project persistence (KUREAS-FTL) |
| **localStorage** | Settings persistence (all modules) |

### Browser Requirements

Any modern browser with ES6+ support. Tested on Chrome, Edge, Firefox, and Safari. No server-side components required. Chrome or Edge recommended for File System Access API features (KUREAS-KNOW folder operations).

---

## Regulatory References

KUREAS incorporates data and methodology from the following NRC publications:

- **NUREG-2169** — *Nuclear Power Plant Fire Ignition Frequency and Non-Suppression Probability Estimation Using the Updated Fire Events Database* (Table 4-4 fire ignition frequencies are built into KUREAS-HA)

- **NUREG/CR-7039** — *Systems Analysis Programs for Hands-on Integrated Reliability Evaluations (SAPHIRE) Version 8* (SAPHIRE file format specifications used throughout the suite)

- **NUREG-CR-6883** — *The SPAR-H Human Reliability Analysis Method* (Gertman, Blackman, Byers, Marble, Smith, 2005) — reference document for human reliability analysis

- **INL/EXT-10-18533** — *SPAR-H Step-by-Step Guidance* (Whaley, Kelly, Boring, Galyean, 2011) — procedural guidance for the SPAR-H method

---

## License

MIT License — Copyright (c) 2024–2026 Curtis Lee Smith

See individual module files for full license text.

---

## Authors

Developed by **Curtis Lee Smith** and **Claude.ai** (Anthropic)
