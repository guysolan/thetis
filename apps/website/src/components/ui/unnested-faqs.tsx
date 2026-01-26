import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
    question: string;
    answer: React.ReactNode | string;
};

type UnnestedFAQsProps = {
    faqs: FAQItem[];
    className?: string;
};

export default function UnnestedFAQs({
    faqs,
    className = "px-4 md:px-0",
}: UnnestedFAQsProps) {
    return (
        <Accordion className={className} type="single" collapsible>
            {faqs.map((faq) => (
                <AccordionItem
                    className="last:border-b-0"
                    key={faq.question}
                    value={faq.question}
                >
                    <AccordionTrigger className="font-semibold leading-loose">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-loose">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
