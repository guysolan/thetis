const calculateItemTotal = (
  price: number | undefined,
  tax: number | undefined,
  quantity: number,
) => {
  return quantity * (price || 0) * (1 + (tax || 0));
};

export default calculateItemTotal;
