import { Supplier } from '@/types/materials';

/**
 * Regional supplier databases for different geographic regions
 * Each supplier includes region-specific information, local certifications, and pricing
 */

export const northAmericaSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "ArcelorMittal Dofasco",
    region: "North America",
    country: "Canada",
    reliability: 95,
    leadTime: 14,
    certifications: ["ISO 9001", "ASTM", "CSA", "AWS"],
    sustainabilityRating: 85,
    contact: {
      phone: "+1-905-548-7200",
      email: "sales@arcelormittal.com",
      website: "https://canada.arcelormittal.com"
    },
    specialties: ["Automotive steel", "Construction steel", "High-strength steel"],
    minOrderQuantity: "1 ton",
    paymentTerms: "Net 30"
  },
  {
    name: "Nucor Corporation",
    region: "North America",
    country: "USA",
    reliability: 92,
    leadTime: 10,
    certifications: ["ISO 9001", "ASTM", "AISC", "API"],
    sustainabilityRating: 88,
    contact: {
      phone: "+1-704-366-7000",
      email: "info@nucor.com",
      website: "https://www.nucor.com"
    },
    specialties: ["Structural steel", "Rebar", "Sheet steel"],
    minOrderQuantity: "500 kg",
    paymentTerms: "Net 45"
  },
  
  // Aluminum Suppliers
  {
    name: "Alcoa Corporation",
    region: "North America",
    country: "USA",
    reliability: 94,
    leadTime: 12,
    certifications: ["ISO 9001", "AS9100", "ASTM", "AA"],
    sustainabilityRating: 90,
    contact: {
      phone: "+1-412-553-4545",
      email: "sales@alcoa.com",
      website: "https://www.alcoa.com"
    },
    specialties: ["Aerospace aluminum", "Automotive aluminum", "Marine grade"],
    minOrderQuantity: "250 kg",
    paymentTerms: "Net 30"
  },
  {
    name: "Norsk Hydro Americas",
    region: "North America",
    country: "USA",
    reliability: 91,
    leadTime: 16,
    certifications: ["ISO 14001", "ASI", "ASTM"],
    sustainabilityRating: 92,
    contact: {
      phone: "+1-703-848-6000",
      email: "info.americas@hydro.com",
      website: "https://www.hydro.com"
    },
    specialties: ["Extruded aluminum", "Rolled products", "Recycled aluminum"],
    minOrderQuantity: "500 kg",
    paymentTerms: "Net 30"
  },

  // Plastic Suppliers
  {
    name: "DuPont Performance Materials",
    region: "North America",
    country: "USA",
    reliability: 96,
    leadTime: 21,
    certifications: ["ISO 9001", "FDA", "UL", "NSF"],
    sustainabilityRating: 78,
    contact: {
      phone: "+1-800-441-7515",
      email: "performance.materials@dupont.com",
      website: "https://www.dupont.com"
    },
    specialties: ["Engineering plastics", "High-performance polymers", "Medical grade"],
    minOrderQuantity: "25 kg",
    paymentTerms: "Net 45"
  },
  {
    name: "SABIC Americas",
    region: "North America",
    country: "USA",
    reliability: 89,
    leadTime: 18,
    certifications: ["ISO 9001", "REACH", "FDA"],
    sustainabilityRating: 82,
    contact: {
      phone: "+1-800-SABIC-1",
      email: "sabicamericas@sabic.com",
      website: "https://www.sabic.com"
    },
    specialties: ["Commodity plastics", "Engineering thermoplastics", "Specialty compounds"],
    minOrderQuantity: "100 kg",
    paymentTerms: "Net 30"
  }
];

