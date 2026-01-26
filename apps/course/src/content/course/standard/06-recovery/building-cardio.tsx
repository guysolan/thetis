import type { SectionContent } from "@/components/course/types";
import PoolWalkingWeek12 from "@/assets/pool-walking-week-12.png";

export const metadata = {
    slug: "building-cardio",
    title: "Building Cardio Without Risk",
    description:
        "Swimming, stationary bike, elliptical, and walking as exercise",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 17, you're building strength and walking better. But you're probably missing cardiovascular exercise — that feeling of getting your heart rate up, breaking a sweat, feeling fit. The good news: you can start building cardio fitness safely with low-impact activities that don't risk your healing tendon.",
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
                    description: "The safest option — detailed guide below.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Swimming is excellent cardiovascular exercise with minimal tendon loading. It's one of the safest ways to build fitness during recovery. The water supports your body weight, making it ideal for early cardio. See the detailed swimming section below for comprehensive guidance.",
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
            title: "Swimming: Complete Guide",
            content: [
                {
                    type: "text",
                    content:
                        "Swimming is one of the best cardio options for Achilles recovery. Here's everything you need to know about swimming safely.",
                },
            ],
        },
        {
            type: "section",
            title: "When Can You Start Swimming?",
            content: [
                {
                    type: "text",
                    content:
                        "Swimming is safe for Achilles recovery, but timing matters. You need to wait until certain conditions are met.",
                },
                {
                    type: "card",
                    title: "Prerequisites",
                    description: "What you need before starting.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Surgical wounds fully healed** — if you had surgery, wait 2-3 weeks until wounds are closed",
                                "**Specialist approval** — check with your clinician first",
                                "**No open wounds** — any skin issues must be resolved",
                                "**Comfortable in water** — you need to be able to move safely",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Typical timeline",
                    description: "When most people can start.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Non-surgical:** Usually week 12-14 (after boot removal)",
                                "**Surgical:** Usually week 12-14 (once wounds fully healed)",
                                "**Earlier:** Some people start pool walking earlier (week 10-12)",
                                "**Always check:** With your clinician first",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Benefits of Swimming for Recovery",
            content: [
                {
                    type: "text",
                    content:
                        "Swimming offers unique benefits for Achilles rupture recovery. The water supports your body weight, reducing stress on your tendon while allowing cardiovascular exercise.",
                },
                {
                    type: "card",
                    title: "Why swimming is excellent",
                    description: "Key benefits.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Zero impact** — water supports your body weight",
                                "**Excellent cardiovascular workout** — builds fitness safely",
                                "**Resistance for strengthening** — water provides natural resistance",
                                "**Good for mental health** — exercise improves mood",
                                "**Full body workout** — works multiple muscle groups",
                                "**Low risk** — minimal risk to healing tendon",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Cardiovascular benefits",
                    description: "Building fitness safely.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Swimming is one of the best ways to maintain or build cardiovascular fitness during recovery:",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Increases heart rate** — cardiovascular exercise",
                                "**Improves lung capacity** — breathing control",
                                "**Burns calories** — helps manage weight",
                                "**Builds endurance** — prepares you for return to activity",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Pool Exercises for Recovery",
            content: [
                {
                    type: "text",
                    content:
                        "There are several ways to use the pool for recovery. Start with the easiest and progress gradually.",
                },
                {
                    type: "card",
                    title: "Walking in the pool",
                    description: "Easiest starting point.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**When to start:** Week 10-12 (with approval)",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Water depth:** Waist to chest deep",
                                "**Technique:** Walk forward, backward, sideways",
                                "**Benefits:** Water supports body weight, reduces impact",
                                "**Progression:** Increase speed and duration gradually",
                                "**Duration:** Start with 10-15 minutes, build to 20-30 minutes",
                            ],
                        },
                        {
                            type: "image",
                            src: PoolWalkingWeek12,
                            alt: "Grant walking in a swimming pool at waist depth, demonstrating pool walking exercise",
                            caption:
                                "Pool walking: the water supports your body weight, making it safe and low-impact",
                        },
                        
                    ],
                },
                {
                    type: "card",
                    title: "Swimming strokes",
                    description: "Which strokes are safe.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**When to start:** Week 12-14 (once comfortable with pool walking)",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Freestyle (front crawl)** — Excellent, minimal ankle movement",
                                "**Backstroke** — Good, gentle on ankle",
                                "**Breaststroke** — Use caution, may strain ankle initially",
                                "**Butterfly** — Avoid initially, requires strong push-off",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Start with gentle swimming — freestyle, backstroke. Avoid kicking too hard initially — use a pull buoy if needed. Start with 10-15 minutes, build up gradually. Avoid flip turns initially — they can stress your tendon.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Pool running",
                    description: "Running in deep water.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**When to start:** Week 16-20 (with flotation belt)",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Equipment:** Flotation belt to keep you upright",
                                "**Technique:** Running motion in deep water",
                                "**Benefits:** Simulates running without impact",
                                "**Progression:** Start with 5-10 minutes, build gradually",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Water-based calf raises",
                    description: "Strengthening in water.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**When to start:** Week 12-14",
                                "**Technique:** Stand in shallow water, rise onto toes",
                                "**Benefits:** Resistance from water, less impact",
                                "**Progression:** Increase reps, add single-leg when ready",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Swimming Safety Considerations",
            content: [
                {
                    type: "text",
                    content:
                        "Swimming is generally safe, but there are important safety considerations to protect your healing tendon.",
                },
                {
                    type: "card",
                    title: "What to avoid",
                    description: "Activities to avoid initially.",
                    variant: "warning",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Push-off from wall** — Don't push off with injured leg initially",
                                "**Flip turns** — High impact, avoid until later",
                                "**Diving** — Avoid diving boards and deep dives",
                                "**Kicking too hard** — Start with gentle kicks",
                                "**Competitive swimming** — Wait until fully recovered",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Precautions",
                    description: "Safety measures.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start slowly** — Begin with 10-15 minutes, build gradually",
                                "**Listen to your body** — Stop if you have pain",
                                "**Use pool steps** — Don't jump in, use steps or ladder",
                                "**Be careful on wet surfaces** — Pool decks can be slippery",
                                "**Stay hydrated** — Drink water even though you're in water",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Monitoring your tendon",
                    description: "What to watch for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Pain** — Should not cause significant pain",
                                "**Swelling** — Monitor for increased swelling after",
                                "**Stiffness** — Some stiffness is normal, excessive is not",
                                "**Report concerns** — Tell your clinician if you have problems",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Swimming Progression Plan",
            content: [
                {
                    type: "text",
                    content:
                        "Start gently and progress gradually. Here's a typical progression plan:",
                },
                {
                    type: "card",
                    title: "Week 10-12: Pool walking",
                    description: "Starting phase.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Activity:** Walking in pool (waist to chest deep)",
                                "**Duration:** 10-15 minutes",
                                "**Frequency:** 2-3 times per week",
                                "**Focus:** Getting comfortable in water",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Week 12-14: Gentle swimming",
                    description: "Adding swimming.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Activity:** Freestyle and backstroke",
                                "**Duration:** 15-20 minutes",
                                "**Frequency:** 2-3 times per week",
                                "**Focus:** Building cardiovascular fitness",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Week 16+: Increased activity",
                    description: "Building up.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Activity:** Longer swims, pool running, varied strokes",
                                "**Duration:** 20-30+ minutes",
                                "**Frequency:** 3-4 times per week",
                                "**Focus:** Maintaining fitness, preparing for return to sport",
                            ],
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
                    title: "Seek urgent care",
                    content:
                        "**Severe pain**, **new pop/snap**, **chest pain**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention).",
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
                        '**Swimming:** "When can I start swimming? Are my wounds healed enough? What swimming activities are safe?"',
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
                {
                    question:
                        "When can I start swimming after Achilles rupture?",
                    answer:
                        "Typically week 12-14, but this depends on whether you had surgery and if wounds are fully healed. Non-surgical patients may start pool walking earlier (week 10-12). Always check with your clinician first — they'll assess when it's safe for you.",
                },
                {
                    question: "Can I swim if I had surgery?",
                    answer:
                        "Yes, but you need to wait until surgical wounds are fully healed (usually 2-3 weeks). The wound must be completely closed with no open areas. Check with your surgeon before swimming.",
                },
                {
                    question: "What swimming strokes are safe?",
                    answer:
                        "Freestyle (front crawl) and backstroke are safest initially. Breaststroke may strain the ankle, so use caution. Avoid butterfly and flip turns initially. Start with gentle strokes and progress gradually.",
                },
                {
                    question: "Will swimming help my recovery?",
                    answer:
                        "Yes, swimming is excellent for recovery. It provides cardiovascular exercise with minimal tendon loading, helps maintain fitness, improves mood, and can be a stepping stone to return to other activities. It's one of the safest ways to exercise during recovery.",
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
