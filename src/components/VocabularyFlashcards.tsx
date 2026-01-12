import { useState, useMemo } from 'react';
import { ArrowLeft, Volume2, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Brain, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VocabularyWord } from '@/types/vocabulary';
import { SRSData, ReviewQuality } from '@/types/srs';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface VocabularyFlashcardsProps {
  words: VocabularyWord[];
  categoryTitle: string;
  getSRSData: (wordId: string) => SRSData;
  getWordDifficulty: (wordId: string) => 'easy' | 'medium' | 'hard';
  onRecordReview: (wordId: string, quality: ReviewQuality) => void;
  onBack: () => void;
}

// Word emoji mapping for visual learning
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
};

export const VocabularyFlashcards = ({
  words,
  categoryTitle,
  getSRSData,
  getWordDifficulty,
  onRecordReview,
  onBack,
}: VocabularyFlashcardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Record<string, boolean>>({});
  const { speakWord } = useAudioPronunciation();

  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  const currentWord = shuffledWords[currentIndex];
  const progress = (currentIndex / shuffledWords.length) * 100;
  const isComplete = currentIndex >= shuffledWords.length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentWord) {
      speakWord(currentWord.german, currentWord.article);
    }
  };

  const handleRate = (quality: ReviewQuality) => {
    if (!currentWord) return;
    
    onRecordReview(currentWord.id, quality);
    setReviewed(prev => new Set(prev).add(currentWord.id));
    setResults(prev => ({ ...prev, [currentWord.id]: quality >= 3 }));
    
    // Move to next card
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 200);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewed(new Set());
    setResults({});
  };

  const getArticleColor = (article: string) => {
    if (article === 'der') return 'bg-der text-white';
    if (article === 'die') return 'bg-die text-white';
    return 'bg-das text-white';
  };

  const getDifficultyLabel = (diff: 'easy' | 'medium' | 'hard') => {
    if (diff === 'easy') return { text: 'Gemeistert', color: 'text-correct' };
    if (diff === 'medium') return { text: 'Lernen', color: 'text-primary' };
    return { text: 'Schwierig', color: 'text-incorrect' };
  };

  // Completion screen
  if (isComplete) {
    const correct = Object.values(results).filter(r => r).length;
    const total = Object.keys(results).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-lg">Karteikarten fertig!</h1>
              <p className="text-xs text-muted-foreground">Flashcards Complete</p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h2 className="font-heading text-2xl font-bold mb-2">Gut gemacht!</h2>
          <p className="text-muted-foreground mb-6">Great job reviewing {categoryTitle}!</p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-5 h-5 text-correct" />
              </div>
              <p className="text-2xl font-bold text-correct">{correct}</p>
              <p className="text-xs text-muted-foreground">Gewusst / Knew</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <X className="w-5 h-5 text-incorrect" />
              </div>
              <p className="text-2xl font-bold text-incorrect">{total - correct}</p>
              <p className="text-xs text-muted-foreground">Noch lernen / Learning</p>
            </div>
          </div>

          <div className="text-lg font-semibold mb-8">
            Genauigkeit: <span className="text-primary">{accuracy}%</span>
          </div>

          <div className="flex gap-3 w-full max-w-xs">
            <Button variant="outline" className="flex-1" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Nochmal
            </Button>
            <Button className="flex-1" onClick={onBack}>
              Fertig
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!currentWord) return null;

  const difficulty = getWordDifficulty(currentWord.id);
  const diffLabel = getDifficultyLabel(difficulty);
  const emoji = wordEmojis[currentWord.german];

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="font-heading font-bold text-sm">{categoryTitle}</h1>
              <p className="text-xs text-muted-foreground">
                {currentIndex + 1} / {shuffledWords.length}
              </p>
            </div>
            <div className="w-10" />
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      {/* Flashcard */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div 
          className="w-full max-w-sm perspective-1000 cursor-pointer mb-6"
          onClick={handleFlip}
        >
          <div className={`relative w-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front of card - English */}
            <Card className={`w-full min-h-[280px] flex flex-col items-center justify-center p-6 backface-hidden ${isFlipped ? 'invisible' : ''}`}>
              <div className={`text-sm font-medium mb-2 ${diffLabel.color}`}>
                {diffLabel.text}
              </div>
              <div className="text-6xl mb-4">{emoji || '📝'}</div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {currentWord.english}
              </h2>
              <p className="text-sm text-muted-foreground">
                Tippen zum Umdrehen / Tap to flip
              </p>
            </Card>

            {/* Back of card - German */}
            <Card className={`w-full min-h-[280px] flex flex-col items-center justify-center p-6 absolute top-0 left-0 backface-hidden rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
              <div className="text-6xl mb-4">{emoji || '📝'}</div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold mb-3 ${getArticleColor(currentWord.article)}`}>
                {currentWord.article}
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                {currentWord.german}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {currentWord.english}
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentWord.german, currentWord.article);
                }}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Anhören
              </Button>
            </Card>
          </div>
        </div>

        {/* Rating buttons - only show when flipped */}
        {isFlipped && (
          <div className="w-full max-w-sm space-y-3 animate-slide-up">
            <p className="text-center text-sm text-muted-foreground mb-2">
              Wie gut kanntest du das Wort? / How well did you know it?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-14 border-incorrect/50 hover:bg-incorrect/10 hover:text-incorrect"
                onClick={() => handleRate(1)}
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Nochmal</div>
                  <div className="text-xs opacity-70">Again</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-14 border-correct/50 hover:bg-correct/10 hover:text-correct"
                onClick={() => handleRate(4)}
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Gewusst</div>
                  <div className="text-xs opacity-70">Knew it</div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {!isFlipped && (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= shuffledWords.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </main>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
