import React, { useState } from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { KirbyAbility } from '../types/game';

interface StageDisplayProps {
  stage: number;
  ability: KirbyAbility;
  bgImage: string;
  enemyImage: string | null;
  obstacleImage: string | null;
  isHurt: boolean;
  isVictory: boolean;
  isGameOver: boolean;
  onCollectStar?: () => void;
  floatingStarVisible?: boolean;
}

const KIRBY_IMAGES: Record<KirbyAbility, string> = {
  normal: 'normal-kp.jpg',
  sword: 'sword-kp.jpg',
  ice: 'ice-kp.jpg',
  stone: 'stone-kp.jpg',
};

export const StageDisplay: React.FC<StageDisplayProps> = ({
  stage,
  ability,
  bgImage,
  enemyImage,
  obstacleImage,
  isHurt,
  isVictory,
  isGameOver,
  onCollectStar,
  floatingStarVisible = true,
}) => {
  const [starCollectedAnim, setStarCollectedAnim] = useState(false);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!starCollectedAnim && onCollectStar) {
      setStarCollectedAnim(true);
      onCollectStar();
      setTimeout(() => setStarCollectedAnim(false), 800);
    }
  };

  return (
    <div
      className={`relative w-full h-[260px] xs:h-[300px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden shadow-inner border-4 border-pink-200 transition-all duration-500 bg-slate-900 ${
        isHurt ? 'hurt-shake ring-4 ring-rose-500/80' : ''
      }`}
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dynamic Ambient Mist & Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none" />

      {/* Floating Bonus Star (Interactive Gameplay Touch / Click element for kids) */}
      {floatingStarVisible && !isVictory && !isGameOver && (
        <button
          onClick={handleStarClick}
          className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/90 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm border-2 border-white shadow-lg cursor-pointer transform transition-all active:scale-95 ${
            starCollectedAnim ? 'scale-150 opacity-0 -translate-y-6 duration-500' : 'animate-bounce'
          }`}
          title="點擊獲取甜點星星 +150 分！"
        >
          <Sparkles className="w-4 h-4 text-amber-800 fill-amber-300 animate-spin" />
          <span>點我吃星星 ⭐ +150</span>
        </button>
      )}

      {/* Victory Golden Aureole Overlay */}
      {isVictory && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-radial from-amber-300/40 via-pink-400/30 to-black/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="absolute inset-0 spin-glow bg-[radial-gradient(circle,rgba(255,230,0,0.3)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />
          <div className="relative z-40 text-center px-4 py-2 transform scale-110 animate-bounce">
            <div className="inline-flex p-3 rounded-full bg-yellow-400 shadow-xl border-4 border-white mb-2 text-pink-900">
              <Trophy className="w-10 h-10 sm:w-14 sm:h-14 fill-yellow-200" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              甜點王國的大英雄！
            </h2>
            <p className="text-yellow-200 font-bold text-sm sm:text-base drop-shadow-md mt-1">
              大魔王已被擊退，草莓大蛋糕安全拯救！
            </p>
          </div>
        </div>
      )}

      {/* Game Over Fog Overlay */}
      {isGameOver && !isVictory && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn text-center p-4">
          <span className="text-5xl sm:text-6xl mb-2 animate-pulse">💀</span>
          <h3 className="text-xl sm:text-3xl font-black text-rose-300 drop-shadow-lg">
            生命值耗盡！
          </h3>
          <p className="text-white text-xs sm:text-sm mt-1 max-w-md">
            別氣餒，粉紅小勇士卡比永遠有無限勇氣！再次嘗試吧！
          </p>
        </div>
      )}

      {/* Characters and Obstacles Stage Layer */}
      <div className="relative z-10 w-full h-full flex items-end justify-around px-4 sm:px-12 pb-5 sm:pb-8">
        
        {/* Kirby Protagonist */}
        <div className="relative flex flex-col items-center">
          <img
            src={KIRBY_IMAGES[ability]}
            alt={`卡比 - ${ability}`}
            className="w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain kirby-anim drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)] transition-all duration-300 pointer-events-none"
          />
          {/* Ground Contact Shadow */}
          <div className="w-24 sm:w-36 h-4 bg-black/35 rounded-full blur-[3px] -mt-2 sm:-mt-3" />
        </div>

        {/* Center Obstacle (Stage 2: Waterfall, Stage 3: Spikes) */}
        {obstacleImage && !isVictory && (
          <div className="relative flex flex-col items-center">
            <img
              src={obstacleImage}
              alt="關卡障礙物"
              className="w-24 h-24 xs:w-32 xs:h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain obstacle-anim drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)] pointer-events-none"
            />
            <div className="w-20 sm:w-32 h-3.5 bg-black/30 rounded-full blur-[2px] -mt-1 sm:-mt-2" />
          </div>
        )}

        {/* Enemy or Boss (Stage 1: Knight, Stage 2: Penguin, Stage 4: Boss Bird) */}
        {enemyImage && !isVictory && (
          <div className="relative flex flex-col items-center">
            <img
              src={enemyImage}
              alt="敵人怪獸或大魔王"
              className="w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain enemy-anim drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)] pointer-events-none"
            />
            <div className="w-24 sm:w-36 h-4 bg-black/35 rounded-full blur-[3px] -mt-2 sm:-mt-3" />
          </div>
        )}

      </div>
    </div>
  );
};
