export type KirbyAbility = 'normal' | 'sword' | 'ice' | 'stone';

export interface StageOption {
  text: string;
  badge?: string;
  hint?: string;
  hotkey: '1' | '2' | '3';
  action: () => void;
}

export interface StageConfig {
  stageId: number;
  stageName: string;
  title: string;
  bgImage: string;
  enemyImage: string | null;
  obstacleImage: string | null;
  dialogue: string;
  storyHint?: string;
  options: StageOption[];
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  remainingHearts: number;
  starsCollected: number;
  stagesCleared: number;
  isVictory: boolean;
  clearTimeSeconds: number;
  finalAbility: KirbyAbility;
  timestamp: number;
}

export interface GameSettings {
  screenMode: 'responsive' | 'contained' | 'theater';
  showKeyboardGuide: boolean;
}
