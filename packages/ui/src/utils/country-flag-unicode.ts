// Wrapper to handle country-flag-icons/unicode import
// This works around Vite/Rollup issues with subpath exports
// Uses a fallback implementation that generates unicode flags directly

/**
 * Generates a unicode flag emoji from a country code (e.g., "US" -> 🇺🇸)
 * This is a fallback implementation that works without the country-flag-icons package
 */
function getUnicodeFlagIcon(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default getUnicodeFlagIcon;

