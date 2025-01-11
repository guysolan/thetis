import { useState } from "react";
import type { Review } from "./types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { CarouselNext, CarouselPrevious } from "@thetis/ui/carousel";
import { ExternalLink } from "lucide-react";

const renderStars = (count: number) => {
  return Array(count)
    .fill(null)
    .map((_, idx) => (
      <svg
        key={idx}
        className="w-4 h-4 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text?.slice(0, maxLength) + "...";
};

export function ProfessionalReview({
  review,
}: {
  review: Review;
  type?: "professional" | "patient";
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex-shrink-0 bg-white dark:bg-neutral-950 px-4 py-6">
      <div className="flex flex-col gap-4">
        {/* Profile section */}
        <div className="flex flex-row justify-start items-center gap-4">
          {review.image && (
            <div className="relative flex-shrink-0 w-24 h-32 transition-transform duration-300 hover:scale-105">
              <img
                src={review.image.src}
                alt={review.name}
                className="shadow-lg hover:shadow-xl rounded-xl w-full h-full transition-all duration-300 object-cover"
              />
            </div>
          )}
          <div className="flex-col space-y-1">
            {review.name && (
              <h3 className="flex font-bold text-lg text-neutral-900">
                {review.name}
              </h3>
            )}
            <p className="flex text-base text-gray-500">{review.description}</p>
            <a
              className="flex items-center gap-1 font-semibold text-primary text-sm"
              href={review.link}
            >
              See Website
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Review content */}
        <div className="flex flex-col gap-2 border-gray-200 pl-6 border-l-4 italic">
          {review.title && (
            <p className="font-semibold text-base text-gray-800 italic">
              {review.title}
            </p>
          )}
          <div>
            <p
              className={cn(
                "max-w-prose text-base text-gray-700 text-left italic",
                !isExpanded && "line-clamp-3",
              )}
            >
              {review.body}
            </p>
            {review.body.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-neutral-600 text-sm hover:text-neutral-900"
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
