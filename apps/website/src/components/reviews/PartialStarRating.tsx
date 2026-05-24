const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

interface PartialStarRatingProps {
  rating: number;
  size?: "sm" | "md";
  idPrefix?: string;
}

export default function PartialStarRating({
  rating,
  size = "sm",
  idPrefix = "rating",
}: PartialStarRatingProps) {
  const iconClass = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        if (rating >= starValue) {
          return (
            <svg
              key={starValue}
              className={`${iconClass} fill-current text-amber-400`}
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d={STAR_PATH} />
            </svg>
          );
        }

        if (rating > index && rating < starValue) {
          const partialFill = Math.max(rating - index, 0.1);
          const clipId = `${idPrefix}-star-${index}`;

          return (
            <svg
              key={starValue}
              className={iconClass}
              viewBox="0 0 20 20"
              aria-hidden
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width={20 * partialFill} height="20" />
                </clipPath>
              </defs>
              <path
                className="fill-current text-neutral-200"
                d={STAR_PATH}
              />
              <path
                className="fill-current text-amber-400"
                clipPath={`url(#${clipId})`}
                d={STAR_PATH}
              />
            </svg>
          );
        }

        return (
          <svg
            key={starValue}
            className={`${iconClass} fill-current text-neutral-200`}
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d={STAR_PATH} />
          </svg>
        );
      })}
    </div>
  );
}
