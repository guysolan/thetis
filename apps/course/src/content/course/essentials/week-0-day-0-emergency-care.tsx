import type { SectionContent } from "@/components/course/types";
import SnapRuptureExperience from "../../../assets/snap-rupture-experience.jpeg";
import AchillesRopeEndsPointedDown from "../../../assets/achilles-rope-ends-pointed-down.png";

export const metadata = {
  slug: "week-0-day-0-emergency-care",
  title: "Emergency Care & Initial Assessment",
  description:
    "What just happened, A&E expectations, and immediate first steps",
  week: 0,
  day: 0,
  section_number: 1,
};

export const content: SectionContent = {
  intro:
    'If you\'re reading this, you\'ve likely just experienced one of the most distinctive injuries in medicine — a ruptured Achilles tendon. That unmistakable "pop" or "snap" followed by difficulty walking has brought you here. **You will get through this.** Millions of people have recovered fully — this guide shows you how, step by step.',

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
        "**Go to A&E/ER or urgent care today** for assessment and immobilisation. The first priority is to **protect the tendon** (foot held pointed-down) and get you a plan for follow-up care.",
    },
    {
      type: "dos-donts",
      dos: [
        "**Protect the tendon 24/7:** Keep your foot in the **pointed-down** position your clinician set (cast/splint/boot).",
        "**Assume you're non-weight-bearing unless told otherwise:** Use crutches and move slowly.",
        "**Elevate** your ankle above heart level as much as possible.",
        "**Know the blood clot red flags** and seek urgent care if they appear (**DVT = clot in the leg**, **PE = clot in the lungs**).",
        "**Arrange follow-up** (fracture clinic/orthopaedics) if it hasn't been booked.",
      ],
      donts: [
        "**Don't stretch** your Achilles / calf.",
        '**Don\'t walk barefoot** or "test it" without protection.',
        "**Don't remove the cast/splint/boot** unless your team explicitly told you it's safe.",
        "**Don't ignore** new calf pain, chest pain, breathlessness, or one-leg swelling.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Safety Note",
      content:
        "Protocols vary by country/hospital. Use this guide to understand what's typical, but follow your clinician's instructions if they differ.",
    },
    {
      type: "tip",
      title: "Recovery timeline (the short version)",
      content:
        "Full recovery typically takes **6–12 months**, but you'll be walking without crutches much sooner (often by weeks 6–10). We'll break this down week by week — don't try to skip ahead.",
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
            "The Achilles tendon is the largest and strongest tendon in your body, connecting your calf muscle to your heel bone. When it ruptures, the tendon fibres tear — think of it like a rope that has frayed and snapped. This disconnects your powerful calf muscle from your heel, which is why you suddenly can't push off the ground properly or stand on your tiptoes.",
        },
        {
          type: "tip",
          title: "Simple way to picture healing",
          content:
            "In the early weeks, your job is to keep the two torn ends of the “rope” **lined up and close together**. Stretching or walking without protection is like pulling the rope ends apart — it makes healing slower and riskier.",
        },
        {
          type: "image",
          src: AchillesRopeEndsPointedDown,
          alt:
            "Simple diagram showing a snapped rope (Achilles) and how a pointed-down foot brings the rope ends closer together",
          caption:
            "Why pointed-down matters: keeping the tendon ends close together helps healing",
        },
        {
          type: "heading",
          level: 3,
          text: 'The "Snap" — Why It Happened and What It Means',
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
            'Partial tears can happen (they’re **uncommon**), but the classic "pop / kicked in the back of the ankle" story is strongly associated with a full rupture. If you felt that distinctive snap, treat it as a rupture until a clinician confirms otherwise.',
        },
        {
          type: "card",
          title: "If someone mentions a “gap” (e.g. “4 cm gap”)",
          description: "What that usually means — in plain English.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Clinicians sometimes measure the distance between the torn tendon ends on **ultrasound** and describe it as a “gap” (often in centimetres, like **4 cm**). Think of it like a snapped rope: the “gap” is how far apart the two ends are **in that position**.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "Gap size can look different depending on **how pointed-down your foot is** during the scan.",
                "What matters clinically is often whether the ends **come together** when your foot is held pointed down in a cast/boot/splint.",
                "Don’t panic if you hear a number — it’s one piece of the puzzle, and your specialist will interpret it in context.",
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
            "If you haven't yet been assessed, get to A&E or an urgent care centre as soon as possible. The sooner treatment begins, the better your outcome will be.",
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
              title: "What to Expect at A&E/ER",
              content: [
                {
                  type: "text",
                  content:
                    "When you arrive at A&E, here's the typical process:",
                },
                {
                  type: "list",
                  style: "numbered",
                  items: [
                    "**Triage:** You'll be assessed and categorised by urgency. An Achilles rupture isn't life-threatening, so you may wait, but you will be seen.",
                    "**Physical Examination:** A doctor will perform the Thompson test (also called the Simmonds test) — they'll squeeze your calf while you lie face-down. In a healthy tendon, this makes your foot point downward. If your Achilles is ruptured, your foot won't move.",
                    '**Immobilisation:** Your foot will be placed in a "tip-toe" position (plantarflexion) to bring the torn tendon ends closer together. This is typically done with a plaster backslab, a trauma splint, or in some cases, a walking boot from the start.',
                    "**Crutches:** You'll be given crutches to keep weight off your injured leg.",
                    "**Referral:** You'll be referred to an orthopaedic specialist or fracture clinic for further assessment, typically within 1-3 weeks.",
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
                    "**Paracetamol:** Safe and effective for most people",
                    "**Ibuprofen or Naproxen:** Anti-inflammatories that also help with swelling (check with your doctor if you have kidney issues, stomach problems, or are on blood thinners)",
                    "**Ice:** Apply for 15-20 minutes every 2-3 hours during the first 48 hours (always with a cloth barrier to protect your skin)",
                    "**Elevation:** Keeping your leg raised reduces swelling and discomfort",
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
              title: "The Trauma Splint or Plaster Cast",
              content: [
                {
                  type: "text",
                  content:
                    "Your foot needs to be held in a **pointed-down position** (sometimes clinicians call this *equinus*). This brings the torn ends closer together so they can heal. This is non-negotiable in the first weeks.",
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
                    "A half-cast that wraps around the back of your leg",
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
                    "Still must be worn 24/7 unless instructed otherwise",
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
                    "Some hospitals fit a boot with wedges straight away",
                    "Must be worn 24/7 including during sleep",
                    "The wedges hold your foot at the correct angle",
                  ],
                },
              ],
            },
            {
              title: "Getting Your Crutches and Learning to Use Them",
              content: [
                {
                  type: "text",
                  content:
                    "Crutches are essential in Week 1. Your injured leg should bear minimal or no weight initially.",
                },
                {
                  type: "text",
                  content: "**Crutch tips:**",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "Adjust them so the top sits about 2 inches below your armpit",
                    "Your elbows should be slightly bent when holding the grips",
                    "Take your weight through your hands, not your armpits",
                    "Move crutches and injured leg together, then step through with your good leg",
                    "Go slowly — falling now would be a disaster",
                  ],
                },
                {
                  type: "tip",
                  title: "Pro tip",
                  content:
                    "Keep a pair of crutches by your bed so you can safely get up during the night.",
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
                "**Today–Week 1:** Protect the tendon, control swelling, learn crutches.",
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
            '**Diagnosis:** "Is this a confirmed rupture? Do I need ultrasound?"',
            '**Gap size:** "If you measured a gap (e.g. 4 cm), does it close when my foot is pointed down? What does that mean for my plan?"',
            '**Position:** "What ankle angle should I be in (how pointed-down) and for how long?"',
            '**Weight-bearing:** "Am I non-weight-bearing, partial, or weight-bearing as tolerated?"',
            '**Clot prevention:** "Am I getting VTE prophylaxis? For how long? What symptoms should trigger urgent help?"',
            '**Follow-up:** "When is my fracture clinic/orthopaedics appointment, and who do I contact if it hasn\'t been booked?"',
            '**After-hours:** "What should I do if I can\'t reach you after hours?"',
            '**Hygiene:** "Can I remove anything to wash/shower, or should I use a waterproof cover only?"',
            '**Work note:** "Can you provide a fit note/sick note today?"',
          ],
        },
      ],
    },
  ],
};
