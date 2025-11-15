import { SolveAllTrees } from './components/SolveAllTrees';
import { sampleFaultTrees } from './data/sampleFaultTrees';
import './App.css';

function App() {
  return (
    <div className="app">
      <SolveAllTrees faultTrees={sampleFaultTrees} />
    </div>
  );
}

export default App;
