import type { SectionContent } from "@/components/course/types";
import SeatedCalfRaisePhase1 from "@/assets/seated-calf-raise-phase1-option-b5.png";

export const metadata = {
    slug: "building-strength-in-boot",
    title: "Building Strength While in Boot",
    description:
        "Phase 1 exercises, weight-bearing progression, and preparing for Phase 2",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 6, you can start Phase 1 exercises — seated calf raises with your boot removed. By Week 8, you're building strength and preparing for Phase 2: Transition. Understanding what Phase 2 and Phase 3 involve helps you see where you're going and why building strength now matters.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Building strength basics",
            items: [
                {
                    text:
                        "Start Phase 1 exercises at Week 6 — seated calf raises with boot removed",
                },
                {
                    text:
                        "Follow weight-bearing protocol — progress gradually as your clinician allows",
                },
                {
                    text:
                        "Focus on proper gait — heel-to-toe pattern, use EVENup to prevent back/hip pain",
                },
                {
                    text:
                        "Understand Phase 2 goals — know what you're working toward (15+ single-leg heel raises, balance, strength)",
                },
                {
                    text:
                        "Be patient — strength builds gradually, consistency matters more than intensity",
                },
            ],
        },
        {
            type: "section",
            title: "Phase 1 Exercises: Starting at Week 6",
            content: [
                {
                    type: "text",
                    content:
                        "**Week 6 is when you can start Phase 1 exercises** — seated calf raises with your boot removed. These exercises build strength while your tendon heals and are essential for your recovery. When you start physiotherapy around Week 11, you'll see the complete rehabilitation protocol table in [Starting Physiotherapy](/standard/starting-physio), which shows all phases from immobilization through to return to sport.",
                },
                {
                    type: "card",
                    title: "Phase 1 exercises: What to do",
                    description:
                        "Exercises you can begin once your tendon has had time to heal.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Starting at Week 6, you can begin seated calf raises with your boot removed:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Week 6**: Start with body weight or leg weight only — remove boot, sit with foot in [plantarflexion](/standard/emergency-care) (pointed down), push through big toe and lift heel. Get used to the movement.",
                                "**Week 3+**: Add load gradually — start with 10-15kg on your knee, progress to 0.8-1x body weight",
                                "**Position**: Foot must be pointed down — this is the safe position",
                                "**Target**: Build up to holding body weight in the pointed-down position",
                            ],
                        },
                        {
                            type: "image",
                            src: SeatedCalfRaisePhase1,
                            alt: "Illustration showing seated calf raise exercise with weight on knee, foot pointed down",
                            caption: "Seated calf raise — the key Phase 1 exercise",
                        },
                        {
                            type: "text",
                            content:
                                "These exercises are done **out of boot** (boot removed for exercises only). Your boot stays on for everything else — walking, sleeping, daily activities. The boot protects your tendon; exercises strengthen it safely.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Intrinsic foot work (Start Week 6)",
                    description: "Simple exercises for foot awareness.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Toe spreading** — helps with proprioception and foot awareness",
                                "**Short foot exercises** — activates foot muscles",
                                "**Why it matters**: Your foot feels strange after being in a boot — these exercises help restore awareness",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Important",
                    content:
                        "**Do not start exercises before Week 6** without your clinician's explicit approval. Your tendon needs time to begin healing before you start loading it. Always check with your clinician before starting exercises. Exercises must be done with foot pointed down — this is the safe position.",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Weight-Bearing Progress",
            content: [
                {
                    type: "text",
                    content:
                        "Weight-bearing means putting weight through your injured foot. This happens gradually — you don't go from non-weight-bearing to full weight overnight. For detailed information about weight-bearing progression schedules and protocols, see [Boot Progression Protocol](/standard/boot-progression-protocol).",
                },
                {
                    type: "card",
                    title: "Why gradual progression matters",
                    description: "Understanding the force difference.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "When you walk, force goes through your Achilles tendon. The difference between walking in a boot and walking without one is dramatic:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Walking in boot**: ~1x body weight through tendon — this is manageable for a healing tendon",
                                "**Walking without boot**: ~3.2x body weight through tendon — this is **3.2 times more force**",
                                "**The transition**: Your tendon needs time to strengthen before it can handle full walking forces",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "This is why gradual progression matters. Your boot protects your tendon by reducing the force from 3.2x to 1x body weight. As your tendon heals and strengthens, you gradually transition from boot to shoes, giving your tendon time to adapt to increasing forces.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Improving Your Gait (Walking Pattern)",
            content: [
                {
                    type: "text",
                    content:
                        "Your walking pattern (gait) matters. A good gait protects your tendon, prevents other injuries, and helps you recover faster. A poor gait can cause back pain, hip pain, and slow your recovery. **Important:** Your boot adds 3-5cm of height to one leg, creating uneven hips. Use an **EVENup shoe leveler** on your uninjured foot to maintain proper alignment and prevent back, hip, and knee pain.",
                },
                {
                    type: "card",
                    title: "What good gait looks like",
                    description: "The pattern to aim for.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heel strikes first** — your heel touches the ground before your toes",
                                "**Roll through the foot** — weight moves from heel to toe smoothly",
                                "**Push off with toes** — use your toes to propel forward",
                                "**Even steps** — both legs take similar-sized steps",
                                "**Upright posture** — stand tall, don't lean to one side",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Common mistakes to avoid",
                    description: "What not to do.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Walking on toes** — putting weight only on the front of your foot",
                                "**Limping heavily** — favoring the injured leg too much",
                                "**Skipping heel strike** — avoiding putting your heel down",
                                "**Uneven steps** — taking tiny steps with injured leg, big steps with good leg",
                                "**Leaning away** — shifting weight to avoid using the injured leg",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why this matters:** Poor gait patterns can become habits that are hard to break. They also put stress on other parts of your body (back, hips, knees) and can slow tendon healing.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What Comes Next: Phase 2 and Phase 3",
            content: [
                {
                    type: "text",
                    content:
                        "You're currently in **Phase 1: Protection** (weeks 0-8). As you build strength, you're preparing for **Phase 2: Transition** (weeks 8-12) and eventually **Phase 3: Capacity** (weeks 12-26).",
                },
                {
                    type: "card",
                    title: "Learn more about Phase 2 and Phase 3",
                    description: "Detailed goals and progression.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "For detailed information about Phase 2 and Phase 3 goals (strength targets, balance, gait progression), see the physiotherapy lessons coming up. Those lessons cover the complete goals in detail.",
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
                                "**Feeling unsteady** when first putting weight on your foot — this improves with practice",
                                "**Mild discomfort** when walking — some pain is expected",
                                "**Swelling after walking** — your foot may swell more after activity",
                                "**Tiredness** — walking with crutches and a boot is exhausting",
                                "**Stiffness** — your ankle has been immobilized, stiffness is normal",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        '**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, severe pressure in boot, or fever with spreading redness.',
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
                        '**Exercises:** "When can I start Phase 1 exercises? What should I do?"',
                        '**Weight-bearing:** "When can I start putting weight on my foot? What\'s my protocol?"',
                        '**Gait:** "Is my walking pattern okay? What should I focus on?"',
                        '**Phase 2:** "When will I start Phase 2? What should I prepare for?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
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
                        "**Start Phase 1 exercises at Week 6** — seated calf raises build strength safely",
                        "**Follow weight-bearing protocol** — don't rush ahead",
                        "**Focus on good gait** — heel-to-toe pattern, use EVENup to prevent back/hip pain",
                        "**Understand Phase 2 goals** — know what you're working toward",
                        "**Be patient** — strength builds gradually",
                    ],
                },
            ],
        },
    ],
};
