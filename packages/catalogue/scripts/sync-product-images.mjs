import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const src = join(pkgRoot, "assets/product-images");
const targets = [
  join(pkgRoot, "../../apps/website/public/images/catalogue-products"),
  join(pkgRoot, "../../apps/achilles-rupture/public/images/catalogue-products"),
];

for (const dest of targets) {
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
}
