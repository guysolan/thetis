import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-10-12",
  title: "Weeks 10-12: Boot Transition",
  description: "Complete guide to weeks 10-12 of Achilles rupture recovery. Learn about transitioning out of your boot, choosing the right shoes, starting physiotherapy, key exercises, and what NOT to do.",
  phase: "weeks-10-12",
  weekRange: "Weeks 10-12",
  highlights: [
    "Leaving the boot behind",
    "Choosing transition shoes",
    "Starting physiotherapy",
    "First exercises"
  ]
};

export const content: GuideContent = {
  intro: "This is the moment you've been waiting for: life without the boot. Weeks 10-12 mark a pivotal transition in your Achilles rupture recovery. You'll be learning to walk in regular shoes, starting structured physiotherapy, and beginning the active rebuilding of your calf strength. It's exciting, nerve-wracking, and absolutely crucial to get right.",

  blocks: [
    // The Big Transition
    {
      type: "heading",
      level: 2,
      text: "The Big Transition - Leaving Your Boot Behind"
    },
    {
      type: "heading",
      level: 3,
      text: "When Is It Safe to Stop Wearing the Boot?"
    },
    {
      type: "text",
      content: "**Evidence-based protocols** recommend beginning boot removal around **weeks 11-12** (not week 8-10). This is based on **force-based criteria** rather than time alone."
    },
    {
      type: "alert",
      variant: "info",
      title: "Why the Delay?",
      content: "Your tendon needs to handle ~1.5x body weight forces during walking. Research shows keeping the boot longer (with aggressive loading inside it) prevents elongation. The goal: Build tendon strength BEFORE exposing it to walking forces."
    },
    {
      type: "text",
      content: "**Readiness criteria (your specialist will assess):**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Ability to do seated calf raises with 0.8-1x body weight on your knee",
        "This creates ~2x body weight force in the Achilles tendon",
        "Tendon has developed enough strength to tolerate walking",
        "Swelling is well-controlled",
        "You feel confident and ready"
      ]
    },
    {
      type: "tip",
      title: "The Principle",
      content: "More aggressive loading early in safe positions (plantarflexion), but more cautious with immobilization time. This prevents elongation while building strength."
    },

    {
      type: "heading",
      level: 3,
      text: "Boot Weaning Protocol"
    },
    {
      type: "table",
      headers: ["Day", "Activity"],
      rows: [
        ["Day 1", "Wear shoes indoors for 1-2 hours, boot rest of time"],
        ["Day 2-3", "Increase to 3-4 hours in shoes"],
        ["Day 4-5", "Majority of day in shoes"],
        ["Day 6-7", "Full transition to shoes during day"],
        ["Night", "May still use night splint for additional protection"]
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**Boot weaning is gradual** - don't throw your boot away on day one. Keep it nearby for the first week or two as a safety net."
    },

    {
      type: "heading",
      level: 3,
      text: "Your First Steps in Regular Shoes"
    },
    {
      type: "text",
      content: "Those first steps out of the boot are momentous - and often wobbly."
    },
    {
      type: "text",
      content: "**What to expect:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your ankle will feel stiff and weak",
        "Walking will feel strange and uncertain",
        "You may have a limp initially",
        "Your calf will fatigue quickly",
        "Some anxiety is completely normal"
      ]
    },
    {
      type: "text",
      content: "**First steps guidance:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Start indoors on a flat, familiar surface",
        "Have something to hold onto nearby (furniture, wall)",
        "Take short, slow steps",
        "Focus on heel-to-toe motion",
        "Stop and rest when you feel fatigued"
      ]
    },
    {
      type: "card",
      title: "Normal Sensations",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Tightness in the Achilles area",
            "Weakness when pushing off",
            "Mild discomfort (NOT sharp pain)",
            "Ankle stiffness",
            "Calf fatigue"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "NOT Normal - Contact Your Team",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Sharp pain",
            "Sensation of \"giving way\"",
            "Popping or snapping",
            "Significant increase in swelling",
            "Unable to bear weight"
          ]
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Choosing the Right Footwear for Transition"
    },
    {
      type: "text",
      content: "Your first shoes after the boot are important. The wrong choice can cause problems."
    },
    {
      type: "card",
      title: "Ideal Shoe Characteristics",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Heel-to-toe drop:** 10mm or more (NOT flat shoes)",
            "**Heel cushioning:** Good shock absorption",
            "**Heel counter:** Firm support at the back",
            "**Fit:** Snug but not tight, with room for heel lifts",
            "**Closure:** Laces preferred for adjustable fit",
            "**Sole:** Slightly firm, not too flexible"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Good options:** Running shoes (Asics, Brooks, New Balance), walking shoes with good support, athletic trainers with cushioned heels."
    },
    {
      type: "dos-donts",
      dos: [
        "Running or walking shoes with 10mm+ heel drop",
        "Shoes with firm heel counter",
        "Lace-up shoes for adjustable fit",
        "Consider adding 0.5-1cm gel heel lift initially"
      ],
      donts: [
        "Completely flat shoes (ballet flats, Converse)",
        "High heels",
        "Flip flops or sandals",
        "Slip-on shoes without back support",
        "Minimalist/barefoot shoes",
        "Going barefoot"
      ]
    },
    {
      type: "tip",
      title: "Using Heel Lifts",
      content: "Consider adding a 0.5-1cm gel heel lift initially. This eases the transition from the boot's heel elevation. Gradually reduce/remove over 2-4 weeks."
    },

    // Starting Physiotherapy
    {
      type: "heading",
      level: 2,
      text: "Starting Physiotherapy"
    },
    {
      type: "heading",
      level: 3,
      text: "What to Expect at Your First Session"
    },
    {
      type: "text",
      content: "Your first physiotherapy session sets the foundation for your rehabilitation."
    },
    {
      type: "text",
      content: "**Initial assessment includes:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Discussion of your injury, treatment, and recovery so far",
        "Measurement of ankle range of motion",
        "Assessment of calf muscle strength and size",
        "Evaluation of your walking pattern (gait)",
        "Discussion of your goals and timeline"
      ]
    },
    {
      type: "text",
      content: "**What your physio will be looking for:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "How much dorsiflexion (upward movement) you have",
        "How much plantarflexion (downward movement) you have",
        "Calf muscle atrophy (shrinkage) compared to the other leg",
        "Any compensatory movement patterns",
        "Your confidence and psychological readiness"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Goals for Early Physiotherapy (Weeks 10-12)"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Protected walking** - Use heel wedge, reduced step length. Elongation can still happen in first weeks of walking",
        "**Begin calf activation** - Continue building on early strengthening work. Target: 1.2x body weight seated isotonic",
        "**Improve balance** - Rebuild proprioception (body awareness) in the ankle",
        "**Normalise gait** - Correct any limping or compensatory patterns",
        "**Build confidence** - Psychological recovery is part of physical recovery"
      ]
    },
    {
      type: "card",
      title: "Protected Walking Strategies",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Heel wedge:** Use a heel lift initially (0.5-1cm), eases transition, gradually reduce over 2-4 weeks",
            "**Reduced step length:** Use step-to gait on unaffected side, shorter steps reduce force through tendon",
            "**Partial weightbearing:** If you can't push off properly, you're not ready. Use crutches until gait is normal"
          ]
        },
        {
          type: "text",
          content: "**Why this matters:** The tendon needs protection until it's developed enough strength. Protected walking prevents elongation."
        }
      ]
    },
    {
      type: "text",
      content: "**What goals are NOT for this phase:** Heavy calf strengthening, running or impact activities, sports-specific training, aggressive stretching (avoid for up to a year), maximum range of motion."
    },

    {
      type: "heading",
      level: 3,
      text: "The Importance of Consistency"
    },
    {
      type: "text",
      content: "Rehabilitation success depends heavily on consistent effort."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Attend ALL scheduled physiotherapy appointments",
        "Complete your home exercises DAILY (or as prescribed)",
        "Don't skip sessions because you're \"feeling fine\"",
        "Don't overdo it because you're \"feeling good\"",
        "Follow the progression your physio sets - don't freelance"
      ]
    },
    {
      type: "alert",
      variant: "warning",
      title: "Common Mistake",
      content: "Many people reduce their exercise compliance as they start feeling better. This is when doing the exercises is MOST important. The early \"easy\" exercises build the foundation for harder ones later."
    },

    // Key Exercises
    {
      type: "heading",
      level: 2,
      text: "Key Exercises for This Phase"
    },
    {
      type: "card",
      title: "1. Towel Calf Stretch (Gentle)",
      description: "Gently improve ankle dorsiflexion - only when physio approves",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Sit with injured leg extended straight",
            "Loop a towel around the ball of your foot",
            "Gently pull the towel towards you",
            "Stop when you feel a MILD stretch - not pain",
            "Hold for 30 seconds, repeat 3-5 times"
          ]
        },
        {
          type: "text",
          content: "**Key:** Be VERY gentle - no aggressive stretching. You're looking for mild tension, not maximum stretch."
        }
      ]
    },
    {
      type: "card",
      title: "2. Seated Heel Raises",
      description: "Begin calf muscle activation without full body weight",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Sit in a chair with feet flat on floor",
            "Slowly lift your heels off the ground",
            "Squeeze your calf muscles at the top",
            "Lower slowly with control",
            "Repeat 15-25 times, 2-3 sets"
          ]
        },
        {
          type: "text",
          content: "**Progression:** Start with body weight only, add light weight on knees as strength improves."
        }
      ]
    },
    {
      type: "card",
      title: "3. Standing Double-Leg Heel Raises",
      description: "Build calf strength with both legs sharing the load",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Stand facing wall or counter for balance",
            "Feet shoulder-width apart",
            "Slowly rise onto your toes (both feet)",
            "Hold at top for 1-2 seconds",
            "Lower slowly with control",
            "Repeat 15-20 times, 2-3 sets"
          ]
        },
        {
          type: "text",
          content: "**Progression:** Equal weight → shift more to injured leg → eventually single-leg (later phase)."
        }
      ]
    },
    {
      type: "card",
      title: "4. Resistance Band Ankle Movements",
      description: "Build strength in all directions around the ankle",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Plantarflexion:** Loop band around foot, push foot down against resistance, 15-20 times",
            "**Inversion/eversion:** Anchor band to side, push foot against resistance, 15-20 times each direction",
            "Start with light resistance (yellow or red Theraband)"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "5. Gentle Balance Training",
      description: "Rebuild proprioception and ankle stability",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Stand near a wall for support",
            "Lift uninjured leg slightly",
            "Balance on injured leg",
            "Hold for 10-30 seconds, repeat 5 times"
          ]
        },
        {
          type: "text",
          content: "**Progressions (later):** Eyes closed, unstable surface like a pillow, adding arm movements."
        }
      ]
    },
    {
      type: "card",
      title: "6. Walking Mechanics Training",
      description: "Restore normal heel-to-toe walking pattern",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Walk slowly in front of a mirror",
            "Focus on heel strike first",
            "Roll through the foot smoothly",
            "Push off gently with the toes",
            "Equal stance time on each leg"
          ]
        },
        {
          type: "text",
          content: "**Key:** Slow and deliberate initially. Aim for symmetry. Gradually increase speed."
        }
      ]
    },

    // What NOT to Do
    {
      type: "heading",
      level: 2,
      text: "What NOT to Do - Critical Mistakes to Avoid"
    },
    {
      type: "alert",
      variant: "danger",
      title: "Warning",
      content: "This phase is when many people make mistakes that set back their recovery. The tendon can still be damaged by inappropriate loading."
    },
    {
      type: "dos-donts",
      dos: [
        "Follow your physiotherapist's guidance exactly",
        "Progress gradually and patiently",
        "Listen to your body - rest when needed",
        "Wear appropriate supportive footwear",
        "Continue exercises even when feeling better"
      ],
      donts: [
        "**Don't stretch aggressively** - let range of motion return naturally",
        "**Don't walk barefoot** - always wear supportive shoes",
        "**Don't do single-leg activities** until cleared by physio",
        "**Don't ignore pain** - mild discomfort is okay, pain is not",
        "**Don't rush** - this phase sets the foundation for everything"
      ]
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Weeks 10-12"
    },
    {
      type: "faq",
      items: [
        {
          question: "When exactly should I remove the boot?",
          answer: "Evidence-based protocols recommend weeks 11-12, based on force-based criteria (ability to do seated calf raises with 0.8-1x body weight), not just time. Wait for your specialist's clearance - don't self-prescribe."
        },
        {
          question: "Is it normal to limp at first?",
          answer: "Some initial limp is common but should improve quickly over the first week or two. If you're still limping significantly after 2 weeks in shoes, discuss with your physiotherapist. Use protected walking strategies (heel lift, reduced step length) initially."
        },
        {
          question: "My calf looks much smaller than the other side - is this normal?",
          answer: "Yes, significant calf muscle atrophy is completely normal after 10+ weeks of immobilisation. This is exactly what rehabilitation addresses. It takes months to rebuild - be patient."
        },
        {
          question: "How much walking should I do?",
          answer: "Start with short walks (5-10 minutes) several times a day rather than one long walk. Gradually increase duration as your strength and confidence improve. Rest when fatigued."
        },
        {
          question: "Can I start running or jumping?",
          answer: "Absolutely not - not for several more months. Running and jumping create forces 2-3x body weight. Your tendon isn't ready. Focus on walking and basic strengthening first."
        },
        {
          question: "Should I stretch my Achilles to loosen it up?",
          answer: "No! Avoid aggressive stretching for up to a year. The tightness is normal healing tissue. Let range of motion return naturally through active exercises and normal movement."
        },
        {
          question: "What if I fall or trip?",
          answer: "Minor stumbles are unlikely to cause damage if you're following proper protocol. However, if you have a significant fall, sudden pain, or hear a \"pop,\" contact your medical team immediately."
        }
      ]
    },

    // Summary Checklist
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Weeks 10-12 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Get specialist clearance for boot removal", checked: false },
        { text: "Follow graduated boot weaning protocol", checked: false },
        { text: "Purchase appropriate transition footwear", checked: false },
        { text: "Use heel lifts initially (gradually reduce)", checked: false },
        { text: "Start physiotherapy", checked: false },
        { text: "Begin home exercise programme", checked: false },
        { text: "Practice protected walking", checked: false },
        { text: "Do exercises DAILY as prescribed", checked: false },
        { text: "Monitor for warning signs", checked: false },
        { text: "Be patient - this is a marathon, not a sprint", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Congratulations on reaching this milestone!** The boot is behind you, but the real work of rebuilding strength is just beginning. Stay consistent with your exercises and trust the process."
    }
  ]
};
