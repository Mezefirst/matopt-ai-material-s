import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Phone, Mail, Globe, Award, Leaf, Clock, DollarSign } from '@phosphor-icons/react';
import { getAllRegions, getAllCountries, getSuppliersByRegion, getSuppliersByCountry } from '@/data/regionalSuppliers';
import { getRegionalMaterialDatabase } from '@/data/regionalMaterials';
import { Material, Supplier } from '@/types/materials';
import { useI18n } from '@/i18n';

interface RegionalDatabaseExplorerProps {
  className?: string;
  onMaterialSelect?: (material: Material) => void;
  onSupplierSelect?: (supplier: Supplier) => void;
}

export const RegionalDatabaseExplorer: React.FC<RegionalDatabaseExplorerProps> = ({
  className = '',
  onMaterialSelect,
  onSupplierSelect
}) => {
  const { t } = useI18n();
  
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'materials' | 'suppliers'>('materials');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);

  // Load regional data when region changes
  useEffect(() => {
    const regionalMaterials = getRegionalMaterialDatabase(selectedRegion);
    setMaterials(regionalMaterials);
    
    const regionalSuppliers = getSuppliersByRegion(selectedRegion);
    setSuppliers(regionalSuppliers);
    setFilteredSuppliers(regionalSuppliers);
    
    // Reset country filter when region changes
    setSelectedCountry('all');
  }, [selectedRegion]);

  // Filter suppliers by country
  useEffect(() => {
    if (selectedCountry === 'all') {
      setFilteredSuppliers(suppliers);
    } else {
      const countrySuppliers = suppliers.filter(supplier => 
        supplier.country.toLowerCase() === selectedCountry.toLowerCase()
      );
      setFilteredSuppliers(countrySuppliers);
    }
  }, [selectedCountry, suppliers]);

  const getAvailableCountries = () => {
    const countries = new Set(suppliers.map(supplier => supplier.country));
    return Array.from(countries).sort();
  };

  const getRegionStats = () => {
    const totalMaterials = materials.length;
    const totalSuppliers = filteredSuppliers.length;
    const avgReliability = filteredSuppliers.reduce((sum, s) => sum + s.reliability, 0) / (filteredSuppliers.length || 1);
    const avgSustainability = filteredSuppliers.reduce((sum, s) => sum + s.sustainabilityRating, 0) / (filteredSuppliers.length || 1);
    
    return {
      totalMaterials,
      totalSuppliers,
      avgReliability: Math.round(avgReliability),
      avgSustainability: Math.round(avgSustainability)
    };
  };

  const stats = getRegionStats();

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-green-600';
    if (reliability >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSustainabilityColor = (rating: number) => {
    if (rating >= 80) return 'text-green-600';
    if (rating >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={24} className="text-primary" />
                {t.regionalDatabase || 'Regional Database Explorer'}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {t.exploreRegionalMaterials || 'Explore materials and suppliers by geographic region'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'materials' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('materials')}
              >
                {t.materials || 'Materials'}
              </Button>
              <Button
                variant={viewMode === 'suppliers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('suppliers')}
              >
                {t.suppliers || 'Suppliers'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Region Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t.selectRegion || 'Select Region'}
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">🌍 {t.global || 'Global'}</SelectItem>
                  {getAllRegions().map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t.selectCountry || 'Select Country'}
              </label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCountries || 'All Countries'}</SelectItem>
                  {getAvailableCountries().map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stats Display */}
            <div className="space-y-2">
              <div className="text-sm font-medium">{t.regionStats || 'Region Statistics'}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="text-lg font-semibold text-primary">{stats.totalMaterials}</div>
                  <div className="text-xs text-muted-foreground">{t.materials || 'Materials'}</div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="text-lg font-semibold text-accent">{stats.totalSuppliers}</div>
                  <div className="text-xs text-muted-foreground">{t.suppliers || 'Suppliers'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className={getReliabilityColor(stats.avgReliability)} />
                <span className="text-sm font-medium">{t.avgReliability || 'Average Reliability'}</span>
              </div>
              <div className={`text-2xl font-bold ${getReliabilityColor(stats.avgReliability)}`}>
                {stats.avgReliability}%
              </div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={16} className={getSustainabilityColor(stats.avgSustainability)} />
                <span className="text-sm font-medium">{t.avgSustainability || 'Average Sustainability'}</span>
              </div>
              <div className={`text-2xl font-bold ${getSustainabilityColor(stats.avgSustainability)}`}>
                {stats.avgSustainability}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Display */}
      {viewMode === 'materials' ? (
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">
            {t.availableMaterials || 'Available Materials'} ({materials.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map(material => (
              <Card key={material.id} className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onMaterialSelect?.(material)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{material.name}</CardTitle>
                    <Badge variant="outline">{material.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{material.type}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{t.suppliers || 'Suppliers'}:</span>
                      <span className="font-medium">{material.suppliers.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{t.price || 'Price'}:</span>
                      <span className="font-medium">${material.cost.pricePerKg}/kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{t.sustainability || 'Sustainability'}:</span>
                      <span className={`font-medium ${getSustainabilityColor(material.sustainability.sustainabilityScore)}`}>
                        {material.sustainability.sustainabilityScore}%
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">{t.topApplications || 'Top Applications'}:</div>
                      <div className="flex flex-wrap gap-1">
                        {material.applications.slice(0, 2).map(app => (
                          <Badge key={app} variant="secondary" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                        {material.applications.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{material.applications.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">
            {t.availableSuppliers || 'Available Suppliers'} ({filteredSuppliers.length})
          </h3>
          <div className="grid gap-4">
            {filteredSuppliers.map(supplier => (
              <Card key={`${supplier.name}-${supplier.country}`} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onSupplierSelect?.(supplier)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {supplier.country}, {supplier.region}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getReliabilityColor(supplier.reliability)}`}>
                        {supplier.reliability}% {t.reliable || 'Reliable'}
                      </div>
                      <div className={`text-xs ${getSustainabilityColor(supplier.sustainabilityRating)}`}>
                        {supplier.sustainabilityRating}% {t.sustainable || 'Sustainable'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="text-muted-foreground" />
                          <span>{t.leadTime || 'Lead Time'}: {supplier.leadTime} {t.days || 'days'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} className="text-muted-foreground" />
                          <span>{t.paymentTerms || 'Payment'}: {supplier.paymentTerms}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building size={14} className="text-muted-foreground" />
                          <span>{t.minOrder || 'Min Order'}: {supplier.minOrderQuantity}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2">
                        {supplier.contact.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-muted-foreground" />
                            <span>{supplier.contact.phone}</span>
                          </div>
                        )}
                        {supplier.contact.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} className="text-muted-foreground" />
                            <span className="truncate">{supplier.contact.email}</span>
                          </div>
                        )}
                        {supplier.contact.website && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe size={14} className="text-muted-foreground" />
                            <a href={supplier.contact.website} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-primary hover:underline truncate"
                               onClick={(e) => e.stopPropagation()}>
                              {t.website || 'Website'}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">{t.specialties || 'Specialties'}:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.map(specialty => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-3">
                    <div className="text-sm font-medium mb-2">{t.certifications || 'Certifications'}:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map(cert => (
                        <Badge key={cert} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {((viewMode === 'materials' && materials.length === 0) || 
        (viewMode === 'suppliers' && filteredSuppliers.length === 0)) && (
        <Card>
          <CardContent className="text-center py-8">
            <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t.noDataFound || 'No Data Found'}
            </h3>
            <p className="text-muted-foreground">
              {viewMode === 'materials' 
                ? (t.noMaterialsInRegion || 'No materials available in selected region')
                : (t.noSuppliersInRegion || 'No suppliers available in selected region')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};