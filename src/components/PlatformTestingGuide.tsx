import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Play,
  CheckCircle,
  Users, 
  Globe,
  Briefcase,
  Chat,
  EnvelopeSimple,
  LinkedinLogo,
  TwitterLogo,
  FacebookLogo,
  WhatsappLogo,
  TelegramLogo,
  SlackLogo,
  MicrosoftTeamsLogo,
  DiscordLogo,
  InstagramLogo,
  RedditLogo,
  Clock,
  Target,
  TrendUp,
  Lightbulb
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface TestScenario {
  id: string;
  name: string;
  platforms: string[];
  audience: string;
  expectedEngagement: string;
  tips: string[];
  category: 'professional' | 'social' | 'messaging' | 'email';
}

interface PlatformTestingGuideProps {
  className?: string;
}

export function PlatformTestingGuide({ className }: PlatformTestingGuideProps) {
  const { t, language } = useI18n();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const testScenarios: TestScenario[] = [
    {
      id: 'engineering-professional',
      name: 'Engineering Professional Network',
      platforms: ['LinkedIn', 'ResearchGate', 'XING'],
      audience: 'Engineers, Material Scientists, R&D Teams',
      expectedEngagement: '20-35%',
      tips: [
        'Use technical terminology and specific material properties',
        'Share during business hours (9 AM - 5 PM)',
        'Include relevant hashtags: #MaterialScience #Engineering #AI',
        'Mention specific use cases and applications'
      ],
      category: 'professional'
    },
    {
      id: 'team-collaboration',
      name: 'Team Collaboration Testing',
      platforms: ['Slack', 'Microsoft Teams', 'Discord'],
      audience: 'Work Teams, Developer Communities',
      expectedEngagement: '35-50%',
      tips: [
        'Share in relevant channels (#engineering, #tools)',
        'Use @channel mentions sparingly',
        'Include screenshots or quick demos',
        'Best time: 10 AM - 2 PM weekdays'
      ],
      category: 'messaging'
    },
    {
      id: 'social-viral',
      name: 'Social Media Viral Testing',
      platforms: ['Twitter/X', 'Reddit', 'Facebook'],
      audience: 'Tech Community, General Public',
      expectedEngagement: '10-25%',
      tips: [
        'Use trending hashtags and current topics',
        'Include visuals: screenshots, GIFs, charts',
        'Post during peak hours: 12 PM - 3 PM, 7 PM - 9 PM',
        'Engage with comments quickly'
      ],
      category: 'social'
    },
    {
      id: 'instant-messaging',
      name: 'Instant Messaging Network',
      platforms: ['WhatsApp', 'Telegram', 'Signal'],
      audience: 'Close Colleagues, Personal Network',
      expectedEngagement: '40-60%',
      tips: [
        'Personalize messages for each contact',
        'Include brief context about why you\'re sharing',
        'Best for one-on-one or small group shares',
        'Follow up with interested contacts'
      ],
      category: 'messaging'
    },
    {
      id: 'email-outreach',
      name: 'Professional Email Outreach',
      platforms: ['Gmail', 'Outlook', 'Corporate Email'],
      audience: 'Professional Contacts, Industry Partners',
      expectedEngagement: '25-40%',
      tips: [
        'Use clear, professional subject lines',
        'Include executive summary in email body',
        'Attach relevant screenshots or PDFs',
        'Send Tuesday-Thursday, 9 AM - 11 AM'
      ],
      category: 'email'
    }
  ];

  const runScenarioTest = async (scenario: TestScenario) => {
    setSelectedScenario(scenario.id);
    
    toast.info(`Starting ${scenario.name} test scenario...`);
    
    // Simulate testing each platform in the scenario
    for (const platform of scenario.platforms) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = Math.random() > 0.15; // 85% success rate
      const engagement = success ? 
        Math.random() * (parseInt(scenario.expectedEngagement.split('-')[1]) - parseInt(scenario.expectedEngagement.split('-')[0])) + 
        parseInt(scenario.expectedEngagement.split('-')[0]) : 0;
      
      if (success) {
        toast.success(`${platform}: ${engagement.toFixed(1)}% engagement - Test successful!`);
      } else {
        toast.error(`${platform}: Test failed - Check platform integration`);
      }
    }
    
    toast.success(`${scenario.name} scenario completed!`);
    setSelectedScenario(null);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <LinkedinLogo size={14} className="text-blue-600" />;
      case 'twitter/x': return <TwitterLogo size={14} className="text-black" />;
      case 'facebook': return <FacebookLogo size={14} className="text-blue-500" />;
      case 'whatsapp': return <WhatsappLogo size={14} className="text-green-500" />;
      case 'telegram': return <TelegramLogo size={14} className="text-blue-400" />;
      case 'slack': return <SlackLogo size={14} className="text-purple-600" />;
      case 'microsoft teams': return <MicrosoftTeamsLogo size={14} className="text-blue-600" />;
      case 'discord': return <DiscordLogo size={14} className="text-indigo-600" />;
      case 'instagram': return <InstagramLogo size={14} className="text-pink-500" />;
      case 'reddit': return <RedditLogo size={14} className="text-orange-500" />;
      case 'gmail':
      case 'outlook':
      case 'corporate email': return <EnvelopeSimple size={14} className="text-orange-500" />;
      default: return <Globe size={14} className="text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: TestScenario['category']) => {
    switch (category) {
      case 'professional': return <Briefcase size={16} className="text-blue-600" />;
      case 'social': return <Globe size={16} className="text-green-600" />;
      case 'messaging': return <Chat size={16} className="text-purple-600" />;
      case 'email': return <EnvelopeSimple size={16} className="text-orange-600" />;
    }
  };

  const getCategoryColor = (category: TestScenario['category']) => {
    switch (category) {
      case 'professional': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/10';
      case 'social': return 'border-green-200 bg-green-50 dark:bg-green-900/10';
      case 'messaging': return 'border-purple-200 bg-purple-50 dark:bg-purple-900/10';
      case 'email': return 'border-orange-200 bg-orange-50 dark:bg-orange-900/10';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={20} className="text-primary" />
            <span>
              {language === 'en' && 'Platform Testing Scenarios'}
              {language === 'sv' && 'Plattformstestscenarier'}
              {language === 'de' && 'Plattform-Testszenarien'}
              {language === 'fr' && 'Scénarios de test de plateforme'}
              {language === 'am' && 'የመድረክ ሙከራ ሁኔታዎች'}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {testScenarios.length} scenarios
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-blue-600" />
                <span className="font-medium text-sm">
                  {language === 'en' && 'How Testing Scenarios Work'}
                  {language === 'sv' && 'Hur testscenarier fungerar'}
                  {language === 'de' && 'Wie Testszenarien funktionieren'}
                  {language === 'fr' && 'Comment fonctionnent les scénarios de test'}
                  {language === 'am' && 'የሙከራ ሁኔታዎች እንዴት እንደሚሰሩ'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {language === 'en' && 'Each scenario tests multiple platforms with specific audience targeting and engagement strategies. Click "Run Test" to simulate sharing across all platforms in that scenario and see projected engagement rates.'}
                {language === 'sv' && 'Varje scenario testar flera plattformar med specifik målgruppsinriktning och engagemangsstrategier. Klicka på "Kör test" för att simulera delning över alla plattformar i det scenariot och se projicerade engagemangsfrekvenser.'}
                {language === 'de' && 'Jedes Szenario testet mehrere Plattformen mit spezifischer Zielgruppenfokussierung und Engagement-Strategien. Klicken Sie auf "Test ausführen", um das Teilen über alle Plattformen in diesem Szenario zu simulieren und projizierte Engagement-Raten zu sehen.'}
                {language === 'fr' && 'Chaque scénario teste plusieurs plateformes avec un ciblage d\'audience spécifique et des stratégies d\'engagement. Cliquez sur "Exécuter le test" pour simuler le partage sur toutes les plateformes de ce scénario et voir les taux d\'engagement projetés.'}
                {language === 'am' && 'እያንዳንዱ ሁኔታ በተለየ ተመልካች ኢላማ እና የተሳትፎ ስትራቴጂዎች ብዙ መድረኮችን ይሞክራል። በዚያ ሁኔታ ውስጥ በሁሉም መድረኮች ላይ መጋራትን ለማስመሰል እና የተገመተ የተሳትፎ መጠን ለማየት "ሙከራ አሂድ" ጠቅ ያድርጉ።'}
              </div>
            </div>

            <div className="grid gap-4">
              {testScenarios.map((scenario) => (
                <Card key={scenario.id} className={`transition-all hover:shadow-md ${getCategoryColor(scenario.category)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(scenario.category)}
                        <div>
                          <h3 className="font-medium text-sm">{scenario.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{scenario.audience}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => runScenarioTest(scenario)}
                        disabled={selectedScenario === scenario.id}
                        size="sm"
                        className="h-8"
                      >
                        {selectedScenario === scenario.id ? (
                          <>
                            <Clock size={12} className="mr-1 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <Play size={12} className="mr-1" />
                            Run Test
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {/* Platforms */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Platforms:</div>
                        <div className="flex flex-wrap gap-1">
                          {scenario.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              <span className="flex items-center gap-1">
                                {getPlatformIcon(platform)}
                                {platform}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Expected Engagement */}
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Expected Engagement:</div>
                          <div className="flex items-center gap-1">
                            <TrendUp size={12} className="text-green-600" />
                            <span className="text-sm font-medium text-green-700">{scenario.expectedEngagement}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Optimization Tips:</div>
                        <div className="space-y-1">
                          {scenario.tips.slice(0, 2).map((tip, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-primary">•</span>
                              <span>{tip}</span>
                            </div>
                          ))}
                          {scenario.tips.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              + {scenario.tips.length - 2} more tips...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Testing Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>
              {language === 'en' && 'Multi-Platform Testing Best Practices'}
              {language === 'sv' && 'Bästa praxis för multiplattformstestning'}
              {language === 'de' && 'Best Practices für Multi-Plattform-Tests'}
              {language === 'fr' && 'Meilleures pratiques de test multi-plateforme'}
              {language === 'am' && 'ባለብዙ መድረክ ሙከራ ምርጥ ተግባራት'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Before Testing:</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Prepare platform-specific content variations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Research optimal posting times for each platform</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Identify relevant hashtags and keywords</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Set up tracking mechanisms for engagement</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">During Testing:</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Monitor initial engagement within first hour</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Respond quickly to comments and questions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Track click-through rates and conversions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-600 mt-0.5" />
                  <span>Document what works for each platform</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-purple-600" />
              <span className="font-medium text-sm">Platform-Specific Success Metrics</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-medium mb-1">Professional Networks:</div>
                <div className="text-muted-foreground">
                  • LinkedIn: Comments, shares, profile views<br/>
                  • ResearchGate: Publication views, citations<br/>
                  • XING: Connection requests, message responses
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Messaging Platforms:</div>
                <div className="text-muted-foreground">
                  • Slack/Teams: Channel engagement, thread replies<br/>
                  • WhatsApp/Telegram: Direct responses, forwards<br/>
                  • Discord: Reactions, voice chat participation
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}