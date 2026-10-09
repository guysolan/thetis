import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputDir = path.join(process.cwd(), "output");
const stroke = "#0c4a36";
const sage = "#d7eadf";
const cream = "#eef6f1";

const SLOT = { left: 48, top: 196, width: 468, height: 620 };

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function text(
    value: string,
    x: number,
    y: number,
    className: string,
    anchor: "start" | "middle" = "middle",
): string {
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${className}">${escapeXml(value)}</text>`;
}

const styles = `
      .eyebrow {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 3.2px;
        fill: #0c4a36;
      }
      .headline {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 38px;
        font-weight: 900;
        fill: #050706;
      }
      .subhead {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 600;
        fill: #2a3d34;
      }
      .colTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 1.2px;
        fill: #0c4a36;
      }
      .bodySm {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 600;
        fill: #1a2a22;
      }
      .stat {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 56px;
        font-weight: 900;
        fill: #0c4a36;
      }
      .statLabel {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 17px;
        font-weight: 700;
        fill: #1a2a22;
      }
      .footerTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 800;
        fill: #062f23;
      }
      .footerBody {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 600;
        fill: #1a2a22;
      }
`;

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

function header(eyebrow: string, line1: string, sub: string): string {
    return `
  <rect x="0" y="0" width="1080" height="168" fill="${sage}"/>
  <rect x="0" y="168" width="1080" height="5" fill="${stroke}"/>
  ${text(eyebrow, 540, 46, "eyebrow")}
  ${text(line1, 540, 100, "headline")}
  ${text(sub, 540, 142, "subhead")}
`;
}

function footer(title: string, body: string): string {
    return `
  <rect x="48" y="840" width="984" height="188" rx="18" fill="${sage}" stroke="${stroke}" stroke-width="3"/>
  ${text(title, 540, 910, "footerTitle")}
  ${text(body, 540, 958, "footerBody")}
`;
}

function graphic1Overlay(): string {
    const rx = 544;
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs><style>${styles}</style></defs>
  <rect width="1080" height="1080" fill="${cream}"/>
  ${header(
        "ACHILLES RUPTURE",
        "NOT ONE-SIZE-FITS-ALL",
        "Which treatment fits this patient?",
    )}
  <rect x="${SLOT.left}" y="${SLOT.top}" width="${SLOT.width}" height="${SLOT.height}" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>

  <rect x="${rx}" y="196" width="488" height="200" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("SURGERY", rx + 244, 248, "colTitle")}
  ${text("May lower re-rupture risk", rx + 244, 292, "bodySm")}
  ${text("in some patient groups.", rx + 244, 326, "bodySm")}
  ${text("Adds wound and infection risk.", rx + 244, 360, "bodySm")}

  <rect x="${rx}" y="412" width="488" height="200" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("NON-SURGICAL", rx + 244, 464, "colTitle")}
  ${text("Avoids operative complications", rx + 244, 508, "bodySm")}
  ${text("Needs structured rehab and", rx + 244, 542, "bodySm")}
  ${text("strong patient commitment", rx + 244, 576, "bodySm")}

  <rect x="${rx}" y="628" width="488" height="188" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("DECIDE ON THE PERSON", rx + 244, 678, "colTitle")}
  ${text("Age, goals, health, injury,", rx + 244, 722, "bodySm")}
  ${text("rehab commitment, risk tolerance", rx + 244, 756, "bodySm")}

  ${footer(
        "Individualised treatment.",
        "Shared decision-making — not one pathway for every rupture.",
    )}
</svg>`;
}

function graphic2Overlay(): string {
    const rx = 544;
    const steps = [
        { t: "1  PROTECT", b: "Guard the repair", y: 196 },
        { t: "2  LOAD", b: "Increase demand slowly", y: 340 },
        { t: "3  REBUILD", b: "Restore strength", y: 484 },
    ];
    const cards = steps
        .map(
            (s) => `
  <rect x="${rx}" y="${s.y}" width="488" height="128" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text(s.t, rx + 244, s.y + 52, "colTitle")}
  ${text(s.b, rx + 244, s.y + 92, "bodySm")}
`,
        )
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs><style>${styles}</style></defs>
  <rect width="1080" height="1080" fill="${cream}"/>
  ${header(
        "ACHILLES REHABILITATION",
        "NOT ONLY PROTECTION",
        "Early movement — without rushing the repair",
    )}
  <rect x="${SLOT.left}" y="${SLOT.top}" width="${SLOT.width}" height="${SLOT.height}" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${cards}
  <rect x="${rx}" y="628" width="488" height="188" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("CAUTION", rx + 244, 678, "colTitle")}
  ${text("Too much upward ankle motion", rx + 244, 722, "bodySm")}
  ${text("too early can lengthen the tendon", rx + 244, 756, "bodySm")}
  ${footer(
        "Protect. Then load. Then rebuild.",
        "Early mobilisation is not the same as rushing recovery.",
    )}
</svg>`;
}

