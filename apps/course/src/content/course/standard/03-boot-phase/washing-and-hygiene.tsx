import type { FAQItem, SectionContent } from "@/components/course/types";
import ThetisNightSplint from "@/assets/thetis-splint.jpg";
import MerinoSocks from "@/assets/merino-socks.webp";
import Antifungal from "@/assets/antifungal.jpg";
import BathroomSafetyAchillesCrutches from "@/assets/bathroom-safety-achilles-crutches.png";

export const metadata = {
    slug: "washing-and-hygiene",
    title: "Washing and Foot Hygiene",
    description:
        "Washing safely, skin care, preventing infections, and bathroom safety",
    status: "drafting" as const,
};

export const faqs: FAQItem[] = [
    {
        question: "My foot smells terrible — is this normal?",
        answer:
            "Yes, unfortunately. Your foot is trapped in a warm, moist environment for weeks. Use antifungal powder daily, wear merino socks, change socks frequently, and air the boot out when resting. If you develop itchy, flaky skin between your toes or around your nails, you may have a fungal infection — treat it early with over-the-counter antifungal cream.",
    },
    {
        question: "How often should I wash my foot?",
        answer:
            "Ideally daily, but this depends on your protocol. If you can use a night splint for washing, sit on a shower stool and shower normally. If not, use seated washing (with a long-handled sponge and basin) or baby wipes between proper washes. Always sit when washing, keep your foot toes-down, and dry thoroughly with a hairdryer on cool. The key is keeping your foot as clean as possible while maintaining protection.",
    },
];

