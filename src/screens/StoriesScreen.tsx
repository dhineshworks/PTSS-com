import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { useGameStore } from '@/store/gameStore';
import storiesData from '@/data/stories.json';
import { soundEffects } from '@/utils/sound';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Zap,
  Clock,
  Sparkles,
} from 'lucide-react';

export interface StoryQuiz {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface StoryItem {
  id: string;
  title: string;
  topic: string;
  durationSeconds: number;
  powerReward: number;
  thumbnail: string;
  videoUrl: string;
  summary: string;
  quiz?: StoryQuiz;
}

export const StoriesScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    coins,
    eggPower,
    watchedStoriesToday,
    soundEnabled,
  } = useGameStore();

  const stories = storiesData as StoryItem[];

  const handleSelectStory = (storyId: string) => {
    soundEffects.play('click', soundEnabled);
    navigate(`/story/${storyId}`);
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col justify-between relative overflow-x-hidden pb-12 select-none">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-berry/10 blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-leaf/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-sunshine/10 blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-4 pt-4 pb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={() => navigate('/home')}
            className="w-12 h-12 rounded-2xl bg-cream border-2 border-berry flex items-center justify-center text-deep-teal shadow-candy-sm active:translate-y-1 transition-all min-h-[48px] min-w-[48px]"
            aria-label="Back to Home"
            data-testid="stories-back-btn"
          >
            <ArrowLeft className="w-6 h-6 text-berry" />
          </button>

          {/* Title Banner */}
          <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-berry/30 shadow-md">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl text-deep-teal flex items-center gap-2">
              <span className="text-berry">🎬</span> Super Brain Stories
            </h1>
          </div>

          {/* Right Status: Egg Power + Coins */}
          <div className="flex items-center gap-2">
            {/* Egg power pill */}
            <div
              onClick={() => navigate('/nest')}
              className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-full border-2 border-sunshine shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="View Mystery Egg"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <AssetImage assetKey="egg-0" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading text-xs sm:text-sm text-deep-teal font-extrabold">
                {eggPower}%
              </span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-full border-2 border-leaf shadow-xs">
              <AssetImage assetKey="coin" className="w-5 h-5 object-contain" />
              <span className="font-heading text-xs sm:text-sm text-deep-teal font-extrabold">
                {coins}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-4 space-y-6">
        {/* Professor Owl Host Banner */}
        <div className="cream-card p-4 sm:p-5 border-3 border-berry/40 shadow-xl flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cream via-white to-cream">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 animate-bounce-short">
            <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-berry/15 text-berry font-heading text-xs px-3 py-1 rounded-full font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Professor Owl's Cinema
            </div>
            <h2 className="font-heading text-xl sm:text-2xl text-deep-teal">
              Watch Stories & Super-Charge Your Mystery Egg!
            </h2>
            <p className="font-body text-deep-teal/75 text-xs sm:text-sm font-semibold max-w-2xl">
              Each story you complete charges your egg with{' '}
              <strong className="text-berry font-heading">+20 Power ⚡</strong>. Watch every day, answer fun questions, and hatch baby Numlings!
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stories.map((story, index) => {
            const isWatchedToday = watchedStoriesToday.includes(story.id);

            return (
              <div
                key={story.id}
                onClick={() => handleSelectStory(story.id)}
                className="cream-card overflow-hidden border-3 border-berry/30 hover:border-berry shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
                data-testid={`story-card-${story.id}`}
              >
                {/* Video Card Header / Thumbnail Stage */}
                <div className="relative aspect-video bg-gradient-to-br from-berry/20 via-sky/40 to-leaf/20 flex items-center justify-center overflow-hidden">
                  {/* Decorative Topic Icon / Thumbnail */}
                  <div className="text-6xl sm:text-7xl group-hover:scale-115 transition-transform duration-300">
                    {story.thumbnail}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/15 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-berry text-white flex items-center justify-center shadow-candy-sm group-hover:scale-110 active:scale-95 transition-transform">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-xs font-heading font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.durationSeconds}s
                  </div>

                  {/* Topic & YouTube Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-white/90 backdrop-blur-xs text-deep-teal text-[11px] font-heading font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      {story.topic}
                    </span>
                    {story.videoUrl.includes('youtube') && (
                      <span className="bg-red-600 text-white text-[10px] font-heading font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <span>▶</span> YouTube
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl text-deep-teal leading-snug group-hover:text-berry transition-colors">
                      {story.title}
                    </h3>
                    <p className="font-body text-deep-teal/70 text-xs sm:text-sm mt-1.5 line-clamp-2">
                      {story.summary}
                    </p>
                  </div>

                  {/* Reward Status & CTA Button */}
                  <div className="pt-2 border-t border-deep-teal/10 flex items-center justify-between gap-2">
                    {isWatchedToday ? (
                      <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-leaf bg-leaf/15 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-leaf" />
                        Watched Today!
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-heading font-black text-berry bg-berry/15 px-3 py-1 rounded-full">
                        <Zap className="w-3.5 h-3.5 fill-berry" />
                        +{story.powerReward} Egg Power
                      </div>
                    )}

                    <button
                      className="px-4 py-2 rounded-xl bg-berry text-white font-heading text-xs sm:text-sm shadow-candy-xs group-hover:shadow-candy-sm active:translate-y-0.5 transition-all flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
