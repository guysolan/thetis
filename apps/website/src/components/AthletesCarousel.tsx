"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@thetis/ui/carousel";
import { athletes } from "./reviews/content/athletes";
import { ReviewCard } from "./reviews/ReviewCard";

const navButtonBase =
    "static flex justify-center items-center rounded-full border-2 border-primary bg-white text-primary shadow-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none translate-x-0 translate-y-0 h-11 w-11 md:h-12 md:w-12 [&>svg]:w-5 [&>svg]:h-5";

export default function AthletesCarousel() {
    return (
        <div className="w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                orientation="vertical"
                className="w-full"
            >
                <CarouselContent className="-mt-4 h-[600px] md:h-[700px]">
                    {athletes.slice(0, 9).map((athlete, index) => {
                        const athleteReview = {
                            ...athlete,
                            type: "athlete" as const,
                            link: "",
                            clinics: [],
                            clinicImages: [],
                            date: athlete.date || "2024-01-01",
                        };
                        return (
                            <CarouselItem
                                key={athlete.name}
                                className="pt-4 basis-1/3"
                            >
                                <div className="h-full">
                                    <ReviewCard review={athleteReview} />
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6 pt-4 border-neutral-200 dark:border-neutral-700 border-t">
                    <CarouselPrevious
                        variant="ghost"
                        size="icon"
                        className={`${navButtonBase} rotate-90`}
                    />
                    <CarouselNext
                        variant="ghost"
                        size="icon"
                        className={`${navButtonBase} rotate-90`}
                    />
                </div>
            </Carousel>
        </div>
    );
}
