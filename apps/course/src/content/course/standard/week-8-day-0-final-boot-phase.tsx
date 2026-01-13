import type { SectionContent } from "@/components/course/types";
import TendonStrengthTimeline from "../../../assets/tendon-strength-timeline.png";
import WhenToRemoveBoot from "../../../assets/when-to-remove-boot.png";
import ReRuptureRiskTimeline from "../../../assets/re-rupture-risk-timeline.png";
import ProtectedWalkingAfterBoot from "../../../assets/protected-walking-after-boot.png";

export const metadata = {
    slug: "week-8-day-0-final-boot-phase",
    title: "The Final Boot Phase",
    description:
        "Remodelling phase, tendon strength, and removing final wedges",
    week: 8,
    day: 0,
    section_number: 13,
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
                    type: "card",
                    title: "What's happening inside",
                    description: "The biology of remodelling.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**New tissue organizing** — collagen fibers aligning properly",
                                "**Getting stronger** — tendon strength increasing week by week",
                                "**Still vulnerable** — not fully healed yet, can still be damaged",
                                "**Approaching normal** — structure becoming more like healthy tendon",
                            ],
                        },
                    ],
                },
                {
                    type: "image",
                    src: TendonStrengthTimeline,
                    alt: "Timeline diagram showing same character progressing through recovery: Week 0-2 (0% strength) on crutches, Week 4-6 (20-30% strength) with boot and EVENup using crutches, Week 8 (50-60% strength) with boot and EVENup no crutches, Week 12 (70-80% strength) walking without boot, Month 12 (90-100% strength) running",
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
                                "By Week 8, your tendon has about **50-60% of its normal strength**. This is enough for walking with protection, but not enough for running, jumping, or sudden movements. The tendon continues strengthening over the next 6-12 months.",
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
            title: "Preparing for Boot Removal",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal is coming — usually around Week 10-12. This is exciting, but it's also a transition that needs preparation. Your foot has been protected for weeks, and suddenly it won't be.",
                },
                {
                    type: "image",
                    src: WhenToRemoveBoot,
                    alt:
                        "Educational infographic showing when to remove boot: time-based removal (8 weeks) vs strength-based removal (11-12 weeks), criteria checklist, and why strength matters more than time",
                    caption:
                        "When to remove your boot: strength-based removal is safer than time-based removal",
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
                    type: "image",
                    src: ProtectedWalkingAfterBoot,
                    alt:
                        "Educational infographic showing protected walking techniques after boot removal: heel wedge (1.2cm), reduced step length, partial weight-bearing if limping, and why these techniques prevent elongation",
                    caption:
                        "Protected walking techniques: heel wedge, shorter steps, and partial weight-bearing protect your healing tendon",
                },
                {
                    type: "card",
                    title: "Protected walking techniques",
                    description: "How to walk safely after boot removal.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "When you first remove your boot, your tendon is still vulnerable. Protected walking techniques help prevent elongation — the biggest risk after boot removal.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heel wedge (1.2cm)**: Use a heel lift in your shoe to reduce tendon stretch during walking",
                                "**Reduced step length**: Take shorter steps than normal to reduce force through your tendon",
                                "**Partial weight-bearing if limping**: If you're limping, use crutches or reduce weight on the injured foot",
                                "**Gradual progression**: Increase step length and weight-bearing as your strength improves",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These techniques are especially important in the first few weeks after boot removal. Your physiotherapist will guide you on when to progress.",
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
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe pain** when removing wedges, **numb/blue/pale toes**, severe pressure/pain, fever with rapidly spreading redness, or a fall with a new "pop".',
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
