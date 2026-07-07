import sharp from "sharp";
import path from "path";

/**
 * Builds the "Heel fit comparison" cell (760x760) for the night-splint grid.
 * Stacks three real heel photos vertically, each masked with rounded corners,
 * given a coloured border and a coloured label pill (red = bad, green = good).
 *
 * Usage: bun src/make-heel-compare.ts <out.png> <large.png> <good.png> <small.png>
 */

const SIZE = 760;
const MARGIN = 14;
const GAP = 14;
const RED = "#d11f2d";
const GREEN = "#1f8a4e";

const ROW_W = SIZE - MARGIN * 2;
const ROW_H = Math.round((SIZE - MARGIN * 2 - GAP * 2) / 3);

function resolve(p: string): string {
    const root = process.cwd();
    const cands = [
        path.isAbsolute(p) ? p : path.join(root, p),
        path.join(root, "output", p),
        path.join(root, "input", p),
    ];
    const fs = require("fs");
    for (const c of cands) if (fs.existsSync(c)) return c;
    throw new Error(`Not found: ${p}`);
}

async function roundedRow(src: string): Promise<Buffer> {
    const base = await sharp(resolve(src))
        .resize(ROW_W, ROW_H, { fit: "cover" })
        .toBuffer();
    const mask = Buffer.from(
        `<svg width="${ROW_W}" height="${ROW_H}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${ROW_W}" height="${ROW_H}" rx="22" ry="22" fill="#fff"/></svg>`,
    );
    return sharp(base)
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer();
}

function overlay(rows: { y: number; color: string; text: string }[]): Buffer {
    const pieces = rows
        .map(({ y, color, text }) => {
            const pillW = 24 + text.length * 11;
            return `
            <rect x="${MARGIN}" y="${y}" width="${ROW_W}" height="${ROW_H}" rx="22" ry="22" fill="none" stroke="${color}" stroke-width="6"/>
            <rect x="${MARGIN + 16}" y="${y + 16}" width="${pillW}" height="42" rx="21" fill="${color}"/>
            <text x="${MARGIN + 16 + pillW / 2}" y="${
                y + 16 + 28
            }" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#ffffff">${text}</text>`;
        })
        .join("");
    return Buffer.from(
        `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">${pieces}</svg>`,
    );
}

async function main() {
    const [outArg, large, good, small] = process.argv.slice(2);
    if (!outArg || !large || !good || !small) {
        console.error(
            "Usage: bun src/make-heel-compare.ts <out.png> <large.png> <good.png> <small.png>",
        );
        process.exit(1);
    }

    const y1 = MARGIN;
    const y2 = MARGIN + ROW_H + GAP;
    const y3 = MARGIN + (ROW_H + GAP) * 2;

    const [r1, r2, r3] = await Promise.all([
        roundedRow(large),
        roundedRow(good),
        roundedRow(small),
    ]);

    const overlaySvg = overlay([
        { y: y1, color: RED, text: "BAD \u00b7 Gap too large" },
        { y: y2, color: GREEN, text: "GOOD \u00b7 Correct gap" },
        { y: y3, color: RED, text: "BAD \u00b7 Gap too small" },
    ]);

    const outPath = path.isAbsolute(outArg)
        ? outArg
        : path.join(process.cwd(), "output", outArg);

    await sharp({
        create: {
            width: SIZE,
            height: SIZE,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    })
        .composite([
            { input: r1, top: y1, left: MARGIN },
            { input: r2, top: y2, left: MARGIN },
            { input: r3, top: y3, left: MARGIN },
            { input: overlaySvg, top: 0, left: 0 },
        ])
        .png()
        .toFile(outPath);

    console.log(`Saved: ${outPath} (rowH=${ROW_H})`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
