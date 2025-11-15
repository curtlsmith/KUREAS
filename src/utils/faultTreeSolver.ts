import type { FaultTree, Gate, CutSet, FaultTreeAnalysisResult } from '../types/faultTree';

/**
 * KUREAS-FTA Fault Tree Solver
 * Implements minimal cut set calculation and MCUB analysis
 */

export class FaultTreeSolver {
  private faultTree: FaultTree;
  private gateMap: Map<string, Gate>;

  constructor(faultTree: FaultTree) {
    this.faultTree = faultTree;
    this.gateMap = new Map(faultTree.gates.map(gate => [gate.id, gate]));
  }

  /**
   * Solve the fault tree and return analysis results
   */
  solve(): FaultTreeAnalysisResult {
    const startTime = performance.now();

    // Find minimal cut sets
    const minimalCutSets = this.findMinimalCutSets();

    // Calculate MCUB (Minimal Cut Upper Bound)
    const mcub = this.calculateMCUB(minimalCutSets);

    const endTime = performance.now();
    const computationTimeMs = endTime - startTime;

    return {
      faultTreeId: this.faultTree.id,
      faultTreeName: this.faultTree.name,
      description: this.faultTree.description,
      gateCount: this.faultTree.gates.length,
      basicEventCount: this.faultTree.basicEvents.length,
      minimalCutSets,
      mcub,
      computationTimeMs
    };
  }

  /**
   * Find minimal cut sets using top-down algorithm
   */
  private findMinimalCutSets(): CutSet[] {
    // Start from the top event
    const topGate = this.gateMap.get(this.faultTree.topEventId);
    if (!topGate) {
      throw new Error(`Top event gate ${this.faultTree.topEventId} not found`);
    }

    // Get all cut sets (may include non-minimal ones)
    const allCutSets = this.expandGate(topGate);

    // Remove non-minimal cut sets (sets that contain other sets)
    const minimalCutSets = this.removeNonMinimalCutSets(allCutSets);

    return minimalCutSets;
  }

  /**
   * Recursively expand a gate to find all cut sets
   */
  private expandGate(gate: Gate): CutSet[] {
    const inputCutSets: CutSet[][] = [];

    // Process each input
    for (const inputId of gate.inputs) {
      const inputGate = this.gateMap.get(inputId);

      if (inputGate) {
        // Input is a gate - recursively expand it
        inputCutSets.push(this.expandGate(inputGate));
      } else {
        // Input is a basic event
        inputCutSets.push([{ events: [inputId] }]);
      }
    }

    // Combine cut sets based on gate type
    return this.combineByGateType(gate.type, inputCutSets);
  }

  /**
   * Combine cut sets according to gate logic
   */
  private combineByGateType(gateType: string, inputCutSets: CutSet[][]): CutSet[] {
    if (inputCutSets.length === 0) {
      return [];
    }

    switch (gateType) {
      case 'OR':
        // OR gate: Union of all input cut sets
        return inputCutSets.flat();

      case 'AND':
        // AND gate: Cartesian product of input cut sets
        return this.cartesianProduct(inputCutSets);

      case 'NOT':
        // NOT gate: For minimal cut sets, we typically skip NOT gates
        // as they complicate the analysis significantly
        return inputCutSets[0] || [];

      case 'XOR':
        // XOR gate: Treat as OR for minimal cut set analysis
        return inputCutSets.flat();

      case 'NAND':
        // NAND gate: Complement of AND
        // For simplicity, treat as OR (approximate)
        return inputCutSets.flat();

      case 'NOR':
        // NOR gate: Complement of OR
        // For simplicity, use cartesian product (approximate)
        return this.cartesianProduct(inputCutSets);

      default:
        return inputCutSets.flat();
    }
  }

  /**
   * Compute cartesian product of cut sets (for AND gates)
   */
  private cartesianProduct(cutSetGroups: CutSet[][]): CutSet[] {
    if (cutSetGroups.length === 0) return [];
    if (cutSetGroups.length === 1) return cutSetGroups[0];

    const result: CutSet[] = [];

    const combine = (current: string[], remaining: CutSet[][]): void => {
      if (remaining.length === 0) {
        result.push({ events: [...current] });
        return;
      }

      const [first, ...rest] = remaining;
      for (const cutSet of first) {
        combine([...current, ...cutSet.events], rest);
      }
    };

    combine([], cutSetGroups);
    return result;
  }

  /**
   * Remove non-minimal cut sets (absorption law)
   */
  private removeNonMinimalCutSets(cutSets: CutSet[]): CutSet[] {
    const minimal: CutSet[] = [];

    // Sort by size to optimize the process
    const sorted = [...cutSets].sort((a, b) => a.events.length - b.events.length);

    for (const candidate of sorted) {
      let isMinimal = true;

      // Check if any existing minimal set is a subset of this candidate
      for (const existing of minimal) {
        if (this.isSubset(existing.events, candidate.events)) {
          isMinimal = false;
          break;
        }
      }

      if (isMinimal) {
        // Remove any existing sets that are supersets of this candidate
        const filtered = minimal.filter(
          existing => !this.isSubset(candidate.events, existing.events) ||
                      this.areSetsEqual(candidate.events, existing.events)
        );

        // Only add if not already present
        if (!filtered.some(existing => this.areSetsEqual(candidate.events, existing.events))) {
          filtered.push(candidate);
          minimal.length = 0;
          minimal.push(...filtered);
        }
      }
    }

    return minimal;
  }

  /**
   * Check if set A is a subset of set B
   */
  private isSubset(a: string[], b: string[]): boolean {
    if (a.length > b.length) return false;
    const setB = new Set(b);
    return a.every(item => setB.has(item));
  }

  /**
   * Check if two sets are equal
   */
  private areSetsEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    const setA = new Set(a);
    const setB = new Set(b);
    return a.every(item => setB.has(item)) && b.every(item => setA.has(item));
  }

  /**
   * Calculate MCUB (Minimal Cut Upper Bound)
   * MCUB = 1 - ∏(1 - P(Ci)) where P(Ci) is the probability of cut set i
   */
  private calculateMCUB(cutSets: CutSet[]): number {
    const eventProbMap = new Map<string, number>();

    // Build probability map from basic events
    for (const event of this.faultTree.basicEvents) {
      eventProbMap.set(event.id, event.probability ?? 0.001); // Default probability
    }

    // Calculate probability for each cut set
    const cutSetProbs = cutSets.map(cutSet => {
      // For AND logic within a cut set: P(A AND B) = P(A) * P(B)
      let prob = 1.0;
      for (const eventId of cutSet.events) {
        prob *= eventProbMap.get(eventId) ?? 0.001;
      }
      return prob;
    });

    // Calculate MCUB: 1 - ∏(1 - P(Ci))
    let mcub = 1.0;
    for (const prob of cutSetProbs) {
      mcub *= (1 - prob);
    }
    mcub = 1 - mcub;

    return mcub;
  }
}

/**
 * Convenience function to solve a fault tree
 */
export function solveFaultTree(faultTree: FaultTree): FaultTreeAnalysisResult {
  const solver = new FaultTreeSolver(faultTree);
  return solver.solve();
}
