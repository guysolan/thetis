"use client";

import * as FlagIcons from "country-flag-icons/react/3x2";
import { CheckCircle2, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";

export type TradeReviewItem = {
  id: string;
  name: string;
  description?: string;
  title: string;
  short?: string;
  body?: string;
  imageSrc?: string;
  country?: string;
  stars?: number;
};

type Props = {
  reviews: TradeReviewItem[];
  /** Patient reviews: flag, 5★, verified badge — no name */
  variant?: "patient" | "standard";
};

function CountryFlag({ code }: { code: string }) {
  const Flag = FlagIcons[code as keyof typeof FlagIcons] as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  if (!Flag) {
    return (
      <span className="font-semibold text-neutral-500 text-xs">{code}</span>
    );
  }

  return (
    <Flag
      className="rounded-[2px] w-5 h-[15px] shrink-0"
      aria-label={`${code} flag`}
    />
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className="fill-yellow-400 w-4 h-4 text-yellow-400"
          aria-hidden
        />
      ))}
    </div>
  );
}

function PatientTradeReviewCard({ review }: { review: TradeReviewItem }) {
  const quote = review.short || review.title;
  const showBody = review.body && review.short && review.body !== review.short;
  const starCount = review.stars ?? 5;

  return (
    <figure className="flex flex-col bg-white dark:bg-neutral-900 shadow-sm p-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl h-full">
      <div className="mb-3">
        <StarRating count={starCount} />
      </div>
      <blockquote className="flex-1">
        <p className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100 text-lg leading-snug">
          &ldquo;{quote}&rdquo;
        </p>
        {showBody && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-4">
            {review.body}
          </p>
        )}
      </blockquote>
      <div className="flex items-center gap-2 mt-6 pt-4 border-neutral-100 dark:border-neutral-800 border-t">
        {review.country ? <CountryFlag code={review.country} /> : null}
        <span className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm">
          <CheckCircle2
            className="w-3.5 h-3.5 text-primary shrink-0"
            aria-hidden
          />
          Verified customer
        </span>
      </div>
    </figure>
  );
}

const navButtonClass =
  "static flex justify-center items-center rounded-full border-2 border-primary bg-white dark:bg-neutral-900 text-primary shadow-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none translate-x-0 translate-y-0 h-11 w-11 [&>svg]:w-5 [&>svg]:h-5";

/** Show more cards on wider viewports when there are enough reviews to scroll */
function itemBasisClass(reviewCount: number) {
  if (reviewCount <= 2) {
    return "pl-2 md:pl-4 basis-full md:basis-1/2";
  }
  if (reviewCount === 3) {
    return "pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3";
  }
  return "pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";
}

function TradeReviewCard({ review }: { review: TradeReviewItem }) {
  const quote = review.short || review.title;
  const showBody = review.body && review.short && review.body !== review.short;

  return (
    <figure className="flex flex-col bg-white dark:bg-neutral-900 shadow-sm p-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl h-full">
      <blockquote className="flex-1">
        <p className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100 text-lg leading-snug">
          &ldquo;{quote}&rdquo;
        </p>
        {showBody && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-4">
            {review.body}
          </p>
        )}
      </blockquote>
      <div className="flex items-center gap-3 mt-6 pt-4 border-neutral-100 dark:border-neutral-800 border-t">
        {review.imageSrc && (
          <img
            src={review.imageSrc}
            alt={review.name}
            width={48}
            height={48}
            className="rounded-full w-12 h-12 object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
            {review.name}
          </p>
          {review.description && (
            <p className="text-neutral-500 text-sm">{review.description}</p>
          )}
        </div>
      </div>
    </figure>
  );
}

export default function TradeReviewsCarousel({
  reviews,
  variant = "standard",
}: Props) {
  if (!reviews.length) {
    return null;
  }

  const basisClass = itemBasisClass(reviews.length);
  const Card = variant === "patient" ? PatientTradeReviewCard : TradeReviewCard;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Carousel
        opts={{
          align: "start",
          loop: reviews.length > 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className={basisClass}>
              <Card review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {reviews.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <CarouselPrevious
              variant="ghost"
              size="icon"
              className={navButtonClass}
            />
            <CarouselDots />
            <CarouselNext
              variant="ghost"
              size="icon"
              className={navButtonClass}
            />
          </div>
        )}
      </Carousel>
    </div>
  );
}
