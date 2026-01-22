"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@thetis/ui/carousel";
import { translatedClinicians } from "./reviews/content/professional-opinions";

const navButtonBase =
    "static flex justify-center items-center rounded-full border-2 border-primary bg-white text-primary shadow-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none translate-x-0 translate-y-0 h-11 w-11 md:h-12 md:w-12 [&>svg]:w-5 [&>svg]:h-5";

export default function SurgeonsCarousel() {
    const clinicians = translatedClinicians;

    return (
        <>
            {/* Mobile: Vertical Carousel */}
            <div className="md:hidden w-full">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="-mt-4 h-[600px]">
                        {clinicians.map((clinician) => {
                            const content = clinician.content.en;
                            return (
                                <CarouselItem
                                    key={clinician.name}
                                    className="pt-4"
                                >
                                    <div className="flex flex-col bg-white shadow-md shadow-neutral-300 p-6 border-2 border-primary/20 rounded-xl h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={clinician.image.src}
                                                alt={clinician.name}
                                                className="flex-shrink-0 rounded-full w-14 h-14 object-cover"
                                                width={56}
                                                height={56}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-neutral-900 text-base">
                                                    {clinician.name}
                                                </p>
                                                <p className="text-neutral-600 text-sm">
                                                    {content.description}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mb-3 font-semibold text-neutral-900 text-base">
                                            {content.title}
                                        </p>
                                        <p className="flex-1 text-neutral-700 text-sm italic leading-relaxed">
                                            "{content.short}"
                                        </p>
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

            {/* Desktop: Horizontal Carousel showing 2 items at a time */}
            <div className="hidden md:block w-full">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    orientation="horizontal"
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {clinicians.map((clinician) => {
                            const content = clinician.content.en;
                            return (
                                <CarouselItem
                                    key={clinician.name}
                                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/2"
                                >
                                    <div className="flex flex-col bg-white shadow-md shadow-neutral-300 p-6 border-2 border-primary/20 rounded-xl h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={clinician.image.src}
                                                alt={clinician.name}
                                                className="flex-shrink-0 rounded-full w-14 h-14 object-cover"
                                                width={56}
                                                height={56}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-neutral-900 text-base">
                                                    {clinician.name}
                                                </p>
                                                <p className="text-neutral-600 text-sm">
                                                    {content.description}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mb-3 font-semibold text-neutral-900 text-base">
                                            {content.title}
                                        </p>
                                        <p className="flex-1 text-neutral-700 text-sm italic leading-relaxed">
                                            "{content.short}"
                                        </p>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <div className="flex justify-center gap-4 mt-6 pt-4 border-neutral-200 dark:border-neutral-700 border-t">
                        <CarouselPrevious
                            variant="ghost"
                            size="icon"
                            className={navButtonBase}
                        />
                        <CarouselNext
                            variant="ghost"
                            size="icon"
                            className={navButtonBase}
                        />
                    </div>
                </Carousel>
            </div>
        </>
    );
}
