export type Language = 'en' | 'sv';

export interface Translation {
  // Header and App Info
  appTitle: string;
  appSubtitle: string;
  
  // Navigation and Tabs
  overview: string;
  newMaterial: string;
  aiRecommendations: string;
  mlEnhanced: string;
  properties: string;
  sustainability: string;
  
  // Search and Filters
  searchMaterials: string;
  searching: string;
  getStarted: string;
  setRequirements: string;
  applicationContext: string;
  applicationContextPlaceholder: string;
  
  // Material Properties
  tensileStrength: string;
  density: string;
  budget: string;
  operatingTemp: string;
  electricalType: string;
  electricalConductivity: string;
  electricalResistivity: string;
  dielectricStrength: string;
  region: string;
  
  // Electrical Types
  any: string;
  conductor: string;
  insulator: string;
  semiconductor: string;
  
  // Regions
  global: string;
  northAmerica: string;
  europe: string;
  asia: string;
  southAmerica: string;
  africa: string;
  oceania: string;
  
  // Units
  mpa: string;
  gCm3: string;
  usdKg: string;
  celsius: string;
  msm: string;
  microOhmCm: string;
  kvMm: string;
  
  // Material Categories
  metals: string;
  polymers: string;
  ceramics: string;
  composites: string;
  
  // UI Actions
  search: string;
  clear: string;
  compare: string;
  viewDetails: string;
  viewComparison: string;
  selectForComparison: string;
  removeFromComparison: string;
  
  // Feedback and Ratings
  helpful: string;
  notHelpful: string;
  rateRecommendation: string;
  
  // Analysis
  materialAnalysis: string;
  selectedForComparison: string;
  selectAnalysisType: string;
  tradeoffAnalysis: string;
  
  // Messages
  noMaterialsFound: string;
  maxMaterialsSelected: string;
  materialsFound: string;
  optimizedFor: string;
  
  // AI and ML
  aiInsight: string;
  mlPrediction: string;
  prediction: string;
  confidence: string;
  
  // Sustainability
  carbonFootprint: string;
  recyclability: string;
  renewableContent: string;
  sustainabilityScore: string;
  
  // Material Details
  materialDetails: string;
  suppliers: string;
  cost: string;
  availability: string;
  pricePerKg: string;
  leadTime: string;
  days: string;
  
  // Language Selection
  language: string;
  english: string;
  swedish: string;
  
  // Additional UI elements
  materialRequirements: string;
  lessFilters: string;
  moreFilters: string;
  min: string;
  max: string;
  preferredRegion: string;
  selectRegion: string;
  selectElectricalType: string;
  electricalProperties: string;
  prioritizeSustainability: string;
  findMaterials: string;
  templates: string;
  applicationTemplates: string;
  collapse: string;
  expand: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Header and App Info
    appTitle: 'MatOpt AI',
    appSubtitle: 'AI-powered material optimization for product designers',
    
    // Navigation and Tabs
    overview: 'Overview',
    newMaterial: 'New Material',
    aiRecommendations: 'AI Recommendations',
    mlEnhanced: 'ML Enhanced',
    properties: 'Properties',
    sustainability: 'Sustainability',
    
    // Search and Filters
    searchMaterials: 'Search Materials',
    searching: 'Searching...',
    getStarted: 'Get Started',
    setRequirements: 'Set your requirements and search for materials to begin comparing options.',
    applicationContext: 'Application Context',
    applicationContextPlaceholder: 'Describe your application (e.g., automotive brake disc, aerospace component)',
    
    // Material Properties
    tensileStrength: 'Tensile Strength',
    density: 'Density',
    budget: 'Budget',
    operatingTemp: 'Operating Temperature',
    electricalType: 'Electrical Type',
    electricalConductivity: 'Electrical Conductivity',
    electricalResistivity: 'Electrical Resistivity',
    dielectricStrength: 'Dielectric Strength',
    region: 'Region',
    
