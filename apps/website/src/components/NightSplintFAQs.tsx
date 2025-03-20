const faqs = [
  {
    category: "Sizing & Fit",
    questions: [
      {
        question: "How do I know what size to get?",
        answer: <SizeCalculator />,
      },
      {
        question: "Is the sizing accurate?",
        answer:
          "Yes, the sizing is accurate. Sizing is based on foot size, designed to ensure that the splint does not interfere with the toes.",
      },
      {
        question: "Can I adjust the angle of the splint?",
        answer:
          "No, the splint is purposefully designed not to be adjustable to stay lightweight. It maintains the max angle a hinged-boot or boot with wedges would offer. This provides safe healing for the whole recovery period. As it is used in addition to the boot, the obtuse angle will not lead to any tendon shortening or other adverse effects.",
      },
      {
        question: "My foot can move sideways, is this a problem?",
        answer:
          "Some sideways movement is normal and won't affect healing. The splint's main purpose is to maintain the correct angle of your foot pointing downward (plantar flexion).",
      },
      {
        question: "How tight should I fasten the straps?",
        answer:
          "Straps should be firm but comfortable - tight enough to secure your foot but not restrict circulation. Loosen immediately if you experience tingling, numbness, or color changes in your foot. While your foot shouldn't move upward, some minor side-to-side movement is expected.",
      },
    ],
  },
  {
    category: "Product Usage",
    questions: [
      {
        question: "Can I wear this instead of a boot during the day?",
        answer:
          "No, this splint is for resting and sleeping only. You must use crutches if standing or moving while wearing the splint - it is not designed for walking or weight-bearing.",
      },
      {
        question: "Can you use the splint for Achilles tendonitis?",
        answer:
          "No, the splint is only used after rupture of the Achilles tendon. It is not suitable for broken bones, plantar fasciitis or Achilles tendonitis. The splint holds the foot pointed downwards, in a tip toe position, for tendon healing. For other conditions, like plantar fasciitis and Achilles tendonitis, there are different splints deliberately designed to do the opposite, and hold the foot up.",
      },
      {
        question: "Can I get the splint wet (shower/swimming)?",
        answer:
          "The splint can tolerate occasional exposure to water, but it's not specifically designed for wet environments. Extended water exposure may cause deterioration of the soft parts over time. If showering, we recommend using a chair or stool to sit safely, as wet surfaces increase slip hazards. For swimming, the splint can be worn but should be thoroughly dried afterward. Obviously, don't wear the splint for too long when wet to avoid skin laceration. Remember that your safety is paramount - never attempt standing or walking while wearing the splint, especially on wet surfaces.",
      },
    ],
  },
  {
    category: "Medical Recovery",
    questions: [
      {
        question: "At what stage of recovery should I start using the splint?",
        answer:
          "The splint should be used during weeks 2-12 after injury, which is the primary healing phase of your Achilles tendon recovery.",
      },
      {
        question: "How does the splint maintain the correct healing position?",
        answer:
          "The splint holds your foot at a 150-degree angle, which is the optimal position for Achilles tendon healing. This matches the angle you would achieve with a hinged boot or wedges, ensuring proper recovery throughout the healing period.",
      },
      {
        question: "Can I use this with a complete Achilles tear?",
        answer: (
          <>
            Yes, it is designed for complete Achilles tears. For more
            information go to{" "}
            <a
              className="text-primary underline underline-offset-2"
              href="https://thetismedical.com/achilles-ruptures"
            >
              here
            </a>
            .
          </>
        ),
      },
      {
        question: "How does this compare to wearing a boot at night?",
        answer:
          "The night splint is designed to complement your boot treatment, not replace it entirely. It offers several advantages for nighttime use: it's significantly lighter, more breathable, and more hygienic since it's specifically designed for indoor use. Think of it as wearing a specialized night brace rather than sleeping in outdoor footwear.",
      },
      {
        question: "Is some side-to-side movement in the splint normal?",
        answer:
          "Yes, a small amount of side-to-side movement is normal and will not harm your recovery or cause rerupture. The splint's main purpose is to maintain the correct angle of your foot (plantar flexion), which is essential for proper Achilles tendon healing. Some lateral movement is expected and safe. Most importantly, the splint prevents your foot from dorsiflexing (bending upward), which would place harmful stress on the healing tendon.",
      },
    ],
  },
  {
    category: "Ordering & Availability",
    questions: [
      {
        question: "Do you ship internationally?",
        answer: (
          <>
            We ship to the US and UK, for orders in other countries please visit
            <a
              className="text-primary underline underline-offset-2"
              href="https://thetismedical.com/partners"
            >
              {" "}
              our partners page
            </a>
            .
          </>
        ),
      },
      {
        question: "When will out-of-stock sizes be available?",
        answer: (
          <>
            Our splint is popular so we are always restocking. Contact{" "}
            <a
              className="text-primary underline underline-offset-2"
              href="mailto:info@thetismedical.com"
            >
              info@thetismedical.com
            </a>{" "}
            for exact timings.
          </>
        ),
      },
    ],
  },
  {
    category: "Technical Specifications",
    questions: [
      {
        question: "What angle does the splint maintain?",
        answer:
          "The splint maintains a fixed 150-degree angle, which matches the maximum angle provided by hinged boots or wedged boots. This specific angle is designed to optimize healing throughout your recovery period while keeping the device lightweight and user-friendly.",
      },
    ],
  },
];

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import SizeCalculator from "./SizeCalculator";

const NightSplintFAQs = () => {
  return (
    <Accordion className="sm:px-2 w-full max-w-xl" type="multiple">
      {faqs.map((faq) => (
        <AccordionItem key={faq.category} value={faq.category} className="">
          <AccordionTrigger className="py-8 font-semibold text-neutral-900 text-xl">
            {faq.category}
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single">
              {faq.questions.map((question) => (
                <AccordionItem
                  className="last:border-b-0"
                  key={question.question}
                  value={question.question}
                >
                  <AccordionTrigger className="font-semibold leading-loose">
                    {question.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg leading-loose">
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

/* </Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Can you use the splint for Achilles tendonitis?
        </AccordionTrigger>
        <AccordionContent>
          No, the splint is only used after rupture of the Achilles tendon. It
          is not suitable for broken bones, plantar fasciitis or Achilles
          tendonitis. The splint holds the foot pointed downwards, in a tip toe
          position, for tendon healing. For other conditions, like plantar
          fasciitis and Achilles tendonitis, there are different splints
          deliberately designed to do the opposite, and hold the foot up.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          Can you use the splint instead of a boot?
        </AccordionTrigger>
        <AccordionContent>
          Yes, it is designed as an alternative - but ONLY for use when resting.
          You cannot walk or stand in the splint without crutches.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is the sizing accurate?</AccordionTrigger>
        <AccordionContent>
          Yes, the sizing is accurate. Sizing is based on foot size, designed to
          ensure that the splint does not interfere with the toes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          My foot can move sideways, is this a problem?
        </AccordionTrigger>
        <AccordionContent>
          Some sideways movement is normal and won't affect healing. The
          splint's main purpose is to maintain the correct angle of your foot
          pointing downward (plantar flexion).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>How tight should the straps be?</AccordionTrigger>
        <AccordionContent>
          Straps should be firm but comfortable - tight enough to secure your
          foot but not restrict circulation. Loosen immediately if you
          experience tingling, numbness, or color changes in your foot. While
          your foot shouldn't move upward, some minor side-to-side movement is
          expected.
        </AccordionContent>
      </AccordionItem>
    </Accordion> */

export default NightSplintFAQs;
