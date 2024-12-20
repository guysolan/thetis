import * as React from "react";

import { Card, CardContent, CardFooter } from "@thetis/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";

import reviews from "./reviews.json";

export default function ReviewCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="flex flex-row justify-center items-center w-full max-w-lg"
    >
      <CarouselPrevious className="relative p-1 w-10 h-10" />
      <CarouselContent>
        {reviews
          .filter((review) => review.is_pinned)
          .map((review, index) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col justify-center items-center p-6 aspect-square">
                    <span className="font-medium text-lg text-neutral-600">
                      {review.title}
                    </span>
                    <CardFooter>{review.name}</CardFooter>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNext className="relative p-1 w-10 h-10" />
    </Carousel>
  );
}
