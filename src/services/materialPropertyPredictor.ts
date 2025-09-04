import { MaterialProperties, Material } from '@/types/materials';

export interface MaterialComposition {
  elements: Array<{
    symbol: string;
    atomicNumber: number;
    percentage: number;
  }>;
  crystalStructure?: 'FCC' | 'BCC' | 'HCP' | 'amorphous' | 'ceramic' | 'polymer' | 'composite';
  processingMethod?: 'cast' | 'forged' | 'machined' | 'additive' | 'sintered' | 'composite';
}

export interface PropertyPrediction {
  property: keyof MaterialProperties;
  predictedValue: number;
  confidence: number;
  uncertaintyRange: {
    lower: number;
    upper: number;
  };
  explanation: string;
}

export interface MaterialPredictionResult {
  materialId: string;
  name: string;
  composition: MaterialComposition;
  predictedProperties: PropertyPrediction[];
  overallConfidence: number;
  recommendedTesting: string[];
  potentialApplications: string[];
}

class MaterialPropertyPredictorService {
  private models: Map<string, any> = new Map();
  private isInitialized = false;

  /**
   * Initialize the property prediction models with training data
   */
  async initializeModels(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Simulate loading pre-trained models
      await this.loadPropertyModels();
      this.isInitialized = true;
      console.log('Material property prediction models initialized');
    } catch (error) {
      console.error('Failed to initialize prediction models:', error);
      throw new Error('Model initialization failed');
    }
  }

  /**
   * Load pre-trained models for different material properties
   */
  private async loadPropertyModels(): Promise<void> {
    // Simulate loading models with different architectures
    const propertyModels = {
      tensileStrength: this.createTensileStrengthModel(),
      density: this.createDensityModel(),
      electricalConductivity: this.createElectricalConductivityModel(),
      thermalConductivity: this.createThermalConductivityModel(),
      corrosionResistance: this.createCorrosionResistanceModel(),
      fatigueStrength: this.createFatigueStrengthModel(),
      operatingTempMax: this.createOperatingTempModel()
    };

    for (const [property, model] of Object.entries(propertyModels)) {
      this.models.set(property, model);
    }
  }

  /**
   * Predict all material properties for a new material composition
   */
  async predictMaterialProperties(
    composition: MaterialComposition,
    materialName: string
  ): Promise<MaterialPredictionResult> {
    if (!this.isInitialized) {
      await this.initializeModels();
    }

    const materialId = `predicted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const predictions: PropertyPrediction[] = [];

    // Predict each property
    for (const [propertyName, model] of this.models.entries()) {
      try {
        const prediction = await this.predictProperty(
          composition,
          propertyName as keyof MaterialProperties,
          model
        );
        predictions.push(prediction);
      } catch (error) {
        console.warn(`Failed to predict ${propertyName}:`, error);
      }
    }

    // Calculate overall confidence
    const overallConfidence = predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length;

    // Generate recommendations
    const recommendedTesting = this.generateTestingRecommendations(predictions, composition);
    const potentialApplications = this.generateApplicationRecommendations(predictions, composition);

    return {
      materialId,
      name: materialName,
      composition,
      predictedProperties: predictions,
      overallConfidence,
      recommendedTesting,
      potentialApplications
    };
  }

  /**
   * Predict a specific material property
   */
  private async predictProperty(
    composition: MaterialComposition,
    property: keyof MaterialProperties,
    model: any
  ): Promise<PropertyPrediction> {
    const features = this.extractFeatures(composition);
    
    // Simulate model prediction with realistic variations
    const baseValue = model.predict(features);
    const confidence = this.calculateConfidence(composition, property);
    const uncertainty = baseValue * (1 - confidence) * 0.3; // 30% max uncertainty

    return {
      property,
      predictedValue: baseValue,
      confidence,
      uncertaintyRange: {
        lower: baseValue - uncertainty,
        upper: baseValue + uncertainty
      },
      explanation: this.generateExplanation(composition, property, baseValue, confidence)
    };
  }

  /**
   * Extract numerical features from material composition
   */
  private extractFeatures(composition: MaterialComposition): number[] {
    const features: number[] = [];

    // Composition features
    const elementMap = new Map<string, number>();
    composition.elements.forEach(el => {
      elementMap.set(el.symbol, el.percentage);
    });

    // Key element percentages (padded to fixed size)
    const keyElements = ['Fe', 'Al', 'Cu', 'Ti', 'Ni', 'Cr', 'C', 'Si', 'Mn', 'Mo'];
    keyElements.forEach(symbol => {
      features.push(elementMap.get(symbol) || 0);
    });

    // Average atomic number weighted by percentage
    const avgAtomicNumber = composition.elements.reduce((sum, el) => 
      sum + el.atomicNumber * (el.percentage / 100), 0);
    features.push(avgAtomicNumber);

    // Number of alloying elements
    features.push(composition.elements.length);

    // Crystal structure encoding
    const structureMap = { FCC: 1, BCC: 2, HCP: 3, amorphous: 4, ceramic: 5, polymer: 6, composite: 7 };
    features.push(structureMap[composition.crystalStructure || 'amorphous'] || 0);

    // Processing method encoding
    const processingMap = { cast: 1, forged: 2, machined: 3, additive: 4, sintered: 5, composite: 6 };
    features.push(processingMap[composition.processingMethod || 'cast'] || 0);

    return features;
  }

  /**
   * Calculate prediction confidence based on composition similarity to training data
   */
  private calculateConfidence(composition: MaterialComposition, property: keyof MaterialProperties): number {
    // Base confidence depends on material type familiarity
    let baseConfidence = 0.7;

    // Higher confidence for common alloy systems
    const hasCommonElements = composition.elements.some(el => 
      ['Fe', 'Al', 'Cu', 'Ti', 'Ni'].includes(el.symbol));
    if (hasCommonElements) baseConfidence += 0.1;

    // Lower confidence for exotic compositions
    const hasRareElements = composition.elements.some(el => el.atomicNumber > 83);
    if (hasRareElements) baseConfidence -= 0.2;

    // Confidence varies by property type
    const propertyConfidenceMap: Partial<Record<keyof MaterialProperties, number>> = {
      density: 0.95, // High confidence for density
      tensileStrength: 0.8, // Good mechanical property models
      electricalConductivity: 0.75, // Moderate electrical property confidence
      thermalConductivity: 0.7, // Lower thermal property confidence
      corrosionResistance: 0.6 // Lowest confidence for complex behavior
    };

    const propertyModifier = propertyConfidenceMap[property] || 0.7;
    
    return Math.min(0.95, Math.max(0.3, baseConfidence * propertyModifier));
  }

  /**
   * Generate human-readable explanation for the prediction
   */
  private generateExplanation(
    composition: MaterialComposition,
    property: keyof MaterialProperties,
    value: number,
    confidence: number
  ): string {
    const majorElements = composition.elements
      .filter(el => el.percentage > 10)
      .map(el => el.symbol)
      .join(', ');

    const confidenceLevel = confidence > 0.8 ? 'high' : confidence > 0.6 ? 'moderate' : 'low';

    const explanations: Partial<Record<keyof MaterialProperties, string>> = {
      tensileStrength: `Based on ${majorElements} composition and ${composition.crystalStructure} structure. ${confidenceLevel} confidence prediction.`,
      density: `Calculated from atomic weights and crystal structure. Density prediction has ${confidenceLevel} confidence.`,
      electricalConductivity: `Influenced by ${majorElements} content and crystal structure. ${confidenceLevel} confidence based on electronic structure.`,
      thermalConductivity: `Thermal properties estimated from composition and bonding. ${confidenceLevel} confidence prediction.`,
      corrosionResistance: `Corrosion behavior predicted from alloying elements and microstructure. ${confidenceLevel} confidence due to environmental complexity.`
    };

    return explanations[property] || `Property predicted with ${confidenceLevel} confidence based on material composition.`;
  }

  /**
   * Generate testing recommendations based on prediction uncertainties
   */
  private generateTestingRecommendations(
    predictions: PropertyPrediction[],
    composition: MaterialComposition
  ): string[] {
    const recommendations: string[] = [];

    // Low confidence predictions need testing
    const lowConfidencePredictions = predictions.filter(p => p.confidence < 0.7);
    if (lowConfidencePredictions.length > 0) {
      recommendations.push(`Validate ${lowConfidencePredictions.map(p => p.property).join(', ')} through laboratory testing`);
    }

    // Special recommendations based on material type
    if (composition.crystalStructure === 'amorphous') {
      recommendations.push('Confirm amorphous structure with X-ray diffraction');
    }

    if (composition.elements.some(el => el.percentage > 50 && el.symbol === 'C')) {
      recommendations.push('Perform carbon content analysis and microstructural examination');
    }

    if (composition.processingMethod === 'additive') {
      recommendations.push('Evaluate build orientation effects and post-processing requirements');
    }

    return recommendations;
  }

  /**
   * Generate potential application recommendations
   */
  private generateApplicationRecommendations(
    predictions: PropertyPrediction[],
    composition: MaterialComposition
  ): string[] {
    const applications: string[] = [];

    // Get predicted values
    const tensileStrength = predictions.find(p => p.property === 'tensileStrength')?.predictedValue || 0;
    const density = predictions.find(p => p.property === 'density')?.predictedValue || 0;
    const conductivity = predictions.find(p => p.property === 'electricalConductivity')?.predictedValue || 0;
    const corrosionResistance = predictions.find(p => p.property === 'corrosionResistance')?.predictedValue || 0;

    // Structural applications
    if (tensileStrength > 800 && density < 8) {
      applications.push('Aerospace structural components');
    }
    if (tensileStrength > 600 && tensileStrength < 1000) {
      applications.push('Automotive structural parts');
    }

    // Electrical applications
    if (conductivity > 10) {
      applications.push('Electrical conductors and wiring');
    }
    if (conductivity < 0.01) {
      applications.push('Electrical insulation applications');
    }

    // Corrosion-resistant applications
    if (corrosionResistance > 8) {
      applications.push('Marine and chemical processing equipment');
    }

    // Lightweight applications
    if (density < 3) {
      applications.push('Lightweight structural applications');
    }

    return applications.length > 0 ? applications : ['General engineering applications'];
  }

  // Model creation methods (simplified neural network simulators)
  private createTensileStrengthModel() {
    return {
      predict: (features: number[]) => {
        // Simulate tensile strength prediction based on composition
        const [Fe, Al, Cu, Ti, Ni, Cr, C] = features;
        let strength = 200; // Base strength
        
        strength += Fe * 8; // Iron contribution
        strength += Al * 2; // Aluminum (lightweight)
        strength += Ti * 12; // Titanium (high strength)
        strength += Ni * 6; // Nickel contribution
        strength += Cr * 10; // Chromium hardening
        strength += C * 50; // Carbon (major strengthening)
        
        return Math.max(50, Math.min(2000, strength + (Math.random() - 0.5) * 100));
      }
    };
  }

  private createDensityModel() {
    return {
      predict: (features: number[]) => {
        const [Fe, Al, Cu, Ti, Ni, Cr] = features;
        let density = 0;
        
        density += Fe * 0.0786; // Iron density contribution
        density += Al * 0.027; // Aluminum
        density += Cu * 0.0896; // Copper
        density += Ti * 0.0451; // Titanium
        density += Ni * 0.0891; // Nickel
        density += Cr * 0.0716; // Chromium
        
        return Math.max(0.5, Math.min(20, density + (Math.random() - 0.5) * 0.5));
      }
    };
  }

  private createElectricalConductivityModel() {
    return {
      predict: (features: number[]) => {
        const [Fe, Al, Cu, Ti, Ni, Cr, C] = features;
        let conductivity = 0;
        
        conductivity += Cu * 0.596; // Copper (excellent conductor)
        conductivity += Al * 0.377; // Aluminum
        conductivity += Fe * 0.1; // Iron (moderate)
        conductivity -= C * 0.1; // Carbon reduces conductivity
        conductivity -= Cr * 0.05; // Chromium reduces conductivity
        
        return Math.max(0.001, Math.min(100, conductivity + (Math.random() - 0.5) * 0.1));
      }
    };
  }

  private createThermalConductivityModel() {
    return {
      predict: (features: number[]) => {
        const [Fe, Al, Cu, Ti, Ni, Cr] = features;
        let thermal = 0;
        
        thermal += Cu * 4.01; // Copper (excellent thermal conductor)
        thermal += Al * 2.37; // Aluminum
        thermal += Fe * 0.8; // Iron
        thermal += Ni * 0.9; // Nickel
        thermal += Ti * 0.22; // Titanium (poor thermal conductor)
        
        return Math.max(1, Math.min(500, thermal + (Math.random() - 0.5) * 10));
      }
    };
  }

  private createCorrosionResistanceModel() {
    return {
      predict: (features: number[]) => {
        const [Fe, Al, Cu, Ti, Ni, Cr] = features;
        let resistance = 5; // Base resistance
        
        resistance += Cr * 0.2; // Chromium (major corrosion resistance)
        resistance += Ni * 0.15; // Nickel
        resistance += Ti * 0.25; // Titanium (excellent resistance)
        resistance += Al * 0.1; // Aluminum (forms protective oxide)
        resistance -= Fe * 0.05; // Iron (tends to rust)
        
        return Math.max(1, Math.min(10, resistance + (Math.random() - 0.5) * 1));
      }
    };
  }

  private createFatigueStrengthModel() {
    return {
      predict: (features: number[]) => {
        const tensileModel = this.createTensileStrengthModel();
        const tensileStrength = tensileModel.predict(features);
        // Fatigue strength is typically 40-60% of tensile strength
        return tensileStrength * (0.4 + Math.random() * 0.2);
      }
    };
  }

  private createOperatingTempModel() {
    return {
      predict: (features: number[]) => {
        const [Fe, Al, Cu, Ti, Ni, Cr] = features;
        let maxTemp = 100; // Base temperature
        
        maxTemp += Ti * 15; // Titanium (high temperature)
        maxTemp += Ni * 12; // Nickel (high temperature)
        maxTemp += Cr * 10; // Chromium
        maxTemp += Fe * 8; // Iron
        maxTemp += Al * 5; // Aluminum (melts at lower temp)
        
        return Math.max(50, Math.min(3000, maxTemp + (Math.random() - 0.5) * 100));
      }
    };
  }
}

export const MaterialPropertyPredictor = new MaterialPropertyPredictorService();