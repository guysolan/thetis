import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(
    __dirname,
    "../input/pf-shockwave-therapy-two-panel-source.jpg",
);
const outputPath = path.resolve(
    __dirname,
    "../output/pf-shockwave-therapy-fb-ig-1024.png",
);

const prompt = `Recompose the attached two-panel illustration as a SINGLE square 1:1 image (1024x1024) for Instagram and Facebook.

LAYOUT:
- Two panels SIDE BY SIDE, filling the whole square. No empty letterbox bars.
- LEFT panel: the shockwave therapy machine / console (exactly as drawn).
- RIGHT panel: the close-up of the probe on the heel with conductive gel (exactly as drawn).
- Thin clean divider or matching white gutter between the two panels.
- Both panels the same height, filling the square from top to bottom.

KEEP EXACTLY:
- Same cartoon line-art style, line weight, colors, and level of detail.
- Same machine: white console, blue screen numbers 2000 / 0 / 10, red circular STOP button, docked white-and-blue handpiece, cable, rolling stand.
- Same treatment shot: black glove, white/blue ringed probe, clear gel on the heel, prone patient on the white exam table, dark grey trousers, metal table frame.
- Same clinical lighting and background.

DO NOT:
- Add titles, captions, logos, hashtags, or extra characters (no Mike/Doc).
- Change the medical content or invent extra equipment.
- Stack the panels vertically. This must be a square side-by-side composition.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const source = fs.readFileSync(inputPath);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    console.log("Generating 1024x1024 shockwave square...");

    const result = await model.generateContent([
        {
            text:
                "This is the SOURCE illustration. Keep its drawing style and details exactly. Only change the layout from a tall two-panel stack into a square side-by-side composition.",
        },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: source.toString("base64"),
            },
        },
        { text: prompt },
    ]);

    const response = await result.response;
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        console.error("No image returned");
        console.log(JSON.stringify(response, null, 2));
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const raw = Buffer.from(imagePart.inlineData.data, "base64");
    await sharp(raw)
        .resize(1024, 1024, { fit: "cover", position: "centre" })
        .png()
        .toFile(outputPath);

    const meta = await sharp(outputPath).metadata();
    console.log(`Created ${outputPath} (${meta.width}x${meta.height})`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
