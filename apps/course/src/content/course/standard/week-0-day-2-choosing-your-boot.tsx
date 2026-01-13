import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "week-0-day-2-choosing-your-boot",
    title: "Choosing Your Walking Boot",
    description:
        "Aircast vs VACOped comparison, essential equipment, and product recommendations",
    week: 0,
    day: 2,
    section_number: 2.5,
};

export const content: SectionContent = {
    intro:
        "Your walking boot is going to be your constant companion for the next 8-12 weeks. Understanding the options — and the essential accessories — makes a real difference to your comfort and recovery. Here's what you need to know.",

    blocks: [
        {
            type: "section",
            title: "The two main boot options",
            content: [
                {
                    type: "text",
                    content:
                        "Most hospitals offer either the **Aircast** or **VACOped** boot. Both work — but they work differently, and understanding the difference helps you get the most from whichever you have.",
                },
                {
                    type: "card",
                    title: "Quick comparison",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Aircast:** Uses removable wedges to set ankle angle. Lighter, cheaper (~£120), widely available. Not waterproof.",
                                "**VACOped:** Uses a hinged mechanism with adjustable range of motion. Heavier, more expensive (~£300), may preserve muscle better. Waterproof (with fiddly setup).",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Aircast boot",
            content: [
                {
                    type: "text",
                    content:
                        "The **Aircast AIRSELECT ELITE** is the most commonly provided boot in the NHS and many other health systems. It's lightweight, affordable, and easy to adjust.",
                },
                {
                    type: "card",
                    title: "Aircast advantages",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Lightweight** — easier to move around",
                                "**Inexpensive** — ~£120 + £20 for wedges",
                                "**Widely available** — most hospitals stock them",
                                "**Easy to adjust** — simple wedge removal as you progress",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Aircast disadvantages",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Not waterproof** — you'll need a Limbo cover for showering",
                                "**Fixed position** — may cause more muscle wasting",
                                "**Can cause lurching gait** — the step-change in angles can feel awkward",
                                "**Wedges can cause foot sliding** — some people get toe pain",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "VACOped boot",
            content: [
                {
                    type: "text",
                    content:
                        "The **VACOped** is considered by some specialists to be the gold standard. It has a hinged mechanism that allows controlled movement within a safe range.",
                },
                {
                    type: "card",
                    title: "VACOped advantages",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Better equinus position** — research suggests 48° vs 28° ankle plantarflexion",
                                "**Dynamic recovery** — controlled range of motion may reduce muscle wasting",
                                "**Waterproof** — can swim with proper setup (requires removing inner lining)",
                                "**Vacuum-bead liner** — may help prevent pressure sores",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "VACOped disadvantages",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Expensive** — ~£300 vs £120 for Aircast",
                                "**Heavier and bulkier** — some find walking harder initially",
                                "**Complex adjustment** — more challenging to set up",
                                "**May need EVENup shoe leveler** — the thicker base can cause leg-length difference",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "alert",
            variant: "info",
            title: "Which boot should I choose?",
            content:
                "If your hospital provides a boot, use what they give you — **both work equally well**. VACOped, Aircast (black boot), or other boots — all are valid treatment options with similar outcomes. If you're buying privately: **VACOped** may be worth it for active patients who can afford it. **Aircast** is a practical choice if budget is a concern or you want something lightweight. The key is following your protocol correctly, not which boot you have.",
        },
        {
            type: "section",
            title: "The sleeping problem (and solution)",
            content: [
                {
                    type: "text",
                    content:
                        "Here's what nobody tells you upfront: **sleeping in your boot is miserable**. Both Aircast and VACOped are hot, heavy, and uncomfortable to sleep in. But tendon protection overnight is absolutely essential — removing your boot while sleeping is one of the most common causes of re-rupture.",
                },
                {
                    type: "card",
                    title: "The Thetis Night Splint",
                    description: "A better solution for overnight protection",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "The **Thetis Achilles Rupture Splint** is specifically designed for sleeping. It's lightweight, breathable, and maintains the correct plantarflexed (pointed-down) position while you sleep. Many patients find it dramatically improves sleep quality compared to wearing the full boot.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Lightweight** — much lighter than a walking boot",
                                "**Breathable** — cooler for sleeping",
                                "**Maintains correct angle** — keeps your tendon protected",
                                "**Washable liner** — better hygiene than boot liners",
                                "**Also works for showering** — maintains protection while you wash your foot",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Showering options",
                    content:
                        "For washing, you have two main options: **(1)** Wear a waterproof cover (like a Limbo) over your boot — this protects the boot but means you can't wash the foot itself. **(2)** Use the **Thetis night splint** which maintains the correct angle while allowing you to wash your foot and leg properly. Many patients find option 2 much more hygienic.",
                },
            ],
        },
        {
            type: "section",
            title: "Essential equipment checklist",
            content: [
                {
                    type: "checklist",
                    title: "Equipment you'll need",
                    items: [
                        {
                            text:
                                "**Walking boot** (Aircast or VACOped) — usually provided by hospital",
                        },
                        {
                            text: "**Crutches** — usually provided by hospital",
                        },
                        {
                            text:
                                "**Thetis Night Splint** — for comfortable, safe sleeping and showering",
                        },
                        {
                            text:
                                "**Waterproof cover** (Limbo) — if using Aircast and want to shower with boot on",
                        },
                        {
                            text:
                                "**EVENup shoe leveler** — especially with VACOped to prevent back/hip pain",
                        },
                        {
                            text:
                                "**Ergonomic crutch handles** — optional but reduces hand pain",
                        },
                        {
                            text:
                                "**Leg elevation wedge** — more comfortable than stacking pillows",
                        },
                        {
                            text:
                                "**Small backpack or bum bag** — essential for carrying things on crutches",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Full setup costs",
            content: [
                {
                    type: "text",
                    content:
                        "Here's what a complete setup typically costs (approximate, prices vary):",
                },
                {
                    type: "card",
                    title: "Aircast complete setup",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Aircast boot: ~£116 / $150",
                                "Wedges: ~£21 / $27",
                                "Limbo waterproof cover: ~£23 / $30",
                                "Thetis Night Splint: ~£65 / $93",
                                "**Total: ~£225 / $300**",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "VACOped complete setup",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "VACOped boot: ~£291 / $378",
                                "Replacement liner (for swimming): ~£31 / $40",
                                "EVENup shoe leveler: ~£28 / $36",
                                "Thetis Night Splint: ~£65 / $93",
                                "**Total: ~£415 / $547**",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "My hospital only offers Aircast — should I buy a VACOped privately?",
                    answer:
                        "Probably not necessary. Research shows both boots lead to similar long-term outcomes. The VACOped may have some biomechanical advantages, but the Aircast is a proven, effective option. Focus your budget on comfort items like the Thetis night splint instead.",
                },
                {
                    question: "Can I sleep without any boot or splint?",
                    answer:
                        "**No.** This is one of the most common ways people re-rupture or lengthen their tendon. You need protection 24/7 in the early weeks. The Thetis night splint makes overnight protection much more comfortable.",
                },
                {
                    question: "How do I shower without getting my boot wet?",
                    answer:
                        "You have two options: **(1)** Use a waterproof cover (Limbo) over your boot — keeps the boot dry but you can't wash your foot. **(2)** Use the Thetis night splint — it maintains the correct angle while allowing you to wash your foot and leg. Option 2 is better for hygiene.",
                },
                {
                    question: "When can I stop wearing protection at night?",
                    answer:
                        "This varies by protocol — typically somewhere between weeks 6-10, once you've transitioned to a neutral angle and your clinician confirms it's safe. Always follow your specific protocol rather than a general timeline.",
                },
            ],
        },
        {
            type: "card",
            title: "Key takeaways",
            variant: "highlight",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Both Aircast and VACOped work** — use what your hospital provides",
                        "**Sleeping in your boot is miserable** — the Thetis night splint is a game-changer",
                        "**You need protection 24/7** — never remove your boot/splint without clinical guidance",
                        "**Budget for comfort items** — a night splint and proper shower solution are worth it",
                    ],
                },
            ],
        },
    ],
};
