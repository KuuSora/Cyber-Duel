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
        return <SkullIcon className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />;
      case 'ACTION':
        return entry.isAttack ? <SkullIcon className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" /> : <ShieldIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />;
      case 'TIP':
        return <LightbulbIcon className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />;
      case 'INFO':
      default:
        return <InfoIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />;
    }
  };

  const getTextColor = (entry: LogEntry) => {
    if (entry.isAttack) {
      return entry.isSuccess ? 'text-red-400' : 'text-red-600';
    }
    if (entry.type === 'ACTION' && !entry.isAttack) {
        return 'text-blue-400';
    }
     if (entry.type === 'TIP') {
        return 'text-yellow-400';
    }
    return 'text-gray-300';
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex flex-col flex-grow min-h-0">
      <h3 className="text-lg font-bold text-green-400 mb-2">Game Log</h3>
      <div ref={logContainerRef} className="flex-grow overflow-y-auto pr-2 space-y-2 text-sm">
        {logEntries.map((entry, index) => (
          <div key={index} className={`flex items-start p-2 rounded-md bg-gray-800/50 ${getTextColor(entry)}`}>
            {getIcon(entry)}
            <p><span className="font-bold mr-2">Turn {entry.turn}:</span> {entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog;