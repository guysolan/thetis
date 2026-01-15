import type { SectionContent } from "@/components/course/types";
import WarmUpDynamicStretch from "@/assets/warm-up-dynamic-stretch.png";

export const metadata = {
    slug: "preventing-rerupture",
    title: "Preventing Re-Rupture",
    description:
        "Risk factors, ongoing strengthening, warm-up protocols, and warning signs",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 26, you're likely returning to more activities and thinking about sport. But re-rupture is a real risk — 3-5% of people experience it. Understanding risk factors, warning signs, and prevention strategies helps you stay safe. This lesson covers how to prevent re-rupture as you return to activity. Knowledge is power — understanding risks helps you make smart choices.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Preventing re-rupture basics",
            items: [
                {
                    text:
                        "Continue strengthening — ongoing strength is crucial for prevention",
                },
                {
                    text: "Warm up properly — always warm up before activity",
                },
                {
                    text: "Know warning signs — recognize when to stop",
                },
                {
                    text:
                        "Progress gradually — don't rush back to high-risk activities",
                },
                {
                    text:
                        "Listen to your body — pain and fatigue are warning signs",
                },
                {
                    text: "Maintain strength long-term — prevention is ongoing",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Re-Rupture Risk",
            content: [
                {
                    type: "text",
                    content:
                        "Re-rupture risk is **3-5%** — low but not negligible. Understanding when risk is highest and what increases risk helps you stay safe.",
                },
                {
                    type: "text",
                    content:
                        "Remember from Week 4 that re-rupture risk is **3-5%** — low but not negligible. Risk is highest during early rehab (weeks 0-8) and boot removal (weeks 8-12), but ongoing risk requires ongoing prevention. See Week 4 for the full timeline and details.",
                },
                {
                    type: "card",
                    title: "When re-rupture risk is highest",
                    description: "High-risk periods.",
                    variant: "warning",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Early rehab (weeks 0-8)** — tendon is weakest, high risk",
                                "**Boot removal (weeks 10-12)** — sudden increase in loading",
                                "**Return to sport too early** — before meeting criteria",
                                "**Fatigue** — tired muscles can't protect tendon",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Risk factors for re-rupture",
                    description: "What increases risk.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Returning too early** — before meeting strength/function criteria",
                                "**Inadequate strength** — weak calf can't protect tendon",
                                "**Fatigue** — tired muscles increase risk",
                                "**Poor warm-up** — cold muscles are more vulnerable",
                                "**Sudden increases in activity** — too much, too fast",
                                "**Previous re-rupture** — having one increases risk of another",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Ongoing Strengthening: Your Best Defense",
            content: [
                {
                    type: "text",
                    content:
                        "**Ongoing strength is your best defense against re-rupture.** Strong muscles protect your tendon. Don't stop strengthening just because you're back to activities.",
                },
                {
                    type: "card",
                    title: "Why ongoing strength matters",
                    description: "The protection it provides.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Strong muscles absorb force** — when your calf is strong, it takes load instead of your tendon. Think of it like **shock absorbers** — strong muscles protect your tendon.",
                        },
                        {
                            type: "text",
                            content:
                                "**Strength prevents fatigue** — strong muscles fatigue less, reducing re-rupture risk.",
                        },
                        {
                            type: "text",
                            content:
                                "**Maintain 25+ heel raises** — this is the minimum strength standard. Ideally maintain this long-term.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to maintain strength",
                    description: "Ongoing strengthening program.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Continue heel raises** — single-leg heel raises 2-3 times per week",
                                "**Add resistance** — use weights or resistance bands as needed",
                                "**Don't stop** — even when back to sport, maintain strength",
                                "**Make it a habit** — strength training becomes part of your routine",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Warm-Up Protocols: Always Warm Up",
            content: [
                {
                    type: "text",
                    content:
                        "**Always warm up before activity.** Cold muscles are more vulnerable to injury. A proper warm-up prepares your body and reduces re-rupture risk.",
                },
                {
                    type: "card",
                    title: "Essential warm-up components",
                    description: "What to include.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**General warm-up (5-10 minutes):**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Light cardio — walking, jogging, bike",
                                "Gradual increase in intensity",
                                "Get your heart rate up",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Calf-specific warm-up:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Ankle pumps and circles",
                                "Gentle calf stretches (not aggressive)",
                                "Heel raises — start with two-foot, progress to single-leg",
                                "Gradual increase in intensity",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Sport-specific movements:** — movements specific to your sport",
                        },
                        {
                            type: "image",
                            src: WarmUpDynamicStretch,
                            alt: "Grant performing a dynamic warm-up with walking lunges before exercise",
                            caption:
                                "Dynamic warm-up: walking lunges help prepare your muscles and reduce injury risk",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why warm-up matters",
                    description: "The science behind it.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Increases blood flow** — warm muscles have better blood supply",
                        },
                        {
                            type: "text",
                            content:
                                "**Improves flexibility** — warm muscles are more flexible",
                        },
                        {
                            type: "text",
                            content:
                                "**Prepares nervous system** — your brain and muscles communicate better",
                        },
                        {
                            type: "text",
                            content:
                                "**Reduces injury risk** — proper warm-up significantly reduces injury risk",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Warning Signs: When to Stop",
            content: [
                {
                    type: "text",
                    content:
                        "Knowing warning signs helps you stop before re-rupture happens. **Listen to your body** — it tells you when something's wrong.",
                },
                {
                    type: "card",
                    title: "Warning signs to watch for",
                    description: "When to stop immediately.",
                    variant: "danger",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Severe pain** — pain that's getting worse, not better",
                                "**New 'pop' or snap** — if you feel or hear a new pop, stop immediately",
                                "**Sudden weakness** — your leg suddenly feels weak",
                                "**Swelling** — new or increasing swelling",
                                "**Unable to bear weight** — can't put weight on your leg",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "danger",
                            content:
                                "**If you experience any of these, stop immediately and seek urgent care.** Don't 'push through' — re-rupture is serious.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Early warning signs",
                    description: "When to slow down.",
                    variant: "warning",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Increasing pain** — pain that's getting worse during activity",
                                "**Fatigue** — feeling unusually tired",
                                "**Stiffness** — increased stiffness",
                                "**Decreased performance** — can't perform as well as usual",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**If you notice these, slow down or stop.** Rest, ice if needed, and don't push through. It's better to miss one session than risk re-rupture.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Gradual Progression: Don't Rush",
            content: [
                {
                    type: "text",
                    content:
                        "**Gradual progression is crucial.** Sudden increases in activity increase re-rupture risk. Progress slowly and systematically.",
                },
                {
                    type: "card",
                    title: "Progression principles",
                    description: "How to progress safely.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Increase one thing at a time** — duration, intensity, or frequency, not all at once",
                                "**10% rule** — increase activity by no more than 10% per week",
                                "**Listen to your body** — if you have concerns, slow down",
                                "**Follow your physio's plan** — they'll guide safe progression",
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
                                "**Some muscle soreness** — normal after activity",
                                "**Mild stiffness** — normal, especially in the morning",
                                "**Gradual improvement** — strength and function improve slowly",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** that doesn't ease — could indicate re-rupture. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Unable to bear weight** — can't put weight on your leg. **Sudden weakness** — your leg suddenly feels weak. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Long-Term Prevention",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Maintain strength** — continue strengthening exercises long-term",
                        "**Always warm up** — make warm-up a non-negotiable part of activity",
                        "**Progress gradually** — don't rush increases in activity",
                        "**Listen to your body** — pain and fatigue are warning signs",
                        "**Stay consistent** — ongoing prevention is better than occasional efforts",
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
                                "You can help by: encouraging ongoing strengthening, reminding about warm-ups, supporting gradual progression, and understanding that prevention is ongoing — not just during recovery.",
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
                        "**This week:** Focus on ongoing strengthening and proper warm-ups",
                        "**Week 28:** We cover starting to run again — walk-jog progression, proper technique",
                        "**Ongoing:** Continue maintaining strength and following prevention strategies",
                        "**Long-term:** Prevention is ongoing — maintain strength and proper warm-ups",
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
                        '**Risk:** "What\'s my re-rupture risk? How can I reduce it?"',
                        '**Strength:** "How should I maintain strength long-term? What exercises?"',
                        '**Warm-up:** "What warm-up should I do? How long?"',
                        '**Progression:** "How should I progress activity safely?"',
                        '**Warning signs:** "What warning signs should I watch for?"',
                        '**Concerns:** "I\'m worried about re-rupture. What can I do?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "What's my risk of re-rupture?",
                    answer:
                        "Overall re-rupture risk is 3-5%. Risk is highest during early rehab and boot removal, but ongoing risk requires ongoing prevention. Maintaining strength, proper warm-ups, and gradual progression reduce risk significantly.",
                },
                {
                    question: "How long should I continue strengthening?",
                    answer:
                        "Long-term — ideally forever. Ongoing strength is your best defense against re-rupture. Continue single-leg heel raises and strengthening exercises 2-3 times per week, even when back to sport.",
                },
                {
                    question: "What if I feel a pop?",
                    answer:
                        "Stop immediately and seek urgent care. A new pop could indicate re-rupture. Don't wait — get assessed immediately. It's better to be cautious than risk further injury.",
                },
                {
                    question: "Can I ever stop worrying about re-rupture?",
                    answer:
                        "Risk decreases over time, but never goes to zero. However, maintaining strength, proper warm-ups, and gradual progression significantly reduce risk. Prevention becomes a habit, not a worry.",
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
                        "**Ongoing strength is your best defense** — maintain strength long-term",
                        "**Always warm up** — proper warm-up reduces injury risk",
                        "**Progress gradually** — don't rush increases in activity",
                        "**Know warning signs** — stop if you have concerns",
                    ],
                },
            ],
        },
    ],
};
