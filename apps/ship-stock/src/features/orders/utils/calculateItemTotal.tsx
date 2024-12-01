const calculateItemTotal = (price: number, tax: number, quantity: number) => {
  return quantity * price * (1 + tax);
};

export default calculateItemTotal;
