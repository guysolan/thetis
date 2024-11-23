import { useFormContext } from "react-hook-form";
import { PackageOrderItems } from '../features/sell-form/sellFormSchema';
import { OrderItem } from "../schema";

type OrderItemWithTotal = OrderItem & { total: number }
export const useOrderItems = (): OrderItemWithTotal[] => {
    const form = useFormContext();

    const mode = form.watch('mode')


    const orderItems = form.watch("order_items").map((oi) => ({ ...oi, total: oi.quantity_change * oi.item_price * (1 + oi.item_tax) }));

    if (mode === 'package') {
        const packageOrder = orderItems as PackageOrderItems[];
        return packageOrder?.flatMap((pkg: PackageOrderItems) =>
            pkg?.package_items?.map((pkg_i) => ({ ...pkg_i, quantity_change: pkg_i.quantity * pkg.quantity_change, total: pkg_i.quantity * pkg.quantity_change * pkg_i.price })) ?? []
        );
    } else {
        return orderItems
    }
};
