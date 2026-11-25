import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { AssetImage } from '@/components/AssetImage';
import { PetPreview } from '@/components/PetPreview';
import { CandyButton } from '@/components/CandyButton';
import { useGameStore } from '@/store/gameStore';
import { PET_DEFINITIONS } from '@/data/pets';
import { soundEffects } from '@/utils/sound';
import { Heart, Sparkles, Shirt, Edit3, Check, PlusCircle } from 'lucide-react';

export const MyNumlingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { pets, activePetId, setActivePet, renamePet, soundEnabled } = useGameStore();

  const [pettingHearts, setPettingHearts] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');

  // Active pet fallback
  const activePet = pets.find((p) => p.id === activePetId) || pets[0];
  const petDef = activePet ? PET_DEFINITIONS[activePet.type] : null;

  const handlePetNumling = () => {
    soundEffects.play('correct', soundEnabled);
    setPettingHearts(true);
    setTimeout(() => setPettingHearts(false), 1200);
  };

  const handleStartRename = () => {
    if (!activePet) return;
    setEditingPetId(activePet.id);
    setRenameText(activePet.name);
  };

  const handleSaveRename = () => {
    if (!editingPetId) return;
    if (renameText.trim()) {
      renamePet(editingPetId, renameText);
    }
    setEditingPetId(null);
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col justify-between pb-12">
      <TopBar title="My Numling Sanctuary" showBack backTo="/home" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 space-y-6">
        {/* Active Numling Hero Stage */}
        {activePet && petDef ? (
          <div className="cream-card p-6 text-center relative border-4 border-leaf/40 shadow-xl overflow-hidden">
            {/* Petting heart floaters */}
            {pettingHearts && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                <div className="animate-bounce text-5xl">💖 🥰 🌟</div>
              </div>
            )}

            {/* Top Species Tag & Rename */}
            <div className="flex items-center justify-between max-w-sm mx-auto mb-2">
              <span className="bg-berry/20 text-berry font-heading text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                {petDef.rarity} • {petDef.species}
              </span>
              <button
                onClick={handleStartRename}
                className="text-deep-teal/70 hover:text-deep-teal font-heading text-xs flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Rename
              </button>
            </div>

            {/* Pet Name */}
            {editingPetId === activePet.id ? (
              <div className="flex items-center justify-center gap-2 max-w-xs mx-auto my-1">
                <input
                  type="text"
                  maxLength={12}
                  value={renameText}
                  onChange={(e) => setRenameText(e.target.value)}
                  className="font-heading text-2xl text-deep-teal text-center bg-white border-2 border-leaf rounded-xl px-2 py-1 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveRename}
                  className="w-10 h-10 rounded-xl bg-leaf text-white flex items-center justify-center"
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <h2 className="font-heading text-3xl sm:text-4xl text-deep-teal">
                {activePet.name}
              </h2>
            )}

            <p className="text-xs sm:text-sm text-deep-teal/70 font-bold max-w-md mx-auto mb-4">
              {petDef.description}
            </p>

            {/* The Pet Display with Equipped Items */}
            <div
              onClick={handlePetNumling}
              className="cursor-pointer my-2 transform hover:scale-105 transition-transform"
              title="Click to Pet!"
            >
              <PetPreview
                petType={activePet.type}
                petId={activePet.id}
                size="lg"
                showPlatform={true}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 max-w-md mx-auto">
              <CandyButton
                variant="coral"
                onClick={() => navigate('/wardrobe')}
                className="flex-1 py-3 text-lg min-w-[160px]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Shirt className="w-5 h-5" />
                  Treehouse Wardrobe
                </span>
              </CandyButton>

              <button
                onClick={handlePetNumling}
                className="px-6 py-3 bg-sunshine text-deep-teal font-heading text-base rounded-2xl shadow-candy-sm active:translate-y-0.5 flex items-center gap-2"
              >
                <Heart className="w-5 h-5 text-coral fill-coral" />
                Pet {activePet.name}
              </button>
            </div>
          </div>
        ) : (
          /* Empty Sanctuary State */
          <div className="cream-card p-8 text-center border-4 border-sunshine shadow-xl space-y-4">
            <div className="w-36 h-36 mx-auto animate-bounce-gentle">
              <AssetImage assetKey="egg-0" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <h2 className="font-heading text-3xl text-deep-teal">No Numlings Hatched Yet!</h2>
            <p className="text-deep-teal/80 text-sm font-bold max-w-sm mx-auto">
              Your first mystery egg is waiting in the incubator nest! Charge it up with math power to hatch your very first buddy!
            </p>
            <CandyButton
              variant="green"
              onClick={() => navigate('/nest')}
              className="max-w-xs mx-auto text-xl py-4"
            >
              🥚 Go to Egg Nest
            </CandyButton>
          </div>
        )}

        {/* Collection Grid */}
        <div className="cream-card p-5 border-2 border-leaf/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sunshine fill-sunshine" />
              <h3 className="font-heading text-xl text-deep-teal">My Numling Collection</h3>
            </div>
            <span className="font-heading text-xs bg-leaf/20 text-deep-teal px-3 py-1 rounded-full">
              {pets.length} / 5 Hatched
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {/* Render all 5 possible pet types */}
            {Object.values(PET_DEFINITIONS).map((def) => {
              const hatchedInstances = pets.filter((p) => p.type === def.type);
              const isHatched = hatchedInstances.length > 0;
              const isActive = activePet?.type === def.type;

              return (
                <div
                  key={def.type}
                  onClick={() => {
                    if (isHatched) {
                      setActivePet(hatchedInstances[0].id);
                      soundEffects.play('click', soundEnabled);
                    } else {
                      navigate('/nest');
                    }
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                    isActive
                      ? 'bg-sunshine/30 border-sunshine ring-2 ring-sunshine scale-102 shadow-md'
                      : isHatched
                      ? 'bg-white/80 border-leaf/40 hover:border-leaf'
                      : 'bg-gray-100/60 border-dashed border-gray-300 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="w-20 h-20 relative flex items-center justify-center mb-1">
                    {isHatched ? (
                      <AssetImage
                        assetKey={def.assetKey}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl filter grayscale opacity-40">
                        ❓
                      </div>
                    )}
                  </div>

                  <span className="font-heading text-sm text-deep-teal truncate w-full">
                    {isHatched ? hatchedInstances[0].name : def.defaultName}
                  </span>

                  <span className="text-[10px] font-bold text-deep-teal/60">
                    {isHatched ? (isActive ? '⭐ ACTIVE' : 'Tap to Switch') : '🔒 Locked Egg'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hatch Another Egg CTA */}
          <div className="mt-4 pt-3 border-t border-leaf/20 flex items-center justify-between">
            <span className="text-xs font-heading text-deep-teal/70">
              Want more pets? Charge your incubator egg!
            </span>
            <button
              onClick={() => navigate('/nest')}
              className="text-xs font-heading text-berry hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              Visit Nest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
