import PartialStarRating from "@/components/reviews/PartialStarRating";
import {
  formatGlobalRatingsLabel,
  GLOBAL_REVIEW_AVERAGE,
} from "@/features/reviews/productReviewStats";

const StarRating = () => {
  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-x-4 gap-y-2 text-lg">
      <div className="flex items-center gap-2">
        <p className="font-semibold">{GLOBAL_REVIEW_AVERAGE.toFixed(1)}</p>
        <PartialStarRating
          rating={GLOBAL_REVIEW_AVERAGE}
          size="md"
          idPrefix="star-rating"
        />
      </div>
      <p className="text-gray-600">{formatGlobalRatingsLabel()}</p>
    </div>
  );
};

export default StarRating;
