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

Run the generation script with a prompt:

```bash
bun generate "A futuristic hospital room for tendon rehabilitation"
```

The image will be saved in the `output/` directory.

### Options

You can also specify an output filename:

```bash
bun generate "Achilles tendon diagram" "achilles-diagram.png"
```

## Reference Images (Style/Character Consistency)

Place any reference images in the `input/` folder. These will be automatically included in the generation request to guide the AI on style and characters.

**Supported formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

**Example workflow:**

1. Add your character reference image(s) to `input/`:

   ```
   input/
   ├── character-reference.png
   └── style-guide.png
   ```

2. Run generation — the AI will use these as style guides:

   ```bash
   bun generate "A person learning to use crutches in a hospital corridor"
   ```

3. The generated image will maintain visual consistency with your reference images.
