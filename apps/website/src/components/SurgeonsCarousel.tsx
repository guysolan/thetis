"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@thetis/ui/carousel";
import { translatedClinicians } from "./reviews/content/professional-opinions";

export default function SurgeonsCarousel() {
    // Show all clinicians so there's content to scroll through
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
                    <div className="flex justify-center gap-4 mt-6 pt-4 border-gray-200 border-t">
                        <CarouselPrevious className="static rounded-full aspect-square rotate-90 translate-x-0 translate-y-0" />
                        <CarouselNext className="static rounded-full aspect-square rotate-90 translate-x-0 translate-y-0" />
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
                    <div className="flex justify-center gap-4 mt-6 pt-4 border-gray-200 border-t">
                        <CarouselPrevious className="static rounded-full aspect-square translate-x-0 translate-y-0" />
                        <CarouselNext className="static rounded-full aspect-square translate-x-0 translate-y-0" />
                    </div>
                </Carousel>
            </div>
        </>
    );
}
