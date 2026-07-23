import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.resolve(
    __dirname,
    "../../../apps/website/public/fonts",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-stepwise-approach-recovery-linkedin-v3-raleway.png",
);

function fontDataUri(filename: string): string {
    const filePath = path.join(fontsDir, filename);
    const data = fs.readFileSync(filePath).toString("base64");
    return `data:font/truetype;base64,${data}`;
}

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

const stroke = "#0c4a36";

function iconFoundation(cx: number, cy: number): string {
    return `
      <rect x="${cx - 22}" y="${cy + 8}" width="16" height="12" rx="2" fill="none" stroke="${stroke}" stroke-width="3"/>
      <rect x="${cx - 6}" y="${cy - 2}" width="16" height="22" rx="2" fill="none" stroke="${stroke}" stroke-width="3"/>
      <rect x="${cx + 10}" y="${cy - 12}" width="16" height="32" rx="2" fill="none" stroke="${stroke}" stroke-width="3"/>
    `;
}

function iconFurther(cx: number, cy: number): string {
    return `
      <circle cx="${cx}" cy="${cy}" r="18" fill="none" stroke="${stroke}" stroke-width="3.5"/>
      <line x1="${cx}" y1="${cy - 10}" x2="${cx}" y2="${cy + 10}" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      <line x1="${cx - 10}" y1="${cy}" x2="${cx + 10}" y2="${cy}" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
    `;
}

function iconSurgery(cx: number, cy: number): string {
    return `
      <path d="M${cx - 16} ${cy + 12} L${cx + 4} ${cy - 10} L${cx + 10} ${cy - 4} L${cx - 10} ${cy + 18} Z" fill="none" stroke="${stroke}" stroke-width="3.2" stroke-linejoin="round"/>
      <line x1="${cx + 4}" y1="${cy - 10}" x2="${cx + 16}" y2="${cy - 18}" stroke="${stroke}" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="${cx + 16}" cy="${cy - 18}" r="3.5" fill="${stroke}"/>
    `;
}

async function main() {
    const regular = fontDataUri("raleway-v26-latin-regular.ttf");
    const semiBold = fontDataUri("raleway-v26-latin-600.ttf");
    const extraBold = fontDataUri("raleway-v26-latin-800.ttf");

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const width = 1080;
    const height = 1080;

    const cards = [
        {
            num: "1",
            title: "FOUNDATION",
            body1: "Load management, stretching",
            body2: "& strengthening — daily basics",
            y: 236,
            icon: iconFoundation,
        },
        {
            num: "2",
            title: "FURTHER TREATMENT",
            body1: "Extra options if symptoms persist",
            body2: "despite a consistent Level 1 trial",
            y: 430,
            icon: iconFurther,
        },
        {
            num: "3",
            title: "SURGERY",
            body1: "Rarely needed — only after",
            body2: "conservative care is exhausted",
            y: 624,
            icon: iconSurgery,
        },
    ];

    const cardSvgs = cards
        .map((c) => {
            const x = 48;
            const w = 984;
            const h = 168;
            const iconCx = x + 56;
            const iconCy = c.y + 84;

            return `
  <rect x="${x}" y="${c.y}" width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="#0c4a36" stroke-width="3"/>
  <circle cx="${iconCx}" cy="${iconCy}" r="40" fill="#e8f2ec" stroke="#0c4a36" stroke-width="2.5"/>
  ${c.icon(iconCx, iconCy)}
  ${text(`LEVEL ${c.num}`, x + 118, c.y + 48, "levelLabel", "start")}
  ${text(c.title, x + 118, c.y + 86, "levelTitle", "start")}
  ${text(c.body1, x + 118, c.y + 122, "levelBody", "start")}
  ${text(c.body2, x + 118, c.y + 150, "levelBody", "start")}
`;
        })
        .join("\n");

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eef6f1"/>
      <stop offset="55%" stop-color="#f7faf8"/>
      <stop offset="100%" stop-color="#e8f2ec"/>
    </linearGradient>
    <style>
      @font-face {
        font-family: "Raleway";
        font-weight: 400;
        src: url("${regular}");
      }
      @font-face {
        font-family: "Raleway";
        font-weight: 600;
        src: url("${semiBold}");
      }
      @font-face {
        font-family: "Raleway";
        font-weight: 800;
        src: url("${extraBold}");
      }
      .eyebrow {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 4px;
        fill: #0c4a36;
      }
      .headline {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 44px;
        font-weight: 800;
        letter-spacing: 1px;
        fill: #050706;
      }
      .subhead {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 23px;
        font-weight: 600;
        fill: #2a3d34;
      }
      .levelLabel {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 2.5px;
        fill: #0c4a36;
      }
      .levelTitle {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 1.5px;
        fill: #050706;
      }
      .levelBody {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .footerTitle {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 24px;
        font-weight: 800;
        fill: #062f23;
      }
      .footerBody {
        font-family: "Raleway", Arial, Helvetica, sans-serif;
        font-size: 21px;
        font-weight: 600;
        fill: #1a2a22;
      }
    </style>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Header -->
  <rect x="0" y="0" width="${width}" height="198" fill="#d7eadf"/>
  <rect x="0" y="198" width="${width}" height="5" fill="#0c4a36"/>
  ${text("PLANTAR FASCIITIS", 540, 52, "eyebrow")}
  ${text("A STEPWISE APPROACH", 540, 110, "headline")}
  ${text("Most people recover without surgery — start with the basics", 540, 160, "subhead")}

  ${cardSvgs}

  <!-- Footer -->
  <rect x="48" y="820" width="984" height="200" rx="18" fill="#d7eadf" stroke="#0c4a36" stroke-width="3"/>
  ${text("Don't skip the basics for a quick fix.", 540, 880, "footerTitle")}
  ${text("Simple treatments done consistently beat", 540, 928, "footerBody")}
  ${text("complex treatments done occasionally.", 540, 968, "footerBody")}
</svg>`;

    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
