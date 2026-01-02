import { useState, useEffect, useCallback } from 'react';
import { SRSData, SRSStats, ReviewQuality } from '@/types/srs';
import { Verb } from '@/data/verbs';
import {
  createInitialSRSData,
  calculateNextReview,
  sortByPriority,
  getDueWords,
  calculateStats,
  qualityFromCorrect,
} from '@/lib/srs';

const STORAGE_KEY = 'german-verb-srs-data';

export function useVerbSRS(verbs: Verb[]) {
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
        console.error('Failed to parse verb SRS data:', e);
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

  // Initialize SRS data for verbs that don't have it
  useEffect(() => {
    if (!isLoaded) return;
    
    const newMap = new Map(srsMap);
    let hasNew = false;
    
    verbs.forEach(verb => {
      if (!newMap.has(verb.id)) {
        newMap.set(verb.id, createInitialSRSData(verb.id));
        hasNew = true;
      }
    });
    
    if (hasNew) {
      setSrsMap(newMap);
    }
  }, [verbs, isLoaded]);

  const getSRSData = useCallback((verbId: string): SRSData => {
    return srsMap.get(verbId) || createInitialSRSData(verbId);
  }, [srsMap]);

  const recordReview = useCallback((
    verbId: string,
    isCorrect: boolean,
    responseTime?: number
  ) => {
    const quality = qualityFromCorrect(isCorrect, responseTime);
    const currentData = getSRSData(verbId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(verbId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const recordReviewWithQuality = useCallback((
    verbId: string,
    quality: ReviewQuality
  ) => {
    const currentData = getSRSData(verbId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(verbId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const getNextVerbs = useCallback((
    count: number,
    categoryId?: string
  ): Verb[] => {
    // Filter verbs by category if specified
    const filteredVerbs = categoryId
      ? verbs.filter(v => v.category === categoryId)
      : verbs;
    
    // Get SRS data for all filtered verbs
    const verbSRSPairs = filteredVerbs.map(verb => ({
      verb,
      srs: getSRSData(verb.id),
    }));
    
    // Sort by priority (due verbs first, then by difficulty)
    const sorted = verbSRSPairs.sort((a, b) => {
      const aDue = new Date(a.srs.nextReview) <= new Date();
      const bDue = new Date(b.srs.nextReview) <= new Date();
      
      // Due verbs come first
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      
      // Among due verbs, sort by priority
      if (aDue && bDue) {
        const priorityDiff = sortByPriority([a.srs, b.srs]);
        return priorityDiff[0] === a.srs ? -1 : 1;
      }
      
      // Among non-due verbs, sort by next review date
      return new Date(a.srs.nextReview).getTime() - new Date(b.srs.nextReview).getTime();
    });
    
    return sorted.slice(0, count).map(pair => pair.verb);
  }, [verbs, getSRSData]);

  const getDueVerbsForCategory = useCallback((categoryId?: string): Verb[] => {
    const filteredVerbs = categoryId
      ? verbs.filter(v => v.category === categoryId)
      : verbs;
    
    const srsDataList = filteredVerbs.map(v => getSRSData(v.id));
    const dueData = getDueWords(srsDataList);
    const dueIds = new Set(dueData.map(d => d.wordId));
    
    return filteredVerbs.filter(v => dueIds.has(v.id));
  }, [verbs, getSRSData]);

  const getStats = useCallback((categoryId?: string): SRSStats => {
    const filteredVerbs = categoryId
      ? verbs.filter(v => v.category === categoryId)
      : verbs;
    
    const srsDataList = filteredVerbs.map(v => getSRSData(v.id));
    return calculateStats(srsDataList);
  }, [verbs, getSRSData]);

  const getVerbDifficulty = useCallback((verbId: string): 'easy' | 'medium' | 'hard' => {
    const srs = getSRSData(verbId);
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
    getNextVerbs,
    getDueVerbsForCategory,
    getStats,
    getVerbDifficulty,
    resetProgress,
  };
}
