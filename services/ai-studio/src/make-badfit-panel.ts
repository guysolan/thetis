import sharp from "sharp";
import path from "path";

/**
 * Builds a BAD FIT top-row panel for the night-splint grid by placing a REAL
 * (repositioned) product photo on a white square and drawing the red border,
 * "BAD FIT" badge and red callouts as a vector overlay — the same technique as
 * make-goodfit-panel.ts, so all three top panels share an identical framing and
 * the foot pose is never altered by an image model.
 *
 * Usage: bun src/make-badfit-panel.ts <photo> <low|high> <out.png>
 */

const SIZE = 760;
const RED = "#d11f2d";

type Pt = { x: number; y: number };
type LabelBox = { x: number; y: number; w: number; h: number; lines: string[] };
type Arrow = { from: Pt; to: Pt };
type Circle = { cx: number; cy: number; rx: number; ry: number };

type Variant = {
    badge: "left" | "right";
    labels: LabelBox[];
    arrows: Arrow[];
    circles: Circle[];
    retouch: string;
};

// Feature coordinates are in the 760x760 panel space (photo letterboxed to the
// full width with white margins top/bottom).
const VARIANTS: Record<string, Variant> = {
    low: {
        badge: "left",
        labels: [
            { x: 28, y: 112, w: 340, h: 74, lines: ["Splint sitting too low"] },
            { x: 28, y: 238, w: 318, h: 110, lines: ["White patch", "below ankle"] },
            { x: 28, y: 458, w: 286, h: 74, lines: ["Shell covers toes"] },
        ],
        arrows: [
            { from: { x: 370, y: 150 }, to: { x: 470, y: 300 } },
            { from: { x: 346, y: 293 }, to: { x: 432, y: 520 } },
            { from: { x: 160, y: 532 }, to: { x: 165, y: 470 } },
        ],
        circles: [
            { cx: 432, cy: 540, rx: 58, ry: 48 },
            { cx: 150, cy: 540, rx: 78, ry: 60 },
        ],
        retouch: "",
    },
    high: {
        badge: "right",
        labels: [
            { x: 28, y: 142, w: 340, h: 110, lines: ["Splint sitting", "too high"] },
            { x: 28, y: 292, w: 318, h: 110, lines: ["White patch", "above ankle"] },
        ],
        arrows: [
            { from: { x: 368, y: 184 }, to: { x: 470, y: 250 } },
            { from: { x: 346, y: 343 }, to: { x: 388, y: 430 } },
        ],
        circles: [
            { cx: 388, cy: 432, rx: 58, ry: 48 },
        ],
        retouch: "",
    },
};

function labelSvg(b: LabelBox): string {
    const cx = b.x + b.w / 2;
    const lineH = 38;
    const startY = b.y + b.h / 2 - ((b.lines.length - 1) * lineH) / 2 + 11;
    const tspans = b.lines
        .map((ln, i) => `<tspan x="${cx}" y="${startY + i * lineH}">${ln}</tspan>`)
        .join("");
    const r = b.h / 2 > 22 ? 22 : b.h / 2;
    return `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${r}" fill="${RED}"/>
        <text text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="#ffffff">${tspans}</text>`;
}

function arrowSvg(a: Arrow): string {
    return `<line x1="${a.from.x}" y1="${a.from.y}" x2="${a.to.x}" y2="${a.to.y}" stroke="${RED}" stroke-width="7" stroke-linecap="round" marker-end="url(#ah)"/>`;
}

function circleSvg(c: Circle): string {
    return `<ellipse cx="${c.cx}" cy="${c.cy}" rx="${c.rx}" ry="${c.ry}" fill="none" stroke="${RED}" stroke-width="5"/>`;
}

function badgeSvg(side: "left" | "right"): string {
    const w = 210;
    const x = side === "left" ? 22 : SIZE - 22 - w;
    const y = 18;
    const h = 58;
    const circleCx = x + w - 30;
    const textX = x + 26;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="29" fill="${RED}"/>
        <text x="${textX}" y="${y + 38}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff">BAD FIT</text>
        <circle cx="${circleCx}" cy="${y + h / 2}" r="22" fill="#ffffff"/>
        <path d="M${circleCx - 9},${y + h / 2 - 9} l18,18 M${circleCx + 9},${y + h / 2 - 9} l-18,18" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`;
}

async function main() {
    const [photoArg, variantArg, outArg] = process.argv.slice(2);
    if (!photoArg || !variantArg || !outArg || !VARIANTS[variantArg]) {
        console.error("Usage: bun src/make-badfit-panel.ts <photo> <low|high> <out.png>");
        process.exit(1);
    }
    const v = VARIANTS[variantArg];
    const root = process.cwd();
    const photoPath = path.isAbsolute(photoArg) ? photoArg : path.join(root, photoArg);
    const outPath = path.isAbsolute(outArg) ? outArg : path.join(root, "output", outArg);

    const meta = await sharp(photoPath).metadata();
    const w = meta.width || 1024;
    const h = meta.height || 768;
    const scaledW = SIZE;
    const scaledH = Math.round((h / w) * SIZE);
    const photoTop = Math.round((SIZE - scaledH) / 2);

    const photo = await sharp(photoPath)
        .resize(scaledW, scaledH, { fit: "fill" })
        .toBuffer();

    const svg = `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <marker id="ah" markerWidth="10" markerHeight="10" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="${RED}"/>
            </marker>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6"/>
            </filter>
        </defs>
        ${v.retouch}
        <rect x="8" y="8" width="${SIZE - 16}" height="${SIZE - 16}" rx="30" ry="30" fill="none" stroke="${RED}" stroke-width="7"/>
        ${v.circles.map(circleSvg).join("")}
        ${v.arrows.map(arrowSvg).join("")}
        ${v.labels.map(labelSvg).join("")}
        ${badgeSvg(v.badge)}
    </svg>`;

    await sharp({
        create: {
            width: SIZE,
            height: SIZE,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    })
        .composite([
            { input: photo, top: photoTop, left: 0 },
            { input: Buffer.from(svg), top: 0, left: 0 },
        ])
        .png()
        .toFile(outPath);

    console.log(`Saved: ${outPath}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
