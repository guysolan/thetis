import type { AchillesProduct, SplintPurchaseMatrix } from "./types";

/**
 * Single catalog for Achilles rupture recovery “buy/compare” links.
 *
 * **URLs:** Use site-relative paths (e.g. `/articles/...`) when the target is
 * on the **current** site (achilles-rupture.com in dev/prod). Use absolute
 * `https://...` for other domains (Thetis Medical, Amazon, OPED, etc.). The
 * main website app has its own routes — import splint matrix or duplicate only
 * if you need parity; relative `/articles/` links are wrong there.
 */
export const ACHILLES_RUPTURE_PRODUCTS: AchillesProduct[] = [
  {
    id: "aircast-airselect-boot",
    priority: "essential",
    name: "Aircast AirSelect (wedge CAM walker)",
    category: "Essential",
    keyBenefit:
      "Holds your ankle in plantarflexion with stacked heel wedges—widely issued, usually lighter, and often less expensive than hinged boots.",
    tags: ["boots", "mobility", "protection", "recovery"],
    imagePath: "/images/catalogue-products/aircast-vs-vacoped.png",
    description:
      "Typical wedge-based fracture boot used for Achilles care. Remove wedges only on your clinician’s schedule. Retailers and hospital suppliers vary by region—links are common purchase starting points, not endorsements.",
    features: [
      "Removable heel wedges for stepped angle reduction",
      "Often among the lighter common CAM walkers",
      "Broad retail and clinic availability",
    ],
    locations: {
      US: {
        price: "~$120–168 retail (size-dependent)",
        url: "https://www.amazon.com/dp/B00ZL316FO",
        dub: "https://dub.sh/cEOCW5B",
      },
      GB: {
        price: "~£120–165 inc VAT (typical retail)",
        url:
          "https://www.medicalsupplies.co.uk/aircast-airselect-elite-walker-boot.html",
        dub: "https://dub.sh/TlwOLyP",
      },
    },
    notes:
      "Manufacturer / IFU: Enovis Aircast AirSelect Elite. Re-verify price and SKU with your supplier.",
  },
  {
    id: "vacoped-achilles-boot",
    priority: "essential",
    name: "OPED VACOped (hinged Achilles boot)",
    category: "Essential",
    keyBenefit:
      "Hinged vacuum-liner boot with dialled plantarflexion—heavier and pricier; some teams prefer it for fine angle control and later ROM options.",
    tags: ["boots", "mobility", "protection", "recovery"],
    imagePath: "/images/catalogue-products/vacoped-angle-changing.jpg",
    description:
      "Premium hinged orthosis. Buy only what your protocol specifies (catalogue numbers differ). OPED runs regional shops; confirm duty/tax and sizing on the retailer page.",
    features: [
      "Dialled angle changes instead of only wedge removal",
      "Vacuum-bead liner for fit (manufacturer)",
      "Potential for controlled motion later when your team unlocks the hinge",
    ],
    locations: {
      US: {
        price: "~$275 (OPED US; size-dependent)",
        url:
          "https://opedmedical.com/product/vacoped-achilles-injury-fracture-orthosis-boot-formerly-vacocast-pro-achilles-boot/",
        dub: "https://dub.sh/NOaCy2D",
      },
      GB: {
        price: "~£252 inc VAT (typical UK retail)",
        url: "https://oped-uk.com/product/vacoped/",
        dub: "https://dub.sh/E7haeDP",
      },
    },
    notes:
      "Alternate US SKU (short boot): see reference product `vacoped-us-short-fracture-boot`.",
  },
  {
    id: "aircast-vs-vacoped-guide",
    priority: "reference",
    name: "Aircast vs VACOped (comparison article)",
    category: "Essential",
    keyBenefit:
      "Editorial guide on this site—trade-offs, costs, and what matters for compliance.",
    tags: ["boots", "education"],
    imagePath: "/images/catalogue-products/aircast-vs-vacoped.png",
    description:
      "Not a storefront. Use the two boot products above for buy links.",
    features: [],
    locations: {
      US: { url: "/articles/aircast-vs-vacoped" },
      GB: { url: "/articles/aircast-vs-vacoped" },
    },
  },
  {
    id: "thetis-night-splint",
    priority: "recommended",
    name: "Thetis Night Splint",
    category: "Sleep",
    keyBenefit:
      "Sleep soundly knowing your Achilles is protected and healing in the optimal position",
    tags: ["sleep", "recovery", "protection"],
    imagePath: "/images/catalogue-products/thetis-night-splint-side.jpg",
    description:
      "The only night splint specifically designed for Achilles rupture recovery. Patented in 2024.",
    features: [
      "Purpose-built for sleep",
      "Surgeon endorsed",
      "Safe, comfortable and hygienic",
    ],
    locations: {
      US: {
        price: "$90–120",
        url: "https://www.thetismedical.com/achilles-rupture-splint",
        dub: "https://dub.sh/mmkrz0Z",
      },
      GB: {
        price: "£60–70",
        url: "https://www.thetismedical.com/achilles-rupture-splint",
        dub: "https://dub.sh/QfjDjXQ",
      },
    },
  },
  {
    id: "evenup-leveler",
    priority: "recommended",
    name: "EVENup Leveler",
    category: "Mobility",
    keyBenefit:
      "Walk naturally and prevent back pain by keeping your hips level",
    tags: ["mobility", "comfort", "posture"],
    imagePath: "/images/catalogue-products/even-up.jpg",
    description:
      "Addresses leg-length discrepancy from wearing a boot. Prevents back, hip, and knee pain.",
    features: [
      "Universal fit",
      "Immediate comfort",
      "Prevents secondary injuries",
    ],
    locations: {
      US: {
        price: "$40–$50",
        url: "https://www.amazon.com/dp/B08FX2T2TF",
        dub: "https://dub.sh/Tce7MYz",
      },
      GB: {
        price: "£35–£40",
        url: "https://www.amazon.co.uk/dp/B08FX3YPWQ",
        dub: "https://dub.sh/vCqn9UM",
      },
    },
  },
  {
    id: "elevation-wedge",
    priority: "comfort",
    name: "Elevation Wedge",
    category: "Recovery",
    keyBenefit: "Speed up healing and reduce swelling with proper elevation",
    tags: ["recovery", "swelling", "comfort"],
    imagePath: "/images/catalogue-products/elevation-wedge.webp",
    description:
      "Critical for early recovery. UK guidelines recommend 23 hours/day elevation in first week.",
    features: [
      "Proper positioning",
      "Reduces swelling",
      "Improves circulation",
    ],
    locations: {
      US: {
        price: "$25–$70",
        url: "https://www.amazon.com/dp/B0D31CCML3",
        dub: "https://dub.sh/dHl0DIs",
      },
      GB: {
        price: "£15–£45",
        url: "https://www.amazon.co.uk/dp/B09TRGQM1H",
        dub: "https://dub.sh/mrIhBOY",
      },
    },
  },
  {
    id: "crutch-handles",
    priority: "comfort",
    name: "Crutch Handles",
    category: "Comfort",
    keyBenefit:
      "Reduce hand pain and fatigue by up to 40% while using crutches",
    tags: ["mobility", "comfort", "pain-relief"],
    imagePath: "/images/catalogue-products/soft-crutch-handles.jpg",
    description:
      "Clinical studies show 40% reduction in forearm pain and 35% decrease in paresthesia.",
    features: [
      "Memory foam comfort",
      "Easy installation",
      "Prevents nerve damage",
    ],
    locations: {
      US: {
        price: "$20–35",
        url: "https://www.amazon.com/dp/B09872TVZL",
        dub: "https://dub.sh/lMWs2Gi",
      },
      GB: {
        price: "£6–15",
        url: "https://www.amazon.co.uk/dp/B07WWH1HNM",
        dub: "https://dub.sh/uNbcZQV",
      },
    },
  },
  {
    id: "merino-wool-socks",
    priority: "comfort",
    name: "Merino Wool Socks",
    category: "Comfort",
    keyBenefit:
      "Stay comfortable all day with temperature-regulating, moisture-wicking socks",
    tags: ["comfort", "temperature", "hygiene"],
    imagePath: "/images/catalogue-products/merino-socks.webp",
    description:
      "Naturally moisture-wicking and temperature regulating. Reduces 'hot foot' issues.",
    features: ["Moisture-wicking", "Temperature regulating", "Antimicrobial"],
    locations: {
      US: {
        price: "$20–35",
        url: "https://www.amazon.com/dp/B077D9B2R5",
        dub: "https://dub.sh/1sWkX7U",
      },
      GB: {
        price: "£10–£25",
        url: "https://www.amazon.co.uk/dp/B077D9B2R5",
        dub: "https://dub.sh/Eg3OhV5",
      },
    },
  },
  {
    id: "waterproof-boot-cover",
    priority: "optional",
    name: "Waterproof Boot Cover",
    category: "Hygiene",
    keyBenefit: "Shower with confidence and keep your boot dry and fresh",
    tags: ["hygiene", "showering", "protection"],
    imagePath: "/images/catalogue-products/boot-bag.jpg",
    description:
      "Essential for safe showering. NHS guidelines specifically recommend waterproof covers.",
    features: ["Prevents infection", "Reusable design", "Secure seal"],
    locations: {
      US: {
        price: "$25–$45",
        url: "https://www.amazon.com/dp/B0BZ43M5RD",
        dub: "https://dub.sh/AYBbWxm",
      },
      GB: {
        price: "£20–£25",
        url: "https://limboproducts.co.uk/product/limbo-full-leg-m100/",
        dub: "https://dub.sh/STvghum",
      },
    },
  },
  {
    id: "antifungal-powder",
    priority: "optional",
    name: "Antifungal Powder",
    category: "Hygiene",
    keyBenefit: "Prevent infections and keep your foot fresh during recovery",
    tags: ["hygiene", "prevention", "comfort"],
    imagePath: "/images/catalogue-products/antifungal.jpg",
    description:
      "Prevents athlete's foot and other fungal issues in the warm boot environment.",
    features: ["Prevents infections", "Reduces friction", "Daily protection"],
    locations: {
      US: {
        price: "$12–20",
        url: "https://www.amazon.com/dp/B0885HPBHK",
        dub: "https://dub.sh/iveqHRR",
      },
      GB: {
        price: "£6–12",
        url: "https://www.amazon.co.uk/dp/B000KUAJCE",
        dub: "https://dub.sh/Va8uahi",
      },
    },
  },
  {
    id: "knee-scooter",
    priority: "optional",
    name: "Knee Scooter",
    category: "Mobility",
    keyBenefit: "Move freely and independently without crutch fatigue",
    tags: ["mobility", "independence", "comfort"],
    imagePath: "/images/catalogue-products/knee-scooter.jpg",
    description:
      "Alternative to crutches for those who find them difficult or painful to use.",
    features: [
      "No upper body strain",
      "Easy maneuverability",
      "Basket for items",
    ],
    locations: {
      US: {
        price: "$189–$330",
        url: "https://www.amazon.com/dp/B009VLBPI0",
        dub: "https://dub.sh/VQFJtCu",
      },
      GB: {
        price: "£100–£220",
        url: "https://www.amazon.co.uk/dp/B009VLBPI0",
        dub: "https://dub.sh/ilaYNui",
      },
    },
  },
  {
    id: "iwalk-hands-free-crutch",
    priority: "optional",
    name: "iWALK 3.0 (hands-free crutch)",
    category: "Mobility",
    keyBenefit:
      "Hands-free crutch alternative—some patients prefer it to knee scooters; confirm fit and protocol with your team.",
    tags: ["mobility", "independence", "comfort"],
    imagePath: "/images/catalogue-products/knee-scooter.jpg",
    description:
      "A steerable knee scooter isn’t the only option—iWALK-style devices let you keep hands free. Sizing and safety rules apply; not suitable for everyone.",
    features: [
      "Hands-free daily tasks when appropriate",
      "Often discussed as an alternative to standard crutches",
      "Check manufacturer fit criteria before buying",
    ],
    locations: {
      US: {
        price: "$149–199",
        url: "https://www.amazon.com/dp/B08WJRWR57",
        dub: "https://dub.sh/qXD0w1h",
      },
      GB: {
        price: "£149–199",
        url: "https://www.amazon.co.uk/dp/B08WJRWR57",
        dub: "https://dub.sh/soThT7T",
      },
    },
  },
  {
    id: "theraband-resistance-bands",
    priority: "optional",
    name: "TheraBand Resistance Bands",
    category: "Rehab",
    keyBenefit: "Build strength safely with progressive resistance training",
    tags: ["rehab", "strength", "recovery"],
    imagePath: "/images/catalogue-products/theraband.jpg",
    description:
      "Essential for later stages of rehabilitation and strength building.",
    features: [
      "Progressive resistance",
      "Safe strength building",
      "Multiple resistance levels",
    ],
    locations: {
      US: {
        price: "$12–20",
        url:
          "https://www.amazon.com/THERABAND-Latex-Yellow-Red-Green/dp/B000LX4KRA",
        dub: "https://dub.sh/Po1w433",
      },
      GB: {
        price: "£10–15",
        url:
          "https://www.amazon.co.uk/THERABAND-Latex-Yellow-Red-Green/dp/B000LX4KRA",
        dub: "https://dub.sh/q5Q2Wvk",
      },
    },
  },
  {
    id: "vacoped-boot-liner-op",
    priority: "optional",
    name: "Boot Liner (VACOped)",
    category: "Comfort",
    keyBenefit:
      "Keep your boot fresh and comfortable with removable, washable liners",
    tags: ["comfort", "hygiene", "protection"],
    imagePath: "/images/catalogue-products/boot-liner.jpg",
    description:
      "Removable, washable liners to keep your boot fresh and comfortable.",
    features: ["Removable", "Washable", "Odor control"],
    locations: {
      US: {
        price: "$40",
        url:
          "https://opedmedical.com/product/liner-black-grey-for-vacoped-achilles-injury-fracture-and-vacocast-fracture-walking-boot-orthoses/",
        dub: "https://dub.sh/r9GfzzH",
      },
      GB: {
        price: "£40",
        url: "https://oped-uk.com/product/vacoped-vacocast-liner/",
        dub: "https://dub.sh/OrPGhVG",
      },
    },
  },
  {
    id: "heel-wedge-insoles-generic",
    priority: "optional",
    name: "Heel Wedge Insoles",
    category: "Comfort",
    keyBenefit:
      "Provide additional heel elevation and comfort inside your boot",
    tags: ["comfort", "elevation", "support"],
    imagePath: "/images/catalogue-products/heel-lifts.jpg",
    description:
      "Additional heel elevation inserts that can be used inside your boot for extra comfort and support.",
    features: ["Adjustable height", "Easy to insert", "Comfortable padding"],
    locations: {
      US: {
        price: "$15–30",
        url: "https://www.amazon.com/dp/B0CTML6GND",
        dub: "https://dub.sh/RjpEJUY",
      },
      GB: {
        price: "£10–18",
        url: "https://www.amazon.co.uk/dp/B0CW5YQQ7P",
        dub: "https://dub.sh/chBAdO8",
      },
    },
  },
  {
    id: "ergonomic-crutches-mobilegs",
    priority: "supplement",
    name: "Ergonomic Crutches",
    category: "Mobility",
    keyBenefit: "Walk with less strain on your arms and shoulders",
    tags: ["mobility", "comfort", "independence"],
    imagePath: "/images/catalogue-products/ergonomic-crutches.jpg",
    features: [],
    locations: {
      US: {
        price: "$75–139",
        url:
          "https://www.amazon.com/Mobilegs-Ultra-Crutches-1-Pair/dp/B01N9OAW75",
        dub: "https://dub.sh/5fzFIuX",
      },
    },
  },
  {
    id: "adjustable-heel-lifts-b0ctml6gnd",
    priority: "supplement",
    name: "Adjustable Heel Lifts",
    category: "Rehab",
    keyBenefit: "Balance your leg length and walk more naturally",
    tags: ["rehab", "balance", "recovery"],
    imagePath: "/images/catalogue-products/heel-lifts.jpg",
    features: [],
    locations: {
      US: {
        price: "$10–15",
        url: "https://www.amazon.com/dp/B0CTML6GND",
        dub: "https://dub.sh/2Ks0ddw",
      },
      GB: {
        price: "£10–18",
        url: "https://www.amazon.co.uk/dp/B0CW5YQQ7P",
        dub: "https://dub.sh/QfLkkQB",
      },
    },
  },
  {
    id: "vacoped-liner-amazon-us-b00pyi93u6",
    priority: "supplement",
    name: "Boot Liner (Amazon US)",
    category: "Comfort",
    keyBenefit:
      "Keep your boot fresh and comfortable with removable, washable liners",
    tags: ["comfort", "hygiene", "protection"],
    imagePath: "/images/catalogue-products/boot-liner.jpg",
    features: [],
    notes:
      "Amazon listing; survival kit uses OPED direct (`vacoped-boot-liner-op`).",
    locations: {
      US: {
        price: "$40",
        url:
          "https://www.amazon.com/Liner-Achilles-Fracture-Orthosis-VACOcast/dp/B00PYI93U6",
        dub: "https://dub.sh/Fnchc4w",
      },
    },
  },
  {
    id: "evenup-leveler-us-legacy-b004",
    priority: "reference",
    name: "EVENup (legacy ASIN)",
    category: "Mobility",
    keyBenefit: "Older Amazon listing — prefer `evenup-leveler` when possible.",
    tags: ["mobility"],
    imagePath: "",
    features: [],
    notes:
      "Older listing; survival kit + course use B08FX ‘Large’ where possible.",
    locations: {
      US: {
        url: "https://www.amazon.com/dp/B004HY68DO",
        dub: "https://dub.sh/d6uYNQd",
      },
    },
  },
  {
    id: "evenup-leveler-uk-medium-b089",
    priority: "reference",
    name: "EVENup Medium (UK)",
    category: "Mobility",
    keyBenefit: "Alternate UK size vs Large row on `evenup-leveler`.",
    tags: ["mobility"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url: "https://www.amazon.co.uk/EvenUp-Evenup-Medium/dp/B089P6BT12",
        dub: "https://dub.sh/4sXT6Bi",
      },
    },
  },
  {
    id: "evenup-manufacturer-op",
    priority: "reference",
    name: "EVENup (OPED)",
    category: "Mobility",
    keyBenefit: "Manufacturer storefront for EVENup shoe lift.",
    tags: ["mobility"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url: "https://opedmedical.com/product/evenup-shoe-lift/",
        dub: "https://dub.sh/QF7vvKC",
      },
      GB: {
        url: "https://opedmedical.com/product/evenup-shoe-lift/",
        dub: "https://dub.sh/SUiRJlB",
      },
    },
  },
  {
    id: "crutch-handles-us-b0716xtj8l",
    priority: "reference",
    name: "Crutch handles (alternate ASIN)",
    category: "Comfort",
    keyBenefit: "Used on recovery-equipment-guide award card (US).",
    tags: ["mobility", "comfort"],
    imagePath: "/images/catalogue-products/soft-crutch-handles.jpg",
    features: [],
    locations: {
      US: {
        url: "https://www.amazon.com/dp/B0716XTJ8L",
        dub: "https://dub.sh/GO94vjq",
      },
      GB: {
        url: "https://www.amazon.co.uk/dp/B07K4VVN1V",
        dub: "https://dub.sh/ZbMfJ74",
      },
    },
  },
  {
    id: "waterproof-cover-us-b0bn9xwhjt",
    priority: "reference",
    name: "Waterproof boot cover (alternate US)",
    category: "Hygiene",
    keyBenefit: "Hygiene award card on recovery-equipment-guide (US).",
    tags: ["hygiene"],
    imagePath: "/images/catalogue-products/boot-bag.jpg",
    features: [],
    locations: {
      US: {
        url: "https://www.amazon.com/dp/B0BN9XWHJT",
        dub: "https://dub.sh/k8wdiUM",
      },
    },
  },
  {
    id: "waterproof-cover-uk-fasola-b0bn9",
    priority: "reference",
    name: "Waterproof cover (Fasola UK)",
    category: "Hygiene",
    keyBenefit: "Six-essential-items article (UK).",
    tags: ["hygiene"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url:
          "https://www.amazon.co.uk/Fasola-Shower-Non-Slip-Protector-Reusable/dp/B0BN9XWHJT",
        dub: "https://dub.sh/VYqmdmF",
      },
    },
  },
  {
    id: "limbo-waterproof-us-amazon",
    priority: "reference",
    name: "LimbO waterproof cast cover (Amazon US)",
    category: "Hygiene",
    keyBenefit: "Cited from Aircast vs VACOped article.",
    tags: ["hygiene"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url:
          "https://www.amazon.com/LimbO-Waterproof-Cast-Wound-Protector/dp/B00O7Z0ORS",
        dub: "https://dub.sh/c1alY5u",
      },
    },
  },
  {
    id: "limbo-shop-uk",
    priority: "reference",
    name: "Limbo (UK shop)",
    category: "Hygiene",
    keyBenefit: "Limbo products landing.",
    tags: ["hygiene"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url: "https://limboproducts.co.uk/shop/",
        dub: "https://dub.sh/fZ1Da7j",
      },
    },
  },
  {
    id: "knee-scooter-us-alt-b07dgr98vq",
    priority: "reference",
    name: "Knee scooter (alternate US)",
    category: "Mobility",
    keyBenefit: "Alternate listing vs `knee-scooter` (KneeRover).",
    tags: ["mobility"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url: "https://www.amazon.com/dp/B07DGR98VQ",
        dub: "https://dub.sh/E8mkssN",
      },
    },
  },
  {
    id: "vacoped-us-short-fracture-boot",
    priority: "reference",
    name: "VACOped short fracture boot (US)",
    category: "Boots",
    keyBenefit: "OPED US product variant.",
    tags: ["boots"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url:
          "https://opedmedical.com/product/vacoped-short-achilles-injury-fracture-walking-boot/",
        dub: "https://dub.sh/QEDwJOO",
      },
    },
  },
  {
    id: "enovis-airselect-manufacturer",
    priority: "reference",
    name: "Aircast AirSelect Elite (Enovis)",
    category: "Boots",
    keyBenefit: "Manufacturer product page.",
    tags: ["boots"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url: "https://enovis.com/products/aircast/airselect-elite",
        dub: "https://dub.sh/c10uDlA",
      },
      GB: {
        url: "https://enovis.com/products/aircast/airselect-elite",
        dub: "https://dub.sh/UoMP6J5",
      },
    },
  },
  {
    id: "competitor-night-splint-amazon-b09xlfcj9f",
    priority: "reference",
    name: "Generic Achilles night splint (Amazon)",
    category: "Sleep",
    keyBenefit: "Cited in articles — not Thetis.",
    tags: ["sleep"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url:
          "https://www.amazon.com/Achilles-Orthopaedic-Comfortable-Lightweight-Alternative/dp/B09XLFCJ9F",
        dub: "https://dub.sh/M7f8Dhu",
      },
    },
  },
  {
    id: "indoor-boot-shoe-cover-uk",
    priority: "reference",
    name: "Indoor boot shoe covers (UK)",
    category: "Comfort",
    keyBenefit: "Course: indoor boot cover.",
    tags: ["comfort"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url:
          "https://www.amazon.co.uk/Pieces-Walking-Recovery-Reusable-Waterproof/dp/B09PG83J8H",
        dub: "https://dub.sh/4ZuyQgV",
      },
    },
  },
  {
    id: "indoor-boot-shoe-cover-us",
    priority: "reference",
    name: "Indoor walking boot cover (US)",
    category: "Comfort",
    keyBenefit: "Course: indoor boot cover.",
    tags: ["comfort"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url:
          "https://www.amazon.com/MyShoeCovers-Fracture-Walking-Boot-Cover/dp/B075FC3T9B",
        dub: "https://dub.sh/f1YSQnO",
      },
    },
  },
  {
    id: "elevation-pillow-uk-six-essentials",
    priority: "reference",
    name: "Leg elevation pillow (UK)",
    category: "Recovery",
    keyBenefit:
      "Six-essential-items article — same ASIN as main elevation wedge row.",
    tags: ["recovery"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url: "https://www.amazon.co.uk/dp/B09TRGQM1H",
        dub: "https://dub.sh/3OcmPra",
      },
    },
  },
  {
    id: "crutch-grips-uk-flexivity",
    priority: "reference",
    name: "Crutch grip covers (UK Flexivity)",
    category: "Comfort",
    keyBenefit: "Six-essential-items article.",
    tags: ["comfort"],
    imagePath: "",
    features: [],
    locations: {
      GB: {
        url: "https://www.amazon.co.uk/s?k=Flexivity+crutch+handle+covers",
        dub: "https://dub.sh/X50YcYW",
      },
    },
  },
  {
    id: "donjoy-aircast-heel-wedge",
    priority: "reference",
    name: "Aircast heel wedges 01K (DonJoy store)",
    category: "Boot accessories",
    keyBenefit: "Heel wedge accessory listing.",
    tags: ["boots"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url: "https://www.donjoystore.com/aircast-heel-wedge",
        dub: "https://dub.sh/8DGUhql",
      },
    },
  },
  {
    id: "theraband-set-us-dp-short",
    priority: "reference",
    name: "TheraBand strip pack (short URL)",
    category: "Rehab",
    keyBenefit: "Same SKU as `theraband-resistance-bands` — short dp link.",
    tags: ["rehab"],
    imagePath: "",
    features: [],
    locations: {
      US: {
        url: "https://www.amazon.com/dp/B000LX4KRA",
        dub: "https://dub.sh/Y8kOiIX",
      },
    },
  },
];

