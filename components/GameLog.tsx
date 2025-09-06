import React, { useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { SkullIcon, ShieldIcon, LightbulbIcon, InfoIcon } from './icons';

interface GameLogProps {
  logEntries: LogEntry[];
}

const GameLog: React.FC<GameLogProps> = ({ logEntries }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logEntries]);

  const getIcon = (entry: LogEntry) => {
    switch (entry.type) {
      case 'ATTACKER_JUSTIFICATION':
        return <SkullIcon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: 'var(--color-accent-red)' }} />;
      case 'ACTION':
        return entry.isAttack 
          ? <SkullIcon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: 'var(--color-accent-red)' }} /> 
          : <ShieldIcon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: 'var(--color-accent-blue)' }} />;
      case 'TIP':
        return <LightbulbIcon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: 'var(--color-accent-yellow)' }} />;
      case 'INFO':
      default:
        return <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: 'var(--color-text-tertiary)' }} />;
    }
  };

  const getTextColor = (entry: LogEntry) => {
    if (entry.isAttack) {
      return 'var(--color-accent-red)';
    }
    if (entry.type === 'ACTION' && !entry.isAttack) {
        return 'var(--color-accent-blue)';
    }
     if (entry.type === 'TIP') {
        return 'var(--color-accent-yellow)';
    }
    return 'var(--color-text-secondary)';
  }

  return (
    <div className="rounded-lg p-4 flex flex-col flex-grow min-h-0" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)', borderWidth: 1 }}>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-accent)' }}>Game Log</h3>
      <div ref={logContainerRef} className="flex-grow overflow-y-auto pr-2 space-y-2 text-sm">
        {logEntries.map((entry, index) => {
          if (entry.isHidden) {
            return (
              <div key={index} className="flex items-start p-2 rounded-md italic animate-pulse" style={{ backgroundColor: 'var(--color-bg-quaternary)', color: 'var(--color-text-tertiary)' }}>
                <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <p><span className="font-bold mr-2">Turn {entry.turn}:</span> [AI action encrypted...]</p>
              </div>
            );
          }
          return (
            <div key={index} className="flex items-start p-2 rounded-md" style={{ backgroundColor: 'var(--color-bg-quaternary)', color: getTextColor(entry) }}>
              {getIcon(entry)}
              <p><span className="font-bold mr-2">Turn {entry.turn}:</span> {entry.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameLog;