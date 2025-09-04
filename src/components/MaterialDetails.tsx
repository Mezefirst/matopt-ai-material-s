import React from 'react';
import { Material } from '../types/materials';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Gear, 
  Thermometer, 
  Gauge, 
  Lightning,
  CurrencyDollar,
  Clock,
  Package,
  Leaf,
  Recycle,
  Building,
  CheckCircle,
  XCircle,
  Star
} from '@phosphor-icons/react';

interface MaterialDetailsProps {
  material: Material;
}

export function MaterialDetails({ material }: MaterialDetailsProps) {
  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'In Stock': return <CheckCircle className="text-green-600" />;
      case 'Limited': return <Clock className="text-yellow-600" />;
      case 'Made to Order': return <Package className="text-blue-600" />;
      default: return <XCircle className="text-red-600" />;
    }
  };

  const getSustainabilityGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-700' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600' };
    if (score >= 70) return { grade: 'B', color: 'text-yellow-600' };
    if (score >= 60) return { grade: 'C', color: 'text-orange-600' };
    return { grade: 'D', color: 'text-red-600' };
  };

  const sustainabilityGrade = getSustainabilityGrade(material.sustainability.sustainabilityScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{material.name}</h2>
        <p className="text-muted-foreground mt-1">{material.description}</p>
        <Badge className="mt-2">{material.category}</Badge>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          {/* Mechanical Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="text-primary" />
                Mechanical Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Tensile Strength</span>
                      <span className="text-sm font-bold">{material.properties.tensileStrength} MPa</span>
                    </div>
                    <Progress value={(material.properties.tensileStrength / 4000) * 100} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Elastic Modulus</span>
                      <span className="text-sm font-bold">{material.properties.elasticModulus} GPa</span>
                    </div>
                    <Progress value={(material.properties.elasticModulus / 500) * 100} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Hardness</span>
                      <span className="text-sm font-bold">{material.properties.hardness} HV</span>
                    </div>
                    <Progress value={(material.properties.hardness / 1000) * 100} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Gauge className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Density</div>
                      <div className="text-sm text-muted-foreground">
                        {material.properties.density} g/cm³
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Thermometer className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Melting Point</div>
                      <div className="text-sm text-muted-foreground">
                        {material.properties.meltingPoint}°C
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Lightning className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">Thermal Conductivity</div>
                      <div className="text-sm text-muted-foreground">
                        {material.properties.thermalConductivity} W/m·K
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature & Electrical Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="text-primary" />
                  Temperature Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg">
                    <div className="text-lg font-bold text-primary">
                      {material.properties.operatingTempMin}°C to {material.properties.operatingTempMax}°C
                    </div>
                    <div className="text-sm text-muted-foreground">Operating Range</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">Min: {material.properties.operatingTempMin}°C</span>
                    <span className="text-red-600 font-medium">Max: {material.properties.operatingTempMax}°C</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightning className="text-primary" />
                  Electrical Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span className="text-sm font-medium">Conductivity</span>
                    <span className="text-sm">{material.properties.electricalConductivity.toFixed(2)} MS/m</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span className="text-sm font-medium">Resistivity</span>
                    <span className="text-sm">{material.properties.electricalResistivity} µΩ·cm</span>
                  </div>
                  {material.properties.dielectricStrength && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm font-medium">Dielectric Strength</span>
                      <span className="text-sm">{material.properties.dielectricStrength} kV/mm</span>
                    </div>
                  )}
                  <div className="mt-3 p-2 bg-primary/10 rounded text-center">
                    <span className="text-sm font-medium text-primary">
                      {material.properties.electricalConductivity >= 1 
                        ? 'Good Conductor' 
                        : material.properties.electricalResistivity > 1000000
                          ? 'Excellent Insulator'
                          : 'Semiconductor'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="text-primary" />
                Cost & Procurement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${material.cost.pricePerKg}
                  </div>
                  <div className="text-sm text-muted-foreground">per kg</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {material.cost.minimumOrder}
                  </div>
                  <div className="text-sm text-muted-foreground">kg minimum</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {material.cost.leadTime}
                  </div>
                  <div className="text-sm text-muted-foreground">days lead time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications & Trade-offs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typical Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {material.applications.map((app) => (
                    <Badge key={app} variant="secondary">
                      {app}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trade-offs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-green-700 mb-1">Advantages</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {material.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-600 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-red-700 mb-1">Considerations</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {material.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle size={12} className="text-red-600 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="text-green-600" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className={`text-4xl font-bold ${sustainabilityGrade.color}`}>
                      {sustainabilityGrade.grade}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Sustainability Grade
                    </div>
                    <div className="text-lg font-semibold mt-2">
                      {material.sustainability.sustainabilityScore}/100
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Carbon Footprint</span>
                      <span className="text-sm font-bold">
                        {material.sustainability.carbonFootprint} kg CO₂/kg
                      </span>
                    </div>
                    <Progress 
                      value={Math.max(0, 100 - (material.sustainability.carbonFootprint / 50) * 100)} 
                      className="[&>div]:bg-green-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Recyclability</span>
                      <span className="text-sm font-bold">
                        {material.sustainability.recyclability}%
                      </span>
                    </div>
                    <Progress 
                      value={material.sustainability.recyclability} 
                      className="[&>div]:bg-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Renewable Content</span>
                      <span className="text-sm font-bold">
                        {material.sustainability.renewableContent}%
                      </span>
                    </div>
                    <Progress 
                      value={material.sustainability.renewableContent} 
                      className="[&>div]:bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4">
            {material.suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.region}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getAvailabilityIcon(supplier.availability)}
                      <span className="text-sm font-medium">{supplier.availability}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Reliability</div>
                      <div className="flex items-center gap-2">
                        <Progress value={supplier.reliability} className="flex-1" />
                        <span className="text-sm font-bold">{supplier.reliability}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Contact</div>
                      <div className="text-sm text-muted-foreground">{supplier.contact}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Rating</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < Math.floor(supplier.reliability / 20) ? 
                              'text-yellow-500 fill-current' : 'text-gray-300'
                            } 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}