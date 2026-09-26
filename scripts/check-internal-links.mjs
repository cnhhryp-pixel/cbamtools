import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");

if (!fs.existsSync(root)) {
  console.error("Static export directory not found:", root);
  process.exit(1);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const hrefPattern = /href=(?:"([^"]+)"|'([^']+)')/g;
const broken = [];
const checked = new Set();

function targetExists(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return fs.existsSync(path.join(root, "index.html"));

  const relative = decodeURIComponent(clean.replace(/^\//, ""));
  const candidates = [
    path.join(root, relative),
    path.join(root, relative, "index.html"),
    path.join(root, relative + ".html")
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  let match;
  while ((match = hrefPattern.exec(html))) {
    const href = match[1] || match[2] || "";
    if (
      !href.startsWith("/") ||
      href.startsWith("//") ||
      href.startsWith("/_next/") ||
      href.startsWith("/api/")
    ) continue;

    const key = `${file}::${href}`;
    if (checked.has(key)) continue;
    checked.add(key);

    if (!targetExists(href)) {
      broken.push({
        page: path.relative(root, file),
        href
      });
    }
  }
}

if (broken.length) {
  console.error("\nBroken internal links found:");
  for (const item of broken) {
    console.error(`- ${item.page} -> ${item.href}`);
  }
  process.exit(1);
}

console.log(`Internal link check passed: ${htmlFiles.length} HTML files scanned, ${checked.size} internal links checked.`);
