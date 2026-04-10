/**
 * Property URL as registered in Search Console (must match sites.list exactly).
 * Examples: `https://thetismedical.com/` or `sc-domain:thetismedical.com`
 */
export function getSiteUrl(): string {
  const url = process.env.SEARCH_CONSOLE_SITE_URL?.trim();
  if (!url) {
    throw new Error(
      "Set SEARCH_CONSOLE_SITE_URL (e.g. https://thetismedical.com/ or sc-domain:thetismedical.com)",
    );
  }
  return url.endsWith("/") || url.startsWith("sc-domain:") ? url : `${url}/`;
}
