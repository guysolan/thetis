import type { SectionContent } from "@/components/course/types";
import ReturnToSportProgression from "@/assets/return-to-sport-progression.png";
import Symmetry85Percent from "@/assets/symmetry-85-percent.png";

export const metadata = {
    slug: "return-to-sport",
    title: "Return to Sport",
    description:
        "Criteria, process, and timeline for returning to your sport safely",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 30-32, you've completed plyometric training and you're thinking about returning to your sport. Return to sport is a major milestone — but it's not just about time. You need to meet specific criteria and follow a gradual progression.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Return to sport basics",
            items: [
                {
                    text:
                        "Meet return criteria — 85% symmetry in strength, hopping, jumping",
                },
                {
                    text:
                        "Understand the return process — modified practice → full participation → pre-injury level",
                },
                {
                    text:
                        "Assess psychological readiness — confidence is as important as physical readiness",
                },
                {
                    text:
                        "Start gradually — begin with modified practice and sport-specific drills",
                },
                {
                    text:
                        "Continue strengthening — don't stop exercises just because you're returning to sport",
                },
                {
                    text:
                        "Be realistic — return takes several months, 70-80% return to play rates",
                },
            ],
        },
        {
            type: "section",
            title: "Return-to-Sport Criteria: Are You Ready?",
            content: [
                {
                    type: "text",
                    content:
                        "Return to sport is **criteria-based, not time-based**. You need to demonstrate specific strength and function goals before returning. This ensures you're ready and reduces re-injury risk.",
                },
                {
                    type: "card",
                    title: "The 85% Symmetry Rule",
                    description: "Key return-to-sport criteria.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Research recommends demonstrating ankle plantarflexion strength, hopping, and jumping tasks **greater or equal to 85% of your uninjured leg** before returning to sport.",
                        },
                        {
                            type: "text",
                            content: "**What this means:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Strength:** Your injured leg should be at least 85% as strong as your uninjured leg",
                                "**Hopping:** Your injured leg should hop at least 85% as far/high as your uninjured leg",
                                "**Jumping:** Your injured leg should jump at least 85% as well as your uninjured leg",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Example:**",
                        },
                        {
                            type: "text",
                            content:
                                "If you can perform 20 single-leg heel raises with 20 lbs on your uninjured side, you should be able to perform at least **17 repetitions** with the same weight on your injured side (17 ÷ 20 = 85%).",
                        },
                        {
                            type: "image",
                            src: Symmetry85Percent,
                            alt: "Comparison showing Grant performing heel raises on uninjured leg (20 reps) vs injured leg (17 reps = 85%), demonstrating the 85% symmetry threshold for return to sport",
                            caption:
                                "85% symmetry: Your injured leg should perform at least 85% as well as your uninjured leg",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Other important criteria",
                    description: "Additional factors to consider.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content: "**Physical criteria:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "25+ single-leg heel raises (ideally matching other side)",
                                "Pain-free walking, running, jumping",
                                "Good balance — single-leg balance 30+ seconds",
                                "No limping or compensation patterns",
                                "Can perform sport-specific movements",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Psychological criteria:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Confidence in movements — you trust your leg",
                                "No excessive fear — some caution is normal",
                                "Willingness to test limits — ready to try",
                                "Realistic expectations — understand risks",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "**Your physiotherapist will assess these criteria** — they'll test your strength, function, and readiness. Don't return until you meet criteria — rushing increases re-injury risk.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "The Return-to-Sport Process: A Gradual Continuum",
            content: [
                {
                    type: "text",
                    content:
                        "Return to sport is **not a single event** — it's a gradual process that takes place over several months. Understanding this process helps you set realistic expectations and return safely.",
                },
                {
                    type: "card",
                    title: "Stage 1: Modified Practice",
                    description: "Starting with controlled activities.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it involves:** Sport-specific drills and modified practice sessions",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sport-specific drills** — movements specific to your sport",
                                "**Reduced intensity** — lower intensity than full competition",
                                "**Reduced duration** — shorter practice sessions",
                                "**Controlled environment** — practice setting, not competition",
                                "**Focus on technique** — relearning movements safely",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Example:** Basketball player starts with shooting drills, then progresses to controlled scrimmages before full games.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 2: Full Participation",
                    description:
                        "Returning to normal practice and competition.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it involves:** Full participation in practice and competition",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Full practice** — normal practice intensity and duration",
                                "**Competition participation** — returning to games/matches",
                                "**Normal intensity** — full effort when appropriate",
                                "**Monitoring** — watch for pain, fatigue, concerns",
                                "**Gradual increase** — build up playing time gradually",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Even at this stage, you may need to build up playing time gradually. Don't expect to play full games immediately.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 3: Pre-Injury Level (or Higher)",
                    description: "The final goal.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**What it involves:** Performing at or above your pre-injury level",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Pre-injury performance** — performing as well as before injury",
                                "**Full confidence** — no fear or hesitation",
                                "**Consistent performance** — reliable performance over time",
                                "**No limitations** — no restrictions on activities",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Reality check:** Not everyone reaches this stage. Some people return to sport but at a lower level. That's okay — being able to participate is success.",
                        },
                    ],
                },
                {
                    type: "image",
                    src: ReturnToSportProgression,
                    alt: "Diagram showing return-to-sport progression: Stage 1 Modified Practice → Stage 2 Full Participation → Stage 3 Pre-Injury Level, with timeline and key milestones",
                    caption:
                        "Return-to-sport progression: A gradual continuum over several months",
                },
            ],
        },
        {
            type: "section",
            title: "Realistic Expectations: Return-to-Play Rates",
            content: [
                {
                    type: "text",
                    content:
                        "Understanding return-to-play statistics helps you set realistic expectations. Research shows that return-to-play rates vary, but most studies report similar ranges.",
                },
                {
                    type: "card",
                    title: "What research shows",
                    description: "Return-to-play statistics.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Based on numerous studies, the rate of return to play typically ranges from about **70 to 80%** across various sports.",
                        },
                        {
                            type: "text",
                            content: "**What this means:**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**70-80% of people** return to their sport after Achilles rupture",
                                "**20-30% don't return** — for various reasons (age, severity, other factors)",
                                "**Return doesn't mean pre-injury level** — some return at a lower level",
                                "**Time varies** — some return quickly, others take longer",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Factors that influence return:** Age, sport type, injury severity, adherence to rehab, psychological factors, and individual circumstances.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Setting realistic expectations",
                    description: "What to expect.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Be realistic about timeline:** Return to sport usually takes **several months** after meeting criteria. Don't expect to return immediately after meeting criteria.",
                        },
                        {
                            type: "text",
                            content:
                                "**Be realistic about level:** Not everyone returns to pre-injury level. Some return at a lower level — that's still success.",
                        },
                        {
                            type: "text",
                            content:
                                "**Be realistic about process:** Return is gradual. You won't go from modified practice to full competition overnight.",
                        },
                        {
                            type: "text",
                            content:
                                "**Focus on what you can do:** Celebrate being able to participate, even if it's at a different level than before.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Continuing Your Strengthening Program",
            content: [
                {
                    type: "text",
                    content:
                        "**Important:** Don't stop your strengthening exercises just because you're returning to sport. Continuing your strengthening program is crucial for long-term success and preventing re-injury.",
                },
                {
                    type: "card",
                    title: "Why continue strengthening",
                    description: "The importance of ongoing strength.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Prevents re-injury:** Ongoing strength reduces re-rupture risk",
                        },
                        {
                            type: "text",
                            content:
                                "**Maintains gains:** Use it or lose it — strength decreases if you stop training",
                        },
                        {
                            type: "text",
                            content:
                                "**Supports performance:** Stronger muscles support better performance",
                        },
                        {
                            type: "text",
                            content:
                                "**Long-term health:** Strength deficits can persist for 2+ years — ongoing training addresses this",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to maintain strength",
                    description: "Practical tips.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Continue heel raises** — maintain 1-2 heel raise exercises 2-3 times per week",
                                "**Continue plyometrics** — maintain jumping/hopping exercises",
                                "**Warm up properly** — always warm up before sport",
                                "**Listen to your body** — adjust if you have pain or concerns",
                                "**Work with your physio** — they'll guide maintenance program",
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
                    title: "Usually normal when returning to sport",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Some apprehension** — normal to feel cautious initially",
                                "**Muscle soreness** — normal after returning to activity",
                                "**Fatigue** — normal, especially initially",
                                "**Gradual improvement** — performance improves gradually over time",
                                "**Not at pre-injury level yet** — normal, takes time",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** during or after sport that doesn't ease — sport shouldn't cause severe pain. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Unable to bear weight** — can't put weight on your leg after activity.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Return to Sport Successful",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Meet criteria first** — don't return until you meet 85% symmetry and other criteria",
                        "**Follow the progression** — start with modified practice, progress gradually",
                        "**Continue strengthening** — don't stop exercises just because you're returning",
                        "**Warm up properly** — always warm up before sport",
                        "**Listen to your body** — stop if you have pain or concerns",
                        "**Be patient** — return takes time, don't rush",
                        "**Work with your physio** — they'll guide your return",
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
                        "**This week:** Assess your readiness, work toward meeting return criteria",
                        "**Week 34:** [When Things Don't Go to Plan](/standard/when-things-dont-go-to-plan) — not progressing, seeking further opinion",
                        "**Week 35+:** [Life After Achilles Rupture](/standard/new-normal) — long-term perspective and ongoing care",
                        "**Weeks 32-35+:** Continue building strength, gradually return to sport, maintain long-term health",
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
                        '**Readiness:** "Am I ready to return to sport? Have I met the criteria?"',
                        '**Symmetry:** "What\'s my symmetry? Am I at 85%?"',
                        '**Progression:** "What return-to-sport progression should I follow?"',
                        '**Timeline:** "How long will return to sport take? What should I expect?"',
                        '**Maintenance:** "What strengthening should I continue? How often?"',
                        '**Concerns:** "I\'m worried about [specific concern]. Is this normal?"',
                        '**After-hours:** "What should I do if I have concerns and can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I return to sport?",
                    answer:
                        "When you meet return-to-sport criteria: 85% symmetry in strength, hopping, and jumping; 25+ heel raises; pain-free activities; good balance; and physio clearance. This is typically around 7-9 months, but it's criteria-based, not time-based.",
                },
                {
                    question: "What does 85% symmetry mean?",
                    answer:
                        "Your injured leg should perform at least 85% as well as your uninjured leg. For example, if you can do 20 heel raises with 20 lbs on your uninjured side, you should be able to do at least 17 reps with the same weight on your injured side.",
                },
                {
                    question: "How long does return to sport take?",
                    answer:
                        "Return to sport is a gradual process that takes several months. You'll start with modified practice, progress to full participation, and eventually (hopefully) reach pre-injury level. Don't expect to return immediately after meeting criteria.",
                },
                {
                    question: "What if I can't return to pre-injury level?",
                    answer:
                        "That's okay — not everyone returns to pre-injury level. Some return at a lower level, and that's still success. Being able to participate in your sport is the goal, even if it's at a different level than before.",
                },
                {
                    question:
                        "Should I stop strengthening exercises when I return to sport?",
                    answer:
                        "No — continue your strengthening program. Ongoing strength is crucial for preventing re-injury and maintaining gains. Continue heel raises and plyometrics 2-3 times per week.",
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
                        "**Meet criteria first** — 85% symmetry, 25+ heel raises, pain-free activities",
                        "**Return is gradual** — modified practice → full participation → pre-injury level",
                        "**Continue strengthening** — don't stop exercises just because you're returning",
                        "**Be realistic** — return takes time, 70-80% return-to-play rates",
                    ],
                },
            ],
        },
    ],
};
