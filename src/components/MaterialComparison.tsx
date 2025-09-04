import React from 'react';
import { Material, MaterialScore } from '../types/materials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  TrendUp, 
  TrendDown,
  Minus,
  Gear,
  CurrencyDollar,
  Leaf,
  Building
} from '@phosphor-icons/react';

interface MaterialComparisonProps {
  materials: Material[];
  scores: Record<string, MaterialScore>;
  tradeoffAnalysis?: string;
}

export function MaterialComparison({ materials, scores, tradeoffAnalysis }: MaterialComparisonProps) {
  if (materials.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            Select materials to compare using the checkboxes in the search results.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getComparisonIcon = (current: number, reference: number, higherIsBetter = true) => {
    const diff = current - reference;
    if (Math.abs(diff) < 0.01) return <Minus size={16} className="text-gray-500" />;
    
    const isGood = higherIsBetter ? diff > 0 : diff < 0;
    return isGood ? 
      <TrendUp size={16} className="text-green-600" /> : 
      <TrendDown size={16} className="text-red-600" />;
  };

  const formatPercentageDiff = (current: number, reference: number) => {
    const diff = ((current - reference) / reference) * 100;
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)}%`;
  };

  // Use first material as reference for comparisons
  const referenceMaterial = materials[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="text-primary" />
            Material Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* AI Trade-off Analysis */}
          {tradeoffAnalysis && (
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-primary">AI Trade-off Analysis</h4>
              <p className="text-sm text-muted-foreground">{tradeoffAnalysis}</p>
            </div>
          )}

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Property</th>
                  {materials.map((material) => (
                    <th key={material.id} className="text-center py-3 px-2 min-w-[120px]">
                      <div className="font-medium">{material.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {material.category}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* AI Scores */}
                <tr className="border-b bg-muted/20">
                  <td className="py-3 px-2 font-medium flex items-center gap-2">
                    <Gear size={16} className="text-primary" />
                    Overall AI Score
                  </td>
                  {materials.map((material) => {
                    const score = scores[material.id];
                    return (
                      <td key={material.id} className="text-center py-3 px-2">
                        <div className="text-lg font-bold text-primary">
                          {score?.overallScore || 'N/A'}
                        </div>
                        <div className="text-xs text-muted-foreground">/ 100</div>
                      </td>
                    );
                  })}
                </tr>

                {/* Tensile Strength */}
                <tr className="border-b">
                  <td className="py-3 px-2">Tensile Strength (MPa)</td>
                  {materials.map((material, index) => (
                    <td key={material.id} className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">
                          {material.properties.tensileStrength}
                        </span>
                        {index > 0 && getComparisonIcon(
                          material.properties.tensileStrength,
                          referenceMaterial.properties.tensileStrength,
                          true
                        )}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {formatPercentageDiff(
                            material.properties.tensileStrength,
                            referenceMaterial.properties.tensileStrength
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Density */}
                <tr className="border-b">
                  <td className="py-3 px-2">Density (g/cm³)</td>
                  {materials.map((material, index) => (
                    <td key={material.id} className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">
                          {material.properties.density}
                        </span>
                        {index > 0 && getComparisonIcon(
                          material.properties.density,
                          referenceMaterial.properties.density,
                          false // Lower density is usually better
                        )}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {formatPercentageDiff(
                            material.properties.density,
                            referenceMaterial.properties.density
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Cost */}
                <tr className="border-b">
                  <td className="py-3 px-2 flex items-center gap-2">
                    <CurrencyDollar size={16} className="text-green-600" />
                    Cost ($/kg)
                  </td>
                  {materials.map((material, index) => (
                    <td key={material.id} className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">
                          ${material.cost.pricePerKg}
                        </span>
                        {index > 0 && getComparisonIcon(
                          material.cost.pricePerKg,
                          referenceMaterial.cost.pricePerKg,
                          false // Lower cost is better
                        )}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {formatPercentageDiff(
                            material.cost.pricePerKg,
                            referenceMaterial.cost.pricePerKg
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Lead Time */}
                <tr className="border-b">
                  <td className="py-3 px-2">Lead Time (days)</td>
                  {materials.map((material, index) => (
                    <td key={material.id} className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">
                          {material.cost.leadTime}
                        </span>
                        {index > 0 && getComparisonIcon(
                          material.cost.leadTime,
                          referenceMaterial.cost.leadTime,
                          false // Lower lead time is better
                        )}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {formatPercentageDiff(
                            material.cost.leadTime,
                            referenceMaterial.cost.leadTime
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Sustainability */}
                <tr className="border-b">
                  <td className="py-3 px-2 flex items-center gap-2">
                    <Leaf size={16} className="text-green-600" />
                    Sustainability Score
                  </td>
                  {materials.map((material, index) => (
                    <td key={material.id} className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">
                          {material.sustainability.sustainabilityScore}
                        </span>
                        {index > 0 && getComparisonIcon(
                          material.sustainability.sustainabilityScore,
                          referenceMaterial.sustainability.sustainabilityScore,
                          true
                        )}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {formatPercentageDiff(
                            material.sustainability.sustainabilityScore,
                            referenceMaterial.sustainability.sustainabilityScore
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Best Supplier */}
                <tr>
                  <td className="py-3 px-2 flex items-center gap-2">
                    <Building size={16} className="text-blue-600" />
                    Best Supplier
                  </td>
                  {materials.map((material) => {
                    const bestSupplier = material.suppliers
                      .filter(s => s.availability !== 'Unavailable')
                      .sort((a, b) => b.reliability - a.reliability)[0];
                    
                    return (
                      <td key={material.id} className="text-center py-3 px-2">
                        {bestSupplier ? (
                          <div>
                            <div className="font-medium text-sm">
                              {bestSupplier.name}
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs mt-1 ${
                                bestSupplier.availability === 'In Stock' ? 
                                'bg-green-100 text-green-800' :
                                bestSupplier.availability === 'Limited' ?
                                'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {bestSupplier.availability}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No suppliers
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {materials.map((material) => {
          const score = scores[material.id];
          if (!score) return null;

          return (
            <Card key={material.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {material.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Properties</span>
                    <span>{score.propertiesScore}/100</span>
                  </div>
                  <Progress value={score.propertiesScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Cost</span>
                    <span>{score.costScore}/100</span>
                  </div>
                  <Progress 
                    value={score.costScore} 
                    className="h-2 [&>div]:bg-green-500" 
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Sustainability</span>
                    <span>{score.sustainabilityScore}/100</span>
                  </div>
                  <Progress 
                    value={score.sustainabilityScore} 
                    className="h-2 [&>div]:bg-blue-500" 
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Availability</span>
                    <span>{score.availabilityScore}/100</span>
                  </div>
                  <Progress 
                    value={score.availabilityScore} 
                    className="h-2 [&>div]:bg-purple-500" 
                  />
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {score.overallScore}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Overall Score
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}