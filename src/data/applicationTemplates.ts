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