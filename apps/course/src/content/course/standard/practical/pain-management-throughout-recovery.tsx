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
        "Pain changes throughout your recovery journey. The intense pain of rupture gives way to different types of discomfort as you progress. Understanding what's normal, when to be concerned, and how to manage pain at each stage helps you navigate recovery more confidently. This lesson covers pain management from emergency care through to long-term recovery.",
    blocks: [
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
                        "Understand what's normal — pain changes throughout recovery",
                },
                {
                    text:
                        "Use pain medication appropriately — as prescribed, not excessively",
                },
                {
                    text:
                        "Ice and elevation — help reduce pain and swelling",
                },
                {
                    text:
                        "Know when to be concerned — severe pain, new pain, or concerning symptoms",
                },
                {
                    text:
                        "Communicate with your team — tell them about your pain",
                },
            ],
        },
        {
            type: "section",
            title: "Pain at Different Stages",
            content: [
                {
                    type: "text",
                    content:
                        "Pain evolves throughout recovery. Understanding what to expect at each stage helps you know what's normal and when to seek help.",
                },
                {
                    type: "card",
                    title: "Week 0-1: Initial pain",
                    description: "The acute phase.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What to expect:** Intense pain at moment of rupture, then typically decreases significantly within 24-48 hours.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Initial:** Sharp, intense pain at rupture",
                                "**First 24-48 hours:** Pain decreases, becomes more manageable",
                                "**Type:** Sharp, throbbing, worse with movement",
                                "**Management:** Pain medication, ice, elevation, rest",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Weeks 2-8: Boot phase pain",
                    description: "Discomfort during immobilization.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What to expect:** Discomfort rather than severe pain. Pressure from boot, stiffness, occasional sharp pains.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Type:** Pressure, stiffness, occasional sharp pains",
                                "**Triggers:** Boot straps, pressure points, movement",
                                "**Management:** Adjust straps, padding, pain medication if needed",
                                "**Normal:** Some discomfort is expected",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Weeks 9-12: Transition pain",
                    description: "Pain during boot removal and early physio.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Type:** Stiffness, muscle soreness, tendon discomfort",
                                "**Triggers:** New movements, exercises, walking",
                                "**Management:** Gradual progression, ice after activity",
                                "**Normal:** Some discomfort with new activities",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Weeks 13+: Rehab pain",
                    description: "Pain during strengthening.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Type:** Muscle soreness, tendon stiffness, exercise-related",
                                "**Triggers:** Exercises, increased activity",
                                "**Management:** Ice, rest, gradual progression",
                                "**Normal:** Some discomfort with exercise is expected",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Pain Management Strategies",
            content: [
                {
                    type: "text",
                    content:
                        "There are multiple ways to manage pain throughout recovery. Different strategies work at different stages.",
                },
                {
                    type: "card",
                    title: "Pain medication",
                    description: "When and how to use.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Paracetamol (acetaminophen):** Safe, effective for most people. Follow dosage instructions.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ibuprofen or naproxen:** Anti-inflammatories, help with pain and swelling",
                                "**Prescription painkillers:** Use as prescribed, don't exceed dosage",
                                "**Timing:** Take before pain gets severe",
                                "**Important:** Check with doctor if you have kidney/stomach issues or are on blood thinners",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Ice and cold therapy",
                    description: "Reducing pain and swelling.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**When:** After activity, when swollen, before bed",
                                "**Duration:** 15-20 minutes, every 2-3 hours",
                                "**Method:** Ice pack wrapped in cloth (never directly on skin)",
                                "**Benefits:** Reduces pain, swelling, inflammation",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Elevation",
                    description: "Reducing swelling and pain.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Position:** Ankle above heart level",
                                "**When:** As much as possible, especially after activity",
                                "**Benefits:** Reduces swelling, which reduces pain",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Activity modification",
                    description: "Adjusting what you do.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Reduce activity** — if pain increases, do less",
                                "**Rest periods** — take breaks between activities",
                                "**Gradual progression** — increase activity slowly",
                                "**Listen to your body** — pain is a signal",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "When Pain is Normal vs Concerning",
            content: [
                {
                    type: "text",
                    content:
                        "Understanding when pain is expected versus when it signals a problem helps you know when to seek help.",
                },
                {
                    type: "card",
                    title: "Normal pain patterns",
                    description: "What to expect.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Mild to moderate discomfort** — especially with new activities",
                                "**Pain that improves** — with rest, ice, elevation",
                                "**Stiffness** — especially in the morning or after rest",
                                "**Muscle soreness** — after exercise (delayed onset)",
                                "**Pain that's manageable** — doesn't prevent sleep or function",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Concerning pain patterns",
                    description: "When to seek help.",
                    variant: "danger",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Severe pain** — that doesn't improve with rest or medication",
                                "**New sharp pain** — especially if you hear a \"pop\"",
                                "**Pain that's getting worse** — despite rest and treatment",
                                "**Pain preventing sleep** — severe enough to disrupt rest",
                                "**Pain with concerning symptoms** — redness, warmth, fever",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Pain During Physiotherapy",
            content: [
                {
                    type: "text",
                    content:
                        "Some discomfort during physiotherapy is normal, but severe pain is not. Understanding the difference helps you progress safely.",
                },
                {
                    type: "card",
                    title: "Normal discomfort",
                    description: "What to expect.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Mild to moderate discomfort** — during exercises",
                                "**Muscle soreness** — after exercises (next day)",
                                "**Stiffness** — especially in the morning",
                                "**Discomfort that improves** — with rest and ice",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "When to stop or modify",
                    description: "Signs to reduce activity.",
                    variant: "warning",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Severe pain** — during or after exercises",
                                "**Pain that doesn't improve** — with rest",
                                "**Sharp, stabbing pain** — different from usual discomfort",
                                "**Pain that's getting worse** — despite rest",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Tell your physiotherapist** — they can modify exercises or adjust your program.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Chronic Pain Management",
            content: [
                {
                    type: "text",
                    content:
                        "Some people experience ongoing pain beyond the expected recovery period. This requires different management strategies.",
                },
                {
                    type: "card",
                    title: "If pain persists",
                    description: "Long-term pain management.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Discuss with your team** — physio, surgeon, GP",
                                "**Consider pain clinic** — specialized pain management",
                                "**Address underlying causes** — may need further investigation",
                                "**Multimodal approach** — medication, physio, psychological support",
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
                                "**Mild to moderate discomfort** — especially with new activities",
                                "**Pain that improves** — with rest, ice, elevation",
                                "**Stiffness** — especially in morning or after rest",
                                "**Muscle soreness** — after exercise",
                                "**Pain that's manageable** — doesn't prevent function",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help",
                    content:
                        "**Severe pain** that doesn't improve, **new \"pop\" or snap**, **pain with signs of infection** (redness, warmth, fever), **unable to bear weight**, or **pain with concerning symptoms** (numbness, color changes).",
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your healthcare team",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Pain levels:** "Is my pain level normal for this stage?"',
                        '**Medication:** "What pain medication should I take? How much?"',
                        '**Concerning pain:** "When should I be concerned about pain?"',
                        '**Pain management:** "What can I do to manage my pain?"',
                        '**Persistent pain:** "My pain isn\'t improving — what should I do?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How much pain is normal?",
                    answer:
                        "Mild to moderate discomfort is normal, especially with new activities. Pain should improve with rest, ice, and elevation. Severe pain that doesn't improve, new sharp pain, or pain that's getting worse should be discussed with your healthcare team.",
                },
                {
                    question: "Should I take pain medication?",
                    answer:
                        "Yes, if you're in pain. Pain medication helps you rest, move, and participate in recovery. Use as prescribed, don't exceed dosage, and check with your doctor if you have concerns or other medical conditions.",
                },
                {
                    question: "Is it normal to have pain during physiotherapy?",
                    answer:
                        "Some discomfort is normal, especially with new exercises. However, severe pain is not normal. If exercises cause severe pain, tell your physiotherapist — they can modify exercises or adjust your program.",
                },
                {
                    question: "What if my pain isn't improving?",
                    answer:
                        "If pain isn't improving despite rest and treatment, or if it's getting worse, discuss with your healthcare team. They can assess what's happening and adjust your management plan.",
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
                        "**Pain changes** — different types at different stages",
                        "**Some discomfort is normal** — especially with new activities",
                        "**Use pain medication** — as prescribed, helps you function",
                        "**Ice and elevation** — help reduce pain and swelling",
                        "**Severe pain needs attention** — don't ignore concerning pain",
                    ],
                },
            ],
        },
    ],
};
