import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomHatchedPet } from '@/data/pets';

export interface PetInstance {
  id: string;
  name: string;
  type: string;
  hatchedAt: string;
}

export interface CompletedLevelInfo {
  stars: number;
  score: number;
  coinsEarned: number;
  completedAt: string;
}

export interface EquippedStyle {
  hat?: string;
  accessory?: string;
  colorTint?: string;
  expression?: string;
  hair?: string;
  wings?: string;
  eyes?: string;
  mouth?: string;
  tail?: string;
  horn?: string;
  brush?: string;
}

export interface GameState {
  // Currency & Progress
  coins: number;
  currentLevel: number;
  completedLevels: Record<number, CompletedLevelInfo>;
  eggPower: number; // 0 - 100
  lastPlayedDate: string | null;
  lastLevelCompletedDate: string | null;

  // Pets & Wardrobe
  pets: PetInstance[];
  activePetId: string | null;
  ownedItems: string[];
  equippedItems: Record<string, EquippedStyle>;

  // Stories & Missions
  watchedStoriesToday: string[];
  lastStoryWatchedDate: string | null;
  streak: number;
  missionClaimedDate: string | null;

  // Settings & Audio
  soundEnabled: boolean;

  // Stats for Parent View
  totalAnswersCorrect: number;
  totalAnswersAttempted: number;

  // Intro Guide
  hasSeenIntro: boolean;
  setHasSeenIntro: (seen: boolean) => void;

  // Hidden Dev Mode
  devModeUnlocked: boolean;
  devBypassDailyLock: boolean;
  devDateOverride: string | null;

  // Computed / Helper actions
  getEffectiveDate: () => string;
  canPlayNewLevelToday: () => boolean;
  isTodayLevelCompleted: () => boolean;
  isTodayStoryCompleted: () => boolean;
  isTodayMissionComplete: () => boolean;

  // Actions
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addEggPower: (amount: number) => number; // returns new power
  completeLevel: (levelId: number, stars: number, coinsEarned: number) => void;
  hatchCurrentEgg: (customName: string, petType?: string) => PetInstance;
  setActivePet: (petId: string) => void;
  renamePet: (petId: string, newName: string) => void;
  buyItem: (itemId: string, price: number) => boolean;
  equipItem: (petId: string, category: 'hat' | 'accessory', itemId: string | null) => void;
  setPetColorTint: (petId: string, color: string | null) => void;
  setPetExpression: (petId: string, expr: string | null) => void;
  setMonsterPart: (petId: string, partType: string, partKey: string | null) => void;
  watchStoryComplete: (storyId: string, powerReward: number) => boolean;
  recordAnswer: (isCorrect: boolean) => void;
  toggleSound: () => void;
  claimDailyMissionBonus: () => boolean;
  resetProgress: () => void;

  // Dev mode actions
  toggleDevMode: () => void;
  toggleDevBypass: () => void;
  setDevDateOverride: (date: string | null) => void;
  setCoins: (amount: number) => void;
  setEggPower: (amount: number) => void;
  unlockAllLevels: () => void;
}

