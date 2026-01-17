import type { SectionContent } from "@/components/course/types";
import TendonHealingTimeline from "@/assets/tendon-healing-timeline.png";
import TendonStiffnessAfterRupture from "@/assets/tendon-stiffness-after-rupture.png";
import ReRuptureRiskTimeline from "@/assets/re-rupture-risk-timeline.png";

export const metadata = {
    slug: "healing-process",
    title: "Understanding Your Healing Tendon",
    description:
        "The proliferative phase, tendon length, and why patience matters",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 4, you're probably asking: **'Is it healing? How long will this take?'** This lesson explains what's happening inside your tendon right now — and why patience is your best friend. Understanding the healing process helps you make sense of the timeline and avoid pushing too hard, too soon.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Focus on healing",
            items: [
                {
                    text:
                        "Keep following your boot protocol — don't rush wedge removal",
                },
                {
                    text:
                        "Continue elevation when resting — swelling slows healing",
                },
                {
                    text:
                        "Be patient — your tendon is actively healing, even if you can't see it",
                },
                {
                    text:
                        "Don't test your tendon — no stretching, no 'seeing if I can stand on tiptoe'",
                },
                {
                    text:
                        "Report any concerns to your clinician — but know what's normal vs urgent",
                },
            ],
        },
        {
            type: "section",
            title: "The Three Stages of Biological Healing",
            content: [
                {
                    type: "text",
                    content:
                        "Tendon healing happens in three overlapping biological stages. You're currently in **Phase 1: Protection** of your recovery, but inside the tendon, you are in the **proliferative stage** — the most critical period for building new tissue.",
                },
                {
                    type: "image",
                    src: TendonHealingTimeline,
                    alt: "Three-panel diagram showing biological healing stages: inflammatory stage (weeks 1-2), proliferative stage (weeks 3-6), and remodelling stage (weeks 6-12)",
                    caption:
                        "Biological healing timeline: inflammation → new tissue growth → strengthening",
                },
                {
                    type: "card",
                    title: "Stage 1: Inflammation (Weeks 1-2)",
                    description: "The body's initial response to injury.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Right after the rupture, your body sends cells to clean up damaged tissue and start the healing process. This creates inflammation — swelling, warmth, and sometimes redness around the injury site.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**What's happening:** Blood vessels bring healing cells to the rupture site",
                                "**What you feel:** Swelling, warmth, discomfort",
                                "**Your job:** Focus on **Phase 1: Protection** goals: elevate, ice, and protect the tendon in your boot.",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 2: Proliferation (Weeks 3-6) — You Are Here",
                    description: "New tissue bridges the gap.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "This is where you are now. Your body is building **new collagen tissue** to bridge the gap between the torn tendon ends. Think of it like scaffolding being built between two buildings — it's fragile at first, but it's the foundation for everything that comes next.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**What's happening:** New collagen fibres are forming and connecting the tendon ends",
                                "**What you feel:** Less swelling, less pain, but the tendon still feels weak",
                                "**Your job:** Strict adherence to your boot protocol and wedge removal schedule.",
                                "**Why it matters:** This new tissue is weak — stretching or loading it too early can tear it apart",
                            ],
                        },
                        {
                            type: "tip",
                            title: "Simple analogy",
                            content:
                                "Imagine gluing two pieces of rope together. The glue needs time to set. If you pull on it too early, it comes apart. Your tendon is like that glue — it needs weeks to become strong enough to handle stress.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 3: Remodelling (Weeks 6-12+)",
                    description: "The new tissue gets stronger.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "The new tissue you're building now will gradually reorganise and strengthen. Collagen fibres align along the direction of force, making the tendon progressively stronger. This phase continues for months.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**What's happening:** Collagen fibres reorganise and strengthen",
                                "**What you feel:** Gradual improvement in strength and function",
                                "**Your job:** Transition to **Phase 2: Transition** (walking out of the boot) and start physiotherapy.",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Why Patience Matters: The Tendon Length Question",
            content: [
                {
                    type: "text",
                    content:
                        "One of the biggest concerns patients have is: **'Will my tendon be too long?'** This is a valid worry, and understanding it helps explain why we don't rush things.",
                },
                {
                    type: "image",
                    src: ReRuptureRiskTimeline,
                    alt: "Timeline diagram showing re-rupture risk periods (early rehab weeks 0-8, boot removal weeks 8-12) and why elongation is the bigger problem than re-rupture",
                    caption:
                        "Re-rupture risk timeline: when risks are highest, and why elongation is the bigger concern",
                },
                {
                    type: "card",
                    title: "Re-rupture vs elongation: what matters more",
                    description: "Understanding the two main risks.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "There are two main risks during recovery: **re-rupture** and **elongation**. Understanding both helps you know what to focus on.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Re-rupture risk (3-5%)**: Low but serious. Highest during early rehab (weeks 0-8) and boot removal (weeks 8-12)",
                                "**Elongation risk**: Affects everyone to some degree. This is the **bigger problem** — it prevents return to sport and affects power",
                                "**Key message**: Re-rupture is rare if you follow protocol, but elongation affects everyone and is harder to fix",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "The good news: Following your protocol minimizes both risks. The infographic above shows when re-rupture risk is highest, but remember — **elongation is the bigger concern** because it affects your long-term function.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Tendon length: what it means",
                    description: "In plain English.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "When a tendon ruptures, the two ends can separate. If they heal too far apart, the tendon becomes **longer** than it was originally. A longer tendon means:",
                        },
                        {
                            type: "image",
                            src: TendonStiffnessAfterRupture,
                            alt: "Educational infographic diagram showing healthy tendon (stiff) vs ruptured tendon (more compliant) and why elongation happens under the same load",
                            caption:
                                "Tendon stiffness after rupture: a more compliant tendon stretches more easily, leading to elongation",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Less power** — your calf muscle can't generate as much force",
                                "**Difficulty standing on tiptoe** — the tendon is too slack",
                                "**Altered walking pattern** — you may limp or push off less effectively",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "This is why your foot is held **pointed down** (plantarflexed) — it brings the tendon ends closer together so they heal at the right length.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The 'gap' question",
                    description:
                        "What clinicians mean when they talk about gap size.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Clinicians sometimes measure the distance between tendon ends on ultrasound (e.g., '4 cm gap'). This is just a snapshot — what matters is whether the ends **come together** when your foot is held in the correct position.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gap size varies** depending on foot position during the scan",
                                "**What matters:** Do the ends touch when your foot is pointed down in the boot?",
                                "**Your job:** Keep your foot in the correct position — the boot does this for you",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Don't panic if you hear a gap measurement. Your specialist will interpret it in context and adjust your treatment plan accordingly.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Why we don't rush",
                    content:
                        "Removing wedges too quickly or stretching the tendon too early can cause the ends to separate. This leads to a longer tendon and worse outcomes. Patience now = better function later.",
                },
            ],
        },
        {
            type: "section",
            title: "What's Normal vs What's Urgent",
            content: [
                {
                    type: "card",
                    title: "Usually normal at Week 4",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Less swelling** than Week 1 — this is good progress",
                                "**Less pain** — most people feel much better than the first week",
                                "**Feeling frustrated** — you're still in a boot, still on crutches, still limited",
                                "**Wondering if it's healing** — you can't see inside, so it's normal to worry",
                                "**Swelling that varies** — worse after activity, better after rest",
                                "**Stiffness** when you move your foot (if allowed)",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **numb/blue/pale toes**, severe pressure/pain that doesn\'t improve when you loosen straps, fever with rapidly spreading redness, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Supporting Your Healing",
            content: [
                {
                    type: "text",
                    content:
                        "You can't speed up healing, but you can create the best conditions for it to happen.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Elevation still matters** — even though swelling is better, elevation helps blood flow and reduces discomfort",
                        "**Nutrition** — your body needs protein, vitamins, and minerals to build new tissue. Eat well, stay hydrated",
                        "**Sleep** — healing happens during rest. Poor sleep slows recovery",
                        "**Don't smoke** — smoking significantly slows healing and increases complication risk",
                        "**Follow your protocol** — your clinician's plan is designed to protect the healing tendon",
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Keep a water bottle by your recovery station. Staying hydrated helps blood flow and tissue healing. Dehydration slows everything down.",
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
                                "Your support matters. Help by: reminding about elevation, preparing healthy meals, encouraging patience (not pushing too hard), and listening when frustration surfaces. Week 4 is often when the reality of the long recovery hits — emotional support is as important as practical help.",
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
                        "**Week 5:** We cover **wedge removal protocol** — when and how to remove wedges safely",
                        "**Weeks 5-6:** You may start progressive weight-bearing (if your protocol allows)",
                        "**Weeks 6-8:** Transition toward walking without crutches",
                        "**Weeks 8-10:** Boot phase continues, but you'll be more mobile",
                    ],
                },
                {
                    type: "tip",
                    title: "Timeline reminder",
                    content:
                        "Full recovery typically takes **6–12 months**, but you'll be walking without crutches much sooner (often by weeks 6–10). We'll break this down week by week.",
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
                        '**Healing progress:** "How is my tendon healing? Are the ends coming together?"',
                        '**Gap size:** "If you measured a gap, what does that mean for my recovery?"',
                        '**Tendon length:** "Is there any concern about tendon length?"',
                        '**Wedge removal:** "When should I start removing wedges? What\'s the protocol?"',
                        '**Weight-bearing:** "When can I start putting weight through my foot?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How do I know if my tendon is healing?",
                    answer:
                        "You can't see inside, but signs of good healing include: decreasing swelling, less pain, and following your protocol without complications. Your clinician will check progress with physical examination and sometimes ultrasound. Trust the process — healing is happening even when you can't see it.",
                },
                {
                    question: "What if I accidentally stretched my tendon?",
                    answer:
                        "If you accidentally let your foot go flat or stretched it briefly, don't panic. The risk is from repeated or prolonged stretching. Tell your clinician at your next appointment. If you felt a new 'pop' or sudden pain, seek urgent assessment.",
                },
                {
                    question: "Can I speed up healing?",
                    answer:
                        "Not really. Healing follows a biological timeline. What you can do is create the best conditions: protect the tendon, control swelling, eat well, sleep well, don't smoke. Pushing too hard actually slows healing by causing inflammation or re-injury.",
                },
                {
                    question: "When can I drive / go back to work?",
                    answer:
                        "This depends on which leg is injured, your job, and your clinician's guidance. We cover this in detail in Week 8. For now, assume you won't be driving if it's your right leg, and discuss work with your employer and clinician.",
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
                        "**You're in the proliferative phase** — new tissue is actively being built",
                        "**Patience now = better function later** — don't rush wedge removal or weight-bearing",
                        "**Healing is invisible** — trust the process, follow your protocol",
                        "**Protect the tendon length** — keep your foot in the correct position",
                    ],
                },
            ],
        },
    ],
};
