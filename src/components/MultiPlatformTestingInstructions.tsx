import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
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
  Target,
  Lightbulb,
  TrendUp,
  Clock,
  ArrowRight
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface MultiPlatformTestingInstructionsProps {
  className?: string;
}

export function MultiPlatformTestingInstructions({ className }: MultiPlatformTestingInstructionsProps) {
  const { t, language } = useI18n();

  const testingSteps = [
    {
      step: 1,
      title: 'Navigate to Multi-Platform Sharing',
      description: 'Scroll down in the sidebar to find the "Multi-Platform Sharing Test" component',
      icon: <Target size={16} className="text-blue-600" />
    },
    {
      step: 2,
      title: 'Select Your Target Audience',
      description: 'Choose between Professional/Technical, Casual/General, or Technical/Academic audience',
      icon: <Users size={16} className="text-green-600" />
    },
    {
      step: 3,
      title: 'Test by Platform Category',
      description: 'Use the tabs to test Professional Networks, Social Media, Messaging Apps, or Email',
      icon: <Globe size={16} className="text-purple-600" />
    },
    {
      step: 4,
      title: 'Run Testing Scenarios',
      description: 'Go to LinkedIn Testing tab to run comprehensive platform testing scenarios',
      icon: <CheckCircle size={16} className="text-amber-600" />
    }
  ];

  const platformCategories = [
    {
      category: 'Professional Networks',
      platforms: ['LinkedIn', 'XING', 'ResearchGate', 'Glassdoor'],
      bestFor: 'Technical professionals, engineers, researchers',
      engagement: '20-35%',
      icon: <Briefcase size={16} className="text-blue-600" />
    },
    {
      category: 'Social Media',
      platforms: ['Twitter/X', 'Facebook', 'Reddit', 'Instagram'],
      bestFor: 'General audience, viral content, community building',
      engagement: '10-25%',
      icon: <Globe size={16} className="text-green-600" />
    },
    {
      category: 'Messaging Apps',
      platforms: ['WhatsApp', 'Telegram', 'Slack', 'Teams', 'Discord'],
      bestFor: 'Team collaboration, direct communication',
      engagement: '35-50%',
      icon: <Chat size={16} className="text-purple-600" />
    },
    {
      category: 'Email Services',
      platforms: ['Gmail', 'Outlook', 'Default Email Client'],
      bestFor: 'Professional outreach, formal communication',
      engagement: '25-40%',
      icon: <EnvelopeSimple size={16} className="text-orange-600" />
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Start Guide */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={20} className="text-primary" />
            <span>
              {language === 'en' && 'How to Test Multi-Platform Sharing'}
              {language === 'sv' && 'Hur man testar multiplattforms delning'}
              {language === 'de' && 'So testen Sie Multi-Plattform-Sharing'}
              {language === 'fr' && 'Comment tester le partage multi-plateforme'}
              {language === 'am' && 'ባለብዙ መድረክ መጋራትን እንዴት መሞከር'}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {language === 'en' ? 'Quick Start' : 'Snabbstart'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testingSteps.map((step, index) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon}
                    <h3 className="font-medium text-sm">{step.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < testingSteps.length - 1 && (
                  <ArrowRight size={14} className="text-muted-foreground mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendUp size={20} className="text-primary" />
            <span>
              {language === 'en' && 'Platform Categories & Expected Performance'}
              {language === 'sv' && 'Plattformskategorier och förväntad prestanda'}
              {language === 'de' && 'Plattformkategorien und erwartete Leistung'}
              {language === 'fr' && 'Catégories de plateformes et performances attendues'}
              {language === 'am' && 'የመድረክ ምድቦች እና የሚጠበቅ አፈጻጸም'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {platformCategories.map((category) => (
              <Card key={category.category} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h3 className="font-medium text-sm">{category.category}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.engagement} engagement
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {category.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> {category.bestFor}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Testing Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>
              {language === 'en' && 'Available Testing Features'}
              {language === 'sv' && 'Tillgängliga testfunktioner'}
              {language === 'de' && 'Verfügbare Testfunktionen'}
              {language === 'fr' && 'Fonctionnalités de test disponibles'}
              {language === 'am' && 'የሚገኙ የሙከራ ባህሪዎች'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Target size={14} className="text-blue-600" />
                Real Platform Integration
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• Direct sharing to actual platforms</div>
                <div>• Platform-specific optimized content</div>
                <div>• Native sharing dialogs and interfaces</div>
                <div>• Mobile-responsive sharing options</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <TrendUp size={14} className="text-green-600" />
                Analytics & Tracking
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• Live engagement metrics simulation</div>
                <div>• Platform performance comparison</div>
                <div>• Audience targeting insights</div>
                <div>• Success rate tracking</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Clock size={14} className="text-purple-600" />
                Automated Testing
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• Batch testing across multiple platforms</div>
                <div>• Scenario-based testing workflows</div>
                <div>• Performance benchmarking</div>
                <div>• Test result comparison</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Users size={14} className="text-amber-600" />
                Feedback Collection
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• User testing feedback forms</div>
                <div>• Platform-specific user experiences</div>
                <div>• Engagement rate analysis</div>
                <div>• Testing session tracking</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="font-medium text-sm">
                {language === 'en' && 'Ready to Test'}
                {language === 'sv' && 'Redo att testa'}
                {language === 'de' && 'Bereit zum Testen'}
                {language === 'fr' && 'Prêt à tester'}
                {language === 'am' && 'ለመሞከር ዝግጁ'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'en' && 'All platforms are configured and ready for testing. Navigate to the Multi-Platform Sharing component in the sidebar to begin testing different social networks, messaging apps, and professional platforms with your followers and colleagues.'}
              {language === 'sv' && 'Alla plattformar är konfigurerade och redo för testning. Navigera till Multi-Platform Sharing-komponenten i sidofältet för att börja testa olika sociala nätverk, meddelandeappar och professionella plattformar med dina följare och kollegor.'}
              {language === 'de' && 'Alle Plattformen sind konfiguriert und testbereit. Navigieren Sie zur Multi-Platform Sharing-Komponente in der Seitenleiste, um verschiedene soziale Netzwerke, Messaging-Apps und professionelle Plattformen mit Ihren Followern und Kollegen zu testen.'}
              {language === 'fr' && 'Toutes les plateformes sont configurées et prêtes pour les tests. Naviguez vers le composant Multi-Platform Sharing dans la barre latérale pour commencer à tester différents réseaux sociaux, applications de messagerie et plateformes professionnelles avec vos abonnés et collègues.'}
              {language === 'am' && 'ሁሉም መድረኮች ተዋቅረው ለሙከራ ዝግጁ ናቸው። ከተከታዮችዎ እና ስራ ባልደረቦችዎ ጋር የተለያዩ ማኅበራዊ አውታሮችን፣ የመልእክት መተግበሪያዎችን እና ሙያዊ መድረኮችን መሞከር ለመጀመር በጎን አሞሌ ላይ ወደ Multi-Platform Sharing አካል ይሂዱ።'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}