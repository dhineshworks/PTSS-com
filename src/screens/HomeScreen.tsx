import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { AssetImage } from '@/components/AssetImage';
import { CandyButton } from '@/components/CandyButton';
import { useGameStore } from '@/store/gameStore';
import {
  MapPin,
  Sparkles,
  BookOpen,
  Lock,
  Heart,
  Calendar,
  CheckCircle2,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentLevel,
    streak,
    pets,
    isTodayLevelCompleted,
    isTodayStoryCompleted,
    isTodayMissionComplete,
    claimDailyMissionBonus,
    missionClaimedDate,
    getEffectiveDate,
  } = useGameStore();

  const levelDone = isTodayLevelCompleted();
  const storyDone = isTodayStoryCompleted();
  const missionDone = isTodayMissionComplete();
  const bonusClaimed = missionClaimedDate === getEffectiveDate();

  return (
    <div className="min-h-screen bg-sky flex flex-col pb-12">
      <TopBar title="Numling Jungle" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 space-y-6">
        {/* Welcome Mascot Banner */}
        <div className="cream-card p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cream via-cream to-sunshine/20">
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 animate-bounce-gentle">
            <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-2 bg-sunshine/60 px-3 py-1 rounded-full text-xs font-heading text-deep-teal">
              <Calendar className="w-3.5 h-3.5 text-deep-teal" />
              <span>Day {streak} Jungle Explorer Streak 🔥</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading text-deep-teal">
              Ready for Jungle Math?
            </h2>
            <p className="text-deep-teal/70 text-sm sm:text-base font-bold">
              Level {currentLevel} is waiting for you! Solve 5 math puzzles to charge your egg!
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <CandyButton
              variant="green"
              onClick={() => navigate('/map')}
              className="flex-1 sm:flex-initial px-6 py-3 text-lg"
            >
              Play Map 🗺️
            </CandyButton>
            <CandyButton
              variant="yellow"
              onClick={() => navigate('/how-to-play')}
              className="px-4 py-3 text-lg font-black min-w-[48px]"
              aria-label="How to play guide"
              title="How to Play"
              data-testid="how-to-play-help-btn"
            >
              ?
            </CandyButton>
          </div>
        </div>

        {/* Today's Mission Checklist */}
        <div className="cream-card p-4 md:p-5 border-2 border-sunshine bg-white/70">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sunshine fill-sunshine" />
              <h3 className="font-heading text-lg md:text-xl text-deep-teal">Today's Jungle Mission</h3>
            </div>
            <div className="text-xs font-heading bg-sunshine/50 px-2.5 py-1 rounded-full text-deep-teal">
              Bonus: +10 Coins 🪙
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Mission Task 1: Play Level */}
            <div
              onClick={() => navigate('/map')}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                levelDone
                  ? 'bg-leaf/20 border-leaf text-deep-teal'
                  : 'bg-cream border-leaf/30 hover:border-leaf'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {levelDone ? (
                  <CheckCircle2 className="w-6 h-6 text-leaf fill-leaf/20" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-leaf/60 flex items-center justify-center font-heading text-xs">
                    1
                  </div>
                )}
                <div>
                  <div className="font-heading text-sm sm:text-base">Play 1 Math Level</div>
                  <div className="text-xs text-deep-teal/60">
                    {levelDone ? 'Completed today! ⭐' : 'Solve 5 quick puzzles'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-heading text-leaf">
                {levelDone ? 'Done' : 'Start'}
              </span>
            </div>

            {/* Mission Task 2: Watch Story */}
            <div
              onClick={() => navigate('/stories')}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                storyDone
                  ? 'bg-leaf/20 border-leaf text-deep-teal'
                  : 'bg-cream border-berry/30 hover:border-berry'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {storyDone ? (
                  <CheckCircle2 className="w-6 h-6 text-leaf fill-leaf/20" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-berry/60 flex items-center justify-center font-heading text-xs">
                    2
                  </div>
                )}
                <div>
                  <div className="font-heading text-sm sm:text-base">Super Brain Story</div>
                  <div className="text-xs text-deep-teal/60">
                    {storyDone ? 'Story watched! 🦉' : 'Watch & charge egg'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-heading text-berry">
                {storyDone ? 'Done' : 'Watch'}
              </span>
            </div>
          </div>

          {missionDone && !bonusClaimed && (
            <button
              onClick={() => claimDailyMissionBonus()}
              className="w-full mt-3 py-2.5 bg-sunshine text-deep-teal font-heading rounded-xl shadow-candy-sm animate-pulse text-center"
            >
              🎉 Claim +10 Bonus Jungle Coins!
            </button>
          )}
        </div>

        {/* Adventure Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 1. Math Adventure (Active) */}
          <div
            onClick={() => navigate('/map')}
            className="cream-card p-5 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-200 border-3 border-leaf flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-leaf/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-leaf" />
              </div>
              <div className="inline-block bg-leaf text-white font-heading text-xs px-2.5 py-0.5 rounded-full mb-1">
                Active Adventure
              </div>
              <h3 className="font-heading text-2xl text-deep-teal">Math Trail</h3>
              <p className="text-deep-teal/70 text-sm mt-1">
                Explore the winding jungle trail, count tropical fruits, and unlock levels 1-20!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-leaf/20 flex items-center justify-between text-leaf font-heading">
              <span>Open Map</span>
              <span className="text-xl">➔</span>
            </div>
          </div>

          {/* 2. My Numling */}
          <div
            onClick={() => navigate('/my-numling')}
            className="cream-card p-5 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-200 border-3 border-coral flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-coral" />
              </div>
              <div className="inline-block bg-coral text-white font-heading text-xs px-2.5 py-0.5 rounded-full mb-1">
                Pet Sanctuary
              </div>
              <h3 className="font-heading text-2xl text-deep-teal">My Numling</h3>
              <p className="text-deep-teal/70 text-sm mt-1">
                Visit your hatched baby creatures, dress them up in the wardrobe, and see your collection!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-coral/20 flex items-center justify-between text-coral font-heading">
              <span>{pets.length > 0 ? `${pets.length} Numlings` : 'Visit Sanctuary'}</span>
              <span className="text-xl">➔</span>
            </div>
          </div>

          {/* 3. Super Brain Stories */}
          <div
            onClick={() => navigate('/stories')}
            className="cream-card p-5 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-200 border-3 border-berry flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-berry/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-berry" />
              </div>
              <div className="inline-block bg-berry text-white font-heading text-xs px-2.5 py-0.5 rounded-full mb-1">
                Story Cinema
              </div>
              <h3 className="font-heading text-2xl text-deep-teal">Super Brain Stories</h3>
              <p className="text-deep-teal/70 text-sm mt-1">
                Watch animated math stories with Professor Owl to super-charge your mystery egg!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-berry/20 flex items-center justify-between text-berry font-heading">
              <span>Watch Stories</span>
              <span className="text-xl">➔</span>
            </div>
          </div>

          {/* 4. Locked: English */}
          <div className="cream-card p-5 opacity-60 border-2 border-dashed border-deep-teal/30 flex flex-col justify-between cursor-not-allowed">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="font-heading text-xl text-deep-teal/70">Jungle English</h3>
              <p className="text-deep-teal/60 text-xs mt-1">
                Phonics, ABCs, and reading stories coming in future jungle islands!
              </p>
            </div>
            <span className="text-xs font-heading text-gray-500 mt-3">🔒 Locked</span>
          </div>

          {/* 5. Locked: Science */}
          <div className="cream-card p-5 opacity-60 border-2 border-dashed border-deep-teal/30 flex flex-col justify-between cursor-not-allowed">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="font-heading text-xl text-deep-teal/70">Jungle Science</h3>
              <p className="text-deep-teal/60 text-xs mt-1">
                Discover jungle weather, animals, plants, and habitats coming soon!
              </p>
            </div>
            <span className="text-xs font-heading text-gray-500 mt-3">🔒 Locked</span>
          </div>

          {/* 6. Egg Nest Quick Access */}
          <div
            onClick={() => navigate('/nest')}
            className="cream-card p-5 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-200 border-3 border-sunshine flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sunshine/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-sunshine" />
              </div>
              <div className="inline-block bg-sunshine text-deep-teal font-heading text-xs px-2.5 py-0.5 rounded-full mb-1">
                Incubator
              </div>
              <h3 className="font-heading text-2xl text-deep-teal">Egg Nest</h3>
              <p className="text-deep-teal/70 text-sm mt-1">
                Check how much power your mystery egg has and prepare for hatching!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sunshine/30 flex items-center justify-between text-deep-teal font-heading">
              <span>View Nest</span>
              <span className="text-xl">➔</span>
            </div>
          </div>
        </div>

        {/* Parent Zone Footer Link */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={() => navigate('/parent')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cream/70 hover:bg-cream border border-deep-teal/20 text-xs md:text-sm font-heading text-deep-teal/80 transition-colors"
          >
            <Shield className="w-4 h-4 text-deep-teal/70" />
            Parents Zone & Progress Report 🔒
          </button>
        </div>
      </main>
    </div>
  );
};
