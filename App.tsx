import React, { useState, useEffect, useCallback } from 'react';
import { GameState, PlayerRole, SystemNode, LogEntry, NodeType, DefenseType, AttackType, AttackerAction, DefenderAction, Defense } from './types';
import { INITIAL_SYSTEM_STATE, MAX_TURNS, DEFENSE_DETAILS, ATTACK_DETAILS } from './constants';
import { getAttackerMove, getDefenderMove } from './services/geminiService';
import NodeDisplay from './components/NodeDisplay';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';
import Modal from './components/Modal';

// Deep copy utility to avoid state mutation issues
const deepCopy = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MainMenu);
  const [playerRole, setPlayerRole] = useState<PlayerRole>('DEFENDER');
  const [turn, setTurn] = useState(1);
  const [systemState, setSystemState] = useState<SystemNode[]>(deepCopy(INITIAL_SYSTEM_STATE));
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<{ title: string; message: string } | null>(null);
  const [attackerTarget, setAttackerTarget] = useState<NodeType | null>(null);
  const [lastPlayerAttack, setLastPlayerAttack] = useState<AttackerAction | undefined>(undefined);

  const addLogEntry = useCallback((message: string, options: Partial<Omit<LogEntry, 'message' | 'turn'>> = {}) => {
    setLogEntries(prev => [...prev, { turn, message, isAttack: false, ...options }]);
  }, [turn]);

  const startGame = (role: PlayerRole) => {
    setPlayerRole(role);
    setSystemState(deepCopy(INITIAL_SYSTEM_STATE));
    setTurn(1);
    setLogEntries([]);
    setSelectedNode(null);
    setGameOverMessage(null);
    setGameState(GameState.Playing);
    addLogEntry(`Game started. You are the ${role}.`, { type: 'INFO' });
  };

  const resetGame = () => {
    setGameState(GameState.MainMenu);
  };
  
  const checkGameOver = useCallback((currentState: SystemNode[]) => {
    const database = currentState.find(node => node.id === NodeType.Database);
    if (database && database.health <= 0) {
      setGameOverMessage({ title: 'You Lose!', message: 'The attacker has breached the database.' });
      setGameState(GameState.GameOver);
      return true;
    }
    if (turn >= MAX_TURNS) {
      setGameOverMessage({ title: 'You Win!', message: `You have successfully defended the network for ${MAX_TURNS} turns.` });
      setGameState(GameState.GameOver);
      return true;
    }
    return false;
  }, [turn]);

  const applyAttack = (action: AttackerAction, currentSystem: SystemNode[]) => {
    const newSystem = deepCopy(currentSystem);
    const targetNode = newSystem.find(n => n.id === action.target);
    if (!targetNode) return { updatedSystem: newSystem, success: false };

    let damage = ATTACK_DETAILS[action.attackType].baseDamage;
    let defenseStrength = 0;
    
    // Calculate total defense strength against this attack type
    targetNode.defenses.forEach(defense => {
        if ((action.attackType === AttackType.DDoS || action.attackType === AttackType.Probe) && defense.type === DefenseType.FirewallBlock) {
            defenseStrength += defense.strength;
        } else if ((action.attackType === AttackType.Exploit || action.attackType === AttackType.BruteForce) && defense.type === DefenseType.EncryptionShield) {
            defenseStrength += defense.strength;
        } else if ((action.attackType === AttackType.BruteForce || action.attackType === AttackType.Phishing) && defense.type === DefenseType.IntrusionDetection) {
            defenseStrength += defense.strength;
        }
    });

    const totalDamage = Math.max(0, damage - defenseStrength);
    targetNode.health = Math.max(0, targetNode.health - totalDamage);
    const success = totalDamage > 0;
    
    addLogEntry(
        `Attacker used ${action.attackType} on ${targetNode.name}. Damage: ${totalDamage}. Health: ${targetNode.health}`,
        { isAttack: true, isSuccess: success, type: 'ACTION' }
    );
    addLogEntry(`Justification: ${action.justification}`, { type: 'ATTACKER_JUSTIFICATION' });
    addLogEntry(`Tip: ${action.educationalTip}`, { type: 'TIP' });
    
    setAttackerTarget(action.target);
    setTimeout(() => setAttackerTarget(null), 1500); // Animation effect

    return { updatedSystem: newSystem, success };
  };

  const applyDefense = (action: DefenderAction, currentSystem: SystemNode[]) => {
    const newSystem = deepCopy(currentSystem);
    const targetNode = newSystem.find(n => n.id === action.target);
    if (!targetNode) return newSystem;
    
    const defenseDetails = DEFENSE_DETAILS[action.type];
    const newDefense: Defense = { type: action.type, strength: defenseDetails.strength };
    
    targetNode.defenses.push(newDefense);
    
    addLogEntry(
      `Defender deployed ${defenseDetails.name} on ${targetNode.name}. ${action.justification ? `Justification: ${action.justification}`: ''}`,
      { isAttack: false, type: 'ACTION' }
    );
    
    return newSystem;
  };

  const handlePlayerAttack = (attackType: AttackType) => {
    if (!selectedNode) return;
    const action: AttackerAction = {
      attackType,
      target: selectedNode.id,
      justification: "Player initiated attack.",
      educationalTip: "Manual override by player.",
    };
    const { updatedSystem } = applyAttack(action, systemState);
    setSystemState(updatedSystem);
    setLastPlayerAttack(action);
    if (!checkGameOver(updatedSystem)) {
      setTurn(t => t + 1);
      setGameState(playerRole === 'ATTACKER' ? GameState.DefenderTurn : GameState.AttackerTurn);
    }
  };
  
  const handlePlayerDefense = (defenseType: DefenseType) => {
    if (!selectedNode) return;
    const action: DefenderAction = {
      type: defenseType,
      target: selectedNode.id,
    };
    const updatedSystem = applyDefense(action, systemState);
    setSystemState(updatedSystem);
    if (!checkGameOver(updatedSystem)) {
        setTurn(t => t + 1);
        setGameState(playerRole === 'DEFENDER' ? GameState.AttackerTurn : GameState.DefenderTurn);
    }
  };
  
  // AI Turn Logic
  useEffect(() => {
    if (gameState !== GameState.AttackerTurn && gameState !== GameState.DefenderTurn) {
        return;
    }

    const performAITurn = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // AI "thinks"
        
        let updatedSystem = systemState;
        
        if (gameState === GameState.AttackerTurn) {
            const aiAttack = await getAttackerMove(systemState, turn);
            const result = applyAttack(aiAttack, systemState);
            updatedSystem = result.updatedSystem;
        } else if (gameState === GameState.DefenderTurn) {
            const aiDefense = await getDefenderMove(systemState, turn, lastPlayerAttack);
            updatedSystem = applyDefense(aiDefense, systemState);
        }
        
        setSystemState(updatedSystem);
        if (!checkGameOver(updatedSystem)) {
            setGameState(GameState.Playing);
        }
    };

    performAITurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, turn]);

  // UI Rendering
  const renderMainMenu = () => (
    <Modal title="Cyber Siege" buttonText="Start New Game" onButtonClick={() => setGameState(GameState.RoleSelection)}>
      <p>Welcome to Cyber Siege, a cybersecurity strategy game.</p>
      <p>Defend your network against an AI attacker, or take on the role of the attacker and try to breach the system's defenses. Your choices will determine the fate of the network.</p>
    </Modal>
  );

  const renderRoleSelection = () => (
    <Modal title="Choose Your Role" buttonText="Back to Main Menu" onButtonClick={resetGame}>
        <div className="flex justify-center space-x-8">
            <button onClick={() => startGame('DEFENDER')} className="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-500/20">
                <h3 className="text-xl font-bold text-blue-300">Defender</h3>
                <p>Protect the network from attacks.</p>
            </button>
            <button onClick={() => startGame('ATTACKER')} className="p-4 border-2 border-red-500 rounded-lg hover:bg-red-500/20">
                <h3 className="text-xl font-bold text-red-300">Attacker</h3>
                <p>Breach the network's defenses.</p>
            </button>
        </div>
    </Modal>
  );

  const renderGame = () => (
    <main className="container mx-auto p-4 h-screen flex flex-col space-y-4">
      <header className="flex justify-between items-center text-white p-2 bg-gray-900/50 border border-gray-700 rounded-lg">
        <h1 className="text-2xl font-bold text-green-400">Cyber Siege</h1>
        <div>Turn: <span className="font-bold">{turn}</span> / {MAX_TURNS}</div>
        <div>Role: <span className="font-bold">{playerRole}</span></div>
      </header>
      <div className="flex-grow grid grid-cols-3 grid-rows-1 gap-4 h-[calc(100vh-100px)]">
        <div className="col-span-2">
          <NodeDisplay 
            systemState={systemState}
            onNodeSelect={setSelectedNode}
            selectedNode={selectedNode}
            attackerTarget={attackerTarget}
          />
        </div>
        <div className="flex flex-col gap-4">
            <ActionPanel
                playerRole={playerRole}
                selectedNode={selectedNode}
                onDefenseAction={handlePlayerDefense}
                onAttackAction={handlePlayerAttack}
                isPlayerTurn={gameState === GameState.Playing}
            />
            <GameLog logEntries={logEntries} />
        </div>
      </div>
    </main>
  );

  const renderGameOver = () => (
    gameOverMessage && (
      <Modal title={gameOverMessage.title} buttonText="Play Again" onButtonClick={resetGame}>
        <p>{gameOverMessage.message}</p>
      </Modal>
    )
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono">
      {gameState === GameState.MainMenu && renderMainMenu()}
      {gameState === GameState.RoleSelection && renderRoleSelection()}
      {[GameState.Playing, GameState.AttackerTurn, GameState.DefenderTurn].includes(gameState) && renderGame()}
      {gameState === GameState.GameOver && renderGameOver()}
    </div>
  );
};

export default App;