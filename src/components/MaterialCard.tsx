import React from 'react';
import { Material, MaterialScore, MaterialRequirements } from '../types/materials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Gear, 
  CurrencyDollar, 
  Leaf, 
  Building, 
  TrendUp,
  Info,
  Thermometer,
  Lightning
} from '@phosphor-icons/react';

import { FeedbackCollector } from './FeedbackCollector';

interface MaterialCardProps {
  material: Material;
  score?: MaterialScore;
  isSelected?: boolean;
  onSelect?: (materialId: string, selected: boolean) => void;
  onViewDetails?: (material: Material) => void;
  showAIInsight?: boolean;
  showFeedback?: boolean;
  sessionId?: string;
  requirements?: MaterialRequirements;
  applicationContext?: string;
  onFeedbackSubmitted?: () => void;
}

export function MaterialCard({ 
  material, 
  score, 
  isSelected = false, 
  onSelect, 
  onViewDetails,
  showAIInsight = false,
  showFeedback = false,
  sessionId,
  requirements,
  applicationContext,
  onFeedbackSubmitted
}: MaterialCardProps) {
  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Made to Order': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const bestSupplier = material.suppliers
    .filter(s => s.availability !== 'Unavailable')
    .sort((a, b) => b.reliability - a.reliability)[0];

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary shadow-md' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => 
                  onSelect(material.id, checked as boolean)
                }
                className="mt-1"
              />
            )}
            <div>
              <CardTitle className="text-lg font-semibold">
                {material.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {material.category}
              </p>
            </div>
          </div>
          
          {score && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {score.overallScore}
              </div>
              <div className="text-xs text-muted-foreground">
                AI Score
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Properties */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Gear size={16} className="text-muted-foreground" />
            <span className="font-medium">
              {material.properties.tensileStrength} MPa
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendUp size={16} className="text-muted-foreground" />
            <span className="font-medium">
              {material.properties.density} g/cm³
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyDollar size={16} className="text-muted-foreground" />
            <span className="font-medium">
              ${material.cost.pricePerKg}/kg
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf size={16} className={getSustainabilityColor(material.sustainability.sustainabilityScore)} />
            <span className="font-medium">
              {material.sustainability.sustainabilityScore}/100
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer size={16} className="text-muted-foreground" />
            <span className="font-medium text-xs">
              {material.properties.operatingTempMin}° to {material.properties.operatingTempMax}°C
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lightning size={16} className="text-muted-foreground" />
            <span className="font-medium text-xs">
              {material.properties.electricalConductivity >= 1 
                ? `${material.properties.electricalConductivity.toFixed(1)} MS/m` 
                : material.properties.dielectricStrength 
                  ? `${material.properties.dielectricStrength} kV/mm`
                  : `${material.properties.electricalResistivity} µΩ·cm`
              }
            </span>
          </div>
        </div>

        {/* AI Scoring Breakdown */}
        {score && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Performance Breakdown</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Properties</span>
                <span>{score.propertiesScore}/100</span>
              </div>
              <Progress value={score.propertiesScore} className="h-1" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Cost Effectiveness</span>
                <span>{score.costScore}/100</span>
              </div>
              <Progress value={score.costScore} className="h-1" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Availability</span>
                <span>{score.availabilityScore}/100</span>
              </div>
              <Progress value={score.availabilityScore} className="h-1" />
            </div>
          </div>
        )}

        {/* Supplier Info */}
        {bestSupplier && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building size={16} className="text-muted-foreground" />
              <span className="text-sm">{bestSupplier.name}</span>
            </div>
            <Badge className={getAvailabilityColor(bestSupplier.availability)}>
              {bestSupplier.availability}
            </Badge>
          </div>
        )}

        {/* AI Reasoning */}
        {score?.reasoning && (
          <div className="bg-muted/30 p-3 rounded-md">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {score.reasoning}
              </p>
            </div>
          </div>
        )}

        {/* Applications Tags */}
        <div className="flex flex-wrap gap-1">
          {material.applications.slice(0, 3).map((app) => (
            <Badge key={app} variant="secondary" className="text-xs">
              {app}
            </Badge>
          ))}
          {material.applications.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{material.applications.length - 3} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(material)}
              className="w-full"
            >
              View Details
            </Button>
          )}

          {/* ML Feedback Collector */}
          {showFeedback && sessionId && requirements && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  Help improve AI recommendations
                </div>
                <FeedbackCollector
                  material={material}
                  requirements={requirements}
                  sessionId={sessionId}
                  applicationContext={applicationContext}
                  onFeedbackSubmitted={onFeedbackSubmitted}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}