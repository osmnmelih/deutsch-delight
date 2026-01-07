import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VocabularyWord, Article } from '@/types/vocabulary';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';
import { toast } from 'sonner';
import { SRSData } from '@/types/srs';

interface VisualMatchGameProps {
  words: VocabularyWord[];
  onBack: () => void;
  onComplete: (correct: number, incorrect: number) => void;
  onRecordReview?: (wordId: string, isCorrect: boolean, responseTime: number) => SRSData;
  onXPGain?: (amount: number) => void;
}

// Comprehensive emoji mapping
const wordEmojis: Record<string, string> = {
  Hund: '🐕', Katze: '🐱', Pferd: '🐴', Vogel: '🐦', Maus: '🐭', Schwein: '🐷',
  Kuh: '🐄', Schaf: '🐑', Fisch: '🐟', Bär: '🐻', Apfel: '🍎', Banane: '🍌',
  Brot: '🍞', Käse: '🧀', Milch: '🥛', Ei: '🥚', Wurst: '🌭', Fleisch: '🥩',
  Reis: '🍚', Kartoffel: '🥔', Tisch: '🪑', Lampe: '💡', Fenster: '🪟', Stuhl: '🪑',
  Tür: '🚪', Bett: '🛏️', Schrank: '🗄️', Küche: '🍳', Sofa: '🛋️', Spiegel: '🪞',
  Baum: '🌳', Blume: '🌸', Wasser: '💧', Berg: '⛰️', Sonne: '☀️', Meer: '🌊',
  Wald: '🌲', Wolke: '☁️', Gras: '🌿', Fluss: '🏞️', Kopf: '👤', Hand: '✋',
  Auge: '👁️', Fuß: '🦶', Nase: '👃', Ohr: '👂', Arm: '💪', Bein: '🦵',
  Schuh: '👟', Hose: '👖', Hemd: '👔', Mantel: '🧥', Jacke: '🧥', Kleid: '👗',
  Hut: '🎩', Socke: '🧦', Auto: '🚗', Zug: '🚂', Bus: '🚌', Fahrrad: '🚲',
  Flugzeug: '✈️', Schiff: '🚢', Vater: '👨', Mutter: '👩', Baby: '👶',
  Bruder: '👦', Schwester: '👧', Großvater: '👴', Großmutter: '👵',
  Regen: '🌧️', Schnee: '❄️', Wind: '💨', Gewitter: '⛈️', Nebel: '🌫️',
  Stift: '✏️', Buch: '📖', Computer: '💻', Uhr: '⏰', Tasche: '👜',
  Himmel: '🌤️', Nacht: '🌙', Gold: '🥇', Rose: '🌹', Mond: '🌕',
  Glück: '🍀', Liebe: '❤️', Fußball: '⚽', Musik: '🎵', Tanz: '💃',
  Markt: '🏪', Park: '🌳', Kirche: '⛪', Museum: '🏛️', Kaffee: '☕',
  Wein: '🍷', Bier: '🍺', Pizza: '🍕', Suppe: '🍲', Salat: '🥗',
  Haus: '🏠', Straße: '🛣️', Stadt: '🏙️', Garten: '🌻', Kühlschrank: '🧊',
  Telefon: '📱', Fernseher: '📺', Radio: '📻', Kamera: '📷', Schlüssel: '🔑',
};

