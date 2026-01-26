import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "new-normal",
    title: "Life After Achilles Rupture",
    description:
        "Your tendon will always be different, managing expectations, and long-term care",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 30, you're likely back to most normal activities. You're walking, maybe running, feeling more like yourself. But your tendon will never be exactly the same as before injury.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Long-term care basics",
            items: [
                {
                    text:
                        "Accept permanent changes — your tendon will always be different, and that's okay",
                },
                {
                    text:
                        "Maintain strength long-term — ongoing strength is crucial",
                },
                {
                    text:
                        "Manage expectations — full recovery takes time, be realistic",
                },
                {
                    text:
                        "Continue prevention — warm-ups, gradual progression, listening to your body",
                },
                {
                    text:
                        "Celebrate progress — acknowledge how far you've come",
                },
                {
                    text: "Stay active — activity supports tendon health",
                },
            ],
        },
        {
            type: "section",
            title: "Your Tendon Will Always Be Different",
            content: [
                {
                    type: "text",
                    content:
                        "This is important to understand: **your tendon will never be exactly the same as before injury.** Permanent changes are normal and don't mean something is wrong.",
                },
                {
                    type: "card",
                    title: "Permanent changes",
                    description: "What to expect long-term.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon thickening** — your tendon will be thicker, this is normal and permanent",
                                "**Some calf asymmetry** — your injured calf may be smaller, this is normal",
                                "**Scar tissue** — the rupture site has healed with scar tissue",
                                "**Different feel** — your tendon may feel different",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**These changes don't affect function.** Your tendon can function well despite these changes. Thickening and asymmetry are cosmetic, not functional problems.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why this is okay",
                    description: "Function matters more than appearance.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Function matters more than appearance.** Your tendon can work well even if it looks or feels different. Many people return to full activity despite permanent changes.",
                        },
                        {
                            type: "text",
                            content:
                                "**Acceptance helps.** Accepting permanent changes reduces frustration and helps you focus on what matters — function and activity.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Expectations",
            content: [
                {
                    type: "text",
                    content:
                        "**Realistic expectations** help you avoid frustration and disappointment. Understanding what's normal long-term helps you manage expectations.",
                },
                {
                    type: "card",
                    title: "What to expect long-term",
                    description: "Realistic expectations.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Full return to activity is possible** — many people return to full activity",
                                "**Recovery takes time** — full recovery takes 12-18 months",
                                "**Some permanent changes** — thickening, asymmetry are normal",
                                "**Ongoing maintenance** — strength and prevention are lifelong",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What not to expect",
                    description: "Unrealistic expectations.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Perfect symmetry** — some asymmetry is normal",
                                "**Tendon to look exactly the same** — thickening is permanent",
                                "**Instant return to sport** — takes time and work",
                                "**No ongoing maintenance** — strength and prevention are ongoing",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Long-Term Care: Maintaining Tendon Health",
            content: [
                {
                    type: "text",
                    content:
                        "**Long-term care** is crucial. Your tendon needs ongoing attention to stay healthy and prevent problems.",
                },
                {
                    type: "card",
                    title: "Ongoing strengthening",
                    description: "Maintain strength long-term. See [Progressive Strengthening](/standard/progressive-strengthening) for exercise guidance.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Continue heel raises** — single-leg heel raises 2-3 times per week",
                                "**Add resistance as needed** — maintain strength",
                                "**Make it a habit** — strength training becomes routine",
                                "**Don't stop** — even when back to sport, maintain strength",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Warm-up protocols",
                    description: "Always warm up.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Always warm up** — before activity, always",
                                "**Calf-specific warm-up** — ankle pumps, heel raises",
                                "**Gradual increase** — start easy, build intensity",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Gradual progression",
                    description: "Don't rush increases.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Progress gradually** — don't rush increases in activity",
                                "**10% rule** — increase by no more than 10% per week",
                                "**Listen to your body** — pain and fatigue are warning signs",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What's Normal vs What's Urgent",
            content: [
                {
                    type: "card",
                    title: "Usually normal long-term",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon thickening** — normal, permanent",
                                "**Some calf asymmetry** — normal, functional strength matters more",
                                "**Some stiffness** — normal, especially in the morning",
                                "**Gradual improvement** — strength and function continue improving",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** that doesn't ease — pain shouldn't be severe. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Unable to bear weight** — can't put weight on your leg. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Living Well After Achilles Rupture",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Accept permanent changes** — your tendon will always be different, and that's okay",
                        "**Maintain strength** — ongoing strength is crucial",
                        "**Always warm up** — before activity, always",
                        "**Progress gradually** — don't rush increases",
                        "**Listen to your body** — pain and fatigue are warning signs",
                        "**Stay active** — activity supports tendon health",
                    ],
                },
                {
                    type: "card",
                    title: "For partners / carers",
                    description: "How you can help.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "You can help by: supporting ongoing maintenance, encouraging strength training, understanding that permanent changes are normal, and being patient — long-term recovery is ongoing.",
                        },
                    ],
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
                        "**This week:** Focus on long-term care and maintenance",
                        "**Ongoing:** Continue maintaining strength and following prevention strategies",
                        "**Long-term:** Life after Achilles rupture is ongoing — maintain strength and care",
                        "**This is the final section** — you've completed the course. Continue following the guidance for long-term health.",
                    ],
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your physiotherapist",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Long-term:** "What should I expect long-term? What\'s normal?"',
                        '**Maintenance:** "How should I maintain strength long-term? What exercises?"',
                        '**Changes:** "Are permanent changes normal? Will they affect function?"',
                        '**Activity:** "What activities are safe long-term? What should I avoid?"',
                        '**Concerns:** "I\'m worried about [specific concern]. Is this normal?"',
                        '**Timeline:** "How long until full recovery? What should I expect?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Will my tendon ever be the same?",
                    answer:
                        "No, your tendon will never be exactly the same as before injury. Permanent changes (thickening, asymmetry) are normal. But your tendon can function well despite these changes. Function matters more than appearance.",
                },
                {
                    question: "How long until full recovery?",
                    answer:
                        "Full recovery typically takes 12-18 months, but it's ongoing. You'll continue improving for months. Some permanent changes are normal and don't mean you're not recovered — they're just part of healing.",
                },
                {
                    question: "Do I need to maintain strength forever?",
                    answer:
                        "Ideally yes. Ongoing strength is your best defense against re-rupture and other problems. Continue strengthening exercises 2-3 times per week, even when back to sport. It becomes a habit.",
                },
                {
                    question: "Can I return to full activity?",
                    answer:
                        "Yes, many people return to full activity. It takes time and work, but full return is possible. Maintain strength, proper warm-ups, gradual progression, and listen to your body.",
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
                        "**Your tendon will always be different** — permanent changes are normal",
                        "**Function matters more than appearance** — your tendon can work well despite changes",
                        "**Maintain strength long-term** — ongoing strength is crucial",
                        "**Life after rupture is ongoing** — maintain care and prevention",
                    ],
                },
            ],
        },
    ],
};
