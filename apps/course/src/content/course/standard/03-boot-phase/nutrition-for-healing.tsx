import type { SectionContent } from "@/components/course/types";
import NutritionSummaryChecklist from "@/assets/nutrition-summary-checklist.png";

export const metadata = {
    slug: "nutrition-for-healing",
    title: "Nutrition for Tendon Healing",
    description:
        "Evidence-based nutrition guidance for Achilles rupture recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "The evidence for specific nutrition requirements after Achilles rupture is limited. Most research comes from general wound healing or tendon loading studies, not rupture recovery specifically. There's no strong evidence that increasing protein intake improves healing outcomes. The best approach is to eat a balanced, varied diet — you don't need to completely change your eating habits.",
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
                        "Eat a balanced diet — include fruits, vegetables, whole grains, and protein sources",
                },
                {
                    text:
                        "Include vitamin C — essential for collagen (from fruits and vegetables)",
                },
                {
                    text: "Stay hydrated — drink water throughout the day",
                },
                {
                    text:
                        "Don't overthink it — focus on variety rather than specific targets",
                },
            ],
        },
        {
            type: "image",
            src: NutritionSummaryChecklist,
            alt: "Nutrition checklist illustration showing a doctor and patient with a checklist highlighting Vitamin C, Collagen, Amino Acids, and Vitamin D for Achilles recovery",
            caption: "Key nutrients for tendon healing",
        },
        {
            type: "section",
            title: "What the evidence says about protein",
            content: [
                {
                    type: "alert",
                    variant: "info",
                    title: "No strong evidence for increased protein",
                    content:
                        "There's no high-quality research showing that increasing protein intake improves healing outcomes after Achilles rupture. Studies on protein and tendon healing mostly come from general wound healing or tendon loading research, not rupture recovery specifically. In the early weeks after rupture, collagen synthesis doesn't spike dramatically, so protein needs may not be elevated.",
                },
                {
                    type: "text",
                    content:
                        "A balanced diet that includes protein sources (meat, fish, eggs, dairy, legumes, or plant-based options) as part of your normal eating pattern is sufficient. There's no need to track protein grams or force yourself to eat more protein than usual.",
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
                                "**Vitamin D and Calcium:** Support bone-tendon integration and neuromuscular function — oily fish, fortified dairy, sunlight (for vitamin D)",
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
                        "There's growing evidence that collagen peptides may support tendon structure and recovery, especially when combined with loading exercises. A balanced diet with adequate protein usually provides what you need, but supplementation can be considered during recovery.",
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
                        "There's no strong evidence that supplements improve healing outcomes after Achilles rupture. A balanced diet usually provides what you need. If you're considering supplements like collagen or vitamin C, discuss with your healthcare team first.",
                },
                {
                    question: "Can I still eat my normal foods?",
                    answer:
                        "Yes, absolutely. There's no evidence that you need to change your diet significantly. Eat a balanced, varied diet as you normally would. If you're eating a reasonable mix of foods, you're likely getting what you need.",
                },
                {
                    question: "Do I need to track protein or other nutrients?",
                    answer:
                        "No. There's no evidence that tracking protein intake improves healing outcomes. If you're eating a balanced diet with variety, you don't need to count grams or track specific nutrients. If you have concerns about your diet or a very restricted eating pattern, discuss with your healthcare team.",
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
                        "**Eat a balanced diet** — variety is more important than specific targets",
                        "**Vitamin C is essential** — your body can't make collagen without it",
                        "**Stay hydrated** — drink water throughout the day",
                        "**Don't overthink it** — there's no strong evidence for specific nutrition requirements",
                    ],
                },
            ],
        },
    ],
};
