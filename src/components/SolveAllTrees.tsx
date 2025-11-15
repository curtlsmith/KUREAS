import React, { useState } from 'react';
import type { FaultTree, FaultTreeAnalysisResult, SolveProgress } from '../types/faultTree';
import { solveFaultTree } from '../utils/faultTreeSolver';
import { ProgressBar } from './ProgressBar';
import { SummaryTable } from './SummaryTable';

interface SolveAllTreesProps {
  faultTrees: FaultTree[];
}

export const SolveAllTrees: React.FC<SolveAllTreesProps> = ({ faultTrees }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<SolveProgress>({
    currentTreeIndex: 0,
    totalTrees: faultTrees.length,
    currentTreeName: '',
    isComplete: false
  });
  const [results, setResults] = useState<FaultTreeAnalysisResult[]>([]);

  const handleSolveAll = async () => {
    setIsRunning(true);
    setResults([]);
    setProgress({
      currentTreeIndex: 0,
      totalTrees: faultTrees.length,
      currentTreeName: '',
      isComplete: false
    });

    const newResults: FaultTreeAnalysisResult[] = [];

    for (let i = 0; i < faultTrees.length; i++) {
      const tree = faultTrees[i];

      // Update progress
      setProgress({
        currentTreeIndex: i + 1,
        totalTrees: faultTrees.length,
        currentTreeName: tree.name,
        isComplete: false
      });

      // Simulate some processing delay to show progress
      await new Promise(resolve => setTimeout(resolve, 100));

      // Solve the fault tree
      try {
        const result = solveFaultTree(tree);
        newResults.push(result);
        setResults([...newResults]); // Update results incrementally
      } catch (error) {
        console.error(`Error solving fault tree ${tree.name}:`, error);
      }
    }

    // Mark as complete
    setProgress(prev => ({ ...prev, isComplete: true }));
    setIsRunning(false);
  };

  return (
    <div className="solve-all-container">
      <div className="header-section">
        <h1>KUREAS-FTA: Fault Tree Analysis</h1>
        <p className="subtitle">
          Comprehensive fault tree analysis tool for systems engineering
        </p>
      </div>

      <div className="control-section">
        <div className="tree-count">
          <strong>Available Fault Trees:</strong> {faultTrees.length}
        </div>
        <button
          className="solve-all-button"
          onClick={handleSolveAll}
          disabled={isRunning || faultTrees.length === 0}
        >
          {isRunning ? 'Solving...' : 'Solve All Trees'}
        </button>
      </div>

      {(isRunning || progress.isComplete) && (
        <div className="progress-section">
          <ProgressBar progress={progress} />
        </div>
      )}

      <div className="results-section">
        <SummaryTable results={results} />
      </div>
    </div>
  );
};
