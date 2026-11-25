import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { soundEffects } from '@/utils/sound';

interface CandyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'yellow' | 'coral' | 'purple';
  sound?: 'click' | 'correct' | 'buy' | 'hatch' | 'none';
  children: React.ReactNode;
  className?: string;
}

export const CandyButton: React.FC<CandyButtonProps> = ({
  variant = 'green',
  sound = 'click',
  children,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (sound !== 'none') {
      soundEffects.play(sound as 'click' | 'correct' | 'buy' | 'hatch', soundEnabled);
    }
    if (onClick) onClick(e);
  };

  const variantClass = {
    green: 'candy-btn-green',
    yellow: 'candy-btn-yellow',
    coral: 'candy-btn-coral',
    purple: 'candy-btn-purple',
  }[variant];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`candy-btn text-xl md:text-2xl px-6 py-4 select-none ${variantClass} ${
        disabled ? 'opacity-50 grayscale cursor-not-allowed transform-none shadow-none' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
