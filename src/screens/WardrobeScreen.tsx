import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { PetPreview } from '@/components/PetPreview';
import { useGameStore } from '@/store/gameStore';
import { WARDROBE_ITEMS, WardrobeItem, ItemCategory } from '@/data/items';
import { soundEffects } from '@/utils/sound';
import confetti from 'canvas-confetti';
import {
  Check,
  Lock,
  ArrowLeft,
  Paintbrush,
  Shirt,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface PartCell {
  category: 'bucket' | 'brush' | 'hair' | 'ears' | 'eyes' | 'mouth' | 'tail' | 'horn';
  color: 'blue' | 'orange' | 'pink' | 'green' | 'brown';
  iconAsset: string;
  label: string;
}

const ROW_COLORS: Array<'blue' | 'orange' | 'pink' | 'green' | 'brown'> = [
  'blue',
  'orange',
  'pink',
  'green',
  'brown',
];

const COL_CATEGORIES: Array<PartCell['category']> = [
  'bucket',
  'brush',
  'hair',
  'ears',
  'eyes',
  'mouth',
  'tail',
  'horn',
];

export const WardrobeScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    coins,
    currentLevel,
    pets,
    activePetId,
    ownedItems,
    equippedItems,
    buyItem,
    equipItem,
    setPetColorTint,
    setMonsterPart,
    soundEnabled,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'parts' | 'wardrobe'>('parts');
  const [selectedWardrobeCategory, setSelectedWardrobeCategory] = useState<'all' | ItemCategory>('all');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warn' } | null>(null);
  const [petBounceKey, setPetBounceKey] = useState<number>(0);

  // Active pet fallback (if user has Woolzy or Mango, use it)
  const activePet =
    pets.find((p) => p.id === activePetId) ||
    pets[0] || {
      id: 'default-woolzy',
      name: 'Woolzy',
      type: 'woolzy',
      hatchedAt: '2026-01-01',
    };

  const currentEquipped = equippedItems[activePet.id] || {};

  const showToast = (text: string, type: 'success' | 'warn' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const triggerPetBounce = () => {
    setPetBounceKey((prev) => prev + 1);
  };

  const handleSelectPart = (category: PartCell['category'], color: PartCell['color']) => {
    soundEffects.play('click', soundEnabled);
    triggerPetBounce();

    if (category === 'bucket') {
      // Set main body color tint
      setPetColorTint(activePet.id, color);
      showToast(`Painted body ${color}! 🎨`, 'success');
      return;
    }

    if (category === 'brush') {
      // Toggle accent brush / belly glow
      const currentBrush = currentEquipped.brush;
      const newBrush = currentBrush === `brush-${color}` ? null : `brush-${color}`;
      setMonsterPart(activePet.id, 'brush', newBrush);
      showToast(`Applied ${color} brush accent! ✨`, 'success');
      return;
    }

    // Monster body parts
    const partKey = `part_${color}_${category}`;
    const storeField = category === 'ears' ? 'wings' : category; // map ears to wings in store
    const currentVal = (currentEquipped as Record<string, string | undefined>)[storeField];

    if (currentVal === partKey) {
      // Toggle unequip
      setMonsterPart(activePet.id, storeField, null);
      showToast(`Removed ${category}!`, 'success');
    } else {
      setMonsterPart(activePet.id, storeField, partKey);
      showToast(`Equipped ${color} ${category}! ✨`, 'success');
    }
  };

  const isCellEquipped = (category: PartCell['category'], color: PartCell['color']): boolean => {
    if (category === 'bucket') {
      return currentEquipped.colorTint === color;
    }
    if (category === 'brush') {
      return currentEquipped.brush === `brush-${color}`;
    }
    const partKey = `part_${color}_${category}`;
    const storeField = category === 'ears' ? 'wings' : category;
    return (currentEquipped as Record<string, string | undefined>)[storeField] === partKey;
  };

  const handleWardrobeItemClick = (item: WardrobeItem) => {
    if (currentLevel < item.requiredLevel) {
      soundEffects.play('wrong', soundEnabled);
      showToast(`🔒 Reach Level ${item.requiredLevel} to unlock!`, 'warn');
      return;
    }

    const isOwned = ownedItems.includes(item.id);
    if (isOwned) {
      const isCurrentlyEquipped =
        item.category === 'hat'
          ? currentEquipped.hat === item.id
          : currentEquipped.accessory === item.id;

      equipItem(activePet.id, item.category, isCurrentlyEquipped ? null : item.id);
      soundEffects.play('click', soundEnabled);
      triggerPetBounce();

      if (isCurrentlyEquipped) {
        showToast(`Took off ${item.name}!`, 'success');
      } else {
        showToast(`Wearing ${item.name}! ✨`, 'success');
      }
      return;
    }

    if (coins >= item.price) {
      const success = buyItem(item.id, item.price);
      if (success) {
        equipItem(activePet.id, item.category, item.id);
        soundEffects.play('buy', soundEnabled);
        triggerPetBounce();

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#FFD23F', '#3DDC84', '#FF7B54'],
          });
        } catch {
          // Fallback
        }

        showToast(`🎉 Bought and equipped ${item.name}!`, 'success');
      }
    } else {
      soundEffects.play('wrong', soundEnabled);
      const needed = item.price - coins;
      showToast(`Keep playing! Need ${needed} more coins 🪙`, 'warn');
    }
  };

  const handleSaveAndExit = () => {
    soundEffects.play('correct', soundEnabled);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: 0.85, y: 0.85 },
        colors: ['#18C314', '#FFD23F', '#3A86FF'],
      });
    } catch {
      // Fallback
    }
    setTimeout(() => {
      navigate('/my-numling');
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-[#5A2E1A] select-none">
      {/* 1. Authentic Barn Wooden Background Layer matching video */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AssetImage
          assetKey="bg-customize-barn"
          className="w-full h-full object-cover opacity-95"
          alt="Customize Barn"
        />
        {/* Soft radial ambient glow */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/30" />
      </div>

      {/* 2. Top Header - White Rounded Banner matching video: "Customize Woolzy" */}
      <header className="relative z-30 w-full px-4 pt-4 pb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={() => navigate('/my-numling')}
            className="w-12 h-12 rounded-full bg-white border-2 border-sky flex items-center justify-center text-[#1E6BFF] shadow-md hover:scale-105 active:scale-95 transition-all min-h-[48px] min-w-[48px]"
            aria-label="Back to Sanctuary"
            data-testid="back-button"
          >
            <ArrowLeft className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Curved Header Banner matching user's video: "Customize [Name]" */}
          <div className="bg-white px-8 sm:px-12 py-2 sm:py-2.5 rounded-full shadow-lg border-2 border-sky/40 flex items-center justify-center">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#1E6BFF] tracking-wide font-black">
              Customize {activePet.name}
            </h1>
          </div>

          {/* Currency Pill with 40 / coins counter */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-sky/40 shadow-md">
            <span className="font-heading text-lg sm:text-xl text-deep-teal font-extrabold min-w-[28px] text-right">
              {coins}
            </span>
            <AssetImage assetKey="coin" className="w-6 h-6 object-contain" />
          </div>
        </div>
      </header>

      {/* Mode Switcher Tabs */}
      <div className="relative z-20 max-w-sm mx-auto my-1 flex items-center gap-2 px-4">
        <button
          onClick={() => setActiveTab('parts')}
          className={`flex-1 py-1.5 px-3 rounded-full font-heading text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            activeTab === 'parts'
              ? 'bg-[#1E6BFF] text-white shadow-candy-sm font-black ring-2 ring-white'
              : 'bg-white/80 text-deep-teal/75 hover:bg-white'
          }`}
          data-testid="tab-monster-parts"
        >
          <Paintbrush className="w-4 h-4" />
          Monster Parts
        </button>
        <button
          onClick={() => setActiveTab('wardrobe')}
          className={`flex-1 py-1.5 px-3 rounded-full font-heading text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            activeTab === 'wardrobe'
              ? 'bg-[#1E6BFF] text-white shadow-candy-sm font-black ring-2 ring-white'
              : 'bg-white/80 text-deep-teal/75 hover:bg-white'
          }`}
          data-testid="tab-treehouse-outfits"
        >
          <Shirt className="w-4 h-4" />
          Treehouse Outfits
        </button>
      </div>

      {/* Friendly Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div
            className={`px-5 py-2.5 rounded-full font-heading text-sm md:text-base shadow-2xl flex items-center gap-2 border-2 ${
              toastMessage.type === 'success'
                ? 'bg-leaf text-white border-white'
                : 'bg-coral text-white border-white'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {toastMessage.text}
          </div>
        </div>
      )}

      {/* Main Customization Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 py-2 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
        {/* Left Side: The Pet Creature Standing Proudly on Wooden Floor */}
        <div className="w-full lg:w-4/12 flex flex-col items-center justify-center py-2">
          <div
            key={petBounceKey}
            className="relative flex flex-col items-center justify-center animate-bounce-short transition-transform"
          >
            {/* Live Pet Preview with Color Tint + Equipped Monster Parts + Equipped Hat/Accessory */}
            <PetPreview
              petType={activePet.type}
              petId={activePet.id}
              size="lg"
              showPlatform={false}
            />

            {/* Current Wearing summary pill */}
            <div className="mt-3 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-sky/80 shadow-md flex items-center gap-2 text-xs font-heading text-deep-teal">
              <span>Theme: <strong className="capitalize">{currentEquipped.colorTint || 'Blue'}</strong></span>
              <span>•</span>
              <span>Outfit: <strong>{currentEquipped.hat ? 'Customized' : 'Natural'}</strong></span>
            </div>
          </div>
        </div>

        {/* Center: The 5x8 Grid Card OR Treehouse Shop */}
        <div className="w-full lg:w-7/12 flex flex-col items-center relative">
          {/* Friendly Purple Monster Peer in the background on the right, exactly matching video! */}
          <div className="absolute -right-12 sm:-right-20 -top-8 sm:-top-12 w-32 sm:w-44 h-auto pointer-events-none opacity-90 z-0">
            <AssetImage
              assetKey="monster-helper"
              className="w-full h-auto object-contain filter drop-shadow-xl"
              alt="Purple Monster Friend"
            />
          </div>

          {/* TAB 1: EXACT 5x8 Grid of Colors and Monster Parts from D:\kids.mp4 */}
          {activeTab === 'parts' && (
            <div className="bg-white/95 backdrop-blur-md p-3 sm:p-5 rounded-[32px] border-4 border-sky/40 shadow-2xl w-full max-w-xl relative z-10">
              <div className="grid grid-rows-5 gap-2 sm:gap-2.5">
                {ROW_COLORS.map((rowColor) => (
                  <div key={rowColor} className="grid grid-cols-8 gap-1.5 sm:gap-2">
                    {COL_CATEGORIES.map((category) => {
                      const equipped = isCellEquipped(category, rowColor);
                      const iconSrc = `/assets/customize/part_${rowColor}_${category}.png`;

                      return (
                        <button
                          key={`${rowColor}-${category}`}
                          onClick={() => handleSelectPart(category, rowColor)}
                          className={`w-full aspect-square rounded-2xl flex items-center justify-center p-1.5 transition-all duration-150 select-none shadow-xs hover:scale-110 active:scale-95 ${
                            equipped
                              ? 'bg-[#FFEBA5] ring-4 ring-[#FFD23F] ring-offset-1 shadow-md scale-105'
                              : 'bg-[#D6EEFF] hover:bg-[#C2E5FF] hover:shadow-sm'
                          }`}
                          title={`${rowColor} ${category}`}
                          data-testid={`tile-${rowColor}-${category}`}
                        >
                          <img
                            src={iconSrc}
                            alt={`${rowColor} ${category}`}
                            className="w-full h-full object-contain filter drop-shadow-xs"
                            onError={(e) => {
                              // If image missing, fallback gracefully
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Friendly Hint */}
              <div className="text-center mt-3 text-xs font-heading text-deep-teal/70 font-bold">
                Tap any paint bucket, brush, or part to customize {activePet.name}! 🌟
              </div>
            </div>
          )}

          {/* TAB 2: Treehouse Wardrobe Shelves (12 Items with Coins & Level Locks) */}
          {activeTab === 'wardrobe' && (
            <div className="w-full max-w-xl flex flex-col relative z-10">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setSelectedWardrobeCategory('all')}
                  className={`px-3 py-1 rounded-xl font-heading text-xs sm:text-sm shadow-xs ${
                    selectedWardrobeCategory === 'all'
                      ? 'bg-sunshine text-deep-teal font-black border-2 border-sunshine'
                      : 'bg-white/80 text-deep-teal/70'
                  }`}
                >
                  All (12)
                </button>
                <button
                  onClick={() => setSelectedWardrobeCategory('hat')}
                  className={`px-3 py-1 rounded-xl font-heading text-xs sm:text-sm shadow-xs ${
                    selectedWardrobeCategory === 'hat'
                      ? 'bg-sunshine text-deep-teal font-black border-2 border-sunshine'
                      : 'bg-white/80 text-deep-teal/70'
                  }`}
                >
                  Hats (6) 👒
                </button>
                <button
                  onClick={() => setSelectedWardrobeCategory('accessory')}
                  className={`px-3 py-1 rounded-xl font-heading text-xs sm:text-sm shadow-xs ${
                    selectedWardrobeCategory === 'accessory'
                      ? 'bg-sunshine text-deep-teal font-black border-2 border-sunshine'
                      : 'bg-white/80 text-deep-teal/70'
                  }`}
                >
                  Accessories (6) 🎀
                </button>
              </div>

              {/* Wooden Shelf Container */}
              <div className="bg-[#8B5A2B]/95 backdrop-blur-md p-3 sm:p-4 rounded-[28px] border-4 border-[#5E3A18] shadow-2xl">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {WARDROBE_ITEMS.filter((item) =>
                    selectedWardrobeCategory === 'all' ? true : item.category === selectedWardrobeCategory
                  ).map((item) => {
                    const isLocked = currentLevel < item.requiredLevel;
                    const isOwned = ownedItems.includes(item.id);
                    const isEquipped =
                      item.category === 'hat'
                        ? currentEquipped.hat === item.id
                        : currentEquipped.accessory === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleWardrobeItemClick(item)}
                        className={`cream-card p-2 relative flex flex-col items-center justify-between cursor-pointer transition-all duration-150 select-none ${
                          isEquipped
                            ? 'ring-4 ring-sunshine border-leaf shadow-xl scale-102 bg-sunshine/20'
                            : isOwned
                            ? 'border-leaf hover:scale-102 hover:shadow-md'
                            : isLocked
                            ? 'opacity-70 grayscale hover:grayscale-0'
                            : 'border-sunshine hover:scale-102 hover:shadow-md'
                        }`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center my-0.5">
                          <AssetImage
                            assetKey={item.assetKey}
                            className="w-full h-full object-contain filter drop-shadow"
                          />
                        </div>

                        <span className="font-heading text-[11px] sm:text-xs text-deep-teal text-center font-bold truncate w-full">
                          {item.name}
                        </span>

                        <div className="mt-1 w-full flex items-center justify-center">
                          {isLocked ? (
                            <div className="flex items-center gap-1 bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[9px] font-heading font-bold shadow-xs">
                              <Lock className="w-3 h-3 text-gray-600" />
                              Lvl {item.requiredLevel}
                            </div>
                          ) : isEquipped ? (
                            <div className="bg-leaf text-white px-2 py-0.5 rounded text-[9px] font-heading font-black shadow-xs flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              EQUIPPED
                            </div>
                          ) : isOwned ? (
                            <div className="bg-sunshine text-deep-teal px-2 py-0.5 rounded text-[9px] font-heading font-bold shadow-xs">
                              WEAR
                            </div>
                          ) : (
                            <div className="bg-[#FFE27A] border border-[#D4A000] px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm text-deep-teal font-heading font-black text-xs">
                              <AssetImage assetKey="coin" className="w-3 h-3 object-contain" />
                              {item.price}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Huge Circular Green Check Button (Bottom Right) matching D:\kids.mp4 exactly */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        <button
          onClick={handleSaveAndExit}
          className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#18C314] hover:bg-[#15AF11] border-4 border-white text-white flex items-center justify-center shadow-[0_8px_0_#0E820B] active:translate-y-2 active:shadow-none transition-all p-3"
          aria-label="Save and Exit"
          title="Save and Exit"
          data-testid="save-customize-btn"
        >
          <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[4]" />
        </button>
      </div>
    </div>
  );
};
