import type { SectionContent } from "@/components/course/types";
import { mdShopPair } from "@/lib/catalogue-links";
import SeatedCalfRaisePhase1 from "@/assets/seated-protected-heel-raises.png";

export const metadata = {
  slug: "building-strength-in-boot",
  title: "Building Strength While in Boot",
  description:
    "Stage 1 exercises, mobilisation progression, and preparing for Stage 2",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "By Week 6, many protocols allow Stage 1 exercises — seated calf raises with your boot removed, **but only when protected** (heel wedge, support) or supervised. By Week 8, you're building strength and preparing for Stage 2: Post-immobilization. This lesson explains what to do and why — follow your clinician's protocol, don't skip ahead.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Quick action plan",
    },
    {
      type: "checklist",
      title: "Building strength basics",
      items: [
        {
          text:
            "Stage 1 exercises only when protected (heel wedge) or supervised — check with clinician",
        },
        {
          text:
            "Follow mobilisation protocol — progress gradually as your clinician allows",
        },
        {
          text: `Focus on proper gait — heel-to-toe pattern, use EVENup (${
            mdShopPair("evenup-leveler")
          }) to prevent back/hip pain`,
        },
        {
          text:
            "Understand Stage 2 goals — but don't skip ahead; follow your protocol",
        },
        {
          text:
            "Be patient — strength builds gradually, consistency matters more than intensity",
        },
      ],
    },
    {
      type: "section",
      title: "Stage 1 Exercises: Starting at Week 6",
      content: [
        {
          type: "alert",
          variant: "warning",
          title: "Protection first",
          content:
            "**Seated exercises with boot removed** should only be done when your foot is in a **protected position** (e.g. heel wedge or support keeping it pointed down) **or when supervised** by your clinician or physiotherapist. Never remove the boot and let your foot go flat unsupported — that stresses the healing tendon.",
        },
        {
          type: "text",
          content:
            "**Week 6** is when many protocols allow Stage 1 exercises — seated calf raises with your boot removed. **Check with your clinician** before starting. These exercises build strength while your tendon heals. When you start physiotherapy around Week 11, you'll see the complete rehabilitation protocol in [Starting Physiotherapy](/standard/starting-physio).",
        },
        {
          type: "card",
          title: "Stage 1 exercises: What to do",
          description:
            "Exercises you can begin once your tendon has had time to heal.",
          variant: "highlight",
          content: [
            {
              type: "text",
              content:
                "**When to start:** Week 6 (or when your clinician says). **Protection:** Keep your foot in a protected position — use a heel wedge under your foot, or an open boot/splint that maintains the pointed-down angle. Some clinicians prefer you do these **supervised** initially. Starting at Week 6:",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Week 6**: Start with body weight or leg weight only — remove boot only when protected (heel wedge or supervised). Sit with foot in [plantarflexion](/standard/emergency-care) (pointed down), push through big toe and lift heel.",
                "**Week 7+**: Add load gradually — start with 10-15kg on your knee, progress to 0.8-1x body weight",
                "**Position**: Foot must stay pointed down — use heel wedge or support to maintain protection",
                "**Target**: Build up to holding body weight in the pointed-down position",
              ],
            },
            // IMAGE TO UPDATE: Illustration should show PROTECTION — heel wedge under foot, or foot clearly supported in plantarflexion. Current image may not show protection.
            {
              type: "image",
              src: SeatedCalfRaisePhase1,
              alt:
                "Illustration showing seated calf raise with heel wedge or support under foot to keep it pointed down (protected position), weight on knee",
              caption:
                "Seated calf raise — foot must stay in protected position (heel wedge or support)",
            },
            {
              type: "text",
              content:
                "These exercises are done **out of boot** (boot removed for exercises only). Your boot stays on for everything else — walking, sleeping, daily activities. The boot protects your tendon; exercises strengthen it safely.",
            },
          ],
        },
        {
          type: "card",
          title: "Intrinsic foot work (Start Week 6)",
          description: "Simple exercises for foot awareness.",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Toe spreading** — helps with proprioception and foot awareness",
                "**Short foot exercises** — activates foot muscles",
                "**Why it matters**: Your foot feels strange after being in a boot — these exercises help restore awareness",
              ],
            },
          ],
        },
        {
          type: "alert",
          variant: "info",
          title: "Important",
          content:
            "**Do not start exercises before Week 6** without your clinician's explicit approval. Exercises with boot removed require **protection** (heel wedge, support, or supervised setting). Always check with your clinician — they may want you supervised initially or will specify how to protect your foot.",
        },
      ],
    },
    {
      type: "section",
      title: "Understanding Mobilisation Progress",
      content: [
        {
          type: "text",
          content:
            "Mobilisation means putting weight through your injured foot. This happens gradually — you don't go from Non Weightbearing to Unrestricted Weightbearing overnight. According to orthopaedic policy, your weightbearing status should be clearly documented with clinical justification, quantification (functional or distance restrictions), and duration. For detailed information about mobilisation progression schedules and protocols, see [Boot Progression Protocol](/standard/boot-progression-protocol).",
        },
        {
          type: "card",
          title: "Why gradual progression matters",
          description: "Understanding the force difference.",
          variant: "default",
          content: [
            {
              type: "text",
              content:
                "When you walk, force goes through your Achilles tendon. The difference between walking in a boot and walking without one is dramatic:",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Walking in boot**: ~1x body weight through tendon — this is manageable for a healing tendon",
                "**Walking without boot**: ~3.2x body weight through tendon — this is **3.2 times more force**",
                "**The transition**: Your tendon needs time to strengthen before it can handle full walking forces",
              ],
            },
            {
              type: "text",
              content:
                "This is why gradual progression matters. Your boot protects your tendon by reducing the force from 3.2x to 1x body weight. As your tendon heals and strengthens, you gradually transition from boot to shoes, giving your tendon time to adapt to increasing forces.",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Improving Your Gait (Walking Pattern)",
      content: [
        {
          type: "text",
          content:
            `Your walking pattern (gait) matters. A good gait protects your tendon, prevents other injuries, and helps you recover faster. A poor gait can cause back pain, hip pain, and slow your recovery. **Important:** Your boot adds 3-5cm of height to one leg, creating uneven hips. Use an **EVENup shoe leveler** (${
              mdShopPair("evenup-leveler")
            }) on your uninjured foot to maintain proper alignment and prevent back, hip, and knee pain.`,
        },
        {
          type: "card",
          title: "What good gait looks like",
          description: "The pattern to aim for.",
          variant: "highlight",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Heel strikes first** — your heel touches the ground before your toes",
                "**Roll through the foot** — weight moves from heel to toe smoothly",
                "**Push off with toes** — use your toes to propel forward",
                "**Even steps** — both legs take similar-sized steps",
                "**Upright posture** — stand tall, don't lean to one side",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "Common mistakes to avoid",
          description: "What not to do.",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Walking on toes** — putting weight only on the front of your foot",
                "**Limping heavily** — favoring the injured leg too much",
                "**Skipping heel strike** — avoiding putting your heel down",
                "**Uneven steps** — taking tiny steps with injured leg, big steps with good leg",
                "**Leaning away** — shifting weight to avoid using the injured leg",
              ],
            },
            {
              type: "text",
              content:
                "**Why this matters:** Poor gait patterns can become habits that are hard to break. They also put stress on other parts of your body (back, hips, knees) and can slow tendon healing.",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "What Comes Next: Stage 2 and Stage 3",
      content: [
        {
          type: "text",
          content:
            "You're currently in **Stage 1: Immobilization** (~6 weeks). As you build strength, you're preparing for **Stage 2: Post-immobilization** (weeks 6-12) and eventually **Stage 3: Single leg capacity** (weeks 18-24). For the full 4-stage picture, see [The Achilles Recovery Roadmap](/standard/recovery-roadmap).",
        },
        {
          type: "alert",
          variant: "info",
          title: "Don't skip ahead",
          content:
            "This is to help you understand the journey — **don't rush ahead or skip stages**. Follow your clinician's protocol. Stage 2 and Stage 3 start when your clinician says you're ready, not before.",
        },
        {
          type: "card",
          title: "Learn more about Stage 2 and Stage 3",
          description: "Detailed goals and progression.",
          variant: "highlight",
          content: [
            {
              type: "text",
              content:
                "For detailed information about Stage 2 and Stage 3 goals (strength targets, balance, gait progression), see the physiotherapy lessons coming up. Those lessons cover the complete goals in detail.",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "What's Normal vs What's Urgent",
      content: [
        {
          type: "card",
          title: "Usually normal at this stage",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Feeling unsteady** when first putting weight on your foot — this improves with practice",
                "**Mild discomfort** when walking — some pain is expected",
                "**Swelling after walking** — your foot may swell more after activity",
                "**Tiredness** — walking with crutches and a boot is exhausting",
                "**Stiffness** — your ankle has been immobilized, stiffness is normal",
              ],
            },
          ],
        },
        {
          type: "alert",
          variant: "danger",
          title: "Seek urgent care",
          content:
            "**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention). Also seek help for **numb/blue/pale toes**, severe pressure in boot, or fever with spreading redness.",
        },
      ],
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
            '**Exercises:** "When can I start Stage 1 exercises? What should I do?"',
            '**Mobilisation status:** "What is my weightbearing status? When can I start putting weight on my foot?"',
            '**Gait:** "Is my walking pattern okay? What should I focus on?"',
            '**Stage 2:** "When will I start Stage 2? What should I prepare for?"',
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
            "**Stage 1 exercises only when protected or supervised** — heel wedge, support, or clinician supervision; never boot off with foot unsupported",
            "**Start at Week 6** (or when clinician says) — seated calf raises build strength safely",
            "**Follow mobilisation protocol** — don't rush ahead",
            `**Focus on good gait** — heel-to-toe pattern, use EVENup (${
              mdShopPair("evenup-leveler")
            }) to prevent back/hip pain`,
            "**Don't skip ahead** — Stage 2 starts when your clinician says you're ready",
            "**Be patient** — strength builds gradually",
          ],
        },
      ],
    },
  ],
};
