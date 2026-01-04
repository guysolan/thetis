import type { SectionContent } from "@/components/course/types";
import ThetisNightSplint from "../../../assets/thetis-night-splint.png";
import EvenUp from "../../../assets/even-up.jpg";
import SoftCrutchHandles from "../../../assets/soft-crutch-handles.jpg";
import MerinoSocks from "../../../assets/merino-socks.webp";
import Antifungal from "../../../assets/antifungal.jpg";

export const metadata = {
    slug: "week-3-day-0-living-with-boot",
    title: "Living with Your Boot",
    description:
        "Sleeping, washing, crutches, and making the next 8 weeks bearable",
    week: 3,
    day: 0,
    section_number: 8,
};

export const content: SectionContent = {
    intro:
        "You're now in the hardest phase — wearing a heavy boot 24 hours a day, navigating life on crutches, and trying to sleep with a brick strapped to your leg. Around 80% of patients struggle with sleep during this phase. This lesson covers the practical solutions that make life bearable: night splints for sleep, EVENup for walking, and the small things that make a big difference.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Living with your boot",
            items: [
                {
                    text:
                        "Consider a night splint — 80% of patients struggle to sleep in their boot",
                },
                {
                    text:
                        "Get an EVENup or heel lift for your other foot — prevents back and hip pain",
                },
                {
                    text:
                        "Add gel covers or padded grips to your crutch handles — your palms will thank you",
                },
                {
                    text:
                        "Use antifungal powder inside your boot — your foot is trapped in there for weeks",
                },
                {
                    text:
                        "Wear merino wool socks — they regulate temperature and reduce odour",
                },
                {
                    text:
                        "Plan your washing routine — the splint lets you shower your foot safely",
                },
            ],
        },
        {
            type: "section",
            title: "The sleep problem — and the solution",
            content: [
                {
                    type: "text",
                    content:
                        "Let's be honest: **sleeping in a walking boot is miserable**. The boot is heavy, rigid, hot, and feels like sleeping with a brick strapped to your leg. Around 80% of patients report significant sleep problems during this phase.",
                },
                {
                    type: "card",
                    title: "Why sleep matters",
                    description:
                        "Poor sleep isn't just uncomfortable — it affects your daily life.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sleep deprivation increases pain** — you'll feel worse if you're not sleeping",
                                "**Mental health suffers** — exhaustion makes everything harder to cope with",
                                "**Clot risk may increase** — poor sleep and lack of movement both contribute to clot risk",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "The night splint solution",
                    description:
                        "A lighter, more comfortable option for sleeping.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "A **night splint** (like the Thetis splint) is a lightweight device that keeps your foot in the correct angle while being much more comfortable than the full boot. It's specifically designed for sleeping and washing.",
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
                                "**Much lighter** than a walking boot (hundreds of grams vs 1–2kg)",
                                "**Open design** — your foot can breathe, reducing heat and sweating",
                                "**Maintains protection** — keeps the tendon in the correct position",
                                "**Easier to sleep** — most patients report dramatically better sleep",
                                "**Allows foot washing** — you can shower your foot while wearing it",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Cost:** £60–70 ($90–120). The only night splint specifically designed for Achilles rupture recovery. Patented in 2024.",
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Check with your clinician before using a night splint. Most protocols allow it once you're past the very early healing phase (usually after week 2–3), but some require 24/7 boot wear for longer.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "If you're struggling to sleep, try propping a pillow under your booted leg. This reduces pressure on your heel and can make the boot slightly more tolerable. But if you're still struggling after a few nights, ask your clinician about a night splint — it's a game-changer for most patients.",
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
                        "One of the most frustrating parts of boot life is **not being able to wash your foot properly**. Your foot is trapped in a boot 24/7, getting sweaty and uncomfortable. Here's how to manage hygiene safely.",
                },
                {
                    type: "card",
                    title: "Washing options",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Night splint for showering** — the splint keeps your foot protected while allowing water to reach your skin. You can shower normally and let your foot dry before switching back to the boot.",
                                "**Waterproof boot covers** — products like Limbo or dry cast covers let you shower with the boot on, but your foot stays enclosed and still gets sweaty.",
                                "**Seated washing** — sit on a shower stool, keep your leg out of the water, and wash your foot separately using a basin and cloth.",
                                "**Baby wipes** — quick refresher for your foot between proper washes. Not a substitute for actual washing, but better than nothing.",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Never remove the boot unsupported",
                    content:
                        "If you're removing the boot to wash, you must keep your foot in a tip-toe position or supported by a splint. **Do not let your foot go flat** — this stretches the healing tendon and risks re-rupture. If you're unsure, ask your clinician to show you the safe technique.",
                },
            ],
        },
        {
            type: "section",
            title: "The leg length problem — EVENup and heel lifts",
            content: [
                {
                    type: "text",
                    content:
                        "Your walking boot makes your injured leg **2–4 cm longer** than your other leg. This creates a leg length discrepancy that causes back pain, hip pain, and an awkward, tiring gait. Most patients don't realise this is why they hurt.",
                },
                {
                    type: "card",
                    title: "Solutions for leg length difference",
                    variant: "default",
                    content: [
                        {
                            type: "product-image",
                            src: EvenUp,
                            alt: "EVENup shoe leveler device that clips onto shoes to equalize leg length",
                            caption: "EVENup",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**EVENup shoe leveler** — clips onto any shoe to add 2–4 cm of height. Adjustable and widely used. Cost: £35–40 ($40–50). Universal fit, immediate comfort, prevents secondary injuries.",
                                "**Heel lift insoles** — cheaper option, but may not add enough height. Works for some patients.",
                                "**Thick-soled shoes** — trainers with chunky soles can help, but usually aren't enough on their own.",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**When to get one:** If you're getting back pain, hip pain, or finding walking exhausting, try an EVENup. Many patients consider it essential. If you're not having issues, you may not need it.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Crutches — making them bearable",
            content: [
                {
                    type: "text",
                    content:
                        "You'll be on crutches for weeks. Your palms, wrists, and armpits can take a beating. A few cheap upgrades make a huge difference.",
                },
                {
                    type: "card",
                    title: "Crutch comfort upgrades",
                    variant: "muted",
                    content: [
                        {
                            type: "product-image",
                            src: SoftCrutchHandles,
                            alt: "Soft gel crutch handle covers for reducing hand pain",
                            caption: "Gel crutch handles",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Gel handle covers** — soft gel pads that slip over the handles. Dramatically reduce palm pain and blisters. Clinical studies show 40% reduction in forearm pain and 35% decrease in paresthesia. Cost: £6–15 ($20–35).",
                                "**Padded underarm covers** — foam or gel pads for the top of the crutch. Prevent armpit soreness.",
                                "**Correct height** — the top should be 2–3 finger widths below your armpit when standing. Handles should be at wrist level.",
                                "**Weight through hands, not armpits** — push down on the handles, don't lean on the top. Leaning causes nerve damage and armpit pain.",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Wrap cycling handlebar tape around your crutch handles if you don't have gel covers. It's cheap, cushioning, and easy to replace when it gets worn or sweaty.",
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
                                "**Merino wool socks** — naturally antibacterial, regulate temperature, and reduce odour far better than cotton. Many patients find them the single best quality-of-life upgrade during boot phase. Cost: £10–25 ($20–35).",
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
                        "Merino wool wicks moisture, regulates temperature (warm when cold, cool when hot), and has natural antibacterial properties. Unlike cotton, it doesn't stay damp against your skin. Many patients find them the single best quality-of-life upgrade during boot phase.",
                },
            ],
        },
        {
            type: "section",
            title: "What's normal vs what's urgent",
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
                                "Discomfort and frustration — this phase is hard for everyone",
                                "Sleep difficulties — you're not alone, 80% of patients struggle",
                                "Back and hip pain — often from leg length difference",
                                "Sweaty, uncomfortable foot — expected in a closed boot",
                                "Feeling exhausted from crutches — walking uses much more energy",
                                "Swelling that varies through the day — worse after activity, better after rest",
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
            type: "card",
            title: "Questions to ask your specialist",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Night splint:** "Can I use a night splint for sleeping, or do I need to stay in the boot 24/7?"',
                        '**Washing:** "What\'s the safest way to wash my foot? Can I use a splint in the shower?"',
                        '**Leg length:** "What should I wear on my other foot to prevent back pain?"',
                        '**Skin issues:** "What should I do if I develop a fungal infection or skin breakdown?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "What happens next",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**This week:** Focus on making boot life bearable — sleep, hygiene, comfort",
                        "**Week 4:** We cover how your tendon is healing and why patience matters",
                        "**Week 5:** Wedge removal protocol and angle progression",
                        "**Weeks 6–8:** Gradual transition toward walking without crutches",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "Can I take the boot off to sleep if I use a night splint?",
                    answer:
                        "Usually yes, but check with your clinician first. Most protocols allow a night splint once you're past the very early phase (usually after week 2–3). The splint must maintain the correct angle — it's not the same as going unprotected. Never remove all protection while sleeping during boot phase.",
                },
                {
                    question: "My foot smells terrible — is this normal?",
                    answer:
                        "Yes, unfortunately. Your foot is trapped in a warm, moist environment for weeks. Use antifungal powder daily, wear merino socks, change socks frequently, and air the boot out when resting. If you develop itchy, flaky skin between your toes or around your nails, you may have a fungal infection — treat it early with over-the-counter antifungal cream.",
                },
                {
                    question: "Do I really need gel covers for my crutches?",
                    answer:
                        "You'll probably be on crutches for 6–10 weeks. Gel covers cost £5–15 and prevent painful blisters, calluses, and hand fatigue. Most patients who don't use them wish they had. It's a small investment for weeks of comfort.",
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
                        "**Night splint = better sleep** - plus the ability to shower safely",
                        "**EVENup = less back pain** — address the leg length difference",
                        "**Antifungal powder + merino socks** = healthier foot hygiene",
                        "**Gel crutch covers** = less hand pain — cheap and worth it",
                    ],
                },
            ],
        },
    ],
};
