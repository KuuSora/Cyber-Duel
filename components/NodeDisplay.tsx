import React, { useState, useRef, MouseEvent } from 'react';
import { SystemNode, NodeType } from '../types';
import { GatewayIcon, FirewallIcon, MailServerIcon, ServerIcon, DatabaseIcon, ShieldIcon, DNSServerIcon, BackupServerIcon } from './icons';
import { DEFENSE_DETAILS } from '../constants';

interface NodeDisplayProps {
  systemState: SystemNode[];
  onNodeSelect: (node: SystemNode) => void;
  selectedNode: SystemNode | null;
  attackerTarget: NodeType | null;
}

const NodeIcon: React.FC<{ type: NodeType, className?: string }> = ({ type, className }) => {
  const iconColor = 'var(--color-text-accent)';
  switch (type) {
    case NodeType.Gateway: return <GatewayIcon className={className} style={{ color: iconColor }} />;
    case NodeType.Firewall: return <FirewallIcon className={className} style={{ color: iconColor }} />;
    case NodeType.MailServer: return <MailServerIcon className={className} style={{ color: iconColor }} />;
    case NodeType.Server: return <ServerIcon className={className} style={{ color: iconColor }} />;
    case NodeType.Database: return <DatabaseIcon className={className} style={{ color: iconColor }} />;
    case NodeType.DNSServer: return <DNSServerIcon className={className} style={{ color: iconColor }} />;
    case NodeType.BackupServer: return <BackupServerIcon className={className} style={{ color: iconColor }} />;
    default: return null;
  }
};

const NodeDisplay: React.FC<NodeDisplayProps> = ({ systemState, onNodeSelect, selectedNode, attackerTarget }) => {
  const getNodeById = (id: NodeType) => systemState.find(n => n.id === id);

  const [isPanning, setIsPanning] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== containerRef.current && (e.target as HTMLElement).closest('.node-element')) {
      return; // Don't pan if clicking on a node
    }
    e.preventDefault();
    setIsPanning(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    e.preventDefault();
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setView(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUpOrLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPanning(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg cursor-grab"
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)', borderWidth: 1 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: `translate(${view.x}px, ${view.y}px)` }}
      >
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
                  stroke="var(--color-border-secondary)"
                  strokeWidth="2"
                />
              );
            })
          )}
        </svg>

        {systemState.map(node => (
          <div
            key={node.id}
            className={`node-element absolute transform -translate-x-1/2 -translate-y-1/2 p-2 flex flex-col items-center transition-all duration-300 rounded-lg z-10 ${isPanning ? 'cursor-grabbing' : 'cursor-pointer'}`}
            style={{ 
              left: `${node.position.x}%`, 
              top: `${node.position.y}%`, 
              minWidth: '120px',
              backgroundColor: selectedNode?.id === node.id ? 'rgba(74, 222, 128, 0.3)' : 'var(--color-bg-tertiary)',
              // FIX: Removed invalid `ringColor` CSS property. The `boxShadow` property below correctly creates the ring effect.
              boxShadow: selectedNode?.id === node.id ? `0 0 0 2px var(--color-text-accent)` : (attackerTarget === node.id ? '0 0 0 2px #ef4444' : 'none'),
              animation: attackerTarget === node.id ? 'pulse 1.5s infinite' : 'none'
            }}
            onClick={() => onNodeSelect(node)}
          >
            <NodeIcon type={node.id} className="w-8 h-8 mb-1" />
            <p className="text-xs font-bold" style={{color: 'var(--color-text-primary)'}}>{node.name}</p>
            <div className="w-full rounded-full h-2 mt-1" style={{backgroundColor: 'var(--color-border-secondary)'}}>
              <div
                className={`h-2 rounded-full ${node.health > 60 ? 'bg-green-500' : node.health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${(node.health / node.maxHealth) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1" style={{color: 'var(--color-text-secondary)'}}>{node.health}/{node.maxHealth}</p>
            <div className="flex space-x-1 mt-2">
              {node.defenses.map((defense, index) => (
                <ShieldIcon
                  key={index}
                  className="w-4 h-4"
                  style={{ color: 'var(--color-accent-blue)' }}
                  title={`${DEFENSE_DETAILS[defense.type].name} (${defense.strength})`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeDisplay;