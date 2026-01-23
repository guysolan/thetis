import type { SectionContent } from "@/components/course/types";
import SnapRuptureExperience from "@/assets/snap-rupture-experience-v1.jpeg";
import AchillesRopeEndsPointedDown from "@/assets/tendon-gap.png";
import HowRupturesHappen from "@/assets/how-ruptures-happen.png";

export const metadata = {
  slug: "emergency-care",
  title: "Emergency Care & Initial Assessment",
  description:
    "What just happened, A&E expectations, and immediate first steps",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    'If you\'re reading this, you\'ve likely just experienced one of the most distinctive injuries in medicine — a ruptured Achilles tendon. That unmistakable "pop" or "snap" followed by difficulty walking has brought you here. Millions of people have recovered fully — this guide shows you how, step by step.',

  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Quick action plan (first 24 hours)",
    },
    {
      type: "text",
      content: "If you only read one section, read this.",
    },
    {
      type: "alert",
      variant: "danger",
      title: "If you haven't been assessed yet",
      content:
        "**Go to A&E today** for assessment and immobilisation. The first priority is to **keep the torn tendon ends together** (foot held pointed-down) and get you a plan for follow-up care.",
    },
    {
      type: "dos-donts",
      dos: [
        "**Keep the tendon ends together 24/7:** Keep your foot in the **pointed-down** position your clinician set (cast/splint/boot). This is the #1 rule — don't let your toes come up.",
        "**Assume you're non-weight-bearing unless told otherwise:** Use elbow crutches and move slowly. You'll likely be able to walk without crutches from Week 2 onwards, but follow your clinician's guidance.",
        "**Elevate** your ankle above heart level as much as possible.",
        "**Know the blood clot red flags** and seek urgent care if they appear. We'll explain what **DVT** (deep vein thrombosis = clot in the leg) and **PE** (pulmonary embolism = clot in the lungs) mean below, and how they relate to **VTE** (venous thromboembolism = the umbrella term for both).",
        "**Arrange follow-up** (fracture clinic/orthopaedics) if it hasn't been booked.",
      ],
      donts: [
        "**Don't let your toes come up** — this is the golden rule. If your toes come up, the tendon ends pull apart. Think of recovery like a game of snakes and ladders: keeping the ends together moves you forward (ladder), letting your toes come up sets you back (snake).",
        "**Don't stretch** your Achilles or calf — this pulls the ends apart.",
        "**Don't start exercises yet** — exercises begin at Week 6, not before. Your tendon needs time to begin healing first.",
        '**Don\'t walk barefoot** or "test it" without protection.',
        "**Don't remove the cast/splint/boot** unless your team explicitly told you it's safe.",
        "**Don't ignore** new calf pain, chest pain, breathlessness, or one-leg swelling — these could be signs of blood clots.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Safety Note",
      content:
        "Protocols vary by hospital. Use this guide to understand what's typical, but follow your clinician's instructions if they differ.",
    },
    {
      type: "tip",
      title: "Got a boot already?",
      content:
        "If you've been given a walking boot at A&E, don't worry — we cover **everything about boots** in detail later in the course (choosing, fitting, adjusting, sleeping, showering, and more). For now, just keep it on and keep your foot pointed down.",
    },
    {
      type: "tip",
      title: "Recovery timeline (the short version)",
      content:
        "You'll be walking without crutches much sooner — often from **Week 2 onwards** (though you'll still need your boot). We'll break this down week by week — don't try to skip ahead.",
    },
    {
      type: "section",
      title: "Understanding Your Injury",
      content: [
        {
          type: "heading",
          level: 3,
          text: "What Just Happened to Your Achilles Tendon",
        },
        {
          type: "text",
          content:
            "The **Achilles tendon** is the largest and strongest tendon in your body. A **tendon** is a tough band of tissue that connects muscle to bone. Your Achilles tendon connects your **calf muscle** (the muscles at the back of your lower leg) to your **heel bone** (also called the calcaneus). When it ruptures, the tendon fibres tear completely — think of it like a rope that has frayed and snapped. This disconnects your powerful calf muscle from your heel, which is why you suddenly can't push off the ground properly or stand on your tiptoes.",
        },
        {
          type: "heading",
          level: 3,
          text: "Understanding Foot Movements: Plantarflexion and Dorsiflexion",
        },
        {
          type: "text",
          content:
            "Throughout your recovery, you'll hear clinicians use terms like **plantarflexion** and **dorsiflexion**. Understanding these terms helps you follow instructions and protect your healing tendon.",
        },
        {
          type: "card",
          title: "Plantarflexion (Pointed Down)",
          description: "The SAFE position for healing.",
          variant: "highlight",
          content: [
            {
              type: "text",
              content:
                "**Plantarflexion** means your foot is **pointed down**, like you're standing on tiptoes or pressing a gas pedal. This is the **safe position** for your healing tendon — it brings the torn ends closer together.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Visual**: Your toes point down toward the ground",
                "**Feels like**: Standing on tiptoes or pressing a gas pedal",
                "**Why it's safe**: Keeps tendon ends together, prevents elongation",
                "**When**: This is your position in the boot/cast for the first 8-12 weeks",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "Dorsiflexion (Toes Up)",
          description: "The UNSAFE position early in recovery.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "**Dorsiflexion** means your foot is **pointed up**, with your toes moving toward your shin. This is **unsafe early in recovery** because it pulls the tendon ends apart.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Visual**: Your toes point up toward your shin",
                "**Feels like**: Pulling your foot back toward your leg",
                "**Why it's dangerous**: Pulls tendon ends apart, causes elongation",
                "**When safe**: Only after your tendon has healed and strengthened (weeks 12+)",
              ],
            },
            {
              type: "alert",
              variant: "warning",
              content:
                "**Critical**: Don't let your toes come up (dorsiflexion) in the first 8-12 weeks. This is the golden rule — it pulls the tendon ends apart and disrupts healing.",
            },
          ],
        },
        {
          type: "text",
          content:
            "**Simple memory aid**: **Plantar**flexion = **Point** down (both start with P). **Dors**iflexion = **Danger** early (both start with D). Your boot holds your foot in plantarflexion (pointed down) to protect your healing tendon.",
        },
        {
          type: "tip",
          title: "The Golden Rule: Keep the Ends Together",
          content:
            "Think of recovery like a game of **snakes and ladders**. When you keep the two torn ends of the tendon **lined up and close together** (by keeping your foot pointed down — **plantarflexion**), you're climbing a ladder — healing progresses forward. When you let your toes come up (**dorsiflexion**) or stretch, you're sliding down a snake — the ends pull apart and healing is disrupted. **The #1 rule: don't let your toes come up.**",
        },
        {
          type: "image",
          src: AchillesRopeEndsPointedDown,
          alt:
            "Simple diagram showing a snapped rope (Achilles) and how a pointed-down foot brings the rope ends closer together",
          caption:
            "Why pointed-down matters: keeping the tendon ends close together helps healing. Don't let your toes come up — that's the golden rule.",
        },
        {
          type: "heading",
          level: 3,
          text: 'The "Snap" — Why It Happened and What It Means',
        },
        {
          type: "text",
          content:
            "Understanding how ruptures happen can help reduce anxiety and guilt. **It's not your fault** — ruptures often occur during normal, everyday activities, not because you did something wrong.",
        },
        {
          type: "image",
          src: HowRupturesHappen,
          alt:
            "Educational infographic showing how Achilles tendon ruptures happen: tissue fatigue accumulates over time from normal activities, leading to rupture during a seemingly normal, submaximal activity",
          caption:
            "How ruptures happen: fatigue accumulates invisibly over time, then a normal activity triggers the rupture",
        },
        {
          type: "card",
          title: "The tissue fatigue explanation",
          description: "Why normal activities can cause rupture.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Think of it like a **rope that's been used many times**. Each normal activity (walking, stepping back, light exercise) adds tiny amounts of fatigue to the tendon. Over days and weeks, this fatigue accumulates invisibly — like the **tip of an iceberg**.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Submaximal activities** (normal step-backs, walking) cause fatigue to build up over time",
                "**The rupture happens** during a seemingly normal activity — not a maximal effort like jumping",
                "**It's not your fault** — the tendon was already weakened by accumulated fatigue",
                "**Examples**: Professional athletes like Kevin Durant ruptured during normal step-backs, not during maximal jumps",
              ],
            },
            {
              type: "text",
              content:
                "The Achilles tendon is the strongest tendon in your body, but **tissue fatigue** is the critical factor. This is why ruptures can happen during activities you've done thousands of times before.",
            },
          ],
        },
        {
          type: "text",
          content: "Most people describe the moment of rupture as:",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            'A sudden "pop" or "snap" sound',
            "Feeling like someone kicked or hit the back of your ankle",
            "Immediate difficulty walking",
            'A sensation that something has "given way"',
          ],
        },
        {
          type: "text",
          content:
            "The initial pain from the rupture is often intense but typically subsides quickly — sometimes within minutes. This can be misleading, as the injury is serious even when the pain diminishes. The fact that you could walk (albeit with difficulty) to A&E doesn't mean the injury isn't severe.",
        },
        {
          type: "alert",
          variant: "info",
          title: "Important",
          content:
            '**Partial tears** (where only some of the tendon fibres are torn) can happen, but they\'re **uncommon**. The classic "pop / kicked in the back of the ankle" story is strongly associated with a **full rupture** (where all the fibres are torn). If you felt that distinctive snap, treat it as a rupture until a clinician confirms otherwise.',
        },
        {
          type: "card",
          title: 'If someone mentions a "gap" (e.g. "4 cm gap")',
          description: "What that usually means — in plain English.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                'Clinicians sometimes measure the distance between the torn tendon ends using **ultrasound** (a type of scan that uses sound waves to create images) and describe it as a "gap" (often in centimetres, like **4 cm**). Think of it like a snapped rope: the "gap" is how far apart the two ends are **in that position**.',
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "Gap size can look different depending on **how pointed-down your foot is** during the scan.",
                "What matters clinically is often whether the ends **come together** when your foot is held pointed down in a cast/boot/splint. If they come together, that's a good sign — it means keeping your foot pointed down will help the ends heal together.",
                "Don't panic if you hear a number — it's one piece of the puzzle, and your specialist will interpret it in context.",
              ],
            },
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Is It Definitely a Rupture?",
        },
        {
          type: "text",
          content: "Common signs that suggest an Achilles rupture:",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            'The "pop" or "snap" sensation during activity',
            "Sudden pain at the back of the ankle",
            "Inability to stand on tiptoe on the affected leg",
            "A gap or indent you can feel in the tendon",
            "Significant swelling and bruising (develops over hours)",
            "Difficulty pushing off when walking",
          ],
        },
        {
          type: "text",
          content:
            "If you haven't yet been assessed, get to A&E as soon as possible. The sooner treatment begins, the better your outcome will be.",
        },
      ],
    },
    {
      type: "image",
      src: SnapRuptureExperience,
      alt:
        "The snap rupture experience - what it feels like when your Achilles tendon ruptures",
      caption:
        "Many describe the moment of rupture as feeling like being kicked in the back of the ankle",
    },
    {
      type: "section",
      title: "Emergency Room & Initial Care",
      content: [
        {
          type: "accordion",
          items: [
            {
              title: "What to Expect at A&E",
              content: [
                {
                  type: "text",
                  content:
                    "When you arrive at **A&E** (Accident & Emergency, also called the Emergency Department), here's the typical process:",
                },
                {
                  type: "list",
                  style: "numbered",
                  items: [
                    "**Triage:** You'll be assessed and categorised by urgency. **Triage** means sorting patients by how urgently they need care. An Achilles rupture isn't life-threatening, so you may wait, but you will be seen.",
                    "**Physical Examination:** A doctor will perform the **Simmonds test** (also called the Thompson test). You'll lie face-down, and they'll squeeze your calf muscle. In a healthy tendon, this makes your foot point downward automatically. If your Achilles is ruptured, your foot won't move because the connection between your calf and heel is broken.",
                    "**Immobilisation:** Your foot will be placed in a **\"tip-toe\" position** (clinicians call this **plantarflexion** — meaning your foot points down, like you're standing on tiptoes). This brings the torn tendon ends closer together so they can heal. This is typically done with a **plaster backslab** (a half-cast), a **trauma splint**, or in some cases, a **walking boot** from the start. The key is keeping those ends together — don't let your toes come up.",
                    "**Crutches:** You'll be given **elbow crutches** (also called forearm crutches — these are the type used in the UK, where you support your weight through your forearms and hands, not your armpits). These keep weight off your injured leg. You'll likely be able to walk without crutches from Week 2 onwards, but you'll still need your boot.",
                    "**Referral:** You'll be referred to an **orthopaedic specialist** (a doctor who specialises in bones, joints, and tendons) or **fracture clinic** for further assessment, typically within 1-3 weeks.",
                  ],
                },
              ],
            },
            {
              title: "Pain Management in the First 24-48 Hours",
              content: [
                {
                  type: "text",
                  content:
                    "The good news: Achilles rupture pain typically peaks at the moment of injury and then decreases significantly. Most people find the discomfort manageable within the first day or two.",
                },
                {
                  type: "text",
                  content: "**Pain management options:**",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "**Paracetamol:** This is the British name for the painkiller also known as acetaminophen. It's safe and effective for most people. Follow the dosage instructions on the packet.",
                    "**Ibuprofen or Naproxen:** These are **anti-inflammatories** (medications that reduce inflammation and swelling) that also help with pain. Check with your doctor if you have kidney issues, stomach problems, or are on **blood thinners** (medications that reduce blood clotting).",
                    "**Ice:** Apply for 15-20 minutes every 2-3 hours during the first 48 hours (always with a cloth barrier to protect your skin — never put ice directly on your skin).",
                    "**Elevation:** Keeping your leg raised above heart level reduces swelling and discomfort.",
                  ],
                },
                {
                  type: "alert",
                  variant: "info",
                  content:
                    "If you've had surgery or have a plaster cast, follow the specific pain medication instructions you were given.",
                },
              ],
            },
            {
              title: "Understanding Blood Clots: DVT, PE, and VTE",
              content: [
                {
                  type: "text",
                  content:
                    "When you're immobile (not moving much) after an injury, you're at risk of developing **blood clots**. This is why clinicians talk about **VTE prophylaxis** (preventive treatment). Let's break down what these terms mean:",
                },
                {
                  type: "card",
                  title: "VTE (Venous Thromboembolism)",
                  description: "The umbrella term for blood clots in veins",
                  variant: "default",
                  content: [
                    {
                      type: "text",
                      content:
                        "**VTE** stands for **Venous Thromboembolism**. This is the umbrella term that covers two types of dangerous blood clots:",
                    },
                    {
                      type: "list",
                      style: "bullet",
                      items: [
                        "**DVT** (Deep Vein Thrombosis) — a clot in a deep vein, usually in your leg",
                        "**PE** (Pulmonary Embolism) — a clot that travels to your lungs",
                      ],
                    },
                    {
                      type: "text",
                      content:
                        "When clinicians say **VTE prophylaxis**, they mean preventive treatment to stop these clots from forming. This might include blood thinners (like heparin injections or tablets) or compression stockings.",
                    },
                  ],
                },
                {
                  type: "card",
                  title: "DVT (Deep Vein Thrombosis)",
                  description:
                    "A blood clot in a deep vein, usually in your leg",
                  variant: "default",
                  content: [
                    {
                      type: "text",
                      content:
                        "**DVT** stands for **Deep Vein Thrombosis**. This is a blood clot that forms in a **deep vein** (a vein deep inside your body, not near the surface). After an Achilles rupture, you're at risk of DVT in your injured leg because you're not moving it much.",
                    },
                    {
                      type: "text",
                      content: "**Warning signs of DVT:**",
                    },
                    {
                      type: "list",
                      style: "bullet",
                      items: [
                        "Swelling in one leg (especially if it's worse than expected from your injury)",
                        "Pain or tenderness in your calf or thigh",
                        "Redness or warmth in the affected leg",
                        "Veins that look larger or more prominent than usual",
                      ],
                    },
                  ],
                },
                {
                  type: "card",
                  title: "PE (Pulmonary Embolism)",
                  description: "A blood clot that travels to your lungs",
                  variant: "default",
                  content: [
                    {
                      type: "text",
                      content:
                        "**PE** stands for **Pulmonary Embolism**. This is when a blood clot (often from a DVT in your leg) breaks off and travels through your bloodstream to your lungs, where it blocks blood flow. This is a **medical emergency**.",
                    },
                    {
                      type: "text",
                      content:
                        "**Warning signs of PE (seek urgent medical help immediately):**",
                    },
                    {
                      type: "list",
                      style: "bullet",
                      items: [
                        "Sudden breathlessness or difficulty breathing",
                        "Chest pain (especially when breathing in)",
                        "Coughing up blood",
                        "Rapid heartbeat",
                        "Feeling dizzy or fainting",
                      ],
                    },
                    {
                      type: "alert",
                      variant: "danger",
                      title: "Emergency",
                      content:
                        "If you experience signs of PE, call 999 immediately or go to A&E straight away. This is life-threatening.",
                    },
                  ],
                },
                {
                  type: "text",
                  content:
                    "**The connection:** A DVT in your leg can break off and travel to your lungs, becoming a PE. That's why preventing DVT (through VTE prophylaxis) is so important. Your clinician will assess your risk and may prescribe blood thinners or compression stockings.",
                },
              ],
            },
            {
              title: "The Trauma Splint or Plaster Cast",
              content: [
                {
                  type: "text",
                  content:
                    "Your foot needs to be held in a **pointed-down position** (clinicians call this **equinus** or **plantarflexion**). This brings the torn tendon ends closer together so they can heal. This is non-negotiable in the first weeks. **Remember: don't let your toes come up.**",
                },
                {
                  type: "heading",
                  level: 4,
                  text: "Plaster Backslab:",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "A **half-cast** that wraps around the back of your leg",
                    "Cannot be removed by you",
                    "Must be kept completely dry",
                    "Will be replaced by a walking boot at your specialist appointment",
                  ],
                },
                {
                  type: "heading",
                  level: 4,
                  text: "Trauma Splint:",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "A removable splint that holds your foot in the correct position",
                    "Lighter than plaster",
                    "May allow for earlier boot fitting",
                    "Still must be worn 24/7 unless instructed otherwise — this keeps the ends together",
                  ],
                },
                {
                  type: "heading",
                  level: 4,
                  text: "Walking Boot (if provided immediately):",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "Some hospitals fit a boot with **wedges** (foam inserts that hold your foot at the correct angle) straight away",
                    "Must be worn 24/7 including during sleep — this keeps the ends together",
                    "The wedges hold your foot at the correct pointed-down angle",
                  ],
                },
              ],
            },
            {
              title: "Getting Your Elbow Crutches and Learning to Use Them",
              content: [
                {
                  type: "text",
                  content:
                    "**Elbow crutches** (also called **forearm crutches**) are the standard type used in the UK. These are different from underarm crutches — you support your weight through your **forearms** (the part of your arm between your elbow and wrist) and hands, not your armpits. Crutches are essential in Week 1. Your injured leg should bear minimal or no weight initially. **You'll likely be able to walk without crutches from Week 2 onwards**, but you'll still need your boot to keep the tendon ends together.",
                },
                {
                  type: "text",
                  content: "**How to use elbow crutches:**",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "Adjust the height so the **handgrip** (the part you hold) is at wrist level when you're standing upright with your arms relaxed at your sides",
                    "The **cuff** (the part that goes around your forearm) should sit comfortably below your elbow",
                    "Your elbows should be slightly bent when holding the grips",
                    "Take your weight through your hands and forearms, not your armpits (these are elbow crutches, not underarm crutches)",
                    "Move both crutches forward together with your injured leg, then step through with your good leg",
                    "Go slowly — falling now would be a disaster and could pull the tendon ends apart",
                    "When going up stairs: good leg first, then crutches and injured leg together",
                    "When going down stairs: crutches and injured leg first, then good leg",
                  ],
                },
                {
                  type: "tip",
                  title: "Pro tip",
                  content:
                    "Keep a pair of crutches by your bed so you can safely get up during the night. Remember: even when using crutches, your boot must stay on to keep the tendon ends together.",
                },
              ],
            },
          ],
        },
        {
          type: "card",
          title: "What happens next?",
          description: "A simple timeline so you know what's coming.",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Today–Week 1:** Keep the tendon ends together (don't let your toes come up), control swelling, learn to use elbow crutches.",
                "**Week 2 onwards:** You'll likely be able to walk without crutches, but you'll still need your boot to keep the ends together.",
                "**Weeks 1–3:** You'll see a specialist / fracture clinic to confirm the plan (boot vs splint, weight-bearing guidance, rehab plan).",
                "**Weeks 1–3:** You'll also start thinking about the big decision: surgical vs non-surgical treatment (we cover this in the next phase).",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Questions to Ask at A&E / Fracture Clinic",
      description:
        "Write these down on your phone and bring them to your appointment.",
      variant: "default",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            '**Diagnosis:** "Is this a confirmed rupture? Do I need an ultrasound scan?"',
            '**Gap size:** "If you measured a gap (e.g. 4 cm), does it close when my foot is pointed down? What does that mean for keeping the ends together?"',
            '**Position:** "What ankle angle should I be in (how pointed-down) and for how long? How do I make sure I don\'t let my toes come up?"',
            '**Weight-bearing:** "Am I non-weight-bearing, partial, or weight-bearing as tolerated? When can I walk without crutches?"',
            '**Clot prevention:** "Am I getting VTE prophylaxis? What does that mean? For how long? What symptoms of DVT or PE should trigger urgent help?"',
            '**Follow-up:** "When is my fracture clinic/orthopaedics appointment, and who do I contact if it hasn\'t been booked?"',
            '**After-hours:** "What should I do if I can\'t reach you after hours?"',
            '**Hygiene:** "Can I remove anything to wash/shower, or should I use a waterproof cover only? How do I keep the ends together while washing?"',
            '**Work note:** "Can you provide a fit note (also called a sick note) today?"',
          ],
        },
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "Remember: The Golden Rule",
      content:
        "Think of recovery like a game of **snakes and ladders**. Keeping the tendon ends together (by keeping your foot pointed down) moves you forward — that's a ladder. Letting your toes come up pulls the ends apart and sets you back — that's a snake. **The #1 rule: don't let your toes come up.**",
    },
  ],
};
