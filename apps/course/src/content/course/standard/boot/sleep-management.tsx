import type { SectionContent } from "@/components/course/types";
import ThetisNightSplint from "../../../assets/thetis-splint.jpg";

export const metadata = {
    slug: "sleep-management",
    title: "Sleep Management During Recovery",
    description:
        "Sleeping with your boot, night splint transition, and strategies for better sleep",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Sleeping with a walking boot is one of the hardest parts of recovery. Around 80% of patients struggle with sleep during the boot phase. The boot is heavy, hot, restrictive, and feels like sleeping with a brick strapped to your leg. This lesson covers practical solutions: sleeping strategies, transitioning to a night splint, and tips for better rest. Better sleep means better recovery.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Sleep basics",
            items: [
                {
                    text:
                        "Elevate your leg — use pillows to support your booted leg",
                },
                {
                    text:
                        "Consider a night splint — much more comfortable than sleeping in the boot",
                },
                {
                    text:
                        "Keep room cool — boots make you hot, cool environment helps",
                },
                {
                    text:
                        "Use a nightlight — safer for bathroom trips",
                },
                {
                    text:
                        "Accept disrupted sleep — it's temporary, but normal",
                },
            ],
        },
        {
            type: "section",
            title: "Why Sleeping in a Boot is So Hard",
            content: [
                {
                    type: "text",
                    content:
                        "Let's be honest: **sleeping in a walking boot is miserable**. The boot is heavy (1-2kg), rigid, hot, and feels like sleeping with a brick strapped to your leg. Around 80% of patients report significant sleep problems during this phase.",
                },
                {
                    type: "card",
                    title: "Common sleep challenges",
                    description: "What makes sleep difficult.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heavy and restrictive** — the boot weighs 1-2kg and limits movement",
                                "**Hot and sweaty** — your foot gets trapped in a warm, moist environment",
                                "**Uncomfortable positions** — you can't sleep in your normal position",
                                "**Pressure points** — straps and hard surfaces cause discomfort",
                                "**Anxiety** — worry about damaging your tendon if you move",
                                "**Frequent wake-ups** — discomfort disrupts sleep",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why sleep matters",
                    description: "Poor sleep affects recovery.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sleep deprivation increases pain** — you'll feel worse if you're not sleeping",
                                "**Mental health suffers** — exhaustion makes everything harder to cope with",
                                "**Healing slows** — your body repairs during sleep",
                                "**Clot risk may increase** — poor sleep and lack of movement both contribute",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Sleeping Strategies with Your Boot",
            content: [
                {
                    type: "text",
                    content:
                        "Even if you're sleeping in your boot, there are strategies to make it more bearable. These tips help you get better rest while keeping your tendon protected.",
                },
                {
                    type: "card",
                    title: "Positioning and elevation",
                    description: "How to position yourself.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sleep on your back** — with your leg elevated on pillows",
                                "**Support your calf** — pillow under your calf, not just your foot",
                                "**Keep leg elevated** — above heart level reduces swelling",
                                "**Avoid stomach sleeping** — can put pressure on your foot",
                                "**Use body pillow** — helps maintain position and provides support",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Temperature control",
                    description: "Managing heat.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Keep room cool** — boots make you hot, cool environment helps",
                                "**Use light bedding** — avoid heavy duvets that trap heat",
                                "**Fan or air conditioning** — helps regulate temperature",
                                "**Merino wool socks** — regulate temperature better than cotton",
                                "**Remove boot liner** — if possible, let it air out during the day",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Comfort strategies",
                    description: "Making sleep more comfortable.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Adjust straps** — make sure they're not too tight",
                                "**Check for pressure points** — add padding if needed",
                                "**Use a nightlight** — safer for bathroom trips",
                                "**Empty bladder before bed** — fewer night-time trips",
                                "**Relaxation techniques** — breathing exercises, meditation",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Pro tip",
                    content:
                        "Keep a pair of crutches by your bed so you can safely get up during the night. Even if you're walking without crutches during the day, having them nearby at night is safer.",
                },
            ],
        },
        {
            type: "section",
            title: "The Night Splint Solution",
            content: [
                {
                    type: "text",
                    content:
                        "A **night splint** designed specifically for Achilles rupture can be a game-changer for sleep. It's lighter, more breathable, and much more comfortable than sleeping in the full boot.",
                },
                {
                    type: "card",
                    title: "What is a night splint?",
                    description: "A better option for sleeping.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "A **night splint** (like the Thetis splint) is a lightweight device that keeps your foot in the correct angle while being much more comfortable than the full boot. It's specifically designed for sleeping and washing.",
                        },
                        {
                            type: "product-image",
                            src: ThetisNightSplint,
                            alt: "Thetis night splint - a lightweight teal and black medical splint for sleeping",
                            caption: "Thetis Night Splint",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Much lighter** than a walking boot (hundreds of grams vs 1–2kg)",
                                "**Open design** — your foot can breathe, reducing heat and sweating",
                                "**Maintains protection** — keeps the tendon in the correct position",
                                "**Easier to sleep** — most patients report dramatically better sleep",
                                "**Allows foot washing** — you can shower your foot while wearing it",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Critical warning",
                    content:
                        "**Do NOT use a generic \"night splint\" designed for plantar fasciitis.** These hold your foot in dorsiflexion (toes pointing up), which is the OPPOSITE of what you need and could seriously damage your healing tendon. Only use a splint specifically designed for Achilles rupture that holds your foot in plantarflexion (pointed down).",
                },
                {
                    type: "card",
                    title: "When can you use a night splint?",
                    description: "Timing and prerequisites.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Typically weeks 4-6** — once you're past the very early healing phase",
                                "**With specialist approval** — check with your clinician first",
                                "**Surgical wounds healed** — if you had surgery, wait until wounds are fully healed (2-3 weeks)",
                                "**You understand correct use** — know how to apply it properly",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Cost:** £60–70 ($90–120). The only night splint specifically designed for Achilles rupture recovery.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Benefits over sleeping in the boot",
                    description: "Why night splints help.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Dramatically better sleep** — most patients report life-changing improvement",
                                "**Lighter weight** — hundreds of grams vs 1-2kg",
                                "**More breathable** — your foot can breathe",
                                "**Allows natural positions** — easier to get comfortable",
                                "**Boot lasts longer** — not worn to bed, stays cleaner",
                                "**Reduced frustration** — better sleep improves mood",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Using Your Night Splint Safely",
            content: [
                {
                    type: "text",
                    content:
                        "Using a night splint correctly is essential for safety. Follow these guidelines to protect your tendon while improving your sleep.",
                },
                {
                    type: "card",
                    title: "How to apply",
                    description: "Proper application.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "numbered",
                            items: [
                                "**Remove your boot** — carefully, keeping foot pointed down",
                                "**Slide your foot into the splint** — ensure correct positioning",
                                "**Secure all straps** — snugly but not too tight",
                                "**Check position** — your toes should be pointing downward (plantarflexion)",
                                "**Verify comfort** — no pressure points or numbness",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Safety rules",
                    description: "Critical safety guidelines.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Never walk in the night splint** — it's for lying down only",
                                "**Keep your boot next to the bed** — put it on if you need to get up",
                                "**Don't use until approved** — check with your specialist first",
                                "**Monitor your foot** — check for pressure points, numbness, or colour changes",
                                "**Report concerns** — tell your medical team if you have any problems",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Additional Sleep Tips",
            content: [
                {
                    type: "text",
                    content:
                        "Beyond equipment, there are other strategies that can help you sleep better during recovery.",
                },
                {
                    type: "card",
                    title: "Sleep hygiene",
                    description: "Good sleep habits.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Consistent sleep schedule** — go to bed and wake up at similar times",
                                "**Bedroom environment** — cool, dark, quiet",
                                "**Limit screens before bed** — blue light disrupts sleep",
                                "**Relaxation routine** — reading, meditation, breathing exercises",
                                "**Avoid caffeine late** — especially if you're already struggling to sleep",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Managing pain and discomfort",
                    description: "Pain affects sleep.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Take pain medication** — if prescribed, take before bed if needed",
                                "**Ice before bed** — can reduce swelling and discomfort",
                                "**Elevate during day** — reduces evening swelling",
                                "**Gentle movement** — ankle pumps before bed can help",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Mental strategies",
                    description: "Managing sleep anxiety.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Accept disrupted sleep** — it's temporary, but normal",
                                "**Rest even if you can't sleep** — lying down is still restful",
                                "**Don't stress about sleep** — anxiety makes it worse",
                                "**Focus on what you can control** — positioning, temperature, routine",
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
                                "**Disrupted sleep** — very common, affects 80% of patients",
                                "**Difficulty falling asleep** — normal with boot",
                                "**Frequent wake-ups** — discomfort causes this",
                                "**Feeling tired** — poor sleep leads to fatigue",
                                "**Frustration** — understandable given the challenges",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "When to seek help",
                    content:
                        "If sleep problems are severely affecting your mental health, ability to function, or if you're experiencing excessive daytime sleepiness, discuss with your healthcare team. They may have additional strategies or refer you for sleep support.",
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
                        '**Night splint:** "Can I use a night splint for sleeping? When would be appropriate?"',
                        '**Sleep problems:** "I\'m struggling to sleep — is this normal? What can help?"',
                        '**Positioning:** "What\'s the safest position to sleep in?"',
                        '**Pain medication:** "Should I take pain medication before bed to help sleep?"',
                        '**Timeline:** "How long will I need to sleep with protection?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I start using a night splint?",
                    answer:
                        "Typically around weeks 4-6, but this varies by protocol. You need specialist approval first, and if you had surgery, surgical wounds must be fully healed (usually 2-3 weeks). Check with your clinician before using a night splint.",
                },
                {
                    question: "Can I sleep without any protection?",
                    answer:
                        "No, not during the boot phase. You need protection 24/7 to keep the tendon ends together. Removing protection while sleeping is one of the most common causes of re-rupture or tendon elongation. The night splint provides protection while being more comfortable than the boot.",
                },
                {
                    question: "Will I ever sleep normally again?",
                    answer:
                        "Yes, absolutely. Once you're out of the boot phase (typically weeks 10-12), you can sleep normally. The disrupted sleep is temporary, though it can feel like forever. Most patients report dramatic improvement once they transition to a night splint or remove the boot.",
                },
                {
                    question: "What if I can't sleep at all?",
                    answer:
                        "If you're getting very little sleep and it's affecting your ability to function, discuss with your healthcare team. They may have additional strategies, recommend a night splint earlier, or suggest other interventions. Don't suffer in silence.",
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
                        "**Sleep problems are normal** — 80% of patients struggle",
                        "**Night splint = better sleep** — much more comfortable than boot",
                        "**Elevate your leg** — reduces swelling and improves comfort",
                        "**Keep room cool** — boots make you hot",
                        "**This is temporary** — sleep will improve once boot phase ends",
                    ],
                },
            ],
        },
    ],
};
