import type { SectionContent } from "@/components/course/types";
import IsomOvercomingSeatedCalf from "@/assets/isom-overcoming-seated-calf.png";
import IsomYieldingStandingSeated from "@/assets/isom-yielding-standing-seated.png";

export const metadata = {
    slug: "progressive-strengthening",
    title: "Progressive Strengthening Begins",
    description:
        "Single-leg heel raises, eccentric drops, and resistance training",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 15, you're well into Phase 2 and making real progress. Your walking is improving, and you're building strength. Now it's time to focus on progressive strengthening — making your exercises harder systematically. This lesson covers single-leg heel raises, eccentric drops, and resistance training. These exercises build the strength you need for Phase 3 and beyond.",
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
                        "Master single-leg heel raises — work toward 25+ reps, this is the gold standard",
                },
                {
                    text:
                        "Start eccentric drops — controlled lowering is crucial for tendon strength",
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
            title: "Single-Leg Heel Raises: The Gold Standard",
            content: [
                {
                    type: "text",
                    content:
                        "Single-leg heel raises are the **gold standard test** for Phase 2. Being able to do 25+ repetitions shows your calf is strong enough for normal walking and daily activities. Think of it as **passing a driving test** — once you can do it, you're ready for the next phase.",
                },
                {
                    type: "card",
                    title: "Why 25+ reps matters",
                    description: "The science behind the target.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**25+ reps indicates strength** — your calf can produce enough force for normal function. This is the target that shows you're ready for Phase 3.",
                        },
                        {
                            type: "text",
                            content:
                                "**It's a functional test** — if you can do 25+ single-leg heel raises, your calf is strong enough for walking, stairs, and daily activities.",
                        },
                        {
                            type: "text",
                            content:
                                "**It's achievable** — this isn't an impossible goal. With consistent work, most people reach this target.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to progress to 25+ reps",
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
            title: "Eccentric Drops: Building Tendon Strength",
            content: [
                {
                    type: "text",
                    content:
                        "Eccentric exercises — controlled lowering — are crucial for tendon strength. Think of it like **lowering a weight slowly** — the controlled lowering builds strength in a way that concentric (lifting) exercises don't.",
                },
                {
                    type: "card",
                    title: "What eccentric drops are",
                    description: "Understanding the exercise.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Eccentric** means controlled lowering. For heel raises, this means rising up on both feet, then slowly lowering down on just your injured leg.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Rise up onto your toes using both feet",
                                "Lift your uninjured leg off the ground",
                                "Slowly lower down on just your injured leg",
                                "Take 3-5 seconds to lower — slow and controlled",
                                "Repeat 10-15 times, 2-3 sets",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why eccentric exercises matter",
                    description: "The tendon strength benefit.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Eccentric loading strengthens tendons** — research shows eccentric exercises are particularly effective for tendon strength. They load your tendon in a controlled way that promotes healing and strength.",
                        },
                        {
                            type: "text",
                            content:
                                "**They're safe when done correctly** — controlled lowering is safer than explosive movements. Your physio will guide you on proper form.",
                        },
                        {
                            type: "text",
                            content:
                                "**They prepare you for Phase 3** — Phase 3 involves more dynamic movements. Eccentric strength provides the foundation.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Resistance Training Progression",
            content: [
                {
                    type: "text",
                    content:
                        "As you get stronger, you need to add resistance to continue building strength. This is the **progressive overload principle** — to get stronger, you need to gradually increase the challenge.",
                },
                {
                    type: "card",
                    title: "How to progress resistance",
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
                                "Add weight on your knee — start with 5-10kg, progress gradually",
                                "Target: build up to 0.8-1x your body weight",
                                "Progress when you can do 15 reps easily",
                            ],
                        },
                        {
                            type: "image",
                            src: IsomOvercomingSeatedCalf,
                            alt: "Grant performing seated calf raise exercise with weight on his knees, foot in plantarflexion position on force plate platform",
                            caption:
                                "Seated calf raise: building toward advanced strength targets",
                        },
                        {
                            type: "card",
                            title: "Advanced Strength Testing: ISOM Overcoming",
                            description:
                                "How physios measure your maximum strength.",
                            variant: "muted",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "As you progress, your physio may measure your strength using **force plates** (ISOM overcoming test). You sit with your foot on the force plate and push down as hard as you can for 5 seconds. The force plate measures exactly how much force you produce.",
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Why it matters:** This objective measurement tracks your progress over time. You can see your strength improving in numbers — for example, going from 1.2x body weight to 1.8x body weight over several weeks shows clear progress.",
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Target goals (with bent knee):**",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Recreational athletes:** >2.0x body weight",
                                        "**Non-active individuals:** >1.5x body weight",
                                        "**Note:** Add 20-40% to these targets if testing with straight knee (straight knee is stronger)",
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
                            alt: "Grant performing standing isometric calf holds, showing progression from double-leg to single-leg in plantarflexion and dorsiflexion positions",
                            caption:
                                "Isometric holds: progressing from double-leg to single-leg",
                        },
                        {
                            type: "card",
                            title: "Advanced Strength Testing: ISOM Yielding",
                            description:
                                "How physios test your holding strength.",
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
                                        "**Target goals (with straight knee):**",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Recreational athletes:** >1.0x body weight in dorsiflexion (toes up), >0.8x body weight in plantarflexion (toes down)",
                                        "**Non-active individuals:** >0.4x body weight in dorsiflexion, >0.6x body weight in plantarflexion",
                                        "**Note:** Subtract 20-40% from these targets if testing with bent knee (bent knee is weaker)",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Progression:** Start with double-leg holds in plantarflexion → progress to single-leg → gradually add dorsiflexion as you advance. The plantarflexion position (toes pointed down) is harder to hold, so targets are slightly lower.",
                                },
                            ],
                        },
                        {
                            type: "text",
                            content: "**For resistance bands:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with light resistance",
                                "Progress to medium, then heavy",
                                "Increase resistance when exercises feel easy",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Advanced Power Testing: Fast CONC Intent",
                    description: "Measuring explosive strength and velocity.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "As you progress toward Phase 3 and return to sport, your physio may test your **power** using a fast concentric test. This measures how fast you can move, not just how much force you can produce. Speed matters for sports performance.",
                        },
                        {
                            type: "text",
                            content:
                                "**What it is:** You perform calf raises on a 10° incline platform with a **linear encoder** attached. The encoder measures how fast your heel moves (mean peak velocity in m/s). You go down, then explode up as fast as possible. This tests your calf's ability to generate force quickly — crucial for running, jumping, and sports.",
                        },
                        {
                            type: "text",
                            content:
                                "**Target goals (Fast CONC Intent test):**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**At body weight:** Athletes >0.8 m/s, Non-active >0.5 m/s",
                                "**At 6RM load (~80% max):** Athletes >0.5 m/s, Non-active >0.3 m/s",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Strength alone isn't enough for sports. You need to be able to produce force *quickly*. This test shows whether you have the explosive power needed for running, cutting, and jumping. Most physios don't have this equipment, but if yours does, these targets help guide your return to sport.",
                        },
                        {
                            type: "tip",
                            title: "Alternative: Step stance test",
                            content:
                                "If your physio doesn't have a linear encoder or incline platform, you can use a **step platform** for calf raises. Stand with the ball of your foot on the step, heel hanging off the back. This provides greater range of motion and better simulates the incline test. Focus on explosive upward movement — push up as fast as you can.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The Goldilocks zone",
                    description: "Finding the right challenge level.",
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
            title: "Why These Tests Matter: The Elongation Connection",
            content: [
                {
                    type: "text",
                    content:
                        "You might wonder why your physio uses these advanced tests (force plates, linear encoders, etc.). The answer: **preventing elongation** and ensuring your tendon heals at the right length with the right strength.",
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
                                "**The goal:** Minimize elongation through proper strengthening. These tests help your physio track whether your tendon is maintaining its length and developing the right stiffness. Strong tendon = less elongation = better outcomes.",
                        },
                        {
                            type: "text",
                            content:
                                "**Critical window:** The first 16 weeks after injury. During this time, elongation can be reversed with the right loading. After 16-20 weeks, the tendon becomes stiffer and harder to change. This is why progressive strengthening matters so much right now.",
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
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** during exercises that doesn't ease — exercises shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting.",
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
                        "Can't get to physio for testing? Use **bathroom scales** at home to track strength between sessions. Place scales against a wall, stand with the ball of your foot on the scales, push down into plantarflexion (toes pointed) and hold for 5 seconds. Read the scale. Start at ~80% body weight, work toward 100%+. Test weekly to see progress. This was developed by Professor Peter Malliaras as a simple home alternative to force plates.",
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
                        "**This week:** Focus on progressive strengthening — building toward 25+ single-leg heel raises",
                        "**Week 17:** We cover building cardio without risk — swimming, bike, elliptical",
                        "**Weeks 15-20:** Continue building strength, working toward Phase 2 goals",
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
                        '**Progression:** "When should I progress? How do I know I\'m ready?"',
                        '**Single-leg heel raises:** "How many should I be able to do? How do I get to 25+?"',
                        '**Eccentric drops:** "How do I do these correctly? When should I start?"',
                        '**Resistance:** "How much weight should I use? When should I add more?"',
                        '**Challenges:** "I\'m struggling with [specific exercise]. What can I do?"',
                        '**Timeline:** "How long until I reach Phase 2 goals?"',
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
                        "How long until I can do 25+ single-leg heel raises?",
                    answer:
                        "It varies, but most people reach this goal within 4-8 weeks of starting progressive strengthening. Some reach it faster, some take longer. Focus on consistent work rather than timelines — you'll get there.",
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
                        "**25+ single-leg heel raises is the goal** — this is the gold standard for Phase 2",
                        "**Progress gradually** — don't rush ahead, follow your physio's guidance",
                        "**Track your progress** — seeing improvement helps you stay motivated",
                        "**Be patient** — strength builds gradually, consistency matters more than speed",
                    ],
                },
            ],
        },
    ],
};
