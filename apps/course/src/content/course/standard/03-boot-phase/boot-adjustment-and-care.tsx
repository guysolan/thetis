import type { SectionContent } from "@/components/course/types";
import BootFittingGuide from "@/assets/boot-fitting-guide.png";

export const metadata = {
    slug: "boot-adjustment-and-care",
    title: "Boot Adjustment and Care",
    description:
        "Fitting your boot, straps, padding, maintenance, and preventing problems",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Getting the fit right and maintaining your boot properly makes a huge difference to your comfort and recovery. A poorly fitted boot causes problems: pressure sores, rubbing, and poor tendon protection. This lesson covers fitting, strap adjustment, padding, and boot care.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Boot care essentials",
            items: [
                {
                    text:
                        "Check your boot fit — snug but not tight, heel at the back",
                },
                {
                    text:
                        "Adjust straps correctly — tighten from bottom to top",
                },
                {
                    text: "Check for pressure points — add padding if needed",
                },
                {
                    text: "Keep boot clean — remove liner and wash regularly",
                },
                {
                    text:
                        "Monitor your skin — check daily for redness or rubbing",
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
            title: "Adjusting straps correctly",
            content: [
                {
                    type: "text",
                    content:
                        "Proper strap adjustment ensures your boot stays secure while avoiding pressure points and circulation problems.",
                },
                {
                    type: "card",
                    title: "How to adjust straps",
                    description: "The correct technique.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tighten from bottom to top** — start with the lowest strap, work your way up",
                                "**Snug but not tight** — straps should be secure but not cutting off circulation",
                                "**Check after walking** — straps may loosen, re-tighten as needed",
                                "**Even tension** — all straps should have similar tightness",
                                "**Adjust throughout the day** — swelling changes, you may need to loosen or tighten",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Common strap mistakes",
                    description: "What to avoid.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Too tight** — causes pressure sores, numbness, circulation problems",
                                "**Too loose** — boot doesn't protect properly, foot moves inside",
                                "**Uneven tension** — some straps tight, others loose, causes pressure points",
                                "**Not checking regularly** — straps loosen over time, need regular adjustment",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Padding and pressure points",
            content: [
                {
                    type: "text",
                    content:
                        "Even with proper fit, you may develop pressure points or rubbing. Padding can help prevent problems.",
                },
                {
                    type: "card",
                    title: "Common pressure points",
                    description: "Where problems often occur.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Shin** — front of your leg where boot top sits",
                                "**Ankle bones** — bony prominences on sides of ankle",
                                "**Heel** — back of heel where it contacts boot",
                                "**Top of foot** — where straps cross",
                                "**Calf** — if boot is too tight around calf",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Padding solutions",
                    description: "How to protect pressure points.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Soft padding** — foam padding, soft cloth, or gel pads",
                                "**Moleskin** — adhesive padding specifically for pressure points",
                                "**Sock adjustment** — thicker socks or padding under socks",
                                "**Straps** — adjust strap position to avoid pressure",
                                "**Check daily** — look for redness, blisters, or rubbing",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "When to seek help",
                    content:
                        "If you develop open sores, severe redness that doesn't improve, or signs of infection (pus, spreading redness, fever), contact your clinician immediately. Don't ignore pressure problems — they can get worse quickly.",
                },
            ],
        },
        {
            type: "section",
            title: "Boot maintenance and cleaning",
            content: [
                {
                    type: "text",
                    content:
                        "Keeping your boot clean and well-maintained helps prevent skin problems and keeps it functioning properly.",
                },
                {
                    type: "card",
                    title: "Daily maintenance",
                    description: "Simple daily care.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Check straps** — ensure they're secure and not frayed",
                                "**Inspect boot** — look for cracks, damage, or wear",
                                "**Check liner** — remove and inspect if possible",
                                "**Clean exterior** — wipe down with damp cloth if needed",
                                "**Air out** — when resting, loosen straps and let air circulate",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Cleaning your boot",
                    description: "How to keep it clean.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Liner cleaning:** If your boot has a removable liner, take it out and wash it according to manufacturer's instructions. Most can be hand-washed with mild soap and air-dried.",
                        },
                        {
                            type: "text",
                            content:
                                "**Exterior cleaning:** Wipe down the exterior with a damp cloth and mild soap. Avoid soaking or submerging the boot unless the manufacturer says it's safe.",
                        },
                        {
                            type: "text",
                            content:
                                "**Drying:** Always air-dry — don't use heat sources like hair dryers or radiators, as this can damage the boot materials.",
                        },
                        {
                            type: "text",
                            content:
                                "**Odour control:** Use antifungal powder inside the boot, change socks daily, and air it out regularly.",
                        },
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
                        '**Fit:** "How should the boot fit? What should I check?"',
                        '**Straps:** "How tight should the straps be? How often should I adjust them?"',
                        '**24/7 wear:** "Do I need to wear the boot at night, or can I use a night splint?"',
                        '**Skin issues:** "What should I do if I get pressure points or rubbing?"',
                        '**Cleaning:** "Can I remove the boot to clean it, or just the liner?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "What if my boot is rubbing or causing pressure sores?",
                    answer:
                        "First, check the fit — it may be too tight or not positioned correctly. Try padding the area with soft material. If it's severe or getting worse, contact your clinic. Don't just stop wearing the boot — you need protection, but you may need a different size or adjustment.",
                },
                {
                    question: "How often should I clean my boot?",
                    answer:
                        "Clean the liner weekly if possible, or more often if it gets sweaty or dirty. Wipe down the exterior as needed. The key is keeping it clean to prevent skin problems and odour.",
                },
                {
                    question: "Can I adjust the straps myself?",
                    answer:
                        "Yes, you should adjust straps yourself as needed throughout the day. Swelling changes, and straps may loosen. Just make sure they're snug but not too tight, and tighten from bottom to top.",
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
                        "**Adjust straps regularly** — tighten from bottom to top, check throughout the day",
                        "**Check your skin daily** — catch pressure problems early",
                        "**Keep it clean** — prevents skin problems and odour",
                    ],
                },
            ],
        },
    ],
};
