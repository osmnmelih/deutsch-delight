import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Volume2, Lightbulb, AlertCircle, BookOpen } from 'lucide-react';
import { grammarCategories, caseRules, comparisonRules, GrammarRule, CaseRule, ComparisonRule } from '@/data/grammar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GrammarLessonsProps {
  onBack: () => void;
}

type TabType = 'articles' | 'cases' | 'comparison';

export const GrammarLessons = ({ onBack }: GrammarLessonsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('der-masculine');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>('nominativ');

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
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
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold">Grammar</h1>
            <p className="text-sm text-muted-foreground">Articles, cases & comparison</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          {[
            { id: 'articles', label: 'Articles' },
            { id: 'cases', label: 'Cases' },
            { id: 'comparison', label: 'Comparison' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'articles' && (
          <>
            {grammarCategories.map((category, catIndex) => {
              const colors = getCategoryColors(category.id);
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className={`rounded-2xl border ${colors.border} overflow-hidden`}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full p-4 ${colors.bg} flex items-center justify-between`}
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
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {isExpanded && (
                    <div className="bg-card p-3 space-y-2">
                      {category.rules.map((rule) => (
                        <RuleCard key={rule.id} rule={rule} colors={colors} isExpanded={expandedRule === rule.id} onToggle={() => toggleRule(rule.id)} onSpeak={speakText} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {activeTab === 'cases' && (
          <>
            <div className="card-elevated p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  German has 4 cases that change article forms. Learn which case to use based on the noun's role in the sentence.
                </p>
              </div>
            </div>
            
            {caseRules.map((caseRule) => (
              <CaseCard key={caseRule.id} caseRule={caseRule} isExpanded={expandedCase === caseRule.id} onToggle={() => setExpandedCase(expandedCase === caseRule.id ? null : caseRule.id)} onSpeak={speakText} />
            ))}
          </>
        )}

        {activeTab === 'comparison' && (
          <>
            <div className="card-elevated p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Compare adjectives using Komparativ (-er) and Superlativ (am -sten). Many short adjectives add umlauts.
                </p>
              </div>
            </div>
            
            {comparisonRules.map((rule) => (
              <ComparisonCard key={rule.id} rule={rule} onSpeak={speakText} />
            ))}
          </>
        )}
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

const RuleCard = ({ rule, colors, isExpanded, onToggle, onSpeak }: RuleCardProps) => (
  <div className={`rounded-xl border ${colors.border} overflow-hidden bg-background`}>
    <button onClick={onToggle} className="w-full p-3 flex items-center justify-between hover:bg-muted/50">
      <span className={`font-mono font-bold ${colors.text}`}>{rule.pattern}</span>
      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
    {isExpanded && (
      <div className="p-3 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground">{rule.explanation}</p>
        <div className="space-y-1">
          {rule.examples.map((example, i) => (
            <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg p-2">
              <span className="text-sm">{example}</span>
              <button onClick={() => onSpeak(example.split('(')[0].trim())} className="p-1.5 rounded-full hover:bg-muted">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
        {rule.exceptions && (
          <div className="flex flex-wrap gap-2">
            <p className="w-full text-xs font-semibold text-incorrect">EXCEPTIONS</p>
            {rule.exceptions.map((ex, i) => (
              <button key={i} onClick={() => onSpeak(ex)} className="text-xs bg-incorrect/10 text-incorrect px-2 py-1 rounded-full flex items-center gap-1">
                {ex} <Volume2 className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

interface CaseCardProps {
  caseRule: CaseRule;
  isExpanded: boolean;
  onToggle: () => void;
  onSpeak: (text: string) => void;
}

const CaseCard = ({ caseRule, isExpanded, onToggle, onSpeak }: CaseCardProps) => {
  const caseColors: Record<string, string> = {
    nominativ: 'bg-correct/10 border-correct/30',
    akkusativ: 'bg-primary/10 border-primary/30',
    dativ: 'bg-accent/10 border-accent/30',
    genitiv: 'bg-die/10 border-die/30',
  };

  return (
    <div className={`rounded-2xl border overflow-hidden ${caseColors[caseRule.case]}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-left">{caseRule.title}</h3>
          <p className="text-sm text-muted-foreground">{caseRule.question}</p>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4 bg-card">
          <p className="text-sm text-muted-foreground">{caseRule.explanation}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold">DEFINITE (der/die/das)</p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between bg-der/10 p-2 rounded"><span>M:</span><span className="font-bold">{caseRule.articleTable.masculine}</span></div>
                <div className="flex justify-between bg-die/10 p-2 rounded"><span>F:</span><span className="font-bold">{caseRule.articleTable.feminine}</span></div>
                <div className="flex justify-between bg-das/10 p-2 rounded"><span>N:</span><span className="font-bold">{caseRule.articleTable.neuter}</span></div>
                <div className="flex justify-between bg-muted p-2 rounded"><span>Pl:</span><span className="font-bold">{caseRule.articleTable.plural}</span></div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold">EIN / KEIN</p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between bg-der/10 p-2 rounded"><span>M:</span><span className="font-bold text-xs">{caseRule.einKeinTable.masculine}</span></div>
                <div className="flex justify-between bg-die/10 p-2 rounded"><span>F:</span><span className="font-bold text-xs">{caseRule.einKeinTable.feminine}</span></div>
                <div className="flex justify-between bg-das/10 p-2 rounded"><span>N:</span><span className="font-bold text-xs">{caseRule.einKeinTable.neuter}</span></div>
                <div className="flex justify-between bg-muted p-2 rounded"><span>Pl:</span><span className="font-bold text-xs">{caseRule.einKeinTable.plural}</span></div>
              </div>
            </div>
          </div>

          {caseRule.prepositions && (
            <div>
              <p className="text-xs font-semibold mb-2">PREPOSITIONS</p>
              <div className="flex flex-wrap gap-1">{caseRule.prepositions.map((p, i) => <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">{p}</span>)}</div>
            </div>
          )}
          
          <div>
            <p className="text-xs font-semibold mb-2">EXAMPLES</p>
            {caseRule.examples.map((ex, i) => (
              <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg p-2 mb-1">
                <span className="text-sm">{ex}</span>
                <button onClick={() => onSpeak(ex.split('(')[0].trim())} className="p-1"><Volume2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ComparisonCard = ({ rule, onSpeak }: { rule: ComparisonRule; onSpeak: (text: string) => void }) => (
  <div className="card-elevated p-4 space-y-3">
    <h3 className="font-heading font-bold">{rule.title}</h3>
    <p className="text-sm text-muted-foreground">{rule.formation}</p>
    
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Base</th>
            <th className="text-left py-2">Comparative</th>
            <th className="text-left py-2">Superlative</th>
          </tr>
        </thead>
        <tbody>
          {rule.examples.map((ex, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-2">{ex.base}</td>
              <td className="py-2 text-primary font-medium">{ex.comparative}</td>
              <td className="py-2 text-accent font-medium">{ex.superlative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {rule.irregulars && (
      <div>
        <p className="text-xs font-semibold text-incorrect mb-2">IRREGULAR FORMS</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {rule.irregulars.map((ex, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2">{ex.base} <span className="text-muted-foreground">({ex.english})</span></td>
                  <td className="py-2 text-primary font-medium">{ex.comparative}</td>
                  <td className="py-2 text-accent font-medium">{ex.superlative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);