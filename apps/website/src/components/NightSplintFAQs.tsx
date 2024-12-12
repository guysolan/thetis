import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
const NightSplintFAQs = () => {
  return (
    <Accordion type="single" collapsible>
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
    </Accordion>
  );
};

export default NightSplintFAQs;
