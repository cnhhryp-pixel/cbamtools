export type CBAMCodeRule = {
  prefix: string;
  sector: string;
  product: string;
  gas: string;
  status: "covered" | "detail";
  defaultValueKey?: string;
  benchmarkKey?: string;
  routeRequired?: boolean;
};

export const cbamCodeRules: CBAMCodeRule[] = [
  {prefix:"25070080",sector:"Cement",product:"Other kaolinic clays — coverage requires the applicable product detail",gas:"CO₂",status:"detail"},
  {prefix:"2523",sector:"Cement",product:"Cement clinkers / Portland and other hydraulic cements",gas:"CO₂",status:"covered"},
  {prefix:"27160000",sector:"Electricity",product:"Electrical energy",gas:"CO₂",status:"covered"},
  {prefix:"28041000",sector:"Hydrogen",product:"Hydrogen",gas:"CO₂",status:"covered"},
  {prefix:"28080000",sector:"Fertilisers",product:"Nitric acid; sulphonitric acids",gas:"CO₂ + N₂O",status:"covered"},
  {prefix:"2814",sector:"Fertilisers",product:"Ammonia, anhydrous or in aqueous solution",gas:"CO₂",status:"covered"},
  {prefix:"28342100",sector:"Fertilisers",product:"Nitrates of potassium",gas:"CO₂ + N₂O",status:"covered"},
  {prefix:"3102",sector:"Fertilisers",product:"Mineral or chemical fertilisers, nitrogenous",gas:"CO₂ + N₂O",status:"covered"},
  {prefix:"3105",sector:"Fertilisers",product:"Selected mineral or chemical fertilisers",gas:"CO₂ + N₂O",status:"detail"},
  {prefix:"72",sector:"Iron & Steel",product:"Iron and steel — Annex I contains exclusions; use a more specific CN code",gas:"CO₂",status:"detail"},
  {prefix:"7301",sector:"Iron & Steel",product:"Sheet piling; welded angles, shapes and sections",gas:"CO₂",status:"covered"},
  {prefix:"7302",sector:"Iron & Steel",product:"Railway or tramway track construction material",gas:"CO₂",status:"covered"},
  {prefix:"7303",sector:"Iron & Steel",product:"Tubes, pipes and hollow profiles, of cast iron",gas:"CO₂",status:"covered"},
  {prefix:"7304",sector:"Iron & Steel",product:"Tubes, pipes and hollow profiles, seamless, of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7305",sector:"Iron & Steel",product:"Other tubes and pipes of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7306",sector:"Iron & Steel",product:"Other tubes, pipes and hollow profiles of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7307",sector:"Iron & Steel",product:"Tube or pipe fittings of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7308",sector:"Iron & Steel",product:"Structures and parts of structures, of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7309",sector:"Iron & Steel",product:"Reservoirs, tanks and similar containers of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7310",sector:"Iron & Steel",product:"Tanks, drums, cans and similar containers of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7311",sector:"Iron & Steel",product:"Containers for compressed or liquefied gas, of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7318",sector:"Iron & Steel",product:"Screws, bolts, nuts, washers and similar articles of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7326",sector:"Iron & Steel",product:"Other articles of iron or steel",gas:"CO₂",status:"covered"},
  {prefix:"7601",sector:"Aluminium",product:"Unwrought aluminium",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7603",sector:"Aluminium",product:"Aluminium powders and flakes",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7604",sector:"Aluminium",product:"Aluminium bars, rods and profiles",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7605",sector:"Aluminium",product:"Aluminium wire",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7606",sector:"Aluminium",product:"Aluminium plates, sheets and strip",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7607",sector:"Aluminium",product:"Aluminium foil",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7608",sector:"Aluminium",product:"Aluminium tubes and pipes",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"76090000",sector:"Aluminium",product:"Aluminium tube or pipe fittings",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7610",sector:"Aluminium",product:"Aluminium structures and parts of structures",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"76110000",sector:"Aluminium",product:"Aluminium reservoirs, tanks and vats over 300 litres",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7612",sector:"Aluminium",product:"Aluminium casks, drums, cans, boxes and similar containers",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"76130000",sector:"Aluminium",product:"Aluminium containers for compressed or liquefied gas",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7614",sector:"Aluminium",product:"Stranded wire, cables and similar aluminium articles",gas:"CO₂ + PFCs",status:"covered"},
  {prefix:"7616",sector:"Aluminium",product:"Other articles of aluminium",gas:"CO₂ + PFCs",status:"covered"}
];

export const cbamExcludedCodes = [
  "72022","72023000","72025000","72027000","72028000","72029100",
  "72029200","72029300","720299","7204","31056000"
];


export type CBAMAssessmentKey = {
  code: string;
  sector: string;
  country?: string;
  productionRoute?: string;
};

export function buildAssessmentKey(rule: CBAMCodeRule, country = "", productionRoute = ""): CBAMAssessmentKey {
  return {code: rule.prefix, sector: rule.sector, country, productionRoute};
}

export const cbamDataModel = {
  version: "2026-definitive",
  dimensions: ["CN/TARIC code", "sector", "country/territory", "production route"],
  futureFields: ["default value", "benchmark/free-allocation input", "source regulation", "source row", "effective period"],
  note: "Numeric regulatory fields remain empty until the official corrected source rows are imported and validated."
} as const;
