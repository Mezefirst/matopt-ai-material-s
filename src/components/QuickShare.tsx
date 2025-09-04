import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  CheckCircle
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface QuickShareProps {
  className?: string;
}

export function QuickShare({ className }: QuickShareProps) {
  const { t, language } = useI18n();
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  const appUrl = window.location.href;
  const appTitle = "MatOpt AI - Material Optimization Platform";
  
  // Get localized share text
  const getShareText = () => {
    return language === 'en' ? 
      "🚀 Just discovered MatOpt AI - an impressive material selection platform with AI-powered recommendations! Perfect for engineers and designers. Check it out:" :
      language === 'sv' ? 
      "🚀 Upptäckte precis MatOpt AI - en imponerande materialvalsplattform med AI-drivna rekommendationer! Perfekt för ingenjörer och designers. Kolla in det:" :
      language === 'de' ? 
      "🚀 Gerade MatOpt AI entdeckt - eine beeindruckende Materialauswahlplattform mit KI-gestützten Empfehlungen! Perfekt für Ingenieure und Designer. Schau es dir an:" :
      language === 'fr' ? 
      "🚀 Je viens de découvrir MatOpt AI - une plateforme impressionnante de sélection de matériaux avec des recommandations alimentées par l'IA ! Parfait pour les ingénieurs et designers. Découvrez-le :" :
      language === 'am' ? 
      "🚀 MatOpt AI አገኘሁ - ከAI-powered recommendations ጋር አስደናቂ የቁሳቁስ ምርጫ መድረክ! ለመሐንዲሶች እና ዲዛይነሮች ፍጹም። ይመልከቱት:" :
      "🚀 Just discovered MatOpt AI - an impressive material selection platform with AI-powered recommendations! Perfect for engineers and designers. Check it out:";
  };

  // Share to LinkedIn
  const shareToLinkedIn = () => {
    const params = new URLSearchParams({
      url: appUrl,
      title: appTitle,
      summary: getShareText(),
      source: "MatOpt AI"
    });
    
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening LinkedIn share dialog...' :
      language === 'sv' ? 'Öppnar LinkedIn-delningsdialog...' :
      language === 'de' ? 'LinkedIn-Teilen-Dialog wird geöffnet...' :
      language === 'fr' ? 'Ouverture de la boîte de dialogue de partage LinkedIn...' :
      language === 'am' ? 'የLinkedIn መጋራት መገናኛ እየከፈተ...' :
      'Opening LinkedIn share dialog...'
    );
  };

  // Share to Twitter/X
  const shareToTwitter = () => {
    const text = `${getShareText()} ${appUrl}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening Twitter share dialog...' :
      language === 'sv' ? 'Öppnar Twitter-delningsdialog...' :
      language === 'de' ? 'Twitter-Teilen-Dialog wird geöffnet...' :
      language === 'fr' ? 'Ouverture de la boîte de dialogue de partage Twitter...' :
      language === 'am' ? 'የTwitter መጋራት መገናኛ እየከፈተ...' :
      'Opening Twitter share dialog...'
    );
  };

  // Share to Facebook
  const shareToFacebook = () => {
    const params = new URLSearchParams({
      u: appUrl,
      quote: getShareText()
    });
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening Facebook share dialog...' :
      language === 'sv' ? 'Öppnar Facebook-delningsdialog...' :
      language === 'de' ? 'Facebook-Teilen-Dialog wird geöffnet...' :
      language === 'fr' ? 'Ouverture de la boîte de dialogue de partage Facebook...' :
      language === 'am' ? 'የFacebook መጋራት መገናኛ እየከፈተ...' :
      'Opening Facebook share dialog...'
    );
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    const text = `${getShareText()} ${appUrl}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening WhatsApp share...' :
      language === 'sv' ? 'Öppnar WhatsApp-delning...' :
      language === 'de' ? 'WhatsApp-Teilen wird geöffnet...' :
      language === 'fr' ? 'Ouverture du partage WhatsApp...' :
      language === 'am' ? 'የWhatsApp መጋራት እየከፈተ...' :
      'Opening WhatsApp share...'
    );
  };

  // Share to Telegram
  const shareToTelegram = () => {
    const text = `${getShareText()} ${appUrl}`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(getShareText())}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    
    toast.success(
      language === 'en' ? 'Opening Telegram share...' :
      language === 'sv' ? 'Öppnar Telegram-delning...' :
      language === 'de' ? 'Telegram-Teilen wird geöffnet...' :
      language === 'fr' ? 'Ouverture du partage Telegram...' :
      language === 'am' ? 'የTelegram መጋራት እየከፈተ...' :
      'Opening Telegram share...'
    );
  };

  // Share via Email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(appTitle);
    const body = encodeURIComponent(`${getShareText()}\n\n${appUrl}\n\nBest regards!`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    toast.success(
      language === 'en' ? 'Opening email client...' :
      language === 'sv' ? 'Öppnar e-postklient...' :
      language === 'de' ? 'E-Mail-Client wird geöffnet...' :
      language === 'fr' ? 'Ouverture du client de messagerie...' :
      language === 'am' ? 'የኢሜል ተቀባይ እየከፈተ...' :
      'Opening email client...'
    );
  };

  // Copy URL to clipboard
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      
      toast.success(
        language === 'en' ? 'URL copied to clipboard!' :
        language === 'sv' ? 'URL kopierad till urklipp!' :
        language === 'de' ? 'URL in die Zwischenablage kopiert!' :
        language === 'fr' ? 'URL copiée dans le presse-papiers!' :
        language === 'am' ? 'URL ወደ clipboard ተቀድቷል!' :
        'URL copied to clipboard!'
      );
    } catch (error) {
      console.error('Failed to copy URL');
      toast.error(
        language === 'en' ? 'Failed to copy URL' :
        language === 'sv' ? 'Misslyckades med att kopiera URL' :
        language === 'de' ? 'URL konnte nicht kopiert werden' :
        language === 'fr' ? 'Échec de la copie de l\'URL' :
        language === 'am' ? 'URL ቅዳት አልተሳካም' :
        'Failed to copy URL'
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Share size={16} className="text-primary" />
          <span>
            {language === 'en' && 'Social Media & Email'}
            {language === 'sv' && 'Sociala medier & E-post'}
            {language === 'de' && 'Soziale Medien & E-Mail'}
            {language === 'fr' && 'Réseaux sociaux & E-mail'}
            {language === 'am' && 'ማኅበራዊ ሚዲያ እና ኢሜይል'}
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {language === 'en' && 'Share'}
            {language === 'sv' && 'Dela'}
            {language === 'de' && 'Teilen'}
            {language === 'fr' && 'Partager'}
            {language === 'am' && 'ማጋራት'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Media Platforms */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">
            {language === 'en' && 'Social Media Platforms'}
            {language === 'sv' && 'Sociala medieplattformar'}
            {language === 'de' && 'Social Media Plattformen'}
            {language === 'fr' && 'Plateformes de réseaux sociaux'}
            {language === 'am' && 'የማኅበራዊ ሚዲያ መድረኮች'}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={shareToLinkedIn} 
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
              size="sm"
            >
              <LinkedinLogo size={12} className="mr-1" />
              LinkedIn
            </Button>
            
            <Button 
              onClick={shareToTwitter} 
              className="bg-black hover:bg-gray-800 text-white text-xs"
              size="sm"
            >
              <TwitterLogo size={12} className="mr-1" />
              Twitter/X
            </Button>
            
            <Button 
              onClick={shareToFacebook} 
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
              size="sm"
            >
              <FacebookLogo size={12} className="mr-1" />
              Facebook
            </Button>
            
            <Button 
              onClick={shareToWhatsApp} 
              className="bg-green-500 hover:bg-green-600 text-white text-xs"
              size="sm"
            >
              <WhatsappLogo size={12} className="mr-1" />
              WhatsApp
            </Button>
          </div>
          
          <Button 
            onClick={shareToTelegram} 
            className="w-full bg-blue-400 hover:bg-blue-500 text-white text-xs"
            size="sm"
          >
            <TelegramLogo size={12} className="mr-2" />
            Telegram
          </Button>
        </div>

        <Separator />

        {/* Email and Direct Share */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">
            {language === 'en' && 'Direct Sharing'}
            {language === 'sv' && 'Direkt delning'}
            {language === 'de' && 'Direktes Teilen'}
            {language === 'fr' && 'Partage direct'}
            {language === 'am' && 'ቀጥተኛ መጋራት'}
          </div>
          
          <Button 
            onClick={shareViaEmail} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <EnvelopeSimple size={14} className="mr-2" />
            {language === 'en' && 'Share via Email'}
            {language === 'sv' && 'Dela via e-post'}
            {language === 'de' && 'Per E-Mail teilen'}
            {language === 'fr' && 'Partager par e-mail'}
            {language === 'am' && 'በኢሜይል ያጋሩ'}
          </Button>
          
          <Button 
            onClick={copyUrl} 
            variant="outline" 
            className="w-full"
            size="sm"
          >
            {copiedUrl ? (
              <>
                <CheckCircle size={14} className="mr-2 text-green-600" />
                {language === 'en' && 'Copied!'}
                {language === 'sv' && 'Kopierat!'}
                {language === 'de' && 'Kopiert!'}
                {language === 'fr' && 'Copié!'}
                {language === 'am' && 'ተቀድቷል!'}
              </>
            ) : (
              <>
                <Copy size={14} className="mr-2" />
                {language === 'en' && 'Copy URL'}
                {language === 'sv' && 'Kopiera URL'}
                {language === 'de' && 'URL kopieren'}
                {language === 'fr' && 'Copier l\'URL'}
                {language === 'am' && 'URL ቅዳ'}
              </>
            )}
          </Button>
        </div>

        <Separator />

        {/* Analytics Section */}
        <div className="text-xs text-muted-foreground pt-2">
          <div className="flex items-center justify-between mb-2">
            <span>
              {language === 'en' && 'Share Analytics:'}
              {language === 'sv' && 'Delningsanalys:'}
              {language === 'de' && 'Teilen-Analytik:'}
              {language === 'fr' && 'Analyses de partage:'}
              {language === 'am' && 'የመጋራት ትንተና:'}
            </span>
            <span className="flex items-center gap-1">
              <TrendUp size={10} />
              <span className="text-green-600 font-medium">+23%</span>
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">
                {language === 'en' && 'Most Popular:'}
                {language === 'sv' && 'Mest populärt:'}
                {language === 'de' && 'Am beliebtesten:'}
                {language === 'fr' && 'Le plus populaire:'}
                {language === 'am' && 'በጣም ተወዳጅ:'}
              </div>
              <div className="text-primary">LinkedIn (45%)</div>
            </div>
            <div>
              <div className="font-medium">
                {language === 'en' && 'Best Time:'}
                {language === 'sv' && 'Bästa tid:'}
                {language === 'de' && 'Beste Zeit:'}
                {language === 'fr' && 'Meilleur moment:'}
                {language === 'am' && 'ምርጥ ጊዜ:'}
              </div>
              <div className="text-accent">
                {language === 'en' && '9-11 AM'}
                {language === 'sv' && '9-11'}
                {language === 'de' && '9-11 Uhr'}
                {language === 'fr' && '9h-11h'}
                {language === 'am' && '9-11 ጠዋት'}
              </div>
            </div>
          </div>
          
          <div className="mt-2 p-2 bg-muted/30 rounded text-xs">
            💡 {language === 'en' && 'Tip: LinkedIn and email work best for professional audiences. WhatsApp and Telegram are great for quick sharing with colleagues.'}
            {language === 'sv' && 'Tips: LinkedIn och e-post fungerar bäst för professionella målgrupper. WhatsApp och Telegram är bra för snabb delning med kollegor.'}
            {language === 'de' && 'Tipp: LinkedIn und E-Mail funktionieren am besten für professionelle Zielgruppen. WhatsApp und Telegram sind großartig für schnelles Teilen mit Kollegen.'}
            {language === 'fr' && 'Conseil: LinkedIn et l\'e-mail fonctionnent mieux pour les audiences professionnelles. WhatsApp et Telegram sont parfaits pour un partage rapide avec des collègues.'}
            {language === 'am' && 'ምክር: LinkedIn እና ኢሜይል ለሙያዊ ተመልካቾች በጣም ይሠራሉ። WhatsApp እና Telegram ከስራ ባልደረቦች ጋር ፈጣን ለመጋራት ጥሩ ናቸው።'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}