export const content: SectionContent = {
    intro:
        "One of the most frustrating parts of boot life is **not being able to wash your foot properly**. Your foot is trapped in a boot 24/7, getting sweaty and uncomfortable. This lesson covers safe washing techniques, bathroom safety, and how to keep your foot healthy inside the boot.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Hygiene essentials",
            items: [
                {
                    text:
                        "Sit when washing — never stand in the shower; use a shower stool",
                },
                {
                    text:
                        "Dry your foot thoroughly — hairdryer on cool setting after washing",
                },
                {
                    text:
                        "Use antifungal powder daily — sprinkle inside boot liner to prevent infections",
                },
                {
                    text:
                        "Wear cotton or merino socks (not nylon) — change daily",
                },
                {
                    text:
                        "Set up bathroom safety — non-slip mat, shower stool, OT aids (long-handled sponge, grab bars)",
                },
                {
                    text:
                        "Consider a [night splint](/standard/sleeping-with-boot) for washing — allows proper foot washing while seated",
                },
                {
                    text:
                        "Keep foot toes-down when boot is off — never let ankle go flat",
                },
                {
                    text:
                        "Check your skin daily — look for redness, blisters, or fungal patches",
                },
            ],
        },
        {
            type: "section",
            title: "Bathroom and shower safety",
            content: [
                {
                    type: "text",
                    content:
                        "Slips in the bathroom are a common way people reinjure themselves. **Always sit when washing** — never stand in the shower. Set this up early to prevent accidents.",
                },
                {
                    type: "image",
                    src: BathroomSafetyAchillesCrutches,
                    alt: "Simple bathroom diagram showing non-slip mat, shower chair, and dry clear floor to reduce falls while on crutches",
                    caption:
                        "Bathroom safety setup: non-slip mat, shower chair, clear dry floor, and crutches stored upside-down",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Shower stool/chair** — essential; sit for all washing, never stand",
                        "**Non-slip mat** — inside shower and on bathroom floor",
                        "**Long-handled sponge or body brush** — reach your foot and leg without bending",
                        "**Grab bars** — by shower and toilet for stability when transferring",
                        "**Bath board or transfer bench** — if you have a bath, sit on the edge to swing legs over safely",
                        "**Move toiletries to waist height** — avoid bending and reaching",
                        "**Keep floors dry and clear** — no towels or clothes on the floor",
                        "**Store crutches upside-down** against the wall — the rubber **feet** (crutch tips), not the handles, provide friction so they don't slide",
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Washing with a ruptured Achilles",
            content: [
                {
                    type: "text",
                    content:
                        "Your foot is trapped in a boot 24/7, getting sweaty and uncomfortable. **Always sit when washing** — use a shower stool. Keep your foot **toes-down** (pointed) whenever the boot is off during washing. Here are safe ways to wash your foot while keeping it protected.",
                },
                {
                    type: "card",
                    title: "The night splint advantage for washing",
                    description: "Why a night splint makes washing easier.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "A **[night splint](/standard/sleeping-with-boot)** (like the Thetis splint) is particularly useful for washing because it keeps your foot protected in the correct angle (toes-down) while allowing water to reach your skin. **Sit** on a shower stool, shower normally, then dry your foot thoroughly (hairdryer on cool) before switching back to the boot.",
                        },
                        {
                            type: "product-image",
                            src: ThetisNightSplint,
                            alt: "Thetis night splint - a lightweight teal and black medical splint for sleeping",
                            caption: "Thetis Night Splint",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Allows proper washing** — water reaches your skin, you can use soap",
                                "**Maintains protection** — foot stays toes-down (tip-toe position) at all times",
                                "**Better hygiene** — your foot actually gets clean, not just covered",
                                "**Dries quickly** — open design allows air circulation",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Most protocols allow this once you're past the very early stage (usually after week 2-3). Check with your clinician first.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Other washing options",
                    description: "If you don't have a night splint.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Sit** for all washing. Use OT aids to make it easier: a **long-handled sponge** or body brush lets you reach your foot without bending; a **basin** on a stool lets you wash your foot while seated with your leg supported. Keep your foot **toes-down** throughout.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Waterproof boot covers** — products like Limbo or dry cast covers let you shower with the boot on, but your foot stays enclosed and still gets sweaty",
                                "**Seated washing** — sit on a shower stool, keep your leg out of the water, and wash your foot separately using a basin and cloth. Use a long-handled sponge to reach your foot.",
                                "**Baby wipes** — quick refresher for your foot between proper washes. Not a substitute for actual washing, but better than nothing",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Never remove the boot unsupported — keep toes-down",
                    content:
                        "If you're removing the boot to wash, you must keep your foot **toes-down** (pointed) at all times, or supported by a splint. **Do not let your foot go flat** — this stretches the healing tendon and risks re-rupture. Sit when washing. If you're unsure, ask your clinician to show you the safe technique.",
                },
            ],
        },
        {
            type: "section",
            title: "Keeping your foot healthy inside the boot",
            content: [
                {
                    type: "text",
                    content:
                        "Your foot is trapped in a closed environment for 8–12 weeks. Heat, sweat, and lack of air create the perfect conditions for fungal infections, odour, and skin breakdown. A little prevention goes a long way.",
                },
                {
                    type: "card",
                    title: "Foot hygiene essentials",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your foot is trapped in a warm, moist environment for weeks. These products prevent infections and keep your foot healthy:",
                        },
                        {
                            type: "product-image",
                            src: Antifungal,
                            alt: "Antifungal powder for preventing foot infections in walking boots",
                            caption: "Antifungal powder",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Antifungal powder** — sprinkle inside the boot liner daily. Prevents athlete's foot and fungal nail infections. Common brands: Daktarin, Canesten, or generic clotrimazole powder. Cost: £6–12 ($12–20).",
                            ],
                        },
                        {
                            type: "product-image",
                            src: MerinoSocks,
                            alt: "Merino wool socks for temperature regulation and moisture wicking",
                            caption: "Merino wool socks",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Cotton or merino wool socks** — not nylon (nylon slips and doesn't absorb well). Merino is ideal: naturally antibacterial, regulates temperature, reduces odour. Cost: £10–25 ($20–35).",
                                "**Change socks daily** — or twice daily if you're sweating heavily. Have several pairs ready.",
                                "**Air the boot out** — when you're resting, loosen the straps and let air circulate. Remove the liner if possible and let it dry.",
                                "**Check your skin** — look for red patches, blisters, or fungal patches (itchy, flaky, white skin between toes). Catch problems early.",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Why merino socks?",
                    content:
                        "Merino wool wicks moisture, regulates temperature (warm when cold, cool when hot), and has natural antibacterial properties. Unlike cotton, it doesn't stay damp against your skin. Many patients find them the single best quality-of-life upgrade during the boot stage.",
                },
            ],
        },
        {
            type: "section",
            title: "Managing swelling, hot foot, and skin care",
            content: [
                {
                    type: "text",
                    content:
                        "Swelling and skin issues are common during the boot stage. Your foot is trapped in a closed environment, and gravity causes fluid to pool. Here's how to manage these challenges.",
                },
                {
                    type: "card",
                    title: "Managing swelling",
                    description: "Why it happens and what helps.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Swelling is your body's way of healing, but too much swelling causes pain, stiffness, and slows recovery. Think of swelling like **water in a bucket** — elevation helps drain it, but gravity keeps filling it back up when you're upright.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Elevation** — ankle above heart level, especially after activity (15 minutes every 2-3 hours)",
                                "**Ice** — 20-30 minutes on, 30 minutes off (with cloth barrier)",
                                "**Proper boot fit** — straps shouldn't be cutting off circulation",
                                "**Movement** — gentle ankle pumps when safe (check with clinician)",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Swelling typically improves as you heal, but it can persist for weeks or months. Focus on managing it, not eliminating it completely.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Hot foot",
                    description: "Why your foot feels hot.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Many people experience a 'hot foot' — their foot feels hot, burning, or uncomfortable inside the boot. This is usually normal:",
                        },
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
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**What helps:** Elevation, ice (20-30 minutes), remove boot briefly if protocol allows, lighter socks, keep room cooler, night splint for sleeping",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "**Important:** If your foot is hot AND you have severe pain, numbness, blue/pale toes, or spreading redness, this could be a circulation or infection problem. Contact your clinician urgently.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Skin care basics",
                    description: "Preventing problems.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Check daily** — look at your skin when you remove the boot (if allowed)",
                                "**Keep clean** — wash your foot and leg daily if possible",
                                "**Dry thoroughly** — moisture causes problems. Use a **hairdryer on cool setting** (never hot) to dry your foot after washing. Hot can damage skin or cause burns, especially with reduced sensation.",
                                "**Use padding** — soft material under straps or pressure points",
                                "**Change socks** — if you wear socks in the boot, change daily",
                                "**Watch for problems** — redness, blisters, fungal patches (itchy, flaky skin)",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "If you get open sores, severe redness that doesn't improve, or signs of infection (pus, spreading redness, fever), contact your clinician immediately.",
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
