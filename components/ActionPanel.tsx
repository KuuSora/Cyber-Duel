import React from 'react';
import { PlayerRole, SystemNode, DefenseType, AttackType } from '../types';
import { DEFENSE_DETAILS, ATTACK_DETAILS } from '../constants';
import { WallIcon, LockIcon, EyeIcon, ProbeIcon, DDoSIcon, ExploitIcon, BruteForceIcon, PhishingIcon } from './icons';

interface ActionPanelProps {
  playerRole: PlayerRole;
  selectedNode: SystemNode | null;
  onDefenseAction: (defense: DefenseType) => void;
  onAttackAction: (attack: AttackType) => void;
  isPlayerTurn: boolean;
}

const defenseIcons: Record<DefenseType, React.FC<{ className?: string }>> = {
  [DefenseType.FirewallBlock]: WallIcon,
  [DefenseType.EncryptionShield]: LockIcon,
  [DefenseType.IntrusionDetection]: EyeIcon,
};

const attackIcons: Record<AttackType, React.FC<{ className?: string }>> = {
  [AttackType.Probe]: ProbeIcon,
  [AttackType.DDoS]: DDoSIcon,
  [AttackType.Exploit]: ExploitIcon,
  [AttackType.BruteForce]: BruteForceIcon,
  [AttackType.Phishing]: PhishingIcon,
};

const ActionPanel: React.FC<ActionPanelProps> = ({ playerRole, selectedNode, onDefenseAction, onAttackAction, isPlayerTurn }) => {
  const renderDefenderActions = () => (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-accent-blue)' }}>Deploy Defenses</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Select a system node, then choose a defense to deploy.</p>
      <div className="space-y-2 overflow-y-auto max-h-80 pr-2">
        {Object.entries(DEFENSE_DETAILS).map(([type, details]) => {
          const Icon = defenseIcons[type as DefenseType];
          return (
            <button
              key={type}
              onClick={() => onDefenseAction(type as DefenseType)}
              disabled={!selectedNode || !isPlayerTurn}
              className="w-full text-left p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-start space-x-3"
              style={{ backgroundColor: 'var(--color-border-primary)' }}
            >
              <Icon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-accent-blue)' }} />
              <div>
                <p className="font-bold" style={{ color: 'var(--color-accent-blue)' }}>{details.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{details.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderAttackerActions = () => (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-accent-red)' }}>Launch Attacks</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Select a target node, then choose your attack vector.</p>
      <div className="space-y-2 overflow-y-auto max-h-80 pr-2">
        {Object.entries(ATTACK_DETAILS).map(([type, details]) => {
          const Icon = attackIcons[type as AttackType];
          return (
            <button
              key={type}
              onClick={() => onAttackAction(type as AttackType)}
              disabled={!selectedNode || !isPlayerTurn}
              className="w-full text-left p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-start space-x-3"
              style={{ backgroundColor: 'var(--color-border-primary)' }}
            >
              <Icon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-accent-red)' }}/>
              <div>
                <p className="font-bold" style={{ color: 'var(--color-accent-red)' }}>{details.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{details.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="rounded-lg p-4 flex-shrink-0" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)', borderWidth: 1}}>
      <h2 className="text-xl font-bold mb-4 border-b pb-2" style={{ color: 'var(--color-text-accent)', borderColor: 'var(--color-border-secondary)' }}>Action Panel</h2>
      {!isPlayerTurn && (
          <div className="text-center p-8">
              <p className="text-lg animate-pulse" style={{ color: 'var(--color-accent-yellow)' }}>Waiting for AI opponent...</p>
          </div>
      )}
      {isPlayerTurn && !selectedNode && (
        <div className="text-center p-8">
          <p style={{ color: 'var(--color-text-secondary)' }}>Select a node on the map to see available actions.</p>
        </div>
      )}
      {isPlayerTurn && selectedNode && (
        <div>
          <p className="text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Selected: <span className="font-bold" style={{ color: 'var(--color-text-accent)' }}>{selectedNode.name}</span></p>
          {playerRole === 'DEFENDER' ? renderDefenderActions() : renderAttackerActions()}
        </div>
      )}
    </div>
  );
};

export default ActionPanel;