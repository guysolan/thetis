"use client";

import * as React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { CheckCircle2, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@thetis/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";
import { Badge } from "@thetis/ui/badge";

import { patients } from "./content/patients";

const pinnedReviews = patients.filter((review) => review.is_pinned);

// Calculate average rating
const averageRating = pinnedReviews.length > 0
  ? (pinnedReviews.reduce((sum, r) => sum + (r.stars || 5), 0) /
    pinnedReviews.length).toFixed(1)
  : "5.0";

export default function EnhancedReviewCarousel() {
  return (
    <div className="w-full">
      {/* Review Summary Stats */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-primary/10 mb-3 px-6 py-3 rounded-full">
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 w-5 h-5 text-yellow-400" />
            <span className="font-bold text-neutral-900 text-2xl">
              {averageRating}
            </span>
          </div>
          <div className="bg-neutral-300 w-px h-6" />
          <div className="text-left">
            <div className="font-semibold text-neutral-900 text-sm">
              &gt;200 5 star reviews
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="relative">
          <CarouselContent className="-ml-2 md:-ml-4">
            {pinnedReviews.slice(0, 8).map((review, index) => (
              <CarouselItem
                key={`${review.name}-${index}`}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-white shadow-lg border-2 border-primary/10 hover:border-primary/30 h-full transition-all duration-200">
                  <CardHeader className="pt-6 pb-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="fill-yellow-400 w-4 h-4 text-yellow-400"
                            />
                          ))}
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary text-xs"
                      >
                        <CheckCircle2 className="mr-1 w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-base line-clamp-2 leading-snug">
                      {review.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-neutral-700 text-sm line-clamp-4 leading-relaxed">
                      {(review as any).short || (review.body?.length > 200
                        ? `${review.body.substring(0, 200)}...`
                        : review.body)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-3 pt-0 pb-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 text-sm truncate">
                        {review.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {review.country && (
                          <span className="text-lg">
                            {getUnicodeFlagIcon(review.country)}
                          </span>
                        )}
                        <span className="text-neutral-500 text-xs">
                          {review.date
                            ? new Date(review.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              },
                            )
                            : "Verified Patient"}
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center gap-4 mt-6">
            <CarouselPrevious className="static hover:bg-primary/10 border-2 border-primary/30 hover:border-primary translate-x-0 translate-y-0" />
            <CarouselDots />
            <CarouselNext className="static hover:bg-primary/10 border-2 border-primary/30 hover:border-primary translate-x-0 translate-y-0" />
          </div>
        </div>
      </Carousel>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-neutral-600 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>Verified Purchases</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>Real Patient Reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>5,000+ Happy Customers</span>
        </div>
      </div>
    </div>
  );
}
