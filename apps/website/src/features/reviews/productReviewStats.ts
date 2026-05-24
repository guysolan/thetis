/** Canonical global review stats (Amazon + direct), from master-reviews.json combinedGlobal. */
export const GLOBAL_REVIEW_AVERAGE = 4.1;
export const GLOBAL_REVIEW_COUNT = 303;

export function formatGlobalRatingsLabel(
  count: number = GLOBAL_REVIEW_COUNT,
): string {
  return `${count.toLocaleString("en-GB")} Global Ratings`;
}

export function formatReviewSummary(): string {
  return `${GLOBAL_REVIEW_AVERAGE.toFixed(1)} (${formatGlobalRatingsLabel()})`;
}

/** Width of the yellow clip on a 24px star for the fractional part of a rating. */
export function partialStarClipWidth(
  rating: number,
  starSize = 24,
): number {
  const fractional = Math.max(rating - Math.floor(rating), 0);
  return fractional * starSize;
}
