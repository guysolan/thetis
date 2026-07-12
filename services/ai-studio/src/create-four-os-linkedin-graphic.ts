import fs from "fs";
import path from "path";
import sharp from "sharp";

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-four-os-recovery-factors-linkedin-v3.png",
);

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function text(
    value: string,
    x: number,
    y: number,
    className: string,
    anchor: "start" | "middle" = "middle",
): string {
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${className}">${escapeXml(value)}</text>`;
}

/** Simple flat icons matching each O */
function icon(kind: "overuse" | "overweight" | "overtight" | "over21", cx: number, cy: number): string {
    const stroke = "#0c4a36";
    if (kind === "overuse") {
        // upward trend / activity arrow
        return `
          <path d="M${cx - 18} ${cy + 10} L${cx - 4} ${cy - 2} L${cx + 4} ${cy + 4} L${cx + 18} ${cy - 12}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M${cx + 6} ${cy - 12} L${cx + 18} ${cy - 12} L${cx + 18} ${cy}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
    if (kind === "overweight") {
        // scale / weight
        return `
          <circle cx="${cx}" cy="${cy - 2}" r="16" fill="none" stroke="${stroke}" stroke-width="3.5"/>
          <line x1="${cx}" y1="${cy - 18}" x2="${cx}" y2="${cy + 14}" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M${cx - 14} ${cy + 14} Q${cx} ${cy + 4} ${cx + 14} ${cy + 14}" fill="none" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round"/>
        `;
    }
    if (kind === "overtight") {
        // stretched band / tension
        return `
          <path d="M${cx - 18} ${cy} Q${cx - 6} ${cy - 14} ${cx} ${cy} Q${cx + 6} ${cy + 14} ${cx + 18} ${cy}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
          <circle cx="${cx - 18}" cy="${cy}" r="4" fill="${stroke}"/>
          <circle cx="${cx + 18}" cy="${cy}" r="4" fill="${stroke}"/>
        `;
    }
    // over-21: clock
    return `
      <circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="${stroke}" stroke-width="3.5"/>
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 9}" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + 7}" y2="${cy + 4}" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round"/>
    `;
}

type Card = {
    kind: "overuse" | "overweight" | "overtight" | "over21";
    title: string;
    line1: string;
    line2: string;
    x: number;
    y: number;
};

// Canvas 1080; cards 440 wide. Align to footer edges (48 / 592)
// so left/right margins match and the 2x2 block is centered.
const cards: Card[] = [
    {
        kind: "overuse",
        title: "OVERUSE",
        line1: "Sudden jump in walking,",
        line2: "running, or standing",
        x: 48,
        y: 248,
    },
    {
        kind: "overweight",
        title: "OVERWEIGHT",
        line1: "Extra load through the",
        line2: "heel with every step",
        x: 592,
        y: 248,
    },
    {
        kind: "overtight",
        title: "OVERTIGHT",
        line1: "Tight calves add tension",
        line2: "to Achilles & fascia",
        x: 48,
        y: 512,
    },
    {
        kind: "over21",
        title: "OVER-21",
        line1: "Tissues recover slower",
        line2: "and need more time",
        x: 592,
        y: 512,
    },
];

function cardSvg(card: Card): string {
    const { kind, title, line1, line2, x, y } = card;
    const w = 440;
    const h = 224;
    const iconCx = x + 56;
    const iconCy = y + 56;

    return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="#0c4a36" stroke-width="3"/>
  <circle cx="${iconCx}" cy="${iconCy}" r="36" fill="#e8f2ec" stroke="#0c4a36" stroke-width="2.5"/>
  ${icon(kind, iconCx, iconCy)}
  ${text(title, x + 108, y + 68, "cardTitle", "start")}
  ${text(line1, x + 36, y + 132, "cardBody", "start")}
  ${text(line2, x + 36, y + 172, "cardBody", "start")}
`;
}

async function main() {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const width = 1080;
    const height = 1080;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eef6f1"/>
      <stop offset="55%" stop-color="#f7faf8"/>
      <stop offset="100%" stop-color="#e8f2ec"/>
    </linearGradient>
    <style>
      .eyebrow {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 3.5px;
        fill: #0c4a36;
      }
      .headline {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 56px;
        font-weight: 900;
        fill: #050706;
      }
      .subhead {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 23px;
        font-weight: 600;
        fill: #2a3d34;
      }
      .cardTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 32px;
        font-weight: 900;
        letter-spacing: 1.5px;
        fill: #0c4a36;
      }
      .cardBody {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 24px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .footerTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 26px;
        font-weight: 800;
        fill: #062f23;
      }
      .footerBody {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 600;
        fill: #1a2a22;
      }
    </style>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Header -->
  <rect x="0" y="0" width="${width}" height="198" fill="#d7eadf"/>
  <rect x="0" y="198" width="${width}" height="5" fill="#0c4a36"/>
  ${text("HEEL PAIN RECOVERY", 540, 56, "eyebrow")}
  ${text("THE FOUR O'S", 540, 120, "headline")}
  ${text("Factors that can slow plantar fascia & Achilles recovery", 540, 166, "subhead")}

  <!-- Cards -->
  ${cards.map(cardSvg).join("\n")}

  <!-- Footer -->
  <rect x="48" y="776" width="984" height="244" rx="18" fill="#d7eadf" stroke="#0c4a36" stroke-width="3"/>
  ${text("Having one (or several) doesn't mean you won't recover.", 540, 850, "footerTitle")}
  ${text("Rehab should be gradual, consistent, and focused", 540, 904, "footerBody")}
  ${text("on rebuilding tissue capacity.", 540, 946, "footerBody")}
</svg>`;

    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
