import React, { useState } from "react";

interface FAQ {
    question: string;
    answer: React.ReactNode;
}

const faqs: FAQ[] = [
    {
        question: "Why is the night splint essential for recovery?",
        answer: (
            <div>
                <p>
                    The Thetis night splint solves the #1 complaint during
                    recovery: sleeping in a heavy boot. Benefits include:
                </p>
                <ul className="space-y-1 mt-2 pl-5 text-gray-600 list-disc">
                    <li>Lightweight (unlike the boot)</li>
                    <li>Allows air circulation to prevent sweating</li>
                    <li>Easy to adjust for comfort</li>
                    <li>Only takes seconds to put on/remove</li>
                </ul>
                <blockquote className="mt-4 pl-4 border-purple-600 border-l-4 text-gray-700 italic">
                    "I've been able to sleep well and the splint has remained
                    secure. The recovery of my Achilles tendon remains on track
                    too." - Patient review
                </blockquote>
            </div>
        ),
    },
    {
        question: "Is the Thetis splint worth the investment?",
        answer: (
            <div>
                <p>
                    Patients consistently report it's worth every penny. Here's
                    what they say:
                </p>
                <ul className="space-y-2 mt-2 pl-5 text-gray-600 list-disc">
                    <li>
                        "This product works perfect to keep my foot in forward
                        flexion as I sleep" - Rob
                    </li>
                    <li>
                        "It was fantastic being able to remove the boot and
                        sleep comfortably" - Anas
                    </li>
                    <li>
                        "This splint has been a very worthwhile purchase" -
                        Patient
                    </li>
                    <li>
                        "It's a good example of a small company that's
                        identified a problem and provided a solution" - Patient
                    </li>
                </ul>
                <p className="mt-4 font-semibold">
                    Consider this: One night of poor sleep affects your
                    recovery. The splint pays for itself in better healing
                    outcomes.
                </p>
            </div>
        ),
    },
    {
        question: "What do surgeons say about the night splint?",
        answer: (
            <div>
                <p>Leading foot and ankle surgeons strongly recommend it:</p>
                <blockquote className="mt-3 pl-4 border-blue-600 border-l-4 italic">
                    "When I tore my own Achilles tendon, the hardest part of the
                    recovery was having to wear the hospital boot in bed at
                    night for many weeks. It is fantastic that Thetis Medical
                    have produced this night-splint. It is certain to improve
                    the recovery experience for patients." - Mr James Davis,
                    Past President of BOFAS
                </blockquote>
                <blockquote className="mt-3 pl-4 border-blue-600 border-l-4 italic">
                    "I have found the Thetis splint particularly effective in
                    bridging the gap between immobilization and active
                    recovery." - Dr Robbie Ray, Foot and Ankle Surgeon
                </blockquote>
            </div>
        ),
    },
    {
        question: "Can I use the night splint immediately after injury?",
        answer: (
            <div>
                <p>
                    Always consult your surgeon first. Most patients start using
                    it after:
                </p>
                <ul className="space-y-1 mt-2 pl-5 text-gray-600 list-disc">
                    <li>Initial cast removal (usually 2 weeks)</li>
                    <li>When transitioning to a boot</li>
                    <li>With surgeon approval for night-time use</li>
                </ul>
                <p className="mt-3 font-semibold text-amber-600">
                    ⚠️ Never use for weight bearing - night time and resting
                    only
                </p>
                <blockquote className="mt-3 pl-4 border-gray-600 border-l-4 text-gray-700 italic">
                    "Although this splint is intended for night use only. I used
                    it day and night for immobilization in my first 4 weeks
                    after Achilles repair" - Thomas
                </blockquote>
            </div>
        ),
    },
    {
        question: "What about other recovery equipment priorities?",
        answer: (
            <div className="space-y-3">
                <p className="font-semibold">
                    Essential items (first 2 weeks):
                </p>
                <ul className="space-y-1 pl-5 text-gray-600 list-disc">
                    <li>Walking boot (foundation of recovery)</li>
                    <li>Night splint (for sleep from week 2-3)</li>
                    <li>Waterproof cover (infection prevention)</li>
                    <li>EVENup leveler (prevent back pain)</li>
                </ul>

                <p className="mt-4 font-semibold">
                    Comfort upgrades (weeks 3-12):
                </p>
                <ul className="space-y-1 pl-5 text-gray-600 list-disc">
                    <li>Crutch handles (40% pain reduction)</li>
                    <li>Elevation wedge (swelling control)</li>
                    <li>Merino socks (temperature regulation)</li>
                </ul>
            </div>
        ),
    },
    {
        question: "How long will I need these items?",
        answer: (
            <div>
                <p>Recovery timelines vary, but typical usage:</p>
                <ul className="space-y-1 mt-2 pl-5 text-gray-600 list-disc">
                    <li>
                        <strong>Boot:</strong> 8-12 weeks full time
                    </li>
                    <li>
                        <strong>Night splint:</strong>{" "}
                        3-6 months (longer for comfort)
                    </li>
                    <li>
                        <strong>EVENup:</strong> As long as wearing boot
                    </li>
                    <li>
                        <strong>Crutches:</strong>{" "}
                        2-8 weeks depending on protocol
                    </li>
                </ul>
                <blockquote className="mt-4 pl-4 border-purple-600 border-l-4 text-gray-700 italic">
                    "I certainly recommend this product over cast or slab after
                    achilles repair if the surgeon prefers non weight bearing
                    early post op." - Thomas
                </blockquote>
            </div>
        ),
    },
];

const EquipmentFAQs: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            <h2 className="mb-8 font-bold text-3xl text-center">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4 mx-auto max-w-4xl">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-sm overflow-hidden"
                    >
                        <button
                            className="flex justify-between items-center hover:bg-gray-50 px-6 py-4 w-full text-left transition-colors"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="font-semibold text-lg">
                                {faq.question}
                            </span>
                            <span className="text-gray-500 text-2xl">
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="px-6 pb-4 text-gray-700">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentFAQs;
