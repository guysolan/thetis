import { useOrderItems } from "../hooks/useOrderItems";
import { useFormContext } from "react-hook-form";

export const OrderSummary = () => {
  const form = useFormContext();
  const orderItems = useOrderItems();
  const orderType = form.watch("order_type");

  const subtotal = orderItems.reduce((sum, item) => sum + item.item_total, 0);
  const tax = orderItems.reduce(
    (sum, item) => sum + item.item_total * (item.item_tax || 0),
    0,
  );
  const total = subtotal + tax;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Order Summary</h3>
      <div className="space-y-2">
        {orderItems.map((item) => (
          <div key={item.item_id} className="flex justify-between">
            <span>
              {item.quantity_change} x {item.item_name}
            </span>
            <span>${item.item_total.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1 pt-2 border-t">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
