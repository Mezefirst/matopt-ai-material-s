import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Atom, 
  Brain, 
  Plus, 
  Trash2, 
  FlaskConical,
  Lightbulb,
  TrendingUp,
  AlertTriangle
} from '@phosphor-icons/react';

import { 
  MaterialComposition, 
  MaterialPredictionResult, 
  PropertyPrediction,
  MaterialPropertyPredictor 
} from '@/services/materialPropertyPredictor';

interface NewMaterialPredictionProps {
  onPredictionComplete?: (prediction: MaterialPredictionResult) => void;
}

interface CompositionElement {
  symbol: string;
  atomicNumber: number;
  percentage: number;
}

export function NewMaterialPrediction({ onPredictionComplete }: NewMaterialPredictionProps) {
  const [materialName, setMaterialName] = useState('');
  const [elements, setElements] = useState<CompositionElement[]>([
    { symbol: 'Fe', atomicNumber: 26, percentage: 70 },
    { symbol: 'C', atomicNumber: 6, percentage: 0.5 }
  ]);
  const [crystalStructure, setCrystalStructure] = useState<MaterialComposition['crystalStructure']>('FCC');
  const [processingMethod, setProcessingMethod] = useState<MaterialComposition['processingMethod']>('cast');
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<MaterialPredictionResult | null>(null);

  // Common elements with their atomic numbers
  const commonElements = [
    { symbol: 'Fe', atomicNumber: 26, name: 'Iron' },
    { symbol: 'Al', atomicNumber: 13, name: 'Aluminum' },
    { symbol: 'Cu', atomicNumber: 29, name: 'Copper' },
    { symbol: 'Ti', atomicNumber: 22, name: 'Titanium' },
    { symbol: 'Ni', atomicNumber: 28, name: 'Nickel' },
    { symbol: 'Cr', atomicNumber: 24, name: 'Chromium' },
    { symbol: 'C', atomicNumber: 6, name: 'Carbon' },
    { symbol: 'Si', atomicNumber: 14, name: 'Silicon' },
    { symbol: 'Mn', atomicNumber: 25, name: 'Manganese' },
    { symbol: 'Mo', atomicNumber: 42, name: 'Molybdenum' },
    { symbol: 'Zn', atomicNumber: 30, name: 'Zinc' },
    { symbol: 'Mg', atomicNumber: 12, name: 'Magnesium' },
    { symbol: 'Pb', atomicNumber: 82, name: 'Lead' },
    { symbol: 'Sn', atomicNumber: 50, name: 'Tin' }
  ];

  const addElement = () => {
    setElements([...elements, { symbol: 'Fe', atomicNumber: 26, percentage: 0 }]);
  };

  const removeElement = (index: number) => {
    if (elements.length > 1) {
      setElements(elements.filter((_, i) => i !== index));
    }
  };

  const updateElement = (index: number, field: keyof CompositionElement, value: string | number) => {
    const updated = [...elements];
    
    if (field === 'symbol') {
      const element = commonElements.find(el => el.symbol === value);
      if (element) {
        updated[index] = { ...updated[index], symbol: element.symbol, atomicNumber: element.atomicNumber };
      }
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    
    setElements(updated);
  };

  const getTotalPercentage = () => {
    return elements.reduce((sum, el) => sum + el.percentage, 0);
  };

  const normalizeComposition = () => {
    const total = getTotalPercentage();
    if (total === 0) return;
    
    const normalized = elements.map(el => ({
      ...el,
      percentage: (el.percentage / total) * 100
    }));
    setElements(normalized);
  };

  const validateComposition = (): boolean => {
    if (!materialName.trim()) {
      toast.error('Please enter a material name');
      return false;
    }

    if (elements.length === 0) {
      toast.error('Please add at least one element');
      return false;
    }

    const total = getTotalPercentage();
    if (Math.abs(total - 100) > 5) {
      toast.error('Total composition should equal 100% (±5%)');
      return false;
    }

    if (elements.some(el => el.percentage <= 0)) {
      toast.error('All elements must have positive percentages');
      return false;
    }

    return true;
  };

  const handlePredict = async () => {
    if (!validateComposition()) return;

    setIsProcessing(true);
    try {
      const composition: MaterialComposition = {
        elements: elements.map(el => ({
          symbol: el.symbol,
          atomicNumber: el.atomicNumber,
          percentage: el.percentage
        })),
        crystalStructure,
        processingMethod
      };

      const result = await MaterialPropertyPredictor.predictMaterialProperties(
        composition,
        materialName
      );

      setPrediction(result);
      onPredictionComplete?.(result);
      toast.success('Material properties predicted successfully!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to predict material properties');
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Material Composition Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="text-primary" size={20} />
            Material Composition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Material Name */}
          <div className="space-y-2">
            <Label htmlFor="material-name">Material Name</Label>
            <Input
              id="material-name"
              placeholder="e.g., High-Strength Steel Alloy"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
            />
          </div>

          {/* Elements Composition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Chemical Composition</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Total: {getTotalPercentage().toFixed(1)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={normalizeComposition}
                  disabled={getTotalPercentage() === 0}
                >
                  Normalize
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {elements.map((element, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <Select
                      value={element.symbol}
                      onValueChange={(value) => updateElement(index, 'symbol', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {commonElements.map((el) => (
                          <SelectItem key={el.symbol} value={el.symbol}>
                            {el.symbol} - {el.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={element.percentage}
                      onChange={(e) => updateElement(index, 'percentage', parseFloat(e.target.value) || 0)}
                      placeholder="%"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeElement(index)}
                    disabled={elements.length === 1}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" onClick={addElement} className="w-full">
              <Plus size={16} className="mr-2" />
              Add Element
            </Button>
          </div>

          {/* Structure and Processing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crystal Structure</Label>
              <Select value={crystalStructure} onValueChange={setCrystalStructure}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FCC">Face-Centered Cubic (FCC)</SelectItem>
                  <SelectItem value="BCC">Body-Centered Cubic (BCC)</SelectItem>
                  <SelectItem value="HCP">Hexagonal Close-Packed (HCP)</SelectItem>
                  <SelectItem value="amorphous">Amorphous</SelectItem>
                  <SelectItem value="ceramic">Ceramic</SelectItem>
                  <SelectItem value="polymer">Polymer</SelectItem>
                  <SelectItem value="composite">Composite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Processing Method</Label>
              <Select value={processingMethod} onValueChange={setProcessingMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cast">Cast</SelectItem>
                  <SelectItem value="forged">Forged</SelectItem>
                  <SelectItem value="machined">Machined</SelectItem>
                  <SelectItem value="additive">Additive Manufacturing</SelectItem>
                  <SelectItem value="sintered">Sintered</SelectItem>
                  <SelectItem value="composite">Composite Layup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Predict Button */}
          <Button 
            onClick={handlePredict}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            <Brain size={20} className="mr-2" />
            {isProcessing ? 'Predicting Properties...' : 'Predict Material Properties'}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="text-primary" size={20} />
              Prediction Results: {prediction.name}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant={prediction.overallConfidence >= 0.8 ? 'default' : 'secondary'}>
                Overall Confidence: {(prediction.overallConfidence * 100).toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="properties" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="recommendations">Testing</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="properties" className="space-y-4">
                <div className="grid gap-4">
                  {prediction.predictedProperties.map((prop, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium capitalize">
                          {prop.property.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={getConfidenceColor(prop.confidence)}
                        >
                          {getConfidenceLabel(prop.confidence)} Confidence
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">
                            {prop.predictedValue.toFixed(2)} 
                            {getPropertyUnit(prop.property)}
                          </span>
                          <Progress 
                            value={prop.confidence * 100} 
                            className="w-24"
                          />
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Range: {prop.uncertaintyRange.lower.toFixed(2)} - {prop.uncertaintyRange.upper.toFixed(2)}
                          {getPropertyUnit(prop.property)}
                        </div>
                        
                        <p className="text-sm">{prop.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <AlertTriangle className="text-amber-500" size={16} />
                    Recommended Testing
                  </h4>
                  {prediction.recommendedTesting.map((test, index) => (
                    <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm">{test}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Lightbulb className="text-primary" size={16} />
                    Potential Applications
                  </h4>
                  {prediction.potentialApplications.map((app, index) => (
                    <div key={index} className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm">{app}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getPropertyUnit(property: string): string {
  const units: Record<string, string> = {
    tensileStrength: ' MPa',
    density: ' g/cm³',
    electricalConductivity: ' MS/m',
    electricalResistivity: ' µΩ·cm',
    thermalConductivity: ' W/m·K',
    corrosionResistance: '/10',
    fatigueStrength: ' MPa',
    operatingTempMax: ' °C',
    dielectricStrength: ' kV/mm'
  };
  
  return units[property] || '';
}