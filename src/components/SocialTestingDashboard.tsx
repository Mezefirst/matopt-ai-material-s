import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Clock
} from '@phosphor-icons/react';
import { useI18n } from '@/i18n';

interface SocialTestingData {
  testerId: string;
  name: string;
  linkedInProfile?: string;
  company?: string;
  role?: string;
  feedback: string;
  rating: number;
  features: string[];
  timestamp: number;
  testDuration: number; // in minutes
}

interface SocialTestingDashboardProps {
  className?: string;
}

export function SocialTestingDashboard({ className }: SocialTestingDashboardProps) {
  const { t, language } = useI18n();
  
  // Store testing data
  const [testingData, setTestingData] = useKV<SocialTestingData[]>('linkedin-testers', []);
  const [userProfile, setUserProfile] = useKV<{name: string, linkedIn: string, company: string, role: string}>('user-profile', {
    name: '',
    linkedIn: '',
    company: '',
    role: ''
  });

  // Form state
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [testStartTime] = useState(Date.now());
  
  // User profile form
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(userProfile || {
    name: '',
    linkedIn: '',
    company: '',
    role: ''
  });

  const features = [
    { id: 'ai-recommendations', label: { en: 'AI Recommendations', sv: 'AI-rekommendationer', de: 'KI-Empfehlungen', fr: 'Recommandations IA', am: 'AI መምሪያዎች' } },
    { id: 'ml-predictions', label: { en: 'ML Predictions', sv: 'ML-förutsägelser', de: 'ML-Vorhersagen', fr: 'Prédictions ML', am: 'ML ትንበያዎች' } },
    { id: 'material-comparison', label: { en: 'Material Comparison', sv: 'Materialjämförelse', de: 'Materialvergleich', fr: 'Comparaison de matériaux', am: 'የቁሳቁስ ንጽጽር' } },
    { id: 'sustainability', label: { en: 'Sustainability Analysis', sv: 'Hållbarhetsanalys', de: 'Nachhaltigkeitsanalyse', fr: 'Analyse de durabilité', am: 'የዘላቂነት ትንተና' } },
    { id: 'multi-language', label: { en: 'Multi-language Support', sv: 'Flerspråksstöd', de: 'Mehrsprachige Unterstützung', fr: 'Support multilingue', am: 'በብዙ ቋንቋ ድጋፍ' } },
    { id: 'regional-database', label: { en: 'Regional Databases', sv: 'Regionala databaser', de: 'Regionale Datenbanken', fr: 'Bases de données régionales', am: 'የክልል ዳታቤዞች' } },
    { id: 'user-interface', label: { en: 'User Interface', sv: 'Användargränssnitt', de: 'Benutzeroberfläche', fr: 'Interface utilisateur', am: 'የተጠቃሚ በይነመርፅ' } },
    { id: 'performance', label: { en: 'Performance', sv: 'Prestanda', de: 'Leistung', fr: 'Performance', am: 'አፈጻጸም' } }
  ];

  const saveProfile = () => {
    setUserProfile(profileForm);
    setIsEditingProfile(false);
    toast.success(
      language === 'en' ? 'Profile saved successfully!' :
      language === 'sv' ? 'Profil sparad framgångsrikt!' :
      language === 'de' ? 'Profil erfolgreich gespeichert!' :
      language === 'fr' ? 'Profil enregistré avec succès!' :
      language === 'am' ? 'መገለጫ በተሳካ ሁኔታ ተቀምጧል!' :
      'Profile saved successfully!'
    );
  };

  const submitFeedback = () => {
    if (!feedback.trim()) {
      toast.error(
        language === 'en' ? 'Please provide feedback before submitting' :
        language === 'sv' ? 'Vänligen ge feedback innan du skickar' :
        language === 'de' ? 'Bitte geben Sie Feedback ab, bevor Sie einreichen' :
        language === 'fr' ? 'Veuillez fournir des commentaires avant de soumettre' :
        language === 'am' ? 'ከመላክዎ በፊት እባክዎን አስተያየት ይስጡ' :
        'Please provide feedback before submitting'
      );
      return;
    }

    const testDuration = Math.round((Date.now() - testStartTime) / (1000 * 60)); // in minutes
    
    const newFeedback: SocialTestingData = {
      testerId: `tester_${Date.now()}`,
      name: userProfile?.name || 'Anonymous Tester',
      linkedInProfile: userProfile?.linkedIn,
      company: userProfile?.company,
      role: userProfile?.role,
      feedback,
      rating,
      features: selectedFeatures,
      timestamp: Date.now(),
      testDuration
    };

    setTestingData(current => [...(current || []), newFeedback]);
    
    // Reset form
    setFeedback('');
    setRating(5);
    setSelectedFeatures([]);
    
    toast.success(
      language === 'en' ? 'Thank you for your feedback! Your input helps improve MatOpt AI.' :
      language === 'sv' ? 'Tack för din feedback! Din input hjälper till att förbättra MatOpt AI.' :
      language === 'de' ? 'Vielen Dank für Ihr Feedback! Ihr Input hilft dabei, MatOpt AI zu verbessern.' :
      language === 'fr' ? 'Merci pour vos commentaires! Votre contribution aide à améliorer MatOpt AI.' :
      language === 'am' ? 'ለአስተያየትዎ እናመሰግናለን! ማስተዋል MatOpt AI ለማሻሻል ይረዳል።' :
      'Thank you for your feedback! Your input helps improve MatOpt AI.'
    );
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(current => 
      current.includes(featureId) 
        ? current.filter(id => id !== featureId)
        : [...current, featureId]
    );
  };

  const stats = {
    totalTesters: testingData?.length || 0,
    averageRating: testingData?.length ? 
      (testingData.reduce((sum, test) => sum + test.rating, 0) / testingData.length).toFixed(1) : '0',
    averageTestTime: testingData?.length ?
      Math.round(testingData.reduce((sum, test) => sum + test.testDuration, 0) / testingData.length) : 0,
    topFeatures: testingData?.length ? 
      features.map(feature => ({
        ...feature,
        count: testingData.reduce((count, test) => 
          count + (test.features.includes(feature.id) ? 1 : 0), 0)
      })).sort((a, b) => b.count - a.count).slice(0, 3) : []
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            <span>
              {language === 'en' && 'LinkedIn Testing Dashboard'}
              {language === 'sv' && 'LinkedIn testinstrumentpanel'}
              {language === 'de' && 'LinkedIn Test-Dashboard'}
              {language === 'fr' && 'Tableau de bord de test LinkedIn'}
              {language === 'am' && 'የLinkedIn ምርመራ ዳሽቦርድ'}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {stats.totalTesters} {language === 'en' ? 'Testers' : 
                                   language === 'sv' ? 'Testare' :
                                   language === 'de' ? 'Tester' :
                                   language === 'fr' ? 'Testeurs' :
                                   language === 'am' ? 'ሙከራ ሰዎች' : 'Testers'}
            </Badge>
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
                {language === 'de' ? 'Durchschn. Testzeit' :
                language === 'fr' && 'Temps de test moyen'}
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

      {/* User Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} className="text-primary" />
            <span>
              {language === 'en' && 'Your Testing Profile'}
              {language === 'sv' && 'Din testprofil'}
              {language === 'de' && 'Ihr Testprofil'}
              {language === 'fr' && 'Votre profil de test'}
              {language === 'am' && 'የእርስዎ ሙከራ መገለጫ'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="ml-auto"
            >
              {isEditingProfile ? (
                language === 'en' ? 'Cancel' :
                language === 'sv' ? 'Avbryt' :
                language === 'de' ? 'Abbrechen' :
                language === 'fr' ? 'Annuler' :
                language === 'am' ? 'ይቅር' : 'Cancel'
              ) : (
                language === 'en' ? 'Edit' :
                language === 'sv' ? 'Redigera' :
                language === 'de' ? 'Bearbeiten' :
                language === 'fr' ? 'Modifier' :
                language === 'am' ? 'አርትዕ' : 'Edit'
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditingProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    {language === 'en' && 'Full Name'}
                    {language === 'sv' && 'Fullständigt namn'}
                    {language === 'de' && 'Vollständiger Name'}
                    {language === 'fr' && 'Nom complet'}
                    {language === 'am' && 'ሙሉ ስም'}
                  </Label>
                  <Input
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">
                    {language === 'en' && 'LinkedIn Profile'}
                    {language === 'sv' && 'LinkedIn-profil'}
                    {language === 'de' && 'LinkedIn-Profil'}
                    {language === 'fr' && 'Profil LinkedIn'}
                    {language === 'am' && 'የLinkedIn መገለጫ'}
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileForm.linkedIn}
                    onChange={(e) => setProfileForm(prev => ({...prev, linkedIn: e.target.value}))}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="company">
                    {language === 'en' && 'Company'}
                    {language === 'sv' && 'Företag'}
                    {language === 'de' && 'Unternehmen'}
                    {language === 'fr' && 'Entreprise'}
                    {language === 'am' && 'ኩባንያ'}
                  </Label>
                  <Input
                    id="company"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm(prev => ({...prev, company: e.target.value}))}
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <Label htmlFor="role">
                    {language === 'en' && 'Role/Position'}
                    {language === 'sv' && 'Roll/Position'}
                    {language === 'de' && 'Rolle/Position'}
                    {language === 'fr' && 'Rôle/Position'}
                    {language === 'am' && 'ሚና/ሞያ'}
                  </Label>
                  <Input
                    id="role"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm(prev => ({...prev, role: e.target.value}))}
                    placeholder="Product Manager"
                  />
                </div>
              </div>
              <Button onClick={saveProfile} className="w-full">
                <CheckCircle size={16} className="mr-2" />
                {language === 'en' && 'Save Profile'}
                {language === 'sv' && 'Spara profil'}
                {language === 'de' && 'Profil speichern'}
                {language === 'fr' && 'Enregistrer le profil'}
                {language === 'am' && 'መገለጫ አስቀምጥ'}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>
                {language === 'en' && 'Name:'}
                {language === 'sv' && 'Namn:'}
                {language === 'de' && 'Name:'}
                {language === 'fr' && 'Nom:'}
                {language === 'am' && 'ስም:'}
              </strong> {userProfile?.name || 'Not set'}</p>
              <p><strong>
                {language === 'en' && 'Company:'}
                {language === 'sv' && 'Företag:'}
                {language === 'de' && 'Unternehmen:'}
                {language === 'fr' && 'Entreprise:'}
                {language === 'am' && 'ኩባንያ:'}
              </strong> {userProfile?.company || 'Not set'}</p>
              <p><strong>
                {language === 'en' && 'Role:'}
                {language === 'sv' && 'Roll:'}
                {language === 'de' && 'Rolle:'}
                {language === 'fr' && 'Rôle:'}
                {language === 'am' && 'ሚና:'}
              </strong> {userProfile?.role || 'Not set'}</p>
              {userProfile?.linkedIn && (
                <p><strong>LinkedIn:</strong> {userProfile.linkedIn}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share size={20} className="text-green-600" />
            <span>
              {language === 'en' && 'Submit Your Feedback'}
              {language === 'sv' && 'Skicka din feedback'}
              {language === 'de' && 'Feedback einreichen'}
              {language === 'fr' && 'Soumettre vos commentaires'}
              {language === 'am' && 'የእርስዎን አስተያየት ያስገቡ'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rating">
              {language === 'en' && 'Overall Rating (1-5)'}
              {language === 'sv' && 'Övergripande betyg (1-5)'}
              {language === 'de' && 'Gesamtbewertung (1-5)'}
              {language === 'fr' && 'Note globale (1-5)'}
              {language === 'am' && 'አጠቃላይ ደረጃ (1-5)'}
            </Label>
            <Select value={rating.toString()} onValueChange={(value) => setRating(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? '⭐' : num === 2 ? '⭐⭐' : num === 3 ? '⭐⭐⭐' : num === 4 ? '⭐⭐⭐⭐' : '⭐⭐⭐⭐⭐'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              {language === 'en' && 'Features You Tested (select all that apply)'}
              {language === 'sv' && 'Funktioner du testade (välj alla som gäller)'}
              {language === 'de' && 'Getestete Funktionen (alle zutreffenden auswählen)'}
              {language === 'fr' && 'Fonctionnalités testées (sélectionnez toutes celles qui s\'appliquent)'}
              {language === 'am' && 'የሞከሯቸው ባህሪዎች (ሁሉንም ተፈፃሚ የሆኑትን ይምረጡ)'}
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {features.map(feature => (
                <Button
                  key={feature.id}
                  variant={selectedFeatures.includes(feature.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFeature(feature.id)}
                  className="justify-start text-xs"
                >
                  {selectedFeatures.includes(feature.id) && <CheckCircle size={12} className="mr-1" />}
                  {feature.label[language as keyof typeof feature.label] || feature.label.en}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback">
              {language === 'en' && 'Detailed Feedback'}
              {language === 'sv' && 'Detaljerad feedback'}
              {language === 'de' && 'Detailliertes Feedback'}
              {language === 'fr' && 'Commentaires détaillés'}
              {language === 'am' && 'ዝርዝር አስተያየት'}
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                language === 'en' ? 'Share your experience with MatOpt AI. What did you like? What could be improved?' :
                language === 'sv' ? 'Dela din upplevelse av MatOpt AI. Vad gillade du? Vad kan förbättras?' :
                language === 'de' ? 'Teilen Sie Ihre Erfahrungen mit MatOpt AI. Was hat Ihnen gefallen? Was könnte verbessert werden?' :
                language === 'fr' ? 'Partagez votre expérience avec MatOpt AI. Qu\'avez-vous aimé ? Que pourrait-on améliorer ?' :
                language === 'am' ? 'ከMatOpt AI ጋር ያለዎትን ተሞክሮ ያጋሩ። ምን ወደዱ? ምን ሊሻሻል ይችላል?' :
                'Share your experience with MatOpt AI. What did you like? What could be improved?'
              }
              rows={4}
            />
          </div>

          <Button onClick={submitFeedback} className="w-full" size="lg">
            <Share size={16} className="mr-2" />
            {language === 'en' && 'Submit Feedback'}
            {language === 'sv' && 'Skicka feedback'}
            {language === 'de' && 'Feedback einreichen'}
            {language === 'fr' && 'Soumettre les commentaires'}
            {language === 'am' && 'አስተያየት ላክ'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      {testingData && testingData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar size={20} className="text-primary" />
              <span>
                {language === 'en' && 'Recent Feedback'}
                {language === 'sv' && 'Senaste feedback'}
                {language === 'de' && 'Neueste Rückmeldungen'}
                {language === 'fr' && 'Commentaires récents'}
                {language === 'am' && 'የቅርብ ጊዜ አስተያየቶች'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testingData.slice(-3).reverse().map((test, index) => (
                <div key={test.testerId} className="border-l-4 border-primary/30 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{test.name}</span>
                      {test.company && <Badge variant="outline" className="text-xs">{test.company}</Badge>}
                      {test.role && <Badge variant="secondary" className="text-xs">{test.role}</Badge>}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{'⭐'.repeat(test.rating)}</span>
                      <span>{test.testDuration}m</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{test.feedback}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {test.features.map(featureId => {
                      const feature = features.find(f => f.id === featureId);
                      return feature ? (
                        <Badge key={featureId} variant="outline" className="text-xs">
                          {feature.label[language as keyof typeof feature.label] || feature.label.en}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(test.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}