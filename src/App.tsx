import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { 
  MagnifyingGlass, 
  Brain, 
  ChartBar, 
  Lightbulb,
  Sparkle
} from '@phosphor-icons/react';

import { MaterialFilters } from '@/components/MaterialFilters';
import { MaterialCard } from '@/components/MaterialCard';
import { MaterialDetails } from '@/components/MaterialDetails';
import { MaterialComparison } from '@/components/MaterialComparison';

import { materialsDatabase } from '@/data/materials';
import { MaterialAIService } from '@/services/materialAI';
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

  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(materialsDatabase);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [tradeoffAnalysis, setTradeoffAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  const updateComparisonState = (updates: Partial<ComparisonState>) => {
    setComparisonState(current => ({ ...current, ...updates }));
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
      const filtered = filterMaterials(materialsDatabase, comparisonState.requirements);
      setFilteredMaterials(filtered);

      if (filtered.length === 0) {
        toast.error('No materials match your criteria. Try adjusting the filters.');
        return;
      }

      // Generate AI recommendations
      const scores = await MaterialAIService.generateRecommendations(
        filtered, 
        comparisonState.requirements
      );

      const scoresMap = scores.reduce((acc, score) => {
        acc[score.materialId] = score;
        return acc;
      }, {} as Record<string, MaterialScore>);

      updateComparisonState({ scores: scoresMap });
      
      toast.success(`Found ${filtered.length} materials matching your criteria`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search materials. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleMaterialSelect = (materialId: string, selected: boolean) => {
    const currentSelected = comparisonState.selectedMaterials;
    
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
    if (comparisonState.selectedMaterials.length < 2) return;

    setIsGeneratingAnalysis(true);
    try {
      const selectedMaterialObjects = materialsDatabase.filter(m => 
        comparisonState.selectedMaterials.includes(m.id)
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
    if (comparisonState.selectedMaterials.length >= 2) {
      generateTradeoffAnalysis();
    } else {
      setTradeoffAnalysis('');
    }
  }, [comparisonState.selectedMaterials]);

  const getSelectedMaterials = () => {
    return materialsDatabase.filter(m => 
      comparisonState.selectedMaterials.includes(m.id)
    );
  };

  const getSortedMaterials = () => {
    return [...filteredMaterials].sort((a, b) => {
      const scoreA = comparisonState.scores[a.id]?.overallScore || 0;
      const scoreB = comparisonState.scores[b.id]?.overallScore || 0;
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
          <div className="lg:col-span-1">
            <MaterialFilters
              requirements={comparisonState.requirements}
              onRequirementsChange={(requirements) => 
                updateComparisonState({ requirements })
              }
              onSearch={handleSearch}
              isLoading={isSearching}
            />

            {/* Selected Materials Summary */}
            {comparisonState.selectedMaterials.length > 0 && (
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={comparisonState.activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <MagnifyingGlass size={16} />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="properties" className="flex items-center gap-2">
                  <ChartBar size={16} />
                  Properties
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  Sustainability
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {comparisonState.selectedMaterials.length > 0 ? (
                  <MaterialComparison
                    materials={getSelectedMaterials()}
                    scores={comparisonState.scores}
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
                )}
              </TabsContent>

              <TabsContent value="properties" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {getSortedMaterials().map((material) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      score={comparisonState.scores[material.id]}
                      isSelected={comparisonState.selectedMaterials.includes(material.id)}
                      onSelect={handleMaterialSelect}
                      onViewDetails={setSelectedMaterial}
                      showAIInsight={true}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sustainability" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {getSortedMaterials()
                    .sort((a, b) => b.sustainability.sustainabilityScore - a.sustainability.sustainabilityScore)
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        score={comparisonState.scores[material.id]}
                        isSelected={comparisonState.selectedMaterials.includes(material.id)}
                        onSelect={handleMaterialSelect}
                        onViewDetails={setSelectedMaterial}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
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