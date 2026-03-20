import type { FAQItem, SectionContent } from "@/components/course/types";
import WedgeRemovalProgression from "@/assets/wedge-removal-progression-cartoon.png";

export const metadata = {
  slug: "boot-progression-protocol",
  title: "Boot Progression Protocol",
  description: "Wedge removal schedule, mobilisation progression, and angle changes",
  status: "drafting" as const,
};

export const faqs: FAQItem[] = [
  {
    question: "How do I know when to reduce the angle (remove a wedge or adjust the hinge)?",
    answer:
      "Follow your protocol exactly. Most protocols do not start reducing the angle until week 5. Your medical team will give you a schedule and set the time intervals (e.g., when to remove each wedge — bottom first — or adjust the hinge). Don't progress faster than instructed, even if you feel fine. Starting too early can elongate the tendon.",
  },
  {
    question: "What if I reduce the angle and it hurts?",
    answer:
      "Some discomfort is normal when reducing the angle — you're putting slightly more stress on the tendon. However, severe pain is not normal. If you have severe pain, a new pop, or sudden loss of function, stop and contact your clinic. A little discomfort is expected; severe pain is a warning sign.",
  },
  {
    question: "Can I progress faster than my protocol says?",
    answer:
      "No. Even if you feel fine, the tendon needs time to heal at each stage. Rushing ahead is one of the most common causes of re-rupture or tendon elongation. Follow your protocol exactly — your clinician designed it based on healing timelines.",
  },
  {
    question: "What if my protocol is different from what I read online?",
    answer:
      "Protocols vary widely between clinics and specialists. Some are more conservative, some are more accelerated. What matters is following YOUR specific protocol, not comparing with others. If you have concerns about your protocol, discuss them with your clinician.",
  },
  {
    question: "What if I accidentally reduced the angle too much?",
    answer:
      "Reverse the change immediately — put the wedges back (Aircast) or lock the hinge to a more restricted range (VACOped). Don't walk on it until you've restored the correct angle. Contact your clinician to discuss — they may want to see you to check everything is okay. It's better to be safe than risk re-injury.",
  },
  {
    question: "Can I reduce the angle faster if I'm feeling good?",
    answer:
      "No. Even if you feel great, follow your clinician's protocol. The timing is based on healing progress, not just how you feel. Reducing too quickly risks over-stretching or re-rupture. Patience now = better function later.",
  },
  {
    question: "What if reducing the angle causes pain?",
    answer:
      "Some mild discomfort is normal. If you get significant pain, reverse the change (put the wedge back or lock the hinge) and wait longer. If pain persists even after reversing, contact your clinician. Don't push through severe pain — it's a sign to slow down.",
  },
];

