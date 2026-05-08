import type { SectionContent } from "@/components/course/types";
import pfShockwaveTherapyEquipment from "@/assets/pf-shockwave-therapy-equipment.png";

export const metadata = {
  slug: "shockwave-therapy",
  title: "Shockwave Therapy (ESWL)",
  description:
    "How shockwave treatment works, what to expect during sessions, success rates, and why three sessions is the standard protocol",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Extracorporeal shockwave therapy uses high-energy pressure waves to support healing in chronic tendon and fascia problems. For heel pain it is mainly used for chronic plantar fasciitis (and related Achilles insertional problems). Roughly six in ten patients report useful improvement.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "What is shockwave therapy?",
    },
    {
      type: "text",
      content:
        "The technology belongs to the same family as **extracorporeal shockwave lithotripsy (ESWL)** used to break kidney stones without a surgical incision – a form of lithotripsy still in routine use. In the 1990s, scaled-down devices were used in Europe to target calcific deposits in shoulder tendons with some success. Over the last 30 years, similar machines have been applied to other chronic tendon problems.",
    },
    {
      type: "text",
      content:
        "For heel pain, shockwave can be useful in **chronic plantar fasciitis**, chronic Achilles tendinopathy, and chronic or calcific tendinitis at the Achilles insertion. (Clinicians often abbreviate soft-tissue treatment as **ESWT**; patients may still see **ESWL** on paperwork – same underlying idea: energy delivered through the skin.)",
    },
    {
      type: "image",
      src: pfShockwaveTherapyEquipment,
      alt: "Shockwave therapy machine and applicator with gel on heel during treatment.",
      caption:
        "Console and handpiece: gel coupling and firm contact deliver pulses into deep tissues.",
    },
    {
      type: "heading",
      level: 2,
      text: "How does shockwave work?",
    },
    {
      type: "text",
      content:
        "The exact mechanism is still debated – **nobody really knows** the full story. Two main theories are discussed:",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "It creates a small amount of **controlled** fresh stimulus that may rekindle healing – like using bellows on embers that are dying down.",
        "It may affect **abnormal tiny nerve endings** that can proliferate in chronically irritated tissue.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Treatment delivery",
    },
    {
      type: "text",
      content:
        "Strong pulses of energy are delivered through a **gun-like handpiece** (often described as feeling a bit like a small pneumatic hammer against the skin). **Gel** is applied, as for diagnostic ultrasound, and with **firm pressure** the head transmits pulses into deeper layers.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Focused shockwave:** concentrates energy on a small target (similar concept to stone-focused lithotripsy).",
        "**Radial shockwave:** each pulse spreads like ripples on a pond, treating a **wider** surface area.",
        "Most research on **heel pain** has used **radial** devices.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Treatment protocol",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Each session lasts roughly **5 minutes** and can be uncomfortable or quite sore.",
        "A common protocol is **three sessions**, spaced about **5–14 days** apart.",
        "Treatment is **limited** on purpose: the idea is controlled stimulus, not endless blasting – too much risks making symptoms worse.",
        "After three sessions, **pause** to allow monitoring, continued stretching, and time to judge benefit.",
        "There is **no good evidence** that open-ended repeated courses from some private providers add benefit over a sensible initial block.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Results and effectiveness",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "About **60%** of patients report worthwhile improvement (varies by site and case mix).",
        "A practical time to judge response is about **three months after the third session**.",
        "**No clear improvement** → discuss a different strategy with your clinician.",
        "**Some improvement** → further gains sometimes accrue with continued conservative care.",
        "**Early gain then plateau** → occasionally a **second course** may be considered in selected situations.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Side effects and cautions",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Apart from **not helping everyone**, serious side effects are uncommon.",
        "Discomfort during treatment is expected; skin often looks **pink or red** afterwards.",
        "Rare bruising or skin bleeding – **extra caution** if you are on **anticoagulants** (blood thinners).",
        "Theoretical risk of **tissue overload** (including rupture) exists with any aggressive intervention; in experienced units with long follow-up, **significant rupture solely from shockwave** for typical plantar fasciitis protocols is considered **very uncommon** – but the principle remains: do not over-treat.",
        "Because biological effects are not fully mapped, shockwave is **not recommended** during **pregnancy** or while undergoing **active cancer treatment**.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Why treatment might fail",
    },
    {
      type: "text",
      content:
        "This is still an active research area. Shockwave aims to tilt the balance back toward healing versus daily micro-trauma. **Anecdotally**, if the calf and Achilles remain very tight, load through the foot stays high and shockwave may be **less likely** to succeed. Some patients who failed an initial course do better if **calf/Achilles tightness is addressed aggressively first**, then shockwave is revisited.",
    },
    {
      type: "heading",
      level: 2,
      text: "Availability, insurance, and governance",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Modest success rates and machine cost mean **NHS availability is patchy**; private clinics often offer it.",
        "Reasonable approach: **clinical assessment**, ideally **imaging to confirm diagnosis**, then **three sessions** first before committing to long packages.",
        "Many insurers cover shockwave; coding varies by provider – your clinic may quote codes such as **T6780** where used locally (confirm with your insurer and hospital).",
        "**NICE** (National Institute for Health and Care Excellence) publishes information on shockwave for musculoskeletal indications and recommends **shared decision-making** and **consent** documenting discussion of benefits, limits, and alternatives.",
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "Questions to ask before booking shockwave",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Has the diagnosis been clinically confirmed, and do I need an ultrasound first?",
                "Will you use radial or focused shockwave, and why?",
                "What exact protocol do you use (number of sessions, spacing, energy setting)?",
                "What pain level should I expect during and after treatment?",
                "How will we define success, and when will we reassess (typically around 3 months)?",
              ],
            },
          ],
        },
        {
          title: "Aftercare checklist",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Continue your stretching and load-management programme.",
                "Avoid booking endless sessions without a formal response review.",
                "Report unusual bruising or persistent pain, especially if on blood thinners.",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "tip",
      title: "Practical takeaway",
      content:
        "Treat shockwave as a **Level 2 adjunct** after proper stretching and load management – not a substitute for them. Three sessions, then reassess at about three months.",
    },
  ],
};
