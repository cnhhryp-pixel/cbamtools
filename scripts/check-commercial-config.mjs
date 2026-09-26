import fs from "node:fs";
import path from "node:path";

const root=path.resolve("src");
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
console.log("Commercial config check passed: no legacy $9.90 price remains.");
