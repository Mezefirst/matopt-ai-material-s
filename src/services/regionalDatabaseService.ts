import { Material, Supplier } from '@/types/materials';
import { 
  getSuppliersByRegion, 
  getSuppliersByCountry, 
  getAllRegions, 
  getAllCountries 
} from '@/data/regionalSuppliers';
import { 
  getRegionalMaterialDatabase, 
  getGlobalMaterialDatabase 
} from '@/data/regionalMaterials';

/**
 * Service for managing region-specific material and supplier data
 */
export class RegionalDatabaseService {
  /**
   * Get materials available in a specific region
   */
  static getMaterialsByRegion(region: string): Material[] {
    if (region === 'global' || !region) {
      return getGlobalMaterialDatabase();
    }
    return getRegionalMaterialDatabase(region);
  }

  /**
   * Get suppliers available in a specific region
   */
  static getSuppliersByRegion(region: string): Supplier[] {
    return getSuppliersByRegion(region);
  }

  /**
   * Get suppliers available in a specific country
   */
  static getSuppliersByCountry(country: string): Supplier[] {
    return getSuppliersByCountry(country);
  }

  /**
   * Get all available regions
   */
  static getAllRegions(): string[] {
    return getAllRegions();
  }

  /**
   * Get all available countries
   */
  static getAllCountries(): string[] {
    return getAllCountries();
  }

  /**
   * Get materials that can be supplied by a specific supplier
   */
  static getMaterialsBySupplier(supplierName: string, region?: string): Material[] {
    const materials = region ? this.getMaterialsByRegion(region) : getGlobalMaterialDatabase();
    
    return materials.filter(material => 
      material.suppliers.some(supplier => 
        supplier.name.toLowerCase().includes(supplierName.toLowerCase())
      )
    );
  }

  /**
   * Find suppliers that can provide a specific material type
   */
  static getSuppliersByMaterialType(materialType: string, region?: string): Supplier[] {
    const suppliers = region ? this.getSuppliersByRegion(region) : this.getSuppliersByRegion('global');
    
    return suppliers.filter(supplier => {
      const specialties = supplier.specialties.join(' ').toLowerCase();
      const type = materialType.toLowerCase();
      
      // Check if supplier specializes in this material type
      if (type.includes('steel') && specialties.includes('steel')) return true;
      if (type.includes('aluminum') && specialties.includes('aluminum')) return true;
      if (type.includes('plastic') || type.includes('polymer')) {
        return specialties.includes('plastic') || specialties.includes('polymer');
      }
      if (type.includes('ceramic') && specialties.includes('ceramic')) return true;
      if (type.includes('composite') && 
          (specialties.includes('composite') || specialties.includes('carbon fiber'))) return true;
      
      return false;
    });
  }

  /**
   * Get regional pricing analysis for a material
   */
  static getRegionalPricingAnalysis(materialId: string): {
    region: string;
    price: number;
    currency: string;
    supplierCount: number;
    avgLeadTime: number;
    avgReliability: number;
  }[] {
    const regions = this.getAllRegions();
    const analysis: any[] = [];

    regions.forEach(region => {
      const materials = this.getMaterialsByRegion(region);
      const material = materials.find(m => m.id === materialId);
      
      if (material && material.suppliers.length > 0) {
        const avgLeadTime = material.suppliers.reduce((sum, s) => sum + s.leadTime, 0) / material.suppliers.length;
        const avgReliability = material.suppliers.reduce((sum, s) => sum + s.reliability, 0) / material.suppliers.length;
        
        analysis.push({
          region,
          price: material.cost.pricePerKg,
          currency: material.cost.currency,
          supplierCount: material.suppliers.length,
          avgLeadTime: Math.round(avgLeadTime),
          avgReliability: Math.round(avgReliability)
        });
      }
    });

    return analysis.sort((a, b) => a.price - b.price);
  }

  /**
   * Get sustainability comparison across regions
   */
  static getRegionalSustainabilityAnalysis(): {
    region: string;
    avgSustainabilityScore: number;
    topSustainableMaterials: number;
    recyclingCapability: number;
  }[] {
    const regions = this.getAllRegions();
    const analysis: any[] = [];

    regions.forEach(region => {
      const materials = this.getMaterialsByRegion(region);
      
      if (materials.length > 0) {
        const avgSustainability = materials.reduce((sum, m) => sum + m.sustainability.sustainabilityScore, 0) / materials.length;
        const topSustainableMaterials = materials.filter(m => m.sustainability.sustainabilityScore >= 80).length;
        const avgRecyclability = materials.reduce((sum, m) => sum + m.sustainability.recyclability, 0) / materials.length;
        
        analysis.push({
          region,
          avgSustainabilityScore: Math.round(avgSustainability),
          topSustainableMaterials,
          recyclingCapability: Math.round(avgRecyclability)
        });
      }
    });

    return analysis.sort((a, b) => b.avgSustainabilityScore - a.avgSustainabilityScore);
  }

  /**
   * Search materials and suppliers across regions
   */
  static searchGlobal(query: string): {
    materials: Material[];
    suppliers: Supplier[];
  } {
    const allMaterials = getGlobalMaterialDatabase();
    const allSuppliers = this.getSuppliersByRegion('global');
    
    const searchTerm = query.toLowerCase();
    
    const materials = allMaterials.filter(material => 
      material.name.toLowerCase().includes(searchTerm) ||
      material.category.toLowerCase().includes(searchTerm) ||
      material.type.toLowerCase().includes(searchTerm) ||
      material.applications.some(app => app.toLowerCase().includes(searchTerm))
    );

    const suppliers = allSuppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm) ||
      supplier.country.toLowerCase().includes(searchTerm) ||
      supplier.region.toLowerCase().includes(searchTerm) ||
      supplier.specialties.some(spec => spec.toLowerCase().includes(searchTerm))
    );

    return { materials, suppliers };
  }

  /**
   * Get material availability by region for a specific material
   */
  static getMaterialAvailabilityByRegion(materialId: string): {
    region: string;
    available: boolean;
    suppliers: Supplier[];
    price: number;
    leadTime: number;
  }[] {
    const regions = this.getAllRegions();
    const availability: any[] = [];

    regions.forEach(region => {
      const materials = this.getMaterialsByRegion(region);
      const material = materials.find(m => m.id === materialId);
      
      if (material) {
        const avgLeadTime = material.suppliers.length > 0 
          ? material.suppliers.reduce((sum, s) => sum + s.leadTime, 0) / material.suppliers.length
          : 0;

        availability.push({
          region,
          available: material.suppliers.length > 0,
          suppliers: material.suppliers,
          price: material.cost.pricePerKg,
          leadTime: Math.round(avgLeadTime)
        });
      } else {
        availability.push({
          region,
          available: false,
          suppliers: [],
          price: 0,
          leadTime: 0
        });
      }
    });

    return availability;
  }
}