import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "week-20-day-0-functional-milestones",
    title: "The Functional Milestones",
    description:
        "Pain-free walking, 25+ heel raises, balance tests, and stairs",
    week: 20,
    day: 0,
    section_number: 23,
};

export const content: SectionContent = {
    intro:
        "By Week 20, you're approaching the end of Phase 2 and entering Phase 3. This is a major milestone — you've come a long way. Now it's time to assess your functional milestones: can you walk pain-free? Do 25+ heel raises? Handle stairs confidently? These milestones show you're ready for the next phase. This lesson covers what these milestones mean, how to test them, and what to do if you haven't reached them yet.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Functional milestone assessment",
            items: [
                {
                    text:
                        "Test your milestones — pain-free walking, 25+ heel raises, balance, stairs",
                },
                {
                    text:
                        "Be honest with yourself — know where you are, not where you want to be",
                },
                {
                    text:
                        "Work on gaps — if you haven't reached a milestone, focus on that area",
                },
                {
                    text:
                        "Celebrate progress — acknowledge how far you've come",
                },
                {
                    text:
                        "Talk to your physio — they'll assess your milestones and guide next steps",
                },
                {
                    text:
                        "Be patient — milestones take time, everyone progresses differently",
                },
            ],
        },
        {
            type: "section",
            title: "The 4 Key Functional Milestones",
            content: [
                {
                    type: "text",
                    content:
                        "These four milestones show you're ready for Phase 3 and return to higher-level activities. Think of them as **checkpoints** — passing them means you're ready for the next phase.",
                },
                {
                    type: "card",
                    title: "1. Pain-Free Walking",
                    description: "Walking without pain.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it means:** You can walk normally without pain in your Achilles or calf.",
                        },
                        {
                            type: "text",
                            content: "**How to test:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Walk for 10-15 minutes at normal pace",
                                "No pain in your Achilles or calf",
                                "Normal heel-to-toe pattern",
                                "No limping",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Pain-free walking shows your tendon can handle normal daily loads. This is the foundation for everything else.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "2. 25+ Single-Leg Heel Raises",
                    description: "The gold standard strength test.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it means:** You can do 25+ single-leg heel raises on your injured leg.",
                        },
                        {
                            type: "text",
                            content: "**How to test:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Stand on your injured leg only",
                                "Rise up onto your toes",
                                "Lower slowly and controlled",
                                "Repeat 25+ times",
                                "No support needed (or minimal support)",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** 25+ heel raises shows your calf is strong enough for higher-level activities. This is the gold standard for Phase 2 completion.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "3. Good Balance",
                    description: "Single-leg balance test.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it means:** You can balance on your injured leg confidently.",
                        },
                        {
                            type: "text",
                            content: "**How to test:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Stand on your injured leg only",
                                "Hold for 30+ seconds",
                                "No support needed",
                                "Eyes open initially, then try eyes closed",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Good balance shows your brain has relearned how to control your leg. This is crucial for dynamic activities.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "4. Confident Stairs",
                    description: "Up and down stairs normally.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it means:** You can go up and down stairs normally, without pain or difficulty.",
                        },
                        {
                            type: "text",
                            content: "**How to test:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Go up stairs normally — one foot per step",
                                "Go down stairs normally — one foot per step",
                                "No pain or difficulty",
                                "No need to hold railing (or minimal support)",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Stairs require strength and control. Handling them confidently shows you're ready for more challenging activities.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What If You Haven't Reached All Milestones?",
            content: [
                {
                    type: "text",
                    content:
                        "Not reaching all milestones at Week 20 is **normal**. Everyone progresses differently. The important thing is to know where you are and work on the gaps.",
                },
                {
                    type: "card",
                    title: "If you can't do 25+ heel raises",
                    description: "Focus on strength.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Keep working on strength:** Continue progressive strengthening exercises. Focus on single-leg heel raises, eccentric drops, resistance training. Your physio will guide you.",
                        },
                        {
                            type: "text",
                            content:
                                "**Be patient:** Strength builds gradually. Some people reach 25+ at Week 20, others take longer. Consistency matters more than timelines.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "If walking still causes pain",
                    description: "Focus on form and strength.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Check your form:** Are you walking properly? Heel-to-toe pattern? Equal steps? Your physio can assess.",
                        },
                        {
                            type: "text",
                            content:
                                "**Build strength:** Painful walking often means you need more strength. Focus on strengthening exercises.",
                        },
                        {
                            type: "text",
                            content:
                                "**Talk to your physio:** They can assess why walking causes pain and guide treatment.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "If balance is poor",
                    description: "Focus on balance training.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Balance exercises:** Single-leg balance, balance on unstable surfaces, balance with eyes closed. Your physio will guide you.",
                        },
                        {
                            type: "text",
                            content:
                                "**Strength helps balance:** Stronger muscles help with balance. Continue strengthening exercises.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "If stairs are difficult",
                    description: "Focus on strength and control.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Practice stairs:** Start with one step at a time, build up gradually. Use railing initially, reduce support as you improve.",
                        },
                        {
                            type: "text",
                            content:
                                "**Build strength:** Stairs require strength. Continue strengthening exercises, especially single-leg work.",
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
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Not reaching all milestones** — everyone progresses differently",
                                "**Some difficulty with milestones** — they're challenging, that's normal",
                                "**Good days and bad days** — some days you'll perform better than others",
                                "**Gradual improvement** — milestones improve slowly over weeks",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** that doesn't ease — pain shouldn't be severe. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Working Toward Milestones",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Test regularly** — check your milestones weekly to track progress",
                        "**Focus on gaps** — work on areas where you haven't reached milestones",
                        "**Be patient** — milestones take time, don't rush",
                        "**Celebrate progress** — acknowledge improvements, even if small",
                        "**Talk to your physio** — they'll guide you on reaching milestones",
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
                                "You can help by: providing encouragement and support, celebrating milestones together, understanding that progress takes time, and being patient — reaching milestones is a gradual process.",
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
                        "**This week:** Assess your functional milestones, work on gaps",
                        "**Week 22:** We cover returning to normal life — work, driving, household tasks",
                        "**Weeks 20-25:** Continue building strength and function",
                        "**After Phase 2:** You'll move to Phase 3 (single-leg capacity) — building power and preparing for return to sport",
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
                        '**Assessment:** "Can you assess my functional milestones? Where am I?"',
                        '**Gaps:** "I haven\'t reached [specific milestone]. What should I focus on?"',
                        '**Timeline:** "When should I reach these milestones? Is it normal to not reach them all yet?"',
                        '**Next steps:** "What should I work on next? What\'s my plan?"',
                        '**Phase 3:** "When will I move to Phase 3? What does that involve?"',
                        '**Concerns:** "I\'m worried about [specific concern]. Is this normal?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "Is it normal to not reach all milestones at Week 20?",
                    answer:
                        "Yes, it's normal. Everyone progresses differently. Some people reach all milestones at Week 20, others take longer. The important thing is to know where you are and work on the gaps. Your physiotherapist will guide you.",
                },
                {
                    question: "What if I can only do 10 heel raises?",
                    answer:
                        "That's okay — you're making progress. Keep working on strength. Focus on progressive strengthening exercises. Your physio will guide you on how to build up to 25+. Consistency matters more than timelines.",
                },
                {
                    question: "How long until I reach all milestones?",
                    answer:
                        "It varies. Some people reach all milestones by Week 20, others take until Week 25-30 or longer. Focus on consistent work rather than timelines. You'll get there.",
                },
                {
                    question: "What happens after I reach all milestones?",
                    answer:
                        "Once you reach Phase 2 milestones, you'll move to Phase 3 (single-leg capacity). This involves building power, plyometric training, and preparing for return to sport. Your physio will guide you.",
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
                        "**Four key milestones** — pain-free walking, 25+ heel raises, good balance, confident stairs",
                        "**Not reaching all is normal** — everyone progresses differently",
                        "**Work on gaps** — focus on areas where you haven't reached milestones",
                        "**Be patient** — milestones take time, consistency matters more than timelines",
                    ],
                },
            ],
        },
    ],
};
