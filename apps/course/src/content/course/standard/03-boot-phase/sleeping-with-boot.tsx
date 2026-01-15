import type { SectionContent } from "@/components/course/types";
import ThetisNightSplint from "@/assets/night-splint-bed-top-square.jpg";

export const metadata = {
    slug: "sleeping-with-boot",
    title: "Sleeping with Your Boot",
    description: "Night splints, sleep strategies, and making nights bearable",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Sleeping in a walking boot is one of the hardest parts of recovery. Around 80% of patients struggle with sleep during this phase. The boot is heavy, rigid, hot, and feels like sleeping with a brick strapped to your leg. This lesson covers practical solutions: night splints, positioning strategies, and tips to make sleep more bearable.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Sleep essentials",
            items: [
                {
                    text:
                        "Consider a night splint — 80% of patients struggle to sleep in their boot",
                },
                {
                    text:
                        "Set up proper positioning — sleep on your back with leg elevated",
                },
                {
                    text:
                        "Control temperature — keep room cool, use light bedding",
                },
                {
                    text:
                        "Keep crutches by your bed — safer for night-time bathroom trips",
                },
                {
                    text:
                        "Never remove boot while sleeping — always use protection",
                },
            ],
        },
        {
            type: "section",
            title: "The sleep problem — and the solution",
            content: [
                {
                    type: "text",
                    content:
                        "Let's be honest: **sleeping in a walking boot is miserable**. The boot is heavy, rigid, hot, and feels like sleeping with a brick strapped to your leg. Around 80% of patients report significant sleep problems during this phase.",
                },
                {
                    type: "card",
                    title: "Why sleep matters",
                    description:
                        "Poor sleep isn't just uncomfortable — it affects your daily life.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sleep deprivation increases pain** — you'll feel worse if you're not sleeping",
                                "**Mental health suffers** — exhaustion makes everything harder to cope with",
                                "**Clot risk may increase** — poor sleep and lack of movement both contribute to clot risk",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The night splint solution",
                    description:
                        "A lighter, more comfortable option for sleeping.",
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
                        {
                            type: "text",
                            content:
                                "**Cost:** £60–70 ($90–120). The only night splint specifically designed for Achilles rupture recovery. Patented in 2024.",
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Check with your clinician before using a night splint. Most protocols allow it once you're past the very early healing phase (usually after week 2–3), but some require 24/7 boot wear for longer.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Sleeping strategies with your boot",
                    description: "Tips to make sleep more bearable.",
                    variant: "default",
                    content: [
                        {
                            type: "alert",
                            variant: "danger",
                            title:
                                "Critical: Never remove your boot while sleeping",
                            content:
                                "**Removing your boot while sleeping is NOT safe and can cause serious damage.** During the boot phase, you need protection 24/7 to keep the tendon ends together. Sleeping without protection is one of the most common causes of re-rupture or tendon elongation. If you're struggling with sleep, use a night splint (with specialist approval) or try the strategies below — but never sleep without protection.",
                        },
                        {
                            type: "text",
                            content:
                                "Even if you're sleeping in your boot, there are strategies to make it more bearable:",
                        },
                        {
                            type: "text",
                            content: "**Positioning and elevation:**",
                        },
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
                        {
                            type: "text",
                            content: "**Temperature control:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Keep room cool** — boots make you hot, cool environment helps",
                                "**Use light bedding** — avoid heavy duvets that trap heat",
                                "**Fan or air conditioning** — helps regulate temperature",
                                "**Merino wool socks** — regulate temperature better than cotton",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Comfort strategies:**",
                        },
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
            title: "Sleeping in Week 1",
            content: [
                {
                    type: "text",
                    content:
                        "Sleep disruption is normal in the first week. Most people struggle for a while — it improves as swelling settles and you figure out your best position.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "Use pillows to support the leg (and keep it from rolling)",
                        "Keep the room cooler — casts/boots can feel hot at night",
                        "Keep crutches by the bed and use a nightlight",
                        "Accept you might need naps — healing is work",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "Can I take the boot off to sleep if I use a night splint?",
                    answer:
                        "Usually yes, but check with your clinician first. Most protocols allow a night splint once you're past the very early phase (usually after week 2–3). The splint must maintain the correct angle — it's not the same as going unprotected. Never remove all protection while sleeping during boot phase.",
                },
                {
                    question: "Will I ever sleep normally again?",
                    answer:
                        "Yes. Sleep improves significantly once you're out of the boot. Most people find sleep returns to normal within a few weeks of boot removal. Until then, focus on the strategies above to make sleep as bearable as possible.",
                },
            ],
        },
    ],
};
