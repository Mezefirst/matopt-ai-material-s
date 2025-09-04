import { Material, MaterialRequirements, MaterialScore, ApplicationRecommendation, SmartRecommendation } from '../types/materials';

export class MaterialAIService {
  static async generateRecommendations(
    materials: Material[],
    requirements: MaterialRequirements
  ): Promise<MaterialScore[]> {
    const prompt = spark.llmPrompt`
You are an expert materials engineer. Analyze the following materials and requirements to provide scoring and recommendations.

Requirements:
${JSON.stringify(requirements, null, 2)}

Materials to evaluate:
${JSON.stringify(materials.map(m => ({
  id: m.id,
  name: m.name,
  category: m.category,
  properties: m.properties,
  cost: m.cost,
  sustainability: m.sustainability,
  suppliers: m.suppliers.map(s => ({ region: s.region, availability: s.availability }))
})), null, 2)}

For each material, provide a score object with:
1. overallScore (0-100): Weighted combination of all factors
2. propertiesScore (0-100): How well mechanical properties match requirements  
3. costScore (0-100): Cost effectiveness considering budget constraints
4. sustainabilityScore (0-100): Environmental impact assessment
5. availabilityScore (0-100): Supplier availability in required region
6. reasoning (string): 2-3 sentence explanation of the scoring

Consider these factors:
- Tensile strength requirements vs material properties
- Density preferences (lighter often better)
- Budget constraints vs material cost
- Regional supplier availability
- Sustainability priorities if specified
- Typical applications and performance trade-offs

Return a JSON array of MaterialScore objects, ordered by overallScore (highest first).
`;

    try {
      const response = await spark.llm(prompt, 'gpt-4o', true);
      const scores = JSON.parse(response) as MaterialScore[];
      
      // Validate and sort scores
      return scores
        .filter(score => score.materialId && typeof score.overallScore === 'number')
        .sort((a, b) => b.overallScore - a.overallScore);
    } catch (error) {
      console.error('AI recommendation error:', error);
      // Fallback to basic scoring
      return this.generateBasicScoring(materials, requirements);
    }
  }

  static async generateMaterialInsight(material: Material, context?: string): Promise<string> {
    const prompt = spark.llmPrompt`
As a materials expert, provide a concise insight about ${material.name} for product designers.

Material Details:
- Category: ${material.category}
- Tensile Strength: ${material.properties.tensileStrength} MPa
- Density: ${material.properties.density} g/cm³
- Cost: $${material.cost.pricePerKg}/kg
- Sustainability Score: ${material.sustainability.sustainabilityScore}/100
- Applications: ${material.applications.join(', ')}

${context ? `Context: ${context}` : ''}

Provide a 2-3 sentence insight focusing on:
1. Key advantages for product design
2. Most suitable applications
3. Important considerations or trade-offs

Be specific and actionable.
`;

    try {
      return await spark.llm(prompt, 'gpt-4o-mini');
    } catch (error) {
      console.error('AI insight error:', error);
      return `${material.name} offers ${material.properties.tensileStrength} MPa tensile strength with ${material.properties.density} g/cm³ density. Best suited for ${material.applications[0]} applications with ${material.sustainability.sustainabilityScore > 70 ? 'good' : 'moderate'} sustainability performance.`;
    }
  }

  static async compareTradeoffs(materials: Material[]): Promise<string> {
    if (materials.length < 2) return '';

    const prompt = spark.llmPrompt`
Compare these materials and highlight the key trade-offs for product designers:

${materials.map(m => `
${m.name}:
- Strength: ${m.properties.tensileStrength} MPa
- Weight: ${m.properties.density} g/cm³  
- Cost: $${m.cost.pricePerKg}/kg
- Sustainability: ${m.sustainability.sustainabilityScore}/100
- Lead Time: ${m.cost.leadTime} days
`).join('\n')}

Provide a concise analysis (3-4 sentences) highlighting:
1. Performance vs cost trade-offs
2. Weight vs strength considerations  
3. Sustainability vs performance trade-offs
4. Supply chain implications

Focus on decision-making insights for designers.
`;

    try {
      return await spark.llm(prompt, 'gpt-4o-mini');
    } catch (error) {
      console.error('AI trade-off analysis error:', error);
      return 'Multiple material options available with varying performance, cost, and sustainability characteristics. Consider your priority requirements when making the final selection.';
    }
  }