export const europeSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "ThyssenKrupp Steel Europe",
    region: "Europe",
    country: "Germany",
    reliability: 96,
    leadTime: 12,
    certifications: ["ISO 9001", "EN 10025", "CE", "DIN"],
    sustainabilityRating: 87,
    contact: {
      phone: "+49-203-52-0",
      email: "info@thyssenkrupp.com",
      website: "https://www.thyssenkrupp-steel.com"
    },
    specialties: ["Automotive steel", "Construction steel", "Electrical steel"],
    minOrderQuantity: "1 ton",
    paymentTerms: "Net 30"
  },
  {
    name: "Tata Steel Europe",
    region: "Europe",
    country: "Netherlands",
    reliability: 93,
    leadTime: 14,
    certifications: ["ISO 9001", "EN 10025", "BES 6001"],
    sustainabilityRating: 85,
    contact: {
      phone: "+31-251-49-9111",
      email: "info@tatasteeleurope.com",
      website: "https://www.tatasteeleurope.com"
    },
    specialties: ["Hot rolled steel", "Cold rolled steel", "Coated steel"],
    minOrderQuantity: "500 kg",
    paymentTerms: "Net 45"
  },

  // Aluminum Suppliers
  {
    name: "Hydro Extruded Solutions",
    region: "Europe",
    country: "Norway",
    reliability: 94,
    leadTime: 10,
    certifications: ["ISO 9001", "EN 573", "ASI"],
    sustainabilityRating: 95,
    contact: {
      phone: "+47-22-53-81-00",
      email: "extruded.solutions@hydro.com",
      website: "https://www.hydro.com"
    },
    specialties: ["Architectural aluminum", "Industrial extrusions", "Precision tubes"],
    minOrderQuantity: "250 kg",
    paymentTerms: "Net 30"
  },
  {
    name: "Constellium SE",
    region: "Europe",
    country: "France",
    reliability: 92,
    leadTime: 16,
    certifications: ["ISO 9001", "EN 9100", "IATF 16949"],
    sustainabilityRating: 88,
    contact: {
      phone: "+33-1-73-01-46-00",
      email: "info@constellium.com",
      website: "https://www.constellium.com"
    },
    specialties: ["Aerospace aluminum", "Automotive solutions", "Packaging aluminum"],
    minOrderQuantity: "500 kg",
    paymentTerms: "Net 30"
  },

  // Plastic Suppliers
  {
    name: "BASF Performance Materials",
    region: "Europe",
    country: "Germany",
    reliability: 95,
    leadTime: 18,
    certifications: ["ISO 9001", "REACH", "EN 45545"],
    sustainabilityRating: 83,
    contact: {
      phone: "+49-621-60-0",
      email: "performance-materials@basf.com",
      website: "https://www.basf.com"
    },
    specialties: ["Engineering plastics", "Polyurethanes", "High-performance foams"],
    minOrderQuantity: "50 kg",
    paymentTerms: "Net 45"
  },
  {
    name: "Evonik Performance Materials",
    region: "Europe",
    country: "Germany",
    reliability: 91,
    leadTime: 20,
    certifications: ["ISO 9001", "REACH", "FDA"],
    sustainabilityRating: 80,
    contact: {
      phone: "+49-201-177-01",
      email: "info@evonik.com",
      website: "https://www.evonik.com"
    },
    specialties: ["High-performance polymers", "Specialty chemicals", "Additives"],
    minOrderQuantity: "25 kg",
    paymentTerms: "Net 30"
  },

  // Ceramic Suppliers
  {
    name: "CeramTec Group",
    region: "Europe",
    country: "Germany",
    reliability: 88,
    leadTime: 28,
    certifications: ["ISO 9001", "ISO 13485", "IATF 16949"],
    sustainabilityRating: 75,
    contact: {
      phone: "+49-7153-611-828",
      email: "info@ceramtec.com",
      website: "https://www.ceramtec.com"
    },
    specialties: ["Technical ceramics", "Medical ceramics", "Electronic ceramics"],
    minOrderQuantity: "10 kg",
    paymentTerms: "Net 60"
  }
];

