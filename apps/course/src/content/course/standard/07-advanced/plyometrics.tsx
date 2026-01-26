import type { SectionContent } from "@/components/course/types";
import PogoJumpWeek31 from "@/assets/pogos.png";

export const metadata = {
    slug: "plyometrics",
    title: "Plyometric Training and Jumping",
    description:
        "When to start, progression from pogo jumps to sport-specific training",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 31, you're likely running and thinking about higher-level activities. Plyometric training — jumping and explosive movements — is the next step. This prepares you for return to sport and builds power. But plyometrics require careful progression. This lesson covers when to start, how to progress from simple jumps to sport-specific training, and how to do it safely.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Plyometric training basics",
            items: [
                {
                    text:
                        "Meet criteria first — [25+ heel raises](/standard/progressive-strengthening), comfortable running, physio clearance",
                },
                {
                    text:
                        "Start with simple jumps — pogo jumps, two-foot jumps",
                },
                {
                    text:
                        "Progress gradually — from simple to complex movements",
                },
                {
                    text:
                        "Focus on landing — proper landing technique is crucial",
                },
                {
                    text:
                        "Listen to your body — stop if you have pain or concerns",
                },
                {
                    text:
                        "Follow your physio's guidance — they'll guide progression",
                },
            ],
        },
        {
            type: "section",
            title: "Are You Ready for Plyometrics?",
            content: [
                {
                    type: "text",
                    content:
                        "Plyometric training is **criteria-based, not time-based**. You need to meet certain strength and function goals before starting. Don't rush — plyometrics too early increases injury risk.",
                },
                {
                    type: "card",
                    title: "Criteria for starting plyometrics",
                    description: "What you need to achieve first.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**25+ single-leg heel raises** — gold standard strength test",
                                "**Comfortable running** — can run without pain or difficulty",
                                "**Good balance** — single-leg balance 30+ seconds",
                                "**No pain** — activities don't cause pain",
                                "**Physio clearance** — your physio assesses readiness",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Don't start plyometrics until you meet these criteria.** Plyometrics too early risks injury. Your physiotherapist will assess when you're ready.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Plyometric Progression: From Simple to Complex",
            content: [
                {
                    type: "text",
                    content:
                        "**Plyometric progression** starts with simple movements and builds to complex, sport-specific training. Follow this progression carefully.",
                },
                {
                    type: "card",
                    title: "Phase 1: Simple jumps (weeks 1-2)",
                    description: "Building foundation.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Pogo jumps:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Small jumps in place, both feet",
                                "Focus on quick ground contact",
                                "Start with 10-15 reps, 2-3 sets",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Two-foot jumps:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Jump forward, backward, side to side",
                                "Focus on landing softly",
                                "Start with 5-10 reps, 2-3 sets",
                            ],
                        },
                        {
                            type: "image",
                            src: PogoJumpWeek31,
                            alt: "Grant performing pogo jump exercise, jumping straight up on both feet with knees slightly bent",
                            caption:
                                "Pogo jumps: small, controlled bounces on balls of feet",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Phase 2: Single-leg jumps (weeks 3-4)",
                    description: "Increasing difficulty.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Single-leg pogo jumps:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Small jumps on injured leg only",
                                "Start with 5-10 reps",
                                "Build to 15-20 reps",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Single-leg hops:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Hop forward, backward, side to side",
                                "Focus on control and landing",
                                "Start with 5-10 reps",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Phase 3: Advanced movements (weeks 5+)",
                    description: "Sport-specific training.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Box jumps** — jumping onto a box",
                                "**Lateral jumps** — side-to-side movements",
                                "**Sport-specific** — movements specific to your sport",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progress to these gradually** — only when comfortable with simpler movements.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Proper Landing Technique",
            content: [
                {
                    type: "text",
                    content:
                        "**Proper landing technique** is crucial for plyometrics. Good landing reduces stress on your tendon and prevents injury.",
                },
                {
                    type: "card",
                    title: "Key landing points",
                    description: "What to focus on.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Land softly** — absorb impact, don't crash down",
                                "**Bend your knees** — use your legs to absorb force",
                                "**Land on balls of feet** — then roll to heel",
                                "**Keep torso upright** — don't lean forward",
                                "**Control the landing** — don't let your leg collapse",
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
                    title: "Usually normal during plyometrics",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling challenged** — plyometrics are hard, that's normal",
                                "**Muscle soreness** — normal after plyometric training",
                                "**Some fatigue** — normal, especially initially",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** during or after plyometrics that doesn't ease — plyometrics shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Unable to bear weight** — can't put weight on your leg.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Plyometrics Work",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Meet criteria first** — don't start until you're ready",
                        "**Follow progression plan** — start simple, build gradually",
                        "**Focus on landing** — proper technique is crucial",
                        "**Listen to your body** — stop if you have pain or concerns",
                        "**Be patient** — building power takes time",
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
                        "**This week:** Start plyometric training if you meet criteria",
                        "**Week 32:** Return to Sport — criteria, process, and timeline for returning to your sport (coming up)",
                        "**Week 34:** We cover when things don't go to plan — not progressing, seeking further opinion",
                        "**Weeks 31-38:** Continue building power and preparing for return to sport",
                        "**After plyometrics:** You'll progress to sport-specific training and return to sport",
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
                        '**Readiness:** "Am I ready for plyometrics? Have I met the criteria?"',
                        '**Progression:** "What plyometric progression should I follow?"',
                        '**Technique:** "Can you check my landing technique? What should I focus on?"',
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
                    question: "When can I start plyometrics?",
                    answer:
                        "When you meet the criteria: 25+ single-leg heel raises, comfortable running, good balance, no pain, and physio clearance. This is typically around 6-7 months, but it's criteria-based, not time-based.",
                },
                {
                    question: "What if plyometrics cause pain?",
                    answer:
                        "Some muscle soreness is normal, but severe pain is not. If plyometrics cause severe pain, stop and tell your physiotherapist. They can assess what's happening and modify your program.",
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
                        "**Meet criteria first** — 25+ heel raises, comfortable running, physio clearance",
                        "**Start simple** — pogo jumps, two-foot jumps",
                        "**Progress gradually** — from simple to complex",
                        "**Focus on landing** — proper technique is crucial",
                    ],
                },
            ],
        },
    ],
};
