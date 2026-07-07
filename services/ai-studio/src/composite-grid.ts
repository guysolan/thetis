import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Composite generator.
 *
 * Assembles several finished square PANEL images (each already containing its
 * own border, badge and callout labels) into one titled grid infographic.
 * Because the panels are placed unchanged, photorealistic panels STAY
 * photorealistic (unlike re-generating the whole grid through the image model).
 *
 * Usage:
 *   bun src/composite-grid.ts <cols> "<title>" <output.png> <panel1> <panel2> ...
 *
 * Panels are laid out left-to-right, top-to-bottom. Paths resolve relative to
 * the ai-studio root.
 */

const PANEL = 1000; // rendered size of each square panel
const GAP = 28; // white gap between panels
const MARGIN = 44; // outer white margin
const TITLE_H = 150; // dark title strip height
const TITLE_BG = "#13294B"; // dark navy
const TITLE_FG = "#ffffff";

function resolve(root: string, p: string): string {
    return path.isAbsolute(p) ? p : path.join(root, p);
}

function escapeXml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

async function main() {
    const root = process.cwd();
    const cols = parseInt(process.argv[2] ?? "3", 10);
    const title = process.argv[3] ?? "";
    const outputFileName = process.argv[4] ?? `grid-${Date.now()}.png`;
    const panelArgs = process.argv.slice(5);

    if (!cols || panelArgs.length === 0) {
        console.error(
            'Usage: bun src/composite-grid.ts <cols> "<title>" <output.png> <panel1> <panel2> ...',
        );
        process.exit(1);
    }

    const rows = Math.ceil(panelArgs.length / cols);

    const gridW = MARGIN * 2 + cols * PANEL + (cols - 1) * GAP;
    const gridH = TITLE_H + MARGIN + rows * PANEL + (rows - 1) * GAP + MARGIN;

    // Title strip (dark navy bar with centred white text).
    const fontSize = Math.round(TITLE_H * 0.4);
    const titleSvg = Buffer.from(
        `<svg width="${gridW}" height="${TITLE_H}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${gridW}" height="${TITLE_H}" fill="${TITLE_BG}"/>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
                font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}"
                font-weight="700" fill="${TITLE_FG}">${escapeXml(title)}</text>
        </svg>`,
    );

    const composites: sharp.OverlayOptions[] = [
        { input: titleSvg, top: 0, left: 0 },
    ];

    for (let i = 0; i < panelArgs.length; i++) {
        const panelPath = resolve(root, panelArgs[i]);
        if (!fs.existsSync(panelPath)) {
            console.error(`\x1b[31mError: Panel not found: ${panelPath}\x1b[0m`);
            process.exit(1);
        }
        const r = Math.floor(i / cols);
        const c = i % cols;
        const left = MARGIN + c * (PANEL + GAP);
        const top = TITLE_H + MARGIN + r * (PANEL + GAP);
        const resized = await sharp(panelPath)
            .resize(PANEL, PANEL, { fit: "cover" })
            .toBuffer();
        composites.push({ input: resized, top, left });
        console.log(`\x1b[33mPanel ${i + 1}:\x1b[0m ${panelArgs[i]} @ (${left}, ${top})`);
    }

    const outputDir = path.join(root, "output");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, outputFileName);

    await sharp({
        create: {
            width: gridW,
            height: gridH,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    })
        .composite(composites)
        .png()
        .toFile(outputPath);

    console.log(`\x1b[32mSuccess!\x1b[0m Saved: \x1b[34m${outputPath}\x1b[0m`);
}

main().catch(console.error);
