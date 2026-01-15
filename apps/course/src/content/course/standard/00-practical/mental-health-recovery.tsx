import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "mental-health-recovery",
    title: "Mental Health & Psychological Recovery",
    description:
        "Managing frustration, anxiety, depression, and fear of re-injury during recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Recovery from an Achilles rupture isn't just physical — it's psychological too. Frustration, anxiety, depression, and fear of re-injury are all normal parts of this journey. You're not alone in these feelings, and addressing your mental health is just as important as your physical recovery. This lesson helps you understand what's normal, when to seek help, and practical strategies for managing your mental health during recovery.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Mental health basics",
            items: [
                {
                    text:
                        "Acknowledge your feelings — frustration, anxiety, and sadness are normal",
                },
                {
                    text:
                        "Stay connected — isolation makes everything harder",
                },
                {
                    text:
                        "Set realistic expectations — recovery takes time",
                },
                {
                    text:
                        "Celebrate small wins — progress happens gradually",
                },
                {
                    text:
                        "Seek support — friends, family, or professional help if needed",
                },
            ],
        },
        {
            type: "section",
            title: "Common Psychological Challenges",
            content: [
                {
                    type: "text",
                    content:
                        "Recovery from Achilles rupture brings unique psychological challenges. Understanding what's normal helps you recognize when you might need extra support.",
                },
                {
                    type: "card",
                    title: "Frustration and impatience",
                    description: "Feeling stuck or slow progress.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it happens:** Recovery is slow. You're used to being active, and suddenly you're limited. Progress feels invisible.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Normal feelings:** 'Why is this taking so long?', 'I should be better by now'",
                                "**Reality:** Recovery takes 6-12 months — this is normal, not slow",
                                "**What helps:** Track objective progress, celebrate small wins, remind yourself this is temporary",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Anxiety about recovery",
                    description: "Worrying about the future.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it happens:** Uncertainty about recovery, fear of permanent limitations, financial concerns, work worries.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Normal feelings:** 'Will I ever run again?', 'What if I re-rupture?', 'How will I manage work?'",
                                "**Reality:** Most people recover well, but anxiety is understandable",
                                "**What helps:** Focus on what you can control, talk to your clinician about concerns, practice mindfulness or breathing exercises",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Depression and low mood",
                    description: "Feeling down or hopeless.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it happens:** Loss of activity, isolation, pain, disrupted sleep, feeling dependent on others.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Normal feelings:** Sadness, loss of interest, fatigue, difficulty concentrating",
                                "**When to be concerned:** Persistent low mood, thoughts of self-harm, inability to function",
                                "**What helps:** Stay connected, maintain routine, seek professional help if needed",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Kinesiophobia (fear of re-injury)",
                    description: "Being afraid to use your leg.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Why it happens:** After a serious injury, your brain becomes protective. You're afraid to trust your leg again.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Normal feelings:** Hesitation to bear weight, fear of certain movements, over-cautiousness",
                                "**Reality:** Some caution is healthy, but excessive fear can slow recovery",
                                "**What helps:** Gradual exposure, trust your physio's guidance, celebrate each step forward",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Practical Strategies for Mental Health",
            content: [
                {
                    type: "text",
                    content:
                        "There are practical things you can do to support your mental health during recovery. These strategies help you cope with the challenges and maintain a positive outlook.",
                },
                {
                    type: "card",
                    title: "Stay connected",
                    description: "Don't isolate yourself.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Reach out to friends and family** — even if you can't do activities together",
                                "**Join online support groups** — connect with others going through the same thing",
                                "**Maintain social contact** — video calls, visits, social media",
                                "**Talk about your feelings** — don't bottle things up",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Set realistic expectations",
                    description: "Understand what recovery looks like.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Recovery takes 6-12 months** — this is normal, not slow",
                                "**Progress is gradual** — you won't notice changes daily",
                                "**Setbacks happen** — they're normal, not failures",
                                "**Compare to yourself** — not to others or your pre-injury self",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Celebrate small wins",
                    description: "Acknowledge progress.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Track objective progress** — note what you can do now vs last week",
                                "**Celebrate milestones** — first steps without crutches, removing a wedge, etc.",
                                "**Focus on what you CAN do** — not just what you can't",
                                "**Keep a recovery journal** — write down progress and feelings",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Maintain routine",
                    description: "Structure helps mental health.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Wake up at consistent times** — even if you can't do much",
                                "**Plan your day** — include exercises, rest, social time",
                                "**Keep up with hobbies** — adapt them to your limitations",
                                "**Maintain work routine** — if working from home",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Practice self-care",
                    description: "Take care of yourself.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Get enough sleep** — sleep affects mood",
                                "**Eat well** — nutrition supports mental health",
                                "**Practice relaxation** — breathing exercises, meditation, mindfulness",
                                "**Do things you enjoy** — reading, music, hobbies",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "When to Seek Professional Help",
            content: [
                {
                    type: "text",
                    content:
                        "It's normal to struggle mentally during recovery. But sometimes, professional help is needed. Here's when to consider seeking support:",
                },
                {
                    type: "card",
                    title: "Signs you might need help",
                    description: "When to reach out.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Persistent low mood** — feeling down most days for 2+ weeks",
                                "**Loss of interest** — in things you used to enjoy",
                                "**Difficulty functioning** — can't do daily tasks",
                                "**Thoughts of self-harm** — or suicide",
                                "**Excessive anxiety** — that interferes with daily life",
                                "**Sleep problems** — insomnia or sleeping too much",
                                "**Appetite changes** — significant weight loss or gain",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Crisis support",
                    content:
                        "If you're having thoughts of self-harm or suicide, seek immediate help. Contact emergency services, a crisis helpline, or go to A&E. You don't have to go through this alone.",
                },
                {
                    type: "card",
                    title: "Where to get help",
                    description: "Resources for support.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Your GP** — can refer you to mental health services",
                                "**Counselling services** — private or NHS",
                                "**Support groups** — online or in-person",
                                "**Crisis helplines** — available 24/7",
                                "**Your physiotherapist** — may have resources or referrals",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Psychological Readiness for Return to Sport",
            content: [
                {
                    type: "text",
                    content:
                        "Physical readiness isn't enough — you need to be psychologically ready too. Fear of re-injury can hold you back even when you're physically capable.",
                },
                {
                    type: "card",
                    title: "Signs of psychological readiness",
                    description: "When you're mentally ready.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Confidence in your leg** — you trust it won't give way",
                                "**No excessive fear** — some caution is healthy, but not paralyzing fear",
                                "**Willingness to push** — you're ready to challenge yourself",
                                "**Acceptance of risk** — you understand there's always some risk",
                                "**Positive mindset** — you're excited to return, not just anxious",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Addressing psychological barriers",
                    description: "How to overcome fear.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gradual exposure** — start with low-risk activities",
                                "**Trust your physio** — they know when you're ready",
                                "**Visualization** — imagine yourself performing successfully",
                                "**Focus on process** — not just outcomes",
                                "**Celebrate each step** — build confidence gradually",
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
                    title: "Usually normal during recovery",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Frustration** — recovery is slow, frustration is normal",
                                "**Anxiety** — worrying about recovery is understandable",
                                "**Low mood** — occasional sadness is normal",
                                "**Fear of re-injury** — some caution is healthy",
                                "**Mood swings** — ups and downs are common",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent help",
                    content:
                        "**Thoughts of self-harm or suicide** — contact emergency services immediately. **Severe depression** — persistent low mood, inability to function. **Severe anxiety** — panic attacks, unable to leave house. **Substance abuse** — using alcohol or drugs to cope.",
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask your healthcare team",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Mental health:** "I\'m struggling mentally — is this normal? When should I seek help?"',
                        '**Support:** "Are there support groups or resources you can recommend?"',
                        '**Medication:** "Would medication help with my anxiety/depression?"',
                        '**Counselling:** "Can you refer me to mental health services?"',
                        '**Recovery concerns:** "I\'m worried about my recovery — can we discuss this?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Is it normal to feel depressed during recovery?",
                    answer:
                        "Yes, it's very normal. Recovery is challenging — you've lost your normal activities, you're in pain, you're isolated, and progress feels slow. Occasional low mood is expected. However, if you're feeling persistently down, unable to function, or having thoughts of self-harm, seek professional help.",
                },
                {
                    question: "How do I deal with fear of re-injury?",
                    answer:
                        "Some fear is normal and healthy — it keeps you cautious. But excessive fear can slow recovery. Work with your physiotherapist to gradually expose yourself to activities, start with low-risk movements, and celebrate each step forward. Trust your physio's guidance — they know when you're ready.",
                },
                {
                    question: "I'm frustrated with slow progress — is this normal?",
                    answer:
                        "Absolutely. Recovery takes 6-12 months, and progress is gradual. You won't notice changes daily. This is normal, not slow. Track objective progress (what you can do now vs last week), celebrate small wins, and remind yourself this is temporary.",
                },
                {
                    question: "When should I seek professional mental health help?",
                    answer:
                        "If you're experiencing persistent low mood (2+ weeks), thoughts of self-harm, inability to function, or severe anxiety that interferes with daily life, seek professional help. Your GP can refer you to mental health services, or you can access private counselling or support groups.",
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
                        "**Your feelings are normal** — frustration, anxiety, and sadness are part of recovery",
                        "**Stay connected** — isolation makes everything harder",
                        "**Set realistic expectations** — recovery takes 6-12 months",
                        "**Celebrate small wins** — progress happens gradually",
                        "**Seek help if needed** — there's no shame in asking for support",
                    ],
                },
            ],
        },
    ],
};
