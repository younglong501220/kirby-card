import React, { useState } from 'react';
import { Trophy, Star, Heart, Clock, Sparkles } from 'lucide-react';
import { KirbyAbility } from '../types/game';

interface ScoreSubmitModalProps {
  isOpen: boolean;
  isVictory: boolean;
  score: number;
  remainingHearts: number;
  starsCollected: number;
  clearTimeSeconds: number;
  ability: KirbyAbility;
  breakdown: {
    baseScore: number;
    heartsBonus: number;
    starsBonus: number;
    speedBonus: number;
    perfectBonus: number;
  };
  onSubmit: (playerName: string) => void;
  onSkip: () => void;
}

export const ScoreSubmitModal: React.FC<ScoreSubmitModalProps> = ({
  isOpen,
  isVictory,
  score,
  remainingHearts,
  starsCollected,
  clearTimeSeconds,
  ability,
  breakdown,
  onSubmit,
  onSkip,
}) => {
  const [name, setName] = useState('粉紅勇者卡比');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim() || '無名小卡比');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-pink-400 overflow-hidden flex flex-col text-slate-800">
        
        {/* Banner */}
        <div className={`p-5 text-center text-white ${
          isVictory
            ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500'
            : 'bg-gradient-to-r from-slate-600 to-slate-800'
        }`}>
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 shadow-inner">
            {isVictory ? (
              <Trophy className="w-9 h-9 text-yellow-300 fill-yellow-300 animate-bounce" />
            ) : (
              <span className="text-3xl">🎖️</span>
            )}
          </div>
          <h3 className="text-2xl font-black">
            {isVictory ? '🎉 甜點王國冒險大通關！' : '冒險結算'}
          </h3>
          <p className="text-xs text-white/90 font-medium mt-0.5">
            {isVictory ? '太棒了！你的英勇表現已經拯救了草莓蛋糕！' : '累積了不少冒險經驗，下次一定能過關！'}
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 bg-pink-50/50">
          
          {/* Total Score Display */}
          <div className="bg-white p-4 rounded-2xl border border-pink-200 text-center shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">本次冒險總得分</div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-rose-600 mt-1">
              {score.toLocaleString()} <span className="text-sm font-bold text-slate-500">PTS</span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <div className="bg-white p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-rose-600">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                剩餘體力
              </span>
              <span className="font-mono text-slate-700">+{breakdown.heartsBonus}</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                甜點星星 ({starsCollected})
              </span>
              <span className="font-mono text-slate-700">+{breakdown.starsBonus}</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-blue-600">
                <Clock className="w-3.5 h-3.5" />
                過關時長 ({clearTimeSeconds}s)
              </span>
              <span className="font-mono text-slate-700">+{breakdown.speedBonus}</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-purple-600">
                <Sparkles className="w-3.5 h-3.5" />
                無傷獎勵
              </span>
              <span className="font-mono text-slate-700">+{breakdown.perfectBonus}</span>
            </div>
          </div>

          {/* Player Name Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                請輸入你的勇者名字登記排行榜：
              </label>
              <input
                type="text"
                maxLength={15}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：草莓小卡比"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-pink-300 focus:border-rose-500 focus:outline-none bg-white text-sm font-bold text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onSkip}
                className="w-1/3 py-2.5 rounded-xl border-2 border-pink-200 text-slate-500 hover:bg-white text-xs font-bold cursor-pointer"
              >
                跳過
              </button>
              <button
                type="submit"
                className="w-2/3 game-btn py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-black shadow-md cursor-pointer [--btn-shadow:#9f1239]"
              >
                ✨ 登錄排行榜！
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
