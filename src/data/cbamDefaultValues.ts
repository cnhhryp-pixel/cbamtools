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
export const cbamDefaultValues: CBAMDefaultValueRecord[] = [];

export const defaultValueRules = {
  totalEmissionsColumnIsBindingInput: true,
  markups: {2026:{standard:0.10,fertiliser:0.01},2027:{standard:0.20,fertiliser:0.01},2028:{standard:0.30,fertiliser:0.01}},
  fallbackCountryTable: "Other countries and territories",
  productionRouteIndependentWhenMissing: true,
  electricityHandledSeparately: true
} as const;

export function definitiveDefaultValue(totalEmissions:number,sector:string,year=2026){
  const y=year>=2028?2028:(year===2027?2027:2026);
  const rate=sector==="Fertilisers"?defaultValueRules.markups[y].fertiliser:defaultValueRules.markups[y].standard;
  return totalEmissions*(1+rate);
}


export const defaultValueDatasetMeta = {
  dataset: "CBAM definitive-period default values",
  period: "2026",
  legalBasis: "Implementing Regulation (EU) 2025/2621",
  correction: "Implementing Regulation (EU) 2026/1740",
  status: "official source mapped / legal-row verification required",
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
