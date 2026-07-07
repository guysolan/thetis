import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Composites four square panels into a 2x2 patient-education infographic
 * with a navy title strip on top, matching the Thetis night-splint guide.
 *
 * Usage:
 *   bun src/compose-splint-grid.ts <out.png> <tl.png> <tr.png> <bl.png> <br.png>
 * Paths resolve relative to the ai-studio root (output/ is searched too).
 */

const PANEL = 760;
const GUTTER = 30;
const MARGIN = 40;
const TITLE_H = 150;
const GAP_BELOW_TITLE = 30;
const TITLE = "How do I know if my night splint fits correctly?";
const NAVY = "#15233f";

function resolve(p: string): string {
    const root = process.cwd();
    const candidates = [
        path.isAbsolute(p) ? p : path.join(root, p),
        path.join(root, "output", p),
        path.join(root, "input", p),
    ];
    for (const c of candidates) if (fs.existsSync(c)) return c;
    throw new Error(`Image not found: ${p}`);
}

async function main() {
    const [outArg, tl, tr, bl, br] = process.argv.slice(2);
    if (!outArg || !tl || !tr || !bl || !br) {
        console.error(
            "Usage: bun src/compose-splint-grid.ts <out.png> <tl.png> <tr.png> <bl.png> <br.png>",
        );
        process.exit(1);
    }

    const canvasW = MARGIN * 2 + PANEL * 2 + GUTTER;
    const gridTop = TITLE_H + GAP_BELOW_TITLE;
    const canvasH = gridTop + PANEL * 2 + GUTTER + MARGIN;

    const panelPaths = { tl, tr, bl, br };
    const resized: Record<string, Buffer> = {};
    for (const [key, p] of Object.entries(panelPaths)) {
        resized[key] = await sharp(resolve(p))
            .resize(PANEL, PANEL, { fit: "cover" })
            .toBuffer();
    }

    const titleSvg = Buffer.from(
        `<svg width="${canvasW}" height="${TITLE_H}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${canvasW}" height="${TITLE_H}" fill="${NAVY}"/>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
                font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#ffffff">
                ${TITLE}
            </text>
        </svg>`,
    );

    const canvas = sharp({
        create: {
            width: canvasW,
            height: canvasH,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    });

    const out = path.isAbsolute(outArg)
        ? outArg
        : path.join(process.cwd(), "output", outArg);

    await canvas
        .composite([
            { input: titleSvg, top: 0, left: 0 },
            { input: resized.tl, top: gridTop, left: MARGIN },
            { input: resized.tr, top: gridTop, left: MARGIN + PANEL + GUTTER },
            { input: resized.bl, top: gridTop + PANEL + GUTTER, left: MARGIN },
            {
                input: resized.br,
                top: gridTop + PANEL + GUTTER,
                left: MARGIN + PANEL + GUTTER,
            },
        ])
        .png()
        .toFile(out);

    console.log(`Saved: ${out} (${canvasW}x${canvasH})`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
