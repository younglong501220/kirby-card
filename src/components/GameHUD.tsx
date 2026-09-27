import React from 'react';
import { Volume2, VolumeX, Music, Trophy, HelpCircle, RotateCcw, Sparkles } from 'lucide-react';
import { KirbyAbility } from '../types/game';

interface GameHUDProps {
  health: number;
  maxHealth: number;
  ability: KirbyAbility;
  stage: number;
  totalStages: number;
  score: number;
  starsCollected: number;
  isMuted: boolean;
  isBgmActive: boolean;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onOpenLeaderboard: () => void;
  onOpenHelp: () => void;
  onRestart: () => void;
}

const ABILITY_INFO: Record<KirbyAbility, { name: string; icon: string; bg: string; border: string }> = {
  normal: { name: '普通卡比', icon: '🩷', bg: 'bg-pink-100 text-pink-700', border: 'border-pink-300' },
  sword: { name: '利劍戰士', icon: '⚔️', bg: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-400' },
  ice: { name: '冰霜王冠', icon: '❄️', bg: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  stone: { name: '堅硬巨石', icon: '🪨', bg: 'bg-amber-100 text-amber-800', border: 'border-amber-400' },
};

export const GameHUD: React.FC<GameHUDProps> = ({
  health,
  maxHealth,
  ability,
  stage,
  totalStages,
  score,
  starsCollected,
  isMuted,
  isBgmActive,
  onToggleMute,
  onToggleBgm,
  onOpenLeaderboard,
  onOpenHelp,
  onRestart,
}) => {
  const currentAbility = ABILITY_INFO[ability];

  return (
    <header className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md border-b-4 border-pink-400 select-none">
      <div className="max-w-5xl mx-auto px-3 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Health and Ability */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Hearts Meter */}
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
            <span className="text-xs font-bold text-pink-100 uppercase tracking-wider mr-1">體力</span>
            {Array.from({ length: maxHealth }).map((_, index) => {
              const isAlive = index < health;
              return (
                <span
                  key={index}
                  className={`text-xl transition-all duration-300 transform ${
                    isAlive ? 'scale-110 drop-shadow-[0_2px_4px_rgba(255,0,80,0.6)]' : 'grayscale opacity-30 scale-90'
                  }`}
                  role="img"
                  aria-label={isAlive ? '生命值' : '失去生命'}
                >
                  ❤️
                </span>
              );
            })}
          </div>

          {/* Current Kirby Ability Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black border shadow-xs ${currentAbility.bg} ${currentAbility.border}`}>
            <span className="text-base">{currentAbility.icon}</span>
            <span>{currentAbility.name}</span>
          </div>
        </div>

        {/* Center: Stage Progress & Score */}
        <div className="flex items-center gap-3">
          {/* Stage badge */}
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
            <span>關卡 {stage} / {totalStages}</span>
          </div>

          {/* Bonus Star Counter */}
          <div className="flex items-center gap-1 bg-amber-400/30 px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold text-yellow-100 border border-yellow-300/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>⭐ {starsCollected}</span>
          </div>

          {/* Score display */}
          <div className="bg-black/25 px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-bold text-yellow-200">
            {score.toLocaleString()} PTS
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? '開啟音效 (按 M)' : '靜音音效 (按 M)'}
            className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* BGM Toggle */}
          <button
            onClick={onToggleBgm}
            title={isBgmActive ? '關閉背景音樂 (按 B)' : '播放背景音樂 (按 B)'}
            className={`p-1.5 sm:p-2 rounded-full transition-all text-white ${
              isBgmActive ? 'bg-yellow-400 text-pink-900 shadow-sm animate-pulse' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* High Score Leaderboard */}
          <button
            onClick={onOpenLeaderboard}
            title="排行榜 (按 H)"
            className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white flex items-center gap-1"
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="hidden md:inline text-xs font-bold">排行榜</span>
          </button>

          {/* Help / Guide */}
          <button
            onClick={onOpenHelp}
            title="操作說明與按鍵指南"
            className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            onClick={onRestart}
            title="重新開始 (按 R)"
            className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
