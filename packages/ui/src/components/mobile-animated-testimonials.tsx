import React from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "../utils";

type Testimonial = {
  body: string;
  title?: string;
  name: string;
  description: string;
  image?: { src: string };
};

export function MobileTestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const arrowStyle =
    "flex justify-center items-center border-2 border-neutral-600 text-neutral-600 rounded-full w-8 h-8 transition-all duration-300 hover:scale-105 hover:bg-neutral-600 hover:text-white";

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center gap-4 px-4 w-full text-left"
            >
              <div className="flex flex-row justify-start items-center gap-4">
                <div className="relative flex-shrink-0 w-24 h-32 transition-transform duration-300 hover:scale-105">
                  <img
                    src={testimonial.image?.src}
                    alt={testimonial.name}
                    className="shadow-lg hover:shadow-xl rounded-xl w-full h-full transition-all duration-300 object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-neutral-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-base text-gray-500">
                    {testimonial.description}
                  </p>
                  <div className="flex justify-start gap-4 mt-6">
                    <button onClick={handlePrev} className={cn(arrowStyle)}>
                      <IconArrowLeft size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActive(index)}
                          className={cn(
                            "border-2 border-neutral-600 w-2 h-2 rounded-full transition-all duration-300",
                            active === index
                              ? "bg-neutral-600 w-4"
                              : "bg-white hover:bg-neutral-200",
                          )}
                        />
                      ))}
                    </div>
                    <button onClick={handleNext} className={cn(arrowStyle)}>
                      <IconArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 pl-6 border-l-4 italic">
                {testimonial.title && (
                  <p className="font-semibold text-base text-gray-800 italic">
                    {testimonial.title}
                  </p>
                )}
                <div>
                  <p
                    className={cn(
                      "max-w-prose text-base text-gray-700 text-left italic",
                      !isExpanded && "line-clamp-3",
                    )}
                  >
                    {testimonial.body}
                  </p>
                  {testimonial.body.length > 150 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-neutral-600 text-sm hover:text-neutral-900"
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
