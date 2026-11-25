import React from 'react';
import { AssetImage } from './AssetImage';
import { PET_DEFINITIONS } from '@/data/pets';
import { WARDROBE_ITEMS, WardrobeItem } from '@/data/items';
import { useGameStore } from '@/store/gameStore';

interface PetPreviewProps {
  petType: string;
  petId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  equippedHat?: string;
  equippedAccessory?: string;
  colorTint?: string;
  showPlatform?: boolean;
  className?: string;
}

export const PetPreview: React.FC<PetPreviewProps> = ({
  petType,
  petId,
  size = 'md',
  equippedHat,
  equippedAccessory,
  colorTint,
  showPlatform = true,
  className = '',
}) => {
  const storeEquipped = useGameStore((s) => (petId ? s.equippedItems[petId] : undefined));

  const hatId = equippedHat !== undefined ? equippedHat : storeEquipped?.hat;
  const accessoryId = equippedAccessory !== undefined ? equippedAccessory : storeEquipped?.accessory;
  const activeColorTint = colorTint !== undefined ? colorTint : storeEquipped?.colorTint;

  const hatItem: WardrobeItem | null = hatId ? WARDROBE_ITEMS.find((i) => i.id === hatId) || null : null;
  const accessoryItem: WardrobeItem | null = accessoryId ? WARDROBE_ITEMS.find((i) => i.id === accessoryId) || null : null;

  const petDef = PET_DEFINITIONS[petType] || PET_DEFINITIONS.mango;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44',
    lg: 'w-60 h-60 sm:w-72 sm:h-72',
    xl: 'w-72 h-72 sm:w-88 sm:h-88',
  }[size];

  // Color tint filters for pet body
  const getColorTintFilter = (tint?: string): string => {
    switch (tint) {
      case 'blue':
        return 'hue-rotate(185deg) saturate(1.3) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      case 'pink':
        return 'hue-rotate(290deg) saturate(1.4) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      case 'green':
        return 'hue-rotate(95deg) saturate(1.3) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      case 'brown':
        return 'sepia(0.7) hue-rotate(345deg) saturate(1.2) brightness(0.9) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      case 'purple':
        return 'hue-rotate(235deg) saturate(1.4) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      case 'yellow':
        return 'hue-rotate(35deg) saturate(1.5) brightness(1.05) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      default:
        return 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
    }
  };

  // Specific accessory positioning rules
  const getAccessoryStyle = (item: WardrobeItem): React.CSSProperties => {
    switch (item.id) {
      case 'sunglasses':
        return {
          top: '26%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '52%',
          zIndex: 25,
        };
      case 'headphones':
        return {
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '68%',
          zIndex: 26,
        };
      case 'bowtie':
        return {
          top: '52%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '32%',
          zIndex: 22,
        };
      case 'scarf':
        return {
          top: '46%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48%',
          zIndex: 22,
        };
      case 'cape':
        return {
          top: '36%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '74%',
          zIndex: 15,
        };
      case 'medal':
        return {
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '34%',
          zIndex: 24,
        };
      default:
        return {
          top: '45%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          zIndex: 20,
        };
    }
  };

  // Specific hat positioning rules
  const getHatStyle = (item: WardrobeItem): React.CSSProperties => {
    switch (item.id) {
      case 'wizard-hat':
        return {
          top: '-18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '68%',
          zIndex: 30,
        };
      case 'hat-crown':
        return {
          top: '-8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48%',
          zIndex: 30,
        };
      case 'flower-crown':
        return {
          top: '-2%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '54%',
          zIndex: 30,
        };
      case 'hat-party':
        return {
          top: '-16%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '42%',
          zIndex: 30,
        };
      case 'hat-explorer':
        return {
          top: '-12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '62%',
          zIndex: 30,
        };
      default: // hat-straw
        return {
          top: '-22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '64%',
          zIndex: 30,
        };
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Creature Container */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        {/* The Numling Creature with custom color tint */}
        <AssetImage
          assetKey={petDef.assetKey}
          className="w-full h-full object-contain z-15 transition-all duration-300"
          style={{ filter: getColorTintFilter(activeColorTint) }}
          alt={petDef.defaultName}
        />

        {/* Monster Part: Wings / Ears */}
        {storeEquipped?.wings && (
          <div className="absolute pointer-events-none z-10 w-[78%] top-[18%] left-1/2 -translate-x-1/2 transition-all">
            <img src={`/assets/customize/${storeEquipped.wings}.png`} className="w-full h-auto object-contain filter drop-shadow-md" alt="Wings" />
          </div>
        )}

        {/* Monster Part: Horns / Tusks */}
        {storeEquipped?.horn && (
          <div className="absolute pointer-events-none z-25 w-[42%] -top-[14%] left-1/2 -translate-x-1/2 transition-all">
            <img src={`/assets/customize/${storeEquipped.horn}.png`} className="w-full h-auto object-contain filter drop-shadow-md" alt="Horn" />
          </div>
        )}

        {/* Monster Part: Hair / Tuft */}
        {storeEquipped?.hair && (
          <div className="absolute pointer-events-none z-28 w-[36%] -top-[6%] left-1/2 -translate-x-1/2 transition-all">
            <img src={`/assets/customize/${storeEquipped.hair}.png`} className="w-full h-auto object-contain filter drop-shadow-md" alt="Hair" />
          </div>
        )}

        {/* Monster Part: Eyes */}
        {storeEquipped?.eyes && (
          <div className="absolute pointer-events-none z-22 w-[44%] top-[27%] left-1/2 -translate-x-1/2 transition-all">
            <img src={`/assets/customize/${storeEquipped.eyes}.png`} className="w-full h-auto object-contain filter drop-shadow" alt="Eyes" />
          </div>
        )}

        {/* Monster Part: Mouth */}
        {storeEquipped?.mouth && (
          <div className="absolute pointer-events-none z-22 w-[32%] top-[46%] left-1/2 -translate-x-1/2 transition-all">
            <img src={`/assets/customize/${storeEquipped.mouth}.png`} className="w-full h-auto object-contain filter drop-shadow" alt="Mouth" />
          </div>
        )}

        {/* Monster Part: Tail */}
        {storeEquipped?.tail && (
          <div className="absolute pointer-events-none z-10 w-[34%] top-[42%] -right-[8%] transition-all">
            <img src={`/assets/customize/${storeEquipped.tail}.png`} className="w-full h-auto object-contain filter drop-shadow-md" alt="Tail" />
          </div>
        )}

        {/* Equipped Accessory */}
        {accessoryItem && (
          <div
            className="absolute pointer-events-none transition-all duration-200"
            style={getAccessoryStyle(accessoryItem)}
          >
            <AssetImage assetKey={accessoryItem.assetKey} className="w-full h-auto object-contain filter drop-shadow" />
          </div>
        )}

        {/* Equipped Hat */}
        {hatItem && (
          <div
            className="absolute pointer-events-none transition-all duration-200"
            style={getHatStyle(hatItem)}
          >
            <AssetImage assetKey={hatItem.assetKey} className="w-full h-auto object-contain filter drop-shadow-md" />
          </div>
        )}
      </div>

      {/* Wooden Platform / Nest */}
      {showPlatform && (
        <div className="w-3/4 -mt-6 z-0">
          <AssetImage assetKey="nest-base" className="w-full h-auto object-contain filter drop-shadow-md" />
        </div>
      )}
    </div>
  );
};
