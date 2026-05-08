import type { SectionContent } from "@/components/course/types";
import pfCombKnotsAnalogy from "@/assets/pf-comb-knots-analogy.png";
import pfSlantBoardKeyMessages from "@/assets/pf-slant-board-key-messages.png";
import pfSlantBoardStretchesBanner from "@/assets/pf-slant-board-stretches-banner.png";
import pfTightCalfTiptoeEffect from "@/assets/pf-tight-calf-tiptoe-effect.png";

export const metadata = {
  slug: "slant-board-guide",
  title: "Using a Slant Board",
  description:
    "Why a slant board is the most effective stretching tool, how to use it properly, and how to progress safely over weeks",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Using a slant board is an effective way to stretch your calf muscles. To work well, it must be used regularly, several times every day.",
  blocks: [
    {
      type: "image",
      src: pfSlantBoardStretchesBanner,
      alt: "Slant board stretches banner with slant board and standing stretch position.",
      caption: "Simple setup, repeated daily, gives the best results.",
    },
    {
      type: "section",
      title: "Starting your stretching programme",
      content: [
        {
          type: "text",
          content:
            "Stand on the board in trainers with balanced, upright posture. Keep your knees locked straight while stretching, otherwise the target calf muscle is slack and cannot be stretched properly.",
        },
        {
          type: "list",
          style: "numbered",
          items: [
            "Start on a low gradient (not steep).",
            "Aim for 3 minutes, 3 times per day.",
            "Build to 5+ minutes, 3-4 times per day.",
            "Only then increase the gradient one level and reset to 3 minutes, 3 times per day.",
            "Gradually build duration and frequency again.",
          ],
        },
        {
          type: "tip",
          title: "Hamstring option",
          content:
            "You can also stretch your hamstrings by hinging forwards and resting your hands on a table in front of you.",
        },
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Progress slowly and safely",
      content:
        "Use only the first two board settings unless your specialist advises otherwise. If the board is too steep or you stretch for too long too soon, you can trigger foot, leg, or back pain.",
    },
    {
      type: "alert",
      variant: "warning",
      title: "Caution",
      content:
        "If your foot or ankle pain gets worse, reduce the stretching load and notify your clinician.",
    },
    {
      type: "tip",
      title: "Top tip for compliance",
      content:
        "Raise your laptop or keyboard so you can work at a higher desk while stretching. Multitasking helps you stay consistent.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why calf tightness causes problems",
    },
    {
      type: "text",
      content:
        "Many foot and ankle problems, including heel pain, are driven by excess stress through the tissues. Tight calf muscles and Achilles tendon can leave you effectively walking slightly on tiptoes all day.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "More pressure under the ball of the foot.",
        "More strain through the arch of the foot.",
        "More strain through tendons around the ankle.",
      ],
    },
    {
      type: "image",
      src: pfTightCalfTiptoeEffect,
      alt: "Feet on tiptoe showing increased forefoot loading from calf tightness.",
      caption:
        "A tight calf acts like constant low-grade tiptoe walking and increases stress.",
    },
    {
      type: "text",
      content:
        "If you had a stone under the ball of your foot, standing on tiptoes would make it hurt more. Tight calves produce the same effect and can also increase arch and heel pain.",
    },
    {
      type: "heading",
      level: 2,
      text: "How calf stretching helps",
    },
    {
      type: "card",
      title: "Two key benefits",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "Tissue repair: stretching supports collagen remodelling and better alignment in irritated tissue.",
            "Reduced strain: lower calf/Achilles tension reduces daily overload through the leg, ankle, and foot.",
          ],
        },
      ],
    },
    {
      type: "image",
      src: pfCombKnotsAnalogy,
      alt: "Hair and comb analogy for untangling fibres over time.",
      caption:
        "Think of stretching as combing knots out gradually, not forcing one aggressive pull.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why use a slant board",
    },
    {
      type: "text",
      content:
        "Many stretches fail because they are hard to understand or hard to do regularly. A slant board solves both problems.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Reminder: seeing the board at home/work prompts you to do the session.",
        "Simple setup: easier than stairs or resistance-band routines.",
        "Multitasking: stretch while brushing teeth or working at a standing desk.",
      ],
    },
    {
      type: "section",
      title: "Choosing and using your board",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Many options are available; you can even build your own.",
            "Adjustable angle is useful, but stability is essential.",
            "Follow product instructions and keep sessions short but frequent.",
          ],
        },
      ],
    },
    {
      type: "image",
      src: pfSlantBoardKeyMessages,
      alt: "Key slant board reminders: shoes on, knees straight, low gradient, daily stretching.",
      caption:
        "Key messages: every day x3, trainers on, knees locked, low gradient, build 3 to 5 minutes.",
    },
    {
      type: "card",
      title: "Key slant board messages",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Every day, ideally 3 sessions.",
            "Trainers on.",
            "Knees locked straight.",
            "Low gradient to start.",
            "Build from 3 minutes to 5 minutes per session.",
          ],
        },
      ],
    },
  ],
};
