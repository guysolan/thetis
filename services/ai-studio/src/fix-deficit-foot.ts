import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * One-off fix: redraw the foot in the two "deficit" panels of the
 * heel-raise progression so it matches the correct deficit calf-raise
 * position shown in a reference photo (ball of foot on the edge of the box,
 * heel hanging off the back edge, floating below the top of the box).
 *
 * Usage:
 *   bun src/fix-deficit-foot.ts
 */

function loadImagePart(filePath: string) {
    const data = fs.readFileSync(filePath).toString("base64");
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
        ? "image/gif"
        : "image/jpeg";
    return { inlineData: { mimeType, data } };
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }

    const baseImagePath = path.join(
        process.cwd(),
        "output",
        "heel-raise-progression-mike-v15.png",
    );
    const referenceImagePath = path.join(
        process.cwd(),
        "input",
        "heel-deficit-ref.png",
    );
    const outputPath = path.join(
        process.cwd(),
        "output",
        "heel-raise-progression-mike-v16.png",
    );

    for (const p of [baseImagePath, referenceImagePath]) {
        if (!fs.existsSync(p)) {
            console.error(`\x1b[31mError: file not found: ${p}\x1b[0m`);
            process.exit(1);
        }
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log("\x1b[36mEditing:\x1b[0m", baseImagePath);
    console.log("\x1b[36mReference:\x1b[0m", referenceImagePath);

    const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];

    parts.push({
        text:
            "IMAGE 1 is a 4-panel cartoon of a single-leg heel-raise progression. Focus on PANEL 2 (top-right, '2. SINGLE-LEG HEEL RAISE'), a rear view of the man balancing on one foot. IMAGE 2 is an unrelated reference photo - you can ignore it for this edit.",
    });
    parts.push(loadImagePart(baseImagePath));
    parts.push(loadImagePart(referenceImagePath));
    parts.push({
        text:
            `Edit IMAGE 1. Change ONLY panel 2 (top-right, '2. SINGLE-LEG HEEL RAISE'). Leave panels 1, 3 and 4 completely untouched and identical.

In panel 2 the man is balancing on one foot but his standing foot is too flat / only partially raised. Redraw his standing foot and lower leg so he is at the very TOP of a single-leg calf raise, fully up on tiptoe:
- The heel of the standing foot is lifted HIGH off the floor - maximum heel elevation. His whole body weight is supported on the BALL of that foot and the toes only. The ankle is fully pointed/plantarflexed and the calf is visibly contracted.
- There must be a clear, large gap of air between the raised heel and the floor. Do NOT show a flat foot and do NOT show a heel that is only slightly raised - it must read clearly as a completed calf raise on tiptoe.
- Keep the non-working leg lifted off the floor and bent at the knee, just as it is now.
- Keep his body, clothes, the rear-view angle, the wall, floor and the caption all the same; just raise the heel and put him on tiptoe.

Do not alter panels 1, 3 or 4 at all, and keep all four text captions exactly as they are.`,
    });

    const result = await model.generateContent(parts);
    const response = await result.response;

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content.parts.find((p: any) => p.inlineData);

    if (imagePart && (imagePart as any).inlineData) {
        const buffer = Buffer.from((imagePart as any).inlineData.data, "base64");
        fs.writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(`\x1b[32mSuccess!\x1b[0m Saved to: \x1b[34m${outputPath}\x1b[0m`);
    } else {
        console.error("No image data found in response.");
        console.log(JSON.stringify(candidate?.content.parts, null, 2));
    }
}

main().catch(console.error);
