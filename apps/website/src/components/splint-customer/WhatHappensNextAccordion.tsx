"use client";

import type { Lang } from "@/config/languages";
import { getSplintCustomerPath } from "@/lib/splint-customer-paths";
import {
  formatCopy,
  getSplintCustomerCopy,
} from "@/features/splint-customer/splintCustomerCopy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Variant = "review" | "share-doctor";

function renderStepWithClaimLink(
  step: string,
  claimFormLink: string,
  claimHref: string,
) {
  if (!step.includes(claimFormLink)) {
    return step;
  }
  const [before, after] = step.split(claimFormLink);
  return (
    <>
      {before}
      <a href={claimHref} className="text-primary hover:underline">
        {claimFormLink}
      </a>
      {after}
    </>
  );
}

export default function WhatHappensNextAccordion({
  variant,
  lang = "en",
}: {
  variant: Variant;
  lang?: Lang;
}) {
  const t = getSplintCustomerCopy(lang).accordion;
  const claimHref = getSplintCustomerPath("claim-cashback", lang);

  if (variant === "review") {
    return (
      <Accordion
        type="single"
        collapsible
        className="bg-neutral-50 dark:bg-neutral-900 mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl"
      >
        <AccordionItem value="what-happens-next" className="px-6 border-none">
          <AccordionTrigger className="py-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
            {t.reviewTitle}
          </AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-3 text-neutral-600 dark:text-neutral-400 text-sm list-decimal list-inside">
              {t.reviewSteps.map((step) => (
                <li key={step}>
                  {renderStepWithClaimLink(step, t.claimFormLink, claimHref)}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-neutral-50 dark:bg-neutral-900 mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl"
    >
      <AccordionItem value="what-happens-next" className="px-6 border-none">
        <AccordionTrigger className="py-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
          {t.shareTitle}
        </AccordionTrigger>
        <AccordionContent>
          <ol className="space-y-3 text-neutral-600 dark:text-neutral-400 text-sm list-decimal list-inside">
            {t.shareSteps.map((step) => (
              <li key={step}>
                {renderStepWithClaimLink(step, t.claimFormLink, claimHref)}
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
