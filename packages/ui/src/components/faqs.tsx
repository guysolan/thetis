import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

export type FAQItem = {
  question: string;
  answer: React.ReactNode | string;
};

export type FAQCategory = {
  category: string;
  questions: FAQItem[];
};

type FAQsProps = {
  faqs: FAQCategory[];
  className?: string;
  withSchema?: boolean;
};

const FAQs = ({
  faqs,
  className = "px-4 md:px-0 w-full max-w-4xl",
  withSchema = true,
}: FAQsProps) => {
  useEffect(() => {
    if (!withSchema) return;

    // Create and add schema to the page
    try {
      // Convert React elements to plain text for JSON schema
      const allFAQs = faqs.flatMap((category) =>
        category.questions.map((q) => {
          // Handle converting React nodes to strings in a cleaner way
          let answerText = "";
          if (typeof q.answer === "string") {
            answerText = q.answer;
          } else {
            // Convert React element to string without assignment in expression
            const div = document.createElement("div");
            div.textContent = q.answer?.toString() || "";
            answerText = div.textContent;
          }

          return {
            question: q.question,
            answer: answerText,
          };
        }),
      );

      // Create the FAQ schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFAQs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

      // Add the schema to the page
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(faqSchema);
      script.setAttribute("data-faq-schema", "");
      document.head.appendChild(script);

      // Clean up on unmount
      return () => {
        const existingScript = document.querySelector(
          "script[data-faq-schema]",
        );
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    } catch (error) {
      console.error("Error generating FAQ schema:", error);
    }
  }, [faqs, withSchema]);

  return (
    <Accordion className={className} type="multiple">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.category}
          value={faq.category}
          className="w-full"
        >
          <AccordionTrigger className="py-8 font-semibold text-neutral-900 text-xl">
            {faq.category}
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
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

export default FAQs;
