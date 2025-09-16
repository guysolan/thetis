import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@thetis/ui/carousel";
import professionalOpinionsContent, {
  translatedClinicians,
} from "../../components/reviews/content/professional-opinions.ts";
import { cn } from "../../lib/utils.ts";
import { ProfessionalReview } from "../../components/reviews/ProfessionalReview.tsx";
import { AnimatedTestimonials } from "@thetis/ui/animated-testimonials";
import type { Lang } from "@/config/languages.ts";
import HighlightedParagraph from "../../components/HighlightedParagraph.tsx";

function ProfessionalOpinionsCarousel({ lang = "en" }: { lang: Lang }) {
  const content = professionalOpinionsContent[lang] ||
    professionalOpinionsContent.en;
  const clinicians = translatedClinicians.map((c) => ({
    ...c,
    ...(c.content[lang] || c.content.en),
  }));

  return (
    <section className="relative mx-auto py-12 md:py-24 max-w-screen lg:max-w-5xl m x-auto">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-16 text-center">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight">
            <HighlightedParagraph paragraph={content.title} />
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
            {content.description}
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
              {translatedClinicians.map((review, index) => (
                <CarouselItem
                  key={review.name}
                  className="max-w-[90vw] md:basis-1/2 lg:basis-1/3"
                >
                  <ProfessionalReview review={review} lang={lang} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Fixed position navigation controls */}
            <div className="flex justify-center gap-4 mt-6 pt-4 border-gray-200 border-t">
              <CarouselPrevious className="static rounded-full aspect-square translate-x-0 translate-y-0" />
              <CarouselNext className="static rounded-full aspect-square translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        <div className="hidden md:block">
          <AnimatedTestimonials
            height={350}
            width={250}
            testimonials={clinicians.map((testimonial) => ({
              ...testimonial,
              src: testimonial.image.src,
            }))}
          />
        </div>

        <div className="inline-flex md:flex-row flex-col justify-center items-center gap-1 mx-auto mt-8 md:mt-12 max-w-screen-lg text-lg text-center">
          <p className="font-medium text-gray-600 text-base md:text-xl">
            {content.cta.text}
          </p>
          <a
            href="/reviews"
            className={cn(
              "text-primary text-base md:text-xl underline underline-offset-2",
            )}
          >
            {content.cta.link}
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProfessionalOpinionsCarousel;
