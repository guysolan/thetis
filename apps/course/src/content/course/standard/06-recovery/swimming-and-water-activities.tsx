import type { SectionContent } from "@/components/course/types";
import PoolWalkingWeek12 from "@/assets/pool-walking-week-12.png";

export const metadata = {
    slug: "swimming-and-water-activities",
    title: "Swimming & Water Activities",
    description:
        "When to start swimming, pool exercises, safety considerations, and benefits for recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Swimming is excellent cardiovascular exercise with minimal tendon loading. It's one of the safest ways to build fitness during recovery. This lesson covers when to start swimming, what exercises to do, safety considerations, and how swimming supports your recovery. The water supports your body weight, making it ideal for early cardio.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Swimming basics",
            items: [
                {
                    text:
                        "Wait until wounds are healed — surgical wounds must be fully closed",
                },
                {
                    text:
                        "Get specialist approval — check with your clinician first",
                },
                {
                    text:
                        "Start gently — walking in pool, then gentle swimming",
                },
                {
                    text:
                        "Avoid push-offs — don't push off from wall with injured leg initially",
                },
                {
                    text:
                        "Listen to your body — stop if you have pain or concerns",
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
                            ],
                        },
                        {
                            type: "image",
                            src: PoolWalkingWeek12,
                            alt: "Grant walking in a swimming pool at waist depth, demonstrating pool walking exercise",
                            caption:
                                "Pool walking: the water supports your body weight, making it safe and low-impact",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Duration:** Start with 10-15 minutes, build to 20-30 minutes",
                            ],
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
            title: "Safety Considerations",
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
            title: "Progression Plan",
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
            title: "What's Normal vs What's Urgent",
            content: [
                {
                    type: "card",
                    title: "Usually normal",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Mild fatigue** — normal after swimming",
                                "**Some stiffness** — normal, especially initially",
                                "**Feeling out of breath** — your fitness has decreased",
                                "**Muscle soreness** — normal after exercise",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help",
                    content:
                        "**Severe pain** during or after swimming, **new \"pop\" or snap**, **significant increase in swelling**, **unable to bear weight**, or **signs of infection** (redness, warmth, fever).",
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
                        '**Timing:** "When can I start swimming? Are my wounds healed enough?"',
                        '**Activities:** "What swimming activities are safe for me?"',
                        '**Precautions:** "What should I avoid? What should I watch for?"',
                        '**Progression:** "How should I progress my swimming?"',
                        '**Concerns:** "I\'m worried about [specific concern] — is this normal?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I start swimming after Achilles rupture?",
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
                        "**Wait until wounds are healed** — surgical wounds must be fully closed",
                        "**Get approval first** — check with your clinician",
                        "**Start gently** — pool walking, then gentle swimming",
                        "**Avoid push-offs** — don't push off from wall with injured leg",
                        "**Swimming is excellent** — safe cardio with minimal tendon stress",
                    ],
                },
            ],
        },
    ],
};
