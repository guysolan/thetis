import fs from "fs";
import path from "path";
import sharp from "sharp";

const baseImagePath = path.join(
    process.cwd(),
    "output",
    "review-graphic-josh-better-rest-v4-name-fixed.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "review-graphic-mark-night-splint-first-night-v7-josh-style.png",
);

const quote =
    "Good morning after my first (and much better) night’s sleep with your Night Splint product… I’m glad I tried it. I hope it makes the long Achilles rupture repair journey easier.";

const name = "Mark";
const subtitle = "Achilles Rupture Recovery Patient";

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxChars: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;

        if (candidate.length > maxChars && current) {
            lines.push(current);
            current = word;
        } else {
            current = candidate;
        }
    }

    if (current) {
        lines.push(current);
    }

    return lines;
}

function textLines(lines: string[], startY: number, lineHeight: number): string {
    return lines
        .map((line, index) => {
            const y = startY + index * lineHeight;
            return `<text x="512" y="${y}" text-anchor="middle" class="quote">${escapeXml(line)}</text>`;
        })
        .join("\n");
}

const quoteLines = [
    "'Good morning after my first",
    "(and much better) night’s sleep",
    "with your Night Splint product…",
    "I’m glad I tried it. I hope it",
    "makes the long Achilles rupture",
    "repair journey easier.'",
];
const quoteStartY = 375;
const quoteLineHeight = 40;
const nameY = 674;
const subtitleY = 742;

const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="paperNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" seed="11"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.045"/>
      </feComponentTransfer>
    </filter>
    <style>
      .quote {
        font-family: "Arial", "Helvetica", sans-serif;
        font-size: 30px;
        font-weight: 400;
        fill: #060807;
      }
      .name {
        font-family: "Arial", "Helvetica", sans-serif;
        font-size: 40px;
        font-weight: 800;
        fill: #050706;
      }
      .subtitle {
        font-family: "Arial", "Helvetica", sans-serif;
        font-size: 26px;
        font-weight: 400;
        fill: #111312;
      }
    </style>
  </defs>

  <rect x="205" y="350" width="614" height="405" rx="3" fill="#d7eadf"/>
  <rect x="205" y="350" width="614" height="405" rx="3" filter="url(#paperNoise)" opacity="0.55"/>

  ${textLines(quoteLines, quoteStartY, quoteLineHeight)}
  <text x="512" y="${nameY}" text-anchor="middle" class="name">${escapeXml(name)}</text>
  <text x="512" y="${subtitleY}" text-anchor="middle" class="subtitle">${escapeXml(subtitle)}</text>
</svg>`;

async function main() {
    if (!fs.existsSync(baseImagePath)) {
        throw new Error(`Base image not found: ${baseImagePath}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    await sharp(baseImagePath)
        .composite([
            {
                input: Buffer.from(overlaySvg),
                top: 0,
                left: 0,
            },
        ])
        .png()
        .toFile(outputPath);

    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
