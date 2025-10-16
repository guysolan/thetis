import UnnestedFAQs from "@/components/ui/unnested-faqs";
import type { Lang } from "@/config/languages";

interface Props {
    lang?: Lang;
    title: string;
    faqs: { question: string; answer: string }[];
}

export default function FAQSection({ lang = "en", title, faqs }: Props) {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto px-4 container">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-12 font-semibold text-neutral-950 text-3xl md:text-4xl text-center">
                        {title}
                    </h2>
                    <UnnestedFAQs faqs={faqs} />
                </div>
            </div>
        </section>
    );
}
