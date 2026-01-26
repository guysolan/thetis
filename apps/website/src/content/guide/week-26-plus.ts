import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "week-26-plus",
  title: "6 Months+: Return to Sport",
  description: "Complete guide to week 26 and beyond of Achilles rupture recovery. Learn about return-to-sport criteria, running progressions, plyometrics, preventing re-rupture, and what life looks like after full recovery.",
  phase: "week-26-plus",
  weekRange: "6+ Months",
  highlights: [
    "Return-to-sport criteria",
    "Running progression",
    "Preventing re-rupture",
    "Long-term outlook"
  ]
};

export const content: GuideContent = {
  intro: "Congratulations - you've reached the 6-month mark. This is a significant milestone in Achilles rupture recovery, and for many people, it represents the beginning of return to sport and full activity. But as you'll learn in this guide, recovery isn't \"done\" at 6 months. This phase is about safely returning to the activities you love while protecting your investment in healing.",

  blocks: [
    // 6-Month Milestone
    {
      type: "heading",
      level: 2,
      text: "The 6-Month Milestone - What It Really Means"
    },
    {
      type: "heading",
      level: 3,
      text: "Your Tendon at 6 Months"
    },
    {
      type: "text",
      content: "At 6 months post-injury, your tendon has made remarkable progress, but the remodelling process continues."
    },
    {
      type: "card",
      title: "Where Your Tendon Is Now",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Approximately 80-90% of ultimate tensile strength",
            "Type I collagen predominates (the strong, organised type)",
            "Collagen fibres are well-aligned along stress lines",
            "Tendon stiffness is approaching normal",
            "Still undergoing ongoing remodelling"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**What this means:** Your tendon can handle significant loads and return to sport becomes possible. But maximum strength isn't reached yet, and continued care remains important."
    },

    {
      type: "heading",
      level: 3,
      text: "Why Recovery Isn't \"Done\" Yet"
    },
    {
      type: "text",
      content: "Many patients expect to be \"finished\" at 6 months. The reality is more nuanced."
    },
    {
      type: "text",
      content: "**Ongoing processes:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Tendon remodelling continues for 12-18+ months",
        "Calf muscle continues to strengthen",
        "Proprioception continues to improve",
        "Mental confidence takes time to rebuild"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Realistic Return Timeline"
    },
    {
      type: "table",
      headers: ["Timeline", "Who Returns", "Notes"],
      rows: [
        ["6 months", "Consideration begins", "Ambitious, not always recommended"],
        ["7-8 months", "Elite athletes", "With careful management"],
        ["9 months", "Most recreational athletes", "Realistic for full return"],
        ["12 months", "Professional standard", "NBA standard, sensible approach"],
        ["12-24 months", "Full maturation", "Final tendon maturation"]
      ]
    },
    {
      type: "alert",
      variant: "info",
      title: "Important Perspective",
      content: "Just because you CAN return to sport at 6 months doesn't mean you MUST. Taking longer is completely acceptable and often safer. **12 months is sensible** for most people, especially for high-level sport."
    },

    {
      type: "heading",
      level: 3,
      text: "The Year-Long Journey to Full Strength"
    },
    {
      type: "table",
      headers: ["Time Point", "Approx. Strength", "Notes"],
      rows: [
        ["3 months", "60-70%", "Boot just removed"],
        ["6 months", "80-90%", "Return to sport consideration"],
        ["9 months", "90-95%", "Most recreational sport return"],
        ["12 months", "95-100%", "Near full recovery"],
        ["18-24 months", "100%+", "Full maturation"]
      ]
    },
    {
      type: "text",
      content: "**Calf muscle recovery:** At 6 months, most people still have noticeable calf asymmetry. Full recovery can take 12-18 months. **Ongoing calf strengthening is essential** - continue exercises long-term to maintain function."
    },

    // Return-to-Sport Criteria
    {
      type: "heading",
      level: 2,
      text: "Return-to-Sport Criteria"
    },
    {
      type: "text",
      content: "Return to sport should be **criteria-based**, not time-based alone. These are the key benchmarks."
    },

    {
      type: "heading",
      level: 3,
      text: "Strength Tests"
    },
    {
      type: "checklist",
      title: "Required Strength Criteria",
      items: [
        { text: "**25+ single-leg heel raises** on injured side (ideally >90% limb symmetry)", checked: false },
        { text: "**Isokinetic strength** >90% limb symmetry (if tested)", checked: false },
        { text: "**Isometric strength** ability to support 2.5-3.0x body weight in calf contraction", checked: false }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Hop and Jump Tests"
    },
    {
      type: "checklist",
      items: [
        { text: "**Single-leg hop for distance:** <10% asymmetry vs uninjured side", checked: false },
        { text: "**Triple hop test:** <20% asymmetry", checked: false },
        { text: "**Vertical jump:** approaching symmetry", checked: false }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Functional and Mental Readiness"
    },
    {
      type: "checklist",
      items: [
        { text: "**Pain-free jogging:** 10+ minutes continuous", checked: false },
        { text: "**Sport-specific movements:** cutting, pivoting, sprinting without pain", checked: false },
        { text: "**Psychological confidence:** feeling ready to return, low fear of re-injury", checked: false }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Psychological Readiness"
    },
    {
      type: "text",
      content: "Physical readiness alone isn't enough - you need to be mentally ready too."
    },
    {
      type: "card",
      title: "Signs of Psychological Readiness",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Confidence in your tendon's ability to handle load",
            "Willingness to push yourself appropriately",
            "Ability to distinguish normal sensations from warning signs",
            "Acceptance of some residual risk"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Signs You May Not Be Ready",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Significant fear of movement or re-injury",
            "Avoiding activities you're physically capable of",
            "Hypervigilance about every sensation",
            "Anxiety that interferes with performance"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Addressing psychological barriers:** Gradual exposure to challenging activities, working with a sports psychologist if needed, talking to others who've successfully returned, celebrating progress step by step."
    },

    // Starting to Run Again
    {
      type: "heading",
      level: 2,
      text: "Starting to Run Again"
    },
    {
      type: "heading",
      level: 3,
      text: "Prerequisites for Running"
    },
    {
      type: "checklist",
      title: "Before You Start Running",
      items: [
        { text: "25+ single-leg heel raises", checked: false },
        { text: "Pain-free walking for 30+ minutes", checked: false },
        { text: "Good balance and proprioception", checked: false },
        { text: "Physiotherapist approval", checked: false },
        { text: "Completed pre-running plyometric preparation", checked: false }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Walk-Jog Progression"
    },
    {
      type: "table",
      headers: ["Week", "Protocol", "Sessions"],
      rows: [
        ["1", "Walk 4 min, jog 1 min × 5 (25 min total)", "3 sessions"],
        ["2", "Walk 3 min, jog 2 min × 5 (25 min total)", "3 sessions"],
        ["3", "Walk 2 min, jog 3 min × 5 (25 min total)", "3 sessions"],
        ["4", "Walk 1 min, jog 4 min × 5 (25 min total)", "3 sessions"],
        ["5", "Continuous jogging 15-20 min", "3 sessions"],
        ["6+", "Gradually increase duration, then add speed", "3-4 sessions"]
      ]
    },
    {
      type: "text",
      content: "**Rules for progression:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Pain should be 0-2/10 during and after",
        "Next-day soreness should resolve within 24 hours",
        "If symptoms increase, step back to previous week",
        "Don't run on consecutive days initially"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Proper Running Technique"
    },
    {
      type: "text",
      content: "Good running form protects your tendon and optimises performance."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Cadence:** Aim for 170-180 steps per minute (higher cadence = less impact per step)",
        "**Foot strike:** Midfoot landing recommended, avoid heavy heel striking, don't over-stride",
        "**Posture:** Slight forward lean from ankles, relaxed shoulders, core engaged, head up",
        "**Consider:** Running gait analysis with physio, video analysis"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Surface and Footwear"
    },
    {
      type: "text",
      content: "**Surface progression:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Treadmill (consistent, slightly cushioned)",
        "Flat track or path (predictable, firm)",
        "Road (harder surface)",
        "Trail (uneven, more challenging - later)"
      ]
    },
    {
      type: "text",
      content: "**Avoid initially:** Hills (especially downhill), cambered surfaces, uneven terrain, sand."
    },
    {
      type: "text",
      content: "**Footwear:** Well-cushioned running shoes, appropriate for your foot type, not overly worn. May benefit from mild heel raise initially."
    },

    {
      type: "heading",
      level: 3,
      text: "Avoiding \"Too Much Too Soon\""
    },
    {
      type: "alert",
      variant: "warning",
      title: "The 10% Rule",
      content: "Increase weekly running volume by no more than 10%. This applies to both distance and intensity. If week 1 = 10km total, week 2 = max 11km."
    },
    {
      type: "text",
      content: "**Warning signs you're doing too much:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Increasing pain during runs",
        "Next-day soreness lasting >24 hours",
        "Swelling that doesn't resolve",
        "Stiffness getting worse rather than better",
        "Performance declining"
      ]
    },

    // Plyometric Training
    {
      type: "heading",
      level: 2,
      text: "Plyometric Training and Jumping"
    },
    {
      type: "heading",
      level: 3,
      text: "When to Start Plyometrics"
    },
    {
      type: "text",
      content: "Plyometric exercises (jumping, hopping, bounding) are essential for return to most sports but must be introduced carefully."
    },
    {
      type: "text",
      content: "**Prerequisites:** 25+ single-leg heel raises, successfully completed walk-jog programme, pain-free with current activities, passed basic hop test, physiotherapist approval."
    },

    {
      type: "heading",
      level: 3,
      text: "Plyometric Progression"
    },
    {
      type: "table",
      headers: ["Level", "Exercises"],
      rows: [
        ["1", "Two-leg hops in place, small box jumps (both legs)"],
        ["2", "Two-leg lateral hops, forward hops for distance"],
        ["3", "Single-leg hops in place, step-ups with hop"],
        ["4", "Single-leg lateral hops, single-leg forward hops"],
        ["5", "Bounding, depth jumps, sport-specific plyometrics"]
      ]
    },
    {
      type: "text",
      content: "**Key points:** Start with low-level, progress gradually, allow 48+ hours between sessions, stop if painful."
    },

    // Preventing Re-rupture
    {
      type: "heading",
      level: 2,
      text: "Preventing Re-rupture and Long-Term Care"
    },
    {
      type: "text",
      content: "Re-rupture rates are low (2-4%), but the consequences are significant. Here's how to minimise risk."
    },
    {
      type: "dos-donts",
      dos: [
        "**Continue calf strengthening exercises long-term** (2-3 times per week indefinitely)",
        "**Warm up thoroughly before activity**",
        "**Progress gradually** - no sudden increases in volume or intensity",
        "**Listen to your body** and rest when needed",
        "**Maintain overall fitness and flexibility**"
      ],
      donts: [
        "**Rush back to high-impact activities**",
        "**Ignore pain or unusual sensations**",
        "**Skip warm-ups or cool-downs**",
        "**Stop strengthening exercises** once you \"feel better\""
      ]
    },
    {
      type: "tip",
      title: "Long-Term Maintenance",
      content: "Continue calf strengthening exercises 2-3 times per week indefinitely. This maintains tendon health and reduces re-injury risk. Think of it like brushing your teeth - ongoing maintenance for long-term health."
    },

    {
      type: "heading",
      level: 3,
      text: "Protecting the Other Achilles"
    },
    {
      type: "text",
      content: "There's a small increased risk to the other Achilles (about 2-6%). Bilateral calf strengthening helps protect both tendons."
    },

    // Life After Recovery
    {
      type: "heading",
      level: 2,
      text: "Life After Full Recovery"
    },
    {
      type: "text",
      content: "Most people make excellent recoveries and return to their previous activity levels. Here's what to expect long-term."
    },
    {
      type: "faq",
      items: [
        {
          question: "Will my tendon ever be 100% normal?",
          answer: "The healed tendon may be slightly different (thicker, sometimes stiffer), but functional outcomes are usually excellent. Many athletes return to full competition."
        },
        {
          question: "Can I run marathons or play competitive sport?",
          answer: "Yes, with proper rehabilitation. Many people return to running, football, tennis, and other demanding activities. It requires patience and consistent strengthening."
        },
        {
          question: "Will I always have to be careful?",
          answer: "Once fully recovered (12-18 months), most people can live normally. Maintaining calf strength through regular exercise is the best protection."
        },
        {
          question: "What about the other Achilles?",
          answer: "There's a small increased risk to the other side (about 2-6%). Bilateral calf strengthening helps protect both tendons."
        },
        {
          question: "Is it normal for my tendon to feel different?",
          answer: "Yes. The healed tendon is typically thicker and may feel different. This is normal and doesn't affect function. Most people stop noticing after a while."
        },
        {
          question: "What if I feel twinges or sensations during sport?",
          answer: "Some sensations are normal, especially during the first year back. Learn to distinguish normal post-exercise feelings from warning signs. Sharp pain, sudden weakness, or a 'pop' sensation should prompt medical review."
        }
      ]
    },

    // Summary
    {
      type: "heading",
      level: 2,
      text: "Summary: Your 6 Months+ Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Meet all return-to-sport criteria before returning", checked: false },
        { text: "Follow a structured walk-jog programme", checked: false },
        { text: "Progress plyometrics gradually", checked: false },
        { text: "Continue calf strengthening long-term", checked: false },
        { text: "Warm up properly before all activities", checked: false },
        { text: "Follow the 10% rule for volume increases", checked: false },
        { text: "Address psychological readiness", checked: false },
        { text: "Work with your physio on sport-specific goals", checked: false },
        { text: "Listen to your body and rest when needed", checked: false },
        { text: "Celebrate your progress!", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      title: "Congratulations",
      content: "You've come through one of the most challenging injuries in sport. Achilles rupture recovery is demanding, but with patience, consistency, and proper rehabilitation, most people achieve excellent outcomes. You've invested months in healing - now you get to enjoy the results. **You've got this.**"
    }
  ]
};
