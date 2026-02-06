import type { SectionContent } from "@/components/course/types";
import Phase2Goals from "@/assets/phase-2-goals-option-v1.png";

export const metadata = {
    slug: "starting-physio",
    title: "Starting Physiotherapy",
    description:
        "First session expectations, early goals, and the importance of consistency",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "You've reached Week 11 — a major milestone. By now, you're likely starting physiotherapy or have just begun. This is where your recovery shifts from healing to rebuilding. It's exciting to finally be active again, but it can also feel overwhelming. This lesson explains what to expect in your first sessions, what **Phase 2: Transition** goals look like, and why consistency matters more than perfection.",
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
                        "Understand Phase 2 goals — know what you're working toward (Walking normally, basic balance, early strength)",
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
                            type: "text",
                            content:
                                "Your physiotherapist will conduct a comprehensive assessment to understand where you are in your recovery:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your story** — they'll ask about your injury, treatment (surgery vs non-surgical), recovery so far, any complications",
                                "**Strength testing** — checking calf strength using seated calf raises with weight on your knee (measuring how much force you can generate)",
                                "**Mobility assessment** — measuring ankle range of motion: [dorsiflexion](/standard/emergency-care) (toes up), [plantarflexion](/standard/emergency-care) (toes down)",
                                "**Calf muscle size** — comparing injured leg to uninjured leg (atrophy assessment)",
                                "**Balance** — standing balance, single-leg balance if safe",
                                "**Gait analysis** — observing how you walk (in boot if still wearing it, or in shoes), looking for limping or compensatory patterns",
                                "**Pain levels** — where it hurts, when it hurts, what makes it better or worse",
                                "**Confidence** — psychological readiness and fear levels",
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
                                "After the assessment, your physio will explain your personalized plan:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your starting exercises** — what you'll do in clinic and at home (detailed instructions in next lesson)",
                                "**Progression plan** — how exercises will get harder over time",
                                "**Frequency** — how often you'll come to clinic (typically 1-2x per week initially)",
                                "**Home program** — exercises to do between sessions (this is where most progress happens)",
                                "**Phase 2 goals** — what you're aiming for (Normal walking, 90% mobility, basic single-leg balance)",
                                "**Timeline** — how long Phase 2 typically takes (2-4 weeks)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "First session activities",
                    description: "What you might do.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Teaching proper walking technique** — if you're out of boot, learning heel-to-toe pattern",
                                "**Introducing gentle range of motion exercises** — ankle pumps, circles (if safe)",
                                "**Beginning isometric calf exercises** — seated calf raises with weight",
                                "**Setting up home exercise programme** — exercises to do daily",
                                "**Scheduling follow-up appointments** — typically weekly or bi-weekly",
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
            title: "Your Complete Recovery Roadmap",
            content: [
                {
                    type: "text",
                    content:
                        "Now that you're starting physiotherapy, it's important to understand where you are in the recovery journey. The four phases are: **Phase 1: Protection** (weeks 0-8), **Phase 2: Transition** (weeks 8-12), **Phase 3: Capacity** (weeks 12-26), and **Phase 4: Return to Sport** (weeks 26+). You're now entering Phase 2.",
                },
                {
                    type: "rehab-protocol-table",
                },
                {
                    type: "card",
                    title: "Where you are now",
                    description: "Understanding your current phase.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "You're now in **Phase 2: Transition** (weeks 8-12). You've completed Phase 1 (Protection), and now you're rebuilding the ability to walk normally and move your ankle freely. This is where active recovery begins.",
                        },
                    ],
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
                        "Looking at the table above, you can see what Phase 2 aims to achieve. Understanding your specific goals helps you see progress and stay motivated.",
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
                                "**15+ single-leg heel raises** — being able to do 15+ heel raises on your injured leg alone (target: 25+ for Phase 2 completion)",
                                "**1.4x body weight MVIC** — see explanation below",
                                "**1.2x body weight seated isotonic** — see explanation below",
                                "**Good balance** — standing on one leg comfortably, maintaining balance",
                                "**Protected to unprotected gait** — transitioning from protected walking (heel wedge, reduced step length) to normal walking",
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
                    title: "What is MVIC and isotonic strength?",
                    description: "Understanding the strength measurements.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "These strength targets might sound technical, but they're simple once explained:",
                        },
                        {
                            type: "text",
                            content:
                                "**MVIC (Maximum Voluntary Isometric Contraction)** — This measures how hard you can push without movement. You sit with weight on your knee, point your toes down as hard as you can, and hold. The 'isometric' part means your ankle doesn't move — you're just pushing against resistance. Think of it like pushing against a wall — you're exerting force, but nothing moves.",
                        },
                        {
                            type: "text",
                            content:
                                "**1.4x body weight MVIC target:** If you weigh 80kg, you should be able to push with 112kg of force (80 × 1.4 = 112). This is measured with special equipment at some physio clinics, or estimated by how much weight you can hold on your knee during a seated calf raise.",
                        },
                        {
                            type: "text",
                            content:
                                "**Isotonic exercise** — This is the opposite: movement with resistance. A seated calf raise where you lift your heel up and down with weight on your knee is isotonic — your ankle moves through a range of motion against resistance.",
                        },
                        {
                            type: "text",
                            content:
                                "**1.2x body weight seated isotonic target:** If you weigh 80kg, you should be able to do seated calf raises with 96kg on your knee (80 × 1.2 = 96). In practice, this means stacking weights (dumbbells, plates, or a weighted bag) on your thigh while doing calf raises.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why these numbers matter:** Walking puts about 1.5x your body weight through your Achilles with each step. These targets ensure your tendon is strong enough to handle walking safely. If you can push 1.4x body weight in a controlled seated position, your tendon can handle the forces of walking.",
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
                                "**Walking puts about 1.5x your body weight** through your Achilles tendon with each step. Your calf needs to be strong enough to handle this force safely. That's why the 1.4x body weight target matters — it ensures your tendon can handle walking without overstretching ([elongation](/standard/healing-process)).",
                        },
                        {
                            type: "text",
                            content:
                                "**Protected walking is crucial** — even after boot removal, your tendon needs protection. Using heel wedges, reduced step length, and partial weightbearing (if limping) protects the healing tendon until strength develops. Elongation can still happen in the first few weeks of walking — protected walking prevents this.",
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
                    alt: "Infographic showing Phase 2 rehabilitation goals: 25 single-leg heel raises, 1.4x body weight strength, good balance, and protected to unprotected gait transition",
                    caption:
                        "Phase 2 goals: what you're working toward in the Transition phase",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Safe Load: What Exercises Are Safe",
            content: [
                {
                    type: "text",
                    content:
                        "Not all exercises are safe at this stage. Your healing tendon can handle some types of loading, but not others. Understanding what's safe and what's not protects your tendon while still allowing strengthening.",
                },
                {
                    type: "card",
                    title: "Safe loading during early recovery",
                    description: "What your tendon can handle safely.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Safe: Isometric contraction with foot pointed down** — this means pushing your foot down (pointing your toes) against resistance while the ankle doesn't move. Examples: seated calf raises with weight, pressing foot down against resistance. This is safe because the tendon is in a shortened position and there's no stretching force.",
                        },
                        {
                            type: "text",
                            content:
                                "**Unsafe: Fast contraction with toes up** — this means any rapid movement or eccentric loading where your ankle bends upward (toes toward shin). Examples: hopping, jumping, running, fast walking without protection, quick stretching movements. This is unsafe because it puts rapid stretch forces through the healing tendon, which can cause [elongation](/standard/healing-process) or re-rupture.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why this matters",
                    description: "The science behind safe loading.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "During early recovery (Phase 1-2), your tendon is still healing and is vulnerable to [elongation](/standard/healing-process) — permanent lengthening that reduces function. **Controlled, slow loading in a shortened position** (foot pointed down) stimulates healing without overstretching. **Fast, eccentric loading** (toes up during movement) puts dangerous stretch forces on the tendon before it's strong enough.",
                        },
                        {
                            type: "text",
                            content:
                                "Think of it like a **rubber band that's been repaired** — you can gently squeeze it together (safe), but you shouldn't rapidly stretch it until it's fully healed (unsafe).",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Critical safety principle",
                    content:
                        "During Phase 2, avoid any exercise that involves rapid ankle movement with toes up (toes moving quickly toward shin). This includes hopping, jumping, running, or uncontrolled fast movements. Stick to controlled, isometric exercises with foot pointed down. Your physiotherapist will tell you when it's safe to progress to dynamic movements.",
                },
            ],
        },
        {
            type: "section",
            title: "Early Exercises: Overview",
            content: [
                {
                    type: "text",
                    content:
                        "Your first exercises in physio will be gentle but purposeful. They're designed to rebuild strength and mobility safely using the safe loading principles above. Detailed instructions on how to perform each exercise correctly are covered in the next lesson.",
                },
                {
                    type: "card",
                    title: "What you'll start with",
                    description: "Overview of early exercises.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Seated calf raises** — building strength safely using controlled, slow movements with foot pointed down (you may have started these in Phase 1)",
                                "**Balance exercises** — rebuilding proprioception and control (static positions, no rapid movements)",
                                "**Gait training** — learning proper walking technique with protected loading (if out of boot)",
                                "**Range of motion** — gentle, controlled ankle movements within safe ranges (if safe)",
                                "**Intrinsic foot work** — continuing from Phase 1",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Your exercises will be tailored to your specific needs, protocol, and progress. What you do depends on whether you're still in a boot, how strong you are, and what your clinician recommends. All exercises should follow the safe loading principle: controlled isometric work with foot pointed down, avoiding fast movements with toes up.",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Important",
                    content:
                        "Detailed exercise instructions with proper form, progression, and safety tips are covered in the next lesson. Don't compare yourself to others — your journey is unique.",
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
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, **fever with spreading redness**, or **severe swelling**.",
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
            title: "What's Next",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**This week:** Focus on consistency — do your exercises regularly, attend sessions",
                        "**Week 12:** Key Exercises — detailed instructions for all Phase 2 exercises (coming up)",
                        "**Week 13:** Walking Properly — re-learning proper gait pattern (coming up)",
                        "**Week 15:** Progressive Strengthening — entering **Phase 3: Capacity** (coming up)",
                        "**Weeks 12-26:** Continue building strength in Phase 3, working toward the 25+ heel raise milestone",
                        "**After Phase 3:** You'll move to **Phase 4: Return to Sport** (running and power training)",
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
                        "Phase 2 typically lasts 4-6 weeks (weeks 8-12 after injury). But progress varies — some people move faster, others slower. Focus on meeting criteria rather than timelines. Your physio will assess when you're ready for Phase 3.",
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
