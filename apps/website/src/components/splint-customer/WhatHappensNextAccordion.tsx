"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import LocationPrice from "./LocationPrice";

type Variant = "review" | "share-doctor";

export default function WhatHappensNextAccordion({ variant }: { variant: Variant }) {
    if (variant === "review") {
        return (
            <Accordion type="single" collapsible className="bg-neutral-50 dark:bg-neutral-900 mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <AccordionItem value="what-happens-next" className="border-none px-6">
                    <AccordionTrigger className="py-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        What Happens Next?
                    </AccordionTrigger>
                    <AccordionContent>
                        <ol className="space-y-3 text-neutral-600 dark:text-neutral-400 text-sm list-decimal list-inside">
                            <li>
                                We'll review your submission (usually within 3-5
                                business days)
                            </li>
                            <li>
                                If approved, you'll receive an email with a link to
                                claim your cashback
                            </li>
                            <li>
                                Complete the{" "}
                                <a
                                    href="/splint-customer/claim-cashback"
                                    className="text-primary hover:underline"
                                >
                                    cashback claim form
                                </a>{" "}
                                with your payment details
                            </li>
                            <li>
                                Cashback is paid via PayPal or bank transfer within
                                7-10 business days
                            </li>
                            <li>
                                Your review may be featured on our website (with
                                your permission)
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    // share-doctor
    return (
        <Accordion type="single" collapsible className="bg-neutral-50 dark:bg-neutral-900 mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <AccordionItem value="what-happens-next" className="border-none px-6">
                <AccordionTrigger className="py-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    What Happens Next?
                </AccordionTrigger>
                <AccordionContent>
                    <ol className="space-y-3 text-neutral-600 dark:text-neutral-400 text-sm list-decimal list-inside">
                        <li>
                            Send the email (or paste the copied message) to your
                            doctor, physio or their secretary.
                        </li>
                        <li>
                            When they sign up as an affiliate, reply to our
                            follow-up email with their name.
                        </li>
                        <li>
                            We'll confirm and send you a link to claim your{" "}
                            <LocationPrice gbp={40} usd={50} />.
                        </li>
                        <li>
                            Complete the{" "}
                            <a
                                href="/splint-customer/claim-cashback"
                                className="text-primary hover:underline"
                            >
                                cashback claim form
                            </a>{" "}
                            with your payment details.
                        </li>
                        <li>
                            Payment is sent via PayPal or bank transfer within
                            7-10 business days.
                        </li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
