import type { SectionContent } from "@/components/course/types";
import DrivingRestrictions from "@/assets/driving-restrictions-v3-with-mike.png";

export const metadata = {
    slug: "driving-guidelines",
    title: "Driving After Achilles Rupture",
    description:
        "When you can drive, left vs right leg injury, automatic vs manual, and insurance considerations",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "One of the most common questions during recovery is: 'When can I drive?' The answer depends on which leg is injured, what type of car you have, and your insurance. This lesson covers the guidelines, but remember: safety comes first. When in doubt, don't drive.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Driving basics",
            items: [
                {
                    text:
                        "Right leg injured — cannot drive while in boot, typically week 10-12 earliest",
                },
                {
                    text:
                        "Left leg injured — may be possible earlier with automatic car (weeks 4-6)",
                },
                {
                    text:
                        "Check insurance — ensure you're covered for driving with injury",
                },
                {
                    text:
                        "Get medical clearance — discuss with your clinician",
                },
                {
                    text:
                        "Safety first — when in doubt, don't drive",
                },
            ],
        },
        {
            type: "image",
            src: DrivingRestrictions,
            alt: "Comparison showing driving restrictions: Right leg injured (cannot drive while in boot, week 10-12 earliest) vs Left leg injured (potentially weeks 4-6 with automatic car)",
            caption: "Driving restrictions depend on which leg is injured and your car type",
        },
        {
            type: "section",
            title: "Right Leg Injured (Accelerator/Brake Leg)",
            content: [
                {
                    type: "text",
                    content:
                        "If your **right leg** is injured, driving is much more restricted. This is your accelerator and brake leg, so you need full function before driving safely.",
                },
                {
                    type: "card",
                    title: "While in the boot",
                    description: "Cannot drive.",
                    variant: "danger",
                    content: [
                        {
                            type: "text",
                            content:
                                "**You CANNOT drive while wearing the boot.** The boot is too bulky, restricts movement, and makes it unsafe to operate pedals. Do not attempt to drive.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "After boot removal",
                    description: "When you might be able to drive.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Earliest:** Week 10-12 (for automatic cars)",
                                "**Manual transmission:** May be later (clutch use requires more strength)",
                                "**Must be cleared:** By your medical team",
                                "**Must be safe:** You need to be able to perform emergency stops",
                                "**Check insurance:** Ensure you're covered",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Important",
                    content:
                        "Even after boot removal, you need sufficient strength and mobility to operate pedals safely. Your clinician will assess when you're ready. Don't rush this — driving too early risks accidents and legal consequences.",
                },
            ],
        },
        {
            type: "section",
            title: "Left Leg Injured (Clutch Leg)",
            content: [
                {
                    type: "text",
                    content:
                        "If your **left leg** is injured, you may be able to drive earlier — but only with an **automatic car**. Manual transmission requires clutch use, which needs more strength.",
                },
                {
                    type: "card",
                    title: "Automatic car only",
                    description: "When you might be able to drive.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Potentially possible:** Weeks 4-6 (some people earlier)",
                                "**Must be safe:** You must be able to control the vehicle safely",
                                "**Boot must not interfere:** Pedals must be accessible",
                                "**No pain medication:** Must not be impaired by medication",
                                "**Check insurance:** Ensure you're covered",
                                "**Get clearance:** From your medical team",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Safety considerations",
                    description: "Critical safety checks.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Can you perform an emergency stop?** — This is the critical test",
                                "**Are you taking medications?** — Pain meds can impair driving",
                                "**Is your concentration affected?** — Pain or fatigue affects driving",
                                "**Does insurance cover you?** — Check your policy",
                                "**Can you control the vehicle?** — Boot must not interfere with pedals",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Practice first",
                    content:
                        "If your clinician clears you to drive, consider a short practice in a safe, empty area first. Get comfortable with the controls before driving on public roads.",
                },
            ],
        },
        {
            type: "section",
            title: "Manual vs Automatic Transmission",
            content: [
                {
                    type: "text",
                    content:
                        "The type of car you drive makes a big difference. Manual transmission requires more strength and coordination.",
                },
                {
                    type: "card",
                    title: "Automatic transmission",
                    description: "Easier to drive with injury.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Right leg injured:** Week 10-12 earliest (after boot removal)",
                                "**Left leg injured:** Potentially weeks 4-6 (if cleared)",
                                "**Easier:** No clutch operation needed",
                                "**Less strength required:** Just accelerator and brake",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Manual transmission",
                    description: "More challenging.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Right leg injured:** Later than automatic (clutch use requires strength)",
                                "**Left leg injured:** Much later (clutch leg needs full function)",
                                "**More strength needed:** Clutch operation requires calf strength",
                                "**Coordination:** Need to coordinate clutch, brake, accelerator",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Insurance Considerations",
            content: [
                {
                    type: "text",
                    content:
                        "**This is critical:** You must check with your insurance company before driving with an injury. Driving without proper insurance coverage could invalidate your policy.",
                },
                {
                    type: "card",
                    title: "What to check",
                    description: "Insurance requirements.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Policy coverage** — Does your insurance cover driving with an injury?",
                                "**Medical clearance** — Do they require medical clearance?",
                                "**Notification** — Do you need to notify them?",
                                "**Restrictions** — Are there any restrictions or conditions?",
                                "**Consequences** — What happens if you drive without coverage?",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Important",
                    content:
                        "Driving without proper insurance coverage could invalidate your policy. If you have an accident while driving with an injury and your insurance doesn't cover it, you could be personally liable. Always check with your insurance company first.",
                },
            ],
        },
        {
            type: "section",
            title: "Medical Clearance",
            content: [
                {
                    type: "text",
                    content:
                        "Your medical team needs to assess whether you're safe to drive. They'll consider your strength, mobility, pain levels, and medications.",
                },
                {
                    type: "card",
                    title: "What your clinician assesses",
                    description: "Safety considerations.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Strength** — Can you operate pedals with sufficient force?",
                                "**Mobility** — Can you move your foot/leg appropriately?",
                                "**Pain** — Is pain manageable and not distracting?",
                                "**Medications** — Are you on medications that impair driving?",
                                "**Concentration** — Can you focus on driving safely?",
                                "**Emergency stop** — Can you perform an emergency stop?",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Getting clearance",
                    description: "How to get approval.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Ask your clinician** — Discuss driving at your appointment",
                                "**Be honest** — About your pain, medications, concerns",
                                "**Follow their advice** — They know when you're ready",
                                "**Get it in writing** — If possible, get clearance documented",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Safety Checklist Before Driving",
            content: [
                {
                    type: "text",
                    content:
                        "Before you get behind the wheel, go through this checklist. If you can't answer 'yes' to all questions, don't drive.",
                },
                {
                    type: "card",
                    title: "Pre-driving checklist",
                    description: "Safety checks.",
                    variant: "highlight",
                    content: [
                        {
                            type: "checklist",
                            title: "Before driving",
                            items: [
                                {
                                    text:
                                        "I have medical clearance from my clinician",
                                },
                                {
                                    text:
                                        "My insurance company has confirmed coverage",
                                },
                                {
                                    text:
                                        "I can operate all pedals safely and comfortably",
                                },
                                {
                                    text:
                                        "I can perform an emergency stop",
                                },
                                {
                                    text:
                                        "I am not taking medications that impair driving",
                                },
                                {
                                    text:
                                        "I am not in significant pain that would distract me",
                                },
                                {
                                    text:
                                        "I feel alert and able to concentrate",
                                },
                                {
                                    text:
                                        "My boot (if still wearing) does not interfere with pedals",
                                },
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
                                "**Wanting to drive** — understandable frustration",
                                "**Feeling ready** — but still need clearance",
                                "**Anxiety about driving** — normal after injury",
                                "**Uncertainty** — about when you can drive",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Never drive if",
                    content:
                        "**You're in a boot (right leg injured), you're taking pain medications that impair driving, you can't perform an emergency stop, your insurance doesn't cover you, or you have any doubt about safety.** The consequences of an accident far outweigh the inconvenience of not driving.",
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
                        '**Timing:** "When will I be able to drive? What are the criteria?"',
                        '**Safety:** "Can I perform an emergency stop safely?"',
                        '**Medications:** "Are my medications safe for driving?"',
                        '**Clearance:** "Can you provide written clearance for my insurance?"',
                        '**Practice:** "Should I practice in a safe area first?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I drive after Achilles rupture?",
                    answer:
                        "It depends on which leg is injured. Right leg injured: Week 10-12 earliest (after boot removal, automatic car). Left leg injured: Potentially weeks 4-6 with automatic car, if cleared by your clinician. Always check with your insurance company and get medical clearance first.",
                },
                {
                    question: "Can I drive while wearing my boot?",
                    answer:
                        "If your right leg is injured, no — you cannot drive while wearing the boot. If your left leg is injured and you have an automatic car, it may be possible, but you must be cleared by your clinician and insurance company. The boot must not interfere with pedals, and you must be able to perform an emergency stop.",
                },
                {
                    question: "Do I need to tell my insurance company?",
                    answer:
                        "Yes, absolutely. Check with your insurance company before driving with an injury. They may require medical clearance, and driving without proper coverage could invalidate your policy. Always check first.",
                },
                {
                    question: "What if I need to drive for work?",
                    answer:
                        "Discuss this with your employer and clinician. You may need temporary adjustments, alternative transport, or work from home options. Don't drive if you're not safe to do so — the consequences of an accident are far worse than missing work.",
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
                        "**Right leg injured** — cannot drive while in boot, week 10-12 earliest",
                        "**Left leg injured** — may drive earlier with automatic car (weeks 4-6)",
                        "**Check insurance** — always verify coverage first",
                        "**Get medical clearance** — your clinician must approve",
                        "**Safety first** — when in doubt, don't drive",
                    ],
                },
            ],
        },
    ],
};