    // Electrical Types
    any: 'Any',
    conductor: 'Conductor',
    insulator: 'Insulator',
    semiconductor: 'Semiconductor',
    
    // Regions
    global: 'Global',
    northAmerica: 'North America',
    europe: 'Europe',
    asia: 'Asia',
    southAmerica: 'South America',
    africa: 'Africa',
    oceania: 'Oceania',
    
    // Units
    mpa: 'MPa',
    gCm3: 'g/cm³',
    usdKg: 'USD/kg',
    celsius: '°C',
    msm: 'MS/m',
    microOhmCm: 'µΩ·cm',
    kvMm: 'kV/mm',
    
    // Material Categories
    metals: 'Metals',
    polymers: 'Polymers',
    ceramics: 'Ceramics',
    composites: 'Composites',
    
    // UI Actions
    search: 'Search',
    clear: 'Clear',
    compare: 'Compare',
    viewDetails: 'View Details',
    viewComparison: 'View Comparison',
    selectForComparison: 'Select for Comparison',
    removeFromComparison: 'Remove from Comparison',
    
    // Feedback and Ratings
    helpful: 'Helpful',
    notHelpful: 'Not Helpful',
    rateRecommendation: 'Rate this recommendation',
    
    // Analysis
    materialAnalysis: 'Material Analysis',
    selectedForComparison: 'Selected for Comparison',
    selectAnalysisType: 'Select analysis type',
    tradeoffAnalysis: 'Trade-off Analysis',
    
    // Messages
    noMaterialsFound: 'No materials match your criteria. Try adjusting the filters.',
    maxMaterialsSelected: 'You can compare up to 4 materials at once',
    materialsFound: 'materials found',
    optimizedFor: 'optimized for',
    
    // AI and ML
    aiInsight: 'AI Insight',
    mlPrediction: 'ML Prediction',
    prediction: 'Prediction',
    confidence: 'Confidence',
    
    // Sustainability
    carbonFootprint: 'Carbon Footprint',
    recyclability: 'Recyclability',
    renewableContent: 'Renewable Content',
    sustainabilityScore: 'Sustainability Score',
    
    // Material Details
    materialDetails: 'Material Details',
    suppliers: 'Suppliers',
    cost: 'Cost',
    availability: 'Availability',
    pricePerKg: 'Price per kg',
    leadTime: 'Lead Time',
    days: 'days',
    
    // Language Selection
    language: 'Language',
    english: 'English',
    swedish: 'Swedish',
    
