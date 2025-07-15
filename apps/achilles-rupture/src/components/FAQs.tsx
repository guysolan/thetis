import React from "react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQsProps {
    faqs: FAQItem[];
    className?: string;
}

const FAQs: React.FC<FAQsProps> = ({ faqs, className = "" }) => {
    // Generate JSON-LD schema for SEO
    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer,
                },
            })),
        };
        return schema;
    };

    return (
        <>
            {/* JSON-LD Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateSchema()),
                }}
            />

            {/* FAQ Components */}
            <div className={`space-y-6 ${className}`}>
                {faqs.map((faq, index) => (
                    <div
                        key={`faq-${index}-${faq.question.substring(0, 20)}`}
                        className="bg-white shadow-md p-6 rounded-lg"
                    >
                        <h3 className="mb-4 font-semibold text-xl">
                            {faq.question}
                        </h3>
                        <div className="text-gray-700 whitespace-pre-line">
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FAQs;
