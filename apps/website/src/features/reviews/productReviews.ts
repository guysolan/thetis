export type MasterReview = {
  id: string;
  source: "amazon" | "direct";
  channel: string | null;
  category: "patient" | "athlete" | "clinician";
  hasText: boolean;
  stars: number;
  name: string | null;
  email?: string | null;
  product?: string | null;
  hasMedia?: boolean;
  marketingOptOut?: boolean;
  title: string | null;
  body: string | null;
  excerpt: string | null;
  short: string | null;
  date: string | null;
  country: string | null;
  countryName: string | null;
  language: string | null;
  style: {
    size?: string | null;
    side?: string | null;
    verified?: boolean | null;
    vine?: boolean | null;
  } | null;
  mentionsBoot: boolean | null;
  tags: string[];
  verified: boolean | null;
  featuredOnWebsite?: boolean;
  isPinned?: boolean | null;
  description?: string | null;
  link?: string | null;
  clinics?: string[];
};

export type AudienceFilter = "patients" | "surgeons" | "athletes";

export const AUDIENCE_FILTERS: { id: AudienceFilter; label: string }[] = [
  { id: "patients", label: "Patients" },
  { id: "surgeons", label: "Surgeons" },
  { id: "athletes", label: "Athletes" },
];

export type PatientSourceKey = "amazon" | "reviews";

export function getAudienceKey(review: MasterReview): AudienceFilter {
  if (review.category === "clinician") return "surgeons";
  if (review.category === "athlete") return "athletes";
  return "patients";
}

export function getSourceKey(
  review: MasterReview,
): PatientSourceKey | "testimonials" {
  if (review.category === "athlete" || review.category === "clinician") {
    return "testimonials";
  }
  if (review.source === "amazon") return "amazon";
  return "reviews";
}

export function getSourceLabel(review: MasterReview): string {
  const key = getSourceKey(review);
  if (key === "reviews") return "Reviews";
  if (key === "testimonials") return "Testimonial";
  return "Amazon";
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "the United States",
  GB: "the United Kingdom",
  DE: "Germany",
  CA: "Canada",
  AU: "Australia",
  NO: "Norway",
  DK: "Denmark",
  IT: "Italy",
  SE: "Sweden",
  FR: "France",
  ES: "Spain",
};

export function getCountryLabel(
  code: string | null,
  countryName: string | null,
) {
  if (countryName) return countryName.replace(/^the\s+/i, "the ");
  if (!code) return null;
  return COUNTRY_NAMES[code] ?? code;
}

export function formatReviewDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatReviewMeta(review: MasterReview) {
  const country = getCountryLabel(review.country, review.countryName);
  const date = formatReviewDate(review.date);
  if (country && date) return `Reviewed in ${country} on ${date}`;
  if (date) return `Reviewed on ${date}`;
  return null;
}

export function starDistribution(reviews: MasterReview[]) {
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    if (review.stars) counts[review.stars] = (counts[review.stars] ?? 0) + 1;
  }
  return counts;
}

export function averageFromCounts(distribution: Record<number, number>) {
  let total = 0;
  let sum = 0;
  for (const star of [5, 4, 3, 2, 1]) {
    const count = distribution[star] ?? 0;
    total += count;
    sum += star * count;
  }
  return total > 0 ? sum / total : 0;
}

export function averageRating(reviews: MasterReview[]) {
  return averageFromCounts(starDistribution(reviews));
}

export function filterReviews(
  reviews: MasterReview[],
  audienceFilter: AudienceFilter,
  starFilter: number,
) {
  return reviews.filter((review) => {
    if (getAudienceKey(review) !== audienceFilter) return false;
    if (starFilter > 0 && review.stars !== starFilter) return false;
    return true;
  });
}

export function countByAudience(reviews: MasterReview[]) {
  const counts: Record<AudienceFilter, number> = {
    patients: 0,
    surgeons: 0,
    athletes: 0,
  };
  for (const review of reviews) {
    counts[getAudienceKey(review)]++;
  }
  return counts;
}

export type RatingAggregate = {
  totalRatings: number;
  distributionPercent: Record<string, number>;
  distributionCount: Record<string, number>;
};

type MasterRatings = {
  combinedGlobal?: RatingAggregate;
  amazonGlobal?: RatingAggregate;
};

export function getDisplayStats(
  audienceFilter: AudienceFilter,
  filteredReviews: MasterReview[],
  ratings: MasterRatings,
  starFilter = 0,
) {
  const useGlobalDistribution = starFilter === 0 &&
    audienceFilter === "patients" &&
    ratings.combinedGlobal;

  if (useGlobalDistribution) {
    const global = ratings.combinedGlobal!;
    const distribution = Object.fromEntries(
      [5, 4, 3, 2, 1].map((star) => [
        star,
        Number(global.distributionCount[String(star)] ?? 0),
      ]),
    ) as Record<number, number>;
    return {
      average: averageRating(filteredReviews),
      total: global.totalRatings,
      distribution,
      distributionPercent: Object.fromEntries(
        [5, 4, 3, 2, 1].map((star) => [
          star,
          Number(global.distributionPercent[String(star)] ?? 0),
        ]),
      ) as Record<number, number>,
    };
  }

  const distribution = starDistribution(filteredReviews);
  return {
    average: averageRating(filteredReviews),
    total: filteredReviews.length,
    distribution,
    distributionPercent: Object.fromEntries(
      [5, 4, 3, 2, 1].map((star) => [
        star,
        filteredReviews.length > 0
          ? Math.round(
            ((distribution[star] ?? 0) / filteredReviews.length) * 100,
          )
          : 0,
      ]),
    ) as Record<number, number>,
  };
}
