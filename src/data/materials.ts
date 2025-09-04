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
  },
  {
    id: 'silicon-carbide',
    name: 'Silicon Carbide (SiC)',
    category: 'Technical Ceramic',
    properties: {
      tensileStrength: 350,
      density: 3.21,
      elasticModulus: 410,
      thermalConductivity: 120,
      meltingPoint: 2730,
      hardness: 2500
    },
    cost: {
      pricePerKg: 18.5,
      minimumOrder: 20,
      leadTime: 35
    },
    sustainability: {
      carbonFootprint: 12.3,
      recyclability: 45,
      renewableContent: 8,
      sustainabilityScore: 52
    },
    suppliers: [
      {
        id: 'supplier-13',
        name: 'Ceramic Technologies Ltd',
        region: 'Europe',
        contact: 'sic@ceramtech.com',
        reliability: 94,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-14',
        name: 'Advanced Ceramics Corp',
        region: 'North America',
        contact: 'silicon@advceramics.com',
        reliability: 91,
        availability: 'Limited'
      }
    ],
    description: 'Ultra-hard technical ceramic with exceptional thermal conductivity and chemical resistance.',
    applications: ['Semiconductor equipment', 'High-temperature bearings', 'Armor applications', 'Cutting tools'],
    pros: ['Extreme hardness', 'High temperature stability', 'Chemical inertness', 'Excellent thermal conductivity'],
    cons: ['Brittle fracture', 'Expensive processing', 'Limited machinability', 'Long lead times']
  },
  {
    id: 'alumina-ceramic',
    name: 'Alumina (Al2O3) 99.5%',
    category: 'Technical Ceramic',
    properties: {
      tensileStrength: 300,
      density: 3.97,
      elasticModulus: 370,
      thermalConductivity: 30,
      meltingPoint: 2072,
      hardness: 1800
    },
    cost: {
      pricePerKg: 8.2,
      minimumOrder: 50,
      leadTime: 28
    },
    sustainability: {
      carbonFootprint: 9.8,
      recyclability: 60,
      renewableContent: 12,
      sustainabilityScore: 61
    },
    suppliers: [
      {
        id: 'supplier-15',
        name: 'Precision Ceramics Inc',
        region: 'North America',
        contact: 'alumina@precision.com',
        reliability: 96,
        availability: 'In Stock'
      },
      {
        id: 'supplier-16',
        name: 'Industrial Ceramics Asia',
        region: 'Asia Pacific',
        contact: 'orders@indceramics.cn',
        reliability: 88,
        availability: 'In Stock'
      }
    ],
    description: 'High-purity alumina ceramic with excellent electrical insulation and wear resistance.',
    applications: ['Electronic substrates', 'Insulators', 'Wear parts', 'Laboratory equipment'],
    pros: ['Excellent electrical insulation', 'High wear resistance', 'Chemical stability', 'Good availability'],
    cons: ['Brittle', 'Thermal shock sensitivity', 'Difficult to machine', 'Moderate cost']
  },
  {
    id: 'glass-fiber-composite',
    name: 'Glass Fiber Composite (GFRP)',
    category: 'Fiber Composite',
    properties: {
      tensileStrength: 800,
      density: 1.8,
      elasticModulus: 45,
      thermalConductivity: 0.3,
      meltingPoint: 0, // Decomposes
      hardness: 0 // Not applicable
    },
    cost: {
      pricePerKg: 4.5,
      minimumOrder: 100,
      leadTime: 14
    },
    sustainability: {
      carbonFootprint: 6.2,
      recyclability: 55,
      renewableContent: 15,
      sustainabilityScore: 68
    },
    suppliers: [
      {
        id: 'supplier-17',
        name: 'Fiber Composites Solutions',
        region: 'North America',
        contact: 'gfrp@fibersolutions.com',
        reliability: 92,
        availability: 'In Stock'
      },
      {
        id: 'supplier-18',
        name: 'Global Fiber Tech',
        region: 'Global',
        contact: 'sales@globalfiber.com',
        reliability: 89,
        availability: 'In Stock'
      }
    ],
    description: 'Cost-effective fiber-reinforced composite with good strength-to-weight ratio.',
    applications: ['Marine', 'Construction', 'Automotive body panels', 'Wind energy'],
    pros: ['Cost-effective', 'Good strength-to-weight ratio', 'Corrosion resistant', 'Design flexibility'],
    cons: ['Lower strength than carbon fiber', 'UV degradation', 'Fatigue sensitivity', 'Moderate recyclability']
  },
  {
    id: 'zirconia-ceramic',
    name: 'Yttria-Stabilized Zirconia (YSZ)',
    category: 'Technical Ceramic',
    properties: {
      tensileStrength: 900,
      density: 6.05,
      elasticModulus: 210,
      thermalConductivity: 2.5,
      meltingPoint: 2715,
      hardness: 1200
    },
    cost: {
      pricePerKg: 45.0,
      minimumOrder: 10,
      leadTime: 42
    },
    sustainability: {
      carbonFootprint: 15.7,
      recyclability: 35,
      renewableContent: 5,
      sustainabilityScore: 48
    },
    suppliers: [
      {
        id: 'supplier-19',
        name: 'Zirconia Specialists',
        region: 'Europe',
        contact: 'ysz@zirconiaspec.de',
        reliability: 97,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-20',
        name: 'Technical Ceramics USA',
        region: 'North America',
        contact: 'zirconia@techceramics.com',
        reliability: 93,
        availability: 'Limited'
      }
    ],
    description: 'Advanced ceramic with exceptional toughness and biocompatibility for demanding applications.',
    applications: ['Medical implants', 'Cutting tools', 'Aerospace components', 'Fuel cells'],
    pros: ['Exceptional toughness', 'Biocompatible', 'High strength', 'Thermal barrier properties'],
    cons: ['Very expensive', 'Complex processing', 'Limited suppliers', 'Phase transformation risks']
  },
  {
    id: 'aramid-composite',
    name: 'Aramid Fiber Composite (Kevlar)',
    category: 'Fiber Composite',
    properties: {
      tensileStrength: 2800,
      density: 1.44,
      elasticModulus: 130,
      thermalConductivity: 0.04,
      meltingPoint: 0, // Decomposes at 500°C
      hardness: 0 // Not applicable
    },
    cost: {
      pricePerKg: 32.0,
      minimumOrder: 25,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 18.9,
      recyclability: 25,
      renewableContent: 8,
      sustainabilityScore: 44
    },
    suppliers: [
      {
        id: 'supplier-21',
        name: 'High Performance Composites',
        region: 'North America',
        contact: 'aramid@hpcomposites.com',
        reliability: 95,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-22',
        name: 'European Fiber Technologies',
        region: 'Europe',
        contact: 'kevlar@eurofiber.fr',
        reliability: 92,
        availability: 'Limited'
      }
    ],
    description: 'High-performance aromatic polyamide fiber composite with excellent impact resistance.',
    applications: ['Ballistic protection', 'Aerospace', 'Marine', 'Sports equipment'],
    pros: ['Excellent impact resistance', 'Lightweight', 'Cut resistance', 'Vibration damping'],
    cons: ['Expensive', 'UV sensitivity', 'Poor compression strength', 'Limited recyclability']
  },
  {
    id: 'boron-carbide',
    name: 'Boron Carbide (B4C)',
    category: 'Technical Ceramic',
    properties: {
      tensileStrength: 280,
      density: 2.52,
      elasticModulus: 460,
      thermalConductivity: 30,
      meltingPoint: 2763,
      hardness: 3500
    },
    cost: {
      pricePerKg: 85.0,
      minimumOrder: 5,
      leadTime: 56
    },
    sustainability: {
      carbonFootprint: 22.4,
      recyclability: 30,
      renewableContent: 3,
      sustainabilityScore: 38
    },
    suppliers: [
      {
        id: 'supplier-23',
        name: 'Ultra-Hard Materials Ltd',
        region: 'North America',
        contact: 'boron@ultrahard.com',
        reliability: 98,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-24',
        name: 'Advanced Carbides Europe',
        region: 'Europe',
        contact: 'b4c@advcarbides.com',
        reliability: 94,
        availability: 'Made to Order'
      }
    ],
    description: 'Extremely hard ceramic material with the highest hardness after diamond and cubic boron nitride.',
    applications: ['Armor plating', 'Nuclear applications', 'Abrasives', 'Nozzles'],
    pros: ['Extreme hardness', 'Neutron absorption', 'Low density', 'Chemical stability'],
    cons: ['Extremely expensive', 'Very brittle', 'Difficult processing', 'Very long lead times']
  },
  {
    id: 'natural-fiber-composite',
    name: 'Natural Fiber Composite (Flax/Hemp)',
    category: 'Bio-Composite',
    properties: {
      tensileStrength: 250,
      density: 1.35,
      elasticModulus: 25,
      thermalConductivity: 0.08,
      meltingPoint: 0, // Decomposes
      hardness: 0 // Not applicable
    },
    cost: {
      pricePerKg: 3.8,
      minimumOrder: 200,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 1.2,
      recyclability: 85,
      renewableContent: 75,
      sustainabilityScore: 92
    },
    suppliers: [
      {
        id: 'supplier-25',
        name: 'Green Composites Co',
        region: 'Europe',
        contact: 'natural@greencomp.com',
        reliability: 87,
        availability: 'In Stock'
      },
      {
        id: 'supplier-26',
        name: 'Sustainable Materials Inc',
        region: 'North America',
        contact: 'bio@sustainablemat.com',
        reliability: 84,
        availability: 'In Stock'
      }
    ],
    description: 'Environmentally friendly composite using natural plant fibers with bio-based resin systems.',
    applications: ['Automotive interiors', 'Furniture', 'Packaging', 'Construction panels'],
    pros: ['Highly sustainable', 'Low carbon footprint', 'Biodegradable options', 'Cost-effective'],
    cons: ['Moisture sensitivity', 'Lower strength', 'Variable properties', 'Limited temperature range']
  },
  {
    id: 'tungsten-carbide',
    name: 'Tungsten Carbide (WC-Co)',
    category: 'Cermet',
    properties: {
      tensileStrength: 1400,
      density: 14.8,
      elasticModulus: 640,
      thermalConductivity: 100,
      meltingPoint: 2870,
      hardness: 1800
    },
    cost: {
      pricePerKg: 65.0,
      minimumOrder: 15,
      leadTime: 35
    },
    sustainability: {
      carbonFootprint: 28.5,
      recyclability: 90,
      renewableContent: 2,
      sustainabilityScore: 48
    },
    suppliers: [
      {
        id: 'supplier-27',
        name: 'Carbide Technologies',
        region: 'North America',
        contact: 'wc@carbidetech.com',
        reliability: 96,
        availability: 'Made to Order'
      },
      {
        id: 'supplier-28',
        name: 'Precision Carbides Ltd',
        region: 'Europe',
        contact: 'tungsten@precarbides.co.uk',
        reliability: 93,
        availability: 'Limited'
      }
    ],
    description: 'Ultra-hard cermet combining tungsten carbide particles in a cobalt binder matrix.',
    applications: ['Cutting tools', 'Mining equipment', 'Dies', 'Wear parts'],
    pros: ['Exceptional hardness', 'High wear resistance', 'Temperature stability', 'Good recyclability'],
    cons: ['Very expensive', 'Brittle', 'Heavy', 'Contains cobalt (health concerns)']
  },
  {
    id: 'cordierite-ceramic',
    name: 'Cordierite Ceramic',
    category: 'Technical Ceramic',
    properties: {
      tensileStrength: 120,
      density: 2.1,
      elasticModulus: 140,
      thermalConductivity: 2.5,
      meltingPoint: 1465,
      hardness: 700
    },
    cost: {
      pricePerKg: 6.5,
      minimumOrder: 100,
      leadTime: 21
    },
    sustainability: {
      carbonFootprint: 4.8,
      recyclability: 70,
      renewableContent: 20,
      sustainabilityScore: 74
    },
    suppliers: [
      {
        id: 'supplier-29',
        name: 'Thermal Ceramics Group',
        region: 'Global',
        contact: 'cordierite@thermalceramics.com',
        reliability: 94,
        availability: 'In Stock'
      },
      {
        id: 'supplier-30',
        name: 'Kiln Components Ltd',
        region: 'Europe',
        contact: 'sales@kilncomponents.de',
        reliability: 91,
        availability: 'In Stock'
      }
    ],
    description: 'Low thermal expansion ceramic ideal for high-temperature applications with thermal cycling.',
    applications: ['Catalyst supports', 'Kiln furniture', 'Heat exchangers', 'Automotive substrates'],
    pros: ['Low thermal expansion', 'Thermal shock resistance', 'Cost-effective', 'Good availability'],
    cons: ['Lower strength', 'Porous structure', 'Limited wear resistance', 'Thermal conductivity limitations']
  }
];