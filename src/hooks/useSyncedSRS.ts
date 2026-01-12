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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const LOCAL_STORAGE_KEY = 'german-srs-data';

export function useSyncedSRS(words: VocabularyWord[]) {
  const [srsMap, setSrsMap] = useState<Map<string, SRSData>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user } = useAuth();

  // Load SRS data - from database if logged in, otherwise from localStorage
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        // Load from database
        const { data, error } = await supabase
          .from('user_srs_data')
          .select('*')
          .eq('user_id', user.id);
        
        if (!error && data) {
          const map = new Map<string, SRSData>();
          data.forEach(row => {
            map.set(row.word_id, {
              wordId: row.word_id,
              easeFactor: Number(row.ease_factor),
              interval: row.interval,
              repetitions: row.repetitions,
              nextReview: row.next_review,
              correctCount: row.correct_count,
              incorrectCount: row.incorrect_count,
              lastReview: row.last_reviewed,
            });
          });
          setSrsMap(map);
        }
      } else {
        // Load from localStorage
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          try {
            const parsed: SRSData[] = JSON.parse(stored);
            const map = new Map(parsed.map(srs => [srs.wordId, srs]));
            setSrsMap(map);
          } catch (e) {
            console.error('Failed to parse SRS data:', e);
          }
        }
      }
      setIsLoaded(true);
    };

    loadData();
  }, [user]);

  // Save to localStorage when not logged in
  useEffect(() => {
    if (isLoaded && !user && srsMap.size > 0) {
      const data = Array.from(srsMap.values());
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }, [srsMap, isLoaded, user]);

  // Sync local data to database when user logs in
  const syncLocalToCloud = useCallback(async () => {
    if (!user || isSyncing) return;
    
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!localData) return;
    
    setIsSyncing(true);
    try {
      const parsed: SRSData[] = JSON.parse(localData);
      
      // Upsert all local data to database
      for (const srs of parsed) {
        await supabase
          .from('user_srs_data')
          .upsert({
            user_id: user.id,
            word_id: srs.wordId,
            ease_factor: srs.easeFactor,
            interval: srs.interval,
            repetitions: srs.repetitions,
            next_review: srs.nextReview,
            correct_count: srs.correctCount,
            incorrect_count: srs.incorrectCount,
            last_reviewed: srs.lastReview,
          }, {
            onConflict: 'user_id,word_id'
          });
      }
      
      // Clear local storage after successful sync
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to sync local data to cloud:', e);
    }
    setIsSyncing(false);
  }, [user, isSyncing]);

  // Auto-sync when user logs in
  useEffect(() => {
    if (user && isLoaded) {
      syncLocalToCloud();
    }
  }, [user, isLoaded, syncLocalToCloud]);

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

  const recordReview = useCallback(async (
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
    
    // Save to database if logged in
    if (user) {
      await supabase
        .from('user_srs_data')
        .upsert({
          user_id: user.id,
          word_id: wordId,
          ease_factor: updatedData.easeFactor,
          interval: updatedData.interval,
          repetitions: updatedData.repetitions,
          next_review: updatedData.nextReview,
          correct_count: updatedData.correctCount,
          incorrect_count: updatedData.incorrectCount,
          last_reviewed: updatedData.lastReview,
        }, {
          onConflict: 'user_id,word_id'
        });
    }
    
    return updatedData;
  }, [getSRSData, user]);

  const recordReviewWithQuality = useCallback(async (
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
    
    // Save to database if logged in
    if (user) {
      await supabase
        .from('user_srs_data')
        .upsert({
          user_id: user.id,
          word_id: wordId,
          ease_factor: updatedData.easeFactor,
          interval: updatedData.interval,
          repetitions: updatedData.repetitions,
          next_review: updatedData.nextReview,
          correct_count: updatedData.correctCount,
          incorrect_count: updatedData.incorrectCount,
          last_reviewed: updatedData.lastReview,
        }, {
          onConflict: 'user_id,word_id'
        });
    }
    
    return updatedData;
  }, [getSRSData, user]);

  const getNextWords = useCallback((
    count: number,
    categoryId?: string
  ): VocabularyWord[] => {
    const filteredWords = categoryId
      ? words.filter(w => w.category === categoryId)
      : words;
    
    const wordSRSPairs = filteredWords.map(word => ({
      word,
      srs: getSRSData(word.id),
    }));
    
    const sorted = wordSRSPairs.sort((a, b) => {
      const aDue = new Date(a.srs.nextReview) <= new Date();
      const bDue = new Date(b.srs.nextReview) <= new Date();
      
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      
      if (aDue && bDue) {
        const priorityDiff = sortByPriority([a.srs, b.srs]);
        return priorityDiff[0] === a.srs ? -1 : 1;
      }
      
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

  const resetProgress = useCallback(async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setSrsMap(new Map());
    
    if (user) {
      await supabase
        .from('user_srs_data')
        .delete()
        .eq('user_id', user.id);
    }
  }, [user]);

  return {
    isLoaded,
    isSyncing,
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
