import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "boot-progression-protocol",
    title: "Boot Progression Protocol",
    description:
        "Wedge removal schedule, weight-bearing progression, and angle changes",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Your boot protocol involves gradually reducing the angle (removing wedges or adjusting the hinge) and progressing weight-bearing as your tendon heals. This lesson covers the progression schedule, when to make changes, and what to expect at each stage.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Protocol essentials",
            items: [
                {
                    text:
                        "Follow your specific protocol exactly — don't rush ahead",
                },
                {
                    text:
                        "Understand your starting position — maximum angle with all wedges in (Aircast) or hinge locked (VACOped)",
                },
                {
                    text:
                        "Know your schedule — when to reduce angle and when to progress weight-bearing",
                },
                {
                    text:
                        "Monitor how you feel — some discomfort is normal, severe pain is not",
                },
                {
                    text:
                        "Don't compare with others — protocols vary widely",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding your angle protocol — the foundation of your recovery",
            content: [
                {
                    type: "text",
                    content:
                        "Whether you have an Aircast (with wedges) or a VACOped (with a hinge), the principle is the same: your foot starts very pointed down, and gradually moves toward neutral as the tendon heals. The **angle** is what matters — how you achieve it depends on your boot type.",
                },
                {
                    type: "card",
                    title: "The principle: gradual angle reduction",
                    description: "A simple analogy to understand the system.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Imagine your foot position as a **tower of blocks**. At the start, you need all the blocks to keep your foot pointed down — this brings the torn tendon ends close together. As the tendon heals, you remove blocks one by one (Aircast) or unlock the hinge step by step (VACOped), gradually bringing your foot to neutral. Do it too fast, and the tower collapses (tendon stretches or re-ruptures).",
                        },
                    ],
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title: "Starting position (weeks 0–2)",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "You'll start at **maximum angle** — foot very pointed down like standing on tip-toes. This is around 30–45 degrees of plantarflexion.",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Aircast:** All wedges in (usually 3–4 wedges stacked under heel)",
                                        "**VACOped:** Hinge locked at maximum plantarflexion setting",
                                        "**Goal:** Keep tendon ends as close as possible",
                                        "**Weight-bearing:** Usually non-weight-bearing or minimal",
                                        "**Don't change anything yet** — follow your protocol exactly",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Angle reduction protocol (weeks 2–10)",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "Your specialist will give you a schedule for gradually reducing the angle. The timing is similar for both boot types:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Week 2–4:** Reduce angle by one step (remove one wedge, or unlock hinge one notch)",
                                        "**Week 4–6:** Continue gradual reduction",
                                        "**Week 6–8:** May reach neutral (0 degrees) or close to it",
                                        "**Week 8–10:** May start transitioning out of boot",
                                    ],
                                },
                                {
                                    type: "alert",
                                    variant: "info",
                                    title: "Important",
                                    content:
                                        "Protocols vary widely. Some reduce faster, some slower. Some keep you at maximum angle longer. **Follow your specific protocol** — don't compare with others or rush ahead.",
                                },
                            ],
                        },
                        {
                            title: "What happens when you reduce the angle",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "When you reduce the angle (remove a wedge or unlock the hinge), your foot moves to a less pointed-down position. This is progress, but it also means:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**More stress on the tendon** — the ends are slightly further apart",
                                        "**You may feel more stretch** — this is normal, but shouldn't be severe pain",
                                        "**Your leg length changes** — you may need to adjust footwear on the other foot",
                                        "**You're one step closer to neutral** — this is good progress",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "When to worry",
                                    content:
                                        "If reducing the angle causes **severe pain**, a **new pop**, or **sudden loss of function**, stop and contact your clinic. A little discomfort is normal; severe pain is not.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Weight-bearing progression",
            content: [
                {
                    type: "text",
                    content:
                        "As your tendon heals, you'll gradually progress from non-weight-bearing to full weight-bearing. This progression is separate from angle reduction but happens alongside it.",
                },
                {
                    type: "card",
                    title: "Typical weight-bearing schedule",
                    description: "General guidelines — follow your specific protocol.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Weeks 0–2:** Usually non-weight-bearing or toe-touch only",
                                "**Weeks 2–4:** May start partial weight-bearing (25–50% of body weight)",
                                "**Weeks 4–6:** Progress to full weight-bearing in boot",
                                "**Weeks 6–8:** Full weight-bearing, may start walking without crutches",
                                "**Weeks 8–10:** Continue full weight-bearing, preparing for boot removal",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            title: "Important",
                            content:
                                "Weight-bearing progression varies by protocol. Some allow earlier weight-bearing, some require longer non-weight-bearing. **Follow your clinician's specific instructions** — don't progress faster than allowed.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to progress weight-bearing safely",
                    description: "Practical tips.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start gradually** — even when cleared for weight-bearing, start with small amounts",
                                "**Use scales** — bathroom scales can help you gauge 25%, 50%, 75% weight-bearing",
                                "**Listen to your body** — if it hurts, reduce weight",
                                "**Don't rush** — gradual progression is safer than sudden changes",
                                "**Use crutches** — continue using crutches until cleared to walk without them",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Combining angle reduction and weight-bearing",
            content: [
                {
                    type: "text",
                    content:
                        "Angle reduction and weight-bearing progression happen together, but they're independent. You might reduce the angle while still non-weight-bearing, or you might be weight-bearing while still at maximum angle. Your protocol will guide both.",
                },
                {
                    type: "card",
                    title: "Common patterns",
                    description: "How protocols typically combine these progressions.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Conservative protocol:** Longer at maximum angle, slower weight-bearing progression",
                                "**Accelerated protocol:** Faster angle reduction, earlier weight-bearing",
                                "**Your protocol:** May be anywhere between these — follow it exactly",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Monitoring your progress",
            content: [
                {
                    type: "text",
                    content:
                        "As you progress through your protocol, monitor how you feel and watch for signs that you're ready for the next step — or signs that you need to slow down.",
                },
                {
                    type: "card",
                    title: "Signs you're progressing well",
                    description: "Positive indicators.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Reduced pain** — pain decreasing over time",
                                "**Less swelling** — swelling improving",
                                "**Comfortable at current angle** — no significant discomfort",
                                "**Able to bear weight** — weight-bearing feels manageable",
                                "**Following schedule** — keeping up with protocol timeline",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Signs to slow down or contact clinic",
                    description: "When to be cautious.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Severe pain** — especially when reducing angle or increasing weight",
                                "**New pop or snap** — could indicate re-injury",
                                "**Sudden loss of function** — can't bear weight when you could before",
                                "**Increasing swelling** — especially if it's getting worse",
                                "**Concern about progress** — if something doesn't feel right",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "How do I know when to reduce the angle (remove a wedge or adjust the hinge)?",
                    answer:
                        "Follow your protocol exactly. Your specialist will give you a schedule (e.g., 'remove one wedge every 2 weeks' for Aircast, or 'unlock to the next setting at week 4' for VACOped). Don't progress faster than instructed, even if you feel fine. The tendon needs time to heal at each angle before moving to the next.",
                },
                {
                    question: "What if I reduce the angle and it hurts?",
                    answer:
                        "Some discomfort is normal when reducing the angle — you're putting slightly more stress on the tendon. However, severe pain is not normal. If you have severe pain, a new pop, or sudden loss of function, stop and contact your clinic. A little discomfort is expected; severe pain is a warning sign.",
                },
                {
                    question: "Can I progress faster than my protocol says?",
                    answer:
                        "No. Even if you feel fine, the tendon needs time to heal at each stage. Rushing ahead is one of the most common causes of re-rupture or tendon elongation. Follow your protocol exactly — your clinician designed it based on healing timelines.",
                },
                {
                    question: "What if my protocol is different from what I read online?",
                    answer:
                        "Protocols vary widely between clinics and specialists. Some are more conservative, some are more accelerated. What matters is following YOUR specific protocol, not comparing with others. If you have concerns about your protocol, discuss them with your clinician.",
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
                        "**Follow your protocol exactly** — don't rush ahead",
                        "**Some discomfort is normal** — severe pain is not",
                        "**Don't compare with others** — protocols vary widely",
                        "**When in doubt, ask** — contact your clinic if concerned",
                    ],
                },
            ],
        },
    ],
};
