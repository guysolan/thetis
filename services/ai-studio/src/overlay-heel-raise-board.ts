import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../output");
const src = path.join(
    outputDir,
    "achilles-heel-raise-strength-linkedin-mike-doc-v5.png",
);
const dest = path.join(
    outputDir,
    "achilles-heel-raise-strength-linkedin-mike-doc-v6.png",
);

const fontPath = "C:/Windows/Fonts/arialbd.ttf";
const svg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: "BoardSans";
        src: url("file:///${fontPath}");
      }
    </style>
  </defs>
  <rect x="78" y="272" width="318" height="278" fill="#ffffff"/>
  <text x="237" y="350" text-anchor="middle" font-family="BoardSans" font-size="48" fill="#111111">DOUBLE-LEG</text>
  <text x="237" y="418" text-anchor="middle" font-family="BoardSans" font-size="48" fill="#111111">SINGLE-LEG</text>
  <text x="237" y="486" text-anchor="middle" font-family="BoardSans" font-size="48" fill="#111111">WALK / RUN</text>
</svg>`;

await sharp(src)
    .png()
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .toFile(dest);

console.log(`wrote ${dest}`);
