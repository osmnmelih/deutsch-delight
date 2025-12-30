import { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Volume2, Lightbulb, AlertCircle } from 'lucide-react';
import { grammarCategories, GrammarCategory, GrammarRule } from '@/data/grammar';
import { Button } from '@/components/ui/button';

interface GrammarLessonsProps {
  onBack: () => void;
}

export const GrammarLessons = ({ onBack }: GrammarLessonsProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('der-masculine');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      
      // Try to find a German voice
      const voices = speechSynthesis.getVoices();
      const germanVoice = voices.find(v => v.lang.startsWith('de')) || 
                          voices.find(v => v.lang.includes('DE'));
      if (germanVoice) {
        utterance.voice = germanVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryColors = (id: string) => {
    if (id.includes('der')) return { bg: 'bg-der/10', text: 'text-der', border: 'border-der/30' };
    if (id.includes('die')) return { bg: 'bg-die/10', text: 'text-die', border: 'border-die/30' };
    return { bg: 'bg-das/10', text: 'text-das', border: 'border-das/30' };
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedRule(null);
  };

  const toggleRule = (ruleId: string) => {
    setExpandedRule(expandedRule === ruleId ? null : ruleId);
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold">Grammar Patterns</h1>
            <p className="text-sm text-muted-foreground">Learn der, die, das rules</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="p-4 border-b border-border/50">
        <div className="card-elevated p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-1">Why Learn Patterns?</h3>
              <p className="text-sm text-muted-foreground">
                While some articles must be memorized, many German nouns follow predictable patterns based on their endings. 
                Learning these rules can help you guess the correct article for new words!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {grammarCategories.map((category, catIndex) => {
          const colors = getCategoryColors(category.id);
          const isExpanded = expandedCategory === category.id;
          
          return (
            <div 
              key={category.id}
              className={`rounded-2xl border ${colors.border} overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full p-4 ${colors.bg} flex items-center justify-between transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-heading font-bold ${colors.text}`}>
                    {category.title.split(' ')[0]}
                  </span>
                  <div className="text-left">
                    <h3 className="font-heading font-semibold">{category.title.split('(')[1]?.replace(')', '') || ''}</h3>
                    <p className="text-xs text-muted-foreground">{category.rules.length} patterns</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Category Rules */}
              {isExpanded && (
                <div className="bg-card p-3 space-y-2">
                  {category.rules.map((rule) => (
                    <RuleCard 
                      key={rule.id}
                      rule={rule}
                      colors={colors}
                      isExpanded={expandedRule === rule.id}
                      onToggle={() => toggleRule(rule.id)}
                      onSpeak={speakText}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Tips Section */}
        <div className="card-elevated p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-semibold mb-2">Remember!</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• These patterns work for ~80% of nouns</li>
                <li>• Some words have exceptions - always check!</li>
                <li>• Compound nouns take the article of the last word</li>
                <li>• When in doubt, look it up and practice!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
};

interface RuleCardProps {
  rule: GrammarRule;
  colors: { bg: string; text: string; border: string };
  isExpanded: boolean;
  onToggle: () => void;
  onSpeak: (text: string) => void;
}

const RuleCard = ({ rule, colors, isExpanded, onToggle, onSpeak }: RuleCardProps) => {
  return (
    <div className={`rounded-xl border ${colors.border} overflow-hidden bg-background`}>
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`font-mono font-bold ${colors.text}`}>{rule.pattern}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 pt-0 space-y-3">
          <p className="text-sm text-muted-foreground">{rule.explanation}</p>
          
          {/* Examples */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">EXAMPLES</p>
            <div className="space-y-1">
              {rule.examples.map((example, i) => {
                const germanPart = example.split('(')[0].trim();
                return (
                  <div 
                    key={i}
                    className="flex items-center justify-between bg-muted/30 rounded-lg p-2"
                  >
                    <span className="text-sm">{example}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSpeak(germanPart);
                      }}
                      className="p-1.5 rounded-full hover:bg-muted transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exceptions */}
          {rule.exceptions && rule.exceptions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-incorrect mb-2">EXCEPTIONS</p>
              <div className="flex flex-wrap gap-2">
                {rule.exceptions.map((exception, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(exception);
                    }}
                    className="text-xs bg-incorrect/10 text-incorrect px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {exception}
                    <Volume2 className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
