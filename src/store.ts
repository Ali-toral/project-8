import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Page, PlayerProgress, GameSettings, Question, SkillCategory } from './types';
import { getQuestionsForLevel } from './data/questions';

interface GameState {
  // Navigation
  currentPage: Page;
  setPage: (page: Page) => void;

  // Settings
  settings: GameSettings;
  updateSettings: (s: Partial<GameSettings>) => void;

  // Player Progress
  progress: PlayerProgress;
  updateProgress: (p: Partial<PlayerProgress>) => void;
  resetProgress: () => void;

  // Current Game State
  currentLevelId: number;
  currentQuestions: Question[];
  currentQuestionIndex: number;
  currentCombo: number;
  levelScore: number;
  levelCorrect: number;
  levelWrong: number;
  levelHints: number;

  // Game Actions
  startLevel: (levelId: number) => void;
  answerQuestion: (correct: boolean, skill: SkillCategory) => void;
  nextQuestion: () => void;
  skipQuestion: () => void;
  useHint: () => void;
  completeLevel: () => void;

  // Profile
  playerName: string;
  playerAvatar: string;
  setPlayerName: (name: string) => void;
  setPlayerAvatar: (avatar: string) => void;
}

const defaultProgress: PlayerProgress = {
  currentLevel: 1,
  completedLevels: [],
  totalScore: 0,
  bestCombo: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  hintsUsed: 0,
  playTime: 0,
  skillScores: {
    money_recognition: 0,
    value_recognition: 0,
    number_to_money: 0,
    money_to_number: 0,
    money_addition_small: 0,
    money_addition_large: 0,
    payment: 0,
    shopping: 0,
  },
  skillAttempts: {
    money_recognition: 0,
    value_recognition: 0,
    number_to_money: 0,
    money_to_number: 0,
    money_addition_small: 0,
    money_addition_large: 0,
    payment: 0,
    shopping: 0,
  },
  shoppingCart: [],
  unlockedLevels: [1],
  lastPlayDate: new Date().toISOString(),
};

const defaultSettings: GameSettings = {
  calmMode: false,
  soundEnabled: true,
  musicEnabled: true,
  currency: 'ریال',
  volume: 0.7,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: 'home' as Page,
      setPage: (page) => set({ currentPage: page }),

      // Settings
      settings: defaultSettings,
      updateSettings: (s) => set((state) => ({
        settings: { ...state.settings, ...s },
      })),

      // Progress
      progress: defaultProgress,
      updateProgress: (p) => set((state) => ({
        progress: { ...state.progress, ...p },
      })),
      resetProgress: () => set({ progress: defaultProgress }),

      // Current game state
      currentLevelId: 1,
      currentQuestions: [],
      currentQuestionIndex: 0,
      currentCombo: 0,
      levelScore: 0,
      levelCorrect: 0,
      levelWrong: 0,
      levelHints: 0,

      // Game actions
      startLevel: (levelId) => {
        const questions = getQuestionsForLevel(levelId);
        set({
          currentLevelId: levelId,
          currentQuestions: questions,
          currentQuestionIndex: 0,
          currentCombo: 0,
          levelScore: 0,
          levelCorrect: 0,
          levelWrong: 0,
          levelHints: 0,
          currentPage: 'game',
        });
      },

      answerQuestion: (correct, skill) => {
        const state = get();
        const newCombo = correct ? state.currentCombo + 1 : 0;
        const scoreGain = correct ? 1 : 0;

        set({
          currentCombo: newCombo,
          levelScore: state.levelScore + scoreGain,
          levelCorrect: state.levelCorrect + (correct ? 1 : 0),
          levelWrong: state.levelWrong + (correct ? 0 : 1),
        });

        // Update progress
        const prog = state.progress;
        const newSkillScores = { ...prog.skillScores };
        const newSkillAttempts = { ...prog.skillAttempts };
        newSkillAttempts[skill] = (newSkillAttempts[skill] || 0) + 1;
        if (correct) {
          newSkillScores[skill] = (newSkillScores[skill] || 0) + 1;
        }

        set((s) => ({
          progress: {
            ...s.progress,
            totalQuestions: prog.totalQuestions + 1,
            correctAnswers: prog.correctAnswers + (correct ? 1 : 0),
            wrongAnswers: prog.wrongAnswers + (correct ? 0 : 1),
            bestCombo: Math.max(prog.bestCombo, newCombo),
            totalScore: prog.totalScore + scoreGain,
            skillScores: newSkillScores,
            skillAttempts: newSkillAttempts,
            lastPlayDate: new Date().toISOString(),
          },
        }));
      },

      nextQuestion: () => {
        const state = get();
        const nextIdx = state.currentQuestionIndex + 1;
        if (nextIdx >= state.currentQuestions.length) {
          // Level complete
          get().completeLevel();
        } else {
          set({ currentQuestionIndex: nextIdx });
        }
      },

      skipQuestion: () => {
        get().nextQuestion();
      },

      useHint: () => {
        set((state) => ({
          levelHints: state.levelHints + 1,
          progress: {
            ...state.progress,
            hintsUsed: state.progress.hintsUsed + 1,
          },
        }));
      },

      completeLevel: () => {
        const state = get();
        const lvl = state.currentLevelId;
        const completedLevels = state.progress.completedLevels.includes(lvl)
          ? state.progress.completedLevels
          : [...state.progress.completedLevels, lvl];
        const unlockedLevels = state.progress.unlockedLevels.includes(lvl + 1)
          ? state.progress.unlockedLevels
          : [...state.progress.unlockedLevels, lvl + 1];

        set((s) => ({
          currentPage: 'endLevel',
          progress: {
            ...s.progress,
            completedLevels,
            unlockedLevels,
            currentLevel: Math.max(s.progress.currentLevel, lvl + 1),
          },
        }));
      },

      // Profile
      playerName: 'دوست من',
      playerAvatar: '🐰',
      setPlayerName: (name) => set({ playerName: name }),
      setPlayerAvatar: (avatar) => set({ playerAvatar: avatar }),
    }),
    {
      name: 'colorful-store-game',
      partialize: (state) => ({
        progress: state.progress,
        settings: state.settings,
        playerName: state.playerName,
        playerAvatar: state.playerAvatar,
      }),
    }
  )
);
