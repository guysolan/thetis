import { Star } from "lucide-react";
import statistics from "./review-statistics.json";

const ReviewSummary = () => {
  // Calculate average rating
  const totalReviews = Object.values(statistics).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  const weightedSum = Object.entries(statistics).reduce(
    (acc, [rating, count]) => acc + Number(rating) * count,
    0,
  );
  const averageRating = (weightedSum / totalReviews).toFixed(1);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <span className="font-semibold text-2xl">{averageRating}</span>
        <span className="text-gray-600 text-lg">/5</span>
      </div>
      <div className="flex items-center">
        <Star className="fill-yellow-400 w-5 h-5 text-yellow-400" />
      </div>
      <a
        href="#review-statistics"
        className="ml-2 text-blue-600 text-sm hover:text-blue-800 hover:underline"
      >
        ({totalReviews} reviews)
      </a>
    </div>
  );
};

export default ReviewSummary;
