import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  LinkedinLogo, 
  Share, 
  Copy, 
  CheckCircle,
  Users,
  ChartBar,
  Sparkle,
  Globe
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface LinkedInShareProps {
  className?: string;
}

export function LinkedInShare({ className }: LinkedInShareProps) {
  const { t, language } = useI18n();
  const [copied, setCopied] = useState(false);

  // Current app URL (in production this would be your actual domain)
  const appUrl = window.location.href;
  const appTitle = "MatOpt AI - Material Optimization Platform";
  
  // LinkedIn sharing content
  const shareContent = {
    en: {
      title: "🚀 Introducing MatOpt AI - Revolutionary Material Selection Platform",
      description: "I'm excited to share MatOpt AI, an advanced platform that helps engineers and designers select optimal materials using AI-powered recommendations. Features include:\n\n✅ AI-driven material recommendations\n✅ Machine learning optimization\n✅ Sustainability analysis\n✅ Multi-language support (EN/SV/DE/FR/AM)\n✅ Regional supplier databases\n\nTry it out and let me know what you think! Perfect for product design, manufacturing, and engineering applications.\n\n#MaterialScience #AI #Engineering #ProductDesign #Innovation #Manufacturing",
      cta: "Test the platform and share your feedback!"
    },
    sv: {
      title: "🚀 Presenterar MatOpt AI - Revolutionerande Materialvalsplattform",
      description: "Jag är glad att dela MatOpt AI, en avancerad plattform som hjälper ingenjörer och designers att välja optimala material med AI-drivna rekommendationer. Funktioner inkluderar:\n\n✅ AI-drivna materialrekommendationer\n✅ Maskininlärningsoptimering\n✅ Hållbarhetsanalys\n✅ Flerspråksstöd (EN/SV/DE/FR/AM)\n✅ Regionala leverantörsdatabaser\n\nProva det och låt mig veta vad du tycker! Perfekt för produktdesign, tillverkning och ingenjörstillämpningar.\n\n#Materialvetenskap #AI #Ingenjörskonst #Produktdesign #Innovation #Tillverkning",
      cta: "Testa plattformen och dela din feedback!"
    },
    de: {
      title: "🚀 Vorstellung von MatOpt AI - Revolutionäre Materialauswahlplattform",
      description: "Ich freue mich, MatOpt AI zu teilen, eine fortschrittliche Plattform, die Ingenieuren und Designern hilft, optimale Materialien mit KI-gestützten Empfehlungen auszuwählen. Funktionen umfassen:\n\n✅ KI-gesteuerte Materialempfehlungen\n✅ Machine Learning-Optimierung\n✅ Nachhaltigkeitsanalyse\n✅ Mehrsprachige Unterstützung (EN/SV/DE/FR/AM)\n✅ Regionale Lieferantendatenbanken\n\nProbieren Sie es aus und lassen Sie mich wissen, was Sie denken! Perfekt für Produktdesign, Fertigung und Ingenieuranwendungen.\n\n#Materialwissenschaft #KI #Ingenieurwesen #Produktdesign #Innovation #Fertigung",
      cta: "Testen Sie die Plattform und teilen Sie Ihr Feedback!"
    },
    fr: {
      title: "🚀 Présentation de MatOpt AI - Plateforme Révolutionnaire de Sélection de Matériaux",
      description: "Je suis ravi de partager MatOpt AI, une plateforme avancée qui aide les ingénieurs et designers à sélectionner des matériaux optimaux avec des recommandations pilotées par l'IA. Les fonctionnalités incluent :\n\n✅ Recommandations de matériaux pilotées par l'IA\n✅ Optimisation par apprentissage automatique\n✅ Analyse de durabilité\n✅ Support multilingue (EN/SV/DE/FR/AM)\n✅ Bases de données de fournisseurs régionaux\n\nEssayez-le et dites-moi ce que vous en pensez ! Parfait pour la conception de produits, la fabrication et les applications d'ingénierie.\n\n#ScienceDesMatériaux #IA #Ingénierie #ConceptionProduit #Innovation #Fabrication",
      cta: "Testez la plateforme et partagez vos commentaires !"
    },
    am: {
      title: "🚀 MatOpt AI ማስተዋወቅ - አብዮታዊ የቁሳቁስ ምርጫ መድረክ",
      description: "MatOpt AI የሚለውን ላካፍላችሁ ደስ ይላል፣ ይህ የላቀ መድረክ ነው የምህንድስና እና ዲዛይን ባለሙያዎች AI-powered recommendations በመጠቀም ምርጥ ቁሳቁሶችን እንዲመርጡ የሚረዳ። ባህሪዎች የሚከተሉትን ያካትታሉ:\n\n✅ AI-driven material recommendations\n✅ Machine learning optimization\n✅ የዘላቂነት ትንተና\n✅ Multi-language support (EN/SV/DE/FR/AM)\n✅ Regional supplier databases\n\nይሞክሩት እና ምን እንደሚያስቡ ንገሩኝ! ለምርት ዲዛይን፣ ማምረት እና የምህንድስና አፕሊኬሽኖች ፍጹም።\n\n#MaterialScience #AI #Engineering #ProductDesign #Innovation #Manufacturing",
      cta: "መድረኩን ይሞክሩ እና ምላሽዎን ያጋሩ!"
    }
  };

  const currentContent = shareContent[language as keyof typeof shareContent] || shareContent.en;

  // Generate LinkedIn share URL
  const generateLinkedInShareUrl = () => {
    const params = new URLSearchParams({
      url: appUrl,
      title: currentContent.title,
      summary: currentContent.description,
      source: "MatOpt AI"
    });
    
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
  };

  // Copy share content to clipboard
  const copyShareContent = async () => {
    const fullContent = `${currentContent.title}\n\n${currentContent.description}\n\n🔗 ${appUrl}\n\n${currentContent.cta}`;
    
    try {
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      toast.success(
        language === 'en' ? 'Share content copied to clipboard!' :
        language === 'sv' ? 'Delningsinnehåll kopierat till urklipp!' :
        language === 'de' ? 'Teilen-Inhalt in die Zwischenablage kopiert!' :
        language === 'fr' ? 'Contenu de partage copié dans le presse-papiers!' :
        language === 'am' ? 'የመጋራት ይዘት ወደ clipboard ተቀድቷል!' :
        'Share content copied to clipboard!'
      );
      
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  // Share directly to LinkedIn
  const shareToLinkedIn = () => {
    const shareUrl = generateLinkedInShareUrl();
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening LinkedIn share dialog...' :
      language === 'sv' ? 'Öppnar LinkedIn-delningsdialogruta...' :
      language === 'de' ? 'LinkedIn-Teilen-Dialog wird geöffnet...' :
      language === 'fr' ? 'Ouverture de la boîte de dialogue de partage LinkedIn...' :
      language === 'am' ? 'የLinkedIn መጋራት ንግግር በመክፈት ላይ...' :
      'Opening LinkedIn share dialog...'
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkedinLogo size={20} className="text-blue-600" />
          <span>
            {language === 'en' && 'Share on LinkedIn'}
            {language === 'sv' && 'Dela på LinkedIn'}
            {language === 'de' && 'Auf LinkedIn teilen'}
            {language === 'fr' && 'Partager sur LinkedIn'}
            {language === 'am' && 'በLinkedIn ላይ ያጋሩ'}
          </span>
          <Badge variant="secondary" className="ml-auto">
            {language === 'en' && 'Professional'}
            {language === 'sv' && 'Professionell'}
            {language === 'de' && 'Professionell'}
            {language === 'fr' && 'Professionnel'}
            {language === 'am' && 'ሙያዊ'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* App Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <ChartBar size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {language === 'en' && 'Materials'}
                {language === 'sv' && 'Material'}
                {language === 'de' && 'Materialien'}
                {language === 'fr' && 'Matériaux'}
                {language === 'am' && 'ቁሳቁሶች'}
              </span>
            </div>
            <div className="text-xl font-bold text-blue-700">500+</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Sparkle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">
                {language === 'en' && 'AI Features'}
                {language === 'sv' && 'AI-funktioner'}
                {language === 'de' && 'KI-Features'}
                {language === 'fr' && 'Fonctions IA'}
                {language === 'am' && 'AI ባህሪዎች'}
              </span>
            </div>
            <div className="text-xl font-bold text-green-700">10+</div>
          </div>
        </div>

        {/* Share Preview */}
        <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-blue-600">
          <h4 className="font-semibold text-sm mb-2 text-blue-900">
            {language === 'en' && 'Share Preview:'}
            {language === 'sv' && 'Förhandsvisning av delning:'}
            {language === 'de' && 'Teilen-Vorschau:'}
            {language === 'fr' && 'Aperçu du partage:'}
            {language === 'am' && 'የመጋራት ቅድመ እይታ:'}
          </h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="font-medium text-foreground">{currentContent.title}</div>
            <div className="line-clamp-3">{currentContent.description.substring(0, 150)}...</div>
            <div className="flex items-center gap-2 text-xs">
              <Globe size={12} />
              <span className="text-blue-600">{appUrl}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Button onClick={shareToLinkedIn} className="w-full bg-blue-600 hover:bg-blue-700">
            <LinkedinLogo size={16} className="mr-2" />
            {language === 'en' && 'Share Directly on LinkedIn'}
            {language === 'sv' && 'Dela direkt på LinkedIn'}
            {language === 'de' && 'Direkt auf LinkedIn teilen'}
            {language === 'fr' && 'Partager directement sur LinkedIn'}
            {language === 'am' && 'በLinkedIn ላይ በቀጥታ ያጋሩ'}
          </Button>
          
          <Button onClick={copyShareContent} variant="outline" className="w-full">
            {copied ? (
              <CheckCircle size={16} className="mr-2 text-green-600" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {copied ? (
              <>
                {language === 'en' && 'Copied!'}
                {language === 'sv' && 'Kopierat!'}
                {language === 'de' && 'Kopiert!'}
                {language === 'fr' && 'Copié!'}
                {language === 'am' && 'ተቀድቷል!'}
              </>
            ) : (
              <>
                {language === 'en' && 'Copy Share Content'}
                {language === 'sv' && 'Kopiera delningsinnehåll'}
                {language === 'de' && 'Teilen-Inhalt kopieren'}
                {language === 'fr' && 'Copier le contenu de partage'}
                {language === 'am' && 'የመጋራት ይዘት ቅዳ'}
              </>
            )}
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Users size={16} className="text-amber-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-amber-900 text-sm mb-1">
                {language === 'en' && 'Pro Tips for LinkedIn Sharing:'}
                {language === 'sv' && 'Professionella tips för LinkedIn-delning:'}
                {language === 'de' && 'Profi-Tipps für LinkedIn-Sharing:'}
                {language === 'fr' && 'Conseils professionnels pour le partage LinkedIn:'}
                {language === 'am' && 'ለLinkedIn መጋራት ሙያዊ ምክሮች:'}
              </h5>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• {language === 'en' ? 'Tag relevant colleagues and connections' : 
                        language === 'sv' ? 'Tagga relevanta kollegor och kontakter' :
                        language === 'de' ? 'Relevante Kollegen und Verbindungen markieren' :
                        language === 'fr' ? 'Taguez des collègues et connexions pertinents' :
                        language === 'am' ? 'ተዛማጅ ወንድሞች እና ግንኙነቶችን ይመልከቱ' :
                        'Tag relevant colleagues and connections'}</li>
                <li>• {language === 'en' ? 'Add your personal experience or use case' : 
                        language === 'sv' ? 'Lägg till din personliga upplevelse eller användningsfall' :
                        language === 'de' ? 'Fügen Sie Ihre persönliche Erfahrung oder Anwendungsfall hinzu' :
                        language === 'fr' ? 'Ajoutez votre expérience personnelle ou cas d\'usage' :
                        language === 'am' ? 'የእርስዎን ግላዊ ልምድ ወይም የአጠቃቀም ሁኔታ ይጨምሩ' :
                        'Add your personal experience or use case'}</li>
                <li>• {language === 'en' ? 'Post during business hours for maximum reach' : 
                        language === 'sv' ? 'Posta under arbetstid för maximal räckvidd' :
                        language === 'de' ? 'Während der Geschäftszeiten posten für maximale Reichweite' :
                        language === 'fr' ? 'Publiez pendant les heures de bureau pour une portée maximale' :
                        language === 'am' ? 'ከፍተኛ ተደራሽነት ለማግኘት በንግድ ሰዓታት ውስጥ ይለጥፉ' :
                        'Post during business hours for maximum reach'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current URL Display */}
        <div className="text-xs text-muted-foreground p-2 bg-muted/20 rounded border">
          <div className="flex items-center gap-1 mb-1">
            <Share size={12} />
            <span className="font-medium">
              {language === 'en' && 'Current App URL:'}
              {language === 'sv' && 'Aktuell app-URL:'}
              {language === 'de' && 'Aktuelle App-URL:'}
              {language === 'fr' && 'URL actuelle de l\'app:'}
              {language === 'am' && 'የአሁኑ መተግበሪያ URL:'}
            </span>
          </div>
          <code className="text-blue-600 break-all">{appUrl}</code>
        </div>
      </CardContent>
    </Card>
  );
}