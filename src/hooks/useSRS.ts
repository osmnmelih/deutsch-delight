import { useState, useEffect, useCallback } from 'react';
import { SRSData, SRSStats, ReviewQuality } from '@/types/srs';
import { VocabularyWord } from '@/types/vocabulary';
import {
  createInitialSRSData,
  calculateNextReview,
  sortByPriority,
  getDueWords,
  calculateStats,
  qualityFromCorrect,
} from '@/lib/srs';

const STORAGE_KEY = 'german-srs-data';

export function useSRS(words: VocabularyWord[]) {
  const [srsMap, setSrsMap] = useState<Map<string, SRSData>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load SRS data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: SRSData[] = JSON.parse(stored);
        const map = new Map(parsed.map(srs => [srs.wordId, srs]));
        setSrsMap(map);
      } catch (e) {
        console.error('Failed to parse SRS data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save SRS data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && srsMap.size > 0) {
      const data = Array.from(srsMap.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [srsMap, isLoaded]);

  // Initialize SRS data for words that don't have it
  useEffect(() => {
    if (!isLoaded) return;
    
    const newMap = new Map(srsMap);
    let hasNew = false;
    
    words.forEach(word => {
      if (!newMap.has(word.id)) {
        newMap.set(word.id, createInitialSRSData(word.id));
        hasNew = true;
      }
    });
    
    if (hasNew) {
      setSrsMap(newMap);
    }
  }, [words, isLoaded]);

  const getSRSData = useCallback((wordId: string): SRSData => {
    return srsMap.get(wordId) || createInitialSRSData(wordId);
  }, [srsMap]);

  const recordReview = useCallback((
    wordId: string,
    isCorrect: boolean,
    responseTime?: number
  ) => {
    const quality = qualityFromCorrect(isCorrect, responseTime);
    const currentData = getSRSData(wordId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(wordId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const recordReviewWithQuality = useCallback((
    wordId: string,
    quality: ReviewQuality
  ) => {
    const currentData = getSRSData(wordId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(wordId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const getNextWords = useCallback((
    count: number,
    categoryId?: string
  ): VocabularyWord[] => {
    // Filter words by category if specified
    const filteredWords = categoryId
      ? words.filter(w => w.category === categoryId)
      : words;
    
    // Get SRS data for all filtered words
    const wordSRSPairs = filteredWords.map(word => ({
      word,
      srs: getSRSData(word.id),
    }));
    
    // Sort by priority (due words first, then by difficulty)
    const sorted = wordSRSPairs.sort((a, b) => {
      const aDue = new Date(a.srs.nextReview) <= new Date();
      const bDue = new Date(b.srs.nextReview) <= new Date();
      
      // Due words come first
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      
      // Among due words, sort by priority
      if (aDue && bDue) {
        const priorityDiff = sortByPriority([a.srs, b.srs]);
        return priorityDiff[0] === a.srs ? -1 : 1;
      }
      
      // Among non-due words, sort by next review date
      return new Date(a.srs.nextReview).getTime() - new Date(b.srs.nextReview).getTime();
    });
    
    return sorted.slice(0, count).map(pair => pair.word);
  }, [words, getSRSData]);

  const getDueWordsForCategory = useCallback((categoryId?: string): VocabularyWord[] => {
    const filteredWords = categoryId
      ? words.filter(w => w.category === categoryId)
      : words;
    
    const srsDataList = filteredWords.map(w => getSRSData(w.id));
    const dueData = getDueWords(srsDataList);
    const dueIds = new Set(dueData.map(d => d.wordId));
    
    return filteredWords.filter(w => dueIds.has(w.id));
  }, [words, getSRSData]);

  const getStats = useCallback((categoryId?: string): SRSStats => {
    const filteredWords = categoryId
      ? words.filter(w => w.category === categoryId)
      : words;
    
    const srsDataList = filteredWords.map(w => getSRSData(w.id));
    return calculateStats(srsDataList);
  }, [words, getSRSData]);

  const getWordDifficulty = useCallback((wordId: string): 'easy' | 'medium' | 'hard' => {
    const srs = getSRSData(wordId);
    if (srs.easeFactor >= 2.3) return 'easy';
    if (srs.easeFactor >= 1.8) return 'medium';
    return 'hard';
  }, [getSRSData]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSrsMap(new Map());
  }, []);

  return {
    isLoaded,
    getSRSData,
    recordReview,
    recordReviewWithQuality,
    getNextWords,
    getDueWordsForCategory,
    getStats,
    getWordDifficulty,
    resetProgress,
  };
}
