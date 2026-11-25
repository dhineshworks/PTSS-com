import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { CandyButton } from '@/components/CandyButton';
import { useGameStore } from '@/store/gameStore';
import { soundEffects } from '@/utils/sound';
import confetti from 'canvas-confetti';
import { Star, Sparkles, ArrowRight, Home } from 'lucide-react';

interface LocationState {
  level: number;
  stars: number;
  coinsEarned: number;
  firstTryCount: number;
}

export const LevelCompleteScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {
    level: 1,
    stars: 3,
    coinsEarned: 10,
    firstTryCount: 5,
  };

  const { completeLevel, eggPower, soundEnabled } = useGameStore();

  useEffect(() => {
    // Record level completion in persistent store
    completeLevel(state.level, state.stars, state.coinsEarned);

    // Play celebration sound
    soundEffects.play('hatch', soundEnabled);

    // Grand confetti celebration!
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#3DDC84', '#FFD23F', '#FF7B54', '#7B4DFF', '#BDEBFF'],
      });
    } catch {
      // Safe fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-sky flex flex-col items-center justify-between p-4 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <AssetImage assetKey="bg-welcome" className="w-full h-full object-cover" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-cream px-4 py-1.5 rounded-full border-2 border-leaf/40 shadow-sm">
          <Sparkles className="w-5 h-5 text-sunshine" />
          <span className="font-heading text-base text-deep-teal font-bold">
            Level {state.level} Complete!
          </span>
        </div>
      </div>

      {/* Main Celebration Card */}
      <div className="relative z-10 cream-card max-w-md w-full p-6 sm:p-8 text-center border-4 border-leaf shadow-2xl my-auto animate-scale-up">
        {/* Professor Owl praising */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto -mt-16 mb-2 animate-bounce-gentle">
          <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain filter drop-shadow-xl" />
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl text-deep-teal mb-2">
          {state.stars === 3 ? 'Super Star Genius!' : 'Jungle Hero!'}
        </h1>
        <p className="font-body text-deep-teal/80 text-sm sm:text-base font-bold mb-6">
          You mastered Level {state.level}! Your egg is buzzing with happy math power!
        </p>

        {/* 3 Animated Stars */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          {[1, 2, 3].map((idx) => {
            const hasStar = idx <= state.stars;
            return (
              <div
                key={idx}
                className={`transform transition-all duration-500 ${
                  hasStar ? 'scale-110 animate-bounce' : 'scale-90 opacity-40'
                }`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-cream border-3 border-sunshine flex items-center justify-center shadow-candy-sm">
                  <Star
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${
                      hasStar
                        ? 'text-sunshine fill-sunshine filter drop-shadow'
                        : 'text-gray-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Rewards Earned Box */}
        <div className="grid grid-cols-2 gap-3 bg-white/80 p-4 rounded-3xl border-2 border-leaf/30 mb-6">
          {/* Coins Earned */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-deep-teal/70 font-bold">Coins Won</span>
            <div className="flex items-center gap-1.5 mt-1">
              <AssetImage assetKey="coin" className="w-7 h-7 object-contain" />
              <span className="font-heading text-2xl text-deep-teal font-extrabold">
                +{state.coinsEarned}
              </span>
            </div>
          </div>

          {/* Egg Power Added */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-deep-teal/70 font-bold">Egg Power</span>
            <div className="flex items-center gap-1.5 mt-1">
              <AssetImage assetKey="egg-0" className="w-7 h-7 object-contain" />
              <span className="font-heading text-2xl text-berry font-extrabold">
                {eggPower}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <CandyButton
            variant="green"
            onClick={() => navigate('/map')}
            className="w-full text-xl py-4 shadow-candy"
          >
            <span className="flex items-center justify-center gap-2">
              Next Adventure
              <ArrowRight className="w-6 h-6" />
            </span>
          </CandyButton>

          <button
            onClick={() => navigate('/home')}
            className="w-full py-3 bg-cream/90 hover:bg-cream border-2 border-leaf/30 text-deep-teal font-heading rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xs"
          >
            <Home className="w-4 h-4 text-leaf" />
            Back to Jungle Island
          </button>
        </div>
      </div>

      {/* Footer message */}
      <div className="relative z-10 pb-4 text-center">
        <span className="text-xs text-deep-teal/60 font-bold">
          Tip: Visit your egg nest to see if it’s ready to hatch! 🥚
        </span>
      </div>
    </div>
  );
};
