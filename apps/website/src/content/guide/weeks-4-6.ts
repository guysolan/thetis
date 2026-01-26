import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-4-6",
  title: "Weeks 4-6: Progressive Recovery",
  description: "Complete guide to weeks 4-6 of Achilles rupture recovery. Learn about wedge removal progression, the proliferative healing phase, night splint benefits, walking improvement, and managing common challenges.",
  phase: "weeks-4-6",
  weekRange: "Weeks 4-6",
  highlights: [
    "Wedge removal schedule",
    "Understanding tendon healing",
    "Walking progression",
    "Night splint usage"
  ]
};

export const content: GuideContent = {
  intro: "You've made it through the initial shock and the treatment decision. Now you're in the phase where real progress becomes visible. Weeks 4-6 are about gradual progression: removing wedges, improving your walking, and starting to feel more like yourself again. But these weeks also require continued vigilance - your tendon is still healing and remains vulnerable.",

  blocks: [
    // Understanding Your Healing Tendon
    {
      type: "heading",
      level: 2,
      text: "Understanding Your Healing Tendon"
    },
    {
      type: "heading",
      level: 3,
      text: "What's Happening Inside Your Achilles (Proliferative Phase)"
    },
    {
      type: "text",
      content: "By weeks 4-6, your tendon has moved from the initial inflammatory phase into the **proliferative phase** of healing. Here's what's happening at the cellular level:"
    },
    {
      type: "card",
      title: "The Proliferative Phase",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Fibroblasts (healing cells) have migrated to the injury site",
            "They're producing new collagen to bridge the gap between tendon ends",
            "This new collagen is primarily **Type III** - weaker and less organised than normal tendon",
            "New blood vessels are forming to supply nutrients",
            "A temporary tissue called \"granulation tissue\" is filling the gap"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**What this means for you:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The tendon is getting stronger each day, but it's still fragile",
        "The new tissue is like a patch - functional but not yet as strong as the original",
        "Proper positioning (maintaining equinus) is still crucial",
        "The healing tissue is responsive to how you use it - controlled stress helps it organise"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Why These Weeks Are Critical for Tendon Length"
    },
    {
      type: "alert",
      variant: "warning",
      title: "Key Concept",
      content: "**Tendon elongation is THE biggest problem** affecting long-term recovery from Achilles rupture. If your tendon heals too elongated (stretched), you'll permanently lose push-off power. Research shows elongation is more important than re-rupture risk (which is low at 2-4%)."
    },
    {
      type: "text",
      content: "**How elongation happens:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Can occur at surgery (if positioned incorrectly)",
        "During boot immobilization (if foot position isn't maintained)",
        "After boot removal when walking (if tendon isn't strong enough)",
        "Throughout the first 12 months - it's a \"plastic\" process that can go either way"
      ]
    },
    {
      type: "card",
      title: "Critical Window",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Up to 16 weeks:** Elongation can be reversed with proper loading",
            "**After 16-20 weeks:** Tendon becomes stiffer, much harder to reverse elongation",
            "This is why your protocol might keep you in the boot longer and delay wedge removal"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Prevention strategies:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Keep your boot on at all times (24/7)",
        "Follow the wedge removal schedule exactly - don't speed up",
        "Your protocol may delay wedges (6-7 weeks, 8-9 weeks, 10-11 weeks instead of 4, 6, 8)",
        "Early aggressive strengthening in safe positions (plantarflexion) helps",
        "Protected walking after boot removal (heel wedge, reduced step length)",
        "**Never stretch your Achilles during this phase**"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "The Danger of Cutting Corners"
    },
    {
      type: "text",
      content: "You're probably feeling much better by now. The initial pain is gone, you're walking more confidently, and it's tempting to think you can speed things up. **Don't.**"
    },
    {
      type: "quote",
      text: "Recovery is a game of Snakes and Ladders: Each week sees you climbing closer to the finish. But one mistake - one moment of unprotected dorsiflexion, one premature wedge removal, one slip without your boot - is like landing on the big snake that takes you right back to the beginning."
    },
    {
      type: "text",
      content: "**What \"cutting corners\" looks like:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Taking the boot off \"just for a minute\"",
        "Removing wedges before scheduled",
        "Walking without the boot to \"test\" your ankle",
        "Stretching or massaging the tendon",
        "Ignoring swelling or pain signals"
      ]
    },
    {
      type: "alert",
      variant: "danger",
      content: "**The reality:** A few weeks of careful compliance now means a lifetime of full function. A few minutes of impatience could mean permanent limitations."
    },

    // Wedge Removal Protocol
    {
      type: "heading",
      level: 2,
      text: "Wedge Removal Protocol"
    },
    {
      type: "heading",
      level: 3,
      text: "When and How Wedges Are Removed"
    },
    {
      type: "text",
      content: "Wedge removal is an exciting milestone - each wedge removed means you're getting closer to a neutral foot position and, eventually, life without the boot."
    },
    {
      type: "card",
      title: "Traditional Accelerated Protocol",
      variant: "muted",
      content: [
        {
          type: "table",
          headers: ["Week", "Wedges", "Angle", "Notes"],
          rows: [
            ["0-2", "4 wedges", "~28-30°", "Maximum protection"],
            ["3-4", "3 wedges", "~22°", "First reduction"],
            ["5-6", "2 wedges", "~16°", "**You are here**"],
            ["7-8", "1 wedge", "~10°", "Approaching neutral"],
            ["9-10", "0 wedges", "Neutral", "Final boot phase"]
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Evidence-Based Elongation-Focused Protocol (Increasingly Used)",
      variant: "highlight",
      content: [
        {
          type: "table",
          headers: ["Week", "Wedges", "Angle", "Notes"],
          rows: [
            ["0-6", "4 wedges", "~28-30°", "Maximum protection (longer)"],
            ["6-7", "3 wedges", "~22°", "First reduction (delayed)"],
            ["8-9", "2 wedges", "~16°", "Second reduction"],
            ["10-11", "1 wedge", "~10°", "Approaching neutral"],
            ["11-12", "0 wedges", "Neutral", "Before removal"]
          ]
        }
      ]
    },
    {
      type: "tip",
      title: "Why the Delay?",
      content: "Research shows that keeping your foot more pointed down for longer helps prevent tendon elongation (stretching), which is the biggest problem affecting long-term recovery. This protocol is more cautious with wedge removal but more aggressive with early strengthening exercises."
    },
    {
      type: "text",
      content: "**How to remove wedges:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Open your boot",
        "Locate the wedges under your heel",
        "Remove the top wedge only (usually marked or colour-coded)",
        "Ensure remaining wedges are flat and stable",
        "Re-secure your boot snugly"
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "**Important:** Always remove wedges at your scheduled time - not earlier, even if you feel ready. Always follow your specific protocol from your hospital."
    },

    {
      type: "heading",
      level: 3,
      text: "What to Expect as Your Foot Position Changes"
    },
    {
      type: "text",
      content: "As your foot gradually moves towards neutral, you'll notice changes:"
    },
    {
      type: "text",
      content: "**Physical changes:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your gait will feel different as your ankle angle changes",
        "Initial slight discomfort or \"pulling\" sensation (normal)",
        "Improved ability to walk more naturally",
        "Calf muscle may feel tighter"
      ]
    },
    {
      type: "text",
      content: "**What's NOT normal (contact your medical team):**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Sharp pain during wedge removal or afterwards",
        "Sudden increase in swelling",
        "A \"pop\" or snapping sensation",
        "Feeling like the tendon has \"given way\""
      ]
    },

    // Walking Progress
    {
      type: "heading",
      level: 2,
      text: "Walking Progress"
    },
    {
      type: "heading",
      level: 3,
      text: "Full Weight-Bearing Guidelines"
    },
    {
      type: "text",
      content: "By weeks 4-6, most people are fully weight-bearing in their boot. This means putting your full body weight through the boot when walking."
    },
    {
      type: "text",
      content: "**How to walk well in the boot:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Heel strike first (just like normal walking)",
        "Roll through the foot",
        "Push off gently (the boot limits this anyway)",
        "Keep your stride length comfortable - don't overreach",
        "Maintain an upright posture"
      ]
    },
    {
      type: "text",
      content: "**Common mistakes:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Limping or avoiding loading the injured side",
        "Taking very short steps",
        "Leaning away from the injured side",
        "Walking on tiptoes on the other foot",
        "Rushing or moving too quickly"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Using the EVENup to Protect Your Back and Hips"
    },
    {
      type: "text",
      content: "The EVENup shoe leveler is one of the most important purchases you can make during boot wearing."
    },
    {
      type: "text",
      content: "**Why you need it:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your boot adds 3-5cm of height to one leg",
        "This creates uneven hips during walking",
        "Over time, this causes back, hip, and knee pain",
        "The EVENup equalises your leg length"
      ]
    },
    {
      type: "text",
      content: "**Results:** More comfortable walking, less back and hip pain, more natural gait pattern, reduced fatigue."
    },

    // Night Splint Transition
    {
      type: "heading",
      level: 2,
      text: "The Night Splint Transition"
    },
    {
      type: "heading",
      level: 3,
      text: "When to Start Using a Night Splint"
    },
    {
      type: "text",
      content: "If you haven't already, weeks 4-6 is typically when you can transition from sleeping in your boot to using a night splint."
    },
    {
      type: "text",
      content: "**Prerequisites for using a night splint:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Your specialist has approved its use",
        "Any surgical wounds are fully healed (usually 2-3 weeks post-surgery)",
        "You understand correct application",
        "You have an Achilles-specific night splint (not a plantar fasciitis splint!)"
      ]
    },
    {
      type: "card",
      title: "The Thetis Night Splint",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Purpose-designed for Achilles tendon rupture",
            "Holds your foot in plantarflexion (pointed down) - the safe position",
            "Lightweight and breathable",
            "Can be adjusted as you progress"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "danger",
      title: "Important Warning",
      content: "Generic \"night splints\" sold for plantar fasciitis hold your foot in dorsiflexion (toes pointing up). This is the OPPOSITE of what you need and could seriously damage your healing tendon. Only use a splint specifically designed for Achilles rupture."
    },

    {
      type: "heading",
      level: 3,
      text: "Benefits Over Sleeping in the Boot"
    },
    {
      type: "text",
      content: "Switching from the boot to a night splint for sleeping can dramatically improve your quality of life:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Comfort:** Much lighter weight, more breathable, less sweating",
        "**Sleep quality:** Easier to fall asleep, fewer wake-ups, better overall rest",
        "**Practical:** Boot lasts longer, stays cleaner, easier to get comfortable",
        "Doesn't damage or dirty your sheets",
        "Allows more natural sleeping positions"
      ]
    },
    {
      type: "quote",
      text: "Switching to the night splint was life-changing. I finally got a proper night's sleep after weeks of struggling in the boot."
    },
    {
      type: "text",
      content: "**Safety rules:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Never walk in the night splint** - it's for lying down only",
        "Keep your boot next to the bed",
        "If you need to get up at night, put the boot back on first",
        "Don't use the splint until approved by your specialist"
      ]
    },

    // Common Challenges
    {
      type: "heading",
      level: 2,
      text: "Common Challenges in Weeks 4-6"
    },
    {
      type: "heading",
      level: 3,
      text: "Swelling Management"
    },
    {
      type: "text",
      content: "Swelling often increases during weeks 4-6 as you become more active. This is normal but should be managed."
    },
    {
      type: "text",
      content: "**How to manage swelling:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Elevation:** Still important - elevate after walking and in the evening",
        "**Ice:** Can still be helpful after periods of activity",
        "**Compression:** Your boot provides some compression",
        "**Activity modification:** If swelling is excessive, reduce walking temporarily",
        "**Monitoring:** Track swelling patterns to understand your limits"
      ]
    },
    {
      type: "text",
      content: "**When to be concerned:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Sudden increase in swelling (could indicate DVT)",
        "Swelling accompanied by increased pain, redness, or warmth",
        "Swelling that doesn't improve with elevation overnight",
        "Asymmetric swelling compared to your other leg"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Skin Care Under the Boot"
    },
    {
      type: "text",
      content: "After weeks in a boot, skin problems are common but preventable."
    },
    {
      type: "text",
      content: "**Common issues:** Dry, flaky skin; pressure marks from straps; heat rash; fungal infections (especially between toes); minor blisters or rubbing."
    },
    {
      type: "text",
      content: "**Prevention and treatment:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Daily skin checks:** Remove boot briefly to inspect skin (quickly and carefully)",
        "**Moisturise:** Use a non-fragranced moisturiser on dry areas (not between toes)",
        "**Antifungal powder:** Apply between toes and to the foot to prevent fungal growth",
        "**Clean socks:** Change your sock daily; use moisture-wicking materials",
        "**Adjust straps:** Ensure straps aren't too tight or positioned on bony prominences",
        "**Keep it dry:** Use a towel to dab away sweat"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Dealing with \"Hot Foot\" and Hygiene"
    },
    {
      type: "text",
      content: "One of the most common complaints is that the boot makes your foot hot and sweaty."
    },
    {
      type: "text",
      content: "**Solutions:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Merino wool socks** are excellent (moisture-wicking and temperature-regulating)",
        "Thin, breathable socks work well",
        "Change socks at least daily",
        "Avoid thick cotton socks (they hold moisture)",
        "When resting with boot off briefly, let your foot air out",
        "Use a fan to cool your foot when stationary"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Mental Health and Frustration"
    },
    {
      type: "text",
      content: "Weeks 4-6 can be mentally challenging. The initial \"drama\" of the injury has passed, but you're still very restricted."
    },
    {
      type: "text",
      content: "**Common feelings:** Frustration at the slow pace of recovery, cabin fever from reduced mobility, anxiety about the future, guilt about relying on others, low mood, boredom."
    },
    {
      type: "text",
      content: "**Coping strategies:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Acknowledge your feelings:** It's normal to struggle. This is a significant life event.",
        "**Set small goals:** Focus on weekly progress rather than the final destination.",
        "**Stay connected:** Talk to friends, family, or online communities.",
        "**Maintain routine:** Structure your day even if you're not working.",
        "**Find seated hobbies:** Reading, puzzles, gaming, crafts, online courses.",
        "**Stay as active as possible:** Upper body exercises, seated movements.",
        "**Seek help if needed:** If you're struggling significantly, talk to your GP."
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Remember:** This phase is temporary. You will recover. Many people come through Achilles rupture with a renewed appreciation for their mobility and health."
    },

    // Early Strengthening Exercises
    {
      type: "heading",
      level: 2,
      text: "Early Strengthening Exercises (Evidence-Based Approach)"
    },
    {
      type: "heading",
      level: 3,
      text: "Why Early Loading Matters"
    },
    {
      type: "text",
      content: "Modern research shows that **aggressive loading early in safe positions** (with your foot pointed down) helps strengthen the tendon and prevent elongation. This is done OUT of the boot for exercises, but the boot goes back on immediately after."
    },
    {
      type: "tip",
      title: "The Key Principle",
      content: "Load the tendon in plantarflexion (pointed down) - you cannot re-rupture in this position. This builds strength while protecting the healing tissue."
    },

    {
      type: "heading",
      level: 3,
      text: "Seated Calf Raises (Week 2-3 Onwards)"
    },
    {
      type: "text",
      content: "**What this involves:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Remove boot briefly for exercises only (boot stays on for everything else)",
        "Sit in a chair with your foot flat on the floor",
        "Place weight on your knee (start with 10-15kg, progress to 0.8-1x your body weight)",
        "Push through your big toe and lift your heel",
        "Hold at the top, then lower slowly",
        "This creates ~2x body weight force in your Achilles tendon (due to lever mechanics)"
      ]
    },
    {
      type: "text",
      content: "**Progression:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Week 2-3: Body weight only, get used to the movement",
        "Week 3+: Add weight gradually (10kg, 15kg, 20kg...)",
        "**Target:** 0.8-1x body weight on your knee by weeks 8-10",
        "This prepares your tendon for walking (which requires ~1.5x body weight force)"
      ]
    },
    {
      type: "text",
      content: "**Safety:** Always done seated, foot pointed down, with supervision initially. Your specialist will guide you on when to start and how to progress."
    },

    {
      type: "heading",
      level: 3,
      text: "Maintaining Upper Body and Core Strength"
    },
    {
      type: "text",
      content: "Don't let the rest of your body decline while your ankle heals."
    },
    {
      type: "text",
      content: "**Upper body exercises:** Seated bicep curls, seated shoulder press, resistance band rows, wall push-ups, tricep dips using a sturdy chair."
    },
    {
      type: "text",
      content: "**Core exercises:** Seated core rotations, pelvic tilts, modified planks, seated oblique twists, breathing exercises for deep core activation."
    },
    {
      type: "text",
      content: "**Why this matters:** Maintains overall fitness, prevents muscle loss, improves mood, makes later rehabilitation easier, helps maintain a healthy weight."
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Weeks 4-6"
    },
    {
      type: "faq",
      items: [
        {
          question: "My calf feels very tight - should I stretch it?",
          answer: "**No!** Do not stretch your calf or Achilles tendon. The tightness you're feeling is the healing tissue, and it SHOULD be tight. Stretching could elongate the tendon or even cause re-rupture. The tightness will gradually reduce naturally with time and proper rehabilitation (starting later)."
        },
        {
          question: "How much walking is too much?",
          answer: "Listen to your body. Signs you're doing too much: swelling that doesn't resolve overnight with elevation, increasing pain or discomfort, exhaustion, visible limping. Start with 5-10 minute walks and gradually increase. Rest days are okay."
        },
        {
          question: "Can I remove the boot to shower now?",
          answer: "This depends on your specific protocol. Some people can briefly remove the boot for showering if they keep the foot completely still, don't put weight through it, are extremely careful not to bend the ankle up, and their specialist has approved it. If in doubt, continue using a waterproof cover."
        },
        {
          question: "Is it normal to feel nervous about removing wedges?",
          answer: "Yes, this is very common. The boot has been your safety net, and each change can feel scary. Trust the process - the wedge removal schedule is designed to be gradual and safe."
        },
        {
          question: "My other knee/hip/back is hurting - is this normal?",
          answer: "Unfortunately, yes. Walking asymmetrically in a boot commonly causes compensatory pain. Solutions: use an EVENup shoe leveler, take rest breaks, don't overdo distances, use good walking technique, consider seeing a physiotherapist."
        },
        {
          question: "When can I drive?",
          answer: "**Right leg injured:** You cannot drive until you're out of the boot and cleared by your medical team (typically week 10-12 at earliest). **Left leg injured (automatic car):** Some people can drive once confident and comfortable, but check with your insurance company and medical team first."
        },
        {
          question: "Can I travel by plane?",
          answer: "Flying with an Achilles rupture is possible but requires precautions: higher DVT risk (take blood thinners as prescribed), move feet and ankles regularly, stay hydrated, request an aisle seat, inform the airline, consider compression stockings. Short flights are generally fine; long-haul requires more planning."
        }
      ]
    },

    // Summary Checklist
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Weeks 4-6 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Follow wedge removal schedule exactly - don't speed up", checked: false },
        { text: "Wear boot 24/7 (or night splint for sleeping if approved)", checked: false },
        { text: "Continue blood thinners if prescribed", checked: false },
        { text: "Use EVENup shoe leveler when walking", checked: false },
        { text: "Manage swelling with elevation and monitoring", checked: false },
        { text: "Practice good skin hygiene in the boot", checked: false },
        { text: "Start gentle in-boot exercises if prescribed", checked: false },
        { text: "Maintain upper body and core strength", checked: false },
        { text: "Address mental health needs", checked: false },
        { text: "Prepare for physio (research providers, prepare questions)", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Remember:** These weeks are about steady, consistent progress. Trust the timeline, protect your tendon, and keep moving forward."
    }
  ]
};
