import type { GuideContent, GuideMetadata } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "stage-4",
  title: "Plantar fasciitis — Stage 4: Return to activity",
  description:
    "Building volume and returning to sport: walk–run progression, load rules, and when it is safe to push harder.",
  phase: "plantar-fasciitis-stage-4",
  weekRange: "Stage 4",
  highlights: [
    "Walk before you run",
    "Increase volume slowly",
    "Keep maintenance stretching",
  ],
  phaseSubtitle: "Return to activity",
  hubCardTitle: "Return to activity",
  timelineColor: "bg-primary",
};

export const content: GuideContent = {
  intro:
    "Stage 4 is about **building volume** and returning to the activities you care about — walking longer, jogging, or sport — without tipping the balance back into overload. Patience here protects everything you built in Stages 1–3.",
  blocks: [
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/loading-balance-scale.png",
      alt: "Balance scale analogy showing activity load and tissue repair in equilibrium.",
      caption:
        "Return to activity means increasing load while repair keeps up — not racing ahead.",
    },
    {
      type: "heading",
      level: 2,
      text: "When to start Stage 4",
    },
    {
      type: "text",
      content:
        "Start when daily walking is comfortable, morning pain is mild and short-lived, and you can complete Stage 3 heel raises with good control and only mild post-exercise soreness. You should still expect some heel awareness — the test is whether symptoms **recover within 24 hours** after loading.",
    },
    {
      type: "checklist",
      title: "Ready to progress?",
      items: [
        { text: "First-step morning pain is manageable", checked: true },
        { text: "Single-leg heel raises completed without sharp heel pain", checked: true },
        { text: "No worsening trend over the past 1–2 weeks", checked: true },
        { text: "Stretching maintenance still happening several times per week", checked: true },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Walk before you run",
    },
    {
      type: "text",
      content:
        "If running was what triggered your symptoms, do not jump straight back in. Build walking tolerance first, then introduce short jog intervals on forgiving surfaces.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Increase **weekly step count or walk duration** by no more than ~10% at a time.",
        "Avoid back-to-back hard days early on — alternate easier days.",
        "Keep supportive shoes; avoid racing in flat minimalist shoes too soon.",
        "Warm up with a slow toe stretch and 5 minutes of easy walking.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Walk–run progression",
    },
    {
      type: "table",
      headers: ["Week", "Session example", "Frequency"],
      rows: [
        ["Week 1", "Brisk walk 20–25 min, flat ground", "3× per week"],
        ["Week 2", "Walk 25–30 min; add gentle hills if pain-free", "3× per week"],
        ["Week 3", "Jog 1 min / walk 4 min × 4 repeats", "3× per week"],
        ["Week 4", "Jog 2 min / walk 3 min × 4 repeats", "3× per week"],
        ["Week 5", "Jog 3 min / walk 2 min × 4 repeats", "3× per week"],
        ["Week 6", "Jog 5 min continuous × 2–3 bouts with walk breaks", "3× per week"],
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "The 24-hour rule",
      content:
        "Mild stiffness during activity can be acceptable if it settles within 24 hours. If pain is worse the next morning or clearly increasing week to week, hold your current level for another week — or step back to Stage 3 strength work.",
    },
    {
      type: "heading",
      level: 2,
      text: "Returning to sport",
    },
    {
      type: "text",
      content:
        "Court sports, jumping, and hill sprints load the heel aggressively. Wait until easy jogging feels solid, then reintroduce sport-specific drills gradually.",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Comfortable continuous jogging for 15–20 minutes.",
        "Heel raises and hopping on the spot without sharp pain.",
        "Sport-specific drills at **half pace / half duration** first.",
        "Full training only after 2–3 weeks of pain-free partial sessions.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Do not abandon maintenance",
    },
    {
      type: "text",
      content:
        "Many relapses happen because stretching stops as soon as sport resumes. Keep slant-board or calf stretching **several times per week**, plus supportive footwear when load increases.",
    },
    {
      type: "dos-donts",
      dos: [
        "Progress one variable at a time (distance, speed, or frequency)",
        "Keep heel raise strength work 1–2 times per week",
        "Monitor morning first-step pain as your early warning sign",
      ],
      donts: [
        "Jump from no running to a full 5k because you feel good one day",
        "Train two hard days in a row in the first month back",
        "Stop all stretching once symptoms ease",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "When to pull back",
      content:
        "If heel pain is worsening despite sensible progression, if you cannot put weight through the foot, or if symptoms no longer fit a simple plantar heel pain story, arrange a medical review. A flare after one busy day usually means **hold your current level** — not quit entirely.",
    },
    {
      type: "tip",
      title: "Need more detail on exercises?",
      content:
        "Our [exercises & return FAQ](/FAQs/plantar-fasciitis-exercises-and-return) answers common questions about running, gym work, and knowing when you are doing too much. [Stage 5](/guide/plantar-fasciitis/stage-5) covers long-term maintenance when you are back to normal activity.",
    },
  ],
};