export const content: SectionContent = {
  intro:
    "Your boot protocol is the core of **Stage 1: Immobilization**. (See [The Achilles Recovery Roadmap](/standard/recovery-roadmap) for the full 4-stage overview.) Most protocols keep you at maximum angle until **week 5**; then you reduce the angle in steps (remove wedges — bottom first — or adjust the hinge) at intervals set by your medical team. Usually the foot is fairly flat by **week 10**, then you progress out of the boot into a shoe with a heel lift. Mobilisation progresses alongside.",

  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Quick action plan",
    },
    {
      type: "checklist",
      title: "Stage 1: Protocol essentials",
      items: [
        {
          text: "Follow your specific protocol exactly — don't rush ahead",
        },
        {
          text: "Understand your starting position — maximum angle with all wedges in (Aircast) or hinge locked (VACOped)",
        },
        {
          text: "Know your schedule — when to reduce angle and when to progress mobilisation status",
        },
        {
          text: "Monitor how you feel — some discomfort is normal, severe pain is not",
        },
        {
          text: "Don't compare with others — protocols vary widely",
        },
      ],
    },
    {
      type: "section",
      title: "Understanding your angle protocol — the foundation of your recovery",
      content: [
        {
          type: "text",
          content:
            "Whether you have an Aircast (with wedges) or a VACOped (with a hinge), the principle is the same: your foot starts very pointed down, and gradually moves toward neutral as the tendon heals. The **angle** is what matters — how you achieve it depends on your boot type.",
        },
        {
          type: "card",
          title: "The principle: gradual angle reduction",
          description: "Why we reduce the angle slowly.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Your foot starts very pointed down to protect the healing tendon. As new tissue forms and strengthens, you can gradually reduce the angle — either by removing wedges (Aircast) or adjusting the hinge (VACOped). The key is **gradual**: reduce too fast and you risk over-stretching or re-rupture; reduce at the right pace and the tendon adapts safely.",
            },
          ],
        },
        {
          type: "accordion",
          items: [
            {
              title: "Starting position (weeks 0–5)",
              content: [
                {
                  type: "text",
                  content:
                    "You'll start at **maximum angle** — foot very pointed down like standing on tip-toes. This is around 30–45 degrees of [plantarflexion](/standard/emergency-care) (foot pointed down). **Most protocols keep you in this position until week 5.** Starting to reduce the angle too early can elongate the tendon and worsen outcomes.",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "**Aircast:** All wedges in (usually 3–4 wedges stacked under heel)",
                    "**VACOped:** Hinge locked at maximum angle setting",
                    "**Goal:** Keep tendon ends as close as possible",
                    "**Mobilisation status:** Usually Non Weightbearing or Limited Weightbearing",
                    "**Don't change anything yet** — stay at maximum angle until your medical team says to start reducing (typically week 5)",
                  ],
                },
              ],
            },
            {
              title: "Angle reduction protocol (from week 5)",
              content: [
                {
                  type: "text",
                  content:
                    "**Most protocols start angle reduction at week 5.** Your medical team will start you on **sequential** angle reduction — **time intervals are set by your medical team**. For Aircast: remove the **bottom wedge first**, then the next, and so on. For VACOped: they'll guide hinge adjustments (unlocking the dial gradually). Usually the foot is fairly flat (like in a shoe) by **week 10**. Then you progress out of the boot into a shoe with a heel lift.",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "**From week 5:** Sequential removal of wedges (bottom one first) or hinge adjustment — **intervals set by your medical team**",
                    "**Week 5–10:** Gradual reduction; typically fairly flat (shoe-like position) by week 10",
                    "**After week 10:** Progress out of boot into a shoe with a heel lift, as guided by your clinician",
                  ],
                },
                {
                  type: "alert",
                  variant: "info",
                  title: "Important",
                  content:
                    "Do not start reducing the angle before your medical team says so. Starting too early (e.g. at week 2) can elongate the tendon. **Follow your specific protocol and the time intervals your team sets** — don't compare with others or rush ahead.",
                },
              ],
            },
            {
              title: "What happens when you reduce the angle",
              content: [
                {
                  type: "text",
                  content:
                    "When you reduce the angle (remove a wedge or unlock the hinge), your foot moves to a less pointed-down position. This is progress, but it also means:",
                },
                {
                  type: "list",
                  style: "bullet",
                  items: [
                    "**More stress on the tendon** — you're putting slightly more stress on the healing tissue as the angle reduces; gradual reduction lets it adapt safely",
                    "**You may feel more stretch** — this is normal, but shouldn't be severe pain",
                    "**Your leg length changes** — you may need to adjust footwear on the other foot",
                    "**You're one step closer to neutral** — this is good progress",
                  ],
                },
                {
                  type: "tip",
                  title: "When to worry",
                  content:
                    "If reducing the angle causes **severe pain**, a **new pop**, or **sudden loss of function**, stop and contact your clinic. A little discomfort is normal; severe pain is not.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Angle reduction: wedges (Aircast) and hinge (VACOped)",
      content: [
        {
          type: "text",
          content:
            "**Most protocols start at week 5.** From then, you reduce the angle — either by removing wedges (Aircast) or adjusting the hinge (VACOped). The principle is the same: gradual reduction at intervals set by your medical team. Below we cover both boot types.",
        },
        {
          type: "image",
          src: WedgeRemovalProgression,
          alt: "Four-panel diagram showing gradual wedge removal progression from week 5 onward, demonstrating how foot angle reduces as wedges are removed (usually fairly flat by week 10)",
          caption: "Wedge removal progression: gradual reduction of foot angle over time",
        },
        {
          type: "card",
          title: "Aircast — why we remove wedges gradually",
          description: "The tendon needs time to adapt.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Wedges hold your foot in a pointed-down position. As your tendon heals and new tissue forms, you can gradually reduce this angle — remove the bottom wedge first, then the next. Reducing too quickly risks over-stretching or re-rupture. Your clinician's protocol balances safety with progress.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Early weeks:** Maximum angle; all wedges in",
                "**From week 5:** Gradual reduction, one wedge at a time (bottom first)",
                "**Later weeks:** Foot approaches neutral as healing progresses",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "VACOped — hinge adjustment",
          description: "Same principle, different mechanism.",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "With a VACOped, you don't remove wedges — you **adjust the hinge dial**. From week 5, your clinician will guide you to unlock the hinge gradually, allowing more range of motion in steps. The principle is the same: gradual reduction at set intervals. Don't unlock too far too fast — follow your protocol exactly.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Early weeks:** Hinge locked at maximum angle",
                "**From week 5:** Gradual hinge adjustment as instructed",
                "**Check the dial** — ensure it's set correctly each time you put the boot on",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "When to start reducing the angle",
      content: [
        {
          type: "text",
          content:
            "**Most protocols do not start until week 5.** Starting earlier can elongate the tendon. Your medical team will tell you when to start and at what intervals to remove each wedge (Aircast, bottom first) or adjust the hinge (VACOped). **Never reduce the angle without your clinician's approval.**",
        },
        {
          type: "card",
          title: "Typical timing (varies by protocol)",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Weeks 0–5:** Maximum angle with all wedges in (or hinge locked) — do not reduce angle yet",
                "**From week 5:** Start sequential wedge removal (bottom first) or hinge adjustment — **intervals set by your medical team**",
                "**By week 10:** Usually fairly flat (like a shoe)",
                "**After week 10:** Progress out of boot into a shoe with a heel lift",
              ],
            },
            {
              type: "alert",
              variant: "warning",
              content:
                "These are general guidelines. Your clinician will give you a specific protocol and time intervals based on your healing progress, gap size, and treatment approach (surgical vs non-surgical).",
            },
          ],
        },
        {
          type: "card",
          title: "Signs you might be ready",
          description: "What clinicians look for.",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Decreasing swelling** — less inflammation means healing is progressing",
                "**Less pain** — discomfort should be manageable",
                "**Time since injury** — most protocols do not start until week 5",
                "**Clinical assessment** — your clinician checks healing progress and sets your schedule",
              ],
            },
            {
              type: "text",
              content:
                "**Important:** Even if you feel ready, don't reduce the angle (remove wedges or adjust the hinge) without your clinician's instruction. The timing is based on healing progress, not just how you feel.",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "How to reduce the angle safely",
      content: [
        {
          type: "text",
          content:
            "The process varies by boot type. Do it when resting (sitting or lying down), keep your foot supported, and watch for problems — increased pain, swelling, or discomfort means slow down.",
        },
        {
          type: "card",
          title: "Aircast — removing wedges",
          description: "Step-by-step.",
          variant: "highlight",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Check your protocol** — know exactly which wedge to remove and when",
                "**Check wedges stay in place** — self-adhesive wedges can help prevent slipping; ensure they're secure each time you put the boot on",
                "**Remove one wedge at a time** — never remove multiple wedges at once",
                "**Sit or lie down** — never remove wedges while standing",
                "**Remove the bottom wedge first** — usually the first one (check your protocol)",
                "**Re-tighten straps** — ensure the boot fits snugly",
                "**Test gradually** — start with short periods, increase as tolerated",
              ],
            },
            {
              type: "alert",
              variant: "info",
              content:
                "Some boots have wedges that slide out easily. Others may require removing the boot liner. Follow your boot manufacturer's instructions or ask your clinician to show you the technique.",
            },
          ],
        },
        {
          type: "card",
          title: "VACOped — adjusting the hinge",
          description: "Step-by-step.",
          variant: "highlight",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Check your protocol** — know when and how far to unlock the hinge",
                "**Adjust the dial gradually** — don't unlock too far in one step",
                "**Check the setting each time** — ensure the hinge is at the correct position when you put the boot on",
                "**If it feels unstable** — lock it back to a more restricted range and contact your clinic",
              ],
            },
          ],
        },
        {
          type: "tip",
          title: "Tiny change, big payoff",
          content:
            "Reduce the angle in the morning or during the day when you're active. This allows you to monitor how your tendon responds. If you experience significant pain or over-stretching, reverse the change (put the wedge back or lock the hinge) and contact your clinic.",
        },
      ],
    },
    {
      type: "section",
      title: "What to expect when you reduce the angle",
      content: [
        {
          type: "text",
          content:
            "As you reduce the angle (remove wedges or adjust the hinge), your foot position changes. This can feel strange at first, and some discomfort is normal. Many people find it **feels tight as the heel gets lower** — that's expected; follow your team's schedule.",
        },
        {
          type: "card",
          title: "Normal sensations",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Feeling different** — your foot will be in a new position, which feels odd initially",
                "**Tightness as the heel gets lower** — common around week 5 when angle reduction starts; usually normal",
                "**Mild discomfort** — some stretching sensation is normal as the angle changes",
                "**Temporary stiffness** — your ankle may feel stiffer for a day or two",
                "**Swelling variation** — slight increase in swelling is common and usually settles",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "Warning signs to slow down",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Significant pain increase** — more than mild discomfort",
                "**Rapid swelling** — swelling that doesn't improve with elevation",
                "**Feeling unstable** — like the tendon is being stretched too much",
                "**New pain location** — pain in a different area than before",
              ],
            },
            {
              type: "text",
              content:
                "If you experience any of these, **reverse the change** (put the wedge back or lock the hinge) and contact your clinician. It's better to go slower than risk re-injury.",
            },
          ],
        },
        {
          type: "tip",
          title: "Progress isn't always linear",
          content:
            "Some days you might feel ready to reduce the angle, other days you might need to reverse the change. This is normal. Healing isn't a straight line — listen to your body and follow your clinician's guidance.",
        },
      ],
    },
    {
      type: "section",
      title: "Practical tips",
      content: [
        {
          type: "text",
          content:
            "A few simple strategies can make angle reduction smoother and more comfortable.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "**Reduce gradually** — don't rush, even if you feel ready (wedges: one at a time; hinge: small steps)",
            "**Elevate after each change** — helps reduce any swelling from the angle change",
            "**Ice if needed** — if you get increased swelling, ice can help (always with a cloth barrier). Take the boot off to apply ice; keep your foot toes-down while icing.",
            "**Keep a log** — note when you made each change and how you felt",
            "**Don't compare** — everyone's timeline is different, focus on your own progress",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Mobilisation and weightbearing progression",
      content: [
        {
          type: "text",
          content:
            "As your tendon heals, you'll gradually progress from Non Weightbearing to Unrestricted Weightbearing. This progression is separate from angle reduction but happens alongside it. According to orthopaedic policy, weightbearing status should be clearly documented with clinical justification, quantification (functional or distance restrictions, not percentages), and duration.",
        },
        {
          type: "card",
          title: "Typical mobilisation schedule",
          description: "General guidelines — follow your specific protocol.",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Weeks 0–2:** Usually Non Weightbearing or Limited Weightbearing",
                "**Weeks 2–5:** May progress to Limited Weightbearing with functional restrictions (angle stays at maximum until week 5)",
                "**Weeks 5–8:** Progress to Unrestricted Weightbearing in boot as angle reduces",
                "**Weeks 8–10:** Unrestricted Weightbearing, foot usually fairly flat; preparing for boot removal",
                "**After week 10:** Progress out of boot into a shoe with a heel lift",
              ],
            },
            {
              type: "alert",
              variant: "warning",
              title: "Important",
              content:
                "Mobilisation progression varies by protocol. Some allow earlier weightbearing, some require longer Non Weightbearing periods. **Follow your clinician's specific instructions** — don't progress faster than allowed. Your clinician will document your weightbearing status with clear clinical justification and functional restrictions.",
            },
          ],
        },
        {
          type: "card",
          title: "How to progress mobilisation safely",
          description: "Practical tips.",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Start gradually** — even when cleared for weightbearing, start with limited functional activities",
                "**Follow functional restrictions** — your clinician will specify limitations (e.g., indoor only, no stairs, distance restrictions)",
                "**Listen to your body** — if it hurts, reduce activity level",
                "**Don't rush** — gradual progression is safer than sudden changes",
                "**Use crutches** — continue using crutches until cleared to walk without them",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Combining angle reduction and mobilisation",
      content: [
        {
          type: "text",
          content:
            "Angle reduction and mobilisation progression happen together, but they're independent. You might reduce the angle while still Non Weightbearing, or you might be weightbearing while still at maximum angle. Your protocol will guide both.",
        },
        {
          type: "card",
          title: "Common patterns",
          description: "How protocols typically combine these progressions.",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Conservative protocol:** May keep maximum angle beyond week 5, slower mobilisation progression",
                "**Standard protocol:** Start angle reduction from week 5, intervals set by your team; usually fairly flat by week 10, then shoe with heel lift",
                "**Your protocol:** May be anywhere between these — follow it exactly and the time intervals your medical team sets",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Monitoring your progress",
      content: [
        {
          type: "text",
          content:
            "As you progress through your protocol, monitor how you feel and watch for signs that you're ready for the next step — or signs that you need to slow down.",
        },
        {
          type: "card",
          title: "Signs you're progressing well",
          description: "Positive indicators.",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Reduced pain** — pain decreasing over time",
                "**Less swelling** — swelling improving",
                "**Comfortable at current angle** — no significant discomfort",
                "**Able to bear weight** — weightbearing feels manageable",
                "**Following schedule** — keeping up with protocol timeline",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "Signs to slow down or contact clinic",
          description: "When to be cautious.",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Severe pain** — especially when reducing angle or increasing weight",
                "**New pop or snap** — could indicate re-injury",
                "**Sudden loss of function** — can't bear weight when you could before",
                "**Increasing swelling** — especially if it's getting worse",
                "**Concern about progress** — if something doesn't feel right",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "faq",
      items: faqs,
    },
    {
      type: "card",
      title: "Questions to ask your clinician",
      description: "Save these to your phone and tick them off in clinic.",
      variant: "default",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            '**Timing:** "When should I start reducing the angle? What\'s my specific protocol?"',
            '**Which wedge / hinge:** "Which wedge should I remove first? (Aircast) Or how do I adjust the hinge? (VACOped)"',
            '**Pace:** "How often should I reduce the angle? Weekly or every two weeks?"',
            '**Warning signs:** "What symptoms should make me reverse the change or slow down?"',
            '**Pain:** "How much discomfort is normal when reducing the angle?"',
            '**After-hours:** "What should I do if I can\'t reach you after hours?"',
          ],
        },
      ],
    },
    {
      type: "card",
      title: "If you remember nothing else",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Stay at maximum angle until week 5** — most protocols don't start lowering the heel before then; starting early can elongate the tendon",
            "**Never remove wedges without clinician approval** — time intervals are set by your medical team",
            "**Bottom wedge first** — then sequential removal (or hinge adjustment as instructed)",
            "**Usually fairly flat by week 10** — then progress out of boot into a shoe with a heel lift",
            "**One wedge at a time** — gradual is safe, fast is risky",
            "**Reverse the change if needed** — it's okay to go slower",
            "**Some discomfort is normal** — severe pain is not",
            "**When in doubt, ask** — contact your clinic if concerned",
          ],
        },
      ],
    },
  ],
};
