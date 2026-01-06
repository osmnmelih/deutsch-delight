import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, MessageCircle, Scroll, Globe, Check, X } from 'lucide-react';
import { idioms, proverbs, culturalTips, Idiom } from '@/data/cultureIdioms';

interface CultureIdiomsProps {
  onBack: () => void;
}

const CultureIdioms = ({ onBack }: CultureIdiomsProps) => {
  const [activeTab, setActiveTab] = useState('idioms');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizIdioms, setQuizIdioms] = useState<Idiom[]>([]);

  const categoryIcons: Record<string, string> = {
    animals: '🐾',
    food: '🍽️',
    body: '👋',
    weather: '🌦️',
    objects: '🔧',
    general: '💬',
    etiquette: '🎩',
    customs: '🎭',
    business: '💼',
    holidays: '🎄',
    'daily-life': '🏠',
  };

  const startQuiz = () => {
    const shuffled = [...idioms].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizIdioms(shuffled);
    setCurrentQuizIndex(0);
    setQuizScore({ correct: 0, total: 0 });
    setSelectedAnswer(null);
    setQuizMode(true);
  };

  const getQuizOptions = (correctIdiom: Idiom): string[] => {
    const otherMeanings = idioms
      .filter(i => i.id !== correctIdiom.id)
      .map(i => i.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...otherMeanings, correctIdiom.meaning].sort(() => Math.random() - 0.5);
  };

  const handleQuizAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === quizIdioms[currentQuizIndex].meaning;
    setQuizScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizIdioms.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizMode(false);
    }
  };

  // Quiz view
  if (quizMode && quizIdioms.length > 0) {
    const currentIdiom = quizIdioms[currentQuizIndex];
    const options = getQuizOptions(currentIdiom);
    const isComplete = currentQuizIndex >= quizIdioms.length - 1 && selectedAnswer;
    
    if (isComplete) {
      const percentage = Math.round((quizScore.correct / quizScore.total) * 100);
      return (
        <div className="min-h-screen bg-background safe-area-inset">
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="container px-4 py-3">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setQuizMode(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="font-heading font-bold text-lg">Quiz Results</h1>
              </div>
            </div>
          </header>

          <main className="container px-4 py-12 text-center space-y-6">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
            </div>
            <h2 className="font-heading text-2xl font-bold">
              {percentage >= 80 ? 'Ausgezeichnet!' : percentage >= 50 ? 'Gut gemacht!' : 'Weiter üben!'}
            </h2>
            <p className="text-3xl font-bold text-primary">
              {quizScore.correct} / {quizScore.total}
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button onClick={startQuiz}>Try Again</Button>
              <Button variant="outline" onClick={() => setQuizMode(false)}>Back to Learning</Button>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => setQuizMode(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentQuizIndex + 1} / {quizIdioms.length}
              </span>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 space-y-6">
          <Card className="card-elevated">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-2">{categoryIcons[currentIdiom.category]} Idiom</Badge>
              <CardTitle className="text-2xl">{currentIdiom.german}</CardTitle>
              <p className="text-sm text-muted-foreground italic">
                Literally: "{currentIdiom.literal}"
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center font-medium">What does this idiom mean?</p>
              <div className="grid gap-3">
                {options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedAnswer
                        ? option === currentIdiom.meaning
                          ? 'default'
                          : option === selectedAnswer
                          ? 'destructive'
                          : 'outline'
                        : 'outline'
                    }
                    className="h-auto py-3 px-4 text-left justify-start"
                    onClick={() => handleQuizAnswer(option)}
                    disabled={!!selectedAnswer}
                  >
                    {selectedAnswer && option === currentIdiom.meaning && (
                      <Check className="w-4 h-4 mr-2 shrink-0" />
                    )}
                    {selectedAnswer && option === selectedAnswer && option !== currentIdiom.meaning && (
                      <X className="w-4 h-4 mr-2 shrink-0" />
                    )}
                    <span className="text-sm">{option}</span>
                  </Button>
                ))}
              </div>

              {selectedAnswer && (
                <div className="bg-muted/50 p-4 rounded-xl space-y-2">
                  <p className="font-medium">Example:</p>
                  <p className="italic">{currentIdiom.example}</p>
                  <p className="text-sm text-muted-foreground">{currentIdiom.exampleTranslation}</p>
                </div>
              )}

              {selectedAnswer && (
                <Button onClick={handleNextQuestion} className="w-full">
                  {currentQuizIndex < quizIdioms.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇩🇪</span>
              <h1 className="font-heading font-bold text-lg">Culture & Idioms</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="idioms" className="gap-1">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Idioms</span>
            </TabsTrigger>
            <TabsTrigger value="proverbs" className="gap-1">
              <Scroll className="w-4 h-4" />
              <span className="hidden sm:inline">Proverbs</span>
            </TabsTrigger>
            <TabsTrigger value="culture" className="gap-1">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Culture</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="idioms" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{idioms.length} expressions</p>
              <Button size="sm" onClick={startQuiz}>Quiz Me</Button>
            </div>
            
            <div className="space-y-3">
              {idioms.map(idiom => (
                <Card key={idiom.id} className="overflow-hidden">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-lg">{idiom.german}</p>
                        <p className="text-sm text-muted-foreground italic">
                          Literally: "{idiom.literal}"
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {categoryIcons[idiom.category]}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium">{idiom.meaning}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm italic">{idiom.example}</p>
                      <p className="text-xs text-muted-foreground mt-1">{idiom.exampleTranslation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proverbs" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">{proverbs.length} proverbs</p>
            
            <div className="space-y-3">
              {proverbs.map(proverb => (
                <Card key={proverb.id}>
                  <CardContent className="p-4 space-y-2">
                    <p className="font-bold text-lg">{proverb.german}</p>
                    <p className="text-primary">{proverb.english}</p>
                    <p className="text-sm text-muted-foreground">{proverb.meaning}</p>
                    <Badge variant="outline" className="text-xs">{proverb.usage}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="culture" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">{culturalTips.length} cultural tips</p>
            
            <Accordion type="single" collapsible className="space-y-2">
              {culturalTips.map(tip => (
                <AccordionItem key={tip.id} value={tip.id} className="border rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">{tip.titleDe}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    <p className="text-sm">{tip.content}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-correct/10 p-3 rounded-lg">
                        <p className="font-medium text-correct flex items-center gap-1 mb-2">
                          <Check className="w-4 h-4" /> Do
                        </p>
                        <ul className="text-sm space-y-1">
                          {tip.dos.map((d, idx) => (
                            <li key={idx}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-incorrect/10 p-3 rounded-lg">
                        <p className="font-medium text-incorrect flex items-center gap-1 mb-2">
                          <X className="w-4 h-4" /> Don't
                        </p>
                        <ul className="text-sm space-y-1">
                          {tip.donts.map((d, idx) => (
                            <li key={idx}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CultureIdioms;
