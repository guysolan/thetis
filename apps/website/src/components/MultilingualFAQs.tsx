import React from "react";
import { getRoutesByLanguage, Route } from "../content/routes";

export interface FAQItem {
    question: string;
    answer: string;
}

interface MultilingualFAQsProps {
    faqs: FAQItem[];
    className?: string;
    lang?: string;
    showRelatedArticles?: boolean;
}

const MultilingualFAQs: React.FC<MultilingualFAQsProps> = ({ 
    faqs, 
    className = "",
    lang = "en",
    showRelatedArticles = false
}) => {
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

    // Get related articles in the current language
    const getRelatedArticles = () => {
        if (!showRelatedArticles) return [];
        
        const routes = getRoutesByLanguage(lang);
        return routes.filter(route => route.slug.startsWith('FAQs/')).slice(0, 5);
    };

    const relatedArticles = getRelatedArticles();

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
                
                {/* Related Articles Section */}
                {showRelatedArticles && relatedArticles.length > 0 && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                        <h3 className="mb-4 font-semibold text-xl">
                            {lang === 'de' ? 'Verwandte Artikel' : 
                             lang === 'fr' ? 'Articles Connexes' :
                             lang === 'es' ? 'Artículos Relacionados' :
                             'Related Articles'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedArticles.map((article) => (
                                <a
                                    key={article.slug}
                                    href={article.href}
                                    className="block p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <h4 className="font-medium text-blue-600 hover:text-blue-800">
                                        {article.title}
                                    </h4>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                        {article.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MultilingualFAQs;