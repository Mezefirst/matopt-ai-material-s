import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkle
} from '@phosphor-icons/react';

import { Material, MaterialRequirements, RecommendationExplanation, MaterialScore } from '@/types/materials';
import { MLFeedbackService } from '@/services/mlFeedbackService';
import { MaterialCard } from './MaterialCard';

// Import MLInsights separately since it's defined in FeedbackCollector
import { MLInsights } from './FeedbackCollector';

interface MLRecommendationsProps {
  materials: Material[];
  requirements: MaterialRequirements;
  applicationContext?: string;
  sessionId: string;
  onMaterialSelect?: (materialId: string) => void;
  selectedMaterials?: string[];
}

export function MLRecommendations({
  materials,
  requirements,
  applicationContext,
  sessionId,
  onMaterialSelect,
  selectedMaterials = []
}: MLRecommendationsProps) {
  const [mlScores, setMlScores] = useState<MaterialScore[]>([]);
  const [explanations, setExplanations] = useState<Record<string, RecommendationExplanation>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMLRecommendations = async () => {
    if (materials.length === 0) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await MLFeedbackService.generateMLRecommendations(
        materials,
        requirements,
        applicationContext
      );
      
      if (result.scores.length > 0) {
        setMlScores(result.scores);
        setExplanations(result.explanations);
      } else {
        // Fall back to basic recommendations if ML model not available
        setError('ML model not yet trained. Showing basic recommendations.');
      }
    } catch (err) {
      console.error('Failed to generate ML recommendations:', err);
      setError('Failed to generate ML-enhanced recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmitted = () => {
    // Optionally refresh recommendations after feedback
    generateMLRecommendations();
  };

  useEffect(() => {
    generateMLRecommendations();
  }, [materials, requirements, applicationContext]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Generating ML Recommendations</h3>
            <p className="text-muted-foreground">
              Analyzing user feedback patterns and material properties...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* ML Insights Dashboard */}
      <MLInsights />

      {/* Error Alert */}
      {error && (
        <Alert>
          <Info size={16} />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* ML-Enhanced Recommendations */}
      {mlScores.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain size={24} className="text-primary" />
            <h2 className="text-xl font-semibold">ML-Enhanced Recommendations</h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkle size={12} />
              AI Powered
            </Badge>
          </div>

          <div className="grid gap-6">
            {mlScores.slice(0, 5).map((score, index) => {
              const material = materials.find(m => m.id === score.materialId);
              const explanation = explanations[score.materialId];
              
              if (!material) return null;

              return (
                <div key={material.id} className="space-y-4">
                  <MaterialCard
                    material={material}
                    score={score}
                    isSelected={selectedMaterials.includes(material.id)}
                    onSelect={(id, selected) => {
                      if (selected && onMaterialSelect) {
                        onMaterialSelect(id);
                      }
                    }}
                    showFeedback={true}
                    sessionId={sessionId}
                    requirements={requirements}
                    applicationContext={applicationContext}
                    onFeedbackSubmitted={handleFeedbackSubmitted}
                  />

                  {/* ML Explanation Card */}
                  {explanation && (
                    <Card className="border-l-4 border-l-primary/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Target size={16} className="text-primary" />
                          ML Analysis
                          <Badge 
                            variant="outline" 
                            className={`${getConfidenceColor(explanation.modelConfidence)} border-current`}
                          >
                            {getConfidenceLabel(explanation.modelConfidence)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Confidence Score */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Model Confidence</span>
                            <span className={getConfidenceColor(explanation.modelConfidence)}>
                              {Math.round(explanation.modelConfidence * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={explanation.modelConfidence * 100} 
                            className="h-2"
                          />
                        </div>

                        {/* Key Factors */}
                        {explanation.keyFactors.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <TrendingUp size={14} />
                              Key Influencing Factors
                            </h4>
                            <div className="space-y-2">
                              {explanation.keyFactors.map((factor, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    {factor.positive ? (
                                      <CheckCircle size={14} className="text-green-600" />
                                    ) : (
                                      <AlertTriangle size={14} className="text-yellow-600" />
                                    )}
                                    <span>{factor.factor}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-muted rounded-full h-1">
                                      <div 
                                        className={`h-1 rounded-full ${
                                          factor.positive ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}
                                        style={{ width: `${factor.importance * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {Math.round(factor.importance * 100)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Success Rate */}
                        {explanation.similarSuccessfulRecommendations > 0 && (
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb size={14} className="text-primary" />
                              <span className="font-medium">
                                {explanation.similarSuccessfulRecommendations} users selected similar materials
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Uncertainty Warning */}
                        {explanation.uncertainty > 0.7 && (
                          <Alert>
                            <AlertTriangle size={16} />
                            <AlertDescription className="text-sm">
                              This recommendation has higher uncertainty. Consider providing more specific requirements 
                              or feedback to improve future recommendations.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {index < mlScores.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>

          {/* Training Prompt */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Brain size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-2">Help Improve These Recommendations</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your feedback trains our AI to provide better recommendations for your specific needs 
                    and similar applications. The more feedback we receive, the more accurate our suggestions become.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>✓ Rate material suitability</span>
                    <span>✓ Share selection decisions</span>
                    <span>✓ Provide application-specific insights</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No ML Recommendations Available */}
      {mlScores.length === 0 && !isLoading && !error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">ML Model Training in Progress</h3>
              <p className="text-muted-foreground mb-4">
                We need more user feedback to generate ML-enhanced recommendations. 
                Start by rating some materials to help train our AI.
              </p>
              <Button 
                onClick={() => generateMLRecommendations()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Brain size={16} />
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}