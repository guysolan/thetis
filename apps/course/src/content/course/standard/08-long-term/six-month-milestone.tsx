import type { SectionContent } from "@/components/course/types";
import WhereYourTendonIsNow from "@/assets/where-your-tendon-is-now-v9-icon-based-fixed-fixed.png";
import ReturnToSportCriteria from "@/assets/return-to-sport-criteria-v7-mike-checklist-fixed.png";

export const metadata = {
    slug: "six-month-milestone",
    title: "The 6-Month Milestone",
    description:
        "Where your tendon is now, return-to-sport criteria, and psychological readiness",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Six months. Half a year since your injury. This is a major milestone — you've come a long way. Your tendon has healed significantly, you're stronger, and you're likely thinking about return to sport.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Six-month milestone basics",
            items: [
                {
                    text:
                        "Assess your progress — where are you now vs where you started?",
                },
                {
                    text:
                        "Understand return-to-sport criteria — know what you need to achieve",
                },
                {
                    text:
                        "Assess psychological readiness — are you mentally ready to return?",
                },
                {
                    text:
                        "Continue strengthening — don't stop just because you're at 6 months",
                },
                {
                    text:
                        "Be realistic — full return to sport takes time, don't rush",
                },
                {
                    text:
                        "Talk to your physio — they'll assess your readiness and guide next steps",
                },
            ],
        },
        {
            type: "section",
            title: "Where Your Tendon Is Now",
            content: [
                {
                    type: "text",
                    content:
                        "At 6 months, your tendon has healed significantly. Understanding where it is now helps you set realistic expectations.",
                },
                {
                    type: "image",
                    src: WhereYourTendonIsNow,
                    alt: "Achilles tendon status at 6 months showing healed rupture site, tendon is stronger, normal thickening, still healing 12-18 months, with normal changes including calf asymmetry, stiffness, and gradual improvement",
                    caption:
                        "Where your tendon is now at 6 months: healing status and what's normal",
                },
                {
                    type: "card",
                    title: "Tendon healing status",
                    description: "What's happened so far.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon has healed** — the rupture site has filled in with scar tissue",
                                "**Tendon is stronger** — but not as strong as it was before injury",
                                "**Tendon may be thicker** — thickening is normal and permanent, doesn't affect function",
                                "**Tendon is still remodelling** — healing continues for 12-18 months",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Your tendon will never be exactly the same as before injury, but it can function well. Thickening and some permanent changes are normal.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What's normal at 6 months",
                    description: "Expected changes.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon thickening** — normal, permanent, doesn't affect function",
                                "**Some calf asymmetry** — your injured calf may be smaller, this is normal",
                                "**Stiffness** — some stiffness is normal, especially in the morning",
                                "**Gradual improvement** — you're still getting stronger",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Return-to-Sport Criteria",
            content: [
                {
                    type: "text",
                    content:
                        "Return to sport is **criteria-based, not time-based**. You need to meet certain strength and function goals, not just wait for 6 months or 9 months. These criteria ensure you're ready and reduce re-injury risk.",
                },
                {
                    type: "image",
                    src: ReturnToSportCriteria,
                    alt: "Return-to-sport criteria checklist showing 25+ single-leg heel raises, 85% symmetry, pain-free activities, good balance, and confidence, with note that most people need more than 6 months",
                    caption:
                        "Return-to-sport criteria: what you need to achieve before returning to sport",
                },
                {
                    type: "card",
                    title: "Key return-to-sport criteria overview",
                    description: "What you need to achieve.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**At 6 months, assess where you are:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**25+ single-leg heel raises** — gold standard strength test",
                                "**85% symmetry** — injured leg should perform at least 85% as well as uninjured leg",
                                "**Pain-free activities** — walking, running, jumping without pain",
                                "**Good balance** — single-leg balance 30+ seconds",
                                "**Confidence** — psychological readiness to return",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Most people need more than 6 months to meet these criteria. That's normal — don't rush.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Detailed return-to-sport guidance",
                    description:
                        "For comprehensive criteria and return process.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Detailed return-to-sport criteria, the return process (modified practice → full participation → pre-injury level), and return-to-play statistics will be covered in a later lesson.",
                        },
                        {
                            type: "text",
                            content:
                                "**Your physio will assess** your criteria and guide when you're ready to return. Don't return until you meet criteria — rushing increases re-injury risk.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Psychological Readiness",
            content: [
                {
                    type: "text",
                    content:
                        "Physical readiness is only half the story. **Psychological readiness** — feeling confident and mentally prepared — is equally important. Fear of re-injury (kinesiophobia) is common and can hold you back. See [Mental Health Recovery](/standard/mental-health-recovery) for coping strategies.",
                },
                {
                    type: "card",
                    title: "Signs you're psychologically ready",
                    description: "Mental readiness indicators.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Confidence in movements** — you trust your leg",
                                "**No excessive fear** — some caution is normal, excessive fear isn't",
                                "**Willingness to try** — you're ready to test your limits",
                                "**Realistic expectations** — you understand risks and are prepared",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "If you're not psychologically ready",
                    description: "How to build confidence.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Gradual exposure** — start with low-risk activities, build up gradually",
                        },
                        {
                            type: "text",
                            content:
                                "**Build strength** — feeling strong builds confidence",
                        },
                        {
                            type: "text",
                            content:
                                "**Talk to your physio** — they can help with confidence building",
                        },
                        {
                            type: "text",
                            content:
                                "**Consider psychological support** — if fear is severe, professional help can be valuable",
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
                    title: "Usually normal at 6 months",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon thickening** — normal, permanent",
                                "**Some calf asymmetry** — normal, functional strength matters more",
                                "**Some stiffness** — normal, especially in the morning",
                                "**Not ready for full return to sport** — normal, most people need more time",
                                "**Some fear** — normal, confidence builds gradually",
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
            title: "Practical Tips: Working Toward Return to Sport",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Continue strengthening** — don't stop just because you're at 6 months",
                        "**Work on criteria** — focus on meeting return-to-sport criteria",
                        "**Build confidence gradually** — start with low-risk activities",
                        "**Be patient** — most people need more than 6 months",
                        "**Talk to your physio** — they'll guide you on readiness",
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
                                "You can help by: providing encouragement and support, understanding that return to sport takes time, celebrating progress, and being patient — readiness is criteria-based, not time-based.",
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
                        "**This week:** Assess your progress, work toward return-to-sport criteria",
                        "**Week 26:** We cover preventing re-rupture — risk factors, ongoing strengthening, warning signs",
                        "**Week 28:** Starting to Run — when ready to begin running (coming up)",
                        "**Week 32:** Return to Sport — detailed criteria and return process (coming up)",
                        "**Weeks 25-35:** Continue building strength and function, work toward return-to-sport criteria",
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
                        '**Progress:** "Where am I now? How am I progressing?"',
                        '**Criteria:** "Have I met return-to-sport criteria? What do I still need to work on?"',
                        '**Timeline:** "When might I be ready to return to sport? Is 6 months realistic?"',
                        '**Readiness:** "Am I physically and psychologically ready?"',
                        '**Next steps:** "What should I work on next? What\'s my plan?"',
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
                    question: "Am I ready to return to sport at 6 months?",
                    answer:
                        "It depends on whether you've met return-to-sport criteria. Most people need more than 6 months. Your physiotherapist will assess your strength, function, and readiness. Don't rush — criteria-based return is safer than time-based return.",
                },
                {
                    question: "Is it normal that my tendon is thicker?",
                    answer:
                        "Yes, tendon thickening is normal and permanent. It doesn't affect function. Your tendon will never be exactly the same as before injury, but it can function well.",
                },
                {
                    question: "What if I haven't met return-to-sport criteria?",
                    answer:
                        "That's normal — most people need more than 6 months. Continue strengthening, work on criteria, be patient. Your physio will guide you. Criteria-based return is safer than rushing.",
                },
                {
                    question: "I'm scared to return to sport. Is this normal?",
                    answer:
                        "Yes, some fear is normal. Fear of re-injury (kinesiophobia) is common. Build confidence gradually — start with low-risk activities, build strength, talk to your physio. If fear is severe, consider psychological support.",
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
                        "**Return to sport is criteria-based** — meet strength and function criteria, not just wait for time",
                        "**6 months is a milestone** — but most people need more time",
                        "**Psychological readiness matters** — confidence is as important as physical readiness",
                        "**Be patient** — don't rush return to sport, it's safer to wait until you're ready",
                    ],
                },
            ],
        },
    ],
};
