import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourcePath = path.resolve(
    "C:/Users/vajle/.cursor/projects/c-Users-vajle-thetis/assets/c__Users_vajle_AppData_Roaming_Cursor_User_workspaceStorage_7a1a33bd819ebcd545427acb3584edcd_images_image-a8369a75-1059-442c-a7b6-bff19d71678b.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "achilles-running-technique-matters-v10-font-polished.png",
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

function bullet(value: string, x: number, y: number): string {
    return `${text("•", x, y, "bullet", "start")}${text(value, x + 28, y, "bullet", "start")}`;
}

async function main() {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source image not found: ${sourcePath}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const width = 1024;
    const height = 1024;
    const imageSize = 1024;
    const imageLeft = 0;
    const imageTop = 0;

    const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .eyebrow {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: 3px;
        fill: #0c4a36;
      }
      .headline {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 42px;
        font-weight: 900;
        fill: #050706;
      }
      .cardTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 28px;
        font-weight: 900;
        fill: #050706;
      }
      .bullet {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 700;
        fill: #050706;
      }
      .note {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 25px;
        font-weight: 900;
        fill: #062f23;
      }
    </style>
  </defs>

  <rect x="0" y="0" width="1024" height="122" fill="#d7eadf" opacity="0.97"/>
  ${text("ACHILLES RUPTURE RECOVERY", 512, 39, "eyebrow")}
  ${text("RUNNING TECHNIQUE MATTERS", 512, 89, "headline")}

  <rect x="0" y="122" width="1024" height="4" fill="#050706"/>

  <rect x="46" y="154" width="330" height="216" rx="14" fill="#ffffff" opacity="0.94" stroke="#050706" stroke-width="3"/>
  ${text("Run with control", 68, 203, "cardTitle", "start")}
  ${bullet("Shorter stride", 72, 248)}
  ${bullet("Soft landing", 72, 293)}
  ${bullet("Upright posture", 72, 338)}

  <rect x="652" y="154" width="326" height="216" rx="14" fill="#ffffff" opacity="0.94" stroke="#050706" stroke-width="3"/>
  ${text("Build slowly", 674, 203, "cardTitle", "start")}
  ${bullet("Flat surface first", 678, 248)}
  ${bullet("Increase volume slowly", 678, 293)}
  ${bullet("No push-through pain", 678, 338)}

  <rect x="178" y="926" width="668" height="66" rx="12" fill="#f4efe4" opacity="0.96" stroke="#0c4a36" stroke-width="3"/>
  ${text("Progress only if pain and swelling stay calm", 512, 967, "note")}
</svg>`;

    await sharp(sourcePath)
        .composite([
            { input: Buffer.from(overlaySvg), top: imageTop, left: imageLeft },
        ])
        .png()
        .toFile(outputPath);

    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
