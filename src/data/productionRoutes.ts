export type ProductionRoute = {id:string;label:string;sectors:string[]};

export const productionRoutes: ProductionRoute[] = [
  {id:"A",label:"Grey clinker / cement",sectors:["Cement"]},
  {id:"B",label:"White clinker / cement",sectors:["Cement"]},
  {id:"C",label:"Carbon steel — BF/BOF",sectors:["Iron & Steel"]},
  {id:"D",label:"Carbon steel — DRI/EAF",sectors:["Iron & Steel"]},
  {id:"E",label:"Carbon steel — Scrap/EAF",sectors:["Iron & Steel"]},
  {id:"F",label:"Low alloy steel — BF/BOF",sectors:["Iron & Steel"]},
  {id:"G",label:"Low alloy steel — DRI/EAF",sectors:["Iron & Steel"]},
  {id:"H",label:"Low alloy steel — Scrap/EAF",sectors:["Iron & Steel"]},
  {id:"J",label:"High alloy steel — EAF",sectors:["Iron & Steel"]},
  {id:"K",label:"Primary aluminium",sectors:["Aluminium"]},
  {id:"L",label:"Secondary aluminium",sectors:["Aluminium"]}
];

export function routesForSector(sector:string){
  return productionRoutes.filter(route=>route.sectors.includes(sector));
}
