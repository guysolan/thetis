import type { FAQItem, SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "other-leg",
    title: "Your Other Leg",
    description:
        "Higher risk of rupture, but only 5% — rehab should include both legs",
    status: "drafting" as const,
};

export const faqs: FAQItem[] = [
    {
        question: "Should I be worried about rupturing my other leg?",
        answer:
            "The risk is higher than in the general population, but still only around 5%. Focus on what you can control: strengthen both calves, warm up both sides, and don't neglect the uninjured leg. Balanced strength and good movement patterns reduce risk.",
    },
    {
        question: "Should I do exercises on both legs?",
        answer:
            "Yes. Rehab after one injury should include exercises for both legs. Strengthen both calves, maintain balance, and don't neglect the uninjured side. This supports good movement patterns and reduces the risk of problems in either leg.",
    },
];

export const content: SectionContent = {
    intro:
        "Patients often wonder about their other leg. If you've ruptured one Achilles, you have a slightly higher risk of rupturing the other — but it's only around **5%**. The key takeaway: your rehab should include **both legs**. This short chapter covers what you need to know.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Caring for both legs",
            items: [
                {
                    text:
                        "Strengthen both calves — don't neglect the uninjured leg",
                },
                {
                    text:
                        "Warm up both sides — before activity, always",
                },
                {
                    text:
                        "Include both legs in your rehab — balanced strength supports good movement",
                },
                {
                    text:
                        "Don't over-worry — 5% risk means 95% don't rupture the other",
                },
            ],
        },
        {
            type: "section",
            title: "The Risk: Higher, But Still Low",
            content: [
                {
                    type: "text",
                    content:
                        "People who rupture one Achilles have a slightly higher risk of rupturing the other compared to the general population. But that risk is still only around **5%** — meaning 95% of people do not rupture the other leg.",
                },
                {
                    type: "card",
                    title: "What this means",
                    description: "Practical takeaway.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Don't panic** — the risk is real but low",
                                "**Focus on prevention** — strengthen both legs, warm up properly",
                                "**Rehab both legs** — your uninjured leg benefits from strength work too",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Rehab Should Include Both Legs",
            content: [
                {
                    type: "text",
                    content:
                        "Rehab after one Achilles rupture should include exercises for **both legs**. This isn't just about preventing a second rupture — it's about building balanced strength, good movement patterns, and overall function.",
                },
                {
                    type: "card",
                    title: "Why both legs matter",
                    description: "Balanced strength supports recovery.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Strengthen both calves** — heel raises, seated calf work, progressive strengthening",
                                "**Warm up both sides** — before activity, always",
                                "**Don't neglect the uninjured leg** — it's been compensating and may need attention too",
                                "**Balanced strength** — supports good movement patterns and reduces injury risk",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: faqs,
        },
        {
            type: "card",
            title: "If you remember nothing else",
            variant: "highlight",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Higher risk, but only 5%** — don't over-worry",
                        "**Rehab both legs** — strengthen both calves, warm up both sides",
                        "**Balanced strength** — supports good movement and reduces risk",
                    ],
                },
            ],
        },
    ],
};
