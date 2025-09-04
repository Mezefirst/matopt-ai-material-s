import { 
  Material, 
  MaterialRequirements, 
  UserFeedback, 
  TrainingData, 
  ModelPerformance,
  RecommendationExplanation,
  MaterialScore
} from '../types/materials';

export class MLFeedbackService {
  private static readonly FEEDBACK_KEY = 'user-feedback-data';
  private static readonly TRAINING_DATA_KEY = 'ml-training-data';
  private static readonly MODEL_PERFORMANCE_KEY = 'model-performance';
  private static readonly MODEL_WEIGHTS_KEY = 'model-weights';

  /**
   * Collect user feedback on material recommendations
   */
  static async recordFeedback(feedback: Omit<UserFeedback, 'id' | 'timestamp'>): Promise<void> {
    try {
      const existingFeedback = await spark.kv.get<UserFeedback[]>(this.FEEDBACK_KEY) || [];
      
      const newFeedback: UserFeedback = {
        ...feedback,
        id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
      };

      existingFeedback.push(newFeedback);
      await spark.kv.set(this.FEEDBACK_KEY, existingFeedback);

      // Automatically convert feedback to training data
      await this.processFeedbackForTraining(newFeedback);
      
      console.log('Feedback recorded successfully:', newFeedback.id);
    } catch (error) {
      console.error('Failed to record feedback:', error);
    }
  }

  /**
   * Convert user feedback into training data
   */
  private static async processFeedbackForTraining(feedback: UserFeedback): Promise<void> {
    try {
      const material = await this.getMaterialById(feedback.materialId);
      if (!material) return;

      const features = this.extractFeatures(material, feedback.requirements, feedback.applicationContext);
      const target = this.calculateTargetScore(feedback);

      const trainingData: TrainingData = {
        features,
        target,
        metadata: {
          materialId: feedback.materialId,
          userId: feedback.sessionId,
          applicationContext: feedback.applicationContext || '',
          timestamp: feedback.timestamp
        }
      };

      const existingTrainingData = await spark.kv.get<TrainingData[]>(this.TRAINING_DATA_KEY) || [];
      existingTrainingData.push(trainingData);
      
      // Keep only the last 1000 training examples to prevent storage bloat
      if (existingTrainingData.length > 1000) {
        existingTrainingData.splice(0, existingTrainingData.length - 1000);
      }

      await spark.kv.set(this.TRAINING_DATA_KEY, existingTrainingData);

      // Retrain model if we have enough new data
      if (existingTrainingData.length % 50 === 0) {
        await this.retrainModel();
      }
    } catch (error) {
      console.error('Failed to process feedback for training:', error);
    }
  }

  /**
   * Extract machine learning features from material and requirements
   */
  private static extractFeatures(
    material: Material, 
    requirements: MaterialRequirements,
    applicationContext?: string
  ): TrainingData['features'] {
    // Normalize material properties (0-1 scale)
    const normalizedTensileStrength = Math.min(material.properties.tensileStrength / 2000, 1); // Assume max 2000 MPa
    const normalizedDensity = Math.min(material.properties.density / 20, 1); // Assume max 20 g/cm³
    const normalizedCost = Math.min(material.cost.pricePerKg / 1000, 1); // Assume max $1000/kg
    const normalizedSustainability = material.sustainability.sustainabilityScore / 100;
    const temperatureRange = Math.min(
      (material.properties.operatingTempMax - material.properties.operatingTempMin) / 1000, 
      1
    );
    const normalizedElectricalConductivity = Math.min(
      material.properties.electricalConductivity / 100, 
      1
    );

    // Calculate requirement weights based on what user specified
    const strengthWeight = requirements.tensileStrength ? 1 : 0;
    const costWeight = requirements.budget ? 1 : 0;
    const sustainabilityWeight = requirements.sustainabilityPriority ? 1 : 0;
    const availabilityWeight = requirements.region ? 1 : 0;

    // Calculate application similarity (simplified text matching)
    let applicationSimilarity = 0;
    if (applicationContext && material.applications.length > 0) {
      const contextWords = applicationContext.toLowerCase().split(' ');
      const materialApps = material.applications.join(' ').toLowerCase();
      const matches = contextWords.filter(word => materialApps.includes(word)).length;
      applicationSimilarity = Math.min(matches / contextWords.length, 1);
    }

    return {
      tensileStrength: normalizedTensileStrength,
      density: normalizedDensity,
      cost: normalizedCost,
      sustainabilityScore: normalizedSustainability,
      temperatureRange,
      electricalConductivity: normalizedElectricalConductivity,
      strengthWeight,
      costWeight,
      sustainabilityWeight,
      availabilityWeight,
      applicationSimilarity
    };
  }

