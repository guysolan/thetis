import FAQs from "./FAQs";
import type { FAQItem } from "./FAQs";

export type CategorizedFAQsProp = {
    category: string;
    questions: FAQItem[];
};

const CategorizedFAQs = (
    { categories }: { categories: CategorizedFAQsProp[] },
) => {
    return (
        <>
            {categories.map((category: CategorizedFAQsProp) => (
                <FAQs key={category.category} faqs={category.questions} />
            ))}
        </>
    );
};

export default CategorizedFAQs;
