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

export type TabType = 'overview' | 'properties' | 'sustainability';

export interface ComparisonState {
  selectedMaterials: string[];
  activeTab: TabType;
  requirements: MaterialRequirements;
  scores: Record<string, MaterialScore>;
}