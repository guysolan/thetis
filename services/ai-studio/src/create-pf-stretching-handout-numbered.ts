import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourcePath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v25-full-color-like-example.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v37-numbered-course-ready.png",
);

type Badge = {
    number: number;
    x: number;
    y: number;
};

const badges: Badge[] = [
    { number: 1, x: 74, y: 62 },
    { number: 2, x: 530, y: 190 },
    { number: 3, x: 110, y: 315 },
    { number: 4, x: 130, y: 570 },
    { number: 5, x: 770, y: 80 },
    { number: 6, x: 1320, y: 132 },
    { number: 7, x: 790, y: 415 },
    { number: 8, x: 1230, y: 555 },
];

function badge({ number, x, y }: Badge): string {
    return `
      <circle cx="${x}" cy="${y}" r="18" fill="#12284a" stroke="#ffffff" stroke-width="3"/>
      <text x="${x}" y="${y + 7}" text-anchor="middle" class="badge">${number}</text>
    `;
}

async function main() {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source image not found: ${sourcePath}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const metadata = await sharp(sourcePath).metadata();
    const width = metadata.width ?? 1024;
    const height = metadata.height ?? 575;

    const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .badge {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 21px;
        font-weight: 800;
        fill: #ffffff;
      }
    </style>
  </defs>
  ${badges.map(badge).join("\n")}
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
