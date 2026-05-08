/**
 * `replace` — copies `achilles-rupture.embedded.ts` over
 * `packages/catalogue/src/catalogue.ts` after you review the diff.
 */

import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const embeddedPath = join(__dirname, "achilles-rupture.embedded.ts");
const cataloguePath = join(
  repoRoot,
  "packages/catalogue/src/catalogue.ts",
);

function main() {
  if (!existsSync(embeddedPath)) {
    console.error(
      `Missing ${embeddedPath}. Run: pnpm --filter @thetis/dub-sync generate`,
    );
    process.exit(1);
  }
  copyFileSync(embeddedPath, cataloguePath);
  console.error(`Promoted ${embeddedPath} -> ${cataloguePath}`);
}

main();
