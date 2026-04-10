# @thetis/search-console

CLI tools for the **Google Search Console API** (`searchconsole` v1): list properties, list or submit sitemaps, batch **URL Inspection**, and **Search Analytics** by page (for triaging legacy URLs).

This does **not** remove URLs from Search Console or bulk-clear coverage history. Use results to prioritize **redirects / 404 / 410** in the site (e.g. [`apps/website/vercel.json`](../../apps/website/vercel.json)).

## Prerequisites

1. **Google Cloud project** with **Search Console API** enabled.
2. **Credentials** (pick one):
   - **Service account (recommended):** Download the JSON key. In [Search Console](https://search.google.com/search-console), add the service account email as a user with **Full** or **Owner** on the property. For local use, save the key as [`search-console-service-account-key.json`](./search-console-service-account-key.json) in this package directory (that path is **gitignored**). The CLI loads it automatically unless `GOOGLE_APPLICATION_CREDENTIALS` is set.
   - **User OAuth:** Use `gcloud auth application-default login` so ADC uses your user (property must be visible to that Google account). For CI, prefer a service account and inject `GOOGLE_APPLICATION_CREDENTIALS`.
3. **Property string** must match **exactly** what `sites` prints (URL-prefix or domain property):
   - URL-prefix: `https://thetismedical.com/` (trailing slash usually required).
   - Domain: `sc-domain:thetismedical.com` (no `https://`).

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_APPLICATION_CREDENTIALS` | No* | Path to service account JSON. *If unset, the CLI uses `./search-console-service-account-key.json` when that file exists. |
| `SEARCH_CONSOLE_SITE_URL` | Yes | Property URL, e.g. `https://thetismedical.com/` |

Never commit credential files. See [`.gitignore`](./.gitignore). If this key was ever committed, **rotate it** in Google Cloud and use the new key only locally or via secret storage.

## OAuth scopes

| Scope | Used for |
|-------|-----------|
| `https://www.googleapis.com/auth/webmasters.readonly` | `sites`, `sitemaps` (list only), `inspect-batch`, `pages-performance` |
| `https://www.googleapis.com/auth/webmasters` | `sitemaps --submit` (write) |

The CLI requests **readonly** for read-only commands and **readwrite** when `--submit` is passed.

## Install

From monorepo root:

```bash
pnpm install
```

## Commands

### List properties

```bash
cd services/search-console
export SEARCH_CONSOLE_SITE_URL="https://thetismedical.com/"
# With search-console-service-account-key.json in this directory, no env for the key is needed.

pnpm exec tsx src/cli.ts sites
pnpm exec tsx src/cli.ts sites --verify
```

`--verify` fails if `SEARCH_CONSOLE_SITE_URL` is not in the list (avoids typos).

### Sitemaps

```bash
pnpm exec tsx src/cli.ts sitemaps
pnpm exec tsx src/cli.ts sitemaps --submit https://thetismedical.com/sitemap-index.xml
```

Submit requires the **readwrite** scope (service account must be allowed to manage sitemaps).

### Batch URL Inspection

Reads URLs from **`--file`** (one URL per line, or CSV with URL in the first column) or **stdin**. Respects API load: **`--delay-ms`** between calls (default `1100`), **`--max`** calls per run (default `500`). **Resume:** URLs already present in **`--out`** are skipped.

```bash
pnpm exec tsx src/cli.ts inspect-batch --file urls.txt --out output/inspect-batch.jsonl
pnpm exec tsx src/cli.ts inspect-batch --file gsc-export.csv --format csv --out output/inspect.csv --max 2000 --delay-ms 1200
```

**Quotas:** URL Inspection has a **low daily limit per property** (see Google’s current docs). If you hit limits, lower `--max` and continue the next day; resume uses `--out`.

### Search Analytics (by page)

```bash
pnpm exec tsx src/cli.ts pages-performance --out output/pages-90d.csv
pnpm exec tsx src/cli.ts pages-performance --start 2025-01-01 --end 2025-04-01 --min-impressions 1 --row-limit 5000 --out output/pages.csv
```

Default date range: last **90** days. Output CSV columns: `page`, `clicks`, `impressions`, `ctr`, `position`. Use this to see which **legacy URLs** still get impressions before deciding on redirects.

## Workspace shortcuts

From repo root:

```bash
pnpm --filter @thetis/search-console sites
pnpm --filter @thetis/search-console sitemaps
pnpm --filter @thetis/search-console inspect-batch -- --file ./urls.txt
```

Note: some versions of pnpm pass extra `--`; if you see `Unknown command: --`, run via `pnpm exec tsx src/cli.ts …` from `services/search-console` as above.

## Historical exports

Older CSV exports and notes live under [`20-03-2026/`](./20-03-2026/).
