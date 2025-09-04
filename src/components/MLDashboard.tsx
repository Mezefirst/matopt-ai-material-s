import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Brain, 
  TrendingUp, 
  Database, 
  Trash2,
  RefreshCw,
  Info,
  Target,
  Users,
  Clock
} from '@phosphor-icons/react';

import { MLFeedbackService } from '@/services/mlFeedbackService';

interface MLDashboardProps {
  className?: string;
}

export function MLDashboard({ className }: MLDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const [statsData, performanceData] = await Promise.all([
        MLFeedbackService.getTrainingStats(),
        MLFeedbackService.getModelPerformance()
      ]);
      setStats(statsData);
      setPerformance(performanceData);
    } catch (error) {
      console.error('Failed to load ML stats:', error);
      toast.error('Failed to load ML statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerRetraining = async () => {
    setIsTraining(true);
    try {
      await MLFeedbackService.retrainModel();
      toast.success('Model retrained successfully!');
      await loadStats(); // Refresh stats
    } catch (error) {
      console.error('Failed to retrain model:', error);
      toast.error('Failed to retrain model');
    } finally {
      setIsTraining(false);
    }
  };

  const clearTrainingData = async () => {
    if (!confirm('Are you sure you want to clear all training data? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      await MLFeedbackService.clearTrainingData();
      toast.success('Training data cleared');
      await loadStats(); // Refresh stats
    } catch (error) {
      console.error('Failed to clear training data:', error);
      toast.error('Failed to clear training data');
    } finally {
      setIsClearing(false);
    }
  };

  React.useEffect(() => {
    loadStats();
  }, []);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.8) return 'text-green-600';
    if (accuracy >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadgeVariant = (accuracy: number): "default" | "secondary" | "destructive" | "outline" => {
    if (accuracy >= 0.8) return 'default';
    if (accuracy >= 0.6) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={20} className="text-primary" />
          ML Training Dashboard
          <Badge variant="outline" className="ml-auto">
            Development Tool
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading ML statistics...</p>
          </div>
        ) : (
          <>
            {/* Training Data Statistics */}
            {stats && (
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Database size={16} />
                  Training Data
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.totalFeedback}</div>
                    <div className="text-xs text-muted-foreground">User Feedback</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{stats.trainingExamples}</div>
                    <div className="text-xs text-muted-foreground">Training Examples</div>
                  </div>
                </div>

                {/* Feedback Types Breakdown */}
                {Object.keys(stats.feedbackTypes).length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Feedback Types</div>
                    {Object.entries(stats.feedbackTypes).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="capitalize">{type}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Model Performance */}
            {performance ? (
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Target size={16} />
                  Model Performance
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accuracy</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getAccuracyBadgeVariant(performance.accuracy)}>
                        {Math.round(performance.accuracy * 100)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={performance.accuracy * 100} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Precision</span>
                      <span className="font-medium">{Math.round(performance.precision * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recall</span>
                      <span className="font-medium">{Math.round(performance.recall * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F1 Score</span>
                      <span className="font-medium">{Math.round(performance.f1Score * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model Version</span>
                      <span className="font-medium">{performance.modelVersion}</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} />
                      <span>
                        Last trained: {
                          performance.lastTrainingDate 
                            ? new Date(performance.lastTrainingDate).toLocaleString()
                            : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Alert>
                <Info size={16} />
                <AlertDescription>
                  No trained model available yet. The system will automatically train a model 
                  after collecting enough user feedback (minimum 20 examples).
                </AlertDescription>
              </Alert>
            )}

            <Separator />

            {/* Training Actions */}
            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <TrendingUp size={16} />
                Training Actions
              </h4>
              <div className="space-y-3">
                <Button
                  onClick={triggerRetraining}
                  disabled={isTraining || !stats || stats.trainingExamples < 5}
                  className="w-full flex items-center gap-2"
                >
                  {isTraining ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Training Model...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Retrain Model
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={loadStats}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh Statistics
                </Button>

                <Button
                  variant="destructive"
                  onClick={clearTrainingData}
                  disabled={isClearing || !stats || stats.totalFeedback === 0}
                  className="w-full flex items-center gap-2"
                >
                  {isClearing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Clear Training Data
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Information */}
            <Alert>
              <Users size={16} />
              <AlertDescription className="text-xs">
                <div className="font-medium mb-1">How ML Training Works:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>User feedback is automatically converted to training data</li>
                  <li>Model retrains automatically every 50 feedback examples</li>
                  <li>Confidence scores improve with more training data</li>
                  <li>Recommendations become more personalized over time</li>
                </ul>
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
}