import type { SectionContent } from "@/components/course/types";
import TendonStrengthTimeline from "@/assets/tendon-strength-timeline-tintin-v6.png";

export const metadata = {
    slug: "final-boot-phase",
    title: "The Final Boot Phase",
    description:
        "Remodelling phase, tendon strength, and removing final wedges",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 8, you're in the final phase of boot wear. Your tendon is remodelling — the new tissue is getting stronger and more organized. This is exciting progress, but it's also a critical time. The tendon is still vulnerable, and rushing ahead can cause problems. Stay patient — you're almost there.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Final boot phase basics",
            items: [
                {
                    text:
                        "Continue following your protocol — don't rush ahead even if you feel ready",
                },
                {
                    text:
                        "Remove final wedges gradually — follow your clinician's schedule exactly",
                },
                {
                    text:
                        "Monitor tendon strength — you'll feel it getting stronger",
                },
                {
                    text:
                        "Prepare for boot removal — start thinking about what comes next",
                },
                {
                    text:
                        "Stay patient — the final weeks matter as much as the first",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding the Remodelling Phase",
            content: [
                {
                    type: "text",
                    content:
                        "Your tendon is now in the remodelling phase — the new tissue is organizing itself, getting stronger, and becoming more like normal tendon. Think of it like **concrete setting** — it's hard enough to walk on, but still needs time to fully cure.",
                },
                {
                    type: "text",
                    content:
                        "For a detailed explanation of the healing stages, see [The Healing Process](/standard/healing-process).",
                },
                {
                    type: "image",
                    src: TendonStrengthTimeline,
                    alt: "Timeline diagram showing Mike progressing through recovery: Week 0-2 (0% strength) with boot on left foot, white Stan Smiths on right foot, using crutches; Week 4-6 (20-30% strength) with boot on left foot, white Stan Smiths on right foot, no crutches; Week 8 (50-60% strength) with boot on left foot, white Stan Smiths on right foot, walking without crutches; Week 12 (70-80% strength) walking without boot, both feet in white Stan Smiths; Month 12 (90-100% strength) running",
                    caption:
                        "Tendon strength progression: your tendon is getting stronger, but still needs protection",
                },
                {
                    type: "card",
                    title: "Tendon strength at Week 8",
                    description: "What your tendon can handle.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "By Week 8, your tendon has about **50-60% of its normal strength**. This is enough for walking with protection, but not enough for running, jumping, or sudden movements. The tendon continues strengthening gradually.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Safe:** Walking with boot, gentle weight-bearing",
                                "**Safe:** Removing wedges gradually as protocol allows",
                                "**Not safe:** Running, jumping, sudden movements",
                                "**Not safe:** Removing boot early or skipping protection",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple analogy",
                    content:
                        "Think of your tendon like a **rope bridge** being rebuilt. At Week 8, it's strong enough for one person to walk across slowly, but not strong enough for running or jumping. You need to wait until it's fully rebuilt before you can use it normally. Patience now = stronger bridge later.",
                },
                {
                    type: "text",
                    content:
                        "Re-rupture risk is **3-5%** — low but not negligible. Risk is highest during early rehab (weeks 0-8) and boot removal (weeks 8-12). Remember that [elongation](/standard/healing-process) is the bigger concern because it affects your long-term function. See [Healing Process](/standard/healing-process) for the full timeline and details.",
                },
            ],
        },
        {
            type: "section",
            title: "Removing Final Wedges",
            content: [
                {
                    type: "text",
                    content:
                        "By Week 8, you're likely removing your final wedges, bringing your foot closer to neutral. This is progress, but it's also when some people get impatient and rush ahead. Don't — the final wedges matter just as much as the first ones.",
                },
                {
                    type: "card",
                    title: "Why final wedges matter",
                    description: "They're not less important.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "The final wedges bring your foot to neutral — a position where the tendon is under more stress. Removing them too quickly can cause the tendon ends to separate, leading to a longer tendon and worse outcomes.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**More stress** — neutral position puts more tension on the tendon",
                                "**Critical timing** — tendon needs to be strong enough",
                                "**Final protection** — last chance to ensure proper healing",
                                "**Sets foundation** — affects long-term function",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The safe approach",
                    description: "How to remove final wedges.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Follow protocol exactly** — don't accelerate even if you feel ready",
                                "**One wedge at a time** — same rule as before",
                                "**Watch for problems** — increased pain or swelling means slow down",
                                "**Give time between removals** — usually 1-2 weeks between wedges",
                                "**Don't skip to neutral** — gradual is safe, fast is risky",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Common mistake",
                    content:
                        "Many people feel ready to remove all wedges at once or skip straight to neutral. Don't. Even if you feel great, follow your protocol. The tendon needs time to adapt to each angle change. Rushing now can undo weeks of healing.",
                },
            ],
        },
        {
            type: "section",
            title:
                "Understanding Phase 2 and Phase 3: What Comes After Boot Removal",
            content: [
                {
                    type: "text",
                    content:
                        "Before we discuss boot removal, it's important to understand what comes next. You've been building strength in Phase 1, and now you're preparing for **Phase 2: Transition** (weeks 8-12) and **Phase 3: Capacity** (weeks 12-26). Understanding these phases helps you see why building strength now matters and what you're working toward.",
                },
                {
                    type: "card",
                    title: "Phase 2 and Phase 3 Overview",
                    description: "What comes after boot removal.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Phase 2: Transition** (weeks 8-12) focuses on rebuilding strength and function: single-leg heel raises, balance training, and transitioning from protected to normal walking.",
                        },
                        {
                            type: "text",
                            content:
                                "**Phase 3: Capacity** (weeks 12-26) focuses on building capacity and preparing for higher-level activities: progressive strengthening, gait preparation, plyometric preparation, and running when ready.",
                        },
                        {
                            type: "text",
                            content:
                                "For detailed Phase 2 and Phase 3 goals, exercises, and progression, see [Starting Physiotherapy](/standard/starting-physio). That lesson includes the complete rehabilitation roadmap with all phases, goals, and timelines.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Why this matters now",
                    content:
                        "Understanding Phase 2 and Phase 3 helps you see why building strength in Phase 1 is so important. The stronger you are when you remove your boot, the faster you'll progress through Phase 2 and Phase 3. Your physiotherapist will guide you through these phases.",
                },
            ],
        },
        {
            type: "section",
            title: "Rethinking Boot Removal: Why Timing Matters",
            content: [
                {
                    type: "text",
                    content:
                        "Many traditional protocols remove the boot at **Week 8**, but emerging evidence suggests this may be too early. Understanding different protocols and why strength matters more than time can help you have better conversations with your clinician about your recovery.",
                },
                {
                    type: "card",
                    title: "Common boot removal protocols",
                    description: "Two approaches you might encounter.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "There are different approaches to gradually reducing your foot angle and removing the boot. Here are two common protocols:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Willets Protocol**: Uses heel raises (wedges) that gradually reduce in height — starting with 5cm heel raise (30°), reducing to 2.5cm (15°), then 1cm (5-10°), with boot removed at Week 8",
                                "**LAMP/SMART (Vacoped) Protocol**: Uses an adjustable boot that gradually unlocks the angle — starting at 30° locked, progressing to 15-30° range, then 0-30° range, with boot removed at Week 8",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Both protocols aim to gradually reduce the foot angle and remove the boot at Week 8. But here's the critical question: **Do they have adequate calf strength for walking at 8 weeks?**",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The evidence-based approach",
                    description: "Why strength matters more than time.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Leading Achilles rupture experts, including Professor Peter Malliaras (who has published 120+ papers on tendon rehabilitation), recommend a **strength-based approach** rather than a time-based one:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Boot removal at 11-12 weeks** (not 8 weeks) — based on tendon strength, not calendar time",
                                "**Tendon strength assessment** — your clinician should assess whether your tendon can handle walking forces before removing the boot",
                                "**Force considerations** — walking without a boot puts about **3.2x your body weight** through your Achilles tendon",
                                "**Current protocols insufficient** — many traditional protocols don't prepare the tendon adequately for this transition",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "The key insight: Your tendon needs to be strong enough to handle walking forces **before** you remove the boot. Removing it too early can lead to [tendon elongation](/standard/healing-process) — when the tendon stretches too much and doesn't heal at the right length — which affects your long-term function.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why Week 8 may be too early",
                    description: "The force transition challenge.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Here's what happens when you transition from boot to walking:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Walking in boot**: ~1x body weight through your Achilles tendon — manageable for a healing tendon",
                                "**Walking without boot**: ~3.2x body weight through your Achilles tendon — **more than 3 times the force**",
                                "**The gap**: Your tendon needs to be strong enough to handle this 3x increase in force",
                                "**The problem**: At Week 8, many people haven't built enough tendon strength to safely handle walking forces",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "This is why Professor Malliaras and other experts recommend waiting until **Week 11-12** — giving your tendon more time to strengthen before exposing it to full walking forces.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What this means for you",
                    description: "How to apply this knowledge.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "This doesn't mean your protocol is wrong — different clinicians use different approaches based on their experience and your specific situation. But it does mean:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ask about strength assessment** — discuss with your clinician how they're assessing your tendon strength before boot removal",
                                "**Don't rush** — if your protocol removes the boot at Week 8, make sure your tendon strength has been properly assessed",
                                "**Understand the trade-offs** — earlier boot removal may feel good, but it can increase elongation risk",
                                "**Trust the process** — if your clinician recommends waiting longer, there's good evidence supporting this approach",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "The goal is to minimize tendon elongation — the biggest factor affecting long-term function. Waiting a few extra weeks to ensure adequate strength can make a significant difference to your recovery.",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Key takeaway",
                    content:
                        "Boot removal should be based on **tendon strength**, not just time. Evidence suggests waiting until Week 11-12 allows more time for tendon strengthening, reducing the risk of elongation when transitioning to walking. Discuss strength assessment with your clinician before boot removal.",
                },
            ],
        },
        {
            type: "section",
            title: "Preparing for Physiotherapy",
            content: [
                {
                    type: "text",
                    content:
                        "As you approach boot removal, you're also preparing for physiotherapy — the next phase of your recovery. Physio typically starts around Week 10-12 (after boot removal), though some protocols start earlier (Week 6-9) while still in the boot. Finding the right physiotherapist and knowing what to expect helps you prepare.",
                },
                {
                    type: "card",
                    title: "Finding the right physiotherapist",
                    description: "What to look for.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Not all physiotherapists are the same. Finding someone experienced with Achilles ruptures makes a big difference. They'll know what to focus on, what to avoid, and how to progress you safely.",
                        },
                        {
                            type: "text",
                            content: "**What to look for:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Experience with Achilles ruptures** — they've treated this injury before",
                                "**Good communication** — explains things clearly, listens to you",
                                "**Realistic expectations** — doesn't promise quick fixes",
                                "**Evidence-based** — uses proven techniques, not fads",
                                "**Accessible** — location, hours, and cost work for you",
                            ],
                        },
                        {
                            type: "text",
                            content: "**How to find one:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ask your clinician** — they often have recommendations",
                                "**Check professional directories** — look for sports or orthopedic specialists",
                                "**Read reviews** — but take them with a grain of salt",
                                "**Ask in support groups** — other patients often have recommendations",
                                "**Check insurance** — ensure they're covered by your insurance",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What to expect in your first physio session",
                    description: "Brief overview.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your first physio session is usually an assessment — they'll evaluate where you are and create a plan. For detailed information, see [Starting Physiotherapy](/standard/starting-physio).",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Assessment** — checking strength, mobility, balance, gait",
                                "**Discussion** — about your injury, recovery so far, goals",
                                "**Plan** — what you'll work on together",
                                "**First exercises** — usually simple exercises to start",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**What to bring:** Your boot (if still wearing it), comfortable clothes, list of questions, insurance/referral if required.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Start looking early",
                    content:
                        "Good physiotherapists can have waiting lists. Start looking around Week 8-9 so you're ready when you need to start. Check insurance coverage before booking.",
                },
            ],
        },
        {
            type: "section",
            title: "Preparing for Boot Removal",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal is coming — usually around Week 10-12. This is exciting, but it's also a transition that needs preparation. Your foot has been protected for weeks, and suddenly it won't be.",
                },
                {
                    type: "card",
                    title: "What to expect",
                    description: "The transition from boot to shoes.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling vulnerable** — your foot feels exposed without the boot",
                                "**Stiffness** — your ankle has been immobilized, it will be stiff",
                                "**Swelling** — may increase initially without boot compression",
                                "**Weakness** — muscles are weaker from disuse",
                                "**Uncertainty** — wondering if you're ready",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to prepare",
                    description: "Get ready for the transition.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Talk to your clinician** — discuss timing and expectations",
                                "**Get proper footwear** — supportive shoes, heel lifts if needed",
                                "**Prepare mentally** — it's normal to feel nervous",
                                "**Plan gradual weaning** — if your protocol allows, wean gradually",
                                "**Arrange physio** — physiotherapy usually starts around boot removal",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Gradual weaning",
                    content:
                        "Some protocols allow gradual weaning — wearing the boot less and less over 1-2 weeks. This can make the transition easier. Start with a few hours a day without the boot, gradually increase. Always follow your clinician's specific protocol.",
                },
                {
                    type: "text",
                    content:
                        "When you first remove your boot, your tendon is still vulnerable. Protected walking techniques (heel wedges, reduced step length, gradual progression) help prevent elongation. See [Leaving Your Boot Behind](/standard/boot-transition) for detailed guidance on footwear, heel lifts, and protected walking techniques.",
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
                                "**Feeling ready** — wanting to remove the boot, feeling impatient",
                                "**Stiffness** — ankle feels stiff, especially in the morning",
                                "**Swelling** — still some swelling, especially after activity",
                                "**Mild discomfort** — some pain when removing wedges or walking",
                                "**Anxiety** — worried about boot removal, re-injury",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        '**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, severe pressure/pain, or fever with spreading redness.',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Finishing Strong",
            content: [
                {
                    type: "text",
                    content:
                        "The final weeks of boot wear can feel like the longest. Here's how to finish strong:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Stay patient** — you're almost there, don't rush now",
                        "**Follow protocol** — every week matters, especially the final ones",
                        "**Celebrate progress** — you've come a long way",
                        "**Prepare for next phase** — boot removal is a new beginning, not just an end",
                        "**Stay positive** — you're in the home stretch",
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
                                "You can help by: providing encouragement (they're almost there), helping with final wedge removals, preparing for boot removal (getting shoes, arranging physio), and being patient — the final weeks can feel slowest.",
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
                        "**This week:** Continue removing final wedges, foot approaches neutral",
                        "**Week 9:** We cover preparing for physiotherapy",
                        "**Weeks 9-10:** Final wedges removed, preparing for boot removal",
                        "**Week 10-12:** Boot removal, transition to shoes and physiotherapy",
                    ],
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your clinician",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Timing:** "When will I remove my final wedges? When can I remove the boot?"',
                        '**Weaning:** "Can I wean off the boot gradually, or remove it all at once?"',
                        '**Footwear:** "What shoes should I wear after boot removal? Do I need heel lifts?"',
                        '**Physio:** "When should I start physiotherapy? How do I find a physiotherapist?"',
                        '**Strength:** "How strong is my tendon now? What can I do safely?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I remove the boot early if I feel ready?",
                    answer:
                        "No. Even if you feel great, follow your clinician's protocol. The timing is based on healing progress, not just how you feel. Removing the boot too early can cause the tendon to stretch or re-rupture. Week 10-12 is standard timing for a reason.",
                },
                {
                    question: "What if I'm still in pain at Week 8?",
                    answer:
                        "Some pain is normal, but if you're still in significant pain, discuss this with your clinician. They may need to adjust your protocol, check for problems, or provide additional treatment. Don't assume pain is normal without checking.",
                },
                {
                    question: "How do I know if my tendon is strong enough?",
                    answer:
                        "Your clinician assesses this through examination, imaging, and your progress. You can't tell just by how you feel. Trust their assessment — they know what to look for. At Week 8, the tendon is typically strong enough for protected walking but not for full activity.",
                },
                {
                    question: "When can I drive / go back to work?",
                    answer:
                        "This depends on which leg is injured, your job, and your clinician's guidance. We cover this in detail in Week 10. Generally, you can't drive if it's your right leg until you can walk without crutches. Discuss work with your employer and clinician.",
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
                        "**Don't rush** — the final weeks are as important as the first",
                        "**Follow protocol** — especially for final wedge removal",
                        "**Prepare for transition** — boot removal is coming, get ready",
                        "**Stay patient** — you're almost there, finish strong",
                    ],
                },
            ],
        },
    ],
};
