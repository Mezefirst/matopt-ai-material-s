import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LinkedinLogo, 
  Share, 
  Users, 
  TrendUp,
  Sparkle,
  Globe
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface QuickShareProps {
  className?: string;
}

export function QuickShare({ className }: QuickShareProps) {
  const { t, language } = useI18n();
  
  const appUrl = window.location.href;
  
  // Quick share to LinkedIn
  const quickShareToLinkedIn = () => {
    const text = language === 'en' ? 
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
    
    const params = new URLSearchParams({
      url: appUrl,
      title: "MatOpt AI - Material Optimization Platform",
      summary: text,
      source: "MatOpt AI"
    });
    
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  // Copy URL to clipboard
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      // You can add a toast here if needed
    } catch (error) {
      console.error('Failed to copy URL');
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Share size={16} className="text-primary" />
          <span>
            {language === 'en' && 'Quick Share'}
            {language === 'sv' && 'Snabbdelning'}
            {language === 'de' && 'Schnell teilen'}
            {language === 'fr' && 'Partage rapide'}
            {language === 'am' && 'ፈጣን መጋራት'}
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {language === 'en' && 'Social'}
            {language === 'sv' && 'Social'}
            {language === 'de' && 'Sozial'}
            {language === 'fr' && 'Social'}
            {language === 'am' && 'ማኅበራዊ'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={quickShareToLinkedIn} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <LinkedinLogo size={14} className="mr-2" />
          {language === 'en' && 'Share on LinkedIn'}
          {language === 'sv' && 'Dela på LinkedIn'}
          {language === 'de' && 'Auf LinkedIn teilen'}
          {language === 'fr' && 'Partager sur LinkedIn'}
          {language === 'am' && 'በLinkedIn ላይ ያጋሩ'}
        </Button>
        
        <Button 
          onClick={copyUrl} 
          variant="outline" 
          className="w-full"
          size="sm"
        >
          <Globe size={14} className="mr-2" />
          {language === 'en' && 'Copy URL'}
          {language === 'sv' && 'Kopiera URL'}
          {language === 'de' && 'URL kopieren'}
          {language === 'fr' && 'Copier l\'URL'}
          {language === 'am' && 'URL ቅዳ'}
        </Button>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center justify-between mb-1">
            <span>
              {language === 'en' && 'Engagement:'}
              {language === 'sv' && 'Engagemang:'}
              {language === 'de' && 'Engagement:'}
              {language === 'fr' && 'Engagement:'}
              {language === 'am' && 'ተሳትፎ:'}
            </span>
            <span className="flex items-center gap-1">
              <TrendUp size={10} />
              <span className="text-green-600 font-medium">+23%</span>
            </span>
          </div>
          <div className="text-xs">
            {language === 'en' && 'Best time to share: Business hours'}
            {language === 'sv' && 'Bästa tid att dela: Arbetstid'}
            {language === 'de' && 'Beste Zeit zum Teilen: Geschäftszeiten'}
            {language === 'fr' && 'Meilleur moment pour partager : Heures de bureau'}
            {language === 'am' && 'ለመጋራት ምርጥ ጊዜ: የንግድ ሰዓታት'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}