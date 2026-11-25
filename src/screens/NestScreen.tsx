import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { AssetImage } from '@/components/AssetImage';
import { CandyButton } from '@/components/CandyButton';
import { useGameStore } from '@/store/gameStore';
import { getRandomHatchedPet, PET_DEFINITIONS, PetDefinition } from '@/data/pets';
import { soundEffects } from '@/utils/sound';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Heart, ArrowRight, Play, BookOpen } from 'lucide-react';

export const NestScreen: React.FC = () => {
  const navigate = useNavigate();
  const { eggPower, addEggPower, hatchCurrentEgg, soundEnabled, pets } = useGameStore();

  // Hatching ceremony states
  const [hatchingStage, setHatchingStage] = useState<'idle' | 'cracking' | 'burst' | 'naming'>('idle');
  const [hatchedPetDef, setHatchedPetDef] = useState<PetDefinition | null>(null);
  const [petNameInput, setPetNameInput] = useState('');

  // Determine which egg stage image to show (0-24, 25-59, 60-99, 100)
  const eggAssetKey =
    eggPower >= 100
      ? 'egg-3'
      : eggPower >= 60
      ? 'egg-2'
      : eggPower >= 25
      ? 'egg-1'
      : 'egg-0';

  // Wobble animation intensity scales with power
  const wobbleClass =
    hatchingStage === 'cracking'
      ? 'animate-bounce scale-110'
      : eggPower >= 100
      ? 'animate-wobble-high scale-105'
      : eggPower >= 60
      ? 'animate-wobble-high'
      : eggPower >= 25
      ? 'animate-wobble-low'
      : 'animate-pulse';

  const startHatching = () => {
    if (eggPower < 100 || hatchingStage !== 'idle') return;

    const petDef = getRandomHatchedPet();
    setHatchedPetDef(petDef);
    setPetNameInput(petDef.defaultName);
    setHatchingStage('cracking');
    soundEffects.play('hatch', soundEnabled);

    // Step 1: Intense cracking shake (1.2s)
    setTimeout(() => {
      setHatchingStage('burst');

      // Sparkle burst & fanfare
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FFD23F', '#7B4DFF', '#3DDC84', '#FF7B54', '#FFF8E7'],
        });
      } catch {
        // Fallback
      }

      // Step 2: Show Naming Modal
      setTimeout(() => {
        setHatchingStage('naming');
      }, 1200);
    }, 1500);
  };

  const handleSavePetName = () => {
    if (!hatchedPetDef) return;
    const finalName = petNameInput.trim() || hatchedPetDef.defaultName;
    hatchCurrentEgg(finalName, hatchedPetDef.type);
    soundEffects.play('correct', soundEnabled);
    navigate('/my-numling');
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col justify-between relative overflow-hidden pb-8">
      <TopBar title="Egg Incubator Nest" showBack backTo="/home" />

      {/* Jungle Sanctuary Room Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <AssetImage assetKey="bg-nest-room" className="w-full h-full object-cover" />
      </div>

      <main className="relative z-10 flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col items-center justify-center">
        {/* Header Tagline */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-cream/90 px-4 py-1.5 rounded-full border-2 border-leaf/40 shadow-sm mb-1">
            <Sparkles className="w-4 h-4 text-sunshine fill-sunshine" />
            <span className="font-heading text-sm text-deep-teal font-bold">
              Warm Jungle Incubator
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-deep-teal">
            {eggPower >= 100
              ? '✨ The Egg is Ready to Hatch! ✨'
              : 'Charge Your Mystery Egg!'}
          </h2>
          <p className="text-xs sm:text-sm text-deep-teal/70 font-bold max-w-sm mx-auto">
            {eggPower >= 100
              ? 'Tap the glowing egg to see your new baby Numling pop out!'
              : 'Solve math levels and watch Super Brain stories to fill the power meter!'}
          </p>
        </div>

        {/* Central Nest & Egg Platform */}
        <div className="relative my-4 flex flex-col items-center justify-center">
          {/* Golden Glow Aura when power is high */}
          {eggPower >= 60 && (
            <div
              className={`absolute w-72 h-72 rounded-full ${
                eggPower >= 100 ? 'bg-sunshine/50 blur-3xl animate-pulse' : 'bg-sunshine/25 blur-2xl'
              } pointer-events-none`}
            />
          )}

          {/* Interactive Egg */}
          <div
            onClick={startHatching}
            className={`relative w-48 h-60 sm:w-56 sm:h-72 cursor-pointer select-none transition-transform duration-300 z-10 flex items-center justify-center ${wobbleClass}`}
            title={eggPower >= 100 ? 'Tap to Hatch!' : `Egg Power: ${eggPower}%`}
          >
            <AssetImage
              assetKey={hatchingStage === 'burst' ? 'egg-3' : eggAssetKey}
              className="w-full h-full object-contain filter drop-shadow-2xl"
              alt="Mystery Numling Egg"
            />

            {/* Tap to hatch pulse badge */}
            {eggPower >= 100 && hatchingStage === 'idle' && (
              <div className="absolute -top-3 bg-sunshine text-deep-teal font-heading text-sm px-4 py-1.5 rounded-full border-2 border-white shadow-candy-sm animate-bounce">
                🐣 TAP TO HATCH!
              </div>
            )}
          </div>

          {/* Wooden Platform / Nest Base */}
          <div className="w-64 sm:w-80 -mt-10 z-0">
            <AssetImage assetKey="nest-base" className="w-full h-auto object-contain filter drop-shadow-md" />
          </div>
        </div>

        {/* Power Bar (0-100%) */}
        <div className="w-full max-w-md cream-card p-4 sm:p-5 border-3 border-leaf/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-sunshine fill-sunshine" />
              <span className="font-heading text-base sm:text-lg text-deep-teal">Egg Power Meter</span>
            </div>
            <div className="font-heading text-lg sm:text-xl text-berry font-black">
              {eggPower}% / 100%
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full h-7 bg-white rounded-full border-2 border-leaf/40 p-1 relative shadow-inner overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sunshine via-leaf to-berry rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(6, eggPower)}%` }}
            />
          </div>

          {/* Status text */}
          <div className="text-center text-xs text-deep-teal/70 font-bold">
            {eggPower >= 100
              ? 'Power is full! Your Numling is tapping on the shell!'
              : eggPower >= 60
              ? 'Cracks are appearing! Almost ready to break out!'
              : eggPower >= 25
              ? 'The egg is starting to wobble and warm up!'
              : 'Keep playing math levels to charge up your egg!'}
          </div>

          {/* Action CTAs if not full */}
          {eggPower < 100 && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => navigate('/map')}
                className="py-2.5 px-3 bg-leaf/20 hover:bg-leaf/30 border-2 border-leaf text-deep-teal font-heading text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Play className="w-4 h-4 text-leaf fill-leaf" />
                Play Math (+20%)
              </button>
              <button
                onClick={() => navigate('/stories')}
                className="py-2.5 px-3 bg-berry/20 hover:bg-berry/30 border-2 border-berry text-deep-teal font-heading text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-berry fill-berry" />
                Stories (+20%)
              </button>
            </div>
          )}

          {eggPower >= 100 && (
            <CandyButton
              variant="green"
              onClick={startHatching}
              className="w-full py-4 text-xl"
            >
              🐣 Hatch My Numling Now!
            </CandyButton>
          )}
        </div>
      </main>

      {/* Hatching Burst / Naming Modal */}
      {hatchingStage === 'naming' && hatchedPetDef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="cream-card max-w-md w-full p-6 sm:p-8 text-center border-4 border-sunshine shadow-2xl relative animate-scale-up space-y-4">
            <div className="inline-flex items-center gap-2 bg-sunshine text-deep-teal px-4 py-1 rounded-full font-heading text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 fill-deep-teal" />
              NEW NUMLING HATCHED!
            </div>

            {/* Hatched Creature Display */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto animate-bounce-gentle">
              <AssetImage
                assetKey={hatchedPetDef.assetKey}
                className="w-full h-full object-contain filter drop-shadow-2xl"
                alt={hatchedPetDef.defaultName}
              />
            </div>

            <div>
              <div className="inline-block bg-berry text-white text-xs font-heading px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
                {hatchedPetDef.rarity} • {hatchedPetDef.species}
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl text-deep-teal">
                You got a {hatchedPetDef.defaultName}!
              </h3>
              <p className="text-xs sm:text-sm text-deep-teal/70 font-bold max-w-xs mx-auto mt-1">
                {hatchedPetDef.description}
              </p>
            </div>

            {/* Naming Input Box (Max 12 chars, large touch friendly) */}
            <div className="bg-white/80 p-4 rounded-3xl border-2 border-leaf/40 space-y-2">
              <label htmlFor="pet-name-input" className="block text-xs text-deep-teal/80 font-heading">
                Give your Numling a fun name (max 12 letters):
              </label>
              <input
                id="pet-name-input"
                type="text"
                maxLength={12}
                value={petNameInput}
                onChange={(e) => setPetNameInput(e.target.value)}
                placeholder="Name your pet..."
                className="w-full text-center font-heading text-2xl sm:text-3xl text-deep-teal bg-cream/60 border-2 border-leaf-green/60 rounded-2xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-leaf-green/30"
                autoFocus
              />
            </div>

            {/* Save Button */}
            <CandyButton
              id="save-pet-name-btn"
              data-testid="save-pet-name-btn"
              variant="green"
              onClick={handleSavePetName}
              className="w-full text-xl py-4 shadow-candy"
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 fill-white" />
                Save & Meet {petNameInput.trim() || hatchedPetDef.defaultName}!
              </span>
            </CandyButton>
          </div>
        </div>
      )}
    </div>
  );
};
