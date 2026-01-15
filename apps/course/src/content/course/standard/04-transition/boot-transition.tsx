import type { SectionContent } from "@/components/course/types";
import HeelLifts from "@/assets/heel-lifts.jpg";

export const metadata = {
    slug: "boot-transition",
    title: "Leaving Your Boot Behind",
    description:
        "When it's safe, first steps in shoes, and choosing the right footwear",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "This is the moment you've been waiting for: leaving your boot behind. By Week 10-12, your tendon has healed enough to start walking in regular shoes. This transition is exciting but also nerve-wracking — your foot has been protected for weeks, and suddenly it won't be. This lesson covers when it's safe, how to choose the right shoes, and what to expect in those first steps.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (today)",
        },
        {
            type: "checklist",
            title: "Boot transition basics",
            items: [
                {
                    text:
                        "Confirm with your clinician — make sure you're cleared for boot removal",
                },
                {
                    text:
                        "Choose appropriate shoes — supportive, with heel-to-toe drop, room for heel lifts",
                },
                {
                    text:
                        "Start gradual weaning — if allowed, begin with a few hours a day",
                },
                {
                    text:
                        "Use heel lifts initially — 0.5-1cm heel lift in your shoes",
                },
                {
                    text:
                        "Keep your boot nearby — don't throw it away, you may need it initially",
                },
                {
                    text:
                        "Start indoors — first steps should be on flat, familiar surfaces",
                },
            ],
        },
        {
            type: "section",
            title: "When Is It Safe to Leave Your Boot?",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal typically happens around **Week 10-12**, but timing depends on your tendon's strength, not just the calendar. Your clinician will assess when you're ready based on specific criteria.",
                },
                {
                    type: "card",
                    title: "Readiness criteria",
                    description: "What your clinician looks for.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Tendon strength** — ability to do seated calf raises with significant weight (often 0.8-1x body weight)",
                                "**Neutral position** — you're at 0 wedges and comfortable",
                                "**Swelling controlled** — swelling is manageable",
                                "**Confidence** — you feel relatively confident walking in the boot",
                                "**No complications** — no signs of infection, pressure issues, or other problems",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Why strength matters more than time",
                    description: "The tendon needs to handle walking forces.",
                    variant: "muted",
                    content: [
                        {
                            type: "text",
                            content:
                                "Walking puts about **1.5x your body weight** through your Achilles tendon with each step. Your tendon needs to be strong enough to handle this force. That's why your clinician assesses your strength — typically by seeing if you can do seated calf raises with significant weight — before clearing you for boot removal.",
                        },
                        {
                            type: "text",
                            content:
                                "**Don't rush this transition.** Removing the boot too early can lead to tendon elongation — when the tendon stretches too much and doesn't heal at the right length. This affects your long-term function. It's better to wait until you're truly ready.",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "warning",
                    title: "Don't remove your boot without clearance",
                    content:
                        "Never remove your boot without your clinician's approval. They assess your tendon strength and overall readiness. Removing the boot too early can cause tendon elongation or re-rupture. Follow your medical team's guidance.",
                },
            ],
        },
        {
            type: "section",
            title: "The Gradual Weaning Process",
            content: [
                {
                    type: "text",
                    content:
                        "Boot removal is usually **gradual**, not sudden. You don't go from wearing the boot 24/7 to never wearing it again. Instead, you gradually wean off it over 1-2 weeks.",
                },
                {
                    type: "card",
                    title: "Typical weaning schedule",
                    description: "How the transition usually works.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Day 1-2**: Wear shoes indoors for 1-2 hours, boot the rest of the time",
                                "**Day 3-4**: Increase to 3-4 hours in shoes, gradually",
                                "**Day 5-6**: Majority of the day in shoes, boot for longer walks or when tired",
                                "**Day 7+**: Full transition to shoes during the day",
                                "**Night**: May still use night splint for additional protection initially",
                            ],
                        },
                    ],
                },
                {
                    type: "tip",
                    title: "Tiny change, big payoff",
                    content:
                        "Keep your boot nearby for the first week or two. If you get tired, feel uncertain, or have increased swelling, you can put it back on. Having this safety net reduces anxiety and makes the transition much easier. You're not failing if you need to use it — you're being smart.",
                },
                {
                    type: "text",
                    content:
                        "**Note:** Your specific weaning schedule may vary. Some protocols are more gradual, others move faster. Always follow your clinician's specific instructions — they know your situation best.",
                },
            ],
        },
        {
            type: "section",
            title: "Choosing the Right Footwear",
            content: [
                {
                    type: "text",
                    content:
                        "Your first shoes after the boot are important. The wrong choice can cause problems — pain, instability, or even tendon issues. Choose shoes that support your healing tendon and make the transition easier.",
                },
                {
                    type: "card",
                    title: "Ideal shoe characteristics",
                    description: "What to look for.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heel-to-toe drop**: 10mm or more (NOT flat shoes) — this reduces stretch on your Achilles",
                                "**Heel cushioning**: Good shock absorption — protects your heel and reduces impact",
                                "**Heel counter**: Firm support at the back of the shoe — provides stability",
                                "**Fit**: Snug but not tight, with room for heel lifts — you'll need space for inserts",
                                "**Closure**: Laces preferred — allows adjustable fit as swelling changes",
                                "**Sole**: Slightly firm, not too flexible — provides support",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Good options",
                    description: "Types of shoes that work well.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Running shoes** — Asics, Brooks, New Balance, etc. — designed for support and cushioning",
                                "**Walking shoes** — with good heel support and cushioning",
                                "**Athletic trainers** — with cushioned heels and firm heel counters",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Avoid these",
                    description: "Shoes that can cause problems.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Completely flat shoes** — ballet flats, Converse, minimalist shoes — put too much stretch on your Achilles",
                                "**High heels** — obviously not appropriate",
                                "**Flip flops or sandals** — no support, risk of tripping",
                                "**Slip-on shoes** — without back support — don't provide stability",
                                "**Barefoot** — never walk barefoot initially",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Using heel lifts",
                    description: "Why and how to use them.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "**Always use heel lifts initially** — typically 0.5-1cm. This eases the transition from your boot's heel elevation and reduces stretch on your healing tendon.",
                        },
                        {
                            type: "product-image",
                            src: HeelLifts,
                            alt: "Heel wedge insoles showing adjustable layered design with brown textured top surface and black foam layers",
                            caption:
                                "Heel wedge insoles - adjustable height inserts for comfortable heel elevation",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Start with 1cm** — matches your boot's heel elevation",
                                "**Gradually reduce** — over 2-4 weeks, reduce to 0.5cm, then remove",
                                "**Gel lifts work well** — comfortable and easy to adjust",
                                "**Both shoes** — some people use lifts in both shoes initially to avoid leg length difference",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "Your physiotherapist will guide you on when to reduce and remove the heel lifts. Don't rush this — the gradual reduction helps your tendon adapt.",
                        },
                        {
                            type: "tip",
                            title: "Product recommendation: Heel wedge insoles",
                            content:
                                "**Heel wedge insoles** provide adjustable heel elevation (typically 0.5-1cm) and are comfortable and easy to insert into your shoes. They offer adjustable height, easy insertion, and comfortable padding. Cost: approximately £10 ($15-30). These work well for the transition period and can be adjusted as you reduce the heel lift over time.",
                        },
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Your First Steps in Regular Shoes",
            content: [
                {
                    type: "text",
                    content:
                        "Those first steps out of the boot are momentous — and often wobbly. Your foot has been protected for weeks, and suddenly it's exposed. This is normal. Here's what to expect and how to do it safely.",
                },
                {
                    type: "card",
                    title: "What to expect",
                    description: "Normal sensations in those first steps.",
                    variant: "default",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Stiffness** — your ankle will feel stiff and tight",
                                "**Weakness** — your calf will fatigue quickly",
                                "**Uncertainty** — walking will feel strange and wobbly",
                                "**Limping** — you may limp initially, this is normal",
                                "**Tightness** — in the Achilles area, especially when pushing off",
                                "**Mild discomfort** — NOT sharp pain, but some discomfort is normal",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "How to take your first steps",
                    description: "Step-by-step guidance.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "numbered",
                            items: [
                                "**Start indoors** — on a flat, familiar surface (your home)",
                                "**Have support nearby** — furniture, wall, or someone to hold onto",
                                "**Take short steps** — shorter than normal, focus on control",
                                "**Heel-to-toe pattern** — land on your heel, roll to your toe",
                                "**Go slowly** — there's no rush, take your time",
                                "**Stop when tired** — rest when your calf feels fatigued",
                                "**Gradually increase** — build up distance and time slowly",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Protected walking techniques",
                    description: "How to walk safely after boot removal.",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "When you first remove your boot, your tendon is still vulnerable. Protected walking techniques help prevent elongation — the biggest risk after boot removal.",
                        },
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Heel wedge (1.2cm)**: Use a heel lift in your shoe to reduce tendon stretch during walking",
                                "**Reduced step length**: Take shorter steps than normal to reduce force through your tendon",
                                "**Partial weight-bearing if limping**: If you're limping, use crutches or reduce weight on the injured foot",
                                "**Gradual progression**: Increase step length and weight-bearing as your strength improves",
                            ],
                        },
                        {
                            type: "text",
                            content:
                                "These techniques are especially important in the first few weeks after boot removal. Your physiotherapist will guide you on when to progress.",
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
                    title: "Usually normal at this stage",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "**Feeling nervous** — anxiety about walking without the boot is completely normal",
                                "**Stiffness** — your ankle will be stiff after weeks in a boot",
                                "**Weakness** — your calf will fatigue quickly, this improves over time",
                                "**Limping** — some limping initially is normal, should improve gradually",
                                "**Mild discomfort** — some discomfort is normal, should not be sharp pain",
                                "**Increased swelling** — may increase initially without boot compression",
                                "**Feeling vulnerable** — your foot feels exposed, this is normal",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Get urgent help now",
                    content:
                        '**Sharp pain** when walking or bearing weight. **Sensation of "giving way"** — your ankle feels unstable. **Popping or snapping** — new sounds or sensations. **Significant increase in swelling** — much worse than before. **Unable to bear weight** — can\'t put weight on your foot. **Numb or blue toes** — circulation problems. **Fever with redness** — possible infection. Also seek urgent help for **possible DVT (clot in the leg)**: new calf pain/tenderness, one-leg calf swelling, calf redness/warmth. **Possible PE (clot in the lungs)**: chest pain, breathlessness, coughing blood, fainting.',
                },
            ],
        },
        {
            type: "section",
            title: "Practical Tips: Making the Transition Easier",
            content: [
                {
                    type: "text",
                    content:
                        "The transition from boot to shoes is a big step. Here are strategies to make it easier and safer:",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Start small** — begin with just a few steps, build up gradually",
                        "**Rest frequently** — your calf will tire quickly, rest when needed",
                        "**Elevate when resting** — helps control swelling",
                        "**Ice if needed** — if swelling increases, ice can help",
                        "**Use crutches initially** — if you're limping significantly, use crutches for support",
                        "**Be patient** — this transition takes time, don't rush it",
                        "**Listen to your body** — if something doesn't feel right, slow down or rest",
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
                                "You can help by: being patient with the slow progress, providing support during those first steps, helping with shoe shopping (finding the right fit), understanding that this is a vulnerable time — they may feel anxious or uncertain, and encouraging gradual progress — don't push them to do too much too soon.",
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
                        "**This week**: Continue gradual weaning, build up time in shoes",
                        "**Week 11**: Starting physiotherapy — structured rehabilitation begins",
                        "**Weeks 11-12**: Full transition to shoes, heel lifts gradually reduced",
                        "**After boot removal**: More activities become possible, but still gradual",
                    ],
                },
                {
                    type: "text",
                    content:
                        "Physiotherapy usually starts around the time you remove your boot. Your physiotherapist will guide you through exercises, walking technique, and progression. This is where you actively rebuild strength and function.",
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
                        '"Am I ready to remove my boot? What are the criteria?"',
                        '"What shoes should I wear? Do you have recommendations?"',
                        '"How should I wean off the boot? What\'s the schedule?"',
                        '"Do I need heel lifts? What size?"',
                        '"What should I expect in those first steps?"',
                        '"When should I start physiotherapy?"',
                        '"What should I do if I have problems after removing the boot?"',
                        '"After-hours: What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I remove my boot earlier if I feel ready?",
                    answer:
                        "No. Boot removal should be based on your tendon's strength, assessed by your clinician, not just how you feel. Removing the boot too early can cause tendon elongation or re-rupture. Wait for your clinician's clearance — they assess your readiness based on specific criteria.",
                },
                {
                    question: "What if I can't walk without limping?",
                    answer:
                        "Some limping initially is normal. If you're limping significantly, use crutches or reduce weight on your injured foot. Your physiotherapist will help you improve your walking pattern. If limping persists or worsens, contact your medical team.",
                },
                {
                    question: "How long will I need heel lifts?",
                    answer:
                        "Typically 2-4 weeks, gradually reducing from 1cm to 0.5cm to none. Your physiotherapist will guide you on when to reduce and remove them. Don't rush this — the gradual reduction helps your tendon adapt.",
                },
                {
                    question:
                        "What if my foot swells more after removing the boot?",
                    answer:
                        "Some increased swelling is normal initially — the boot provided compression. Elevate your foot when resting, ice if needed, and gradually increase time in shoes. If swelling is severe or doesn't improve, contact your medical team.",
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
                        "**Wait for clearance** — don't remove your boot without your clinician's approval",
                        "**Gradual transition** — wean off the boot over 1-2 weeks, don't rush",
                        "**Choose the right shoes** — supportive, with heel-to-toe drop, room for heel lifts",
                        "**Use heel lifts initially** — 0.5-1cm, gradually reduce over 2-4 weeks",
                        "**Start small** — first steps indoors, short distances, build up gradually",
                        "**Protected walking** — shorter steps, heel lifts, partial weight-bearing if limping",
                    ],
                },
            ],
        },
    ],
};
