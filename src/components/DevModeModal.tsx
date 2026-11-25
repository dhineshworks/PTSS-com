import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Wrench, X, Calendar, Lock, Unlock, Sparkles, Coins } from 'lucide-react';

interface DevModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevModeModal: React.FC<DevModeModalProps> = ({ isOpen, onClose }) => {
  const {
    devBypassDailyLock,
    devDateOverride,
    toggleDevBypass,
    setDevDateOverride,
    setCoins,
    setEggPower,
    unlockAllLevels,
    resetProgress,
    coins,
    eggPower,
    currentLevel,
    getEffectiveDate,
  } = useGameStore();

  const [customDate, setCustomDate] = useState(devDateOverride || '');

  if (!isOpen) return null;

  const handleNextDay = () => {
    const curr = new Date(getEffectiveDate());
    curr.setDate(curr.getDate() + 1);
    const nextStr = curr.toISOString().split('T')[0];
    setDevDateOverride(nextStr);
    setCustomDate(nextStr);
  };

  const handleResetDate = () => {
    setDevDateOverride(null);
    setCustomDate('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="cream-card w-full max-w-md p-6 relative border-4 border-coral shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-md active:scale-95"
          aria-label="Close Dev Tools"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-sunshine rounded-2xl">
            <Wrench className="w-7 h-7 text-deep-teal" />
          </div>
          <div>
            <h2 className="text-2xl font-heading text-deep-teal">Secret Dev Mode</h2>
            <p className="text-sm text-deep-teal/70 font-bold">Admin overrides & daily test tools</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Daily Lock Bypass */}
          <div className="bg-white/80 p-4 rounded-2xl border-2 border-leaf/40 flex items-center justify-between">
            <div>
              <div className="font-heading text-lg flex items-center gap-2">
                {devBypassDailyLock ? <Unlock className="w-5 h-5 text-leaf" /> : <Lock className="w-5 h-5 text-coral" />}
                Daily Lock Bypass
              </div>
              <p className="text-xs text-deep-teal/70">Play unlimited new levels today</p>
            </div>
            <button
              onClick={toggleDevBypass}
              className={`px-4 py-2 rounded-xl font-heading text-sm font-bold transition-colors ${
                devBypassDailyLock ? 'bg-leaf text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {devBypassDailyLock ? 'BYPASS ON' : 'LOCKED'}
            </button>
          </div>

          {/* Date Override */}
          <div className="bg-white/80 p-4 rounded-2xl border-2 border-leaf/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-berry" />
                Simulated Date:
              </span>
              <span className="font-mono text-sm bg-sunshine/40 px-2 py-1 rounded-lg">
                {getEffectiveDate()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNextDay}
                className="flex-1 py-2 bg-berry text-white rounded-xl text-sm font-heading hover:bg-berry/90 active:scale-95"
              >
                +1 Day (Tomorrow)
              </button>
              <button
                onClick={handleResetDate}
                className="px-3 py-2 bg-gray-200 text-deep-teal rounded-xl text-sm font-heading hover:bg-gray-300"
              >
                Reset Date
              </button>
            </div>
          </div>

          {/* Fast Resources */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCoins(coins + 50)}
              className="p-3 bg-sunshine/40 hover:bg-sunshine/70 rounded-2xl border-2 border-sunshine font-heading text-sm flex items-center justify-center gap-2"
            >
              <Coins className="w-5 h-5 text-deep-teal" />
              +50 Coins
            </button>
            <button
              onClick={() => setEggPower(100)}
              className="p-3 bg-berry/20 hover:bg-berry/30 rounded-2xl border-2 border-berry/50 font-heading text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-berry" />
              Fill Egg (100%)
            </button>
          </div>

          {/* Level unlocks */}
          <div className="flex gap-2">
            <button
              onClick={unlockAllLevels}
              className="flex-1 py-2.5 bg-leaf/20 hover:bg-leaf/30 border-2 border-leaf text-deep-teal rounded-xl text-sm font-heading"
            >
              Unlock Levels 1-20
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset all game progress to clean state?')) {
                  resetProgress();
                }
              }}
              className="px-4 py-2.5 bg-coral/20 hover:bg-coral/30 border-2 border-coral text-coral rounded-xl text-sm font-heading"
            >
              Full Reset
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-leaf text-white font-heading text-lg rounded-2xl shadow-md active:scale-98"
        >
          Return to Jungle
        </button>
      </div>
    </div>
  );
};
