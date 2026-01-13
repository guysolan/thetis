import type { SectionContent } from "@/components/course/types";
import PracticalLifeWeek10 from "../../../assets/practical-life-week-10.png";

export const metadata = {
    slug: "practical-life",
    title: "Practical Life at Weeks 7-9",
    description: "Returning to work, driving guidelines, and social activities",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 10, you're likely thinking about returning to normal life: work, driving, social activities. These practical questions matter — they affect your daily life, income, and relationships. This lesson covers the guidelines, but remember: your specific situation depends on your job, which leg is injured, and your clinician's guidance.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Practical life basics",
            items: [
                {
                    text:
                        "Discuss work with your clinician and employer — timing depends on your job",
                },
                {
                    text:
                        "Understand driving rules — depends on which leg is injured and local laws",
                },
                {
                    text:
                        "Plan social activities carefully — consider accessibility and energy levels",
                },
                {
                    text:
                        "Get necessary documentation — work notes, insurance forms, etc.",
                },
                {
                    text:
                        "Be realistic — recovery takes time, don't rush back too soon",
                },
            ],
        },
        {
            type: "section",
            title: "Returning to Work",
            content: [
                {
                    type: "image",
                    src: PracticalLifeWeek10,
                    alt: "Educational diagram showing practical life considerations: returning to work (desk job with foot elevation, physical job considerations), driving guidelines (which leg affects driving), and social activities",
                    caption:
                        "Practical life considerations: work, driving, and social activities require planning and realistic expectations",
                },
                {
                    type: "text",
                    content:
                        "When you can return to work depends on your job, which leg is injured, and your recovery progress. There's no one-size-fits-all answer, but there are general guidelines.",
                },
                {
                    type: "card",
                    title: "Desk jobs",
                    description: "Usually easier to return to.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Timing:** Often possible around weeks 4-6, sometimes earlier",
                                "**Considerations:** Elevation space, crutch-friendly workspace, fatigue",
                                "**Modifications:** May need to elevate foot, work from home, reduced hours",
                                "**Energy:** You'll be tired, don't expect full productivity immediately",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Physical jobs",
                    description: "Require more time off.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Timing:** Usually weeks 8-12 or longer, depends on job demands",
                                "**Considerations:** Standing, walking, lifting, safety requirements",
                                "**Modifications:** May need light duties, different role, or extended leave",
                                "**Safety:** Can't return until you can perform job safely",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to approach work return",
                    description: "Practical steps.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Talk to your clinician** — get their assessment and recommendations",
                                "**Discuss with employer** — explore options for modified duties or gradual return",
                                "**Get documentation** — work notes, insurance forms, whatever's needed",
                                "**Plan gradual return** — part-time or reduced hours initially",
                                "**Be realistic** — you'll be tired, productivity may be lower",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "If you work at a desk, set up your workspace before returning: a footrest or stool for elevation, space for crutches, easy access to everything you need. A few minutes of preparation makes your return much easier and more comfortable.",
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
                        "Driving rules depend on which leg is injured, your recovery progress, and local laws. **Safety is the priority** — you must be able to drive safely, including emergency braking.",
                },
                {
                    type: "card",
                    title:
                        "Right leg injured (or left in right-hand drive countries)",
                    description: "Affects the gas/brake foot.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "If your right leg (brake/gas foot) is injured, you typically **cannot drive** until you can walk without crutches and have full control of your foot.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Timing:** Usually weeks 8-12 or longer",
                                "**Requirement:** Must be able to brake safely in emergency",
                                "**Legal:** Check local laws — driving with impaired ability may be illegal",
                                "**Insurance:** May not be covered if driving when unsafe",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title:
                        "Left leg injured (or right in right-hand drive countries)",
                    description: "Affects the clutch foot.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "If your left leg (clutch foot) is injured, you may be able to drive automatic cars earlier, but manual cars require full function.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Automatic cars:** May be possible around weeks 6-8 if you can walk with crutches",
                                "**Manual cars:** Need full function, usually weeks 8-12",
                                "**Requirement:** Must be able to drive safely, including emergency situations",
                                "**Check with clinician:** They'll assess your ability",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Safety considerations",
                    description: "What matters most.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Emergency braking** — can you brake hard if needed?",
                                "**Reaction time** — is your reaction time normal?",
                                "**Pain medication** — some medications affect driving ability",
                                "**Fatigue** — are you alert enough to drive safely?",
                                "**Local laws** — check legal requirements in your area",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Legal and safety warning",
                    content:
                        "Driving when you're not safe is illegal and dangerous. You could cause an accident, injure yourself or others, and invalidate your insurance. When in doubt, don't drive. Check with your clinician and local laws before returning to driving.",
                },
            ],
        },
        {
            type: "section",
            title: "Social Activities and Travel",
            content: [
                {
                    type: "text",
                    content:
                        "Social activities and travel are possible, but require planning and realistic expectations. You're not housebound, but you can't do everything you used to.",
                },
                {
                    type: "card",
                    title: "Social activities",
                    description: "What's possible.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Visiting friends** — possible, but consider accessibility and energy",
                                "**Restaurants** — possible, but check accessibility and seating",
                                "**Movies/theater** — possible, but need accessible seating and leg room",
                                "**Outdoor activities** — limited, depends on terrain and accessibility",
                                "**Parties/events** — possible, but you'll tire easily",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Travel considerations",
                    description: "What to think about.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Flying:** Possible, but check airline policies and DVT risk",
                                "**Car travel:** Long trips require frequent stops for elevation",
                                "**Accessibility:** Check hotels, venues, transportation",
                                "**Energy:** You'll tire easily, plan rest time",
                                "**Medical care:** Know where to get help if needed",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Planning makes it easier",
                    content:
                        "Before any social activity or travel, call ahead: check accessibility, request accessible seating, confirm you can bring crutches, ask about parking. A few phone calls prevent frustration and make activities much more enjoyable.",
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
                                "**Feeling frustrated** about limitations — wanting to do more",
                                "**Tiredness** — activities take more energy than before",
                                "**Difficulty with activities** — things that were easy are now hard",
                                "**Worry about work/money** — financial concerns are normal",
                                "**Missing social life** — feeling isolated or left out",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe pain**, **numb/blue/pale toes**, severe pressure/pain, fever with rapidly spreading redness, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Life Easier",
            content: [
                {
                    type: "text",
                    content:
                        "Returning to normal life requires adjustments. Here are strategies to make it easier:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Plan ahead** — call venues, check accessibility, arrange help",
                        "**Pace yourself** — don't try to do everything at once",
                        "**Ask for help** — friends and family want to help, let them",
                        "**Be realistic** — you can't do everything you used to, and that's okay",
                        "**Prioritize** — focus on what matters most, let other things wait",
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
                                "You can help by: providing transportation, helping with accessibility planning, being patient with limitations, supporting gradual return to activities, and understanding that recovery takes time — they're not being lazy, they're healing.",
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
                        "**This week:** Continue managing practical life, prepare for boot removal",
                        "**Week 10, Day 4:** We cover leaving your boot behind",
                        "**Weeks 10-12:** Boot removal, transition to shoes",
                        "**After boot removal:** More activities become possible, but still gradual",
                    ],
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
                        '**Work:** "When can I return to work? What modifications do I need?"',
                        '**Driving:** "When can I drive? What are the safety requirements?"',
                        '**Travel:** "Can I travel? What precautions should I take?"',
                        '**Activities:** "What activities are safe? What should I avoid?"',
                        '**Documentation:** "What notes or forms do you need to complete?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I go back to work?",
                    answer:
                        "This depends on your job, which leg is injured, and your recovery progress. Desk jobs may be possible around weeks 4-6, physical jobs usually require weeks 8-12 or longer. Discuss with your clinician and employer — they'll help you determine the right timing and any needed modifications.",
                },
                {
                    question: "Can I drive with my left leg in a boot?",
                    answer:
                        "If your left leg is injured and you drive an automatic car, you may be able to drive around weeks 6-8 if you can walk with crutches and drive safely. Manual cars require full function. Always check with your clinician and local laws — safety is the priority.",
                },
                {
                    question: "Can I fly while in a boot?",
                    answer:
                        "Yes, but check airline policies (some require medical clearance), consider DVT risk (move around, compression socks, stay hydrated), and plan for accessibility. Long flights require frequent movement and elevation when possible. Discuss travel plans with your clinician.",
                },
                {
                    question:
                        "What if my employer wants me back sooner than I'm ready?",
                    answer:
                        "Your clinician can provide documentation explaining why you can't return yet and what modifications are needed. You have rights — don't return before you're ready and safe. Discuss with your clinician, employer, and potentially HR or union if needed.",
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
                        "**Safety first** — don't return to work or driving until safe",
                        "**Be realistic** — recovery takes time, don't rush",
                        "**Plan ahead** — accessibility and modifications make life easier",
                        "**Ask for help** — friends, family, clinicians can all help",
                    ],
                },
            ],
        },
    ],
};
