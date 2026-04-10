import { getSearchConsole } from "../client.js";
import { getSiteUrl } from "../site-url.js";

function hasFlag(args: string[], flag: string): boolean {
  return args.includes(flag);
}

/**
 * List Search Console properties; optional --verify checks SEARCH_CONSOLE_SITE_URL is present.
 */
export async function cmdSites(args: string[]): Promise<void> {
  const verify = hasFlag(args, "--verify");
  const api = getSearchConsole("readonly");
  const res = await api.sites.list({});
  const entries = res.data.siteEntry ?? [];
  if (entries.length === 0) {
    const hint =
      "No sites returned. Add this service account under Search Console → Settings → Users and permissions (Full), using the email from the JSON key’s client_email field.";
    if (verify) {
      throw new Error(hint);
    }
    console.log(hint);
    return;
  }

  for (const s of entries) {
    const url = s.siteUrl ?? "";
    const perm = s.permissionLevel ?? "";
    console.log(`${url}\t${perm}`);
  }

  if (verify) {
    const target = getSiteUrl();
    const ok = entries.some((s) => s.siteUrl === target);
    if (!ok) {
      throw new Error(
        `SEARCH_CONSOLE_SITE_URL (${target}) not in list above. Use exact siteUrl from first column.`,
      );
    }
    console.error(`verify: OK — ${target} is registered.`);
  }
}
