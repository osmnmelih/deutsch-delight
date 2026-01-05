import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Lightbulb,
  BookMarked,
  Trophy
} from 'lucide-react';
import { readingTexts, ReadingText } from '@/data/readingTexts';

type Level = 'A1' | 'A2' | 'B1' | 'B2';

interface ReadingComprehensionProps {
  onBack: () => void;
}

const ReadingComprehension: React.FC<ReadingComprehensionProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);

  const levels: { level: Level; color: string; description: string }[] = [
    { level: 'A1', color: 'bg-green-500', description: 'Anfänger - Einfache Texte' },
    { level: 'A2', color: 'bg-blue-500', description: 'Grundstufe - Alltägliche Themen' },
    { level: 'B1', color: 'bg-yellow-500', description: 'Mittelstufe - Komplexere Texte' },
    { level: 'B2', color: 'bg-orange-500', description: 'Fortgeschritten - Anspruchsvolle Texte' },
  ];

  const getTextsByLevel = (level: Level) => readingTexts.filter(t => t.level === level);

  const handleSelectText = (text: ReadingText) => {
    setSelectedText(text);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setShowVocabulary(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !selectedText) return;
    setShowResult(true);
    if (selectedAnswer === selectedText.questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedText) return;
    if (currentQuestionIndex < selectedText.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const getLevelColor = (level: Level) => {
    switch (level) {
      case 'A1': return 'bg-green-500';
      case 'A2': return 'bg-blue-500';
      case 'B1': return 'bg-yellow-500';
      case 'B2': return 'bg-orange-500';
    }
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
              <BookOpen className="h-6 w-6 text-primary" />
              Leseverständnis
            </h1>
            <p className="text-muted-foreground">Wählen Sie Ihr Niveau</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map(({ level, color, description }) => {
            const texts = getTextsByLevel(level);
            return (
              <Card 
                key={level}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                onClick={() => setSelectedLevel(level)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={`${color} text-white text-lg px-3 py-1`}>{level}</Badge>
                    <span className="text-muted-foreground">{texts.length} Texte</span>
                  </div>
                  <CardTitle className="text-lg">{description}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {texts.slice(0, 3).map(text => (
                      <Badge key={text.id} variant="outline">{text.topic}</Badge>
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

  // Text Selection View
  if (!selectedText) {
    const texts = getTextsByLevel(selectedLevel);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Badge className={`${getLevelColor(selectedLevel)} text-white`}>{selectedLevel}</Badge>
              Texte auswählen
            </h1>
            <p className="text-muted-foreground">{texts.length} Texte verfügbar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {texts.map(text => (
            <Card 
              key={text.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01]"
              onClick={() => handleSelectText(text)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{text.title}</CardTitle>
                  <Badge variant="outline">{text.topic}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{text.text.substring(0, 150)}...</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{text.questions.length} Fragen</span>
                  <span>{text.vocabulary.length} Vokabeln</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Quiz Completed View
  if (quizCompleted) {
    const percentage = Math.round((correctAnswers / selectedText.questions.length) * 100);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedText(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Ergebnis</h1>
        </div>

        <Card className="text-center py-8">
          <CardContent className="space-y-6">
            <Trophy className={`h-16 w-16 mx-auto ${percentage >= 70 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            <div>
              <h2 className="text-3xl font-bold">{correctAnswers} / {selectedText.questions.length}</h2>
              <p className="text-xl text-muted-foreground">{percentage}% richtig</p>
            </div>
            <Progress value={percentage} className="w-full max-w-xs mx-auto" />
            <p className="text-lg">
              {percentage >= 90 ? 'Ausgezeichnet! 🎉' :
               percentage >= 70 ? 'Gut gemacht! 👍' :
               percentage >= 50 ? 'Nicht schlecht! 📚' :
               'Übung macht den Meister! 💪'}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={handleRestart}>
                Nochmal versuchen
              </Button>
              <Button onClick={() => setSelectedText(null)}>
                Anderen Text wählen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Reading and Quiz View
  const currentQuestion = selectedText.questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setSelectedText(null)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{selectedText.title}</h1>
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor(selectedText.level)}>{selectedText.level}</Badge>
            <Badge variant="outline">{selectedText.topic}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="h-5 w-5" />
              Text
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowVocabulary(!showVocabulary)}
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              Vokabeln
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {selectedText.text}
              </p>
            </ScrollArea>

            {showVocabulary && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">Vokabeln:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedText.vocabulary.map((vocab, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{vocab.german}</span>
                      <span className="text-muted-foreground"> - {vocab.english}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Frage {currentQuestionIndex + 1} von {selectedText.questions.length}</CardTitle>
              <Progress 
                value={((currentQuestionIndex + 1) / selectedText.questions.length) * 100} 
                className="w-24"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>

            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                let buttonClass = 'w-full justify-start text-left h-auto py-3';
                
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += ' bg-green-100 dark:bg-green-900/30 border-green-500';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += ' bg-red-100 dark:bg-red-900/30 border-red-500';
                  }
                } else if (isSelected) {
                  buttonClass += ' border-primary bg-primary/10';
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showResult}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                      {option}
                    </span>
                  </Button>
                );
              })}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                <p className="font-medium">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✓ Richtig!' : '✗ Falsch!'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              {!showResult ? (
                <Button 
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                >
                  Prüfen
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < selectedText.questions.length - 1 ? (
                    <>Weiter <ChevronRight className="h-4 w-4 ml-1" /></>
                  ) : (
                    'Ergebnis anzeigen'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReadingComprehension;
