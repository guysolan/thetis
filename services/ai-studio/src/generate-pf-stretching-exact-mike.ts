import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

const exactMikeReferencePath =
    "C:\\Users\\vajle\\.cursor\\projects\\c-Users-vajle-thetis\\assets\\c__Users_vajle_AppData_Roaming_Cursor_User_workspaceStorage_7a1a33bd819ebcd545427acb3584edcd_images_image-d15e096f-3f18-416e-9062-e9c29c6217aa.png";

const originalHandoutReferencePath = path.join(
    process.cwd(),
    "input",
    "pf-stretching-exercises-original-user-reference.png",
);

const outputPath = path.join(
    process.cwd(),
    "output",
    "pf-stretching-exercises-two-page-mike-v38-exact-mike-course-ready.png",
);

function mimeTypeFor(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".webp") return "image/webp";
    if (ext === ".gif") return "image/gif";
    return "image/jpeg";
}

function imagePart(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Reference image not found: ${filePath}`);
    }

    return {
        inlineData: {
            mimeType: mimeTypeFor(filePath),
            data: fs.readFileSync(filePath).toString("base64"),
        },
    };
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    const prompt = `
Create a polished course-ready plantar fasciitis stretching exercise handout.

REFERENCE PRIORITY:
1. The FIRST reference image is the EXACT Mike character. Use this exact character for every person shown: same face, short dark spiky hair, friendly expression, slim build, white t-shirt, blue jeans, white sneakers or barefoot only when the exercise requires it. Do not use any other male character design.
2. The SECOND reference image is only for the clinical two-page handout layout and exercise sequence.

Output requirements:
- Square educational graphic with two portrait pages side by side.
- Keep the course-friendly illustrated style: clean outlines, soft cream/white paper, readable black/blue text, professional but not too cartoony.
- Every exercise example must be Mike from the first reference.
- Exercises must be in the correct order and visually clear:
  1. Seated foot-on-knee toe stretch.
  2. Seated towel stretch with leg straight.
  3. Ice pack application wrapped in towel.
  4. Standing toe raises / tibialis posterior strengthening.
  5. One-foot balance.
  6. Wall calf stretch with knee straight and heel down.
  7. Seated bottle/can plantar fascia massage.
  8. Step-edge calf stretch.
- Add small circular number markers 1-8 near each exercise so the sequence is obvious.
- Use concise readable labels/instructions. Avoid gibberish text.
- Do not change Mike into a different hairstyle, face, outfit, or body type.
`;

    const result = await model.generateContent([
        {
            text:
                "Use the next image as the exact Mike character reference. This is not optional.",
        },
        imagePart(exactMikeReferencePath),
        {
            text:
                "Use the next image only for the original worksheet layout and ordering.",
        },
        imagePart(originalHandoutReferencePath),
        { text: prompt },
    ]);

    const response = await result.response;
    const image = response.candidates?.[0]?.content.parts.find((part: any) =>
        part.inlineData
    );

    if (!image?.inlineData?.data) {
        throw new Error("No image data returned from Gemini.");
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, new Uint8Array(Buffer.from(image.inlineData.data, "base64")));
    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
