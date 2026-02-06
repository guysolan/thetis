import type { SectionContent } from "@/components/course/types";
import RunningFormWeek28 from "@/assets/running-form-week-28.png";
import WalkJogProgression from "@/assets/walk-jog-progression-v6.png";

export const metadata = {
    slug: "starting-to-run",
    title: "Starting to Run Again",
    description:
        "Walk-jog progression, proper technique, surface selection, and avoiding pitfalls",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 28, you're entering **Phase 4: Return to Sport**. Running is a major milestone — it means you're transitioning from building strength to building power and impact. But starting to run requires meeting strict criteria to protect your tendon.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Phase 4: Starting to run basics",
            items: [
                {
                    text:
                        "Meet Phase 3 exit criteria first — 25+ heel raises, pain-free walking, good balance",
                },
                {
                    text:
                        "Start with walk-jog progression — gradual transition from walking to running",
                },
                {
                    text:
                        "Choose safe surfaces — flat, soft surfaces initially",
                },
                {
                    text:
                        "Focus on proper technique — heel-to-toe pattern, short strides",
                },
                {
                    text:
                        "Progress gradually — don't rush, follow progression plan",
                },
                {
                    text:
                        "Listen to your body — stop if you have pain or concerns",
                },
            ],
        },
        {
            type: "section",
            title: "Are You Ready to Run?",
            content: [
                {
                    type: "text",
                    content:
                        "Running is **criteria-based, not time-based**. You must meet the exit criteria for **Phase 3: Capacity** before starting. Don't rush — running too early on a weak tendon is a leading cause of re-rupture.",
                },
                {
                    type: "card",
                    title: "Criteria for starting to run",
                    description: "What you need to achieve first.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**25+ single-leg heel raises** — gold standard strength test",
                                "**Pain-free walking** — can walk normally without pain",
                                "**Good balance** — single-leg balance 30+ seconds",
                                "**Confident stairs** — can go up and down stairs normally",
                                "**No limping** — walking pattern is normal",
                                "**Physio clearance** — your physio assesses readiness",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Don't start running until you meet these criteria.** Running too early risks re-rupture. Your physiotherapist will assess when you're ready.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Walk-Jog Progression: The Safe Way to Start",
            content: [
                {
                    type: "text",
                    content:
                        "**Walk-jog progression** is the safest way to start running. You gradually transition from walking to running, giving your tendon time to adapt.",
                },
                {
                    type: "image",
                    src: WalkJogProgression,
                    alt: "Walk-jog progression infographic showing three stages: Week 1-2 walk only (15-20 min), Week 3-4 walk-jog intervals (progressing from 1 min jog/4 min walk to 4 min jog/1 min walk), and Week 5+ continuous run (5-10 min)",
                    caption:
                        "Walk-jog progression: the safe way to start running, gradually transitioning from walking to continuous running",
                },
                {
                    type: "card",
                    title: "Week 1-2: Walk only",
                    description: "Building foundation.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Fast walking** — walk at brisk pace",
                                "**15-20 minutes** — build duration",
                                "**Focus on form** — proper heel-to-toe pattern",
                                "**No running yet** — build walking foundation first",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Week 3-4: Walk-jog intervals",
                    description: "Starting to run.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**Start with:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "1 minute jog, 4 minutes walk — repeat 3-4 times",
                                "Total: 15-20 minutes",
                                "3 times per week",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Progress to:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "2 minutes jog, 3 minutes walk",
                                "3 minutes jog, 2 minutes walk",
                                "4 minutes jog, 1 minute walk",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Week 5+: Continuous running",
                    description: "Building up.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with 5-10 minutes** continuous running",
                                "**Build gradually** — add 1-2 minutes per week",
                                "**Don't rush** — progress slowly",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Proper Running Technique",
            content: [
                {
                    type: "text",
                    content:
                        "**Proper running technique** reduces stress on your tendon and helps prevent injury. Focus on form, especially initially.",
                },
                {
                    type: "card",
                    title: "Key technique points",
                    description: "What to focus on.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Natural foot strike:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Aim for a neutral midfoot landing",
                                "Avoid landing heavily on your heel or excessively on your toes",
                                "Focus on a soft, controlled contact with the ground",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Short strides:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Take shorter strides initially",
                                "Higher cadence (steps per minute)",
                                "Reduces impact and stress on the Achilles",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Upright posture:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Keep your torso upright",
                                "Don't lean forward too much",
                                "Relaxed shoulders",
                            ],
                        },
                        {
                            type: "image",
                            src: RunningFormWeek28,
                            alt: "Grant demonstrating proper running form with controlled midfoot strike and short strides on grass surface",
                            caption:
                                "Proper running form: controlled midfoot strike with short, light strides",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Surface Selection: Where to Run",
            content: [
                {
                    type: "text",
                    content:
                        "**Surface selection matters.** Start with forgiving surfaces, progress to harder surfaces gradually.",
                },
                {
                    type: "card",
                    title: "Best surfaces to start",
                    description: "Safest options.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Grass** — soft, forgiving, low impact",
                                "**Dirt trails** — soft surface, natural",
                                "**Treadmill** — controlled, flat, can adjust speed",
                                "**Track** — flat, predictable surface",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Surfaces to avoid initially",
                    description: "What to be careful with.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Concrete** — hard surface, high impact",
                                "**Hills** — increases stress on tendon",
                                "**Uneven surfaces** — risk of falls",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progress to these gradually** — once you're comfortable with easy surfaces.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Common Pitfalls to Avoid",
            content: [
                {
                    type: "card",
                    title: "Pitfall 1: Starting too early",
                    description: "Not meeting criteria.",
                    variant: "warning",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Starting to run before meeting criteria (25+ heel raises, etc.).",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Increases re-rupture risk significantly.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Wait until you meet all criteria and get physio clearance.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Pitfall 2: Progressing too fast",
                    description: "Increasing too quickly.",
                    variant: "warning",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Jumping from walk-jog to long runs too quickly.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Sudden increases stress your tendon.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Follow progression plan, increase gradually (10% rule).",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Pitfall 3: Ignoring pain",
                    description: "Pushing through pain.",
                    variant: "warning",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Running through pain because you think it's normal.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Pain can indicate problems, pushing through risks injury.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Stop if you have pain, tell your physio, don't push through.",
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
                    title: "Usually normal when starting to run",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling out of breath** — your fitness has decreased",
                                "**Muscle soreness** — normal after running",
                                "**Some stiffness** — normal, especially initially",
                                "**Feeling slow** — you're rebuilding fitness",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, **unable to bear weight**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention).",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Running Work",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Meet Phase 3 criteria first** — don't start until you're ready",
                        "**Follow progression plan** — walk-jog intervals, build gradually",
                        "**Choose safe surfaces** — start with soft, flat surfaces",
                        "**Focus on form** — proper technique reduces stress",
                        "**Listen to your body** — stop if you have pain or concerns",
                        "**Be patient** — rebuilding running fitness takes time",
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
                                "You can help by: providing encouragement and support, understanding that rebuilding running takes time, celebrating progress, and being patient — running again is a gradual process.",
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
                        "**This week:** Start walk-jog progression if you meet Phase 3 exit criteria",
                        "**Week 30:** We cover life after Achilles rupture — long-term expectations and care",
                        "**Weeks 28-34:** Continue building running fitness gradually within Phase 4",
                        "**Next up:** You'll progress to **Plyometric Training** and eventually a full return to play",
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
                        '**Readiness:** "Am I ready to start running? Have I met the criteria?"',
                        '**Progression:** "What walk-jog progression should I follow?"',
                        '**Technique:** "Can you check my running form? What should I focus on?"',
                        '**Surfaces:** "What surfaces should I start with? When can I progress?"',
                        '**Concerns:** "I\'m worried about [specific concern]. Is this normal?"',
                        '**Timeline:** "How long until I can run continuously? How far?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I start running?",
                    answer:
                        "When you meet the criteria: 25+ single-leg heel raises, pain-free walking, good balance, confident stairs, and physio clearance. This is typically around 4-6 months, but it's criteria-based, not time-based. Don't rush — running too early risks re-rupture.",
                },
                {
                    question: "How long until I can run like before?",
                    answer:
                        "It varies, but rebuilding running fitness typically takes 2-3 months after you start. Be patient — you're rebuilding fitness and strength. Focus on gradual progression rather than timelines.",
                },
                {
                    question: "What if running causes pain?",
                    answer:
                        "Some muscle soreness is normal, but severe pain is not. If running causes severe pain, stop and tell your physiotherapist. They can assess what's happening and modify your program. Don't push through severe pain.",
                },
                {
                    question: "Can I run on hills?",
                    answer:
                        "Not initially. Hills increase stress on your tendon. Start with flat surfaces, progress to gentle hills gradually once you're comfortable with flat running. Your physio will guide you on when hills are safe.",
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
                        "**Meet criteria first** — 25+ heel raises, pain-free walking, physio clearance",
                        "**Walk-jog progression** — gradual transition from walking to running",
                        "**Start with safe surfaces** — grass, dirt, treadmill, track",
                        "**Progress gradually** — don't rush, follow progression plan",
                    ],
                },
            ],
        },
    ],
};
