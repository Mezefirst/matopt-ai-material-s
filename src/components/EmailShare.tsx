import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  EnvelopeSimple,
  PaperPlaneTilt,
  Users,
  UserCircle,
  At,
  NotePencil,
  Globe
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface EmailShareProps {
  className?: string;
}

export function EmailShare({ className }: EmailShareProps) {
  const { t, language } = useI18n();
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    template: 'professional'
  });

  const appUrl = window.location.href;
  const appTitle = "MatOpt AI - Material Optimization Platform";

  // Email templates
  const getEmailTemplates = () => {
    return {
      professional: {
        name: language === 'en' ? 'Professional' :
              language === 'sv' ? 'Professionell' :
              language === 'de' ? 'Professionell' :
              language === 'fr' ? 'Professionnel' :
              language === 'am' ? 'ሙያዊ' : 'Professional',
        subject: language === 'en' ? 'Introducing MatOpt AI - Advanced Material Selection Platform' :
                 language === 'sv' ? 'Introducerar MatOpt AI - Avancerad materialvalsplattform' :
                 language === 'de' ? 'Einführung von MatOpt AI - Fortschrittliche Materialauswahlplattform' :
                 language === 'fr' ? 'Présentation de MatOpt AI - Plateforme avancée de sélection de matériaux' :
                 language === 'am' ? 'MatOpt AI ማስተዋወቅ - የላቀ ቁሳቁስ ምርጫ መድረክ' :
                 'Introducing MatOpt AI - Advanced Material Selection Platform',
        message: language === 'en' ? 
          `Dear Colleague,

I wanted to share an impressive tool I recently discovered - MatOpt AI, a comprehensive material selection platform that leverages artificial intelligence to optimize material choices for engineering and design projects.

Key Features:
• AI-powered material recommendations
• Comprehensive property analysis
• Sustainability metrics
• Regional supplier integration
• Multi-language support

The platform has proven particularly useful for comparing materials across different criteria like mechanical properties, cost, and environmental impact.

You can explore it here: ${appUrl}

Best regards` :
          language === 'sv' ? 
          `Kära kollega,

Jag ville dela ett imponerande verktyg jag nyligen upptäckte - MatOpt AI, en omfattande materialvalsplattform som använder artificiell intelligens för att optimera materialval för ingenjörs- och designprojekt.

Nyckelfunktioner:
• AI-drivna materialrekommendationer
• Omfattande egenskapsanalys
• Hållbarhetsmått
• Regional leverantörsintegration
• Flerspråksstöd

Plattformen har visat sig särskilt användbar för att jämföra material över olika kriterier som mekaniska egenskaper, kostnad och miljöpåverkan.

Du kan utforska den här: ${appUrl}

Med vänliga hälsningar` :
          language === 'de' ? 
          `Lieber Kollege,

Ich wollte ein beeindruckendes Tool teilen, das ich kürzlich entdeckt habe - MatOpt AI, eine umfassende Materialauswahlplattform, die künstliche Intelligenz nutzt, um Materialwahlen für Ingenieur- und Designprojekte zu optimieren.

Hauptmerkmale:
• KI-gestützte Materialempfehlungen
• Umfassende Eigenschaftsanalyse
• Nachhaltigkeitsmetriken
• Regionale Lieferantenintegration
• Mehrsprachige Unterstützung

Die Plattform hat sich als besonders nützlich erwiesen, um Materialien über verschiedene Kriterien wie mechanische Eigenschaften, Kosten und Umweltauswirkungen zu vergleichen.

Sie können es hier erkunden: ${appUrl}

Mit freundlichen Grüßen` :
          language === 'fr' ? 
          `Cher collègue,

Je voulais partager un outil impressionnant que j'ai récemment découvert - MatOpt AI, une plateforme complète de sélection de matériaux qui exploite l'intelligence artificielle pour optimiser les choix de matériaux pour les projets d'ingénierie et de conception.

Caractéristiques principales :
• Recommandations de matériaux alimentées par l'IA
• Analyse complète des propriétés
• Métriques de durabilité
• Intégration de fournisseurs régionaux
• Support multilingue

La plateforme s'est révélée particulièrement utile pour comparer les matériaux selon différents critères comme les propriétés mécaniques, le coût et l'impact environnemental.

Vous pouvez l'explorer ici : ${appUrl}

Cordialement` :
          language === 'am' ? 
          `ውድ ስራ ባልደረባ፣

በቅርቡ የአገኘሁትን አስደናቂ መሳሪያ ማጋራት ፈልጌ ነው - MatOpt AI፣ ለምህንድስና እና ዲዛይን ፕሮጀክቶች የቁሳቁስ ምርጫዎችን ለማመቻቸት artificial intelligence የሚጠቀም ሰፊ የቁሳቁስ ምርጫ መድረክ።

ቁልፍ ባህሪዎች:
• AI-powered የቁሳቁስ ምክሮች
• ሰፊ የንብረት ትንተና
• የዘላቂነት መለኪያዎች
• የክልል አቅራቢ ውህደት
• ባለብዙ ቋንቋ ድጋፍ

መድረኩ እንደ ሜካኒካዊ ባህሪያት፣ ወጪ እና የአካባቢ ተፅእኖ ባሉ የተለያዩ መስፈርቶች ቁሳቁሶችን ለማወዳደር በተለይ ጠቃሚ እንደሆነ ታይቷል።

እዚህ ማየት ይችላሉ: ${appUrl}

በክብር` :
          `Dear Colleague,

I wanted to share an impressive tool I recently discovered - MatOpt AI, a comprehensive material selection platform that leverages artificial intelligence to optimize material choices for engineering and design projects.

Key Features:
• AI-powered material recommendations
• Comprehensive property analysis
• Sustainability metrics
• Regional supplier integration
• Multi-language support

The platform has proven particularly useful for comparing materials across different criteria like mechanical properties, cost, and environmental impact.

You can explore it here: ${appUrl}

Best regards`
      },
      casual: {
        name: language === 'en' ? 'Casual' :
              language === 'sv' ? 'Vardaglig' :
              language === 'de' ? 'Lässig' :
              language === 'fr' ? 'Décontracté' :
              language === 'am' ? 'የተለመደ' : 'Casual',
        subject: language === 'en' ? 'Check out this cool material selection tool!' :
                 language === 'sv' ? 'Kolla in detta coola materialvalsverktyg!' :
                 language === 'de' ? 'Schau dir dieses coole Materialauswahl-Tool an!' :
                 language === 'fr' ? 'Découvrez cet outil de sélection de matériaux génial !' :
                 language === 'am' ? 'ይህን ደስ የሚል የቁሳቁስ ምርጫ መሳሪያ ይመልከቱ!' :
                 'Check out this cool material selection tool!',
        message: language === 'en' ? 
          `Hey!

Just found this amazing tool called MatOpt AI that helps with material selection using AI. It's really impressive - you can compare different materials, see sustainability scores, and even get AI recommendations!

Perfect for our projects. Check it out: ${appUrl}

Let me know what you think!

Cheers` :
          language === 'sv' ? 
          `Hej!

Hittade precis detta fantastiska verktyg som heter MatOpt AI som hjälper med materialval med AI. Det är verkligen imponerande - du kan jämföra olika material, se hållbarhetspoäng och till och med få AI-rekommendationer!

Perfekt för våra projekt. Kolla in det: ${appUrl}

Låt mig veta vad du tycker!

Ha det bra` :
          language === 'de' ? 
          `Hey!

Habe gerade dieses großartige Tool namens MatOpt AI gefunden, das bei der Materialauswahl mit KI hilft. Es ist wirklich beeindruckend - du kannst verschiedene Materialien vergleichen, Nachhaltigkeitsbewertungen sehen und sogar KI-Empfehlungen bekommen!

Perfekt für unsere Projekte. Schau es dir an: ${appUrl}

Lass mich wissen, was du denkst!

Cheers` :
          language === 'fr' ? 
          `Salut !

Je viens de trouver cet outil génial appelé MatOpt AI qui aide à la sélection de matériaux en utilisant l'IA. C'est vraiment impressionnant - tu peux comparer différents matériaux, voir les scores de durabilité et même obtenir des recommandations IA !

Parfait pour nos projets. Regarde ça : ${appUrl}

Dis-moi ce que tu en penses !

À bientôt` :
          language === 'am' ? 
          `ሄይ!

MatOpt AI የሚባል አስደናቂ መሳሪያ አገኘሁ AI ተጠቅሞ ቁሳቁስ መምረጥ ይረዳል። በጣም አስደናቂ ነው - የተለያዩ ቁሳቁሶችን ማወዳደር፣ የዘላቂነት ውጤቶች መመልከት እና AI ምክሮችን ማግኘት ትችላለህ!

ለፕሮጀክቶቻችን ፍጹም። ይመልከቱት: ${appUrl}

ምን እንደሚመስልህ ንገረኝ!

ጤና ይስጥልኝ` :
          `Hey!

Just found this amazing tool called MatOpt AI that helps with material selection using AI. It's really impressive - you can compare different materials, see sustainability scores, and even get AI recommendations!

Perfect for our projects. Check it out: ${appUrl}

Let me know what you think!

Cheers`
      },
      presentation: {
        name: language === 'en' ? 'Presentation' :
              language === 'sv' ? 'Presentation' :
              language === 'de' ? 'Präsentation' :
              language === 'fr' ? 'Présentation' :
              language === 'am' ? 'አቀራረብ' : 'Presentation',
        subject: language === 'en' ? 'MatOpt AI Demo - Advanced Material Selection Platform' :
                 language === 'sv' ? 'MatOpt AI Demo - Avancerad materialvalsplattform' :
                 language === 'de' ? 'MatOpt AI Demo - Fortschrittliche Materialauswahlplattform' :
                 language === 'fr' ? 'Démo MatOpt AI - Plateforme avancée de sélection de matériaux' :
                 language === 'am' ? 'MatOpt AI ማሳያ - የላቀ ቁሳቁስ ምርጫ መድረክ' :
                 'MatOpt AI Demo - Advanced Material Selection Platform',
        message: language === 'en' ? 
          `Subject: MatOpt AI Platform Demonstration

Dear Team,

I'm excited to present MatOpt AI, a revolutionary material selection platform that transforms how we approach material optimization in engineering and design projects.

🎯 DEMONSTRATION HIGHLIGHTS:

✅ AI-Powered Recommendations
• Machine learning algorithms analyze material properties
• Context-aware suggestions based on application requirements
• Continuous learning from user feedback

✅ Comprehensive Analysis
• Mechanical, thermal, and electrical properties
• Cost-benefit analysis with supplier integration
• Environmental impact and sustainability metrics

✅ Advanced Features
• Multi-language support (5 languages)
• Regional supplier databases
• Real-time material comparison
• Predictive modeling for new materials

🔗 LIVE DEMO: ${appUrl}

This platform addresses key challenges in material selection while providing data-driven insights for optimal decision-making.

I'd be happy to schedule a detailed walkthrough at your convenience.

Best regards` :
          `Subject: MatOpt AI Platform Demonstration

Dear Team,

I'm excited to present MatOpt AI, a revolutionary material selection platform that transforms how we approach material optimization in engineering and design projects.

🎯 DEMONSTRATION HIGHLIGHTS:

✅ AI-Powered Recommendations
• Machine learning algorithms analyze material properties
• Context-aware suggestions based on application requirements
• Continuous learning from user feedback

✅ Comprehensive Analysis
• Mechanical, thermal, and electrical properties
• Cost-benefit analysis with supplier integration
• Environmental impact and sustainability metrics

✅ Advanced Features
• Multi-language support (5 languages)
• Regional supplier databases
• Real-time material comparison
• Predictive modeling for new materials

🔗 LIVE DEMO: ${appUrl}

This platform addresses key challenges in material selection while providing data-driven insights for optimal decision-making.

I'd be happy to schedule a detailed walkthrough at your convenience.

Best regards`
      }
    };
  };

  const handleTemplateChange = (templateId: string) => {
    const templates = getEmailTemplates();
    const template = templates[templateId as keyof typeof templates];
    
    setEmailData({
      ...emailData,
      template: templateId,
      subject: template.subject,
      message: template.message
    });
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(emailData.subject || getEmailTemplates().professional.subject);
    const body = encodeURIComponent(emailData.message || getEmailTemplates().professional.message);
    const to = emailData.to ? `${emailData.to}` : '';
    
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    toast.success(
      language === 'en' ? 'Opening email client...' :
      language === 'sv' ? 'Öppnar e-postklient...' :
      language === 'de' ? 'E-Mail-Client wird geöffnet...' :
      language === 'fr' ? 'Ouverture du client de messagerie...' :
      language === 'am' ? 'የኢሜይል ተቀባይ እየከፈተ...' :
      'Opening email client...'
    );
  };

  const templates = getEmailTemplates();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <EnvelopeSimple size={16} className="text-primary" />
          <span>
            {language === 'en' && 'Email Sharing'}
            {language === 'sv' && 'E-postdelning'}
            {language === 'de' && 'E-Mail-Freigabe'}
            {language === 'fr' && 'Partage par e-mail'}
            {language === 'am' && 'ኢሜይል መጋራት'}
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {language === 'en' && 'Professional'}
            {language === 'sv' && 'Professionell'}
            {language === 'de' && 'Professionell'}
            {language === 'fr' && 'Professionnel'}
            {language === 'am' && 'ሙያዊ'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Template Selection */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">
            {language === 'en' && 'Email Template'}
            {language === 'sv' && 'E-postmall'}
            {language === 'de' && 'E-Mail-Vorlage'}
            {language === 'fr' && 'Modèle d\'e-mail'}
            {language === 'am' && 'የኢሜይል ቅጥ'}
          </Label>
          <Select value={emailData.template} onValueChange={handleTemplateChange}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">
                <span className="flex items-center gap-2">
                  <UserCircle size={12} />
                  {templates.professional.name}
                </span>
              </SelectItem>
              <SelectItem value="casual">
                <span className="flex items-center gap-2">
                  <Users size={12} />
                  {templates.casual.name}
                </span>
              </SelectItem>
              <SelectItem value="presentation">
                <span className="flex items-center gap-2">
                  <NotePencil size={12} />
                  {templates.presentation.name}
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">
            {language === 'en' && 'To (optional)'}
            {language === 'sv' && 'Till (valfritt)'}
            {language === 'de' && 'An (optional)'}
            {language === 'fr' && 'À (optionnel)'}
            {language === 'am' && 'ወደ (አማራጭ)'}
          </Label>
          <div className="relative">
            <At size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={
                language === 'en' ? 'colleague@company.com' :
                language === 'sv' ? 'kollega@företag.com' :
                language === 'de' ? 'kollege@firma.com' :
                language === 'fr' ? 'collegue@entreprise.com' :
                language === 'am' ? 'ባልደረባ@ኩባንያ.com' :
                'colleague@company.com'
              }
              value={emailData.to}
              onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">
            {language === 'en' && 'Subject'}
            {language === 'sv' && 'Ämne'}
            {language === 'de' && 'Betreff'}
            {language === 'fr' && 'Objet'}
            {language === 'am' && 'ርዕስ'}
          </Label>
          <Input
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">
            {language === 'en' && 'Message'}
            {language === 'sv' && 'Meddelande'}
            {language === 'de' && 'Nachricht'}
            {language === 'fr' && 'Message'}
            {language === 'am' && 'መልእክት'}
          </Label>
          <Textarea
            value={emailData.message}
            onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
            className="text-xs resize-none"
            rows={6}
          />
        </div>

        {/* Send Button */}
        <Button 
          onClick={sendEmail} 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          size="sm"
        >
          <PaperPlaneTilt size={14} className="mr-2" />
          {language === 'en' && 'Send Email'}
          {language === 'sv' && 'Skicka e-post'}
          {language === 'de' && 'E-Mail senden'}
          {language === 'fr' && 'Envoyer un e-mail'}
          {language === 'am' && 'ኢሜይል ላክ'}
        </Button>

        {/* Quick tip */}
        <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
          💡 {language === 'en' && 'Tip: The template includes all necessary context and your app URL. Recipients can explore MatOpt AI directly!'}
          {language === 'sv' && 'Tips: Mallen innehåller all nödvändig kontext och din app-URL. Mottagare kan utforska MatOpt AI direkt!'}
          {language === 'de' && 'Tipp: Die Vorlage enthält alle notwendigen Kontextinformationen und Ihre App-URL. Empfänger können MatOpt AI direkt erkunden!'}
          {language === 'fr' && 'Conseil : Le modèle inclut tout le contexte nécessaire et l\'URL de votre application. Les destinataires peuvent explorer MatOpt AI directement !'}
          {language === 'am' && 'ምክር: ቅጥው ሁሉንም አስፈላጊ አውድ እና የእርስዎን የመተግበሪያ URL ያካትታል። ተቀባዮች MatOpt AI በቀጥታ ማሰስ ይችላሉ!'}
        </div>
      </CardContent>
    </Card>
  );
}