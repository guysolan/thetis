export interface Equipment {
    priority: "essential" | "recommended" | "comfort" | "none" | "none";
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
        name: "Walking Boot",
        category: "Essential",
        priceRange: "$150-300",
        keyBenefit:
            "Protect your healing tendon and walk with confidence during recovery",
        actionUrl: "/articles/aircast-vs-vacoped-comparison",
        actionText: "Compare Options",
        isExternal: false,
        tags: ["mobility", "protection", "recovery"],
        imagePath: "/images/aircast-vs-vacoped.png",
    },
    {
        priority: "essential",
        name: "Thetis Night Splint",
        category: "Sleep",
        priceRange: "$90-120",
        keyBenefit:
            "Sleep soundly knowing your Achilles is protected and healing in the optimal position",
        actionUrl: "https://thetismedical.com/night-splint",
        actionText: "Buy Now",
        isExternal: true,
        tags: ["sleep", "recovery", "protection"],
        imagePath: "/images/thetis-night-splint-side.jpg",
    },
    {
        priority: "recommended",
        name: "EVENup Leveler",
        category: "Mobility",
        priceRange: "$35-40",
        keyBenefit:
            "Walk naturally and prevent back pain by keeping your hips level",
        actionUrl: "https://www.amazon.com/dp/B004HY68DO",
        actionText: "Buy",
        isExternal: true,
        tags: ["mobility", "comfort", "posture"],
        imagePath: "/images/even-up.jpg",
    },
    {
        priority: "recommended",
        name: "Waterproof Cover",
        category: "Hygiene",
        priceRange: "$25-45",
        keyBenefit: "Shower with confidence and keep your boot dry and fresh",
        actionUrl:
            "https://www.amazon.com/Qinaoco-Waterproof-Non-Slip-Watertight-Protector/dp/B0BZ43M5RD?sr=8-6",
        actionText: "Buy",
        isExternal: true,
        tags: ["hygiene", "showering", "protection"],
        imagePath: "/images/boot-bag.jpg",
    },
    {
        priority: "comfort",
        name: "Crutch Handles",
        category: "Comfort",
        priceRange: "$20-35",
        keyBenefit:
            "Reduce hand pain and fatigue by up to 40% while using crutches",
        actionUrl:
            "https://www.amazon.com/Crutch-Crutches-Replacement-Medical-Handgrips/dp/B09872TVZL?sr=8-6",
        actionText: "Buy",
        isExternal: true,
        tags: ["mobility", "comfort", "pain-relief"],
        imagePath: "/images/crutch-handles.jpg",
    },
    {
        priority: "comfort",
        name: "Elevation Wedge",
        category: "Recovery",
        priceRange: "$45-75",
        keyBenefit:
            "Speed up healing and reduce swelling with proper elevation",
        actionUrl:
            "https://www.amazon.com/MEGCXIT-Elevation-Circulation-Swelling-23-6%C3%9716-8%C3%978/dp/B0D31CCML3?sr=8-9",
        actionText: "Buy",
        isExternal: true,
        tags: ["recovery", "swelling", "comfort"],
        imagePath: "/images/elevation-wedge.webp",
    },
    {
        priority: "comfort",
        name: "Merino Socks",
        category: "Comfort",
        priceRange: "$20-35",
        keyBenefit:
            "Stay comfortable all day with temperature-regulating, moisture-wicking socks",
        actionUrl: "https://www.amazon.com/s?k=merino+wool+socks",
        actionText: "Browse",
        isExternal: true,
        tags: ["comfort", "temperature", "hygiene"],
        imagePath: "/images/merino-socks.webp",
    },
    {
        priority: "none",
        name: "Antifungal Powder",
        category: "Hygiene",
        priceRange: "$12-20",
        keyBenefit:
            "Prevent infections and keep your foot fresh during recovery",
        actionUrl:
            "https://www.amazon.com/Micro-Guard-Miconazole-Nitrate-Powder-Antifungal/dp/B006HSREVC?sr=8-9",
        actionText: "Buy",
        isExternal: true,
        tags: ["hygiene", "prevention", "comfort"],
        imagePath: "/images/antifungal.jpg",
    },
    {
        priority: "none",
        name: "TheraBand Resistance Bands",
        category: "Rehab",
        priceRange: "$9-17",
        keyBenefit:
            "Build strength safely with progressive resistance training",
        actionUrl:
            "https://www.amazon.com/THERABAND-Latex-Yellow-Red-Green/dp/B000LX4KRA",
        actionText: "Buy",
        isExternal: true,
        tags: ["rehab", "strength", "recovery"],
        imagePath: "/images/theraband.jpg",
    },
    {
        priority: "none",
        name: "Knee Scooter",
        category: "Mobility",
        priceRange: "$189-330",
        keyBenefit: "Move freely and independently without crutch fatigue",
        actionUrl: "https://www.amazon.com/dp/B07DGR98VQ",
        actionText: "Buy",
        isExternal: true,
        tags: ["mobility", "independence", "comfort"],
        imagePath: "/images/knee-scooter.jpg",
    },
    {
        priority: "none",
        name: "Ergonomic Crutches",
        category: "Mobility",
        priceRange: "$75-139",
        keyBenefit: "Walk with less strain on your arms and shoulders",
        actionUrl:
            "https://www.amazon.com/Mobilegs-Ultra-Crutches-1-Pair/dp/B01N9OAW75?sr=8-6",
        actionText: "Buy",
        isExternal: true,
        tags: ["mobility", "comfort", "independence"],
        imagePath: "/images/ergonomic-crutches.jpg",
    },
    {
        priority: "none",
        name: "Adjustable Heel Lifts",
        category: "Rehab",
        priceRange: "$10-15",
        keyBenefit: "Balance your leg length and walk more naturally",
        actionUrl: "https://www.amazon.com/dp/B0CTML6GND",
        actionText: "Buy",
        isExternal: true,
        tags: ["rehab", "balance", "recovery"],
        imagePath: "/images/heel-lifts.jpg",
    },
    {
        priority: "none",
        name: "Boot Liner",
        category: "Comfort",
        priceRange: "$40",
        keyBenefit:
            "Keep your boot fresh and comfortable with removable, washable liners",
        actionUrl:
            "https://www.amazon.com/Liner-Achilles-Fracture-Orthosis-VACOcast/dp/B00PYI93U6?sr=8-6",
        actionText: "Buy",
        isExternal: true,
        tags: ["comfort", "hygiene", "protection"],
        imagePath: "/images/boot-liner.jpg",
    },
];

export const bundles: Bundle[] = [
    {
        name: "Essential Starter",
        priceRange: "$300-400",
        features: [
            "Walking Boot",
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
            "Walking Boot",
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
            "Walking Boot",
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
