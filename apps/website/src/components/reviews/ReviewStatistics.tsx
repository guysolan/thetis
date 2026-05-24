import { Progress } from "@thetis/ui/progress";
import { Star } from "lucide-react";
import { formatReviewSummary } from "@/features/reviews/productReviewStats";
import statistics from "./review-statistics.json";

const ReviewStatistics = () => {
  const totalReviews = Object.values(statistics).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const getPercentage = (value: number) => {
    return ((value / totalReviews) * 100).toFixed(1);
  };

  return (
    <div className="space-y-4">
      {Object.entries(statistics)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([rating, count]) => (
          <div className="flex flex-row items-center gap-4" key={rating}>
            <div className="flex items-center gap-1 min-w-[100px]">
              <span className="font-medium">{rating}</span>
              <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
            </div>
            <Progress value={Number(getPercentage(count))} className="flex-1" />
            <div className="min-w-[100px] text-gray-600 text-sm">
              <span>{getPercentage(count)}%</span>
              <span className="ml-2">({count})</span>
            </div>
          </div>
        ))}
      <div className="mt-4 text-gray-600 text-sm">{formatReviewSummary()}</div>
    </div>
  );
};

export default ReviewStatistics;