export const VisualMatchGame = ({ words, onBack, onComplete, onRecordReview, onXPGain }: VisualMatchGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showXPGain, setShowXPGain] = useState<number | null>(null);
  const wordStartTime = useRef<number>(Date.now());
  const { speakWord } = useAudioPronunciation();

  const currentWord = words[currentIndex];
  const isCompleted = currentIndex >= words.length;
  const emoji = currentWord ? wordEmojis[currentWord.german] || '📝' : '';

  // Generate wrong options from same category
  const options = useMemo(() => {
    if (!currentWord) return [];
    
    const wrongWords = words
      .filter(w => w.id !== currentWord.id && w.category === currentWord.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Fill with any words if not enough from category
    while (wrongWords.length < 3) {
      const randomWord = words.find(w => 
        w.id !== currentWord.id && !wrongWords.some(ww => ww.id === w.id)
      );
      if (randomWord) wrongWords.push(randomWord);
      else break;
    }
    
    return [...wrongWords, currentWord].sort(() => Math.random() - 0.5);
  }, [currentWord, words]);

  const handleAnswer = useCallback((selectedWord: VocabularyWord) => {
    if (result) return;
    
    const responseTime = Date.now() - wordStartTime.current;
    const isCorrect = selectedWord.id === currentWord.id;
    
    setResult(isCorrect ? 'correct' : 'incorrect');
    
    // Calculate XP with streak bonus
    let xpGain = isCorrect ? 10 : 2;
    if (isCorrect && streak >= 3) xpGain += Math.min(streak, 10);
    
    if (onRecordReview) {
      onRecordReview(currentWord.id, isCorrect, responseTime);
    }
    
    if (isCorrect) {
      setCorrectCount(p => p + 1);
      setStreak(p => p + 1);
      setShowXPGain(xpGain);
      speakWord(currentWord.german, currentWord.article);
      toast.success('Richtig! 🎉', { duration: 1200 });
      onXPGain?.(xpGain);
    } else {
      setIncorrectCount(p => p + 1);
      setStreak(0);
      toast.error(`Das ist "${currentWord.article} ${currentWord.german}"`, { duration: 2000 });
      onXPGain?.(xpGain);
    }

    setTimeout(() => {
      setResult(null);
      setShowXPGain(null);
      wordStartTime.current = Date.now();
      
      if (currentIndex < words.length - 1) {
        setCurrentIndex(p => p + 1);
      } else {
        onComplete(correctCount + (isCorrect ? 1 : 0), incorrectCount + (isCorrect ? 0 : 1));
      }
    }, 1500);
  }, [currentWord, currentIndex, words.length, correctCount, incorrectCount, onComplete, onRecordReview, onXPGain, result, streak, speakWord]);

  const restartGame = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setResult(null);
    wordStartTime.current = Date.now();
  };

  // Completion screen
  if (isCompleted) {
    const percentage = Math.round((correctCount / words.length) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;
    
    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-scale-in">
          {/* Stars */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <Star
                key={i}
                className={`w-10 h-10 transition-all ${
                  i <= stars ? 'text-primary fill-primary' : 'text-muted'
                }`}
              />
            ))}
          </div>
          
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            {percentage >= 80 ? 'Ausgezeichnet!' : percentage >= 60 ? 'Gut gemacht!' : 'Weiter üben!'}
          </h2>
          
          <p className="text-muted-foreground mb-6 text-center">
            {correctCount} of {words.length} correct ({percentage}%)
          </p>
          
          <div className="flex gap-4 items-center mb-8">
            <div className="flex items-center gap-2 bg-correct/10 text-correct px-4 py-2 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold">{correctCount}</span>
            </div>
            <div className="flex items-center gap-2 bg-incorrect/10 text-incorrect px-4 py-2 rounded-xl">
              <XCircle className="w-5 h-5" />
              <span className="font-bold">{incorrectCount}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={restartGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {/* Streak indicator */}
            {streak >= 2 && (
              <Badge className="bg-primary/10 text-primary animate-bounce-in">
                🔥 {streak} streak
              </Badge>
            )}
            
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1}/{words.length}
            </span>
          </div>
          <Progress value={((currentIndex + 1) / words.length) * 100} className="mt-2 h-1.5" />
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4">
        {/* Visual Card with Emoji */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card className={`w-full max-w-sm transition-all duration-300 ${
            result === 'correct' ? 'ring-4 ring-correct bg-correct/5' : 
            result === 'incorrect' ? 'ring-4 ring-incorrect bg-incorrect/5' : ''
          }`}>
            <CardContent className="p-8 text-center relative">
              {/* XP Gain Animation */}
              {showXPGain && (
                <div className="absolute top-2 right-2 animate-bounce-in">
                  <Badge className="bg-primary text-primary-foreground">
                    +{showXPGain} XP
                  </Badge>
                </div>
              )}
              
              {/* Large Emoji */}
              <div className="text-7xl mb-4 animate-float">{emoji}</div>
              
              {/* English Word (Question) */}
              <p className="text-xl text-muted-foreground font-medium mb-2">
                What is this in German?
              </p>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {currentWord.english}
              </h2>
              
              {/* Result Feedback */}
              {result && (
                <div className={`mt-4 flex items-center justify-center gap-2 animate-bounce-in ${
                  result === 'correct' ? 'text-correct' : 'text-incorrect'
                }`}>
                  {result === 'correct' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-bold text-lg">
                    {currentWord.article} {currentWord.german}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {options.map((option) => {
            const isSelected = result && option.id === currentWord.id;
            const isWrongSelected = result === 'incorrect' && option.id !== currentWord.id;
            const optionEmoji = wordEmojis[option.german] || '📝';
            
            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option)}
                disabled={!!result}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isSelected && result === 'correct'
                    ? 'border-correct bg-correct/10'
                    : isSelected && result === 'incorrect'
                    ? 'border-incorrect bg-incorrect/10'
                    : result && option.id === currentWord.id
                    ? 'border-correct bg-correct/10'
                    : 'border-border bg-card hover:border-primary hover:bg-primary/5'
                } ${result ? 'cursor-default' : 'active:scale-95'}`}
              >
                <span className="text-2xl">{optionEmoji}</span>
                <div className="text-center">
                  <Badge variant="outline" className={`text-[10px] mb-1 ${
                    option.article === 'der' ? 'text-der' : 
                    option.article === 'die' ? 'text-die' : 'text-das'
                  }`}>
                    {option.article}
                  </Badge>
                  <p className="font-heading font-bold text-sm">{option.german}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Audio Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => speakWord(currentWord.german, currentWord.article)}
            className="gap-2"
          >
            <Volume2 className="w-4 h-4" />
            Listen
          </Button>
        </div>
      </main>
    </div>
  );
};
