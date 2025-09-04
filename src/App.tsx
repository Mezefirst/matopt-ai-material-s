import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { useI18n } from '@/i18n';
import { 
  MagnifyingGlass, 
  Brain, 
  ChartBar, 
  Lightbulb,
  Sparkle,
  Robot,
  FlaskConical,
  MapPin,
  Globe,
  ArrowRight
} from '@phosphor-icons/react';

import { MaterialFilters } from '@/components/MaterialFilters';
import { MaterialCard } from '@/components/MaterialCard';
import { MaterialDetails } from '@/components/MaterialDetails';
import { MaterialComparison } from '@/components/MaterialComparison';
import { AIRecommendations } from '@/components/AIRecommendations';
import { MLRecommendations } from '@/components/MLRecommendations';
import { MLDashboard } from '@/components/MLDashboard';
import { ApplicationContext } from '@/components/ApplicationContext';
import { NewMaterialPrediction } from '@/components/NewMaterialPrediction';
import { ModelTrainingDashboard } from '@/components/ModelTrainingDashboard';
import { ModelValidation } from '@/components/ModelValidation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { RegionalDatabaseExplorer } from '@/components/RegionalDatabaseExplorer';

import { materialsDatabase } from '@/data/materials';
import { initializeDemoMLData } from '@/data/demoMLData';
import { MaterialAIService } from '@/services/materialAI';
import { MLFeedbackService } from '@/services/mlFeedbackService';
import { 
  Material, 
  MaterialRequirements, 
  MaterialScore, 
  ComparisonState,
  TabType,
  Supplier
} from '@/types/materials';

