import type { SectionContent } from "@/components/course/types";
import pfUltrasoundHeelScan from "@/assets/pf-ultrasound-heel-scan.png";

export const metadata = {
  slug: "scans-and-diagnosis",
  title: "Scans: Ultrasound vs MRI",
  description:
    "When imaging is helpful, what each scan shows, and what alternative diagnoses might explain your heel pain",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Both ultrasound and MRI can be useful. Both can diagnose plantar fasciitis, but in routine practice ultrasound is usually the preferred first-line imaging modality.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Ultrasound or MRI?",
    },
    {
      type: "text",
      content:
        "Both modalities can be useful. Ultrasound and magnetic resonance imaging can diagnose plantar fasciitis; in day-to-day practice ultrasound is usually chosen first.",
    },
    {
      type: "heading",
      level: 2,
      text: "Ultrasound",
    },
    {
      type: "section",
      title: "Advantages",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Very good at showing plantar fascia thickening (for example >4 mm) and hypoechoic degeneration.",
            "Can show peri-fascial oedema and calcifications.",
            "Allows dynamic examination and comparison with the opposite side.",
            "Quick, inexpensive, and widely available.",
            "No radiation.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Diagnostic performance",
      content: [
        {
          type: "text",
          content:
            "In experienced hands, sensitivity is roughly 80–90% and specificity about 85–95%.",
        },
      ],
    },
    {
      type: "image",
      src: pfUltrasoundHeelScan,
      alt: "Clinician performing ultrasound scan on patient heel with gel on skin.",
      caption:
        "Ultrasound is quick, non-invasive, and ideal for plantar fascia assessment at the heel.",
    },
    {
      type: "section",
      title: "Typical ultrasound findings",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Thickened plantar fascia at the calcaneal insertion.",
            "Reduced echogenicity.",
            "Loss of fibrillar pattern.",
            "Possible hyperaemia on Doppler.",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "MRI",
    },
    {
      type: "section",
      title: "Advantages",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Shows soft-tissue oedema and bone marrow oedema very well.",
            "Helpful when the diagnosis is uncertain.",
            "Can identify alternative diagnoses.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Typical MRI findings",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Thickened plantar fascia.",
            "Increased signal on T2/STIR sequences.",
            "Calcaneal bone marrow oedema.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Disadvantages",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Expensive.",
            "Less accessible.",
            "Usually unnecessary for straightforward cases.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "When MRI is useful",
      content: [
        {
          type: "text",
          content:
            "MRI is usually reserved when you suspect something other than straightforward plantar fasciitis, for example:",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Calcaneal stress fracture.",
            "Plantar fascia rupture.",
            "Tarsal tunnel syndrome.",
            "Heel pad atrophy.",
            "Tumour or inflammatory arthropathy.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Bottom line",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Ultrasound** — first-line imaging when plantar fasciitis is suspected.",
            "**MRI** — second-line when the diagnosis is unclear or another pathology is suspected.",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "What else could it be?",
    },
    {
      type: "text",
      content:
        "Problems affecting bone, nerve, joint, or tendon can all produce heel pain. By far the most common cause is plantar fasciitis. If your pain is typical and tenderness is in the usual place, plantar fasciitis can be diagnosed confidently in over 90% of cases without any scans.",
    },
    {
      type: "text",
      content:
        "If you are not getting better, it is much more likely that you have not stretched enough (or could lose a little more weight) than that you have a rare alternative diagnosis.",
    },
  ],
};
