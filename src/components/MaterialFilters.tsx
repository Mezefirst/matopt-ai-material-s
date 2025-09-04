import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MagnifyingGlass, Sliders } from '@phosphor-icons/react';
import { useI18n } from '@/i18n';
import { MaterialRequirements } from '../types/materials';

interface MaterialFiltersProps {
  requirements: MaterialRequirements;
  onRequirementsChange: (requirements: MaterialRequirements) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export function MaterialFilters({ 
  requirements, 
  onRequirementsChange, 
  onSearch,
  isLoading = false 
}: MaterialFiltersProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const updateRequirements = (updates: Partial<MaterialRequirements>) => {
    onRequirementsChange({ ...requirements, ...updates });
  };

  const updateRange = (
    field: 'tensileStrength' | 'density' | 'budget' | 'operatingTemp' | 'electricalConductivity' | 'electricalResistivity' | 'dielectricStrength',
    type: 'min' | 'max',
    value: string
  ) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    const currentRange = requirements[field] || {};
    updateRequirements({
      [field]: {
        ...currentRange,
        [type]: numValue
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sliders size={20} className="text-primary" />
            {t.materialRequirements}
            {/* Mode indicator */}
            <div className={`ml-2 px-2 py-1 text-xs rounded-full ${
              requirements.autoSelectTop2 !== false 
                ? 'bg-accent/20 text-accent border border-accent/30' 
                : 'bg-muted text-muted-foreground border border-muted'
            }`}>
              {requirements.autoSelectTop2 !== false ? (
                <>✨ AUTO</>
              ) : (
                <>⚙️ MANUAL</>
              )}
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground"
          >
            {isExpanded ? t.lessFilters : t.moreFilters}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tensile-min">{t.tensileStrength} ({t.mpa})</Label>
            <div className="flex gap-2">
              <Input
                id="tensile-min"
                type="number"
                placeholder={t.min}
                value={requirements.tensileStrength?.min || ''}
                onChange={(e) => updateRange('tensileStrength', 'min', e.target.value)}
              />
              <Input
                type="number"
                placeholder={t.max}
                value={requirements.tensileStrength?.max || ''}
                onChange={(e) => updateRange('tensileStrength', 'max', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-min">{t.budget} ({t.usdKg})</Label>
            <div className="flex gap-2">
              <Input
                id="budget-min"
                type="number"
                placeholder={t.min}
                value={requirements.budget?.min || ''}
                onChange={(e) => updateRange('budget', 'min', e.target.value)}
              />
              <Input
                type="number"
                placeholder={t.max}
                value={requirements.budget?.max || ''}
                onChange={(e) => updateRange('budget', 'max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Region Selection */}
        <div className="space-y-2">
          <Label>{t.region}</Label>
          <Select
            value={requirements.region || ''}
            onValueChange={(value) => updateRequirements({ region: value || undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.selectRegion} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north-america">{t.northAmerica}</SelectItem>
              <SelectItem value="europe">{t.europe}</SelectItem>
              <SelectItem value="asia-pacific">{t.asia}</SelectItem>
              <SelectItem value="global">{t.global}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="density-min">{t.density} ({t.gCm3})</Label>
              <div className="flex gap-2">
                <Input
                  id="density-min"
                  type="number"
                  step="0.1"
                  placeholder={t.min}
                  value={requirements.density?.min || ''}
                  onChange={(e) => updateRange('density', 'min', e.target.value)}
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder={t.max}
                  value={requirements.density?.max || ''}
                  onChange={(e) => updateRange('density', 'max', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temp-min">{t.operatingTemp} ({t.celsius})</Label>
              <div className="flex gap-2">
                <Input
                  id="temp-min"
                  type="number"
                  placeholder={t.min}
                  value={requirements.operatingTemp?.min || ''}
                  onChange={(e) => updateRange('operatingTemp', 'min', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder={t.max}
                  value={requirements.operatingTemp?.max || ''}
                  onChange={(e) => updateRange('operatingTemp', 'max', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.electricalType}</Label>
              <Select
                value={requirements.electricalType || ''}
                onValueChange={(value) => 
                  updateRequirements({ 
                    electricalType: value as 'conductor' | 'insulator' | 'semiconductor' | 'any' || undefined 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.selectElectricalType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t.any}</SelectItem>
                  <SelectItem value="conductor">{t.conductor}</SelectItem>
                  <SelectItem value="insulator">{t.insulator}</SelectItem>
                  <SelectItem value="semiconductor">{t.semiconductor}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {requirements.electricalType === 'conductor' && (
              <div className="space-y-2">
                <Label htmlFor="conductivity-min">{t.electricalConductivity} ({t.msm})</Label>
                <div className="flex gap-2">
                  <Input
                    id="conductivity-min"
                    type="number"
                    step="0.1"
                    placeholder={t.min}
                    value={requirements.electricalConductivity?.min || ''}
                    onChange={(e) => updateRange('electricalConductivity', 'min', e.target.value)}
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder={t.max}
                    value={requirements.electricalConductivity?.max || ''}
                    onChange={(e) => updateRange('electricalConductivity', 'max', e.target.value)}
                  />
                </div>
              </div>
            )}

            {requirements.electricalType === 'insulator' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="resistivity-min">{t.electricalResistivity} ({t.microOhmCm})</Label>
                  <div className="flex gap-2">
                    <Input
                      id="resistivity-min"
                      type="number"
                      step="1000"
                      placeholder={t.min}
                      value={requirements.electricalResistivity?.min || ''}
                      onChange={(e) => updateRange('electricalResistivity', 'min', e.target.value)}
                    />
                    <Input
                      type="number"
                      step="1000"
                      placeholder={t.max}
                      value={requirements.electricalResistivity?.max || ''}
                      onChange={(e) => updateRange('electricalResistivity', 'max', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dielectric-min">{t.dielectricStrength} ({t.kvMm})</Label>
                  <div className="flex gap-2">
                    <Input
                      id="dielectric-min"
                      type="number"
                      step="0.1"
                      placeholder={t.min}
                      value={requirements.dielectricStrength?.min || ''}
                      onChange={(e) => updateRange('dielectricStrength', 'min', e.target.value)}
                    />
                    <Input
                      type="number"
                      step="0.1"
                      placeholder={t.max}
                      value={requirements.dielectricStrength?.max || ''}
                      onChange={(e) => updateRange('dielectricStrength', 'max', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="sustainability-priority"
                checked={requirements.sustainabilityPriority || false}
                onCheckedChange={(checked) => 
                  updateRequirements({ sustainabilityPriority: checked })
                }
              />
              <Label htmlFor="sustainability-priority">
                {t.prioritizeSustainability}
              </Label>
            </div>

            {/* Auto-selection toggle */}
            <div className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
              requirements.autoSelectTop2 !== false 
                ? 'bg-accent/10 border-accent/20' 
                : 'bg-muted/20 border-muted'
            }`}>
              <Switch
                id="auto-selection"
                checked={requirements.autoSelectTop2 !== false} // Default to true
                onCheckedChange={(checked) => 
                  updateRequirements({ autoSelectTop2: checked })
                }
              />
              <div className="flex-1">
                <Label htmlFor="auto-selection" className="text-sm font-medium flex items-center gap-2">
                  {requirements.autoSelectTop2 !== false ? (
                    <>
                      <span className="text-accent">✨</span>
                      {t.autoSelectTop2 || 'Auto-select top 2 materials'}
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">ON</span>
                    </>
                  ) : (
                    <>
                      <span className="text-muted-foreground">⚙️</span>
                      {t.autoSelectTop2 || 'Auto-select top 2 materials'}
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">OFF</span>
                    </>
                  )}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {requirements.autoSelectTop2 !== false ? (
                    t.autoSelectDescription || 'Automatically select the best 2 materials for instant comparison'
                  ) : (
                    t.manualSelectionMode || 'Manual selection mode - choose materials yourself using checkboxes'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button 
          onClick={onSearch}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          <MagnifyingGlass size={16} className="mr-2" />
          {isLoading ? t.searching : t.searchMaterials}
        </Button>
      </CardContent>
    </Card>
  );
}