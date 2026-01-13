import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "week-34-day-2-when-things-dont-go-to-plan",
    title: "When Things Don't Go to Plan",
    description:
        "Not progressing, tendon elongation, and when to seek further opinion",
    week: 34,
    day: 2,
    section_number: 30,
};

export const content: SectionContent = {
    intro:
        "By Week 34, most people are making good progress. But sometimes recovery doesn't go as planned. You might not be progressing as expected, or you might have concerns about your recovery. This lesson covers what to do when things don't go to plan: not progressing, tendon elongation, and when to seek further opinion. You will get through this — setbacks happen, but they can be managed.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "When things don't go to plan",
            items: [
                {
                    text:
                        "Assess your progress honestly — where are you vs where you should be?",
                },
                {
                    text:
                        "Talk to your physio — they can assess and guide next steps",
                },
                {
                    text:
                        "Consider further opinion — if concerns persist, seek specialist opinion",
                },
                {
                    text:
                        "Don't give up — setbacks happen, but recovery is still possible",
                },
                {
                    text:
                        "Be patient — recovery takes time, progress isn't always linear",
                },
                {
                    text:
                        "Focus on what you can control — exercises, consistency, following guidance",
                },
            ],
        },
        {
            type: "section",
            title: "Not Progressing as Expected",
            content: [
                {
                    type: "text",
                    content:
                        "**Not progressing as expected** is frustrating and concerning. But it doesn't mean recovery is impossible. Understanding why progress might be slow helps you address it.",
                },
                {
                    type: "card",
                    title: "Common reasons for slow progress",
                    description: "Why progress might be slow.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Inadequate strength** — not doing enough strengthening",
                                "**Inconsistent exercises** — not doing exercises regularly",
                                "**Rushing progression** — progressing too fast, causing setbacks",
                                "**Underlying factors** — age, health, lifestyle factors",
                                "**Tendon elongation** — tendon stretched too much during healing",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What to do if not progressing",
                    description: "Steps to take.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Talk to your physio** — they can assess and identify problems",
                                "**Review your program** — are you doing exercises correctly? Consistently?",
                                "**Be honest** — are you following guidance? Doing exercises?",
                                "**Consider factors** — age, health, lifestyle can affect progress",
                                "**Don't give up** — recovery is still possible, it may just take longer",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Tendon Elongation: Understanding the Problem",
            content: [
                {
                    type: "text",
                    content:
                        "**Tendon elongation** — when your tendon stretches too much during healing — is a concern. It affects function and can limit recovery.",
                },
                {
                    type: "card",
                    title: "What tendon elongation means",
                    description: "Understanding the problem.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Tendon elongation** means your tendon healed at a longer length than normal. This affects your ability to push off, jump, and return to sport.",
                        },
                        {
                            type: "text",
                            content:
                                "**It's permanent** — once elongated, the tendon doesn't shorten back. But function can still improve with strengthening.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Signs of elongation",
                    description: "What to watch for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Difficulty with heel raises** — can't rise up onto toes",
                                "**Weak push-off** — difficulty pushing off when walking/running",
                                "**Limping** — persistent limping despite strength",
                                "**Decreased function** — can't perform activities you should be able to",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What to do if elongation is suspected",
                    description: "Steps to take.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Talk to your physio** — they can assess",
                                "**Consider specialist opinion** — orthopaedic specialist can evaluate",
                                "**Focus on strengthening** — strength can improve function despite elongation",
                                "**Be realistic** — elongation affects recovery, but function can still improve",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "When to Seek Further Opinion",
            content: [
                {
                    type: "text",
                    content:
                        "**Seeking further opinion** is appropriate when concerns persist or progress is significantly behind expectations.",
                },
                {
                    type: "card",
                    title: "When to seek further opinion",
                    description: "Signs you should see a specialist.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Not progressing despite consistent work** — doing everything right but not improving",
                                "**Significant concerns** — about elongation, function, or recovery",
                                "**Persistent problems** — pain, weakness, or function issues",
                                "**Wanting second opinion** — it's okay to seek another perspective",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Who to see",
                    description: "Types of specialists.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Orthopaedic specialist** — can assess tendon, elongation, function",
                                "**Specialist physiotherapist** — experienced with Achilles ruptures",
                                "**Sports medicine doctor** — can assess return to sport readiness",
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
                    title: "Usually normal",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Slow progress** — recovery takes time, progress isn't always linear",
                                "**Setbacks** — occasional setbacks are normal",
                                "**Frustration** — it's normal to feel frustrated",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Severe pain** that doesn\'t ease — pain shouldn\'t be severe. **New "pop" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Unable to bear weight** — can\'t put weight on your leg.',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Managing Setbacks",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Don't give up** — setbacks happen, but recovery is still possible",
                        "**Talk to your physio** — they can help identify and address problems",
                        "**Be honest** — about what you're doing and not doing",
                        "**Consider further opinion** — if concerns persist, seek specialist opinion",
                        "**Focus on what you can control** — exercises, consistency, following guidance",
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
                        "**This week:** Assess your progress, talk to your physio about concerns",
                        "**Week 38:** We cover full recovery and beyond — final thoughts and ongoing maintenance",
                        "**Ongoing:** Continue working on recovery, seek further opinion if needed",
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
                        '**Progress:** "Am I progressing as expected? Where should I be?"',
                        '**Concerns:** "I\'m concerned about [specific concern]. What should I do?"',
                        '**Elongation:** "Could I have tendon elongation? How would I know?"',
                        '**Further opinion:** "Should I seek further opinion? Who should I see?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "What if I'm not progressing?",
                    answer:
                        "Talk to your physiotherapist. They can assess why progress might be slow and help address problems. Be honest about what you're doing and not doing. Recovery takes time, but if concerns persist, consider seeking further opinion.",
                },
                {
                    question: "What is tendon elongation?",
                    answer:
                        "Tendon elongation means your tendon healed at a longer length than normal. This affects function but doesn't mean recovery is impossible. Strengthening can improve function despite elongation. If concerned, talk to your physio or seek specialist opinion.",
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
                        "**Setbacks happen** — but recovery is still possible",
                        "**Talk to your physio** — they can help identify and address problems",
                        "**Consider further opinion** — if concerns persist, seek specialist opinion",
                        "**Don't give up** — recovery takes time, progress isn't always linear",
                    ],
                },
            ],
        },
    ],
};
