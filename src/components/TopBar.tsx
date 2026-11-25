import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { AssetImage } from './AssetImage';
import { DevModeModal } from './DevModeModal';
import { Volume2, VolumeX, Home, Sparkles } from 'lucide-react';
import { PET_DEFINITIONS } from '@/data/pets';

interface TopBarProps {
  showBack?: boolean;
  backTo?: string;
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  showBack = false,
  backTo = '/home',
  title,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    coins,
    eggPower,
    soundEnabled,
    toggleSound,
    pets,
    activePetId,
    devBypassDailyLock,
    devDateOverride,
  } = useGameStore();

  const [devModalOpen, setDevModalOpen] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const activePet = pets.find((p) => p.id === activePetId) || pets[0];
  const petDef = activePet ? PET_DEFINITIONS[activePet.type] : null;

  // Secret Dev Mode: long press or 3 clicks
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setDevModalOpen(true);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const clickCount = useRef(0);
  const lastClickTime = useRef(0);
  const handleTitleClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current < 600) {
      clickCount.current += 1;
      if (clickCount.current >= 3) {
        setDevModalOpen(true);
        clickCount.current = 0;
      }
    } else {
      clickCount.current = 1;
    }
    lastClickTime.current = now;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 py-3 bg-sky/90 backdrop-blur-md border-b-2 border-leaf/20 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Navigation or Mascot */}
          <div className="flex items-center gap-2">
            {showBack ? (
              <button
                onClick={() => navigate(backTo)}
                className="w-12 h-12 rounded-2xl bg-cream border-2 border-leaf-green/50 flex items-center justify-center text-deep-teal shadow-[0_4px_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none min-h-[48px] min-w-[48px]"
                aria-label="Back"
              >
                <Home className="w-6 h-6 text-leaf-green" />
              </button>
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => navigate('/home')}
              >
                <div className="w-11 h-11 rounded-2xl bg-sunshine border-2 border-sunshine/80 flex items-center justify-center shadow-md overflow-hidden">
                  <AssetImage assetKey="mascot-owl" className="w-9 h-9 object-contain" />
                </div>
              </div>
            )}

            {/* Secret Dev Mode Title */}
            <div
              data-testid="dev-trigger"
              className="select-none cursor-pointer flex flex-col"
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={handleTitleClick}
              title="Long-press or triple-tap for Dev Tools"
            >
              <h1 className="font-heading text-xl md:text-2xl text-deep-teal tracking-wide leading-none">
                {title || 'Numling Jungle'}
              </h1>
              {(devBypassDailyLock || devDateOverride) && (
                <span className="text-[10px] bg-coral/20 text-coral font-bold px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                  DEV: {devBypassDailyLock ? 'UNLOCKED ' : ''}{devDateOverride ? `DATE:${devDateOverride}` : ''}
                </span>
              )}
            </div>
          </div>

          {/* Right: Currency & Stats & Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Egg Power Pill */}
            <button
              onClick={() => navigate('/nest')}
              className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-2xl border-2 border-berry/40 shadow-[0_3px_0_rgba(123,77,255,0.2)] active:translate-y-0.5"
              title="View Egg Nest"
            >
              <AssetImage
                assetKey={eggPower >= 100 ? 'egg-3' : eggPower >= 60 ? 'egg-2' : eggPower >= 25 ? 'egg-1' : 'egg-0'}
                className="w-6 h-6 object-contain"
              />
              <span className="font-heading text-sm md:text-base text-berry font-bold">
                {eggPower}%
              </span>
              {eggPower >= 100 && (
                <Sparkles className="w-4 h-4 text-sunshine fill-sunshine animate-bounce" />
              )}
            </button>

            {/* Coin Counter */}
            <div
              className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-2xl border-2 border-sunshine/60 shadow-[0_3px_0_rgba(255,210,63,0.3)]"
              title="Jungle Coins"
            >
              <AssetImage assetKey="coin" className="w-6 h-6 object-contain" />
              <span className="font-heading text-base md:text-lg text-deep-teal font-bold min-w-[24px]">
                {coins}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="w-10 h-10 rounded-2xl bg-cream border-2 border-leaf/40 flex items-center justify-center text-deep-teal shadow-[0_3px_0_rgba(0,0,0,0.1)] active:translate-y-0.5"
              aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-leaf" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Active Pet Avatar Button */}
            <button
              onClick={() => navigate('/my-numling')}
              className="w-11 h-11 rounded-2xl bg-sunshine/40 border-2 border-leaf/60 flex items-center justify-center overflow-hidden shadow-[0_3px_0_rgba(0,0,0,0.1)] active:translate-y-0.5"
              title="My Numling"
            >
              {petDef ? (
                <AssetImage assetKey={petDef.assetKey} className="w-9 h-9 object-contain" />
              ) : (
                <AssetImage assetKey="egg-0" className="w-8 h-8 object-contain" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dev Mode Modal */}
      <DevModeModal isOpen={devModalOpen} onClose={() => setDevModalOpen(false)} />
    </>
  );
};
