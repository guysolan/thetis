import type { SectionContent } from "@/components/course/types";
import ProperElevationAnkleAboveHeart from "../../../assets/proper-elevation-ankle-above-heart.png";
import BathroomSafetyAchillesCrutches from "../../../assets/bathroom-safety-achilles-crutches.png";

export const metadata = {
    slug: "week-0-day-3-home-setup",
    title: "Setting Up Your Recovery Station",
    description: "Home setup, elevation, ice protocol, and survival tips",
    week: 0,
    day: 3,
    section_number: 3,
};

export const content: SectionContent = {
    intro:
        "The first few days are about **survival**: keeping the tendon protected, controlling swelling, and making your home setup safe. A good setup reduces pain, prevents falls, and makes it easier to actually rest.",

    blocks: [
        {
            type: "section",
            title: "Set up a recovery base (before you try to “carry on”)",
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
                                "Side table within arm’s reach (water, meds, snacks, charger)",
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
                        "Put standard (water, pain meds, charger, wet wipes) in a single tray/basket. You’ll be shocked how hard “just grabbing one thing” becomes on crutches.",
                },
            ],
        },
        {
            type: "section",
            title:
                "Elevation: why it matters (and what “proper elevation” means)",
            content: [
                {
                    type: "text",
                    content:
                        "In Week 1, swelling control is everything. Elevation reduces swelling, reduces pain, and helps your foot feel less hot/tight.",
                },
                {
                    type: "image",
                    src: ProperElevationAnkleAboveHeart,
                    alt: "Side-by-side diagram showing correct elevation (reclined, ankle above heart) versus incorrect elevation (sitting upright with foot on a stool)",
                    caption:
                        "Goal: reduce swelling by elevating above heart level",
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
                                "Lie back or recline — sitting upright with your foot on a stool usually isn’t enough.",
                                "Support **under the calf** (not just the heel) to avoid pressure points.",
                                "Aim for “as much as you can tolerate” in the first 72 hours.",
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
            type: "section",
            title: "The ice protocol (first few days)",
            content: [
                {
                    type: "text",
                    content:
                        "Ice can help in the first 3–4 days. Think of it as a tool for comfort and swelling — not a cure.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**20–30 minutes on**, then **30 minutes off** (as tolerated).",
                        "Always use a cloth barrier — never ice directly on skin.",
                        "If you have a full plaster cast, ice won't penetrate well — focus on elevation instead.",
                        "If you have **numbness or nerve issues**, skip ice and ask your team.",
                    ],
                },
                {
                    type: "tip",
                    title: "Make it easy",
                    content:
                        "Keep an ice pack in a small cooler bag next to your recovery station so you’re not constantly asking someone to fetch it.",
                },
            ],
        },
        {
            type: "section",
            title: "Bathroom + shower safety (where most accidents happen)",
            content: [
                {
                    type: "text",
                    content:
                        "Slips in the bathroom are a common way people reinjure themselves. Set this up early.",
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
                        "Use a **non-slip mat**.",
                        "Consider a **shower stool/chair**.",
                        "Move toiletries to waist height so you’re not bending/reaching.",
                        "Keep floors dry and clear of towels/clothes.",
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Keep your immobilisation dry",
                    content:
                        "If you're in plaster, you'll need a waterproof cover. If you're in a boot/splint, follow your clinician's instructions — many protocols require **24/7 wear** early on. For showering, this usually means either wearing a waterproof cover (like a Limbo) over the boot (so you won't wash the foot itself), or switching to a Thetis night splint that maintains the correct angle while allowing you to wash your foot and leg.",
                },
            ],
        },
        {
            type: "section",
            title: "Sleeping in Week 1 (spoiler: it’s hard)",
            content: [
                {
                    type: "text",
                    content:
                        "Sleep disruption is normal. Most people struggle for a while — it improves as swelling settles and you figure out your best position.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "Use pillows to support the leg (and keep it from rolling).",
                        "Keep the room cooler — casts/boots can feel hot at night.",
                        "Keep crutches by the bed and use a nightlight.",
                        "Accept you might need naps — healing is work.",
                    ],
                },
            ],
        },
        {
            type: "card",
            title: "Your goal for the next 48 hours",
            description: "Simple targets that move recovery forward.",
            variant: "highlight",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Protect** the tendon 24/7 (no stretching, no barefoot testing).",
                        "**Elevate** as much as possible, especially if swelling is building.",
                        "**Create a safe home setup** so you're not improvising on crutches.",
                        "**Learn the red flags** (clots + circulation/pressure).",
                    ],
                },
            ],
        },
        {
            type: "tip",
            title: "For partners / carers",
            content:
                "You can help by: keeping paths clear, preparing meals, reminding about elevation, and helping with anything that requires standing or carrying. Even small help makes a huge difference in Week 1.",
        },
    ],
};
