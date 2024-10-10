export interface PurchaseItem {
  type: "product" | "part";
  id: string;
  quantity: number;
}

export const calculatePurchaseDetails = (
  purchaseItems: PurchaseItem[],
  products: any[],
  parts: any[],
) => {
  let totalCost = 0;
  const partsConsumed: {
    partId: string;
    partName: string;
    quantity: number;
    currentStock: number;
    remainingStock: number;
  }[] = [];

  for (const item of purchaseItems) {
    if (item.type === "product") {
      const selectedProduct = products.find(
        (p) => p.id.toString() === item.id,
      );
      if (selectedProduct) {
        totalCost += selectedProduct.price * item.quantity;
        for (const pp of selectedProduct.product_parts) {
          updatePartsConsumed(
            pp.part_id,
            pp.part.name,
            pp.quantity * item.quantity,
          );
        }
      }
    } else if (item.type === "part") {
      const selectedPart = parts.find((p) => p.id.toString() === item.id);
      if (selectedPart) {
        totalCost += selectedPart.price * item.quantity;
        updatePartsConsumed(
          selectedPart.id,
          selectedPart.name,
          -item.quantity,
        );
      }
    }
  }

  function updatePartsConsumed(
    partId: string,
    partName: string,
    quantity: number,
  ) {
    const existingPart = partsConsumed.find((p) => p.partId === partId);
    const partDetails = parts.find((p) => p.id === partId);

    if (existingPart) {
      existingPart.quantity += quantity;
      existingPart.remainingStock -= quantity;
    } else {
      partsConsumed.push({
        partId,
        partName,
        quantity,
        currentStock: partDetails ? partDetails.quantity : 0,
        remainingStock: partDetails ? partDetails.quantity - quantity : 0,
      });
    }
  }

  return { totalCost, partsConsumed };
};
