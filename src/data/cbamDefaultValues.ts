export type CBAMDefaultValueRecord = {
  id: string;
  cnCode: string;
  sector: string;
  countryOrTerritory: string;
  productionRoute?: string;
  directEmissions?: number;
  indirectEmissions?: number;
  totalEmissions?: number;
  unit: "tCO2e/t";
  sourceRegulation: string;
  sourceVersion: string;
  sourceRow?: string;
  effectiveFrom: string;
  effectiveTo?: string;
  validationStatus: "pending" | "validated" | "superseded";
  validatedAt?: string;
  notes?: string;
  importedFrom: "EU legal annex" | "Commission XLSX";
  legalValueVerified: boolean;
};

/**
 * Regulatory numeric data is intentionally empty until each official
 * corrected definitive-period source row is imported and validated.
 */
export const cbamDefaultValues: CBAMDefaultValueRecord[] = [
  {id:"AL-2523100090-A",cnCode:"2523100090",sector:"Cement",countryOrTerritory:"Albania",productionRoute:"A",directEmissions:0.870,indirectEmissions:0,totalEmissions:0.870,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 2523100090 · Other clinker including grey clinker",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-25232900",cnCode:"25232900",sector:"Cement",countryOrTerritory:"Albania",directEmissions:0.900,indirectEmissions:0.030,totalEmissions:0.930,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 25232900 · Grey Portland cement",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true}
];

export const defaultValueDatasetMeta = {
  dataset: "CBAM definitive-period default values",
  period: "2026",
  legalBasis: "Implementing Regulation (EU) 2025/2621",
  correction: "Implementing Regulation (EU) 2026/1740",
  status: "official source mapped / numeric row import pending",
  lastReviewed: "2026-09-22"
} as const;

export function findDefaultValues(input:{
  cnCode?:string;
  sector?:string;
  countryOrTerritory?:string;
  productionRoute?:string;
}){
  const code=(input.cnCode||"").replace(/\D/g,"");
  return cbamDefaultValues.filter(row=>{
    if(code && !(code.startsWith(row.cnCode)||row.cnCode.startsWith(code))) return false;
    if(input.sector && row.sector!==input.sector) return false;
    if(input.countryOrTerritory && row.countryOrTerritory!==input.countryOrTerritory) return false;
    if(input.productionRoute && row.productionRoute!==input.productionRoute) return false;
    return true;
  });
}


export function datasetQuality(){
  const validated=cbamDefaultValues.filter(row=>row.validationStatus==="validated"&&row.legalValueVerified).length;
  const pending=cbamDefaultValues.filter(row=>row.validationStatus==="pending").length;
  return {rows:cbamDefaultValues.length,validated,pending};
}
