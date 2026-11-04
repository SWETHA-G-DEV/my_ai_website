export type GameLevel = 'intro' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'celebration';

export interface GameProgress {
  unlockedLevel: number; // 1 to 5
  currentLevel: GameLevel;
  heartsCollectedLevel2: number;
  level3Score: number;
  level4ItemsFound: string[];
  hasAcceptedProposal: boolean;
  soundEnabled: boolean;
}

export interface DialogueLine {
  speaker: 'cat' | 'akilesh' | 'narrator';
  text: string;
  catMood?: 'happy' | 'excited' | 'thinking' | 'wink' | 'love' | 'surprised';
  akileshMood?: 'idle' | 'curious' | 'surprised' | 'happy' | 'blush';
}
