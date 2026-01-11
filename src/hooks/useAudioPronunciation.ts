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
  return { audioSpeed: 0.88, voiceGender: 'female' };
};

interface UseAudioPronunciationOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

export function useAudioPronunciation(options: UseAudioPronunciationOptions = {}) {
  const { lang = 'de-DE' } = options;
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const femaleVoice = useRef<SpeechSynthesisVoice | null>(null);
  const maleVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize voices - find both male and female German Hochdeutsch voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Get German voices - filter for de-DE (Hochdeutsch), not de-AT or de-CH
      const germanVoices = availableVoices.filter(v => 
        v.lang === 'de-DE' || v.lang === 'de_DE' || v.lang === 'de'
      );

      // Known female German voice names across platforms
      const knownFemaleNames = [
        'anna', 'helena', 'petra', 'marlene', 'hedda', 'katja', 
        'vicki', 'eva', 'monica', 'steffi', 'sabine', 'karin',
        'google deutsch', 'microsoft hedda', 'microsoft katja'
      ];

      // Known male German voice names
      const knownMaleNames = [
        'hans', 'stefan', 'conrad', 'markus', 'jonas', 'max',
        'florian', 'michael', 'thomas', 'andreas'
      ];

      // Find best female voice
      let foundFemale = germanVoices.find(v => 
        knownFemaleNames.some(name => v.name.toLowerCase().includes(name))
      );

      // Fallback: any German voice that's NOT known male
      if (!foundFemale) {
        foundFemale = germanVoices.find(v => 
          !knownMaleNames.some(name => v.name.toLowerCase().includes(name)) &&
          !v.name.toLowerCase().includes('male')
        );
      }

      // Final fallback
      if (!foundFemale && germanVoices.length > 0) {
        foundFemale = germanVoices[0];
      }

      femaleVoice.current = foundFemale || null;

      // Find best male voice
      let foundMale = germanVoices.find(v => 
        knownMaleNames.some(name => v.name.toLowerCase().includes(name))
      );

      // Fallback: any German voice with 'male' indicator
      if (!foundMale) {
        foundMale = germanVoices.find(v => 
          v.name.toLowerCase().includes('male') ||
          knownMaleNames.some(name => v.name.toLowerCase().includes(name))
        );
      }

      // Final fallback for male
      if (!foundMale && germanVoices.length > 1) {
        foundMale = germanVoices[1];
      } else if (!foundMale && germanVoices.length > 0) {
        foundMale = germanVoices[0];
      }

      maleVoice.current = foundMale || null;

      // Log selected voices for debugging
      if (foundFemale) {
        console.log('Selected female German voice:', foundFemale.name, foundFemale.lang);
      }
      if (foundMale) {
        console.log('Selected male German voice:', foundMale.name, foundMale.lang);
      }
    };

    loadVoices();

    // Voices might load asynchronously
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback((text: string, customRate?: number) => {
    if (!isSupported) return;

    // Get current settings
    const settings = getStoredSettings();
    const rate = customRate ?? settings.audioSpeed ?? 0.88;
    const voiceGender = settings.voiceGender ?? 'female';

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    // Adjust pitch based on gender for more natural sound
    utterance.pitch = voiceGender === 'female' ? 1.1 : 0.95;
    utterance.volume = 1.0;

    // Select voice based on gender preference
    const selectedVoice = voiceGender === 'female' ? femaleVoice.current : maleVoice.current;
    
    // Fallback to any available voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else if (femaleVoice.current) {
      utterance.voice = femaleVoice.current;
    } else if (maleVoice.current) {
      utterance.voice = maleVoice.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

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
      .trim();
    // Slightly slower for sentences
    const settings = getStoredSettings();
    const slowRate = (settings.audioSpeed ?? 0.88) * 0.95;
    speak(cleanSentence, slowRate);
  }, [speak]);

  const speakSlow = useCallback((text: string) => {
    const settings = getStoredSettings();
    const slowRate = Math.max(0.5, (settings.audioSpeed ?? 0.88) - 0.25);
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
