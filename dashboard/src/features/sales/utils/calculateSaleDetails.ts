export interface OrderItem {
  id: string;
  quantity: number;
}

export const calculateOrderDetails = (
  orderItems: OrderItem[],
  products: any[],
) => {
  let totalCost = 0;
  const productsConsumed: {
    productId: string;
    productName: string;
    quantity: number;
    currentStock: number;
    remainingStock: number;
  }[] = [];

  for (const item of orderItems) {
    const selectedProduct = products.find(
      (p) => p.id.toString() === item.id,
    );
    if (selectedProduct) {
      totalCost += selectedProduct.price * item.quantity;
      updateProductsConsumed(
        selectedProduct.id,
        selectedProduct.name,
        item.quantity,
        selectedProduct.quantity,
      );
    }
  }

  function updateProductsConsumed(
    productId: string,
    productName: string,
    quantity: number,
    currentStock: number,
  ) {
    const existingProduct = productsConsumed.find((p) =>
      p.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.remainingStock -= quantity;
    } else {
      productsConsumed.push({
        productId,
        productName,
        quantity,
        currentStock,
        remainingStock: currentStock - quantity,
      });
    }
  }

  return { totalCost, productsConsumed };
};
