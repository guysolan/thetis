import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "post-boot-challenges",
    title: "Managing Post-Boot Challenges",
    description:
        "Stiffness, swelling, and why you shouldn't stretch aggressively",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 14, you've been out of your boot for a few weeks. This is exciting — you're walking in regular shoes and making progress. But you're also facing new challenges: stiffness, swelling, and the temptation to stretch aggressively. This lesson covers how to manage these post-boot challenges safely and why aggressive stretching can actually harm your recovery.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Post-boot management",
            items: [
                {
                    text:
                        "Manage stiffness gently — use gentle movements and heat, not aggressive stretching",
                },
                {
                    text:
                        "Control swelling — elevate when resting, use ice if needed, compression if recommended",
                },
                {
                    text:
                        "Avoid aggressive stretching — your tendon is still healing, aggressive stretching can cause elongation",
                },
                {
                    text:
                        "Stay active — gentle movement helps with stiffness and swelling",
                },
                {
                    text:
                        "Be patient — stiffness and swelling are normal, they'll improve gradually",
                },
                {
                    text:
                        "Follow your physio's guidance — they know what's safe for your stage",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Post-Boot Stiffness",
            content: [
                {
                    type: "text",
                    content:
                        "Stiffness is one of the most common complaints after boot removal. Your ankle and calf have been immobilized for weeks, and now they need to move again. Think of it like **opening a door that's been closed for months** — it's stiff at first, but with gentle use, it loosens up.",
                },
                {
                    type: "card",
                    title: "Why you're stiff",
                    description: "The science behind stiffness.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Immobilization** — your ankle was held in one position for weeks",
                                "**Muscle tightness** — your calf muscles are tight from disuse",
                                "**Tendon healing** — your healing tendon is still forming scar tissue",
                                "**Joint stiffness** — your ankle joint hasn't moved through its full range",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "This stiffness is **normal and expected**. It doesn't mean something is wrong — it means your body is adapting to movement again.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to manage stiffness safely",
                    description: "Gentle approaches that work.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**Gentle movement**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Ankle pumps — point toes up and down",
                                "Ankle circles — gentle circular movements",
                                "Walking — movement helps reduce stiffness",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Heat therapy**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Warm bath or shower — helps relax muscles",
                                "Heat pack — 15-20 minutes on your calf",
                                "Use heat for stiffness, ice for swelling",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Gradual activity**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with gentle exercises",
                                "Progress gradually as stiffness improves",
                                "Don't force movements — let stiffness ease naturally",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Why You Shouldn't Stretch Aggressively",
            content: [
                {
                    type: "text",
                    content:
                        "This is critical: **aggressive stretching can cause tendon elongation** — when your tendon stretches too much and doesn't heal at the right length. This affects your long-term function. Think of it like **stretching a rubber band too far** — it doesn't snap back to its original length.",
                },
                {
                    type: "card",
                    title: "What aggressive stretching means",
                    description: "What to avoid.",
                    variant: "danger",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Forcing your foot up** — pushing your toes toward your shin aggressively",
                                "**Holding stretches for long periods** — 60+ seconds of intense stretching",
                                "**Stretching through pain** — pushing past discomfort into pain",
                                "**Multiple aggressive stretches daily** — overdoing it",
                                "**Stretching without guidance** — not following your physio's program",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why aggressive stretching is dangerous",
                    description: "The elongation risk.",
                    variant: "warning",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Your tendon is still healing** — at Week 14, your tendon is in the remodelling phase. It's stronger than it was, but it's still vulnerable to overstretching.",
                        },
                        {
                            type: "text",
                            content:
                                "**Elongation is permanent** — if your tendon stretches too much, it doesn't snap back. This affects your ability to push off, jump, and return to sport.",
                        },
                        {
                            type: "text",
                            content:
                                "**Gentle stretching is safe** — gentle movements and stretches are fine. It's aggressive, forced stretching that's the problem.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Safe stretching guidelines",
                    description: "What's okay to do.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gentle towel stretch** — gentle pull, 30 seconds, no pain",
                                "**Ankle movements** — gentle up/down and circular movements",
                                "**Physio-guided stretches** — follow your physiotherapist's specific program",
                                "**No forcing** — if it hurts, stop",
                                "**Short holds** — 30 seconds max, not 60+ seconds",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**Follow your physio's guidance.** They know what's safe for your specific stage of recovery. Don't add aggressive stretches on your own.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Swelling After Boot Removal",
            content: [
                {
                    type: "text",
                    content:
                        "Swelling often increases after boot removal. Your foot and ankle are working harder now, and increased activity can cause more swelling. This is normal, but it needs to be managed.",
                },
                {
                    type: "card",
                    title: "Why swelling happens",
                    description: "The causes.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Increased activity** — walking and exercises increase blood flow",
                                "**Gravity** — your foot is down more, fluid pools",
                                "**Healing process** — your body is still healing",
                                "**Muscle work** — your muscles are working harder",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to manage swelling",
                    description: "Effective strategies.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Elevation**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Elevate your foot above heart level when resting",
                                "Do this several times throughout the day",
                                "Especially important after walking or exercises",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Ice**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Ice for 15-20 minutes after activity if swelling increases",
                                "Use ice for swelling, heat for stiffness",
                                "Don't ice directly on skin — use a towel",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Compression** (if recommended)",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Compression socks or bandages if your physio recommends",
                                "Not always necessary — follow your physio's guidance",
                                "Don't compress too tightly",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Movement**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Gentle movement helps with circulation",
                                "Ankle pumps help reduce swelling",
                                "Don't stay completely still",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "The Morning Stiffness Problem",
            content: [
                {
                    type: "text",
                    content:
                        "Many people notice stiffness is worst in the morning. This is normal — your ankle has been still all night, and it takes time to loosen up.",
                },
                {
                    type: "card",
                    title: "Why mornings are worse",
                    description: "The overnight effect.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Overnight immobility** — your ankle doesn't move much while you sleep, so it stiffens up.",
                        },
                        {
                            type: "text",
                            content:
                                "**Fluid accumulation** — swelling can increase overnight with your foot down.",
                        },
                        {
                            type: "text",
                            content:
                                "**Normal healing** — this is part of the normal recovery process.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to manage morning stiffness",
                    description: "Start your day right.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gentle movements first** — do ankle pumps and circles before getting out of bed",
                                "**Warm shower** — helps loosen things up",
                                "**Gradual start** — don't rush into full activity",
                                "**It will improve** — stiffness typically eases as you move around",
                            ],
                        },
                        {
                            type: "tip",
                            title: "Tiny change, big payoff",
                            content:
                                "Do 10 ankle pumps and 10 ankle circles before you get out of bed each morning. This simple 2-minute routine helps reduce morning stiffness and makes your day start better.",
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
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Stiffness** — especially in the morning or after rest",
                                "**Some swelling** — especially after activity",
                                "**Feeling tight** — your calf and Achilles feel tight",
                                "**Gradual improvement** — stiffness and swelling improve slowly over weeks",
                                "**Good days and bad days** — some days are better than others",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** that doesn't ease — pain shouldn't be severe. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Severe swelling** that doesn't improve with elevation — could indicate a problem. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. **Fever with rapidly spreading redness** — possible infection.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Managing Challenges Day-to-Day",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Start your day gently** — ankle pumps and circles before getting up",
                        "**Elevate regularly** — elevate your foot when resting, especially after activity",
                        "**Use heat for stiffness** — warm bath or heat pack helps",
                        "**Use ice for swelling** — ice after activity if swelling increases",
                        "**Stay active** — gentle movement helps with both stiffness and swelling",
                        "**Be patient** — these challenges improve gradually over weeks",
                    ],
                },
                {
                    type: "card",
                    title: "For partners / carers",
                    description: "How you can help.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "You can help by: reminding them to elevate their foot when resting, helping with heat/ice if needed, being patient with stiffness and slower movement, understanding that these challenges are normal, and supporting gentle activity rather than pushing too hard.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What Happens Next",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**This week:** Focus on managing stiffness and swelling safely",
                        "**Week 15:** We cover progressive strengthening — single-leg heel raises, eccentric drops, and resistance training",
                        "**Weeks 12-18:** Continue building strength and improving function",
                        "**After Phase 2:** You'll move to Phase 3 (single-leg capacity) — building power and preparing for return to sport",
                    ],
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your physiotherapist",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Stretching:** "What stretches are safe for me? What should I avoid?"',
                        '**Stiffness:** "How should I manage stiffness? Is heat or ice better?"',
                        '**Swelling:** "How much swelling is normal? When should I be concerned?"',
                        '**Activity:** "How much activity is okay? Should I rest more or move more?"',
                        '**Timeline:** "How long will stiffness and swelling last?"',
                        '**Concerns:** "I\'m worried about [specific concern]. Is this normal?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How long will stiffness last?",
                    answer:
                        "Stiffness typically improves significantly over 4-6 weeks after boot removal, but some mild stiffness can persist for months. It's normal and improves gradually with activity. If stiffness is severe or getting worse, tell your physiotherapist.",
                },
                {
                    question: "Is it okay to stretch if I'm stiff?",
                    answer:
                        "Gentle stretching is okay, but avoid aggressive stretching. Gentle movements, ankle pumps, and physio-guided stretches are safe. Don't force stretches or hold them for long periods. Follow your physiotherapist's specific guidance.",
                },
                {
                    question: "How much swelling is normal?",
                    answer:
                        "Some swelling is normal, especially after activity. It should improve with elevation and rest. If swelling is severe, doesn't improve with elevation, or is getting worse, tell your physiotherapist. They can assess if there's a problem.",
                },
                {
                    question: "Should I use heat or ice?",
                    answer:
                        "Use heat for stiffness — it helps relax muscles and improve mobility. Use ice for swelling — it helps reduce inflammation. Your physiotherapist can give you specific guidance based on your situation.",
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
                        "**Avoid aggressive stretching** — it can cause tendon elongation and affect long-term function",
                        "**Gentle movement helps** — gentle exercises and movements reduce stiffness safely",
                        "**Manage swelling** — elevate, use ice if needed, stay active",
                        "**Be patient** — stiffness and swelling improve gradually over weeks",
                    ],
                },
            ],
        },
    ],
};
