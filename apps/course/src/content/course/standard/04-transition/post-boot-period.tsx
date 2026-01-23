import type { SectionContent } from "@/components/course/types";
import HeelLifts from "@/assets/heel-lifts.jpg";
import GradualWeaningComparison from "@/assets/gradual-weaning-process-comparison-v1.png";

export const metadata = {
    slug: "post-boot-period",
    title: "Post-Boot Period: Transition and Challenges",
    description:
        "Leaving your boot, choosing footwear, managing stiffness and swelling, and avoiding aggressive stretching",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 10-14, you're transitioning out of your boot. This is exciting — but also nerve-wracking. Your foot has been protected for weeks, and suddenly it won't be. This lesson covers the transition, footwear, and managing post-boot challenges.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Post-boot essentials",
            items: [
                {
                    text:
                        "Wait for clearance — don't remove your boot without your clinician's approval",
                },
                {
                    text:
                        "Choose supportive shoes — with heel-to-toe drop, room for heel lifts",
                },
                {
                    text:
                        "Use heel lifts initially — 0.5-1cm, gradually reduce over 2-4 weeks",
                },
                {
                    text:
                        "Manage stiffness gently — gentle movements and heat, NOT aggressive stretching",
                },
                {
                    text:
                        "Control swelling — elevate when resting, ice if needed",
                },
            ],
        },
        {
            type: "section",
            title: "When Is It Safe to Leave Your Boot?",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal typically happens around **Week 10-12**, but timing depends on your tendon's strength, not just the calendar.",
                },
                {
                    type: "table",
                    headers: ["Criteria", "What It Means"],
                    rows: [
                        [
                            "**Tendon strength**",
                            "Ability to do seated calf raises with ~0.8-1x body weight",
                        ],
                        [
                            "**Neutral position**",
                            "You're at 0 wedges and comfortable",
                        ],
                        [
                            "**Swelling controlled**",
                            "Swelling is manageable",
                        ],
                        [
                            "**No complications**",
                            "No signs of infection or pressure issues",
                        ],
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Don't remove your boot without clearance",
                    content:
                        "Removing the boot too early can cause tendon elongation or re-rupture. Your clinician assesses your tendon strength — follow their guidance.",
                },
            ],
        },
        {
            type: "section",
            title: "The Gradual Weaning Process",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal is usually **gradual**, not sudden. You wean off over 1-2 weeks:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Day 1-2**: Shoes indoors for 1-2 hours, boot the rest",
                        "**Day 3-4**: Increase to 3-4 hours in shoes",
                        "**Day 5-6**: Majority of day in shoes, boot for longer walks",
                        "**Day 7+**: Full transition to shoes during the day",
                    ],
                },
                {
                    type: "image",
                    src: GradualWeaningComparison,
                    alt:
                        "Comparison diagram showing different approaches to gradually weaning out of the boot into shoes over 1-2 weeks",
                    caption:
                        "Gradual weaning from boot to shoes: compare typical schedules and choose the approach your clinician recommends.",
                },
                {
                    type: "tip",
                    title: "Night splint option",
                    content:
                        "Some patients like to continue using their [night splint](/standard/sleeping-with-boot) for a few weeks after boot removal — it provides reassurance and extra protection at night. This is optional but can help with the psychological transition.",
                },
            ],
        },
        {
            type: "section",
            title: "Choosing the Right Footwear",
            content: [
                {
                    type: "dos-donts",
                    dos: [
                        "Running shoes (Asics, Brooks, New Balance) — support and cushioning",
                        "10mm+ heel-to-toe drop — reduces Achilles stretch",
                        "Firm heel counter — provides stability",
                        "Laces — adjustable fit as swelling changes",
                    ],
                    donts: [
                        "Flat shoes (ballet flats, Converse, minimalist) — too much Achilles stretch",
                        "Flip flops or sandals — no support",
                        "Barefoot — never initially",
                    ],
                },
                {
                    type: "card",
                    title: "Using heel lifts",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Always use heel lifts initially** — typically 0.5-1cm. This eases the transition and reduces stretch on your healing tendon.",
                        },
                        {
                            type: "product-image",
                            src: HeelLifts,
                            alt: "Heel wedge insoles showing adjustable layered design",
                            caption:
                                "Heel wedge insoles (~£10) — adjustable height for comfortable transition",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with 1cm → reduce to 0.5cm → remove over 2-4 weeks",
                                "Your physio will guide when to reduce",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Your First Steps",
            content: [
                {
                    type: "text",
                    content:
                        "Those first steps are momentous — and often wobbly. **This is normal.**",
                },
                {
                    type: "table",
                    headers: ["What to Expect", "What to Do"],
                    rows: [
                        [
                            "Stiffness, weakness, uncertainty",
                            "Start indoors, have support nearby",
                        ],
                        ["Limping initially", "Take short steps, go slowly"],
                        ["Calf fatigue", "Stop when tired, rest frequently"],
                        [
                            "Mild discomfort (not sharp pain)",
                            "Use heel-to-toe pattern",
                        ],
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Stiffness — The Right Way",
            content: [
                {
                    type: "text",
                    content:
                        "Stiffness is normal after weeks of immobilization. But **how you manage it matters**.",
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Avoid aggressive stretching",
                    content:
                        "Aggressive stretching can cause **tendon elongation** — when your tendon stretches too much and doesn't heal at the right length. This affects your long-term function. Gentle movement is safe; forced stretching is not.",
                },
                {
                    type: "dos-donts",
                    dos: [
                        "Ankle pumps and circles — gentle movement",
                        "Warm bath or heat pack — relaxes muscles",
                        "Walking — movement helps reduce stiffness",
                        "Physio-guided stretches — 30 seconds max, no pain",
                    ],
                    donts: [
                        "Forcing your foot up aggressively",
                        "Holding stretches 60+ seconds",
                        "Stretching through pain",
                        "Adding stretches without physio guidance",
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Swelling",
            content: [
                {
                    type: "text",
                    content:
                        "Swelling often increases after boot removal — your foot is working harder. This is normal but needs management:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Elevate** — foot above heart level when resting",
                        "**Ice** — 15-20 minutes after activity if swelling increases",
                        "**Movement** — ankle pumps help circulation",
                        "**Heat for stiffness, ice for swelling** — different tools for different problems",
                    ],
                },
                {
                    type: "tip",
                    title: "Morning stiffness",
                    content:
                        "Stiffness is worst in the morning. Do 10 ankle pumps and 10 circles before getting out of bed — this 2-minute routine helps.",
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
                                "Feeling nervous about walking without the boot",
                                "Stiffness, especially in the morning",
                                "Some swelling after activity",
                                "Limping initially (should improve)",
                                "Mild discomfort (not sharp pain)",
                                "Good days and bad days",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help",
                    content:
                        "**Sharp pain** when walking • **New pop or snap** • **Ankle giving way** • **Severe swelling** that doesn't improve • **Unable to bear weight** • **Numb/blue toes** • Signs of [blood clots](/standard/blood-clot-prevention) (calf pain with swelling, chest pain, breathlessness)",
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I remove my boot earlier if I feel ready?",
                    answer:
                        "No. Boot removal should be based on your tendon's strength, assessed by your clinician. Removing too early can cause elongation or re-rupture.",
                },
                {
                    question: "How long will I need heel lifts?",
                    answer:
                        "Typically 2-4 weeks, gradually reducing. Your physio will guide when to reduce and remove them.",
                },
                {
                    question: "How long will stiffness last?",
                    answer:
                        "Stiffness improves significantly over 4-6 weeks after boot removal. Some mild stiffness can persist for months but improves gradually.",
                },
                {
                    question: "Can I keep using my night splint?",
                    answer:
                        "Yes — some patients like to continue using their [night splint](/standard/sleeping-with-boot) for a few weeks after boot removal. It's optional but can provide reassurance.",
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
                        "**Wait for clearance** — don't remove your boot without approval",
                        "**Gradual transition** — wean off over 1-2 weeks",
                        "**Use heel lifts** — 0.5-1cm initially, reduce gradually",
                        "**Avoid aggressive stretching** — it can cause elongation",
                        "**Gentle movement helps** — stiffness improves with activity, not forced stretching",
                    ],
                },
            ],
        },
    ],
};
