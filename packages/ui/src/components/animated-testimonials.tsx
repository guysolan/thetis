import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { ExternalLink } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  description: string;
  src: string;
};

// Memoize the testimonial image component
const TestimonialImage = memo(
  ({
    testimonial,
    isActive,
    index,
    totalLength,
    width,
    height,
  }: {
    testimonial: Testimonial;
    isActive: boolean;
    index: number;
    totalLength: number;
    width: number;
    height: number;
  }) => {
    const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    return (
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          scale: 0.9,
          z: -100,
          rotate: randomRotateY(),
        }}
        animate={{
          opacity: isActive ? 1 : 0.4,
          scale: isActive ? 1 : 0.95,
          z: isActive ? 0 : -100,
          rotate: isActive ? 0 : randomRotateY(),
          zIndex: isActive ? 999 : totalLength + 2 - index,
          y: isActive ? [0, -80, 0] : 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          z: 100,
          rotate: randomRotateY(),
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="absolute inset-0 origin-bottom"
      >
        <img
          src={testimonial.src}
          alt={testimonial.name}
          width={width}
          height={height}
          loading="lazy"
          draggable={false}
          className="border-neutral-200 dark:border-neutral-800 shadow-xl hover:shadow-2xl border rounded-xl w-full h-full transition-all duration-300 object-center object-cover"
          style={{ width: `${width}px`, height: `${height}px` }}
          onError={(e) => {
            console.error("Image failed to load:", testimonial.src);
            e.currentTarget.style.display = "none";
          }}
        />
      </motion.div>
    );
  },
);

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  width = 500,
  height = 500,
  baseZIndex = 1,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  width?: number;
  height?: number;
  baseZIndex?: number;
}) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef(0);
  const lastUpdateRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  // Memoize handlers
  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
    progressRef.current = 0;
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = useCallback(
    (index: number) => {
      return index === active;
    },
    [active],
  );

  useEffect(() => {
    if (!autoplay) return;

    const animate = () => {
      const now = Date.now();
      const delta = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      // Calculate progress increment based on hover state
      const increment = delta / (isHovered ? 15000 : 5000);
      progressRef.current += increment;

      if (progressRef.current >= 1) {
        handleNext();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoplay, isHovered, testimonials.length]);

  const arrowStyle =
    "flex justify-center items-center bg-primary rounded-full w-10 h-10 text-white cursor-pointer group/button hover:rotate-2";
  return (
    <div
      className="mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans antialiased"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: baseZIndex }}
    >
      <div className="relative flex md:flex-row flex-col items-center gap-8 md:gap-32">
        <div className="flex flex-col justify-center py-4 pr-4 w-full md:w-2/3">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <a
              href={testimonials[active].link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center gap-2 font-bold text-2xl text-neutral-900 dark:text-white"
            >
              {testimonials[active].name}
              <ExternalLink size={20} />
            </a>
            <p className="text-base text-gray-500 dark:text-neutral-500">
              {testimonials[active].description}
            </p>
            {testimonials[active].body
              .split("\n\n")
              .map((paragraph, pIndex) => (
                <motion.p
                  key={pIndex}
                  className="mt-4 text-base text-gray-500 dark:text-neutral-300"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.2 * pIndex,
                  }}
                >
                  {paragraph.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.2 * pIndex + 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              ))}
          </motion.div>
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              className={cn(arrowStyle)}
              style={{
                transform: "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(10deg) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={cn(arrowStyle)}
              style={{
                transform: "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(-10deg) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/3">
          <div
            className="relative flex justify-center items-center mx-auto w-full"
            style={{ height: `${height + 50}px` }}
          >
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <TestimonialImage
                  key={index}
                  testimonial={testimonial}
                  isActive={isActive(index)}
                  index={index}
                  totalLength={testimonials.length}
                  width={width}
                  height={height}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
