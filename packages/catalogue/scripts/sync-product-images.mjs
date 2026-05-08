import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const srcCandidates = [join(pkgRoot, "assets/product-images"), join(pkgRoot, "assets")];
const srcDirs = srcCandidates.filter((candidate) => existsSync(candidate));
const targets = [
  join(pkgRoot, "../../apps/website/public/images/catalogue-products"),
  join(pkgRoot, "../../apps/achilles-rupture/public/images/catalogue-products"),
  join(pkgRoot, "../../apps/course/public/images/catalogue-products"),
];

if (srcDirs.length === 0) {
  console.warn(
    `[sync-product-images] Source folder not found, skipping copy: ${srcCandidates.join(", ")}`,
  );
} else {
  for (const src of srcDirs) {
    for (const dest of targets) {
      mkdirSync(dest, { recursive: true });
      cpSync(src, dest, { recursive: true });
    }
  }
}
