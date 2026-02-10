import type { SectionContent } from "@/components/course/types";
import SurgeryVsNonSurgicalOutcomes from "@/assets/surgery-vs-non-surgical-outcomes-v1.png";

export const metadata = {
    slug: "treatment-decision",
    title: "Surgery vs Non-Surgical Treatment",
    description:
        "Understanding your options, UKSTAR trial findings, and making your decision",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "This is one of the biggest decisions in your recovery. The good news? **Both approaches work well** for most people. The UKSTAR trial — the largest study ever done on Achilles rupture — showed that surgical and non-surgical treatments have very similar outcomes. This lesson helps you understand your options so you can make an informed choice with your specialist.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Your goals this week",
            items: [
                {
                    text:
                        "Understand both treatment options (surgery vs non-surgical)",
                },
                {
                    text:
                        "Discuss your options with your specialist — ask questions",
                },
                {
                    text:
                        "Consider your activity level, goals, and personal circumstances",
                },
                {
                    text:
                        "Remember: you don't have to decide everything today — it's OK to ask for time",
                },
                {
                    text:
                        "Keep protecting the tendon 24/7 regardless of which path you choose",
                },
            ],
        },
        {
            type: "image",
            src: SurgeryVsNonSurgicalOutcomes,
            alt: "Infographic comparing surgical and non-surgical treatment outcomes showing success rates, re-rupture rates, and complications",
            caption:
                "Treatment outcomes: both approaches work well for most people",
        },
        {
            type: "section",
            title: "The UKSTAR trial — what the evidence says",
            content: [
                {
                    type: "text",
                    content:
                        "The UKSTAR trial (UKSTAR = UK Study of Tendon Achilles Rupture) is the largest and most rigorous study ever done on Achilles rupture treatment. It followed over 500 patients for two years. Here's what it found:",
                },
                {
                    type: "card",
                    title: "Key findings",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Similar outcomes:** At 2 years, both groups had similar function, strength, and quality of life",
                                "**Re-rupture rates:** Surgical: 2.3%, Non-surgical: 3.9% — both very low",
                                "**Complications:** Surgery had a small risk of infection (2.8%) and wound problems; non-surgical had fewer complications overall",
                                "**Bottom line:** For most people, both approaches work — the choice depends on your individual situation",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple way to think about it",
                    content:
                        "Think of it like choosing between two routes to the same destination. Both get you there — one might have a slightly different risk profile, but the final outcome is very similar for most people.",
                },
            ],
        },
        {
            type: "section",
            title: "Surgical treatment — what it involves",
            content: [
                {
                    type: "text",
                    content:
                        "Surgical repair involves stitching the torn tendon ends back together. The procedure is usually done under general or regional anaesthesia.",
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title: "What happens during surgery",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "An incision (cut) is made at the back of your ankle (usually 3–10 cm)",
                                        "The torn tendon ends are found and stitched together",
                                        "The wound is closed and dressed",
                                        "You're placed in a cast or boot (same as non-surgical)",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "There are two main types: **open repair** (traditional, longer incision) and **minimally invasive** (smaller incisions, special instruments).",
                                },
                            ],
                        },
                        {
                            title: "Recovery after surgery",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The recovery timeline is very similar to non-surgical treatment:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "1–2 weeks in a cast, then transition to a walking boot",
                                        "Same rehabilitation protocol as non-surgical",
                                        "Total recovery time: 6–12 months (same as non-surgical)",
                                        "You'll still need physiotherapy and progressive strengthening",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Potential benefits of surgery",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "Slightly lower re-rupture rate (2.3% vs 3.9%)",
                                        "Faster return to sport for very active people or athletes",
                                        "May preserve more calf muscle strength in some cases",
                                        "May be recommended if the tendon ends don't come together well",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Risks and complications",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Wound infection** (2–4% risk) — can delay recovery",
                                        "**Wound healing problems** — may need additional treatment",
                                        "**Nerve damage** — can cause numbness or tingling (usually temporary)",
                                        "**Blood clots** — same risk as non-surgical, but surgery adds a small extra risk",
                                        "**Scar tissue** — may be visible or cause stiffness",
                                        "**Re-rupture is still possible** — even after surgery",
                                    ],
                                },
                                {
                                    type: "alert",
                                    variant: "info",
                                    title: "Important",
                                    content:
                                        "Most surgical complications are minor and resolve with time. Serious complications are rare, but they can happen.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Non-surgical treatment — what it involves",
            content: [
                {
                    type: "text",
                    content:
                        "Non-surgical (also called conservative) treatment lets the tendon heal on its own, using a boot with wedges to hold your foot in the correct position.",
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title: "What non-surgical treatment involves",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "Wearing a walking boot with heel wedges for approximately 10 weeks",
                                        "Gradually removing wedges to bring your foot to a neutral position",
                                        "Progressive mobilisation as your protocol allows",
                                        "Same physiotherapy and strengthening as surgical patients",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "The key is keeping the tendon ends close together so they can heal — the boot and wedges do this job.",
                                },
                            ],
                        },
                        {
                            title: "Recovery timeline",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "Weeks 0–2: Boot with maximum wedges, Non Weightbearing or Limited Weightbearing",
                                        "Weeks 2–10: Gradual wedge removal, progressive mobilisation",
                                        "Weeks 10–12: Transition out of boot, start physiotherapy",
                                        "Total recovery: 6–12 months (same as surgical)",
                                    ],
                                },
                            ],
                        },
                        {
                            title:
                                "Potential benefits of non-surgical treatment",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**No surgery risks** — no infection, no wound problems, no nerve damage",
                                        "**Lower overall complication rate**",
                                        "**No hospital stay** — can start treatment immediately",
                                        "**Lower cost** — no surgery or anaesthesia fees",
                                        "**Works well for most people** — UKSTAR showed 94% success rate",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Risks and considerations",
                            content: [
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Slightly higher re-rupture rate** (3.9% vs 2.3%) — but still very low",
                                        "**Requires strict adherence** — you must wear the boot 24/7 and follow the protocol",
                                        "**May not be ideal** if the tendon ends don't come together well",
                                        "**May take slightly longer** to return to high-level sports (though outcomes are similar)",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Who should choose which?",
            content: [
                {
                    type: "text",
                    content:
                        "There's no one-size-fits-all answer. Your specialist will help you decide based on:",
                },
                {
                    type: "card",
                    title: "Factors that might favour surgery",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Very active/athletic** — especially if you want to return to high-level sports quickly",
                                "**Tendon ends don't come together** — if the gap is large and doesn't close when your foot is pointed down",
                                "**Younger age** — though this is debated, some studies show better outcomes in younger active patients",
                                "**Personal preference** — some people prefer the certainty of surgical repair",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Factors that might favour non-surgical treatment",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon ends come together well** — if the gap closes when your foot is pointed down",
                                "**Want to avoid surgery risks** — infection, wound problems, nerve damage",
                                "**Older or less active** — though non-surgical works well for active people too",
                                "**Medical conditions** — if you have conditions that make surgery riskier",
                                "**Cost concerns** — non-surgical is typically less expensive",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Important",
                    content:
                        "These are general guidelines. Your specialist will consider your specific situation, including your activity level, tendon gap, overall health, and personal preferences.",
                },
            ],
        },
        {
            type: "section",
            title: "What's normal vs what's urgent",
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
                                "Feeling overwhelmed by the decision — this is a big choice",
                                "Wanting time to think — it's OK to ask for time to decide",
                                "Swelling and bruising continuing to improve",
                                "Mild discomfort in the boot/cast",
                                'Anxiety about making the "wrong" choice — both options work',
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        '**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, severe pressure in cast/boot, or fever with spreading redness.',
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your specialist",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Treatment recommendation:** "What do you recommend for me, and why?"',
                        '**Gap size:** "How big is the gap, and does it close when my foot is pointed down? What does that mean for my options?"',
                        '**Re-rupture risk:** "What\'s my re-rupture risk with each option?"',
                        '**Complications:** "What are the main risks of surgery vs non-surgical for someone like me?"',
                        '**Recovery timeline:** "Will one approach get me back to normal faster?"',
                        '**Activity level:** "I\'m [describe your activity level]. Which approach is better for my goals?"',
                        '**Decision time:** "How long do I have to decide? Can I think about it?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Practical tips for making your decision",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Don't rush** — it's OK to ask for time to think, discuss with family, or get a second opinion",
                        "**Consider your lifestyle** — are you very active? Do you have time for surgery recovery?",
                        "**Think about risk tolerance** — are you comfortable with surgery risks, or do you prefer to avoid them?",
                        "**Trust your specialist** — they've seen hundreds of these injuries and know what works",
                        '**Remember: both work** — you\'re not making a "wrong" choice if you follow your protocol',
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Write down your thoughts about each option. What matters most to you: avoiding surgery risks, getting back to sport quickly, or something else? Having this clear helps you discuss it with your specialist.",
                },
                {
                    type: "tip",
                    title: "For partners / carers",
                    content:
                        "You can help by: listening without pressure, helping research questions, attending appointments, and supporting whichever decision they make. The decision is theirs, but your support matters.",
                },
            ],
        },
        {
            type: "section",
            title: "What happens next",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**After you decide:** You'll be fitted for a boot (if not already) and given a clear protocol to follow",
                        "**Next lesson:** We cover **your walking boot** in detail — Aircast vs VACOped, fitting, and understanding wedges",
                        "**Weeks ahead:** Whether you choose surgery or non-surgical, the recovery path is similar — boot phase, wedge removal, progressive mobilisation, then physiotherapy",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I change my mind after I've decided?",
                    answer:
                        "It depends on timing. If you've already had surgery, you can't undo it. If you're in non-surgical treatment and it's not working well, some people can switch to surgery, but this is less common. The best time to decide is early, with all the information. If you're unsure, ask for more time.",
                },
                {
                    question:
                        "What if my specialist recommends one thing but I prefer the other?",
                    answer:
                        "This is your body and your decision. Ask why they're recommending that option — there may be a good medical reason. If you still prefer the other option and it's medically reasonable, discuss it. A good specialist will respect your choice if both options are valid.",
                },
                {
                    question: "Will I recover faster with surgery?",
                    answer:
                        "The UKSTAR trial showed very similar recovery timelines. Some studies suggest surgery patients may return to work slightly earlier, but overall recovery time (6–12 months) is similar. The difference is usually small.",
                },
                {
                    question: "What if I can't afford surgery?",
                    answer:
                        "If you're in a public health system (like the NHS), cost shouldn't be a barrier — both options are available. If you're paying privately, non-surgical treatment is typically less expensive. Discuss financial concerns with your specialist — they may have options or payment plans.",
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
                        "**Both approaches work well** — the UKSTAR trial showed very similar outcomes",
                        '**There\'s no "wrong" choice** — if you follow your protocol, both lead to good recovery',
                        "**You don't have to decide today** — it's OK to ask for time to think",
                        "**Keep protecting the tendon 24/7** — regardless of which path you choose",
                    ],
                },
            ],
        },
    ],
};
