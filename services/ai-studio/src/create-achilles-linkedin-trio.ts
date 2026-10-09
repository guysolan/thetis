import fs from "fs";
import path from "path";
import sharp from "sharp";

const outputDir = path.join(process.cwd(), "output");
const stroke = "#0c4a36";
const sage = "#d7eadf";
const cream = "#eef6f1";

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

const styles = `
      .eyebrow {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 3.2px;
        fill: #0c4a36;
      }
      .headline {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 42px;
        font-weight: 900;
        fill: #050706;
      }
      .headlineSm {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 36px;
        font-weight: 900;
        fill: #050706;
      }
      .subhead {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 21px;
        font-weight: 600;
        fill: #2a3d34;
      }
      .colTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 1.4px;
        fill: #0c4a36;
      }
      .cardTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 800;
        fill: #0c4a36;
      }
      .body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .bodySm {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .stat {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 92px;
        font-weight: 900;
        fill: #0c4a36;
      }
      .statLabel {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 700;
        fill: #1a2a22;
      }
      .footerTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 24px;
        font-weight: 800;
        fill: #062f23;
      }
      .footerBody {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .stepNum {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 28px;
        font-weight: 900;
        fill: #0c4a36;
      }
`;

function svgShell(inner: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eef6f1"/>
      <stop offset="100%" stop-color="#e8f2ec"/>
    </linearGradient>
    <style>${styles}</style>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  ${inner}
</svg>`;
}

function header(
    eyebrow: string,
    line1: string,
    line2: string | null,
    sub: string,
): string {
    const h = line2 ? 210 : 188;
    return `
  <rect x="0" y="0" width="1080" height="${h}" fill="${sage}"/>
  <rect x="0" y="${h}" width="1080" height="5" fill="${stroke}"/>
  ${text(eyebrow, 540, 48, "eyebrow")}
  ${text(line1, 540, line2 ? 104 : 112, line2 ? "headlineSm" : "headline")}
  ${line2 ? text(line2, 540, 148, "headlineSm") : ""}
  ${text(sub, 540, line2 ? 188 : 158, "subhead")}
`;
}

function iconScalpel(cx: number, cy: number): string {
    return `
      <path d="M${cx - 14} ${cy + 10} L${cx + 6} ${cy - 8} L${cx + 11} ${cy - 3} L${cx - 9} ${cy + 15} Z" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linejoin="round"/>
      <line x1="${cx + 6}" y1="${cy - 8}" x2="${cx + 16}" y2="${cy - 16}" stroke="${stroke}" stroke-width="2.8" stroke-linecap="round"/>
    `;
}

function iconBoot(cx: number, cy: number): string {
    return `
      <path d="M${cx - 12} ${cy - 14} L${cx - 12} ${cy + 6} L${cx + 14} ${cy + 6} L${cx + 14} ${cy + 14} L${cx - 16} ${cy + 14} L${cx - 16} ${cy - 14} Z" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linejoin="round"/>
      <line x1="${cx - 6}" y1="${cy - 6}" x2="${cx + 6}" y2="${cy - 6}" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round"/>
    `;
}

function iconShield(cx: number, cy: number): string {
    return `
      <path d="M${cx} ${cy - 16} L${cx + 14} ${cy - 10} L${cx + 14} ${cy + 4} Q${cx + 14} ${cy + 14} ${cx} ${cy + 18} Q${cx - 14} ${cy + 14} ${cx - 14} ${cy + 4} L${cx - 14} ${cy - 10} Z" fill="none" stroke="${stroke}" stroke-width="2.8"/>
    `;
}

function iconArrow(cx: number, cy: number): string {
    return `
      <path d="M${cx - 14} ${cy + 8} L${cx - 2} ${cy - 4} L${cx + 4} ${cy + 2} L${cx + 16} ${cy - 12}" fill="none" stroke="${stroke}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${cx + 6} ${cy - 12} L${cx + 16} ${cy - 12} L${cx + 16} ${cy - 2}" fill="none" stroke="${stroke}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
}

