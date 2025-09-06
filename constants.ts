import { NodeType, SystemNode, DefenseType, AttackType } from './types';

export const MAX_TURNS = 20;
export const INITIAL_HEALTH = 100;

export const INITIAL_SYSTEM_STATE: SystemNode[] = [
  {
    id: NodeType.Gateway,
    name: 'Internet Gateway',
    health: 120,
    maxHealth: 120,
    defenses: [],
    connections: [NodeType.Firewall, NodeType.DNSServer],
    position: { x: 50, y: 5 },
  },
  {
    id: NodeType.Firewall,
    name: 'Main Firewall',
    health: 120,
    maxHealth: 120,
    defenses: [],
    connections: [NodeType.Server],
    position: { x: 25, y: 30 },
  },
  {
    id: NodeType.DNSServer,
    name: 'DNS Server',
    health: 90,
    maxHealth: 90,
    defenses: [],
    connections: [NodeType.Server],
    position: { x: 75, y: 30 },
  },
  {
    id: NodeType.Server,
    name: 'Web Server',
    health: INITIAL_HEALTH,
    maxHealth: INITIAL_HEALTH,
    defenses: [],
    connections: [NodeType.Database],
    position: { x: 50, y: 55 },
  },
  {
    id: NodeType.Database,
    name: 'Data Repository',
    health: INITIAL_HEALTH,
    maxHealth: INITIAL_HEALTH,
    defenses: [],
    connections: [NodeType.BackupServer],
    position: { x: 50, y: 80 },
  },
  {
    id: NodeType.BackupServer,
    name: 'Backup Server',
    health: 80,
    maxHealth: 80,
    defenses: [],
    connections: [],
    position: { x: 50, y: 95 },
  },
];

export const DEFENSE_DETAILS: Record<DefenseType, { name: string; description: string; strength: number }> = {
  [DefenseType.FirewallBlock]: {
    name: 'Firewall Block',
    description: 'Deploys rule-based packet filtering. Highly effective at mitigating high-volume, low-sophistication attacks like DDoS and network Probes.',
    strength: 20,
  },
  [DefenseType.EncryptionShield]: {
    name: 'Encryption Shield',
    description: 'Applies strong cryptographic algorithms to data at rest and in transit. This makes data unreadable without the key, countering Exploits and Brute Force attempts.',
    strength: 25,
  },
  [DefenseType.IntrusionDetection]: {
    name: 'Intrusion Detection',
    description: 'Deploys a system that monitors network traffic for suspicious activity and known threats, alerting you to Brute Force attacks and Phishing attempts.',
    strength: 15,
  },
};

export const ATTACK_DETAILS: Record<AttackType, { name: string; description: string; baseDamage: number }> = {
    [AttackType.Probe]: {
        name: 'Probe',
        description: 'A reconnaissance technique, like port scanning, to gather information about a network’s defenses and identify potential vulnerabilities. Causes minimal damage.',
        baseDamage: 5,
    },
    [AttackType.DDoS]: {
        name: 'DDoS (Distributed Denial-of-Service)',
        description: 'Overwhelms a target with traffic from multiple sources (a botnet), making the service unavailable. Very effective against frontline nodes like Gateways.',
        baseDamage: 30,
    },
    [AttackType.Exploit]: {
        name: 'Exploit',
        description: 'Targets a specific software vulnerability or bug to gain unauthorized access or cause damage. Particularly effective against unpatched Servers.',
        baseDamage: 35,
    },
    [AttackType.BruteForce]: {
        name: 'Brute Force',
        description: 'Systematically tries all possible passwords or keys until the correct one is found. A powerful, high-damage attack but can be mitigated by strong defenses.',
        baseDamage: 40,
    },
    [AttackType.Phishing]: {
        name: 'Phishing',
        description: 'A social engineering attack that tricks users into revealing sensitive information. It often bypasses technical defenses to target human error, making Mail Servers a prime target.',
        baseDamage: 25,
    }
}
