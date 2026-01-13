# Command: Review and Improve Images for Achilles Recovery Content

Use this command to review images for accuracy, safety, style consistency, and compliance with Achilles recovery positions. The command will automatically generate improved versions when issues are found.

## Usage

```bash
# From the project root
cd services/ai-studio
bun src/review-image.ts path/to/image.png [output-name]

# Or using the npm script
bun run review path/to/image.png [output-name]
```

## What It Checks

### 1. Inaccuracies & Misrepresentations
- ✅ Malformed or incorrectly proportioned person
- ✅ Incorrect product representation (wrong boot appearance, etc.)
- ✅ Wedges shown outside boot instead of inside
- ✅ Wrong medical equipment or devices
- ✅ Products with wrong colors, shapes, or features

### 2. Safety Issues (CRITICAL)
- ✅ **Foot dorsiflexed (toes up) when should be plantarflexed (pointed down)** - MOST DANGEROUS ERROR
- ✅ Aggressive stretching shown during early recovery
- ✅ Unsafe positions or activities
- ✅ Night splint holding foot in dorsiflexion (WRONG - must be plantarflexion)

### 3. Style Consistency
- ✅ Must be Tintin cartoon style (Hergé-inspired, clean lines, clear colors)
- ✅ Wrong art style (photorealistic, 3D render, different cartoon style)

### 4. Character Consistency
- ✅ **Doctor**: Must be in Thetis green scrubs and crocs ONLY
- ✅ **Patient**: 40-year-old white male, slim, average height
  - Day: white Stan Smiths, blue jeans, white t-shirt
  - Gym: blue shorts, blue t-shirt, blue trainers
  - Bed: subtle checked navy pyjamas
  - Showering/swimming: blue swimming trunks
- ✅ Wrong characters (different age, gender, appearance)
- ✅ Wrong outfits for scene context
- ✅ Multiple characters when only doctor and patient should appear

### 5. Position Compliance
- ✅ Contradicts principles from [`achilles-recovery-positions.md`](./achilles-recovery-positions.md):
  - Non-surgical is first-line
  - Boot removal: Week 10-12
  - Early weight-bearing as tolerated
  - Avoid aggressive stretching until fully healed (12-18 months)
  - Night splint holds foot in plantarflexion (pointed down)
  - Gradual boot weaning over 1-2 weeks
  - Heel lifts during transition (0.5-1cm)

### 6. Additional Rules
- ✅ Only doctor and patient characters should appear (no extra people)
- ✅ Scenes should be appropriate to recovery phase
- ✅ Medical accuracy in all equipment and positioning
- ✅ No contradictory information or mixed messages

## Boot Specifications

### VACOped Boot
- Hinged, adjustable range of motion
- Distinctive design with visible hinges
- ~48° plantarflexion capability
- Adjustable settings

### Aircast Boot
- Fixed wedges that are removed over time
- Simpler design
- ~28-30° plantarflexion initially (with 4 wedges)
- Wedges go INSIDE under the heel (NOT visible outside)

## Output

The command will:
1. Review the image and list all issues found
2. If issues are found, generate an improved version
3. Save the improved version as `original-name-2.png` (or `-3`, `-4`, etc. if versions exist)
4. Or use your specified output name

## Reference Images

Place reference images in `services/ai-studio/input/` to guide style and character consistency. The improved image will maintain consistency with these references.

## Requirements

- `GOOGLE_GENERATIVE_AI_API_KEY` must be set in `services/ai-studio/.env`
- Image must exist at the specified path
- Output directory must be writable

## Examples

```bash
# Review and auto-generate improved version
cd services/ai-studio
bun src/review-image.ts ../output/patient-walking.png

# Review and save with specific name
bun src/review-image.ts ../output/patient-walking.png patient-walking-fixed.png

# Review image from website assets
bun src/review-image.ts ../../apps/website/public/images/recovery-exercise.png
```

## When to Use

Use this command whenever:
- You've generated a new image for Achilles recovery content
- You're reviewing existing images for accuracy
- You need to ensure compliance with recovery positions
- You want to verify character and style consistency
- You need to catch dangerous foot positioning errors

## Integration with Content Creation

When creating images for:
- Recovery phase articles (`apps/website/src/content/articles/recovery-phases/`)
- Course lessons (`apps/course/src/content/course/`)
- Website pages (`apps/website/src/pages/`)

Always review images with this command before using them in content.
