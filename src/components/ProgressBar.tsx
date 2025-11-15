import React from 'react';
import type { SolveProgress } from '../types/faultTree';

interface ProgressBarProps {
  progress: SolveProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const percentage = progress.totalTrees > 0
    ? (progress.currentTreeIndex / progress.totalTrees) * 100
    : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          {progress.isComplete
            ? 'Analysis Complete!'
            : `Processing: ${progress.currentTreeName}`}
        </span>
        <span className="progress-count">
          {progress.currentTreeIndex} / {progress.totalTrees}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-percentage">{percentage.toFixed(1)}%</div>
    </div>
  );
};
