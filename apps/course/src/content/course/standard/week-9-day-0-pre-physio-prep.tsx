import type { SectionContent } from "@/components/course/types";
import RehabProtocolTimeline from "../../../assets/rehab-protocol-timeline.png";
import Phase1ExercisesOverview from "../../../assets/phase-1-exercises-overview.png";
import ExerciseLoadProgression from "../../../assets/exercise-load-progression.png";

export const metadata = {
    slug: "week-9-day-0-pre-physio-prep",
    title: "Preparing for Physiotherapy",
    description:
        "What physio will involve, finding the right physiotherapist, and gentle exercises",
    week: 9,
    day: 0,
    section_number: 14,
};

export const content: SectionContent = {
    intro:
        "By Week 9, you're likely preparing for physiotherapy — the next phase of your recovery. Physio is where you rebuild strength, mobility, and function. It's exciting but can also feel daunting. This lesson explains what to expect, how to find the right physiotherapist, and what you can start doing now.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Pre-physio preparation",
            items: [
                {
                    text:
                        "Start finding a physiotherapist — look for someone experienced with Achilles ruptures",
                },
                {
                    text:
                        "Begin gentle exercises if allowed — ankle pumps, gentle movements",
                },
                {
                    text:
                        "Prepare questions — what to expect, how often, what to bring",
                },
                {
                    text:
                        "Check insurance/referrals — ensure you're covered and have referrals if needed",
                },
                {
                    text:
                        "Set realistic expectations — physio is a process, not a quick fix",
                },
            ],
        },
        {
            type: "section",
            title: "Phase 1 Exercises: What You Should Have Done",
            content: [
                {
                    type: "text",
                    content:
                        "During the immobilization period (weeks 0-6), you should have been doing exercises to build strength while your tendon heals. By Week 9, you're either continuing these exercises or catching up if you haven't started yet. This section reviews what Phase 1 exercises involve and why they matter.",
                },
                {
                    type: "image",
                    src: Phase1ExercisesOverview,
                    alt: "Infographic showing Phase 1 exercises: seated calf raise progression, load progression from 10kg to body weight, standing progression from weeks 8-10, and intrinsic foot work",
                    caption:
                        "Phase 1 exercises overview: what you should have done during immobilization and can continue doing",
                },
                {
                    type: "image",
                    src: ExerciseLoadProgression,
                    alt: "Infographic showing exercise load progression: seated calf raise with load, force through tendon at different angles, target of 1.5x body weight for walking readiness",
                    caption:
                        "Exercise load progression: building strength safely with progressive loading",
                },
                {
                    type: "card",
                    title: "Seated calf raise progression",
                    description: "The foundation of Phase 1 exercises.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Seated calf raises are done with your boot removed (boot stays on for everything else). You start light and gradually increase the load:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Week 2-3**: Start with body weight or leg weight only — get used to the movement",
                                "**Week 3+**: Add load gradually — start with 10-15kg on your knee, progress to 0.8-1x body weight",
                                "**Position**: Foot in plantarflexion (pointed down) — this is the safe position, cannot re-rupture",
                                "**Target**: Build up to holding body weight in plantarflexion position",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These exercises are done **out of boot** (boot removed for exercises only). The boot protects your tendon for everything else — walking, sleeping, daily activities.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Standing progression (Weeks 8-10)",
                    description: "Moving from seated to standing.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Once you can hold ~50% body weight seated, you progress to standing exercises:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with two feet** — standing isometric holds for safety",
                                "**Prevent collapse** — avoid letting your foot fall into dorsiflexion (toes up)",
                                "**Target**: Hold body weight in plantarflexion position (isometric)",
                                "**Challenge**: This is achievable for many, but challenging for heavier individuals",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Intrinsic foot work",
                    description: "Starting from Week 2.",
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
                        "These exercises are done **out of boot** but in a **safe position** (plantarflexion). Your boot stays on for everything else. If you haven't started these exercises yet, it's not too late — begin now with guidance from your clinician or physiotherapist.",
                },
            ],
        },
        {
            type: "section",
            title: "Complete Rehabilitation Protocol Reference",
            content: [
                {
                    type: "text",
                    content:
                        "You first saw the rehabilitation protocol table in [Week 2 Day 4](/standard/week/2/day/4) when you started Phase 1 exercises. As you prepare for physiotherapy, here's the complete protocol again for reference. This is your **source of truth** for understanding what each phase involves, what exercises to do, and what outcomes to aim for.",
                },
                {
                    type: "image",
                    src: RehabProtocolTimeline,
                    alt: "Educational infographic showing the four phases of rehabilitation: Phase 1 Immobilization (weeks 0-6), Phase 2 Post-immobilization (weeks 6-12), Phase 3 Single leg capacity (weeks 12-18), Phase 4 Power and return to sport (weeks 18+)",
                    caption:
                        "The four phases of recovery: you've completed Phase 1, entering Phase 2",
                },
                {
                    type: "rehab-protocol-table",
                },
                {
                    type: "text",
                    content:
                        "You've completed **Phase 1 (Immobilization Period)** and are now preparing for **Phase 2 (Post-Immobilization Period)**. This protocol shows the progression through all phases. Your physiotherapist will guide you through Phase 2 and beyond, but understanding the full picture helps you see where you're going and why each phase matters.",
                },
            ],
        },
        {
            type: "section",
            title: "When to Start Physiotherapy",
            content: [
                {
                    type: "text",
                    content:
                        "Timing varies by protocol. Some start as early as Week 3-6, others wait until boot removal (Week 10-12). Your clinician will tell you when to start.",
                },
                {
                    type: "card",
                    title: "Typical timing",
                    description: "When physio usually starts.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Early physio:** Week 3-6 (while still in boot)",
                                "**Standard timing:** Week 10-12 (after boot removal)",
                                "**Your protocol:** Follow your clinician's specific guidance",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Early physio (Week 3-6) focuses on gentle movements and exercises you can do in the boot. Standard physio (Week 10-12) starts after boot removal and focuses on rebuilding strength and mobility. Both approaches can be effective — follow your clinician's protocol.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Signs you might be ready",
                    description: "What clinicians look for.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Healing progressing** — tendon healing well, no complications",
                                "**Pain manageable** — pain is controlled, not severe",
                                "**Time since injury** — typically week 3-6 for early, week 10-12 for standard",
                                "**Clinical assessment** — your clinician confirms you're ready",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Finding the Right Physiotherapist",
            content: [
                {
                    type: "text",
                    content:
                        "Not all physiotherapists are the same. Finding someone experienced with Achilles ruptures makes a big difference. They'll know what to focus on, what to avoid, and how to progress you safely.",
                },
                {
                    type: "card",
                    title: "What to look for",
                    description: "Qualities of a good physiotherapist.",
                    variant: "highlight",
                    content: [
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
                    ],
                },
                {
                    type: "card",
                    title: "How to find one",
                    description: "Where to look.",
                    variant: "muted",
                    content: [
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
                    type: "tip",
                    title: "Questions to ask",
                    content:
                        "When you find a potential physiotherapist, ask: 'How many Achilles rupture patients have you treated?' 'What's your approach to this injury?' 'How often will I need to come?' 'What should I expect in the first few sessions?' Their answers will help you decide if they're right for you.",
                },
            ],
        },
        {
            type: "section",
            title: "Gentle Exercises You Can Start Now",
            content: [
                {
                    type: "text",
                    content:
                        "Before formal physio starts, you may be able to do some gentle exercises. **Always check with your clinician first** — what's safe depends on your protocol and healing progress.",
                },
                {
                    type: "card",
                    title: "Ankle pumps",
                    description: "Simple movement exercise.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Ankle pumps are gentle up-and-down movements of your ankle. They help with circulation and maintain some mobility.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**How:** Point toes up, then point toes down, repeat",
                                "**When:** If your protocol allows, usually safe from week 2-3",
                                "**Frequency:** 10-20 repetitions, several times a day",
                                "**Important:** Don't force, keep it gentle",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Other gentle exercises",
                    description: "What might be safe.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ankle circles** — gentle circular movements (if protocol allows)",
                                "**Toe movements** — wiggling toes, spreading toes",
                                "**Knee bends** — bending and straightening your knee",
                                "**Hip movements** — gentle hip exercises to maintain strength",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Always check with your clinician before starting any exercises.** What's safe depends on your specific protocol, healing progress, and whether you had surgery. Don't assume an exercise is safe just because it's gentle.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "If your protocol allows ankle pumps, do them while watching TV or reading. Set a timer for every hour, do 10 pumps. This simple habit maintains circulation and mobility with minimal effort. Small consistent actions add up to big results.",
                },
            ],
        },
        {
            type: "section",
            title: "What to Expect in Your First Physio Session",
            content: [
                {
                    type: "text",
                    content:
                        "Your first physio session is usually an assessment — they'll evaluate where you are and create a plan. Knowing what to expect reduces anxiety.",
                },
                {
                    type: "card",
                    title: "What happens",
                    description: "Typical first session.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Questions** — about your injury, recovery so far, goals",
                                "**Assessment** — checking strength, mobility, balance",
                                "**Examination** — looking at your foot, ankle, leg",
                                "**Plan** — discussing what you'll work on together",
                                "**First exercises** — usually simple exercises to start",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What to bring",
                    description: "Prepare for your first session.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your boot** — if you're still wearing it",
                                "**Comfortable clothes** — shorts or loose pants",
                                "**List of questions** — write them down beforehand",
                                "**Insurance/referral** — if required",
                                "**Any imaging** — if you have copies of scans",
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
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling nervous** about physio — it's normal to feel uncertain",
                                "**Stiffness** — your ankle is still immobilized, stiffness is expected",
                                "**Weakness** — muscles are weaker from disuse",
                                "**Wondering if you're ready** — it's normal to question timing",
                                "**Difficulty finding a physio** — good ones can be hard to find",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe pain** during exercises, **numb/blue/pale toes**, severe pressure/pain, fever with rapidly spreading redness, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Preparing for Physio",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Start looking early** — good physios can have waiting lists",
                        "**Check insurance** — ensure coverage before booking",
                        "**Prepare questions** — write them down so you don't forget",
                        "**Set realistic expectations** — physio is a process, not instant",
                        "**Be honest** — tell them about pain, limitations, concerns",
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
                                "You can help by: researching physiotherapists, helping with insurance/referrals, attending first session if helpful, providing transportation if needed, and supporting the process — physio can be challenging but it's essential for recovery.",
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
                        "**This week:** Continue preparing for physio, start gentle exercises if allowed",
                        "**Week 10:** We cover practical life (work, driving, social activities)",
                        "**Weeks 10-12:** Boot removal, transition to shoes",
                        "**After boot removal:** Physio typically intensifies, focus shifts to rebuilding",
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
                        '**Timing:** "When should I start physiotherapy? What\'s my protocol?"',
                        '**Finding a physio:** "Do you have any recommendations? What should I look for?"',
                        '**Exercises:** "Are there any gentle exercises I can do now? What should I avoid?"',
                        '**Expectations:** "What should I expect from physio? How long will it take?"',
                        '**Frequency:** "How often will I need to go? How many sessions?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Do I really need physiotherapy?",
                    answer:
                        "Yes. Your tendon heals on its own, but your muscles, balance, and movement patterns don't. Physio helps you rebuild these and maximize your recovery. Without physio, you may heal but never regain full function. It's essential, not optional.",
                },
                {
                    question: "What if I can't afford physiotherapy?",
                    answer:
                        "Talk to your clinician about options. Some clinics offer sliding scales, payment plans, or can help you find affordable options. Some exercises can be done at home with guidance. Don't skip physio entirely — it's too important. Explore all options before giving up.",
                },
                {
                    question: "Can I do physio exercises at home?",
                    answer:
                        "Yes, most physio involves exercises you do at home between sessions. Your physiotherapist will give you a home exercise program. Consistency with home exercises is often more important than frequency of clinic visits. Do your homework — it matters.",
                },
                {
                    question: "What if physio is painful?",
                    answer:
                        "Some discomfort is normal, especially as you start moving again. But severe pain is not normal — tell your physiotherapist. They can adjust exercises, reduce intensity, or modify the program. Good physio challenges you but doesn't cause severe pain.",
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
                        "**Physio is essential** — don't skip it, it's crucial for recovery",
                        "**Find the right person** — experience with Achilles ruptures matters",
                        "**Start preparing now** — good physios can have waiting lists",
                        "**Set realistic expectations** — physio is a process, be patient",
                    ],
                },
            ],
        },
    ],
};
