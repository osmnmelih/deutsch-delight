import { useEffect, useRef, useCallback, useState } from 'react';

// Get settings from localStorage
const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem('deutschlernen_settings');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load audio settings:', e);
  }
  return { audioSpeed: 0.85, voiceGender: 'female' };
};

interface UseAudioPronunciationOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

// Prioritized list of high-quality Hochdeutsch female voices
const PREFERRED_FEMALE_VOICES = [
  // Google voices (highest quality)
  'google deutsch',
  'google de-de',
  // Microsoft Azure voices (excellent quality)
  'microsoft katja online (natural)',
  'microsoft katja',
  'microsoft hedda',
  'microsoft hedda online',
  // Apple voices
  'anna',
  'helena',
  'petra',
  // Amazon Polly
  'marlene',
  'vicki',
  // Other quality voices
  'eva',
  'sabine',
  'steffi',
  'karin',
  'monika',
  'anja',
  'lena',
  'hannah',
  'julia',
  'sarah'
];

const PREFERRED_MALE_VOICES = [
  'google de-de',
  'microsoft conrad online (natural)',
  'microsoft conrad',
  'microsoft stefan',
  'hans',
  'markus',
  'jonas',
  'florian',
  'thomas',
  'andreas',
  'max'
];

export function useAudioPronunciation(options: UseAudioPronunciationOptions = {}) {
  const { lang = 'de-DE' } = options;
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const femaleVoice = useRef<SpeechSynthesisVoice | null>(null);
  const maleVoice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Filter for Hochdeutsch voices (de-DE only, not Austrian or Swiss)
      const germanVoices = availableVoices.filter(v => {
        const langLower = v.lang.toLowerCase();
        return (
          langLower === 'de-de' || 
          langLower === 'de_de' || 
          (langLower === 'de' && !v.name.toLowerCase().includes('swiss') && !v.name.toLowerCase().includes('austria'))
        );
      });

      // Find best female voice using priority list
      let foundFemale: SpeechSynthesisVoice | null = null;
      
      for (const preferredName of PREFERRED_FEMALE_VOICES) {
        const match = germanVoices.find(v => 
          v.name.toLowerCase().includes(preferredName)
        );
        if (match) {
          foundFemale = match;
          break;
        }
      }

      // Fallback: any German voice not explicitly male
      if (!foundFemale) {
        const maleIndicators = ['hans', 'stefan', 'conrad', 'markus', 'jonas', 'max', 'florian', 'michael', 'thomas', 'andreas', 'male'];
        foundFemale = germanVoices.find(v => 
          !maleIndicators.some(name => v.name.toLowerCase().includes(name))
        );
      }

      // Final fallback
      if (!foundFemale && germanVoices.length > 0) {
        foundFemale = germanVoices[0];
      }

      femaleVoice.current = foundFemale || null;

      // Find best male voice using priority list
      let foundMale: SpeechSynthesisVoice | null = null;
      
      for (const preferredName of PREFERRED_MALE_VOICES) {
        const match = germanVoices.find(v => 
          v.name.toLowerCase().includes(preferredName)
        );
        if (match && match !== foundFemale) {
          foundMale = match;
          break;
        }
      }

      // Fallback for male
      if (!foundMale && germanVoices.length > 1) {
        foundMale = germanVoices.find(v => v !== foundFemale) || germanVoices[1];
      } else if (!foundMale && germanVoices.length > 0) {
        foundMale = germanVoices[0];
      }

      maleVoice.current = foundMale || null;

      // Debug logging
      if (foundFemale) {
        console.log('🎙️ Selected female German voice:', foundFemale.name, '|', foundFemale.lang);
      }
      if (foundMale) {
        console.log('🎙️ Selected male German voice:', foundMale.name, '|', foundMale.lang);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Some browsers need a slight delay
    setTimeout(loadVoices, 100);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback((text: string, customRate?: number) => {
    if (!isSupported) return;

    const settings = getStoredSettings();
    const rate = customRate ?? settings.audioSpeed ?? 0.85;
    const voiceGender = settings.voiceGender ?? 'female';

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    // Natural pitch for clear pronunciation
    utterance.pitch = voiceGender === 'female' ? 1.0 : 0.9;
    utterance.volume = 1.0;

    // Select voice based on gender preference
    const selectedVoice = voiceGender === 'female' ? femaleVoice.current : maleVoice.current;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else if (femaleVoice.current) {
      utterance.voice = femaleVoice.current;
    } else if (maleVoice.current) {
      utterance.voice = maleVoice.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [isSupported, lang]);

  const speakWord = useCallback((word: string, article?: string) => {
    // Clean the text for better pronunciation
    const cleanWord = word.replace(/[^\wäöüßÄÖÜ\s-]/g, '').trim();
    const textToSpeak = article ? `${article} ${cleanWord}` : cleanWord;
    speak(textToSpeak);
  }, [speak]);

  const speakSentence = useCallback((sentence: string) => {
    // Clean sentence for natural pronunciation
    const cleanSentence = sentence
      .replace(/\([^)]*\)/g, '') // Remove parentheses content
      .replace(/\[[^\]]*\]/g, '') // Remove bracket content
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    // Slightly slower for sentences
    const settings = getStoredSettings();
    const slowRate = Math.max(0.6, (settings.audioSpeed ?? 0.85) * 0.9);
    speak(cleanSentence, slowRate);
  }, [speak]);

  const speakSlow = useCallback((text: string) => {
    const settings = getStoredSettings();
    const slowRate = Math.max(0.5, (settings.audioSpeed ?? 0.85) - 0.2);
    speak(text, slowRate);
  }, [speak]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    voices,
    speak,
    speakWord,
    speakSentence,
    speakSlow,
    stop,
  };
}
