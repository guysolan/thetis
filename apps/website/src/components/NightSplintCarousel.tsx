import React from "react";
import { AnimatedTestimonials } from "@thetis/ui/animated-testimonials";
import NightSplintWhiteBg from "../assets/night-splint/achilles_rupture_night_splint_bed_thetis_medical.jpg";

function NightSplintCarousel() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: NightSplintWhiteBg.src || NightSplintWhiteBg,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: NightSplintWhiteBg.src || NightSplintWhiteBg,
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: NightSplintWhiteBg.src || NightSplintWhiteBg,
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: NightSplintWhiteBg.src || NightSplintWhiteBg,
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: NightSplintWhiteBg.src || NightSplintWhiteBg,
    },
  ];
  // return (
  //   <img
  //     src={NightSplintWhiteBg.src || NightSplintWhiteBg}
  //     alt="Splint"
  //   />
  // );
  return <AnimatedTestimonials testimonials={testimonials} autoplay={false} />;
}

export default NightSplintCarousel;
