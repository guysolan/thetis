"use client";

import { cn } from "../utils";
import React, { useEffect, useState } from "react";
import getUnicodeFlagIcon from "../utils/country-flag-unicode";

export const InfiniteClinicianReviews = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    body: string;
    short?: string;
    name: string;
    title: string;
    description: string;
    clinics: string[];
    clinicImages: string[];
    country: string;
    date: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const decodeText = (text: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    } catch {
      return text;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="relative flex-shrink-0 bg-white dark:bg-black px-4 md:px-8 py-4 md:py-6 border border-neutral-400 dark:border-neutral-600 rounded-2xl w-[350px] md:w-[450px] max-w-full"
            key={item.name}
          >
            <blockquote>
              <p className="mt-1 mb-2 font-semibold text-neutral-700 dark:text-neutral-300 text-lg">
                {decodeText(item.title)}
              </p>
              <p className="z-20 relative font-normal text-neutral-900 dark:text-neutral-100 text-base leading-[1.6]">
                {decodeText(item?.short ?? item.body)}
              </p>
              <div className="z-20 relative flex flex-col mt-6">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 text-lg">
                  {decodeText(item.name)} {getUnicodeFlagIcon(item.country)}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {item.description}
                </span>
                <div className="flex items-center gap-4 mt-8">
                  {item.clinicImages.map((image, index) => (
                    <div key={index} className="p-2 w-auto h-16">
                      <img
                        src={image}
                        alt={item.clinics[index]}
                        className="w-auto h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
