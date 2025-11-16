# KUREAS-FTA
KUREAS-FTA (Fault Tree Analysis) is a browser-based software tool that allows teams of designers and analysts to perform comprehensive fault tree analysis for complex systems engineering. Part of the KUREAS (Knowledgebase Using Risk Engineering Analysis of Systems) suite, this module provides powerful fault tree modeling, analysis, and visualization capabilities.

## Features

- **Multiple Fault Tree Management**: Create and manage multiple fault trees in a single session
- **Solve All Trees**: Process all fault trees with a single click
- **Comprehensive Analysis**: Calculate minimal cut sets, MCUB (Minimal Cut Upper Bound), and detailed statistics
- **Real-time Progress Tracking**: Monitor analysis progress with visual progress bars
- **Detailed Summary Reports**: View analysis results in comprehensive summary tables including:
  - Fault Tree Name
  - Description
  - Gate counts
  - Basic Event counts
  - Cut Set analysis
  - MCUB calculations
  - Computation time metrics

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and building
- Modern CSS for responsive UI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/curtlsmith/KUREAS.git
cd KUREAS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Building for Production

### Standard Build

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Single-File Standalone Build

For maximum portability, you can build a completely self-contained single HTML file with all CSS and JavaScript inlined:

```bash
npm run build:single
```

This creates `kureas-fta-standalone.html` (~157 KB) - a single file that can be:
- Opened directly in any modern web browser
- Shared via email or file transfer
- Hosted on any web server without additional dependencies
- Archived for long-term preservation
- Used offline without internet connection

Simply double-click the file or open it in your browser to run the complete KUREAS-FTA application.

## Usage

### Solve All Trees

1. Launch the application
2. Click the **"Solve All Trees"** button
3. Watch the progress bar as each fault tree is analyzed
4. Review the comprehensive summary table with results

### Understanding the Results

**Summary Table Columns:**
- **Fault Tree Name**: Identifier for the analyzed system
- **Description**: Detailed explanation of the fault tree scenario
- **Gates**: Number of logic gates (AND, OR, NOT, XOR, NAND, NOR)
- **Basic Events**: Number of basic failure events
- **Cut Sets**: Number of minimal cut sets identified
- **MCUB**: Minimal Cut Upper Bound - probability of top event failure
- **Computation Time**: Analysis duration in milliseconds

**Minimal Cut Sets**: The summary includes detailed listings of minimal cut sets for each fault tree, showing the combinations of basic events that can cause system failure.

## Sample Fault Trees Included

The application includes five realistic fault tree scenarios:

1. **Power System Failure** - Critical infrastructure power loss analysis
2. **Data Center Cooling Failure** - Thermal management system analysis
3. **Aircraft Hydraulic System** - Aviation hydraulic control failure
4. **Network Security Breach** - Cybersecurity threat analysis
5. **Satellite Communication Loss** - Space system communication failure

## Project Structure

```
KUREAS-FTA/
├── src/
│   ├── components/
│   │   ├── SolveAllTrees.tsx    # Main UI component
│   │   ├── ProgressBar.tsx      # Progress tracking
│   │   └── SummaryTable.tsx     # Results display
│   ├── data/
│   │   └── sampleFaultTrees.ts  # Sample fault tree data
│   ├── types/
│   │   └── faultTree.ts         # TypeScript type definitions
│   ├── utils/
│   │   └── faultTreeSolver.ts   # Core analysis algorithms
│   ├── App.tsx                  # Application root
│   ├── App.css                  # Styling
│   └── main.tsx                 # Entry point
├── public/                       # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── vite.config.ts               # Vite configuration
```

## Algorithm Details

### Minimal Cut Set Calculation
The solver uses a top-down algorithm to identify minimal cut sets:
1. Starts from the top event
2. Recursively expands gates based on their logic type
3. Combines events according to Boolean logic
4. Removes non-minimal sets using absorption law

### MCUB Calculation
Minimal Cut Upper Bound is calculated using:
```
MCUB = 1 - ∏(1 - P(Ci))
```
where P(Ci) is the probability of each minimal cut set.

### Supported Gate Types
- **AND**: All inputs must occur
- **OR**: At least one input must occur
- **NOT**: Inverts input
- **XOR**: Exclusive OR logic
- **NAND**: NOT AND
- **NOR**: NOT OR

## Contributing

This is part of the KUREAS suite for systems engineering analysis. Contributions are welcome!

## License

MIT License - see LICENSE file for details

## Version

**Current Version**: 1.0.0
- Initial KUREAS-FTA release with Solve All Trees feature
