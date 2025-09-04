import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Target, 
  Clock, 
  Shield,
  Thermometer,
  Zap,
  Lightbulb,
  Copy
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';
import { MaterialRequirements } from '../types/materials';
import { applicationTemplates, getTemplatesByCategory } from '../data/applicationTemplates';

interface ApplicationContextProps {
  requirements: MaterialRequirements;
  onRequirementsChange: (requirements: MaterialRequirements) => void;
}

export function ApplicationContext({ requirements, onRequirementsChange }: ApplicationContextProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const updateRequirements = (updates: Partial<MaterialRequirements>) => {
    onRequirementsChange({ ...requirements, ...updates });
  };

  const applyTemplate = (templateId: string) => {
    const template = applicationTemplates.find(t => t.id === templateId);
    if (template) {
      onRequirementsChange(template.requirements);
      setShowTemplates(false);
      toast.success(`Applied ${template.name} template`);
    }
  };

  const templateCategories = getTemplatesByCategory();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target size={20} className="text-primary" />
            {t.applicationContext}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-muted-foreground"
            >
              <Lightbulb size={16} className="mr-1" />
              {t.templates}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground"
            >
              {isExpanded ? t.collapse : t.expand}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Application Templates */}
        {showTemplates && (
          <div className="space-y-3 border-b pb-4">
            <Label className="flex items-center gap-2">
              <Lightbulb size={16} />
              {t.applicationTemplates}
            </Label>
            <div className="space-y-3">
              {Object.entries(templateCategories).map(([category, templates]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {templates.map((template) => (
                      <Card key={template.id} className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div 
                          onClick={() => applyTemplate(template.id)}
                          className="flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{template.icon}</span>
                              <h5 className="font-medium">{template.name}</h5>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Copy size={14} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Description */}
        <div className="space-y-2">
          <Label htmlFor="application-context">{t.applicationContext}</Label>
          <Textarea
            id="application-context"
            placeholder={t.applicationContextPlaceholder}
            value={requirements.applicationContext || ''}
            onChange={(e) => updateRequirements({ applicationContext: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        {/* Quick Application Types */}
        {!requirements.applicationContext && (
          <div className="space-y-2">
            <Label>Common Applications</Label>
            <div className="flex flex-wrap gap-2">
              {[
                'Automotive parts',
                'Aerospace components',
                'Medical devices',
                'Consumer electronics',
                'Sports equipment',
                'Construction materials',
                'Marine applications'
              ].map((app) => (
                <Badge
                  key={app}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => updateRequirements({ applicationContext: app })}
                >
                  {app}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {isExpanded && (
          <>
            <Separator />
            
            {/* Loading Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Settings size={16} />
                  Loading Conditions
                </Label>
                <Select
                  value={requirements.loadingConditions || ''}
                  onValueChange={(value) => 
                    updateRequirements({ 
                      loadingConditions: value as 'static' | 'dynamic' | 'cyclic' | 'impact' || undefined 
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loading type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">Static (constant load)</SelectItem>
                    <SelectItem value="dynamic">Dynamic (varying load)</SelectItem>
                    <SelectItem value="cyclic">Cyclic (repeated loading)</SelectItem>
                    <SelectItem value="impact">Impact (shock loading)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Thermometer size={16} />
                  Environment
                </Label>
                <Select
                  value={requirements.environment || ''}
                  onValueChange={(value) => 
                    updateRequirements({ 
                      environment: value as 'indoor' | 'outdoor' | 'marine' | 'chemical' | 'high-temp' | 'cryogenic' || undefined 
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Operating environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor/Controlled</SelectItem>
                    <SelectItem value="outdoor">Outdoor/Weather</SelectItem>
                    <SelectItem value="marine">Marine/Saltwater</SelectItem>
                    <SelectItem value="chemical">Chemical/Corrosive</SelectItem>
                    <SelectItem value="high-temp">High Temperature</SelectItem>
                    <SelectItem value="cryogenic">Cryogenic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Design Life and Safety */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="design-life" className="flex items-center gap-2">
                  <Clock size={16} />
                  Design Life (years)
                </Label>
                <Input
                  id="design-life"
                  type="number"
                  placeholder="e.g., 10"
                  value={requirements.designLife || ''}
                  onChange={(e) => updateRequirements({ 
                    designLife: e.target.value ? parseInt(e.target.value) : undefined 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="safety-factor" className="flex items-center gap-2">
                  <Shield size={16} />
                  Safety Factor
                </Label>
                <Input
                  id="safety-factor"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.0"
                  value={requirements.safetyFactor || ''}
                  onChange={(e) => updateRequirements({ 
                    safetyFactor: e.target.value ? parseFloat(e.target.value) : undefined 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Zap size={16} />
                  Maintenance Access
                </Label>
                <Select
                  value={requirements.maintenanceAccess || ''}
                  onValueChange={(value) => 
                    updateRequirements({ 
                      maintenanceAccess: value as 'easy' | 'difficult' | 'none' || undefined 
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Maintenance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy Access</SelectItem>
                    <SelectItem value="difficult">Difficult Access</SelectItem>
                    <SelectItem value="none">No Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {/* Context Summary */}
        {requirements.applicationContext && (
          <div className="mt-4 p-3 bg-muted/30 rounded border-l-4 border-primary">
            <div className="text-sm space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <strong>Application:</strong> {requirements.applicationContext}
                  {requirements.loadingConditions && (
                    <><br /><strong>Loading:</strong> {requirements.loadingConditions}</>
                  )}
                  {requirements.environment && (
                    <><br /><strong>Environment:</strong> {requirements.environment}</>
                  )}
                  {requirements.designLife && (
                    <><br /><strong>Design Life:</strong> {requirements.designLife} years</>
                  )}
                  {requirements.safetyFactor && (
                    <><br /><strong>Safety Factor:</strong> {requirements.safetyFactor}x</>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateRequirements({ applicationContext: '' })}
                  className="ml-2 text-muted-foreground"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}