import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Sparkle, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Target
} from '@phosphor-icons/react';
import { toast } from 'sonner';

import { MaterialAIService } from '@/services/materialAI';
import { Material, SmartRecommendation, ApplicationRecommendation } from '@/types/materials';

interface AIRecommendationsProps {
  materials: Material[];
  onMaterialSelect: (materialId: string) => void;
  selectedMaterials: string[];
}

export function AIRecommendations({ 
  materials, 
  onMaterialSelect, 
  selectedMaterials 
}: AIRecommendationsProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<SmartRecommendation | null>(null);
  const [quickInsight, setQuickInsight] = useState('');

  const handleGenerateRecommendations = async () => {
    if (!query.trim()) {
      toast.error('Please describe your application requirements');
      return;
    }

    setIsLoading(true);
    try {
      const smartRec = await MaterialAIService.generateApplicationRecommendations(
        query,
        materials
      );
      setRecommendation(smartRec);
      toast.success('AI recommendations generated successfully');
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      toast.error('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickInsight = async () => {
    if (!query.trim()) return;

    try {
      const insight = await MaterialAIService.generateQuickInsight(query);
      setQuickInsight(insight);
    } catch (error) {
      console.error('Failed to generate insight:', error);
    }
  };

  const handleSelectMaterial = (materialId: string) => {
    onMaterialSelect(materialId);
    toast.success('Material added to comparison');
  };

  const getSelectedMaterialInfo = (materialId: string) => {
    return materials.find(m => m.id === materialId);
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-primary" size={24} />
          AI-Powered Recommendations
          <Sparkle className="text-accent" size={16} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Query Input */}
        <div className="space-y-3">
          <Label htmlFor="application-query">Describe Your Application</Label>
          <Textarea
            id="application-query"
            placeholder="e.g., I need a material for an outdoor bicycle frame that will be lightweight, strong enough for 200kg load, and resistant to weather conditions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleQuickInsight}
            className="min-h-[100px]"
          />
          {quickInsight && (
            <div className="p-3 bg-muted/50 rounded-md border-l-4 border-accent">
              <div className="flex items-start gap-2">
                <Lightbulb className="text-accent mt-1" size={16} />
                <p className="text-sm text-muted-foreground">{quickInsight}</p>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerateRecommendations} 
          disabled={isLoading || !query.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Brain className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Application...
            </>
          ) : (
            <>
              <Target className="mr-2 h-4 w-4" />
              Get AI Recommendations
            </>
          )}
        </Button>

        {/* Recommendations Results */}
        {recommendation && (
          <div className="space-y-6">
            <Separator />
            
            {/* Analysis Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Brain size={18} className="text-primary" />
                Analysis Summary
              </h3>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                {recommendation.reasoning}
              </p>
            </div>

            {/* Material Recommendations */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Target size={18} className="text-primary" />
                Recommended Materials
              </h3>
              
              <div className="space-y-3">
                {recommendation.recommendedMaterials.map((rec: ApplicationRecommendation) => {
                  const material = getSelectedMaterialInfo(rec.materialId);
                  if (!material) return null;

                  const isSelected = selectedMaterials.includes(rec.materialId);

                  return (
                    <Card key={rec.materialId} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          {/* Material Header */}
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{material.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {material.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">
                                  {getSuitabilityLabel(rec.suitabilityScore)}
                                </span>
                                <div className="w-16">
                                  <Progress 
                                    value={rec.suitabilityScore} 
                                    className={`h-2 ${getSuitabilityColor(rec.suitabilityScore)}`}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {rec.suitabilityScore}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Benefits and Concerns */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <h5 className="font-medium text-green-700 dark:text-green-400 mb-1 flex items-center gap-1">
                                <CheckCircle size={14} />
                                Key Benefits
                              </h5>
                              <ul className="space-y-1">
                                {rec.keyBenefits.map((benefit, idx) => (
                                  <li key={idx} className="text-muted-foreground">• {benefit}</li>
                                ))}
                              </ul>
                            </div>
                            {rec.potentialConcerns.length > 0 && (
                              <div>
                                <h5 className="font-medium text-orange-700 dark:text-orange-400 mb-1 flex items-center gap-1">
                                  <AlertTriangle size={14} />
                                  Considerations
                                </h5>
                                <ul className="space-y-1">
                                  {rec.potentialConcerns.map((concern, idx) => (
                                    <li key={idx} className="text-muted-foreground">• {concern}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Design Considerations */}
                          {rec.designConsiderations.length > 0 && (
                            <div>
                              <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
                                <Lightbulb size={14} />
                                Design Considerations
                              </h5>
                              <ul className="text-sm space-y-1">
                                {rec.designConsiderations.map((consideration, idx) => (
                                  <li key={idx} className="text-muted-foreground">• {consideration}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="pt-2">
                            <Button
                              variant={isSelected ? "secondary" : "outline"}
                              size="sm"
                              onClick={() => handleSelectMaterial(rec.materialId)}
                              disabled={isSelected}
                              className="w-full"
                            >
                              {isSelected ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Added to Comparison
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="mr-2 h-4 w-4" />
                                  Add to Comparison
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Design Considerations */}
            {recommendation.considerations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lightbulb size={18} className="text-primary" />
                  Important Considerations
                </h3>
                <ul className="space-y-2">
                  {recommendation.considerations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <AlertTriangle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {recommendation.nextSteps.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary" />
                  Recommended Next Steps
                </h3>
                <ul className="space-y-2">
                  {recommendation.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}