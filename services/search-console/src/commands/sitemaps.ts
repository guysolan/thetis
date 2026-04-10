import { getSearchConsole } from "../client.js";
import { getSiteUrl } from "../site-url.js";

function parseArgs(args: string[]): { submit?: string } {
  const out: { submit?: string } = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--submit" && args[i + 1]) {
      out.submit = args[++i];
    }
  }
  return out;
}

/**
 * List sitemaps for the property; optional --submit <fullSitemapUrl> (requires readwrite scope).
 */
export async function cmdSitemaps(args: string[]): Promise<void> {
  const { submit } = parseArgs(args);
  const siteUrl = getSiteUrl();
  const mode = submit ? "readwrite" : "readonly";
  const api = getSearchConsole(mode);

  if (submit) {
    await api.sitemaps.submit({
      siteUrl,
      feedpath: submit,
    });
    console.error(`Submitted sitemap: ${submit}`);
  }

  const res = await api.sitemaps.list({ siteUrl });
  const entries = res.data.sitemap ?? [];
  if (entries.length === 0) {
    console.log("No sitemaps listed.");
    return;
  }

  for (const s of entries) {
    const path = s.path ?? "";
    const last = s.lastSubmitted ?? "";
    const err = s.errors ?? 0;
    const warn = s.warnings ?? 0;
    console.log(
      `${path}\tlastSubmitted=${last}\terrors=${err}\twarnings=${warn}`,
    );
  }
}
