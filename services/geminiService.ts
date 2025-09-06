import { GoogleGenAI, Type } from "@google/genai";
import { SystemNode, AttackerAction, NodeType, AttackType, DefenderAction, DefenseType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const attackResponseSchema = {
  type: Type.OBJECT,
  properties: {
    attackType: { type: Type.STRING, enum: Object.values(AttackType) },
    target: { type: Type.STRING, enum: Object.values(NodeType) },
    justification: { type: Type.STRING },
    educationalTip: { type: Type.STRING },
  },
  required: ['attackType', 'target', 'justification', 'educationalTip'],
};

const defenseResponseSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: Object.values(DefenseType) },
    target: { type: Type.STRING, enum: Object.values(NodeType) },
    justification: { type: Type.STRING },
  },
  required: ['type', 'target', 'justification'],
}

const generateContent = async (prompt: string, schema: any) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: schema,
            },
        });
        // FIX: Added fallback for response.text to prevent trim on undefined
        return JSON.parse((response.text || '').trim());
    } catch (error) {
        console.error("Error with Gemini API:", error);
        throw error;
    }
}

export const getAttackerMove = async (systemState: SystemNode[], turn: number): Promise<AttackerAction> => {
  const formattedSystemState = systemState.map(node => ({
    id: node.id,
    health: node.health,
    defenses: node.defenses.map(d => d.type),
    connections: node.connections,
  }));

  const prompt = `
    You are a strategic AI attacker in a cybersecurity game. Your goal is to breach the DATABASE.
    It is turn ${turn}. The system state is: ${JSON.stringify(formattedSystemState, null, 2)}

    Analyze the new network graph. The DATABASE is the ultimate prize, but you must go through the network.
    - GATEWAY is the single entry point.
    - From the GATEWAY, you can attack the FIREWALL or the DNS_SERVER. You must breach one to proceed.
    - The FIREWALL is heavily armored but a direct path.
    - The DNS_SERVER is weaker but might be a clever alternative route.
    - Both paths lead to the main WEB_SERVER, which protects the DATABASE.
    - The DATABASE is connected to a final BACKUP_SERVER. Breaching the DATABASE is the win condition.

    Consider the health and defenses of each node. Target the weakest link in the chain leading to the DATABASE.
    Think multiple steps ahead. A PROBE on a key node might be better than a brute force attack on a well-defended one.
    Be aggressive and exploit any opening. A low-health node is a prime target.

    Return your chosen action in the specified JSON format.
  `;

  try {
    const action = await generateContent(prompt, attackResponseSchema) as AttackerAction;
     if (!Object.values(AttackType).includes(action.attackType) || !Object.values(NodeType).includes(action.target)) {
      throw new Error("AI returned an invalid action.");
    }
    return action;
  } catch (error) {
     return {
      attackType: AttackType.Probe,
      target: NodeType.Gateway,
      justification: "AI Error Fallback: Probing gateway.",
      educationalTip: "When APIs fail, having a fallback ensures the application doesn't crash."
    };
  }
};

export const getDefenderMove = async (systemState: SystemNode[], turn: number, lastPlayerAttack?: AttackerAction): Promise<DefenderAction> => {
    const formattedSystemState = systemState.map(node => ({
        id: node.id,
        health: node.health,
        defenses: node.defenses.map(d => d.type),
    }));

    const prompt = `
      You are a strategic AI defender in a cybersecurity game. Your goal is to protect the DATABASE for all turns.
      It is turn ${turn}. The system state is: ${JSON.stringify(formattedSystemState, null, 2)}
      ${lastPlayerAttack ? `The attacker just used ${lastPlayerAttack.attackType} on your ${lastPlayerAttack.target}.` : ''}

      Analyze your network's vulnerabilities based on the new topology.
      - The DATABASE and the BACKUP_SERVER are your most critical assets.
      - They are protected by the WEB_SERVER.
      - The WEB_SERVER can be reached from two paths: through the FIREWALL or the DNS_SERVER. You must defend both avenues.
      - Prioritize defending nodes with low health or those that are critical choke points (like the WEB_SERVER).
      - If the attacker is focusing on one path (e.g., the FIREWALL), consider reinforcing it or its connected nodes.
      - Deploy defenses that counter the attacker's likely next move. If they just probed, they might be preparing an EXPLOIT.

      Return your chosen defense action in the specified JSON format.
    `;

    try {
        const action = await generateContent(prompt, defenseResponseSchema) as DefenderAction;
        if (!Object.values(DefenseType).includes(action.type) || !Object.values(NodeType).includes(action.target)) {
            throw new Error("AI returned an invalid defense action.");
        }
        return action;
    } catch (error) {
        return {
            type: DefenseType.FirewallBlock,
            target: NodeType.Firewall,
            justification: "AI Error Fallback: Reinforcing the main firewall."
        };
    }
};
