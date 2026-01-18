import type { SectionContent } from "@/components/course/types";
import HeelToToeWalkingSequence from "@/assets/heel-to-toe-walking-sequence.png";
import StepLengthSpacing from "@/assets/step-length-spacing.png";
import RetroWalkingTechniqueSequence from "@/assets/retro-walking-technique-sequence.png";

export const metadata = {
    slug: "walking-properly",
    title: "Re-Learning to Walk Properly",
    description: "Heel-to-toe pattern, correcting limping, and gait analysis",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 13, you're likely out of your boot and walking in regular shoes. But walking normally again isn't automatic — your body has learned to walk differently while protecting your injured leg.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Walking retraining basics",
            items: [
                {
                    text:
                        "Focus on heel-to-toe pattern — land on your heel first, then roll through to your toes",
                },
                {
                    text:
                        "Work on step length — take normal-sized steps, not tiny shuffling steps",
                },
                {
                    text: "Practice symmetry — make both legs work equally",
                },
                {
                    text:
                        "Use [heel lifts](/standard/post-boot-period) if needed — 0.5-1cm heel lift helps protect your tendon initially",
                },
                {
                    text:
                        "Practice daily — short walks focusing on form, not distance",
                },
                {
                    text:
                        "Be patient — correcting your gait takes time and practice",
                },
            ],
        },
        {
            type: "section",
            title: "Why Walking Feels Different",
            content: [
                {
                    type: "text",
                    content:
                        "After weeks in a boot, walking normally again feels strange. Your body has adapted to protect your injured leg, and now you need to unlearn those protective patterns. Think of it like **learning to drive a different car** — the basics are the same, but everything feels slightly off until you adjust.",
                },
                {
                    type: "card",
                    title: "What happened to your walking",
                    description: "How your body adapted.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**You learned to limp** — your body shortened steps, avoided putting weight on your injured leg",
                                "**Your muscles weakened** — calf, glutes, and hip muscles are weaker from disuse",
                                "**Your balance changed** — you relied more on your uninjured leg",
                                "**Your brain adapted** — your nervous system learned new movement patterns",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These adaptations were helpful while you were healing, but now they need to be corrected. Your body won't automatically go back to normal — you need to retrain it.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "The Proper Walking Pattern: Heel-to-Toe",
            content: [
                {
                    type: "text",
                    content:
                        "Proper walking follows a **heel-to-toe pattern**. You land on your heel first, then roll through your foot, pushing off with your toes. This pattern distributes force evenly and protects your Achilles tendon.",
                },
                {
                    type: "image",
                    src: HeelToToeWalkingSequence,
                    alt: "Three-panel diagram showing heel strike, roll through, and push off in normal walking",
                    caption:
                        "Heel-to-toe walking: heel strike → roll through → push off",
                },
                {
                    type: "card",
                    title: "How to walk properly",
                    description: "Step-by-step guide.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**Step 1: Heel strike**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Land on your heel first — not your toes or midfoot",
                                "Your heel should touch the ground before the rest of your foot",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Step 2: Roll through**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Roll from heel to midfoot to forefoot",
                                "Your weight transfers smoothly through your foot",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Step 3: Push off**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Push off with your toes and ball of your foot",
                                "Your calf muscle works to propel you forward",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Practice this slowly at first.** Walk slowly and focus on each step. As it becomes natural, you can speed up.",
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
                                "**Landing on toes first** — this puts too much stress on your Achilles",
                                "**Shuffling steps** — tiny steps don't build strength or proper patterns",
                                "**Favoring one leg** — both legs should work equally",
                                "**Walking too fast** — slow down and focus on form first",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Correcting Your Limp",
            content: [
                {
                    type: "text",
                    content:
                        "Limping is your body's way of protecting your injured leg. But now that your tendon is healing, limping can actually slow your recovery. Here's how to correct it.",
                },
                {
                    type: "card",
                    title: "Why you limp",
                    description: "The protective pattern.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Shorter steps** — you take smaller steps on your injured leg",
                                "**Less time on injured leg** — you spend less time bearing weight on it",
                                "**Asymmetric pattern** — your walking pattern is uneven",
                                "**Compensation** — your uninjured leg and hip work harder",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These patterns feel normal now, but they need to be corrected. Limping prevents your injured leg from getting stronger and can cause problems in other areas (hips, back, uninjured leg).",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to correct limping",
                    description: "Practical strategies.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**Strategy 1: Slow down**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Walk slowly and focus on each step",
                                "Think about what each leg is doing",
                                "Speed will come naturally as your pattern improves",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Strategy 2: Equal step length**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Take the same size step with both legs",
                                "Don't shuffle — take normal-sized steps",
                                "Practice in front of a mirror if helpful",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Strategy 3: Equal time on each leg**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Spend equal time bearing weight on each leg",
                                "Don't rush off your injured leg",
                                "Practice standing on your injured leg",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Strategy 4: Use a mirror or video**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Watch yourself walk — you might not realize you're limping",
                                "Video yourself walking and watch it back",
                                "Compare to how you walked before your injury (if you have video)",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Practice walking in front of a mirror for 5 minutes each day. Focus on making both legs work equally. This visual feedback helps your brain relearn proper patterns faster than walking without feedback.",
                },
            ],
        },
        {
            type: "section",
            title: "Retro Walking: Walking Backward",
            content: [
                {
                    type: "text",
                    content:
                        "**Retro walking** (walking backward) is a helpful exercise for loading your Achilles tendon and working on eccentric calf strength. It's different from forward walking and provides unique benefits.",
                },
                {
                    type: "card",
                    title: "Why retro walking helps",
                    description: "The benefits of walking backward.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Eccentric calf loading** — walking backward loads your calf muscles eccentrically (controlled lowering), which strengthens your tendon.",
                        },
                        {
                            type: "text",
                            content:
                                "**Different movement pattern** — backward walking uses different muscles and movement patterns than forward walking, providing variety in your training.",
                        },
                        {
                            type: "text",
                            content:
                                "**Safe progression** — it's a controlled way to load your tendon without the impact of forward walking.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to do retro walking",
                    description: "Step-by-step guidance.",
                    variant: "default",
                    content: [
                        {
                            type: "image",
                            src: RetroWalkingTechniqueSequence,
                            alt: "Three-panel diagram showing retro walking steps: step back, lower heel, and push off",
                            caption:
                                "Retro walking: step back → lower heel → push off",
                        },
                        {
                            type: "text",
                            content: "**Technique:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with short distances — 10-15 steps backward",
                                "Step backward slowly, lowering your heel to the ground",
                                "Push off with your injured leg — this provides eccentric loading",
                                "Use support if needed — hold onto a wall or rail initially",
                                "Progress gradually — increase distance as you get stronger",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Perform retro walking while wearing shoes and a heel lift (if recommended) unless instructed otherwise by your physiotherapist.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Step Length: Why It Matters",
            content: [
                {
                    type: "text",
                    content:
                        "Step length — how far you step with each foot — is crucial for proper walking. After being in a boot, you've likely shortened your steps. Now you need to lengthen them back to normal.",
                },
                {
                    type: "image",
                    src: StepLengthSpacing,
                    alt: "Top-down diagram comparing short steps to normal equal steps, with spacing markers",
                    caption:
                        "Step length retraining: move from short steps to normal, equal steps",
                },
                {
                    type: "card",
                    title: "Why step length matters",
                    description: "The science behind it.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Normal step length** allows your calf muscle to work properly. When you take tiny steps, your calf doesn't get the loading it needs to strengthen. Think of it like **lifting weights** — if the weights are too light, you don't build strength.",
                        },
                        {
                            type: "text",
                            content:
                                "**Short steps also increase risk of [elongation](/standard/healing-process)** — your tendon needs appropriate loading to heal at the right length. Too little loading (from tiny steps) can contribute to elongation.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to improve step length",
                    description: "Practical tips.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with normal steps** — don't take huge steps, but don't shuffle either",
                                "**Practice on marked surfaces** — use floor tiles or lines to gauge step length",
                                "**Focus on symmetry** — both legs should take similar-sized steps",
                                "**Progress gradually** — as you get stronger, your step length will naturally increase",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Using Heel Lifts During Transition",
            content: [
                {
                    type: "text",
                    content:
                        "Heel lifts (0.5-1cm) can help protect your tendon during the transition from boot to shoes. They reduce the stretch on your Achilles, giving it time to adapt to walking without the boot.",
                },
                {
                    type: "card",
                    title: "Why heel lifts help",
                    description: "The protection they provide.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Heel lifts reduce tendon stretch** — by raising your heel, you reduce how much your Achilles stretches with each step. This protects your healing tendon.",
                        },
                        {
                            type: "text",
                            content:
                                "**They're temporary** — you'll gradually reduce and remove heel lifts as your tendon gets stronger. Most people use them for 2-4 weeks after boot removal.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to use heel lifts",
                    description: "Practical guidance.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with 1cm** — this provides good protection initially",
                                "**Place in both shoes** — keep your pelvis level (don't just lift the injured side)",
                                "**Reduce gradually** — after 1-2 weeks, reduce to 0.5cm, then remove",
                                "**Follow your physio's guidance** — they'll tell you when to reduce/remove",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**Heel lifts are temporary.** The goal is to wean off them as your tendon gets stronger. Don't rely on them long-term — your tendon needs to adapt to normal walking.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Gait Analysis: What Your Physio Looks For",
            content: [
                {
                    type: "text",
                    content:
                        "Your physiotherapist will analyze your walking pattern (gait) to identify problems and guide your retraining. Understanding what they're looking for helps you work on the right things.",
                },
                {
                    type: "card",
                    title: "What physios assess",
                    description: "Key areas of analysis.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Step length** — are your steps equal? Are they normal size?",
                                "**Step width** — are your feet too far apart or too close?",
                                "**Heel-to-toe pattern** — are you landing heel first?",
                                "**Symmetry** — do both legs work equally?",
                                "**Speed** — can you walk at a normal pace?",
                                "**Balance** — do you maintain balance while walking?",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Common problems they find",
                    description: "What to watch for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Limping** — favoring one leg",
                                "**Short steps** — shuffling instead of normal steps",
                                "**Toe walking** — landing on toes instead of heel",
                                "**Asymmetry** — one leg working harder than the other",
                                "**Slow speed** — walking slower than normal",
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
                                "**Feeling unsteady** — your balance is still improving",
                                "**Walking slowly** — you're focusing on form, speed will come",
                                "**Some limping** — it takes time to correct, be patient",
                                "**Tiredness** — walking properly uses more energy initially",
                                "**Stiffness** — especially in the morning or after rest",
                                "**Feeling awkward** — relearning to walk feels strange",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, **falling with new pain**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention).",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Walking Practice Work",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Start with short walks** — 5-10 minutes focusing on form, not distance",
                        "**Practice daily** — consistency matters more than long sessions",
                        "**Use a mirror** — visual feedback helps correct patterns",
                        "**Walk on flat surfaces** — avoid hills and uneven ground initially",
                        "**Wear supportive shoes** — good shoes help with proper walking pattern",
                        "**Rest between walks** — don't overdo it, rest helps recovery",
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
                                "You can help by: walking with them for support and encouragement, pointing out if you notice limping (gently), helping them practice in safe areas, being patient — relearning to walk takes time, and celebrating small improvements together.",
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
                        "**This week:** Focus on proper heel-to-toe pattern and correcting limping",
                        "**Week 14:** We cover managing post-boot challenges — stiffness, swelling, and why not to stretch aggressively",
                        "**Weeks 12-26:** Continue building strength in Phase 3 and improving walking pattern",
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
                        '**Form:** "Can you watch me walk and tell me what I need to work on?"',
                        '**Limping:** "Am I still limping? How can I correct it?"',
                        '**Step length:** "Are my steps normal size? Should I take longer steps?"',
                        '**Heel lifts:** "How long should I use heel lifts? When can I remove them?"',
                        '**Speed:** "When can I walk faster? Should I focus on speed or form?"',
                        '**Practice:** "How much should I practice walking? How often?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How long will it take to walk normally again?",
                    answer:
                        "It varies, but most people see significant improvement in 4-6 weeks after boot removal. Full normal walking (no limping, normal speed) typically takes 2-3 months. Focus on consistent practice rather than timelines — everyone progresses at their own pace.",
                },
                {
                    question: "Is it normal to still limp?",
                    answer:
                        "Yes, it's normal to limp initially after boot removal. Your body has learned protective patterns, and it takes time to unlearn them. Focus on proper form and be patient — limping will improve with practice and strength building.",
                },
                {
                    question: "Should I walk even if it's uncomfortable?",
                    answer:
                        "Some discomfort is normal, but severe pain is not. If walking causes severe pain, stop and tell your physiotherapist. They can assess what's happening and modify your program. Mild to moderate discomfort is expected as you rebuild strength.",
                },
                {
                    question: "How much should I walk each day?",
                    answer:
                        "Start with short walks (5-10 minutes) focusing on form. Gradually increase duration as you get stronger. Your physiotherapist will give you specific guidance based on your progress. Quality (proper form) matters more than quantity (distance).",
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
                        "**Heel-to-toe pattern** — land on your heel first, roll through, push off with toes",
                        "**Equal steps** — both legs should take similar-sized steps",
                        "**Practice daily** — consistency matters more than long sessions",
                        "**Be patient** — relearning to walk takes time",
                    ],
                },
            ],
        },
    ],
};
