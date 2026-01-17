# AI Studio

Tools for generating and reviewing images for the Achilles rupture recovery course.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` file in this directory (`services/ai-studio/.env`):

```bash
# Copy the example file
cp .env.example .env

# Then edit .env and add your API keys:
OPENAI_API_KEY=your-openai-api-key-here
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
```

The scripts will automatically load environment variables from the `.env` file:

- `OPENAI_API_KEY` - Used for image review (GPT-4 Vision)
- `GOOGLE_GENERATIVE_AI_API_KEY` - Used for image generation (Gemini)

## Image Review

### Single Image Review

Review a single image for medical accuracy, stylistic consistency, and patient-friendliness:

```bash
bun src/review-image.ts <image-path> [context-file]
```

**Examples:**

```bash
# Review an exercise image
bun src/review-image.ts ../apps/course/src/assets/seated-calf-raise-week-12.png

# Review with course content context
bun src/review-image.ts ../apps/achilles-rupture/public/images/lecture/39m22s.png ../apps/course/src/content/course/standard/week-12-day-0-key-exercises.tsx
```

### Batch Review

Review all images in a directory:

```bash
bun src/review-batch.ts <directory-path> [context-file]
```

**Examples:**

```bash
# Review all lecture images
bun src/review-batch.ts ../apps/achilles-rupture/public/images/lecture

# Review all exercise images with context
bun src/review-batch.ts ../apps/course/src/assets ../apps/course/src/content/course/standard/week-12-day-0-key-exercises.tsx
```

## Review Criteria

Each image is evaluated on three dimensions:

1. **Medical/Anatomical Accuracy (0-10)**
   - Correct anatomy
   - Accurate exercise positions/postures
   - Correct medical devices (boots, splints)
   - Safety concerns or incorrect techniques

2. **Stylistic Consistency (0-10)**
   - Matches expected style for patient education
   - Consistency with other course materials
   - Appropriate visual style (not too clinical, not too casual)
   - Professional colors, lighting, and composition

3. **Patient-Friendliness (0-10)**
   - Clear and easy to understand
   - Helpful and reassuring for patients
   - Free of unnecessary medical jargon
   - Shows proper form/technique clearly
   - Encouraging and not intimidating

## Output

Reviews are saved as JSON files in the `reviews/` directory. Each review includes:

- Overall score (0-10)
- Detailed scores and feedback for each criterion
- Specific issues, strengths, and improvements
- Actionable recommendations

Batch reviews also generate a summary JSON file with statistics.

## Image Generation

Generate images using Google Gemini:

```bash
bun src/index.ts "your prompt here" "output-filename.png"
```

Reference images in the `input/` folder will be automatically included to guide style and characters.

## Image Fixing

Make minor modifications to existing images:

```bash
bun src/fix-image.ts <input-image-path> "fix description" [output-filename.png]
```

**Examples:**

```bash
# Fix a text label
bun src/fix-image.ts output/image.png "fix the text label to say 'Plantarflexion' instead of 'Plantar flexion'"

# Remove an artifact
bun src/fix-image.ts output/image.png "remove the small artifact in the top right corner"

# Adjust an illustration
bun src/fix-image.ts output/image.png "make the spring illustration slightly tighter" output/fixed-image.png
```

The script uses Google Gemini to make very minor modifications while keeping everything else exactly the same. Perfect for fixing small issues like:

- Text corrections
- Removing artifacts
- Minor adjustments to illustrations
- Fixing small details

Output images are saved to the `output/` directory.
