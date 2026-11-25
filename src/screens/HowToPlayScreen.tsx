import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OwlGuide, OwlMood } from '@/components/OwlGuide';
import { CandyButton } from '@/components/CandyButton';
import { AssetImage } from '@/components/AssetImage';
import { useGameStore } from '@/store/gameStore';
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StepData {
  step: number;
  message: string;
  mood: OwlMood;
  title: string;
  buttonText: string;
  renderVisual: () => React.ReactNode;
}

export const HowToPlayScreen: React.FC = () => {
  const navigate = useNavigate();
  const setHasSeenIntro = useGameStore((s) => s.setHasSeenIntro);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: StepData[] = [
    {
      step: 1,
      message: "Hoo-hoo! I'm Professor Owl. Let's learn math together!",
      mood: 'cheer',
      title: 'Welcome to Numling Jungle!',
      buttonText: 'Next ➔',
      renderVisual: () => (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sunshine/20 to-cream rounded-3xl border-2 border-sunshine/40">
          <div className="w-32 h-32 sm:w-40 sm:h-40 animate-bounce-gentle">
            <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain filter drop-shadow-lg" />
          </div>
          <span className="mt-3 font-heading text-lg sm:text-xl text-deep-teal font-extrabold">
            Your Friendly Jungle Guide 🌴
          </span>
        </div>
      ),
    },
    {
      step: 2,
      message: 'Tap the right answer. Count the fruits!',
      mood: 'point',
      title: 'Count & Tap the Answers',
      buttonText: 'Next ➔',
      renderVisual: () => (
        <div className="flex flex-col items-center justify-center p-5 bg-white/90 rounded-3xl border-2 border-leaf-green/40 shadow-inner space-y-3">
          <div className="flex items-center justify-center gap-2 bg-cream px-4 py-2 rounded-2xl border border-sunshine/60">
            <span className="text-3xl select-none">🍌</span>
            <span className="text-3xl select-none">🍌</span>
            <span className="text-2xl font-heading font-black text-deep-teal mx-1">+</span>
            <span className="text-3xl select-none">🍌</span>
            <span className="text-2xl font-heading font-black text-deep-teal mx-1">=</span>
            <span className="text-3xl font-heading font-black text-leaf">?</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-sunshine text-deep-teal font-heading font-black text-xl flex items-center justify-center shadow-candy-sm opacity-70">
              2
            </div>
            <div className="w-14 h-14 rounded-2xl bg-leaf text-white font-heading font-black text-2xl flex items-center justify-center shadow-candy-sm ring-4 ring-sunshine scale-105">
              3
            </div>
            <div className="w-12 h-12 rounded-2xl bg-coral text-white font-heading font-black text-xl flex items-center justify-center shadow-candy-sm opacity-70">
              4
            </div>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      message: 'Every right answer gives you a Jungle Coin and Egg Power!',
      mood: 'talk',
      title: 'Earn Coins & Power Up',
      buttonText: 'Next ➔',
      renderVisual: () => (
        <div className="flex items-center justify-center gap-6 p-6 bg-gradient-to-r from-sunshine/20 via-cream to-leaf/20 rounded-3xl border-2 border-sunshine/50">
          <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <AssetImage assetKey="coin" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <span className="font-heading text-sm sm:text-base text-deep-teal font-black">
              +1 Jungle Coin 🪙
            </span>
          </div>
          <span className="text-3xl font-black text-deep-teal font-heading">+</span>
          <div className="flex flex-col items-center gap-2 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sunshine/30 rounded-full border-2 border-sunshine flex items-center justify-center shadow-md">
              <Zap className="w-10 h-10 text-sunshine fill-sunshine" />
            </div>
            <span className="font-heading text-sm sm:text-base text-berry font-black">
              +4% Egg Power ⚡
            </span>
          </div>
        </div>
      ),
    },
    {
      step: 4,
      message: 'Fill the egg to 100% and a Numling hatches!',
      mood: 'point',
      title: 'Hatch Baby Jungle Pets',
      buttonText: 'Next ➔',
      renderVisual: () => (
        <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-cream to-sky/20 rounded-3xl border-2 border-coral/30">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-20 animate-pulse">
              <AssetImage assetKey="egg-2" className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <ArrowRight className="w-6 h-6 text-coral animate-pulse" />
            <div className="w-20 h-20 animate-bounce-gentle">
              <AssetImage assetKey="pet-mango" className="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
          </div>
          <div className="mt-2 text-center font-heading text-xs sm:text-sm text-deep-teal font-extrabold">
            Name it and dress it in the wardrobe! 👒
          </div>
        </div>
      ),
    },
    {
      step: 5,
      message: 'Watch my Super Brain Stories for extra power. Ready?',
      mood: 'cheer',
      title: 'Super Brain Stories',
      buttonText: "Let's Go! 🚀",
      renderVisual: () => (
        <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-berry/15 to-cream rounded-3xl border-2 border-berry/30 space-y-2">
          <div className="text-4xl sm:text-5xl select-none">🎬 🥥 🦎</div>
          <div className="font-heading text-base sm:text-lg text-berry font-black">
            +20 Egg Power per Story 🌟
          </div>
          <p className="font-body text-xs sm:text-sm text-deep-teal/75 text-center font-bold max-w-xs">
            Learn with videos, answer fun quiz questions, and grow your streak!
          </p>
        </div>
      ),
    },
  ];

  const currentStep = steps[currentStepIndex];

  const handleFinishOrSkip = () => {
    setHasSeenIntro(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3DDC84', '#FFD23F', '#7B4DFF', '#FF7B54'],
      });
    } catch {
      // Safe fallback
    }
    navigate('/home');
  };

  const handleNext = () => {
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinishOrSkip();
    }
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden select-none">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sunshine/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-leaf/15 blur-3xl" />
      </div>

      {/* Top Header with Skip Link */}
      <header className="relative z-20 w-full max-w-xl mx-auto flex items-center justify-between pt-2">
        {/* Step progress pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-8 bg-leaf-green'
                  : idx < currentStepIndex
                  ? 'w-4 bg-leaf-green/60'
                  : 'w-2.5 bg-deep-teal/20'
              }`}
            />
          ))}
        </div>

        {/* Skip Button */}
        <button
          onClick={handleFinishOrSkip}
          className="text-xs sm:text-sm font-heading font-black text-deep-teal/70 hover:text-deep-teal px-3 py-1.5 rounded-full bg-cream/70 hover:bg-cream border border-deep-teal/20 transition-all cursor-pointer"
          data-testid="skip-intro-btn"
        >
          Skip Intro ➔
        </button>
      </header>

      {/* Main Interactive Guide Card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-xl w-full mx-auto my-3 sm:my-4">
        <div className="cream-card w-full p-5 sm:p-7 border-4 border-leaf-green/40 shadow-2xl flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Step Tag */}
          <div className="inline-flex items-center gap-1.5 bg-sunshine/40 text-deep-teal px-3 py-1 rounded-full text-xs font-heading font-black">
            <Sparkles className="w-3.5 h-3.5" />
            Step {currentStep.step} of 5
          </div>

          {/* Title */}
          <h2 className="font-heading text-2xl sm:text-3xl text-deep-teal">
            {currentStep.title}
          </h2>

          {/* Visual Demonstration for the Step */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                {currentStep.renderVisual()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Professor Owl with Dynamic Mood & Speech Bubble */}
          <div className="w-full flex justify-center pt-2">
            <OwlGuide
              message={currentStep.message}
              mood={currentStep.mood}
              size="md"
              bubblePosition="top"
            />
          </div>
        </div>
      </main>

      {/* Bottom Action Footer */}
      <footer className="relative z-20 w-full max-w-xl mx-auto pb-4 flex flex-col items-center gap-2">
        <CandyButton
          variant="green"
          onClick={handleNext}
          className="w-full py-4 text-xl sm:text-2xl shadow-candy-lg"
          sound="click"
          data-testid="intro-next-btn"
        >
          <span className="flex items-center justify-center gap-2">
            {currentStep.buttonText}
          </span>
        </CandyButton>
      </footer>
    </div>
  );
};
