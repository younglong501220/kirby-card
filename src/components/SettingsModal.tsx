import React from 'react';
import { Volume2, VolumeX, Music, Keyboard, Smartphone, Info, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  isMuted: boolean;
  isBgmActive: boolean;
  volume: number;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onChangeVolume: (vol: number) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  isMuted,
  isBgmActive,
  volume,
  onToggleMute,
  onToggleBgm,
  onChangeVolume,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-pink-400 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h3 className="text-xl font-black tracking-wide">遊戲設定與按鍵指南</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 bg-pink-50/50 text-slate-800 text-sm">
          
          {/* Audio Controls */}
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-3">
            <h4 className="font-black text-rose-600 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" /> 音效與音樂控制
            </h4>

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">遊戲音效 (SFX)</span>
              <button
                onClick={onToggleMute}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  isMuted ? 'bg-slate-200 text-slate-700' : 'bg-pink-500 text-white'
                }`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? '已靜音' : '音效開啟'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">復古 8-bit 背景音樂</span>
              <button
                onClick={onToggleBgm}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  isBgmActive ? 'bg-amber-400 text-amber-950 font-black' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isBgmActive ? '音樂播放中 🎵' : '音樂關閉'}</span>
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>音量大小</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-2.5">
            <h4 className="font-black text-rose-600 flex items-center gap-1.5">
              <Keyboard className="w-4 h-4" /> 鍵盤快捷操作表
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">選擇選項 1, 2, 3</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">1 / 2 / 3</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">方向鍵切換選項</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">← → / ↑ ↓</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">確認目前選擇</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">Enter / 空白鍵</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">點擊收集甜點星星</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">S 鍵</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">開啟 / 靜音音效</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">M 鍵</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">背景音樂開關</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">B 鍵</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">查看排行榜</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">H 鍵</kbd>
              </div>
              <div className="p-2 bg-pink-50/70 rounded-xl flex items-center justify-between border border-pink-100">
                <span className="text-slate-600">重新開始冒險</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-pink-600">R 鍵</kbd>
              </div>
            </div>
          </div>

          {/* Touch Support Note */}
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-cyan-100 text-cyan-700">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-800">觸控螢幕完美適配</h5>
              <p className="text-xs text-slate-500">
                所有按鈕均採用超大觸控感應熱區，點擊直覺靈敏，即使在手機或平板上也能流暢遊玩。
              </p>
            </div>
          </div>

          {/* Story Background */}
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-1.5">
            <h4 className="font-black text-rose-600 flex items-center gap-1.5">
              <Info className="w-4 h-4" /> 冒險背景故事
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              甜點王國舉辦了一年一度的草莓大慶典！貪吃的大胖鳥魔王卻帶著手下企圖搶走最後也是最巨大的「國王草莓蛋糕」！
              粉紅勇者卡比挺身而出，穿越草莓森林、急流瀑布與刺針地底城，靈活運用吸收變身的能力，拯救甜點王國吧！
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-white border-t border-pink-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-xs cursor-pointer active:scale-95"
          >
            了解完畢，開始冒險！
          </button>
        </div>

      </div>
    </div>
  );
};
