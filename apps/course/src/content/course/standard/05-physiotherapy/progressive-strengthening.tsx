import type { SectionContent } from "@/components/course/types";
import IsomOvercomingSeatedCalf from "@/assets/isom-overcoming-seated-calf.png";
import IsomYieldingStandingSeated from "@/assets/isom-yielding-standing-seated.png";
import HeelRaiseProgression from "@/assets/heel-raise-progression.png";

export const metadata = {
    slug: "progressive-strengthening",
    title: "Progressive Strengthening Begins",
    description:
        "Single-leg heel raises, seated calf strength, and resistance training",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 15, you're well into **Phase 3: Capacity** and making real progress. Your walking is improving, and you're building strength. Now it's time to focus on progressive strengthening — making your exercises harder systematically. This lesson covers single-leg heel raises, seated calf strength, and resistance training. These exercises build the strength you need for Phase 4 and beyond.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Progressive strengthening basics",
            items: [
                {
                    text:
                        "Master single-leg heel raises — work toward 15 reps on flat ground, this is the Phase 3 mid-point target",
                },
                {
                    text:
                        "Build seated calf strength — aim for 90% LSI (Limb Symmetry Index) or bodyweight targets (1.4x isometric, 1.2x isotonic)",
                },
                {
                    text:
                        "Progress resistance training — gradually increase weight and difficulty",
                },
                {
                    text:
                        "Track your progress — note reps, weight, how exercises feel",
                },
                {
                    text:
                        "Follow progression principles — don't rush ahead, progress systematically",
                },
                {
                    text:
                        "Communicate with your physio — tell them about progress and challenges",
                },
            ],
        },
        {
            type: "section",
            title: "Why Progressive Strengthening Matters",
            content: [
                {
                    type: "text",
                    content:
                        "Before diving into the exercises, it's important to understand **why** progressive strengthening is so critical in this phase. The answer: **preventing [tendon elongation](/standard/healing-process)** — the biggest obstacle to returning to sport and normal function.",
                },
                {
                    type: "card",
                    title: "Understanding tendon elongation",
                    description: "The biggest obstacle to recovery.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Everyone gets some elongation** after an Achilles rupture. The healing tendon becomes longer, and the muscle becomes shorter. This is the **biggest obstacle** to returning to sport and normal function — you can't get your power back if the tendon is elongated.",
                        },
                        {
                            type: "text",
                            content:
                                "**The goal:** Minimize elongation through proper strengthening. Strong tendon = less elongation = better outcomes. The exercises in this lesson help your physio track whether your tendon is maintaining its length and developing the right stiffness.",
                        },
                        {
                            type: "text",
                            content:
                                "**Critical window:** The first 16 weeks after injury. During this time, the muscle-tendon unit is most responsive to loading. While structural elongation (lengthening) of the tendon is generally permanent, you can significantly improve tendon **stiffness** and muscle **strength** to compensate. This is why progressive strengthening matters so much right now.",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    content:
                        "**Good news:** Your tendon is malleable — it can improve with the right loading over time. Consistent strengthening work now prevents elongation later. Every exercise session is protecting your tendon and improving your outcome.",
                },
            ],
        },
        {
            type: "section",
            title: "Single-Leg Heel Raises: The Phase 3 Target",
            content: [
                {
                    type: "text",
                    content:
                        "Single-leg heel raises are a **key test** for Phase 3. Being able to do **15 repetitions** on flat ground shows your calf is strong enough for normal walking and daily activities. This is the milestone that shows you're ready for more advanced Phase 3 work.",
                },
                {
                    type: "card",
                    title: "Why 15 reps matters",
                    description: "The science behind the target.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**15 reps indicates functional strength** — your calf can produce enough force for normal walking and daily activities. This is the interim target within Phase 3 that shows you're ready for Stage 4 preparation.",
                        },
                        {
                            type: "text",
                            content:
                                "**It's a functional test** — if you can do 15 single-leg heel raises on flat ground, your calf has the strength needed for protected walking and progressing to more advanced work.",
                        },
                        {
                            type: "text",
                            content:
                                "**It's achievable** — this isn't an impossible goal. With consistent work, most people reach this target during Phase 3.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Heel Raise Progression Pathway",
                    description:
                        "Building from double-leg to weighted single-leg.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Heel raises progress from basic to advanced. Follow this pathway to build strength systematically:",
                        },
                        {
                            type: "image",
                            src: HeelRaiseProgression,
                            alt: "Four-panel progression showing heel raise exercises: double-leg floor, single-leg floor, single-leg deficit, weighted single-leg deficit",
                            caption:
                                "Heel raise progression: from double-leg to weighted single-leg deficit",
                        },
                        {
                            type: "text",
                            content: "**Progression order:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Double-leg floor** — Start here, build to 3 sets of 25 reps",
                                "**Single-leg floor** — Progress when double-leg is easy, build to 3 sets of 15 reps",
                                "**Single-leg deficit** — Add step/platform when single-leg floor is easy, build to 3 sets of 15 reps",
                                "**Weighted single-leg deficit** — Add weight when deficit is easy, aim for 3-4 sets of 6-15 reps",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Don't skip steps. Master each level before progressing to the next. Your physio will guide you on when to progress.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to progress to 15 reps",
                    description: "Building up gradually.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Start where you are**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Even doing 1-2 reps is progress",
                                "Don't compare yourself to others",
                                "Track your own progress",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Build gradually**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Add 1-2 reps per week if possible",
                                "Focus on quality over quantity",
                                "Rest between sets",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Use support initially**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Hold onto wall or chair for balance",
                                "Reduce support as you get stronger",
                                "Eventually do them without support",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Be patient**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Progress takes time",
                                "Some weeks you'll add reps, some you won't",
                                "Consistency matters more than speed",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Seated Calf Raises: Building Strength Safely",
            content: [
                {
                    type: "text",
                    content:
                        "Seated calf raises are a **key exercise** for Phase 3. They allow you to load your calf safely while building the strength needed for walking and standing exercises. Your physio will track your progress using specific force targets.",
                },
                {
                    type: "card",
                    title: "Phase 3 strength targets",
                    description: "Two ways to measure your progress.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**1. Limb Symmetry Index (LSI):** The most practical target. Aim for **90% strength** in your injured leg compared to your healthy leg. If your healthy leg can push 100kg, your injured leg should target 90kg.",
                        },
                        {
                            type: "text",
                            content:
                                "**2. Bodyweight Multipliers:** Used if your physio has force plates. **Isometric target:** 1.4x body weight MVIC (maximum voluntary isometric contraction — how hard you can push). **Isotonic target:** 1.2x body weight seated isotonic.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why these targets:** Whether using LSI or bodyweight, these goals ensure your tendon has the stiffness needed to handle walking loads and prevent elongation.",
                        },
                        {
                            type: "image",
                            src: IsomOvercomingSeatedCalf,
                            alt: "Grant performing seated calf raise exercise with weight on his knees, foot pointed down on force plate platform",
                            caption:
                                "Seated calf raise: building toward Phase 3 strength targets",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How seated calf raises work",
                    description: "Understanding the exercise.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Isometric:** You push down as hard as you can and hold for 5 seconds. Your physio may measure this with force plates to track your progress objectively.",
                        },
                        {
                            type: "text",
                            content:
                                "**Isotonic:** You lift weight through full range of motion. Start with weight on your knee, progress gradually toward your target.",
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Start with 10-15kg on your knee initially, progress gradually. Work toward 0.8-1x your body weight, then continue toward Phase 3 targets (1.4x BW isometric, 1.2x BW isotonic) before progressing to standing exercises.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Progression Principles: How to Know When to Progress",
            content: [
                {
                    type: "text",
                    content:
                        "Knowing when to progress is crucial. Progress too fast and you risk injury. Progress too slow and you delay recovery. Here are the principles that guide safe progression.",
                },
                {
                    type: "card",
                    title: "Signs you're ready to progress",
                    description: "When to make exercises harder.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**You can do all reps easily** — if 15 reps feels easy, it's time to add difficulty",
                                "**No pain during exercise** — exercises should challenge you but not cause pain",
                                "**Good form maintained** — you can do exercises with proper technique",
                                "**Consistent performance** — you can do the exercise consistently, not just on good days",
                                "**Your physio says so** — they'll assess when you're ready",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to progress safely",
                    description: "Ways to make exercises harder.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Add weight** — increase resistance gradually (5-10kg at a time)",
                                "**Increase reps** — go from 10 to 15, then 20",
                                "**Increase sets** — add a third set",
                                "**Reduce support** — hold onto wall with one hand instead of two",
                                "**Add difficulty** — progress from two-foot to single-leg",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Progress one thing at a time.** Don't add weight AND increase reps AND reduce support all at once. Make one change, see how it feels, then progress further.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Resistance Training: Adding Weight and Difficulty",
            content: [
                {
                    type: "text",
                    content:
                        "As you get stronger, you need to add resistance to continue building strength. This is the **progressive overload principle** — to get stronger, you need to gradually increase the challenge.",
                },
                {
                    type: "card",
                    title: "How to add resistance",
                    description: "Ways to make exercises harder.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**For seated calf raises:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Add weight on your knee — start with 10-15kg, progress gradually",
                                "Target: build up to 0.8-1x your body weight",
                                "Stage 2 targets: 1.4x body weight MVIC (isometric), 1.2x body weight isotonic",
                                "Progress when you can do exercises easily with good form",
                            ],
                        },
                        {
                            type: "image",
                            src: IsomOvercomingSeatedCalf,
                            alt: "Grant performing seated calf raise exercise with weight on his knees, foot pointed down on force plate platform",
                            caption:
                                "Seated calf raise: building toward advanced strength targets",
                        },
                        {
                            type: "text",
                            content: "**For standing exercises:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Reduce support — hold with one hand instead of two",
                                "Progress to no support",
                                "Add weight (backpack, weight vest) when ready",
                            ],
                        },
                        {
                            type: "image",
                            src: IsomYieldingStandingSeated,
                            alt: "Grant performing standing isometric calf holds, showing progression from double-leg to single-leg with foot pointed down and up",
                            caption:
                                "Isometric holds: progressing from double-leg to single-leg",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Finding the right challenge level",
                    description: "The Goldilocks zone.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Too easy** — if you can do 20+ reps easily, it's time to add difficulty.",
                        },
                        {
                            type: "text",
                            content:
                                "**Too hard** — if you can only do 1-2 reps, it's too difficult. Reduce the challenge.",
                        },
                        {
                            type: "text",
                            content:
                                "**Just right** — 8-15 reps is the sweet spot. You should be able to complete all reps with good form, but it should be challenging.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Advanced Testing: Understanding Your Physio's Measurements",
            content: [
                {
                    type: "text",
                    content:
                        "As you progress, your physio may use advanced equipment to measure your strength objectively. Understanding these tests helps you see your progress in numbers and understand why they matter for preventing elongation.",
                },
                {
                    type: "card",
                    title: "ISOM Overcoming: Maximum Strength Test",
                    description: "How physios measure your maximum strength.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your physio may measure your strength using **force plates** (ISOM overcoming test). You sit with your foot on the force plate and push down as hard as you can for 5 seconds. The force plate measures exactly how much force you produce.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** This objective measurement tracks your progress over time. You can see your strength improving in numbers — for example, going from 1.2x body weight to 1.8x body weight over several weeks shows clear progress.",
                        },
                        {
                            type: "text",
                            content:
                                "**Target goals (with bent knee, seated):**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**LSI target:** 90% symmetry compared to uninjured leg",
                                "**Phase 3 BW target:** 1.4x body weight MVIC (seated, foot pointed down)",
                                "**Phase 4 BW target:** 2.0x body weight MVIC (seated, foot pointed down)",
                                "**Note:** These are long-term goals — work toward them gradually over months, not weeks",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These are long-term goals — work toward them gradually over months, not weeks. The most important thing is consistent progression, not hitting specific numbers on a particular timeline.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "ISOM Yielding: Holding Strength Test",
                    description: "How physios test your control and stability.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**ISOM yielding** tests your ability to hold a position against resistance. You rise up onto your toes, then hold that position with weight on your shoulders (like a barbell). You're preventing yourself from yielding (collapsing) under the load.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** This tests your ability to maintain a position under load — crucial for walking, running, and jumping. Unlike ISOM overcoming (maximum push), this tests your control and stability.",
                        },
                        {
                            type: "text",
                            content:
                                "**What it measures:** Your ability to hold a position under load — crucial for walking, running, and jumping. This tests control and stability, unlike ISOM overcoming which tests maximum push.",
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Start with double-leg holds with foot pointed down → progress to single-leg → gradually add toes-up positions as you advance. Your physio will guide you on specific targets based on your goals.",
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
                    title: "Usually normal during strengthening",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Muscle fatigue** — feeling tired after exercises is normal",
                                "**Some discomfort** — mild to moderate discomfort is expected",
                                "**Progress feels slow** — strength builds gradually, not overnight",
                                "**Good days and bad days** — some days you'll feel stronger than others",
                                "**Difficulty with new exercises** — learning new movements takes practice",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention).",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Strengthening Work",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Track your progress** — write down reps, weight, how exercises feel",
                        "**Be consistent** — do exercises regularly, not sporadically",
                        "**Focus on form** — quality over quantity",
                        "**Progress gradually** — don't rush ahead",
                        "**Rest between sessions** — muscles need time to recover",
                        "**Celebrate small wins** — doing 1 more rep is progress",
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
                                "You can help by: providing encouragement and support, helping track progress, celebrating improvements together, understanding that progress takes time, and being patient — strengthening is a gradual process.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Track your numbers",
                    content:
                        "Keep an exercise journal. Write down what you did each day — exercises, reps, weight, how it felt. If using the scales method, record your force readings weekly. Review your progress regularly. This simple habit helps you see improvement and stay motivated. Example: Week 1: 70kg on scales → Week 4: 90kg on scales = clear progress.",
                },
                {
                    type: "tip",
                    title: "Home strength testing: The Scales Method",
                    content:
                        "Can't get to physio for testing? Use **bathroom scales** at home to track strength between sessions. Place scales against a wall, stand with the ball of your foot on the scales, push down (toes pointed) and hold for 5 seconds. Read the scale. Start at ~80% body weight, work toward 100%+. Test weekly to see progress. This was developed by Professor Peter Malliaras as a simple home alternative to force plates.",
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
                        "**This week:** Focus on progressive strengthening — building toward 15 single-leg heel raises and Phase 3 strength targets",
                        "**Week 17:** We cover building cardio without risk — swimming, bike, elliptical",
                        "**Weeks 15-18:** Continue building strength, working toward Phase 3 goals (25+ heel raises, 1.4x body weight)",
                        "**After Phase 3:** You'll move to **Phase 4: Return to Sport** (running and jumping progression)",
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
                        '**Progression:** "When should I progress? How do I know I\'m ready?"',
                        '**Single-leg heel raises:** "How many should I be able to do? How do I get to 15?"',
                        '**Seated calf raises:** "What are my strength targets? How do I progress?"',
                        '**Resistance:** "How much weight should I use? When should I add more?"',
                        '**Challenges:** "I\'m struggling with [specific exercise]. What can I do?"',
                        '**Timeline:** "How long until I reach Phase 3 goals?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "How long until I can do 15 single-leg heel raises?",
                    answer:
                        "It varies, but most people reach the interim Phase 3 target of 15 reps within 4-8 weeks of starting progressive strengthening. Some reach it faster, some take longer. Focus on consistent work rather than timelines.",
                },
                {
                    question:
                        "What if I can only do 1-2 single-leg heel raises?",
                    answer:
                        "That's okay — everyone starts somewhere. Even doing 1-2 reps is progress. Build gradually — add 1-2 reps per week if possible. Use support initially, reduce support as you get stronger. Your physio will guide you.",
                },
                {
                    question: "How often should I do strengthening exercises?",
                    answer:
                        "Most programs involve exercises 3-4 times per week, with rest days between sessions. Your physiotherapist will give you a specific program. Consistency matters more than frequency — doing exercises regularly is better than doing them sporadically.",
                },
                {
                    question: "What if exercises are too easy?",
                    answer:
                        "Tell your physiotherapist. They can progress exercises, add difficulty, or introduce new challenges. But don't skip ahead on your own — progression needs to be safe and appropriate for your stage of recovery.",
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
                        "**15 single-leg heel raises is the mid-Phase 3 target** — 25 reps is the final goal",
                        "**Progress gradually** — don't rush ahead, follow your physio's guidance",
                        "**Track your progress** — seeing improvement helps you stay motivated",
                        "**Be patient** — strength builds gradually, consistency matters more than speed",
                    ],
                },
            ],
        },
    ],
};
