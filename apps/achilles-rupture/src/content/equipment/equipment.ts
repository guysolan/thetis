import { resolveProductUrlById } from "@thetis/catalogue";

function productUrl(id: string, region: "us" | "gb" = "us") {
  const u = resolveProductUrlById(id, region);
  if (!u) throw new Error(`Missing product URL: ${id} (${region})`);
  return u;
}

export interface Equipment {
  priority: "essential" | "recommended" | "comfort" | "none";
  name: string;
  category: string;
  priceRange: string;
  keyBenefit: string;
  actionUrl: string;
  actionText: string;
  isExternal?: boolean;
  tags: string[];
  imagePath: string;
}

export interface Bundle {
  name: string;
  priceRange: string;
  isPopular?: boolean;
  features: string[];
}

export const equipmentList: Equipment[] = [
  {
    priority: "essential",
    name: "Aircast AirSelect (wedge boot)",
    category: "Essential",
    priceRange: "$120-168",
    keyBenefit:
      "Common wedge CAM walker—holds plantarflexion; widely stocked and usually lighter than hinged boots",
    actionUrl: productUrl("aircast-airselect-boot"),
    actionText: "Shop",
    isExternal: true,
    tags: ["boots", "mobility", "protection"],
    imagePath: "/images/catalogue-products/aircast-vs-vacoped.png",
  },
  {
    priority: "essential",
    name: "VACOped (hinged boot)",
    category: "Essential",
    priceRange: "$252+",
    keyBenefit:
      "Hinged vacuum-liner boot—fine angle control; heavier and pricier; match what your team prescribed",
    actionUrl: productUrl("vacoped-achilles-boot"),
    actionText: "Shop",
    isExternal: true,
    tags: ["boots", "mobility", "protection"],
    imagePath: "/images/catalogue-products/vacoped-angle-changing.jpg",
  },
  {
    priority: "essential",
    name: "Thetis Night Splint",
    category: "Sleep",
    priceRange: "$90-120",
    keyBenefit:
      "Sleep soundly knowing your Achilles is protected and healing in the optimal position",
    actionUrl: productUrl("thetis-night-splint"),
    actionText: "Buy Now",
    isExternal: true,
    tags: ["sleep", "recovery", "protection"],
    imagePath: "/images/catalogue-products/thetis-night-splint-side.jpg",
  },
  {
    priority: "recommended",
    name: "EVENup Leveler",
    category: "Mobility",
    priceRange: "$35-40",
    keyBenefit:
      "Walk naturally and prevent back pain by keeping your hips level",
    actionUrl: productUrl("evenup-leveler"),
    actionText: "Buy",
    isExternal: true,
    tags: ["mobility", "comfort", "posture"],
    imagePath: "/images/catalogue-products/even-up.jpg",
  },
  {
    priority: "recommended",
    name: "Waterproof Cover",
    category: "Hygiene",
    priceRange: "$25-45",
    keyBenefit: "Shower with confidence and keep your boot dry and fresh",
    actionUrl: productUrl("waterproof-boot-cover"),
    actionText: "Buy",
    isExternal: true,
    tags: ["hygiene", "showering", "protection"],
    imagePath: "/images/catalogue-products/boot-bag.jpg",
  },
  {
    priority: "comfort",
    name: "Crutch Handles",
    category: "Comfort",
    priceRange: "$20-35",
    keyBenefit:
      "Reduce hand pain and fatigue by up to 40% while using crutches",
    actionUrl: productUrl("crutch-handles"),
    actionText: "Buy",
    isExternal: true,
    tags: ["mobility", "comfort", "pain-relief"],
    imagePath: "/images/catalogue-products/soft-crutch-handles.jpg",
  },
  {
    priority: "comfort",
    name: "Elevation Wedge",
    category: "Recovery",
    priceRange: "$45-75",
    keyBenefit: "Speed up healing and reduce swelling with proper elevation",
    actionUrl: productUrl("elevation-wedge"),
    actionText: "Buy",
    isExternal: true,
    tags: ["recovery", "swelling", "comfort"],
    imagePath: "/images/catalogue-products/elevation-wedge.webp",
  },
  {
    priority: "comfort",
    name: "Merino Socks",
    category: "Comfort",
    priceRange: "$20-35",
    keyBenefit:
      "Stay comfortable all day with temperature-regulating, moisture-wicking socks",
    actionUrl: productUrl("merino-wool-socks"),
    actionText: "Browse",
    isExternal: true,
    tags: ["comfort", "temperature", "hygiene"],
    imagePath: "/images/catalogue-products/merino-socks.webp",
  },
  {
    priority: "none",
    name: "Antifungal Powder",
    category: "Hygiene",
    priceRange: "$12-20",
    keyBenefit: "Prevent infections and keep your foot fresh during recovery",
    actionUrl: productUrl("antifungal-powder"),
    actionText: "Buy",
    isExternal: true,
    tags: ["hygiene", "prevention", "comfort"],
    imagePath: "/images/catalogue-products/antifungal.jpg",
  },
  {
    priority: "none",
    name: "TheraBand Resistance Bands",
    category: "Rehab",
    priceRange: "$9-17",
    keyBenefit: "Build strength safely with progressive resistance training",
    actionUrl: productUrl("theraband-resistance-bands"),
    actionText: "Buy",
    isExternal: true,
    tags: ["rehab", "strength", "recovery"],
    imagePath: "/images/catalogue-products/theraband.jpg",
  },
  {
    priority: "none",
    name: "Knee Scooter",
    category: "Mobility",
    priceRange: "$189-330",
    keyBenefit: "Move freely and independently without crutch fatigue",
    actionUrl: productUrl("knee-scooter"),
    actionText: "Buy",
    isExternal: true,
    tags: ["mobility", "independence", "comfort"],
    imagePath: "/images/catalogue-products/knee-scooter.jpg",
  },
  {
    priority: "none",
    name: "Ergonomic Crutches",
    category: "Mobility",
    priceRange: "$75-139",
    keyBenefit: "Walk with less strain on your arms and shoulders",
    actionUrl: productUrl("ergonomic-crutches-mobilegs"),
    actionText: "Buy",
    isExternal: true,
    tags: ["mobility", "comfort", "independence"],
    imagePath: "/images/catalogue-products/ergonomic-crutches.jpg",
  },
  {
    priority: "none",
    name: "Adjustable Heel Lifts",
    category: "Rehab",
    priceRange: "$10-15",
    keyBenefit: "Balance your leg length and walk more naturally",
    actionUrl: productUrl("adjustable-heel-lifts-b0ctml6gnd"),
    actionText: "Buy",
    isExternal: true,
    tags: ["rehab", "balance", "recovery"],
    imagePath: "/images/catalogue-products/heel-lifts.jpg",
  },
  {
    priority: "none",
    name: "Boot Liner",
    category: "Comfort",
    priceRange: "$40",
    keyBenefit:
      "Keep your boot fresh and comfortable with removable, washable liners",
    actionUrl: productUrl("vacoped-liner-amazon-us-b00pyi93u6"),
    actionText: "Buy",
    isExternal: true,
    tags: ["comfort", "hygiene", "protection"],
    imagePath: "/images/catalogue-products/boot-liner.jpg",
  },
];

