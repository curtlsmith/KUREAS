import type { FaultTree } from '../types/faultTree';

/**
 * Sample Fault Trees for KUREAS-FTA
 * These represent realistic fault tree analysis scenarios
 */

export const sampleFaultTrees: FaultTree[] = [
  {
    id: 'ft-001',
    name: 'Power System Failure',
    description: 'Analysis of power system failure modes in a critical infrastructure',
    topEventId: 'g1',
    gates: [
      {
        id: 'g1',
        type: 'OR',
        name: 'Power Loss',
        inputs: ['g2', 'g3', 'e1'],
        description: 'Top event - Complete power loss'
      },
      {
        id: 'g2',
        type: 'AND',
        name: 'Primary Power Failure',
        inputs: ['e2', 'e3'],
        description: 'Both primary sources fail'
      },
      {
        id: 'g3',
        type: 'AND',
        name: 'Backup System Failure',
        inputs: ['e4', 'e5'],
        description: 'Backup generator and UPS both fail'
      }
    ],
    basicEvents: [
      { id: 'e1', name: 'Grid Outage', probability: 0.001, description: 'External grid power failure' },
      { id: 'e2', name: 'Transformer Failure', probability: 0.005, description: 'Main transformer malfunction' },
      { id: 'e3', name: 'Circuit Breaker Fault', probability: 0.002, description: 'Primary circuit breaker fails' },
      { id: 'e4', name: 'Generator Failure', probability: 0.01, description: 'Backup generator does not start' },
      { id: 'e5', name: 'UPS Battery Depleted', probability: 0.008, description: 'UPS batteries exhausted' }
    ]
  },
  {
    id: 'ft-002',
    name: 'Data Center Cooling Failure',
    description: 'Thermal management system failure analysis for mission-critical data center',
    topEventId: 'g10',
    gates: [
      {
        id: 'g10',
        type: 'OR',
        name: 'Cooling System Failure',
        inputs: ['g11', 'g12'],
        description: 'Complete cooling system failure'
      },
      {
        id: 'g11',
        type: 'AND',
        name: 'CRAC Units Down',
        inputs: ['e10', 'e11'],
        description: 'Both CRAC units fail'
      },
      {
        id: 'g12',
        type: 'OR',
        name: 'Coolant System Failure',
        inputs: ['e12', 'e13', 'e14'],
        description: 'Coolant delivery system fails'
      }
    ],
    basicEvents: [
      { id: 'e10', name: 'CRAC-1 Compressor Failure', probability: 0.003, description: 'Primary CRAC compressor fails' },
      { id: 'e11', name: 'CRAC-2 Compressor Failure', probability: 0.003, description: 'Secondary CRAC compressor fails' },
      { id: 'e12', name: 'Pump Failure', probability: 0.007, description: 'Coolant pump malfunction' },
      { id: 'e13', name: 'Coolant Leak', probability: 0.002, description: 'Loss of coolant fluid' },
      { id: 'e14', name: 'Valve Stuck Closed', probability: 0.004, description: 'Control valve failure' }
    ]
  },
  {
    id: 'ft-003',
    name: 'Aircraft Hydraulic System',
    description: 'Hydraulic control system failure analysis for commercial aircraft',
    topEventId: 'g20',
    gates: [
      {
        id: 'g20',
        type: 'OR',
        name: 'Loss of Hydraulic Control',
        inputs: ['g21', 'g22', 'g23'],
        description: 'Complete loss of hydraulic pressure'
      },
      {
        id: 'g21',
        type: 'AND',
        name: 'System A & B Failure',
        inputs: ['e20', 'e21'],
        description: 'Primary hydraulic systems fail'
      },
      {
        id: 'g22',
        type: 'AND',
        name: 'Pump Failures',
        inputs: ['e22', 'e23', 'e24'],
        description: 'All hydraulic pumps fail'
      },
      {
        id: 'g23',
        type: 'OR',
        name: 'Fluid Loss',
        inputs: ['e25', 'e26'],
        description: 'Loss of hydraulic fluid'
      }
    ],
    basicEvents: [
      { id: 'e20', name: 'System A Leak', probability: 0.0001, description: 'Hydraulic system A leak' },
      { id: 'e21', name: 'System B Leak', probability: 0.0001, description: 'Hydraulic system B leak' },
      { id: 'e22', name: 'Engine Pump 1 Failure', probability: 0.0005, description: 'Engine-driven pump 1 fails' },
      { id: 'e23', name: 'Engine Pump 2 Failure', probability: 0.0005, description: 'Engine-driven pump 2 fails' },
      { id: 'e24', name: 'Electric Pump Failure', probability: 0.001, description: 'Electric backup pump fails' },
      { id: 'e25', name: 'Reservoir Rupture', probability: 0.0002, description: 'Hydraulic reservoir fails' },
      { id: 'e26', name: 'Line Rupture', probability: 0.0003, description: 'Hydraulic line rupture' }
    ]
  },
  {
    id: 'ft-004',
    name: 'Network Security Breach',
    description: 'Cybersecurity threat analysis for enterprise network infrastructure',
    topEventId: 'g30',
    gates: [
      {
        id: 'g30',
        type: 'AND',
        name: 'Successful Breach',
        inputs: ['g31', 'g32'],
        description: 'Attacker gains unauthorized access'
      },
      {
        id: 'g31',
        type: 'OR',
        name: 'Perimeter Penetration',
        inputs: ['e30', 'e31', 'e32'],
        description: 'Attacker bypasses perimeter security'
      },
      {
        id: 'g32',
        type: 'OR',
        name: 'Authentication Bypass',
        inputs: ['e33', 'e34'],
        description: 'Attacker bypasses authentication'
      }
    ],
    basicEvents: [
      { id: 'e30', name: 'Firewall Misconfiguration', probability: 0.02, description: 'Firewall rules improperly set' },
      { id: 'e31', name: 'Unpatched Vulnerability', probability: 0.015, description: 'Known vulnerability not patched' },
      { id: 'e32', name: 'Zero-Day Exploit', probability: 0.005, description: 'Unknown vulnerability exploited' },
      { id: 'e33', name: 'Weak Password', probability: 0.03, description: 'Password easily compromised' },
      { id: 'e34', name: 'Phishing Success', probability: 0.025, description: 'User falls for phishing attack' }
    ]
  },
  {
    id: 'ft-005',
    name: 'Satellite Communication Loss',
    description: 'Communication satellite system failure analysis',
    topEventId: 'g40',
    gates: [
      {
        id: 'g40',
        type: 'OR',
        name: 'Communication Lost',
        inputs: ['g41', 'g42', 'e40'],
        description: 'Complete loss of satellite communication'
      },
      {
        id: 'g41',
        type: 'AND',
        name: 'Power System Failure',
        inputs: ['e41', 'e42'],
        description: 'Satellite power system fails'
      },
      {
        id: 'g42',
        type: 'OR',
        name: 'Transponder Failure',
        inputs: ['e43', 'e44', 'e45'],
        description: 'Communication transponders fail'
      }
    ],
    basicEvents: [
      { id: 'e40', name: 'Antenna Misalignment', probability: 0.002, description: 'Antenna pointing error' },
      { id: 'e41', name: 'Solar Panel Degradation', probability: 0.004, description: 'Solar panels lose efficiency' },
      { id: 'e42', name: 'Battery Failure', probability: 0.006, description: 'Onboard batteries fail' },
      { id: 'e43', name: 'Transponder 1 Failure', probability: 0.003, description: 'Primary transponder fails' },
      { id: 'e44', name: 'Transponder 2 Failure', probability: 0.003, description: 'Secondary transponder fails' },
      { id: 'e45', name: 'Receiver Electronics Fault', probability: 0.005, description: 'Receiver circuit malfunction' }
    ]
  }
];
