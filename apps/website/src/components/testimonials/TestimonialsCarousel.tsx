import * as React from "react";

import { Card, CardContent, CardFooter } from "@thetis/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";

import { testimonials } from "./testimonials.ts";

export default function TestimonialsCarousel() {
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
        {testimonials
          .filter((review) => review.is_athlete)
          .map((review, index) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col justify-center items-center p-6 aspect-square">
                    <span className="font-medium text-base text-neutral-600">
                      {review.quote}
                    </span>
                    <CardFooter>
                      <span className="font-medium text-base text-neutral-600">
                        {review.name}
                      </span>
                      <span className="font-medium text-base text-neutral-600">
                        {review.description}
                      </span>
                    </CardFooter>
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
