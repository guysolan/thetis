import type { SectionContent } from "@/components/course/types";
import BootAngleProgression from "../../../assets/boot-angle-progression.png";
import AircastBootWithWedges from "../../../assets/aircast-boot-with-wedges.png";
import VacopedBootStandalone from "../../../assets/vacoped-boot-standalone.jpeg";
import BootFittingGuide from "../../../assets/boot-fitting-guide.png";

export const metadata = {
    slug: "week-2-day-4-your-walking-boot",
    title: "Your Walking Boot - The Foundation",
    description:
        "Aircast vs VACOped, fitting your boot, and understanding wedges",
    week: 2,
    day: 4,
    section_number: 7,
};

export const content: SectionContent = {
    intro:
        "By now, you should be in your walking boot — your constant companion for the next 8–12 weeks. Getting the fit right and understanding how wedges work makes a huge difference to your comfort and recovery. This lesson covers the practical standard: fitting, wedges, and what to wear on your other foot.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Boot standard",
            items: [
                {
                    text:
                        "Check your boot fit — it should be snug but not tight, with room for one finger behind your heel",
                },
                {
                    text:
                        "Understand your angle protocol — how many wedges you start with (Aircast) or what hinge setting (VACOped), and when to change them",
                },
                {
                    text:
                        "Wear the boot 24/7 — including at night (unless your protocol says otherwise)",
                },
                {
                    text:
                        "Address leg length difference — your boot makes one leg longer, which can cause back/hip pain",
                },
                {
                    text:
                        "Keep the boot clean and check for pressure points or rubbing",
                },
            ],
        },
        {
            type: "section",
            title: "Getting the fit right",
            content: [
                {
                    type: "text",
                    content:
                        "A poorly fitted boot causes problems: pressure sores, rubbing, and poor tendon protection. Take time to get it right.",
                },
                {
                    type: "image",
                    src: BootFittingGuide,
                    alt: "Side view diagram of a walking boot showing proper fit points: heel positioned at back, one finger space between heel and boot, straps tightened bottom to top, toe wiggle room, and no pressure points",
                    caption:
                        "Proper boot fit: check heel position, strap tightness, and toe room",
                },
                {
                    type: "card",
                    title: "How to check your boot fit",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heel position:** Your heel should sit firmly at the back of the boot — not floating forward",
                                "**Snug but not tight:** You should be able to fit one finger between your heel and the back of the boot",
                                "**Straps:** Tighten from bottom to top, but not so tight that you lose circulation",
                                "**Toes:** Your toes should have a little wiggle room — they shouldn't be squashed",
                                "**No pressure points:** Check for rubbing on your shin, ankle bones, or heel",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Pressure warning",
                    content:
                        "If you get **numb toes**, **blue/pale toes**, or **severe pain/pressure** that doesn't improve when you loosen straps, contact your clinic urgently. This can be a circulation or pressure problem.",
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Wear a thin sock or boot liner inside your boot. It reduces friction, absorbs sweat, and makes the boot more comfortable. Change it daily if possible.",
                },
            ],
        },
        {
            type: "section",
            title:
                "Understanding your angle protocol — the foundation of your recovery",
            content: [
                {
                    type: "text",
                    content:
                        "Whether you have an Aircast (with wedges) or a VACOped (with a hinge), the principle is the same: your foot starts very pointed down, and gradually moves toward neutral as the tendon heals. The **angle** is what matters — how you achieve it depends on your boot type.",
                },
                {
                    type: "card",
                    title: "The principle: gradual angle reduction",
                    description: "A simple analogy to understand the system.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Imagine your foot position as a **tower of blocks**. At the start, you need all the blocks to keep your foot pointed down — this brings the torn tendon ends close together. As the tendon heals, you remove blocks one by one (Aircast) or unlock the hinge step by step (VACOped), gradually bringing your foot to neutral. Do it too fast, and the tower collapses (tendon stretches or re-ruptures).",
                        },
                    ],
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title: "Starting position (weeks 0–2)",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "You'll start at **maximum angle** — foot very pointed down like standing on tip-toes. This is around 30–45 degrees of plantarflexion.",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Aircast:** All wedges in (usually 3–4 wedges stacked under heel)",
                                        "**VACOped:** Hinge locked at maximum plantarflexion setting",
                                        "**Goal:** Keep tendon ends as close as possible",
                                        "**Weight-bearing:** Usually non-weight-bearing or minimal",
                                        "**Don't change anything yet** — follow your protocol exactly",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "Angle reduction protocol (weeks 2–10)",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "Your specialist will give you a schedule for gradually reducing the angle. The timing is similar for both boot types:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Week 2–4:** Reduce angle by one step (remove one wedge, or unlock hinge one notch)",
                                        "**Week 4–6:** Continue gradual reduction",
                                        "**Week 6–8:** May reach neutral (0 degrees) or close to it",
                                        "**Week 8–10:** May start transitioning out of boot",
                                    ],
                                },
                                {
                                    type: "alert",
                                    variant: "info",
                                    title: "Important",
                                    content:
                                        "Protocols vary widely. Some reduce faster, some slower. Some keep you at maximum angle longer. **Follow your specific protocol** — don't compare with others or rush ahead.",
                                },
                            ],
                        },
                        {
                            title: "What happens when you reduce the angle",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "When you reduce the angle (remove a wedge or unlock the hinge), your foot moves to a less pointed-down position. This is progress, but it also means:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**More stress on the tendon** — the ends are slightly further apart",
                                        "**You may feel more stretch** — this is normal, but shouldn't be severe pain",
                                        "**Your leg length changes** — you may need to adjust footwear on the other foot",
                                        "**You're one step closer to neutral** — this is good progress",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "When to worry",
                                    content:
                                        "If reducing the angle causes **severe pain**, a **new pop**, or **sudden loss of function**, stop and contact your clinic. A little discomfort is normal; severe pain is not.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "How the angle gradually reduces — the recovery mechanism",
            content: [
                {
                    type: "text",
                    content:
                        "Your boot holds your foot pointed down (plantarflexed) to keep the torn tendon ends close together. As the tendon heals, you gradually reduce this angle until your foot reaches a neutral position. This image shows how that progression works — think of it like gradually lowering a platform.",
                },
                {
                    type: "image",
                    src: BootAngleProgression,
                    alt: "Four-panel medical diagram showing side view of leg in walking boot, demonstrating gradual angle reduction from maximum plantarflexion (weeks 2-4, 30-45 degrees) to medium angle (weeks 5-7, ~20-25 degrees) to lower angle (weeks 8-10, ~10-15 degrees) to neutral position (week 11+, 0 degrees)",
                    caption:
                        "The recovery mechanism: your foot gradually moves from very pointed down to neutral as you heal",
                },
                {
                    type: "card",
                    title: "The goal: keeping your foot in a tip-toe position",
                    description:
                        "Both boots hold your foot pointed down — like standing on tip-toes — to keep the torn tendon ends close together.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Think of it like this: when you point your toes down (like a ballet dancer), your calf muscle shortens and the Achilles tendon relaxes. This brings the torn ends closer together, allowing them to heal. Both the Aircast and VACOped achieve this — they just use **completely different mechanisms**.",
                        },
                    ],
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title:
                                "Aircast boot — wedge insoles under the heel",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The Aircast uses **removable foam wedges** that sit inside the boot, under your heel. These wedges physically prop up your heel, forcing your foot into a tip-toe position.",
                                },
                                {
                                    type: "image",
                                    src: AircastBootWithWedges,
                                    alt: "Aircast walking boot with white wedge inserts stacked next to it, showing how wedges are placed inside the boot",
                                    caption:
                                        "Aircast boot with removable wedge inserts — these stack under your heel to control the angle",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**How it works:** Foam wedges (usually 3–4) stack under your heel inside the boot",
                                        "**Starting position:** All wedges in = maximum tip-toe angle (30–45°)",
                                        "**Progression:** Remove one wedge at a time, typically every 1–2 weeks",
                                        "**Each wedge:** Reduces the angle by about 6–8 degrees",
                                        "**End position:** No wedges = foot at neutral (0°)",
                                        "**The boot itself is rigid** — your foot doesn't move within it",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "Key point",
                                    content:
                                        "With an Aircast, your angle changes by **physically removing insoles**. The boot has no moving parts — it's like a rigid shell. Your wedge protocol tells you exactly when to remove each wedge.",
                                },
                            ],
                        },
                        {
                            title: "VACOped boot — adjustable hinge mechanism",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The VACOped uses a **mechanical hinge** at the ankle that can be locked at different angles or allowed to move within a controlled range. The sole itself is a wedge shape that angles your foot. There are no removable wedges or insoles.",
                                },
                                {
                                    type: "image",
                                    src: VacopedBootStandalone,
                                    alt: "VACOped walking boot showing the wedge-shaped rocker sole, dark grey skeletal frame, and teal accents on hinge mechanisms",
                                    caption:
                                        "VACOped boot with wedge-shaped rocker sole — the sole itself angles your foot, and the hinge controls range of motion",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**How it works:** A dial-controlled hinge at the ankle sets the angle",
                                        "**The sole is a wedge** — thick at the heel, thin at the toe, creating the tip-toe angle",
                                        "**Starting position:** Hinge locked at maximum plantarflexion (30°)",
                                        "**Progression:** Unlock the hinge gradually to allow more range of motion",
                                        "**Controlled movement:** Can be set to allow movement within a safe range (e.g., 30° to 15°)",
                                        "**End position:** Hinge unlocked for full range or locked at neutral",
                                        "**The boot has moving parts** — your foot can move within the allowed range",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "Key point",
                                    content:
                                        "With a VACOped, your angle changes by **adjusting the hinge dial**. The boot allows controlled movement within whatever range you set. Some protocols use this to allow early gentle movement within a safe zone.",
                                },
                            ],
                        },
                        {
                            title: "Which is better?",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "Both boots are clinically effective — research shows similar outcomes. The choice often comes down to what's available, what your clinic uses, and cost.",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Aircast:** More common, typically provided by NHS, simpler mechanism, lower cost (~£80–150)",
                                        "**VACOped:** More adjustable, allows controlled early movement, often requires private purchase (~£250–400)",
                                        "**Both work:** The key is following your protocol correctly, not which boot you have",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "Don't worry if you have one or the other — **all boot types (VACOped, Aircast, or others) achieve the same goal**. What matters is understanding **how your specific boot works** and following your protocol exactly. You'll see Grant (our patient character) wearing different boot types in different images — this is intentional to reinforce that all options are valid.",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Why this matters",
                    content:
                        "Think of it like a **tower of blocks**. At the start, you need all the blocks (maximum angle) to keep the tendon ends close. As the tendon heals and gets stronger, you can remove blocks (reduce the angle) safely. Remove them too fast, and the tower collapses (tendon stretches or re-ruptures).",
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Learn more",
                    content:
                        "For a detailed comparison of Aircast vs VACOped boots, including their mechanisms, costs, and which might be right for you, see our [comprehensive boot comparison guide](/articles/aircast-vs-vacoped).",
                },
            ],
        },
        {
            type: "section",
            title: "The leg length problem — and how to solve it",
            content: [
                {
                    type: "text",
                    content:
                        "Your walking boot makes your injured leg longer. This causes a **leg length discrepancy** that can lead to back pain, hip pain, and an awkward gait. The solution? Wear something on your other foot to even things up.",
                },
                {
                    type: "card",
                    title: "Why leg length matters",
                    description: "A simple way to understand the problem.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Think of it like walking with one shoe on and one shoe off. Your pelvis tilts, your back compensates, and everything feels off. The boot adds 2–4 cm of height. Wearing something on your other foot evens things out and prevents pain.",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "EVENup shoe leveler",
                    description:
                        "The most popular solution for leg length discrepancy.",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "The **EVENup** is a device that clips onto your shoe to add height. It's adjustable and works with most shoes.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Works with any shoe** — clips onto your existing footwear",
                                "**Adjustable height** — can match your boot height",
                                "**Easy to use** — simple clip-on design",
                                "**Prevents back/hip pain** — keeps your pelvis level",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Cost: approximately £28–40 ($35–50). Many patients find it essential for comfort during the boot phase.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "When you need it",
                    content:
                        "If you're getting back pain, hip pain, or an awkward gait, an EVENup (or similar leveler) can make a huge difference. If you're not having issues, you may not need it, but many people find it essential. Start without it, and add it if you notice problems.",
                },
            ],
        },
        {
            type: "section",
            title: "Living with your boot — practical tips",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Sleeping:** Most protocols require 24/7 wear, including at night. This is uncomfortable but essential. Consider a Thetis night splint for better sleep.",
                        "**Showering:** Use a waterproof cover (like a Limbo) or switch to a night splint that maintains the angle while allowing you to wash your foot.",
                        "**Walking:** Use crutches as instructed. Don't try to walk without them until your protocol allows.",
                        "**Skin care:** Check your skin daily for pressure points, redness, or rubbing. Use padding if needed.",
                        "**Cleaning:** Keep the boot clean. Remove the liner if possible and wash it regularly.",
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Keep a small towel or cloth in your boot when you're not wearing it. It absorbs moisture, keeps it fresh, and makes it more comfortable to put on.",
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
                                "Discomfort from the boot — it's heavy and awkward",
                                "Some rubbing or pressure points (as long as they're not severe)",
                                "Difficulty sleeping with the boot on",
                                "Feeling frustrated or claustrophobic about 24/7 wear",
                                "Back or hip pain from leg length difference (address with footwear)",
                                "Swelling that varies through the day",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **numb/blue/pale toes**, severe increasing pressure/pain in the boot, fever with rapidly spreading redness, or a fall with a new "pop".',
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
                        '**Wedge protocol:** "How many wedges do I start with, and when do I remove them?"',
                        '**Weight-bearing:** "When can I start putting weight through my foot?"',
                        '**24/7 wear:** "Do I need to wear the boot at night, or can I use a night splint?"',
                        '**Leg length:** "What should I wear on my other foot to even things up?"',
                        '**Skin issues:** "What should I do if I get pressure points or rubbing?"',
                        '**Cleaning:** "Can I remove the boot to clean it, or just the liner?"',
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
                        "**Weeks 2–4:** You'll likely start removing wedges gradually (if your protocol allows)",
                        "**Weeks 4–6:** Continue wedge removal and may start progressive weight-bearing",
                        "**Next lesson:** We cover **living with your boot** in more detail — walking, crutches, and daily life",
                        "**Weeks ahead:** Boot phase continues until around week 10–12, then transition to shoes and physiotherapy",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I take the boot off to sleep?",
                    answer:
                        "Most protocols require 24/7 wear in the early weeks. Removing the boot at night is one of the most common causes of re-rupture or tendon lengthening. If sleeping is unbearable, ask your specialist about a night splint (like the Thetis splint) that's lighter and more comfortable while still protecting the tendon.",
                },
                {
                    question:
                        "What if my boot is rubbing or causing pressure sores?",
                    answer:
                        "First, check the fit — it may be too tight or not positioned correctly. Try padding the area with soft material. If it's severe or getting worse, contact your clinic. Don't just stop wearing the boot — you need protection, but you may need a different size or adjustment.",
                },
                {
                    question:
                        "How do I know when to reduce the angle (remove a wedge or adjust the hinge)?",
                    answer:
                        "Follow your protocol exactly. Your specialist will give you a schedule (e.g., 'remove one wedge every 2 weeks' for Aircast, or 'unlock to the next setting at week 4' for VACOped). Don't progress faster than instructed, even if you feel fine. The tendon needs time to heal at each angle before moving to the next.",
                },
                {
                    question: "Do I really need something on my other foot?",
                    answer:
                        "If you're getting back pain, hip pain, or an awkward gait, yes. The leg length difference can cause real problems. If you're not having issues, you may not need it, but many people find it makes a big difference. Start without it, and add it if you notice problems.",
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
                        "**Get the fit right** — snug but not tight, heel at the back, no pressure points",
                        "**Follow your wedge protocol exactly** — don't rush ahead",
                        "**Wear the boot 24/7** — unless your protocol specifically says otherwise",
                        "**Address leg length difference** — it prevents back and hip pain",
                    ],
                },
            ],
        },
    ],
};
