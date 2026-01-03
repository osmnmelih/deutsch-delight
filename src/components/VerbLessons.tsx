import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Volume2, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Info
} from 'lucide-react';
import { verbs, Verb, TenseType, tenseInfo, akkusativVerbs, dativVerbs, akkusativDativVerbs, genitivVerbs, CaseVerb } from '@/data/verbs';
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

const allTenses: TenseType[] = ['präsens', 'präteritum', 'perfekt', 'plusquamperfekt', 'futurI', 'futurII', 'konjunktivI', 'konjunktivII'];

type ViewMode = 'verbs' | 'akkusativ' | 'dativ' | 'akkusativ+dativ' | 'genitiv';

export const VerbLessons = ({ onBack }: VerbLessonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedVerb, setExpandedVerb] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<TenseType>('präsens');
  const [showTenseInfo, setShowTenseInfo] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('verbs');
  
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
    const tense = selectedTense;
    
    // Handle compound tenses (Perfekt, Plusquamperfekt, Futur II)
    if (tense === 'perfekt' || tense === 'plusquamperfekt') {
      const tenseData = verb[tense];
      const auxiliaryConjugation = tense === 'perfekt' 
        ? (tenseData.auxiliary === 'haben' 
          ? { ich: 'habe', du: 'hast', 'er/sie/es': 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' }
          : { ich: 'bin', du: 'bist', 'er/sie/es': 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' })
        : (tenseData.auxiliary === 'haben'
          ? { ich: 'hatte', du: 'hattest', 'er/sie/es': 'hatte', wir: 'hatten', ihr: 'hattet', sie: 'hatten' }
          : { ich: 'war', du: 'warst', 'er/sie/es': 'war', wir: 'waren', ihr: 'wart', sie: 'waren' });
      
      return (
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Formation</p>
            <p className="font-medium">{tenseData.auxiliary} + {tenseData.participle}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {pronouns.map(pronoun => (
              <button
                key={pronoun}
                onClick={() => handleSpeak(`${pronoun} ${auxiliaryConjugation[pronoun]} ${tenseData.participle}`)}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="text-left">
                  <span className="text-muted-foreground text-sm">{pronoun}</span>
                  <p className="font-medium">{auxiliaryConjugation[pronoun]} {tenseData.participle}</p>
                </div>
                {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (tense === 'futurII') {
      const auxiliary = verb.perfekt.auxiliary;
      const participle = verb.perfekt.participle;
      const werdenConjugation = { ich: 'werde', du: 'wirst', 'er/sie/es': 'wird', wir: 'werden', ihr: 'werdet', sie: 'werden' };
      
      return (
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Formation</p>
            <p className="font-medium">werden + {participle} + {auxiliary}</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {pronouns.map(pronoun => (
              <button
                key={pronoun}
                onClick={() => handleSpeak(`${pronoun} ${werdenConjugation[pronoun]} ${participle} ${auxiliary}`)}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="text-left">
                  <span className="text-muted-foreground text-sm">{pronoun}</span>
                  <p className="font-medium">{werdenConjugation[pronoun]} {participle} {auxiliary}</p>
                </div>
                {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Handle simple tenses with conjugation tables
    const conjugation = verb[tense as 'präsens' | 'präteritum' | 'futurI' | 'konjunktivI' | 'konjunktivII'];
    
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {pronouns.map(pronoun => (
          <button
            key={pronoun}
            onClick={() => handleSpeak(`${pronoun} ${conjugation[pronoun]}`)}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="text-left">
              <span className="text-muted-foreground text-sm">{pronoun}</span>
              <p className="font-medium">{conjugation[pronoun]}</p>
            </div>
            {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
          </button>
        ))}
      </div>
    );
  };

  const renderCaseVerbCard = (verb: CaseVerb) => {
    const isExpanded = expandedVerb === verb.id;
    
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
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            {verb.notes && (
              <div className="mb-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {verb.notes}
                </p>
              </div>
            )}
            <p className="text-sm font-medium text-muted-foreground mb-2">Examples</p>
            {verb.examples.map((example, i) => (
              <button
                key={i}
                onClick={() => handleSpeak(example.german)}
                className="w-full p-3 bg-muted/30 rounded-xl mb-2 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">
                    {example.german.split(example.highlight).map((part, idx, arr) => (
                      <span key={idx}>
                        {part}
                        {idx < arr.length - 1 && (
                          <span className="bg-primary/20 text-primary font-bold px-1 rounded">
                            {example.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-muted-foreground">{example.english}</p>
                  <p className="text-xs text-primary mt-1">
                    {viewMode === 'akkusativ+dativ' ? 'DAT + AKK: ' : viewMode.toUpperCase() + ': '}
                    {example.highlight}
                  </p>
                </div>
                {isSupported && <Volume2 className="w-4 h-4 text-muted-foreground" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getCaseVerbs = (): CaseVerb[] => {
    switch (viewMode) {
      case 'akkusativ': return akkusativVerbs;
      case 'dativ': return dativVerbs;
      case 'akkusativ+dativ': return akkusativDativVerbs;
      case 'genitiv': return genitivVerbs;
      default: return [];
    }
  };

  const getCaseInfo = () => {
    switch (viewMode) {
      case 'akkusativ':
        return {
          title: 'Akkusativ Verbs',
          titleDe: 'Verben mit Akkusativ',
          description: 'These verbs require a direct object in the accusative case.',
          question: 'Wen? / Was? (Whom? / What?)'
        };
      case 'dativ':
        return {
          title: 'Dativ Verbs',
          titleDe: 'Verben mit Dativ',
          description: 'These verbs require an indirect object in the dative case.',
          question: 'Wem? (To/For whom?)'
        };
      case 'akkusativ+dativ':
        return {
          title: 'Akkusativ + Dativ Verbs',
          titleDe: 'Verben mit Akkusativ und Dativ',
          description: 'These verbs take both a direct object (accusative) and an indirect object (dative).',
          question: 'Wem? + Wen/Was?'
        };
      case 'genitiv':
        return {
          title: 'Genitiv Verbs',
          titleDe: 'Verben mit Genitiv',
          description: 'These formal/literary verbs require the genitive case. Often replaced with other constructions in spoken German.',
          question: 'Wessen? (Whose?)'
        };
      default:
        return null;
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
              <p className="text-sm text-muted-foreground">All tenses from A1 to B2 level</p>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <button
            onClick={() => setViewMode('verbs')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              viewMode === 'verbs' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Verbs
          </button>
          <button
            onClick={() => setViewMode('akkusativ')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              viewMode === 'akkusativ' 
                ? 'bg-die text-die-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Akkusativ
          </button>
          <button
            onClick={() => setViewMode('dativ')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              viewMode === 'dativ' 
                ? 'bg-der text-der-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Dativ
          </button>
          <button
            onClick={() => setViewMode('akkusativ+dativ')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              viewMode === 'akkusativ+dativ' 
                ? 'bg-das text-das-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Akk + Dat
          </button>
          <button
            onClick={() => setViewMode('genitiv')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              viewMode === 'genitiv' 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Genitiv
          </button>
        </div>

        {viewMode === 'verbs' ? (
          <>
            {/* Tense Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Select Tense</p>
                <button
                  onClick={() => setShowTenseInfo(!showTenseInfo)}
                  className="text-xs text-primary flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  {showTenseInfo ? 'Hide info' : 'Show info'}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {allTenses.map(tense => {
                  const info = tenseInfo[tense];
                  return (
                    <button
                      key={tense}
                      onClick={() => setSelectedTense(tense)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        selectedTense === tense 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <p className="font-medium text-sm">{info.nameDe}</p>
                      <p className="text-xs opacity-80">{info.name}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                        selectedTense === tense ? 'bg-primary-foreground/20' : 'bg-background/50'
                      }`}>
                        {info.level}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {showTenseInfo && (
                <div className="p-4 bg-muted/50 rounded-xl animate-fade-in">
                  <h3 className="font-bold mb-1">{tenseInfo[selectedTense].nameDe} ({tenseInfo[selectedTense].name})</h3>
                  <p className="text-sm text-muted-foreground mb-2">{tenseInfo[selectedTense].description}</p>
                  <p className="text-xs bg-background/50 p-2 rounded font-mono">{tenseInfo[selectedTense].formation}</p>
                </div>
              )}
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
                All Types
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
                        {verb.caseRequired && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{verb.caseRequired}
                          </span>
                        )}
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
                          {verb.examples
                            .filter(ex => !ex.tense || ex.tense === selectedTense)
                            .slice(0, 3)
                            .map((example, i) => (
                            <button
                              key={i}
                              onClick={() => handleSpeak(example.german)}
                              className="w-full p-3 bg-muted/30 rounded-xl mb-2 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                            >
                              <div>
                                <p className="font-medium">{example.german}</p>
                                <p className="text-sm text-muted-foreground">{example.english}</p>
                                {example.tense && (
                                  <span className="text-xs text-primary">{tenseInfo[example.tense].nameDe}</span>
                                )}
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
          </>
        ) : (
          <>
            {/* Case Verbs View */}
            {getCaseInfo() && (
              <div className="p-4 bg-muted/50 rounded-xl">
                <h3 className="font-bold">{getCaseInfo()!.title}</h3>
                <p className="text-sm text-primary font-medium">{getCaseInfo()!.titleDe}</p>
                <p className="text-sm text-muted-foreground mt-2">{getCaseInfo()!.description}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Question: </span>
                  <span className="text-primary">{getCaseInfo()!.question}</span>
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              {getCaseVerbs().map(renderCaseVerbCard)}
            </div>
          </>
        )}

        {/* Bottom Spacing */}
        <div className="h-8" />
      </main>
    </div>
  );
};
