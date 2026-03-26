---
name: AI Studio — Generate Image
description: Generate a course/illustration image with Gemini via services/ai-studio (reference assets in input/, output to output/).
tools: Read, RunTerminalCmd
---

# AI Studio — Generate Image

Use **`services/ai-studio`** (Gemini) to generate an image. The script resolves **`input/`** and **`output/`** relative to the current working directory, so **always run commands from `services/ai-studio`**.

## Prerequisites

- `services/ai-studio/.env` with `GOOGLE_GENERATIVE_AI_API_KEY` (see [ai-studio README](../../services/ai-studio/README.md)).
- Optional: add reference PNG/JPEG/WebP files under `services/ai-studio/input/` (e.g. `mike-and-doc.png`, `tintin-style-blood-clots.png`, `aircast-vs-vacoped-reference.png`) — they are picked up automatically and ordered per the generator logic in `src/index.ts`.

## Generate

```bash
cd services/ai-studio && bun src/index.ts "Your full image prompt here" "your-output-filename.png"
```

- Second argument is optional; if omitted, the script writes `gen-<timestamp>.png` under `output/`.
- Successful runs save to **`services/ai-studio/output/<filename>`**.

### Example

```bash
cd services/ai-studio && bun src/index.ts "Simple Tintin-style diagram: wedge stack under heel in an Aircast, labels minimal, educational" wedge-mechanism-diagram.png
```

## After generation

From `services/ai-studio` (same as generation):

- **Review** (optional): `bun src/review-image.ts output/your-output-filename.png` — add a course content file path as second arg for context (see README).
- **Small fixes** (optional): `bun src/fix-image.ts output/your-output-filename.png "describe the tiny change"` — keeps the rest of the image stable.

Full options and batch review: [ai-studio README](../../services/ai-studio/README.md).

## Agent instructions

1. Confirm the user’s prompt and desired output basename (`.png` recommended).
2. Run the `cd services/ai-studio && bun src/index.ts ...` command with their prompt and filename.
3. Report the path under `services/ai-studio/output/` and offer review/fix next steps if useful.
