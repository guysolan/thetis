# Search Console Fixes Applied (20 Mar 2026)

Based on the Critical issues report:
- **524** Not found (404)
- **158** Redirect error
- **136** Page with redirect
- **66** Alternate page with proper canonical tag (OK)
- **12** Duplicate without user-selected canonical
- **2** Server error (5xx)
- **1** Blocked by robots.txt

## Fixes Implemented

### 1. Vercel Redirects (apps/website/vercel.json)

Added 301 redirects for legacy URLs that were causing 404s:

| Source | Destination |
|--------|-------------|
| `/courses` | `/course` |
| `/courses/*` | `/course` |
| `/guide/articles` | `/course` |
| `/de/leitfaden/artikel` | `/de/kurs` |
| `/fr/guide/articles` | `/fr/cours` |
| `/es/guia/articulos` | `/es/curso` |
| `/it/guida/articoli` | `/it/corso` |
| `/returns-policy` | `/return-policy` |
| `/splint` | `/achilles-rupture-splint` |
| `/night-splint` | `/achilles-rupture-splint` |
| `/achilles-tendon-splint` | `/achilles-rupture-splint` |
| `/achilles-splint` | `/achilles-rupture-splint` |
| `/de/kurse` | `/de/kurs` |
| `/de/kurse/*` | `/de/kurs` |
| `/es/cursos` | `/es/curso` |
| `/es/cursos/*` | `/es/curso` |
| `/it/corsi` | `/it/corso` |
| `/it/corsi/*` | `/it/corso` |

### 2. Internal Link Fix

- **LandingHero.astro**: Updated `/courses` links to `/course` (2 occurrences)

## Next Steps (requires URL-level data from Search Console)

To fix remaining issues, export the full URL list from Google Search Console for each issue type:

1. **Not found (404)** – Export affected URLs to identify any we missed
2. **Redirect error** – Export to check for chains/loops
3. **Duplicate without user-selected canonical** – Export to add canonicals or redirects
4. **Blocked by robots.txt** – Check which path is blocked
5. **Server error (5xx)** – Investigate which endpoints fail

The CSV reports in this folder only contain counts, not individual URLs.
