export type Language = 'en' | 'sv' | 'de' | 'fr' | 'am';

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
  regionalDatabase: string;
  
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
  german: string;
  french: string;
  amharic: string;
  
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
  
  // Regional Database
  exploreRegionalMaterials: string;
  regionStats: string;
  avgReliability: string;
  avgSustainability: string;
  availableMaterials: string;
  availableSuppliers: string;
  selectCountry: string;
  allCountries: string;
  materials: string;
  price: string;
  topApplications: string;
  reliable: string;
  sustainable: string;
  paymentTerms: string;
  minOrder: string;
  website: string;
  specialties: string;
  certifications: string;
  noDataFound: string;
  noMaterialsInRegion: string;
  noSuppliersInRegion: string;
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
    regionalDatabase: 'Regional Database',
    
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
    german: 'German',
    french: 'French',
    amharic: 'Amharic',
    
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
    
    // Regional Database
    exploreRegionalMaterials: 'Explore materials and suppliers by geographic region',
    regionStats: 'Region Statistics',
    avgReliability: 'Average Reliability',
    avgSustainability: 'Average Sustainability',
    availableMaterials: 'Available Materials',
    availableSuppliers: 'Available Suppliers',
    selectCountry: 'Select Country',
    allCountries: 'All Countries',
    materials: 'Materials',
    price: 'Price',
    topApplications: 'Top Applications',
    reliable: 'Reliable',
    sustainable: 'Sustainable',
    paymentTerms: 'Payment',
    minOrder: 'Min Order',
    website: 'Website',
    specialties: 'Specialties',
    certifications: 'Certifications',
    noDataFound: 'No Data Found',
    noMaterialsInRegion: 'No materials available in selected region',
    noSuppliersInRegion: 'No suppliers available in selected region',
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
    regionalDatabase: 'Regional Databas',
    
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
    german: 'Tyska',
    french: 'Franska',
    amharic: 'Amhariska',
    
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
    
    // Regional Database
    exploreRegionalMaterials: 'Utforska material och leverantörer per geografisk region',
    regionStats: 'Regionstatistik',
    avgReliability: 'Genomsnittlig tillförlitlighet',
    avgSustainability: 'Genomsnittlig hållbarhet',
    availableMaterials: 'Tillgängliga material',
    availableSuppliers: 'Tillgängliga leverantörer',
    selectCountry: 'Välj land',
    allCountries: 'Alla länder',
    materials: 'Material',
    price: 'Pris',
    topApplications: 'Toppapplikationer',
    reliable: 'Pålitlig',
    sustainable: 'Hållbar',
    paymentTerms: 'Betalning',
    minOrder: 'Minsta order',
    website: 'Webbplats',
    specialties: 'Specialiteter',
    certifications: 'Certifieringar',
    noDataFound: 'Inga data hittades',
    noMaterialsInRegion: 'Inga material tillgängliga i vald region',
    noSuppliersInRegion: 'Inga leverantörer tillgängliga i vald region',
  },
  
  de: {
    // Header and App Info
    appTitle: 'MatOpt AI',
    appSubtitle: 'KI-gesteuerte Materialoptimierung für Produktdesigner',
    
    // Navigation and Tabs
    overview: 'Übersicht',
    newMaterial: 'Neues Material',
    aiRecommendations: 'KI-Empfehlungen',
    mlEnhanced: 'ML-Verbessert',
    properties: 'Eigenschaften',
    sustainability: 'Nachhaltigkeit',
    regionalDatabase: 'Regionale Datenbank',
    
    // Search and Filters
    searchMaterials: 'Materialien suchen',
    searching: 'Suche läuft...',
    getStarted: 'Loslegen',
    setRequirements: 'Legen Sie Ihre Anforderungen fest und suchen Sie nach Materialien, um Optionen zu vergleichen.',
    applicationContext: 'Anwendungskontext',
    applicationContextPlaceholder: 'Beschreiben Sie Ihre Anwendung (z.B. Bremsscheibe für Autos, Luft- und Raumfahrtkomponente)',
    
    // Material Properties
    tensileStrength: 'Zugfestigkeit',
    density: 'Dichte',
    budget: 'Budget',
    operatingTemp: 'Betriebstemperatur',
    electricalType: 'Elektrischer Typ',
    electricalConductivity: 'Elektrische Leitfähigkeit',
    electricalResistivity: 'Elektrischer Widerstand',
    dielectricStrength: 'Dielektrische Festigkeit',
    region: 'Region',
    
    // Electrical Types
    any: 'Beliebig',
    conductor: 'Leiter',
    insulator: 'Isolator',
    semiconductor: 'Halbleiter',
    
    // Regions
    global: 'Global',
    northAmerica: 'Nordamerika',
    europe: 'Europa',
    asia: 'Asien',
    southAmerica: 'Südamerika',
    africa: 'Afrika',
    oceania: 'Ozeanien',
    
    // Units
    mpa: 'MPa',
    gCm3: 'g/cm³',
    usdKg: 'USD/kg',
    celsius: '°C',
    msm: 'MS/m',
    microOhmCm: 'µΩ·cm',
    kvMm: 'kV/mm',
    
    // Material Categories
    metals: 'Metalle',
    polymers: 'Polymere',
    ceramics: 'Keramik',
    composites: 'Verbundwerkstoffe',
    
    // UI Actions
    search: 'Suchen',
    clear: 'Löschen',
    compare: 'Vergleichen',
    viewDetails: 'Details anzeigen',
    viewComparison: 'Vergleich anzeigen',
    selectForComparison: 'Zum Vergleich auswählen',
    removeFromComparison: 'Aus Vergleich entfernen',
    
    // Feedback and Ratings
    helpful: 'Hilfreich',
    notHelpful: 'Nicht hilfreich',
    rateRecommendation: 'Diese Empfehlung bewerten',
    
    // Analysis
    materialAnalysis: 'Materialanalyse',
    selectedForComparison: 'Zum Vergleich ausgewählt',
    selectAnalysisType: 'Analyseart auswählen',
    tradeoffAnalysis: 'Kompromissanalyse',
    
    // Messages
    noMaterialsFound: 'Keine Materialien entsprechen Ihren Kriterien. Versuchen Sie die Filter anzupassen.',
    maxMaterialsSelected: 'Sie können bis zu 4 Materialien gleichzeitig vergleichen',
    materialsFound: 'Materialien gefunden',
    optimizedFor: 'optimiert für',
    
    // AI and ML
    aiInsight: 'KI-Einblick',
    mlPrediction: 'ML-Vorhersage',
    prediction: 'Vorhersage',
    confidence: 'Vertrauen',
    
    // Sustainability
    carbonFootprint: 'CO²-Fußabdruck',
    recyclability: 'Recycelbarkeit',
    renewableContent: 'Anteil erneuerbarer Rohstoffe',
    sustainabilityScore: 'Nachhaltigkeitsbewertung',
    
    // Material Details
    materialDetails: 'Materialdetails',
    suppliers: 'Lieferanten',
    cost: 'Kosten',
    availability: 'Verfügbarkeit',
    pricePerKg: 'Preis pro kg',
    leadTime: 'Lieferzeit',
    days: 'Tage',
    
    // Language Selection
    language: 'Sprache',
    english: 'Englisch',
    swedish: 'Schwedisch',
    german: 'Deutsch',
    french: 'Französisch',
    amharic: 'Amharisch',
    
    // Additional UI elements
    materialRequirements: 'Materialanforderungen',
    lessFilters: 'Weniger Filter',
    moreFilters: 'Mehr Filter',
    min: 'Min',
    max: 'Max',
    preferredRegion: 'Bevorzugte Region',
    selectRegion: 'Region auswählen',
    selectElectricalType: 'Elektrischen Typ auswählen',
    electricalProperties: 'Elektrische Eigenschaften',
    prioritizeSustainability: 'Nachhaltigkeit priorisieren',
    findMaterials: 'Materialien finden',
    templates: 'Vorlagen',
    applicationTemplates: 'Anwendungsvorlagen',
    collapse: 'Einklappen',
    expand: 'Erweitern',
    
    // Regional Database
    exploreRegionalMaterials: 'Erkunden Sie Materialien und Lieferanten nach geografischen Regionen',
    regionStats: 'Regionstatistiken',
    avgReliability: 'Durchschnittliche Zuverlässigkeit',
    avgSustainability: 'Durchschnittliche Nachhaltigkeit',
    availableMaterials: 'Verfügbare Materialien',
    availableSuppliers: 'Verfügbare Lieferanten',
    selectCountry: 'Land auswählen',
    allCountries: 'Alle Länder',
    materials: 'Materialien',
    price: 'Preis',
    topApplications: 'Top-Anwendungen',
    reliable: 'Zuverlässig',
    sustainable: 'Nachhaltig',
    paymentTerms: 'Zahlung',
    minOrder: 'Mindestbestellung',
    website: 'Website',
    specialties: 'Spezialitäten',
    certifications: 'Zertifizierungen',
    noDataFound: 'Keine Daten gefunden',
    noMaterialsInRegion: 'Keine Materialien in der ausgewählten Region verfügbar',
    noSuppliersInRegion: 'Keine Lieferanten in der ausgewählten Region verfügbar',
  },
  
  fr: {
    // Header and App Info
    appTitle: 'MatOpt AI',
    appSubtitle: 'Optimisation de matériaux alimentée par IA pour les concepteurs de produits',
    
    // Navigation and Tabs
    overview: 'Aperçu',
    newMaterial: 'Nouveau matériau',
    aiRecommendations: 'Recommandations IA',
    mlEnhanced: 'Amélioré par ML',
    properties: 'Propriétés',
    sustainability: 'Durabilité',
    regionalDatabase: 'Base de données régionale',
    
    // Search and Filters
    searchMaterials: 'Rechercher des matériaux',
    searching: 'Recherche en cours...',
    getStarted: 'Commencer',
    setRequirements: 'Définissez vos exigences et recherchez des matériaux pour commencer à comparer les options.',
    applicationContext: 'Contexte d\'application',
    applicationContextPlaceholder: 'Décrivez votre application (ex. disque de frein automobile, composant aérospatial)',
    
    // Material Properties
    tensileStrength: 'Résistance à la traction',
    density: 'Densité',
    budget: 'Budget',
    operatingTemp: 'Température de fonctionnement',
    electricalType: 'Type électrique',
    electricalConductivity: 'Conductivité électrique',
    electricalResistivity: 'Résistivité électrique',
    dielectricStrength: 'Rigidité diélectrique',
    region: 'Région',
    
    // Electrical Types
    any: 'Tout',
    conductor: 'Conducteur',
    insulator: 'Isolant',
    semiconductor: 'Semi-conducteur',
    
    // Regions
    global: 'Mondial',
    northAmerica: 'Amérique du Nord',
    europe: 'Europe',
    asia: 'Asie',
    southAmerica: 'Amérique du Sud',
    africa: 'Afrique',
    oceania: 'Océanie',
    
    // Units
    mpa: 'MPa',
    gCm3: 'g/cm³',
    usdKg: 'USD/kg',
    celsius: '°C',
    msm: 'MS/m',
    microOhmCm: 'µΩ·cm',
    kvMm: 'kV/mm',
    
    // Material Categories
    metals: 'Métaux',
    polymers: 'Polymères',
    ceramics: 'Céramiques',
    composites: 'Composites',
    
    // UI Actions
    search: 'Rechercher',
    clear: 'Effacer',
    compare: 'Comparer',
    viewDetails: 'Voir les détails',
    viewComparison: 'Voir la comparaison',
    selectForComparison: 'Sélectionner pour comparaison',
    removeFromComparison: 'Retirer de la comparaison',
    
    // Feedback and Ratings
    helpful: 'Utile',
    notHelpful: 'Pas utile',
    rateRecommendation: 'Évaluer cette recommandation',
    
    // Analysis
    materialAnalysis: 'Analyse des matériaux',
    selectedForComparison: 'Sélectionnés pour comparaison',
    selectAnalysisType: 'Sélectionner le type d\'analyse',
    tradeoffAnalysis: 'Analyse des compromis',
    
    // Messages
    noMaterialsFound: 'Aucun matériau ne correspond à vos critères. Essayez d\'ajuster les filtres.',
    maxMaterialsSelected: 'Vous pouvez comparer jusqu\'à 4 matériaux à la fois',
    materialsFound: 'matériaux trouvés',
    optimizedFor: 'optimisé pour',
    
    // AI and ML
    aiInsight: 'Aperçu IA',
    mlPrediction: 'Prédiction ML',
    prediction: 'Prédiction',
    confidence: 'Confiance',
    
    // Sustainability
    carbonFootprint: 'Empreinte carbone',
    recyclability: 'Recyclabilité',
    renewableContent: 'Contenu renouvelable',
    sustainabilityScore: 'Score de durabilité',
    
    // Material Details
    materialDetails: 'Détails du matériau',
    suppliers: 'Fournisseurs',
    cost: 'Coût',
    availability: 'Disponibilité',
    pricePerKg: 'Prix par kg',
    leadTime: 'Délai de livraison',
    days: 'jours',
    
    // Language Selection
    language: 'Langue',
    english: 'Anglais',
    swedish: 'Suédois',
    german: 'Allemand',
    french: 'Français',
    amharic: 'Amharique',
    
    // Additional UI elements
    materialRequirements: 'Exigences matérielles',
    lessFilters: 'Moins de filtres',
    moreFilters: 'Plus de filtres',
    min: 'Min',
    max: 'Max',
    preferredRegion: 'Région préférée',
    selectRegion: 'Sélectionner une région',
    selectElectricalType: 'Sélectionner le type électrique',
    electricalProperties: 'Propriétés électriques',
    prioritizeSustainability: 'Prioriser la durabilité',
    findMaterials: 'Trouver des matériaux',
    templates: 'Modèles',
    applicationTemplates: 'Modèles d\'application',
    collapse: 'Réduire',
    expand: 'Développer',
    
    // Regional Database
    exploreRegionalMaterials: 'Explorer les matériaux et fournisseurs par région géographique',
    regionStats: 'Statistiques régionales',
    avgReliability: 'Fiabilité moyenne',
    avgSustainability: 'Durabilité moyenne',
    availableMaterials: 'Matériaux disponibles',
    availableSuppliers: 'Fournisseurs disponibles',
    selectCountry: 'Sélectionner un pays',
    allCountries: 'Tous les pays',
    materials: 'Matériaux',
    price: 'Prix',
    topApplications: 'Applications principales',
    reliable: 'Fiable',
    sustainable: 'Durable',
    paymentTerms: 'Paiement',
    minOrder: 'Commande min',
    website: 'Site web',
    specialties: 'Spécialités',
    certifications: 'Certifications',
    noDataFound: 'Aucune donnée trouvée',
    noMaterialsInRegion: 'Aucun matériau disponible dans la région sélectionnée',
    noSuppliersInRegion: 'Aucun fournisseur disponible dans la région sélectionnée',
  },

  am: {
    // Header and App Info
    appTitle: 'ማቴኦፕት AI',
    appSubtitle: 'AI የተጎላበተ የቁሳቁስ ማመቻቸት ለምርት ዲዛይነሮች',
    
    // Navigation and Tabs
    overview: 'አጠቃላይ እይታ',
    newMaterial: 'አዲስ ቁሳቁስ',
    aiRecommendations: 'AI ምክሮች',
    mlEnhanced: 'ML የተሻሻለ',
    properties: 'ባህሪዎች',
    sustainability: 'ዘላቂነት',
    regionalDatabase: 'ክልላዊ ዳታቤዝ',
    
    // Search and Filters
    searchMaterials: 'ቁሳቁሶችን ፈልግ',
    searching: 'በመፈለግ ላይ...',
    getStarted: 'ይጀምሩ',
    setRequirements: 'የእርስዎን መስፈርቶች ያስቀምጡ እና ቁሳቁሶችን በመፈለግ አማራጮችን ያወዳድሩ።',
    applicationContext: 'የመተግበሪያ አውድ',
    applicationContextPlaceholder: 'የእርስዎን መተግበሪያ ይግለጹ (ለምሳሌ የመኪና ብሬክ ዲስክ፣ የሰማይ ላይ ማመላለሻ ክፍል)',
    
    // Material Properties
    tensileStrength: 'የመሳብ ጥንካሬ',
    density: 'ጥግግት',
    budget: 'በጀት',
    operatingTemp: 'የሥራ ሙቀት',
    electricalType: 'የኤሌክትሪክ ዓይነት',
    electricalConductivity: 'የኤሌክትሪክ መተላለፊያ',
    electricalResistivity: 'የኤሌክትሪክ መቋቋሚያ',
    dielectricStrength: 'የዲኤሌክትሪክ ጥንካሬ',
    region: 'ክልል',
    
    // Electrical Types
    any: 'ማንኛውም',
    conductor: 'መተላለፊያ',
    insulator: 'መከላከያ',
    semiconductor: 'ሴሚ-መተላለፊያ',
    
    // Regions
    global: 'ዓለም አቀፍ',
    northAmerica: 'ሰሜን አሜሪካ',
    europe: 'ኤውሮፓ',
    asia: 'እስያ',
    southAmerica: 'ደቡብ አሜሪካ',
    africa: 'አፍሪካ',
    oceania: 'ኦሺያኒያ',
    
    // Units
    mpa: 'MPa',
    gCm3: 'g/cm³',
    usdKg: 'USD/kg',
    celsius: '°C',
    msm: 'MS/m',
    microOhmCm: 'µΩ·cm',
    kvMm: 'kV/mm',
    
    // Material Categories
    metals: 'ብረቶች',
    polymers: 'ፖሊመሮች',
    ceramics: 'ሴራሚኮች',
    composites: 'ድብልቅ ቁሳቁሶች',
    
    // UI Actions
    search: 'ፈልግ',
    clear: 'አጽዳ',
    compare: 'አወዳድር',
    viewDetails: 'ዝርዝሮች አሳይ',
    viewComparison: 'ማወዳደሪያ አሳይ',
    selectForComparison: 'ለማወዳደር ምረጥ',
    removeFromComparison: 'ከማወዳደሪያ አስወግድ',
    
    // Feedback and Ratings
    helpful: 'ጠቃሚ',
    notHelpful: 'ጠቃሚ አይደለም',
    rateRecommendation: 'ይህን ምክር ደረጃ ይስጡ',
    
    // Analysis
    materialAnalysis: 'የቁሳቁስ ትንተና',
    selectedForComparison: 'ለማወዳደር የተመረጡ',
    selectAnalysisType: 'የትንተና ዓይነት ምረጥ',
    tradeoffAnalysis: 'የትርፍ-ኪሳራ ትንተና',
    
    // Messages
    noMaterialsFound: 'ከእርስዎ መመዘኛዎች ጋር የሚመሳሰሉ ቁሳቁሶች አልተገኙም። ማጣሪያዎችን ማስተካከል ይሞክሩ።',
    maxMaterialsSelected: 'በአንድ ጊዜ እስከ 4 ቁሳቁሶች ማወዳደር ይችላሉ',
    materialsFound: 'ቁሳቁሶች ተገኙ',
    optimizedFor: 'የተመቻቸለ ለ',
    
    // AI and ML
    aiInsight: 'AI ግንዛቤ',
    mlPrediction: 'ML ትንቢት',
    prediction: 'ትንቢት',
    confidence: 'እምነት',
    
    // Sustainability
    carbonFootprint: 'የካርቦን አሻራ',
    recyclability: 'እንደገና ጥቅም ላይ የመዋል ችሎታ',
    renewableContent: 'ተደሰ ይዘት',
    sustainabilityScore: 'የዘላቂነት ነጥብ',
    
    // Material Details
    materialDetails: 'የቁሳቁስ ዝርዝሮች',
    suppliers: 'አቅራቢዎች',
    cost: 'ወጪ',
    availability: 'መገኘት',
    pricePerKg: 'በኪሎ ግራም ዋጋ',
    leadTime: 'የማድረስ ጊዜ',
    days: 'ቀናት',
    
    // Language Selection
    language: 'ቋንቋ',
    english: 'እንግሊዝኛ',
    swedish: 'ስዊድንኛ',
    german: 'ጀርመንኛ',
    french: 'ፈረንሳይኛ',
    amharic: 'አማርኛ',
    
    // Additional UI elements
    materialRequirements: 'የቁሳቁስ መስፈርቶች',
    lessFilters: 'ያነሰ ማጣሪያዎች',
    moreFilters: 'ተጨማሪ ማጣሪያዎች',
    min: 'ዝቅተኛ',
    max: 'ከፍተኛ',
    preferredRegion: 'የተመረጠ ክልል',
    selectRegion: 'ክልል ይምረጡ',
    selectElectricalType: 'የኤሌክትሪክ ዓይነት ይምረጡ',
    electricalProperties: 'የኤሌክትሪክ ባህሪዎች',
    prioritizeSustainability: 'ዘላቂነትን ቅድሚያ ይስጡ',
    findMaterials: 'ቁሳቁሶችን አግኝ',
    templates: 'ቅንብሮች',
    applicationTemplates: 'የመተግበሪያ ቅንብሮች',
    collapse: 'አሳንስ',
    expand: 'አስፋ',
    
    // Regional Database
    exploreRegionalMaterials: 'በጂኦግራፊያዊ ክልል ቁሳቁሶችን እና አቅራቢዎችን ያስሱ',
    regionStats: 'የክልል ስታትስቲክስ',
    avgReliability: 'አማካይ አስተማማኝነት',
    avgSustainability: 'አማካይ ዘላቂነት',
    availableMaterials: 'የሚገኙ ቁሳቁሶች',
    availableSuppliers: 'የሚገኙ አቅራቢዎች',
    selectCountry: 'ሀገር ይምረጡ',
    allCountries: 'ሁሉም ሀገሮች',
    materials: 'ቁሳቁሶች',
    price: 'ዋጋ',
    topApplications: 'ዋና መተግበሪያዎች',
    reliable: 'አስተማማኝ',
    sustainable: 'ዘላቂ',
    paymentTerms: 'የክፍያ ሁኔታ',
    minOrder: 'ዝቅተኛ ማዘዝ',
    website: 'ድረ-ገጽ',
    specialties: 'ልዩ ሙያዎች',
    certifications: 'የማረጋገጫ ሰነዶች',
    noDataFound: 'ምንም መረጃ አልተገኘም',
    noMaterialsInRegion: 'በተመረጠው ክልል ውስጥ ምንም ቁሳቁሶች የሉም',
    noSuppliersInRegion: 'በተመረጠው ክልል ውስጥ ምንም አቅራቢዎች የሉም',
  }
};