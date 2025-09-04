import { Material } from '@/types/materials';
import { getSuppliersByRegion } from './regionalSuppliers';

/**
 * Creates region-specific material databases by combining base materials with regional suppliers
 */

/**
 * Base materials with global properties but no suppliers (suppliers added by region)
 */
const baseMaterials: Omit<Material, 'suppliers'>[] = [
  // Steel Materials
  {
    id: 'steel-carbon-1018',
    name: 'Carbon Steel 1018',
    category: 'Metal',
    type: 'Steel',
    subtype: 'Carbon Steel',
    properties: {
      tensileStrength: 440,
      yieldStrength: 370,
      elongation: 15,
      hardness: 126,
      density: 7.87,
      elasticModulus: 200,
      thermalConductivity: 51.9,
      thermalExpansion: 11.7,
      meltingPoint: 1515,
      operatingTempMin: -40,
      operatingTempMax: 400,
      electricalConductivity: 6.99,
      electricalResistivity: 143,
      magneticPermeability: 100,
      corrosionResistance: 2
    },
    cost: {
      pricePerKg: 0.85,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'High'
    },
    sustainability: {
      recyclability: 95,
      carbonFootprint: 2.1,
      sustainabilityScore: 78,
      recycledContent: 85,
      eolRecyclability: 95,
      renewableEnergy: 35
    },
    applications: ['Automotive components', 'Construction', 'Machinery parts', 'General fabrication'],
    advantages: ['Low cost', 'Good machinability', 'Weldable', 'Widely available'],
    disadvantages: ['Limited corrosion resistance', 'Lower strength than alloy steels']
  },
  
  {
    id: 'steel-stainless-316l',
    name: 'Stainless Steel 316L',
    category: 'Metal',
    type: 'Steel',
    subtype: 'Stainless Steel',
    properties: {
      tensileStrength: 580,
      yieldStrength: 290,
      elongation: 50,
      hardness: 217,
      density: 8.0,
      elasticModulus: 200,
      thermalConductivity: 16.3,
      thermalExpansion: 15.9,
      meltingPoint: 1400,
      operatingTempMin: -269,
      operatingTempMax: 925,
      electricalConductivity: 1.45,
      electricalResistivity: 690,
      magneticPermeability: 1.02,
      corrosionResistance: 9
    },
    cost: {
      pricePerKg: 4.50,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'High'
    },
    sustainability: {
      recyclability: 90,
      carbonFootprint: 6.15,
      sustainabilityScore: 82,
      recycledContent: 60,
      eolRecyclability: 90,
      renewableEnergy: 25
    },
    applications: ['Medical devices', 'Food processing', 'Marine equipment', 'Chemical plants'],
    advantages: ['Excellent corrosion resistance', 'Biocompatible', 'High temperature resistance'],
    disadvantages: ['Higher cost', 'Lower thermal conductivity', 'Work hardening']
  },

  // Aluminum Materials
  {
    id: 'aluminum-6061-t6',
    name: 'Aluminum 6061-T6',
    category: 'Metal',
    type: 'Aluminum',
    subtype: 'Heat Treatable',
    properties: {
      tensileStrength: 310,
      yieldStrength: 276,
      elongation: 12,
      hardness: 95,
      density: 2.70,
      elasticModulus: 68.9,
      thermalConductivity: 167,
      thermalExpansion: 23.6,
      meltingPoint: 582,
      operatingTempMin: -80,
      operatingTempMax: 200,
      electricalConductivity: 24.59,
      electricalResistivity: 40.6,
      magneticPermeability: 1.0,
      corrosionResistance: 7
    },
    cost: {
      pricePerKg: 1.85,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'High'
    },
    sustainability: {
      recyclability: 95,
      carbonFootprint: 11.46,
      sustainabilityScore: 85,
      recycledContent: 75,
      eolRecyclability: 95,
      renewableEnergy: 60
    },
    applications: ['Aerospace', 'Automotive', 'Marine', 'Structural components'],
    advantages: ['Light weight', 'Good strength-to-weight ratio', 'Corrosion resistant', 'Weldable'],
    disadvantages: ['Lower strength than steel', 'Higher cost than steel', 'Galvanic corrosion risk']
  },

  {
    id: 'aluminum-7075-t6',
    name: 'Aluminum 7075-T6',
    category: 'Metal',
    type: 'Aluminum',
    subtype: 'High Strength',
    properties: {
      tensileStrength: 572,
      yieldStrength: 503,
      elongation: 11,
      hardness: 150,
      density: 2.81,
      elasticModulus: 71.7,
      thermalConductivity: 130,
      thermalExpansion: 23.2,
      meltingPoint: 477,
      operatingTempMin: -80,
      operatingTempMax: 175,
      electricalConductivity: 18.85,
      electricalResistivity: 53,
      magneticPermeability: 1.0,
      corrosionResistance: 5
    },
    cost: {
      pricePerKg: 3.20,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'Medium'
    },
    sustainability: {
      recyclability: 95,
      carbonFootprint: 11.46,
      sustainabilityScore: 80,
      recycledContent: 65,
      eolRecyclability: 95,
      renewableEnergy: 60
    },
    applications: ['Aerospace structures', 'High-stress components', 'Military equipment'],
    advantages: ['Very high strength', 'Excellent fatigue resistance', 'Good machinability'],
    disadvantages: ['Poor corrosion resistance', 'Not weldable', 'Higher cost']
  },

  // Plastic Materials
  {
    id: 'plastic-abs',
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    category: 'Polymer',
    type: 'Thermoplastic',
    subtype: 'Engineering Plastic',
    properties: {
      tensileStrength: 45,
      yieldStrength: 41,
      elongation: 25,
      hardness: 108,
      density: 1.05,
      elasticModulus: 2.3,
      thermalConductivity: 0.17,
      thermalExpansion: 85,
      meltingPoint: 105,
      operatingTempMin: -40,
      operatingTempMax: 80,
      electricalConductivity: 0.000001,
      electricalResistivity: 1000000000000,
      dielectricStrength: 15.7,
      corrosionResistance: 8
    },
    cost: {
      pricePerKg: 2.10,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'High'
    },
    sustainability: {
      recyclability: 80,
      carbonFootprint: 3.2,
      sustainabilityScore: 65,
      recycledContent: 20,
      eolRecyclability: 75,
      renewableEnergy: 15
    },
    applications: ['Consumer electronics', 'Automotive trim', 'Toys', 'Appliance housings'],
    advantages: ['Good impact strength', 'Excellent surface finish', 'Easy to process'],
    disadvantages: ['UV sensitive', 'Limited chemical resistance', 'Not biodegradable']
  },

  {
    id: 'plastic-peek',
    name: 'PEEK (Polyetheretherketone)',
    category: 'Polymer',
    type: 'Thermoplastic',
    subtype: 'High Performance',
    properties: {
      tensileStrength: 100,
      yieldStrength: 92,
      elongation: 50,
      hardness: 99,
      density: 1.32,
      elasticModulus: 3.6,
      thermalConductivity: 0.25,
      thermalExpansion: 47,
      meltingPoint: 343,
      operatingTempMin: -60,
      operatingTempMax: 250,
      electricalConductivity: 0.0000001,
      electricalResistivity: 10000000000000,
      dielectricStrength: 23,
      corrosionResistance: 9
    },
    cost: {
      pricePerKg: 85.00,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'Medium'
    },
    sustainability: {
      recyclability: 85,
      carbonFootprint: 14.5,
      sustainabilityScore: 72,
      recycledContent: 10,
      eolRecyclability: 80,
      renewableEnergy: 20
    },
    applications: ['Aerospace', 'Medical implants', 'Oil & gas', 'Semiconductor equipment'],
    advantages: ['Excellent chemical resistance', 'High temperature capability', 'Biocompatible'],
    disadvantages: ['Very high cost', 'Difficult to process', 'Limited availability']
  },

  // Ceramic Materials
  {
    id: 'ceramic-alumina-99',
    name: 'Alumina (Al2O3) 99%',
    category: 'Ceramic',
    type: 'Oxide Ceramic',
    subtype: 'Technical Ceramic',
    properties: {
      tensileStrength: 300,
      yieldStrength: 300,
      elongation: 0,
      hardness: 1440,
      density: 3.95,
      elasticModulus: 380,
      thermalConductivity: 30,
      thermalExpansion: 8.1,
      meltingPoint: 2054,
      operatingTempMin: -200,
      operatingTempMax: 1700,
      electricalConductivity: 0.00000000001,
      electricalResistivity: 100000000000000,
      dielectricStrength: 10,
      corrosionResistance: 9
    },
    cost: {
      pricePerKg: 12.50,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'Medium'
    },
    sustainability: {
      recyclability: 60,
      carbonFootprint: 8.2,
      sustainabilityScore: 68,
      recycledContent: 5,
      eolRecyclability: 55,
      renewableEnergy: 30
    },
    applications: ['Electronic substrates', 'Cutting tools', 'Wear parts', 'High-temp insulators'],
    advantages: ['Excellent hardness', 'High temperature resistance', 'Electrical insulation'],
    disadvantages: ['Brittle', 'Difficult to machine', 'Thermal shock sensitivity']
  },

  {
    id: 'ceramic-silicon-carbide',
    name: 'Silicon Carbide (SiC)',
    category: 'Ceramic',
    type: 'Non-oxide Ceramic',
    subtype: 'Advanced Ceramic',
    properties: {
      tensileStrength: 550,
      yieldStrength: 550,
      elongation: 0,
      hardness: 2500,
      density: 3.21,
      elasticModulus: 410,
      thermalConductivity: 120,
      thermalExpansion: 4.0,
      meltingPoint: 2730,
      operatingTempMin: -200,
      operatingTempMax: 1600,
      electricalConductivity: 0.001,
      electricalResistivity: 1000,
      dielectricStrength: 4,
      corrosionResistance: 9
    },
    cost: {
      pricePerKg: 25.00,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'Low'
    },
    sustainability: {
      recyclability: 70,
      carbonFootprint: 12.8,
      sustainabilityScore: 70,
      recycledContent: 15,
      eolRecyclability: 65,
      renewableEnergy: 25
    },
    applications: ['Semiconductor devices', 'Armor systems', 'Pump seals', 'Heat exchangers'],
    advantages: ['Extreme hardness', 'Excellent thermal conductivity', 'Chemical inertness'],
    disadvantages: ['Very high cost', 'Brittle fracture', 'Difficult processing']
  },

  // Composite Materials
  {
    id: 'composite-carbon-fiber-epoxy',
    name: 'Carbon Fiber/Epoxy Composite',
    category: 'Composite',
    type: 'Fiber Reinforced',
    subtype: 'Polymer Matrix',
    properties: {
      tensileStrength: 1500,
      yieldStrength: 1500,
      elongation: 1.2,
      hardness: 68,
      density: 1.55,
      elasticModulus: 135,
      thermalConductivity: 7.0,
      thermalExpansion: 0.5,
      meltingPoint: 350,
      operatingTempMin: -100,
      operatingTempMax: 150,
      electricalConductivity: 25000,
      electricalResistivity: 0.00004,
      corrosionResistance: 8
    },
    cost: {
      pricePerKg: 45.00,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'Medium'
    },
    sustainability: {
      recyclability: 30,
      carbonFootprint: 42.8,
      sustainabilityScore: 45,
      recycledContent: 5,
      eolRecyclability: 25,
      renewableEnergy: 15
    },
    applications: ['Aerospace structures', 'Racing cars', 'Sports equipment', 'Wind turbine blades'],
    advantages: ['Extremely high strength-to-weight', 'Stiff', 'Fatigue resistant'],
    disadvantages: ['Very expensive', 'Difficult to recycle', 'Brittle failure mode']
  },

  {
    id: 'composite-glass-fiber-polyester',
    name: 'Glass Fiber/Polyester Composite',
    category: 'Composite',
    type: 'Fiber Reinforced',
    subtype: 'Polymer Matrix',
    properties: {
      tensileStrength: 240,
      yieldStrength: 240,
      elongation: 2.5,
      hardness: 40,
      density: 1.80,
      elasticModulus: 23,
      thermalConductivity: 0.35,
      thermalExpansion: 25,
      meltingPoint: 250,
      operatingTempMin: -40,
      operatingTempMax: 120,
      electricalConductivity: 0.000001,
      electricalResistivity: 1000000000000,
      dielectricStrength: 20,
      corrosionResistance: 7
    },
    cost: {
      pricePerKg: 3.50,
      currency: 'USD',
      priceDate: '2024-01-15',
      availability: 'High'
    },
    sustainability: {
      recyclability: 40,
      carbonFootprint: 8.5,
      sustainabilityScore: 55,
      recycledContent: 10,
      eolRecyclability: 35,
      renewableEnergy: 20
    },
    applications: ['Boat hulls', 'Automotive panels', 'Storage tanks', 'Construction panels'],
    advantages: ['Good strength-to-weight', 'Corrosion resistant', 'Cost effective'],
    disadvantages: ['Limited temperature range', 'UV degradation', 'Recycling challenges']
  }
];

