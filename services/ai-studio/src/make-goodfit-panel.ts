import sharp from "sharp";
import path from "path";

/**
 * Builds the GOOD FIT panel for the night-splint grid by placing the REAL
 * product photo (unaltered) on a white square and drawing the green border,
 * GOOD FIT badge and callouts as a vector overlay. The photo pixels are never
 * passed through an image model, so the device stays 100% authentic.
 *
 * Usage: bun src/make-goodfit-panel.ts <photo> <out.png>
 */

const SIZE = 760;
const GREEN = "#1f8a4e";

async function main() {
    const [photoArg, outArg] = process.argv.slice(2);
    if (!photoArg || !outArg) {
        console.error("Usage: bun src/make-goodfit-panel.ts <photo> <out.png>");
        process.exit(1);
    }
    const root = process.cwd();
    const photoPath = path.isAbsolute(photoArg)
        ? photoArg
        : path.join(root, photoArg);
    const outPath = path.isAbsolute(outArg)
        ? outArg
        : path.join(root, "output", outArg);

    // Fit the whole landscape photo into the square (letterbox, no cropping).
    const meta = await sharp(photoPath).metadata();
    const w = meta.width || 1024;
    const h = meta.height || 768;
    const scaledW = SIZE;
    const scaledH = Math.round((h / w) * SIZE);
    const photoTop = Math.round((SIZE - scaledH) / 2);

    const photo = await sharp(photoPath)
        .resize(scaledW, scaledH, { fit: "fill" })
        .toBuffer();

    const label = (
        x: number,
        y: number,
        wBox: number,
        hBox: number,
        lines: string[],
    ) => {
        const cx = x + wBox / 2;
        const lineH = 30;
        const startY = y + hBox / 2 - ((lines.length - 1) * lineH) / 2 + 9;
        const tspans = lines
            .map(
                (ln, i) =>
                    `<tspan x="${cx}" y="${startY + i * lineH}">${ln}</tspan>`,
            )
            .join("");
        return `<rect x="${x}" y="${y}" width="${wBox}" height="${hBox}" rx="${
            hBox / 2 > 22 ? 22 : hBox / 2
        }" fill="${GREEN}"/>
        <text text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#ffffff">${tspans}</text>`;
    };

    const arrow = (x1: number, y1: number, x2: number, y2: number) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GREEN}" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"/>`;

    const svg = `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <marker id="ah" markerWidth="9" markerHeight="9" refX="5.5" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L6,3 L0,6 Z" fill="${GREEN}"/>
            </marker>
        </defs>
        <rect x="8" y="8" width="${SIZE - 16}" height="${
        SIZE - 16
    }" rx="30" ry="30" fill="none" stroke="${GREEN}" stroke-width="7"/>

        <!-- GOOD FIT badge top-right -->
        <rect x="500" y="18" width="242" height="58" rx="29" fill="${GREEN}"/>
        <text x="528" y="56" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff">GOOD FIT</text>
        <circle cx="712" cy="47" r="22" fill="#ffffff"/>
        <path d="M701,47 l8,9 l16,-19" stroke="${GREEN}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- White patch centered on ankle (points to white label) -->
        ${arrow(262, 178, 405, 424)}
        ${label(36, 128, 224, 80, ["White patch", "on ankle"])}

        <!-- Straps secure & even (points to forefoot strap) -->
        ${arrow(264, 372, 312, 482)}
        ${label(36, 300, 228, 80, ["Straps secure", "&amp; even"])}

        <!-- Heel seated fully back (points to heel) -->
        ${arrow(585, 666, 598, 548)}
        ${label(452, 668, 278, 82, ["Heel seated", "fully back"])}

        <!-- Toes resting naturally (points to toes) -->
        ${arrow(168, 670, 112, 582)}
        ${label(36, 672, 276, 78, ["Toes resting", "naturally"])}
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
