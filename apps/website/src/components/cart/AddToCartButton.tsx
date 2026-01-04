import React, { useState } from "react";
import { Button } from "@thetis/ui/button";
import { addToCart } from "@/lib/shopify/cart-store";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    variantId: string;
    quantity?: number;
    className?: string;
    size?: "default" | "sm" | "lg" | "xl";
    children?: React.ReactNode;
}

export function AddToCartButton({
    variantId,
    quantity = 1,
    className,
    size = "lg",
    children,
}: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const handleClick = async () => {
        setIsAdding(true);
        try {
            await addToCart(variantId, quantity);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isAdding}
            size={size}
            className={cn(
                "transition-all duration-200",
                justAdded && "bg-green-600 hover:bg-green-600",
                className,
            )}
        >
            {isAdding
                ? (
                    <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Adding...
                    </>
                )
                : justAdded
                ? (
                    <>
                        <Check className="mr-2 w-5 h-5" />
                        Added!
                    </>
                )
                : (
                    <>
                        <ShoppingCart className="mr-2 w-5 h-5" />
                        {children || "Add to Cart"}
                    </>
                )}
        </Button>
    );
}

export default AddToCartButton;
