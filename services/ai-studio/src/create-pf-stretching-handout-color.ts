import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourcePath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v31-user-reference-layout.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v36-color-course-ready-clean.png",
);

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
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxChars && current) {
            lines.push(current);
            current = word;
        } else {
            current = next;
        }
    }

    if (current) lines.push(current);
    return lines;
}

function cover(x: number, y: number, width: number, height: number): string {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="4" fill="#f7edcf"/>`;
}

function textBlock(
    title: string,
    body: string,
    x: number,
    y: number,
    maxChars: number,
    align: "start" | "middle" = "start",
): string {
    const anchor = align === "middle" ? "middle" : "start";
    const bodyLines = wrapText(body, maxChars);
    const titleSvg =
        `<text x="${x}" y="${y}" text-anchor="${anchor}" class="label">${escapeXml(title)}</text>`;
    const bodySvg = bodyLines
        .map((line, index) =>
            `<text x="${x}" y="${y + 21 + index * 15}" text-anchor="${anchor}" class="body">${escapeXml(line)}</text>`
        )
        .join("\n");

    return `${titleSvg}\n${bodySvg}`;
}

async function main() {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source image not found: ${sourcePath}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .label {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 20px;
        font-weight: 900;
        fill: #070707;
      }
      .body {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 13px;
        font-weight: 700;
        fill: #111;
      }
      .smallBody {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 12px;
        font-weight: 700;
        fill: #111;
      }
    </style>
  </defs>

  ${cover(140, 145, 130, 74)}
  ${textBlock("1. Seated Toe Stretch", "Pull toes back until stretch is felt under the foot.", 148, 166, 20)}

  ${cover(272, 162, 155, 62)}
  ${cover(276, 238, 118, 42)}
  ${textBlock("2. Towel Stretch", "Pull the towel toward you to stretch calf and arch.", 281, 184, 22)}

  ${cover(136, 492, 205, 70)}
  ${textBlock("3. Ice Pack Application", "Wrap ice in a towel. Apply for 20 minutes, 2-3 times daily. Never place ice directly on skin.", 140, 512, 27)}

  ${cover(188, 768, 188, 110)}
  ${textBlock("4. Toe Raises", "Rise onto tip toes, then lower slowly. Repeat 10-15 times.", 224, 794, 22)}

  ${cover(675, 150, 156, 100)}
  ${textBlock("5. One-Foot Balance", "Stand on one foot. Progress by closing your eyes when this becomes easy.", 690, 171, 24)}

  ${cover(745, 286, 155, 72)}
  ${cover(742, 348, 158, 95)}
  ${textBlock("6. Wall Calf Stretch", "Keep knee straight and heel down. Hold 10 seconds.", 748, 370, 23)}

  ${cover(688, 528, 188, 92)}
  ${textBlock("7. Bottle Massage", "Roll a can or bottle under the arch while seated. Continue up to 20 minutes.", 698, 550, 25)}

  ${cover(656, 792, 186, 112)}
  ${textBlock("8. Step Edge Stretch", "Lower the heel over the edge of a step. Hold 10 seconds.", 668, 818, 24)}
</svg>`;

    await sharp(sourcePath)
        .composite([{ input: Buffer.from(overlaySvg), left: 0, top: 0 }])
        .png()
        .toFile(outputPath);

    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
