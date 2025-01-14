import React, { useState } from "react";
import { reviews } from "./content/all";
import { ReviewCard } from "./ReviewCard";
import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";

const ReviewsMasonry = () => {
  const [v_displayCount, setDisplayCount] = useState(9);
  const [v_activeFilter, setActiveFilter] = useState<
    "all" | "athlete" | "clinician" | "patient"
  >("all");
  const [v_shuffledReviews, setShuffledReviews] = useState(reviews);

  const handleShuffle = () => {
    setShuffledReviews((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleShowMore = () => {
    setDisplayCount(v_displayCount + 9);
  };

  const v_filteredReviews = v_shuffledReviews.filter(
    (review) => v_activeFilter === "all" || review.type === v_activeFilter,
  );

  return (
    <div id="more-reviews">
      <div className="relative left-0 flex flex-col justify-center items-center p-4 md:p-8 w-[100vw] antialiased overflow-hidden">
        <h1 className="mb-4 font-semibold text-3xl text-left text-neutral-900">
          Hear it from our customers...
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-2 my-4 px-4">
          <Button
            onClick={() => setActiveFilter("all")}
            variant={v_activeFilter === "all" ? "default" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setActiveFilter("athlete")}
            variant={v_activeFilter === "athlete" ? "default" : "outline"}
          >
            Athletes
          </Button>
          <Button
            onClick={() => setActiveFilter("clinician")}
            variant={v_activeFilter === "clinician" ? "default" : "outline"}
          >
            Clinicians
          </Button>
          <Button
            onClick={() => setActiveFilter("patient")}
            variant={v_activeFilter === "patient" ? "default" : "outline"}
          >
            Patients
          </Button>
          <Button onClick={handleShuffle} variant="secondary" className="gap-2">
            <span className="font-semibold sr-only">Shuffle</span>
            <Shuffle size={20} />
          </Button>
        </div>

        <div className="relative z-10 masonry-grid py-8">
          {v_filteredReviews.slice(0, v_displayCount).map((review) => (
            <div className="masonry-item" key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
        {v_displayCount < v_filteredReviews.length && (
          <Button type="button" onClick={handleShowMore}>
            Show More
          </Button>
        )}
      </div>
      <style>
        {`
          .masonry-grid {
            columns: 1;
            column-gap: 1rem;
            width: 100%;
          }

          .masonry-grid > div {
            margin-bottom: 1rem;
            break-inside: avoid;
          }

          @media (min-width: 750px) {
            .masonry-grid {
              columns: 2;
            }
          }

          @media (min-width: 900px) {
            .masonry-grid {
              columns: 3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ReviewsMasonry;
