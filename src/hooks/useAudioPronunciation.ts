import { useEffect, useRef, useCallback, useState } from 'react';

interface UseAudioPronunciationOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

export function useAudioPronunciation(options: UseAudioPronunciationOptions = {}) {
  const { lang = 'de-DE', rate = 0.88, pitch = 1.05 } = options;
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const preferredVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize voices - prioritize female German Hochdeutsch voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Find best German voice - prioritize female Hochdeutsch voices
      const germanVoices = availableVoices.filter(v => v.lang.startsWith('de'));
      
      // Priority order: Female Hochdeutsch voices (standard German, not Austrian/Swiss)
      // These are common female German voice names across different systems
      const preferredFemaleVoices = [
        // Google voices (Chrome)
        'Google Deutsch',
        // Microsoft voices (Edge/Windows)
        'Microsoft Katja',
        'Microsoft Hedda', 
        'Katja',
        'Hedda',
        // Apple voices (Safari/macOS/iOS)
        'Anna',
        'Helena',
        'Petra',
        'Marlene',
        // Generic female indicators
        'Female',
        'Frau',
      ];

      // Filter for de-DE (Hochdeutsch) not de-AT (Austrian) or de-CH (Swiss)
      const hochdeutschVoices = germanVoices.filter(v => 
        v.lang === 'de-DE' || v.lang === 'de_DE' || v.lang === 'de'
      );

      // Try to find a preferred female voice in Hochdeutsch
      let selectedVoice = hochdeutschVoices.find(v => 
        preferredFemaleVoices.some(name => 
          v.name.toLowerCase().includes(name.toLowerCase())
        )
      );

      // Fallback: any Hochdeutsch voice that seems female (often have softer names)
      if (!selectedVoice) {
        selectedVoice = hochdeutschVoices.find(v => 
          !v.name.toLowerCase().includes('male') &&
          !v.name.toLowerCase().includes('hans') &&
          !v.name.toLowerCase().includes('conrad') &&
          !v.name.toLowerCase().includes('stefan') &&
          !v.name.toLowerCase().includes('markus')
        );
      }

      // Fallback: any Hochdeutsch voice
      if (!selectedVoice) {
        selectedVoice = hochdeutschVoices[0];
      }

      // Final fallback: any German voice
      if (!selectedVoice) {
        selectedVoice = germanVoices[0];
      }

      preferredVoice.current = selectedVoice || null;
      
      // Log selected voice for debugging
      if (selectedVoice) {
        console.log('Selected German voice:', selectedVoice.name, selectedVoice.lang);
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

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    // Slightly slower and higher pitch for clearer, more natural female voice
    utterance.rate = customRate ?? rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    if (preferredVoice.current) {
      utterance.voice = preferredVoice.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported, lang, rate, pitch]);

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
    speak(cleanSentence, 0.85); // Slightly slower for sentences
  }, [speak]);

  const speakSlow = useCallback((text: string) => {
    speak(text, 0.65); // Slow mode for learning
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