function iconDumbbell(cx: number, cy: number): string {
    return `
      <rect x="${cx - 20}" y="${cy - 8}" width="8" height="16" rx="1.5" fill="none" stroke="${stroke}" stroke-width="2.6"/>
      <rect x="${cx + 12}" y="${cy - 8}" width="8" height="16" rx="1.5" fill="none" stroke="${stroke}" stroke-width="2.6"/>
      <line x1="${cx - 12}" y1="${cy}" x2="${cx + 12}" y2="${cy}" stroke="${stroke}" stroke-width="3.2" stroke-linecap="round"/>
    `;
}

function iconCheck(cx: number, cy: number): string {
    return `
      <circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="${stroke}" stroke-width="2.6"/>
      <path d="M${cx - 6} ${cy} L${cx - 1} ${cy + 5} L${cx + 7} ${cy - 5}" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    `;
}

function graphic1(): string {
    const factors = [
        { t: "Age & activity", y: 548, x: 48 },
        { t: "Sporting goals", y: 548, x: 380 },
        { t: "Health & comorbidities", y: 548, x: 712 },
        { t: "Injury characteristics", y: 656, x: 48 },
        { t: "Rehab commitment", y: 656, x: 380 },
        { t: "Preference & risk", y: 656, x: 712 },
    ];

    const chips = factors
        .map(
            (f) => `
  <rect x="${f.x}" y="${f.y}" width="320" height="92" rx="14" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
  ${text(f.t, f.x + 160, f.y + 55, "cardTitle")}
`,
        )
        .join("\n");

    return svgShell(`
  ${header(
        "ACHILLES RUPTURE",
        "NOT ONE-SIZE-FITS-ALL",
        null,
        "The question is which treatment fits this patient",
    )}

  <rect x="48" y="226" width="476" height="250" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  <circle cx="96" cy="278" r="30" fill="${cream}" stroke="${stroke}" stroke-width="2.4"/>
  ${iconScalpel(96, 278)}
  ${text("SURGERY", 144, 288, "colTitle", "start")}
  ${text("May lower re-rupture risk", 72, 348, "bodySm", "start")}
  ${text("in some patient groups.", 72, 378, "bodySm", "start")}
  ${text("Adds wound and infection risk.", 72, 422, "bodySm", "start")}

  <rect x="556" y="226" width="476" height="250" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  <circle cx="604" cy="278" r="30" fill="${cream}" stroke="${stroke}" stroke-width="2.4"/>
  ${iconBoot(604, 278)}
  ${text("NON-SURGICAL", 652, 288, "colTitle", "start")}
  ${text("Avoids operative complications.", 580, 348, "bodySm", "start")}
  ${text("Needs structured rehab and", 580, 390, "bodySm", "start")}
  ${text("strong patient commitment.", 580, 422, "bodySm", "start")}

  ${text("PATIENT FACTORS THAT SHAPE THE DECISION", 540, 528, "colTitle")}
  ${chips}

  <rect x="48" y="772" width="984" height="248" rx="18" fill="${sage}" stroke="${stroke}" stroke-width="3"/>
  ${text("Individualised treatment.", 540, 848, "footerTitle")}
  ${text("Shared decision-making — not the same", 540, 900, "footerBody")}
  ${text("pathway for every rupture.", 540, 940, "footerBody")}
`);
}

