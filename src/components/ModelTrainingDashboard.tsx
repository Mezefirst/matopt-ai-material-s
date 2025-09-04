import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { 
  Brain, 
  TrendingUp, 
  Database, 
  FlaskConical,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight
} from '@phosphor-icons/react';

import { MaterialPredictionResult } from '@/services/materialPropertyPredictor';
import { Material } from '@/types/materials';

interface ModelPerformance {
  property: string;
  accuracy: number;
  trainingDataPoints: number;
  lastUpdated: Date | string;
  modelVersion: string;
}

interface TrainingData {
  materialId: string;
  actualValues: Record<string, number>;
  predictedValues: Record<string, number>;
  feedback: 'accurate' | 'inaccurate' | 'partially_accurate';
  timestamp: Date | string;
}

interface ModelTrainingDashboardProps {
  className?: string;
}

export function ModelTrainingDashboard({ className }: ModelTrainingDashboardProps) {
  const [modelPerformance, setModelPerformance] = useKV<ModelPerformance[]>('model-performance', []);
  const [trainingData, setTrainingData] = useKV<TrainingData[]>('training-data', []);
  const [isTraining, setIsTraining] = useState(false);
  const [recentPredictions, setRecentPredictions] = useKV<MaterialPredictionResult[]>('recent-predictions', []);

  // Helper function to ensure date objects
  const ensureDate = (date: Date | string): Date => {
    return typeof date === 'string' ? new Date(date) : date;
  };

  // Initialize demo performance data
  useEffect(() => {
    if (modelPerformance.length === 0) {
      const demoPerformance: ModelPerformance[] = [
        {
          property: 'tensileStrength',
          accuracy: 0.87,
          trainingDataPoints: 1543,
          lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          modelVersion: 'v2.1.3'
        },
        {
          property: 'density',
          accuracy: 0.94,
          trainingDataPoints: 2105,
          lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
          modelVersion: 'v2.1.3'
        },
        {
          property: 'electricalConductivity',
          accuracy: 0.78,
          trainingDataPoints: 987,
          lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          modelVersion: 'v2.1.2'
        },
        {
          property: 'thermalConductivity',
          accuracy: 0.82,
          trainingDataPoints: 1256,
          lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
          modelVersion: 'v2.1.3'
        },
        {
          property: 'corrosionResistance',
          accuracy: 0.71,
          trainingDataPoints: 743,
          lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
          modelVersion: 'v2.1.1'
        }
      ];
      setModelPerformance(demoPerformance);
    }

    if (trainingData.length === 0) {
      generateDemoTrainingData();
    }
  }, []);

  const generateDemoTrainingData = () => {
    const demoData: TrainingData[] = [];
    const materialIds = ['steel_316', 'aluminum_6061', 'titanium_gr2', 'copper_c101', 'inconel_718'];
    
    for (let i = 0; i < 15; i++) {
      const materialId = materialIds[Math.floor(Math.random() * materialIds.length)];
      const feedback = Math.random() > 0.3 ? 'accurate' : 
                     Math.random() > 0.5 ? 'partially_accurate' : 'inaccurate';
      
      demoData.push({
        materialId,
        actualValues: {
          tensileStrength: 500 + Math.random() * 1000,
          density: 2 + Math.random() * 6,
          electricalConductivity: Math.random() * 50
        },
        predictedValues: {
          tensileStrength: 500 + Math.random() * 1000,
          density: 2 + Math.random() * 6,
          electricalConductivity: Math.random() * 50
        },
        feedback,
        timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30)
      });
    }
    
    setTrainingData(demoData);
  };

  const retrainModels = async () => {
    setIsTraining(true);
    try {
      // Simulate model retraining process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update model performance with slight improvements
      const updatedPerformance = modelPerformance.map(model => ({
        ...model,
        accuracy: Math.min(0.95, model.accuracy + Math.random() * 0.05),
        trainingDataPoints: model.trainingDataPoints + Math.floor(Math.random() * 50),
        lastUpdated: new Date(),
        modelVersion: incrementVersion(model.modelVersion)
      }));
      
      setModelPerformance(updatedPerformance);
      toast.success('Models retrained successfully! Performance improved.');
    } catch (error) {
      toast.error('Failed to retrain models');
    } finally {
      setIsTraining(false);
    }
  };

  const incrementVersion = (version: string): string => {
    const parts = version.replace('v', '').split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    return 'v' + parts.join('.');
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return 'text-green-600';
    if (accuracy >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadgeVariant = (accuracy: number): "default" | "secondary" | "destructive" | "outline" => {
    if (accuracy >= 0.9) return 'default';
    if (accuracy >= 0.8) return 'secondary';
    return 'destructive';
  };

  const getFeedbackIcon = (feedback: string) => {
    switch (feedback) {
      case 'accurate':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'partially_accurate':
        return <Clock className="text-yellow-600" size={16} />;
      case 'inaccurate':
        return <XCircle className="text-red-600" size={16} />;
      default:
        return null;
    }
  };

  const getOverallAccuracy = () => {
    if (modelPerformance.length === 0) return 0;
    return modelPerformance.reduce((sum, model) => sum + model.accuracy, 0) / modelPerformance.length;
  };

  const getTotalTrainingPoints = () => {
    return modelPerformance.reduce((sum, model) => sum + model.trainingDataPoints, 0);
  };

  const getRecentFeedbackStats = () => {
    const recent = trainingData.slice(-10);
    const accurate = recent.filter(d => d.feedback === 'accurate').length;
    const partial = recent.filter(d => d.feedback === 'partially_accurate').length;
    const inaccurate = recent.filter(d => d.feedback === 'inaccurate').length;
    
    return { accurate, partial, inaccurate, total: recent.length };
  };

  const stats = getRecentFeedbackStats();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-primary" size={20} />
          ML Model Training Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Training Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overall Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {(getOverallAccuracy() * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Accuracy</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {getTotalTrainingPoints().toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Training Points</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {modelPerformance.length}
                </div>
                <div className="text-sm text-muted-foreground">Active Models</div>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {((stats.accurate / Math.max(stats.total, 1)) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">Recent Accuracy</div>
              </div>
            </div>

            {/* Recent Feedback Summary */}
            <div className="space-y-3">
              <h4 className="font-medium">Recent Prediction Feedback</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm font-medium">Accurate</span>
                  </div>
                  <div className="text-lg font-bold text-green-700">{stats.accurate}</div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="text-yellow-600" size={16} />
                    <span className="text-sm font-medium">Partial</span>
                  </div>
                  <div className="text-lg font-bold text-yellow-700">{stats.partial}</div>
                </div>
                
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-600" size={16} />
                    <span className="text-sm font-medium">Inaccurate</span>
                  </div>
                  <div className="text-lg font-bold text-red-700">{stats.inaccurate}</div>
                </div>
              </div>
            </div>

            {/* Retrain Button */}
            <Button 
              onClick={retrainModels}
              disabled={isTraining}
              className="w-full"
              size="lg"
            >
              <TrendingUp size={20} className="mr-2" />
              {isTraining ? 'Retraining Models...' : 'Retrain All Models'}
            </Button>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="space-y-4">
              {modelPerformance.map((model, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium capitalize">
                      {model.property.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <Badge variant={getAccuracyBadgeVariant(model.accuracy)}>
                      {(model.accuracy * 100).toFixed(1)}% Accuracy
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={model.accuracy * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{model.trainingDataPoints.toLocaleString()} training points</span>
                      <span>{model.modelVersion}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Last updated: {ensureDate(model.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Database className="text-primary" size={16} />
                Recent Training Data
              </h4>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {trainingData.slice(-10).reverse().map((data, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{data.materialId}</span>
                      <div className="flex items-center gap-2">
                        {getFeedbackIcon(data.feedback)}
                        <Badge variant="outline" className="text-xs">
                          {data.feedback.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {ensureDate(data.timestamp).toLocaleDateString()} • {Object.keys(data.actualValues).length} properties
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}