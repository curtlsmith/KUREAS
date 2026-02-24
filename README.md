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

The current suite includes models for fault and event tree logic viewing (FTL and ETL) with full SAPHIRE (https://saphire.inl.gov) file format interoperability and adherence to the SAPHIRE NUREG guidelines (https://www.nrc.gov/reading-rm/doc-collections/nuregs/contract/cr7039/index).

---

## Table of Contents

- [Quick Start](#quick-start)
- [Module Overview](#module-overview)
- [KUREAS-HA — Hazard Analysis](#kureas-ha--hazard-analysis)
- [KUREAS-FTL — Fault Tree Logic](#kureas-ftl--fault-tree-logic)
- [KUREAS-ETL — Event Tree Logic](#kureas-etl--event-tree-logic)
- [File Formats](#file-formats)
- [Technical Stack](#technical-stack)
- [License](#license)

---

## Quick Start

1. Clone or download the repository.
2. Open any `.html` file in a modern browser (Chrome, Edge, Firefox, Safari).
3. There is no step 3.

Each module is entirely self-contained. All dependencies are loaded from CDNs at runtime. No Node.js, no `npm install`, no build process.

---

## Module Overview

| Module | File | Purpose |
|--------|------|---------|
| **KUREAS-HA** | `KUREAS-HA.html` | Hazard analysis and initiating event frequency quantification |
| **KUREAS-FTL** | `KUREAS-FTL.html` | Fault tree visualization with SAPHIRE file import |
| **KUREAS-ETL** | `KUREAS-ETL.html` | Event tree logic visualization with SAPHIRE file import |

---

## KUREAS-HA — Hazard Analysis

Comprehensive hazard identification, screening, and frequency quantification for nuclear facility initiating event analysis.

### Features

- **Hierarchical hazard list management** — define, organize, and categorize hazards in a tree structure with user-configurable hazard categories
- **Multi-state analysis** — analyze hazards across multiple plant operating states (e.g., full power, low power, shutdown) with configurable time fractions
- **Multiple occurrence models:**
  - **Frequency** — direct frequency specification with lognormal, normal, gamma, beta, uniform, log-uniform, histogram, or "constrained noninformative" distributions
  - **Probability per Opportunity** — event frequency calculated from opportunity rate × conditional probability, supporting the same suite of probability distributions
  - **Hazard Curve** — tabular magnitude vs. frequency data with paste-from-Excel support
  - **NUREG-2169 Fire Ignition** — built-in Table 4-4 fire ignition frequency data with multi-source selection, component count scaling, and propagation factor adjustment
  - **Screening** — screen out hazards by low frequency, low consequence, or not applicable
- **Hazard frequency visualization** — interactive logarithmic frequency plot across all operating states with configurable axis ranges and color-coded state overlays
- **Rich text documentation** — per-hazard descriptions, assumptions, requirements, uncertainty discussions, and references using a built-in rich text editor
- **Configurable settings** — frequency display digits, font sizes, background themes, state-specific colors, and plot axis ranges
- **Export** — save/load complete analysis as `.KNOW` files; export summary to Markdown

---

## KUREAS-FTL — Fault Tree Logic

Interactive fault tree visualization and analysis tool with native SAPHIRE file format support.

### Features

- **SAPHIRE file import** — reads `.FTL` (fault tree logic), `.BED` (basic event descriptions), `.BEI` (basic event information/probabilities), `.GTD` (gate descriptions), and `.FTC` (fault tree cut sets)
- **Interactive canvas rendering** — pan, zoom, and navigate complex fault trees rendered on HTML5 Canvas
- **Gate types** — AND, OR, and TRAN (transfer) gates with expandable/collapsible transfer gate references to other trees
- **Visualization modes:**
  - Box-style node rendering with labeled gate types
  - Standard gate-symbol rendering (curved OR gates, flat-top AND gates)
  - Configurable font sizes, node sizes, and font families
- **Cut set analysis** — view minimal cut sets for each fault tree, sorted by probability with individual event probability contributions
- **Basic event management** — view and edit basic event probabilities, descriptions, and calculation types
- **Multi-tree project support** — load and navigate between multiple fault trees within a single project
- **Image export** — copy fault tree diagrams to clipboard or download as PNG
- **Report generation** — generate Word (`.docx`) and PDF reports with embedded fault tree images, cut set tables, and configurable headers
- **Persistent settings** — display preferences saved to localStorage

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


## File Formats

### `.KNOW` Files

The `.KNOW` format is a JSON-based file format used for data persistence and cross-module exchange. Each KUREAS module produces and consumes `.KNOW` files with module-specific schemas:

| Pattern | Module | Contents |
|---------|--------|----------|
| `HA_*.KNOW` | KUREAS-HA | Hazard lists, analysis data, operating states, settings |
| `FTL_*.KNOW` | KUREAS-FTL | Fault tree logic, basic events, cut sets |
| `ETL_*.KNOW` | KUREAS-ETL | Event tree logic, sequences, top events |

### SAPHIRE Interoperability

KUREAS modules read the following SAPHIRE file formats:

| Extension | Description | Used By |
|-----------|-------------|---------|
| `.FTL` | Fault tree logic | KUREAS-FTL |
| `.ETL` | Event tree logic | KUREAS-ETL |
| `.BED` | Basic event descriptions | KUREAS-FTL, KUREAS-ETL |
| `.BEI` | Basic event information (probabilities) | KUREAS-FTL, KUREAS-ETL |
| `.GTD` | Gate descriptions | KUREAS-FTL |
| `.FTC` | Fault tree cut sets | KUREAS-FTL |
| `.SQC` | Sequence cut sets | KUREAS-ETL |

---

## Technical Stack

All modules are single-file HTML applications with dependencies loaded from CDNs:

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component framework |
| **Tailwind CSS** | Utility-first styling |
| **HTML5 Canvas** | Fault tree and event tree rendering |
| **Mermaid.js** | FMEA diagrams, POL flowcharts |
| **docx.js** | Word document generation (KUREAS-FTL) |
| **jsPDF** | PDF generation (KUREAS-FTL) |
| **marked.js** | Markdown parsing and preview |
| **localStorage** | Settings persistence |

### Browser Requirements

Any modern browser with ES6+ support. Tested on Chrome, Edge, Firefox, and Safari. No server-side components required.

---

## Regulatory References

KUREAS incorporates data and methodology from the following NRC publications:

- **NUREG-2169** — *Nuclear Power Plant Fire Ignition Frequency and Non-Suppression Probability Estimation Using the Updated Fire Events Database* (Table 4-4 fire ignition frequencies are built into KUREAS-HA)

- **NUREG/CR-7039** — *NSystems Analysis Programs for Hands-on Integrated Reliability Evaluations (SAPHIRE) Version 8
---

## License

MIT License — Copyright (c) 2024-2025 Curtis Lee Smith

See individual module files for full license text.

---

## Authors

Developed by **Curtis Lee Smith** and **Claude.ai** (Anthropic)