export const bundles: Bundle[] = [
  {
    name: "Essential Starter",
    priceRange: "$300-400",
    features: [
      "Aircast or VACOped boot",
      "Thetis Night Splint",
      "EVENup Leveler",
      "Waterproof Cover",
    ],
  },
  {
    name: "Comfort Plus",
    priceRange: "$400-550",
    isPopular: true,
    features: [
      "Aircast or VACOped boot",
      "Thetis Night Splint",
      "EVENup Leveler",
      "Waterproof Cover",
      "Crutch Handles",
      "Elevation Wedge",
    ],
  },
  {
    name: "Ultimate Recovery",
    priceRange: "$600-750",
    features: [
      "Aircast or VACOped boot",
      "Thetis Night Splint",
      "EVENup Leveler",
      "Waterproof Cover",
      "Ergonomic Crutches",
      "Elevation Wedge",
      "Merino Socks",
      "Antifungal Powder",
      "Breg Polar Care Wave",
      "TheraBand Resistance Bands",
      "Knee Scooter",
    ],
  },
];

export const priorityLabels = {
  essential: {
    emoji: "🥇",
    label: "Essential - Must have for recovery",
  },
  recommended: {
    emoji: "🥈",
    label: "Highly Recommended - Significantly improves recovery",
  },
  comfort: {
    emoji: "🥉",
    label: "Comfort Enhancement - Makes recovery easier",
  },
  none: {
    emoji: "✨",
    label: "Nice to Have - Optional extras",
  },
};
