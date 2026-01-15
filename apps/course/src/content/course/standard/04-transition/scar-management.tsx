import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "scar-management",
    title: "Scar Management After Boot Removal",
    description:
        "Understanding scar tissue, scar massage, bio-oil, and when to start scar management",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "After boot removal, you'll notice changes in your tendon area — it may feel thicker, look different, or have visible scar tissue. This is normal. Your tendon heals with scar tissue, and managing that scar can improve appearance and function. This lesson covers scar tissue formation, when to start scar management, techniques like scar massage and bio-oil, and what to expect.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Scar management basics",
            items: [
                {
                    text:
                        "Wait until wounds are fully healed — usually 2-3 weeks after surgery or boot removal",
                },
                {
                    text:
                        "Start gently — scar massage should be gentle, not painful",
                },
                {
                    text:
                        "Use bio-oil or moisturizer — helps keep scar tissue supple",
                },
                {
                    text:
                        "Be patient — scars take months to mature",
                },
                {
                    text:
                        "Protect from sun — use sunscreen on scars",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Scar Tissue",
            content: [
                {
                    type: "text",
                    content:
                        "Your tendon heals by forming scar tissue. This is normal and necessary, but scar tissue is different from normal tendon tissue.",
                },
                {
                    type: "card",
                    title: "What is scar tissue?",
                    description: "How healing works.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Scar tissue** is the body's way of repairing damaged tissue. When your Achilles tendon ruptures, your body produces collagen to bridge the gap. This new tissue is called scar tissue.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Thicker than normal** — scar tissue is often thicker than original tendon",
                                "**Less organized** — collagen fibers are less organized initially",
                                "**Gradually remodels** — becomes more like normal tissue over time",
                                "**Functional** — allows your tendon to work, even if different",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What to expect",
                    description: "Normal scar characteristics.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Thicker tendon** — your tendon will feel thicker than before",
                                "**Visible scar** — if you had surgery, you'll have a surgical scar",
                                "**Different appearance** — may look different from your other leg",
                                "**Gradual improvement** — appearance and feel improve over months",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** A thicker tendon is normal and doesn't necessarily affect function. Many people have excellent function despite a thicker tendon.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "When to Start Scar Management",
            content: [
                {
                    type: "text",
                    content:
                        "Timing matters for scar management. Start too early and you risk damaging healing tissue. Start too late and you miss the window for optimal results.",
                },
                {
                    type: "card",
                    title: "Prerequisites",
                    description: "What you need before starting.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Wounds fully healed** — no open areas, scabs, or drainage",
                                "**Surgical scars closed** — if you had surgery, wait 2-3 weeks",
                                "**No infection** — skin must be healthy",
                                "**Clinician approval** — check with your physio or surgeon",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Typical timeline",
                    description: "When to start.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Surgical scars:** Usually week 2-3 after surgery (once wounds closed)",
                                "**After boot removal:** Usually week 12-14 (once comfortable touching area)",
                                "**Always check:** With your clinician first",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Scar Massage Techniques",
            content: [
                {
                    type: "text",
                    content:
                        "Scar massage helps keep scar tissue supple and can improve appearance. It should be gentle and not painful.",
                },
                {
                    type: "card",
                    title: "How to do scar massage",
                    description: "Technique and timing.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "numbered",
                            items: [
                                "**Use bio-oil or moisturizer** — helps reduce friction",
                                "**Start gently** — use light pressure initially",
                                "**Circular motions** — massage in small circles",
                                "**Different directions** — massage up, down, and across the scar",
                                "**Duration** — 5-10 minutes, 2-3 times daily",
                                "**Be gentle** — should not be painful",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What scar massage does",
                    description: "Benefits.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Keeps tissue supple** — prevents scar tissue from becoming too stiff",
                                "**Improves blood flow** — promotes healing",
                                "**Breaks down adhesions** — helps scar tissue move more freely",
                                "**May improve appearance** — can help scars fade over time",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Important",
                    content:
                        "Scar massage should be gentle. If it causes pain, stop and check with your clinician. Don't massage over open wounds or infected areas.",
                },
            ],
        },
        {
            type: "section",
            title: "Bio-Oil and Moisturizers",
            content: [
                {
                    type: "text",
                    content:
                        "Using bio-oil or moisturizers can help keep scar tissue supple and may improve appearance. They're not magic, but they can help.",
                },
                {
                    type: "card",
                    title: "Bio-Oil",
                    description: "Popular scar management product.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Bio-Oil** is a popular product for scar management. It contains plant oils and vitamins.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**How to use:** Apply to scar, massage gently",
                                "**Frequency:** 2-3 times daily",
                                "**Timing:** After wounds are fully healed",
                                "**Benefits:** Keeps skin moisturized, may help scars fade",
                                "**Cost:** £8-15 ($12-20) per bottle",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Note:** Evidence for bio-oil specifically is limited, but keeping scars moisturized is generally helpful.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Other moisturizers",
                    description: "Alternative options.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Vitamin E oil** — may help with scar appearance",
                                "**Cocoa butter** — natural moisturizer",
                                "**Silicone gel sheets** — can help flatten raised scars",
                                "**Simple moisturizer** — any good quality moisturizer can help",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Sun Protection",
            content: [
                {
                    type: "text",
                    content:
                        "Scars are more sensitive to sun damage than normal skin. Protecting scars from sun helps them heal better and prevents discoloration.",
                },
                {
                    type: "card",
                    title: "Why sun protection matters",
                    description: "Protecting healing scars.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Scars burn easily** — more sensitive than normal skin",
                                "**Sun can darken scars** — makes them more visible",
                                "**UV damage slows healing** — can affect scar maturation",
                                "**Long-term protection** — scars need protection for 6-12 months",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to protect",
                    description: "Sun protection strategies.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Use sunscreen** — SPF 30+ on scars",
                                "**Cover up** — wear long socks or pants when possible",
                                "**Avoid peak sun** — 10am-4pm when UV is strongest",
                                "**Reapply sunscreen** — every 2 hours if swimming or sweating",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What to Expect Over Time",
            content: [
                {
                    type: "text",
                    content:
                        "Scars change over time. Understanding what's normal helps you have realistic expectations.",
                },
                {
                    type: "card",
                    title: "Scar maturation timeline",
                    description: "How scars change.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Weeks 0-3:** Wound healing, scar formation begins",
                                "**Weeks 3-6:** Scar may be red, raised, firm",
                                "**Months 3-6:** Scar starts to fade, becomes softer",
                                "**Months 6-12:** Scar continues to mature, becomes flatter",
                                "**Year 1+:** Scar reaches final appearance (may continue improving)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Normal scar characteristics",
                    description: "What to expect.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Thicker tendon** — normal, doesn't affect function",
                                "**Visible scar** — if you had surgery",
                                "**Different appearance** — may look different from other leg",
                                "**Gradual improvement** — appearance improves over months",
                                "**Functional** — tendon works well despite appearance",
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
                                "**Thicker tendon** — normal, doesn't affect function",
                                "**Visible scar** — normal if you had surgery",
                                "**Scar feels firm** — normal initially, softens over time",
                                "**Scar is red/pink** — normal initially, fades over months",
                                "**Different appearance** — normal, scars look different",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help",
                    content:
                        "**Signs of infection** — redness spreading, warmth, pus, fever. **Open wound** — scar opens or doesn't heal. **Excessive pain** — severe pain when touching scar.",
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your clinician",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Timing:** "When can I start scar massage? Are my wounds healed enough?"',
                        '**Technique:** "How should I do scar massage? What pressure should I use?"',
                        '**Products:** "Should I use bio-oil or other products? What do you recommend?"',
                        '**Appearance:** "Is my scar normal? Will it improve?"',
                        '**Function:** "Will the thicker tendon affect my function?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When should I start scar massage?",
                    answer:
                        "Usually 2-3 weeks after surgery (once wounds are fully closed) or week 12-14 after boot removal. Always check with your clinician first — they'll assess when it's safe for you to start.",
                },
                {
                    question: "Does bio-oil really work?",
                    answer:
                        "Evidence for bio-oil specifically is limited, but keeping scars moisturized is generally helpful. Bio-oil can help keep scar tissue supple and may improve appearance over time. The most important thing is gentle scar massage, which you can do with bio-oil or any good moisturizer.",
                },
                {
                    question: "Will my scar ever look normal?",
                    answer:
                        "Scars improve over time but may never look exactly like normal skin. However, most scars become much less noticeable over 6-12 months. The most important thing is function — a thicker tendon usually works perfectly well even if it looks different.",
                },
                {
                    question: "Is a thicker tendon normal?",
                    answer:
                        "Yes, absolutely. Your tendon heals with scar tissue, which is often thicker than the original tendon. This is normal and doesn't necessarily affect function. Many people have excellent function despite a thicker tendon.",
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
                        "**Wait until wounds are healed** — usually 2-3 weeks after surgery",
                        "**Start gently** — scar massage should be gentle, not painful",
                        "**Use bio-oil or moisturizer** — helps keep scar tissue supple",
                        "**Protect from sun** — use sunscreen on scars",
                        "**Be patient** — scars take months to mature and improve",
                    ],
                },
            ],
        },
    ],
};
