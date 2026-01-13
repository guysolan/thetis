import type { SectionContent } from "@/components/course/types";
import SeatedCalfRaiseWeek12 from "../../../assets/seated-calf-raise-week-12.png";
import StandingTwoFootCalfRaiseWeek12 from "../../../assets/standing-two-foot-calf-raise-week-12.png";
import SingleLegHeelRaiseWeek12 from "../../../assets/single-leg-heel-raise-week-12.png";
import TowelStretchWeek12 from "../../../assets/towel-stretch-week-12.png";
import ResistanceBandExerciseWeek12 from "../../../assets/resistance-band-exercise-week-12.png";
import BalanceTrainingWeek12 from "../../../assets/balance-training-week-12.png";
import AnklePumpsCirclesWeek12 from "../../../assets/ankle-pumps-circles-week-12.png";

export const metadata = {
    slug: "week-12-day-0-key-exercises",
    title: "The 7 Best Exercises for This Phase",
    description:
        "Towel stretch, heel raises, resistance bands, and balance training",
    week: 12,
    day: 0,
    section_number: 18,
};

export const content: SectionContent = {
    intro:
        "By Week 12, you're actively working on Phase 2 goals. Your physiotherapist has likely introduced several exercises, but understanding why each one matters helps you stay motivated and do them correctly. This lesson covers the 7 most important exercises for this phase — what they do, how to do them safely, and why they're essential for your recovery.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Exercise essentials",
            items: [
                {
                    text:
                        "Master the basics — focus on proper form before adding difficulty",
                },
                {
                    text:
                        "Do exercises consistently — daily practice matters more than perfect sessions",
                },
                {
                    text:
                        "Track your progress — note how many reps, how much weight, what feels challenging",
                },
                {
                    text:
                        "Listen to your body — some discomfort is normal, severe pain is not",
                },
                {
                    text:
                        "Progress gradually — don't rush ahead, follow your physio's guidance",
                },
                {
                    text:
                        "Ask questions — if unsure about form or progression, ask your physio",
                },
            ],
        },
        {
            type: "section",
            title: "The 7 Essential Exercises for Phase 2",
            content: [
                {
                    type: "text",
                    content:
                        "These exercises target the key areas you need to rebuild: strength, flexibility, balance, and control. Think of them as **building blocks** — each one supports the others, and together they rebuild your ability to walk, move, and function normally.",
                },
                {
                    type: "card",
                    title: "1. Seated Calf Raises",
                    description: "Building strength safely.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Strengthens your calf muscle while keeping your tendon in a safe position (plantarflexion — pointed down).",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Sit in a chair with your foot flat on the floor",
                                "Place weight on your knee (start with 5-10kg, progress gradually)",
                                "Push up onto your toes, lifting your heel",
                                "Hold for 2-3 seconds",
                                "Lower slowly and controlled",
                                "Repeat 10-15 times, 2-3 sets",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** This is the foundation of your strength rebuilding. You need to build up to 0.8-1x your body weight before progressing to standing exercises.",
                        },
                        {
                            type: "image",
                            src: SeatedCalfRaiseWeek12,
                            alt: "Grant performing seated calf raise exercise with weight on his knee, lifting heel, foot in plantarflexion position",
                            caption:
                                "Seated calf raise: correct form with foot in plantarflexion position",
                        },
                        {
                            type: "card",
                            title: "ISOM Overcoming: Advanced Strength Targets",
                            description: "Using force plates for measurement.",
                            variant: "muted",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "Some physiotherapists use **force plates** to measure your strength precisely. This is called 'ISOM overcoming' — you push against the force plate for 5 seconds while holding maximum effort. The force plate measures how much force you can produce.",
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Target goals (measured with force plates):**",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Recreational athletes:** Target >2.0x your body weight",
                                        "**Non-active individuals:** Target >1.5x your body weight",
                                        "**Note:** Subtract 20-40% if testing with straight knee (vs bent knee)",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "These are **advanced targets** — don't worry if you're not there yet. Work toward them gradually. Most physios don't have force plates, so these are reference goals rather than requirements.",
                                },
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**Progress gradually.** Add weight slowly (5kg at a time). If you can do 15 reps easily, it's time to add more weight. Your physio will guide you on progression.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "2. Standing Calf Raises (Two-Foot)",
                    description: "Transitioning to standing.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Builds strength in a more functional position — standing, which is closer to how you'll use your calf in daily life.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Stand holding onto a wall or chair for support",
                                "Feet hip-width apart, both feet on ground",
                                "Rise up onto your toes, lifting both heels",
                                "Hold for 2-3 seconds",
                                "Lower slowly and controlled",
                                "Start with 10-15 reps, 2-3 sets",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** This bridges seated exercises to single-leg work. It helps your brain relearn how to control your calf while standing.",
                        },
                        {
                            type: "image",
                            src: StandingTwoFootCalfRaiseWeek12,
                            alt: "Grant performing standing two-foot calf raise, holding onto wall for support, both heels lifting off ground",
                            caption:
                                "Standing two-foot calf raise: correct form with both feet together",
                        },
                        {
                            type: "card",
                            title: "ISOM Yielding: Isometric Hold Targets",
                            description:
                                "Progression goals for standing holds.",
                            variant: "muted",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "**ISOM yielding** means holding an isometric contraction (static hold) rather than moving. You'll progress from **double-leg (DL)** holds to **single-leg (SL)** holds, and from **plantarflexion (PF - toes down)** to **dorsiflexion (DF - toes up)** positions as you remove wedges from your boot.",
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Target goals for isometric holds:**",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Recreational athletes:** >1.0x body weight in dorsiflexion, >0.8x body weight in plantarflexion",
                                        "**Non-active individuals:** >0.4x body weight in dorsiflexion, >0.6x body weight in plantarflexion",
                                        "**Note:** Subtract 20-40% if testing with bent knee (vs straight knee)",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "**Progression:** Start with double-leg holds in plantarflexion → progress to single-leg → add dorsiflexion as wedges are removed. These targets help guide your progression, but focus on gradual improvement rather than hitting numbers immediately.",
                                },
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Don't rush this.** Only progress to standing when you can do seated calf raises with significant weight (0.8-1x body weight). Your physio will tell you when you're ready.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "3. Single-Leg Heel Raises",
                    description: "The gold standard test.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Tests and builds single-leg strength — the ultimate goal for Phase 2. You're aiming for 15+ repetitions.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Stand holding onto a wall or chair for support",
                                "Lift your uninjured leg off the ground",
                                "Rise up onto your toes on your injured leg",
                                "Hold for 1-2 seconds",
                                "Lower slowly and controlled",
                                "Start with however many you can do (even 1-2 is progress)",
                                "Work toward 15+ reps",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** This is the **gold standard test** for Phase 2. Being able to do 15+ single-leg heel raises shows your calf is strong enough for normal walking and daily activities.",
                        },
                        {
                            type: "image",
                            src: SingleLegHeelRaiseWeek12,
                            alt: "Grant performing single-leg heel raise, standing on injured leg with uninjured leg lifted, holding wall for support",
                            caption:
                                "Single-leg heel raise: the gold standard test for Phase 2",
                        },
                        {
                            type: "tip",
                            title: "Progress tip",
                            content:
                                "Start with partial range — only go up halfway if full range is too hard. Build up gradually. Even doing 1-2 full heel raises is progress — celebrate small wins.",
                        },
                        {
                            type: "tip",
                            title: "Alternative option: Step stance",
                            content:
                                "If standing heel raises are too challenging, you can use a **step platform** as an alternative. Stand with the ball of your foot on the step and your heel hanging off the back. This provides a greater range of motion and can be easier to control. Hold onto a wall or railing for support. This is a good option if you're struggling with balance or need more control.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "4. Towel Stretch (Gentle)",
                    description: "Improving flexibility safely.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Gently improves flexibility in your calf and Achilles tendon without aggressive stretching.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Sit on the floor or bed with your leg straight",
                                "Loop a towel around the ball of your foot",
                                "Gently pull the towel toward you, bringing your toes toward your shin",
                                "Hold for 30-60 seconds",
                                "Feel a gentle stretch in your calf — not pain",
                                "Repeat 2-3 times",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Your calf and Achilles are tight after weeks in a boot. Gentle stretching helps restore flexibility without risking elongation.",
                        },
                        {
                            type: "image",
                            src: TowelStretchWeek12,
                            alt: "Grant performing towel stretch, sitting with leg straight, towel looped around foot, gently pulling toes toward shin",
                            caption:
                                "Towel stretch: gentle flexibility exercise",
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Gentle only.** This should feel like a stretch, not pain. Don't force it. Aggressive stretching can cause tendon elongation — your tendon needs to heal at the right length. If unsure, ask your physio.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "5. Resistance Band Exercises",
                    description: "Building strength and control.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Strengthens your calf and improves ankle control using resistance bands.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Sit with your leg straight",
                                "Loop resistance band around the ball of your foot",
                                "Hold the band ends in your hands",
                                "Push your foot down against the band (plantarflexion)",
                                "Hold for 2-3 seconds, release slowly",
                                "Repeat 10-15 times, 2-3 sets",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Resistance bands provide controlled resistance, helping you build strength safely. They're also portable — you can do these exercises anywhere.",
                        },
                        {
                            type: "image",
                            src: ResistanceBandExerciseWeek12,
                            alt: "Grant performing resistance band exercise, sitting with leg straight, band looped around foot, pushing foot down against band resistance",
                            caption:
                                "Resistance band exercise: building strength with controlled resistance",
                        },
                        {
                            type: "tip",
                            title: "Band selection",
                            content:
                                "Start with a light resistance band. As you get stronger, progress to medium, then heavy. Your physio can help you choose the right resistance level.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "6. Balance Training",
                    description: "Rebuilding control and coordination.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Helps your brain relearn how to control your injured leg, improving balance and preventing falls.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Stand on your injured leg (hold onto wall/chair initially)",
                                "Try to balance for as long as you can",
                                "Start with 10-20 seconds, work toward 30+ seconds",
                                "As you improve, try with eyes closed (safely)",
                                "Progress to standing on unstable surfaces (foam pad, pillow) when ready",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Your injured leg has been protected for weeks. Your brain needs to relearn how to control it. Good balance prevents falls and helps you move confidently.",
                        },
                        {
                            type: "image",
                            src: BalanceTrainingWeek12,
                            alt: "Grant performing balance training, standing on injured leg only with uninjured leg lifted, holding wall for support",
                            caption:
                                "Balance training: rebuilding control and coordination",
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**Safety first.** Always have support nearby when starting balance exercises. Falls can cause re-rupture — don't take risks.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "7. Ankle Pumps and Circles",
                    description: "Maintaining mobility.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it does:** Maintains ankle mobility and improves circulation.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ankle pumps:** Point toes up, then down, repeat 10-20 times",
                                "**Ankle circles:** Rotate ankle in circles, 10 times each direction",
                                "Do these several times throughout the day",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Why it matters:** Simple movements help maintain mobility and circulation. These are easy to do while watching TV or working.",
                        },
                        {
                            type: "image",
                            src: AnklePumpsCirclesWeek12,
                            alt: "Grant performing ankle pumps and circles, sitting and moving ankle through range of motion",
                            caption:
                                "Ankle pumps and circles: maintaining mobility",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Exercise Progression: How to Know When to Progress",
            content: [
                {
                    type: "text",
                    content:
                        "Knowing when to progress exercises is crucial. Progress too fast and you risk injury. Progress too slow and you delay recovery. Here's how to find the **Goldilocks zone** — not too easy, not too hard, just right.",
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
                                "**Add weight** — for seated calf raises, add 5-10kg",
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
            title: "Common Exercise Mistakes to Avoid",
            content: [
                {
                    type: "card",
                    title: "Mistake 1: Rushing progression",
                    description: "What happens when you go too fast.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Trying to do single-leg heel raises before you can do seated calf raises with weight.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Your tendon isn't strong enough yet. Rushing can cause re-injury or elongation.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Follow your physio's progression plan. Build the foundation first, then progress.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Mistake 2: Poor form",
                    description: "Why technique matters.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Doing exercises quickly or with poor form to get them done.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Poor form can cause injury and doesn't build strength effectively.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Focus on slow, controlled movements. Quality over quantity. Ask your physio to check your form.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Mistake 3: Skipping exercises",
                    description: "Why consistency matters.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Only doing the exercises you like or skipping days.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Inconsistent practice delays recovery. All exercises work together.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Do your full exercise program consistently. Even 10 minutes is better than skipping entirely.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Mistake 4: Ignoring pain",
                    description: "When to stop.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**The mistake:** Pushing through severe pain because you think it's normal.",
                        },
                        {
                            type: "text",
                            content:
                                "**Why it's dangerous:** Severe pain can indicate injury. Some discomfort is normal, severe pain is not.",
                        },
                        {
                            type: "text",
                            content:
                                "**The fix:** Stop if you have severe pain. Tell your physio. They can modify exercises or check for problems.",
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
                    title: "Usually normal during exercises",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Some discomfort** — mild to moderate discomfort is expected",
                                "**Muscle fatigue** — feeling tired after exercises is normal",
                                "**Stiffness** — especially in the morning or after rest",
                                "**Progress feels slow** — recovery takes time, progress is gradual",
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
                        "**Severe pain** during exercises that doesn't ease — exercises shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. **Numb/blue/pale toes** — circulation problems. **Fever with rapidly spreading redness** — possible infection.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Exercises Work for You",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Set up a dedicated space** — clear area, comfortable surface, equipment ready",
                        "**Schedule exercise time** — same time every day makes it a habit",
                        "**Start small** — better to do 10 minutes daily than 30 minutes once a week",
                        "**Track your progress** — write down reps, weight, how it felt",
                        "**Celebrate small wins** — doing 1 more rep than last week is progress",
                        "**Be flexible** — if you miss a day, don't give up — just get back to it",
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
                                "You can help by: providing encouragement and support, helping set up exercise space, assisting with equipment if needed, celebrating progress together, understanding that exercises can be challenging and frustrating, and being patient — recovery takes time.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Do your exercises at the same time every day — right after breakfast, during lunch break, or before bed. This simple habit makes exercises automatic. You don't need willpower if it's part of your routine.",
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
                        "**This week:** Focus on mastering these exercises with proper form",
                        "**Week 13:** We cover re-learning to walk properly — gait training and correcting limping",
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
                        '**Form:** "Can you check my form on these exercises? Am I doing them correctly?"',
                        '**Progression:** "When should I progress? How do I know I\'m ready?"',
                        '**Pain:** "What level of discomfort is normal? When should I stop?"',
                        '**Frequency:** "How often should I do these exercises? How many sets and reps?"',
                        '**Equipment:** "What equipment do I need? Where can I get resistance bands?"',
                        '**Challenges:** "I\'m struggling with [specific exercise]. What can I do?"',
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
                        "How many times a day should I do these exercises?",
                    answer:
                        "Most exercises are done once a day, but your physiotherapist will give you a specific program. Some exercises (like ankle pumps) can be done multiple times throughout the day. Consistency matters more than frequency — doing exercises daily is better than doing them multiple times but inconsistently.",
                },
                {
                    question: "What if I can't do all the exercises?",
                    answer:
                        "That's normal — everyone starts somewhere. Do what you can, and work toward the others. Your physiotherapist will modify exercises based on your abilities. Even doing 1-2 reps of an exercise is progress. Don't compare yourself to others — your journey is unique.",
                },
                {
                    question: "How long should each exercise session take?",
                    answer:
                        "Typically 20-30 minutes, but this varies. Some days might be shorter, some longer. Focus on quality over duration — doing exercises correctly for 15 minutes is better than rushing through them for 30 minutes. Your physio will guide you on timing.",
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
                        "**Master the basics first** — proper form matters more than difficulty",
                        "**Consistency beats perfection** — doing exercises regularly matters more than perfect sessions",
                        "**Progress gradually** — don't rush ahead, follow your physio's guidance",
                        "**Listen to your body** — some discomfort is normal, severe pain is not",
                    ],
                },
            ],
        },
    ],
};
