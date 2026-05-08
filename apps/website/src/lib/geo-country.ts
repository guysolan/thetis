/**
 * Client-side country hint (IP). Not authoritative for tax; used for pricing/cart context.
 */
export async function detectCountryCode(): Promise<string> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (response.ok) {
      const data = (await response.json()) as { country_code?: string };
      return data.country_code || "GB";
    }
  } catch {
    /* ignore */
  }
  return "GB";
}
