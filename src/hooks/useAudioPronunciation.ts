import { useEffect, useRef, useCallback, useState } from 'react';

interface UseAudioPronunciationOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

export function useAudioPronunciation(options: UseAudioPronunciationOptions = {}) {
  const { lang = 'de-DE', rate = 0.85, pitch = 1.0 } = options;
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const preferredVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Find best German voice
      // Priority: Native German voices > Any German voice > Default
      const germanVoices = availableVoices.filter(v => v.lang.startsWith('de'));
      
      // Prefer voices that sound more natural
      const preferredVoiceNames = [
        'Google Deutsch', 'Microsoft Stefan', 'Microsoft Hedda', 
        'Anna', 'Helena', 'Petra', 'Hans', 'Conrad'
      ];
      
      preferredVoice.current = 
        germanVoices.find(v => preferredVoiceNames.some(name => v.name.includes(name))) ||
        germanVoices.find(v => v.localService) || // Local voices often sound better
        germanVoices[0] ||
        null;
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
    utterance.rate = customRate ?? rate;
    utterance.pitch = pitch;

    if (preferredVoice.current) {
      utterance.voice = preferredVoice.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported, lang, rate, pitch]);

  const speakWord = useCallback((word: string, article?: string) => {
    const textToSpeak = article ? `${article} ${word}` : word;
    speak(textToSpeak);
  }, [speak]);

  const speakSentence = useCallback((sentence: string) => {
    speak(sentence, 0.9); // Slightly faster for sentences
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
    stop,
  };
}
