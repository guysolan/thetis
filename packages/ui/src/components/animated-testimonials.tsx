import React from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef(0);
  const lastUpdateRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
    progressRef.current = 0;
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

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

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div
      className="mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans antialiased"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative gap-20 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-between py-4">
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
            <h3 className="font-bold text-2xl text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-gray-500 text-sm dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-gray-500 text-lg dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
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
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex justify-center items-center bg-gray-100 dark:bg-neutral-800 rounded-full w-7 h-7 cursor-pointer group/button"
            >
              <IconArrowLeft className="group-hover/button:rotate-12 w-5 h-5 text-black dark:text-neutral-400 transition-transform duration-300 cursor-pointer" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex justify-center items-center bg-gray-100 dark:bg-neutral-800 rounded-full w-7 h-7 cursor-pointer group/button"
            >
              <IconArrowRight className="group-hover/button:-rotate-12 w-5 h-5 text-black dark:text-neutral-400 transition-transform duration-300 cursor-pointer" />
            </button>
          </div>
        </div>
        <div>
          <div className="relative w-full h-[500px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.4,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
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
                    width={500}
                    height={500}
                    draggable={false}
                    className="border-neutral-200 dark:border-neutral-800 shadow-xl hover:shadow-2xl border rounded-xl w-full h-full transition-all duration-300 object-center object-cover"
                    style={{ width: "500px", height: "500px" }}
                    onError={(e) => {
                      console.error("Image failed to load:", testimonial.src);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
