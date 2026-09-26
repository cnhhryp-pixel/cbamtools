import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("src");
const paypalEmail = "cnhhryp@gmail.com";
const supportEmail = "sales@cbamtools.com";
const allowedPaypalFile = path.normalize("src/components/PayPalCheckoutCard.tsx");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(sourceRoot).filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));
const violations = [];
let supportCount = 0;
let paypalCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const rel = path.normalize(path.relative(process.cwd(), file));
  const supportMatches = content.split(supportEmail).length - 1;
  const paypalMatches = content.split(paypalEmail).length - 1;

  supportCount += supportMatches;
  paypalCount += paypalMatches;

  if (paypalMatches > 0 && rel !== allowedPaypalFile) {
    violations.push(rel + ": PayPal account email appears outside the checkout payment recipient.");
  }
}

if (supportCount === 0) {
  violations.push("Support email was not found in source files.");
}

if (paypalCount !== 1) {
  violations.push("Expected the PayPal account email exactly once, found " + paypalCount + ".");
}

if (violations.length) {
  console.error("Contact email validation failed:");
  for (const violation of violations) console.error("- " + violation);
  process.exit(1);
}

console.log("Contact email check passed: public support=" + supportEmail + ", PayPal recipient kept separate.");
