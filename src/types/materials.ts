export interface Material {
  id: string;
  name: string;
  category: string;
  type: string;
  subtype: string;
  properties: {
    tensileStrength: number; // MPa
    yieldStrength?: number; // MPa
    elongation?: number; // %
    hardness: number; // HV or Shore
    density: number; // g/cm³
    elasticModulus: number; // GPa
    thermalConductivity: number; // W/m·K
    thermalExpansion?: number; // µm/m·K
    meltingPoint: number; // °C
    operatingTempMin: number; // °C
    operatingTempMax: number; // °C
    electricalConductivity: number; // MS/m (megasiemens per meter)
    electricalResistivity: number; // µΩ·cm (microohm-centimeter)
    magneticPermeability?: number; // relative permeability
    dielectricStrength?: number; // kV/mm (for insulators)
    corrosionResistance?: number; // 1-10 scale
  };
  cost: {
    pricePerKg: number; // USD
    currency: string;
    priceDate: string;
    availability: 'High' | 'Medium' | 'Low';
  };
  sustainability: {
    recyclability: number; // 0-100 score
    carbonFootprint: number; // kg CO2/kg
    sustainabilityScore: number; // 0-100 overall
    recycledContent: number; // 0-100 percentage
    eolRecyclability: number; // 0-100 end of life recyclability
    renewableEnergy: number; // 0-100 percentage of renewable energy in production
  };
  suppliers: Supplier[];
  applications: string[];
  advantages: string[];
  disadvantages: string[];
}

export interface Supplier {
  name: string;
  region: string;
  country: string;
  reliability: number; // 0-100 score
  leadTime: number; // days
  certifications: string[];
  sustainabilityRating: number; // 0-100 score
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  specialties: string[];
  minOrderQuantity: string;
  paymentTerms: string;
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
  autoSelectTop2?: boolean; // Auto-select top 2 materials for instant comparison
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

export type TabType = 'overview' | 'prediction' | 'properties' | 'sustainability' | 'ai-recommendations' | 'ml-recommendations' | 'regional-database';

export interface ComparisonState {
  selectedMaterials: string[];
  activeTab: TabType;
  requirements: MaterialRequirements;
  scores: Record<string, MaterialScore>;
}

// Machine Learning Feedback Types
export interface UserFeedback {
  id: string;
  timestamp: number;
  sessionId: string;
  materialId: string;
  requirements: MaterialRequirements;
  feedbackType: 'rating' | 'selection' | 'rejection' | 'comparison';
  rating?: number; // 1-5 scale
  selected?: boolean;
  comparedWith?: string[];
  preferred?: string; // Material ID that was preferred in comparison
  comments?: string;
  applicationContext?: string;
}

export interface TrainingData {
  features: {
    tensileStrength: number;
    density: number;
    cost: number;
    sustainabilityScore: number;
    temperatureRange: number;
    electricalConductivity: number;
    // Normalized requirement weights
    strengthWeight: number;
    costWeight: number;
    sustainabilityWeight: number;
    availabilityWeight: number;
    applicationSimilarity: number;
  };
  target: number; // User satisfaction score (0-1)
  metadata: {
    materialId: string;
    userId: string;
    applicationContext: string;
    timestamp: number;
  };
}

export interface ModelPerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingSize: number;
  lastTrainingDate: number;
  modelVersion: string;
}

export interface RecommendationExplanation {
  modelConfidence: number;
  keyFactors: {
    factor: string;
    importance: number;
    positive: boolean;
  }[];
  similarSuccessfulRecommendations: number;
  uncertainty: number;
}