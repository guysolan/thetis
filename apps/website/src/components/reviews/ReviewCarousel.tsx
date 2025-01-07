import * as React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import StarIcon from "@thetis/ui/star";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@thetis/ui/carousel";

import reviews from "./reviews.json";
import { Star } from "lucide-react";

export default function ReviewCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <div className="flex flex-row justify-center items-center w-full max-w-[90vw] md:max-w-xl">
        <CarouselPrevious className="relative bg-white dark:bg-black mr-4 px-2 py-1 rounded-md w-10 h-10" />
        <CarouselContent className="w-full">
          {reviews
            .filter((review) => review.is_pinned)
            .map((review, index) => (
              <CarouselItem
                key={review.name}
                className="w-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <Card className="bg-white shadow-lg rounded-lg">
                    <CardHeader className="pt-8 pb-2">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center p-6 pt-0">
                      <span className="line-clamp-5 lg:line-clamp-4 font-medium text-base text-center text-neutral-700 lg:text-lg">
                        {review.short ?? review.body}
                      </span>
                    </CardContent>
                    <CardFooter className="bottom-0 flex flex-row justify-center items-center mt-auto text-center">
                      <b className="space-x-2 px-12 w-full text-center text-neutral-800">
                        <span className="pr-1">{review.name}</span>
                        {getUnicodeFlagIcon(review.country)}
                      </b>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNext className="relative bg-white dark:bg-black ml-4 px-2 py-1 rounded-md w-10 h-10" />
      </div>
      <br />
      <CarouselDots />
    </Carousel>
  );
}
