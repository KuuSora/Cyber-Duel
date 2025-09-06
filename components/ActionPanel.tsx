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
      <h3 className="text-lg font-bold text-blue-400 mb-2">Deploy Defenses</h3>
      <p className="text-sm text-gray-400 mb-4">Select a system node, then choose a defense to deploy.</p>
      <div className="space-y-2 overflow-y-auto max-h-80 pr-2">
        {Object.entries(DEFENSE_DETAILS).map(([type, details]) => {
          const Icon = defenseIcons[type as DefenseType];
          return (
            <button
              key={type}
              onClick={() => onDefenseAction(type as DefenseType)}
              disabled={!selectedNode || !isPlayerTurn}
              className="w-full text-left p-3 bg-gray-700 hover:bg-blue-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-start space-x-3"
            >
              <Icon className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-blue-300">{details.name}</p>
                <p className="text-xs text-gray-300">{details.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderAttackerActions = () => (
    <div>
      <h3 className="text-lg font-bold text-red-400 mb-2">Launch Attacks</h3>
      <p className="text-sm text-gray-400 mb-4">Select a target node, then choose your attack vector.</p>
      <div className="space-y-2 overflow-y-auto max-h-80 pr-2">
        {Object.entries(ATTACK_DETAILS).map(([type, details]) => {
          const Icon = attackIcons[type as AttackType];
          return (
            <button
              key={type}
              onClick={() => onAttackAction(type as AttackType)}
              disabled={!selectedNode || !isPlayerTurn}
              className="w-full text-left p-3 bg-gray-700 hover:bg-red-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-start space-x-3"
            >
              <Icon className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-red-300">{details.name}</p>
                <p className="text-xs text-gray-300">{details.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex-shrink-0">
      <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-gray-600 pb-2">Action Panel</h2>
      {!isPlayerTurn && (
          <div className="text-center p-8">
              <p className="text-yellow-400 text-lg animate-pulse">Waiting for AI opponent...</p>
          </div>
      )}
      {isPlayerTurn && !selectedNode && (
        <div className="text-center p-8">
          <p className="text-gray-300">Select a node on the map to see available actions.</p>
        </div>
      )}
      {isPlayerTurn && selectedNode && (
        <div>
          <p className="text-lg text-white mb-4">Selected: <span className="font-bold text-green-400">{selectedNode.name}</span></p>
          {playerRole === 'DEFENDER' ? renderDefenderActions() : renderAttackerActions()}
        </div>
      )}
    </div>
  );
};

export default ActionPanel;