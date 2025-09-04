import { MaterialRequirements } from '../types/materials';

export interface ApplicationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: MaterialRequirements;
  icon: string;
}

export const applicationTemplates: ApplicationTemplate[] = [
  {
    id: 'bicycle-frame',
    name: 'Bicycle Frame',
    description: 'Mountain bike frame for extreme terrain',
    category: 'Sports Equipment',
    requirements: {
      applicationContext: 'Bicycle frame for mountain biking, needs to be lightweight yet strong enough for 200kg rider + gear load with repeated stress from jumps and rough terrain',
      tensileStrength: { min: 400, max: 1200 },
      density: { max: 8.0 },
      budget: { max: 15 },
      loadingConditions: 'cyclic',
      environment: 'outdoor',
      safetyFactor: 2.5,
      designLife: 10,
      maintenanceAccess: 'easy'
    },
    icon: '🚴'
  },
  {
    id: 'aerospace-panel',
    name: 'Aircraft Panel',
    description: 'Lightweight structural panel for commercial aircraft',
    category: 'Aerospace',
    requirements: {
      applicationContext: 'Aircraft fuselage panel requiring exceptional strength-to-weight ratio, fatigue resistance, and compliance with aviation safety standards',
      tensileStrength: { min: 600 },
      density: { max: 3.0 },
      budget: { max: 50 },
      operatingTemp: { min: -60, max: 80 },
      loadingConditions: 'cyclic',
      environment: 'outdoor',
      safetyFactor: 4.0,
      designLife: 30,
      maintenanceAccess: 'difficult'
    },
    icon: '✈️'
  },
  {
    id: 'medical-implant',
    name: 'Medical Implant',
    description: 'Biocompatible orthopedic implant',
    category: 'Medical',
    requirements: {
      applicationContext: 'Hip replacement implant requiring biocompatibility, corrosion resistance, and long-term durability in human body environment',
      tensileStrength: { min: 800 },
      density: { min: 4.0, max: 8.0 },
      budget: { max: 100 },
      operatingTemp: { min: 35, max: 42 },
      loadingConditions: 'dynamic',
      environment: 'chemical',
      safetyFactor: 6.0,
      designLife: 25,
      maintenanceAccess: 'none',
      sustainabilityPriority: true
    },
    icon: '🦴'
  },
  {
    id: 'automotive-engine',
    name: 'Engine Component',
    description: 'High-temperature automotive engine part',
    category: 'Automotive',
    requirements: {
      applicationContext: 'Engine connecting rod requiring high strength, thermal stability, and fatigue resistance under extreme temperature and stress cycles',
      tensileStrength: { min: 700 },
      density: { max: 8.5 },
      budget: { max: 25 },
      operatingTemp: { min: -40, max: 200 },
      loadingConditions: 'cyclic',
      environment: 'high-temp',
      safetyFactor: 3.0,
      designLife: 15,
      maintenanceAccess: 'difficult'
    },
    icon: '🚗'
  },
  {
    id: 'marine-propeller',
    name: 'Marine Propeller',
    description: 'Corrosion-resistant marine propeller',
    category: 'Marine',
    requirements: {
      applicationContext: 'Boat propeller operating in saltwater environment with high corrosion resistance and impact tolerance from debris',
      tensileStrength: { min: 500 },
      density: { max: 9.0 },
      budget: { max: 20 },
      operatingTemp: { min: 0, max: 60 },
      loadingConditions: 'dynamic',
      environment: 'marine',
      safetyFactor: 2.0,
      designLife: 10,
      maintenanceAccess: 'easy'
    },
    icon: '⚓'
  },
  {
    id: 'electronic-housing',
    name: 'Electronics Housing',
    description: 'EMI-shielding electronics enclosure',
    category: 'Electronics',
    requirements: {
      applicationContext: 'Electronics enclosure requiring electromagnetic shielding, thermal management, and protection from environmental factors',
      tensileStrength: { min: 200 },
      density: { max: 5.0 },
      budget: { max: 30 },
      operatingTemp: { min: -20, max: 85 },
      electricalType: 'conductor',
      electricalConductivity: { min: 10 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.5,
      designLife: 20,
      maintenanceAccess: 'easy'
    },
    icon: '📱'
  },
  {
    id: 'construction-beam',
    name: 'Structural Beam',
    description: 'Load-bearing construction beam',
    category: 'Construction',
    requirements: {
      applicationContext: 'Structural steel beam for commercial building requiring high load capacity, fire resistance, and long-term durability',
      tensileStrength: { min: 400 },
      density: { min: 7.0 },
      budget: { max: 5 },
      operatingTemp: { min: -30, max: 60 },
      loadingConditions: 'static',
      environment: 'outdoor',
      safetyFactor: 2.5,
      designLife: 50,
      maintenanceAccess: 'difficult',
      sustainabilityPriority: true
    },
    icon: '🏗️'
  },
  {
    id: 'pressure-vessel',
    name: 'Pressure Vessel',
    description: 'High-pressure chemical reactor',
    category: 'Chemical Processing',
    requirements: {
      applicationContext: 'Chemical reactor vessel operating under high pressure and temperature with aggressive chemical exposure',
      tensileStrength: { min: 600 },
      density: { max: 10.0 },
      budget: { max: 40 },
      operatingTemp: { min: 20, max: 300 },
      loadingConditions: 'static',
      environment: 'chemical',
      safetyFactor: 4.0,
      designLife: 20,
      maintenanceAccess: 'difficult'
    },
    icon: '⚗️'
  },
  {
    id: 'food-packaging-flexible',
    name: 'Flexible Food Packaging',
    description: 'Flexible pouch for snack foods',
    category: 'Food & Packaging',
    requirements: {
      applicationContext: 'Flexible packaging film for potato chips requiring moisture barrier, oxygen barrier, and food safety compliance',
      tensileStrength: { min: 20, max: 100 },
      density: { max: 2.0 },
      budget: { max: 8 },
      operatingTemp: { min: -20, max: 60 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.2,
      designLife: 2,
      maintenanceAccess: 'none',
      sustainabilityPriority: true
    },
    icon: '🥟'
  },
  {
    id: 'food-packaging-rigid',
    name: 'Rigid Food Container',
    description: 'Reusable food storage container',
    category: 'Food & Packaging',
    requirements: {
      applicationContext: 'Rigid food storage container for dairy products requiring chemical resistance, dishwasher safety, and FDA approval',
      tensileStrength: { min: 40, max: 200 },
      density: { max: 1.5 },
      budget: { max: 12 },
      operatingTemp: { min: -40, max: 120 },
      loadingConditions: 'impact',
      environment: 'chemical',
      safetyFactor: 1.5,
      designLife: 5,
      maintenanceAccess: 'easy',
      sustainabilityPriority: true
    },
    icon: '🥡'
  },
  {
    id: 'beverage-bottle',
    name: 'Beverage Bottle',
    description: 'Carbonated beverage container',
    category: 'Food & Packaging',
    requirements: {
      applicationContext: 'Beverage bottle for carbonated drinks requiring pressure resistance, clarity, and lightweight design',
      tensileStrength: { min: 50, max: 150 },
      density: { max: 1.4 },
      budget: { max: 5 },
      operatingTemp: { min: 2, max: 40 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 2.0,
      designLife: 1,
      maintenanceAccess: 'none',
      sustainabilityPriority: true
    },
    icon: '🍶'
  },
  {
    id: 'pharmaceutical-packaging',
    name: 'Pharmaceutical Blister Pack',
    description: 'Child-resistant medication packaging',
    category: 'Medical',
    requirements: {
      applicationContext: 'Pharmaceutical blister packaging requiring child resistance, moisture protection, and tamper evidence',
      tensileStrength: { min: 30, max: 120 },
      density: { max: 2.5 },
      budget: { max: 15 },
      operatingTemp: { min: 15, max: 30 },
      loadingConditions: 'impact',
      environment: 'indoor',
      safetyFactor: 2.5,
      designLife: 3,
      maintenanceAccess: 'none'
    },
    icon: '💊'
  },
  // House Utility Applications
  {
    id: 'plumbing-pipe',
    name: 'Plumbing Pipe',
    description: 'Residential water supply piping',
    category: 'House Utility',
    requirements: {
      applicationContext: 'Residential water supply pipe requiring chemical resistance to chlorinated water, pressure tolerance, and long-term reliability',
      tensileStrength: { min: 40, max: 200 },
      density: { max: 2.0 },
      budget: { max: 8 },
      operatingTemp: { min: 0, max: 80 },
      loadingConditions: 'static',
      environment: 'chemical',
      safetyFactor: 2.0,
      designLife: 50,
      maintenanceAccess: 'difficult',
      sustainabilityPriority: true
    },
    icon: '🔧'
  },
  {
    id: 'electrical-conduit',
    name: 'Electrical Conduit',
    description: 'House wiring protection conduit',
    category: 'House Utility',
    requirements: {
      applicationContext: 'Electrical conduit for house wiring requiring flame retardancy, electrical insulation, and mechanical protection',
      tensileStrength: { min: 30, max: 100 },
      density: { max: 2.5 },
      budget: { max: 6 },
      operatingTemp: { min: -20, max: 90 },
      electricalType: 'insulator',
      electricalResistivity: { min: 1000000 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 3.0,
      designLife: 30,
      maintenanceAccess: 'difficult'
    },
    icon: '⚡'
  },
  {
    id: 'hvac-duct',
    name: 'HVAC Ductwork',
    description: 'Air conditioning and heating ducts',
    category: 'House Utility',
    requirements: {
      applicationContext: 'HVAC ductwork for residential climate control requiring thermal insulation, corrosion resistance, and air sealing',
      tensileStrength: { min: 150, max: 400 },
      density: { max: 8.0 },
      budget: { max: 12 },
      operatingTemp: { min: -10, max: 150 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.5,
      designLife: 25,
      maintenanceAccess: 'easy'
    },
    icon: '🌬️'
  },
  {
    id: 'water-heater-tank',
    name: 'Water Heater Tank',
    description: 'Residential hot water storage tank',
    category: 'House Utility',
    requirements: {
      applicationContext: 'Water heater tank requiring pressure resistance, thermal cycling tolerance, and corrosion resistance in heated water environment',
      tensileStrength: { min: 300, max: 600 },
      density: { min: 7.0, max: 8.5 },
      budget: { max: 15 },
      operatingTemp: { min: 10, max: 80 },
      loadingConditions: 'cyclic',
      environment: 'chemical',
      safetyFactor: 3.0,
      designLife: 15,
      maintenanceAccess: 'easy'
    },
    icon: '🚿'
  },
  {
    id: 'gutter-system',
    name: 'Rain Gutter System',
    description: 'Exterior rainwater management',
    category: 'House Utility',
    requirements: {
      applicationContext: 'Rain gutter system requiring weather resistance, corrosion protection, and structural integrity under water loads',
      tensileStrength: { min: 200, max: 400 },
      density: { max: 8.0 },
      budget: { max: 10 },
      operatingTemp: { min: -30, max: 60 },
      loadingConditions: 'dynamic',
      environment: 'outdoor',
      safetyFactor: 2.0,
      designLife: 20,
      maintenanceAccess: 'easy',
      sustainabilityPriority: true
    },
    icon: '🏠'
  },
  {
    id: 'gas-line',
    name: 'Gas Line Piping',
    description: 'Natural gas distribution piping',
    category: 'House Utility',
    requirements: {
      applicationContext: 'Gas line piping for natural gas distribution requiring pressure resistance, leak detection compatibility, and safety compliance',
      tensileStrength: { min: 200, max: 500 },
      density: { max: 8.5 },
      budget: { max: 18 },
      operatingTemp: { min: -40, max: 80 },
      loadingConditions: 'static',
      environment: 'outdoor',
      safetyFactor: 4.0,
      designLife: 50,
      maintenanceAccess: 'difficult',
      sustainabilityPriority: true
    },
    icon: '🔥'
  },
  // Office Material Applications
  {
    id: 'office-desk',
    name: 'Office Desk Surface',
    description: 'Durable office workspace surface',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Office desk surface requiring scratch resistance, stain resistance, and ergonomic support for daily computer work',
      tensileStrength: { min: 50, max: 200 },
      density: { max: 3.0 },
      budget: { max: 20 },
      operatingTemp: { min: 15, max: 35 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.5,
      designLife: 15,
      maintenanceAccess: 'easy',
      sustainabilityPriority: true
    },
    icon: '🖥️'
  },
  {
    id: 'office-chair-frame',
    name: 'Office Chair Frame',
    description: 'Ergonomic office chair structure',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Office chair frame requiring fatigue resistance for repeated sitting/standing cycles and weight support up to 150kg',
      tensileStrength: { min: 300, max: 800 },
      density: { max: 8.0 },
      budget: { max: 25 },
      operatingTemp: { min: 15, max: 35 },
      loadingConditions: 'cyclic',
      environment: 'indoor',
      safetyFactor: 2.5,
      designLife: 10,
      maintenanceAccess: 'easy'
    },
    icon: '🪑'
  },
  {
    id: 'filing-cabinet',
    name: 'Filing Cabinet',
    description: 'Secure document storage cabinet',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Filing cabinet requiring security, fire resistance, and structural integrity for heavy document loads',
      tensileStrength: { min: 250, max: 500 },
      density: { min: 7.0, max: 8.5 },
      budget: { max: 18 },
      operatingTemp: { min: 15, max: 40 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 2.0,
      designLife: 20,
      maintenanceAccess: 'easy'
    },
    icon: '🗂️'
  },
  {
    id: 'whiteboard-surface',
    name: 'Whiteboard Surface',
    description: 'Dry-erase presentation surface',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Whiteboard surface requiring smooth writing surface, stain resistance, and easy erasability for daily marker use',
      tensileStrength: { min: 30, max: 100 },
      density: { max: 2.0 },
      budget: { max: 15 },
      operatingTemp: { min: 15, max: 35 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.2,
      designLife: 12,
      maintenanceAccess: 'easy'
    },
    icon: '📋'
  },
  {
    id: 'acoustic-panel',
    name: 'Acoustic Panel',
    description: 'Sound dampening office partition',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Acoustic panel for open office noise reduction requiring sound absorption, fire safety, and aesthetic appearance',
      tensileStrength: { min: 20, max: 80 },
      density: { max: 1.5 },
      budget: { max: 12 },
      operatingTemp: { min: 15, max: 35 },
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 1.5,
      designLife: 15,
      maintenanceAccess: 'easy',
      sustainabilityPriority: true
    },
    icon: '🔇'
  },
  {
    id: 'cable-management',
    name: 'Cable Management Tray',
    description: 'Under-desk cable organization system',
    category: 'Office Materials',
    requirements: {
      applicationContext: 'Cable management tray for organizing computer cables requiring flame retardancy, electrical safety, and easy access',
      tensileStrength: { min: 40, max: 150 },
      density: { max: 2.5 },
      budget: { max: 8 },
      operatingTemp: { min: 15, max: 40 },
      electricalType: 'insulator',
      loadingConditions: 'static',
      environment: 'indoor',
      safetyFactor: 2.0,
      designLife: 20,
      maintenanceAccess: 'easy'
    },
    icon: '🔌'
  }
];

export const getTemplatesByCategory = () => {
  const categories = applicationTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, ApplicationTemplate[]>);
  
  return categories;
};