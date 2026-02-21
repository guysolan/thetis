# Apply surgeon / clinical feedback to course content

Use this when the user provides **feedback from surgeons or clinicians** (bullet points, numbered items, or free text) and wants it applied to **course lesson pages** in `apps/course/src/content/course/standard/`.

## Steps

1. **Identify which lessons**  
   Match feedback to lesson files. Lessons live under:
   - `00-practical/` — e.g. pain-management-throughout-recovery, mental-health-recovery
   - `01-emergency/` — e.g. blood-clot-prevention, emergency-care
   - `02-early-treatment/`, `03-boot-phase/`, etc.  
   User may refer to lessons by number (e.g. “#2 Pain Management”) or title; resolve to the correct `.tsx` file in `standard/**/*.tsx`.

2. **Read the full content** of each target file before editing.

3. **Apply each feedback item literally**  
   - **Text changes**: Update the exact sentence/section mentioned (e.g. “DELETE (not in pain at this stage)” → remove that phrase).  
   - **Additions**: Add new intro line, bullet, warning, or section where specified.  
   - **Clarifications**: Replace vague wording with the requested wording (e.g. glossary terms, “ask immediately” vs “at follow-up”).  
   - **Stages / timing**: If they correct stages (e.g. “0–1 / 2–8” or “week 5 when boot adjustments begin”), align the content table or copy with that.

4. **Icing / safety instructions**  
   If feedback mentions icing: ensure the lesson states that the **boot must be removed** to apply ice, and that the foot should be **toes-down (pointed)** while icing, with a clear **warning not** to let the ankle go toes-up (to avoid stressing the healing tendon).

5. **Image changes**  
   If feedback describes **illustration or image** changes (e.g. “scan should be of back of calf, not knee”, “patient in jeans and trainers”):  
   - **Do not** create or replace image files yourself.  
   - **Do** update the lesson content: adjust `alt` text to describe what the image *should* show, and add a brief in-file comment (e.g. `// IMAGE TO UPDATE: …`) next to the image block so the user can update the asset.  
   - In your **summary**, list each image that needs changing and what should be different (e.g. “42% Doppler image: scan of back of calf, not knee”; “DVT cartoon: patient in hospital attire, not jeans and trainers”).

6. **Standalone-lesson note**  
   If feedback says the lesson “assumes read #1” or similar: add one short line in the **intro** (the `content.intro` string, not the metadata description) that the lesson **stands on its own** and they don’t need to have read any other lesson first.

7. **Summarise**  
   After edits, give a short summary **per file**: what you changed (and for images, what the user should change in the assets).

## Content structure reminder

- **Metadata** (`metadata.description`, `title`, `slug`): used in nav/cards — not the main lesson intro.
- **Content intro** (`content.intro`): the paragraph learners see at the top of the lesson — use this for “stands on its own” and similar intros.
- **Blocks**: `type: "section"`, `"alert"`, `"card"`, `"faq"`, `"list"`, `"table"`, etc. Edit the block that contains the sentence/section referenced in the feedback.

## Example feedback → actions

| Feedback | Action |
|----------|--------|
| “DELETE (not in pain at this stage)” | Remove the phrase “you're in pain” (or the parenthetical) from that sentence. |
| “Glossary: VTE = venous thrombo-embolism. Umbrella term…” | Replace the glossary list item with the exact wording given. |
| “reasonable to ask about it immediately (not at follow-up!)” | Change “at your follow-up” to “ask about it immediately — don’t wait until a follow-up”. |
| “Cartoon of 42% - scan should be of back of calf, not knee” | Update `alt` to describe back-of-calf scan; add `// IMAGE TO UPDATE: …`; mention in summary. |

## Checklist before finishing

- [ ] Every mentioned lesson file has been opened and edited as needed.
- [ ] Text edits match the feedback (wording, deletions, additions).
- [ ] Image-related feedback is reflected in `alt` + comment and in your summary.
- [ ] Summary lists changes per file and any image updates for the user to do.
