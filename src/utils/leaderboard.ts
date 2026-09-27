import { LeaderboardEntry, KirbyAbility } from '../types/game';

const STORAGE_KEY = 'kirby_adventure_leaderboard_v1';

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'seed-1',
    playerName: '粉紅小英雄卡比',
    score: 5200,
    remainingHearts: 3,
    starsCollected: 8,
    stagesCleared: 4,
    isVictory: true,
    clearTimeSeconds: 42,
    finalAbility: 'stone',
    timestamp: Date.now() - 3600000 * 24,
  },
  {
    id: 'seed-2',
    playerName: '瓦豆魯迪好朋友',
    score: 4650,
    remainingHearts: 3,
    starsCollected: 6,
    stagesCleared: 4,
    isVictory: true,
    clearTimeSeconds: 58,
    finalAbility: 'normal',
    timestamp: Date.now() - 3600000 * 48,
  },
  {
    id: 'seed-3',
    playerName: '利劍戰士小迪',
    score: 3800,
    remainingHearts: 2,
    starsCollected: 5,
    stagesCleared: 4,
    isVictory: true,
    clearTimeSeconds: 75,
    finalAbility: 'sword',
    timestamp: Date.now() - 3600000 * 72,
  },
  {
    id: 'seed-4',
    playerName: '冰雪企鵝愛好者',
    score: 2900,
    remainingHearts: 1,
    starsCollected: 4,
    stagesCleared: 3,
    isVictory: false,
    clearTimeSeconds: 90,
    finalAbility: 'ice',
    timestamp: Date.now() - 3600000 * 96,
  },
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.sort((a, b) => b.score - a.score);
    }
    return INITIAL_LEADERBOARD;
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

export function saveScore(
  playerName: string,
  remainingHearts: number,
  starsCollected: number,
  stagesCleared: number,
  isVictory: boolean,
  clearTimeSeconds: number,
  finalAbility: KirbyAbility
): { entry: LeaderboardEntry; rank: number; breakdown: { baseScore: number; heartsBonus: number; starsBonus: number; speedBonus: number; perfectBonus: number } } {
  // Score formula
  const baseScore = stagesCleared * 800;
  const heartsBonus = remainingHearts * 700;
  const starsBonus = starsCollected * 150;
  const speedBonus = isVictory ? Math.max(0, 1500 - clearTimeSeconds * 15) : 0;
  const perfectBonus = (isVictory && remainingHearts === 3) ? 1200 : 0;
  const totalScore = baseScore + heartsBonus + starsBonus + speedBonus + perfectBonus;

  const newEntry: LeaderboardEntry = {
    id: `run-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    playerName: playerName.trim() || '無名小勇士',
    score: Math.round(totalScore),
    remainingHearts,
    starsCollected,
    stagesCleared,
    isVictory,
    clearTimeSeconds,
    finalAbility,
    timestamp: Date.now(),
  };

  const current = getLeaderboard();
  current.push(newEntry);
  current.sort((a, b) => b.score - a.score);

  // Keep top 20
  const trimmed = current.slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage errors
  }

  const rank = trimmed.findIndex((item) => item.id === newEntry.id) + 1;

  return {
    entry: newEntry,
    rank: rank > 0 ? rank : trimmed.length + 1,
    breakdown: {
      baseScore,
      heartsBonus,
      starsBonus,
      speedBonus,
      perfectBonus,
    },
  };
}

export function clearLeaderboard(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
  } catch {
    // ignore
  }
}
