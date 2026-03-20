import type { FAQItem, SectionContent } from "@/components/course/types";
import AircastVsVacopedComparison from "@/assets/aircast-vs-vacoped-comparison.png";

export const metadata = {
  slug: "choosing-your-boot",
  title: "Choosing Your Walking Boot",
  description: "Aircast vs VACOped comparison, essential equipment, and product recommendations",
  status: "drafting" as const,
};

export const faqs: FAQItem[] = [
  {
    question:
      "My hospital only offers [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) — should I buy a [VACOped](https://oped-uk.com/product/vacoped/) privately?",
    answer:
      "Probably not necessary. Research shows both boots lead to similar long-term outcomes. The [VACOped](https://oped-uk.com/product/vacoped/) may have some biomechanical advantages, but the [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) is a proven, effective option. Focus your budget on comfort items like the Thetis night splint instead.",
  },
  {
    question: "Can I sleep without any boot or splint?",
    answer:
      "**No.** This is one of the most common ways people re-rupture or lengthen their tendon. You need protection 24/7 in the early weeks. The Thetis night splint makes overnight protection much more comfortable.",
  },
  {
    question: "How do I shower without getting my boot wet?",
    answer:
      "You have two options: **(1)** Use a waterproof cover (Limbo) over your boot — keeps the boot dry but you can't wash your foot. **(2)** Use the Thetis night splint — it maintains the correct angle while allowing you to wash your foot and leg. Option 2 is better for hygiene. See [Washing & Hygiene](/standard/washing-and-hygiene) for full details.",
  },
  {
    question: "When can I stop wearing protection at night?",
    answer:
      "This varies by protocol — typically somewhere between weeks 6-10, once you've transitioned to a neutral angle and your clinician confirms it's safe. Always follow your specific protocol rather than a general timeline.",
  },
];