function App() {
  const { t, language } = useI18n();
  
  const [comparisonState, setComparisonState] = useKV<ComparisonState>('material-comparison', {
    selectedMaterials: [],
    activeTab: 'overview',
    requirements: {},
    scores: {}
  });

  // Generate a session ID for ML feedback tracking
  const [sessionId] = useKV<string>('session-id', 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  // Handle the case where comparisonState might be undefined
  const safeComparisonState = comparisonState || {
    selectedMaterials: [],
    activeTab: 'overview' as TabType,
    requirements: {},
    scores: {}
  };

  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(materialsDatabase);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [tradeoffAnalysis, setTradeoffAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  // Initialize demo ML data on app start
  useEffect(() => {
    initializeDemoMLData();
  }, []);

  const updateComparisonState = (updates: Partial<ComparisonState>) => {
    setComparisonState(current => ({ ...safeComparisonState, ...updates }));
  };

  const filterMaterials = (materials: Material[], requirements: MaterialRequirements) => {
    return materials.filter(material => {
      // Tensile strength filter
      if (requirements.tensileStrength) {
        const { min = 0, max = Infinity } = requirements.tensileStrength;
        if (material.properties.tensileStrength < min || material.properties.tensileStrength > max) {
          return false;
        }
      }

      // Density filter
      if (requirements.density) {
        const { min = 0, max = Infinity } = requirements.density;
        if (material.properties.density < min || material.properties.density > max) {
          return false;
        }
      }

      // Budget filter
      if (requirements.budget) {
        const { min = 0, max = Infinity } = requirements.budget;
        if (material.cost.pricePerKg < min || material.cost.pricePerKg > max) {
          return false;
        }
      }

      // Operating temperature filter
      if (requirements.operatingTemp) {
        const { min = -Infinity, max = Infinity } = requirements.operatingTemp;
        if (material.properties.operatingTempMax < min || material.properties.operatingTempMin > max) {
          return false;
        }
      }

      // Electrical type filter
      if (requirements.electricalType && requirements.electricalType !== 'any') {
        if (requirements.electricalType === 'conductor') {
          // Good conductors typically have conductivity > 1 MS/m
          if (material.properties.electricalConductivity < 1) return false;
        } else if (requirements.electricalType === 'insulator') {
          // Good insulators typically have resistivity > 1,000,000 µΩ·cm
          if (material.properties.electricalResistivity < 1000000) return false;
        } else if (requirements.electricalType === 'semiconductor') {
          // Semiconductors typically have moderate resistivity
          if (material.properties.electricalResistivity < 1 || material.properties.electricalResistivity > 1000000) return false;
        }
      }

      // Electrical conductivity filter
      if (requirements.electricalConductivity) {
        const { min = 0, max = Infinity } = requirements.electricalConductivity;
        if (material.properties.electricalConductivity < min || material.properties.electricalConductivity > max) {
          return false;
        }
      }

      // Electrical resistivity filter
      if (requirements.electricalResistivity) {
        const { min = 0, max = Infinity } = requirements.electricalResistivity;
        if (material.properties.electricalResistivity < min || material.properties.electricalResistivity > max) {
          return false;
        }
      }

      // Dielectric strength filter
      if (requirements.dielectricStrength && material.properties.dielectricStrength) {
        const { min = 0, max = Infinity } = requirements.dielectricStrength;
        if (material.properties.dielectricStrength < min || material.properties.dielectricStrength > max) {
          return false;
        }
      }

      // Region filter
      if (requirements.region && requirements.region !== 'global') {
        const hasRegionalSupplier = material.suppliers.some(supplier =>
          supplier.region.toLowerCase().includes(requirements.region!.toLowerCase()) ||
          supplier.region.toLowerCase() === 'global'
        );
        if (!hasRegionalSupplier) return false;
      }

      return true;
    });
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Filter materials based on requirements
      const filtered = filterMaterials(materialsDatabase, safeComparisonState.requirements);
      setFilteredMaterials(filtered);

      if (filtered.length === 0) {
        toast.error(t.noMaterialsFound);
        return;
      }

      // Generate AI recommendations based on application context if available
      let scores: MaterialScore[];
      
      if (safeComparisonState.requirements.applicationContext) {
        // Use application-optimized scoring when context is provided
        scores = await MaterialAIService.optimizeForApplication(
          filtered, 
          safeComparisonState.requirements.applicationContext,
          safeComparisonState.requirements
        );
      } else {
        // Use general recommendations
        scores = await MaterialAIService.generateRecommendations(
          filtered, 
          safeComparisonState.requirements
        );
      }

      const scoresMap = scores.reduce((acc, score) => {
        acc[score.materialId] = score;
        return acc;
      }, {} as Record<string, MaterialScore>);

      // Create context message for application-specific searches
      const contextMessage = safeComparisonState.requirements.applicationContext 
        ? ` (${t.optimizedFor} ${safeComparisonState.requirements.applicationContext})`
        : '';

      // Auto-select top 2 recommended materials for instant comparison (if enabled)
      const shouldAutoSelect = safeComparisonState.requirements.autoSelectTop2 !== false; // Default to true
      
      if (shouldAutoSelect && filtered.length >= 2) {
        const sortedByScore = scores
          .sort((a, b) => b.overallScore - a.overallScore)
          .slice(0, 2);
        
        const autoSelectedMaterials = sortedByScore.map(score => score.materialId);

        updateComparisonState({ 
          scores: scoresMap,
          selectedMaterials: autoSelectedMaterials,
          activeTab: 'overview'
        });
        
        const material1 = materialsDatabase.find(m => m.id === autoSelectedMaterials[0])?.name || 'Material 1';
        const material2 = materialsDatabase.find(m => m.id === autoSelectedMaterials[1])?.name || 'Material 2';
        
        toast.success(
          language === 'en' ? `${filtered.length} materials found${contextMessage}. Auto-selected top 2 for comparison: ${material1} vs ${material2}` :
          language === 'sv' ? `${filtered.length} material hittade${contextMessage}. Automatiskt valde topp 2 för jämförelse: ${material1} vs ${material2}` :
          language === 'de' ? `${filtered.length} Materialien gefunden${contextMessage}. Automatisch die Top 2 für den Vergleich ausgewählt: ${material1} vs ${material2}` :
          language === 'fr' ? `${filtered.length} matériaux trouvés${contextMessage}. Sélection automatique des 2 meilleurs pour comparaison: ${material1} vs ${material2}` :
          language === 'am' ? `${filtered.length} ቁሳቁሶች ተገኝተዋል${contextMessage}። ለንጽጽር ከፍተኛ 2 በራስ-ሰር ተመርጠዋል: ${material1} vs ${material2}` :
          `${filtered.length} materials found${contextMessage}. Auto-selected top 2 for comparison: ${material1} vs ${material2}`
        );
      } else {
        updateComparisonState({ scores: scoresMap });
        
        const manualMessage = shouldAutoSelect ? '' : ' (auto-selection disabled)';
        
        toast.success(
          language === 'en' ? `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}. Select materials manually for comparison.` :
          language === 'sv' ? `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}. Välj material manuellt för jämförelse.` :
          language === 'de' ? `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}. Wählen Sie Materialien manuell für den Vergleich aus.` :
          language === 'fr' ? `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}. Sélectionnez des matériaux manuellement pour la comparaison.` :
          language === 'am' ? `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}። ለንጽጽር በእጅ ቁሳቁሶችን ይምረጡ።` :
          `${filtered.length} ${t.materialsFound}${contextMessage}${manualMessage}. Select materials manually for comparison.`
        );
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search materials. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleMaterialSelect = (materialId: string, selected: boolean) => {
    const currentSelected = safeComparisonState.selectedMaterials;
    
    if (selected) {
      if (currentSelected.length >= 4) {
        toast.warning(t.maxMaterialsSelected);
        return;
      }
      
      const newSelected = [...currentSelected, materialId];
      updateComparisonState({ 
        selectedMaterials: newSelected
      });
      
      // Get material name for toast
      const material = materialsDatabase.find(m => m.id === materialId);
      const materialName = material?.name || 'Material';
      
      // Show appropriate toast based on selection count
      if (newSelected.length === 1) {
        toast.success(
          language === 'en' ? `${materialName} added to comparison. Select more materials to compare.` :
          language === 'sv' ? `${materialName} tillagd för jämförelse. Välj fler material att jämföra.` :
          language === 'de' ? `${materialName} zum Vergleich hinzugefügt. Wählen Sie weitere Materialien zum Vergleich aus.` :
          language === 'fr' ? `${materialName} ajouté à la comparaison. Sélectionnez plus de matériaux à comparer.` :
          language === 'am' ? `${materialName} ለንጽጽር ተጨምሯል። ለንጽጽር ተጨማሪ ቁሳቁሶችን ይምረጡ።` :
          `${materialName} added to comparison. Select more materials to compare.`
        );
      } else if (newSelected.length === 2) {
        toast.success(
          language === 'en' ? `${materialName} added! Ready to compare. Switch to Overview tab.` :
          language === 'sv' ? `${materialName} tillagd! Redo att jämföra. Växla till fliken Översikt.` :
          language === 'de' ? `${materialName} hinzugefügt! Bereit zum Vergleich. Wechseln Sie zur Übersichts-Registerkarte.` :
          language === 'fr' ? `${materialName} ajouté ! Prêt à comparer. Basculez vers l'onglet Aperçu.` :
          language === 'am' ? `${materialName} ተጨምሯል! ለንጽጽር ዝግጁ። ወደ አጠቃላይ እይታ ትር ይቀይሩ።` :
          `${materialName} added! Ready to compare. Switch to Overview tab.`
        );
      } else {
        toast.success(
          language === 'en' ? `${materialName} added to comparison (${newSelected.length}/4)` :
          language === 'sv' ? `${materialName} tillagd för jämförelse (${newSelected.length}/4)` :
          language === 'de' ? `${materialName} zum Vergleich hinzugefügt (${newSelected.length}/4)` :
          language === 'fr' ? `${materialName} ajouté à la comparaison (${newSelected.length}/4)` :
          language === 'am' ? `${materialName} ለንጽጽር ተጨምሯል (${newSelected.length}/4)` :
          `${materialName} added to comparison (${newSelected.length}/4)`
        );
      }
    } else {
      const material = materialsDatabase.find(m => m.id === materialId);
      const materialName = material?.name || 'Material';
      
      updateComparisonState({ 
        selectedMaterials: currentSelected.filter(id => id !== materialId) 
      });
      
      toast.info(
        language === 'en' ? `${materialName} removed from comparison` :
        language === 'sv' ? `${materialName} borttagen från jämförelse` :
        language === 'de' ? `${materialName} aus dem Vergleich entfernt` :
        language === 'fr' ? `${materialName} retiré de la comparaison` :
        language === 'am' ? `${materialName} ከንጽጽር ተወግዷል` :
        `${materialName} removed from comparison`
      );
    }
  };

  const handleTabChange = (value: TabType) => {
    updateComparisonState({ activeTab: value });
  };

  const generateTradeoffAnalysis = async () => {
    if (safeComparisonState.selectedMaterials.length < 2) return;

    setIsGeneratingAnalysis(true);
    try {
      const selectedMaterialObjects = materialsDatabase.filter(m => 
        safeComparisonState.selectedMaterials.includes(m.id)
      );
      
      const analysis = await MaterialAIService.compareTradeoffs(selectedMaterialObjects);
      setTradeoffAnalysis(analysis);
    } catch (error) {
      console.error('Failed to generate trade-off analysis:', error);
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  // Generate trade-off analysis when materials are selected
  useEffect(() => {
    if (safeComparisonState.selectedMaterials.length >= 2) {
      generateTradeoffAnalysis();
    } else {
      setTradeoffAnalysis('');
    }
  }, [safeComparisonState.selectedMaterials]);

  const getSelectedMaterials = () => {
    return materialsDatabase.filter(m => 
      safeComparisonState.selectedMaterials.includes(m.id)
    );
  };

  const getSortedMaterials = () => {
    const sorted = [...filteredMaterials].sort((a, b) => {
      const scoreA = safeComparisonState.scores[a.id]?.overallScore || 0;
      const scoreB = safeComparisonState.scores[b.id]?.overallScore || 0;
      return scoreB - scoreA;
    });
    
    // Debug logging
    console.log('Debug: Overview section state', {
      filteredMaterialsCount: filteredMaterials.length,
      selectedMaterialsCount: safeComparisonState.selectedMaterials.length,
      activeTab: safeComparisonState.activeTab,
      sortedMaterialsCount: sorted.length,
      hasScores: Object.keys(safeComparisonState.scores).length > 0
    });
    
    return sorted;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.appTitle}</h1>
              <p className="text-muted-foreground mt-1">
                {t.appSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end text-right">
                <div className="text-xs text-muted-foreground">{t.language}</div>
                <div className="text-sm font-medium text-foreground">
                  {language === 'en' && 'English'}
                  {language === 'sv' && 'Svenska'}
                  {language === 'de' && 'Deutsch'}
                  {language === 'fr' && 'Français'}
                  {language === 'am' && 'አማርኛ'}
                </div>
              </div>
              <LanguageSelector />
              <div className="flex items-center gap-2">
                <Brain className="text-primary" size={24} />
                <Sparkle className="text-accent" size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ApplicationContext
              requirements={safeComparisonState.requirements}
              onRequirementsChange={(requirements) => 
                updateComparisonState({ requirements })
              }
            />
            
            <MaterialFilters
              requirements={safeComparisonState.requirements}
              onRequirementsChange={(requirements) => 
                updateComparisonState({ requirements })
              }
              onSearch={handleSearch}
              isLoading={isSearching}
            />

            {/* Selected Materials Summary */}
            {safeComparisonState.selectedMaterials.length > 0 && (
              <Card className="mt-6 border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartBar size={20} className="text-primary" />
                    {t.selectedForComparison}
                    <Badge variant="secondary" className="ml-auto">
                      {safeComparisonState.selectedMaterials.length}/4
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getSelectedMaterials().map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-2 bg-background/50 rounded border">
                        <span className="text-sm font-medium">{material.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMaterialSelect(material.id, false)}
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  {safeComparisonState.selectedMaterials.length >= 2 ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleTabChange('overview')}
                      className="w-full mt-3"
                    >
                      {t.viewComparison}
                    </Button>
                  ) : (
                    <div className="mt-3 p-2 bg-muted/50 rounded text-center">
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' && 'Select at least 2 materials to compare'}
                        {language === 'sv' && 'Välj minst 2 material för att jämföra'}
                        {language === 'de' && 'Wählen Sie mindestens 2 Materialien zum Vergleich aus'}
                        {language === 'fr' && 'Sélectionnez au moins 2 matériaux à comparer'}
                        {language === 'am' && 'ለንጽጽር ቢያንስ 2 ቁሳቁሶችን ይምረጡ'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ML Training Dashboard */}
            <ModelTrainingDashboard className="mt-6" />

            {/* Model Validation */}
            <ModelValidation className="mt-6" />

            {/* Language Switching Demo */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe size={16} className="text-primary" />
                  {language === 'en' && 'Language Features'}
                  {language === 'sv' && 'Språkfunktioner'}
                  {language === 'de' && 'Sprachfunktionen'}
                  {language === 'fr' && 'Fonctionnalités linguistiques'}
                  {language === 'am' && 'Language ባህሪዎች'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'en' && 'Available:'}
                      {language === 'sv' && 'Tillgängliga:'}
                      {language === 'de' && 'Verfügbar:'}
                      {language === 'fr' && 'Disponibles:'}
                      {language === 'am' && 'የሚገኙ:'}
                    </span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'en' && 'Current:'}
                      {language === 'sv' && 'Nuvarande:'}
                      {language === 'de' && 'Aktuell:'}
                      {language === 'fr' && 'Actuel:'}
                      {language === 'am' && 'የአሁኑ:'}
                    </span>
                    <span className="font-medium">
                      {language === 'en' && 'EN'}
                      {language === 'sv' && 'SV'}
                      {language === 'de' && 'DE'}
                      {language === 'fr' && 'FR'}
                      {language === 'am' && 'AM'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'en' && 'Type:'}
                      {language === 'sv' && 'Typ:'}
                      {language === 'de' && 'Typ:'}
                      {language === 'fr' && 'Type:'}
                      {language === 'am' && 'ዓይነት:'}
                    </span>
                    <span className="font-medium text-xs">
                      {language === 'en' && 'Full'}
                      {language === 'sv' && 'Fullständig'}
                      {language === 'de' && 'Vollständig'}
                      {language === 'fr' && 'Complet'}
                      {language === 'am' && 'ሙሉ'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    {language === 'en' && 'Try switching languages above to see the interface adapt in real-time!'}
                    {language === 'sv' && 'Prova att byta språk ovan för att se gränssnittet anpassa sig i realtid!'}
                    {language === 'de' && 'Versuchen Sie, die Sprache oben zu wechseln, um zu sehen, wie sich die Benutzeroberfläche in Echtzeit anpasst!'}
                    {language === 'fr' && 'Essayez de changer de langue ci-dessus pour voir l\'interface s\'adapter en temps réel!'}
                    {language === 'am' && 'ከላይ ያለውን ቋንቋ ቀይረው በቅጽበት ጊዜ ውስጥ የበይነ መረቡ አንደሚላመድ ይመልከቱ!'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">{t.materialAnalysis}</h2>
              <Select value={safeComparisonState.activeTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder={t.selectAnalysisType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">
                    <span className="flex items-center gap-2">
                      <MagnifyingGlass size={16} />
                      {t.overview}
                    </span>
                  </SelectItem>
                  <SelectItem value="prediction">
                    <span className="flex items-center gap-2">
                      <FlaskConical size={16} />
                      {t.newMaterial}
                    </span>
                  </SelectItem>
                  <SelectItem value="ai-recommendations">
                    <span className="flex items-center gap-2">
                      <Brain size={16} />
                      {t.aiRecommendations}
                    </span>
                  </SelectItem>
                  <SelectItem value="ml-recommendations">
                    <span className="flex items-center gap-2">
                      <Robot size={16} />
                      {t.mlEnhanced}
                    </span>
                  </SelectItem>
                  <SelectItem value="properties">
                    <span className="flex items-center gap-2">
                      <ChartBar size={16} />
                      {t.properties}
                    </span>
                  </SelectItem>
                  <SelectItem value="sustainability">
                    <span className="flex items-center gap-2">
                      <Lightbulb size={16} />
                      {t.sustainability}
                    </span>
                  </SelectItem>
                  <SelectItem value="regional-database">
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {t.regionalDatabase || 'Regional Database'}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {safeComparisonState.activeTab === 'overview' && (
                safeComparisonState.selectedMaterials.length > 0 ? (
                  <MaterialComparison
                    materials={getSelectedMaterials()}
                    scores={safeComparisonState.scores}
                    tradeoffAnalysis={tradeoffAnalysis}
                  />
                ) : filteredMaterials.length > 0 ? (
                  <div className="space-y-6">
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="text-center py-4">
                          <ChartBar size={32} className="mx-auto text-primary mb-3" />
                          <h3 className="text-lg font-semibold mb-2 text-primary">
                            {language === 'en' && 'Step 2: Select Materials to Compare'}
                            {language === 'sv' && 'Steg 2: Välj material att jämföra'}
                            {language === 'de' && 'Schritt 2: Materialien zum Vergleich auswählen'}
                            {language === 'fr' && 'Étape 2 : Sélectionner des matériaux à comparer'}
                            {language === 'am' && 'ደረጃ 2: ለንጽጽር የሚሆኑ ቁሳቁሶችን ይምረጡ'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {language === 'en' && 'Click the checkboxes below to select materials for detailed side-by-side comparison. Select at least 2 materials to see the comparison table.'}
                            {language === 'sv' && 'Klicka på kryssrutorna nedan för att välja material för detaljerad jämförelse sida vid sida. Välj minst 2 material för att se jämförelsetabellen.'}
                            {language === 'de' && 'Klicken Sie auf die Kontrollkästchen unten, um Materialien für einen detaillierten Vergleich nebeneinander auszuwählen. Wählen Sie mindestens 2 Materialien aus, um die Vergleichstabelle zu sehen.'}
                            {language === 'fr' && 'Cliquez sur les cases à cocher ci-dessous pour sélectionner des matériaux pour une comparaison détaillée côte à côte. Sélectionnez au moins 2 matériaux pour voir le tableau de comparaison.'}
                            {language === 'am' && 'ለዝርዝር አጠገብ ለጎን ንጽጽር ቁሳቁሶችን ለመምረጥ ከታች ያለውን ምልክት ጠቅ ያድርጉ። የንጽጽር ሰንጠረዥን ለማየት ቢያንስ 2 ቁሳቁሶችን ይምረጡ።'}
                          </p>
                          
                          {/* Progress indicator */}
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {language === 'en' && 'Step 1 Complete: Materials Found'}
                              {language === 'sv' && 'Steg 1 klart: Material hittade'}
                              {language === 'de' && 'Schritt 1 abgeschlossen: Materialien gefunden'}
                              {language === 'fr' && 'Étape 1 terminée : Matériaux trouvés'}
                              {language === 'am' && 'ደረጃ 1 ተጠናቋል: ቁሳቁሶች ተገኝተዋል'}
                            </div>
                            <ArrowRight size={12} className="text-muted-foreground" />
                            <div className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                              {language === 'en' && 'Step 2: Select Materials'}
                              {language === 'sv' && 'Steg 2: Välj material'}
                              {language === 'de' && 'Schritt 2: Materialien auswählen'}
                              {language === 'fr' && 'Étape 2 : Sélectionner des matériaux'}
                              {language === 'am' && 'ደረጃ 2: ቁሳቁሶችን ይምረጡ'}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Checkbox checked={true} className="pointer-events-none" />
                              <span>
                                {language === 'en' && 'Selected for comparison'}
                                {language === 'sv' && 'Vald för jämförelse'}
                                {language === 'de' && 'Für Vergleich ausgewählt'}
                                {language === 'fr' && 'Sélectionné pour comparaison'}
                                {language === 'am' && 'ለንጽጽር የተመረጠ'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox className="pointer-events-none" />
                              <span>
                                {language === 'en' && 'Available to select'}
                                {language === 'sv' && 'Tillgänglig att välja'}
                                {language === 'de' && 'Verfügbar zur Auswahl'}
                                {language === 'fr' && 'Disponible à sélectionner'}
                                {language === 'am' && 'ለምርጫ ዝግጁ'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Material selection cards with checkboxes */}
                    <div className="space-y-4">
                      {/* Quick selection hint */}
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/20 p-2 rounded-full">
                            <ChartBar size={16} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {language === 'en' && 'Quick Tip: How to Compare Materials'}
                              {language === 'sv' && 'Snabbtips: Så jämför du material'}
                              {language === 'de' && 'Schnelltipp: So vergleichen Sie Materialien'}
                              {language === 'fr' && 'Conseil rapide : Comment comparer les matériaux'}
                              {language === 'am' && 'ፈጣን ምክር: ቁሳቁሶችን እንዴት ማወዳደር እንደሚቻል'}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === 'en' && 'Click the checkbox next to any material to add it to your comparison. Once you select 2+ materials, return to see the detailed comparison table.'}
                              {language === 'sv' && 'Klicka på kryssrutan bredvid ett material för att lägga till det i din jämförelse. När du väljer 2+ material, återvänd för att se den detaljerade jämförelsetabellen.'}
                              {language === 'de' && 'Klicken Sie auf das Kontrollkästchen neben einem Material, um es zu Ihrem Vergleich hinzuzufügen. Sobald Sie 2+ Materialien auswählen, kehren Sie zurück, um die detaillierte Vergleichstabelle zu sehen.'}
                              {language === 'fr' && 'Cliquez sur la case à cocher à côté d\'un matériau pour l\'ajouter à votre comparaison. Une fois que vous sélectionnez 2+ matériaux, revenez pour voir le tableau de comparaison détaillé.'}
                              {language === 'am' && 'ማንኛውንም ቁሳቁስ ወደ ንጽጽርዎ ለመጨመር ከሱ አጠገብ ያለውን ምልክት ጠቅ ያድርጉ። 2+ ቁሳቁሶችን ከመረጡ በኋላ፣ ዝርዝር የንጽጽር ሠንጠረዥን ለማየት ይመለሱ።'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-6">
                      {getSortedMaterials().map((material) => (
                        <MaterialCard
                          key={material.id}
                          material={material}
                          score={safeComparisonState.scores[material.id]}
                          isSelected={safeComparisonState.selectedMaterials.includes(material.id)}
                          onSelect={handleMaterialSelect}
                          onViewDetails={setSelectedMaterial}
                          showAIInsight={true}
                          showFeedback={true}
                          sessionId={sessionId}
                          requirements={safeComparisonState.requirements}
                          applicationContext={safeComparisonState.requirements.applicationContext}
                        />
                      ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{t.getStarted}</h3>
                        <p className="text-muted-foreground mb-6">
                          {t.setRequirements}
                        </p>
                        
                        {/* Step-by-step guide */}
                        <div className="max-w-md mx-auto mb-6 text-left bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-3 text-center">
                            {language === 'en' && 'How to Compare Materials:'}
                            {language === 'sv' && 'Så jämför du material:'}
                            {language === 'de' && 'So vergleichen Sie Materialien:'}
                            {language === 'fr' && 'Comment comparer les matériaux:'}
                            {language === 'am' && 'ቁሳቁሶችን እንዴት ማወዳደር እንደሚቻል:'}
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                              <span>
                                {language === 'en' && 'Set your requirements in the filters'}
                                {language === 'sv' && 'Ställ in dina krav i filtren'}
                                {language === 'de' && 'Stellen Sie Ihre Anforderungen in den Filtern ein'}
                                {language === 'fr' && 'Définissez vos exigences dans les filtres'}
                                {language === 'am' && 'በማጣሪያዎች ውስጥ መስፈርቶችዎን ያቀናብሩ'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xs font-bold">2</div>
                              <span>
                                {safeComparisonState.requirements.autoSelectTop2 !== false ? (
                                  <>
                                    {language === 'en' && 'Click Search - top 2 materials auto-selected'}
                                    {language === 'sv' && 'Klicka på Sök - topp 2 material väljs automatiskt'}
                                    {language === 'de' && 'Klicken Sie auf Suchen - Top 2 Materialien automatisch ausgewählt'}
                                    {language === 'fr' && 'Cliquez sur Rechercher - top 2 matériaux sélectionnés automatiquement'}
                                    {language === 'am' && 'ፈልግ ጠቅ ያድርጉ - ከፍተኛ 2 ቁሳቁሶች በራስ-ሰር ይመረጣሉ'}
                                  </>
                                ) : (
                                  <>
                                    {language === 'en' && 'Click Search - then select materials using checkboxes'}
                                    {language === 'sv' && 'Klicka på Sök - välj sedan material med kryssrutor'}
                                    {language === 'de' && 'Klicken Sie auf Suchen - dann wählen Sie Materialien mit Kontrollkästchen'}
                                    {language === 'fr' && 'Cliquez sur Rechercher - puis sélectionnez des matériaux avec les cases à cocher'}
                                    {language === 'am' && 'ፈልግ ጠቅ ያድርጉ - ከዚያ በቼክ ቦክስ ቁሳቁሶችን ይምረጡ'}
                                  </>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">★</div>
                              <span>
                                {safeComparisonState.requirements.autoSelectTop2 !== false ? (
                                  <>
                                    {language === 'en' && 'Instant comparison ready - add/remove as needed'}
                                    {language === 'sv' && 'Omedelbar jämförelse klar - lägg till/ta bort vid behov'}
                                    {language === 'de' && 'Sofortvergleich bereit - nach Bedarf hinzufügen/entfernen'}
                                    {language === 'fr' && 'Comparaison instantanée prête - ajouter/supprimer si nécessaire'}
                                    {language === 'am' && 'ቅጽበታዊ ንጽጽር ዝግጁ - እንደ አስፈላጊነቱ ይጨምሩ/ያስወግዱ'}
                                  </>
                                ) : (
                                  <>
                                    {language === 'en' && 'Manual selection - choose 2+ materials to compare'}
                                    {language === 'sv' && 'Manuellt urval - välj 2+ material för att jämföra'}
                                    {language === 'de' && 'Manuelle Auswahl - wählen Sie 2+ Materialien zum Vergleich'}
                                    {language === 'fr' && 'Sélection manuelle - choisissez 2+ matériaux à comparer'}
                                    {language === 'am' && 'በእጅ ምርጫ - ለማወዳደር 2+ ቁሳቁሶችን ይምረጡ'}
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection mode highlight */}
                        <div className={`border rounded-lg p-4 mb-4 ${
                          safeComparisonState.requirements.autoSelectTop2 !== false 
                            ? 'bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30'
                            : 'bg-gradient-to-r from-muted/30 to-muted/20 border-muted'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              safeComparisonState.requirements.autoSelectTop2 !== false 
                                ? 'bg-accent/30'
                                : 'bg-muted'
                            }`}>
                              {safeComparisonState.requirements.autoSelectTop2 !== false ? (
                                <Sparkle size={16} className="text-accent" />
                              ) : (
                                <MagnifyingGlass size={16} className="text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium text-sm ${
                                safeComparisonState.requirements.autoSelectTop2 !== false 
                                  ? 'text-accent'
                                  : 'text-foreground'
                              }`}>
                                {safeComparisonState.requirements.autoSelectTop2 !== false ? (
                                  <>
                                    {language === 'en' && '✨ Smart Auto-Selection Enabled'}
                                    {language === 'sv' && '✨ Smart Auto-Urval Aktiverat'}
                                    {language === 'de' && '✨ Intelligente Auto-Auswahl Aktiviert'}
                                    {language === 'fr' && '✨ Sélection Automatique Intelligente Activée'}
                                    {language === 'am' && '✨ ስማርት በራስ-ሰር ምርጫ ነቅቷል'}
                                  </>
                                ) : (
                                  <>
                                    {language === 'en' && '⚙️ Manual Selection Mode'}
                                    {language === 'sv' && '⚙️ Manuellt Urvalsläge'}
                                    {language === 'de' && '⚙️ Manueller Auswahlmodus'}
                                    {language === 'fr' && '⚙️ Mode de Sélection Manuelle'}
                                    {language === 'am' && '⚙️ በእጅ የመምረጥ ዘዴ'}
                                  </>
                                )}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {safeComparisonState.requirements.autoSelectTop2 !== false ? (
                                  <>
                                    {language === 'en' && 'We\'ll automatically select the top 2 best materials for instant comparison!'}
                                    {language === 'sv' && 'Vi väljer automatiskt de 2 bästa materialen för omedelbar jämförelse!'}
                                    {language === 'de' && 'Wir wählen automatisch die 2 besten Materialien für den sofortigen Vergleich aus!'}
                                    {language === 'fr' && 'Nous sélectionnerons automatiquement les 2 meilleurs matériaux pour une comparaison instantanée!'}
                                    {language === 'am' && 'ለቅጽበታዊ ንጽጽር ከፍተኛ 2 ቁሳቁሶችን በራስ-ሰር እንመርጣለን!'}
                                  </>
                                ) : (
                                  <>
                                    {language === 'en' && 'Use checkboxes below to manually select materials for comparison. Toggle auto-selection in filters to re-enable.'}
                                    {language === 'sv' && 'Använd kryssrutor nedan för att manuellt välja material för jämförelse. Växla auto-urval i filter för att återaktivera.'}
                                    {language === 'de' && 'Verwenden Sie die Kontrollkästchen unten, um Materialien manuell für den Vergleich auszuwählen. Schalten Sie die automatische Auswahl in den Filtern um, um sie zu reaktivieren.'}
                                    {language === 'fr' && 'Utilisez les cases à cocher ci-dessous pour sélectionner manuellement les matériaux à comparer. Basculez la sélection automatique dans les filtres pour la réactiver.'}
                                    {language === 'am' && 'ለንጽጽር በእጅ ቁሳቁሶችን ለመምረጥ ከታች ያሉትን ቼክ ቦክሶች ይጠቀሙ። እንደገና ለማንቃት በማጣሪያዎች ውስጥ በራስ-ሰር ምርጫን ይቀይሩ።'}
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Button onClick={handleSearch} disabled={isSearching} size="lg" className="px-8">
                          <MagnifyingGlass size={16} className="mr-2" />
                          {isSearching ? t.searching : t.searchMaterials}
                        </Button>
                        
                        {/* Language demonstration card */}
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-2">
                            {language === 'en' && 'Current interface language:'}
                            {language === 'sv' && 'Aktuellt gränssnittsspråk:'}
                            {language === 'de' && 'Aktuelle Schnittstellensprache:'}
                            {language === 'fr' && 'Langue d\'interface actuelle:'}
                            {language === 'am' && 'የአሁኑ የበይነ መረብ ቋንቋ:'}
                          </div>
                          <div className="font-semibold text-primary">
                            {language === 'en' && 'English - Full translation'}
                            {language === 'sv' && 'Svenska - Fullständig översättning'}
                            {language === 'de' && 'Deutsch - Vollständige Übersetzung'}
                            {language === 'fr' && 'Français - Traduction complète'}
                            {language === 'am' && 'አማርኛ - ሙሉ ትርጉም'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}

              {safeComparisonState.activeTab === 'prediction' && (
                <NewMaterialPrediction
                  onPredictionComplete={(prediction) => {
                    toast.success(`Properties predicted for ${prediction.name}`);
                  }}
                />
              )}

              {safeComparisonState.activeTab === 'ai-recommendations' && (
                <AIRecommendations
                  materials={filteredMaterials}
                  onMaterialSelect={(materialId) => handleMaterialSelect(materialId, true)}
                  selectedMaterials={safeComparisonState.selectedMaterials}
                />
              )}

              {safeComparisonState.activeTab === 'ml-recommendations' && (
                <MLRecommendations
                  materials={filteredMaterials}
                  requirements={safeComparisonState.requirements}
                  applicationContext={safeComparisonState.requirements.applicationContext}
                  sessionId={sessionId}
                  onMaterialSelect={(materialId) => handleMaterialSelect(materialId, true)}
                  selectedMaterials={safeComparisonState.selectedMaterials}
                />
              )}

              {safeComparisonState.activeTab === 'properties' && (
                <div className="grid gap-6">
                  {getSortedMaterials().map((material) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      score={safeComparisonState.scores[material.id]}
                      isSelected={safeComparisonState.selectedMaterials.includes(material.id)}
                      onSelect={handleMaterialSelect}
                      onViewDetails={setSelectedMaterial}
                      showAIInsight={true}
                      showFeedback={true}
                      sessionId={sessionId}
                      requirements={safeComparisonState.requirements}
                      applicationContext={safeComparisonState.requirements.applicationContext}
                    />
                  ))}
                </div>
              )}

              {safeComparisonState.activeTab === 'sustainability' && (
                <div className="grid gap-6">
                  {getSortedMaterials()
                    .sort((a, b) => b.sustainability.sustainabilityScore - a.sustainability.sustainabilityScore)
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        score={safeComparisonState.scores[material.id]}
                        isSelected={safeComparisonState.selectedMaterials.includes(material.id)}
                        onSelect={handleMaterialSelect}
                        onViewDetails={setSelectedMaterial}
                        showFeedback={true}
                        sessionId={sessionId}
                        requirements={safeComparisonState.requirements}
                        applicationContext={safeComparisonState.requirements.applicationContext}
                      />
                    ))}
                </div>
              )}

              {safeComparisonState.activeTab === 'regional-database' && (
                <RegionalDatabaseExplorer
                  onMaterialSelect={setSelectedMaterial}
                  onSupplierSelect={(supplier) => {
                    toast.success(`Supplier selected: ${supplier.name}`);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Material Details Modal */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.materialDetails}</DialogTitle>
          </DialogHeader>
          {selectedMaterial && <MaterialDetails material={selectedMaterial} />}
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      <Toaster />
    </div>
  );
}

export default App;