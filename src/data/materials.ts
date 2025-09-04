import { Material } from '../types/materials';

export const materialsDatabase: Material[] = [
  {
    id: 'steel-304',
    name: '304 Stainless Steel',
    category: 'Stainless Steel',
    properties: {
      tensileStrength: 520,
      density: 8.0,
      elasticModulus: 200,
      thermalConductivity: 16.2,
      meltingPoint: 1400,
      hardness: 215,
      operatingTempMin: -196,
      operatingTempMax: 870,
      electricalConductivity: 1.35,
      electricalResistivity: 74
    },
    cost: {
      pricePerKg: 3.2,
      minimumOrder: 100,
      leadTime: 14
    },
    sustainability: {
      carbonFootprint: 6.15,
      recyclability: 95,
      renewableContent: 25,
      sustainabilityScore: 78
    },
    suppliers: [
      {
        id: 'supplier-1',
        name: 'MetalCorp Industries',
        region: 'North America',
        contact: 'sales@metalcorp.com',
        reliability: 92,
        availability: 'In Stock'
      },
      {
        id: 'supplier-2',
        name: 'Euro Steel Solutions',
        region: 'Europe',
        contact: 'orders@eurosteel.eu',
        reliability: 88,
        availability: 'In Stock'
      }
    ],
    description: 'Versatile austenitic stainless steel with excellent corrosion resistance and formability.',
    applications: ['Food processing', 'Chemical equipment', 'Architecture', 'Medical devices'],
    pros: ['Excellent corrosion resistance', 'Good weldability', 'Non-magnetic', 'Food-safe'],
    cons: ['Lower strength than precipitation hardening grades', 'Susceptible to chloride stress corrosion', 'Higher cost than carbon steel']
  },
  {
    id: 'aluminum-6061',
    name: 'Aluminum 6061-T6',
    category: 'Aluminum Alloy',
    properties: {
      tensileStrength: 310,
      density: 2.7,
      elasticModulus: 69,
      thermalConductivity: 167,
      meltingPoint: 652,
      hardness: 95,
      operatingTempMin: -200,
      operatingTempMax: 400,
      electricalConductivity: 37.7,
      electricalResistivity: 2.65
    },
    cost: {
      pricePerKg: 2.1,
      minimumOrder: 50,
      leadTime: 7
    },
    sustainability: {
      carbonFootprint: 11.5,
      recyclability: 90,
      renewableContent: 35,
      sustainabilityScore: 72
    },
    suppliers: [
      {
        id: 'supplier-3',
        name: 'Aluminum Specialists Inc',
        region: 'North America',
        contact: 'info@aluminumspec.com',
        reliability: 95,
        availability: 'In Stock'
      },
      {
        id: 'supplier-4',
        name: 'Pacific Metals',
        region: 'Asia Pacific',
        contact: 'sales@pacificmetals.com',
        reliability: 87,
        availability: 'Limited'
      }
    ],
    description: 'Heat-treatable aluminum alloy with good strength-to-weight ratio and excellent machinability.',
    applications: ['Aerospace', 'Automotive', 'Marine', 'Structural components'],
    pros: ['Lightweight', 'Good corrosion resistance', 'Excellent machinability', 'Weldable'],
    cons: ['Lower strength than steel', 'Expensive compared to carbon steel', 'Galvanic corrosion risk']
  },
  {
    id: 'titanium-ti6al4v',
    name: 'Titanium Ti-6Al-4V',
    category: 'Titanium Alloy',
    properties: {
      tensileStrength: 950,
      density: 4.43,
      elasticModulus: 114,
      thermalConductivity: 6.7,
      meltingPoint: 1660,
      hardness: 334,
      operatingTempMin: -253,
      operatingTempMax: 600,
      electricalConductivity: 0.6,
      electricalResistivity: 170
    },
    cost: {
      pricePerKg: 35.0,
      minimumOrder: 25,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 23.2,
      recyclability: 85,
      renewableContent: 15,
      sustainabilityScore: 65
    },
    suppliers: [
      {
        id: 'supplier-5',
        name: 'Aerospace Materials Co',
        region: 'North America',
        contact: 'aerospace@amc.com',
        reliability: 96,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-6',
        name: 'Titanium Europe',
        region: 'Europe',
        contact: 'sales@titaniumeu.com',
        reliability: 91,
        availability: 'Limited'
      }
    ],
    description: 'Premium aerospace-grade titanium alloy with exceptional strength-to-weight ratio and biocompatibility.',
    applications: ['Aerospace', 'Medical implants', 'High-performance automotive', 'Chemical processing'],
    pros: ['Excellent strength-to-weight ratio', 'Biocompatible', 'Corrosion resistant', 'High-temperature stability'],
    cons: ['Very expensive', 'Difficult to machine', 'Limited suppliers', 'Long lead times']
  },
  {
    id: 'carbon-fiber-cfrp',
    name: 'Carbon Fiber Reinforced Polymer',
    category: 'Composite',
    properties: {
      tensileStrength: 3500,
      density: 1.6,
      elasticModulus: 230,
      thermalConductivity: 7.0,
      meltingPoint: 0, // Degrades rather than melts
      hardness: 150,
      operatingTempMin: -100,
      operatingTempMax: 200,
      electricalConductivity: 0.61,
      electricalResistivity: 164
    },
    cost: {
      pricePerKg: 25.0,
      minimumOrder: 10,
      leadTime: 14
    },
    sustainability: {
      carbonFootprint: 31.1,
      recyclability: 35,
      renewableContent: 5,
      sustainabilityScore: 42
    },
    suppliers: [
      {
        id: 'supplier-7',
        name: 'Advanced Composites Inc',
        region: 'North America',
        contact: 'composites@aci.com',
        reliability: 89,
        availability: 'In Stock'
      },
      {
        id: 'supplier-8',
        name: 'Carbon Solutions Asia',
        region: 'Asia Pacific',
        contact: 'orders@carbonsolutions.com',
        reliability: 84,
        availability: 'In Stock'
      }
    ],
    description: 'Ultra-lightweight composite material with exceptional strength and stiffness properties.',
    applications: ['Aerospace', 'Formula 1', 'Sporting goods', 'Wind turbines'],
    pros: ['Highest strength-to-weight ratio', 'Excellent fatigue resistance', 'Corrosion immune', 'Design flexibility'],
    cons: ['Very expensive', 'Poor impact resistance', 'Limited recyclability', 'UV degradation']
  },
  {
    id: 'copper-c101',
    name: 'Oxygen-Free Copper C101',
    category: 'Copper Alloy',
    properties: {
      tensileStrength: 220,
      density: 8.96,
      elasticModulus: 117,
      thermalConductivity: 401,
      meltingPoint: 1085,
      hardness: 45,
      operatingTempMin: -200,
      operatingTempMax: 250,
      electricalConductivity: 59.6,
      electricalResistivity: 1.68
    },
    cost: {
      pricePerKg: 8.5,
      minimumOrder: 100,
      leadTime: 10
    },
    sustainability: {
      carbonFootprint: 4.2,
      recyclability: 99,
      renewableContent: 45,
      sustainabilityScore: 85
    },
    suppliers: [
      {
        id: 'supplier-9',
        name: 'Pure Copper Industries',
        region: 'North America',
        contact: 'info@purecopper.com',
        reliability: 94,
        availability: 'In Stock'
      },
      {
        id: 'supplier-10',
        name: 'European Copper Co',
        region: 'Europe',
        contact: 'sales@eurocopper.eu',
        reliability: 90,
        availability: 'In Stock'
      }
    ],
    description: 'High-purity copper with excellent electrical and thermal conductivity properties.',
    applications: ['Electrical wiring', 'Heat exchangers', 'Electronics', 'Power transmission'],
    pros: ['Excellent electrical conductivity', 'Superior thermal conductivity', 'Highly recyclable', 'Antimicrobial'],
    cons: ['Expensive', 'Prone to oxidation', 'Soft and easily damaged', 'Heavy']
  },
  {
    id: 'alumina-ceramic',
    name: 'Alumina Ceramic (Al2O3)',
    category: 'Ceramic',
    properties: {
      tensileStrength: 300,
      density: 3.95,
      elasticModulus: 370,
      thermalConductivity: 25,
      meltingPoint: 2072,
      hardness: 1440,
      operatingTempMin: -200,
      operatingTempMax: 1700,
      electricalConductivity: 0.000001,
      electricalResistivity: 1000000000000,
      dielectricStrength: 15
    },
    cost: {
      pricePerKg: 4.5,
      minimumOrder: 50,
      leadTime: 28
    },
    sustainability: {
      carbonFootprint: 8.7,
      recyclability: 60,
      renewableContent: 10,
      sustainabilityScore: 68
    },
    suppliers: [
      {
        id: 'supplier-11',
        name: 'Advanced Ceramics Ltd',
        region: 'Europe',
        contact: 'ceramics@acl.com',
        reliability: 88,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-12',
        name: 'Precision Ceramics Asia',
        region: 'Asia Pacific',
        contact: 'orders@precisionceramics.com',
        reliability: 85,
        availability: 'Made to Order'
      }
    ],
    description: 'High-performance ceramic with excellent electrical insulation and high-temperature resistance.',
    applications: ['Electronic substrates', 'High-temperature insulators', 'Cutting tools', 'Medical implants'],
    pros: ['Excellent electrical insulation', 'High-temperature stability', 'Wear resistant', 'Chemically inert'],
    cons: ['Brittle failure mode', 'Difficult to machine', 'Long lead times', 'Thermal shock sensitivity']
  },
  {
    id: 'silicon-carbide',
    name: 'Silicon Carbide (SiC)',
    category: 'Ceramic',
    properties: {
      tensileStrength: 550,
      density: 3.21,
      elasticModulus: 410,
      thermalConductivity: 120,
      meltingPoint: 2730,
      hardness: 2800,
      operatingTempMin: -200,
      operatingTempMax: 1600,
      electricalConductivity: 0.1,
      electricalResistivity: 1000,
      dielectricStrength: 5
    },
    cost: {
      pricePerKg: 12.0,
      minimumOrder: 25,
      leadTime: 35
    },
    sustainability: {
      carbonFootprint: 15.3,
      recyclability: 45,
      renewableContent: 5,
      sustainabilityScore: 58
    },
    suppliers: [
      {
        id: 'supplier-13',
        name: 'SiC Technologies',
        region: 'North America',
        contact: 'sic@sictech.com',
        reliability: 91,
        availability: 'Made to Order'
      }
    ],
    description: 'Ultra-hard ceramic with exceptional thermal conductivity and semiconductor properties.',
    applications: ['Power electronics', 'Abrasives', 'Armor', 'High-temperature applications'],
    pros: ['Extremely hard', 'High thermal conductivity', 'Semiconductor properties', 'Chemical resistance'],
    cons: ['Very expensive', 'Brittle', 'Difficult processing', 'Limited suppliers']
  },
  {
    id: 'peek-polymer',
    name: 'PEEK (Polyetheretherketone)',
    category: 'Polymer',
    properties: {
      tensileStrength: 90,
      density: 1.32,
      elasticModulus: 3.6,
      thermalConductivity: 0.25,
      meltingPoint: 343,
      hardness: 25,
      operatingTempMin: -50,
      operatingTempMax: 260,
      electricalConductivity: 0.00000001,
      electricalResistivity: 100000000000000,
      dielectricStrength: 23
    },
    cost: {
      pricePerKg: 65.0,
      minimumOrder: 25,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 28.5,
      recyclability: 80,
      renewableContent: 0,
      sustainabilityScore: 52
    },
    suppliers: [
      {
        id: 'supplier-14',
        name: 'High Performance Polymers',
        region: 'Europe',
        contact: 'peek@hpp.com',
        reliability: 93,
        availability: 'In Stock'
      }
    ],
    description: 'High-performance thermoplastic with excellent chemical resistance and biocompatibility.',
    applications: ['Medical devices', 'Aerospace', 'Oil & gas', 'Electronics'],
    pros: ['Chemical resistance', 'Biocompatible', 'High-temperature stability', 'Lightweight'],
    cons: ['Very expensive', 'Difficult to process', 'Limited design freedom', 'UV sensitivity']
  },
  {
    id: 'glass-fiber-gfrp',
    name: 'Glass Fiber Reinforced Polymer',
    category: 'Composite',
    properties: {
      tensileStrength: 800,
      density: 1.8,
      elasticModulus: 35,
      thermalConductivity: 0.3,
      meltingPoint: 0, // Degrades rather than melts
      hardness: 80,
      operatingTempMin: -40,
      operatingTempMax: 150,
      electricalConductivity: 0.00001,
      electricalResistivity: 10000000000,
      dielectricStrength: 20
    },
    cost: {
      pricePerKg: 3.5,
      minimumOrder: 50,
      leadTime: 14
    },
    sustainability: {
      carbonFootprint: 12.8,
      recyclability: 25,
      renewableContent: 15,
      sustainabilityScore: 48
    },
    suppliers: [
      {
        id: 'supplier-15',
        name: 'Fiber Composites Co',
        region: 'North America',
        contact: 'fiber@composites.com',
        reliability: 87,
        availability: 'In Stock'
      }
    ],
    description: 'Cost-effective composite material with good strength and electrical insulation properties.',
    applications: ['Automotive parts', 'Construction', 'Marine', 'Electrical enclosures'],
    pros: ['Cost-effective', 'Good electrical insulation', 'Corrosion resistant', 'Design flexibility'],
    cons: ['Lower strength than carbon fiber', 'UV degradation', 'Limited recyclability', 'Fiber irritation']
  },
  {
    id: 'magnesium-az31',
    name: 'Magnesium AZ31',
    category: 'Magnesium Alloy',
    properties: {
      tensileStrength: 260,
      density: 1.78,
      elasticModulus: 45,
      thermalConductivity: 96,
      meltingPoint: 630,
      hardness: 73,
      operatingTempMin: -100,
      operatingTempMax: 200,
      electricalConductivity: 22.6,
      electricalResistivity: 4.42
    },
    cost: {
      pricePerKg: 4.2,
      minimumOrder: 100,
      leadTime: 18
    },
    sustainability: {
      carbonFootprint: 35.0,
      recyclability: 95,
      renewableContent: 20,
      sustainabilityScore: 66
    },
    suppliers: [
      {
        id: 'supplier-16',
        name: 'Lightweight Alloys Inc',
        region: 'North America',
        contact: 'mg@lightalloys.com',
        reliability: 86,
        availability: 'Limited'
      }
    ],
    description: 'Ultra-lightweight structural metal with good strength-to-weight ratio.',
    applications: ['Automotive', 'Electronics housings', 'Aerospace', 'Sporting goods'],
    pros: ['Lightest structural metal', 'Good machinability', 'Excellent EMI shielding', 'Recyclable'],
    cons: ['Corrosion prone', 'Fire hazard', 'Limited suppliers', 'Galvanic corrosion risk']
  }
];