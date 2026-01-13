# Google AI Studio Image Generation

A simple service to generate images using Google's Gemini model via the Generative AI API.

## Setup

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a `.env` file in this directory and add your key:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

## Usage

### Generate New Images

Run the generation script with a prompt:

```bash
bun generate "A futuristic hospital room for tendon rehabilitation"
```

The image will be saved in the `output/` directory.

You can also specify an output filename:

```bash
bun generate "Achilles tendon diagram" "achilles-diagram.png"
```

### Review and Improve Existing Images

Review images for accuracy, safety, style, and compliance with recovery positions:

```bash
bun run review path/to/image.png [output-name]
```

This will:

- Check for inaccuracies, safety issues, style problems, and position compliance
- Generate an improved version if issues are found
- Save as `original-name-2.png` (or your specified name)
- Automatically uses `mike-and-doc.png` as the primary character reference for improved images

## Reference Images (Style/Character Consistency)

Place any reference images in the `input/` folder. These will be automatically included in the generation request to guide the AI on style and characters.

**CRITICAL: Character Reference**

The file `mike-and-doc.png` in the `input/` folder is the **primary character reference**. This image shows the exact doctor and patient characters that must be used in all generated images. The script will automatically prioritize this file and explicitly instruct the AI to match these characters exactly.

- **Doctor:** Thetis green scrubs and crocs (as shown in mike-and-doc.png)
- **Patient:** 40-year-old white male, slim, average height (as shown in mike-and-doc.png)

**Supported formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

**Example workflow:**

1. Ensure `mike-and-doc.png` is in the `input/` folder (it will be prioritized automatically)
2. Add any additional reference images to `input/`:

   ```
   input/
   ├── mike-and-doc.png          # Primary character reference (required)
   ├── product-reference.png      # Optional product/style references
   └── style-guide.png            # Optional style guides
   ```

3. Run generation — the AI will use mike-and-doc.png as the primary character reference:

   ```bash
   bun generate "A person learning to use crutches in a hospital corridor"
   ```

4. The generated image will maintain visual consistency with the characters from mike-and-doc.png.