function graphic3Overlay(): string {
    const rx = 544;
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs><style>${styles}</style></defs>
  <rect width="1080" height="1080" fill="${cream}"/>
  ${header(
        "ACHILLES RUPTURE",
        "SPORT ≠ FUNCTION",
        "Walking without pain is not sport clearance",
    )}
  <rect x="${SLOT.left}" y="${SLOT.top}" width="${SLOT.width}" height="${SLOT.height}" rx="18" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>

  <rect x="${rx}" y="196" width="488" height="150" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("~80%", rx + 244, 268, "stat")}
  ${text("may return to previous activity", rx + 244, 314, "bodySm")}

  <rect x="${rx}" y="362" width="488" height="150" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("10–30%", rx + 244, 434, "stat")}
  ${text("weaker push-off even a year later", rx + 244, 480, "bodySm")}

  <rect x="${rx}" y="528" width="488" height="288" rx="16" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  ${text("REBUILD FIRST", rx + 244, 578, "colTitle")}
  ${text("Calf strength", rx + 244, 624, "bodySm")}
  ${text("Tendon capacity", rx + 244, 662, "bodySm")}
  ${text("Elastic / sport-specific movement", rx + 244, 700, "bodySm")}
  ${text("Psychological readiness", rx + 244, 738, "bodySm")}

  ${footer(
        "Return to sport is a process.",
        "Clear on criteria — not a single date.",
    )}
</svg>`;
}

const scenes = [
    {
        filename: "achilles-scene-treatment-consult.png",
        output: "achilles-treatment-not-one-size-linkedin-mike-doc-v2.png",
        overlay: graphic1Overlay,
        prompt: `Create a vertical clinic illustration, NO TEXT, NO LABELS, NO LOGOS.

Match mike-and-doc.png EXACTLY:
- Doc: older, balding, white hair at sides, white beard, round glasses, Thetis-green scrubs, green crocs, yellow clipboard.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans.
- Same London clinic: wood floor, plant, windows with Big Ben / red bus, medical cart.

THIS IS ACHILLES RUPTURE. Mike sits on a wooden chair. ONE black walking boot on the injured foot. The other foot is a white sneaker. Doc stands explaining options calmly — shared decision, not selling surgery. Warm, professional.

Crop: portrait 3:4, characters large in frame, from about mid-thigh up is OK but show the boot clearly. Soft sage/cream room. No writing on clipboard or screens.`,
    },
    {
        filename: "achilles-scene-early-mobilisation.png",
        output: "achilles-early-mobilisation-linkedin-mike-doc-v2.png",
        overlay: graphic2Overlay,
        prompt: `Create a vertical clinic illustration, NO TEXT, NO LABELS, NO LOGOS.

Match mike-and-doc.png EXACTLY for Doc and Mike (same faces, clothes, clinic).

THIS IS ACHILLES RUPTURE REHAB. Mike is STANDING and taking a careful step in ONE black walking boot; the other foot is a white sneaker. Doc stands beside him, clipboard down, one hand gently coaching — encouraging controlled movement, not rushing. Mike looks concentrated but hopeful.

Portrait 3:4, characters large. Show the boot. Same London clinic. No writing anywhere.`,
    },
    {
        filename: "achilles-scene-return-to-sport.png",
        output: "achilles-return-to-sport-vs-function-linkedin-mike-doc-v2.png",
        overlay: graphic3Overlay,
        prompt: `Create a vertical clinic / physio illustration, NO TEXT, NO LABELS, NO LOGOS.

Match mike-and-doc.png EXACTLY for Doc and Mike (same faces).

LATER RECOVERY: Mike has NO walking boot. White sneakers on BOTH feet, white t-shirt, blue jeans or navy training shorts. He is doing or preparing a single-leg heel raise / athletic stance — strong but not fully "match fit". Doc stands beside him with a clipboard, checking readiness, encouraging but careful. This is return-to-sport assessment, not a celebration party.

Portrait 3:4, characters large. Same London clinic feel. No writing on clipboard or walls.`,
    },
];

async function generateScene(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    mikeAndDoc: ReturnType<typeof loadPng>,
    scene: (typeof scenes)[number],
): Promise<string> {
    const outPath = path.join(outputDir, scene.filename);
    console.log(`Generating ${scene.filename}...`);

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE: Match Doc and Mike EXACTLY from this image — faces, bodies, clothing, illustration style.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        { text: scene.prompt },
    ]);

    const response = await result.response;
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        throw new Error(`No image returned for ${scene.filename}`);
    }

    fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, "base64"));
    console.log(`Saved ${outPath}`);
    return outPath;
}

async function roundedSlot(inputPath: string): Promise<Buffer> {
    const mask = Buffer.from(
        `<svg width="${SLOT.width}" height="${SLOT.height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${SLOT.width}" height="${SLOT.height}" rx="18" fill="#ffffff"/>
</svg>`,
    );

    return sharp(inputPath)
        .resize(SLOT.width, SLOT.height, { fit: "cover", position: "centre" })
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer();
}

async function compose(
    scenePath: string,
    overlaySvg: string,
    outputName: string,
) {
    const outputPath = path.join(outputDir, outputName);
    const character = await roundedSlot(scenePath);
    const overlay = await sharp(Buffer.from(overlaySvg)).png().toBuffer();

    await sharp(overlay)
        .composite([
            {
                input: character,
                left: SLOT.left,
                top: SLOT.top,
            },
        ])
        .png()
        .toFile(outputPath);

    console.log(`Created ${outputPath}`);
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    fs.mkdirSync(outputDir, { recursive: true });
    const mikeAndDoc = loadPng("mike-and-doc.png");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "3:4" },
        },
    });

    for (const scene of scenes) {
        const scenePath = path.join(outputDir, scene.filename);
        if (!fs.existsSync(scenePath)) {
            await generateScene(model, mikeAndDoc, scene);
        } else {
            console.log(`Using existing ${scene.filename}`);
        }
        await compose(scenePath, scene.overlay(), scene.output);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
