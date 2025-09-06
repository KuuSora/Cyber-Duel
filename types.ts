export enum GameState {
  MainMenu,
  RoleSelection,
  GameSetup,
  Playing,
  GameOver,
  // FIX: Added AttackerTurn and DefenderTurn to represent AI turn states.
  AttackerTurn,
  DefenderTurn,
}

export type PlayerRole = 'DEFENDER' | 'ATTACKER';

export enum NodeType {
  Gateway = 'GATEWAY',
  Firewall = 'FIREWALL',
  MailServer = 'MAIL_SERVER',
  Server = 'SERVER',
  Database = 'DATABASE',
}

export enum DefenseType {
  FirewallBlock = 'FIREWALL_BLOCK',
  EncryptionShield = 'ENCRYPTION_SHIELD',
  IntrusionDetection = 'INTRUSION_DETECTION',
}

export enum AttackType {
  Probe = 'PROBE',
  DDoS = 'DDOS',
  Exploit = 'EXPLOIT',
  BruteForce = 'BRUTE_FORCE',
  Phishing = 'PHISHING',
}

export interface Defense {
  type: DefenseType;
  strength: number;
}

export interface SystemNode {
  id: NodeType;
  name: string;
  health: number;
  maxHealth: number;
  defenses: Defense[];
  connections: NodeType[];
  position: { x: number; y: number }; // For visual layout
}

export interface AttackerAction {
  attackType: AttackType;
  target: NodeType;
  justification: string;
  educationalTip: string;
}

export interface DefenderAction {
  type: DefenseType;
  target: NodeType;
  justification?: string;
}

export type LogType = 'ACTION' | 'INFO' | 'TIP' | 'ATTACKER_JUSTIFICATION';

export interface LogEntry {
  turn: number;
  message: string;
  isAttack: boolean;
  isSuccess?: boolean;
  type?: LogType;
}
