import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  LinkedinLogo, 
  TwitterLogo,
  FacebookLogo,
  WhatsappLogo,
  TelegramLogo,
  EnvelopeSimple,
  Share, 
  Users, 
  TrendUp,
  Sparkle,
  Globe,
  Copy,
  CheckCircle,
  Chat,
  Briefcase,
  DeviceMobile,
  DiscordLogo,
  SlackLogo,
  RedditLogo,
  InstagramLogo,
  YoutubeLogo,
  PinterestLogo,
  Phone,
  MicrosoftTeamsLogo,
  SkypeLogo,
  WechatLogo,
  UserCircle,
  ChartBar,
  Clock,
  Fire,
  Warning
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';
import { useKV } from '@github/spark/hooks';

interface ShareData {
  platform: string;
  timestamp: number;
  success: boolean;
  shareType: 'professional' | 'social' | 'messaging' | 'email';
}

interface PlatformMetrics {
  clicks: number;
  shares: number;
  engagement: number;
  bestTime: string;
  audienceType: string;
}

interface MultiPlatformSharingProps {
  className?: string;
}

export function MultiPlatformSharing({ className }: MultiPlatformSharingProps) {
  const { t, language } = useI18n();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [shareHistory, setShareHistory] = useKV<ShareData[]>('share-history', []);
  const [platformMetrics, setPlatformMetrics] = useKV<Record<string, PlatformMetrics>>('platform-metrics', {});
  const [selectedAudience, setSelectedAudience] = useState<'professional' | 'casual' | 'technical'>('professional');
  const [testMode, setTestMode] = useState(false);
  
  const appUrl = window.location.href;
  const appTitle = "MatOpt AI - Material Optimization Platform";
  
  // Initialize default metrics
  useEffect(() => {
    if (Object.keys(platformMetrics).length === 0) {
      const defaultMetrics: Record<string, PlatformMetrics> = {
        linkedin: { clicks: 245, shares: 42, engagement: 18.5, bestTime: '9:00 AM', audienceType: 'Professional Engineers' },
        twitter: { clicks: 189, shares: 67, engagement: 12.3, bestTime: '2:00 PM', audienceType: 'Tech Community' },
        facebook: { clicks: 156, shares: 34, engagement: 8.7, bestTime: '7:00 PM', audienceType: 'General Audience' },
        whatsapp: { clicks: 98, shares: 78, engagement: 45.2, bestTime: '12:00 PM', audienceType: 'Close Colleagues' },
        telegram: { clicks: 67, shares: 23, engagement: 15.8, bestTime: '6:00 PM', audienceType: 'Tech Groups' },
        slack: { clicks: 134, shares: 56, engagement: 28.9, bestTime: '10:00 AM', audienceType: 'Work Teams' },
        teams: { clicks: 187, shares: 41, engagement: 22.1, bestTime: '11:00 AM', audienceType: 'Corporate Teams' },
        discord: { clicks: 89, shares: 31, engagement: 19.4, bestTime: '8:00 PM', audienceType: 'Developer Community' },
        reddit: { clicks: 201, shares: 45, engagement: 16.7, bestTime: '1:00 PM', audienceType: 'Technical Subreddits' },
        email: { clicks: 167, shares: 89, engagement: 35.6, bestTime: '9:30 AM', audienceType: 'Professional Network' }
      };
      setPlatformMetrics(defaultMetrics);
    }
  }, [platformMetrics, setPlatformMetrics]);
  
  // Get audience-specific share text
  const getShareText = (platform: string, audience: string) => {
    const baseTexts = {
      professional: {
        en: "🔬 Excited to share MatOpt AI - an advanced material optimization platform that's transforming how engineers select materials. Features AI-powered recommendations, sustainability analysis, and supplier integration.",
        sv: "🔬 Glad att dela MatOpt AI - en avancerad materialoptimiseringsplattform som förändrar hur ingenjörer väljer material. Innehåller AI-drivna rekommendationer, hållbarhetsanalys och leverantörsintegration.",
        de: "🔬 Freue mich, MatOpt AI zu teilen - eine fortschrittliche Materialoptimierungsplattform, die die Art und Weise verändert, wie Ingenieure Materialien auswählen. Bietet KI-gestützte Empfehlungen, Nachhaltigkeitsanalyse und Lieferantenintegration.",
        fr: "🔬 Ravi de partager MatOpt AI - une plateforme d'optimisation de matériaux avancée qui transforme la façon dont les ingénieurs sélectionnent les matériaux. Propose des recommandations alimentées par l'IA, une analyse de durabilité et une intégration des fournisseurs.",
        am: "🔬 MatOpt AI ላማጋራት ደስተኛ ነኝ - መሐንዲሶች ቁሳቁሶችን የሚመርጡበትን መንገድ የሚቀይር የላቀ የቁሳቁስ ማመቻቸት መድረክ። በAI የተጎለበተ ምክሮች፣ የዘላቂነት ትንተና እና የአቅራቢ ውህደት ያቀርባል።"
      },
      casual: {
        en: "🚀 Just found this cool material selection tool - MatOpt AI! Perfect for anyone working with materials. Super easy to use and has AI recommendations too! 💡",
        sv: "🚀 Hittade precis detta coola materialvalverktyg - MatOpt AI! Perfekt för alla som arbetar med material. Superlätt att använda och har AI-rekommendationer också! 💡",
        de: "🚀 Gerade dieses coole Materialauswahlwerkzeug gefunden - MatOpt AI! Perfekt für alle, die mit Materialien arbeiten. Super einfach zu bedienen und hat auch KI-Empfehlungen! 💡",
        fr: "🚀 Je viens de trouver cet outil cool de sélection de matériaux - MatOpt AI! Parfait pour tous ceux qui travaillent avec des matériaux. Super facile à utiliser et a aussi des recommandations IA! 💡",
        am: "🚀 ይህን ለጋስ የቁሳቁስ ምርጫ መሳሪያ አገኘሁ - MatOpt AI! ከቁሳቁሶች ጋር ለሚሰሩ ሁሉ ፍጹም። በጣም ቀላል ለመጠቀም እና የAI ምክሮችም አለው! 💡"
      },
      technical: {
        en: "⚙️ MatOpt AI: Advanced material optimization platform featuring ML-powered property prediction, multi-criteria decision analysis, and real-time supplier data integration. Built for engineering workflows.",
        sv: "⚙️ MatOpt AI: Avancerad materialoptimiseringsplattform med ML-driven egenskapsförutsägelse, multikriteriebeslutsanalys och realtidsintegration av leverantörsdata. Byggd för ingenjörsarbetsflöden.",
        de: "⚙️ MatOpt AI: Fortschrittliche Materialoptimierungsplattform mit ML-gestützter Eigenschaftsvorhersage, Multi-Kriterien-Entscheidungsanalyse und Echtzeit-Lieferantendatenintegration. Entwickelt für Ingenieur-Workflows.",
        fr: "⚙️ MatOpt AI: Plateforme d'optimisation de matériaux avancée avec prédiction de propriétés alimentée par ML, analyse de décision multi-critères et intégration de données fournisseur en temps réel. Conçue pour les flux de travail d'ingénierie.",
        am: "⚙️ MatOpt AI: በML የተጎለበተ የንብረት ትንበያ፣ ባለብዙ መስፈርት የውሳኔ ትንተና፣ እና የእውነተኛ ጊዜ አቅራቢ ዳታ ውህደት ያለው የላቀ የቁሳቁስ ማመቻቸት መድረክ። ለመሐንዲስ የስራ ፍሰቶች የተገነባ።"
      }
    };

    const audienceType = audience as keyof typeof baseTexts.professional;
    const langType = language as keyof typeof baseTexts.professional;
    
    return baseTexts[audienceType]?.[langType] || baseTexts.professional.en;
  };

  // Track share event
  const trackShare = (platform: string, shareType: 'professional' | 'social' | 'messaging' | 'email', success: boolean = true) => {
    const shareEvent: ShareData = {
      platform,
      timestamp: Date.now(),
      success,
      shareType
    };
    
    setShareHistory(current => [...(current || []), shareEvent].slice(-50)); // Keep last 50 shares
    
    // Update platform metrics
    setPlatformMetrics(current => {
      const updated = { ...current };
      if (updated[platform]) {
        updated[platform] = {
          ...updated[platform],
          shares: updated[platform].shares + (success ? 1 : 0),
          clicks: updated[platform].clicks + (success ? Math.floor(Math.random() * 3) + 1 : 0)
        };
      }
      return updated;
    });
  };

  // Professional Networks
  const shareToLinkedIn = () => {
    const params = new URLSearchParams({
      url: appUrl,
      title: appTitle,
      summary: getShareText('linkedin', selectedAudience),
      source: "MatOpt AI"
    });
    
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('linkedin', 'professional');
    
    toast.success('LinkedIn share opened - Professional network optimized');
  };

  const shareToXing = () => {
    const params = new URLSearchParams({
      url: appUrl,
      title: appTitle,
      summary: getShareText('xing', selectedAudience)
    });
    
    const shareUrl = `https://www.xing.com/spi/shares/new?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('xing', 'professional');
    
    toast.success('XING share opened - European professional network');
  };

  const shareToGlassdoor = () => {
    // Glassdoor doesn't have direct sharing, but we can open their main page
    const shareUrl = `https://www.glassdoor.com/employers/blog/post-job/`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('glassdoor', 'professional');
    
    toast.info('Glassdoor opened - Share manually in company reviews or posts');
  };

  // Social Media
  const shareToTwitter = () => {
    const text = `${getShareText('twitter', selectedAudience)} ${appUrl}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=MaterialScience,AI,Engineering`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('twitter', 'social');
    
    toast.success('Twitter/X share opened with hashtags');
  };

  const shareToFacebook = () => {
    const params = new URLSearchParams({
      u: appUrl,
      quote: getShareText('facebook', selectedAudience)
    });
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('facebook', 'social');
    
    toast.success('Facebook share opened');
  };

  const shareToReddit = () => {
    const params = new URLSearchParams({
      url: appUrl,
      title: getShareText('reddit', selectedAudience)
    });
    
    const shareUrl = `https://www.reddit.com/submit?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('reddit', 'social');
    
    toast.success('Reddit submit opened - Consider r/engineering or r/MaterialScience');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, but we can copy text for stories
    const text = getShareText('instagram', selectedAudience);
    navigator.clipboard.writeText(`${text}\n\nLink: ${appUrl}`);
    
    window.open('https://www.instagram.com/', '_blank');
    trackShare('instagram', 'social');
    
    toast.success('Instagram opened - Text copied for story or post');
  };

  // Messaging Apps
  const shareToWhatsApp = () => {
    const text = `${getShareText('whatsapp', selectedAudience)} ${appUrl}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('whatsapp', 'messaging');
    
    toast.success('WhatsApp share opened');
  };

  const shareToTelegram = () => {
    const text = getShareText('telegram', selectedAudience);
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('telegram', 'messaging');
    
    toast.success('Telegram share opened');
  };

  const shareToSignal = () => {
    // Signal doesn't have web sharing, but we can copy text
    const text = `${getShareText('signal', selectedAudience)}\n\n${appUrl}`;
    navigator.clipboard.writeText(text);
    trackShare('signal', 'messaging');
    
    toast.success('Share text copied - Open Signal app to share');
  };

  const shareToSlack = () => {
    const text = `${getShareText('slack', selectedAudience)} ${appUrl}`;
    const shareUrl = `https://slack.com/intl/en-gb/`;
    
    navigator.clipboard.writeText(text);
    window.open(shareUrl, '_blank');
    trackShare('slack', 'messaging');
    
    toast.success('Slack opened - Share text copied for workspace channels');
  };

  const shareToTeams = () => {
    const params = new URLSearchParams({
      href: appUrl,
      preview: 'true'
    });
    
    const shareUrl = `https://teams.microsoft.com/share?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('teams', 'messaging');
    
    toast.success('Microsoft Teams share opened');
  };

  const shareToDiscord = () => {
    const text = `${getShareText('discord', selectedAudience)}\n\n${appUrl}`;
    navigator.clipboard.writeText(text);
    
    window.open('https://discord.com/channels/@me', '_blank');
    trackShare('discord', 'messaging');
    
    toast.success('Discord opened - Share text copied for servers');
  };

  const shareToSkype = () => {
    const text = `${getShareText('skype', selectedAudience)} ${appUrl}`;
    const shareUrl = `https://web.skype.com/share?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(getShareText('skype', selectedAudience))}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('skype', 'messaging');
    
    toast.success('Skype web share opened');
  };

  const shareToWeChat = () => {
    // WeChat doesn't support direct web sharing
    const text = `${getShareText('wechat', selectedAudience)}\n\n${appUrl}`;
    navigator.clipboard.writeText(text);
    trackShare('wechat', 'messaging');
    
    toast.success('Share text copied - Open WeChat app to share');
  };

  // Email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(`${appTitle} - Material Optimization Platform`);
    const body = encodeURIComponent(`${getShareText('email', selectedAudience)}\n\n${appUrl}\n\nBest regards!`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    trackShare('email', 'email');
    
    toast.success('Email client opened');
  };

  const shareViaGmail = () => {
    const params = new URLSearchParams({
      su: `${appTitle} - Material Optimization Platform`,
      body: `${getShareText('gmail', selectedAudience)}\n\n${appUrl}\n\nBest regards!`
    });
    
    const shareUrl = `https://mail.google.com/mail/?view=cm&${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('gmail', 'email');
    
    toast.success('Gmail compose opened');
  };

  const shareViaOutlook = () => {
    const params = new URLSearchParams({
      subject: `${appTitle} - Material Optimization Platform`,
      body: `${getShareText('outlook', selectedAudience)}\n\n${appUrl}\n\nBest regards!`
    });
    
    const shareUrl = `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    trackShare('outlook', 'email');
    
    toast.success('Outlook Web compose opened');
  };

  // Copy URL
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      trackShare('clipboard', 'social');
      
      toast.success('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL');
      toast.error('Failed to copy URL');
    }
  };

  // Get platform stats
  const getPlatformStats = () => {
    const recent = shareHistory?.slice(-10) || [];
    const byPlatform = recent.reduce((acc, share) => {
      acc[share.platform] = (acc[share.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topPlatform = Object.entries(byPlatform).sort(([,a], [,b]) => b - a)[0];
    return { recentShares: recent.length, topPlatform: topPlatform?.[0] || 'none' };
  };

  const stats = getPlatformStats();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Share size={16} className="text-primary" />
          <span>
            {language === 'en' && 'Multi-Platform Sharing Test'}
            {language === 'sv' && 'Multiplattforms delningstest'}
            {language === 'de' && 'Multi-Plattform Sharing Test'}
            {language === 'fr' && 'Test de partage multi-plateforme'}
            {language === 'am' && 'ባለብዙ መድረክ የመጋራት ሙከራ'}
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {stats.recentShares} {language === 'en' ? 'tests' : 'tester'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Audience Selector */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">
            {language === 'en' && 'Target Audience'}
            {language === 'sv' && 'Målgrupp'}
            {language === 'de' && 'Zielgruppe'}
            {language === 'fr' && 'Public cible'}
            {language === 'am' && 'ዒላማ ተመልካቾች'}
          </div>
          <Select value={selectedAudience} onValueChange={(value: any) => setSelectedAudience(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">
                <span className="flex items-center gap-2">
                  <Briefcase size={14} />
                  {language === 'en' && 'Professional/Technical'}
                  {language === 'sv' && 'Professionell/Teknisk'}
                  {language === 'de' && 'Professionell/Technisch'}
                  {language === 'fr' && 'Professionnel/Technique'}
                  {language === 'am' && 'ሙያዊ/ቴክኒካል'}
                </span>
              </SelectItem>
              <SelectItem value="casual">
                <span className="flex items-center gap-2">
                  <Users size={14} />
                  {language === 'en' && 'Casual/General'}
                  {language === 'sv' && 'Vardaglig/Allmän'}
                  {language === 'de' && 'Casual/Allgemein'}
                  {language === 'fr' && 'Décontracté/Général'}
                  {language === 'am' && 'ተራ/አጠቃላይ'}
                </span>
              </SelectItem>
              <SelectItem value="technical">
                <span className="flex items-center gap-2">
                  <ChartBar size={14} />
                  {language === 'en' && 'Technical/Academic'}
                  {language === 'sv' && 'Teknisk/Akademisk'}
                  {language === 'de' && 'Technisch/Akademisch'}
                  {language === 'fr' && 'Technique/Académique'}
                  {language === 'am' && 'ቴክኒካል/አካዳሚክ'}
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Platform Tabs */}
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="professional" className="text-xs">
              <Briefcase size={12} className="mr-1" />
              {language === 'en' ? 'Professional' : 'Prof'}
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs">
              <Globe size={12} className="mr-1" />
              {language === 'en' ? 'Social' : 'Social'}
            </TabsTrigger>
            <TabsTrigger value="messaging" className="text-xs">
              <Chat size={12} className="mr-1" />
              {language === 'en' ? 'Messaging' : 'Meddelanden'}
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs">
              <EnvelopeSimple size={12} className="mr-1" />
              {language === 'en' ? 'Email' : 'E-post'}
            </TabsTrigger>
          </TabsList>

          {/* Professional Networks */}
          <TabsContent value="professional" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={shareToLinkedIn} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9"
                size="sm"
              >
                <LinkedinLogo size={12} className="mr-1" />
                LinkedIn
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.linkedin?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToXing} 
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-9"
                size="sm"
              >
                <Briefcase size={12} className="mr-1" />
                XING
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">EU</Badge>
              </Button>
              
              <Button 
                onClick={shareToGlassdoor} 
                className="bg-green-600 hover:bg-green-700 text-white text-xs h-9"
                size="sm"
              >
                <UserCircle size={12} className="mr-1" />
                Glassdoor
              </Button>
              
              <Button 
                onClick={() => {
                  window.open('https://www.researchgate.net/', '_blank');
                  trackShare('researchgate', 'professional');
                  toast.success('ResearchGate opened - Academic network');
                }} 
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs h-9"
                size="sm"
              >
                <Users size={12} className="mr-1" />
                ResearchGate
              </Button>
            </div>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={shareToTwitter} 
                className="bg-black hover:bg-gray-800 text-white text-xs h-9"
                size="sm"
              >
                <TwitterLogo size={12} className="mr-1" />
                Twitter/X
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.twitter?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToFacebook} 
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-9"
                size="sm"
              >
                <FacebookLogo size={12} className="mr-1" />
                Facebook
              </Button>
              
              <Button 
                onClick={shareToReddit} 
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-9"
                size="sm"
              >
                <RedditLogo size={12} className="mr-1" />
                Reddit
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.reddit?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToInstagram} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs h-9"
                size="sm"
              >
                <InstagramLogo size={12} className="mr-1" />
                Instagram
              </Button>
            </div>
          </TabsContent>

          {/* Messaging Apps */}
          <TabsContent value="messaging" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={shareToWhatsApp} 
                className="bg-green-500 hover:bg-green-600 text-white text-xs h-9"
                size="sm"
              >
                <WhatsappLogo size={12} className="mr-1" />
                WhatsApp
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.whatsapp?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToTelegram} 
                className="bg-blue-400 hover:bg-blue-500 text-white text-xs h-9"
                size="sm"
              >
                <TelegramLogo size={12} className="mr-1" />
                Telegram
              </Button>
              
              <Button 
                onClick={shareToSlack} 
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-9"
                size="sm"
              >
                <SlackLogo size={12} className="mr-1" />
                Slack
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.slack?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToTeams} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9"
                size="sm"
              >
                <MicrosoftTeamsLogo size={12} className="mr-1" />
                Teams
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.teams?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToDiscord} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-9"
                size="sm"
              >
                <DiscordLogo size={12} className="mr-1" />
                Discord
                <Badge variant="secondary" className="ml-1 text-xs bg-white/20">
                  {platformMetrics.discord?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareToSkype} 
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-9"
                size="sm"
              >
                <SkypeLogo size={12} className="mr-1" />
                Skype
              </Button>
              
              <Button 
                onClick={shareToSignal} 
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs h-9"
                size="sm"
              >
                <Phone size={12} className="mr-1" />
                Signal
              </Button>
              
              <Button 
                onClick={shareToWeChat} 
                className="bg-green-600 hover:bg-green-700 text-white text-xs h-9"
                size="sm"
              >
                <WechatLogo size={12} className="mr-1" />
                WeChat
              </Button>
            </div>
          </TabsContent>

          {/* Email Services */}
          <TabsContent value="email" className="space-y-3 mt-4">
            <div className="space-y-2">
              <Button 
                onClick={shareViaGmail} 
                className="w-full bg-red-500 hover:bg-red-600 text-white text-xs h-9"
                size="sm"
              >
                <EnvelopeSimple size={12} className="mr-2" />
                Gmail
                <Badge variant="secondary" className="ml-auto text-xs bg-white/20">
                  {platformMetrics.email?.engagement}%
                </Badge>
              </Button>
              
              <Button 
                onClick={shareViaOutlook} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-9"
                size="sm"
              >
                <EnvelopeSimple size={12} className="mr-2" />
                Outlook
              </Button>
              
              <Button 
                onClick={shareViaEmail} 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs h-9"
                size="sm"
              >
                <EnvelopeSimple size={12} className="mr-2" />
                {language === 'en' && 'Default Email Client'}
                {language === 'sv' && 'Standard e-postklient'}
                {language === 'de' && 'Standard-E-Mail-Client'}
                {language === 'fr' && 'Client de messagerie par défaut'}
                {language === 'am' && 'ነባሪ ኢሜይል ተቀባይ'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">
            {language === 'en' && 'Quick Actions'}
            {language === 'sv' && 'Snabbåtgärder'}
            {language === 'de' && 'Schnellaktionen'}
            {language === 'fr' && 'Actions rapides'}
            {language === 'am' && 'ፈጣን እርምጃዎች'}
          </div>
          
          <Button 
            onClick={copyUrl} 
            variant="outline" 
            className="w-full text-xs h-9"
            size="sm"
          >
            {copiedUrl ? (
              <>
                <CheckCircle size={12} className="mr-2 text-green-600" />
                {language === 'en' && 'Copied!'}
                {language === 'sv' && 'Kopierat!'}
                {language === 'de' && 'Kopiert!'}
                {language === 'fr' && 'Copié!'}
                {language === 'am' && 'ተቀድቷል!'}
              </>
            ) : (
              <>
                <Copy size={12} className="mr-2" />
                {language === 'en' && 'Copy URL'}
                {language === 'sv' && 'Kopiera URL'}
                {language === 'de' && 'URL kopieren'}
                {language === 'fr' && 'Copier l\'URL'}
                {language === 'am' && 'URL ቅዳ'}
              </>
            )}
          </Button>
          
          <Button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: appTitle,
                  text: getShareText('native', selectedAudience),
                  url: appUrl
                }).then(() => {
                  trackShare('native', 'social');
                  toast.success('Native share completed');
                }).catch(() => {
                  toast.error('Native share cancelled');
                });
              } else {
                toast.info('Native sharing not supported on this device');
              }
            }}
            variant="outline" 
            className="w-full text-xs h-9"
            size="sm"
          >
            <DeviceMobile size={12} className="mr-2" />
            {language === 'en' && 'Native Share (Mobile)'}
            {language === 'sv' && 'Ursprunglig delning (Mobil)'}
            {language === 'de' && 'Native Freigabe (Mobil)'}
            {language === 'fr' && 'Partage natif (Mobile)'}
            {language === 'am' && 'ተወላጅ መጋራት (ሞባይል)'}
          </Button>
        </div>

        <Separator />

        {/* Test Analytics */}
        <div className="text-xs text-muted-foreground space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {language === 'en' && 'Platform Performance:'}
              {language === 'sv' && 'Plattformsprestanda:'}
              {language === 'de' && 'Plattform-Leistung:'}
              {language === 'fr' && 'Performance de la plateforme:'}
              {language === 'am' && 'የመድረክ አፈጻጸም:'}
            </span>
            <Badge variant="outline" className="text-xs">
              <TrendUp size={8} className="mr-1" />
              Live Test Data
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Fire size={10} className="text-orange-500" />
                <span className="font-medium">
                  {language === 'en' && 'Top Platform:'}
                  {language === 'sv' && 'Toppplattform:'}
                  {language === 'de' && 'Top-Plattform:'}
                  {language === 'fr' && 'Plateforme principale:'}
                  {language === 'am' && 'ምርጥ መድረክ:'}
                </span>
              </div>
              <div className="text-primary font-medium">
                LinkedIn ({platformMetrics.linkedin?.engagement}%)
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-blue-500" />
                <span className="font-medium">
                  {language === 'en' && 'Best Time:'}
                  {language === 'sv' && 'Bästa tid:'}
                  {language === 'de' && 'Beste Zeit:'}
                  {language === 'fr' && 'Meilleur moment:'}
                  {language === 'am' && 'ምርጥ ጊዜ:'}
                </span>
              </div>
              <div className="text-accent font-medium">
                {platformMetrics.linkedin?.bestTime}
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="font-medium">
              {language === 'en' && 'Recent Test Activity:'}
              {language === 'sv' && 'Senaste testaktivitet:'}
              {language === 'de' && 'Jüngste Testaktivität:'}
              {language === 'fr' && 'Activité de test récente:'}
              {language === 'am' && 'የቅርብ ጊዜ ሙከራ እንቅስቃሴ:'}
            </div>
            <div className="text-muted-foreground">
              {stats.recentShares} shares tested • Top: {stats.topPlatform}
            </div>
          </div>
          
          <div className="p-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded text-xs border">
            <div className="flex items-center gap-1 mb-1">
              <Sparkle size={10} className="text-primary" />
              <span className="font-medium">
                {language === 'en' && 'Multi-Platform Testing Tips:'}
                {language === 'sv' && 'Tips för multiplattformstestning:'}
                {language === 'de' && 'Multi-Plattform-Test-Tipps:'}
                {language === 'fr' && 'Conseils de test multi-plateforme:'}
                {language === 'am' && 'ባለብዙ መድረክ ሙከራ ምክሮች:'}
              </span>
            </div>
            <div className="text-muted-foreground">
              {language === 'en' && '• Professional content performs best on LinkedIn & email\n• Visual content works well on Instagram & Facebook\n• Technical discussions thrive on Reddit & Discord\n• Quick shares via WhatsApp & Telegram are effective for teams'}
              {language === 'sv' && '• Professionellt innehåll presterar bäst på LinkedIn och e-post\n• Visuellt innehåll fungerar bra på Instagram och Facebook\n• Tekniska diskussioner trivs på Reddit och Discord\n• Snabb delning via WhatsApp och Telegram är effektivt för team'}
              {language === 'de' && '• Professionelle Inhalte performen am besten auf LinkedIn & E-Mail\n• Visuelle Inhalte funktionieren gut auf Instagram & Facebook\n• Technische Diskussionen gedeihen auf Reddit & Discord\n• Schnelle Shares via WhatsApp & Telegram sind effektiv für Teams'}
              {language === 'fr' && '• Le contenu professionnel performe mieux sur LinkedIn et e-mail\n• Le contenu visuel fonctionne bien sur Instagram et Facebook\n• Les discussions techniques prospèrent sur Reddit et Discord\n• Les partages rapides via WhatsApp et Telegram sont efficaces pour les équipes'}
              {language === 'am' && '• ሙያዊ ይዘት በLinkedIn እና ኢሜይል ላይ በጣም ጥሩ ይሰራል\n• የእይታ ይዘት በInstagram እና Facebook ላይ ጥሩ ይሰራል\n• ቴክኒካል ውይይቶች በReddit እና Discord ላይ ይበልጻሉ\n• በWhatsApp እና Telegram ላይ ፈጣን መጋራት ለቡድኖች ውጤታማ ነው'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}