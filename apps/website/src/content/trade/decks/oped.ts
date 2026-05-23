import type { TradeDeckPartner } from "./types";

export const opedDeck: TradeDeckPartner = {
  id: "oped",
  name: "OPED Medical",
  meta: {
    title: "Achilles Recovery — OPED × Thetis",
    description:
      "Complete Achilles rupture recovery with OPED VACOped and EVENup, plus the Thetis night splint. B2B overview for OPED distributors and clinical teams.",
  },
  landing: {
    eyebrow: "OPED Medical × Thetis Medical",
    title: "Complete Achilles recovery",
    tagline: "VACOped by day. Thetis splint at night. EVENup for balance.",
    note:
      "A complementary product line for the first 12 weeks — conservative and surgical pathways.",
    badges: [
      "OPED VACOped · day immobilisation",
      "Thetis splint · night & rest",
      "EVENup · gait balance with boot",
    ],
    primaryCta: "Partnership enquiry",
    primaryCtaHref: "/become-a-partner",
  },
  ecosystem: {
    title: "One recovery pathway — three products",
    intro:
      "OPED already equips patients for daytime boot care and gait balance. The Thetis night splint completes the pathway for sleep, hygiene, and boot compliance — same ~30° plantarflexion, without sleeping in the VACOped.",
    products: [
      {
        name: "VACOped",
        brand: "partner",
        role: "Day · walking boot",
        description:
          "Hinged orthosis with vacuum-bead liner. Controlled angle progression and protected weight-bearing through the immobilisation phase.",
        imageSrc: "/images/catalogue-products/vacoped-angle-changing.png",
        imageAlt: "OPED VACOped walking boot with adjustable angle",
      },
      {
        name: "EVENup",
        brand: "partner",
        role: "Day · gait balance",
        description:
          "Shoe leveler for the uninjured foot. Reduces back, hip, and knee strain from the height difference while wearing a walking boot.",
        imageSrc: "/images/catalogue-products/even-up.png",
        imageAlt: "OPED EVENup shoe leveler worn with a walking boot",
      },
      {
        name: "Achilles Rupture Splint",
        brand: "thetis",
        role: "Night · rest & hygiene",
        description:
          "Patented plantarflexion splint (~200 g). Maintains tendon protection for sleep and showering — patients keep the VACOped off at night.",
        imageSrc: "/images/night_splint_bed_top_square.jpg",
        imageAlt: "Thetis Achilles rupture night splint in bed",
      },
    ],
  },
  pathway: {
    title: "Clinical pathway — VACOped + Thetis",
    intro:
      "Patients wear the VACOped during the day for mobilisation and angle control. At night and for hygiene, they switch to the Thetis splint — not a replacement for the boot, but the missing piece in most protocols.",
    dayLabel: "Day",
    dayText: "VACOped boot + EVENup on the other foot",
    nightLabel: "Night / rest",
    nightText: "Thetis splint — sleep, hygiene, boot off",
    note:
      "Aligns with modern Achilles rupture protocols: protected weight-bearing by day, maintained plantarflexion at night without boot sleep.",
  },
  hiddenSections: ["channels", "territories"],
};