export const asiaSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "Nippon Steel Corporation",
    region: "Asia",
    country: "Japan",
    reliability: 97,
    leadTime: 21,
    certifications: ["ISO 9001", "JIS", "ASTM", "API"],
    sustainabilityRating: 86,
    contact: {
      phone: "+81-3-6867-4111",
      email: "info@nipponsteel.com",
      website: "https://www.nipponsteel.com"
    },
    specialties: ["High-grade steel", "Stainless steel", "Specialty alloys"],
    minOrderQuantity: "2 tons",
    paymentTerms: "LC at sight"
  },
  {
    name: "POSCO Holdings",
    region: "Asia",
    country: "South Korea",
    reliability: 94,
    leadTime: 18,
    certifications: ["ISO 9001", "KS", "ASTM", "JIS"],
    sustainabilityRating: 84,
    contact: {
      phone: "+82-54-220-0114",
      email: "global@posco.com",
      website: "https://www.posco.com"
    },
    specialties: ["Hot rolled steel", "Cold rolled steel", "Electrical steel"],
    minOrderQuantity: "1 ton",
    paymentTerms: "LC 90 days"
  },
  {
    name: "Baosteel Group",
    region: "Asia",
    country: "China",
    reliability: 89,
    leadTime: 25,
    certifications: ["ISO 9001", "GB", "ASTM", "EN"],
    sustainabilityRating: 78,
    contact: {
      phone: "+86-21-2643-9999",
      email: "info@baosteel.com",
      website: "https://www.baosteel.com"
    },
    specialties: ["Carbon steel", "Alloy steel", "Coated steel"],
    minOrderQuantity: "5 tons",
    paymentTerms: "LC 60 days"
  },

  // Aluminum Suppliers
  {
    name: "Hindalco Industries",
    region: "Asia",
    country: "India",
    reliability: 87,
    leadTime: 30,
    certifications: ["ISO 9001", "IS", "ASTM", "BS"],
    sustainabilityRating: 82,
    contact: {
      phone: "+91-22-6691-7000",
      email: "info@hindalco.com",
      website: "https://www.hindalco.com"
    },
    specialties: ["Primary aluminum", "Rolled products", "Extrusions"],
    minOrderQuantity: "1 ton",
    paymentTerms: "LC 90 days"
  },
  {
    name: "Chalco (Aluminum Corp of China)",
    region: "Asia",
    country: "China",
    reliability: 85,
    leadTime: 28,
    certifications: ["ISO 9001", "GB", "ASTM"],
    sustainabilityRating: 76,
    contact: {
      phone: "+86-10-8229-8299",
      email: "info@chalco.com.cn",
      website: "https://www.chalco.com.cn"
    },
    specialties: ["Aluminum ingots", "Aluminum plates", "Foil products"],
    minOrderQuantity: "2 tons",
    paymentTerms: "LC 60 days"
  },

  // Plastic Suppliers
  {
    name: "Mitsubishi Chemical Corporation",
    region: "Asia",
    country: "Japan",
    reliability: 93,
    leadTime: 24,
    certifications: ["ISO 9001", "JIS", "FDA", "REACH"],
    sustainabilityRating: 81,
    contact: {
      phone: "+81-3-6748-7111",
      email: "info@m-chemical.co.jp",
      website: "https://www.m-chemical.co.jp"
    },
    specialties: ["Engineering plastics", "Performance polymers", "Carbon fiber"],
    minOrderQuantity: "100 kg",
    paymentTerms: "LC 60 days"
  },
  {
    name: "LG Chem",
    region: "Asia",
    country: "South Korea",
    reliability: 90,
    leadTime: 22,
    certifications: ["ISO 9001", "KS", "UL", "FDA"],
    sustainabilityRating: 79,
    contact: {
      phone: "+82-2-3773-1114",
      email: "info@lgchem.com",
      website: "https://www.lgchem.com"
    },
    specialties: ["ABS plastics", "PC compounds", "Engineering plastics"],
    minOrderQuantity: "200 kg",
    paymentTerms: "LC 90 days"
  },

  // Composite Suppliers
  {
    name: "Toray Industries",
    region: "Asia",
    country: "Japan",
    reliability: 95,
    leadTime: 35,
    certifications: ["ISO 9001", "AS9100", "JIS"],
    sustainabilityRating: 83,
    contact: {
      phone: "+81-3-3245-5111",
      email: "info@toray.co.jp",
      website: "https://www.toray.com"
    },
    specialties: ["Carbon fiber", "CFRP", "Prepregs"],
    minOrderQuantity: "50 kg",
    paymentTerms: "LC 60 days"
  }
];

export const oceaniaSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "BlueScope Steel",
    region: "Oceania",
    country: "Australia",
    reliability: 92,
    leadTime: 16,
    certifications: ["ISO 9001", "AS/NZS", "ASTM"],
    sustainabilityRating: 84,
    contact: {
      phone: "+61-3-9666-4000",
      email: "info@bluescope.com",
      website: "https://www.bluescope.com"
    },
    specialties: ["Coated steel", "Structural steel", "Building products"],
    minOrderQuantity: "500 kg",
    paymentTerms: "Net 30"
  },
  {
    name: "InfraBuild",
    region: "Oceania",
    country: "Australia",
    reliability: 88,
    leadTime: 14,
    certifications: ["ISO 9001", "AS/NZS", "ACRS"],
    sustainabilityRating: 82,
    contact: {
      phone: "+61-2-9239-6666",
      email: "info@infrabuild.com",
      website: "https://www.infrabuild.com"
    },
    specialties: ["Reinforcement steel", "Structural steel", "Wire products"],
    minOrderQuantity: "1 ton",
    paymentTerms: "Net 45"
  },

  // Aluminum Suppliers
  {
    name: "Capral Limited",
    region: "Oceania",
    country: "Australia",
    reliability: 89,
    leadTime: 18,
    certifications: ["ISO 9001", "AS/NZS", "Green Building Council"],
    sustainabilityRating: 86,
    contact: {
      phone: "+61-2-9425-3555",
      email: "info@capral.com.au",
      website: "https://www.capral.com.au"
    },
    specialties: ["Architectural aluminum", "Industrial extrusions", "Fabricated products"],
    minOrderQuantity: "250 kg",
    paymentTerms: "Net 30"
  }
];