  /**
   * Calculate target score from user feedback
   */
  private static calculateTargetScore(feedback: UserFeedback): number {
    switch (feedback.feedbackType) {
      case 'rating':
        return (feedback.rating || 3) / 5; // Convert 1-5 to 0-1
      case 'selection':
        return feedback.selected ? 0.8 : 0.2;
      case 'rejection':
        return 0.1;
      case 'comparison':
        return feedback.preferred === feedback.materialId ? 0.9 : 0.3;
      default:
        return 0.5;
    }
  }

  /**
   * Retrain the recommendation model using collected feedback
   */
  static async retrainModel(): Promise<void> {
    try {
      const trainingData = await spark.kv.get<TrainingData[]>(this.TRAINING_DATA_KEY) || [];
      
      if (trainingData.length < 20) {
        console.log('Insufficient training data for model retraining');
        return;
      }

      console.log(`Retraining model with ${trainingData.length} examples...`);

      // Use AI to analyze patterns and create model weights
      const prompt = spark.llmPrompt`
You are a machine learning engineer analyzing user feedback patterns for material recommendations.

Training Data Summary:
- Total examples: ${trainingData.length}
- Feature examples:
${trainingData.slice(0, 10).map(d => `
  Features: ${JSON.stringify(d.features)}
  Target: ${d.target}
  Context: ${d.metadata.applicationContext}
`).join('\n')}

Analyze the patterns and provide model weights for each feature that would best predict user satisfaction.

Return a JSON object with:
{
  "weights": {
    "tensileStrength": 0.0-1.0,
    "density": 0.0-1.0,
    "cost": 0.0-1.0,
    "sustainabilityScore": 0.0-1.0,
    "temperatureRange": 0.0-1.0,
    "electricalConductivity": 0.0-1.0,
    "strengthWeight": 0.0-1.0,
    "costWeight": 0.0-1.0,
    "sustainabilityWeight": 0.0-1.0,
    "availabilityWeight": 0.0-1.0,
    "applicationSimilarity": 0.0-1.0
  },
  "bias": -1.0 to 1.0,
  "confidence": 0.0-1.0,
  "insights": ["insight1", "insight2", "insight3"]
}

Focus on features that correlate most strongly with positive user feedback.
`;

      const response = await spark.llm(prompt, 'gpt-4o', true);
      const modelWeights = JSON.parse(response);

      await spark.kv.set(this.MODEL_WEIGHTS_KEY, modelWeights);

      // Calculate and store model performance
      const performance = await this.evaluateModelPerformance(trainingData, modelWeights);
      await spark.kv.set(this.MODEL_PERFORMANCE_KEY, performance);

      console.log('Model retrained successfully. Performance:', performance);
    } catch (error) {
      console.error('Failed to retrain model:', error);
    }
  }

