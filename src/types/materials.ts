export interface Material {
  id: string;
  name: string;
  category: string;
  properties: {
    tensileStrength: number; // MPa
    density: number; // g/cm³
    elasticModulus: number; // GPa
    thermalConductivity: number; // W/m·K
    meltingPoint: number; // °C
    hardness: number; // HV
    operatingTempMin: number; // °C
    operatingTempMax: number; // °C
    electricalConductivity: number; // MS/m (megasiemens per meter)
    electricalResistivity: number; // µΩ·cm (microohm-centimeter)
    dielectricStrength?: number; // kV/mm (for insulators)
  };
  cost: {
    pricePerKg: number; // USD
    minimumOrder: number; // kg
    leadTime: number; // days
  };
  sustainability: {
    carbonFootprint: number; // kg CO2/kg
    recyclability: number; // 0-100 score
    renewableContent: number; // 0-100 percentage
    sustainabilityScore: number; // 0-100 overall
  };
  suppliers: Supplier[];
  description: string;
  applications: string[];
  pros: string[];
  cons: string[];
}

export interface Supplier {
  id: string;
  name: string;
  region: string;
  contact: string;
  reliability: number; // 0-100 score
  availability: 'In Stock' | 'Limited' | 'Made to Order' | 'Unavailable';
  priceQuote?: number;
}

export interface MaterialRequirements {
  tensileStrength?: { min?: number; max?: number };
  density?: { min?: number; max?: number };
  budget?: { min?: number; max?: number };
  region?: string;
  sustainabilityPriority?: boolean;
  applications?: string[];
  operatingTemp?: { min?: number; max?: number };
  electricalConductivity?: { min?: number; max?: number };
  electricalResistivity?: { min?: number; max?: number };
  dielectricStrength?: { min?: number; max?: number };
  electricalType?: 'conductor' | 'insulator' | 'semiconductor' | 'any';
  // Application-specific requirements
  applicationContext?: string; // Free text description of the application
  loadingConditions?: 'static' | 'dynamic' | 'cyclic' | 'impact';
  environment?: 'indoor' | 'outdoor' | 'marine' | 'chemical' | 'high-temp' | 'cryogenic';
  safetyFactor?: number; // Multiplier for strength requirements
  designLife?: number; // Expected lifespan in years
  maintenanceAccess?: 'easy' | 'difficult' | 'none';
}

export interface ApplicationRecommendation {
  materialId: string;
  suitabilityScore: number; // 0-100 how well it fits the specific application
  keyBenefits: string[];
  potentialConcerns: string[];
  designConsiderations: string[];
  alternativeOptions?: string[];
}

export interface SmartRecommendation {
  query: string;
  recommendedMaterials: ApplicationRecommendation[];
  reasoning: string;
  considerations: string[];
  nextSteps: string[];
}

export interface MaterialScore {
  materialId: string;
  overallScore: number;
  propertiesScore: number;
  costScore: number;
  sustainabilityScore: number;
  availabilityScore: number;
  reasoning: string;
}

export type TabType = 'overview' | 'properties' | 'sustainability' | 'ai-recommendations';

export interface ComparisonState {
  selectedMaterials: string[];
  activeTab: TabType;
  requirements: MaterialRequirements;
  scores: Record<string, MaterialScore>;
}