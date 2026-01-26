import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "returning-to-life",
    title: "Returning to Normal Life",
    description: "Work, household tasks, and managing energy during recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 22, you're likely back to many normal activities. You're walking better, building strength, and feeling more like yourself. This lesson covers practical aspects of returning to work and daily life.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Returning to life basics",
            items: [
                {
                    text: "Gradually increase activity — don't rush back to everything at once",
                },
                {
                    text: "Listen to your body — rest when needed, don't push through fatigue",
                },
                {
                    text: "Manage energy — recovery takes energy, pace yourself",
                },
                {
                    text: "Stay consistent with exercises — don't stop just because you're back to normal activities",
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
                        "By Week 22, many people have returned to work or are planning to. How this works depends on your job type and recovery progress.",
                },
                {
                    type: "card",
                    title: "Desk jobs",
                    description: "Usually possible by Week 6-10.",
                    variant: "default",
                    content: [
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
                    title: "Physical jobs",
                    description: "Timing varies based on demands.",
                    variant: "muted",
                    content: [
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
                        "**Phase 4:** Building power and preparing for return to sport",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I return to work?",
                    answer:
                        "Desk jobs: usually Week 6-10 if you can sit comfortably. Physical jobs: timing varies, may need modified duties initially. Your clinician will guide you.",
                },
                {
                    question: "Why am I so tired?",
                    answer:
                        "Recovery takes energy. Your body is healing, exercises are tiring, and your fitness has decreased. Pace yourself, rest when needed, and sleep well.",
                },
                {
                    question: "When will I be back to normal activities?",
                    answer:
                        "Most people return to most normal activities by 3-4 months. Full return to all activities (including sports) takes longer — be patient.",
                },
            ],
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
