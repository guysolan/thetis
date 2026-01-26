import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export type FAQItem = {
  question: string;
  answer: React.ReactNode | string;
};

export type FAQCategory = {
  category?: string;
  question?: string;
  answer?: React.ReactNode | string;
  questions?: FAQItem[];
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

    try {
      // Convert both nested and unnested FAQs to a flat array of Q&As
      const allFAQs = faqs.flatMap((category) => {
        if (category.questions) {
          // Handle nested structure
          return category.questions.map((q) => ({
            question: q.question,
            answer: q.answer,
          }));
        } else if (category.question && category.answer) {
          // Handle flat structure
          return [{
            question: category.question,
            answer: category.answer,
          }];
        }
        return [];
      });

      // Convert answers to strings for schema
      const processedFAQs = allFAQs.map((faq) => {
        let answerText = "";
        if (typeof faq.answer === "string") {
          answerText = faq.answer;
        } else {
          const div = document.createElement("div");
          div.textContent = faq.answer?.toString() || "";
          answerText = div.textContent;
        }
        return {
          question: faq.question,
          answer: answerText,
        };
      });

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: processedFAQs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(faqSchema);
      script.setAttribute("data-faq-schema", "");
      document.head.appendChild(script);

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
      {faqs.map((faq, index) => {
        if (faq.questions) {
          // Render nested structure
          return (
            <AccordionItem
              key={faq.category || index}
              value={faq.category || `faq-${index}`}
              className="w-full"
            >
              <AccordionTrigger className="pb-8 font-semibold text-neutral-900 text-xl text-left">
                {faq.category}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible>
                  {faq.questions.map((question, qIndex) => (
                    <AccordionItem
                      className="last:border-b-0"
                      key={question.question || `q-${qIndex}`}
                      value={question.question || `q-${qIndex}`}
                    >
                      <AccordionTrigger
                        style={{ textAlign: "left" }}
                        className="font-semibold leading-loose"
                      >
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
          );
        } else {
          // Render flat structure
          return (
            <AccordionItem
              key={faq.question || `faq-${index}`}
              value={faq.question || `faq-${index}`}
              className="w-full"
            >
              <AccordionTrigger
                style={{ textAlign: "left" }}
                className="font-semibold leading-loose"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-loose">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        }
      })}
    </Accordion>
  );
};

export default FAQs;
