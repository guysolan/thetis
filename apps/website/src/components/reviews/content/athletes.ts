import OliviaBlatch from "@/assets/faces/olivia-blatch.png";
import AndrewLawrence from "@/assets/faces/andrew-lawrence.png";
import KimDaybell from "@/assets/faces/kim-daybell.png";
import type { Review } from "../types";

export const athletes: Review[] = [
  {
    name: "Andrew Lawrence",
    description: "Team GB Basketball",
    image: AndrewLawrence,
    title:
      "Revolutionary night splint - comfortable sleep with no fear of injury",
    short:
      "Revolutionary night splint - comfortable sleep with no fear of injury",
    body:
      "I recently began using the Thetis Night Splint overnight. My regular boot is good for daily use but very heavy and uncomfortable to sleep in - the night splint has been revolutionary for me! It keeps my foot perfectly in place but without being bulky, meaning I can sleep more comfortably with no fear of hurting my Achilles tendon. I would highly recommend everyone and anyone to use this product during your recovery from Achilles rupture.",
    country: "GB",
  },
  {
    name: "Olivia Blatch",
    description: "Team GB Weightlifter",
    image: OliviaBlatch,
    title:
      "Slimmer, lightweight, and allows free movement while protecting the tendon",
    short:
      "Slimmer, lightweight, and allows free movement while protecting the tendon",
    body:
      "The Thetis Night Splint is a lot slimmer and far more lightweight than the orthopaedic boot I was sleeping in. It allows me to move my leg more freely but still stops me from flexing my toes beyond a certain point, which is ideal whilst the tendon heals. The splint even comes in my favourite colour, so I was sold the minute I saw it!",
    country: "GB",
  },
  {
    name: "Kim Daybell",
    description: "Team GB Table Tennis and Doctor",
    image: KimDaybell,
    short: "Simple design that allows better sleep and wound breathing",
    title: "Simple design that allows better sleep and wound breathing",
    body:
      "The Thetis Night Splint has a simple design that is perfectly fit for purpose. It has allowed me to get the sleep that is so vital as I recovered from achilles tendon rupture and surgery whilst also feeling secure and protected. Apart from being less bulky than the orthopaedic boot, it also gives the surgical wounds a chance to breath and has made the recovery period a lot more bearable. I would highly recommend this product!",
    country: "GB",
  },
];
