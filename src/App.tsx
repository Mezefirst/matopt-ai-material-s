import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { 
  MagnifyingGlass, 
  Brain, 
  ChartBar, 
  Lightbulb,
  Sparkle,
  Robot,
  FlaskConical
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

import { materialsDatabase } from '@/data/materials';
import { initializeDemoMLData } from '@/data/demoMLData';
import { MaterialAIService } from '@/services/materialAI';
import { MLFeedbackService } from '@/services/mlFeedbackService';
import { 
  Material, 
  MaterialRequirements, 
  MaterialScore, 
  ComparisonState,
  TabType
} from '@/types/materials';

function App() {
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
        toast.error('No materials match your criteria. Try adjusting the filters.');
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
        ? ` optimized for "${safeComparisonState.requirements.applicationContext}"`
        : '';
      
      toast.success(`Found ${filtered.length} materials${contextMessage}`);
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
        toast.warning('You can compare up to 4 materials at once');
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
              <h1 className="text-3xl font-bold text-foreground">MatOpt AI</h1>
              <p className="text-muted-foreground mt-1">
                AI-powered material optimization for product designers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="text-primary" size={24} />
              <Sparkle className="text-accent" size={20} />
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
                    Selected for Comparison
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
                    View Comparison
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* ML Training Dashboard */}
            <ModelTrainingDashboard className="mt-6" />

            {/* Model Validation */}
            <ModelValidation className="mt-6" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Material Analysis</h2>
              <Select value={safeComparisonState.activeTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">
                    <span className="flex items-center gap-2">
                      <MagnifyingGlass size={16} />
                      Overview
                    </span>
                  </SelectItem>
                  <SelectItem value="prediction">
                    <span className="flex items-center gap-2">
                      <FlaskConical size={16} />
                      New Material
                    </span>
                  </SelectItem>
                  <SelectItem value="ai-recommendations">
                    <span className="flex items-center gap-2">
                      <Brain size={16} />
                      AI Recommendations
                    </span>
                  </SelectItem>
                  <SelectItem value="ml-recommendations">
                    <span className="flex items-center gap-2">
                      <Robot size={16} />
                      ML Enhanced
                    </span>
                  </SelectItem>
                  <SelectItem value="properties">
                    <span className="flex items-center gap-2">
                      <ChartBar size={16} />
                      Properties
                    </span>
                  </SelectItem>
                  <SelectItem value="sustainability">
                    <span className="flex items-center gap-2">
                      <Lightbulb size={16} />
                      Sustainability
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
                        <h3 className="text-lg font-semibold mb-2">Get Started</h3>
                        <p className="text-muted-foreground mb-4">
                          Set your requirements and search for materials to begin comparing options.
                        </p>
                        <Button onClick={handleSearch} disabled={isSearching}>
                          <MagnifyingGlass size={16} className="mr-2" />
                          {isSearching ? 'Searching...' : 'Search Materials'}
                        </Button>
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
            </div>
          </div>
        </div>
      </div>

      {/* Material Details Modal */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Material Details</DialogTitle>
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