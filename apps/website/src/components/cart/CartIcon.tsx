import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { ShoppingCart } from "lucide-react";
import {
    $cartCount,
    $isLoading,
    initializeCart,
    openCart,
} from "@/lib/shopify/cart-store";
import { cn } from "@/lib/utils";

interface CartIconProps {
    className?: string;
}

export function CartIcon({ className }: CartIconProps) {
    const totalQuantity = useStore($cartCount);
    const isLoading = useStore($isLoading);

    useEffect(() => {
        initializeCart();
    }, []);

    return (
        <button
            onClick={openCart}
            className={cn(
                "relative flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md transition-colors",
                className,
            )}
            aria-label={`Shopping cart${
                totalQuantity > 0 ? `, ${totalQuantity} items` : ""
            }`}
        >
            <ShoppingCart className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">
                Cart
            </span>

            {!isLoading && totalQuantity > 0 && (
                <span className="-top-1 -right-1 absolute flex justify-center items-center bg-primary rounded-full min-w-[18px] h-[18px] font-bold text-[10px] text-white">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
            )}
        </button>
    );
}

export default CartIcon;
