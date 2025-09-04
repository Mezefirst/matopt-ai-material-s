import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MagnifyingGlass, Sliders } from '@phosphor-icons/react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const updateRequirements = (updates: Partial<MaterialRequirements>) => {
    onRequirementsChange({ ...requirements, ...updates });
  };

  const updateRange = (
    field: 'tensileStrength' | 'density' | 'budget',
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
            Material Requirements
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tensile-min">Tensile Strength (MPa)</Label>
            <div className="flex gap-2">
              <Input
                id="tensile-min"
                type="number"
                placeholder="Min"
                value={requirements.tensileStrength?.min || ''}
                onChange={(e) => updateRange('tensileStrength', 'min', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={requirements.tensileStrength?.max || ''}
                onChange={(e) => updateRange('tensileStrength', 'max', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-min">Budget ($/kg)</Label>
            <div className="flex gap-2">
              <Input
                id="budget-min"
                type="number"
                placeholder="Min"
                value={requirements.budget?.min || ''}
                onChange={(e) => updateRange('budget', 'min', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={requirements.budget?.max || ''}
                onChange={(e) => updateRange('budget', 'max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Region Selection */}
        <div className="space-y-2">
          <Label>Preferred Region</Label>
          <Select
            value={requirements.region || ''}
            onValueChange={(value) => updateRequirements({ region: value || undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="density-min">Density (g/cm³)</Label>
              <div className="flex gap-2">
                <Input
                  id="density-min"
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={requirements.density?.min || ''}
                  onChange={(e) => updateRange('density', 'min', e.target.value)}
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={requirements.density?.max || ''}
                  onChange={(e) => updateRange('density', 'max', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="sustainability-priority"
                checked={requirements.sustainabilityPriority || false}
                onCheckedChange={(checked) => 
                  updateRequirements({ sustainabilityPriority: checked })
                }
              />
              <Label htmlFor="sustainability-priority">
                Prioritize Sustainability
              </Label>
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
          {isLoading ? 'Searching...' : 'Find Materials'}
        </Button>
      </CardContent>
    </Card>
  );
}