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
      hardness: 215
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
      hardness: 95
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
      hardness: 334
    },
    cost: {
      pricePerKg: 35.0,
      minimumOrder: 10,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 22.1,
      recyclability: 85,
      renewableContent: 15,
      sustainabilityScore: 58
    },
    suppliers: [
      {
        id: 'supplier-5',
        name: 'Titanium Technologies',
        region: 'North America',
        contact: 'aerospace@titantech.com',
        reliability: 98,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-6',
        name: 'Advanced Materials Ltd',
        region: 'Europe',
        contact: 'titanium@advmat.co.uk',
        reliability: 94,
        availability: 'Limited'
      }
    ],
    description: 'High-strength, low-density titanium alloy with excellent biocompatibility and corrosion resistance.',
    applications: ['Aerospace', 'Medical implants', 'High-performance automotive', 'Chemical processing'],
    pros: ['Excellent strength-to-weight ratio', 'Biocompatible', 'Superior corrosion resistance', 'High-temperature performance'],
    cons: ['Very expensive', 'Difficult to machine', 'Limited availability', 'High carbon footprint']
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber Composite',
    category: 'Composite',
    properties: {
      tensileStrength: 3500,
      density: 1.6,
      elasticModulus: 230,
      thermalConductivity: 7.0,
      meltingPoint: 0, // Decomposes
      hardness: 0 // Not applicable
    },
    cost: {
      pricePerKg: 25.0,
      minimumOrder: 25,
      leadTime: 28
    },
    sustainability: {
      carbonFootprint: 31.5,
      recyclability: 35,
      renewableContent: 10,
      sustainabilityScore: 42
    },
    suppliers: [
      {
        id: 'supplier-7',
        name: 'Composite Solutions',
        region: 'North America',
        contact: 'composites@solutions.com',
        reliability: 91,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-8',
        name: 'Carbon Tech Industries',
        region: 'Asia Pacific',
        contact: 'sales@carbontech.jp',
        reliability: 89,
        availability: 'Limited'
      }
    ],
    description: 'Ultra-lightweight composite material with exceptional strength and stiffness properties.',
    applications: ['Aerospace', 'Formula 1', 'Sporting goods', 'High-end automotive'],
    pros: ['Exceptional strength-to-weight ratio', 'Tailorable properties', 'Fatigue resistant', 'Low thermal expansion'],
    cons: ['Very expensive', 'Poor recyclability', 'Brittle failure mode', 'Manufacturing complexity']
  },
  {
    id: 'steel-a36',
    name: 'Carbon Steel A36',
    category: 'Carbon Steel',
    properties: {
      tensileStrength: 400,
      density: 7.85,
      elasticModulus: 200,
      thermalConductivity: 51.9,
      meltingPoint: 1510,
      hardness: 119
    },
    cost: {
      pricePerKg: 0.8,
      minimumOrder: 500,
      leadTime: 5
    },
    sustainability: {
      carbonFootprint: 2.5,
      recyclability: 98,
      renewableContent: 65,
      sustainabilityScore: 85
    },
    suppliers: [
      {
        id: 'supplier-9',
        name: 'Steel Works Co',
        region: 'North America',
        contact: 'orders@steelworks.com',
        reliability: 96,
        availability: 'In Stock'
      },
      {
        id: 'supplier-10',
        name: 'Global Steel Supply',
        region: 'Global',
        contact: 'international@globalsteel.com',
        reliability: 93,
        availability: 'In Stock'
      }
    ],
    description: 'Economical structural carbon steel with good weldability and moderate strength.',
    applications: ['Construction', 'General fabrication', 'Machinery frames', 'Structural components'],
    pros: ['Very economical', 'Excellent availability', 'Good weldability', 'High recyclability'],
    cons: ['Susceptible to corrosion', 'Heavy', 'Limited strength', 'Requires surface treatment']
  },
  {
    id: 'peek',
    name: 'PEEK Polymer',
    category: 'Engineering Plastic',
    properties: {
      tensileStrength: 100,
      density: 1.32,
      elasticModulus: 3.6,
      thermalConductivity: 0.25,
      meltingPoint: 343,
      hardness: 25
    },
    cost: {
      pricePerKg: 95.0,
      minimumOrder: 5,
      leadTime: 14
    },
    sustainability: {
      carbonFootprint: 8.7,
      recyclability: 75,
      renewableContent: 5,
      sustainabilityScore: 65
    },
    suppliers: [
      {
        id: 'supplier-11',
        name: 'Advanced Polymers Inc',
        region: 'North America',
        contact: 'peek@advpolymers.com',
        reliability: 93,
        availability: 'In Stock'
      },
      {
        id: 'supplier-12',
        name: 'European Plastics',
        region: 'Europe',
        contact: 'sales@europlastics.de',
        reliability: 90,
        availability: 'Limited'
      }
    ],
    description: 'High-performance semicrystalline thermoplastic with excellent chemical and temperature resistance.',
    applications: ['Medical devices', 'Aerospace', 'Oil & gas', 'Electronics'],
    pros: ['Chemical resistance', 'High temperature performance', 'Biocompatible', 'Lightweight'],
    cons: ['Very expensive', 'Limited suppliers', 'Requires specialized processing', 'Lower strength than metals']
  }
];