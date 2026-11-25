import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { useGameStore } from '@/store/gameStore';
import { generateQuestionsForLevel, Question } from '@/data/questions';
import { soundEffects } from '@/utils/sound';
import confetti from 'canvas-confetti';
import { X, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { OwlGuide, OwlMood } from '@/components/OwlGuide';
import { motion, AnimatePresence } from 'framer-motion';

const CHEER_MESSAGES = [
  'Brilliant! ⭐',
  'You got it! 🎉',
  'Hoo-ray! 🦉',
  'Super math! 🌟',
];

export const PlayScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelParam = parseInt(searchParams.get('level') || '1', 10);
  const currentLevel = useGameStore((s) => s.currentLevel);
  const level = isNaN(levelParam) ? currentLevel : levelParam;

  const {
    coins,
    addCoins,
    addEggPower,
    eggPower,
    soundEnabled,
    recordAnswer,
  } = useGameStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);
  const [currentQuestionAttempts, setCurrentQuestionAttempts] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);

  // Live reaction state for OwlGuide
  const [owlMood, setOwlMood] = useState<OwlMood>('idle');
  const [owlMessage, setOwlMessage] = useState<string>('Count the fruits!');
  const [flyingCoin, setFlyingCoin] = useState<boolean>(false);

  // Initialize questions
  useEffect(() => {
    const list = generateQuestionsForLevel(level, 5);
    setQuestions(list);
    setCurrentIndex(0);
    setFirstTryCorrectCount(0);
    setCurrentQuestionAttempts(0);
    setFeedback(null);
    setOwlMood('idle');
    setOwlMessage('Count the fruits!');
    setFlyingCoin(false);
  }, [level]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (option: number | string) => {
    if (!currentQ || feedback === 'correct') return;

    setSelectedOption(option);
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      // Record stats
      recordAnswer(true);
      if (currentQuestionAttempts === 0) {
        setFirstTryCorrectCount((prev) => prev + 1);
      }

      // Celebratory feedback
      soundEffects.play('correct', soundEnabled);
      setFeedback('correct');
      setFeedbackMessage('Awesome job! +1 Coin 🪙');

      // Owl Cheer reaction & flying coin
      const randomCheer = CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
      setOwlMood('cheer');
      setOwlMessage(randomCheer);
      setFlyingCoin(true);

      // Add coin and egg power
      addCoins(1);
      addEggPower(4); // 5 questions * 4 = 20% egg power per level!

      // Kid-friendly confetti burst
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#3DDC84', '#FFD23F', '#FF7B54', '#7B4DFF'],
        });
      } catch {
        // Safe if canvas-confetti fails
      }

      // Transition to next question or complete level
      setTimeout(() => {
        setFlyingCoin(false);
        setOwlMood('idle');
        setOwlMessage('Count the fruits!');
        if (currentIndex + 1 >= questions.length) {
          // Finished level!
          const starsEarned =
            firstTryCorrectCount + (currentQuestionAttempts === 0 ? 1 : 0) >= 4
              ? 3
              : firstTryCorrectCount >= 2
              ? 2
              : 1;

          navigate('/level-complete', {
            state: {
              level,
              stars: starsEarned,
              coinsEarned: 5 + starsEarned * 2, // base 5 + bonus
              firstTryCount: firstTryCorrectCount + (currentQuestionAttempts === 0 ? 1 : 0),
            },
          });
        } else {
          setCurrentIndex((prev) => prev + 1);
          setCurrentQuestionAttempts(0);
          setFeedback(null);
          setSelectedOption(null);
        }
      }, 1000);
    } else {
      // Gentle wrong answer feedback
      recordAnswer(false);
      setCurrentQuestionAttempts((prev) => prev + 1);
      soundEffects.play('wrong', soundEnabled);
      setFeedback('wrong');
      setFeedbackMessage('Try again! You can count them! 🌿');

      // Owl sad reaction
      setOwlMood('sad');
      setOwlMessage('Try again, you can do it!');

      // Trigger soft shake
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setFeedback(null);
        setOwlMood('idle');
        setOwlMessage('Count the fruits!');
      }, 850);
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-sky flex items-center justify-center p-4">
        <div className="cream-card p-6 text-center">
          <p className="font-heading text-xl text-deep-teal">Loading Level {level}...</p>
        </div>
      </div>
    );
  }

  // Calculate checkpoints progress (0 to 5)
  const progressRatio = currentIndex / 5;

  return (
    <div className="min-h-screen bg-sky flex flex-col justify-between p-4 relative overflow-x-hidden">
      {/* Top Bar with X, Checkpoints Progress Bar & Egg Icon */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between gap-3 mb-4">
        {/* Exit Button */}
        <button
          onClick={() => navigate('/map')}
          className="w-12 h-12 rounded-2xl bg-cream border-2 border-coral/50 flex items-center justify-center text-coral shadow-[0_4px_0_rgba(255,123,84,0.3)] active:translate-y-1 min-h-[48px] min-w-[48px]"
          aria-label="Exit Level"
        >
          <X className="w-7 h-7 stroke-[3]" />
        </button>

        {/* Progress Bar with 3 checkpoints leading to egg icon */}
        <div className="flex-1 max-w-xs sm:max-w-md bg-cream/90 h-8 rounded-full border-2 border-leaf-green/50 p-1 relative flex items-center shadow-inner">
          {/* Filled bar */}
          <div
            className="h-full bg-gradient-to-r from-leaf-green via-sunshine to-leaf-green rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${Math.max(10, progressRatio * 100)}%` }}
          />

          {/* 3 Checkpoint Dots (at 20%, 50%, 80%) */}
          <div className="absolute inset-0 flex items-center justify-around px-4 pointer-events-none">
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                currentIndex >= 1 ? 'bg-leaf shadow-sm' : 'bg-gray-300'
              }`}
            />
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                currentIndex >= 3 ? 'bg-leaf shadow-sm' : 'bg-gray-300'
              }`}
            />
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                currentIndex >= 5 ? 'bg-leaf shadow-sm' : 'bg-gray-300'
              }`}
            />
          </div>

          {/* Goal Egg Icon at end of bar */}
          <div className="absolute -right-3 -top-2 w-11 h-11 filter drop-shadow animate-pulse">
            <AssetImage assetKey="egg-0" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Coin Counter */}
        <div className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-2xl border-2 border-sunshine/70 shadow-sm">
          <AssetImage assetKey="coin" className="w-6 h-6 object-contain" />
          <span className="font-heading text-base md:text-lg text-deep-teal font-bold min-w-[20px]">
            {coins}
          </span>
        </div>
      </header>

      {/* Main Centre Question Card */}
      <main className="flex-1 max-w-xl w-full mx-auto flex flex-col justify-center my-auto">
        <div
          data-testid="question-card"
          data-correct-answer={currentQ.correctAnswer}
          className={`cream-card p-6 md:p-8 text-center border-4 border-leaf/40 shadow-xl transition-transform ${
            shaking ? 'animate-soft-shake border-coral' : ''
          }`}
        >
          {/* Question Prompt */}
          <p className="font-body text-base sm:text-lg md:text-xl text-deep-teal/80 font-bold mb-3">
            {currentQ.prompt}
          </p>

          {/* Visual Counting Objects Box */}
          <div className="bg-white/80 rounded-3xl p-4 sm:p-6 mb-5 border-2 border-leaf/30 shadow-inner flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[100px]">
            {/* Group A Items */}
            {currentQ.itemsGroupA && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 bg-sunshine/20 px-3 py-2 rounded-2xl border border-sunshine/40">
                {Array.from({ length: currentQ.itemsGroupA.count }).map((_, idx) => (
                  <span
                    key={`a-${idx}`}
                    className="text-3xl sm:text-4xl animate-bounce-gentle select-none transform hover:scale-125 transition-transform"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {currentQ.itemsGroupA?.icon}
                  </span>
                ))}
              </div>
            )}

            {/* Operator Symbol (+ / - / vs / ×) */}
            <div className="w-10 h-10 rounded-full bg-cream border-2 border-leaf/60 flex items-center justify-center font-heading text-2xl text-deep-teal font-black shadow-xs">
              {currentQ.operatorSymbol}
            </div>

            {/* Group B Items */}
            {currentQ.itemsGroupB && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 bg-leaf/20 px-3 py-2 rounded-2xl border border-leaf/40">
                {Array.from({ length: currentQ.itemsGroupB.count }).map((_, idx) => (
                  <span
                    key={`b-${idx}`}
                    className="text-3xl sm:text-4xl animate-bounce-gentle select-none transform hover:scale-125 transition-transform"
                    style={{ animationDelay: `${(idx + 3) * 0.1}s` }}
                  >
                    {currentQ.itemsGroupB?.icon}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Big Number Sentence in Fredoka 700 */}
          <div className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-teal font-extrabold tracking-wider my-3">
            {currentQ.numberSentence}
          </div>

          {/* Cheerful Feedback Alert */}
          <div className="h-8 my-2 flex items-center justify-center">
            {feedback === 'correct' && (
              <div className="inline-flex items-center gap-2 bg-leaf text-white px-4 py-1 rounded-full font-heading text-base animate-bounce">
                <CheckCircle className="w-5 h-5" />
                {feedbackMessage}
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="inline-flex items-center gap-2 bg-coral text-white px-4 py-1 rounded-full font-heading text-base">
                <HelpCircle className="w-5 h-5" />
                {feedbackMessage}
              </div>
            )}
          </div>

          {/* 3 Big Answer Buttons */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectSelection = isSelected && feedback === 'correct';

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={feedback === 'correct'}
                  className={`candy-btn text-3xl sm:text-4xl md:text-5xl font-heading font-black py-5 sm:py-6 rounded-3xl min-h-[72px] sm:min-h-[88px] min-w-[72px] transition-all select-none ${
                    isCorrectSelection
                      ? 'candy-btn-green scale-105'
                      : idx === 0
                      ? 'candy-btn-yellow'
                      : idx === 1
                      ? 'candy-btn-coral'
                      : 'candy-btn-purple'
                  }`}
                  aria-label={`Answer option ${option}`}
                  data-testid={`answer-btn-${idx}`}
                  data-option={option}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Helpful Hint Footer */}
      <footer className="text-center py-2 pb-16 sm:pb-2">
        <p className="text-xs sm:text-sm text-deep-teal/60 font-bold">
          Level {level} • Question {currentIndex + 1} of 5
        </p>
      </footer>

      {/* Animated Flying Coin to TopBar (Frame 5 Reward Moment) */}
      <AnimatePresence>
        {flyingCoin && (
          <motion.div
            initial={{ scale: 0.6, x: '50vw', y: '50vh', opacity: 1 }}
            animate={{
              scale: [0.8, 1.4, 0.9],
              x: ['50vw', '52vw', 'calc(100vw - 75px)'],
              y: ['50vh', '40vh', '28px'],
              opacity: [1, 1, 0.9],
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-sunshine px-3 py-1.5 rounded-full border-2 border-white shadow-candy"
            data-testid="flying-coin"
          >
            <AssetImage assetKey="coin" className="w-6 h-6 object-contain" />
            <span className="font-heading text-sm font-black text-deep-teal">+1</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small Corner OwlGuide live reaction helper */}
      <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none max-w-[200px] sm:max-w-xs">
        <OwlGuide
          message={owlMessage}
          mood={owlMood}
          size="sm"
          bubblePosition="top"
        />
      </div>
    </div>
  );
};
