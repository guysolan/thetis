import type { SectionContent } from "@/components/course/types";
import ThompsonTest from "@/assets/thompson-test.png";

export const metadata = {
    slug: "specialist-appointment",
    title: "Your Specialist Appointment",
    description:
        "What to expect at orthopaedics, physical examination, and imaging",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Your first specialist appointment is coming up — usually within 1–2 weeks of injury. It's normal to feel anxious. This appointment is where you'll get a clear diagnosis, understand your options, and start building your recovery plan.",

    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Quick action plan (before your appointment)",
        },
        {
            type: "checklist",
            title: "Before you go",
            items: [
                {
                    text:
                        "Write down your questions (see list below) — you'll forget them in the room",
                },
                {
                    text:
                        "Bring someone if possible — two sets of ears catch more information",
                },
                {
                    text:
                        "Wear loose trousers or shorts (they'll need to examine your leg)",
                },
                {
                    text:
                        "Arrive early — clinics can run behind, and rushing adds stress",
                },
                {
                    text:
                        "Bring your current medications list (including any blood thinners)",
                },
                {
                    text:
                        "Have your phone ready to take notes or record (ask permission first)",
                },
            ],
        },
        {
            type: "tip",
            title: "Tiny change, big payoff",
            content:
                "Write your questions on paper or in your phone notes **now**, not in the waiting room. Stressed brains forget things.",
        },
        {
            type: "section",
            title: "What happens at the appointment",
            content: [
                {
                    type: "text",
                    content:
                        "Every clinic is slightly different, but here's the typical flow. Think of it as four parts: **history**, **examination**, **imaging** (maybe), and **plan**.",
                },
                {
                    type: "accordion",
                    items: [
                        {
                            title: "1. History — telling your story",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "The specialist will ask about the moment of injury and your symptoms since. Be ready to describe:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "What were you doing when it happened?",
                                        "Did you feel/hear a pop or snap?",
                                        "Where exactly was the pain?",
                                        "Could you walk afterwards?",
                                        "What treatment have you had so far (A&E, cast, splint)?",
                                        "Any previous Achilles problems or steroid injections in that area?",
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: "Why this matters",
                                    content:
                                        'The classic "pop + felt like I was kicked" story is strongly suggestive of a rupture. Your history helps confirm the diagnosis before they even examine you.',
                                },
                            ],
                        },
                        {
                            title:
                                "2. Physical examination — the hands-on tests",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "You'll usually lie face-down on an examination couch with your feet hanging off the end. The specialist will:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Look** at both ankles — comparing swelling, bruising, and calf muscle bulk",
                                        "**Feel** (palpate) the tendon — checking for a gap or indent",
                                        "**Squeeze your calf** (Thompson/Simmonds test) — in a healthy tendon, this makes your foot point down; in a rupture, it doesn't move",
                                        "**Compare both sides** — they may ask you to point your toes or stand on tiptoe (if safe)",
                                    ],
                                },
                                {
                                    type: "card",
                                    title: "The Thompson test (calf squeeze)",
                                    description:
                                        "The key clinical test for Achilles rupture.",
                                    variant: "muted",
                                    content: [
                                        {
                                            type: "text",
                                            content:
                                                'Your calf muscle is connected to your heel bone by the Achilles tendon — like a puppet string. When the specialist squeezes your calf, it should pull the "string" and make your foot point downward ([plantarflexion](/standard/emergency-care)). If the tendon is ruptured, the string is cut, so the foot doesn\'t move.',
                                        },
                                    ],
                                },
                                {
                                    type: "image",
                                    src: ThompsonTest,
                                    alt: "Side-by-side diagram showing the Thompson test: squeezing the calf makes the foot point down in a healthy tendon (plantarflexion), but no movement in a ruptured tendon",
                                    caption:
                                        "The Thompson test — squeezing the calf should make your foot point down if the tendon is intact",
                                },
                            ],
                        },
                        {
                            title: "3. Imaging — ultrasound or MRI?",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "Not everyone needs imaging. If your history and exam are classic for a rupture, imaging may not change the plan. But many clinics use it to:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "Confirm the diagnosis",
                                        "Measure the gap between tendon ends",
                                        'Check if the ends come together when your foot is pointed down ("apposition")',
                                        "Rule out other injuries",
                                    ],
                                },
                                {
                                    type: "card",
                                    title: "Ultrasound vs MRI",
                                    variant: "muted",
                                    content: [
                                        {
                                            type: "table",
                                            headers: ["", "Ultrasound", "MRI"],
                                            rows: [
                                                [
                                                    "Speed",
                                                    "Often same-day",
                                                    "Usually scheduled separately",
                                                ],
                                                ["Cost", "Lower", "Higher"],
                                                [
                                                    "What it shows",
                                                    "Tendon ends, gap, real-time movement",
                                                    "More detail, better for complex cases",
                                                ],
                                                [
                                                    "Who does it?",
                                                    "Radiologist or trained clinician",
                                                    "Radiology department",
                                                ],
                                            ],
                                        },
                                        {
                                            type: "text",
                                            content:
                                                "**Ultrasound** is the most common first-line imaging. **MRI** is sometimes used if the diagnosis is unclear or if surgery is being planned.",
                                        },
                                    ],
                                },
                                {
                                    type: "tip",
                                    title: 'What\'s a "gap" measurement?',
                                    content:
                                        'On ultrasound, they may measure the distance between the torn tendon ends (e.g. "4 cm gap"). What matters clinically is often whether the ends **come together** when your foot is pointed down. A large gap with good apposition may still heal non-surgically. Don\'t panic at the number — ask what it means for your specific plan.',
                                },
                            ],
                        },
                        {
                            title: "4. The plan — what happens next",
                            content: [
                                {
                                    type: "text",
                                    content:
                                        "After the exam (and imaging, if done), the specialist will outline the treatment options. In most cases, you'll hear about:",
                                },
                                {
                                    type: "list",
                                    style: "bullet",
                                    items: [
                                        "**Non-surgical treatment** — using a boot/cast to let the tendon heal on its own",
                                        "**Surgical treatment** — stitching the tendon ends together, then using a boot/cast",
                                        "**The UKSTAR trial** — a major study showing similar outcomes for both approaches in most patients (we cover this in detail next lesson)",
                                    ],
                                },
                                {
                                    type: "text",
                                    content:
                                        "You might not need to decide today. Many clinics give you time to think, especially if you want to discuss with family or get more information.",
                                },
                            ],
                        },
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
                                "Bruising that has spread — it follows gravity and can reach your toes",
                                "Swelling that varies through the day (worse in the evening)",
                                "Feeling overwhelmed or anxious about the diagnosis",
                                "Tenderness around the injury site",
                                "Mild discomfort in the cast/boot/splint",
                            ],
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "danger",
                    title: "Seek urgent care",
                    content:
                        '**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, severe pressure in cast/boot, or fever with spreading redness.',
                },
            ],
        },
        {
            type: "card",
            title: "Questions to ask at this appointment",
            description:
                "Save these to your phone and tick them off in clinic.",
            variant: "default",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        '**Diagnosis:** "Can you confirm it\'s a complete rupture? Did you see it on ultrasound/MRI?"',
                        '**Gap size:** "How big is the gap, and does it close when my foot is pointed down? What does that mean for treatment?"',
                        '**Treatment options:** "What are my options — surgical vs non-surgical? What do you recommend for me, and why?"',
                        '**Timeline to decide:** "How long do I have to make a decision? What happens if I need more time?"',
                        '**Current immobilisation:** "Is my current splint/boot correct, or do I need a change?"',
                        '**Mobilisation status:** "What is my weightbearing status? Am I Non Weightbearing, Limited Weightbearing, or Unrestricted Weightbearing?"',
                        '**Blood thinners:** "Should I continue/start VTE prophylaxis? For how long?"',
                        '**Next appointment:** "When is my next appointment, and what happens then?"',
                        '**After-hours:** "What should I do if I can\'t reach you after hours?"',
                    ],
                },
            ],
        },
        {
            type: "section",
            title: "Practical tips for the day",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Transport:** If possible, have someone drive you. Navigating crutches + hospital car parks is stressful.",
                        "**Clothing:** Loose trousers or shorts — they need access to your whole lower leg.",
                        "**Time:** Clinics often run late. Bring water, snacks, and something to read/do.",
                        "**Recording:** Ask if you can record the consultation (even just audio). You'll forget 80% of what's said.",
                        "**Second opinion:** If you're unsure about the plan, it's OK to ask for time or seek another opinion.",
                    ],
                },
                {
                    type: "tip",
                    title: "For partners / carers",
                    content:
                        "You can help by: coming to the appointment (two sets of ears), taking notes, asking follow-up questions, and helping navigate the hospital. Your support makes a huge difference.",
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
                        "**After this appointment:** You'll have a clearer diagnosis and usually a conversation about treatment options (surgery vs non-surgical).",
                        "**Next lesson:** We cover the **surgery vs non-surgical decision** in detail — including the UKSTAR trial findings.",
                        "**Upcoming weeks:** Boot fitting, wedge protocols, mobilisation progression — we'll guide you through each stage.",
                    ],
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question:
                        "What if my appointment is delayed beyond 2 weeks?",
                    answer:
                        "While earlier is generally better, a short delay (a few days) is unlikely to change outcomes significantly. If you're waiting more than 2 weeks and haven't been seen, contact the clinic to escalate. Keep protecting the tendon in the meantime.",
                },
                {
                    question:
                        "Do I need to decide on surgery at this appointment?",
                    answer:
                        "Not necessarily. Many clinics give you time to think — especially if both options are reasonable for your situation. Ask how long you have to decide and what information would help you choose.",
                },
                {
                    question:
                        "What if the specialist recommends something different from what A&E said?",
                    answer:
                        "This is normal. A&E focuses on initial stabilisation. The specialist has more time, expertise, and possibly imaging to refine the plan. If you're confused about why recommendations differ, ask for clarification.",
                },
                {
                    question: "When can I drive / go back to work?",
                    answer:
                        "We cover driving in a later section (typically weeks 8–10 for automatic cars on the left foot). Work depends on your job — desk roles may resume earlier with adjustments. Ask your specialist for a timeline specific to your situation.",
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
                        "**Write down your questions** before the appointment — stressed brains forget",
                        "**Bring someone if possible** — two sets of ears catch more",
                        "**You don't have to decide everything today** — it's OK to ask for time",
                        "**Keep protecting the tendon 24/7** — that hasn't changed",
                    ],
                },
            ],
        },
    ],
};
