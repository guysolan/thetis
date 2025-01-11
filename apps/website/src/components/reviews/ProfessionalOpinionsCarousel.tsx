import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";
import { clinicians } from "./content/clinicians.ts";
import HighlightedWord from "../HighlightedWord.tsx";
import { cn } from "../../lib/utils.ts";
import { ProfessionalReview } from "./ProfessionalReview.tsx";
import { AnimatedTestimonials } from "@thetis/ui/animated-testimonials";

function ProfessionalOpinionsCarousel() {
  return (
    <div className="relative mx-auto py-12 md:py-24 max-w-screen lg:max-w-5xl">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-16 text-center">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight">
            Hear what the <HighlightedWord>Professionals</HighlightedWord> Say
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg leading-relaxed">
            Our innovative solutions have earned the trust of healthcare
            professionals worldwide, from orthopedic surgeons to
            physiotherapists
          </p>
        </div>

        <div className="md:hidden w-full max-w-[90vw] md:max-w-screen-lg">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="p-0 w-full"
          >
            <CarouselContent>
              {clinicians.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="max-w-[90vw] md:basis-1/2 lg:basis-1/3"
                >
                  <ProfessionalReview review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Fixed position navigation controls */}
            <div className="flex justify-center gap-4 border-gray-200 mt-6 pt-4 border-t">
              <CarouselPrevious className="static rounded-full translate-x-0 translate-y-0 aspect-square" />
              <CarouselNext className="static rounded-full translate-x-0 translate-y-0 aspect-square" />
            </div>
          </Carousel>
        </div>

        <div className="md:block hidden">
          <AnimatedTestimonials
            height={350}
            width={250}
            client:idle
            testimonials={clinicians.map((testimonial) => ({
              ...testimonial,
              src: testimonial.image.src,
            }))}
          />
        </div>

        <div className="inline-flex md:flex-row flex-col justify-center items-center gap-1 mx-auto mt-8 md:mt-12 max-w-screen-lg text-center text-lg">
          <p className="font-medium text-base text-gray-600 md:text-xl">
            Still not convinced?
          </p>
          <a
            href="/reviews"
            className={cn(
              "underline underline-offset-2 text-primary text-base md:text-xl",
            )}
          >
            Read more Reviews
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalOpinionsCarousel;