  /**
   * Evaluate model performance on training data
   */
  private static async evaluateModelPerformance(
    trainingData: TrainingData[],
    modelWeights: any
  ): Promise<ModelPerformance> {
    let correctPredictions = 0;
    let totalPredictions = trainingData.length;

    for (const example of trainingData) {
      const prediction = this.predictScore(example.features, modelWeights);
      const isCorrect = Math.abs(prediction - example.target) < 0.3; // 30% tolerance
      if (isCorrect) correctPredictions++;
    }

    const accuracy = correctPredictions / totalPredictions;

    return {
      accuracy,
      precision: accuracy, // Simplified for demo
      recall: accuracy,
      f1Score: accuracy,
      trainingSize: totalPredictions,
      lastTrainingDate: Date.now(),
      modelVersion: '1.0'
    };
  }

  /**
   * Predict user satisfaction score using trained model
   */
  private static predictScore(features: TrainingData['features'], modelWeights: any): number {
    const weights = modelWeights.weights;
    const bias = modelWeights.bias || 0;

    let score = bias;
    for (const [key, value] of Object.entries(features)) {
      score += (value as number) * (weights[key] || 0);
    }

    // Apply sigmoid activation to keep score between 0 and 1
    return 1 / (1 + Math.exp(-score));
  }

  /**
   * Generate ML-enhanced recommendations with explanations
   */
  static async generateMLRecommendations(
    materials: Material[],
    requirements: MaterialRequirements,
    applicationContext?: string
  ): Promise<{ scores: MaterialScore[], explanations: Record<string, RecommendationExplanation> }> {
    try {
      const modelWeights = await spark.kv.get(this.MODEL_WEIGHTS_KEY);
      
      if (!modelWeights) {
        // Fall back to basic AI recommendations if no trained model
        console.log('No trained model available, using basic AI recommendations');
        return { scores: [], explanations: {} };
      }

      const scores: MaterialScore[] = [];
      const explanations: Record<string, RecommendationExplanation> = {};

      for (const material of materials) {
        const features = this.extractFeatures(material, requirements, applicationContext);
        const mlScore = this.predictScore(features, modelWeights);
        
        // Combine ML score with rule-based scoring
        const ruleBasedScore = this.calculateRuleBasedScore(material, requirements);
        const combinedScore = (mlScore * 0.7 + ruleBasedScore * 0.3) * 100;

        const score: MaterialScore = {
          materialId: material.id,
          overallScore: Math.round(Math.max(0, Math.min(100, combinedScore))),
          propertiesScore: Math.round(features.tensileStrength * 100),
          costScore: Math.round((1 - features.cost) * 100),
          sustainabilityScore: Math.round(features.sustainabilityScore * 100),
          availabilityScore: 75, // Simplified
          reasoning: `ML-enhanced recommendation based on user feedback patterns. Confidence: ${Math.round(mlScore * 100)}%`
        };

        const explanation: RecommendationExplanation = {
          modelConfidence: mlScore,
          keyFactors: this.getKeyFactors(features, modelWeights),
          similarSuccessfulRecommendations: await this.countSimilarSuccesses(material.id),
          uncertainty: Math.abs(0.5 - mlScore) * 2 // Higher when score is near 0.5
        };

        scores.push(score);
        explanations[material.id] = explanation;
      }

      return {
        scores: scores.sort((a, b) => b.overallScore - a.overallScore),
        explanations
      };
    } catch (error) {
      console.error('Failed to generate ML recommendations:', error);
      return { scores: [], explanations: {} };
    }
  }

