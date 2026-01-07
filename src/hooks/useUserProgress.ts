import { useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'german-user-progress';

export interface UserLevel {
  level: number;
  xp: number;
  xpToNextLevel: number;
  wordsUnlocked: number;
  categoriesUnlocked: string[];
}

interface StoredProgress {
  level: number;
  xp: number;
  completedLessons: string[];
  unlockedCategories: string[];
  totalWordsLearned: number;
  totalCorrect: number;
  totalIncorrect: number;
  lastActiveDate: string;
}

const DEFAULT_PROGRESS: StoredProgress = {
  level: 1,
  xp: 0,
  completedLessons: [],
  unlockedCategories: ['animals', 'food', 'house'],
  totalWordsLearned: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  lastActiveDate: new Date().toISOString(),
};

const XP_PER_LEVEL = [
  0, 50, 120, 200, 300, 420, 560, 720, 900, 1100, 
  1320, 1560, 1820, 2100, 2400, 2720, 3060, 3420, 3800, 4200
];

const CATEGORY_UNLOCK_ORDER = [
  'animals', 'food', 'house', 'nature', 'body',
  'clothing', 'professions', 'transportation', 'family', 'weather',
  'school', 'colors', 'emotions', 'sports', 'places',
  'technology', 'kitchen', 'health', 'time', 'abstract', 'business', 'materials'
];

export function useUserProgress() {
  const [progress, setProgress] = useState<StoredProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse user progress:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const getXPForLevel = (level: number): number => {
    return XP_PER_LEVEL[Math.min(level, XP_PER_LEVEL.length - 1)] || level * 200;
  };

  const userLevel = useMemo((): UserLevel => {
    let currentLevel = 1;
    let remainingXP = progress.xp;
    
    while (remainingXP >= getXPForLevel(currentLevel) && currentLevel < 20) {
      remainingXP -= getXPForLevel(currentLevel);
      currentLevel++;
    }
    
    const xpToNext = getXPForLevel(currentLevel);
    const wordsPerLevel = 15;
    
    return {
      level: currentLevel,
      xp: remainingXP,
      xpToNextLevel: xpToNext,
      wordsUnlocked: Math.min(250, currentLevel * wordsPerLevel),
      categoriesUnlocked: progress.unlockedCategories,
    };
  }, [progress.xp, progress.unlockedCategories]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const oldLevel = userLevel.level;
      
      // Check for level up and category unlock
      let currentXP = newXP;
      let newLevel = 1;
      while (currentXP >= getXPForLevel(newLevel) && newLevel < 20) {
        currentXP -= getXPForLevel(newLevel);
        newLevel++;
      }
      
      // Unlock new category on level up
      let newUnlocked = [...prev.unlockedCategories];
      if (newLevel > oldLevel) {
        const categoryIndex = Math.min(newLevel + 2, CATEGORY_UNLOCK_ORDER.length - 1);
        const newCategory = CATEGORY_UNLOCK_ORDER[categoryIndex];
        if (newCategory && !newUnlocked.includes(newCategory)) {
          newUnlocked.push(newCategory);
        }
      }
      
      return {
        ...prev,
        xp: newXP,
        unlockedCategories: newUnlocked,
        lastActiveDate: new Date().toISOString(),
      };
    });
  }, [userLevel.level]);

  const recordCorrectAnswer = useCallback(() => {
    addXP(10);
    setProgress(prev => ({
      ...prev,
      totalCorrect: prev.totalCorrect + 1,
      totalWordsLearned: prev.totalWordsLearned + 1,
    }));
  }, [addXP]);

  const recordIncorrectAnswer = useCallback(() => {
    addXP(2);
    setProgress(prev => ({
      ...prev,
      totalIncorrect: prev.totalIncorrect + 1,
    }));
  }, [addXP]);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      addXP(25);
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, [addXP]);

  const isCategoryUnlocked = useCallback((categoryId: string): boolean => {
    return progress.unlockedCategories.includes(categoryId);
  }, [progress.unlockedCategories]);

  const getCategoryUnlockLevel = useCallback((categoryId: string): number => {
    const index = CATEGORY_UNLOCK_ORDER.indexOf(categoryId);
    return Math.max(1, index - 2);
  }, []);

  return {
    isLoaded,
    progress,
    userLevel,
    addXP,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    completeLesson,
    isCategoryUnlocked,
    getCategoryUnlockLevel,
  };
}
