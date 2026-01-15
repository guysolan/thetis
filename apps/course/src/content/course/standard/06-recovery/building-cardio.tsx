import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "building-cardio",
    title: "Building Cardio Without Risk",
    description:
        "Swimming, stationary bike, elliptical, and walking as exercise",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 17, you're building strength and walking better. But you're probably missing cardiovascular exercise — that feeling of getting your heart rate up, breaking a sweat, feeling fit. The good news: you can start building cardio fitness safely. This lesson covers safe cardio options: swimming, stationary bike, elliptical, and walking as exercise. These activities build fitness without risking your healing tendon.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Cardio basics",
            items: [
                {
                    text:
                        "Start with low-impact options — swimming, bike, elliptical are safest",
                },
                {
                    text:
                        "Avoid high-impact activities — no running, jumping, or high-impact sports yet",
                },
                {
                    text: "Start gradually — 10-15 minutes, build up slowly",
                },
                {
                    text:
                        "Listen to your body — stop if you have pain or concerns",
                },
                {
                    text:
                        "Check with your physio — make sure you're cleared for cardio",
                },
                {
                    text: "Be patient — building cardio fitness takes time",
                },
            ],
        },
        {
            type: "section",
            title: "Why Cardio Matters (And Why You Need It)",
            content: [
                {
                    type: "text",
                    content:
                        "Cardiovascular fitness is crucial for overall health and recovery. After weeks of limited activity, your fitness has likely decreased. Building it back safely helps you feel better, recover faster, and prepares you for return to sport. Think of it like **maintaining a car** — you need to keep the engine running smoothly, not just fix the broken part.",
                },
                {
                    type: "card",
                    title: "Benefits of cardio for recovery",
                    description: "Why it helps.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Improves circulation** — better blood flow helps healing",
                                "**Reduces swelling** — movement helps with fluid management",
                                "**Improves mood** — exercise releases endorphins, helps mental health",
                                "**Builds fitness** — prepares you for return to activity",
                                "**Maintains health** — keeps your heart, lungs, and body healthy",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Safe Cardio Options",
            content: [
                {
                    type: "text",
                    content:
                        "Not all cardio is safe at Week 17. You need **low-impact activities** that don't put excessive stress on your healing tendon. Here are the safest options:",
                },
                {
                    type: "card",
                    title: "1. Swimming",
                    description: "The safest option.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it's safe:** Water supports your body weight, eliminating impact. Your tendon isn't loaded heavily.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with gentle swimming — freestyle, backstroke",
                                "Avoid kicking too hard initially — use a pull buoy if needed",
                                "Start with 10-15 minutes, build up gradually",
                                "Avoid flip turns initially — they can stress your tendon",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Gradually increase duration and intensity. Add kicking as you get stronger.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "2. Stationary Bike",
                    description: "Low impact, high benefit.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it's safe:** No impact, controlled movement, you can adjust resistance.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with low resistance — focus on pedaling, not pushing hard",
                                "Use flat pedals initially — avoid clip-in pedals that require pulling up",
                                "Start with 10-15 minutes, build up gradually",
                                "Keep your heel down — don't point your toes",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Gradually increase duration, then add resistance. Work toward 30+ minutes.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "3. Elliptical",
                    description: "Walking motion without impact.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it's safe:** Mimics walking without impact. Low stress on your tendon.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with low resistance and slow speed",
                                "Focus on smooth, controlled movements",
                                "Start with 10-15 minutes, build up gradually",
                                "Keep your heel down — don't push up onto your toes aggressively",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Gradually increase duration, then add resistance and speed.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "4. Walking as Exercise",
                    description: "Progressive walking for fitness.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it's safe:** You're already walking, now you can use it for fitness.",
                        },
                        {
                            type: "text",
                            content: "**How to do it:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Start with flat surfaces — avoid hills initially",
                                "Focus on proper form — heel-to-toe pattern",
                                "Start with 15-20 minutes, build up gradually",
                                "Increase speed gradually — don't rush",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Progression:** Gradually increase duration and speed. Add hills when ready.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What to Avoid (For Now)",
            content: [
                {
                    type: "text",
                    content:
                        "At Week 17, some activities are still too risky. Avoid these until your physio clears you:",
                },
                {
                    type: "card",
                    title: "High-impact activities to avoid",
                    description: "What not to do yet.",
                    variant: "warning",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Running** — too much impact and force on your tendon",
                                "**Jumping** — high impact, high risk",
                                "**High-impact sports** — basketball, soccer, tennis (running/jumping)",
                                "**Hills** — walking uphill puts more stress on your tendon",
                                "**Stairs** — if done aggressively or for long periods",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**These will come later.** Once you've built strength and your physio clears you, you can gradually return to these activities. But Week 17 is too early.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "How to Start Cardio Safely",
            content: [
                {
                    type: "text",
                    content:
                        "Starting cardio safely requires a gradual approach. Don't jump in too hard — ease into it.",
                },
                {
                    type: "card",
                    title: "Starting guidelines",
                    description: "How to begin.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with 10-15 minutes** — short sessions initially",
                                "**Low intensity** — you should be able to hold a conversation",
                                "**3-4 times per week** — not every day initially",
                                "**Listen to your body** — stop if you have pain or concerns",
                                "**Build gradually** — add 5 minutes per week if comfortable",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Progression principles",
                    description: "How to build up.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Duration first** — increase time before intensity",
                                "**Then intensity** — add resistance or speed gradually",
                                "**Frequency last** — add more days per week when ready",
                                "**One thing at a time** — don't increase everything at once",
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
                    title: "Usually normal during cardio",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling out of breath** — your fitness has decreased, this is normal",
                                "**Muscle fatigue** — feeling tired after cardio is expected",
                                "**Some discomfort** — mild discomfort is normal, especially initially",
                                "**Feeling unfit** — your fitness has decreased, it takes time to rebuild",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** during or after cardio that doesn't ease — cardio shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. **Chest pain or severe breathlessness** — could indicate heart or lung problems.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Cardio Work for You",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Find activities you enjoy** — you're more likely to stick with it",
                        "**Start gradually** — don't push too hard initially",
                        "**Track your progress** — note duration, how you felt",
                        "**Be consistent** — regular cardio is better than occasional intense sessions",
                        "**Listen to your body** — rest if needed, don't push through pain",
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
                                "You can help by: providing encouragement and support, joining them for walks or bike rides if helpful, understanding that rebuilding fitness takes time, and being patient — cardio can be challenging initially.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Schedule cardio like an appointment. Put it in your calendar — same time, same days each week. This makes it automatic. You don't need willpower if it's part of your routine.",
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
                        "**This week:** Start building cardio with low-impact activities",
                        "**Week 20:** We cover functional milestones — pain-free walking, 25+ heel raises, balance tests",
                        "**Weeks 17-25:** Continue building strength and cardio fitness",
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
                        '**Clearance:** "Am I cleared for cardio? What activities are safe?"',
                        '**Starting:** "How should I start? How long, how often?"',
                        '**Progression:** "How should I progress? When can I increase duration or intensity?"',
                        '**Activities:** "What activities should I avoid? When can I try [specific activity]?"',
                        '**Concerns:** "I want to try [activity]. Is it safe?"',
                        '**Timeline:** "When can I start running or higher-impact activities?"',
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
                        "Running typically starts around 4-6 months after injury, but it's criteria-based, not time-based. You need to meet certain strength and function goals first (like 25+ single-leg heel raises). Your physiotherapist will assess when you're ready. Don't rush it — running too early risks re-injury.",
                },
                {
                    question: "Can I use a rowing machine?",
                    answer:
                        "Rowing can be safe if done correctly, but check with your physiotherapist first. The pulling motion is usually fine, but the leg push can stress your calf. Start with low resistance and short duration. Your physio can guide you on proper form.",
                },
                {
                    question: "How long should cardio sessions be?",
                    answer:
                        "Start with 10-15 minutes and build up gradually. Most people work toward 30+ minutes eventually, but this takes time. Focus on consistency rather than duration — doing 15 minutes regularly is better than doing 30 minutes sporadically.",
                },
                {
                    question: "What if cardio causes pain?",
                    answer:
                        "Some mild discomfort is normal, but severe pain is not. If cardio causes severe pain, stop and tell your physiotherapist. They can assess what's happening and modify your program. Don't push through severe pain.",
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
                        "**Start with low-impact** — swimming, bike, elliptical are safest",
                        "**Avoid high-impact** — no running, jumping, or high-impact sports yet",
                        "**Start gradually** — 10-15 minutes, build up slowly",
                        "**Listen to your body** — stop if you have pain or concerns",
                    ],
                },
            ],
        },
    ],
};
