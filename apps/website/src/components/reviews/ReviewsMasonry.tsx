import React, { useState, useEffect } from "react";
import { reviews } from "./content/all";
import { ReviewCard } from "./ReviewCard";
import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";

const ReviewsMasonry = () => {
  const [v_displayCount, setDisplayCount] = useState(9);
  const [v_activeFilter, setActiveFilter] = useState<
    "all" | "athlete" | "clinician" | "patient"
  >(() => {
    const params = new URLSearchParams(window.location.search);
    return (
      (params.get("filter") as "all" | "athlete" | "clinician" | "patient") ||
      "all"
    );
  });
  const [v_shuffledReviews, setShuffledReviews] = useState(reviews);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("filter", v_activeFilter);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [v_activeFilter]);

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
      <div className="left-0 relative flex flex-col justify-center items-center p-4 md:p-8 w-[100vw] overflow-hidden antialiased">
        <h1 className="mb-4 font-semibold text-neutral-900 text-3xl text-center">
          Hear it from the horse's mouth...
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
            <span className="sr-only font-semibold">Shuffle</span>
            <Shuffle size={20} />
          </Button>
        </div>

        <div className="z-10 relative masonry-grid py-8">
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