export const southAmericaSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "Gerdau S.A.",
    region: "South America",
    country: "Brazil",
    reliability: 90,
    leadTime: 20,
    certifications: ["ISO 9001", "ABNT", "ASTM"],
    sustainabilityRating: 81,
    contact: {
      phone: "+55-11-3094-4100",
      email: "info@gerdau.com",
      website: "https://www.gerdau.com"
    },
    specialties: ["Long steel", "Flat steel", "Special steel"],
    minOrderQuantity: "2 tons",
    paymentTerms: "LC 90 days"
  },
  {
    name: "Ternium S.A.",
    region: "South America",
    country: "Argentina",
    reliability: 87,
    leadTime: 22,
    certifications: ["ISO 9001", "IRAM", "ASTM"],
    sustainabilityRating: 79,
    contact: {
      phone: "+54-11-4018-8000",
      email: "info@ternium.com",
      website: "https://www.ternium.com"
    },
    specialties: ["Hot rolled steel", "Cold rolled steel", "Galvanized steel"],
    minOrderQuantity: "1 ton",
    paymentTerms: "LC 60 days"
  }
];

export const africaSuppliers: Supplier[] = [
  // Steel Suppliers
  {
    name: "ArcelorMittal South Africa",
    region: "Africa",
    country: "South Africa",
    reliability: 85,
    leadTime: 28,
    certifications: ["ISO 9001", "SABS", "ASTM"],
    sustainabilityRating: 77,
    contact: {
      phone: "+27-11-621-0000",
      email: "info@arcelormittal.co.za",
      website: "https://southafrica.arcelormittal.com"
    },
    specialties: ["Flat steel", "Long steel", "Coke and chemicals"],
    minOrderQuantity: "2 tons",
    paymentTerms: "LC 90 days"
  },
  {
    name: "Scaw Metals Group",
    region: "Africa",
    country: "South Africa",
    reliability: 82,
    leadTime: 25,
    certifications: ["ISO 9001", "SABS", "SANS"],
    sustainabilityRating: 75,
    contact: {
      phone: "+27-11-621-1555",
      email: "info@scaw.co.za",
      website: "https://www.scaw.co.za"
    },
    specialties: ["Special steel", "Engineering steel", "Cast products"],
    minOrderQuantity: "1 ton",
    paymentTerms: "LC 60 days"
  }
];

/**
 * Get suppliers by region
 */
export const getSuppliersByRegion = (region: string): Supplier[] => {
  switch (region.toLowerCase()) {
    case 'north america':
    case 'northamerica':
      return northAmericaSuppliers;
    case 'europe':
      return europeSuppliers;
    case 'asia':
      return asiaSuppliers;
    case 'oceania':
    case 'australia':
      return oceaniaSuppliers;
    case 'south america':
    case 'southamerica':
      return southAmericaSuppliers;
    case 'africa':
      return africaSuppliers;
    case 'global':
    default:
      return [
        ...northAmericaSuppliers,
        ...europeSuppliers,
        ...asiaSuppliers,
        ...oceaniaSuppliers,
        ...southAmericaSuppliers,
        ...africaSuppliers
      ];
  }
};

/**
 * Get suppliers by country
 */
export const getSuppliersByCountry = (country: string): Supplier[] => {
  const allSuppliers = getSuppliersByRegion('global');
  return allSuppliers.filter(supplier => 
    supplier.country.toLowerCase() === country.toLowerCase()
  );
};

/**
 * Get all unique regions
 */
export const getAllRegions = (): string[] => {
  return [
    'North America',
    'Europe', 
    'Asia',
    'Oceania',
    'South America',
    'Africa'
  ];
};

/**
 * Get all unique countries
 */
export const getAllCountries = (): string[] => {
  const allSuppliers = getSuppliersByRegion('global');
  const countries = new Set(allSuppliers.map(supplier => supplier.country));
  return Array.from(countries).sort();
};