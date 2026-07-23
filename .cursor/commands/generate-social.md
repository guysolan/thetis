---
name: Generate Social Post
description: Generate a LinkedIn, Instagram, or Facebook post on a topic, grounded in the monorepo's published clinical content, then self-fact-check it.
tools: Read, Grep, Codebase
---

# Generate Social Post from Knowledge Base

Generate a social post for the topic and platform the user specifies.

## Steps

### 1. Load the rules

- `.cursor/rules/achilles-clinical-positions.mdc` — never contradict these
- `.cursor/rules/content-guidelines.mdc` — voice
- `.cursor/rules/social-format.mdc` — platform format, char limits, hashtags

### 2. Gather source material

Search the canonical content for the topic:

- `apps/course/src/content/course/` — lessons + FAQs
- `apps/website/src/content/guide/` + `blog/` + `articles/`
- `apps/website/src/sections/FAQs/`
- `apps/achilles-rupture/src/content/articles/`

Ground every clinical claim in what these sources actually say. If the sources don't cover something, leave it out — do not invent facts.

For tone/format examples (not facts), look at recent posts in `packages/linkedin/posts/` or `services/notion/output/`.

### 3. Write the post

Follow the platform spec from social-format.mdc exactly (LinkedIn 1300 chars max / Instagram 2200 max / Facebook community tone).

### 4. Self-check

Before presenting, verify the draft against the clinical positions (run the checklist from `.cursor/commands/check-social.md` mentally). Fix any issues.

### 5. Output

```
## Post (<platform>, <char count> chars)
[post text ready to copy]

## Sources used
- file paths

## Fact-check
PASS/REVISE + any caveats for the human reviewer
```

Note: the same generator with vector retrieval is available in the chat app (`apps/chat`, /generate route).
