import type { SectionContent } from "@/components/course/types";
import ProperGaitPattern from "../../../assets/proper-gait-pattern.png";

export const metadata = {
    slug: "week-6-day-0-walking-progress",
    title: "Walking Progress & Night Splint",
    description:
        "Full weight-bearing, improving gait, and transitioning to night splint",
    week: 6,
    day: 0,
    section_number: 11,
};

export const content: SectionContent = {
    intro:
        "By Week 6, you're likely starting to put more weight through your foot. If you haven't already, you may be thinking about transitioning to a night splint for better sleep — many patients start using one from week 2-4 onwards. This is progress — you're moving from survival mode toward recovery mode. You will get through this, and each step forward builds on the last.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Walking progress basics",
            items: [
                {
                    text:
                        "Follow your clinician's weight-bearing protocol — timing varies by protocol",
                },
                {
                    text:
                        "Start with partial weight-bearing if allowed — use crutches for support",
                },
                {
                    text:
                        "Focus on proper gait — heel-to-toe pattern, avoid limping if possible",
                },
                {
                    text:
                        "Use an EVENup shoe leveler on your uninjured foot — prevents back and hip pain from leg length difference",
                },
                {
                    text:
                        "Consider a night splint if sleeping is difficult — Thetis Night Splint is 200g vs 1.5kg+ for the boot",
                },
                {
                    text:
                        "Monitor for pain or swelling — these guide your progress pace",
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
                        "Weight-bearing means putting weight through your injured foot. This happens gradually — you don't go from non-weight-bearing to full weight overnight. Think of it like **learning to walk again** — you start with support, gradually increase, and your body adapts.",
                },
                {
                    type: "card",
                    title: "The weight-bearing progression",
                    description: "How you gradually increase weight.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Non-weight-bearing:** Foot doesn't touch the ground (weeks 0-2)",
                                "**Touch-down weight-bearing:** Foot touches ground but no weight (weeks 2-4)",
                                "**Partial weight-bearing:** Some weight, still using crutches (weeks 4-6)",
                                "**Full weight-bearing:** All your weight, may still use crutches for balance (weeks 6-8)",
                                "**Independent walking:** No crutches needed (weeks 8-10+)",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Timing varies significantly by protocol. Some protocols allow immediate weight-bearing as tolerated from day 1, others wait until week 4-6. Follow your clinician's specific instructions.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple analogy",
                    content:
                        "Think of weight-bearing like **testing a bridge** — you don't drive a truck over it on day one. You test it with a bicycle, then a car, then gradually increase. Your tendon is the bridge, and weight-bearing is the test. Start small, build up gradually.",
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
                    type: "image",
                    src: ProperGaitPattern,
                    alt: "Three-panel sequence showing correct gait pattern: 1) Heel strike - heel touches ground first, 2) Foot flat - full foot contact with weight rolling through, 3) Toe-off - only toes touching ground, pushing off",
                    caption:
                        "Proper gait pattern: heel-to-toe walking in three stages - heel strike, foot flat, toe-off",
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
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        'Practice walking slowly and deliberately. Count "one-two" as you step — heel down on "one", roll through on "two". This simple rhythm helps you focus on proper form. Do this for just 5 minutes a day, and your gait will improve faster.',
                },
            ],
        },
        {
            type: "section",
            title: "Transitioning to Night Splint",
            content: [
                {
                    type: "text",
                    content:
                        "Sleeping in a walking boot is uncomfortable. Many people struggle with it, especially as weeks pass. A night splint is a lighter alternative that maintains the correct foot angle while allowing better sleep.",
                },
                {
                    type: "card",
                    title: "What is a night splint?",
                    description: "A lighter alternative to the boot.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "A night splint is a lightweight device that holds your foot in the correct position (pointed down) while you sleep. It's much lighter and more comfortable than a walking boot, but still protects your tendon.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Lightweight** — Thetis Night Splint is 200g (90% lighter than a 1.5kg+ boot)",
                                "**More comfortable** — less bulk, better airflow, open design",
                                "**Maintains angle** — keeps your foot in 30° plantarflexion (correct healing position)",
                                "**Better sleep** — many people sleep much better",
                                "**Can shower in it** — unlike the boot",
                                "**Not for walking** — only for sleeping/resting, still need boot during day",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "When can you use a night splint?",
                    description: "Timing varies by protocol.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Non-surgical treatment:** Typically from week 2-4 onwards (when you get your boot)",
                                "**Surgical treatment:** After 2 weeks post-surgery to allow wound healing",
                                "**Must be Achilles-specific** — Thetis Night Splint is purpose-designed for Achilles rupture",
                                "**Check with your clinician** — they'll confirm when it's safe for you",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Critical:** Do NOT use a generic 'night splint' designed for plantar fasciitis. These hold your foot in dorsiflexion (toes up), which is the OPPOSITE of what you need and could seriously damage your healing tendon. Only use a splint specifically designed for Achilles rupture, like the Thetis Night Splint.",
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Some protocols require 24/7 boot wear and don't allow night splints. Others encourage night splints for better sleep. Follow your clinician's specific instructions — they know your healing progress.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Why night splints help",
                    content:
                        "Sleep is when your body heals. If you're not sleeping well because of the boot, you're not healing as well as you could be. A night splint lets you sleep better while still protecting your tendon. Better sleep = better healing.",
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
                                "**Difficulty sleeping** — the boot is uncomfortable, this is why night splints help",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe pain** that doesn\'t improve with rest, **numb/blue/pale toes**, severe pressure/pain in the boot, fever with rapidly spreading redness, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Walking Easier",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Start slow** — begin with short distances, gradually increase",
                        "**Use crutches properly** — they're there to help, not hinder",
                        "**Rest between walks** — don't push through fatigue",
                        "**Elevate after walking** — helps reduce swelling",
                        "**Practice good form** — focus on heel-to-toe pattern",
                        "**Use EVENup shoe leveler** — attach to your uninjured foot's shoe to match boot height and prevent back/hip pain",
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
                                "You can help by: encouraging proper gait (gentle reminders about heel-to-toe), helping with night splint fitting, keeping paths clear for practice walks, and being patient — learning to walk again takes time and can be frustrating.",
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
                        "**This week:** Continue progressive weight-bearing, practice good gait",
                        "**Week 7:** We cover managing common challenges (swelling, skin care, mental health)",
                        "**Weeks 7-8:** Continue weight-bearing progress, may reach full weight-bearing",
                        "**Weeks 8-10:** Final boot phase, preparing for boot removal",
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
                        '**Weight-bearing:** "When can I start putting weight on my foot? What\'s my protocol?"',
                        '**Crutches:** "How long should I use crutches? When can I reduce to one crutch?"',
                        '**Night splint:** "Can I use a night splint like the Thetis Night Splint? When is it safe to start?"',
                        '**Gait:** "Is my walking pattern okay? What should I focus on?"',
                        '**Pain:** "How much pain is normal when walking? When should I worry?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "What if I accidentally put too much weight on my foot?",
                    answer:
                        "If it was just a moment and you didn't feel a pop or severe pain, you're probably fine. Rest, elevate, and monitor. If you felt a pop, severe pain, or something doesn't feel right, contact your clinician. When in doubt, err on the side of caution.",
                },
                {
                    question:
                        "How do I know if I'm ready for full weight-bearing?",
                    answer:
                        "Your clinician will tell you. They assess your healing progress, pain level, and how you're managing partial weight-bearing. Don't rush ahead — follow their guidance. Typically, you'll progress from partial to full weight-bearing over several weeks.",
                },
                {
                    question: "Can I drive if I'm weight-bearing?",
                    answer:
                        "This depends on which leg is injured, your clinician's guidance, and local laws. If it's your right leg (or left in countries with right-hand drive), you typically can't drive until you can walk without crutches. We cover driving in detail in Week 10.",
                },
                {
                    question: "What if I can't sleep with the boot on?",
                    answer:
                        "This is very common. Talk to your clinician about a night splint — many protocols allow this from week 2-4 (non-surgical) or week 2+ (surgical). The Thetis Night Splint is 200g (vs 1.5kg+ for the boot) and much more comfortable while still protecting your tendon. Better sleep = better healing.",
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
                        "**Follow your weight-bearing protocol** — don't rush ahead",
                        "**Focus on good gait** — heel-to-toe pattern matters, use EVENup to prevent back/hip pain",
                        "**Consider Thetis Night Splint** — 200g vs 1.5kg+ boot, better sleep helps healing",
                        "**Progress gradually** — slow and steady wins the race",
                    ],
                },
            ],
        },
    ],
};
