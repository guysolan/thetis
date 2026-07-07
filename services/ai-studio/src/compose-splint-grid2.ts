import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Two-row night-splint infographic:
 *   Title strip.
 *   Row 1: three full-foot panels (already annotated) — too low, too high, good fit.
 *   Row 2: heel comparison strip — three heel-zoom photos with red/green
 *          borders and labels (bad gap too large, good correct gap, bad too small).
 *
 * Usage:
 *   bun src/compose-splint-grid2.ts <out.png> <p1> <p2> <p3> <heelLarge> <heelGood> <heelSmall>
 */

const M = 36;
const G = 24;
const P = 560;
const TITLE_H = 150;
const GAP_TITLE = 28;
const GAP_ROWS = 28;
const HEEL_H = 430;
const TITLE = "How do I know if my night splint fits correctly?";
const NAVY = "#15233f";
const RED = "#d11f2d";
const GREEN = "#1f8a4e";

const W = 3 * P + 2 * G + 2 * M;
const topRowY = TITLE_H + GAP_TITLE;
const heelRowY = topRowY + P + GAP_ROWS;
const H = heelRowY + HEEL_H + M;
const xs = [M, M + P + G, M + 2 * (P + G)];

function resolve(p: string): string {
    const root = process.cwd();
    const cands = [
        path.isAbsolute(p) ? p : path.join(root, p),
        path.join(root, "output", p),
        path.join(root, "input", p),
    ];
    for (const c of cands) if (fs.existsSync(c)) return c;
    throw new Error(`Not found: ${p}`);
}

async function topPanel(src: string): Promise<Buffer> {
    return sharp(resolve(src)).resize(P, P, { fit: "cover" }).toBuffer();
}

type Frac = { left: number; top: number; width: number; height: number };

async function heelCell(
    src: string,
    color: string,
    text: string,
    frac: Frac = { left: 0.38, top: 0.16, width: 0.62, height: 0.84 },
): Promise<Buffer> {
    const file = resolve(src);
    const meta = await sharp(file).metadata();
    const w = meta.width || 1024;
    const h = meta.height || 768;
    // Zoom into the heel region (fractions of the source).
    const region = {
        left: Math.round(w * frac.left),
        top: Math.round(h * frac.top),
        width: Math.round(w * frac.width),
        height: Math.round(h * frac.height),
    };
    const photo = await sharp(file)
        .extract(region)
        .resize(P, HEEL_H, { fit: "cover" })
        .toBuffer();
    const mask = Buffer.from(
        `<svg width="${P}" height="${HEEL_H}" xmlns="http://www.w3.org/2000/svg"><rect width="${P}" height="${HEEL_H}" rx="24" ry="24" fill="#fff"/></svg>`,
    );
    const rounded = await sharp(photo)
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer();
    const pillW = 26 + text.length * 12;
    const overlay = Buffer.from(
        `<svg width="${P}" height="${HEEL_H}" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="${P - 6}" height="${
            HEEL_H - 6
        }" rx="24" ry="24" fill="none" stroke="${color}" stroke-width="6"/>
            <rect x="18" y="18" width="${pillW}" height="46" rx="23" fill="${color}"/>
            <text x="${18 + pillW / 2}" y="${
            18 + 31
        }" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#ffffff">${text}</text>
        </svg>`,
    );
    return sharp(rounded)
        .composite([{ input: overlay, top: 0, left: 0 }])
        .png()
        .toBuffer();
}

async function main() {
    const [out, p1, p2, p3, hl, hg, hs] = process.argv.slice(2);
    if (!out || !p1 || !p2 || !p3 || !hl || !hg || !hs) {
        console.error(
            "Usage: bun src/compose-splint-grid2.ts <out.png> <p1> <p2> <p3> <heelLarge> <heelGood> <heelSmall>",
        );
        process.exit(1);
    }

    const titleSvg = Buffer.from(
        `<svg width="${W}" height="${TITLE_H}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${W}" height="${TITLE_H}" fill="${NAVY}"/>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${TITLE}</text>
        </svg>`,
    );

    const [t1, t2, t3] = await Promise.all([
        topPanel(p1),
        topPanel(p2),
        topPanel(p3),
    ]);
    // All three heel images are now the SAME framing as the GOOD FIT reference
    // photo (only the heel strap tension differs), so use one identical heel
    // crop for all three to keep the camera/zoom consistent.
    const heelFrac: Frac = { left: 0.44, top: 0.32, width: 0.56, height: 0.68 };
    const [c1, c2, c3] = await Promise.all([
        heelCell(hl, RED, "BAD \u00b7 Gap too large", heelFrac),
        heelCell(hg, GREEN, "GOOD \u00b7 Correct gap", heelFrac),
        heelCell(hs, RED, "BAD \u00b7 Gap too small", heelFrac),
    ]);

    const outPath = path.isAbsolute(out)
        ? out
        : path.join(process.cwd(), "output", out);

    await sharp({
        create: {
            width: W,
            height: H,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    })
        .composite([
            { input: titleSvg, top: 0, left: 0 },
            { input: t1, top: topRowY, left: xs[0] },
            { input: t2, top: topRowY, left: xs[1] },
            { input: t3, top: topRowY, left: xs[2] },
            { input: c1, top: heelRowY, left: xs[0] },
            { input: c2, top: heelRowY, left: xs[1] },
            { input: c3, top: heelRowY, left: xs[2] },
        ])
        .png()
        .toFile(outPath);

    console.log(`Saved: ${outPath} (${W}x${H})`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
