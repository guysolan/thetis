import type { SectionContent } from "@/components/course/types";
import NormalVsUrgentWeek7 from "../../../assets/normal-vs-urgent-week-7.png";

export const metadata = {
    slug: "common-challenges",
    title: "Managing Common Challenges",
    description:
        "Swelling, skin care, hot foot, and mental health during recovery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 7, you're likely dealing with some frustrating challenges: persistent swelling, skin issues, a hot foot, and maybe some mental health struggles. These are all normal parts of recovery, but they can feel overwhelming. You're not alone in this, and there are practical ways to manage each challenge.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Managing challenges",
            items: [
                {
                    text:
                        "Elevate when resting — helps reduce swelling and discomfort",
                },
                {
                    text:
                        "Check your skin daily — look for pressure points, redness, or irritation",
                },
                {
                    text:
                        "Keep the boot clean — remove liner if possible, wash regularly",
                },
                {
                    text:
                        "Address mental health — acknowledge feelings, seek support if needed",
                },
                {
                    text:
                        "Stay connected — isolation makes everything harder",
                },
            ],
        },
        {
            type: "section",
            title: "Managing Persistent Swelling",
            content: [
                {
                    type: "text",
                    content:
                        "Swelling is your body's way of healing, but too much swelling causes pain, stiffness, and slows recovery. Think of swelling like **water in a bucket** — elevation helps drain it, but gravity keeps filling it back up when you're upright.",
                },
                {
                    type: "card",
                    title: "Why swelling persists",
                    description: "Understanding the cause helps you manage it.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gravity** — when you're upright, fluid pools in your foot",
                                "**Inflammation** — your body is still healing, creating fluid",
                                "**Reduced movement** — less muscle pump to move fluid",
                                "**Boot compression** — can trap fluid if straps are too tight",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What helps reduce swelling",
                    description: "Practical strategies.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Elevation** — ankle above heart level, especially after activity",
                                "**Ice** — 20-30 minutes on, 30 minutes off (with cloth barrier)",
                                "**Movement** — gentle ankle pumps when safe (check with clinician)",
                                "**Proper boot fit** — straps shouldn't be cutting off circulation",
                                "**Compression** — some people find compression socks helpful (check with clinician)",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Swelling typically improves as you heal, but it can persist for weeks or months. Some swelling is normal even after you're walking normally. Focus on managing it, not eliminating it completely.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Elevate your foot for 15 minutes every 2-3 hours, even if you're busy. Set a phone reminder. This small habit makes a big difference in swelling and comfort. You don't need to elevate all day — just regular short sessions.",
                },
            ],
        },
        {
            type: "section",
            title: "Skin Care and Pressure Points",
            content: [
                {
                    type: "text",
                    content:
                        "Your skin is trapped inside a boot 24/7, which can cause problems: rubbing, pressure sores, and irritation. Good skin care prevents these issues and keeps you comfortable.",
                },
                {
                    type: "card",
                    title: "Common skin problems",
                    description: "What to watch for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Rubbing** — straps or boot edges rubbing against skin",
                                "**Pressure points** — areas where the boot presses too hard",
                                "**Sweating** — moisture trapped inside the boot",
                                "**Dryness** — skin can become dry and flaky",
                                "**Redness** — areas that are irritated or inflamed",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to care for your skin",
                    description: "Daily skin care routine.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Check daily** — look at your skin when you remove the boot (if allowed)",
                                "**Keep clean** — wash your foot and leg daily if possible",
                                "**Dry thoroughly** — moisture causes problems",
                                "**Use padding** — soft material under straps or pressure points",
                                "**Change socks** — if you wear socks in the boot, change daily",
                                "**Moisturize** — keep skin hydrated (avoid between toes)",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "If you get pressure sores",
                    description: "What to do.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Add padding** — soft material between skin and boot",
                                "**Adjust straps** — loosen if too tight, reposition if rubbing",
                                "**Check boot fit** — may need different size or adjustment",
                                "**Contact clinician** — if sores are severe or getting worse",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "If you get open sores, severe redness that doesn't improve, or signs of infection (pus, spreading redness, fever), contact your clinician immediately. Don't ignore skin problems — they can get serious quickly.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Hot Foot and Temperature Issues",
            content: [
                {
                    type: "text",
                    content:
                        "Many people experience a 'hot foot' — their foot feels hot, burning, or uncomfortable inside the boot. This is usually normal, but it can be very uncomfortable.",
                },
                {
                    type: "card",
                    title: "Why your foot feels hot",
                    description: "Common causes.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Swelling** — increased blood flow makes foot feel hot",
                                "**Boot insulation** — boot traps heat",
                                "**Inflammation** — healing process creates heat",
                                "**Reduced airflow** — boot doesn't breathe well",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What helps",
                    description: "Cooling strategies.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Elevation** — helps reduce blood flow and heat",
                                "**Ice** — 20-30 minutes on (with cloth barrier)",
                                "**Remove boot briefly** — if protocol allows, air it out",
                                "**Lighter socks** — thin, breathable material",
                                "**Room temperature** — keep room cooler if possible",
                                "**Night splint** — lighter and cooler than boot for sleeping",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** If your foot is hot AND you have severe pain, numbness, blue/pale toes, or spreading redness, this could be a circulation or infection problem. Contact your clinician urgently.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Mental Health During Recovery",
            content: [
                {
                    type: "text",
                    content:
                        "Recovery is hard mentally, not just physically. It's normal to feel frustrated, anxious, depressed, or isolated. Acknowledging these feelings is the first step to managing them.",
                },
                {
                    type: "card",
                    title: "Common mental health challenges",
                    description: "You're not alone in feeling this way.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Frustration** — recovery feels slow, you want to be better now",
                                "**Anxiety** — worry about re-injury, healing, the future",
                                "**Depression** — feeling down, loss of motivation",
                                "**Isolation** — stuck at home, missing normal life",
                                "**Fear** — scared of re-rupture, permanent damage",
                                "**Grief** — mourning your old life, abilities, independence",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What helps",
                    description: "Practical mental health strategies.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Acknowledge feelings** — it's okay to feel frustrated or sad",
                                "**Stay connected** — talk to friends, family, support groups",
                                "**Set small goals** — celebrate small wins, not just big milestones",
                                "**Routine** — structure helps, even if it's simple",
                                "**Distraction** — hobbies, books, shows, anything that helps",
                                "**Professional help** — if feelings are overwhelming, consider therapy",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Kinesiophobia (fear of movement)",
                    description: "A common but manageable fear.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Many people develop a fear of moving their injured leg — worried they'll re-injure it. This is called kinesiophobia, and it's very common. The fear is understandable, but avoiding movement can slow recovery.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**It's normal** — most people feel this way at some point",
                                "**Trust your protocol** — your clinician knows what's safe",
                                "**Start small** — gradual exposure helps reduce fear",
                                "**Talk about it** — discuss fears with your clinician or therapist",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Remember",
                    content:
                        "Mental health is part of recovery. If you're struggling, you're not weak — you're human. Recovery is hard. It's okay to ask for help, whether that's from friends, family, or professionals. Taking care of your mental health helps your physical recovery.",
                },
            ],
        },
        {
            type: "section",
            title: "What's Normal vs What's Urgent",
            content: [
                {
                    type: "image",
                    src: NormalVsUrgentWeek7,
                    alt: "Two-column comparison showing usually normal symptoms (swelling, mild discomfort, tiredness, stiffness) versus urgent symptoms requiring immediate help (severe pain, numb toes, chest pain, new calf pain, fever)",
                    caption:
                        "Know the difference: normal recovery challenges vs urgent warning signs",
                },
                {
                    type: "card",
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Persistent swelling** — especially after activity or when upright",
                                "**Skin irritation** — mild redness or rubbing from the boot",
                                "**Hot foot** — foot feeling warm inside the boot",
                                "**Frustration or anxiety** — feeling overwhelmed by recovery",
                                "**Difficulty sleeping** — boot discomfort, worry, pain",
                                "**Feeling isolated** — missing normal activities and social life",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe skin problems** (open sores, spreading redness, pus), **signs of infection** (fever, rapidly spreading redness), **numb/blue/pale toes**, severe pressure/pain, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Managing Multiple Challenges",
            content: [
                {
                    type: "text",
                    content:
                        "When you're dealing with multiple challenges at once, it can feel overwhelming. Here are strategies to manage them together:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Prioritize** — focus on the most urgent issues first",
                        "**Combine strategies** — elevate while checking skin, ice while reading",
                        "**Ask for help** — partners, carers, clinicians can all help",
                        "**Be patient** — these challenges improve over time",
                        "**Track progress** — note what helps, what doesn't",
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
                                "You can help by: checking skin when they can't see it, helping with boot cleaning, providing emotional support (listening, not fixing), encouraging small wins, and helping them stay connected to friends and activities. Mental health support is as important as physical support.",
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
                        "**This week:** Continue managing challenges, focus on what helps",
                        "**Week 8:** We cover the final boot phase and preparing for boot removal",
                        "**Weeks 8-10:** Challenges typically improve as you heal",
                        "**After boot removal:** Many challenges resolve, new ones may appear",
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
                        '**Swelling:** "Is this amount of swelling normal? What can I do about it?"',
                        '**Skin:** "I have redness/rubbing here — is this okay? What should I do?"',
                        '**Hot foot:** "My foot feels very hot — is this normal? What helps?"',
                        '**Mental health:** "I\'m struggling mentally — is this normal? Where can I get help?"',
                        '**Boot cleaning:** "Can I remove the boot to clean it? How often?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How long will the swelling last?",
                    answer:
                        "Swelling typically improves over weeks and months, but some swelling can persist for 6-12 months or longer. It usually gets better as you become more active and your circulation improves. Focus on managing it rather than eliminating it completely.",
                },
                {
                    question: "What if my skin is getting worse despite care?",
                    answer:
                        "If skin problems are getting worse despite good care, contact your clinician. You may need a different boot size, padding adjustments, or treatment for skin issues. Don't ignore worsening skin problems — they can become serious.",
                },
                {
                    question: "Is it normal to feel depressed during recovery?",
                    answer:
                        "Yes, it's very normal. Recovery is hard, isolating, and frustrating. Many people experience depression, anxiety, or other mental health challenges. If feelings are overwhelming or affecting your daily life, consider talking to a therapist or counselor. Mental health is part of recovery.",
                },
                {
                    question: "When will I feel normal again?",
                    answer:
                        "This varies, but many people start feeling more like themselves around weeks 8-12 as they become more mobile and independent. Full recovery takes 6-12 months, but you don't need to wait that long to feel better. Focus on small wins and progress, not just the end goal.",
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
                        "**These challenges are normal** — you're not alone in experiencing them",
                        "**Manage, don't eliminate** — focus on making things manageable",
                        "**Mental health matters** — take care of your mind as well as your body",
                        "**Ask for help** — clinicians, partners, friends, professionals can all help",
                    ],
                },
            ],
        },
    ],
};
