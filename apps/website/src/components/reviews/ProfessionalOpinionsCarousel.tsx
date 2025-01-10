import { AnimatedTestimonials } from "@thetis/ui/animated-testimonials";
import { MobileTestimonialCarousel } from "@thetis/ui/mobile-animated-testimonials";
import { clinicians } from "./content/clinicians.ts";
import HighlightedWord from "../HighlightedWord.tsx";
import { cn } from "../../lib/utils.ts";
import { buttonVariants } from "../ui/button.tsx";
import { ReviewCard } from "./ReviewCard.tsx";

function ProfessionalOpinionsCarousel() {
  return (
    <div className="relative mx-auto py-12 md:py-24 max-w-screen lg:max-w-4xl">
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

        <div className="space-y-6 md:hidden mx-auto max-w-[90vw]">
          <MobileTestimonialCarousel
            testimonials={clinicians.map((t) => ({
              ...t,
              src: t.image?.src,
            }))}
          />
        </div>

        <div className="md:flex justify-center items-center hidden mx-auto max-w-screen-lg">
          <AnimatedTestimonials
            height={350}
            width={250}
            testimonials={clinicians.map((t) => ({
              ...t,
              src: t.image?.src,
            }))}
            autoplay={false}
          />
        </div>
        <div className="inline-flex md:flex-row flex-col justify-center items-center gap-1 mx-auto mt-8 md:mt-12 max-w-screen-lg text-center">
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
