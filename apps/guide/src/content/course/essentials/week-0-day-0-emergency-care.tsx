import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "week-0-day-0-emergency-care",
  title: "Emergency Care & Initial Assessment",
  description: "What just happened, A&E expectations, and immediate first steps",
  week: 0,
  day: 0,
  section_number: 1,
};

export const content: SectionContent = {
  intro:
    "If you're reading this, you've likely just experienced one of the most distinctive injuries in medicine — a ruptured Achilles tendon. That unmistakable \"pop\" or \"snap\" followed by difficulty walking has brought you here. This guide will walk you through everything you need to know about your first steps.",

  blocks: [
    {
      type: "dos-donts",
      dos: [
        "**Protect the tendon 24/7:** Keep your foot in the pointed-down position your clinician set (cast/splint/boot)",
        "**Assume you're non-weight-bearing unless told otherwise:** Use crutches and move slowly",
        "**Elevate** your ankle above heart level as much as possible",
        "**Know the clot red flags** (DVT/PE) and seek urgent care if they appear",
        "**Arrange follow-up** (fracture clinic/orthopaedics) if it hasn't been booked",
      ],
      donts: [
        "**Don't stretch** your Achilles / calf",
        "**Don't walk barefoot** or \"test it\" without protection",
        "**Don't remove the cast/splint/boot** unless your team explicitly told you it's safe",
        "**Don't ignore** new calf pain, chest pain, breathlessness, or one-leg swelling",
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
          type: "heading",
          level: 3,
          text: "The \"Snap\" — Why It Happened and What It Means",
        },
        {
          type: "text",
          content: "Most people describe the moment of rupture as:",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "A sudden \"pop\" or \"snap\" sound",
            "Feeling like someone kicked or hit the back of your ankle",
            "Immediate difficulty walking",
            "A sensation that something has \"given way\"",
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
            "Partial tears can happen, but the classic \"pop / kicked in the back of the ankle\" story is strongly associated with a rupture. If you felt that distinctive snap, treat it as a rupture until a clinician confirms otherwise.",
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
            "The \"pop\" or \"snap\" sensation during activity",
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
                  content: "When you arrive at A&E, here's the typical process:",
                },
                {
                  type: "list",
                  style: "numbered",
                  items: [
                    "**Triage:** You'll be assessed and categorised by urgency. An Achilles rupture isn't life-threatening, so you may wait, but you will be seen.",
                    "**Physical Examination:** A doctor will perform the Thompson test (also called the Simmonds test) — they'll squeeze your calf while you lie face-down. In a healthy tendon, this makes your foot point downward. If your Achilles is ruptured, your foot won't move.",
                    "**Immobilisation:** Your foot will be placed in a \"tip-toe\" position (plantarflexion) to bring the torn tendon ends closer together. This is typically done with a plaster backslab, a trauma splint, or in some cases, a walking boot from the start.",
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
                    "Your foot needs to be held in a pointed position (equinus) to allow the torn tendon ends to heal back together. This is non-negotiable in the first weeks.",
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
      ],
    },
    {
      type: "card",
      title: "Questions to Ask at A&E / Fracture Clinic",
      description: "Write these down on your phone and bring them to your appointment.",
      variant: "default",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Diagnosis:** \"Is this a confirmed rupture? Do I need ultrasound?\"",
            "**Position:** \"What ankle angle should I be in (how pointed-down) and for how long?\"",
            "**Weight-bearing:** \"Am I non-weight-bearing, partial, or weight-bearing as tolerated?\"",
            "**Clot prevention:** \"Am I getting VTE prophylaxis? For how long? What symptoms should trigger urgent help?\"",
            "**Follow-up:** \"When is my fracture clinic/orthopaedics appointment, and who do I contact if it hasn't been booked?\"",
            "**Hygiene:** \"Can I remove anything to wash/shower, or should I use a waterproof cover only?\"",
            "**Work note:** \"Can you provide a fit note/sick note today?\"",
          ],
        },
      ],
    },
  ],
};
