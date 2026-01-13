import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "nutrition-for-healing",
    title: "Nutrition for Tendon Healing",
    description:
        "Protein requirements, collagen supplementation, vitamins, and hydration for optimal recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Your body needs the right building blocks to heal your tendon. Nutrition plays a crucial role in recovery — the right nutrients support collagen production, tissue repair, and muscle building. This lesson covers what to eat (and when) to give your tendon the best chance of healing well. Think of it as fuel for your recovery.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Nutrition basics",
            items: [
                {
                    text:
                        "Eat enough protein — 1-1.2g per kg body weight daily (70kg person = 70-85g protein)",
                },
                {
                    text:
                        "Include vitamin C — essential for collagen production (250-500mg daily)",
                },
                {
                    text:
                        "Stay hydrated — 8-10 glasses of water daily (2-2.5 litres)",
                },
                {
                    text:
                        "Consider collagen supplements — 15-25g hydrolyzed collagen before exercise",
                },
                {
                    text:
                        "Eat anti-inflammatory foods — fatty fish, nuts, berries",
                },
            ],
        },
        {
            type: "section",
            title: "Protein Requirements (1-1.2g per kg)",
            content: [
                {
                    type: "text",
                    content:
                        "Protein is essential for tissue repair and muscle building. Your body needs more protein during recovery than normal to rebuild your tendon and maintain muscle mass.",
                },
                {
                    type: "card",
                    title: "How much protein?",
                    description: "Daily protein requirements for healing.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**1-1.2g protein per kg body weight per day**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "For a 70kg person: 70-85g protein daily",
                                "For an 80kg person: 80-96g protein daily",
                                "Spread throughout the day (15-25g per meal)",
                                "More important during active recovery phases",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Best protein sources",
                    description: "High-quality protein for healing.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Lean meat and poultry** — chicken, turkey, lean beef",
                                "**Fish and seafood** — salmon, tuna, cod, prawns",
                                "**Eggs** — excellent source, easy to prepare",
                                "**Dairy** — milk, yogurt, cheese, Greek yogurt",
                                "**Legumes and beans** — lentils, chickpeas, black beans",
                                "**Tofu and tempeh** — plant-based options",
                                "**Nuts and seeds** — almonds, pumpkin seeds",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple way to track",
                    content:
                        "Aim for protein at every meal. Breakfast: eggs or Greek yogurt. Lunch: chicken or fish. Dinner: lean meat or legumes. Snacks: nuts or protein shake. This makes it easier to hit your daily target without counting every gram.",
                },
            ],
        },
        {
            type: "section",
            title: "Collagen Supplementation",
            content: [
                {
                    type: "text",
                    content:
                        "There's growing evidence that collagen supplementation can support tendon healing. Collagen is the main structural protein in tendons, so supplementing may help your body rebuild.",
                },
                {
                    type: "card",
                    title: "The research",
                    description: "What studies suggest.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Research suggests collagen supplementation may:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Improve tendon repair and reduce pain",
                                "Support collagen synthesis in the healing tendon",
                                "Enhance exercise recovery",
                                "Benefit when taken before exercise (45-60 minutes)",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            title: "Important",
                            content:
                                "Evidence is promising but not definitive. Discuss with your healthcare team before starting supplements.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to use collagen supplements",
                    description: "Dosage and timing.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Dosage:** 15-25g hydrolyzed collagen daily",
                                "**Timing:** Take 45-60 minutes before exercise (if doing physio)",
                                "**With vitamin C:** Combine with 50-100mg vitamin C (enhances absorption)",
                                "**Products:** Collagen peptides/powder, bone broth, gelatin",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Note:** Collagen supplements are not a substitute for a balanced diet. They're an addition to support healing.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Vitamin C and Other Key Nutrients",
            content: [
                {
                    type: "text",
                    content:
                        "Several nutrients support collagen synthesis and overall healing. Vitamin C is particularly important — your body can't make collagen without it.",
                },
                {
                    type: "card",
                    title: "Vitamin C",
                    description: "Essential for collagen production.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Your body needs vitamin C to produce collagen. Without enough vitamin C, collagen synthesis slows down.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Daily amount:** 250-500mg (from food and/or supplements)",
                                "**Food sources:** Citrus fruits, berries, peppers, broccoli, kiwi, tomatoes",
                                "**Best absorbed:** From whole foods, but supplements are fine too",
                                "**Timing:** Spread throughout the day (body doesn't store it)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Other helpful nutrients",
                    description: "Supporting healing.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Zinc:** Supports tissue repair. Sources: meat, shellfish, nuts, seeds",
                                "**Copper:** Needed for collagen formation. Sources: shellfish, nuts, seeds, organ meats",
                                "**Vitamin D:** Important for bone and muscle health. Sources: sunlight, fatty fish, fortified foods",
                                "**Omega-3 fatty acids:** Anti-inflammatory. Sources: fatty fish (salmon, mackerel), walnuts, flaxseed",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Hydration",
            content: [
                {
                    type: "text",
                    content:
                        "Proper hydration supports all aspects of healing — nutrient transport, waste removal, and tissue repair. Dehydration slows recovery.",
                },
                {
                    type: "card",
                    title: "Hydration guidelines",
                    description: "How much to drink.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Daily amount:** 8-10 glasses of water (2-2.5 litres)",
                                "**More if:** Exercising, in hot weather, or sweating",
                                "**Monitor:** Urine colour (pale yellow = well hydrated)",
                                "**Limit:** Caffeine and alcohol (can be dehydrating)",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple hydration tip",
                    content:
                        "Keep a water bottle nearby. Drink a glass with each meal, and sip throughout the day. If you're doing physio exercises, drink extra water before and after.",
                },
            ],
        },
        {
            type: "section",
            title: "Anti-Inflammatory Foods",
            content: [
                {
                    type: "text",
                    content:
                        "Inflammation is part of healing, but excessive inflammation can slow recovery. Some foods help manage inflammation naturally.",
                },
                {
                    type: "card",
                    title: "Anti-inflammatory foods",
                    description: "Foods that support healing.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Fatty fish** — salmon, mackerel, sardines (omega-3)",
                                "**Berries** — blueberries, strawberries, raspberries",
                                "**Leafy greens** — spinach, kale, broccoli",
                                "**Nuts and seeds** — walnuts, almonds, flaxseed",
                                "**Olive oil** — use for cooking and dressings",
                                "**Turmeric** — contains curcumin (anti-inflammatory)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Foods to limit",
                    description: "What to reduce during recovery.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Processed foods** — high in salt and preservatives",
                                "**Sugary foods** — can increase inflammation",
                                "**Excessive alcohol** — dehydrating and can slow healing",
                                "**Trans fats** — found in fried foods and processed snacks",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Note:** You don't need to eliminate these completely, but reducing them supports better healing.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Meal Planning Tips",
            content: [
                {
                    type: "text",
                    content:
                        "Planning meals around your recovery needs doesn't have to be complicated. Here are practical tips:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Batch cook** — prepare protein sources in advance (grilled chicken, hard-boiled eggs)",
                        "**Keep healthy snacks** — nuts, Greek yogurt, protein bars",
                        "**Plan protein at every meal** — makes it easier to hit daily targets",
                        "**Include vegetables** — they provide vitamins and fiber",
                        "**Stay hydrated** — water with meals, between meals",
                        "**Don't skip meals** — your body needs consistent fuel for healing",
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
                                "**Appetite changes** — some people eat more, others less during recovery",
                                "**Weight changes** — muscle loss is common, weight may fluctuate",
                                "**Cravings** — normal, especially for comfort foods",
                                "**Difficulty meal planning** — recovery is stressful, cooking can feel hard",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "When to seek help",
                    content:
                        "If you're struggling to eat enough, losing significant weight unintentionally, or have concerns about nutrition, discuss with your healthcare team. They may refer you to a dietitian.",
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
                        '**Protein:** "How much protein should I be eating? Do I need supplements?"',
                        '**Supplements:** "Should I take collagen supplements? What about multivitamins?"',
                        '**Weight:** "I\'m losing muscle mass — is this normal? What can I do?"',
                        '**Appetite:** "My appetite has changed — is this concerning?"',
                        '**Dietitian:** "Would seeing a dietitian be helpful for my recovery?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Do I need to take supplements?",
                    answer:
                        "Not necessarily. A balanced diet with adequate protein, fruits, and vegetables usually provides what you need. Supplements like collagen or vitamin C can be helpful additions, but discuss with your healthcare team first. Don't rely on supplements to replace a poor diet.",
                },
                {
                    question: "Can I still eat my normal foods?",
                    answer:
                        "Yes, absolutely. You don't need to completely change your diet. Focus on adding protein and nutrient-rich foods rather than eliminating everything you enjoy. Moderation is key — occasional treats are fine.",
                },
                {
                    question: "How do I know if I'm eating enough protein?",
                    answer:
                        "Track your protein intake for a few days. Use an app or simply read labels and estimate. Aim for 1-1.2g per kg body weight. If you're consistently below this, add protein-rich foods to your meals and snacks.",
                },
                {
                    question: "Will nutrition really make a difference?",
                    answer:
                        "Yes. Your body needs the right building blocks to heal. Good nutrition supports collagen production, tissue repair, and muscle maintenance. Poor nutrition can slow recovery. Think of it as giving your body the tools it needs to rebuild.",
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
                        "**Protein matters** — 1-1.2g per kg body weight daily",
                        "**Vitamin C is essential** — your body can't make collagen without it",
                        "**Stay hydrated** — 8-10 glasses of water daily",
                        "**Eat anti-inflammatory foods** — fatty fish, berries, leafy greens",
                        "**Don't overthink it** — focus on adding good foods rather than eliminating everything",
                    ],
                },
            ],
        },
    ],
};
