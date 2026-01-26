import type { GuideMetadata, GuideContent } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "weeks-1-3",
  title: "Weeks 1-3: Treatment Decision",
  description: "Complete guide to weeks 1-3 of Achilles rupture recovery. Learn about surgery vs non-surgical treatment, walking boots (Aircast vs VACOped), the UKSTAR trial findings, and essential equipment.",
  phase: "weeks-1-3",
  weekRange: "Weeks 1-3",
  highlights: [
    "Surgery vs non-surgical decision",
    "Walking boot fitting",
    "Understanding wedges",
    "Night splint introduction"
  ]
};

export const content: GuideContent = {
  intro: "You've survived the first chaotic days after your Achilles rupture. Now comes one of the most important decisions in your recovery: surgery or non-surgical treatment? This guide will help you understand your options, what happens at your specialist appointment, and how to set yourself up for success in these crucial early weeks.",

  blocks: [
    // The Specialist Consultation
    {
      type: "heading",
      level: 2,
      text: "The Specialist Consultation"
    },
    {
      type: "heading",
      level: 3,
      text: "What Happens at Your Orthopaedic Appointment"
    },
    {
      type: "text",
      content: "Your specialist appointment (typically at a fracture clinic or orthopaedic outpatients) is a pivotal moment in your recovery. Here's what to expect:"
    },
    {
      type: "card",
      title: "Before the Appointment",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Bring someone with you if possible - there's a lot of information to absorb",
            "Write down any questions you have",
            "Be prepared to discuss your activity level, occupation, and recovery goals",
            "Wear loose trousers or shorts for easy examination"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**During the appointment:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**History review:** The specialist will ask about how the injury happened, your symptoms, and your general health",
        "**Physical examination:** They'll examine your ankle, feel for the gap in the tendon, and perform specific tests",
        "**Discussion of findings:** You'll learn about the severity of your rupture and treatment options",
        "**Treatment decision:** Together, you'll decide on the best approach for you",
        "**Boot fitting:** If you're not already in a boot, you'll likely be fitted for one",
        "**Follow-up plan:** You'll receive a schedule of appointments and rehabilitation milestones"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Physical Examination: The Thompson/Simmonds Test"
    },
    {
      type: "text",
      content: "The Thompson test (also called the Simmonds test) is the key clinical test for Achilles rupture:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "You lie face-down on the examination couch with your feet hanging off the end",
        "The doctor squeezes your calf muscle firmly",
        "In a healthy tendon, this makes your foot point downward (plantarflex)",
        "In a ruptured tendon, the foot barely moves or doesn't move at all"
      ]
    },
    {
      type: "text",
      content: "**Other examination findings:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "A palpable gap in the tendon (you can often feel this yourself)",
        "Increased passive dorsiflexion (your foot can be pushed up more than normal)",
        "Weakness when trying to point your toes",
        "Swelling and bruising around the heel and ankle"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Imaging - Ultrasound vs MRI (When and Why)"
    },
    {
      type: "text",
      content: "Not everyone needs imaging, but it's increasingly common and can be very helpful:"
    },
    {
      type: "card",
      title: "Ultrasound (Most Common)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Quick, painless, and widely available",
            "Shows whether the tendon ends are close together or have a gap",
            "Helps determine if non-surgical treatment is suitable",
            "Can check for blood clots in the leg veins at the same time",
            "Cost-effective"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "MRI (Less Common)",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Provides more detailed images",
            "Usually reserved for complex cases or when ultrasound is inconclusive",
            "Takes longer and may have waiting lists",
            "Used more frequently in the USA (70% of cases) than the UK (15% of cases)"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Key information from imaging:** The size of any gap between tendon ends, whether the tendon ends will come together in a pointed foot position, and the overall quality of the tendon tissue."
    },
    {
      type: "text",
      content: "If ultrasound shows the tendon ends come together well when your foot is pointed down, non-surgical treatment is usually an excellent option."
    },

    {
      type: "heading",
      level: 3,
      text: "What Does \"a 4cm Gap\" Actually Mean?"
    },
    {
      type: "text",
      content: "Patients often hear a number like **\"4cm gap\"** and understandably panic. Here's the plain-English version:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The Achilles tendon has torn and the two ends can sit apart — like the ends of a snapped rope",
        "On ultrasound, the clinician may measure the distance between the ends and describe it as a \"gap\"",
        "**That number can change depending on foot position.** If your foot is scanned more neutral vs more pointed down, the ends can look further apart or closer together"
      ]
    },
    {
      type: "tip",
      title: "The Practical Question to Ask",
      content: "\"Does the gap close (or mostly close) when my foot is pointed down in the boot/cast position?\" Gap size is one factor in the decision, but it's not the only one. Your specialist will weigh it alongside your activity goals, tendon quality, and the overall risk/benefit of surgery vs non-surgical care."
    },

    // Surgery vs Non-Surgical
    {
      type: "heading",
      level: 2,
      text: "Surgery vs Non-Surgical Treatment - The Facts"
    },
    {
      type: "text",
      content: "This is the big question. Let's break down what the evidence actually says."
    },

    {
      type: "heading",
      level: 3,
      text: "What Does Surgery Involve?"
    },
    {
      type: "text",
      content: "Surgical repair of the Achilles tendon involves:"
    },
    {
      type: "card",
      title: "The Procedure",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "General or regional anaesthesia",
            "An incision at the back of the ankle (3-10cm depending on technique)",
            "The torn tendon ends are stitched back together",
            "The wound is closed and dressed",
            "You're placed in a cast or boot"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**Types of surgery:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Open repair:** Traditional approach with a longer incision (~80% of UK surgeries)",
        "**Minimally invasive/percutaneous:** Smaller incisions with special instruments (~20% and growing)"
      ]
    },
    {
      type: "text",
      content: "**Recovery after surgery:** 1-2 weeks in a cast, then a walking boot. Same rehabilitation protocol as non-surgical treatment. Total recovery time: 6-12 months (same as non-surgical)."
    },
    {
      type: "card",
      title: "Risks of Surgery",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Wound infection (2-4%)",
            "Wound healing problems",
            "Nerve damage causing numbness",
            "Sural nerve injury",
            "Blood clots",
            "Scar tissue",
            "Re-rupture (still possible, though slightly lower rate)"
          ]
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "What Does Non-Surgical Treatment Involve?"
    },
    {
      type: "card",
      title: "The Approach",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Wearing a walking boot with heel wedges for approximately 10 weeks",
            "The foot is initially held in a pointed position (equinus)",
            "Wedges are gradually removed to bring the foot towards neutral",
            "Weight-bearing is encouraged from early on",
            "Physiotherapy typically starts around weeks 9-12"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**How it works:** The tendon ends heal naturally when held in the right position. The body forms scar tissue that bridges the gap. This healed tendon is just as strong as a surgically repaired one."
    },
    {
      type: "card",
      title: "Benefits of Non-Surgical Treatment",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "No surgical risks (infection, wound problems, nerve damage)",
            "No anaesthesia required",
            "Often faster initial recovery",
            "Lower overall complication rate",
            "Equally good long-term outcomes for most people"
          ]
        }
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Re-rupture Rates: The Real Numbers (2-4% Overall)"
    },
    {
      type: "text",
      content: "This is where the numbers get interesting:"
    },
    {
      type: "alert",
      variant: "info",
      title: "Modern Evidence Shows",
      content: "**Overall re-rupture rates are LOW: 2-4%** regardless of surgery or non-surgery. This is very different from ACL injuries (20% re-rupture rate). The difference between surgical and non-surgical re-rupture rates is small. **Re-rupture is NOT the main problem** - elongation is the bigger concern."
    },
    {
      type: "text",
      content: "**When re-rupture typically occurs:**"
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Early rehab period (weeks 0-8):** Non-adherence to advice (taking boot off, walking without boot), getting into dorsiflexion too early (especially with speed and eccentric contraction)",
        "**When first coming out of boot (weeks 10-12):** After 8-12 weeks in boot, patients think \"we're done\", try to walk normally too quickly, tendon hasn't developed enough strength yet"
      ]
    },
    {
      type: "text",
      content: "**The key message:** Re-rupture rates are very low regardless of treatment choice. The bigger focus should be on preventing elongation (tendon stretching), which is the real problem affecting long-term recovery."
    },
    {
      type: "text",
      content: "**Key factors that reduce re-rupture risk:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Early functional weight-bearing in a boot (not prolonged casting)",
        "Proper boot positioning (maintaining equinus/pointed position)",
        "Compliance with wearing the boot 24/7",
        "Following the rehabilitation protocol carefully",
        "Not rushing boot removal (wait until tendon is strong enough)",
        "Not rushing back to high-impact activities"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "The UKSTAR Trial - What It Proved"
    },
    {
      type: "text",
      content: "The UKSTAR trial (UK Study of Treatment for Acute Achilles Tendon Rupture) was a landmark study that changed how we treat Achilles ruptures."
    },
    {
      type: "text",
      content: "**What the trial found** (comparing plaster casting vs functional bracing with early weight-bearing):"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**No significant difference** in long-term outcomes between surgical and non-surgical treatment",
        "Functional bracing allowed faster return to normal activities",
        "Lower complication rates with non-surgical treatment",
        "Significant cost savings with non-surgical approach"
      ]
    },
    {
      type: "quote",
      text: "Early weight-bearing in a functional brace is a safe and cost-effective alternative to plaster casting",
      author: "UKSTAR Trial, Lancet 2020"
    },
    {
      type: "text",
      content: "**What this means for you:** Non-surgical treatment with a walking boot is the first-line treatment for most people. Surgery is reserved for specific circumstances. Early weight-bearing and functional rehabilitation are key to success."
    },

    // Walking Boot Section
    {
      type: "heading",
      level: 2,
      text: "Your Walking Boot - The Foundation of Recovery"
    },
    {
      type: "heading",
      level: 3,
      text: "Aircast vs VACOped - Which Boot is Best?"
    },
    {
      type: "text",
      content: "The two most common boots are the Aircast and VACOped. Both can provide excellent outcomes, but they work differently."
    },
    {
      type: "table",
      headers: ["Feature", "Aircast", "VACOped"],
      rows: [
        ["Mechanism", "Fixed wedges removed over time", "Hinged, adjustable range of motion"],
        ["Cost", "£121-150 (+ £20-25 for wedges)", "£300-375"],
        ["Availability", "Widely available", "Limited to some centres"],
        ["Ankle position", "~28° plantarflexion", "~48° plantarflexion"],
        ["Waterproof", "No - needs a cover", "Yes (with liner modification)"]
      ]
    },
    {
      type: "card",
      title: "Aircast Pros & Cons",
      variant: "muted",
      content: [
        {
          type: "text",
          content: "**Pros:** Lightweight, inexpensive, easy to adjust, widely used and familiar to clinicians"
        },
        {
          type: "text",
          content: "**Cons:** May not achieve optimal ankle positioning, fixed positions between wedge changes, not waterproof, can cause some gait abnormalities"
        }
      ]
    },
    {
      type: "card",
      title: "VACOped Pros & Cons",
      variant: "muted",
      content: [
        {
          type: "text",
          content: "**Pros:** Potentially better ankle positioning, allows controlled movement within safe range, may preserve muscle better, waterproof capability, more natural walking pattern (once hinge unlocked)"
        },
        {
          type: "text",
          content: "**Cons:** Expensive, more complex to adjust, not available everywhere, thicker base can feel awkward"
        }
      ]
    },
    {
      type: "alert",
      variant: "info",
      title: "The Bottom Line",
      content: "Both boots can produce excellent outcomes. Use whatever your hospital provides and follow the protocol carefully. The commitment to wearing it properly matters more than which brand you have."
    },

    {
      type: "heading",
      level: 3,
      text: "Understanding Wedges and Angle Progression"
    },
    {
      type: "text",
      content: "Your foot needs to be held in a pointed position (plantarflexion/equinus) to allow the tendon to heal at the correct length."
    },
    {
      type: "table",
      headers: ["Week", "Aircast Wedges", "Approximate Angle"],
      rows: [
        ["0-2", "4 wedges", "~28-30°"],
        ["3-4", "3 wedges", "~22°"],
        ["5-6", "2 wedges", "~16°"],
        ["7-8", "1 wedge", "~10°"],
        ["9-10", "0 wedges", "Neutral"]
      ]
    },
    {
      type: "text",
      content: "**Why this matters:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Too much angle = foot pointed too far down, uncomfortable but safe",
        "Too little angle = tendon ends not close together, risk of elongation",
        "**It's better to be too pointed than not enough**"
      ]
    },
    {
      type: "alert",
      variant: "warning",
      content: "Your specialist will give you a specific schedule for wedge removal. Follow it exactly."
    },

    {
      type: "heading",
      level: 3,
      text: "Fitting Your Boot Correctly"
    },
    {
      type: "text",
      content: "A properly fitted boot is essential. Here's what to check:"
    },
    {
      type: "text",
      content: "**Sizing:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The boot should fit snugly without being tight",
        "Your toes should not press against the front",
        "The heel should sit securely in the heel cup",
        "Most boots come in S/M/L sizes"
      ]
    },
    {
      type: "text",
      content: "**Strap tension:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Straps should be firm but not cutting off circulation",
        "You should be able to slide one finger under each strap",
        "Re-tighten straps throughout the day as needed"
      ]
    },
    {
      type: "text",
      content: "**Wedge placement:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Wedges go under the heel, not the whole foot",
        "Stack them according to your protocol",
        "Make sure they're secure and not shifting"
      ]
    },
    {
      type: "text",
      content: "**Common problems:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Foot sliding forward = straps too loose or wedges incorrectly placed",
        "Toe pain = foot sliding or boot too small",
        "Pressure sores = straps too tight or poor fit"
      ]
    },

    // Living with Your Boot
    {
      type: "heading",
      level: 2,
      text: "Living with Your Boot - Weeks 1-3"
    },
    {
      type: "heading",
      level: 3,
      text: "Learning to Walk with Crutches and Boot"
    },
    {
      type: "text",
      content: "In weeks 1-3, you'll be getting used to walking in your boot, likely still with crutches for support."
    },
    {
      type: "text",
      content: "**Walking technique:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Most protocols allow partial weight-bearing from early on",
        "Use crutches for balance and support, not to keep all weight off",
        "Aim for a heel-to-toe rolling motion",
        "Keep the boot on for all walking - no exceptions"
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
        "Week 1-2: Crutches with light weight-bearing",
        "Week 2-3: Gradually increasing weight through the boot",
        "By week 3-4: Many people can walk without crutches (but keep them handy)"
      ]
    },
    {
      type: "text",
      content: "**Tips:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Start with short distances and build up",
        "Rest when you need to",
        "Swelling after walking is normal - elevate afterwards",
        "Use a shoe leveler on your other foot to prevent back pain"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "Weight-Bearing Guidelines"
    },
    {
      type: "text",
      content: "Weight-bearing protocols vary between hospitals, but the trend is towards early weight-bearing because research shows it improves outcomes."
    },
    {
      type: "text",
      content: "**Common approaches:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Immediate weight-bearing as tolerated:** Put as much weight through the boot as feels comfortable",
        "**Progressive weight-bearing:** Start at 25%, increase to 50%, then full weight over 2-4 weeks",
        "**Non-weight-bearing then progression:** Some older protocols still use this"
      ]
    },
    {
      type: "text",
      content: "**What \"weight-bearing as tolerated\" means:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Listen to your body",
        "Some discomfort is normal; sharp pain is not",
        "Use crutches for balance and confidence",
        "Gradually put more weight through as you feel ready"
      ]
    },
    {
      type: "text",
      content: "**Signs you're progressing well:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Decreasing reliance on crutches",
        "Increasing walking distance",
        "Swelling manageable with elevation",
        "No sharp pain"
      ]
    },

    {
      type: "heading",
      level: 3,
      text: "The Importance of 24/7 Protection"
    },
    {
      type: "alert",
      variant: "danger",
      content: "This cannot be emphasised enough: **Your boot must be worn 24 hours a day, 7 days a week** during these early weeks."
    },
    {
      type: "text",
      content: "**Why 24/7 protection matters:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "One moment of unprotected dorsiflexion (foot bending up) can pull the healing tendon ends apart",
        "This could cause the tendon to heal elongated (stretched out), reducing your final power",
        "**Elongation is the biggest problem** affecting long-term recovery - more important than re-rupture risk",
        "In the worst case, it could cause a re-rupture"
      ]
    },
    {
      type: "text",
      content: "**The only exceptions:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Showering (with specialist approval and extreme caution)",
        "**Early strengthening exercises** (when prescribed, typically from week 2-3 onwards) - done OUT of the boot briefly, in a safe position (foot pointed down), boot goes back on immediately after",
        "Using a night splint (when approved by your specialist)"
      ]
    },
    {
      type: "quote",
      text: "Recovery is like Snakes and Ladders: Each week sees you closer to the finish. But one small mistake is like landing on the big snake - taking you right back to the beginning."
    },
    {
      type: "tip",
      title: "Modern Approach",
      content: "Some protocols now include early strengthening exercises (from week 2-3) done out of the boot in safe positions. This builds tendon strength while protecting it. Your specialist will guide you on when and how to start these."
    },

    // Sleep Solutions
    {
      type: "heading",
      level: 2,
      text: "Sleep Solutions During the Boot Phase"
    },
    {
      type: "heading",
      level: 3,
      text: "Why Sleeping in a Boot is Miserable"
    },
    {
      type: "text",
      content: "Let's be honest: sleeping in a walking boot is one of the most challenging aspects of recovery. Common complaints include:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "The boot is heavy and awkward",
        "Your foot gets hot and sweaty",
        "You can't move or change position easily",
        "The boot makes the sheets dirty",
        "It's just plain uncomfortable"
      ]
    },
    {
      type: "text",
      content: "Unfortunately, protecting your tendon overnight is absolutely essential. One accidental stretch during sleep could undo weeks of healing."
    },

    {
      type: "heading",
      level: 3,
      text: "The Night Splint Alternative"
    },
    {
      type: "text",
      content: "A night splint designed specifically for Achilles rupture can be a game-changer for sleep comfort."
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
            "Specifically designed for Achilles tendon rupture",
            "Holds your foot in the correct plantarflexed position",
            "Lightweight and breathable",
            "Much more comfortable than a boot for sleeping",
            "Clinically endorsed by leading surgeons"
          ]
        }
      ]
    },
    {
      type: "text",
      content: "**When can you use it?**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Typically from week 2-4 onwards (check with your specialist)",
        "Must wait for any surgical wounds to heal first",
        "Only for sleeping/resting - not for walking"
      ]
    },
    {
      type: "quote",
      text: "It is fantastic that Thetis Medical have produced this night-splint. It is certain to improve the recovery experience for patients.",
      author: "Mr. James Davis, Past President BOFAS"
    },
    {
      type: "alert",
      variant: "danger",
      title: "Important",
      content: "Do NOT use a generic \"night splint\" designed for plantar fasciitis. These hold the foot in the wrong position (dorsiflexion) and could damage your healing tendon. Only use a splint specifically designed for Achilles rupture."
    },

    {
      type: "heading",
      level: 3,
      text: "Tips for Actually Getting Rest"
    },
    {
      type: "text",
      content: "Whether you're in a boot or night splint, here are strategies for better sleep:"
    },
    {
      type: "text",
      content: "**Position:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Sleep on your back with your leg elevated on pillows",
        "Or on your side with a pillow between your legs",
        "Avoid sleeping on your stomach"
      ]
    },
    {
      type: "text",
      content: "**Environment:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Keep the room cool (your foot will be warm)",
        "Use breathable sheets",
        "Consider a fan directed at your feet"
      ]
    },
    {
      type: "text",
      content: "**Practical tips:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Wear a thin cotton sock under the boot for comfort",
        "Keep crutches next to the bed",
        "Use a nightlight for bathroom trips",
        "Empty your bladder before bed (fewer night-time trips)",
        "Limit fluids in the evening"
      ]
    },
    {
      type: "text",
      content: "**Mental approach:**"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Accept that sleep will be disrupted for a while",
        "Rest even if you can't sleep deeply",
        "Nap during the day if needed",
        "This phase is temporary"
      ]
    },

    // Essential Purchases
    {
      type: "heading",
      level: 2,
      text: "Essential Purchases for Weeks 1-3"
    },
    {
      type: "heading",
      level: 3,
      text: "Must-Haves"
    },
    {
      type: "table",
      headers: ["Item", "Why You Need It"],
      rows: [
        ["**Walking Boot** (if not provided)", "Aircast or VACOped with correct wedges"],
        ["**Night Splint**", "For sleeping comfort from week 2-4 - much more comfortable than boot"],
        ["**Shoe Leveler (EVENup)**", "Prevents back, hip, and knee pain from height difference"],
        ["**Waterproof Boot Cover**", "For showering safely, keeps boot clean and dry"]
      ]
    },
    {
      type: "heading",
      level: 3,
      text: "Nice-to-Haves"
    },
    {
      type: "table",
      headers: ["Item", "Why You Need It"],
      rows: [
        ["**Ergonomic Crutch Handle Covers**", "Gel or foam padding reduces hand and wrist discomfort"],
        ["**Merino Wool Socks**", "Moisture-wicking, temperature regulating, more comfortable than cotton"],
        ["**Leg Elevation Wedge**", "Better than stacking pillows, consistent comfortable elevation"]
      ]
    },

    // Red Flags
    {
      type: "heading",
      level: 2,
      text: "Common Concerns and Red Flags"
    },
    {
      type: "heading",
      level: 3,
      text: "DVT Symptoms to Watch"
    },
    {
      type: "text",
      content: "Continue to be vigilant for blood clots throughout your recovery:"
    },
    {
      type: "card",
      title: "Deep Vein Thrombosis (DVT) Symptoms",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Increased pain or tenderness in the calf (beyond normal)",
            "New or increasing swelling",
            "Redness or warmth in the leg",
            "Leg feeling heavier than expected"
          ]
        }
      ]
    },
    {
      type: "card",
      title: "Pulmonary Embolism (PE) Symptoms - EMERGENCY",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Sudden shortness of breath",
            "Chest pain, especially when breathing",
            "Coughing up blood",
            "Rapid heartbeat",
            "Feeling faint"
          ]
        }
      ]
    },
    {
      type: "alert",
      variant: "danger",
      content: "If you experience PE symptoms, call 999 immediately."
    },

    {
      type: "heading",
      level: 3,
      text: "Signs of Infection (Post-Surgery)"
    },
    {
      type: "text",
      content: "If you've had surgery, watch for:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Increasing redness around the wound",
        "Wound becoming hot to touch",
        "Pus or unusual discharge",
        "Fever",
        "Wound opening up",
        "Increasing pain after initial improvement"
      ]
    },
    {
      type: "text",
      content: "Contact your surgical team if you notice any of these signs."
    },

    {
      type: "heading",
      level: 3,
      text: "When to Call Your Doctor"
    },
    {
      type: "text",
      content: "Contact your medical team if you experience:"
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Suspected blood clot symptoms",
        "Signs of infection",
        "Sudden increase in pain",
        "Your boot or cast becomes loose or damaged",
        "You have a fall or accident",
        "Your foot slips out of position",
        "Numbness or tingling that doesn't resolve",
        "Concerns about your medication"
      ]
    },

    // FAQs
    {
      type: "heading",
      level: 2,
      text: "FAQs for Weeks 1-3"
    },
    {
      type: "faq",
      items: [
        {
          question: "Surgery was recommended - should I be worried?",
          answer: "Not necessarily. Surgery is sometimes recommended for specific reasons: a significant gap between tendon ends, very active lifestyle/professional athlete, previous Achilles problems, or certain tendon characteristics on imaging. If surgery is recommended, ask your surgeon to explain why and discuss the risks and benefits for your specific situation."
        },
        {
          question: "My friend had surgery and says I should too - what should I do?",
          answer: "Listen to your medical team, not anecdotes. Every rupture is different, and what was right for your friend may not be right for you. The evidence strongly supports non-surgical treatment for most people."
        },
        {
          question: "Can I walk on my heel with the boot?",
          answer: "Yes, when walking in the boot, you should walk as normally as possible with a heel-to-toe motion. The boot is designed to protect your tendon while allowing walking."
        },
        {
          question: "How often should I take the boot off?",
          answer: "In weeks 1-3, the boot should stay on 24/7. The only exceptions are: brief periods for showering (with extreme care), using a night splint (if approved by your specialist), or specific exercises prescribed by your physiotherapist (not usually this early)."
        },
        {
          question: "When can I stop using crutches?",
          answer: "This varies by individual, but many people can reduce crutch use by weeks 2-3 and stop using them by weeks 3-4. Always follow your specific protocol and don't rush."
        },
        {
          question: "Is it normal for my ankle to feel stiff?",
          answer: "Yes, this is completely normal. Your ankle has been immobilised, and stiffness is expected. Do NOT try to stretch it yourself. The flexibility will return naturally with time and proper physiotherapy."
        },
        {
          question: "My tendon feels tight - is that bad?",
          answer: "No, tightness is normal and actually a good sign. It means your tendon is healing in a shortened position, which is what we want. Do NOT stretch or massage the tendon. Let it heal."
        },
        {
          question: "Can I remove wedges early if I feel ready?",
          answer: "Absolutely not. Follow your prescribed wedge removal schedule exactly. Removing wedges early could cause your tendon to heal elongated, permanently reducing your ankle power."
        }
      ]
    },

    // Summary Checklist
    {
      type: "heading",
      level: 2,
      text: "Summary: Your Weeks 1-3 Checklist"
    },
    {
      type: "checklist",
      items: [
        { text: "Attend your specialist appointment", checked: false },
        { text: "Understand your treatment decision (surgery vs non-surgical)", checked: false },
        { text: "Get properly fitted for your walking boot", checked: false },
        { text: "Learn your wedge removal schedule", checked: false },
        { text: "Continue blood thinning medication as prescribed", checked: false },
        { text: "Purchase essential recovery items (night splint, shoe leveler)", checked: false },
        { text: "Practice walking safely in the boot", checked: false },
        { text: "Keep the boot on 24/7", checked: false },
        { text: "Elevate and ice as needed", checked: false },
        { text: "Know the warning signs for DVT and infection", checked: false }
      ]
    },
    {
      type: "alert",
      variant: "success",
      content: "**Remember:** These weeks are about protection and patience. The decisions made now set the foundation for your entire recovery."
    }
  ]
};
