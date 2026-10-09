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
    "../output/pf-calf-release-when-it-makes-sense-linkedin-v1.png",
);

function loadImage(filename: string) {
    const filePath = path.join(inputDir, filename);
    const ext = path.extname(filename).toLowerCase();
    const mimeType = ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "image/png";
    return {
        mimeType: mimeType as "image/png" | "image/jpeg",
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn infographic (~1080x1080) that clinicians will SAVE and COMMENT on.

GOAL: Make the Silfverskiold test instantly useful for a decision — not a dry textbook figure. The scroll-stop insight is: calf release only makes sense when this test shows isolated gastrocnemius tightness.

HOUSE STYLE:
- Thetis forest-green + sage + cream. Clean flat cartoon line-art.
- Perfect spelling. No hashtags, URLs, logos, or publisher credits.
- No Springer / Barouk credit line. This is an original Thetis teaching graphic.

CHARACTERS — match mike-and-doc.png EXACTLY in the EXAM row only:
- Doc: older, balding, white hair at sides, white beard, round glasses, Thetis-green scrubs, green crocs. NO white coat. NO stethoscope unless tiny.
- Mike: 40s, slim, short brown hair. Exam: shorts or rolled jeans so the calf is visible. NO walking boot. NO cast.
- THIS IS PLANTAR FASCIITIS — not Achilles rupture.

LAYOUT (fill the square, high contrast, readable as a tiny LinkedIn thumbnail):

TOP BAR (~16%):
Eyebrow: "THE TEST THAT DECIDES"
Title: "Calf Release: When Does It Make Sense?"
Subtitle: "Only if the calf — not just the heel — is driving the problem."

MAIN (the shareable teaching, ~62%): a clean 2x2 grid with column headers.

Column headers, large and bold:
LEFT: "KNEE STRAIGHT"
RIGHT: "KNEE BENT"

TOP ROW — anatomy (side-view cutaway, like the source, but Thetis style):
- LEFT: knee extended. Gastrocnemius taut (Thetis-green muscle, not lurid red). Foot cannot come up. Arrow shows LIMITED dorsiflexion.
- RIGHT: knee flexed. Gastrocnemius relaxed. Foot comes up further. Arrow shows MORE dorsiflexion.
Keep arrows simple and obvious. Bones readable. No clutter.

BOTTOM ROW — exam with Doc and Mike on a sage exam table:
- LEFT: Doc holds Mike's knee straight and dorsiflexes the foot. Limited motion.
- RIGHT: Doc bends Mike's knee and dorsiflexes further. Motion improves.
Same camera angle, same characters, clear before/after.

Small labels on the anatomy row (perfect spelling):
LEFT: "Gastroc taut → motion limited"
RIGHT: "Gastroc relaxes → motion improves"

BOTTOM BANNER (~22%):
Dark-green rounded bar, white text:
"Positive test = isolated gastroc tightness."

Then one short clinician hook (dark text on cream):
"Would you operate on plantar fasciitis without this finding?"

That question is the engagement hook. Do not add extra cards or a busy clinic background in the 4 panels.

DESIGN RULES:
- High contrast. Big type. Lots of breathing room.
- Do not invent statistics.
- Do not show surgery, blood, scalpels, or incisions.
- Spell "gastrocnemius" and "dorsiflexion" correctly if used. Prefer short labels.
- Do not write Silfverskiold on the image unless there is room; if you do, spell it "Silfverskiold".`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadImage("mike-and-doc.png");
    const source = loadImage("pf-silfverskiold-barouk-source.png");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    console.log("Generating engagement Silfverskiold LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE: Use Doc and Mike from this image EXACTLY in the exam panels. No walking boot.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "CONTENT REFERENCE: Keep this 2x2 teaching structure (anatomy top, exam bottom; knee straight left, knee bent right). Restyle it. Do not copy the old colouring, blue scrubs, or any publisher credit. Correct the clinical idea: knee straight limits dorsiflexion if gastroc is tight; knee bent improves it.",
        },
        {
            inlineData: {
                mimeType: source.mimeType,
                data: source.data,
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
