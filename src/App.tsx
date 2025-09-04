import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Globe
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

      updateComparisonState({ scores: scoresMap });
      
      const contextMessage = safeComparisonState.requirements.applicationContext 
        ? ` ${t.optimizedFor} "${safeComparisonState.requirements.applicationContext}"`
        : '';
      
      toast.success(`${filtered.length} ${t.materialsFound}${contextMessage}`);
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
      updateComparisonState({ 
        selectedMaterials: [...currentSelected, materialId] 
      });
    } else {
      updateComparisonState({ 
        selectedMaterials: currentSelected.filter(id => id !== materialId) 
      });
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
    return [...filteredMaterials].sort((a, b) => {
      const scoreA = safeComparisonState.scores[a.id]?.overallScore || 0;
      const scoreB = safeComparisonState.scores[b.id]?.overallScore || 0;
      return scoreB - scoreA;
    });
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
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartBar size={20} className="text-primary" />
                    {t.selectedForComparison}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getSelectedMaterials().map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-sm font-medium">{material.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMaterialSelect(material.id, false)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTabChange('overview')}
                    className="w-full mt-3"
                  >
                    {t.viewComparison}
                  </Button>
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
                      {language === 'am' ? (
                        'Mixed'
                      ) : (
                        language === 'en' ? 'Full' :
                        language === 'sv' ? 'Full' :
                        language === 'de' ? 'Voll' :
                        language === 'fr' ? 'Complet' : 'Full'
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    {language === 'en' && 'Try switching languages above to see the interface adapt in real-time!'}
                    {language === 'sv' && 'Prova att byta språk ovan för att se gränssnittet anpassa sig i realtid!'}
                    {language === 'de' && 'Versuchen Sie, die Sprache oben zu wechseln, um zu sehen, wie sich die Benutzeroberfläche in Echtzeit anpasst!'}
                    {language === 'fr' && 'Essayez de changer de langue ci-dessus pour voir l\'interface s\'adapter en temps réel!'}
                    {language === 'am' && 'ከላይ languages ቀይረው interface በ real-time እንዴት እንደሚላመድ ይመልከቱ!'}
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
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{t.getStarted}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.setRequirements}
                        </p>
                        <Button onClick={handleSearch} disabled={isSearching}>
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
                            {language === 'am' && 'የአሁኑ interface ቋንቋ:'}
                          </div>
                          <div className="font-semibold text-primary">
                            {language === 'en' && 'English - Full translation'}
                            {language === 'sv' && 'Svenska - Fullständig översättning'}
                            {language === 'de' && 'Deutsch - Vollständige Übersetzung'}
                            {language === 'fr' && 'Français - Traduction complète'}
                            {language === 'am' && 'አማርኛ - Mixed translation (ድብልቅ ትርጉም)'}
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