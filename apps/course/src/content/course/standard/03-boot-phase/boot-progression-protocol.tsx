import type { SectionContent } from "@/components/course/types";
import WedgeRemovalProgression from "@/assets/wedge-removal-progression-cartoon.png";

export const metadata = {
    slug: "boot-progression-protocol",
    title: "Boot Progression Protocol",
    description:
        "Wedge removal schedule, mobilisation progression, and angle changes",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Your boot protocol is the core of **Phase 1: Protection**. It involves gradually reducing the angle (removing wedges or adjusting the hinge) and progressing mobilisation status as your tendon heals.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Phase 1: Protocol essentials",
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
                        "Know your schedule — when to reduce angle and when to progress mobilisation status",
                },
                {
                    text:
                        "Monitor how you feel — some discomfort is normal, severe pain is not",
                },
                {
                    text: "Don't compare with others — protocols vary widely",
                },
            ],
        },
        {
            type: "section",
            title:
                "Understanding your angle protocol — the foundation of your recovery",
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
                                        "You'll start at **maximum angle** — foot very pointed down like standing on tip-toes. This is around 30–45 degrees of [plantarflexion](/standard/emergency-care) (foot pointed down).",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Aircast:** All wedges in (usually 3–4 wedges stacked under heel)",
                                        "**VACOped:** Hinge locked at maximum angle setting",
                                        "**Goal:** Keep tendon ends as close as possible",
                                        "**Mobilisation status:** Usually Non Weightbearing or Limited Weightbearing",
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
            title: "Wedge Removal: The Detailed Process",
            content: [
                {
                    type: "text",
                    content:
                        "By Week 4-5, you're likely ready to start removing wedges from your boot — a sign that your tendon is healing. This gradual process brings your foot closer to a normal position, but it must be done carefully and at the right pace.",
                },
                {
                    type: "image",
                    src: WedgeRemovalProgression,
                    alt: "Four-panel diagram showing gradual wedge removal progression from weeks 2-10, demonstrating how foot angle reduces as wedges are removed",
                    caption:
                        "Wedge removal progression: gradual reduction of foot angle over time",
                },
                {
                    type: "card",
                    title: "Why we remove wedges gradually",
                    description: "The tendon needs time to adapt.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Wedges hold your foot in a pointed-down position, keeping the torn tendon ends close together. As your tendon heals and new tissue forms, you can gradually reduce this angle. Think of it like **slowly letting out a rope** — you're giving the tendon more slack, but only when it's strong enough to handle it.",
                        },
                        {
                            type: "text",
                            content:
                                "Removing wedges too quickly can cause the tendon ends to separate, leading to a longer tendon and worse outcomes. Going too slowly keeps you in an uncomfortable position longer than necessary. Your clinician's protocol balances these risks.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Early weeks:** Maximum angle keeps ends closest together",
                                "**Mid weeks:** Gradual reduction as new tissue strengthens",
                                "**Later weeks:** Foot approaches neutral as healing progresses",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple analogy",
                    content:
                        "Imagine you're gluing two pieces of rope together. At first, you need to hold them very close. As the glue sets, you can gradually relax your grip — but if you let go too fast, the glue breaks. Wedge removal is like gradually relaxing your grip as the 'glue' (new tendon tissue) gets stronger.",
                },
            ],
        },
        {
            type: "section",
            title: "When to Start Removing Wedges",
            content: [
                {
                    type: "text",
                    content:
                        "Timing varies significantly between protocols. Some start as early as week 3-4, others wait until week 5-6. **Never remove wedges without your clinician's approval.**",
                },
                {
                    type: "card",
                    title: "Typical timing (varies by protocol)",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Week 2-3:** Usually still in maximum angle with all wedges",
                                "**Week 4-5:** Many protocols start removing first wedge",
                                "**Week 6-7:** Continue removing wedges gradually",
                                "**Week 8-10:** Final wedges removed, foot approaches neutral",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "These are general guidelines. Your clinician will give you a specific protocol based on your healing progress, gap size, and treatment approach (surgical vs non-surgical).",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Signs you might be ready",
                    description: "What clinicians look for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Decreasing swelling** — less inflammation means healing is progressing",
                                "**Less pain** — discomfort should be manageable",
                                "**Time since injury** — most protocols start around week 4-5",
                                "**Clinical assessment** — your clinician checks healing progress",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Even if you feel ready, don't remove wedges without your clinician's instruction. The timing is based on healing progress, not just how you feel.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "How to Remove Wedges Safely",
            content: [
                {
                    type: "text",
                    content:
                        "The process is usually straightforward, but doing it correctly matters. Here's how to do it safely:",
                },
                {
                    type: "list",
                    style: "numbered",
                    items: [
                        "**Check your protocol** — know exactly which wedge to remove and when",
                        "**Remove one wedge at a time** — never remove multiple wedges at once",
                        "**Do it when resting** — remove wedges when you're sitting or lying down, not while walking",
                        "**Keep your foot supported** — don't let your foot go flat unsupported",
                        "**Watch for problems** — increased pain, swelling, or discomfort means slow down",
                    ],
                },
                {
                    type: "card",
                    title: "The safe technique",
                    description: "Step-by-step process.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sit or lie down** — never remove wedges while standing",
                                "**Loosen boot straps** — make it easier to access wedges",
                                "**Remove the bottom wedge** — usually the first one removed (check your protocol)",
                                "**Re-tighten straps** — ensure the boot fits snugly",
                                "**Test gradually** — start with short periods, increase as tolerated",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Some boots have wedges that slide out easily. Others may require removing the boot liner. Follow your boot manufacturer's instructions or ask your clinician to show you the technique.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Remove wedges in the morning or during the day when you're active. This allows you to monitor how your tendon responds to the new angle throughout the day. If you experience significant pain or a feeling of over-stretching, you can easily put the wedge back and contact your clinic.",
                },
            ],
        },
        {
            type: "section",
            title: "What to Expect During Wedge Removal",
            content: [
                {
                    type: "text",
                    content:
                        "As you remove wedges, your foot angle changes. This can feel strange at first, and some discomfort is normal.",
                },
                {
                    type: "card",
                    title: "Normal sensations",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling different** — your foot will be in a new position, which feels odd initially",
                                "**Mild discomfort** — some stretching sensation is normal as the angle changes",
                                "**Temporary stiffness** — your ankle may feel stiffer for a day or two",
                                "**Swelling variation** — slight increase in swelling is common and usually settles",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Warning signs to slow down",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Significant pain increase** — more than mild discomfort",
                                "**Rapid swelling** — swelling that doesn't improve with elevation",
                                "**Feeling unstable** — like the tendon is being stretched too much",
                                "**New pain location** — pain in a different area than before",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "If you experience any of these, **put the wedge back** and contact your clinician. It's better to go slower than risk re-injury.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Progress isn't always linear",
                    content:
                        "Some days you might feel ready to remove a wedge, other days you might need to put one back. This is normal. Healing isn't a straight line — listen to your body and follow your clinician's guidance.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Wedge Removal Easier",
            content: [
                {
                    type: "text",
                    content:
                        "A few simple strategies can make the wedge removal process smoother and more comfortable.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Remove wedges gradually** — don't rush the process, even if you feel ready",
                        "**Elevate after removal** — helps reduce any swelling from the angle change",
                        "**Ice if needed** — if you get increased swelling, ice can help (always with a cloth barrier)",
                        "**Keep a log** — note when you removed each wedge and how you felt",
                        "**Don't compare** — everyone's timeline is different, focus on your own progress",
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Mobilisation and weightbearing progression",
            content: [
                {
                    type: "text",
                    content:
                        "As your tendon heals, you'll gradually progress from Non Weightbearing to Unrestricted Weightbearing. This progression is separate from angle reduction but happens alongside it. According to orthopaedic policy, weightbearing status should be clearly documented with clinical justification, quantification (functional or distance restrictions, not percentages), and duration.",
                },
                {
                    type: "card",
                    title: "Typical mobilisation schedule",
                    description:
                        "General guidelines — follow your specific protocol.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Weeks 0–2:** Usually Non Weightbearing or Limited Weightbearing",
                                "**Weeks 2–4:** May progress to Limited Weightbearing with functional restrictions",
                                "**Weeks 4–6:** Progress to Unrestricted Weightbearing in boot",
                                "**Weeks 6–8:** Unrestricted Weightbearing, may start walking without crutches",
                                "**Weeks 8–10:** Continue Unrestricted Weightbearing, preparing for boot removal",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            title: "Important",
                            content:
                                "Mobilisation progression varies by protocol. Some allow earlier weightbearing, some require longer Non Weightbearing periods. **Follow your clinician's specific instructions** — don't progress faster than allowed. Your clinician will document your weightbearing status with clear clinical justification and functional restrictions.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to progress mobilisation safely",
                    description: "Practical tips.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start gradually** — even when cleared for weightbearing, start with limited functional activities",
                                "**Follow functional restrictions** — your clinician will specify limitations (e.g., indoor only, no stairs, distance restrictions)",
                                "**Listen to your body** — if it hurts, reduce activity level",
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
            title: "Combining angle reduction and mobilisation",
            content: [
                {
                    type: "text",
                    content:
                        "Angle reduction and mobilisation progression happen together, but they're independent. You might reduce the angle while still Non Weightbearing, or you might be weightbearing while still at maximum angle. Your protocol will guide both.",
                },
                {
                    type: "card",
                    title: "Common patterns",
                    description:
                        "How protocols typically combine these progressions.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Conservative protocol:** Longer at maximum angle, slower mobilisation progression",
                                "**Accelerated protocol:** Faster angle reduction, earlier weightbearing",
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
                                "**Able to bear weight** — weightbearing feels manageable",
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
                    question:
                        "What if my protocol is different from what I read online?",
                    answer:
                        "Protocols vary widely between clinics and specialists. Some are more conservative, some are more accelerated. What matters is following YOUR specific protocol, not comparing with others. If you have concerns about your protocol, discuss them with your clinician.",
                },
                {
                    question: "What if I accidentally removed too many wedges?",
                    answer:
                        "Put the wedges back immediately. Don't walk on it until you've restored the correct angle. Contact your clinician to discuss — they may want to see you to check everything is okay. It's better to be safe than risk re-injury.",
                },
                {
                    question: "Can I remove wedges faster if I'm feeling good?",
                    answer:
                        "No. Even if you feel great, follow your clinician's protocol. The timing is based on healing progress, not just how you feel. Removing wedges too quickly can cause the tendon ends to separate, leading to worse outcomes. Patience now = better function later.",
                },
                {
                    question: "What if removing a wedge causes pain?",
                    answer:
                        "Some mild discomfort is normal. If you get significant pain, put the wedge back and wait longer. If pain persists even with the wedge back, contact your clinician. Don't push through severe pain — it's a sign to slow down.",
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
                        '**Timing:** "When should I start removing wedges? What\'s my specific protocol?"',
                        '**Which wedge:** "Which wedge should I remove first? From the top or bottom?"',
                        '**Pace:** "How often should I remove wedges? Weekly or every two weeks?"',
                        '**Warning signs:** "What symptoms should make me put a wedge back or slow down?"',
                        '**Pain:** "How much discomfort is normal when removing a wedge?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
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
                        "**Never remove wedges without clinician approval** — timing is critical",
                        "**One wedge at a time** — gradual is safe, fast is risky",
                        "**Watch for warning signs** — pain or swelling means slow down",
                        "**Put wedges back if needed** — it's okay to go slower",
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