export const content: SectionContent = {
  intro:
    "Your walking boot is going to be your constant companion for the next 8-12 weeks. Most hospitals will provide you with a boot — use what they give you. Understanding your boot and the essential accessories makes a real difference to your comfort and recovery.",

  blocks: [
    {
      type: "alert",
      variant: "info",
      title: "Your hospital will usually provide a boot",
      content:
        "Most hospitals provide a walking boot as part of your treatment. **Use what they give you** — all boots used for Achilles rupture treatment work well when used correctly. This article focuses on the two most common boots ([Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) and [VACOped](https://oped-uk.com/product/vacoped/)), but there are other boots used for ATR treatment that work equally well.",
    },
    {
      type: "image",
      src: AircastVsVacopedComparison,
      alt: "Side-by-side comparison of Aircast and VACOped walking boots showing key features and prices",
      caption: "Aircast vs VACOped — the two most common boots, but not the only options",
    },
    {
      type: "section",
      title: "The two most common boots",
      content: [
        {
          type: "text",
          content:
            "The **[Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html)** and **[VACOped](https://oped-uk.com/product/vacoped/)** are the most commonly provided boots, but other boots (like the Rebound Air, Össur Walker, or generic NHS boots) are also used and work well. If your hospital gives you a different boot, that's fine — the principles are the same.",
        },
        {
          type: "card",
          title: "Quick comparison",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**[Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html):** Uses removable [wedges](https://www.healthandcare.co.uk/all-walker-boots/aircast-walker-boot-heel-support-wedges.html) to set ankle angle. Lighter, cheaper (~£120), widely available. Not waterproof.",
                "**[VACOped](https://oped-uk.com/product/vacoped/):** Uses a hinged mechanism with adjustable range of motion. Heavier, more expensive (~£300), may preserve muscle better. Waterproof (with fiddly setup).",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Aircast boot",
      content: [
        {
          type: "text",
          content:
            "The **[Aircast AIRSELECT ELITE](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html)** is the most commonly provided boot in the NHS and many other health systems. It's lightweight, affordable, and easy to adjust.",
        },
        {
          type: "card",
          title: "Aircast advantages",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Lightweight** — easier to move around",
                "**Inexpensive** — ~£120 + £20 for [wedges](https://www.healthandcare.co.uk/all-walker-boots/aircast-walker-boot-heel-support-wedges.html)",
                "**Widely available** — most hospitals stock them",
                "**Easy to adjust** — simple [wedge](https://www.healthandcare.co.uk/all-walker-boots/aircast-walker-boot-heel-support-wedges.html) removal as you progress",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "Aircast disadvantages",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Not waterproof** — you'll need a waterproof cover for showering (see [Washing & Hygiene](/standard/washing-and-hygiene))",
                "**Fixed position** — may cause more muscle wasting",
                "**Can cause lurching gait** — the step-change in angles can feel awkward",
                "**[Wedges](https://www.healthandcare.co.uk/all-walker-boots/aircast-walker-boot-heel-support-wedges.html) can cause foot sliding** — some people get toe pain; check wedges stay in place (self-adhesive wedges can help)",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "VACOped boot",
      content: [
        {
          type: "text",
          content:
            "The **[VACOped](https://oped-uk.com/product/vacoped/)** is considered by some specialists to be the gold standard. It has a hinged mechanism that allows controlled movement within a safe range.",
        },
        {
          type: "card",
          title: "VACOped advantages",
          variant: "default",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Better equinus position** — research suggests 48° vs 28° ankle angle (foot pointed down)",
                "**Dynamic recovery** — controlled range of motion may reduce muscle wasting",
                "**Waterproof** — can swim with proper setup (requires removing inner lining)",
                "**Vacuum-bead liner** — may help prevent pressure sores",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "VACOped disadvantages",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "**Expensive** — ~£300 vs £120 for [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html)",
                "**Heavier and bulkier** — some find walking harder initially",
                "**Complex adjustment** — more challenging to set up",
                "**May need EVENup shoe leveler** — both Aircast and VACOped create leg-length difference; EVENup prevents back/hip pain",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "Which boot should I use?",
      content:
        "**Use what your hospital provides** — all boots used for ATR treatment work well. [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html), [VACOped](https://oped-uk.com/product/vacoped/), Rebound Air, Össur, or generic NHS boots — all are valid options with similar outcomes. If you're buying privately and have the budget, VACOped may offer some advantages. But the key is **following your protocol correctly**, not which boot you have.",
    },
    {
      type: "section",
      title: "The sleeping problem (and solution)",
      content: [
        {
          type: "text",
          content:
            "Here's what nobody tells you upfront: **sleeping in your boot is miserable**. Both [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) and [VACOped](https://oped-uk.com/product/vacoped/) are hot, heavy, and uncomfortable to sleep in. But tendon protection overnight is absolutely essential — removing your boot while sleeping is one of the most common causes of re-rupture. We cover this in detail in [Sleeping with Your Boot](/standard/sleeping-with-boot).",
        },
        {
          type: "card",
          title: "The Thetis Night Splint",
          description: "A better solution for overnight protection",
          variant: "highlight",
          content: [
            {
              type: "text",
              content:
                "The **Thetis Achilles Rupture Splint** is specifically designed for sleeping. It's lightweight, breathable, and maintains the correct plantarflexed (pointed-down) position while you sleep. Many patients find it dramatically improves sleep quality compared to wearing the full boot.",
            },
            {
              type: "list",
              style: "bullet",
              items: [
                "**Lightweight** — much lighter than a walking boot",
                "**Breathable** — cooler for sleeping",
                "**Maintains correct angle** — keeps your tendon protected",
                "**Washable liner** — better hygiene than boot liners",
                "**Also works for showering** — maintains protection while you wash your foot",
              ],
            },
          ],
        },
        {
          type: "tip",
          title: "Showering options",
          content:
            "For washing, you have two main options: **(1)** Wear a waterproof cover (like a Limbo) over your boot — this protects the boot but means you can't wash the foot itself. **(2)** Use the **Thetis night splint** which maintains the correct angle while allowing you to wash your foot and leg properly. We cover this in detail in [Washing & Hygiene](/standard/washing-and-hygiene).",
        },
      ],
    },
    {
      type: "section",
      title: "Essential equipment checklist",
      content: [
        {
          type: "checklist",
          title: "Equipment you'll need",
          items: [
            {
              text: "**Walking boot** (Aircast or VACOped) — usually provided by hospital — [Aircast UK](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) | [Aircast Amazon US](https://www.amazon.com/s?k=aircast+airselect+elite+walking+boot) | [VACOped UK](https://oped-uk.com/product/vacoped/) | [VACOped US](https://opedmedical.com/product/vacoped-short-achilles-injury-fracture-walking-boot/)",
            },
            {
              text: "**Crutches** — usually provided by hospital",
            },
            {
              text: "**Thetis Night Splint** — for comfortable, safe sleeping and showering — [Buy](https://thetismedical.com/night-splint)",
            },
            {
              text: "**Waterproof cover** (Limbo) — if using Aircast and want to shower with boot on — [UK](https://limboproducts.co.uk/product/limbo-full-leg-m100/) | [US](https://www.amazon.com/Qinaoco-Waterproof-Non-Slip-Watertight-Protector/dp/B0BZ43M5RD); see [Washing & Hygiene](/standard/washing-and-hygiene)",
            },
            {
              text: "**EVENup shoe leveler** — with both Aircast and VACOped to prevent back/hip pain from leg-length difference — [UK](https://www.amazon.co.uk/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX3YPWQ) | [US](https://www.amazon.com/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX2T2TF)",
            },
            {
              text: "**Ergonomic crutch handles** — optional but reduces hand pain — [UK](https://www.amazon.co.uk/s?k=crutch+handles+soft+grips) | [US](https://www.amazon.com/Crutch-Crutches-Replacement-Medical-Handgrips/dp/B09872TVZL)",
            },
            {
              text: "**Leg elevation wedge** — more comfortable than stacking pillows — [UK](https://www.amazon.co.uk/s?k=leg+elevation+pillow+wedge) | [US](https://www.amazon.com/MEGCXIT-Elevation-Circulation-Swelling-23-6%C3%9716-8%C3%978/dp/B0D31CCML3)",
            },
            {
              text: "**Small backpack or bum bag** — essential for carrying things on crutches",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Full setup costs",
      content: [
        {
          type: "text",
          content: "Here's what a complete setup typically costs (approximate, prices vary):",
        },
        {
          type: "card",
          title: "Aircast complete setup",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Aircast boot: ~£116 / $150 — [UK](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) | [Amazon US](https://www.amazon.com/s?k=aircast+airselect+elite+walking+boot)",
                "Wedges: ~£21 / $27 — [UK](https://www.healthandcare.co.uk/all-walker-boots/aircast-walker-boot-heel-support-wedges.html)",
                "Limbo waterproof cover: ~£23 / $30 — [UK](https://limboproducts.co.uk/product/limbo-full-leg-m100/) | [US](https://www.amazon.com/Qinaoco-Waterproof-Non-Slip-Watertight-Protector/dp/B0BZ43M5RD)",
                "EVENup shoe leveler: ~£28 / $36 — [UK](https://www.amazon.co.uk/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX3YPWQ) | [US](https://www.amazon.com/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX2T2TF)",
                "Thetis Night Splint: ~£65 / $93 — [Buy](https://thetismedical.com/night-splint)",
                "**Total: ~£250 / $330**",
              ],
            },
          ],
        },
        {
          type: "card",
          title: "VACOped complete setup",
          variant: "muted",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "VACOped boot: ~£291 / $378 — [UK](https://oped-uk.com/product/vacoped/) | [US](https://opedmedical.com/product/vacoped-short-achilles-injury-fracture-walking-boot/)",
                "Replacement liner (for swimming): ~£31 / $40 — [UK](https://oped-uk.com/product/vacoped-vacocast-liner/) | [US](https://opedmedical.com/product/liner-black-grey-for-vacoped-achilles-injury-fracture-and-vacocast-fracture-walking-boot-orthoses/)",
                "EVENup shoe leveler: ~£28 / $36 — [UK](https://www.amazon.co.uk/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX3YPWQ) | [US](https://www.amazon.com/EVENup-Shoe-Balancer-Leveler-Large/dp/B08FX2T2TF)",
                "Thetis Night Splint: ~£65 / $93 — [Buy](https://thetismedical.com/night-splint)",
                "**Total: ~£415 / $547**",
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
      title: "Key takeaways",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Both [Aircast](https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html) and [VACOped](https://oped-uk.com/product/vacoped/) work** — use what your hospital provides",
            "**Sleeping in your boot is miserable** — the Thetis night splint is a game-changer",
            "**You need protection 24/7** — never remove your boot/splint without clinical guidance",
            "**Budget for comfort items** — a night splint and proper shower solution are worth it",
          ],
        },
      ],
    },
  ],
};
