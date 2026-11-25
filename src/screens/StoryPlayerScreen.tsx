import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { useGameStore } from '@/store/gameStore';
import storiesData from '@/data/stories.json';
import { StoryItem } from './StoriesScreen';
import { soundEffects } from '@/utils/sound';
import confetti from 'canvas-confetti';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Tv,
} from 'lucide-react';

export const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

export const StoryPlayerScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    coins,
    eggPower,
    watchedStoriesToday,
    watchStoryComplete,
    addCoins,
    soundEnabled,
  } = useGameStore();

  const story = (storiesData as StoryItem[]).find((s) => s.id === id);
  const youtubeId = story ? getYouTubeId(story.videoUrl) : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasFinishedNaturally, setHasFinishedNaturally] = useState<boolean>(false);
  const [rewardClaimed, setRewardClaimed] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  // Quiz state
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizShake, setQuizShake] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  // If story not found, return to /stories
  useEffect(() => {
    if (!story) {
      navigate('/stories', { replace: true });
    }
  }, [story, navigate]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasFinishedNaturally(true);

    if (!story) return;

    // Attempt to claim power reward (ONLY on full natural completion or watched)
    const wasRewarded = watchStoryComplete(story.id, story.powerReward);
    setRewardClaimed(wasRewarded);
    setShowCelebrationModal(true);

    // Audio & Confetti Celebration
    soundEffects.play('hatch', soundEnabled);
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7B4DFF', '#3DDC84', '#FFD23F', '#FF7B54'],
      });
    } catch {
      // Fallback
    }
  };

  // Expose global test hook for end-to-end automation
  useEffect(() => {
    (window as any).__triggerStoryEnd = () => {
      handleVideoEnded();
    };
    return () => {
      delete (window as any).__triggerStoryEnd;
    };
  });

  // YouTube IFrame API & postMessage Listener
  useEffect(() => {
    if (!youtubeId) return;

    // Listen to YouTube postMessage events
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const parsed = JSON.parse(event.data);
          // event.data info 0 is YT.PlayerState.ENDED
          if (parsed.event === 'onStateChange' && parsed.info === 0) {
            handleVideoEnded();
          }
        }
      } catch {
        // Ignored for non-JSON postMessages
      }
    };

    window.addEventListener('message', handleMessage);

    // Load YouTube API script if not present
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let ytPlayer: any = null;
    const initYT = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        try {
          ytPlayer = new (window as any).YT.Player('story-youtube-iframe', {
            events: {
              onStateChange: (event: any) => {
                if (event.data === 0) {
                  handleVideoEnded();
                }
              },
            },
          });
        } catch {
          // If already bound or cross-origin
        }
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initYT();
    } else {
      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initYT();
      };
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (ytPlayer && ytPlayer.destroy) {
        try {
          ytPlayer.destroy();
        } catch {}
      }
    };
  }, [youtubeId]);

  if (!story) {
    return null;
  }

  const isAlreadyWatchedToday = watchedStoriesToday.includes(story.id);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may need user gesture
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || story.durationSeconds);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (quizAnswered) return;

    setSelectedOptionIndex(optionIndex);

    if (story.quiz && optionIndex === story.quiz.correctIndex) {
      // Correct!
      setQuizSuccess(true);
      setQuizAnswered(true);
      addCoins(1);
      soundEffects.play('correct', soundEnabled);

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FFD23F', '#3DDC84'],
        });
      } catch {
        // Fallback
      }
    } else {
      // Gentle Try Again feedback (No penalty, kid friendly)
      soundEffects.play('wrong', soundEnabled);
      setQuizShake(true);
      setTimeout(() => setQuizShake(false), 600);
    }
  };

  const formatSeconds = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Bar with Exit X, Story Title, and Progress Pill */}
      <header className="relative z-30 w-full px-4 pt-4 pb-2 flex items-center justify-between gap-4">
        {/* Exit Button */}
        <button
          onClick={() => navigate('/stories')}
          className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border-2 border-white/20 flex items-center justify-center text-white transition-all min-h-[48px] min-w-[48px]"
          aria-label="Exit Story Cinema"
          data-testid="exit-story-btn"
        >
          <X className="w-7 h-7 stroke-[3]" />
        </button>

        {/* Story Title & Topic */}
        <div className="text-center truncate flex-1 px-2">
          <span className="text-[11px] uppercase tracking-wider font-heading text-berry font-extrabold bg-berry/20 px-2.5 py-0.5 rounded-full inline-block mb-0.5">
            {story.topic}
          </span>
          <h1 className="font-heading text-base sm:text-xl text-white truncate font-black">
            {story.title}
          </h1>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
            <AssetImage assetKey="coin" className="w-4 h-4 object-contain" />
            <span className="font-heading text-xs sm:text-sm text-sunshine font-extrabold">
              {coins}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
            <Zap className="w-4 h-4 fill-sunshine text-sunshine" />
            <span className="font-heading text-xs sm:text-sm text-white font-extrabold">
              {eggPower}%
            </span>
          </div>
        </div>
      </header>

      {/* Main Cinema Viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-4xl mx-auto">
        {youtubeId ? (
          /* YouTube Video Player for Kids */
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <iframe
                id="story-youtube-iframe"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                title={story.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                data-testid="story-youtube-player"
              />
            </div>

            {/* Kid-Friendly YouTube Action & Completion Bar */}
            {!showCelebrationModal && (
              <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                    <Tv className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading text-sm sm:text-base text-white font-extrabold">
                      Kids YouTube Math Story 🎬
                    </p>
                    <p className="font-body text-xs text-white/70">
                      Watch with Professor Owl to super-charge your mystery egg!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleVideoEnded}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-leaf hover:bg-leaf/90 active:scale-95 text-white font-heading text-sm sm:text-base font-black shadow-candy-sm flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[48px]"
                    data-testid="finish-youtube-story-btn"
                  >
                    <Zap className="w-5 h-5 fill-sunshine text-sunshine" />
                    <span>Finished Watching! (+20 Power)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Native HTML5 Video Player */
          <div className="relative w-full aspect-video bg-black/80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 flex items-center justify-center group">
            {/* Native Video Element */}
            <video
              ref={videoRef}
              src={story.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
              data-testid="story-video-player"
            />

            {/* Big Center Play/Pause Overlay (when paused or before start) */}
            {!isPlaying && !showCelebrationModal && (
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all cursor-pointer"
                aria-label="Play Video"
                data-testid="play-overlay-btn"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-berry hover:bg-berry/90 border-4 border-white text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 active:scale-95 transition-transform">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white translate-x-1" />
                </div>
              </button>
            )}

            {/* Bottom Player Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
              {/* Scrubber Progress Bar */}
              <div className="flex items-center gap-3 w-full">
                <span className="text-xs font-heading text-white/80 min-w-[36px]">
                  {formatSeconds(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 1}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-berry"
                  data-testid="video-scrubber"
                />
                <span className="text-xs font-heading text-white/80 min-w-[36px] text-right">
                  {formatSeconds(duration || story.durationSeconds)}
                </span>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white/80 hover:text-white"
                    aria-label="Replay"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white/80 hover:text-white"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-coral" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Reward status pill */}
                <div className="text-xs font-heading font-bold text-sunshine flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                  {isAlreadyWatchedToday ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-leaf" />
                      <span>Reward Collected Today</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-sunshine" />
                      <span>Watch full story for +20 Power</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Completion & Optional "Did You Learn?" Quiz Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="cream-card max-w-lg w-full p-6 sm:p-8 border-4 border-berry shadow-2xl space-y-6 text-deep-teal my-auto animate-bounce-short">
            {/* Top Celebration Header */}
            <div className="text-center space-y-2">
              <div className="text-5xl animate-bounce">🎉</div>
              <h2 className="font-heading text-2xl sm:text-3xl text-deep-teal">
                Story Completed!
              </h2>

              {rewardClaimed ? (
                <div className="bg-sunshine/30 border-2 border-sunshine p-3 rounded-2xl flex items-center justify-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <AssetImage assetKey="egg-0" className="w-full h-full object-contain filter drop-shadow" />
                  </div>
                  <div className="text-left">
                    <div className="font-heading text-lg font-black text-berry">
                      +20 Egg Power Charged! ⚡
                    </div>
                    <div className="text-xs text-deep-teal/80 font-bold">
                      Your mystery egg is glowing warmer!
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-deep-teal/75 font-bold">
                  Awesome watching! You already claimed today's egg power for this story.
                </p>
              )}
            </div>

            {/* Optional 1-Question "Did You Learn?" Quiz */}
            {story.quiz && (
              <div className="border-t-2 border-deep-teal/15 pt-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-heading font-black text-berry uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-berry fill-berry" />
                  Quick Super Brain Quiz (+1 Coin 🪙)
                </div>

                <p className="font-heading text-base sm:text-lg text-deep-teal">
                  {story.quiz.question}
                </p>

                <div className={`space-y-2 ${quizShake ? 'animate-shake' : ''}`}>
                  {story.quiz.options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    const isCorrect = idx === story.quiz?.correctIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizSuccess}
                        className={`w-full py-3 px-4 rounded-2xl font-heading text-sm sm:text-base text-left border-3 transition-all min-h-[56px] flex items-center justify-between shadow-xs ${
                          quizSuccess && isCorrect
                            ? 'bg-leaf text-white border-leaf shadow-candy-sm'
                            : isSelected && !isCorrect
                            ? 'bg-coral/20 border-coral text-deep-teal'
                            : 'bg-white hover:bg-cream border-deep-teal/20 active:translate-y-0.5'
                        }`}
                        data-testid={`quiz-option-${idx}`}
                      >
                        <span>{option}</span>
                        {quizSuccess && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-white stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Friendly Kid Feedback */}
                {quizShake && (
                  <div className="text-center font-heading text-sm text-coral font-bold animate-bounce">
                    Almost! Give it another try! 🦉
                  </div>
                )}

                {quizSuccess && (
                  <div className="bg-leaf/20 border border-leaf p-2.5 rounded-xl text-center font-heading text-sm text-deep-teal font-extrabold flex items-center justify-center gap-2">
                    <span>🎉 Correct! +1 Jungle Coin added! 🪙</span>
                  </div>
                )}
              </div>
            )}

            {/* Footer Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/nest')}
                className="w-full py-3.5 px-4 rounded-2xl bg-leaf hover:bg-leaf/90 text-white font-heading text-base sm:text-lg shadow-candy-sm active:translate-y-1 transition-all flex items-center justify-center gap-2"
                data-testid="see-egg-btn"
              >
                <span>See My Egg</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/stories')}
                className="w-full py-3.5 px-4 rounded-2xl bg-cream hover:bg-white border-2 border-deep-teal/30 text-deep-teal font-heading text-sm sm:text-base shadow-xs active:translate-y-1 transition-all"
                data-testid="more-stories-btn"
              >
                More Stories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
