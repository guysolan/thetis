import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourcePath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v33-strict-original-reference.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v34-course-ready.png",
);

type Crop = {
    left: number;
    top: number;
    width: number;
    height: number;
};

const crops: Record<string, Crop> = {
    toeStretch: { left: 66, top: 176, width: 133, height: 98 },
    towelPull: { left: 68, top: 307, width: 112, height: 96 },
    towelFoot: { left: 181, top: 307, width: 111, height: 96 },
    standingFront: { left: 79, top: 517, width: 73, height: 153 },
    standingLeg: { left: 161, top: 517, width: 70, height: 153 },
    heelRaise: { left: 80, top: 715, width: 72, height: 153 },
    heelRaiseLeg: { left: 162, top: 715, width: 70, height: 153 },
    balanceMike: { left: 618, top: 193, width: 75, height: 155 },
    balanceLeg: { left: 700, top: 193, width: 78, height: 155 },
    wallStretch: { left: 634, top: 413, width: 99, height: 202 },
    bottleFoot: { left: 635, top: 633, width: 101, height: 132 },
    stepStretch: { left: 748, top: 789, width: 98, height: 54 },
};

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

function textBlock(
    text: string,
    x: number,
    y: number,
    maxChars: number,
    className = "body",
    lineHeight = 20,
): string {
    return wrapText(text, maxChars)
        .map((line, index) =>
            `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`
        )
        .join("\n");
}

function label(text: string, x: number, y: number): string {
    return `<text x="${x}" y="${y}" class="label">${escapeXml(text)}</text>`;
}

function rect(x: number, y: number, width: number, height: number): string {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#fff" stroke="#111" stroke-width="2"/>`;
}

