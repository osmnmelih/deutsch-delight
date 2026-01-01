import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Volume2, 
  ChevronDown, 
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { verbs, Verb } from '@/data/verbs';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface VerbLessonsProps {
  onBack: () => void;
}

const categoryInfo = {
  regular: { title: 'Regular Verbs', titleDe: 'Regelmäßige Verben', color: 'bg-correct/10 text-correct' },
  irregular: { title: 'Irregular Verbs', titleDe: 'Unregelmäßige Verben', color: 'bg-primary/10 text-primary' },
  modal: { title: 'Modal Verbs', titleDe: 'Modalverben', color: 'bg-accent/10 text-accent' },
  separable: { title: 'Separable Verbs', titleDe: 'Trennbare Verben', color: 'bg-die/10 text-die' }
};

const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie'] as const;

export const VerbLessons = ({ onBack }: VerbLessonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedVerb, setExpandedVerb] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<'present' | 'perfect'>('present');
  
  const { speakWord, isSupported } = useAudioPronunciation();

  const categories = ['regular', 'irregular', 'modal', 'separable'];
  
  const filteredVerbs = selectedCategory 
    ? verbs.filter(v => v.category === selectedCategory)
    : verbs;

  const handleSpeak = (text: string) => {
    if (isSupported) {
      speakWord(text);
    }
  };

  const renderConjugationTable = (verb: Verb) => {
    if (selectedTense === 'present') {
      return (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {pronouns.map(pronoun => (
            <button
              key={pronoun}
              onClick={() => handleSpeak(`${pronoun} ${verb.present[pronoun]}`)}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="text-left">
                <span className="text-muted-foreground text-sm">{pronoun}</span>
                <p className="font-medium">{verb.present[pronoun]}</p>
              </div>
              {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
            </button>
          ))}
        </div>
      );
    } else {
      return (
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Auxiliary verb</p>
            <p className="font-bold text-lg">{verb.perfect.auxiliary}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Past participle</p>
            <button 
              onClick={() => handleSpeak(verb.perfect.participle)}
              className="flex items-center gap-2"
            >
              <p className="font-bold text-lg">{verb.perfect.participle}</p>
              {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Example</p>
            <button 
              onClick={() => handleSpeak(`Ich ${verb.perfect.auxiliary === 'haben' ? 'habe' : 'bin'} ${verb.perfect.participle}`)}
              className="flex items-center gap-2"
            >
              <p className="font-medium">
                Ich {verb.perfect.auxiliary === 'haben' ? 'habe' : 'bin'} {verb.perfect.participle}
              </p>
              {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="font-heading font-bold text-lg">Verb Conjugation</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Introduction */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-bold">German Verb Conjugation</h2>
              <p className="text-sm text-muted-foreground">Learn how verbs change with different subjects</p>
            </div>
          </div>
        </div>

        {/* Tense Toggle */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setSelectedTense('present')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              selectedTense === 'present' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Present Tense
          </button>
          <button
            onClick={() => setSelectedTense('perfect')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              selectedTense === 'perfect' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Perfect Tense
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !selectedCategory 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Verbs
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {categoryInfo[cat as keyof typeof categoryInfo].title}
            </button>
          ))}
        </div>

        {/* Verb List */}
        <div className="space-y-3">
          {filteredVerbs.map(verb => {
            const isExpanded = expandedVerb === verb.id;
            const catInfo = categoryInfo[verb.category as keyof typeof categoryInfo];
            
            return (
              <div key={verb.id} className="card-elevated overflow-hidden">
                <button
                  onClick={() => setExpandedVerb(isExpanded ? null : verb.id)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(verb.infinitive);
                      }}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="text-left">
                      <p className="font-bold text-lg">{verb.infinitive}</p>
                      <p className="text-sm text-muted-foreground">{verb.english}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${catInfo.color}`}>
                      {verb.category}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
                    {renderConjugationTable(verb)}
                    
                    {/* Examples */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Examples</p>
                      {verb.examples.map((example, i) => (
                        <button
                          key={i}
                          onClick={() => handleSpeak(example.german)}
                          className="w-full p-3 bg-muted/30 rounded-xl mb-2 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{example.german}</p>
                            <p className="text-sm text-muted-foreground">{example.english}</p>
                          </div>
                          {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </main>
    </div>
  );
};
