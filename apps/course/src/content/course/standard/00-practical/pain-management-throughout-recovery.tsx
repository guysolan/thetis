import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "pain-management-throughout-recovery",
    title: "Pain Management Throughout Recovery",
    description:
        "Understanding pain at different stages, when pain is normal vs concerning, and pain management strategies",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Pain varies hugely between people. Some have intense pain at rupture that fades quickly; others have very little pain throughout. Both are normal. This lesson covers what to expect, when to be concerned, and how to manage pain at each stage.",
    blocks: [
        {
            type: "alert",
            variant: "info",
            title: "Pain varies widely",
            content:
                "Some people have minimal pain after rupture — this is normal and doesn't mean your injury is less serious. Others have significant pain. Both experiences are valid.",
        },
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Pain management basics",
            items: [
                {
                    text:
                        "Understand what's normal — pain changes throughout recovery (or may be minimal)",
                },
                {
                    text:
                        "Use pain medication appropriately — as prescribed, not excessively",
                },
                {
                    text: "Ice and elevation — help reduce pain and swelling",
                },
                {
                    text:
                        "Know when to be concerned — severe pain, new pain, or concerning symptoms",
                },
            ],
        },
        {
            type: "section",
            title: "Pain at Different Stages",
            content: [
                {
                    type: "table",
                    headers: ["Stage", "What to Expect", "Management"],
                    rows: [
                        [
                            "**Week 0-1**",
                            "Intense pain at rupture, then typically decreases within 24-48 hours. Some people have minimal pain.",
                            "Pain medication, ice, elevation, rest",
                        ],
                        [
                            "**Weeks 2-8**",
                            "Discomfort rather than severe pain. Pressure from boot, stiffness.",
                            "Adjust straps, padding, medication if needed",
                        ],
                        [
                            "**Weeks 9-12**",
                            "Stiffness, muscle soreness, tendon discomfort with new movements.",
                            "Gradual progression, ice after activity",
                        ],
                        [
                            "**Weeks 13+**",
                            "Muscle soreness, exercise-related discomfort.",
                            "Ice, rest, gradual progression",
                        ],
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Different Types of Pain",
            content: [
                {
                    type: "card",
                    title: "Calf pain — know the difference",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Calf pain WITH swelling (URGENT):** Could indicate blood clot (DVT). Seek medical advice immediately.",
                                "**Calf cramping/spasm (usually normal):** Intermittent, no swelling. The muscle 'has nothing to pull on'. Usually resolves as tendon heals.",
                            ],
                        },
                    ],
                },
                {
                    type: "table",
                    headers: ["Location", "Cause", "Solution"],
                    rows: [
                        [
                            "**Heel pain**",
                            "Pressure from walking in boot",
                            "Gel heel cushion from pharmacy",
                        ],
                        [
                            "**Knee pain**",
                            "Awkwardness of high-heeled boot",
                            "Usually improves when out of boot",
                        ],
                        [
                            "**Back/hip pain**",
                            "Asymmetrical walking pattern",
                            "Use shoe leveler on other foot",
                        ],
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Pain Management Strategies",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Paracetamol:** Safe, effective for most. Follow dosage instructions.",
                        "**Ibuprofen/naproxen:** Anti-inflammatories, help with pain and swelling. Check with doctor if on blood thinners.",
                        "**Ice:** 15-20 minutes, wrapped in cloth, after activity or when swollen.",
                        "**Elevation:** Ankle above heart level, especially after activity.",
                        "**Activity modification:** If pain increases, do less. Progress gradually.",
                    ],
                },
            ],
        },
        {
            type: "dos-donts",
            dos: [
                "Take pain medication before pain gets severe",
                "Ice after activity",
                "Elevate when resting",
                "Tell your team about your pain",
            ],
            donts: [
                "Ignore severe or worsening pain",
                "Exceed medication dosage",
                "Push through sharp, stabbing pain",
                "Assume all calf pain is normal (check for swelling)",
            ],
        },
        {
            type: "section",
            title: "When to Seek Help",
            content: [
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help if:",
                    content:
                        "Severe pain that doesn't improve • New 'pop' or snap • Calf pain with swelling • Signs of infection (redness, warmth, fever) • Unable to bear weight • Numbness or color changes",
                },
                {
                    type: "text",
                    content:
                        "**Usually normal:** Mild to moderate discomfort with new activities, stiffness in the morning, muscle soreness after exercise, pain that improves with rest.",
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "I have very little pain — is that normal?",
                    answer:
                        "Yes. Pain varies hugely between people. Some have minimal pain after rupture and throughout recovery. This doesn't mean your injury is less serious — it just means your pain experience is different.",
                },
                {
                    question: "Is calf pain normal?",
                    answer:
                        "Calf cramping or spasms (intermittent, no swelling) are normal. However, calf pain with swelling affecting the whole lower leg could indicate a blood clot and needs immediate medical attention.",
                },
                {
                    question: "Should I take pain medication?",
                    answer:
                        "Yes, if you're in pain. Pain medication helps you rest and participate in recovery. Use as prescribed and don't exceed dosage.",
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
                        "**Pain varies widely** — some have lots, some have very little. Both are normal.",
                        "**Calf pain with swelling** — seek urgent medical help (possible blood clot)",
                        "**Use pain medication** — as prescribed, helps you function",
                        "**Ice and elevation** — help reduce pain and swelling",
                    ],
                },
            ],
        },
    ],
};
