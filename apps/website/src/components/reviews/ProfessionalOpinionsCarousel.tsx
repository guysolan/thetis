import { AnimatedTestimonials } from "@thetis/ui/animated-testimonials";
import { clinicians } from "./content/clinicians.ts";
import HighlightedWord from "../HighlightedWord.tsx";

function ProfessionalOpinionsCarousel() {
  return (
    <div className="relative mx-auto py-24 max-w-4xl">
      <div className="mx-auto px-4 container">
        <div className="space-y-6 mb-16 text-center">
          <h2 className="font-semibold text-3xl md:text-4xl leading-tight">
            Hear what the <HighlightedWord>Professionals</HighlightedWord> Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg leading-relaxed">
            Our innovative solutions have earned the trust of healthcare
            professionals worldwide, from orthopedic surgeons to
            physiotherapists
          </p>
        </div>

        <div className="flex justify-center items-center mx-auto max-w-screen-lg">
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
      </div>
    </div>
  );
}

export default ProfessionalOpinionsCarousel;
