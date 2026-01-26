import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-13-25",
  title: "Weeks 13-25: Progressive Strengthening",
  description: "Complete guide to weeks 13-25 of Achilles rupture recovery. Learn about progressive strengthening exercises, building cardio safely, functional milestones, and returning to normal life.",
  phase: "weeks-13-25",
  weekRange: "Weeks 13-25 (3-6 months)",
  highlights: [
    "Building calf strength",
    "Single-leg exercises",
    "Cardio progression",
    "Returning to activities"
  ]
};

export const content: GuideContent = {
  intro: "You're now in the longest and arguably most important phase of your recovery. The boot is behind you, physiotherapy is underway, and your focus shifts to rebuilding the strength and function you've lost. Weeks 13-25 are about progressive strengthening, building endurance, and gradually returning to normal life. This phase requires patience, consistency, and a long-term perspective.",

  blocks: [
    // Understanding This Phase
    {
      type: "heading",
      level: 2,
      text: "Understanding This Critical Phase"
    },
    {
      type: "heading",
      level: 3,
      text: "What's Happening to Your Tendon (Late Remodelling)"
    },
    {
      type: "text",
      content: "Your tendon is well into the **remodelling phase** - the longest stage of healing that continues for 12-18 months or longer."
    },
    {
      type: "card",
      title: "Biological Processes Underway",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Type III collagen continues to be replaced by stronger Type I collagen",
            "Collagen fibres are aligning along lines of stress and force",
            "The tendon is becoming progressively stiffer and stronger",
            "Cross-linking between collagen fibres is increasing",
            "The tendon is adapting to the loads you place on it"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Why Loading is Now Important",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Tendons respond to stress by getting stronger (within limits)",
            "Too little loading = weak tendon",
            "Appropriate loading = progressive strengthening",
            "Too much loading = risk of damage"
          ]
        },
        {
          type: "text",
          content: "**The Goldilocks principle:** Your rehabilitation needs to find the \"just right\" balance - challenging enough to stimulate adaptation, but not so much that you overwhelm the healing tissue."
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Why This Phase Takes So Long"
    },
    {
      type: "text",
      content: "Many patients are frustrated by how long recovery takes. Understanding the biology helps."
    },
    {
      type: "text",
      content: "**Tendon healing is slow because:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Tendons have limited blood supply compared to muscles",
        "Collagen remodelling is inherently slow",
        "The tendon needs time to adapt to progressively higher loads",
        "Rushing causes problems (elongation, re-rupture)"
      ]
    },
    {
      type: "table",
      headers: ["Tissue", "Healing Time"],
      rows: [
        ["Skin", "Days to weeks"],
        ["Bone", "6-12 weeks primary healing"],
        ["Tendon", "12-18+ months full remodelling"]
      ]
    },
    {
      type: "text",
      content: "**The reality:** Full recovery from Achilles rupture typically takes 6-12 months. Some patients take longer. Rushing leads to setbacks; patience leads to better outcomes."
    },

    {
      type: "heading",
      level: 3,
      text: "Setting Realistic Milestones"
    },
    {
      type: "text",
      content: "Having clear milestones helps maintain motivation and track progress."
    },
    {
      type: "table",
      headers: ["Period", "Key Goals"],
      rows: [
        ["Weeks 13-16", "Walk 20-30 min comfortably, 20+ double-leg heel raises, good balance, minimal swelling"],
        ["Weeks 17-20", "Single-leg raises beginning (with support), 30+ min walking, light stationary cycling, stairs normally"],
        ["Weeks 21-25", "10+ single-leg raises, consideration of light jogging (if criteria met), near-normal activities"]
      ]
    },

    // Progressive Strengthening
    {
      type: "heading",
      level: 2,
      text: "Progressive Strengthening Exercises"
    },
    {
      type: "heading",
      level: 3,
      text: "Single-Leg Heel Raises - The Gold Standard"
    },
    {
      type: "text",
      content: "The single-leg heel raise is THE benchmark exercise for Achilles rehabilitation."
    },
    {
      type: "text",
      content: "**Why it matters:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Tests and builds calf and Achilles strength",
        "Directly relates to functional activities",
        "A key return-to-sport criterion (25+ repetitions)",
        "Measures progress objectively"
      ]
    },

    {
      type: "card",
      title: "Stage 1: Double-Leg Heel Raises (Weeks 10-14)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Both feet on floor, rise onto toes together",
            "2-3 sets of 15-25 reps",
            "**Target:** Build foundation for single-leg work"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Stage 2: Initial Post-Immobilization (Weeks 12-18)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Single-leg seated isotonic and isometric calf raises",
            "**Target:** 1.4x body weight MVIC (seated, plantarflexion)",
            "**Target:** 1.2x body weight seated isotonic",
            "Double to single leg standing progressions",
            "**Goal:** 15 body weight single-leg calf raises on flat ground"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Stage 3: Capacity Building (Weeks 18-24)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Single-leg standing and seated isotonic (progressing load)",
            "**Target:** 2x body weight plantarflexion isometric MVIC (seated)",
            "Progressively introduce dorsiflexion using plates (1\", 1.5\", 2\")",
            "Sled work as approaching targets"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Stage 4: Unsupported Single-Leg (Weeks 22+)",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "No support, full range of motion",
            "**Goal:** 25+ repetitions (key return-to-sport criterion)",
            "Rise straight up, push through big toe and ball of foot",
            "Full squeeze at top, slow controlled descent (3 seconds)"
          ]
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Progressive Dorsiflexion Introduction (Stage 3)"
    },
    {
      type: "alert",
      variant: "info",
      title: "Important Approach",
      content: "Instead of aggressive stretching, dorsiflexion is introduced progressively through **loaded exercises**. This is safer than passive stretching and strengthens the tendon while improving range."
    },
    {
      type: "text",
      content: "**How it works:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Use plates under your toes to create gradual dorsiflexion",
        "Start with 10kg plate (~1 inch)",
        "Progress to 1.5 inch plate, then 2 inch plate",
        "Do this in both knee bent and knee straight positions",
        "**This replaces flexibility work** - flexibility comes naturally with loaded dorsiflexion"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Eccentric Calf Drops (When Safe)"
    },
    {
      type: "text",
      content: "Eccentric exercises (muscle lengthening under load) are particularly beneficial for tendon health."
    },
    {
      type: "text",
      content: "**When to start:** Usually week 20-24+, with physiotherapist approval, after you've built good strength."
    },
    {
      type: "card",
      title: "Double-Leg Eccentric Drops",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Stand on a step with heels hanging off",
            "Rise onto toes using BOTH legs",
            "Shift weight to injured leg",
            "Lower slowly (3-5 seconds) on injured leg only",
            "Rise again using both legs",
            "Repeat 10-15 times, 2 sets"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**Warning:** This is an advanced exercise. Only begin with physiotherapist approval and instruction."
    },

    {
      type: "heading",
      level: 3,
      text: "Balance and Proprioception Work"
    },
    {
      type: "text",
      content: "Proprioception (body awareness) is often impaired after injury and immobilisation."
    },
    {
      type: "table",
      headers: ["Level", "Exercise", "Duration"],
      rows: [
        ["1", "Single-leg stance, eyes open", "30-60 seconds"],
        ["2", "Single-leg stance, eyes closed", "30 seconds"],
        ["3", "Balance on pillow/wobble cushion", "30 seconds"],
        ["4", "Single-leg stance with arm movements or catching ball", "30 seconds"]
      ]
    },
    {
      type: "text",
      content: "**Why this matters:** Reduces risk of future ankle injuries, improves confidence in movement, essential for sport return, helps prevent re-injury."
    },

    // Building Cardio
    {
      type: "heading",
      level: 2,
      text: "Building Cardio Without Risk"
    },
    {
      type: "heading",
      level: 3,
      text: "Swimming and Pool Exercises"
    },
    {
      type: "text",
      content: "Swimming is excellent cardiovascular exercise with minimal tendon loading."
    },
    {
      type: "text",
      content: "**When to start:** Once any surgical wounds are fully healed and with specialist approval."
    },
    {
      type: "text",
      content: "**Benefits:** Zero impact, excellent cardiovascular workout, resistance for strengthening, good for mental health."
    },
    {
      type: "text",
      content: "**Pool exercises:** Walking in the pool, swimming (freestyle, backstroke), pool running with flotation belt, water-based calf raises."
    },
    {
      type: "text",
      content: "**Precautions:** Avoid push-off from wall initially, breaststroke may strain ankle, avoid flip turns initially."
    },

    {
      type: "heading",
      level: 3,
      text: "Stationary Bike Protocol"
    },
    {
      type: "text",
      content: "Cycling is a great low-impact option for cardio and early calf engagement."
    },
    {
      type: "text",
      content: "**When to start:** Usually week 12-14."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Low resistance, moderate cadence (60-80 rpm)",
        "Start with 10-15 minutes",
        "Ball of foot on pedal (not heel)",
        "Increase duration before intensity",
        "Work up to 30+ minutes"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Elliptical Training"
    },
    {
      type: "text",
      content: "**When to start:** Usually week 16-20."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Low resistance, moderate pace",
        "Forward motion only (not backward initially)",
        "Start with 10-15 minutes",
        "Can be a stepping stone to running"
      ]
    },

    // Returning to Normal Life
    {
      type: "heading",
      level: 2,
      text: "Returning to Normal Life"
    },
    {
      type: "heading",
      level: 3,
      text: "Daily Activities"
    },
    {
      type: "text",
      content: "By weeks 13-25, most daily activities should be possible:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Walking without limp",
        "Stairs with normal pattern",
        "Standing for extended periods",
        "Light household chores",
        "Returning to most office/desk work",
        "Driving (usually cleared by week 12)"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Activities to Approach Carefully"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Ladders and climbing (balance, strength)",
        "Carrying heavy loads",
        "Uneven terrain walking",
        "Activities requiring quick movements",
        "Any impact sports (wait for clearance)"
      ]
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Weeks 13-25"
    },
    {
      type: "faq",
      items: [
        {
          question: "Why is recovery taking so long?",
          answer: "Tendon healing is inherently slow due to limited blood supply. Full recovery takes 6-12 months. The remodelling phase continues for 12-18+ months. Rushing causes problems - patience leads to better outcomes."
        },
        {
          question: "My calf looks smaller than the other side - is this permanent?",
          answer: "Muscle atrophy is normal and expected after immobilisation. It takes 6-12+ months for calf size to approach normal. Some permanent difference may persist (usually small), but ongoing strengthening helps."
        },
        {
          question: "I still have some stiffness - is this normal?",
          answer: "Some residual stiffness is common and usually improves over time. Continue range of motion exercises but don't stretch aggressively. Flexibility returns naturally with loaded dorsiflexion exercises."
        },
        {
          question: "When can I play sport again?",
          answer: "Return to sport is typically considered from 6 months, but 9-12 months is more realistic for most people. It should be based on meeting strength criteria (25+ single-leg heel raises, hop tests, etc.), not just time."
        },
        {
          question: "Can I start running?",
          answer: "Running usually begins around week 20-24+ IF you meet criteria: 15-20+ single-leg heel raises, pain-free walking 30+ minutes, good balance. Start with walk-jog intervals and progress gradually."
        },
        {
          question: "How often should I do my exercises?",
          answer: "Follow your physiotherapist's guidance, but typically calf strengthening exercises are done 3-4 times per week (not daily - rest days are important for tendon adaptation)."
        },
        {
          question: "Should I still be taking blood thinners?",
          answer: "Blood thinners are typically stopped once you're fully weight-bearing and mobile (usually by week 10-12). Follow your medical team's specific guidance."
        }
      ]
    },

    // Summary
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Weeks 13-25 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Progress heel raises from double to single leg", checked: false },
        { text: "Build up to 15+ single-leg heel raises", checked: false },
        { text: "Introduce progressive dorsiflexion with plates", checked: false },
        { text: "Build walking duration to 30+ minutes", checked: false },
        { text: "Add cardio: cycling, swimming, elliptical", checked: false },
        { text: "Work on balance and proprioception", checked: false },
        { text: "Attend regular physiotherapy sessions", checked: false },
        { text: "Consider eccentric exercises (with physio approval)", checked: false },
        { text: "Monitor for setbacks and warning signs", checked: false },
        { text: "Stay patient and consistent", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**This phase is a marathon, not a sprint.** Consistency beats intensity. Every week of proper loading makes your tendon stronger and more resilient. Trust the process."
    }
  ]
};
