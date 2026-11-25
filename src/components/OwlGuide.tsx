import React from 'react';
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion';
import { AssetImage } from './AssetImage';

export type OwlMood = 'idle' | 'talk' | 'cheer' | 'point' | 'sad';

export interface OwlGuideProps {
  message: string;
  mood: OwlMood;
  size?: 'sm' | 'md' | 'lg';
  bubblePosition?: 'top' | 'left' | 'right' | 'bottom';
  className?: string;
  showBubble?: boolean;
}

export const OwlGuide: React.FC<OwlGuideProps> = ({
  message,
  mood = 'idle',
  size = 'md',
  bubblePosition = 'top',
  className = '',
  showBubble = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Size styling for character
  const sizeConfig = {
    sm: {
      owl: 'w-16 h-16 sm:w-20 sm:h-20',
      bubbleText: 'text-xs sm:text-sm',
      bubblePadding: 'px-3 py-2',
      maxWidth: 'max-w-[200px] sm:max-w-[240px]',
    },
    md: {
      owl: 'w-24 h-24 sm:w-32 sm:h-32',
      bubbleText: 'text-sm sm:text-base',
      bubblePadding: 'px-4 py-3',
      maxWidth: 'max-w-[260px] sm:max-w-[320px]',
    },
    lg: {
      owl: 'w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56',
      bubbleText: 'text-base sm:text-lg md:text-xl',
      bubblePadding: 'px-5 py-4',
      maxWidth: 'max-w-[320px] sm:max-w-[420px]',
    },
  }[size];

  // Define Framer Motion animation variants according to specified moods
  const getOwlAnimation = (): { animate: any; transition?: Transition } => {
    if (shouldReduceMotion) {
      return {
        animate: { x: 0, y: 0, scale: 1, rotate: 0 },
        transition: { duration: 0.2 },
      };
    }

    switch (mood) {
      case 'idle':
        // Slow vertical bob loop (about 2s)
        return {
          animate: {
            y: [0, -10, 0],
            rotate: [0, 1, -1, 0],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

      case 'talk':
        // Small bob + slight rotate
        return {
          animate: {
            y: [0, -6, 0, -4, 0],
            rotate: [0, 2.5, -2.5, 1, 0],
          },
          transition: {
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

      case 'cheer':
        // Jump + scale pulse, then settle
        return {
          animate: {
            y: [0, -26, 0, -10, 0],
            scale: [1, 1.2, 0.95, 1.08, 1],
            rotate: [0, -4, 4, -2, 0],
          },
          transition: {
            duration: 0.85,
            ease: 'easeOut',
          },
        };

      case 'point':
        // Gentle sideways nudge toward the egg/answers
        return {
          animate: {
            x: [0, -14, 0, -8, 0],
            rotate: [0, -5, 0, -3, 0],
            scale: [1, 1.04, 1, 1.02, 1],
          },
          transition: {
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeInOut',
          },
        };

      case 'sad':
        // Slight droop + slow tilt, no loop
        return {
          animate: {
            y: 12,
            rotate: -7,
            scale: 0.94,
          },
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        };

      default:
        return {
          animate: { y: 0, x: 0, scale: 1, rotate: 0 },
        };
    }
  };

  const owlAnim = getOwlAnimation();

  // Layout orientation based on bubblePosition
  const containerFlex = {
    top: 'flex-col items-center',
    bottom: 'flex-col-reverse items-center',
    left: 'flex-row-reverse items-center',
    right: 'flex-row items-center',
  }[bubblePosition];

  // Speech bubble tail pointing toward the owl
  const renderBubbleTail = () => {
    switch (bubblePosition) {
      case 'top':
        return (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-leaf-green/20 rotate-45" />
        );
      case 'bottom':
        return (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-leaf-green/20 rotate-45" />
        );
      case 'left':
        return (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t-2 border-r-2 border-leaf-green/20 rotate-45" />
        );
      case 'right':
        return (
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b-2 border-l-2 border-leaf-green/20 rotate-45" />
        );
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120 }}
      className={`relative flex ${containerFlex} gap-2.5 sm:gap-3 select-none ${className}`}
      data-testid="owl-guide"
      data-mood={mood}
    >
      {/* Speech Bubble */}
      {showBubble && message && (
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.75, opacity: 0, y: bubblePosition === 'top' ? 8 : -8 }
            }
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.85, opacity: 0, transition: { duration: 0.12 } }
            }
            transition={{ type: 'spring', damping: 15, stiffness: 220 }}
            className={`relative z-20 bg-white rounded-[24px] shadow-candy border-2 border-leaf-green/30 text-deep-teal font-body font-extrabold ${sizeConfig.bubblePadding} ${sizeConfig.maxWidth} text-center`}
            data-testid="owl-bubble"
          >
            <p className={`${sizeConfig.bubbleText} leading-snug break-words`}>
              {message}
            </p>
            {renderBubbleTail()}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Animated Professor Owl Character */}
      <motion.div
        animate={owlAnim.animate}
        transition={owlAnim.transition}
        className={`relative ${sizeConfig.owl} flex-shrink-0 cursor-pointer`}
      >
        <AssetImage
          assetKey="mascot-owl"
          className="w-full h-full object-contain filter drop-shadow-xl"
          alt="Professor Owl"
        />

        {/* Small subtle cheer sparkles when cheering */}
        {mood === 'cheer' && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 1] }}
            transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute -top-3 -right-2 text-2xl pointer-events-none select-none"
          >
            ✨
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