const byId: Record<string, AchillesProduct> = {};
for (const p of ACHILLES_RUPTURE_PRODUCTS) {
  byId[p.id] = p;
}

export const ACHILLES_RUPTURE_PRODUCTS_BY_ID: Record<string, AchillesProduct> =
  byId;

/** Survival-kit page: main + optional rows only. */
export const SURVIVAL_KIT_PRODUCTS: AchillesProduct[] =
  ACHILLES_RUPTURE_PRODUCTS.filter((p) =>
    ["essential", "recommended", "comfort", "optional"].includes(p.priority)
  );

export const THETIS_SPLINT_PURCHASE_LINKS: SplintPurchaseMatrix = {
  US: {
    LL: "https://www.thetismedical.com/splint/large/left?region=us",
    LR: "https://www.thetismedical.com/splint/large/right?region=us",
    SL: "https://www.thetismedical.com/splint/small/left?region=us",
    SR: "https://www.thetismedical.com/splint/small/right?region=us",
  },
  UK: {
    LL: "https://www.thetismedical.com/splint/large/left?region=uk",
    LR: "https://www.thetismedical.com/splint/large/right?region=uk",
    SL: "https://www.thetismedical.com/splint/small/left?region=uk",
    SR: "https://www.thetismedical.com/splint/small/right?region=uk",
  },
  CA: {
    LL: "https://swiftbrace.com/products/thetis-achilles-night-splint",
    LR: "https://swiftbrace.com/products/thetis-achilles-night-splint",
    SL: "https://swiftbrace.com/products/thetis-achilles-night-splint",
    SR: "https://swiftbrace.com/products/thetis-achilles-night-splint",
  },
  DE: {
    LL: "https://www.amazon.de/dp/B09N5HBBKQ",
    LR: "https://www.amazon.de/dp/B09N5MVY1Q",
    SL: "https://www.amazon.de/dp/B09N5KH4F3",
    SR: "https://www.amazon.de/dp/B09N58H79F",
  },
  IT: {
    LL: "https://www.amazon.it/dp/B09N5HBBKQ",
    LR: "https://www.amazon.it/dp/B09N5MVY1Q",
    SL: "https://www.amazon.it/dp/B09N5KH4F3",
    SR: "https://www.amazon.it/dp/B09N58H79F",
  },
  FR: {
    LL: "https://www.amazon.fr/dp/B09N5HBBKQ",
    LR: "https://www.amazon.fr/dp/B09N5MVY1Q",
    SL: "https://www.amazon.fr/dp/B09N5KH4F3",
    SR: "https://www.amazon.fr/dp/B09N58H79F",
  },
  BE: {
    LL: "https://www.amazon.com.be/dp/B09N5HBBKQ",
    LR: "https://www.amazon.com.be/dp/B09N5MVY1Q",
    SL: "https://www.amazon.com.be/dp/B09N5KH4F3",
    SR: "https://www.amazon.com.be/dp/B09N58H79F",
  },
  NL: {
    LL: "https://www.amazon.nl/dp/B09N5HBBKQ",
    LR: "https://www.amazon.nl/dp/B09N5MVY1Q",
    SL: "https://www.amazon.nl/dp/B09N5KH4F3",
    SR: "https://www.amazon.nl/dp/B09N58H79F",
  },
  PL: {
    LL: "https://www.amazon.pl/dp/B09N5HBBKQ",
    LR: "https://www.amazon.pl/dp/B09N5MVY1Q",
    SL: "https://www.amazon.pl/dp/B09N5KH4F3",
    SR: "https://www.amazon.pl/dp/B09N58H79F",
  },
  ES: {
    LL: "https://www.amazon.es/dp/B09N5HBBKQ",
    LR: "https://www.amazon.es/dp/B09N5MVY1Q",
    SL: "https://www.amazon.es/dp/B09N5KH4F3",
    SR: "https://www.amazon.es/dp/B09N58H79F",
  },
  AU: {
    LL: "https://www.thetismedical.com/splint/large/left?region=au",
    LR: "https://www.thetismedical.com/splint/large/right?region=au",
    SL: "https://www.thetismedical.com/splint/small/left?region=au",
    SR: "https://www.thetismedical.com/splint/small/right?region=au",
  },
  PT: {
    LL: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
    LR: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
    SL: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
    SR: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
  },
};
