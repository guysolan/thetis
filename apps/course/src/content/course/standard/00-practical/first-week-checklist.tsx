import type { FAQItem, SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "first-week-checklist",
    title: "Week 1 Checklist & What's Normal",
    description:
        "Normal vs concerning symptoms, questions for clinic, essential purchases",
    status: "drafting" as const,
};

export const faqs: FAQItem[] = [
    {
        question: "Is it normal that the pain reduced quickly?",
        answer:
            "Yes. The rupture itself can be extremely painful, but pain often settles quickly. That doesn't mean it's minor — the tendon is still ruptured and needs protection.",
    },
    {
        question: "What if I accidentally put weight on my foot?",
        answer:
            "A brief accidental touch-down is common. Don't panic. Re-focus on your instructions. If you had a significant fall or you felt a new pop with sudden worsening pain/function, contact your team urgently.",
    },
    {
        question: "Can I take the boot/cast off to shower?",
        answer:
            "**Plaster:** no. Use a waterproof cover (like a Limbo). **Boot/splint:** follow your protocol — many require 24/7 wear early on. For showering, this usually means either wearing a waterproof cover over the boot (so you won't wash the foot itself), or switching to a Thetis night splint that maintains the correct angle while allowing you to wash your foot and leg.",
    },
    {
        question: "When can I drive / go back to work?",
        answer:
            "Driving: not yet — we cover this in a later section. Work: depends on your job. Desk jobs can sometimes resume early (with adjustments); physical roles take longer. Ask your clinician for a timeline.",
    },
];

export const content: SectionContent = {
    intro:
        "Week 1 is emotionally hard because you don't know what's 'normal'. It's OK to feel frustrated, scared, or even angry — this injury changes everything overnight. This page gives you a simple filter: what's expected, what's urgent, and what you should set up before your follow-up appointment.",

    blocks: [
        {
            type: "section",
            title: "What’s usually normal in Week 0–1",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "Pain that’s worst at the moment of injury, then settles over hours/days",
                        "Swelling/bruising that increases over the first 24–72 hours",
                        "Mild warmth around the ankle and a heavy/tired feeling from immobility",
                        "Disrupted sleep from the cast/splint/boot",
                        "Odd sensations (tightness/tingling) that improve when you change position",
                    ],
                },
                {
                    type: "tip",
                    title: "Reassurance",
                    content:
                        "Feeling anxious is normal. You’ve had a sudden injury that changes everything overnight. A clear plan + safe routines makes this week much easier.",
                },
            ],
        },
        {
            type: "alert",
            variant: "danger",
            title: "Get urgent help now (same day / emergency)",
            content:
                '**Possible DVT (a clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (a clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **numb/blue/pale toes**, severe increasing pressure/pain in the cast/boot, fever with rapidly spreading redness, or a fall with a new "pop".',
        },
        {
            type: "section",
            title: "Week 1 standard (simple checklist)",
            content: [
                {
                    type: "checklist",
                    items: [
                        {
                            text:
                                "Keep the tendon protected 24/7 (no stretching, no barefoot testing)",
                        },
                        {
                            text:
                                "Take any prescribed blood thinners as directed (they reduce clot risk)",
                        },
                        {
                            text:
                                "Elevate your ankle above heart level as much as possible",
                        },
                        {
                            text:
                                "Use ice for comfort during the first 3–4 days (if appropriate) — boot off to apply ice; keep foot toes-down while icing",
                        },
                        {
                            text:
                                "Learn safe crutch technique and slow down around stairs/bathroom",
                        },
                        {
                            text:
                                "Book/confirm your fracture clinic/orthopaedics follow-up",
                        },
                        {
                            text:
                                "Know blood clot red flags (DVT = leg clot, PE = lung clot) and circulation/pressure red flags",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Questions to ask at follow-up",
            content: [
                {
                    type: "text",
                    content:
                        "If you're overwhelmed, use this list. Save it to your phone and tick items off in clinic. **Write down questions as they come to you** — you'll forget them in the appointment.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Diagnosis:** "Is this a confirmed rupture? Do I need ultrasound?"',
                        '**Gap size:** "If you measured a gap (e.g. 4 cm), does it close when my foot is pointed down? What does that mean for my plan?"',
                        '**Position:** "What ankle angle should I be in (how pointed-down) and for how long?"',
                        '**Mobilisation status:** "What is my weightbearing status? Am I Non Weightbearing, Limited Weightbearing, or Unrestricted Weightbearing?"',
                        '**Clot prevention:** "Am I getting VTE prophylaxis? For how long? What symptoms should trigger urgent help?"',
                        '**Follow-up:** "When is my next appointment, and who do I contact with questions?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                        '**Hygiene:** "Can anything be removed to wash/shower, or is it waterproof cover only?"',
                        '**Work note:** "Can you provide a fit note/sick note today?"',
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Your Recovery Journey: Simple Overview",
            content: [
                {
                    type: "text",
                    content:
                        "Recovery happens in stages. You don't need to understand all the details right now — just know that there's a structured path forward. Your physiotherapist will guide you through each stage when the time is right.",
                },
                {
                    type: "card",
                    title: "Where you are now",
                    description: "Understanding your current stage.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "You're currently in **Stage 1: Immobilization** (~6 weeks). Right now, your focus is on protecting your tendon and allowing it to heal. Exercises will start around Week 6, but the boot usually stays on until around Week 10 (protocol-dependent).",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Stage 1: Immobilization (~6 weeks):** In the boot — protection and healing",
                                "**Stage 2: Post-immobilization (weeks 6-12):** Rebuilding strength, 15 single-leg heel raises, balance",
                                "**Stage 3: Single leg capacity (weeks 18-24):** Building endurance and function",
                                "**Stage 4: Power development (weeks 24+):** Power and full return when ready",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Don't worry about stages 2-4 yet. Focus on Week 1. For the full 4-stage overview (Immobilization, Post-immobilization, Single leg capacity, Power development), see [The Achilles Recovery Roadmap](/standard/recovery-roadmap). When you start physiotherapy around Week 11, you'll get specific exercises and goals for each stage.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Worth buying (to make Week 1 easier)",
            content: [
                {
                    type: "card",
                    title: "Usually provided by hospital",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Crutches",
                                "Initial immobilisation (cast/splint/boot)",
                                "Any prescribed blood thinners",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Worth purchasing",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Waterproof cover** (like a Limbo) for showering — we cover this in detail in [Washing & Hygiene](/standard/washing-and-hygiene)",
                                "**Leg elevation wedge/pillow** — more comfortable than stacking pillows",
                                "A small **backpack/bum bag** — we cover mobility aids in [Crutches & Mobility](/standard/crutches-and-mobility)",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "We cover sleeping, washing, and mobility in detail later — for now, just get through Week 1.",
                        },
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: faqs,
        },
    ],
};
