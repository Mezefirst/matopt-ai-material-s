# House Utility Templates Testing Guide

## Overview

MatOpt AI now includes comprehensive house utility templates for plumbing pipes and HVAC ductwork, along with office materials. This document outlines the testing approach and demonstrates the functionality.

## Available House Utility Templates

### 🔧 Plumbing Pipes
- **Application**: Residential water supply piping
- **Key Requirements**: 
  - Tensile Strength: 40-200 MPa
  - Density: ≤ 2.0 g/cm³
  - Budget: ≤ $8/kg
  - Temperature Range: 0-80°C
  - Chemical resistance for chlorinated water
  - 50-year design life

### 🌬️ HVAC Ductwork
- **Application**: Air conditioning and heating ducts
- **Key Requirements**:
  - Tensile Strength: 150-400 MPa
  - Density: ≤ 8.0 g/cm³
  - Budget: ≤ $12/kg
  - Temperature Range: -10 to 150°C
  - Indoor environment
  - 25-year design life

### ⚡ Electrical Conduit
- **Application**: House wiring protection
- **Key Requirements**:
  - Tensile Strength: 30-100 MPa
  - Density: ≤ 2.5 g/cm³
  - Budget: ≤ $6/kg
  - Electrical insulation properties
  - Flame retardancy
  - 30-year design life

### 🚿 Water Heater Tank
- **Application**: Hot water storage
- **Key Requirements**:
  - Tensile Strength: 300-600 MPa
  - Density: 7.0-8.5 g/cm³
  - Budget: ≤ $15/kg
  - Temperature Range: 10-80°C
  - Cyclic loading resistance
  - 15-year design life

### 🏠 Rain Gutter System
- **Application**: Exterior rainwater management
- **Key Requirements**:
  - Tensile Strength: 200-400 MPa
  - Density: ≤ 8.0 g/cm³
  - Budget: ≤ $10/kg
  - Weather resistance
  - Outdoor environment
  - 20-year design life

### 🔥 Gas Line Piping
- **Application**: Natural gas distribution
- **Key Requirements**:
  - Tensile Strength: 200-500 MPa
  - Density: ≤ 8.5 g/cm³
  - Budget: ≤ $18/kg
  - High safety factor (4.0x)
  - Outdoor environment
  - 50-year design life

## Material Database Enhancements

### New Materials Added for House Utilities

1. **PVC (Polyvinyl Chloride)**
   - Ideal for: Cold water plumbing, electrical conduit
   - Properties: Low cost, chemical resistance, easy installation
   - Limitations: Temperature restrictions, UV sensitivity

2. **CPVC (Chlorinated Polyvinyl Chloride)**
   - Ideal for: Hot water systems, industrial piping
   - Properties: Higher temperature tolerance, chemical resistance
   - Limitations: Higher cost, brittle at low temperatures

3. **PEX (Cross-linked Polyethylene)**
   - Ideal for: Flexible plumbing, radiant heating
   - Properties: Flexible, freeze resistant, easy installation
   - Limitations: UV sensitive, requires special fittings

4. **Copper C110**
   - Ideal for: Premium plumbing, heat exchangers
   - Properties: Antimicrobial, excellent heat transfer, durable
   - Limitations: Higher cost, potential for acidic corrosion

5. **Galvanized Steel**
   - Ideal for: HVAC ductwork, structural applications
   - Properties: Strong, corrosion protection, cost effective
   - Limitations: Heavy, limited coating life

## Testing Methods

### 1. Interactive Web Demo
- **File**: `test-house-utilities.html`
- **Features**: 
  - Click-to-test templates
  - Real-time material filtering
  - Scoring algorithm demonstration
  - Visual results with pros/cons

### 2. Programmatic Testing
- **File**: `src/test-house-utilities.js`
- **Features**:
  - Automated template testing
  - Material filtering verification
  - Scenario-based testing
  - Comprehensive reporting

### 3. Application Integration
- **Enhanced ApplicationContext component**
- **Visual template selection with icons**
- **Context-aware help and suggestions**
- **Quick application type selection**

## How to Test

### Method 1: Interactive Web Demo
1. Open `test-house-utilities.html` in a web browser
2. Click on any house utility template card
3. View filtered and scored materials
4. See real-time pros/cons analysis

### Method 2: In Application
1. Start the MatOpt AI application
2. In the Application Context section, click "Templates"
3. Browse the "House Utility" category
4. Apply any template to see material filtering
5. Switch between analysis tabs to explore results

### Method 3: Quick Selection
1. In the Application Context section
2. Use the quick selection grid for house utilities
3. Click on any utility icon (🔧 🌬️ ⚡ 🚿 🏠 🔥)
4. See immediate context-aware requirements

## Expected Results

### For Plumbing Applications:
- **Top Recommendations**: PEX, CPVC, Copper
- **Reasoning**: Balance of cost, temperature tolerance, installation ease
- **Trade-offs**: Cost vs. durability vs. installation complexity

### For HVAC Applications:
- **Top Recommendations**: Galvanized Steel, Stainless Steel
- **Reasoning**: Structural strength, temperature range, cost effectiveness
- **Trade-offs**: Weight vs. corrosion resistance vs. cost

### For Electrical Applications:
- **Top Recommendations**: PVC, ABS
- **Reasoning**: Electrical insulation, flame retardancy, cost
- **Trade-offs**: Temperature range vs. cost vs. installation flexibility

## Context-Aware Features

### Dynamic Help Text
The application provides context-specific guidance based on the selected application:

- **Plumbing**: Suggests static/cyclic loading, chemical environment
- **HVAC**: Recommends temperature considerations, indoor environment
- **Electrical**: Emphasizes insulation requirements, safety factors

### Design Life Suggestions
- **Plumbing**: 20-50 years
- **HVAC**: 25 years  
- **Electrical**: 30 years
- **Water Heater**: 15 years

### Safety Factor Recommendations
- **General Utility**: 2.0-3.0x
- **Gas Lines**: 4.0x (higher for safety)
- **Electrical**: 3.0x (safety critical)

## Validation Checklist

- ✅ Templates load correctly
- ✅ Material filtering works for each utility type
- ✅ Scoring algorithms prioritize appropriate materials
- ✅ Context-aware help displays correctly
- ✅ Quick selection updates requirements
- ✅ Regional material databases include utility materials
- ✅ Cost and availability data is realistic
- ✅ Trade-off analysis highlights key considerations

## Conclusion

The house utility templates successfully demonstrate:

1. **Practical Application**: Real-world utility scenarios
2. **Material Diversity**: Range from polymers to metals
3. **Intelligent Filtering**: Context-aware material selection
4. **User Guidance**: Clear recommendations and trade-offs
5. **Professional Integration**: Enterprise-ready functionality

The system effectively helps users select optimal materials for residential and commercial utility applications, balancing performance, cost, and installation requirements.