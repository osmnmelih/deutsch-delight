import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PenLine, 
  ArrowLeft, 
  Lightbulb,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  RotateCcw
} from 'lucide-react';
import { writingPrompts, WritingPrompt, commonMistakes } from '@/data/writingPrompts';

type Level = 'A1' | 'A2' | 'B1' | 'B2';
type Category = WritingPrompt['category'];

interface WritingPracticeProps {
  onBack: () => void;
}

const WritingPractice: React.FC<WritingPracticeProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [userText, setUserText] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const levels: { level: Level; color: string; description: string }[] = [
    { level: 'A1', color: 'bg-green-500', description: 'Einfache Texte' },
    { level: 'A2', color: 'bg-blue-500', description: 'Alltägliche Themen' },
    { level: 'B1', color: 'bg-yellow-500', description: 'Meinungen & Berichte' },
    { level: 'B2', color: 'bg-orange-500', description: 'Komplexe Essays' },
  ];

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'description', label: 'Beschreibung', icon: '📝' },
    { id: 'email', label: 'E-Mail', icon: '📧' },
    { id: 'story', label: 'Geschichte', icon: '📖' },
    { id: 'opinion', label: 'Meinung', icon: '💭' },
    { id: 'formal', label: 'Formell', icon: '📋' },
  ];

  const getPromptsByLevel = (level: Level) => writingPrompts.filter(p => p.level === level);
  
  const getLevelColor = (level: Level) => {
    switch (level) {
      case 'A1': return 'bg-green-500';
      case 'A2': return 'bg-blue-500';
      case 'B1': return 'bg-yellow-500';
      case 'B2': return 'bg-orange-500';
    }
  };

  const getCategoryIcon = (category: Category) => {
    return categories.find(c => c.id === category)?.icon || '📝';
  };

  const wordCount = useMemo(() => {
    return userText.trim().split(/\s+/).filter(w => w.length > 0).length;
  }, [userText]);

  const characterCount = useMemo(() => {
    return userText.length;
  }, [userText]);

  const getWordCountStatus = () => {
    if (!selectedPrompt) return 'neutral';
    const { min, max } = selectedPrompt.wordCountTarget;
    if (wordCount < min) return 'low';
    if (wordCount > max) return 'high';
    return 'good';
  };

  const analyzeText = () => {
    const suggestions: { type: string; message: string }[] = [];
    
    // Check for common issues
    if (userText.length > 0) {
      // Check sentence start capitalization
      const sentences = userText.split(/[.!?]+/).filter(s => s.trim());
      sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (trimmed && trimmed[0] !== trimmed[0].toUpperCase()) {
          suggestions.push({
            type: 'grammar',
            message: 'Sätze sollten mit einem Großbuchstaben beginnen.',
          });
        }
      });

      // Check for "ich" not at start of sentence
      const ichMatches = userText.match(/[.!?]\s+ich\s/gi);
      if (ichMatches) {
        suggestions.push({
          type: 'grammar',
          message: '"Ich" am Satzanfang muss großgeschrieben werden.',
        });
      }

      // Check verb position hints
      if (userText.includes('weil') || userText.includes('dass') || userText.includes('obwohl')) {
        suggestions.push({
          type: 'tip',
          message: 'Bei Nebensätzen mit "weil", "dass", "obwohl" steht das Verb am Ende.',
        });
      }

      // Check for Perfekt usage
      if (selectedPrompt && (selectedPrompt.level === 'A2' || selectedPrompt.level === 'B1')) {
        if (!userText.match(/\b(habe|hat|haben|bin|ist|sind)\s+\w+t\b/i) && 
            (selectedPrompt.category === 'story' || userText.toLowerCase().includes('gestern'))) {
          suggestions.push({
            type: 'tip',
            message: 'Für die Vergangenheit: Verwenden Sie das Perfekt (z.B. "Ich habe gemacht", "Ich bin gegangen").',
          });
        }
      }
    }

    return suggestions;
  };

  const handleReset = () => {
    setUserText('');
    setShowFeedback(false);
  };

  // Level Selection View
  if (!selectedLevel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <PenLine className="h-6 w-6 text-primary" />
              Schreibübung
            </h1>
            <p className="text-muted-foreground">Wählen Sie Ihr Niveau</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map(({ level, color, description }) => {
            const prompts = getPromptsByLevel(level);
            return (
              <Card 
                key={level}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                onClick={() => setSelectedLevel(level)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={`${color} text-white text-lg px-3 py-1`}>{level}</Badge>
                    <span className="text-muted-foreground">{prompts.length} Übungen</span>
                  </div>
                  <CardTitle className="text-lg">{description}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(prompts.map(p => p.category))].map(cat => (
                      <Badge key={cat} variant="outline">
                        {getCategoryIcon(cat)} {categories.find(c => c.id === cat)?.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Prompt Selection View
  if (!selectedPrompt) {
    const prompts = getPromptsByLevel(selectedLevel);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Badge className={`${getLevelColor(selectedLevel)} text-white`}>{selectedLevel}</Badge>
              Thema auswählen
            </h1>
            <p className="text-muted-foreground">{prompts.length} Schreibübungen</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {prompts.map(prompt => (
            <Card 
              key={prompt.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01]"
              onClick={() => {
                setSelectedPrompt(prompt);
                setUserText('');
                setShowFeedback(false);
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getCategoryIcon(prompt.category)} {prompt.title}
                  </CardTitle>
                  <Badge variant="outline">
                    {prompt.wordCountTarget.min}-{prompt.wordCountTarget.max} Wörter
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{prompt.prompt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Writing View
  const feedback = showFeedback ? analyzeText() : [];
  const wordStatus = getWordCountStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setSelectedPrompt(null)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold flex items-center gap-2">
            {getCategoryIcon(selectedPrompt.category)} {selectedPrompt.title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor(selectedPrompt.level)}>{selectedPrompt.level}</Badge>
            <Badge variant="outline">
              <Target className="h-3 w-3 mr-1" />
              {selectedPrompt.wordCountTarget.min}-{selectedPrompt.wordCountTarget.max} Wörter
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Writing Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedPrompt.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Schreiben Sie hier Ihren Text..."
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                className="min-h-[300px] text-lg leading-relaxed"
              />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${
                    wordStatus === 'good' ? 'text-green-600' :
                    wordStatus === 'low' ? 'text-yellow-600' :
                    wordStatus === 'high' ? 'text-orange-600' : ''
                  }`}>
                    {wordCount} Wörter
                  </span>
                  <span className="text-muted-foreground">{characterCount} Zeichen</span>
                </div>
                <Progress 
                  value={Math.min((wordCount / selectedPrompt.wordCountTarget.max) * 100, 100)} 
                  className="w-32"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowFeedback(true)}
                  disabled={wordCount < 5}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Feedback anzeigen
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Zurücksetzen
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hilfe
                </Button>
              </div>

              {/* Feedback Section */}
              {showFeedback && feedback.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    Tipps & Hinweise
                  </h4>
                  {feedback.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg text-sm ${
                        item.type === 'grammar' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}
                    >
                      {item.message}
                    </div>
                  ))}
                </div>
              )}

              {showFeedback && feedback.length === 0 && wordCount >= 5 && (
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <p className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle2 className="h-5 w-5" />
                    Gut gemacht! Keine offensichtlichen Fehler gefunden.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Help Panel */}
        <div className="space-y-4">
          {showHelp && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Tipps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {selectedPrompt.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nützliche Vokabeln</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {selectedPrompt.vocabularySuggestions.map((vocab, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="font-medium">{vocab.german}</span>
                        <span className="text-muted-foreground">{vocab.english}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Grammatik-Tipps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {selectedPrompt.grammarTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Beispielsätze</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm italic">
                    {selectedPrompt.exampleSentences.map((sentence, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        "{sentence}"
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {!showHelp && (
            <Card className="text-center py-8">
              <CardContent>
                <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Klicken Sie auf "Hilfe" für Vokabeln, Grammatik-Tipps und Beispielsätze.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingPractice;
