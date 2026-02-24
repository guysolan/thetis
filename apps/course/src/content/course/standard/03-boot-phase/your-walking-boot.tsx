import type { FAQItem, SectionContent } from "@/components/course/types";
import AircastBootWithWedges from "@/assets/aircast-boot-with-wedges.png";
import VacopedBootStandalone from "@/assets/vacoped-boot-standalone.jpeg";
import BootForceComparison from "@/assets/boot-force-comparison.png";

export const metadata = {
    slug: "your-walking-boot",
    title: "Your Walking Boot - The Foundation",
    description:
        "Aircast vs VACOped, understanding how boots work, and boot basics",
    status: "drafting" as const,
};

export const faqs: FAQItem[] = [
    {
        question: "Do I need to know which boot I have?",
        answer:
            "Yes, understanding your boot type helps you follow your protocol correctly. If you're not sure, check with your clinician or look for removable wedges (Aircast) or a hinge dial (VACOped).",
    },
    {
        question: "Can I switch boot types?",
        answer:
            "Yes — you can switch between boot types (e.g. from Aircast to VACOped or vice versa) if needed. Discuss with your clinician first so they can align your protocol with the new boot. The angle and timing principles are the same; the mechanism differs.",
    },
    {
        question: "What if I have a different boot brand?",
        answer:
            "Most walking boots work on similar principles. The key is understanding how YOUR specific boot controls the angle and following YOUR specific protocol. Ask your clinician to explain how your boot works.",
    },
    {
        question: "Do wedges from one brand fit a different boot?",
        answer:
            "Generally no — Aircast wedges are designed for Aircast boots and won't fit other brands. If you have a different wedge-based boot, use the wedges supplied with that boot or ask your clinician for compatible wedges. Don't try to use wedges from one brand in another.",
    },
];

