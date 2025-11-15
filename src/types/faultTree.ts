// Fault Tree Analysis Types

export type GateType = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR';

export interface BasicEvent {
  id: string;
  name: string;
  probability?: number;
  description?: string;
}

export interface Gate {
  id: string;
  type: GateType;
  name: string;
  inputs: string[]; // IDs of child gates or basic events
  description?: string;
}

export interface FaultTree {
  id: string;
  name: string;
  description: string;
  topEventId: string; // ID of the top gate
  gates: Gate[];
  basicEvents: BasicEvent[];
}

export interface CutSet {
  events: string[]; // IDs of basic events in this cut set
  probability?: number;
}

export interface FaultTreeAnalysisResult {
  faultTreeId: string;
  faultTreeName: string;
  description: string;
  gateCount: number;
  basicEventCount: number;
  minimalCutSets: CutSet[];
  mcub: number; // Minimal Cut Upper Bound
  computationTimeMs: number;
}

export interface SolveProgress {
  currentTreeIndex: number;
  totalTrees: number;
  currentTreeName: string;
  isComplete: boolean;
}
