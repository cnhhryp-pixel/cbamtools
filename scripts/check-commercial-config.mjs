import fs from "node:fs";
import path from "node:path";

const root=path.resolve("src");
const expectedLink="https://www.paypal.com/ncp/payment/TF5AJT28VAYSL";

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const full=path.join(dir,entry.name);
    return entry.isDirectory()?walk(full):[full];
  });
}

const files=walk(root).filter(file=>/\.(ts|tsx|js|jsx)$/.test(file));
const legacy=[];
for(const file of files){
  const content=fs.readFileSync(file,"utf8");
  if(content.includes("$9.90")||content.includes("9.90 USD")) legacy.push(path.relative(process.cwd(),file));
}
if(legacy.length){
  console.error("Legacy Professional Report price found:");
  for(const file of legacy) console.error("- "+file);
  process.exit(1);
}

const commercial=fs.readFileSync(path.resolve("src/lib/commercial.ts"),"utf8");
if(!commercial.includes('PROFESSIONAL_REPORT_PRICE_EUR = 49')){
  console.error("Commercial config does not contain the €49 report price.");
  process.exit(1);
}
if(!commercial.includes(expectedLink)){
  console.error("Commercial config does not contain the approved PayPal Payment Link.");
  process.exit(1);
}

console.log("Commercial config check passed: €49 price and PayPal Payment Link are configured.");
