import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { StageOption } from '../types/game';

interface ActionControlsProps {
  options: StageOption[];
  selectedIndex: number;
  isGameOver: boolean;
  isVictory: boolean;
  onSelectOption: (index: number) => void;
  onRestart: () => void;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  options,
  selectedIndex,
  isGameOver,
  isVictory,
  onSelectOption,
  onRestart,
}) => {
  if (isGameOver || isVictory) {
    return (
      <div className="w-full p-4 sm:p-6 bg-pink-50/80 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center gap-3">
        <button
          onClick={onRestart}
          className="game-btn w-full max-w-md py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-lg sm:text-xl flex items-center justify-center gap-3 border-2 border-yellow-200 cursor-pointer [--btn-shadow:#d97706]"
        >
          {isVictory ? (
            <>
              <Sparkles className="w-6 h-6 text-pink-700 animate-spin" />
              <span>🌸 再玩一次精彩冒險！ (按 R) 🌸</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-6 h-6" />
              <span>🔄 重新鼓起勇氣出發！ (按 R)</span>
            </>
          )}
        </button>
        <span className="text-xs text-pink-700 font-semibold">
          提示：也可以直接按下鍵盤 [R] 或 [空白鍵] 快速重啟
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt, idx) => {
          const isFocused = selectedIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`game-btn relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl text-left sm:text-center transition-all duration-150 cursor-pointer ${
                isFocused
                  ? 'bg-gradient-to-b from-rose-500 to-pink-600 text-white ring-4 ring-yellow-300 ring-offset-2 scale-[1.02] [--btn-shadow:#9f1239]'
                  : 'bg-gradient-to-b from-pink-400 to-rose-500 hover:from-pink-300 hover:to-rose-400 text-white [--btn-shadow:#be123c]'
              }`}
            >
              {/* Keyboard Hotkey Badge Chip */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-full border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-yellow-200">
                鍵盤 [{opt.hotkey}]
              </div>

              {/* Action Text */}
              <div className="text-base sm:text-lg font-black tracking-wide pr-8 sm:pr-0 leading-snug">
                {opt.text}
              </div>

              {/* Helpful Hint or Subtitle */}
              {opt.hint && (
                <div className="text-xs text-pink-100 font-medium mt-1 opacity-90">
                  {opt.hint}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Dual Mode Guide footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-pink-800/80 px-2 font-medium">
        <span>🎮 支援鍵盤數字鍵 [1] [2] [3] 或 方向鍵切換 + [Enter] 選擇</span>
        <span className="hidden sm:inline">📱 手機/平板支援觸控直覺點擊</span>
      </div>
    </div>
  );
};
