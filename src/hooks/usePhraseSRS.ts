import { useState, useEffect, useCallback } from 'react';
import { SRSData, SRSStats, ReviewQuality } from '@/types/srs';
import {
  createInitialSRSData,
  calculateNextReview,
  getDueWords,
  calculateStats,
  qualityFromCorrect,
} from '@/lib/srs';

const STORAGE_KEY = 'german-phrase-srs-data';

export interface Phrase {
  id: string;
  german: string;
  english: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

export function usePhraseSRS(phrases: Phrase[]) {
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
        console.error('Failed to parse phrase SRS data:', e);
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

  // Initialize SRS data for phrases that don't have it
  useEffect(() => {
    if (!isLoaded) return;
    
    const newMap = new Map(srsMap);
    let hasNew = false;
    
    phrases.forEach(phrase => {
      if (!newMap.has(phrase.id)) {
        newMap.set(phrase.id, createInitialSRSData(phrase.id));
        hasNew = true;
      }
    });
    
    if (hasNew) {
      setSrsMap(newMap);
    }
  }, [phrases, isLoaded]);

  const getSRSData = useCallback((phraseId: string): SRSData => {
    return srsMap.get(phraseId) || createInitialSRSData(phraseId);
  }, [srsMap]);

  const recordReview = useCallback((
    phraseId: string,
    isCorrect: boolean,
    responseTime?: number
  ) => {
    const quality = qualityFromCorrect(isCorrect, responseTime);
    const currentData = getSRSData(phraseId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(phraseId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const recordReviewWithQuality = useCallback((
    phraseId: string,
    quality: ReviewQuality
  ) => {
    const currentData = getSRSData(phraseId);
    const updatedData = calculateNextReview(currentData, quality);
    
    setSrsMap(prev => {
      const newMap = new Map(prev);
      newMap.set(phraseId, updatedData);
      return newMap;
    });
    
    return updatedData;
  }, [getSRSData]);

  const getNextPhrases = useCallback((
    count: number,
    category?: string
  ): Phrase[] => {
    const filteredPhrases = category
      ? phrases.filter(p => p.category === category)
      : phrases;
    
    const phraseSRSPairs = filteredPhrases.map(phrase => ({
      phrase,
      srs: getSRSData(phrase.id),
    }));
    
    const sorted = phraseSRSPairs.sort((a, b) => {
      const aDue = new Date(a.srs.nextReview) <= new Date();
      const bDue = new Date(b.srs.nextReview) <= new Date();
      
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      
      return new Date(a.srs.nextReview).getTime() - new Date(b.srs.nextReview).getTime();
    });
    
    return sorted.slice(0, count).map(pair => pair.phrase);
  }, [phrases, getSRSData]);

  const getDuePhrases = useCallback((category?: string): Phrase[] => {
    const filteredPhrases = category
      ? phrases.filter(p => p.category === category)
      : phrases;
    
    const srsDataList = filteredPhrases.map(p => getSRSData(p.id));
    const dueData = getDueWords(srsDataList);
    const dueIds = new Set(dueData.map(d => d.wordId));
    
    return filteredPhrases.filter(p => dueIds.has(p.id));
  }, [phrases, getSRSData]);

  const getStats = useCallback((category?: string): SRSStats => {
    const filteredPhrases = category
      ? phrases.filter(p => p.category === category)
      : phrases;
    
    const srsDataList = filteredPhrases.map(p => getSRSData(p.id));
    return calculateStats(srsDataList);
  }, [phrases, getSRSData]);

  const getPhraseDifficulty = useCallback((phraseId: string): 'easy' | 'medium' | 'hard' => {
    const srs = getSRSData(phraseId);
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
    getNextPhrases,
    getDuePhrases,
    getStats,
    getPhraseDifficulty,
    resetProgress,
  };
}
