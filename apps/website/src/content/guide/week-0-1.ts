import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-0-1",
  title: "Week 1: Emergency Care & First Steps",
  description: "Complete guide to your first week after an Achilles tendon rupture. Learn what to expect at A&E, blood clot prevention, pain management, and essential survival tips.",
  phase: "week-0-1",
  weekRange: "Week 0-1",
  highlights: [
    "What to expect at A&E",
    "Blood clot prevention",
    "Setting up your recovery station",
    "Essential purchases"
  ]
};

export const content: GuideContent = {
  intro: "If you're reading this, you've likely just experienced one of the most distinctive injuries in medicine - a ruptured Achilles tendon. That unmistakable \"pop\" or \"snap\" followed by difficulty walking has brought you here. This guide will walk you through everything you need to know about your first week of recovery.",

  blocks: [
    // Quick Action Plan
    {
      type: "heading",
      level: 2,
      text: "Quick Action Plan (First 24 Hours)"
    },
    {
      type: "text",
      content: "If you only read one section, read this."
    },
    {
      type: "dos-donts",
      dos: [
        "**Protect the tendon 24/7** - keep your foot in the **pointed-down** position your clinician set (cast/splint/boot)",
        "**Assume you're non-weight-bearing unless told otherwise** - use crutches and move slowly",
        "**Elevate** your ankle above heart level as much as possible",
        "**Know the clot red flags** (DVT/PE) and seek urgent care if they appear",
        "**Arrange follow-up** (fracture clinic/orthopaedics) if it hasn't been booked"
      ],
      donts: [
        "**Don't stretch** your Achilles or calf",
        "**Don't walk barefoot** or \"test it\" without protection",
        "**Don't remove the cast/splint/boot** unless your team explicitly told you it's safe",
        "**Don't ignore** new calf pain, chest pain, breathlessness, or one-leg swelling"
      ]
    },
    {
      type: "alert",
      variant: "info",
      title: "Safety Note",
      content: "Protocols vary by country and hospital. Use this guide to understand what's typical, but follow your clinician's instructions if they differ."
    },

    // Understanding Your Injury
    {
      type: "heading",
      level: 2,
      text: "Understanding Your Injury"
    },
    {
      type: "heading",
      level: 3,
      text: "What Just Happened to Your Achilles Tendon"
    },
    {
      type: "text",
      content: "The Achilles tendon is the largest and strongest tendon in your body, connecting your calf muscle to your heel bone. When it ruptures, the tendon fibres tear - think of it like a rope that has frayed and snapped. This disconnects your powerful calf muscle from your heel, which is why you suddenly can't push off the ground properly or stand on your tiptoes."
    },

    {
      type: "heading",
      level: 3,
      text: "The \"Snap\" - Why It Happened and What It Means"
    },
    {
      type: "text",
      content: "Most people describe the moment of rupture as:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "A sudden **\"pop\" or \"snap\"** sound",
        "Feeling like someone **kicked or hit** the back of your ankle",
        "**Immediate difficulty walking**",
        "A sensation that something has **\"given way\"**"
      ]
    },
    {
      type: "text",
      content: "The initial pain from the rupture is often intense but typically subsides quickly - sometimes within minutes. This can be misleading, as the injury is serious even when the pain diminishes. The fact that you could walk (albeit with difficulty) to A&E doesn't mean the injury isn't severe."
    },
    {
      type: "alert",
      variant: "warning",
      title: "Important",
      content: "Partial ruptures/tears can happen (they're **uncommon**), but the classic \"pop / kicked in the back of the ankle\" story is strongly associated with a full rupture. If you felt that distinctive snap, treat it as a rupture until a clinician confirms otherwise."
    },

    {
      type: "tip",
      title: "If You Hear \"Gap Size\" (e.g. \"4cm gap\")",
      content: "Clinicians sometimes measure the distance between the torn tendon ends on **ultrasound**. Think of it like a snapped rope — the \"gap\" is how far apart the ends are **in that position**. What often matters most is whether the ends **come together** when the foot is held pointed down in a cast/boot/splint. Don't panic if you hear a number — it's one piece of the puzzle your specialist will interpret in context."
    },

    {
      type: "heading",
      level: 3,
      text: "Is It Definitely a Rupture?"
    },
    {
      type: "text",
      content: "Common signs that suggest an Achilles rupture:"
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
        "Difficulty pushing off when walking"
      ]
    },
    {
      type: "text",
      content: "If you haven't yet been assessed, get to A&E or an urgent care centre as soon as possible. The sooner treatment begins, the better your outcome will be."
    },

    // Emergency Room Section
    {
      type: "heading",
      level: 2,
      text: "Emergency Room & Initial Care"
    },
    {
      type: "heading",
      level: 3,
      text: "What to Expect at A&E/ER"
    },
    {
      type: "text",
      content: "When you arrive at A&E, here's the typical process:"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Triage:** You'll be assessed and categorised by urgency. An Achilles rupture isn't life-threatening, so you may wait, but you will be seen.",
        "**Physical Examination:** A doctor will perform the Thompson test (also called the Simmonds test) - they'll squeeze your calf while you lie face-down. In a healthy tendon, this makes your foot point downward. If your Achilles is ruptured, your foot won't move.",
        "**Immobilisation:** Your foot will be placed in a \"tip-toe\" position (plantarflexion) to bring the torn tendon ends closer together. This is typically done with a plaster backslab (half-cast), a trauma splint, or in some cases, a walking boot from the start.",
        "**Crutches:** You'll be given crutches to keep weight off your injured leg.",
        "**Referral:** You'll be referred to an orthopaedic specialist or fracture clinic for further assessment, typically within 1-3 weeks."
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Pain Management in the First 24-48 Hours"
    },
    {
      type: "text",
      content: "The good news: Achilles rupture pain typically peaks at the moment of injury and then decreases significantly. Most people find the discomfort manageable within the first day or two."
    },
    {
      type: "card",
      title: "Pain Management Options",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Paracetamol:** Safe and effective for most people",
            "**Ibuprofen or Naproxen:** Anti-inflammatories that also help with swelling (check with your doctor if you have kidney issues, stomach problems, or are on blood thinners)",
            "**Ice:** Apply for 15-20 minutes every 2-3 hours during the first 48 hours (always with a cloth barrier to protect your skin)",
            "**Elevation:** Keeping your leg raised reduces swelling and discomfort"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "info",
      content: "If you've had surgery or have a plaster cast, follow the specific pain medication instructions you were given."
    },

    {
      type: "heading",
      level: 3,
      text: "The Trauma Splint or Plaster Cast"
    },
    {
      type: "text",
      content: "Your foot needs to be held in a pointed position (equinus) to allow the torn tendon ends to heal back together. This is non-negotiable in the first weeks."
    },
    {
      type: "card",
      title: "Plaster Backslab",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "A half-cast that wraps around the back of your leg",
            "Cannot be removed by you",
            "Must be kept completely dry",
            "Will be replaced by a walking boot at your specialist appointment"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Trauma Splint",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "A removable splint that holds your foot in the correct position",
            "Lighter than plaster",
            "May allow for earlier boot fitting",
            "Still must be worn 24/7 unless instructed otherwise"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Walking Boot (if provided immediately)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Some hospitals fit a boot with wedges straight away",
            "Must be worn 24/7 including during sleep",
            "The wedges hold your foot at the correct angle"
          ]
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Getting Your Crutches and Learning to Use Them"
    },
    {
      type: "text",
      content: "Crutches are essential in Week 1. Your injured leg should bear minimal or no weight initially."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Adjust them so the top sits about 2 inches below your armpit",
        "Your elbows should be slightly bent when holding the grips",
        "Take your weight through your hands, not your armpits",
        "Move crutches and injured leg together, then step through with your good leg",
        "Go slowly - falling now would be a disaster"
      ]
    },
    {
      type: "tip",
      title: "Top Tip",
      content: "Lean your crutches **upside-down** (with the rubber grips on the floor) against the wall when not in use. The rubber handles provide much more friction than the plastic feet, preventing them from sliding and crashing to the floor."
    },
    {
      type: "text",
      content: "**Pro tip:** Keep a pair of crutches by your bed so you can safely get up during the night."
    },

    // Blood Clot Prevention
    {
      type: "heading",
      level: 2,
      text: "Blood Clot Prevention - A Critical Concern"
    },
    {
      type: "heading",
      level: 3,
      text: "Why Clot Risk is Higher After an Achilles Rupture"
    },
    {
      type: "text",
      content: "This is one of the most important sections of this guide. Achilles tendon rupture carries a significantly higher risk of blood clots (venous thromboembolism or VTE) compared to other injuries."
    },
    {
      type: "alert",
      variant: "danger",
      title: "The Statistics Are Stark",
      content: "A large multi-centre UK audit found **~3.7% symptomatic VTE** after Achilles rupture, versus **~0.57%** after other foot/ankle surgery (about **6.5× higher**). Studies that actively screen often find higher rates of (often symptomless) clots."
    },
    {
      type: "text",
      content: "**Why is the risk so high?**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Immobilisation reduces blood flow in your leg",
        "The injury itself causes inflammation near the deep veins",
        "You're less mobile overall",
        "The calf muscle pump that normally helps move blood isn't working effectively"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Blood Thinners: Injections vs Tablets"
    },
    {
      type: "text",
      content: "Your doctor will likely prescribe blood-thinning medication (thromboprophylaxis) to reduce your clot risk."
    },
    {
      type: "card",
      title: "Daily Injections (e.g., Enoxaparin/Clexane)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "The traditional approach",
            "Self-injected into your stomach area",
            "Effective but inconvenient for the 6+ weeks of immobilisation",
            "Can cause bruising at injection sites"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Oral Tablets (e.g., Rivaroxaban/Apixaban)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Newer approach gaining popularity",
            "Once-daily tablet - much more convenient",
            "Whether tablets are appropriate depends on your personal risk/bleeding profile and local protocol"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Talk to your medical team** about which option is best for you. The key is that you take *something* - the risk is too high to ignore."
    },

    {
      type: "heading",
      level: 3,
      text: "Warning Signs to Watch For"
    },
    {
      type: "text",
      content: "Learn to recognise the symptoms of a blood clot. Seek immediate medical attention if you experience:"
    },
    {
      type: "card",
      title: "Deep Vein Thrombosis (DVT) - Clot in the Leg",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Pain or tenderness in the calf or thigh (beyond normal injury pain)",
            "Swelling in the leg, ankle, or foot (more than expected)",
            "Redness or warmth in the affected area",
            "Leg feeling unusually heavy"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Pulmonary Embolism (PE) - Clot in the Lungs - EMERGENCY",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Sudden shortness of breath",
            "Chest pain (especially when breathing deeply)",
            "Coughing up blood",
            "Rapid or irregular heartbeat",
            "Feeling faint or lightheaded"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "danger",
      content: "These PE symptoms require URGENT medical attention. Call 999 or go to A&E immediately."
    },

    // What's Normal
    {
      type: "heading",
      level: 2,
      text: "What's Normal This Week (And What Needs Urgent Help)"
    },
    {
      type: "text",
      content: "The hardest part of Week 1 is not knowing what's \"normal\". Use this as a quick filter."
    },
    {
      type: "card",
      title: "Usually Normal in Week 0-1",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Pain that's worst at the moment of injury, then settles over hours/days",
            "Swelling/bruising that increases over the first 24-72 hours",
            "Warmth around the ankle (mild) and a heavy/tired feeling from immobility",
            "Disrupted sleep from the cast/splint/boot",
            "\"Weird\" sensations (tightness, tingling that improves when you change position)"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Get Urgent Help Now (Same Day / Emergency)",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**New** calf pain/tenderness, **one-leg swelling**, redness/warmth in the calf (possible DVT)",
            "Chest pain, breathlessness, coughing blood, fainting (possible PE)",
            "Numb foot/toes, blue/pale toes, or severe increasing pain (circulation/pressure problem)",
            "Fever, rapidly spreading redness, or discharge (possible infection)",
            "A fall with a new \"pop\", sudden loss of function, or sudden severe pain"
          ]
        }
      ]
    },

    // Practical Survival Tips
    {
      type: "heading",
      level: 2,
      text: "Practical Survival Tips for Week 1"
    },
    {
      type: "heading",
      level: 3,
      text: "Setting Up Your Recovery Station at Home"
    },
    {
      type: "text",
      content: "Before you leave the hospital (or as soon as you get home), think about creating a recovery base. Ideally on the ground floor if you have stairs."
    },
    {
      type: "checklist",
      title: "Essential Setup",
      items: [
        { text: "A comfortable chair or sofa with space to elevate your leg", checked: false },
        { text: "Pillows or a wedge to elevate your foot above heart level", checked: false },
        { text: "Side table within arm's reach for: water bottle, medications, phone and charger, remote controls, snacks", checked: false },
        { text: "Crutches positioned for easy access", checked: false },
        { text: "Clear pathways to the bathroom", checked: false }
      ]
    },
    {
      type: "checklist",
      title: "Bathroom Considerations",
      items: [
        { text: "Move essential toiletries to an accessible height", checked: false },
        { text: "Consider a shower stool or chair", checked: false },
        { text: "Non-slip mat inside the shower/bath", checked: false },
        { text: "Handheld shower head if possible", checked: false }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Elevation - Why 23 Hours/Day Matters Initially"
    },
    {
      type: "text",
      content: "In the first week, elevation is critical. Some protocols recommend keeping your ankle above heart level for up to 23 hours per day initially, then 12 hours per day in week two."
    },
    {
      type: "text",
      content: "**Why elevation matters:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Reduces swelling significantly",
        "Improves blood flow to the healing area",
        "Decreases pain and discomfort",
        "Helps deliver nutrients for healing"
      ]
    },
    {
      type: "text",
      content: "**How to elevate properly:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your ankle should be above the level of your heart",
        "Simply putting your foot on a coffee table isn't enough",
        "Lie down with pillows under your calf and ankle",
        "Or use a specialised leg elevation wedge"
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**Propping your foot on a stool while sitting upright doesn't count as proper elevation** - you need to be reclined with your foot genuinely higher than your chest."
    },

    {
      type: "heading",
      level: 3,
      text: "The Ice Protocol"
    },
    {
      type: "text",
      content: "Ice helps reduce swelling and can provide pain relief in the first few days."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Apply ice for 20-30 minutes on, then 30 minutes off",
        "Always use a towel or cloth between the ice and your skin",
        "Focus on the first 3-4 days post-injury",
        "Don't ice directly over a plaster cast (it won't penetrate anyway)",
        "If you have a removable splint, you can ice the ankle area"
      ]
    },
    {
      type: "text",
      content: "**Note:** After the first few days, ice becomes less important. Focus on elevation and rest."
    },

    {
      type: "heading",
      level: 3,
      text: "Sleeping in Week 1 (Spoiler: It's Hard)"
    },
    {
      type: "text",
      content: "Let's be honest - sleeping with a leg in a cast or splint is challenging. Your foot must remain protected 24/7, which means wearing your immobilisation device to bed."
    },
    {
      type: "text",
      content: "**Common sleep challenges:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The cast/splint/boot is heavy and uncomfortable",
        "You can't move freely",
        "Your foot may feel hot and sweaty",
        "Finding a comfortable position is difficult",
        "You may need to get up to use the bathroom"
      ]
    },
    {
      type: "text",
      content: "**Tips for better sleep:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Use extra pillows to support your leg in a comfortable position",
        "Keep your injured leg elevated even while sleeping (pillow under the calf)",
        "Wear loose, comfortable clothing",
        "Keep the room cool to compensate for the warm cast/boot",
        "Keep crutches right next to your bed",
        "Use a nightlight so you can see if you need to get up",
        "Consider sleeping slightly propped up rather than flat"
      ]
    },
    {
      type: "tip",
      title: "For Boot Wearers",
      content: "Many patients find sleeping in a walking boot extremely uncomfortable. Later in your recovery (typically from week 2-4 onwards, with specialist approval), you may be able to use a night splint designed specifically for Achilles rupture. This is lighter and more comfortable than a boot while still protecting your tendon."
    },

    // Questions to Ask
    {
      type: "heading",
      level: 2,
      text: "Questions to Ask at A&E / Fracture Clinic"
    },
    {
      type: "text",
      content: "If you can, write these down on your phone and bring them to your appointment."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Diagnosis**: \"Is this a confirmed rupture? Do I need ultrasound?\"",
        "**Position**: \"What ankle angle should I be in (how pointed-down) and for how long?\"",
        "**Weight-bearing**: \"Am I non-weight-bearing, partial, or weight-bearing as tolerated?\"",
        "**Clot prevention**: \"Am I getting VTE prophylaxis? For how long? What symptoms should trigger urgent help?\"",
        "**Follow-up**: \"When is my fracture clinic/orthopaedics appointment, and who do I contact if it hasn't been booked?\"",
        "**Hygiene**: \"Can I remove anything to wash/shower, or should I use a waterproof cover only?\"",
        "**Work note**: \"Can you provide a fit note/sick note today?\""
      ]
    },

    // Essential Purchases
    {
      type: "heading",
      level: 2,
      text: "Essential Purchases for Week 1"
    },
    {
      type: "text",
      content: "Here are the items that will make your first week significantly more manageable."
    },
    {
      type: "heading",
      level: 3,
      text: "Usually Provided by the Hospital"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Crutches",
        "Initial immobilisation (cast, splint, or boot)",
        "Blood thinning medication prescription"
      ]
    },
    {
      type: "heading",
      level: 3,
      text: "Worth Purchasing"
    },
    {
      type: "table",
      headers: ["Item", "Why You Need It"],
      rows: [
        ["**Waterproof Cast/Boot Cover**", "Essential for showering safely"],
        ["**Leg Elevation Wedge/Pillow**", "Much better than stacking regular pillows"],
        ["**Ergonomic Crutch Handle Covers**", "Your hands will thank you (not essential in week 1 but helpful)"]
      ]
    },
    {
      type: "heading",
      level: 3,
      text: "For Later (But Worth Ordering Now)"
    },
    {
      type: "table",
      headers: ["Item", "Why You Need It"],
      rows: [
        ["**Night Splint**", "For sleeping without the boot (typically from week 2-4)"],
        ["**Shoe Leveler (EVENup)**", "Prevents back pain when walking in a boot"]
      ]
    },

    // What's Coming Next
    {
      type: "heading",
      level: 2,
      text: "What's Coming Next - Preparing for Weeks 1-3"
    },
    {
      type: "heading",
      level: 3,
      text: "Specialist Appointment Timeline"
    },
    {
      type: "text",
      content: "In the UK NHS system, you'll typically be seen by a specialist within 1-3 weeks. In some areas with dedicated pathways (like hospitals using the Thetis Trauma Splint), this can be under a week."
    },
    {
      type: "text",
      content: "At your specialist appointment, expect:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "A detailed physical examination",
        "Possibly an ultrasound scan to assess the tendon",
        "A discussion about treatment options (surgery vs non-surgical)",
        "Fitting of a walking boot if you don't have one already",
        "A rehabilitation plan"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Treatment Decision Upcoming"
    },
    {
      type: "text",
      content: "The big question you'll face in weeks 1-3 is: surgery or no surgery?"
    },
    {
      type: "alert",
      variant: "success",
      title: "The Good News",
      content: "Modern research (including the landmark UKSTAR trial) shows that non-surgical treatment with early weight-bearing in a boot produces outcomes comparable to surgery for most people, with fewer complications."
    },
    {
      type: "text",
      content: "**Surgery may be considered if:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "There's a significant gap between the tendon ends (seen on ultrasound)",
        "You're a high-level athlete with specific demands",
        "You have other factors that make non-surgical treatment less suitable"
      ]
    },
    {
      type: "text",
      content: "**Non-surgical treatment involves:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Wearing a walking boot with wedges for approximately 10 weeks",
        "Gradual reduction in the foot angle over time",
        "Physiotherapy starting around weeks 9-12",
        "Full recovery taking 6-12 months"
      ]
    },
    {
      type: "text",
      content: "Don't worry about making this decision now. Focus on surviving Week 1, and you'll discuss options with your specialist soon."
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Week 1"
    },
    {
      type: "faq",
      items: [
        {
          question: "How long will I be off work?",
          answer: "This depends on your job. Desk workers may return within 1-2 weeks if they can work from home or have minimal mobility requirements. Physical jobs may require 10-12 weeks or more off. Discuss with your employer and medical team."
        },
        {
          question: "Can I drive?",
          answer: "No, not in Week 1. If your **right** leg is injured, you cannot drive until you're out of the boot and have been cleared (typically 10-12+ weeks). If your **left** leg is injured, you may be able to drive an automatic car once you're comfortable and safe - but check with your insurance company and medical team first."
        },
        {
          question: "Is it normal that the pain has gone down so quickly?",
          answer: "Yes. The initial rupture is painful, but the pain typically subsides quickly. This doesn't mean your injury isn't serious - it very much is. The absence of severe ongoing pain can be misleading."
        },
        {
          question: "What if I accidentally put weight on my foot?",
          answer: "If you've briefly touched your foot down or put some weight through it, don't panic. The boot/cast is designed to protect you. However, try to follow the weight-bearing instructions you were given. If you've had a significant fall or accident, contact your medical team."
        },
        {
          question: "Can I remove the cast/splint to shower?",
          answer: "**Plaster cast:** No, absolutely not. Use a waterproof cover. **Walking boot:** Generally, no - but follow your specific instructions. Most protocols require 24/7 boot wear initially. **Some splints:** May be removable for brief periods - but only if specifically told this is okay."
        },
        {
          question: "How do I sleep comfortably?",
          answer: "It's difficult, but it gets easier. Use pillows to support your leg, keep the room cool, and accept that sleep may be disrupted for a while. See our detailed tips in the sleeping section above."
        },
        {
          question: "When can I use a night splint instead of the boot?",
          answer: "Typically, night splints can be introduced from around week 2-4, but only with your specialist's approval. They're designed to maintain the correct foot position during sleep while being lighter and more comfortable than a boot."
        },
        {
          question: "Is swelling normal?",
          answer: "Yes, swelling is completely normal and expected. It should gradually reduce over the first few weeks. Keep your leg elevated as much as possible. However, if swelling suddenly increases, or is accompanied by increased pain, redness, or warmth - contact your medical team as this could indicate a blood clot."
        }
      ]
    },

    // Summary Checklist
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Week 1 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Keep your foot immobilised 24/7 in the cast/splint/boot provided", checked: false },
        { text: "Take blood thinning medication as prescribed", checked: false },
        { text: "Elevate your leg above heart level as much as possible", checked: false },
        { text: "Use ice for the first 3-4 days to reduce swelling", checked: false },
        { text: "Take pain medication as needed", checked: false },
        { text: "Set up a recovery station at home", checked: false },
        { text: "Learn to use your crutches safely", checked: false },
        { text: "Order a waterproof cover for showering", checked: false },
        { text: "Know the warning signs of blood clots", checked: false },
        { text: "Rest - your body is healing", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Remember:** Recovery from an Achilles rupture is a marathon, not a sprint. Week 1 is about protection and survival. You've got this."
    },

    // References
    {
      type: "heading",
      level: 2,
      text: "References"
    },
    {
      type: "text",
      content: "**UK-FATE audit** — \"Incidence of venous thromboembolism following Achilles tendon rupture. Data from the UK foot and ankle thrombo-embolism (UK-FATE) audit.\" *PMID: 39961162*"
    },
    {
      type: "text",
      content: "**Maffulli N, et al.** \"The clinical diagnosis of subcutaneous tear of the Achilles tendon. A prospective study in 174 patients.\" *PMID: 9548122*"
    },
    {
      type: "text",
      content: "**NICE guideline NG89** — \"Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism.\""
    },
    {
      type: "text",
      content: "**Costa ML, et al.** \"Plaster cast versus functional brace for non-surgical treatment of Achilles tendon rupture (UKSTAR).\" *PMID: 32035553*"
    }
  ]
};
