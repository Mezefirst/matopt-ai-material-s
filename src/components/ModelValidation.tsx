import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { 
  Upload, 
  Download, 
  Database, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from '@phosphor-icons/react';

import { Material } from '@/types/materials';
import { MaterialPropertyPredictor, MaterialPredictionResult } from '@/services/materialPropertyPredictor';

interface ValidationResult {
  materialName: string;
  actualProperties: Record<string, number>;
  predictedProperties: Record<string, number>;
  accuracy: Record<string, number>;
  overallAccuracy: number;
  timestamp: Date;
}

interface ModelValidationProps {
  className?: string;
}

export function ModelValidation({ className }: ModelValidationProps) {
  const [validationResults, setValidationResults] = useKV<ValidationResult[]>('validation-results', []);
  const [isValidating, setIsValidating] = useState(false);
  const [testData, setTestData] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Initialize with demo validation data
  useEffect(() => {
    if (validationResults.length === 0) {
      generateDemoValidationData();
    }
  }, []);

  const generateDemoValidationData = () => {
    const demoResults: ValidationResult[] = [
      {
        materialName: 'Steel 316L',
        actualProperties: {
          tensileStrength: 520,
          density: 8.0,
          electricalConductivity: 1.45,
          thermalConductivity: 16.2,
          corrosionResistance: 8.5
        },
        predictedProperties: {
          tensileStrength: 515,
          density: 7.98,
          electricalConductivity: 1.42,
          thermalConductivity: 16.8,
          corrosionResistance: 8.3
        },
        accuracy: {
          tensileStrength: 0.99,
          density: 0.9975,
          electricalConductivity: 0.979,
          thermalConductivity: 0.963,
          corrosionResistance: 0.976
        },
        overallAccuracy: 0.975,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      },
      {
        materialName: 'Aluminum 6061-T6',
        actualProperties: {
          tensileStrength: 310,
          density: 2.7,
          electricalConductivity: 24.0,
          thermalConductivity: 167,
          corrosionResistance: 6.5
        },
        predictedProperties: {
          tensileStrength: 295,
          density: 2.68,
          electricalConductivity: 25.2,
          thermalConductivity: 163,
          corrosionResistance: 6.8
        },
        accuracy: {
          tensileStrength: 0.952,
          density: 0.993,
          electricalConductivity: 0.95,
          thermalConductivity: 0.976,
          corrosionResistance: 0.954
        },
        overallAccuracy: 0.965,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        materialName: 'Titanium Grade 2',
        actualProperties: {
          tensileStrength: 345,
          density: 4.5,
          electricalConductivity: 0.18,
          thermalConductivity: 17,
          corrosionResistance: 9.2
        },
        predictedProperties: {
          tensileStrength: 368,
          density: 4.52,
          electricalConductivity: 0.16,
          thermalConductivity: 18.5,
          corrosionResistance: 9.0
        },
        accuracy: {
          tensileStrength: 0.933,
          density: 0.996,
          electricalConductivity: 0.889,
          thermalConductivity: 0.919,
          corrosionResistance: 0.978
        },
        overallAccuracy: 0.943,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12)
      }
    ];
    
    setValidationResults(demoResults);
  };

  const validateModel = async () => {
    if (!testData.trim()) {
      toast.error('Please provide test data to validate');
      return;
    }

    setIsValidating(true);
    try {
      // Parse test data (simplified JSON format)
      const testMaterials = JSON.parse(testData);
      
      if (!Array.isArray(testMaterials)) {
        throw new Error('Test data should be an array of materials');
      }

      const newResults: ValidationResult[] = [];

      for (const material of testMaterials) {
        if (!material.composition || !material.actualProperties) {
          continue;
        }

        // Predict properties using the model
        const prediction = await MaterialPropertyPredictor.predictMaterialProperties(
          material.composition,
          material.name || 'Test Material'
        );

        // Calculate accuracy for each property
        const accuracy: Record<string, number> = {};
        let totalAccuracy = 0;
        let propertyCount = 0;

        for (const [property, actualValue] of Object.entries(material.actualProperties)) {
          const predictedProp = prediction.predictedProperties.find(p => p.property === property);
          if (predictedProp) {
            const error = Math.abs(predictedProp.predictedValue - actualValue) / actualValue;
            accuracy[property] = Math.max(0, 1 - error);
            totalAccuracy += accuracy[property];
            propertyCount++;
          }
        }

        const overallAccuracy = propertyCount > 0 ? totalAccuracy / propertyCount : 0;

        newResults.push({
          materialName: material.name || 'Test Material',
          actualProperties: material.actualProperties,
          predictedProperties: prediction.predictedProperties.reduce((acc, prop) => {
            acc[prop.property] = prop.predictedValue;
            return acc;
          }, {} as Record<string, number>),
          accuracy,
          overallAccuracy,
          timestamp: new Date()
        });
      }

      setValidationResults(current => [...current, ...newResults]);
      setTestData('');
      toast.success(`Validated ${newResults.length} materials successfully`);
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Failed to validate model. Please check your test data format.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTestData(content);
      };
      reader.readAsText(file);
    }
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(validationResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'validation-results.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.95) return 'text-green-600';
    if (accuracy >= 0.85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyIcon = (accuracy: number) => {
    if (accuracy >= 0.95) return <CheckCircle className="text-green-600" size={16} />;
    if (accuracy >= 0.85) return <Clock className="text-yellow-600" size={16} />;
    return <AlertCircle className="text-red-600" size={16} />;
  };

  const getOverallStats = () => {
    if (validationResults.length === 0) return { avg: 0, min: 0, max: 0 };
    
    const accuracies = validationResults.map(r => r.overallAccuracy);
    return {
      avg: accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length,
      min: Math.min(...accuracies),
      max: Math.max(...accuracies)
    };
  };

  const stats = getOverallStats();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="text-primary" size={20} />
          Model Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Test Data */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Test Data (JSON format)</Label>
            <div className="space-y-2">
              <Input
                type="file"
                accept=".json,.txt"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <div className="text-sm text-muted-foreground">
                Upload a JSON file with test materials including composition and actual properties
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Or paste test data directly:</Label>
            <textarea
              className="w-full h-32 p-3 border rounded-md resize-none text-sm font-mono"
              placeholder={`[
  {
    "name": "Test Steel",
    "composition": {
      "elements": [
        {"symbol": "Fe", "atomicNumber": 26, "percentage": 98},
        {"symbol": "C", "atomicNumber": 6, "percentage": 2}
      ],
      "crystalStructure": "BCC"
    },
    "actualProperties": {
      "tensileStrength": 450,
      "density": 7.85,
      "electricalConductivity": 1.0
    }
  }
]`}
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={validateModel}
              disabled={isValidating || !testData.trim()}
              className="flex-1"
            >
              <TrendingUp size={16} className="mr-2" />
              {isValidating ? 'Validating...' : 'Validate Model'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={exportResults}
              disabled={validationResults.length === 0}
            >
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Separator />

        {/* Validation Statistics */}
        <div className="space-y-4">
          <h4 className="font-medium">Validation Statistics</h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {(stats.avg * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Accuracy</div>
            </div>
            
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {(stats.max * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Best Accuracy</div>
            </div>
            
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {(stats.min * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Lowest Accuracy</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Validation Results */}
        <div className="space-y-4">
          <h4 className="font-medium">Recent Validation Results</h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {validationResults.slice(-5).reverse().map((result, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">{result.materialName}</h5>
                  <div className="flex items-center gap-2">
                    {getAccuracyIcon(result.overallAccuracy)}
                    <Badge 
                      variant={result.overallAccuracy >= 0.95 ? 'default' : 'secondary'}
                      className={getAccuracyColor(result.overallAccuracy)}
                    >
                      {(result.overallAccuracy * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress value={result.overallAccuracy * 100} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(result.accuracy).slice(0, 4).map(([property, accuracy]) => (
                      <div key={property} className="flex justify-between">
                        <span className="capitalize text-muted-foreground">
                          {property.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className={getAccuracyColor(accuracy)}>
                          {(accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Validated: {result.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}