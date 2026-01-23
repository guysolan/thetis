import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-7-9",
  title: "Weeks 7-9: Final Boot Phase",
  description: "Complete guide to weeks 7-9 of Achilles rupture recovery. Learn about the remodelling phase, final wedge removal, preparing for physiotherapy, returning to work, and driving after Achilles injury.",
  phase: "weeks-7-9",
  weekRange: "Weeks 7-9",
  highlights: [
    "Final wedge removal",
    "Preparing for physio",
    "Driving considerations",
    "Return to work"
  ]
};

export const content: GuideContent = {
  intro: "You're approaching a major milestone: the end of boot-wearing. Weeks 7-9 represent the home stretch of the immobilisation phase. Your tendon is stronger now, you're likely removing your final wedges, and the prospect of proper physiotherapy is on the horizon. This guide will help you navigate this exciting but still-critical period.",

  blocks: [
    // Tendon Healing Progress
    {
      type: "heading",
      level: 2,
      text: "Your Tendon's Healing Progress"
    },
    {
      type: "heading",
      level: 3,
      text: "The Remodelling Phase Begins"
    },
    {
      type: "text",
      content: "By weeks 7-9, your tendon has entered the **remodelling phase** - the final and longest stage of healing. This phase will continue for months to come, but it's now well underway."
    },
    {
      type: "card",
      title: "What's Happening Inside Your Tendon",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Type III collagen (weaker, initial repair tissue) is being replaced by Type I collagen",
            "Type I collagen is stronger and more organised, similar to normal tendon",
            "Collagen fibres are aligning along the lines of force and stress",
            "The number of fibroblasts and blood vessels is decreasing as tissue matures",
            "The tendon is becoming progressively stronger and stiffer"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**The key point:** Your tendon is significantly stronger than it was at week 2 or 4, but it's still not back to full strength. The remodelling phase continues for 12-18 months or longer. Patience remains essential."
    },

    {
      type: "heading",
      level: 3,
      text: "How Strong Is Your Tendon Now?"
    },
    {
      type: "text",
      content: "Understanding your tendon's approximate strength helps set expectations:"
    },
    {
      type: "table",
      headers: ["Time Point", "Approx. Strength", "Notes"],
      rows: [
        ["Week 2", "~10-15%", "Very fragile"],
        ["Week 6", "~30-40%", "Stronger but still vulnerable"],
        ["**Week 9**", "**~50-60%**", "**You are approaching here**"],
        ["Week 12", "~60-70%", "Boot removed, early rehab"],
        ["6 months", "~80-90%", "Return to sport consideration"],
        ["12 months", "~90-100%", "Near full maturation"]
      ]
    },
    {
      type: "text",
      content: "**Important caveats:** These are rough estimates based on research. Individual variation is significant. The tendon may never be 100% identical to before, but functional strength can be excellent."
    },

    {
      type: "heading",
      level: 3,
      text: "Why Patience Still Matters"
    },
    {
      type: "text",
      content: "Even though you're feeling much better, these final boot weeks are not the time to let your guard down."
    },
    {
      type: "text",
      content: "**The remaining risks:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The tendon can still elongate if overstretched",
        "Re-rupture, while less likely, is still possible",
        "Poor compliance now can affect your long-term outcome",
        "Bad habits formed now will be harder to correct later"
      ]
    },
    {
      type: "text",
      content: "**The good news:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Each day sees your tendon getting stronger",
        "You're approaching the end of 24/7 boot wearing",
        "Physiotherapy will soon give you active things to do",
        "The hardest part is nearly behind you"
      ]
    },

    // Boot Progression
    {
      type: "heading",
      level: 2,
      text: "Boot Progression to Neutral"
    },
    {
      type: "heading",
      level: 3,
      text: "Removing Final Wedges"
    },
    {
      type: "text",
      content: "During weeks 7-9, you'll be removing your remaining wedges and approaching a neutral foot position."
    },
    {
      type: "table",
      headers: ["Week", "Wedges", "Angle", "Status"],
      rows: [
        ["Week 7", "1 wedge", "~10°", "Final wedge"],
        ["Week 8-9", "0 wedges", "Neutral (0°)", "Reaching neutral"],
        ["Week 10+", "Boot removal", "-", "Transition to shoes"]
      ]
    },
    {
      type: "text",
      content: "**How neutral position feels:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your foot is now at (or close to) 90° to your shin",
        "Walking may feel easier and more natural",
        "Less strain on your hip and back",
        "Closer to normal footwear position"
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**Important:** Even at neutral, continue wearing the boot 24/7 until your specialist confirms you can begin weaning off it."
    },

    {
      type: "heading",
      level: 3,
      text: "Walking at Neutral Position"
    },
    {
      type: "text",
      content: "Once you reach neutral (0 wedges), your walking will feel significantly more normal."
    },
    {
      type: "text",
      content: "**Walking goals for weeks 7-9:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Comfortable walking for 15-20+ minutes continuously",
        "Minimal or no use of crutches",
        "Even weight distribution between legs",
        "Confident on various surfaces (flat, carpet, gentle slopes)"
      ]
    },
    {
      type: "tip",
      content: "**Continue using your EVENup shoe leveler** - the boot still adds height even without wedges."
    },

    {
      type: "heading",
      level: 3,
      text: "Monitoring for Warning Signs"
    },
    {
      type: "text",
      content: "As you approach the end of boot wearing, stay vigilant for any concerning signs."
    },
    {
      type: "card",
      title: "Warning Signs to Report",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Sudden increase in swelling",
            "New or increased pain (beyond mild stiffness)",
            "A sensation of the tendon \"giving way\"",
            "Any clicking, popping, or snapping",
            "Increased laxity (feeling like your ankle is loose)",
            "Tendon area feeling unusually soft or gapped"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "What's Normal",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Mild stiffness, especially in the morning",
            "Some swelling after extended walking",
            "Fatigue in the calf area",
            "Tightness that improves as you move around",
            "Psychological nerves about upcoming changes"
          ]
        }
      ]
    },

    // Pre-Physiotherapy Preparation
    {
      type: "heading",
      level: 2,
      text: "Pre-Physiotherapy Preparation"
    },
    {
      type: "heading",
      level: 3,
      text: "What Physio Will Involve"
    },
    {
      type: "text",
      content: "Physiotherapy typically begins around weeks 9-12. Here's what to expect:"
    },
    {
      type: "text",
      content: "**Initial assessment:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your physiotherapist will examine your ankle range of motion",
        "They'll assess your calf strength (or lack thereof)",
        "They'll check your walking pattern",
        "They'll discuss your goals and timeline"
      ]
    },
    {
      type: "text",
      content: "**Early physiotherapy goals:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Restore ankle range of motion (gently!)",
        "Begin calf muscle activation",
        "Improve balance and proprioception (body awareness)",
        "Correct any gait abnormalities",
        "Build towards strengthening exercises"
      ]
    },
    {
      type: "text",
      content: "**What physio is NOT at this stage:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Aggressive stretching (the tendon will loosen naturally)",
        "Heavy calf raises or resistance exercises",
        "Running, jumping, or plyometrics",
        "Sports-specific training"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Finding the Right Physiotherapist"
    },
    {
      type: "text",
      content: "Not all physiotherapists have specific experience with Achilles ruptures. Finding one who does can make a significant difference."
    },
    {
      type: "text",
      content: "**What to look for:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Experience with Achilles ruptures specifically",
        "Sports medicine or orthopaedic focus",
        "Understanding of the healing timeline",
        "Good communication skills",
        "Availability that fits your schedule"
      ]
    },
    {
      type: "text",
      content: "**Questions to ask:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "\"How many Achilles rupture patients have you treated?\"",
        "\"What does your typical Achilles rehabilitation protocol look like?\"",
        "\"How do you approach the transition out of the boot?\"",
        "\"What are your thoughts on early stretching?\" (answer should be \"avoid it\")"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Setting Realistic Expectations"
    },
    {
      type: "text",
      content: "Understanding the timeline ahead helps prevent frustration."
    },
    {
      type: "table",
      headers: ["Timeline", "Milestone"],
      rows: [
        ["Weeks 10-12", "Transition out of boot, begin physiotherapy"],
        ["Months 3-4", "Building basic strength, walking normally"],
        ["Months 4-5", "Progressive strengthening, possibly light jogging"],
        ["Month 6", "Consideration of return to sport"],
        ["Month 12+", "Full recovery for most people"]
      ]
    },
    {
      type: "text",
      content: "**What affects your timeline:** Age (younger = generally faster recovery), pre-injury fitness level, compliance with rehabilitation, whether you had surgery, individual healing rate, quality of physiotherapy."
    },

    // Gentle Movement Exercises
    {
      type: "heading",
      level: 2,
      text: "Gentle Movement Exercises"
    },
    {
      type: "heading",
      level: 3,
      text: "Ankle Pumps and Circles (With Boot On)"
    },
    {
      type: "text",
      content: "These exercises help maintain circulation and prepare your ankle for the mobility work ahead."
    },
    {
      type: "card",
      title: "Ankle Pumps",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Sit with your leg extended (boot on)",
            "Gently flex your foot towards you, then point away",
            "Move only within the range your boot allows",
            "Perform 20-30 repetitions",
            "Do 3-4 times daily"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Ankle Circles",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Sit with leg extended or foot hanging slightly",
            "Draw small circles with your toes (clockwise and anticlockwise)",
            "Keep movements gentle and controlled",
            "10-15 circles each direction",
            "3-4 times daily"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "info",
      content: "**Important:** These exercises should NOT cause pain. If they do, stop and discuss with your medical team."
    },

    {
      type: "heading",
      level: 3,
      text: "Toe Curls and Scrunches"
    },
    {
      type: "text",
      content: "Maintaining the small muscles of your foot helps overall foot health."
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Toe curls:** Curl your toes down as if picking up a marble, hold 3-5 seconds, release and spread toes wide, repeat 15-20 times",
        "**Towel scrunches:** (if boot can be removed briefly) Place towel flat, use toes to scrunch it towards you, then push away"
      ]
    },

    // Practical Life
    {
      type: "heading",
      level: 2,
      text: "Practical Life at Weeks 7-9"
    },
    {
      type: "heading",
      level: 3,
      text: "Returning to Work Considerations"
    },
    {
      type: "text",
      content: "By weeks 7-9, many people are considering or have already returned to work."
    },
    {
      type: "card",
      title: "For Desk/Office Jobs",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Return possible within 2-4 weeks for many people",
            "Work from home may be easier initially",
            "Consider ergonomic setup (leg elevation, comfortable position)",
            "Plan for reduced productivity initially",
            "Build in rest breaks for walking and elevation"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "For Standing Jobs",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Return typically possible by weeks 6-8 with modifications",
            "May need to limit standing duration",
            "Ensure you can sit when needed",
            "Consider phased return (part-time to full-time)"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "For Physical/Manual Jobs",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Longer wait usually required (10-12+ weeks minimum)",
            "Full return may not be possible until 4-6 months",
            "Discuss with your doctor and employer",
            "Phased return on modified duties often helpful"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Workplace accommodations to request:** Parking closer to entrance, ground floor access or elevator, flexible schedule for appointments, ability to elevate leg at desk, reduced walking initially."
    },

    {
      type: "heading",
      level: 3,
      text: "Driving Guidelines"
    },
    {
      type: "text",
      content: "This is one of the most common questions during recovery."
    },
    {
      type: "card",
      title: "Right Leg Injured",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "You CANNOT drive while wearing the boot",
            "Do not attempt to drive until you are out of the boot",
            "Most protocols suggest week 10-12 at earliest for automatic cars",
            "May be later for manual transmission (clutch use)",
            "Get clearance from your medical team",
            "Check with your insurance company"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Left Leg Injured (Automatic Car Only)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Potentially possible earlier (some people by weeks 4-6)",
            "You must be able to control the vehicle safely",
            "Must not be impaired by pain medication",
            "The boot must not interfere with pedals",
            "Check with your insurance company",
            "Consider a short practice in a safe area first"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**When in doubt, don't drive.** The consequences of an accident far outweigh the inconvenience of not driving."
    },

    // Common Concerns
    {
      type: "heading",
      level: 2,
      text: "Common Concerns"
    },
    {
      type: "heading",
      level: 3,
      text: "\"My Tendon Feels Too Tight\" - Is This Normal?"
    },
    {
      type: "text",
      content: "**Yes, this is completely normal** and actually a GOOD sign."
    },
    {
      type: "text",
      content: "**Why tightness is good:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "It means your tendon has healed without excessive elongation",
        "The healing tissue is supposed to be tight initially",
        "Tightness will gradually reduce with time and proper rehabilitation",
        "A tight tendon is better than an elongated one"
      ]
    },
    {
      type: "dos-donts",
      dos: [
        "Let the tightness resolve naturally through active use",
        "Follow your physiotherapy exercises",
        "Be patient - it improves over weeks and months"
      ],
      donts: [
        "Stretch your Achilles aggressively",
        "Try to \"loosen it up\" yourself",
        "Use passive stretching devices",
        "Massage directly on the tendon"
      ]
    },
    {
      type: "text",
      content: "**The rule:** Avoid stretching for up to a year, or as long as your physiotherapist advises. Let the tendon adapt naturally through active use."
    },

    {
      type: "heading",
      level: 3,
      text: "Mental Preparation for Boot Removal"
    },
    {
      type: "text",
      content: "The transition out of the boot is both exciting and anxiety-provoking."
    },
    {
      type: "text",
      content: "**Common feelings:** Excitement at finally being \"free\", fear about walking without protection, anxiety about re-injury, uncertainty about the future, impatience to be \"normal\" again."
    },
    {
      type: "text",
      content: "**Preparing mentally:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Recognise that some anxiety is normal",
        "The transition will be gradual, not sudden",
        "Your physiotherapist will guide the process",
        "You can always put the boot back on if needed initially",
        "Thousands of people successfully make this transition"
      ]
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Weeks 7-9"
    },
    {
      type: "faq",
      items: [
        {
          question: "When exactly can I stop wearing the boot?",
          answer: "**Evidence-based protocols** recommend boot removal at **11-12 weeks** (not 8 weeks) for most people. This is based on force-based criteria - your tendon needs to be strong enough to handle walking forces (~1.5x body weight). Wait for specific instruction from your medical team - don't self-prescribe boot removal."
        },
        {
          question: "Can I start physiotherapy before week 9-10?",
          answer: "Some protocols include very gentle physiotherapy earlier. However, most structured rehabilitation programmes begin around weeks 9-12. Your specialist will guide the timing for your specific situation."
        },
        {
          question: "Is it normal to feel weaker than expected?",
          answer: "Absolutely. Your calf muscle has had 8-9 weeks of minimal use. Significant muscle atrophy (shrinkage) is normal and expected. This is exactly what physiotherapy will address."
        },
        {
          question: "Should I be worried if my tendon looks thicker than the other side?",
          answer: "No. A healed Achilles tendon is typically thicker than the original tendon - often significantly so. This is normal scar tissue and remodelling. It usually remains thicker permanently but this doesn't affect function."
        },
        {
          question: "Can I remove the boot for physiotherapy exercises?",
          answer: "Only if specifically instructed by your physiotherapist and with explicit approval from your orthopaedic team. Early physio exercises can often be done with the boot on or with a night splint as protection."
        },
        {
          question: "What if I can't find a physiotherapist with Achilles experience?",
          answer: "While Achilles-specific experience is ideal, a good general musculoskeletal or sports physiotherapist can treat you effectively by following evidence-based protocols. They may need to do some research, which is perfectly acceptable."
        },
        {
          question: "My other ankle/knee/hip/back still hurts - will this improve?",
          answer: "Usually, yes. Once you're out of the boot and walking normally, compensatory pain from asymmetrical movement typically resolves. If it persists, your physiotherapist can address these issues."
        },
        {
          question: "Is it okay to feel nervous about the next phase?",
          answer: "Completely normal. Moving from the protected boot phase to active rehabilitation is a significant psychological transition. Acknowledge your feelings, seek support if needed, and trust the process."
        }
      ]
    },

    // Summary Checklist
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Weeks 7-9 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Remove final wedges according to schedule", checked: false },
        { text: "Continue wearing boot 24/7 until told otherwise", checked: false },
        { text: "Maintain blood thinners if still prescribed", checked: false },
        { text: "Research and book physiotherapy", checked: false },
        { text: "Purchase transition supplies (bands, shoes, heel lifts)", checked: false },
        { text: "Practice gentle ankle exercises (pumps, circles, toe work)", checked: false },
        { text: "Plan return to work if applicable", checked: false },
        { text: "Know driving guidelines for your situation", checked: false },
        { text: "Monitor for warning signs", checked: false },
        { text: "Prepare mentally for boot transition", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Remember:** You've come a long way. The finish line of boot-wearing is in sight. Stay focused, stay compliant, and get ready for the active phase of your recovery."
    }
  ]
};