  static async generateApplicationRecommendations(
    applicationQuery: string,
    materials: Material[],
    requirements?: MaterialRequirements
  ): Promise<SmartRecommendation> {
    const prompt = spark.llmPrompt`
You are an expert materials engineer helping designers select materials for specific applications.

Application Query: "${applicationQuery}"

${requirements ? `Additional Requirements:
${JSON.stringify(requirements, null, 2)}` : ''}

Available Materials:
${JSON.stringify(materials.map(m => ({
  id: m.id,
  name: m.name,
  category: m.category,
  properties: m.properties,
  cost: m.cost,
  sustainability: m.sustainability,
  applications: m.applications,
  pros: m.pros,
  cons: m.cons
})), null, 2)}

Analyze the application requirements and provide recommendations. Consider:
1. Loading conditions (static, dynamic, impact, fatigue)
2. Environmental factors (temperature, chemicals, UV, moisture)
3. Design constraints (weight, size, cost, manufacturing)
4. Performance requirements (strength, stiffness, conductivity)
5. Lifecycle considerations (durability, maintenance, end-of-life)

Return a JSON object with:
{
  "query": "restated application query",
  "recommendedMaterials": [
    {
      "materialId": "material_id",
      "suitabilityScore": 0-100,
      "keyBenefits": ["benefit1", "benefit2", "benefit3"],
      "potentialConcerns": ["concern1", "concern2"],
      "designConsiderations": ["consideration1", "consideration2"],
      "alternativeOptions": ["alt1", "alt2"]
    }
  ],
  "reasoning": "overall explanation of recommendations",
  "considerations": ["important design factor1", "important design factor2"],
  "nextSteps": ["recommended next action1", "recommended next action2"]
}

Rank materials by suitability (highest first) and include top 3-5 options.
`;

    try {
      const response = await spark.llm(prompt, 'gpt-4o', true);
      const recommendation = JSON.parse(response) as SmartRecommendation;
      
      // Validate and ensure we have valid recommendations
      if (!recommendation.recommendedMaterials || recommendation.recommendedMaterials.length === 0) {
        throw new Error('No valid recommendations generated');
      }

      return recommendation;
    } catch (error) {
      console.error('AI application recommendation error:', error);
      
      // Fallback recommendation
      return {
        query: applicationQuery,
        recommendedMaterials: materials.slice(0, 3).map(material => ({
          materialId: material.id,
          suitabilityScore: 70,
          keyBenefits: [material.pros[0] || 'Good performance characteristics'],
          potentialConcerns: [material.cons[0] || 'Consider cost implications'],
          designConsiderations: ['Verify specifications match requirements'],
          alternativeOptions: []
        })),
        reasoning: 'Basic material analysis suggests these options based on general properties.',
        considerations: ['Verify material specifications', 'Consider manufacturing requirements'],
        nextSteps: ['Request material samples', 'Conduct detailed analysis']
      };
    }
  }

  static async generateQuickInsight(query: string): Promise<string> {
    const prompt = spark.llmPrompt`
You are a materials engineering consultant. Provide a quick, actionable insight for this query:

"${query}"

Respond in 2-3 sentences with practical advice about material selection considerations for this application. Focus on the most critical factors a designer should consider.

Be specific and avoid generic advice.
`;

    try {
      return await spark.llm(prompt, 'gpt-4o-mini');
    } catch (error) {
      console.error('AI quick insight error:', error);
      return 'Consider the primary loading conditions, environmental exposure, and manufacturing constraints when selecting materials for this application.';
    }
  }

  static async optimizeForApplication(
    materials: Material[],
    applicationContext: string,
    requirements: MaterialRequirements
  ): Promise<MaterialScore[]> {
    const prompt = spark.llmPrompt`
You are optimizing material selection for a specific application context.

Application: "${applicationContext}"

Requirements:
${JSON.stringify(requirements, null, 2)}

Materials to evaluate:
${JSON.stringify(materials.map(m => ({
  id: m.id,
  name: m.name,
  category: m.category,
  properties: m.properties,
  cost: m.cost,
  sustainability: m.sustainability,
  applications: m.applications
})), null, 2)}

Provide application-optimized scoring considering:

1. Application Fit (40%): How well the material suits this specific use case
2. Performance (25%): Mechanical and physical properties match
3. Reliability (20%): Durability and consistency for this application
4. Cost Effectiveness (10%): Value for this specific application
5. Implementation (5%): Ease of design, manufacturing, and maintenance

For each material, return a MaterialScore object with enhanced reasoning that explains the application-specific considerations.

Return JSON array ordered by overall score (highest first).
`;

    try {
      const response = await spark.llm(prompt, 'gpt-4o', true);
      const scores = JSON.parse(response) as MaterialScore[];
      
      return scores
        .filter(score => score.materialId && typeof score.overallScore === 'number')
        .sort((a, b) => b.overallScore - a.overallScore);
    } catch (error) {
      console.error('AI application optimization error:', error);
      return this.generateBasicScoring(materials, requirements);
    }
  }

  private static generateBasicScoring(
    materials: Material[],
    requirements: MaterialRequirements
  ): MaterialScore[] {
    return materials.map(material => {
      let propertiesScore = 50;
      let costScore = 50;
      let availabilityScore = 70;

      // Basic properties scoring
      if (requirements.tensileStrength) {
        const { min = 0, max = Infinity } = requirements.tensileStrength;
        const strength = material.properties.tensileStrength;
        if (strength >= min && strength <= max) {
          propertiesScore += 30;
        } else if (strength < min) {
          propertiesScore -= 20;
        }
      }

      // Basic cost scoring
      if (requirements.budget) {
        const { min = 0, max = Infinity } = requirements.budget;
        const cost = material.cost.pricePerKg;
        if (cost >= min && cost <= max) {
          costScore += 30;
        } else if (cost > max) {
          costScore -= 30;
        }
      }

      // Region availability
      if (requirements.region) {
        const hasRegionalSupplier = material.suppliers.some(
          s => s.region.toLowerCase().includes(requirements.region!.toLowerCase())
        );
        if (hasRegionalSupplier) availabilityScore += 20;
      }

      const sustainabilityScore = material.sustainability.sustainabilityScore;
      const overallScore = Math.round(
        (propertiesScore * 0.3 + costScore * 0.25 + sustainabilityScore * 0.25 + availabilityScore * 0.2)
      );

      return {
        materialId: material.id,
        overallScore: Math.max(0, Math.min(100, overallScore)),
        propertiesScore: Math.max(0, Math.min(100, propertiesScore)),
        costScore: Math.max(0, Math.min(100, costScore)),
        sustainabilityScore,
        availabilityScore: Math.max(0, Math.min(100, availabilityScore)),
        reasoning: `${material.name} scored ${overallScore}/100 based on properties match, cost effectiveness, and availability.`
      };
    }).sort((a, b) => b.overallScore - a.overallScore);
  }
}