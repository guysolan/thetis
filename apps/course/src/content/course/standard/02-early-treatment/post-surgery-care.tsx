import type { SectionContent } from "@/components/course/types";
import ScarMassageTechnique from "@/assets/scar-massage-engaging-v1.png";

export const metadata = {
    slug: "post-surgery-care",
    title: "If You Had Surgery",
    description:
        "Wound care, scar management, and what to expect after Achilles surgery",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "If you had surgery to repair your Achilles tendon, this lesson covers what to expect and how to care for your wound. Non-surgical patients can skip this section — your tendon heals internally without a surgical wound.",
    blocks: [
        {
            type: "alert",
            variant: "info",
            title: "Non-surgical treatment?",
            content:
                "If you're being treated without surgery, you can skip this lesson. Your tendon heals internally, and you won't have a surgical wound to manage.",
        },
        {
            type: "heading",
            level: 2,
            text: "Quick action plan",
        },
        {
            type: "checklist",
            title: "Post-surgery care basics",
            items: [
                {
                    text: "Keep wound clean and dry — follow your surgeon's dressing instructions",
                },
                {
                    text: "Watch for infection signs — redness spreading, warmth, pus, fever",
                },
                {
                    text: "Don't get wound wet — until cleared by your surgeon (usually 2 weeks)",
                },
                {
                    text: "Attend follow-up — usually 2 weeks for wound check and suture removal",
                },
                {
                    text: "Start scar care when healed — usually 2-3 weeks after surgery",
                },
            ],
        },
        {
            type: "section",
            title: "The First 2 Weeks: Wound Healing",
            content: [
                {
                    type: "text",
                    content:
                        "Your surgical wound needs time to heal before you can touch it or get it wet. The first 2 weeks are critical.",
                },
                {
                    type: "card",
                    title: "Wound care essentials",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Keep dressing on** — don't remove unless instructed",
                                "**Keep dry** — no showers on wound, cover when washing",
                                "**Don't touch** — avoid touching the wound area",
                                "**Elevate** — helps reduce swelling around wound",
                                "**Take prescribed antibiotics** — if given, complete the course",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "What's normal",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Some bruising** — around wound and ankle",
                                "**Mild swelling** — normal in first weeks",
                                "**Slight redness at wound edges** — normal healing",
                                "**Numbness near scar** — nerves take time to recover",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "alert",
            variant: "danger",
            title: "Seek urgent help if you notice",
            content:
                "**Spreading redness**, **increasing warmth**, **pus or discharge**, **fever**, **wound opening**, or **severe pain**. These could indicate infection — contact your surgeon or go to A&E.",
        },
        {
            type: "section",
            title: "Week 2: Wound Check & Sutures",
            content: [
                {
                    type: "text",
                    content:
                        "Around 2 weeks after surgery, you'll have a follow-up appointment to check your wound and remove sutures (stitches) if used.",
                },
                {
                    type: "card",
                    title: "What to expect at your appointment",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Wound inspection** — checking healing is on track",
                                "**Suture removal** — if dissolvable sutures weren't used",
                                "**Dressing change** — may change to lighter dressing",
                                "**Clearance to wash** — usually can shower after this",
                                "**Boot check** — may adjust boot if needed",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Weeks 2-3+: Starting Scar Care",
            content: [
                {
                    type: "text",
                    content:
                        "Once your wound is fully closed (no scabs, no open areas), you can start scar care. This helps keep scar tissue supple and may improve appearance.",
                },
                {
                    type: "image",
                    src: ScarMassageTechnique,
                    alt: "Illustration showing gentle circular scar massage technique on Achilles tendon scar",
                    caption: "Gentle circular massage helps keep scar tissue supple",
                },
                {
                    type: "card",
                    title: "Scar massage technique",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "numbered",
                            items: [
                                "**Apply bio-oil or moisturizer** — reduces friction",
                                "**Use light pressure** — gentle, not painful",
                                "**Circular motions** — massage in small circles",
                                "**Different directions** — up, down, and across the scar",
                                "**5-10 minutes, 2-3 times daily** — consistency matters",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Product options",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Bio-Oil** (£8-15) — popular option, keeps scar moisturized",
                                "**Vitamin E oil** — may help appearance",
                                "**Silicone gel sheets** — can help flatten raised scars",
                                "**Any good moisturizer** — the massage matters more than the product",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Sun Protection",
            content: [
                {
                    type: "text",
                    content:
                        "Scars are more sensitive to sun damage. Protect your scar from sun for at least 6-12 months.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Use SPF 30+ sunscreen** on the scar when exposed",
                        "**Cover with clothing** — long socks when possible",
                        "**Avoid peak sun** — 10am-4pm",
                        "**Sun can darken scars** — making them more visible permanently",
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Scar Timeline: What to Expect",
            content: [
                {
                    type: "card",
                    title: "How your scar will change",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Weeks 0-3:** Wound healing, scar forming",
                                "**Weeks 3-6:** Scar may be red, raised, firm — this is normal",
                                "**Months 3-6:** Starts to fade, becomes softer",
                                "**Months 6-12:** Continues to flatten and fade",
                                "**Year 1+:** Reaches final appearance",
                            ],
                        },
                    ],
                },
                {
                    type: "text",
                    content:
                        "**Thicker tendon is normal.** Your tendon heals with scar tissue, which is often thicker than the original. This doesn't affect function — many people have excellent outcomes with a thicker tendon.",
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I shower normally?",
                    answer:
                        "Usually after your 2-week wound check, once your surgeon confirms the wound is healed. Until then, keep the wound dry — you can use a waterproof cover or take shallow baths keeping your leg out of the water.",
                },
                {
                    question: "When should I start scar massage?",
                    answer:
                        "Usually 2-3 weeks after surgery, once the wound is fully closed with no scabs or open areas. Always check with your surgeon first.",
                },
                {
                    question: "Will my scar be visible?",
                    answer:
                        "Initially yes, but scars fade significantly over 6-12 months. Most Achilles scars are on the back of the ankle and not very noticeable once healed. Scar massage and sun protection can help appearance.",
                },
                {
                    question: "Is numbness around the scar normal?",
                    answer:
                        "Yes, very common. Small nerves are cut during surgery and take time to recover. Numbness usually improves over months but may persist in a small area around the scar.",
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
                        "**Keep wound dry for 2 weeks** — until cleared by surgeon",
                        "**Watch for infection** — spreading redness, warmth, pus, fever",
                        "**Start scar care at 2-3 weeks** — gentle massage with moisturizer",
                        "**Protect from sun** — SPF 30+ for 6-12 months",
                    ],
                },
            ],
        },
    ],
};
