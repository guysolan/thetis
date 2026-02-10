import type { SectionContent } from "@/components/course/types";
import WedgeRemovalProgression from "@/assets/wedge-removal-progression.png";

export const metadata = {
    slug: "wedge-removal",
    title: "Wedge Removal Protocol",
    description:
        "When and how to remove wedges, angle progression, and what to expect",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "By Week 5, you're likely ready to start removing wedges from your boot — a sign that your tendon is healing. This gradual process brings your foot closer to a normal position, but it must be done carefully and at the right pace. This lesson explains when to start, how to do it safely, and what to expect as your foot angle changes.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (this week)",
        },
        {
            type: "checklist",
            title: "Wedge removal basics",
            items: [
                {
                    text:
                        "Check with your clinician before removing any wedges — timing varies by protocol",
                },
                {
                    text:
                        "Remove wedges gradually, one at a time, usually starting around week 4-5",
                },
                {
                    text:
                        "Watch for increased pain or swelling — these are warning signs to slow down",
                },
                {
                    text:
                        "Keep your foot protected in the boot 24/7 — removing wedges doesn't mean removing protection",
                },
                {
                    text:
                        "Follow your specific protocol — some remove wedges weekly, others every 2 weeks",
                },
            ],
        },
        {
            type: "section",
            title: "Understanding Wedge Removal: Why It Matters",
            content: [
                {
                    type: "text",
                    content:
                        "Wedges hold your foot in a pointed-down position, keeping the torn tendon ends close together. As your tendon heals and new tissue forms, you can gradually reduce this angle. Think of it like **slowly letting out a rope** — you're giving the tendon more slack, but only when it's strong enough to handle it.",
                },
                {
                    type: "image",
                    src: WedgeRemovalProgression,
                    alt: "Four-panel diagram showing gradual wedge removal progression from weeks 2-10, demonstrating how foot angle reduces as wedges are removed",
                    caption:
                        "Wedge removal progression: gradual reduction of foot angle over time",
                },
                {
                    type: "card",
                    title: "Why we remove wedges gradually",
                    description: "The tendon needs time to adapt.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Removing wedges too quickly can cause the tendon ends to separate, leading to a longer tendon and worse outcomes. Going too slowly keeps you in an uncomfortable position longer than necessary. Your clinician's protocol balances these risks.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Early weeks:** Maximum angle keeps ends closest together",
                                "**Mid weeks:** Gradual reduction as new tissue strengthens",
                                "**Later weeks:** Foot approaches neutral as healing progresses",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Simple analogy",
                    content:
                        "Imagine you're gluing two pieces of rope together. At first, you need to hold them very close. As the glue sets, you can gradually relax your grip — but if you let go too fast, the glue breaks. Wedge removal is like gradually relaxing your grip as the 'glue' (new tendon tissue) gets stronger.",
                },
            ],
        },
        {
            type: "section",
            title: "When to Start Removing Wedges",
            content: [
                {
                    type: "text",
                    content:
                        "Timing varies significantly between protocols. Some start as early as week 3-4, others wait until week 5-6. **Never remove wedges without your clinician's approval.**",
                },
                {
                    type: "card",
                    title: "Typical timing (varies by protocol)",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Week 2-3:** Usually still in maximum angle with all wedges",
                                "**Week 4-5:** Many protocols start removing first wedge",
                                "**Week 6-7:** Continue removing wedges gradually",
                                "**Week 8-10:** Final wedges removed, foot approaches neutral",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "warning",
                            content:
                                "These are general guidelines. Your clinician will give you a specific protocol based on your healing progress, gap size, and treatment approach (surgical vs non-surgical).",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Signs you might be ready",
                    description: "What clinicians look for.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Decreasing swelling** — less inflammation means healing is progressing",
                                "**Less pain** — discomfort should be manageable",
                                "**Time since injury** — most protocols start around week 4-5",
                                "**Clinical assessment** — your clinician checks healing progress",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "**Important:** Even if you feel ready, don't remove wedges without your clinician's instruction. The timing is based on healing progress, not just how you feel.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "How to Remove Wedges Safely",
            content: [
                {
                    type: "text",
                    content:
                        "The process is usually straightforward, but doing it correctly matters. Here's how to do it safely:",
                },
                {
                    type: "list",
                    style: "numbered",
                    items: [
                        "**Check your protocol** — know exactly which wedge to remove and when",
                        "**Remove one wedge at a time** — never remove multiple wedges at once",
                        "**Do it when resting** — remove wedges when you're sitting or lying down, not while walking",
                        "**Keep your foot supported** — don't let your foot go flat unsupported",
                        "**Watch for problems** — increased pain, swelling, or discomfort means slow down",
                    ],
                },
                {
                    type: "card",
                    title: "The safe technique",
                    description: "Step-by-step process.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Sit or lie down** — never remove wedges while standing",
                                "**Loosen boot straps** — make it easier to access wedges",
                                "**Remove the bottom wedge** — usually the first one removed (check your protocol)",
                                "**Re-tighten straps** — ensure the boot fits snugly",
                                "**Test gradually** — start with short periods, increase as tolerated",
                            ],
                        },
                        {
                            type: "alert",
                            variant: "info",
                            content:
                                "Some boots have wedges that slide out easily. Others may require removing the boot liner. Follow your boot manufacturer's instructions or ask your clinician to show you the technique.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Remove wedges in the evening when you're resting, not first thing in the morning. This gives your tendon time to adjust overnight, and you'll wake up more comfortable. If you experience increased pain overnight, you can always put the wedge back.",
                },
            ],
        },
        {
            type: "section",
            title: "What to Expect During Wedge Removal",
            content: [
                {
                    type: "text",
                    content:
                        "As you remove wedges, your foot angle changes. This can feel strange at first, and some discomfort is normal.",
                },
                {
                    type: "card",
                    title: "Normal sensations",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling different** — your foot will be in a new position, which feels odd initially",
                                "**Mild discomfort** — some stretching sensation is normal as the angle changes",
                                "**Temporary stiffness** — your ankle may feel stiffer for a day or two",
                                "**Swelling variation** — slight increase in swelling is common and usually settles",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Warning signs to slow down",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Significant pain increase** — more than mild discomfort",
                                "**Rapid swelling** — swelling that doesn't improve with elevation",
                                "**Feeling unstable** — like the tendon is being stretched too much",
                                "**New pain location** — pain in a different area than before",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "If you experience any of these, **put the wedge back** and contact your clinician. It's better to go slower than risk re-injury.",
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Progress isn't always linear",
                    content:
                        "Some days you might feel ready to remove a wedge, other days you might need to put one back. This is normal. Healing isn't a straight line — listen to your body and follow your clinician's guidance.",
                },
            ],
        },
        {
            type: "section",
            title: "What's Normal vs What's Urgent",
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
                                "**Mild discomfort** when removing a wedge — this usually settles within 24-48 hours",
                                "**Feeling strange** in the new position — your foot has been in one angle for weeks",
                                "**Slight swelling increase** — often happens with angle changes, improves with elevation",
                                "**Stiffness** — your ankle has been immobilized, some stiffness is expected",
                                "**Wondering if you're ready** — it's normal to feel uncertain about timing",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Possible DVT (clot in the leg):** new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs):** chest pain, breathlessness, coughing blood, fainting. Also seek urgent help for **severe pain that doesn\'t improve** when you put the wedge back, **numb/blue/pale toes**, severe pressure/pain, fever with rapidly spreading redness, or a fall with a new "pop".',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making Wedge Removal Easier",
            content: [
                {
                    type: "text",
                    content:
                        "A few simple strategies can make the wedge removal process smoother and more comfortable.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Remove wedges gradually** — don't rush the process, even if you feel ready",
                        "**Elevate after removal** — helps reduce any swelling from the angle change",
                        "**Ice if needed** — if you get increased swelling, ice can help (always with a cloth barrier)",
                        "**Keep a log** — note when you removed each wedge and how you felt",
                        "**Don't compare** — everyone's timeline is different, focus on your own progress",
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
                                "You can help by: assisting with wedge removal (especially if it requires removing the boot), helping monitor for warning signs, reminding about elevation after removal, and providing encouragement — this phase can feel slow, but it's important progress.",
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
                        "**This week:** Continue following your wedge removal protocol, one wedge at a time",
                        "**Week 6:** We cover walking progress and transitioning to Unrestricted Weightbearing",
                        "**Weeks 6-8:** Continue wedge removal, may progress mobilisation status",
                        "**Weeks 8-10:** Final wedges removed, foot approaches neutral position",
                    ],
                },
                {
                    type: "tip",
                    title: "Timeline reminder",
                    content:
                        "Full recovery typically takes **6–12 months**, but you'll be walking without crutches much sooner (often by weeks 6–10). We'll break this down week by week.",
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
                        '**Timing:** "When should I start removing wedges? What\'s my specific protocol?"',
                        '**Which wedge:** "Which wedge should I remove first? From the top or bottom?"',
                        '**Pace:** "How often should I remove wedges? Weekly or every two weeks?"',
                        '**Warning signs:** "What symptoms should make me put a wedge back or slow down?"',
                        '**Pain:** "How much discomfort is normal when removing a wedge?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "What if I accidentally removed too many wedges?",
                    answer:
                        "Put the wedges back immediately. Don't walk on it until you've restored the correct angle. Contact your clinician to discuss — they may want to see you to check everything is okay. It's better to be safe than risk re-injury.",
                },
                {
                    question: "Can I remove wedges faster if I'm feeling good?",
                    answer:
                        "No. Even if you feel great, follow your clinician's protocol. The timing is based on healing progress, not just how you feel. Removing wedges too quickly can cause the tendon ends to separate, leading to worse outcomes. Patience now = better function later.",
                },
                {
                    question: "What if removing a wedge causes pain?",
                    answer:
                        "Some mild discomfort is normal. If you get significant pain, put the wedge back and wait longer. If pain persists even with the wedge back, contact your clinician. Don't push through severe pain — it's a sign to slow down.",
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
                        "**Never remove wedges without clinician approval** — timing is critical",
                        "**One wedge at a time** — gradual is safe, fast is risky",
                        "**Watch for warning signs** — pain or swelling means slow down",
                        "**Put wedges back if needed** — it's okay to go slower",
                    ],
                },
            ],
        },
    ],
};
