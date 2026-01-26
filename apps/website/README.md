# Thetis Medical Website

## Project Structure & Prompting Guide

This project uses a component-based architecture that follows the DRY (Don't Repeat Yourself) principle. Understanding the folder structure and conventions will help you write effective prompts for code generation, refactoring, or documentation.

### Folder Hierarchy

The main folders are:

- `components`: Reusable UI elements (e.g., buttons, cards)
- `sections`: Groups of components forming logical page sections
- `mains`: Page-level containers that assemble sections and handle logic (usually take a `lang` prop for internationalization)
- `pages`: Astro page files that render mains and handle routing

**Hierarchy:**

- Components → used in Sections
- Sections → used in Mains
- Mains → used in Pages

### Internationalization (i18n)

- Each `main` typically receives a `lang` prop (e.g., `"en"`, `"es"`, `"de"`, `"fr"`, `"it"`).
- This ensures consistent language handling across all pages.
- For each language, there is a corresponding page:
  - `pages/slug.astro` (English)
  - `pages/es/slug-in-spanish.astro`
  - `pages/de/slug-in-germany.astro`
  - `pages/fr/slug-in-french.astro`
  - `pages/it/slug-in-italian.astro`

### Routing

- Navigation and route mapping are managed in `routes.tsx`.
- This file is used to generate navigation elements (e.g., nav, footer) and to map over available routes.

---

## How to Use This Structure in Prompts

- **When asking for a new feature or refactor:** Specify which folder(s) the change should affect (e.g., "Add a new section in `sections/` and use it in a main in `mains/`").
- **For i18n support:** Indicate if the change should be language-aware and how the `lang` prop should be handled.
- **For navigation or routing changes:** Reference `routes.tsx` and describe how routes should be updated or generated.
- **For DRY and reusability:** Ask for logic or UI to be placed in `components/` or `sections/` as appropriate.

**Example Prompt:**
> "Create a new FAQ section in `sections/`, use it in a main in `mains/`, and ensure it supports all languages via the `lang` prop. Update navigation in `routes.tsx` to include the new page."

Use this structure and these conventions to make your prompts clear and actionable for code generation or documentation tasks.
