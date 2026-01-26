import React from "react";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@thetis/ui/carousel";
import { athletes } from "./reviews/content/athletes";

export default function HeroTestimonialCarousel() {
    const ollieLawrence = athletes.find((a) => a.name === "Ollie Lawrence");
    const testimonials = ollieLawrence
        ? [
            ollieLawrence,
            ...athletes.filter((a) => a.name !== "Ollie Lawrence"),
        ]
        : athletes;

    return (
        <div className="mx-auto mt-8 max-w-2xl">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <CarouselItem key={testimonial.name} className="w-full">
                            <div className="bg-white shadow-lg p-6 border border-primary/20 rounded-xl">
                                <div className="flex justify-center items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="fill-primary w-5 h-5 text-primary"
                                        />
                                    ))}
                                </div>
                                <h3 className="mb-2 font-bold text-neutral-900 text-xl text-center">
                                    {testimonial.title}
                                </h3>
                                <p className="mb-4 text-neutral-600 text-center">
                                    {testimonial.short || testimonial.body}
                                </p>
                                <div className="flex justify-center items-center gap-2">
                                    <p className="font-semibold text-neutral-900">
                                        {testimonial.name}
                                    </p>
                                    <span className="text-neutral-500">•</span>
                                    <p className="text-neutral-600 text-sm">
                                        {testimonial.description}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-4">
                    <CarouselPrevious className="static translate-x-0 translate-y-0" />
                    <CarouselNext className="static translate-x-0 translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
}