function image(
    href: string,
    x: number,
    y: number,
    width: number,
    height: number,
): string {
    return `<image href="${href}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}

async function cropToDataUri(crop: Crop): Promise<string> {
    const buffer = await sharp(sourcePath)
        .extract(crop)
        .grayscale()
        .linear(1.2, -10)
        .png()
        .toBuffer();

    return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function main() {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source image not found: ${sourcePath}`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const panels: Record<string, string> = {};
    for (const [name, crop] of Object.entries(crops)) {
        panels[name] = await cropToDataUri(crop);
    }

    const canvasWidth = 1600;
    const canvasHeight = 1100;
    const leftX = 60;
    const rightX = 850;
    const pageY = 45;
    const pageW = 690;
    const pageH = 1010;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 26px;
        font-weight: 800;
        fill: #050505;
      }
      .body {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 18px;
        font-weight: 700;
        fill: #050505;
      }
      .small {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 16px;
        font-weight: 700;
        fill: #050505;
      }
      .label {
        font-family: "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
        font-size: 18px;
        font-weight: 900;
        fill: #050505;
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#fff"/>

  ${rect(leftX, pageY, pageW, pageH)}
  ${rect(rightX, pageY, pageW, pageH)}

  <text x="${leftX + 18}" y="${pageY + 96}" class="title">Plantar Fasciitis a guide to Stretching Exercises</text>
  ${rect(leftX + 55, pageY + 145, 205, 118)}
  ${image(panels.toeStretch, leftX + 61, pageY + 151, 193, 106)}
  ${rect(leftX + 275, pageY + 145, 380, 118)}
  ${textBlock("Sit on a chair with foot on opposite knee. Grasp the toes and ball of the foot. Using the other hand as support, pull toes, foot and ankle towards the knee until stretch is felt on the ball of the foot. Hold for 10 seconds and repeat 10 times, 2-3 times a day.", leftX + 288, pageY + 172, 43, "small", 17)}

  ${rect(leftX + 55, pageY + 305, 145, 96)}
  ${image(panels.towelPull, leftX + 61, pageY + 311, 133, 84)}
  ${rect(leftX + 210, pageY + 305, 145, 96)}
  ${image(panels.towelFoot, leftX + 216, pageY + 311, 133, 84)}
  ${rect(leftX + 372, pageY + 305, 283, 146)}
  ${textBlock("Alternatively, sit with leg straight in front and use a towel to loop it over the foot, including the toes. Pull the towel until you feel the pull in your calf and the ball of your foot. Hold for 10 seconds and repeat 10 times, 2-3 times a day.", leftX + 385, pageY + 330, 32, "small", 17)}

  ${label("Application of ice pack", leftX + 90, pageY + 500)}
  ${textBlock("Ice should not be applied directly to the skin. Always wrap ice pack in towel or cloth to avoid the danger of ice burns. Apply for 20 minutes, 2-3 times a day.", leftX + 90, pageY + 522, 60, "small", 18)}

  ${rect(leftX + 85, pageY + 640, 100, 170)}
  ${image(panels.standingFront, leftX + 95, pageY + 650, 80, 150)}
  ${rect(leftX + 205, pageY + 640, 100, 170)}
  ${image(panels.standingLeg, leftX + 215, pageY + 650, 80, 150)}
  ${label("(Easy tibialis posterior strengthening)", leftX + 365, pageY + 680)}
  ${textBlock("Stand on tip toes pulling the arches of the feet up. Repeat 10-15 times three times daily.", leftX + 365, pageY + 715, 42, "small", 18)}

  ${rect(leftX + 85, pageY + 835, 100, 160)}
  ${image(panels.heelRaise, leftX + 95, pageY + 843, 80, 145)}
  ${rect(leftX + 205, pageY + 835, 100, 160)}
  ${image(panels.heelRaiseLeg, leftX + 215, pageY + 843, 80, 145)}
  ${label("(Harder tibialis posterior", leftX + 365, pageY + 842)}
  ${label("strengthening)", leftX + 365, pageY + 863)}
  ${textBlock("Stand tall with back relaxed and shoulders over the pelvis. Lift one leg off the ground. Raise the heel until you are standing on tip toes. Gradually lower the heel to 1 inch off ground and hold for 2 seconds. Repeat 10-15 times three times daily.", leftX + 365, pageY + 900, 39, "small", 17)}

  <text x="${rightX + 65}" y="${pageY + 96}" class="title">Plantar Fasciitis a guide to Stretching Exercises</text>
  ${rect(rightX + 130, pageY + 165, 105, 165)}
  ${image(panels.balanceMike, rightX + 145, pageY + 175, 75, 145)}
  ${rect(rightX + 255, pageY + 165, 105, 165)}
  ${image(panels.balanceLeg, rightX + 270, pageY + 175, 75, 145)}
  ${textBlock("Initially stand on one foot and balance. If this is too easy progress to closing your eyes; you should be able to do this for 30 seconds without losing your balance. Attempt for a couple of minutes. Repeat 3 times daily.", rightX + 455, pageY + 190, 35, "small", 18)}

  ${rect(rightX + 145, pageY + 405, 145, 230)}
  ${image(panels.wallStretch, rightX + 165, pageY + 420, 105, 200)}
  ${textBlock("1. Lean against the wall with the knee kept straight and the heel touching the floor. You should feel stretch up back of leg.", rightX + 390, pageY + 445, 45, "small", 18)}
  ${textBlock("Hold for 10 seconds and repeat 10 times, 2-3 times a day.", rightX + 390, pageY + 555, 43, "small", 18)}

  ${rect(rightX + 145, pageY + 675, 145, 165)}
  ${image(panels.bottleFoot, rightX + 165, pageY + 690, 105, 135)}
  ${textBlock("2. Massaging and stretching the plantar fascia using a can or bottle. For safety carry out this exercise while seated.", rightX + 390, pageY + 715, 45, "small", 18)}
  ${textBlock("20 minutes, 3 times a day.", rightX + 390, pageY + 810, 38, "small", 18)}

  ${rect(rightX + 150, pageY + 875, 130, 82)}
  ${image(panels.stepStretch, rightX + 162, pageY + 885, 106, 60)}
  ${textBlock("3. Stretching the back of the leg over the edge of the bottom step.", rightX + 390, pageY + 890, 44, "small", 18)}
  ${textBlock("Hold for 10 seconds and repeat 10 times, 2-3 times a day.", rightX + 390, pageY + 965, 44, "small", 18)}
</svg>`;

    await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);

    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
