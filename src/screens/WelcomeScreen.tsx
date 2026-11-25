import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { CandyButton } from '@/components/CandyButton';
import { useGameStore } from '@/store/gameStore';
import { Sparkles, Compass } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentLevel = useGameStore((s) => s.currentLevel);
  const hasSeenIntro = useGameStore((s) => s.hasSeenIntro);

  const handleStart = () => {
    if (!hasSeenIntro) {
      navigate('/how-to-play');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-sky flex flex-col items-center justify-between p-4 overflow-hidden">
      {/* Layered Jungle Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AssetImage
          assetKey="bg-welcome"
          className="w-full h-full object-cover opacity-85"
          alt="Jungle background"
        />
        {/* Decorative Sun Glow */}
        <div className="absolute top-6 right-6 w-32 h-32 md:w-48 md:h-48 rounded-full bg-sunshine/40 blur-2xl pointer-events-none" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 pt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-cream/90 px-4 py-2 rounded-full border-2 border-leaf-green/40 shadow-sm">
          <Sparkles className="w-5 h-5 text-sunshine" />
          <span className="font-heading text-sm md:text-base text-deep-teal font-bold uppercase tracking-wider">
            Sunny Jungle Math Adventure
          </span>
        </div>
      </div>

      {/* Main Mascot & Hero Title */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto my-auto">
        {/* Animated Professor Owl */}
        <div className="relative mb-2 group">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-bounce-gentle transition-transform duration-300 hover:scale-105">
            <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain filter drop-shadow-2xl" />
          </div>
          <div className="absolute -bottom-2 bg-sunshine text-deep-teal font-heading text-sm md:text-base px-4 py-1 rounded-full border-2 border-sunshine/80 shadow-md">
            Professor Owl
          </div>
        </div>

        {/* Big Rounded Title */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-teal drop-shadow-md tracking-wide mt-2">
          Numling Jungle
        </h1>
        <p className="font-body text-lg sm:text-xl text-deep-teal/80 mt-2 font-bold px-4 max-w-sm">
          Count, add, and hatch magical jungle creatures!
        </p>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm pb-8 flex flex-col items-center gap-3">
        <CandyButton
          variant="green"
          onClick={handleStart}
          className="w-full text-2xl py-5 shadow-candy-lg"
          sound="click"
          data-testid="welcome-start-btn"
        >
          <span className="flex items-center justify-center gap-3">
            <Compass className="w-7 h-7" />
            Let's Go!
          </span>
        </CandyButton>
        <span className="text-xs text-deep-teal/60 font-bold">
          Free kid-friendly math adventure • Ages 5-8
        </span>
      </div>
    </div>
  );
};
