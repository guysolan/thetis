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
        "Your body needs the right building blocks to heal your tendon. Good nutrition supports collagen production, tissue repair, and muscle building. Focus on protein, vitamin C, and hydration — you don't need to completely change your diet, just add the essentials.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Nutrition essentials",
            items: [
                {
                    text:
                        "Eat enough protein — 1-1.2g per kg body weight daily (70kg person = 70-85g)",
                },
                {
                    text:
                        "Include vitamin C — essential for collagen (250-500mg daily from fruits/vegetables)",
                },
                {
                    text:
                        "Stay hydrated — 8-10 glasses of water daily (2-2.5 litres)",
                },
                {
                    text:
                        "Eat protein at every meal — makes it easier to hit daily targets",
                },
            ],
        },
        {
            type: "section",
            title: "Protein: The Foundation of Healing",
            content: [
                {
                    type: "text",
                    content:
                        "Protein is essential for tissue repair and muscle building. Your body needs more during recovery to rebuild your tendon and maintain muscle mass.",
                },
                {
                    type: "card",
                    title: "How much protein?",
                    description: "Daily requirements.",
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
                                "70kg person = 70-85g daily",
                                "80kg person = 80-96g daily",
                                "Spread throughout the day (15-25g per meal)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Best protein sources",
                    description: "High-quality options.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Meat/poultry:** chicken, turkey, lean beef",
                                "**Fish:** salmon, tuna, cod",
                                "**Eggs, dairy:** Greek yogurt, milk, cheese",
                                "**Plant-based:** lentils, chickpeas, tofu, nuts",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple approach",
                    content:
                        "Aim for protein at every meal: eggs or yogurt for breakfast, chicken or fish for lunch, lean meat or legumes for dinner. Add nuts or a protein shake as snacks. This makes it easier to hit your target without counting every gram.",
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
                        "Your body can't make collagen without vitamin C. Several other nutrients also support healing.",
                },
                {
                    type: "card",
                    title: "Vitamin C",
                    description: "Essential for collagen production.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Daily amount:** 250-500mg (from food or supplements)",
                                "**Food sources:** citrus fruits, berries, peppers, broccoli, kiwi",
                                "**Spread throughout the day** — body doesn't store it",
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
                                "**Omega-3 fatty acids:** Anti-inflammatory — fatty fish (salmon, mackerel), walnuts",
                                "**Zinc:** Tissue repair — meat, shellfish, nuts",
                                "**Vitamin D:** Bone and muscle health — sunlight, fatty fish",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Hydration and Anti-Inflammatory Foods",
            content: [
                {
                    type: "card",
                    title: "Hydration",
                    description: "Support all aspects of healing.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Daily amount:** 8-10 glasses of water (2-2.5 litres)",
                                "**More if:** Exercising, hot weather, or sweating",
                                "**Monitor:** Urine colour (pale yellow = well hydrated)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Anti-inflammatory foods",
                    description: "Help manage inflammation naturally.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Fatty fish** — salmon, mackerel, sardines",
                                "**Berries** — blueberries, strawberries, raspberries",
                                "**Leafy greens** — spinach, kale, broccoli",
                                "**Nuts and seeds** — walnuts, almonds, flaxseed",
                                "**Olive oil** — use for cooking and dressings",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Foods to limit",
                    description: "Reduce during recovery.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Processed foods** — high in salt and preservatives",
                                "**Sugary foods** — can increase inflammation",
                                "**Excessive alcohol** — dehydrating and can slow healing",
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
            title: "Collagen Supplements (Optional)",
            content: [
                {
                    type: "text",
                    content:
                        "There's growing evidence that collagen supplementation may support tendon healing, but it's not essential. A balanced diet with adequate protein usually provides what you need.",
                },
                {
                    type: "card",
                    title: "If you choose to supplement",
                    description: "Dosage and timing.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Dosage:** 15-25g hydrolyzed collagen daily",
                                "**Timing:** Take 45-60 minutes before exercise (if doing physio)",
                                "**With vitamin C:** Combine with 50-100mg vitamin C (enhances absorption)",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            title: "Important",
                            content:
                                "Evidence is promising but not definitive. Discuss with your healthcare team before starting supplements. Supplements are not a substitute for a balanced diet.",
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
                                "**Appetite changes** — some people eat more, others less",
                                "**Weight changes** — muscle loss is common during immobility",
                                "**Cravings** — normal, especially for comfort foods",
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
            type: "faq",
            items: [
                {
                    question: "Do I need to take supplements?",
                    answer:
                        "Not necessarily. A balanced diet with adequate protein, fruits, and vegetables usually provides what you need. Supplements like collagen or vitamin C can be helpful additions, but discuss with your healthcare team first.",
                },
                {
                    question: "Can I still eat my normal foods?",
                    answer:
                        "Yes, absolutely. You don't need to completely change your diet. Focus on adding protein and nutrient-rich foods rather than eliminating everything you enjoy. Moderation is key.",
                },
                {
                    question: "How do I know if I'm eating enough protein?",
                    answer:
                        "Track your protein intake for a few days. Use an app or read labels and estimate. Aim for 1-1.2g per kg body weight. If you're consistently below this, add protein-rich foods to meals and snacks.",
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
                        "**Don't overthink it** — focus on adding good foods rather than eliminating everything",
                    ],
                },
            ],
        },
    ],
};
