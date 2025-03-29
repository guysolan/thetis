// Central source of truth for splint pricing and pack configurations

export const shippingCostsUS = {
    "18": 95,
    "36": 160,
    "72": 220,
};

export const shippingCostsUK = {
    "18": 79,
    "36": 124,
    "72": 163,
};

export const packSizes = [
    {
        name: "Small Pack",
        productId: "9410072478024",
        quantity: 18,
        pricePerUnit: 73,
        total: 18 * 73,
        shippingUS: shippingCostsUS["18"],
        shippingUK: shippingCostsUK["18"],
        value: "18",
        splints: {
            smallLeft: { qty: 3, name: "Small Left Splints" },
            smallRight: { qty: 3, name: "Small Right Splints" },
            largeLeft: { qty: 6, name: "Large Left Splints" },
            largeRight: { qty: 6, name: "Large Right Splints" },
        },
    },
    {
        name: "Medium Pack",
        productId: "9410107834696",

        quantity: 36,
        pricePerUnit: 72,
        total: 36 * 72,
        shippingUS: shippingCostsUS["36"],
        shippingUK: shippingCostsUK["36"],
        value: "36",
        splints: {
            smallLeft: { qty: 6, name: "Small Left Splints" },
            smallRight: { qty: 6, name: "Small Right Splints" },
            largeLeft: { qty: 12, name: "Large Left Splints" },
            largeRight: { qty: 12, name: "Large Right Splints" },
        },
    },
    {
        name: "Large Pack",
        productId: "9410122744136",

        quantity: 72,
        pricePerUnit: 71,
        total: 72 * 71,
        shippingUS: shippingCostsUS["72"],
        shippingUK: shippingCostsUK["72"],
        value: "72",
        splints: {
            smallLeft: { qty: 12, name: "Small Left Splints" },
            smallRight: { qty: 12, name: "Small Right Splints" },
            largeLeft: { qty: 24, name: "Large Left Splints" },
            largeRight: { qty: 24, name: "Large Right Splints" },
        },
    },
];

export const retailPrice = 130;
export const hcpcsCode = "Q4051";
export const altCptCode = "29425";

// Helper function to get a pack by size
export function getPackBySize(size: string) {
    return packSizes.find((pack) => pack.value === size) || packSizes[0];
}

// Helper to calculate price with appropriate shipping for region
export function calculateTotalPrice(
    pack: typeof packSizes[0],
    region: "US" | "UK" = "US",
) {
    const shipping = region === "US" ? pack.shippingUS : pack.shippingUK;
    return pack.total + shipping;
}

// For formatting currency consistently
export function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}
