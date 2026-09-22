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
  {id:"AL-2523100090-A",cnCode:"2523100090",sector:"Cement",countryOrTerritory:"Albania",productionRoute:"A",directEmissions:0.870,indirectEmissions:0.000,totalEmissions:0.870,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 2523100090 · Other clinker including grey clinker",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-25232900",cnCode:"25232900",sector:"Cement",countryOrTerritory:"Albania",directEmissions:0.900,indirectEmissions:0.030,totalEmissions:0.930,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 25232900 · Grey Portland cement",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-2523900090-A",cnCode:"2523900090",sector:"Cement",countryOrTerritory:"Albania",productionRoute:"A",directEmissions:0.860,indirectEmissions:0.030,totalEmissions:0.890,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 2523900090 · Other hydraulic cements including grey hydraulic cements",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-28080000",cnCode:"28080000",sector:"Fertilisers",countryOrTerritory:"Albania",directEmissions:2.730,indirectEmissions:0.040,totalEmissions:2.760,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 28080000 · Nitric acid; sulphonitric acids",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-28142000",cnCode:"28142000",sector:"Fertilisers",countryOrTerritory:"Albania",directEmissions:0.650,indirectEmissions:0.030,totalEmissions:0.680,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 28142000 · Ammonia in aqueous solution",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-28342100",cnCode:"28342100",sector:"Fertilisers",countryOrTerritory:"Albania",directEmissions:2.190,indirectEmissions:0.050,totalEmissions:2.240,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 28342100 · Nitrate of potassium",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true},
  {id:"AL-31021012",cnCode:"31021012",sector:"Fertilisers",countryOrTerritory:"Albania",directEmissions:0.440,indirectEmissions:0.030,totalEmissions:0.470,unit:"tCO2e/t",sourceRegulation:"Implementing Regulation (EU) 2026/1740",sourceVersion:"Annex I corrected definitive-period values",sourceRow:"Albania · 31021012 · Urea in aqueous solution",effectiveFrom:"2026-01-01",validationStatus:"validated",validatedAt:"2026-09-22",importedFrom:"EU legal annex",legalValueVerified:true}
];

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
  status: "official legal rows importing / verified subset live",
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
