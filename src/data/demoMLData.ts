import { UserFeedback, TrainingData } from '@/types/materials';

/**
 * Demo feedback data to showcase ML functionality
 * This provides initial training data so users can see the ML system in action
 */
export const demoFeedbackData: UserFeedback[] = [
  {
    id: 'demo_1',
    timestamp: Date.now() - 86400000 * 7, // 7 days ago
    sessionId: 'demo_session_1',
    materialId: 'steel_304',
    requirements: {
      tensileStrength: { min: 200 },
      budget: { max: 10 },
      sustainabilityPriority: false,
      applicationContext: 'automotive exhaust system'
    },
    feedbackType: 'rating',
    rating: 5,
    applicationContext: 'automotive exhaust system',
    comments: 'Perfect for high-temperature automotive applications'
  },
  {
    id: 'demo_2',
    timestamp: Date.now() - 86400000 * 6,
    sessionId: 'demo_session_2',
    materialId: 'aluminum_6061',
    requirements: {
      density: { max: 3 },
      budget: { max: 8 },
      applicationContext: 'lightweight aerospace component'
    },
    feedbackType: 'selection',
    selected: true,
    applicationContext: 'lightweight aerospace component',
    comments: 'Great strength-to-weight ratio for aerospace'
  },
  {
    id: 'demo_3',
    timestamp: Date.now() - 86400000 * 5,
    sessionId: 'demo_session_3',
    materialId: 'carbon_fiber',
    requirements: {
      tensileStrength: { min: 500 },
      sustainabilityPriority: false,
      applicationContext: 'racing bicycle frame'
    },
    feedbackType: 'rating',
    rating: 4,
    applicationContext: 'racing bicycle frame',
    comments: 'Excellent performance but expensive'
  },
  {
    id: 'demo_4',
    timestamp: Date.now() - 86400000 * 4,
    sessionId: 'demo_session_4',
    materialId: 'titanium_grade2',
    requirements: {
      operatingTemp: { min: -50, max: 400 },
      budget: { max: 50 },
      applicationContext: 'medical implant'
    },
    feedbackType: 'selection',
    selected: true,
    applicationContext: 'medical implant',
    comments: 'Biocompatible and corrosion resistant'
  },
  {
    id: 'demo_5',
    timestamp: Date.now() - 86400000 * 3,
    sessionId: 'demo_session_5',
    materialId: 'abs_plastic',
    requirements: {
      budget: { max: 3 },
      sustainabilityPriority: true,
      applicationContext: 'consumer electronics housing'
    },
    feedbackType: 'rating',
    rating: 3,
    applicationContext: 'consumer electronics housing',
    comments: 'Good for prototyping but sustainability concerns'
  },
  {
    id: 'demo_6',
    timestamp: Date.now() - 86400000 * 2,
    sessionId: 'demo_session_6',
    materialId: 'copper',
    requirements: {
      electricalConductivity: { min: 50 },
      applicationContext: 'electrical wiring'
    },
    feedbackType: 'selection',
    selected: true,
    applicationContext: 'electrical wiring',
    comments: 'Excellent electrical conductivity'
  },
  {
    id: 'demo_7',
    timestamp: Date.now() - 86400000 * 1,
    sessionId: 'demo_session_7',
    materialId: 'ceramic_alumina',
    requirements: {
      operatingTemp: { min: 800 },
      electricalType: 'insulator',
      applicationContext: 'high-temperature insulator'
    },
    feedbackType: 'rating',
    rating: 5,
    applicationContext: 'high-temperature insulator',
    comments: 'Perfect for high-temperature electrical insulation'
  },
  {
    id: 'demo_8',
    timestamp: Date.now() - 86400000 * 0.5,
    sessionId: 'demo_session_8',
    materialId: 'nylon_66',
    requirements: {
      budget: { max: 5 },
      sustainabilityPriority: true,
      applicationContext: 'mechanical gears'
    },
    feedbackType: 'rating',
    rating: 4,
    applicationContext: 'mechanical gears',
    comments: 'Good wear resistance and reasonable cost'
  }
];

/**
 * Demo model weights that represent a trained ML model
 */
export const demoModelWeights = {
  weights: {
    tensileStrength: 0.25,
    density: 0.15,
    cost: 0.20,
    sustainabilityScore: 0.10,
    temperatureRange: 0.15,
    electricalConductivity: 0.12,
    strengthWeight: 0.8,
    costWeight: 0.7,
    sustainabilityWeight: 0.6,
    availabilityWeight: 0.5,
    applicationSimilarity: 0.9
  },
  bias: 0.1,
  confidence: 0.75,
  insights: [
    'Users heavily prioritize application-specific material matches',
    'Cost considerations are important but secondary to performance',
    'Sustainability preferences vary significantly by application type'
  ]
};

/**
 * Initialize demo data for ML system
 */
export async function initializeDemoMLData(): Promise<void> {
  try {
    // Check if we already have real user data
    const existingFeedback = await spark.kv.get('user-feedback-data') || [];
    
    // Only initialize demo data if no real data exists
    if (existingFeedback.length === 0) {
      await spark.kv.set('user-feedback-data', demoFeedbackData);
      await spark.kv.set('model-weights', demoModelWeights);
      
      // Set demo model performance
      await spark.kv.set('model-performance', {
        accuracy: 0.82,
        precision: 0.80,
        recall: 0.85,
        f1Score: 0.82,
        trainingSize: demoFeedbackData.length,
        lastTrainingDate: Date.now() - 86400000, // 1 day ago
        modelVersion: '1.0-demo'
      });

      console.log('Demo ML data initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize demo ML data:', error);
  }
}