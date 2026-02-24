import type { FAQItem, SectionContent } from "@/components/course/types";
import ReturningToWork from "@/assets/returning-to-work-v3-split-panel-fixed.png";

export const metadata = {
    slug: "returning-to-life",
    title: "Returning to Normal Life",
    description: "Work, household tasks, and managing energy during recovery",
    status: "drafting" as const,
};

export const faqs: FAQItem[] = [
    {
        question: "When can I return to work?",
        answer:
            "Desk jobs: usually **Week 2-6** with care team approval — many return as early as Week 2 if they can sit comfortably. Physical or active jobs: usually **Week 6+** with modified duties initially. Always follow your care team's advice — they'll assess when it's safe for you.",
    },
    {
        question: "Why am I so tired?",
        answer:
            "Recovery takes energy. Your body is healing, exercises are tiring, and your fitness has decreased. Pace yourself, rest when needed, and sleep well.",
    },
    {
        question: "When will I be back to normal activities?",
        answer:
            "Work and daily life: many return to desk work Week 2-6. Most normal activities (walking, household tasks, social) return over the first 3-4 months. Full return to sport takes longer — be patient.",
    },
    {
        question: "When can I travel for work?",
        answer:
            "Desk-based travel (flights, meetings) may be possible Week 2-6 with care team approval — elevate your foot when possible, take breaks. Active travel (site visits, lots of walking) usually needs Week 6+. See [Driving Guidelines](/standard/driving-guidelines) for when you can drive.",
    },
];

export const content: SectionContent = {
    intro:
        "Returning to work and daily life is a key part of recovery. Most people go back to desk work within **Week 2-6** (with care team approval). Physical jobs typically need Week 6+ with modified duties. This lesson covers work, household tasks, travel, and managing energy — all with a conservative approach aligned with your care team's guidance.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Returning to life basics",
            items: [
                {
                    text:
                        "Gradually increase activity — don't rush back to everything at once",
                },
                {
                    text:
                        "Listen to your body — rest when needed, don't push through fatigue",
                },
                {
                    text:
                        "Manage energy — recovery takes energy, pace yourself",
                },
                {
                    text:
                        "Stay consistent with exercises — don't stop just because you're back to normal activities",
                },
            ],
        },
        {
            type: "section",
            title: "Returning to Work",
            content: [
                {
                    type: "text",
                    content:
                        "When people return to work depends on your job type — **always follow your care team's advice**. They'll assess when it's safe for you.",
                },
                {
                    type: "image",
                    src: ReturningToWork,
                    alt: "Returning to work guidance: Desk jobs (Week 2-6 with approval), Physical/active jobs (Week 6+ with modified duties), and tips for managing work during recovery",
                    caption:
                        "Returning to work: guidance for desk, physical, and active jobs",
                },
                {
                    type: "card",
                    title: "Desk jobs",
                    description: "Usually Week 2-6 with care team approval.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Many people return to desk work **Week 2-6** after injury, depending on pain, swelling, and whether they can sit comfortably. Some return as early as Week 2. Your care team will advise based on your situation.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Elevate your foot** when possible to manage swelling",
                                "**Take breaks** — get up and move regularly",
                                "**Consider ergonomics** — comfortable seating, foot support",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Physical or active jobs",
                    description: "Usually Week 6+ with modified duties.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Jobs requiring standing, walking, or physical activity typically need **Week 6 or later**, with modified duties initially. Your care team will assess when you're ready.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**May need modified duties** — lighter duties initially",
                                "**Gradual return** — start part-time, build up",
                                "**Follow clinician guidance** — they'll assess when you're ready",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Travel for work",
                    description: "Desk-based vs active travel.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Desk-based travel** (flights, meetings) — May be possible Week 2-6 with approval; elevate foot when possible, take breaks",
                                "**Active travel** (site visits, walking) — Usually Week 6+; discuss with your care team",
                                "**Driving** — See [Driving Guidelines](/standard/driving-guidelines) for when you can drive based on which leg is injured",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Household Tasks and Daily Activities",
            content: [
                {
                    type: "card",
                    title: "Safe activities",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Light household tasks** — cooking, cleaning (with breaks)",
                                "**Shopping** — if you can walk comfortably",
                                "**Social activities** — meeting friends, going out",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Activities to avoid or modify",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heavy lifting** — avoid heavy objects initially",
                                "**Ladders** — be careful, balance may be affected",
                                "**Prolonged standing** — take breaks, elevate when possible",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Energy and Fatigue",
            content: [
                {
                    type: "text",
                    content:
                        "Recovery takes energy. Returning to normal life while still recovering can be exhausting.",
                },
                {
                    type: "card",
                    title: "Why you're tired",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Healing takes energy** — your body is working hard to repair tissue",
                                "**Exercises use energy** — physio and exercises are tiring",
                                "**Mental fatigue** — recovery is mentally exhausting too",
                                "**Decreased fitness** — activities feel harder than before",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to manage energy",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Pace yourself** — don't try to do everything at once",
                                "**Prioritize** — focus on what's most important",
                                "**Rest when needed** — listen to your body",
                                "**Sleep well** — quality sleep supports recovery",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "alert",
            variant: "info",
            title: "Related topics covered earlier",
            content:
                "**Driving:** See [Driving Guidelines](/standard/driving-guidelines) for when you can drive based on which leg is injured. **Nutrition:** See [Nutrition for Healing](/standard/nutrition-for-healing) for diet guidance.",
        },
        {
            type: "section",
            title: "What's Normal vs What's Urgent",
            content: [
                {
                    type: "card",
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling tired** — recovery takes energy",
                                "**Some difficulty with activities** — you're still recovering",
                                "**Good days and bad days** — some days are better than others",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention).",
                },
            ],
        },
        {
            type: "section",
            title: "What Happens Next",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Week 25:** We cover the 6-month milestone — where your tendon is now",
                        "**Weeks 22-30:** Continue building strength and function",
                        "**Stage 4:** Building power and preparing for return to sport",
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
                        "**Gradually increase activity** — don't rush back to everything at once",
                        "**Stay consistent with exercises** — don't stop just because you're back to normal",
                        "**Manage your energy** — pace yourself, rest when needed",
                    ],
                },
            ],
        },
    ],
};