function getSystemTodayDate(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 15, // Starting coins so kids can experience the fun right away
      currentLevel: 1,
      completedLevels: {},
      eggPower: 20, // Start with a little power to see the egg glowing
      lastPlayedDate: null,
      lastLevelCompletedDate: null,

      pets: [],
      activePetId: null,
      ownedItems: ['hat-straw', 'bowtie'],
      equippedItems: {},

      watchedStoriesToday: [],
      lastStoryWatchedDate: null,
      streak: 1,
      missionClaimedDate: null,

      soundEnabled: true,

      totalAnswersCorrect: 0,
      totalAnswersAttempted: 0,

      hasSeenIntro: false,
      setHasSeenIntro: (seen: boolean) => {
        set({ hasSeenIntro: seen });
      },

      devModeUnlocked: false,
      devBypassDailyLock: false,
      devDateOverride: null,

      getEffectiveDate: () => {
        const override = get().devDateOverride;
        if (override) return override;
        return getSystemTodayDate();
      },

      canPlayNewLevelToday: () => {
        const state = get();
        if (state.devBypassDailyLock) return true;
        const today = state.getEffectiveDate();
        return state.lastLevelCompletedDate !== today;
      },

      isTodayLevelCompleted: () => {
        const state = get();
        const today = state.getEffectiveDate();
        return state.lastLevelCompletedDate === today;
      },

      isTodayStoryCompleted: () => {
        const state = get();
        const today = state.getEffectiveDate();
        if (state.lastStoryWatchedDate !== today) return false;
        return state.watchedStoriesToday.length > 0;
      },

      isTodayMissionComplete: () => {
        const state = get();
        return state.isTodayLevelCompleted() && state.isTodayStoryCompleted();
      },

      addCoins: (amount: number) => {
        set((state) => ({ coins: state.coins + amount }));
      },

      spendCoins: (amount: number) => {
        const current = get().coins;
        if (current < amount) return false;
        set({ coins: current - amount });
        return true;
      },

      addEggPower: (amount: number) => {
        let newPower = 0;
        set((state) => {
          newPower = Math.min(100, Math.max(0, state.eggPower + amount));
          return { eggPower: newPower };
        });
        return newPower;
      },

      completeLevel: (levelId: number, stars: number, coinsEarned: number) => {
        const state = get();
        const today = state.getEffectiveDate();

        // Check if streak should be updated
        let newStreak = state.streak;
        if (state.lastPlayedDate) {
          const lastDate = new Date(state.lastPlayedDate);
          const currDate = new Date(today);
          const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        const nextLevel = Math.min(20, Math.max(state.currentLevel, levelId + 1));

        set((prev) => ({
          coins: prev.coins + coinsEarned,
          currentLevel: nextLevel,
          completedLevels: {
            ...prev.completedLevels,
            [levelId]: {
              stars: Math.max(stars, prev.completedLevels[levelId]?.stars || 0),
              score: 5,
              coinsEarned: (prev.completedLevels[levelId]?.coinsEarned || 0) + coinsEarned,
              completedAt: today,
            },
          },
          lastPlayedDate: today,
          lastLevelCompletedDate: today,
          streak: newStreak,
        }));
      },

      hatchCurrentEgg: (customName: string, petType?: string) => {
        const state = get();
        const petDef = petType ? { type: petType } : getRandomHatchedPet();
        const newPet: PetInstance = {
          id: `pet-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: customName.trim() || 'Buddy',
          type: petDef.type,
          hatchedAt: state.getEffectiveDate(),
        };

        set((prev) => ({
          pets: [...prev.pets, newPet],
          activePetId: newPet.id,
          eggPower: 0, // resets to 0 after hatching
        }));

        return newPet;
      },

      setActivePet: (petId: string) => {
        set({ activePetId: petId });
      },

      renamePet: (petId: string, newName: string) => {
        set((state) => ({
          pets: state.pets.map((p) =>
            p.id === petId ? { ...p, name: newName.trim().slice(0, 12) } : p
          ),
        }));
      },

      buyItem: (itemId: string, price: number) => {
        const state = get();
        if (state.ownedItems.includes(itemId)) return true;
        if (state.coins < price) return false;

        set({
          coins: state.coins - price,
          ownedItems: [...state.ownedItems, itemId],
        });
        return true;
      },

      equipItem: (petId: string, category: 'hat' | 'accessory', itemId: string | null) => {
        set((state) => {
          const current = state.equippedItems[petId] || {};
          const updated = {
            ...current,
            [category]: itemId === current[category] ? undefined : itemId || undefined,
          };
          return {
            equippedItems: {
              ...state.equippedItems,
              [petId]: updated,
            },
          };
        });
      },

      setPetColorTint: (petId: string, color: string | null) => {
        set((state) => {
          const current = state.equippedItems[petId] || {};
          return {
            equippedItems: {
              ...state.equippedItems,
              [petId]: {
                ...current,
                colorTint: color === current.colorTint ? undefined : color || undefined,
              },
            },
          };
        });
      },

      setPetExpression: (petId: string, expr: string | null) => {
        set((state) => {
          const current = state.equippedItems[petId] || {};
          return {
            equippedItems: {
              ...state.equippedItems,
              [petId]: {
                ...current,
                expression: expr === current.expression ? undefined : expr || undefined,
              },
            },
          };
        });
      },

      setMonsterPart: (petId: string, partType: string, partKey: string | null) => {
        set((state) => {
          const current = state.equippedItems[petId] || {};
          const currentVal = (current as Record<string, string | undefined>)[partType];
          return {
            equippedItems: {
              ...state.equippedItems,
              [petId]: {
                ...current,
                [partType]: partKey === currentVal ? undefined : partKey || undefined,
              },
            },
          };
        });
      },

      watchStoryComplete: (storyId: string, powerReward: number) => {
        const state = get();
        const today = state.getEffectiveDate();

        // Check if daily reset is needed
        let watched = state.watchedStoriesToday;
        if (state.lastStoryWatchedDate !== today) {
          watched = [];
        }

        // Each story gives power once per day
        if (watched.includes(storyId)) {
          return false;
        }

        const newWatched = [...watched, storyId];
        const newPower = Math.min(100, state.eggPower + powerReward);

        set({
          watchedStoriesToday: newWatched,
          lastStoryWatchedDate: today,
          eggPower: newPower,
          lastPlayedDate: today,
        });

        return true;
      },

      recordAnswer: (isCorrect: boolean) => {
        set((state) => ({
          totalAnswersAttempted: state.totalAnswersAttempted + 1,
          totalAnswersCorrect: isCorrect
            ? state.totalAnswersCorrect + 1
            : state.totalAnswersCorrect,
        }));
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      claimDailyMissionBonus: () => {
        const state = get();
        const today = state.getEffectiveDate();
        if (state.missionClaimedDate === today) return false;
        if (!state.isTodayMissionComplete()) return false;

        set({
          coins: state.coins + 10,
          missionClaimedDate: today,
        });
        return true;
      },

      resetProgress: () => {
        set({
          coins: 15,
          currentLevel: 1,
          completedLevels: {},
          eggPower: 20,
          lastPlayedDate: null,
          lastLevelCompletedDate: null,
          pets: [],
          activePetId: null,
          ownedItems: ['hat-straw', 'bowtie'],
          equippedItems: {},
          watchedStoriesToday: [],
          lastStoryWatchedDate: null,
          streak: 1,
          missionClaimedDate: null,
          totalAnswersCorrect: 0,
          totalAnswersAttempted: 0,
          hasSeenIntro: false,
        });
      },

      // Dev Mode Actions
      toggleDevMode: () => {
        set((state) => ({ devModeUnlocked: !state.devModeUnlocked }));
      },

      toggleDevBypass: () => {
        set((state) => ({ devBypassDailyLock: !state.devBypassDailyLock }));
      },

      setDevDateOverride: (date: string | null) => {
        set({ devDateOverride: date });
      },

      setCoins: (amount: number) => {
        set({ coins: amount });
      },

      setEggPower: (amount: number) => {
        set({ eggPower: Math.min(100, Math.max(0, amount)) });
      },

      unlockAllLevels: () => {
        const fullLevels: Record<number, CompletedLevelInfo> = {};
        for (let i = 1; i <= 20; i++) {
          fullLevels[i] = {
            stars: 3,
            score: 5,
            coinsEarned: 15,
            completedAt: get().getEffectiveDate(),
          };
        }
        set({ currentLevel: 20, completedLevels: fullLevels });
      },
    }),
    {
      name: 'numling-jungle-storage',
    }
  )
);
