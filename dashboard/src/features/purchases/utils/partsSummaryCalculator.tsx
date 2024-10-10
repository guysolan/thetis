interface PurchaseItem {
	type: "product" | "part";
	id: string;
	quantity: number;
}

interface Product {
	uuid: string;
	name: string;
	product_parts: { quantity: number; part: { name: string; uuid: string } }[];
}

interface Part {
	uuid: string;
	name: string;
	quantity: number;
}

interface PartsSummary {
	id: string;
	name: string;
	partsBefore: number;
	partsChange: number;
	partsAfter: number;
}

export function calculatePartsSummary(
	purchaseItems: PurchaseItem[],
	products: Product[],
	parts: Part[],
): PartsSummary[] {
	const partChanges: { [key: string]: number } = {};

	// Initialize part changes
	for (const part of parts) {
		partChanges[part.uuid] = 0;
	}

	// Calculate changes based on purchase items
	for (const item of purchaseItems) {
		if (item.type === "product") {
			console.log(item, "item");
			const product = products.find((p) => p.uuid === item.id);
			if (product) {
				for (const productPart of product.product_parts) {
					console.log(productPart, "productPart");
					partChanges[productPart.part.uuid] -=
						1 * productPart.quantity * item.quantity;
					console.log(partChanges, "partChanges");
				}
			}
		} else {
			partChanges[item.id] += item.quantity;
		}
	}

	// Create final summary
	return parts.map((part) => ({
		id: part.uuid,
		name: part.name,
		partsBefore: part.quantity,
		partsChange: partChanges[part.uuid],
		partsAfter: part.quantity + partChanges[part.uuid],
	}));
}