/**
 * Create region-specific material database
 */
export const createRegionalMaterialDatabase = (region: string): Material[] => {
  const regionalSuppliers = getSuppliersByRegion(region);
  
  return baseMaterials.map(baseMaterial => {
    // Filter suppliers that can supply this material type
    const compatibleSuppliers = regionalSuppliers.filter(supplier => {
      const materialType = baseMaterial.type.toLowerCase();
      const specialties = supplier.specialties.join(' ').toLowerCase();
      
      // Check if supplier specializes in this material type
      if (materialType.includes('steel') && specialties.includes('steel')) return true;
      if (materialType.includes('aluminum') && specialties.includes('aluminum')) return true;
      if (materialType.includes('plastic') || materialType.includes('thermoplastic')) {
        return specialties.includes('plastic') || specialties.includes('polymer');
      }
      if (materialType.includes('ceramic') && specialties.includes('ceramic')) return true;
      if (materialType.includes('composite') && 
          (specialties.includes('composite') || specialties.includes('carbon fiber'))) return true;
      
      // Default to including supplier if no specific match (global suppliers)
      return supplier.region.toLowerCase() === 'global';
    });

    // Adjust pricing based on region
    let regionalPriceMultiplier = 1.0;
    switch (region.toLowerCase()) {
      case 'north america':
        regionalPriceMultiplier = 1.0; // Base pricing
        break;
      case 'europe':
        regionalPriceMultiplier = 1.15; // 15% higher due to regulations
        break;
      case 'asia':
        regionalPriceMultiplier = 0.85; // 15% lower due to manufacturing costs
        break;
      case 'oceania':
        regionalPriceMultiplier = 1.25; // 25% higher due to import costs
        break;
      case 'south america':
        regionalPriceMultiplier = 0.90; // 10% lower
        break;
      case 'africa':
        regionalPriceMultiplier = 1.10; // 10% higher due to logistics
        break;
      default:
        regionalPriceMultiplier = 1.0;
    }

    return {
      ...baseMaterial,
      suppliers: compatibleSuppliers,
      cost: {
        ...baseMaterial.cost,
        pricePerKg: Math.round(baseMaterial.cost.pricePerKg * regionalPriceMultiplier * 100) / 100
      }
    } as Material;
  });
};

/**
 * Get material database for specific region
 */
export const getRegionalMaterialDatabase = (region: string = 'global'): Material[] => {
  return createRegionalMaterialDatabase(region);
};

/**
 * Get all materials across all regions (with global suppliers)
 */
export const getGlobalMaterialDatabase = (): Material[] => {
  return createRegionalMaterialDatabase('global');
};