export const content: SectionContent = {
    intro:
        "By now, you should be in your walking boot — your constant companion for the next 8–12 weeks. Understanding how your boot works and the differences between boot types helps you follow your protocol correctly. This lesson covers boot basics, Aircast vs VACOped, and how the angle system works. Fitting, care, and protocol details are covered in the following lessons.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Boot basics",
            items: [
                {
                    text:
                        "Understand your boot type — Aircast (wedges) or VACOped (hinge)",
                },
                {
                    text:
                        "Know your starting position — maximum angle with all wedges in or hinge locked",
                },
                {
                    text:
                        "Learn how the angle system works — both boots achieve the same goal differently",
                },
                {
                    text:
                        "Check boot fit — detailed fitting guidance in the next lesson",
                },
                {
                    text:
                        "Follow your protocol — progression details covered soon",
                },
            ],
        },
        {
            type: "section",
            title: "How boots work — the angle system",
            content: [
                {
                    type: "text",
                    content:
                        "Your walking boot holds your foot pointed down ([plantarflexed](/standard/emergency-care)) to keep the torn tendon ends close together. As the tendon heals, you gradually reduce this angle until your foot reaches a neutral position. Think of it like gradually lowering a platform.",
                },
                {
                    type: "card",
                    title: "The goal: keeping your foot in a tip-toe position",
                    description:
                        "Both boots hold your foot pointed down — like standing on tip-toes — to keep the torn tendon ends close together.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Think of it like this: when you point your toes down (like a ballet dancer), your calf muscle shortens and the Achilles tendon relaxes. This brings the torn ends closer together, allowing them to heal. Both the Aircast and VACOped achieve this — they just use **completely different mechanisms**.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Understanding boot types — Aircast vs VACOped",
            content: [
                {
                    type: "text",
                    content:
                        "There are two main types of walking boots used for Achilles rupture: Aircast (with removable wedges) and VACOped (with an adjustable hinge). Both achieve the same goal — holding your foot in a tip-toe position — but use completely different mechanisms.",
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title:
                                "Aircast boot — wedge insoles under the heel",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The Aircast uses **removable foam wedges** that sit inside the boot, under your heel. These wedges physically prop up your heel, forcing your foot into a tip-toe position.",
                                },
                                {
                                    type: "image",
                                    src: AircastBootWithWedges,
                                    alt: "Aircast walking boot with white wedge inserts stacked next to it, showing how wedges are placed inside the boot",
                                    caption:
                                        "Aircast boot with removable wedge inserts — these stack under your heel to control the angle",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**How it works:** Foam wedges (usually 3–4) stack under your heel inside the boot",
                                        "**Until week 5:** Keep all 3–4 wedges in — maximum tip-toe angle (30–45°)",
                                        "**From week 5:** Remove one wedge at a time, at intervals set by your medical team",
                                        "**Each wedge:** Reduces the angle by about 6–8 degrees",
                                        "**End position:** No wedges = foot at neutral (0°)",
                                        "**The boot itself is rigid** — your foot doesn't move within it",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "Key point",
                                    content:
                                        "With an Aircast, your angle changes by **physically removing insoles** — one wedge at a time, never multiple. The boot has no moving parts — it's like a rigid shell. Wedges stay in until week 5; your protocol tells you when to remove each one.",
                                },
                            ],
                        },
                        {
                            title: "VACOped boot — adjustable hinge mechanism",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The VACOped uses a **mechanical hinge** at the ankle that can be locked at different angles or allowed to move within a controlled range. The sole itself is a wedge shape that angles your foot. There are no removable wedges or insoles.",
                                },
                                {
                                    type: "image",
                                    src: VacopedBootStandalone,
                                    alt: "VACOped walking boot showing the wedge-shaped rocker sole, dark grey skeletal frame, and teal accents on hinge mechanisms",
                                    caption:
                                        "VACOped boot with wedge-shaped rocker sole — the sole itself angles your foot, and the hinge controls range of motion",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**How it works:** A dial-controlled hinge at the ankle sets the angle",
                                        "**The sole is a wedge** — thick at the heel, thin at the toe, creating the tip-toe angle",
                                        "**Starting position:** Hinge locked at maximum angle (30° foot pointed down)",
                                        "**Progression:** Unlock the hinge gradually to allow more range of motion",
                                        "**Controlled movement:** Can be set to allow movement within a safe range (e.g., 30° to 15°)",
                                        "**End position:** Hinge unlocked for full range or locked at neutral",
                                        "**The boot has moving parts** — your foot can move within the allowed range",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "Key point",
                                    content:
                                        "With a VACOped, your angle changes by **adjusting the hinge dial**. The boot allows controlled movement within whatever range you set. Some protocols use this to allow early gentle movement within a safe zone.",
                                },
                                {
                                    type: "tip",
                                    title: "Tips for hinges",
                                    content:
                                        "Keep the hinge locked at maximum angle until week 5. When your clinician says to start reducing, adjust the dial gradually — don't unlock too far too fast. Check the hinge setting each time you put the boot on. If you feel instability or over-stretch, lock it back to a more restricted range and contact your clinic.",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "heading",
                    level: 3,
                    text: "Which is better?",
                },
                {
                    type: "text",
                    content:
                        "Both boots are clinically effective — research shows similar outcomes. **The key is following your protocol correctly, not which boot you have.**",
                },
                {
                    type: "image",
                    src: BootForceComparison,
                    alt: "Comparison diagram showing force control in VACOped vs Aircast boots, demonstrating why VACOped provides better force control but both boots work if used correctly",
                    caption:
                        "Boot force comparison: VACOped provides better force control, but all boots work if used correctly",
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Learn more",
                    content:
                        "For a detailed comparison of costs and features, see [Choosing Your Boot](/standard/choosing-your-boot) which covers mechanisms, costs, and which might be right for you.",
                },
            ],
        },
        {
            type: "section",
            title: "Essential Topics",
            content: [
                {
                    type: "text",
                    content:
                        "Understanding your boot is just the beginning. For practical guidance on fitting, care, and protocol, see these focused lessons:",
                },
                {
                    type: "card",
                    title: "Boot Adjustment and Care",
                    description:
                        "Fitting, straps, padding, maintenance, and preventing problems",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Learn how to fit your boot correctly, adjust straps, prevent pressure points, and maintain your boot properly.",
                        },
                        {
                            type: "text",
                            content:
                                "→ Detailed fitting guidance in the next lesson",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Boot Progression Protocol",
                    description:
                        "Wedge removal schedule, mobilisation progression, and angle changes",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Understand your protocol schedule, when to reduce the angle, how to progress mobilisation status, and what to expect at each stage.",
                        },
                        {
                            type: "text",
                            content:
                                "→ Protocol details covered in an upcoming lesson",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What Happens Next: Building Strength",
            content: [
                {
                    type: "text",
                    content:
                        "Once you're comfortable in your boot, you'll start building strength. **At Week 6**, you can begin Stage 1 exercises — seated calf raises with your boot removed. These exercises are essential for preparing your tendon for boot removal and the next stages of recovery.",
                },
                {
                    type: "card",
                    title: "Coming up",
                    description: "What's next in your recovery.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Week 6:** Start Stage 1 exercises — detailed guidance on exercises, mobilisation, and gait coming up",
                                "**Weeks 6-8:** Continue building strength, progress mobilisation status",
                                "**Week 8:** Learn about Stage 2 and Stage 3 goals — preparing for post-boot recovery",
                                "**Weeks 10-12:** Boot removal and transition to Stage 2",
                            ],
                        },
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
                        "**Both boot types work** — Aircast and VACOped achieve the same goal differently",
                        "**Understand your boot** — know how it controls the angle",
                        "**Follow your protocol** — don't rush ahead, follow your schedule exactly",
                        "**Get help with fitting** — proper fit is essential for comfort and protection",
                    ],
                },
            ],
        },
    ],
};
