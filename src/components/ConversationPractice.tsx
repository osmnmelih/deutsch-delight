import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, RotateCcw, CheckCircle, Volume2, MessageCircle, BookOpen, Users, ChevronRight, Lightbulb, X } from 'lucide-react';
import { conversationScenarios, ConversationScenario, DialogueLine } from '@/data/conversations';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface ConversationPracticeProps {
  onBack: () => void;
}

type ViewMode = 'levels' | 'scenarios' | 'learn' | 'practice';

export const ConversationPractice = ({ onBack }: ConversationPracticeProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('levels');
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [completedPractices, setCompletedPractices] = useState<number[]>([]);

  const { speakSentence, isSpeaking } = useAudioPronunciation();

  const levels = [
    { id: 'A1', title: 'Beginner', titleDe: 'Anfänger', color: 'bg-correct', count: conversationScenarios.filter(s => s.level === 'A1').length },
    { id: 'A2', title: 'Elementary', titleDe: 'Grundlegend', color: 'bg-primary', count: conversationScenarios.filter(s => s.level === 'A2').length },
    { id: 'B1', title: 'Intermediate', titleDe: 'Mittelstufe', color: 'bg-accent', count: conversationScenarios.filter(s => s.level === 'B1').length },
    { id: 'B2', title: 'Upper Intermediate', titleDe: 'Obere Mittelstufe', color: 'bg-incorrect', count: conversationScenarios.filter(s => s.level === 'B2').length },
  ];

  const filteredScenarios = useMemo(() => {
    if (!selectedLevel) return [];
    return conversationScenarios.filter(s => s.level === selectedLevel);
  }, [selectedLevel]);

  const handleSelectLevel = (level: 'A1' | 'A2' | 'B1' | 'B2') => {
    setSelectedLevel(level);
    setViewMode('scenarios');
  };

  const handleSelectScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setCurrentLineIndex(0);
    setShowTranslation(false);
    setViewMode('learn');
  };

  const handleStartPractice = () => {
    setPracticeIndex(0);
    setUserResponse('');
    setShowHints(false);
    setFeedback(null);
    setCompletedPractices([]);
    setViewMode('practice');
  };

  const handleCheckAnswer = () => {
    if (!selectedScenario) return;
    const currentPrompt = selectedScenario.practicePrompts[practiceIndex];
    const isCorrect = userResponse.toLowerCase().trim() === currentPrompt.expectedResponse.toLowerCase().trim() ||
      userResponse.toLowerCase().includes(currentPrompt.expectedResponse.toLowerCase().split(' ').slice(0, 3).join(' '));
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setCompletedPractices([...completedPractices, practiceIndex]);
    }
  };

  const handleNextPractice = () => {
    if (!selectedScenario) return;
    if (practiceIndex < selectedScenario.practicePrompts.length - 1) {
      setPracticeIndex(practiceIndex + 1);
      setUserResponse('');
      setShowHints(false);
      setFeedback(null);
    }
  };

  const handleBackToScenarios = () => {
    setViewMode('scenarios');
    setSelectedScenario(null);
  };

  const handleBackToLevels = () => {
    setViewMode('levels');
    setSelectedLevel(null);
  };

  // Level Selection View
  if (viewMode === 'levels') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-xl font-bold">Conversation Practice</h1>
            <p className="text-sm text-muted-foreground">Gesprächsübung</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Learn real-world German conversations through dialogue scenarios and role-play exercises.
        </p>

        <div className="space-y-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleSelectLevel(level.id as 'A1' | 'A2' | 'B1' | 'B2')}
              className="w-full card-elevated p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${level.color} flex items-center justify-center`}>
                  <span className="text-white font-bold">{level.id}</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{level.title}</h3>
                  <p className="text-sm text-muted-foreground">{level.titleDe}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{level.count} scenarios</Badge>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        <Card className="p-4 mt-6 bg-primary/10 border-primary/20">
          <div className="flex gap-3">
            <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary">How it works</h4>
              <p className="text-sm text-muted-foreground mt-1">
                1. Read dialogues with translations<br />
                2. Learn key phrases and vocabulary<br />
                3. Practice responding to prompts<br />
                4. Build confidence for real conversations!
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Scenario Selection View
  if (viewMode === 'scenarios') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBackToLevels}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-xl font-bold">Level {selectedLevel}</h1>
            <p className="text-sm text-muted-foreground">{filteredScenarios.length} Scenarios</p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className="w-full card-elevated p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                {scenario.icon}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold">{scenario.title}</h3>
                <p className="text-sm text-muted-foreground">{scenario.titleDe}</p>
                <p className="text-xs text-muted-foreground mt-1">{scenario.context}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Learn Mode - Dialogue View
  if (viewMode === 'learn' && selectedScenario) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBackToScenarios}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-heading text-lg font-bold">{selectedScenario.title}</h1>
            <p className="text-xs text-muted-foreground">{selectedScenario.titleDe}</p>
          </div>
          <Badge>{selectedScenario.level}</Badge>
        </div>

        {/* Context */}
        <Card className="p-3 mb-4 bg-muted/50">
          <p className="text-sm"><strong>Context:</strong> {selectedScenario.context}</p>
          <p className="text-xs text-muted-foreground mt-1">{selectedScenario.contextDe}</p>
          <div className="flex gap-4 mt-2 text-xs">
            <span><Users className="w-3 h-3 inline mr-1" />{selectedScenario.roles.A}</span>
            <span><Users className="w-3 h-3 inline mr-1" />{selectedScenario.roles.B}</span>
          </div>
        </Card>

        {/* Dialogue */}
        <div className="space-y-3 mb-4">
          {selectedScenario.dialogue.map((line, index) => (
            <div
              key={index}
              className={`flex ${line.speaker === 'A' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  line.speaker === 'A'
                    ? 'bg-primary text-primary-foreground rounded-tl-sm'
                    : 'bg-muted rounded-tr-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs opacity-75">
                    {line.speaker === 'A' ? selectedScenario.roles.A : selectedScenario.roles.B}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-5 h-5 opacity-75 hover:opacity-100"
                    onClick={() => speakSentence(line.german)}
                    disabled={isSpeaking}
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="font-medium">{line.german}</p>
                {showTranslation && (
                  <p className={`text-sm mt-1 ${line.speaker === 'A' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {line.english}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={showTranslation ? 'secondary' : 'outline'}
            className="flex-1"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </Button>
        </div>

        {/* Key Phrases */}
        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            Key Phrases
          </h3>
          <div className="space-y-3">
            {selectedScenario.keyPhrases.map((phrase, index) => (
              <div key={index} className="border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{phrase.german}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-5 h-5"
                    onClick={() => speakSentence(phrase.german)}
                    disabled={isSpeaking}
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{phrase.english}</p>
                <p className="text-xs text-primary mt-1">{phrase.usage}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Practice Button */}
        <Button className="w-full" size="lg" onClick={handleStartPractice}>
          <Play className="w-5 h-5 mr-2" />
          Practice This Conversation
        </Button>
      </div>
    );
  }

  // Practice Mode
  if (viewMode === 'practice' && selectedScenario) {
    const currentPrompt = selectedScenario.practicePrompts[practiceIndex];
    const isComplete = practiceIndex === selectedScenario.practicePrompts.length - 1 && feedback === 'correct';

    if (isComplete) {
      return (
        <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-correct/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-correct" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2">Gut gemacht!</h2>
            <p className="text-muted-foreground mb-6">
              You've completed all practice prompts for this conversation!
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setViewMode('learn')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Review Dialogue
              </Button>
              <Button onClick={handleBackToScenarios}>
                Next Scenario
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setViewMode('learn')}>
            <X className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-heading text-lg font-bold">Role-Play Practice</h1>
            <p className="text-xs text-muted-foreground">{selectedScenario.title}</p>
          </div>
          <Badge variant="outline">
            {practiceIndex + 1} / {selectedScenario.practicePrompts.length}
          </Badge>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {selectedScenario.practicePrompts.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                completedPractices.includes(index)
                  ? 'bg-correct'
                  : index === practiceIndex
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Prompt */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-2">Situation:</h3>
          <p className="text-lg">{currentPrompt.situation}</p>
        </Card>

        {/* Response Input */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Your response in German:</label>
          <Input
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your answer..."
            className="text-lg h-12"
            disabled={feedback !== null}
          />
        </div>

        {/* Hints */}
        {showHints && !feedback && (
          <Card className="p-3 mb-4 bg-accent/10 border-accent/20">
            <h4 className="font-semibold text-accent mb-2">Hints:</h4>
            <ul className="text-sm space-y-1">
              {currentPrompt.hints.map((hint, index) => (
                <li key={index}>• {hint}</li>
              ))}
            </ul>
          </Card>
        )}

        {/* Feedback */}
        {feedback && (
          <Card className={`p-4 mb-4 ${feedback === 'correct' ? 'bg-correct/10 border-correct/20' : 'bg-incorrect/10 border-incorrect/20'}`}>
            <div className="flex items-center gap-2 mb-2">
              {feedback === 'correct' ? (
                <CheckCircle className="w-5 h-5 text-correct" />
              ) : (
                <X className="w-5 h-5 text-incorrect" />
              )}
              <span className={`font-semibold ${feedback === 'correct' ? 'text-correct' : 'text-incorrect'}`}>
                {feedback === 'correct' ? 'Richtig!' : 'Not quite...'}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm"><strong>Expected:</strong></p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{currentPrompt.expectedResponse}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => speakSentence(currentPrompt.expectedResponse)}
                  disabled={isSpeaking}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!feedback ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowHints(true)}
                disabled={showHints}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Show Hints
              </Button>
              <Button
                className="flex-1"
                onClick={handleCheckAnswer}
                disabled={!userResponse.trim()}
              >
                Check Answer
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFeedback(null);
                  setUserResponse('');
                  setShowHints(false);
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              {practiceIndex < selectedScenario.practicePrompts.length - 1 && (
                <Button className="flex-1" onClick={handleNextPractice}>
                  Next Prompt
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ConversationPractice;