function graphic2(): string {
    const steps = [
        {
            n: "1",
            title: "PROTECT",
            body: "Guard the repair",
            x: 48,
            icon: iconShield,
        },
        {
            n: "2",
            title: "LOAD",
            body: "Increase demand",
            x: 380,
            icon: iconArrow,
        },
        {
            n: "3",
            title: "REBUILD",
            body: "Restore function",
            x: 712,
            icon: iconDumbbell,
        },
    ];

    const stepSvgs = steps
        .map(
            (s) => `
  <rect x="${s.x}" y="226" width="320" height="210" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  <circle cx="${s.x + 160}" cy="278" r="28" fill="${cream}" stroke="${stroke}" stroke-width="2.4"/>
  ${s.icon(s.x + 160, 278)}
  ${text(s.title, s.x + 160, 348, "colTitle")}
  ${text(s.body, s.x + 160, 388, "bodySm")}
`,
        )
        .join("\n");

    const benefits = [
        { t: "Less atrophy", x: 48 },
        { t: "Keep ankle motion", x: 380 },
        { t: "Support circulation", x: 712 },
        { t: "Restore strength", x: 214 },
        { t: "Return to function", x: 546 },
    ];

    const row1 = benefits
        .slice(0, 3)
        .map(
            (b) => `
  <rect x="${b.x}" y="508" width="320" height="78" rx="14" fill="#ffffff" stroke="${stroke}" stroke-width="2.4"/>
  ${text(b.t, b.x + 160, b.x ? 555 : 555, "cardTitle")}
`,
        )
        .join("\n");

    const row2 = benefits
        .slice(3)
        .map(
            (b) => `
  <rect x="${b.x}" y="598" width="320" height="78" rx="14" fill="#ffffff" stroke="${stroke}" stroke-width="2.4"/>
  ${text(b.t, b.x + 160, 645, "cardTitle")}
`,
        )
        .join("\n");

    return svgShell(`
  ${header(
        "ACHILLES REHABILITATION",
        "NOT ONLY PROTECTION",
        null,
        "Early controlled movement — without rushing the repair",
    )}
  ${stepSvgs}
  ${text("WHY EARLY MOVEMENT HELPS", 540, 482, "colTitle")}
  ${row1}
  ${row2}

  <rect x="48" y="700" width="984" height="110" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("Caution: too much upward ankle motion too early", 540, 748, "body")}
  ${text("can lengthen the healing tendon.", 540, 782, "body")}

  <rect x="48" y="832" width="984" height="188" rx="18" fill="${sage}" stroke="${stroke}" stroke-width="3"/>
  ${text("Protect the repair. Then load it.", 540, 900, "footerTitle")}
  ${text("Then rebuild strength — in that order.", 540, 950, "footerBody")}
`);
}

function graphic3(): string {
    const left = [
        { t: "Calf strength", y: 620 },
        { t: "Tendon capacity", y: 678 },
        { t: "Elastic function", y: 736 },
    ];
    const right = [
        { t: "Sport-specific movement", y: 649 },
        { t: "Psychological readiness", y: 707 },
    ];

    const col = (
        items: Array<{ t: string; y: number }>,
        x: number,
    ) =>
        items
            .map(
                (item) => `
  ${iconCheck(x, item.y - 6)}
  ${text(item.t, x + 30, item.y, "body", "start")}
`,
            )
            .join("\n");

    return svgShell(`
  ${header(
        "ACHILLES RUPTURE",
        "SPORT IS NOT THE SAME",
        "AS FUNCTION",
        "Walking without pain is not clearance for sport",
    )}

  <rect x="48" y="242" width="476" height="250" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("~80%", 286, 360, "stat")}
  ${text("may return to previous", 286, 418, "statLabel")}
  ${text("activity after rehab", 286, 452, "statLabel")}

  <rect x="556" y="242" width="476" height="250" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("10–30%", 794, 360, "stat")}
  ${text("weaker push-off strength", 794, 418, "statLabel")}
  ${text("even a year later", 794, 452, "statLabel")}

  <rect x="48" y="518" width="984" height="292" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("REBUILD BEFORE FULL RETURN", 540, 568, "colTitle")}
  ${col(left, 92)}
  ${col(right, 560)}

  <rect x="48" y="836" width="984" height="184" rx="18" fill="${sage}" stroke="${stroke}" stroke-width="3"/>
  ${text("Return to sport is a process.", 540, 906, "footerTitle")}
  ${text("Clear on criteria — not a single date.", 540, 954, "footerBody")}
`);
}

async function writePng(filename: string, svg: string) {
    const outputPath = path.join(outputDir, filename);
    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`Created ${outputPath}`);
}

async function main() {
    fs.mkdirSync(outputDir, { recursive: true });
    await writePng(
        "achilles-treatment-not-one-size-linkedin-v1.png",
        graphic1(),
    );
    await writePng(
        "achilles-early-mobilisation-linkedin-v1.png",
        graphic2(),
    );
    await writePng(
        "achilles-return-to-sport-vs-function-linkedin-v1.png",
        graphic3(),
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
