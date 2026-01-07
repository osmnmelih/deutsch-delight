import { useState, useMemo } from 'react';
import { ArrowLeft, Volume2, ChevronRight, Lock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VocabularyWord } from '@/types/vocabulary';
import { lessonCategories } from '@/data/vocabulary';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';
import { SRSData } from '@/types/srs';

interface VocabularyBrowserProps {
  words: VocabularyWord[];
  getSRSData: (wordId: string) => SRSData;
  getWordDifficulty: (wordId: string) => 'easy' | 'medium' | 'hard';
  onBack: () => void;
  onStartPractice: (categoryId: string) => void;
  isCategoryUnlocked: (categoryId: string) => boolean;
  getCategoryUnlockLevel: (categoryId: string) => number;
}

const WORDS_PER_PAGE = 10;

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

export const VocabularyBrowser = ({
  words,
  getSRSData,
  getWordDifficulty,
  onBack,
  onStartPractice,
  isCategoryUnlocked,
  getCategoryUnlockLevel,
}: VocabularyBrowserProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const { speakWord } = useAudioPronunciation();

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; mastered: number; learning: number }> = {};
    
    lessonCategories.forEach(cat => {
      const catWords = words.filter(w => w.category === cat.id);
      let mastered = 0, learning = 0;
      
      catWords.forEach(w => {
        const diff = getWordDifficulty(w.id);
        if (diff === 'easy') mastered++;
        else if (diff === 'medium') learning++;
      });
      
      stats[cat.id] = { total: catWords.length, mastered, learning };
    });
    
    return stats;
  }, [words, getWordDifficulty]);

  const filteredWords = useMemo(() => {
    let result = selectedCategory 
      ? words.filter(w => w.category === selectedCategory)
      : words;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(w => 
        w.german.toLowerCase().includes(query) || 
        w.english.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [words, selectedCategory, searchQuery]);

  const paginatedWords = useMemo(() => {
    const start = currentPage * WORDS_PER_PAGE;
    return filteredWords.slice(start, start + WORDS_PER_PAGE);
  }, [filteredWords, currentPage]);

  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);

  const getArticleColor = (article: string) => {
    if (article === 'der') return 'bg-der/20 text-der border-der/30';
    if (article === 'die') return 'bg-die/20 text-die border-die/30';
    return 'bg-das/20 text-das border-das/30';
  };

  const getDifficultyColor = (diff: 'easy' | 'medium' | 'hard') => {
    if (diff === 'easy') return 'bg-correct/15 text-correct';
    if (diff === 'medium') return 'bg-primary/15 text-primary';
    return 'bg-incorrect/15 text-incorrect';
  };

  // Category selection view
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-lg">Vocabulary</h1>
              <p className="text-xs text-muted-foreground">{words.length} words total</p>
            </div>
          </div>
        </header>

        <main className="container px-4 py-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setSelectedCategory('__search__');
              }}
              className="pl-9"
            />
          </div>

          {/* Categories Grid */}
          <div className="grid gap-2">
            {lessonCategories.map((category) => {
              const isUnlocked = isCategoryUnlocked(category.id);
              const stats = categoryStats[category.id] || { total: 0, mastered: 0, learning: 0 };
              const progressPercent = stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0;
              
              return (
                <Card 
                  key={category.id}
                  className={`overflow-hidden transition-all ${
                    isUnlocked ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : 'opacity-60'
                  }`}
                  onClick={() => isUnlocked && setSelectedCategory(category.id)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                      {isUnlocked ? category.icon : <Lock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading font-semibold text-sm truncate">
                          {category.title}
                        </h3>
                        {isUnlocked && (
                          <span className="text-xs text-muted-foreground shrink-0">
                            {stats.mastered}/{stats.total}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground truncate">
                        {isUnlocked ? category.description : `Unlock at Level ${getCategoryUnlockLevel(category.id)}`}
                      </p>
                      
                      {isUnlocked && (
                        <Progress value={progressPercent} className="h-1 mt-1.5" />
                      )}
                    </div>
                    
                    {isUnlocked && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Search results or category words view
  const categoryTitle = selectedCategory === '__search__' 
    ? `Search: "${searchQuery}"` 
    : lessonCategories.find(c => c.id === selectedCategory)?.title || 'Words';

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setCurrentPage(0);
              }}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-heading font-bold text-sm">{categoryTitle}</h1>
                <p className="text-xs text-muted-foreground">{filteredWords.length} words</p>
              </div>
            </div>
            
            {selectedCategory !== '__search__' && (
              <Button size="sm" onClick={() => onStartPractice(selectedCategory)}>
                Practice
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container px-4 py-4 space-y-3">
        {/* Word Cards */}
        <div className="space-y-2">
          {paginatedWords.map((word) => {
            const difficulty = getWordDifficulty(word.id);
            const emoji = wordEmojis[word.german];
            
            return (
              <Card key={word.id} className="overflow-hidden">
                <CardContent className="p-3 flex items-center gap-3">
                  {/* Emoji/Visual */}
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl shrink-0">
                    {emoji || '📝'}
                  </div>
                  
                  {/* Word Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getArticleColor(word.article)}`}>
                        {word.article}
                      </Badge>
                      <span className="font-heading font-bold text-base truncate">{word.german}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{word.english}</p>
                  </div>
                  
                  {/* Difficulty & Audio */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={`text-[10px] ${getDifficultyColor(difficulty)}`}>
                      {difficulty === 'easy' ? '✓' : difficulty === 'medium' ? '◐' : '○'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(word.german, word.article);
                      }}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-3">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
