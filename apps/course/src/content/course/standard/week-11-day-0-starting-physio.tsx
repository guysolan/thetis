import type { SectionContent } from "@/components/course/types";
import Phase2Goals from "../../../assets/phase-2-goals.png";

export const metadata = {
    slug: "week-11-day-0-starting-physio",
    title: "Starting Physiotherapy",
    description:
        "First session expectations, early goals, and the importance of consistency",
    week: 11,
    day: 0,
    section_number: 17,
};

export const content: SectionContent = {
    intro:
        "You've reached Week 11 — a major milestone. By now, you're likely starting physiotherapy or have just begun. This is where your recovery shifts from healing to rebuilding. It's exciting to finally be active again, but it can also feel overwhelming. You will get through this. This lesson explains what to expect in your first sessions, what Phase 2 goals look like, and why consistency matters more than perfection.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Starting physio basics",
            items: [
                {
                    text:
                        "Attend your first session — bring questions, your boot if still wearing it, comfortable clothes",
                },
                {
                    text:
                        "Understand Phase 2 goals — know what you're working toward (15 single-leg heel raises, balance, strength)",
                },
                {
                    text:
                        "Set up a home exercise routine — consistency at home matters more than clinic visits",
                },
                {
                    text:
                        "Track your progress — note what you can do, what's challenging, what's improving",
                },
                {
                    text:
                        "Communicate openly — tell your physio about pain, concerns, limitations",
                },
                {
                    text:
                        "Be patient — progress happens gradually, not overnight",
                },
            ],
        },
        {
            type: "section",
            title: "What Happens in Your First Physio Session",
            content: [
                {
                    type: "text",
                    content:
                        "Your first physio session is usually an assessment — they'll evaluate where you are now and create a plan for where you're going. Knowing what to expect reduces anxiety and helps you prepare.",
                },
                {
                    type: "card",
                    title: "The assessment",
                    description: "What your physio will check.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your story** — they'll ask about your injury, treatment, recovery so far",
                                "**Strength testing** — checking how strong your calf is (often seated calf raises with weight)",
                                "**Mobility** — how well your ankle moves (flexibility, range of motion)",
                                "**Balance** — standing balance, single-leg balance if possible",
                                "**Gait** — how you walk (in boot if still wearing it, or in shoes)",
                                "**Pain levels** — where it hurts, when it hurts, what makes it better or worse",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The plan",
                    description: "What you'll work on together.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "After the assessment, your physio will explain:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your starting exercises** — what you'll do in clinic and at home",
                                "**Progression plan** — how exercises will get harder over time",
                                "**Frequency** — how often you'll come to clinic",
                                "**Home program** — exercises to do between sessions",
                                "**Goals** — what you're aiming for in Phase 2",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Bring a notebook to your first session. Write down your exercises, how many reps, how often. Keep this notebook for all sessions — tracking what you do helps you see progress and ensures you do exercises correctly at home. This simple habit makes a huge difference.",
                },
            ],
        },
        {
            type: "section",
            title: "Phase 2 Goals: What You're Working Toward",
            content: [
                {
                    type: "text",
                    content:
                        "You're now in **Phase 2: Post-Immobilization Period** (weeks 6-12). This phase focuses on rebuilding strength, balance, and function. Understanding your goals helps you see the bigger picture and stay motivated.",
                },
                {
                    type: "card",
                    title: "The big goals",
                    description: "What Phase 2 aims to achieve.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**15 single-leg heel raises** — being able to do 15 heel raises on your injured leg alone",
                                "**1.4x body weight strength** — your calf can produce 1.4 times your body weight in force (measured as MVIC — maximum voluntary isometric contraction)",
                                "**Good balance** — standing on one leg comfortably, maintaining balance",
                                "**Protected to unprotected gait** — transitioning from walking carefully to walking normally",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These goals might sound daunting now, but they're achievable with consistent work. You don't need to hit them all immediately — progress happens gradually.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why these goals matter",
                    description: "The science behind Phase 2.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Think of Phase 2 like **rebuilding a bridge**. Your tendon has healed (the bridge is repaired), but now you need to strengthen it to handle normal traffic (walking, daily activities).",
                        },
                        {
                            type: "text",
                            content:
                                "**Walking puts about 1.5x your body weight** through your Achilles tendon with each step. Your calf needs to be strong enough to handle this force safely. That's why the 1.4x body weight target matters — it ensures your tendon can handle walking without overstretching.",
                        },
                        {
                            type: "text",
                            content:
                                "**Balance matters** because your injured leg has been protected for weeks. Your brain needs to relearn how to control that leg, and your muscles need to work together properly. Good balance prevents falls and helps you move confidently.",
                        },
                    ],
                },
                {
                    type: "image",
                    src: Phase2Goals,
                    alt: "Infographic showing Phase 2 rehabilitation goals: 15 single-leg heel raises, 1.4x body weight strength, good balance, and protected to unprotected gait transition",
                    caption:
                        "Phase 2 goals: what you're working toward in post-immobilization period",
                },
            ],
        },
        {
            type: "section",
            title: "Early Exercises: What to Expect",
            content: [
                {
                    type: "text",
                    content:
                        "Your first exercises in physio will be gentle but purposeful. They're designed to rebuild strength and mobility safely. Here's what you might start with:",
                },
                {
                    type: "card",
                    title: "Seated calf raises",
                    description: "Building strength safely.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "You may have started these during Phase 1. In Phase 2, you'll continue and progress:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start where you are** — if you can do body weight, great. If you need weight on your knee, that's fine too",
                                "**Progress gradually** — add weight slowly (5-10kg at a time)",
                                "**Target** — build up to 0.8-1x body weight",
                                "**Position** — foot in plantarflexion (pointed down) — this is the safe position",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Balance exercises",
                    description: "Rebuilding control.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Two-foot balance** — standing on both feet, shifting weight",
                                "**Single-leg balance** — standing on injured leg (if safe)",
                                "**Progressions** — eyes closed, on unstable surfaces (as you improve)",
                                "**Why it matters** — your brain needs to relearn how to control your leg",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Gait training",
                    description: "Learning to walk again.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "If you're out of your boot, your physio will help you walk properly:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Step length** — learning to take normal-sized steps",
                                "**Heel-to-toe** — walking heel first, then pushing off",
                                "**Symmetry** — making both legs work equally",
                                "**Speed** — gradually increasing walking speed",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Important",
                    content:
                        "Your exercises will be tailored to your specific needs, protocol, and progress. What you do depends on whether you're still in a boot, how strong you are, and what your clinician recommends. Don't compare yourself to others — your journey is unique.",
                },
            ],
        },
        {
            type: "section",
            title: "Why Consistency Matters More Than Perfection",
            content: [
                {
                    type: "text",
                    content:
                        "Here's the thing about physio: **showing up consistently matters more than doing everything perfectly**. Think of it like **brushing your teeth** — doing it every day is more important than brushing perfectly once a week.",
                },
                {
                    type: "card",
                    title: "The consistency principle",
                    description:
                        "Why regular practice beats occasional perfection.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Muscles adapt gradually** — they need regular stimulation to get stronger",
                                "**Your brain learns movement** — consistent practice helps your nervous system relearn control",
                                "**Tendon responds to load** — regular, appropriate loading helps the tendon strengthen",
                                "**Momentum matters** — doing exercises regularly keeps you engaged and motivated",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What consistency looks like",
                    description: "Practical tips for staying consistent.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Do your home exercises** — most physio happens at home, not in clinic",
                                "**Set a routine** — same time every day makes it a habit",
                                "**Start small** — better to do 5 minutes daily than 30 minutes once a week",
                                "**Track your progress** — seeing improvement motivates you to keep going",
                                "**Be flexible** — if you miss a day, don't give up — just get back to it",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Set a phone alarm for your exercises. Call it 'Tendon Time' or something positive. When it goes off, do your exercises — even if it's just 5 minutes. This simple habit ensures consistency without relying on willpower. Small daily actions compound into big results.",
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
                                "**Feeling nervous** about starting physio — it's normal to feel uncertain",
                                "**Some discomfort** during exercises — mild to moderate discomfort is expected",
                                "**Stiffness** — your ankle will feel stiff, especially in the morning",
                                "**Weakness** — your calf is still weak, that's why you're doing physio",
                                "**Feeling frustrated** — progress can feel slow, frustration is normal",
                                "**Good days and bad days** — some days you'll feel stronger than others",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** during exercises that doesn't ease — physio shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. **Numb/blue/pale toes** — circulation problems. **Fever with rapidly spreading redness** — possible infection. **Severe swelling** that doesn't improve with elevation.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Physio Work for You",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Set up a home exercise space** — clear area, comfortable surface, equipment ready",
                        "**Wear appropriate clothes** — shorts or loose pants, supportive shoes if out of boot",
                        "**Stay hydrated** — drink water before and after exercises",
                        "**Warm up gently** — light movement before exercises helps",
                        "**Cool down** — gentle stretching or movement after exercises",
                        "**Rest between sessions** — muscles need time to recover",
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
                                "You can help by: providing transportation to sessions if needed, helping set up home exercise space, encouraging consistency (gentle reminders, not nagging), celebrating small wins, understanding that progress takes time, and being patient — physio can be challenging and frustrating for the patient.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Common Challenges and How to Handle Them",
            content: [
                {
                    type: "card",
                    title: "Challenge: Exercises are too hard",
                    description: "What to do.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Tell your physio.** They can modify exercises, reduce intensity, or break them into smaller steps. Don't push through severe pain — that's not helpful.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Challenge: Exercises are too easy",
                    description: "What to do.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Tell your physio.** They can progress exercises, add difficulty, or introduce new challenges. But don't skip ahead on your own — progression needs to be safe.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Challenge: Can't find time",
                    description: "What to do.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Start with 5 minutes.** Even short sessions help. Do exercises while watching TV, during work breaks, or first thing in the morning. Consistency matters more than duration.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Challenge: Losing motivation",
                    description: "What to do.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Track your progress.** Write down what you can do now vs. what you could do last week. **Set small goals.** Instead of 'do 15 heel raises,' aim for 'do 3 more than last week.' **Remember why** — you're rebuilding your ability to walk, run, live normally. **Talk to your physio** — they can help you stay motivated.",
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
                        "**This week:** Focus on consistency — do your exercises regularly, attend sessions",
                        "**Week 12:** We cover the key exercises for this phase in detail",
                        "**Weeks 12-18:** Continue building strength, working toward Phase 2 goals",
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
                        '**Goals:** "What are my Phase 2 goals? How will we know I\'m progressing?"',
                        '**Frequency:** "How often should I come to clinic? How often should I do home exercises?"',
                        '**Pain:** "What level of discomfort is normal? When should I stop or modify exercises?"',
                        '**Progression:** "How will exercises get harder? What\'s the progression plan?"',
                        '**Timeline:** "How long will Phase 2 take? What happens after?"',
                        '**Home program:** "What exercises should I do at home? How do I know if I\'m doing them correctly?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How often should I go to physio?",
                    answer:
                        "Frequency varies by protocol and needs. Some go once a week, others twice a week initially. Most important is doing your home exercises consistently — that's where most of your progress happens. Your physiotherapist will recommend a schedule based on your needs.",
                },
                {
                    question: "What if I can't do the exercises?",
                    answer:
                        "Tell your physiotherapist. They can modify exercises, reduce difficulty, or break them into smaller steps. Everyone starts somewhere — don't compare yourself to others. Your physio will help you progress at your own pace.",
                },
                {
                    question: "How long will Phase 2 take?",
                    answer:
                        "Phase 2 typically lasts 6-12 weeks (weeks 6-12 after injury). But progress varies — some people move faster, others slower. Focus on consistent work rather than timelines. Your physio will assess when you're ready for Phase 3.",
                },
                {
                    question: "What if physio is painful?",
                    answer:
                        "Some discomfort is normal, especially as you start moving again. But severe pain is not normal — tell your physiotherapist immediately. They can adjust exercises, reduce intensity, or modify the program. Good physio challenges you but doesn't cause severe pain.",
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
                        "**Consistency beats perfection** — doing exercises regularly matters more than doing them perfectly",
                        "**Phase 2 goals are achievable** — 15 heel raises, 1.4x body weight strength, good balance — you can do this",
                        "**Communicate openly** — tell your physio about pain, concerns, challenges",
                        "**Progress happens gradually** — be patient, track your progress, celebrate small wins",
                    ],
                },
            ],
        },
    ],
};
