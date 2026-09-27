import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { GameHUD } from './components/GameHUD';
import { StageDisplay } from './components/StageDisplay';
import { ActionControls } from './components/ActionControls';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ScoreSubmitModal } from './components/ScoreSubmitModal';
import { SettingsModal } from './components/SettingsModal';
import { sound } from './utils/audio';
import { getLeaderboard, saveScore, clearLeaderboard } from './utils/leaderboard';
import { KirbyAbility, StageConfig, StageOption, LeaderboardEntry } from './types/game';

export default function App() {
  // Game Play States
  const [health, setHealth] = useState<number>(3);
  const [stage, setStage] = useState<number>(1);
  const [ability, setAbility] = useState<KirbyAbility>('normal');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isHurt, setIsHurt] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [starsCollected, setStarsCollected] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>(
    '【第一關：草莓森林】香甜的草莓森林裡，前方出現了揮舞著小寶劍的「盔甲騎士怪」！請問卡比該採取什麼行動？'
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [floatingStarVisible, setFloatingStarVisible] = useState<boolean>(true);

  // Time tracking
  const [startTime, setStartTime] = useState<number>(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Audio States
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [isBgmActive, setIsBgmActive] = useState<boolean>(() => sound.isBgmActive());
  const [volume, setVolume] = useState<number>(() => sound.getVolume());

  // Modals
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showScoreSubmit, setShowScoreSubmit] = useState<boolean>(false);
  const [highlightId, setHighlightId] = useState<string>('');
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());

  const [scoreBreakdown, setScoreBreakdown] = useState({
    baseScore: 0,
    heartsBonus: 0,
    starsBonus: 0,
    speedBonus: 0,
    perfectBonus: 0,
  });

  // Timer loop
  useEffect(() => {
    if (isGameOver || isVictory) return;
    const interval = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, isVictory, startTime]);

  // Audio Handlers
  const handleToggleMute = useCallback(() => {
    const next = sound.toggleMute();
    setIsMuted(next);
  }, []);

  const handleToggleBgm = useCallback(() => {
    const next = sound.toggleBGM();
    setIsBgmActive(next);
  }, []);

  const handleChangeVolume = useCallback((val: number) => {
    sound.setVolume(val);
    setVolume(val);
  }, []);

  // Collect Bonus Floating Star
  const handleCollectStar = useCallback(() => {
    if (!floatingStarVisible) return;
    sound.playStarCollect();
    setStarsCollected((prev) => prev + 1);
    setScore((prev) => prev + 150);
    setFloatingStarVisible(false);
  }, [floatingStarVisible]);

  // Restart / Reset game state
  const resetGame = useCallback(() => {
    sound.playClick();
    setHealth(3);
    setStage(1);
    setAbility('normal');
    setIsGameOver(false);
    setIsVictory(false);
    setIsHurt(false);
    setScore(0);
    setStarsCollected(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setFloatingStarVisible(true);
    setSelectedIndex(0);
    setShowScoreSubmit(false);
    setDialogue(
      '【第一關：草莓森林】香甜的草莓森林裡，前方出現了揮舞著小寶劍的「盔甲騎士怪」！請問卡比該採取什麼行動？'
    );
  }, []);

  // Hurt handler
  const triggerHurt = useCallback(
    (reason: string) => {
      sound.playHurt();
      setIsHurt(true);
      setTimeout(() => setIsHurt(false), 450);

      setHealth((prevHealth) => {
        const nextHealth = prevHealth - 1;
        if (nextHealth <= 0) {
          // Game Over
          setIsGameOver(true);
          sound.playGameOver();
          setDialogue(`💀 冒險失敗：${reason} 生命值歸零了！別氣餒，再試一次吧！`);

          // Calculate final score breakdown
          const duration = Math.floor((Date.now() - startTime) / 1000);
          const breakdown = {
            baseScore: (stage - 1) * 800,
            heartsBonus: 0,
            starsBonus: starsCollected * 150,
            speedBonus: 0,
            perfectBonus: 0,
          };
          setScoreBreakdown(breakdown);
          setTimeout(() => setShowScoreSubmit(true), 600);
          return 0;
        } else {
          setDialogue(`💥 哎呀受傷了！${reason}（剩餘生命：${nextHealth} ❤️，請重新選擇正確的策略！）`);
          return nextHealth;
        }
      });
    },
    [stage, starsCollected, startTime]
  );

  // Victory handler
  const triggerVictory = useCallback(() => {
    setIsVictory(true);
    setIsGameOver(true);
    sound.playVictory();

    // Trigger colorful confetti shower
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7399', '#facc15', '#38bdf8', '#4ade80', '#c084fc'],
    });

    setDialogue(
      '👑✨🩷✨👑 萬歲！大魔王被你打跑了，國王草莓大蛋糕被安全保護了下來！你拯救了甜點王國，成為受人敬仰的大英雄！'
    );

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const baseScore = 4 * 800;
    const heartsBonus = health * 700;
    const starsBonus = starsCollected * 150;
    const speedBonus = Math.max(0, 1500 - duration * 15);
    const perfectBonus = health === 3 ? 1200 : 0;
    const finalScore = baseScore + heartsBonus + starsBonus + speedBonus + perfectBonus;

    setScore(finalScore);
    setScoreBreakdown({
      baseScore,
      heartsBonus,
      starsBonus,
      speedBonus,
      perfectBonus,
    });

    setTimeout(() => {
      setShowScoreSubmit(true);
    }, 1200);
  }, [health, starsCollected, startTime]);

  // Stage choice handlers
  const handleStage1Option = useCallback(
    (index: number) => {
      sound.playClick();
      if (index === 0) {
        // Inhale Knight -> Sword
        sound.playPowerUp();
        setAbility('sword');
        setStage(2);
        setScore((s) => s + 500);
        setFloatingStarVisible(true);
        setSelectedIndex(0);
        setDialogue(
          '✨ 卡比大口將騎士怪吞進肚子，獲得了 [利劍狀態 ⚔️]！頭戴綠色戰士帽、手持鋒利小寶劍，威風凜凜邁向第二關！'
        );
      } else if (index === 1) {
        // Fly over -> Normal
        sound.playPowerUp();
        setStage(2);
        setScore((s) => s + 350);
        setFloatingStarVisible(true);
        setSelectedIndex(0);
        setDialogue(
          '🎈 卡比吸滿空氣像粉紅小氣球一樣輕盈飄過騎士怪頭頂，無傷過關！身上依舊保持可愛的 [普通狀態 🩷]！'
        );
      } else {
        // Roll into sword -> Hurt
        triggerHurt('卡比直接衝撞騎士怪的劍尖，被利劍刺痛彈了回來！扣 1 顆心！');
      }
    },
    [triggerHurt]
  );

  const handleStage2Option = useCallback(
    (index: number) => {
      sound.playClick();
      if (index === 0) {
        // Inhale Penguin -> Ice
        sound.playPowerUp();
        setAbility('ice');
        setStage(3);
        setScore((s) => s + 500);
        setFloatingStarVisible(true);
        setSelectedIndex(0);
        setDialogue(
          '❄️ 卡比大口吸入了冰凍企鵝，轉化為華麗的 [冰凍狀態 ❄️]！戴上晶瑩剔透的冰晶王冠，前進第三關！'
        );
      } else if (index === 1) {
        // Slash Waterfall with Sword
        if (ability === 'sword') {
          sound.playPowerUp();
          setAbility('stone');
          setStage(3);
          setScore((s) => s + 850); // Secret branch bonus!
          setFloatingStarVisible(true);
          setSelectedIndex(0);
          setDialogue(
            '🪨 厲害！卡比拔劍一刀將奔騰瀑布斬成兩半！山壁震動掉落一塊巨大岩石，意外砸中卡比，因禍得福轉化為堅不可摧的 [石頭狀態 🪨]！'
          );
        } else {
          triggerHurt('你手上沒有寶劍，肉身劈不開兇猛的瀑布，被水流迎面痛擊！扣 1 顆心！');
        }
      } else {
        // Swim into rapids -> Hurt
        triggerHurt('瀑布的水流太急了！卡比跳進水中瞬間被沖得團團轉差點溺水！扣 1 顆心！');
      }
    },
    [ability, triggerHurt]
  );

  const handleStage3Option = useCallback(
    (index: number) => {
      sound.playClick();
      if (index === 0) {
        // Freeze spikes
        if (ability === 'ice') {
          sound.playPowerUp();
          setStage(4);
          setScore((s) => s + 600);
          setFloatingStarVisible(true);
          setSelectedIndex(0);
          setDialogue(
            '❄️ 卡比呼出一陣陣白色的寒冰氣息，將尖銳的地刺凍成滑溜溜的溜冰場，優雅地滑了過去！前往點心城堡！'
          );
        } else {
          triggerHurt('你身上沒有冰凍魔法，無法把尖刺凍結！被刺扎到了！扣 1 顆心！');
        }
      } else if (index === 1) {
        // Fly over
        if (ability === 'normal') {
          sound.playPowerUp();
          setStage(4);
          setScore((s) => s + 600);
          setFloatingStarVisible(true);
          setSelectedIndex(0);
          setDialogue(
            '🎈 普通卡比身材圓滾輕盈，鼓起腮幫子頂著地底狂風慢慢從上空安全飄過！成功抵達點心城堡！'
          );
        } else {
          triggerHurt('身上的厚重裝備或大石頭太重了，無法頂著地底強風飛高，掉落踩到刺針！扣 1 顆心！');
        }
      } else {
        // Stone Smash
        if (ability === 'stone') {
          sound.playPowerUp();
          setStage(4);
          setScore((s) => s + 600);
          setFloatingStarVisible(true);
          setSelectedIndex(0);
          setDialogue(
            '🪨 石頭卡比高高躍起，在空中化身為硬邦邦的灰色巨石猛烈下砸，直接將所有金屬尖刺通通砸個粉碎！帥氣前往點心城堡！'
          );
        } else {
          triggerHurt('你的身體不夠堅硬，直接往下踩只會被金屬刺針扎傷腳底板！扣 1 顆心！');
        }
      }
    },
    [ability, triggerHurt]
  );

  const handleStage4Option = useCallback(
    (index: number) => {
      sound.playClick();
      if (index === 0) {
        // Stone Drop
        if (ability === 'stone') {
          triggerVictory();
        } else {
          sound.playGameOver();
          setIsGameOver(true);
          setDialogue(
            '💀 你的身體不是堅硬的大石頭，泰山壓頂沒有任何威力，反而激怒了大胖鳥，被它一口吞了下去！'
          );
          setTimeout(() => setShowScoreSubmit(true), 800);
        }
      } else if (index === 1) {
        // Spit Star back
        if (ability === 'normal') {
          triggerVictory();
        } else {
          sound.playGameOver();
          setIsGameOver(true);
          setDialogue(
            '💀 你頭上戴著能力帽子無法順利張大嘴巴吸入巨大星星，反被大胖鳥猛啄一口吞下！'
          );
          setTimeout(() => setShowScoreSubmit(true), 800);
        }
      } else {
        // Tickle bird
        sound.playGameOver();
        setIsGameOver(true);
        setDialogue(
          '💀 大胖鳥根本不想跟你做朋友！它貪婪地張開巨大鳥喙，連同草莓蛋糕和你一起吞進了肚子裡！'
        );
        setTimeout(() => setShowScoreSubmit(true), 800);
      }
    },
    [ability, triggerVictory]
  );

  // Stage Configurations
  const stageConfig: StageConfig = useMemo(() => {
    switch (stage) {
      case 1:
        return {
          stageId: 1,
          stageName: '草莓森林',
          title: '第 1 關 / 共 4 關',
          bgImage: 'bgstage1-kp.jpg',
          enemyImage: 'enemyknight-kp.jpg',
          obstacleImage: null,
          dialogue:
            '【第一關：草莓森林】香甜的草莓森林裡，前方出現了揮舞著小寶劍的「盔甲騎士怪」！請問卡比該採取什麼行動？',
          options: [
            {
              text: '😮 大口吸入騎士怪！',
              hint: '吞入敵人獲取其超能力',
              hotkey: '1',
              action: () => handleStage1Option(0),
            },
            {
              text: '🎈 鼓起臉頰拍翅膀飛過去',
              hint: '保持普通型態飄空迴避',
              hotkey: '2',
              action: () => handleStage1Option(1),
            },
            {
              text: '🌀 滾動身體直接去撞劍！',
              hint: '肉身直接衝撞敵人的利刃',
              hotkey: '3',
              action: () => handleStage1Option(2),
            },
          ],
        };
      case 2:
        return {
          stageId: 2,
          stageName: '急流大瀑布',
          title: '第 2 關 / 共 4 關',
          bgImage: 'bgstage2-kp.jpg',
          enemyImage: 'enemypenguin-kp.jpg',
          obstacleImage: 'obstaclewaterfall-kp.jpg',
          dialogue:
            '【第二關：急流大瀑布】眼前是奔騰咆哮的大瀑布，岸邊還有一隻戴毛帽的「冰凍企鵝怪」正搖搖擺擺！該怎麼突破？',
          options: [
            {
              text: '🐧 吸入岸邊的冰凍企鵝！',
              hint: '吸收冰凍力量獲得冰雪王冠',
              hotkey: '1',
              action: () => handleStage2Option(0),
            },
            {
              text: '⚔️ 使出利劍「一刀劈開瀑布」！',
              hint: '需要持有利劍型態才能施展',
              hotkey: '2',
              action: () => handleStage2Option(1),
            },
            {
              text: '🏊 直接跳進急流游過去！',
              hint: '挑戰橫渡洶湧翻滾的急流',
              hotkey: '3',
              action: () => handleStage2Option(2),
            },
          ],
        };
      case 3:
        return {
          stageId: 3,
          stageName: '刺針地底城',
          title: '第 3 關 / 共 4 關',
          bgImage: 'bgstage3-kp.jpg',
          enemyImage: null,
          obstacleImage: 'obstaclespikes-kp.jpg',
          dialogue:
            '【第三關：刺針地底城】前方的泥土走道上插滿了閃閃發光的尖銳鐵刺針，地面完全過不去！你要怎麼運用現在的能力通過呢？',
          options: [
            {
              text: '❄️ 施展冰凍魔法：把刺針凍成冰塊！',
              hint: '需要冰凍型態施展絕對零度',
              hotkey: '1',
              action: () => handleStage3Option(0),
            },
            {
              text: '🎈 拍動小翅膀：頂著強風慢慢飛過去',
              hint: '只有輕盈的普通型態能抗風飛行',
              hotkey: '2',
              action: () => handleStage3Option(1),
            },
            {
              text: '🪨 跳上天空：變身堅硬巨石砸爛刺針！',
              hint: '需要堅硬的石頭型態下砸',
              hotkey: '3',
              action: () => handleStage3Option(2),
            },
          ],
        };
      case 4:
      default:
        return {
          stageId: 4,
          stageName: '點心城堡頂樓',
          title: '最終決戰！共 4 關',
          bgImage: 'bgboss-kp.jpg',
          enemyImage: 'bossbird-kp.jpg',
          obstacleImage: null,
          dialogue:
            '【終極決戰：點心城堡頂樓】大魔王「貪吃大胖鳥」正準備一口吃掉最後的國王草莓蛋糕！卡比必須使出關鍵反擊！',
          options: [
            {
              text: '🪨 跳到魔王頭頂使出「泰山壓頂」！',
              hint: '化作萬斤頑石砸暈魔王',
              hotkey: '1',
              action: () => handleStage4Option(0),
            },
            {
              text: '⭐ 吸入魔王吐出的星星再吐回去！',
              hint: '普通卡比的經典張嘴反彈絕招',
              hotkey: '2',
              action: () => handleStage4Option(1),
            },
            {
              text: '🤪 跑去跟大胖鳥搔癢裝熟！',
              hint: '毫無防備地靠近貪婪的魔王',
              hotkey: '3',
              action: () => handleStage4Option(2),
            },
          ],
        };
    }
  }, [stage, ability, handleStage1Option, handleStage2Option, handleStage3Option, handleStage4Option]);

  // Current options list
  const currentOptions = stageConfig.options;

  // Handle option click
  const handleSelectOption = useCallback(
    (index: number) => {
      if (isGameOver && !isVictory) return;
      if (currentOptions[index]) {
        currentOptions[index].action();
      }
    },
    [isGameOver, isVictory, currentOptions]
  );

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        setShowLeaderboard(false);
        setShowHelp(false);
        setShowScoreSubmit(false);
        return;
      }

      if (e.key === '1' || e.code === 'Numpad1') {
        e.preventDefault();
        setSelectedIndex(0);
        handleSelectOption(0);
      } else if (e.key === '2' || e.code === 'Numpad2') {
        e.preventDefault();
        setSelectedIndex(1);
        handleSelectOption(1);
      } else if (e.key === '3' || e.code === 'Numpad3') {
        e.preventDefault();
        setSelectedIndex(2);
        handleSelectOption(2);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((idx) => Math.max(0, idx - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((idx) => Math.min(currentOptions.length - 1, idx + 1));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isGameOver || isVictory) {
          resetGame();
        } else {
          handleSelectOption(selectedIndex);
        }
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleCollectStar();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        handleToggleBgm();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setShowLeaderboard((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentOptions,
    selectedIndex,
    handleSelectOption,
    handleCollectStar,
    handleToggleMute,
    handleToggleBgm,
    resetGame,
    isGameOver,
    isVictory,
  ]);

  // Score Submit handler
  const handleScoreSubmit = (playerName: string) => {
    const result = saveScore(
      playerName,
      health,
      starsCollected,
      stage,
      isVictory,
      elapsedTime,
      ability
    );
    setLeaderboardEntries(getLeaderboard());
    setHighlightId(result.entry.id);
    setShowScoreSubmit(false);
    setShowLeaderboard(true);
  };

  // Clear high scores
  const handleClearLeaderboard = () => {
    clearLeaderboard();
    setLeaderboardEntries(getLeaderboard());
  };

  return (
    <div className="min-h-screen bg-radial from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      
      {/* Main Game Container */}
      <div className="w-full max-w-4xl bg-white border-4 sm:border-6 border-pink-400 rounded-3xl shadow-[0_20px_50px_rgba(244,63,94,0.3)] overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Top HUD */}
        <GameHUD
          health={health}
          maxHealth={3}
          ability={ability}
          stage={stage}
          totalStages={4}
          score={score}
          starsCollected={starsCollected}
          isMuted={isMuted}
          isBgmActive={isBgmActive}
          onToggleMute={handleToggleMute}
          onToggleBgm={handleToggleBgm}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenHelp={() => setShowHelp(true)}
          onRestart={resetGame}
        />

        {/* Stage Graphic Screen */}
        <div className="p-3 sm:p-5 pb-0">
          <StageDisplay
            stage={stage}
            ability={ability}
            bgImage={stageConfig.bgImage}
            enemyImage={stageConfig.enemyImage}
            obstacleImage={stageConfig.obstacleImage}
            isHurt={isHurt}
            isVictory={isVictory}
            isGameOver={isGameOver}
            floatingStarVisible={floatingStarVisible}
            onCollectStar={handleCollectStar}
          />
        </div>

        {/* Narrative Dialogue Box */}
        <div className="mx-3 sm:mx-5 my-3 p-4 sm:p-4.5 rounded-2xl bg-pink-50/90 border-2 border-dashed border-pink-300 min-h-[85px] sm:min-h-[95px] flex items-center shadow-inner">
          <div className="text-slate-800 text-sm sm:text-base font-bold leading-relaxed tracking-wide">
            {dialogue}
          </div>
        </div>

        {/* Decision & Action Area */}
        <div className="p-3 sm:p-5 pt-0">
          <ActionControls
            options={stageConfig.options}
            selectedIndex={selectedIndex}
            isGameOver={isGameOver}
            isVictory={isVictory}
            onSelectOption={handleSelectOption}
            onRestart={resetGame}
          />
        </div>

      </div>

      {/* Floating Keyboard Quick Status Pill on Desktop */}
      <div className="hidden lg:flex items-center gap-3 mt-3 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xs text-xs font-semibold text-pink-900 border border-pink-200 shadow-xs">
        <span>⭐ 鍵盤按鍵：<strong>[1] [2] [3]</strong> 選擇</span>
        <span>•</span>
        <span><strong>[S]</strong> 吃星星</span>
        <span>•</span>
        <span><strong>[M]</strong> 靜音</span>
        <span>•</span>
        <span><strong>[B]</strong> 音樂</span>
        <span>•</span>
        <span><strong>[H]</strong> 排行榜</span>
        <span>•</span>
        <span><strong>[R]</strong> 重玩</span>
      </div>

      {/* Modals */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        entries={leaderboardEntries}
        currentHighlightId={highlightId}
        onClose={() => setShowLeaderboard(false)}
        onClear={handleClearLeaderboard}
      />

      <ScoreSubmitModal
        isOpen={showScoreSubmit}
        isVictory={isVictory}
        score={score}
        remainingHearts={health}
        starsCollected={starsCollected}
        clearTimeSeconds={elapsedTime}
        ability={ability}
        breakdown={scoreBreakdown}
        onSubmit={handleScoreSubmit}
        onSkip={() => setShowScoreSubmit(false)}
      />

      <SettingsModal
        isOpen={showHelp}
        isMuted={isMuted}
        isBgmActive={isBgmActive}
        volume={volume}
        onToggleMute={handleToggleMute}
        onToggleBgm={handleToggleBgm}
        onChangeVolume={handleChangeVolume}
        onClose={() => setShowHelp(false)}
      />

    </div>
  );
}
