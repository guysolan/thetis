import type { SectionContent } from "@/components/course/types";
import PrePhysioPrep from "../../../assets/pre-physio-prep.png";

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
            title: "Understanding Physiotherapy",
            content: [
                {
                    type: "image",
                    src: PrePhysioPrep,
                    alt: "Educational diagram showing what physiotherapy involves for Achilles rupture recovery: assessment, exercises, manual therapy, education, and progress tracking",
                    caption:
                        "Physiotherapy helps rebuild strength, mobility, balance, and function after Achilles rupture",
                },
                {
                    type: "text",
                    content:
                        "Physiotherapy (physio) is where you rebuild what the injury took away: strength, mobility, balance, and function. Think of it like **rebuilding a house** — the boot phase was the foundation, physio is building the walls and roof.",
                },
                {
                    type: "card",
                    title: "What physio involves",
                    description: "What to expect.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Assessment** — evaluating your strength, mobility, and function",
                                "**Exercises** — specific exercises to rebuild strength and mobility",
                                "**Manual therapy** — hands-on techniques to improve movement",
                                "**Education** — learning about your recovery and how to help yourself",
                                "**Progress tracking** — monitoring your improvement over time",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why physio matters",
                    description: "It's essential for recovery.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your tendon heals on its own, but your muscles, balance, and movement patterns don't. Physio helps you rebuild these. Without physio, you may heal but never regain full function. With physio, you maximize your recovery potential.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Rebuilds strength** — muscles weaken during immobilization",
                                "**Restores mobility** — ankle stiffness needs addressing",
                                "**Improves balance** — balance is often affected",
                                "**Corrects movement patterns** — prevents bad habits",
                                "**Guides progression** — ensures you progress safely",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple analogy",
                    content:
                        "Think of physio like **learning to drive again** after not driving for months. You know how to drive, but you're rusty. A driving instructor (physiotherapist) helps you remember the skills, correct bad habits, and build confidence. You still do the work, but they guide you.",
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
