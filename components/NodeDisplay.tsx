import React from 'react';
import { SystemNode, NodeType } from '../types';
import { GatewayIcon, FirewallIcon, MailServerIcon, ServerIcon, DatabaseIcon, ShieldIcon } from './icons';
import { DEFENSE_DETAILS } from '../constants';

interface NodeDisplayProps {
  systemState: SystemNode[];
  onNodeSelect: (node: SystemNode) => void;
  selectedNode: SystemNode | null;
  attackerTarget: NodeType | null;
}

const NodeIcon: React.FC<{ type: NodeType, className?: string }> = ({ type, className }) => {
  switch (type) {
    case NodeType.Gateway: return <GatewayIcon className={className} />;
    case NodeType.Firewall: return <FirewallIcon className={className} />;
    case NodeType.MailServer: return <MailServerIcon className={className} />;
    case NodeType.Server: return <ServerIcon className={className} />;
    case NodeType.Database: return <DatabaseIcon className={className} />;
    default: return null;
  }
};

const NodeDisplay: React.FC<NodeDisplayProps> = ({ systemState, onNodeSelect, selectedNode, attackerTarget }) => {
  const getNodeById = (id: NodeType) => systemState.find(n => n.id === id);

  return (
    <div className="relative w-full h-full bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Connections */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
        {systemState.flatMap(node =>
          node.connections.map(connId => {
            const targetNode = getNodeById(connId);
            if (!targetNode) return null;
            return (
              <line
                key={`${node.id}-${connId}`}
                x1={`${node.position.x}%`}
                y1={`${node.position.y}%`}
                x2={`${targetNode.position.x}%`}
                y2={`${targetNode.position.y}%`}
                className="stroke-current text-gray-600"
                strokeWidth="2"
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {systemState.map(node => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 flex flex-col items-center cursor-pointer transition-all duration-300 rounded-lg z-10
            ${selectedNode?.id === node.id ? 'bg-green-500/30 ring-2 ring-green-400' : 'bg-gray-800/80 hover:bg-green-500/20'}
            ${attackerTarget === node.id ? 'animate-pulse ring-2 ring-red-500' : ''}
          `}
          style={{ left: `${node.position.x}%`, top: `${node.position.y}%`, minWidth: '120px' }}
          onClick={() => onNodeSelect(node)}
        >
          <NodeIcon type={node.id} className="w-8 h-8 text-green-400 mb-1" />
          <p className="text-xs font-bold text-white">{node.name}</p>
          {/* Health Bar */}
          <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${node.health > 60 ? 'bg-green-500' : node.health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${(node.health / node.maxHealth) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-300 mt-1">{node.health}/{node.maxHealth}</p>
          {/* Defenses */}
          <div className="flex space-x-1 mt-2">
            {node.defenses.map((defense, index) => (
              <ShieldIcon
                key={index}
                className="w-4 h-4 text-blue-400"
                title={`${DEFENSE_DETAILS[defense.type].name} (${defense.strength})`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NodeDisplay;
