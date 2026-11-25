import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { HowToPlayScreen } from '@/screens/HowToPlayScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { MapScreen } from '@/screens/MapScreen';
import { PlayScreen } from '@/screens/PlayScreen';
import { LevelCompleteScreen } from '@/screens/LevelCompleteScreen';
import { NestScreen } from '@/screens/NestScreen';
import { MyNumlingScreen } from '@/screens/MyNumlingScreen';
import { WardrobeScreen } from '@/screens/WardrobeScreen';
import { StoriesScreen } from '@/screens/StoriesScreen';
import { StoryPlayerScreen } from '@/screens/StoryPlayerScreen';
import { NotFoundScreen } from '@/screens/NotFoundScreen';

// Placeholders for screens activated in Phases 3-5
const PhasePlaceholder: React.FC<{ phase: string; title: string; routeBack?: string }> = ({
  phase,
  title,
  routeBack = '/home',
}) => {
  return (
    <div className="min-h-screen bg-sky flex flex-col items-center justify-center p-4 text-center">
      <div className="cream-card max-w-md w-full p-8 border-4 border-berry shadow-2xl space-y-4">
        <h2 className="font-heading text-3xl text-deep-teal">{title}</h2>
        <div className="inline-block bg-berry text-white font-heading text-xs px-3 py-1 rounded-full">
          {phase} Feature
        </div>
        <p className="font-body text-deep-teal/70 font-bold">
          This area is part of {phase}. Hop back to the home island or map to continue math adventures!
        </p>
        <button
          onClick={() => (window.location.href = routeBack)}
          className="w-full py-3 bg-leaf text-white font-heading text-lg rounded-2xl shadow-candy-sm"
        >
          Back to Jungle Island
        </button>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/how-to-play" element={<HowToPlayScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/play" element={<PlayScreen />} />
          <Route path="/level-complete" element={<LevelCompleteScreen />} />
          <Route path="/nest" element={<NestScreen />} />
          <Route path="/my-numling" element={<MyNumlingScreen />} />
          <Route path="/wardrobe" element={<WardrobeScreen />} />

          {/* Super Brain Stories */}
          <Route path="/stories" element={<StoriesScreen />} />
          <Route path="/story/:id" element={<StoryPlayerScreen />} />

          {/* Placeholders for upcoming phases */}
          <Route
            path="/parent"
            element={<PhasePlaceholder phase="Phase 5" title="Parent Zone & Progress" />}
          />

          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