    // Additional UI elements
    materialRequirements: 'Material Requirements',
    lessFilters: 'Less Filters',
    moreFilters: 'More Filters',
    min: 'Min',
    max: 'Max',
    preferredRegion: 'Preferred Region',
    selectRegion: 'Select region',
    selectElectricalType: 'Select electrical type',
    electricalProperties: 'Electrical Properties',
    prioritizeSustainability: 'Prioritize Sustainability',
    findMaterials: 'Find Materials',
    templates: 'Templates',
    applicationTemplates: 'Application Templates',
    collapse: 'Collapse',
    expand: 'Expand',
  },
  
  sv: {
    // Header and App Info
    appTitle: 'MatOpt AI',
    appSubtitle: 'AI-driven materialoptimering för produktdesigners',
    
    // Navigation and Tabs
    overview: 'Översikt',
    newMaterial: 'Nytt Material',
    aiRecommendations: 'AI-rekommendationer',
    mlEnhanced: 'ML-förbättrad',
    properties: 'Egenskaper',
    sustainability: 'Hållbarhet',
    
    // Search and Filters
    searchMaterials: 'Sök Material',
    searching: 'Söker...',
    getStarted: 'Kom igång',
    setRequirements: 'Ställ in dina krav och sök efter material för att börja jämföra alternativ.',
    applicationContext: 'Applikationskontext',
    applicationContextPlaceholder: 'Beskriv din applikation (t.ex. bilbromsskiva, rymdkomponent)',
    
    // Material Properties
    tensileStrength: 'Draghållfasthet',
    density: 'Densitet',
    budget: 'Budget',
    operatingTemp: 'Arbetstemperatur',
    electricalType: 'Elektrisk typ',
    electricalConductivity: 'Elektrisk ledningsförmåga',
    electricalResistivity: 'Elektrisk resistivitet',
    dielectricStrength: 'Dielektrisk styrka',
    region: 'Region',
    
    // Electrical Types
    any: 'Alla',
    conductor: 'Ledare',
    insulator: 'Isolator',
    semiconductor: 'Halvledare',
    
    // Regions
    global: 'Global',
    northAmerica: 'Nordamerika',
    europe: 'Europa',
    asia: 'Asien',
    southAmerica: 'Sydamerika',
    africa: 'Afrika',
    oceania: 'Oceanien',
    
    // Units
    mpa: 'MPa',
    gCm3: 'g/cm³',
    usdKg: 'USD/kg',
    celsius: '°C',
    msm: 'MS/m',
    microOhmCm: 'µΩ·cm',
    kvMm: 'kV/mm',
    
    // Material Categories
    metals: 'Metaller',
    polymers: 'Polymerer',
    ceramics: 'Keramik',
    composites: 'Kompositer',
    
    // UI Actions
    search: 'Sök',
    clear: 'Rensa',
    compare: 'Jämför',
    viewDetails: 'Visa detaljer',
    viewComparison: 'Visa jämförelse',
    selectForComparison: 'Välj för jämförelse',
    removeFromComparison: 'Ta bort från jämförelse',
    
    // Feedback and Ratings
    helpful: 'Hjälpsam',
    notHelpful: 'Inte hjälpsam',
    rateRecommendation: 'Betygsätt denna rekommendation',
    
    // Analysis
    materialAnalysis: 'Materialanalys',
    selectedForComparison: 'Valda för jämförelse',
    selectAnalysisType: 'Välj analystyp',
    tradeoffAnalysis: 'Avvägningsanalys',
    
    // Messages
    noMaterialsFound: 'Inga material matchar dina kriterier. Försök justera filtren.',
    maxMaterialsSelected: 'Du kan jämföra upp till 4 material åt gången',
    materialsFound: 'material hittade',
    optimizedFor: 'optimerad för',
    
    // AI and ML
    aiInsight: 'AI-insikt',
    mlPrediction: 'ML-förutsägelse',
    prediction: 'Förutsägelse',
    confidence: 'Förtroende',
    
    // Sustainability
    carbonFootprint: 'Koldioxidavtryck',
    recyclability: 'Återvinningsbarhet',
    renewableContent: 'Förnyelbart innehåll',
    sustainabilityScore: 'Hållbarhetspoäng',
    
    // Material Details
    materialDetails: 'Materialdetaljer',
    suppliers: 'Leverantörer',
    cost: 'Kostnad',
    availability: 'Tillgänglighet',
    pricePerKg: 'Pris per kg',
    leadTime: 'Leveranstid',
    days: 'dagar',
    
    // Language Selection
    language: 'Språk',
    english: 'Engelska',
    swedish: 'Svenska',
    
    // Additional UI elements
    materialRequirements: 'Materialkrav',
    lessFilters: 'Färre filter',
    moreFilters: 'Fler filter',
    min: 'Min',
    max: 'Max',
    preferredRegion: 'Föredragen region',
    selectRegion: 'Välj region',
    selectElectricalType: 'Välj elektrisk typ',
    electricalProperties: 'Elektriska egenskaper',
    prioritizeSustainability: 'Prioritera hållbarhet',
    findMaterials: 'Hitta material',
    templates: 'Mallar',
    applicationTemplates: 'Applikationsmallar',
    collapse: 'Kollaps',
    expand: 'Expandera',
  }
};