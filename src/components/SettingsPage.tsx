import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Mic, Target, Moon, Sun, Monitor, Gauge, User, LogIn, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SettingsPageProps {
  onBack: () => void;
}

// Settings stored in localStorage
const SETTINGS_KEY = 'deutschlernen_settings';

interface AppSettings {
  audioSpeed: number;
  voiceGender: 'female' | 'male';
  autoPlayAudio: boolean;
  dailyWordGoal: number;
  dailyQuizGoal: number;
  dailyMinutesGoal: number;
}

const defaultSettings: AppSettings = {
  audioSpeed: 0.88,
  voiceGender: 'female',
  autoPlayAudio: true,
  dailyWordGoal: 10,
  dailyQuizGoal: 2,
  dailyMinutesGoal: 15,
};

export const getSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return defaultSettings;
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { speak, isSupported, isSpeaking } = useAudioPronunciation();
  
  const [settings, setSettings] = useState<AppSettings>(getSettings);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const testVoice = () => {
    if (!isSupported) {
      toast.error('Audio nicht unterstützt / Audio not supported');
      return;
    }
    speak('Guten Tag! Willkommen beim Deutschlernen. Ich spreche Hochdeutsch.', settings.audioSpeed);
  };

  const speedLabels: Record<number, string> = {
    0.5: 'Sehr langsam / Very slow',
    0.65: 'Langsam / Slow',
    0.75: 'Gemäßigt / Moderate',
    0.88: 'Normal',
    1.0: 'Schnell / Fast',
    1.15: 'Sehr schnell / Very fast',
  };

  const getSpeedLabel = (speed: number) => {
    const closest = Object.keys(speedLabels)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - speed) < Math.abs(prev - speed) ? curr : prev
      );
    return speedLabels[closest] || `${speed.toFixed(2)}x`;
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40">
        <div className="container flex items-center gap-3 h-16 px-4 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-lg">Einstellungen</h1>
            <p className="text-xs text-muted-foreground">Settings</p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-5 space-y-4 max-w-lg mx-auto">
        {/* Audio Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Volume2 className="w-5 h-5 text-primary" />
              <div>
                <span>Audio & Stimme</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Audio & Voice</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Audio Speed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Geschwindigkeit / Speed
                </Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {getSpeedLabel(settings.audioSpeed)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[settings.audioSpeed]}
                  onValueChange={([value]) => updateSetting('audioSpeed', value)}
                  min={0.5}
                  max={1.15}
                  step={0.05}
                  className="flex-1"
                />
              </div>
            </div>

            <Separator />

            {/* Voice Gender */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Stimme / Voice
              </Label>
              <RadioGroup
                value={settings.voiceGender}
                onValueChange={(value) => updateSetting('voiceGender', value as 'female' | 'male')}
                className="grid grid-cols-2 gap-3"
              >
                <Label
                  htmlFor="female"
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    settings.voiceGender === 'female' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="female" id="female" />
                  <div>
                    <p className="font-medium text-sm">Weiblich</p>
                    <p className="text-xs text-muted-foreground">Female</p>
                  </div>
                </Label>
                <Label
                  htmlFor="male"
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    settings.voiceGender === 'male' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value="male" id="male" />
                  <div>
                    <p className="font-medium text-sm">Männlich</p>
                    <p className="text-xs text-muted-foreground">Male</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <Separator />

            {/* Auto Play */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Auto-Wiedergabe</Label>
                  <p className="text-xs text-muted-foreground">Auto-play audio</p>
                </div>
              </div>
              <Switch
                checked={settings.autoPlayAudio}
                onCheckedChange={(checked) => updateSetting('autoPlayAudio', checked)}
              />
            </div>

            {/* Test Voice Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={testVoice}
              disabled={!isSupported || isSpeaking}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  Spricht... / Speaking...
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Stimme testen / Test Voice
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Daily Goals Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-5 h-5 text-secondary" />
              <div>
                <span>Tagesziele</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Daily Goals</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Words Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Wörter pro Tag / Words per day
                </Label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {settings.dailyWordGoal}
                </span>
              </div>
              <Slider
                value={[settings.dailyWordGoal]}
                onValueChange={([value]) => updateSetting('dailyWordGoal', value)}
                min={5}
                max={50}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 (Einfach)</span>
                <span>50 (Intensiv)</span>
              </div>
            </div>

            <Separator />

            {/* Quiz Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Quizze pro Tag / Quizzes per day
                </Label>
                <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  {settings.dailyQuizGoal}
                </span>
              </div>
              <Slider
                value={[settings.dailyQuizGoal]}
                onValueChange={([value]) => updateSetting('dailyQuizGoal', value)}
                min={1}
                max={10}
                step={1}
              />
            </div>

            <Separator />

            {/* Minutes Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Minuten pro Tag / Minutes per day
                </Label>
                <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {settings.dailyMinutesGoal}
                </span>
              </div>
              <Slider
                value={[settings.dailyMinutesGoal]}
                onValueChange={([value]) => updateSetting('dailyMinutesGoal', value)}
                min={5}
                max={60}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 min</span>
                <span>60 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sun className="w-5 h-5 text-accent" />
              <div>
                <span>Erscheinungsbild</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Appearance</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Design-Modus / Theme
              </Label>
              {mounted && (
                <RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="grid grid-cols-3 gap-3"
                >
                  <Label
                    htmlFor="light"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      theme === 'light' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="light" id="light" className="sr-only" />
                    <Sun className="w-5 h-5" />
                    <div className="text-center">
                      <p className="font-medium text-xs">Hell</p>
                      <p className="text-[10px] text-muted-foreground">Light</p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="dark"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      theme === 'dark' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="dark" id="dark" className="sr-only" />
                    <Moon className="w-5 h-5" />
                    <div className="text-center">
                      <p className="font-medium text-xs">Dunkel</p>
                      <p className="text-[10px] text-muted-foreground">Dark</p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="system"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      theme === 'system' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="system" id="system" className="sr-only" />
                    <Monitor className="w-5 h-5" />
                    <div className="text-center">
                      <p className="font-medium text-xs">System</p>
                      <p className="text-[10px] text-muted-foreground">Auto</p>
                    </div>
                  </Label>
                </RadioGroup>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Section */}
        <button
          onClick={() => user ? onBack() : navigate('/auth')}
          className="w-full"
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${user ? 'bg-secondary/15' : 'bg-primary/15'}`}>
                  {user ? <User className="w-5 h-5 text-secondary" /> : <LogIn className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{user ? 'Konto / Account' : 'Anmelden / Sign In'}</p>
                  <p className="text-xs text-muted-foreground">
                    {user ? user.email : 'Mit Google oder E-Mail anmelden'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </button>

        <div className="h-8" />
      </main>
    </div>
  );
};

export default SettingsPage;
