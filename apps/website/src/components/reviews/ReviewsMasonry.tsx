import React, { useState } from "react";
import reviews from "./reviews.json";
import { ReviewCard } from "./ReviewCard";
import { Button } from "../ui/button";

const ReviewsMasonry = () => {
  const [v_displayCount, setDisplayCount] = useState(9);

  const handleShowMore = () => {
    setDisplayCount(v_displayCount + 9);
  };

  return (
    <div id="more-reviews">
      <div className="relative left-0 flex flex-col justify-center items-center p-8 w-[100vw] antialiased overflow-hidden">
        <h3 className="font-semibold text-3xl text-left text-neutral-900">
          Hear it from our customers...
        </h3>
        <div className="relative z-10 masonry-grid py-8">
          {reviews.slice(0, v_displayCount).map((review) => (
            <div className="masonry-item" key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
        {v_displayCount < reviews.length && (
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
