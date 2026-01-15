import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "returning-to-life",
    title: "Returning to Normal Life",
    description:
        "Work, driving, household tasks, and nutrition for tendon health",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 22, you're likely back to many normal activities. You're walking better, building strength, and feeling more like yourself. But returning to normal life involves more than just physical recovery — it's about work, driving, household tasks, and taking care of your body. This lesson covers practical aspects of returning to normal life and how nutrition supports tendon health.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Returning to life basics",
            items: [
                {
                    text:
                        "Gradually increase activity — don't rush back to everything at once",
                },
                {
                    text:
                        "Listen to your body — rest when needed, don't push through fatigue",
                },
                {
                    text:
                        "Eat well — balanced nutrition supports tendon healing",
                },
                {
                    text:
                        "Manage energy — recovery takes energy, pace yourself",
                },
                {
                    text:
                        "Stay consistent with exercises — don't stop just because you're back to normal activities",
                },
                {
                    text: "Be patient — full return to normal life takes time",
                },
            ],
        },
        {
            type: "section",
            title: "Returning to Work",
            content: [
                {
                    type: "text",
                    content:
                        "By Week 22, many people have returned to work or are planning to. How this works depends on your job type, which leg is injured, and your recovery progress.",
                },
                {
                    type: "card",
                    title: "Desk jobs",
                    description: "Returning to office work.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Usually possible by Week 6-10** — if you can sit comfortably",
                                "**Consider ergonomics** — elevate your foot, take breaks to move",
                                "**Manage swelling** — elevate your foot when possible",
                                "**Take breaks** — get up and move regularly",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Physical jobs",
                    description: "Returning to active work.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Timing varies** — depends on job demands and recovery",
                                "**May need modified duties** — lighter duties initially",
                                "**Gradual return** — start part-time, build up gradually",
                                "**Follow clinician guidance** — they'll assess when you're ready",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Driving Guidelines",
            content: [
                {
                    type: "text",
                    content:
                        "Driving depends on which leg is injured and local laws. Check your local regulations — they vary by country and state.",
                },
                {
                    type: "card",
                    title: "Right leg injured (UK/Australia)",
                    description: "Driving with right leg injury.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Usually can't drive initially** — right leg controls brake and accelerator in manual cars",
                        },
                        {
                            type: "text",
                            content:
                                "**Automatic cars may be possible** — if you can use left foot for brake",
                        },
                        {
                            type: "text",
                            content:
                                "**Check local laws** — regulations vary, check with your clinician",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Left leg injured (UK/Australia)",
                    description: "Driving with left leg injury.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Usually can drive** — left leg only controls clutch in manual cars",
                        },
                        {
                            type: "text",
                            content:
                                "**Automatic cars are fine** — left leg not needed",
                        },
                        {
                            type: "text",
                            content:
                                "**Check local laws** — regulations vary, check with your clinician",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    content:
                        "**Safety first.** Don't drive if you can't operate controls safely. Check local laws and insurance requirements. Your clinician can provide guidance.",
                },
            ],
        },
        {
            type: "section",
            title: "Household Tasks and Daily Activities",
            content: [
                {
                    type: "text",
                    content:
                        "Returning to household tasks and daily activities happens gradually. Don't rush — your body is still recovering.",
                },
                {
                    type: "card",
                    title: "Safe activities",
                    description: "What you can usually do.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Light household tasks** — cooking, cleaning (with breaks)",
                                "**Shopping** — if you can walk comfortably",
                                "**Social activities** — meeting friends, going out",
                                "**Hobbies** — activities that don't stress your tendon",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Activities to avoid or modify",
                    description: "What to be careful with.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heavy lifting** — avoid heavy objects initially",
                                "**Ladders** — be careful, balance may be affected",
                                "**Prolonged standing** — take breaks, elevate when possible",
                                "**High-impact activities** — running, jumping, high-impact sports",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Nutrition for Tendon Health",
            content: [
                {
                    type: "text",
                    content:
                        "Good nutrition supports tendon healing and recovery. While supplements aren't essential, a balanced diet helps your body heal.",
                },
                {
                    type: "card",
                    title: "Key nutrients for tendon health",
                    description: "What your body needs.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content: "**Protein**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Essential for tissue repair — tendons are made of collagen (protein)",
                                "Sources: lean meat, fish, eggs, dairy, legumes, nuts",
                                "Aim for adequate protein intake — your body needs it for healing",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Vitamin C**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Helps collagen formation — crucial for tendon healing",
                                "Sources: citrus fruits, berries, peppers, broccoli",
                                "Include in your diet — supports healing",
                            ],
                        },
                        {
                            type: "text",
                            content: "**Zinc**",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Supports tissue repair — important for healing",
                                "Sources: meat, seafood, nuts, seeds",
                                "Include in balanced diet",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Balanced diet is key",
                    description: "You don't need supplements.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**A balanced diet is sufficient** — you don't need special supplements. Focus on whole foods, variety, and adequate protein.",
                        },
                        {
                            type: "text",
                            content:
                                "**Stay hydrated** — water supports all body functions, including healing.",
                        },
                        {
                            type: "text",
                            content:
                                "**Avoid excessive alcohol** — alcohol can interfere with healing.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Managing Energy and Fatigue",
            content: [
                {
                    type: "text",
                    content:
                        "Recovery takes energy. Returning to normal life while still recovering can be exhausting. Managing your energy is crucial.",
                },
                {
                    type: "card",
                    title: "Why you're tired",
                    description: "The energy cost of recovery.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Healing takes energy** — your body is working hard to repair tissue",
                                "**Exercises use energy** — physio and exercises are tiring",
                                "**Mental fatigue** — recovery is mentally exhausting too",
                                "**Decreased fitness** — your fitness has decreased, activities feel harder",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to manage energy",
                    description: "Practical strategies.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Pace yourself** — don't try to do everything at once",
                                "**Prioritize** — focus on what's most important",
                                "**Rest when needed** — listen to your body",
                                "**Sleep well** — quality sleep supports recovery",
                                "**Eat well** — good nutrition provides energy",
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
                                "**Feeling tired** — recovery takes energy",
                                "**Some difficulty with activities** — you're still recovering",
                                "**Good days and bad days** — some days are better than others",
                                "**Gradual improvement** — returning to normal life happens gradually",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        "**Severe pain** that doesn't ease — pain shouldn't be severe. **New \"pop\" or snap** — if you feel or hear a new pop, stop immediately and seek urgent care. **Signs of DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Signs of PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting.",
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Return to Life Work",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Gradually increase activity** — don't rush back to everything at once",
                        "**Listen to your body** — rest when needed",
                        "**Stay consistent with exercises** — don't stop just because you're back to normal activities",
                        "**Eat well** — balanced nutrition supports recovery",
                        "**Manage energy** — pace yourself, prioritize",
                        "**Be patient** — full return to normal life takes time",
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
                                "You can help by: supporting gradual return to activities, helping with tasks if needed, understanding that recovery takes energy, encouraging consistency with exercises, and being patient — returning to normal life is a gradual process.",
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
                        "**This week:** Continue returning to normal life gradually",
                        "**Week 25:** We cover the 6-month milestone — where your tendon is now, return-to-sport criteria",
                        "**Weeks 22-30:** Continue building strength and function",
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
                        '**Work:** "When can I return to work? What should I consider?"',
                        '**Activities:** "What activities are safe? What should I avoid?"',
                        '**Energy:** "I\'m feeling very tired. Is this normal? How can I manage it?"',
                        '**Nutrition:** "Should I change my diet? Do I need supplements?"',
                        '**Timeline:** "When will I be back to normal activities?"',
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
                    question: "When can I return to work?",
                    answer:
                        "It depends on your job type. Desk jobs: usually Week 6-10 if you can sit comfortably. Physical jobs: timing varies, may need modified duties initially. Your clinician will guide you based on your specific situation.",
                },
                {
                    question:
                        "Do I need special supplements for tendon healing?",
                    answer:
                        "No, a balanced diet is sufficient. Focus on adequate protein, vitamin C, zinc, and whole foods. Supplements aren't essential — good nutrition from food is enough.",
                },
                {
                    question: "Why am I so tired?",
                    answer:
                        "Recovery takes energy. Your body is working hard to heal, exercises are tiring, and your fitness has decreased. This is normal. Pace yourself, rest when needed, eat well, and sleep well.",
                },
                {
                    question: "When will I be back to normal activities?",
                    answer:
                        "It varies, but most people return to most normal activities by 3-4 months. Full return to all activities (including sports) takes longer. Be patient — gradual return is safer than rushing.",
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
                        "**Gradually increase activity** — don't rush back to everything at once",
                        "**Stay consistent with exercises** — don't stop just because you're back to normal activities",
                        "**Eat well** — balanced nutrition supports recovery",
                        "**Be patient** — full return to normal life takes time",
                    ],
                },
            ],
        },
    ],
};
