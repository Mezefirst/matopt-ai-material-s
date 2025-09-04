import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
import { 
  User, 
  CheckCircle, 
  Users, 
  TrendUp,
  Share,
  Sparkle,
  ChartBar,
  Calendar,
  Clock,
  LinkedinLogo,
  TwitterLogo,
  FacebookLogo,
  WhatsappLogo,
  TelegramLogo,
  EnvelopeSimple,
  PaperPlaneTilt,
  Globe,
  Copy,
  Eye,
  Heart,
  ChatCircle,
  ArrowsClockwise
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface SocialTestingData {
  testerId: string;
  name: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'whatsapp' | 'telegram' | 'email';
  profileUrl?: string;
  company?: string;
  role?: string;
  feedback: string;
  rating: number;
  features: string[];
  timestamp: number;
  testDuration: number; // in minutes
  shareMethod: string;
}

interface SocialEngagement {
  platform: string;
  shares: number;
  views: number;
  likes: number;
  comments: number;
  timestamp: number;
}

interface SocialTestingDashboardProps {
  className?: string;
}

export function SocialTestingDashboard({ className }: SocialTestingDashboardProps) {
  const { t, language } = useI18n();
  
  // Store testing data across platforms
  const [testingData, setTestingData] = useKV<SocialTestingData[]>('social-testers', []);
  const [engagementData, setEngagementData] = useKV<SocialEngagement[]>('social-engagement', []);
  const [userProfile, setUserProfile] = useKV<{
    name: string, 
    linkedin: string, 
    twitter: string,
    facebook: string,
    company: string, 
    role: string
  }>('social-profile', {
    name: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    company: '',
    role: ''
  });

  const [currentTester, setCurrentTester] = useState({
    name: '',
    platform: 'linkedin' as SocialTestingData['platform'],
    profileUrl: '',
    company: '',
    role: '',
    feedback: '',
    rating: 5,
    features: [] as string[],
    shareMethod: 'direct-share'
  });

  const [testStartTime, setTestStartTime] = useState<number | null>(null);

  // Initialize demo engagement data
  useEffect(() => {
    if (engagementData.length === 0) {
      const demoEngagement: SocialEngagement[] = [
        { platform: 'LinkedIn', shares: 12, views: 234, likes: 45, comments: 8, timestamp: Date.now() - 86400000 },
        { platform: 'Twitter', shares: 8, views: 156, likes: 23, comments: 5, timestamp: Date.now() - 43200000 },
        { platform: 'Facebook', shares: 6, views: 89, likes: 18, comments: 3, timestamp: Date.now() - 21600000 },
        { platform: 'WhatsApp', shares: 15, views: 78, likes: 0, comments: 12, timestamp: Date.now() - 10800000 },
        { platform: 'Email', shares: 4, views: 24, likes: 0, comments: 4, timestamp: Date.now() - 5400000 }
      ];
      setEngagementData(demoEngagement);
    }
  }, [engagementData, setEngagementData]);

  // Calculate statistics
  const stats = {
    totalTesters: testingData.length,
    averageRating: testingData.length > 0 
      ? (testingData.reduce((sum, tester) => sum + tester.rating, 0) / testingData.length).toFixed(1)
      : '0.0',
    averageTestTime: testingData.length > 0 
      ? Math.round(testingData.reduce((sum, tester) => sum + tester.testDuration, 0) / testingData.length)
      : 0,
    platformBreakdown: testingData.reduce((acc, tester) => {
      acc[tester.platform] = (acc[tester.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalEngagement: engagementData.reduce((acc, engagement) => ({
      shares: acc.shares + engagement.shares,
      views: acc.views + engagement.views,
      likes: acc.likes + engagement.likes,
      comments: acc.comments + engagement.comments
    }), { shares: 0, views: 0, likes: 0, comments: 0 }),
    topFeatures: Object.entries(
      testingData.flatMap(tester => tester.features)
        .reduce((acc, feature) => {
          acc[feature] = (acc[feature] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    ).sort(([,a], [,b]) => b - a).slice(0, 3).map(([feature, count]) => ({ feature, count }))
  };

  const handleStartTest = () => {
    setTestStartTime(Date.now());
    toast.success(
      language === 'en' ? 'Test session started! Share the app and collect feedback.' :
      language === 'sv' ? 'Testsession startad! Dela appen och samla in feedback.' :
      language === 'de' ? 'Testsitzung gestartet! Teilen Sie die App und sammeln Sie Feedback.' :
      language === 'fr' ? 'Session de test commencée ! Partagez l\'application et collectez des commentaires.' :
      language === 'am' ? 'የሙከራ ክፍለ ጊዜ ጀመረ! መተግበሪያውን ያጋሩ እና አስተያየት ይሰብስቡ።' :
      'Test session started! Share the app and collect feedback.'
    );
  };

  const handleSubmitFeedback = () => {
    if (!currentTester.name || !currentTester.feedback) {
      toast.error(
        language === 'en' ? 'Please fill in name and feedback' :
        language === 'sv' ? 'Vänligen fyll i namn och feedback' :
        language === 'de' ? 'Bitte Name und Feedback eingeben' :
        language === 'fr' ? 'Veuillez remplir le nom et les commentaires' :
        language === 'am' ? 'እባክዎ ስም እና አስተያየት ይሙሉ' :
        'Please fill in name and feedback'
      );
      return;
    }

    const testDuration = testStartTime ? Math.round((Date.now() - testStartTime) / 60000) : 5;
    
    const newTester: SocialTestingData = {
      testerId: `tester_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: currentTester.name,
      platform: currentTester.platform,
      profileUrl: currentTester.profileUrl,
      company: currentTester.company,
      role: currentTester.role,
      feedback: currentTester.feedback,
      rating: currentTester.rating,
      features: currentTester.features,
      timestamp: Date.now(),
      testDuration,
      shareMethod: currentTester.shareMethod
    };

    setTestingData(current => [...current, newTester]);
    
    // Reset form
    setCurrentTester({
      name: '',
      platform: 'linkedin',
      profileUrl: '',
      company: '',
      role: '',
      feedback: '',
      rating: 5,
      features: [],
      shareMethod: 'direct-share'
    });
    setTestStartTime(null);

    toast.success(
      language === 'en' ? 'Feedback submitted! Thank you for testing.' :
      language === 'sv' ? 'Feedback skickat! Tack för att du testade.' :
      language === 'de' ? 'Feedback übermittelt! Danke fürs Testen.' :
      language === 'fr' ? 'Commentaires soumis ! Merci d\'avoir testé.' :
      language === 'am' ? 'አስተያየት ቀረበ! ለመሞከር እናመሰግናለን።' :
      'Feedback submitted! Thank you for testing.'
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <LinkedinLogo size={16} className="text-blue-600" />;
      case 'twitter': return <TwitterLogo size={16} className="text-black" />;
      case 'facebook': return <FacebookLogo size={16} className="text-blue-500" />;
      case 'whatsapp': return <WhatsappLogo size={16} className="text-green-500" />;
      case 'telegram': return <TelegramLogo size={16} className="text-blue-400" />;
      case 'email': return <EnvelopeSimple size={16} className="text-orange-500" />;
      default: return <Share size={16} className="text-gray-500" />;
    }
  };

  const availableFeatures = [
    'Material Search',
    'AI Recommendations', 
    'Property Comparison',
    'Sustainability Analysis',
    'Supplier Information',
    'Cost Analysis',
    'Multi-language Support',
    'Regional Database'
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Engagement Overview */}
      <Card className="border-gradient-to-r from-primary/20 to-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendUp size={20} className="text-primary" />
            <span>
              {language === 'en' && 'Social Media Engagement Analytics'}
              {language === 'sv' && 'Sociala medier engagemangsanalys'}
              {language === 'de' && 'Social Media Engagement-Analytik'}
              {language === 'fr' && 'Analyse d\'engagement des réseaux sociaux'}
              {language === 'am' && 'የማኅበራዊ ሚዲያ ተሳትፎ ትንተና'}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {language === 'en' && 'Live Data'}
              {language === 'sv' && 'Live data'}
              {language === 'de' && 'Live-Daten'}
              {language === 'fr' && 'Données en direct'}
              {language === 'am' && 'ቀጥታ መረጃ'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Share size={20} className="mx-auto text-blue-600 mb-1" />
              <div className="text-xl font-bold text-blue-700">{stats.totalEngagement.shares}</div>
              <div className="text-xs text-blue-600">
                {language === 'en' && 'Total Shares'}
                {language === 'sv' && 'Totalt delningar'}
                {language === 'de' && 'Gesamt-Shares'}
                {language === 'fr' && 'Partages totaux'}
                {language === 'am' && 'ጠቅላላ መጋራቶች'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Eye size={20} className="mx-auto text-green-600 mb-1" />
              <div className="text-xl font-bold text-green-700">{stats.totalEngagement.views}</div>
              <div className="text-xs text-green-600">
                {language === 'en' && 'Total Views'}
                {language === 'sv' && 'Totalt visningar'}
                {language === 'de' && 'Gesamt-Aufrufe'}
                {language === 'fr' && 'Vues totales'}
                {language === 'am' && 'ጠቅላላ እይታዎች'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Heart size={20} className="mx-auto text-purple-600 mb-1" />
              <div className="text-xl font-bold text-purple-700">{stats.totalEngagement.likes}</div>
              <div className="text-xs text-purple-600">
                {language === 'en' && 'Total Likes'}
                {language === 'sv' && 'Totalt gillningar'}
                {language === 'de' && 'Gesamt-Likes'}
                {language === 'fr' && 'J\'aime totaux'}
                {language === 'am' && 'ጠቅላላ ወዳጅነቶች'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <ChatCircle size={20} className="mx-auto text-amber-600 mb-1" />
              <div className="text-xl font-bold text-amber-700">{stats.totalEngagement.comments}</div>
              <div className="text-xs text-amber-600">
                {language === 'en' && 'Comments'}
                {language === 'sv' && 'Kommentarer'}
                {language === 'de' && 'Kommentare'}
                {language === 'fr' && 'Commentaires'}
                {language === 'am' && 'አስተያየቶች'}
              </div>
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="space-y-3">
            <div className="text-sm font-medium">
              {language === 'en' && 'Platform Performance'}
              {language === 'sv' && 'Plattformsprestanda'}
              {language === 'de' && 'Plattform-Performance'}
              {language === 'fr' && 'Performance de la plateforme'}
              {language === 'am' && 'የመድረክ አፈጻጸም'}
            </div>
            <div className="grid gap-2">
              {engagementData.map((engagement, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(engagement.platform)}
                    <span className="font-medium text-sm">{engagement.platform}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{engagement.shares} shares</span>
                    <span>{engagement.views} views</span>
                    <span>{engagement.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar size={20} className="text-primary" />
            <span>
              {language === 'en' && 'User Testing Statistics'}
              {language === 'sv' && 'Användarteststatistik'}
              {language === 'de' && 'Benutzerteststatistiken'}
              {language === 'fr' && 'Statistiques de test utilisateur'}
              {language === 'am' && 'የተጠቃሚ ሙከራ ስታቲስቲክስ'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Users size={20} className="mx-auto text-blue-600 mb-1" />
              <div className="text-xl font-bold text-blue-700">{stats.totalTesters}</div>
              <div className="text-xs text-blue-600">
                {language === 'en' && 'Total Testers'}
                {language === 'sv' && 'Totalt testare'}
                {language === 'de' && 'Gesamttester'}
                {language === 'fr' && 'Total testeurs'}
                {language === 'am' && 'ጠቅላላ ሙከራ ሰዎች'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendUp size={20} className="mx-auto text-green-600 mb-1" />
              <div className="text-xl font-bold text-green-700">{stats.averageRating}</div>
              <div className="text-xs text-green-600">
                {language === 'en' && 'Avg Rating'}
                {language === 'sv' && 'Genomsnittlig betyg'}
                {language === 'de' && 'Durchschn. Bewertung'}
                {language === 'fr' && 'Note moyenne'}
                {language === 'am' && 'አማካይ ደረጃ'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Clock size={20} className="mx-auto text-purple-600 mb-1" />
              <div className="text-xl font-bold text-purple-700">{stats.averageTestTime}m</div>
              <div className="text-xs text-purple-600">
                {language === 'en' && 'Avg Test Time'}
                {language === 'sv' && 'Genomsnittlig testtid'}
                {language === 'de' && 'Durchschn. Testzeit'}
                {language === 'fr' && 'Temps de test moyen'}
                {language === 'am' && 'አማካይ ሙከራ ጊዜ'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <Sparkle size={20} className="mx-auto text-amber-600 mb-1" />
              <div className="text-xl font-bold text-amber-700">
                {stats.topFeatures[0]?.count || 0}
              </div>
              <div className="text-xs text-amber-600">
                {language === 'en' && 'Top Feature Uses'}
                {language === 'sv' && 'Topp funktionsanvändning'}
                {language === 'de' && 'Top Feature-Nutzung'}
                {language === 'fr' && 'Utilisation de fonctionnalités principales'}
                {language === 'am' && 'ከፍተኛ ባህሪ አጠቃቀም'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tester Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PaperPlaneTilt size={20} className="text-primary" />
            <span>
              {language === 'en' && 'Submit Testing Feedback'}
              {language === 'sv' && 'Skicka testfeedback'}
              {language === 'de' && 'Test-Feedback einreichen'}
              {language === 'fr' && 'Soumettre des commentaires de test'}
              {language === 'am' && 'የሙከራ አስተያየት ያስገቡ'}
            </span>
            {testStartTime && (
              <Badge variant="outline" className="ml-auto">
                {language === 'en' && 'Test Active'}
                {language === 'sv' && 'Test aktivt'}
                {language === 'de' && 'Test aktiv'}
                {language === 'fr' && 'Test actif'}
                {language === 'am' && 'ሙከራ ንቁ'}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!testStartTime ? (
            <div className="text-center py-6">
              <Button onClick={handleStartTest} size="lg" className="mb-4">
                <ArrowsClockwise size={16} className="mr-2" />
                {language === 'en' && 'Start Testing Session'}
                {language === 'sv' && 'Starta testsession'}
                {language === 'de' && 'Testsitzung starten'}
                {language === 'fr' && 'Commencer la session de test'}
                {language === 'am' && 'የሙከራ ክፍለ ጊዜ ጀምር'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {language === 'en' && 'Click to start tracking your testing session and share with friends/colleagues'}
                {language === 'sv' && 'Klicka för att börja spåra din testsession och dela med vänner/kollegor'}
                {language === 'de' && 'Klicken Sie, um Ihre Testsitzung zu verfolgen und mit Freunden/Kollegen zu teilen'}
                {language === 'fr' && 'Cliquez pour commencer à suivre votre session de test et partager avec des amis/collègues'}
                {language === 'am' && 'የሙከራ ክፍለ ጊዜዎን መከታተል እና ከጓደኞች/ስራ ባልደረቦች ጋር ለመጋራት ጠቅ ያድርጉ'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* Basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">
                    {language === 'en' && 'Name *'}
                    {language === 'sv' && 'Namn *'}
                    {language === 'de' && 'Name *'}
                    {language === 'fr' && 'Nom *'}
                    {language === 'am' && 'ስም *'}
                  </Label>
                  <Input
                    value={currentTester.name}
                    onChange={(e) => setCurrentTester({...currentTester, name: e.target.value})}
                    placeholder={
                      language === 'en' ? 'Your name' :
                      language === 'sv' ? 'Ditt namn' :
                      language === 'de' ? 'Ihr Name' :
                      language === 'fr' ? 'Votre nom' :
                      language === 'am' ? 'የእርስዎ ስም' : 'Your name'
                    }
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">
                    {language === 'en' && 'Platform Used'}
                    {language === 'sv' && 'Plattform som används'}
                    {language === 'de' && 'Verwendete Plattform'}
                    {language === 'fr' && 'Plateforme utilisée'}
                    {language === 'am' && 'የተጠቀመበት መድረክ'}
                  </Label>
                  <Select 
                    value={currentTester.platform} 
                    onValueChange={(value: SocialTestingData['platform']) => 
                      setCurrentTester({...currentTester, platform: value})
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">
                        <span className="flex items-center gap-2">
                          <LinkedinLogo size={12} />
                          LinkedIn
                        </span>
                      </SelectItem>
                      <SelectItem value="twitter">
                        <span className="flex items-center gap-2">
                          <TwitterLogo size={12} />
                          Twitter/X
                        </span>
                      </SelectItem>
                      <SelectItem value="facebook">
                        <span className="flex items-center gap-2">
                          <FacebookLogo size={12} />
                          Facebook
                        </span>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <span className="flex items-center gap-2">
                          <WhatsappLogo size={12} />
                          WhatsApp
                        </span>
                      </SelectItem>
                      <SelectItem value="telegram">
                        <span className="flex items-center gap-2">
                          <TelegramLogo size={12} />
                          Telegram
                        </span>
                      </SelectItem>
                      <SelectItem value="email">
                        <span className="flex items-center gap-2">
                          <EnvelopeSimple size={12} />
                          Email
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">
                    {language === 'en' && 'Company'}
                    {language === 'sv' && 'Företag'}
                    {language === 'de' && 'Unternehmen'}
                    {language === 'fr' && 'Entreprise'}
                    {language === 'am' && 'ኩባንያ'}
                  </Label>
                  <Input
                    value={currentTester.company}
                    onChange={(e) => setCurrentTester({...currentTester, company: e.target.value})}
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">
                    {language === 'en' && 'Role'}
                    {language === 'sv' && 'Roll'}
                    {language === 'de' && 'Rolle'}
                    {language === 'fr' && 'Rôle'}
                    {language === 'am' && 'ሚና'}
                  </Label>
                  <Input
                    value={currentTester.role}
                    onChange={(e) => setCurrentTester({...currentTester, role: e.target.value})}
                    className="h-8"
                  />
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <Label className="text-sm">
                  {language === 'en' && 'Feedback *'}
                  {language === 'sv' && 'Feedback *'}
                  {language === 'de' && 'Feedback *'}
                  {language === 'fr' && 'Commentaires *'}
                  {language === 'am' && 'አስተያየት *'}
                </Label>
                <Textarea
                  value={currentTester.feedback}
                  onChange={(e) => setCurrentTester({...currentTester, feedback: e.target.value})}
                  placeholder={
                    language === 'en' ? 'Share your experience with MatOpt AI...' :
                    language === 'sv' ? 'Dela din upplevelse med MatOpt AI...' :
                    language === 'de' ? 'Teilen Sie Ihre Erfahrung mit MatOpt AI...' :
                    language === 'fr' ? 'Partagez votre expérience avec MatOpt AI...' :
                    language === 'am' ? 'ከMatOpt AI ጋር ያለዎትን ልምድ ያጋሩ...' :
                    'Share your experience with MatOpt AI...'
                  }
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Submit */}
              <Button onClick={handleSubmitFeedback} className="w-full">
                <CheckCircle size={16} className="mr-2" />
                {language === 'en' && 'Submit Feedback'}
                {language === 'sv' && 'Skicka feedback'}
                {language === 'de' && 'Feedback senden'}
                {language === 'fr' && 'Soumettre des commentaires'}
                {language === 'am' && 'አስተያየት ያስገቡ'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      {testingData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <span>
                {language === 'en' && 'Recent Feedback'}
                {language === 'sv' && 'Senaste feedback'}
                {language === 'de' && 'Neueste Rückmeldungen'}
                {language === 'fr' && 'Commentaires récents'}
                {language === 'am' && 'የቅርብ ጊዜ አስተያየት'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testingData.slice(-5).reverse().map((tester, index) => (
                <div key={tester.testerId} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(tester.platform)}
                      <span className="font-medium text-sm">{tester.name}</span>
                      {tester.company && <span className="text-xs text-muted-foreground">@ {tester.company}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>⭐ {tester.rating}/5</span>
                      <span>{tester.testDuration}m</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tester.feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}