import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputPath = path.resolve(
    __dirname,
    "../output/pf-dont-stop-stretching-linkedin-mike-doc-v1.png",
);

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn educational infographic (~1080x1080). Clean, professional, readable as a thumbnail.

CHARACTERS — match mike-and-doc.png EXACTLY:
- Doc: older man, balding with white hair at the sides, white beard, round glasses, Thetis-green scrubs, green crocs, yellow clipboard.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans, white sneakers.
- Same flat cartoon line-art house style, same forest-green + sage + cream palette, same modern clinic feel.

THIS IS PLANTAR FASCIITIS / HEEL PAIN — NOT Achilles rupture.
- NO walking boot. NO cast. Mike wears normal white sneakers on BOTH feet.
- Soft physio / clinic room, uncluttered.

TOPIC:
Title (large, bold, dark green sans-serif, perfectly spelled):
"Don't Stop Stretching When the Pain Improves"

Small eyebrow above title:
"PLANTAR FASCIITIS"

Subtitle:
"Feeling better is a great sign — not a reason to stop."

MAIN SCENE (upper-middle, the visual hook):
Mike is doing a standing wall calf stretch: both hands on a wall, one back leg stretched with heel down, looking relieved and a bit too ready to move on (as if the pain has settled). Doc stands beside him, clipboard in hand, warmly coaching him to keep going — preventative maintenance, not "you're done." Friendly, reassuring, not lecturing.

FOUR COMPACT REMINDER CARDS in a 2x2 grid below the scene. Short text only, perfect spelling:

1. KEEP STRETCHING
Several times a week, even as pain settles

2. REDUCE GRADUALLY
Don't stop completely overnight

3. DON'T RUSH RUNNING
Avoid increasing activity too quickly

4. BE PATIENT
Progress can take weeks — and start later

BOTTOM BANNER — rounded sage/dark-green bar with clear, perfectly spelled text:
"Think of stretching as preventative maintenance."

Small footer line:
"Recovery is not just getting better. It's staying better."

DESIGN RULES:
- Perfect spelling. Legible text. No typos. No hashtags. No URLs. No logos.
- Plenty of breathing room. Not cluttered.
- Professional patient-education tone.
- Keep Mike and Doc as the visual focus.
- Do not invent extra medical claims or statistics.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng("mike-and-doc.png");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log("Generating Don't Stop Stretching LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character reference: Use 'mike-and-doc.png' EXACTLY for Doc and Mike — same faces, body types, clothing, and illustration quality. Match them precisely. This is plantar fasciitis education: Mike must NOT wear a walking boot.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
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
    fs.writeFileSync(
        outputPath,
        Buffer.from(imagePart.inlineData.data, "base64"),
    );
    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
