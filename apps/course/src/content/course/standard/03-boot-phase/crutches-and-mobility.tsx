import type { SectionContent } from "@/components/course/types";
import EvenUp from "@/assets/even-up.jpg";
import SoftCrutchHandles from "@/assets/soft-crutch-handles.jpg";

export const metadata = {
    slug: "crutches-and-mobility",
    title: "Crutches and Mobility Aids",
    description:
        "Crutch comfort, EVENup, leg length difference, and making mobility easier",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "You'll be on crutches for weeks, and your walking boot makes your injured leg 2–4 cm longer than your other leg. This creates leg length discrepancy that causes back pain, hip pain, and an awkward, tiring gait. This lesson covers practical solutions: crutch comfort upgrades, EVENup shoe levelers, and tips to make mobility easier.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Mobility essentials",
            items: [
                {
                    text:
                        "Get gel covers for crutch handles — dramatically reduce palm pain",
                },
                {
                    text:
                        "Consider an EVENup — prevents back and hip pain from leg length difference",
                },
                {
                    text:
                        "Check crutch height — top should be 2–3 finger widths below armpit",
                },
                {
                    text:
                        "Use weight through hands, not armpits — prevents nerve damage",
                },
                {
                    text:
                        "Set up recovery station — have everything within reach",
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
            title: "Setting up your recovery station",
            content: [
                {
                    type: "text",
                    content:
                        "Pick one spot you can reliably get to — ideally **ground floor** if stairs are tricky. This becomes your command centre for the next week.",
                },
                {
                    type: "checklist",
                    title: "Recovery station checklist",
                    items: [
                        {
                            text:
                                "Comfortable chair/sofa with room to elevate your leg",
                        },
                        {
                            text:
                                "Pillows or an elevation wedge (more comfortable than stacking pillows)",
                        },
                        {
                            text:
                                "Side table within arm's reach (water, meds, snacks, charger)",
                        },
                        { text: "Phone charger + extension lead" },
                        {
                            text:
                                "Crutches placed where you can reach them from bed/sofa",
                        },
                        {
                            text:
                                "Top Tip: Lean crutches upside-down (grips on floor) against the wall — the rubber handles provide friction so they don't slide and fall over.",
                        },
                        {
                            text:
                                "Clear a path to the bathroom (remove trip hazards)",
                        },
                        {
                            text:
                                "A small bag/backpack to carry things while on crutches",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        'Put essentials (water, pain meds, charger, wet wipes) in a single tray/basket. You\'ll be shocked how hard "just grabbing one thing" becomes on crutches.',
                },
            ],
        },
        {
            type: "section",
            title: "Proper elevation",
            content: [
                {
                    type: "text",
                    content:
                        "In Week 1, swelling control is everything. Elevation reduces swelling, reduces pain, and helps your foot feel less hot/tight.",
                },
                {
                    type: "card",
                    title: "How to elevate properly",
                    description: "The goal is ankle above heart level.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Lie back or recline — sitting upright with your foot on a stool usually isn't enough.",
                                "Support **under the calf** (not just the heel) to avoid pressure points.",
                                'Aim for "as much as you can tolerate" in the first 72 hours.',
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Pressure / circulation warning",
                    content:
                        "If you get **numb toes**, toes turning **blue/pale**, or rapidly increasing pain/pressure in the cast/splint/boot, seek urgent advice — this can be a circulation/pressure issue.",
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Do I really need gel covers for my crutches?",
                    answer:
                        "You'll probably be on crutches for 6–10 weeks. Gel covers cost £5–15 and prevent painful blisters, calluses, and hand fatigue. Most patients who don't use them wish they had. It's a small investment for weeks of comfort.",
                },
                {
                    question: "Do I need an EVENup?",
                    answer:
                        "If you're getting back pain, hip pain, or finding walking exhausting, try an EVENup. Many patients consider it essential. If you're not having issues, you may not need it. It's worth trying if you're experiencing secondary pain.",
                },
                {
                    question:
                        "How do I know if my crutches are the right height?",
                    answer:
                        "The top should be 2–3 finger widths below your armpit when standing. Handles should be at wrist level. Most crutches are adjustable — ask your clinician or physio to help you set them up correctly.",
                },
            ],
        },
    ],
};
