import React from 'react';
import { Trophy, Medal, Clock, Sparkles, X, Trash2 } from 'lucide-react';
import { LeaderboardEntry } from '../types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  entries: LeaderboardEntry[];
  currentHighlightId?: string;
  onClose: () => void;
  onClear: () => void;
}

const ABILITY_LABELS: Record<string, string> = {
  normal: '普通 🩷',
  sword: '利劍 ⚔️',
  ice: '冰凍 ❄️',
  stone: '石頭 🪨',
};

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  entries,
  currentHighlightId,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-pink-400 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-yellow-400 text-pink-900 rounded-full shadow-inner">
              <Trophy className="w-5 h-5 fill-yellow-200" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide">甜點冒險大英雄榮譽榜</h3>
              <p className="text-xs text-pink-100 font-medium">記錄最勇敢的卡比冒險家通關成績！</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white"
            title="關閉 (按 ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body / Table */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3 bg-pink-50/40">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">
              目前尚無紀錄，快完成第一場冒險吧！
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => {
                const isHighlight = entry.id === currentHighlightId;
                const isGold = index === 0;
                const isSilver = index === 1;
                const isBronze = index === 2;

                return (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isHighlight
                        ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-400/60 shadow-md'
                        : isGold
                        ? 'bg-yellow-50/90 border-yellow-300'
                        : isSilver
                        ? 'bg-slate-50/90 border-slate-300'
                        : isBronze
                        ? 'bg-orange-50/80 border-orange-200'
                        : 'bg-white border-pink-100'
                    }`}
                  >
                    {/* Rank Badge & Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-black rounded-full text-sm">
                        {isGold ? (
                          <span className="text-xl">🥇</span>
                        ) : isSilver ? (
                          <span className="text-xl">🥈</span>
                        ) : isBronze ? (
                          <span className="text-xl">🥉</span>
                        ) : (
                          <span className="text-slate-500 font-mono">#{index + 1}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="font-black text-slate-800 text-sm sm:text-base truncate flex items-center gap-1.5">
                          <span>{entry.playerName}</span>
                          {entry.isVictory && (
                            <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                              通關 🏆
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                          <span>型態: {ABILITY_LABELS[entry.finalAbility] || entry.finalAbility}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {entry.clearTimeSeconds}秒
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                            <Sparkles className="w-3 h-3" />
                            {entry.starsCollected}星
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0 pl-2">
                      <div className="font-mono font-black text-base sm:text-lg text-pink-600">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">PTS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-white border-t border-pink-100 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (window.confirm('確定要重置所有排行榜紀錄嗎？')) {
                onClear();
              }
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>重置榜單</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-xs cursor-pointer active:scale-95"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
};
