import React from 'react';
import type { FaultTreeAnalysisResult } from '../types/faultTree';

interface SummaryTableProps {
  results: FaultTreeAnalysisResult[];
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="no-results">
        <p>No analysis results yet. Click "Solve All Trees" to begin.</p>
      </div>
    );
  }

  return (
    <div className="summary-table-container">
      <h2>Analysis Summary</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Fault Tree Name</th>
            <th>Description</th>
            <th>Gates</th>
            <th>Basic Events</th>
            <th>Cut Sets</th>
            <th>MCUB</th>
            <th>Computation Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.faultTreeId}>
              <td className="tree-name">{result.faultTreeName}</td>
              <td className="description">{result.description}</td>
              <td className="centered">{result.gateCount}</td>
              <td className="centered">{result.basicEventCount}</td>
              <td className="centered">{result.minimalCutSets.length}</td>
              <td className="mcub">{result.mcub.toExponential(4)}</td>
              <td className="centered">{result.computationTimeMs.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cut-sets-details">
        <h3>Minimal Cut Sets Details</h3>
        {results.map((result) => (
          <div key={result.faultTreeId} className="cut-set-section">
            <h4>{result.faultTreeName}</h4>
            <div className="cut-sets-list">
              {result.minimalCutSets.length > 0 ? (
                <ul>
                  {result.minimalCutSets.slice(0, 10).map((cutSet, idx) => (
                    <li key={idx}>
                      <strong>Cut Set {idx + 1}:</strong> {cutSet.events.join(' ∧ ')}
                    </li>
                  ))}
                  {result.minimalCutSets.length > 10 && (
                    <li className="more-sets">
                      ... and {result.minimalCutSets.length - 10} more cut sets
                    </li>
                  )}
                </ul>
              ) : (
                <p>No cut sets found</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
