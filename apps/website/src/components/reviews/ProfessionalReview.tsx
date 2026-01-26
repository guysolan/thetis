import { useState } from "react";
import type { Lang, TranslatedReview } from "./types";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import professionalOpinionsContent from "./content/professional-opinions";

export function ProfessionalReview({
  review,
  lang = "en",
}: {
  review: TranslatedReview;
  lang: Lang;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = professionalOpinionsContent[lang] ||
    professionalOpinionsContent.en;
  const reviewContent = review.content[lang] || review.content.en;

  return (
    <div className="relative flex-shrink-0 bg-white dark:bg-neutral-950 px-4 py-6">
      <div className="flex flex-col gap-4">
        {/* Profile section */}
        <div className="flex flex-row justify-start items-center gap-4">
          {review.image && (
            <div className="relative flex-shrink-0 w-24 h-32 hover:scale-105 transition-transform duration-300">
              <img
                src={review.image.src}
                alt={review.name}
                className="shadow-lg hover:shadow-xl rounded-xl w-full h-full object-cover transition-all duration-300"
              />
            </div>
          )}
          <div className="flex-col space-y-1">
            {review.name && (
              <h3 className="flex font-bold text-neutral-900 text-lg">
                {review.name}
              </h3>
            )}
            <p className="flex text-gray-500 text-base">
              {reviewContent.description}
            </p>
            <a
              className="flex items-center gap-1 font-semibold text-primary text-sm"
              href={review.link}
            >
              {content.review.seeWebsite}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Review content */}
        <div className="flex flex-col gap-2 pl-6 border-gray-200 border-l-4 italic">
          {reviewContent.title && (
            <p className="font-semibold text-gray-800 text-base italic">
              {reviewContent.title}
            </p>
          )}
          <div>
            <p
              className={cn(
                "max-w-prose text-base text-gray-700 text-left italic",
                !isExpanded && "line-clamp-3",
              )}
            >
              {reviewContent.body}
            </p>
            {reviewContent.body.length > 150 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-neutral-600 hover:text-neutral-900 text-sm"
              >
                {isExpanded ? content.review.readLess : content.review.readMore}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