  /**
   * Get key factors that influenced the ML recommendation
   */
  private static getKeyFactors(
    features: TrainingData['features'], 
    modelWeights: any
  ): RecommendationExplanation['keyFactors'] {
    const weights = modelWeights.weights;
    const factors = [];

    for (const [feature, weight] of Object.entries(weights)) {
      const featureValue = features[feature as keyof typeof features];
      const importance = Math.abs(weight as number * featureValue);
      
      if (importance > 0.1) { // Only include significant factors
        factors.push({
          factor: this.getFeatureDisplayName(feature),
          importance,
          positive: (weight as number) > 0
        });
      }
    }

    return factors
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5); // Top 5 factors
  }

  /**
   * Convert feature names to user-friendly display names
   */
  private static getFeatureDisplayName(feature: string): string {
    const displayNames: Record<string, string> = {
      tensileStrength: 'Tensile Strength',
      density: 'Material Density',
      cost: 'Cost Efficiency',
      sustainabilityScore: 'Sustainability',
      temperatureRange: 'Temperature Range',
      electricalConductivity: 'Electrical Properties',
      applicationSimilarity: 'Application Match'
    };
    return displayNames[feature] || feature;
  }

  /**
   * Count similar successful recommendations
   */
  private static async countSimilarSuccesses(materialId: string): Promise<number> {
    try {
      const feedback = await spark.kv.get<UserFeedback[]>(this.FEEDBACK_KEY) || [];
      return feedback.filter(f => 
        f.materialId === materialId && 
        (f.feedbackType === 'selection' && f.selected) ||
        (f.feedbackType === 'rating' && (f.rating || 0) >= 4)
      ).length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Calculate basic rule-based score for fallback
   */
  private static calculateRuleBasedScore(material: Material, requirements: MaterialRequirements): number {
    let score = 0.5; // Base score

    // Property matching
    if (requirements.tensileStrength) {
      const { min = 0, max = Infinity } = requirements.tensileStrength;
      if (material.properties.tensileStrength >= min && material.properties.tensileStrength <= max) {
        score += 0.2;
      }
    }

    // Cost effectiveness
    if (requirements.budget) {
      const { max = Infinity } = requirements.budget;
      if (material.cost.pricePerKg <= max) {
        score += 0.2;
      }
    }

    // Sustainability bonus
    if (requirements.sustainabilityPriority && material.sustainability.sustainabilityScore > 70) {
      score += 0.1;
    }

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Get model performance metrics
   */
  static async getModelPerformance(): Promise<ModelPerformance | null> {
    try {
      return await spark.kv.get<ModelPerformance>(this.MODEL_PERFORMANCE_KEY);
    } catch (error) {
      console.error('Failed to get model performance:', error);
      return null;
    }
  }

  /**
   * Get training data statistics
   */
  static async getTrainingStats(): Promise<{
    totalFeedback: number;
    trainingExamples: number;
    lastTraining: number | null;
    feedbackTypes: Record<string, number>;
  }> {
    try {
      const feedback = await spark.kv.get<UserFeedback[]>(this.FEEDBACK_KEY) || [];
      const trainingData = await spark.kv.get<TrainingData[]>(this.TRAINING_DATA_KEY) || [];
      const performance = await spark.kv.get<ModelPerformance>(this.MODEL_PERFORMANCE_KEY);

      const feedbackTypes = feedback.reduce((acc, f) => {
        acc[f.feedbackType] = (acc[f.feedbackType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalFeedback: feedback.length,
        trainingExamples: trainingData.length,
        lastTraining: performance?.lastTrainingDate || null,
        feedbackTypes
      };
    } catch (error) {
      console.error('Failed to get training stats:', error);
      return {
        totalFeedback: 0,
        trainingExamples: 0,
        lastTraining: null,
        feedbackTypes: {}
      };
    }
  }

  /**
   * Helper method to get material by ID
   */
  private static async getMaterialById(materialId: string): Promise<Material | null> {
    // Import materials database dynamically to avoid circular dependencies
    try {
      const { materialsDatabase } = await import('@/data/materials');
      return materialsDatabase.find(m => m.id === materialId) || null;
    } catch (error) {
      console.error('Failed to load materials database:', error);
      return null;
    }
  }

  /**
   * Clear all training data (for development/testing)
   */
  static async clearTrainingData(): Promise<void> {
    await spark.kv.delete(this.FEEDBACK_KEY);
    await spark.kv.delete(this.TRAINING_DATA_KEY);
    await spark.kv.delete(this.MODEL_PERFORMANCE_KEY);
    await spark.kv.delete(this.MODEL_WEIGHTS_KEY);
    console.log('All training data cleared');
  }
}