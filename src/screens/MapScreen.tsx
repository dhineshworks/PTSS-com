import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { AssetImage } from '@/components/AssetImage';
import { useGameStore } from '@/store/gameStore';
import { Star, Lock, Sparkles, Moon, X } from 'lucide-react';
import { soundEffects } from '@/utils/sound';

export const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentLevel,
    completedLevels,
    canPlayNewLevelToday,
    soundEnabled,
  } = useGameStore();

  const [dailyLockModalOpen, setDailyLockModalOpen] = useState(false);

  // Total nodes: 12 levels for Phase 1 (expandable to 20)
  const totalLevels = 12;
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

  const handleNodeClick = (levelNumber: number) => {
    soundEffects.play('click', soundEnabled);

    // If level is already completed: can replay anytime for stars/practice
    if (completedLevels[levelNumber]) {
      navigate(`/play?level=${levelNumber}`);
      return;
    }

    // If this is the current active level
    if (levelNumber === currentLevel) {
      if (canPlayNewLevelToday()) {
        navigate(`/play?level=${levelNumber}`);
      } else {
        // Daily rule lock!
        setDailyLockModalOpen(true);
      }
      return;
    }

    // Otherwise it's a future locked level
    // Do nothing or gentle notice
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col pb-16 relative">
      <TopBar title="Jungle Trail Map" showBack backTo="/home" />

      {/* Map Trail Container */}
      <div className="relative flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        {/* Trail Banner */}
        <div className="cream-card p-4 text-center mb-6 border-2 border-leaf/40 shadow-md">
          <h2 className="font-heading text-xl md:text-2xl text-deep-teal">
            🏝️ Sunny Jungle Island Trail
          </h2>
          <p className="text-xs md:text-sm text-deep-teal/70 font-bold">
            Tap your glowing platform to begin Level {currentLevel}!
          </p>
        </div>

        {/* Winding Trail with Nodes */}
        {(() => {
          const stepY = 155;
          const startY = 95;
          const totalHeight = startY + (totalLevels - 1) * stepY + 115;

          const getNodePos = (lvl: number) => {
            const i = lvl - 1;
            const x = 200 + Math.sin(i * 0.95) * 105;
            const y = startY + i * stepY;
            return { x, y };
          };

          const pathD = levels
            .map((lvl, idx) => {
              const { x, y } = getNodePos(lvl);
              if (idx === 0) return `M ${x} ${y}`;
              const prev = getNodePos(levels[idx - 1]);
              const midY = (prev.y + y) / 2;
              return `C ${prev.x} ${midY}, ${x} ${midY}, ${x} ${y}`;
            })
            .join(' ');

          return (
            <div
              className="relative w-full mx-auto"
              style={{ height: `${totalHeight}px` }}
            >
              {/* SVG Winding Sandy Path aligned to exact node centers */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 400 ${totalHeight}`}
                preserveAspectRatio="none"
              >
                <path
                  d={pathD}
                  stroke="#FFE27A"
                  strokeWidth="44"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={pathD}
                  stroke="#D4A000"
                  strokeWidth="6"
                  strokeDasharray="12 12"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Level Nodes positioned at exact (x, y) */}
              {levels.map((lvl) => {
                const { x, y } = getNodePos(lvl);
                const isCompleted = !!completedLevels[lvl];
                const isCurrent = lvl === currentLevel;
                const isLocked = lvl > currentLevel;
                const stars = completedLevels[lvl]?.stars || 0;

                return (
                  <div
                    key={lvl}
                    className="absolute z-10 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(x / 400) * 100}%`,
                      top: `${y}px`,
                    }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Player Token on Current Node */}
                      {isCurrent && (
                        <div className="absolute -top-14 z-30 animate-bounce flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-sunshine border-2 border-white shadow-lg overflow-hidden flex items-center justify-center">
                            <AssetImage assetKey="mascot-owl" className="w-10 h-10 object-contain" />
                          </div>
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-sunshine" />
                        </div>
                      )}

                      {/* Node Platform Button */}
                      <button
                        onClick={() => handleNodeClick(lvl)}
                        disabled={isLocked}
                        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-200 select-none ${
                          isCurrent
                            ? 'ring-8 ring-sunshine ring-offset-4 ring-offset-sky animate-pulse scale-105 shadow-2xl'
                            : ''
                        } ${isLocked ? 'cursor-not-allowed opacity-90' : 'active:scale-95 cursor-pointer'}`}
                        aria-label={`Level ${lvl} ${isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Locked'}`}
                      >
                        {/* Node Image */}
                        {isCompleted ? (
                          <div className="relative w-full h-full">
                            <AssetImage assetKey="node-done" className="w-full h-full object-contain filter drop-shadow-md" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="font-heading text-2xl text-deep-teal font-extrabold mt-1">
                                {lvl}
                              </span>
                              {/* Stars */}
                              <div className="flex gap-0.5 -mt-1">
                                {[1, 2, 3].map((starIdx) => (
                                  <Star
                                    key={starIdx}
                                    className={`w-4 h-4 ${
                                      starIdx <= stars
                                        ? 'text-sunshine fill-sunshine'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : isCurrent ? (
                          <div className="relative w-full h-full">
                            <AssetImage assetKey="node-open" className="w-full h-full object-contain filter drop-shadow-xl" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="font-heading text-3xl text-deep-teal font-black">
                                {lvl}
                              </span>
                              <span className="text-[10px] font-heading bg-sunshine text-deep-teal px-2 py-0.5 rounded-full font-bold shadow-sm">
                                PLAY
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <AssetImage assetKey="node-locked" className="w-full h-full object-contain filter drop-shadow" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="font-heading text-xl text-gray-600 font-bold">
                                {lvl}
                              </span>
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Level Label / Difficulty Tag */}
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-cream/95 px-3 py-0.5 rounded-full border border-leaf/30 text-xs font-heading text-deep-teal shadow-xs whitespace-nowrap">
                        {lvl <= 4
                          ? 'Addition to 10'
                          : lvl <= 8
                          ? 'Subtraction to 10'
                          : 'Add & Sub to 20'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Daily Lock Modal: "Come back tomorrow!" */}
      {dailyLockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="cream-card max-w-sm w-full p-6 text-center relative border-4 border-sunshine shadow-2xl">
            <button
              onClick={() => setDailyLockModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream border-2 border-leaf/40 flex items-center justify-center text-deep-teal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-24 h-24 mx-auto mb-3 animate-bounce">
              <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-berry/20 text-berry px-3 py-1 rounded-full text-xs font-heading font-bold mb-2">
              <Moon className="w-4 h-4" />
              Daily Jungle Lesson Complete!
            </div>

            <h3 className="font-heading text-2xl text-deep-teal mb-2">
              Come back tomorrow!
            </h3>
            <p className="text-sm text-deep-teal/80 font-bold mb-5 leading-relaxed">
              Super work! Your brain grows stronger while resting. Watch Super Brain stories or visit your Numling while waiting for tomorrow's new level!
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setDailyLockModalOpen(false);
                  navigate('/nest');
                }}
                className="w-full py-3 bg-sunshine text-deep-teal font-heading rounded-2xl shadow-candy-sm text-base"
              >
                🥚 Check My Egg Nest
              </button>
              <button
                onClick={() => {
                  setDailyLockModalOpen(false);
                  navigate('/stories');
                }}
                className="w-full py-3 bg-berry text-white font-heading rounded-2xl shadow-candy-sm text-base"
              >
                🦉 Watch Brain Stories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
