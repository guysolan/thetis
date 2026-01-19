import type { SectionContent } from "@/components/course/types";
import DvtVsPeLegToLungs from "@/assets/dvt-vs-pe-leg-to-lungs.png";
import DvtDopplerScan from "@/assets/dvt-doppler-scan.png";
import DvtSignsSymptoms from "@/assets/dvt-signs-symptoms.png";

export const metadata = {
    slug: "blood-clot-prevention",
    title: "Blood Clot Prevention - Critical Information",
    description: "Understanding DVT/PE risk and blood thinners",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "This is one of the most important sections in the early weeks. Achilles rupture + a leg being kept still in a cast/boot (called **immobilisation**) carries a higher risk of blood clots. The goal is simple: **reduce risk** and **spot warning signs early**.",

    blocks: [
        {
            type: "card",
            title: "Tiny glossary (plain English)",
            description: "These acronyms show up in hospitals a lot.",
            variant: "muted",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**VTE**: “a blood clot in a vein” (the umbrella term).",
                        "**DVT**: a clot in a **deep vein** of the leg (often the calf).",
                        "**PE**: a clot that has travelled to the **lungs** (pulmonary embolism). This is the dangerous one.",
                    ],
                },
            ],
        },
        {
            type: "image",
            src: DvtVsPeLegToLungs,
            alt: "Infographic showing a clot in the leg (DVT) and a clot in the lungs (PE) with a simple arrow path between them",
            caption: "Blood clots: DVT vs PE (leg → lungs)",
        },
        {
            type: "alert",
            variant: "danger",
            title: "If you have these symptoms — treat as an emergency",
            content:
                "**Possible PE (clot in lungs):** sudden shortness of breath, chest pain (especially when breathing), coughing blood, fainting, or a racing heartbeat. **Call emergency services / go to A&E now.**",
        },
        {
            type: "section",
            title: "Why clot risk is higher after an Achilles rupture",
            content: [
                {
                    type: "text",
                    content:
                        "Compared to many other injuries, Achilles rupture is a perfect storm for clots: immobilisation, reduced walking, and the calf muscle pump not working normally.",
                },
                {
                    type: "tip",
                    title: "A simple analogy",
                    content:
                        "Think of blood flow like traffic on a motorway. When your leg is immobilised and you’re not walking, it’s like **closing lanes** and **slowing traffic** — it becomes easier for a “traffic jam” (a clot) to form in the leg.",
                },
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Immobilisation slows blood flow** in the deep veins of the calf.",
                        "**Inflammation from the injury** increases clotting tendency locally.",
                        "**Reduced mobility overall** means less circulation throughout the day.",
                        "**Calf pump is impaired** because you can’t push off normally.",
                    ],
                },
                {
                    type: "tip",
                    title: "Practical takeaway",
                    content:
                        "If your hospital offers VTE prophylaxis (blood thinners), **take it exactly as prescribed**. If it wasn’t discussed, it’s reasonable to ask about it at your follow-up.",
                },
            ],
        },
        {
            type: "section",
            title: "When clots can form: earlier than you might think",
            content: [
                {
                    type: "text",
                    content:
                        "Research suggests that blood clots can sometimes be present **even before immobilisation begins**. A recent study found that in patients with acute Achilles rupture, about 4 in 10 had a clot detected on ultrasound **before** they were put in a cast or boot.",
                },
                {
                    type: "image",
                    src: DvtDopplerScan,
                    alt: "Medical illustration showing a doctor performing a Doppler ultrasound on a patient's leg in an orthopedic boot, with ultrasound scans comparing normal veins to veins with thrombosis. Text overlay shows '42% DETECTED BEFORE THE BOOT' and 'Early Screening Saves Lives'.",
                    caption:
                        "Doppler ultrasound can detect clots before immobilisation begins",
                },
                {
                    type: "text",
                    content:
                        "Most of these clots were found in the **muscular veins** (gastrocnemius or soleus muscles) of the calf. Importantly, many patients didn't have the classic risk factors we usually associate with clots.",
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "What this means for you",
                    content:
                        "This doesn't mean you should panic — but it does highlight why early awareness and screening matter. If your healthcare team suggests a Doppler ultrasound or blood thinner, they're being proactive about your safety.",
                },
            ],
        },
        {
            type: "section",
            title: "Blood thinners: injections vs tablets",
            content: [
                {
                    type: "text",
                    content:
                        "Your team may recommend a blood thinner while you’re immobilised. Options vary by country and protocol, and depend on your personal bleeding risk and medical history.",
                },
                {
                    type: "table",
                    headers: ["Option", "Pros", "Cons / Notes"],
                    rows: [
                        [
                            "Daily injections (e.g. enoxaparin)",
                            "Well-established, commonly used",
                            "Needs self-injection; bruising can happen; still requires consistent daily use",
                        ],
                        [
                            "Oral tablets (e.g. rivaroxaban / apixaban)",
                            "Convenient (tablet), often once daily",
                            "May be protocol-dependent; not suitable for everyone; follow local guidance",
                        ],
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Talk to your clinician",
                    content:
                        "Ask: **Do I need VTE prophylaxis? Which medication and for how long?** Protocols vary, but the underlying principle is the same: clot prevention matters in Achilles rupture recovery.",
                },
            ],
        },
        {
            type: "section",
            title: "Warning signs to watch for",
            content: [
                {
                    type: "image",
                    src: DvtSignsSymptoms,
                    alt: "Medical illustration comparing a normal leg with a leg affected by DVT, showing signs and symptoms including swelling, red or darkened skin, swollen veins, pain, and warm skin",
                    caption: "DVT signs and symptoms to watch for",
                },
                {
                    type: "card",
                    title: "DVT (clot in the leg)",
                    description:
                        "Symptoms can be subtle — don’t ignore new changes.",
                    variant: "muted",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "New calf or thigh pain/tenderness (different from your usual ankle pain)",
                                "One-leg swelling that’s **more than expected**",
                                "Redness or warmth in the calf",
                                "Leg feels unusually heavy or tight",
                            ],
                        },
                    ],
                },
                {
                    type: "card",
                    title: "PE (clot in the lungs)",
                    description: "This is a medical emergency.",
                    variant: "highlight",
                    content: [
                        {
                            type: "list",
                            style: "bullet",
                            items: [
                                "Sudden shortness of breath",
                                "Chest pain (especially with deep breathing)",
                                "Coughing up blood",
                                "Rapid or irregular heartbeat",
                                "Fainting / feeling lightheaded",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "Is swelling normal, or is it a clot?",
                    answer:
                        "Swelling is common after rupture and immobilisation. What's more concerning is **new** calf pain/tenderness, **one-leg** swelling that's noticeably worsening, or calf redness/warmth — especially if it feels different from your usual ankle swelling. When in doubt, get checked.",
                },
                {
                    question:
                        "If I accidentally put weight through my foot, does that cause clots?",
                    answer:
                        "Brief accidental weight-bearing doesn't directly cause clots. Clot risk is mostly about immobilisation and reduced circulation over time. Focus on prevention: follow mobility instructions, keep moving safely within your limits, and take any prescribed blood thinners.",
                },
                {
                    question: "What if I missed a dose of blood thinner?",
                    answer:
                        "Take it as soon as you remember — unless it's almost time for your next dose (then skip the missed one). Don't double up. If you're unsure, call your pharmacy or clinic for advice.",
                },
            ],
        },
    ],
};
