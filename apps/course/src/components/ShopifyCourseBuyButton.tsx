import React, { useEffect } from "react";

interface ShopifyCourseBuyButtonProps {
  productId: string; // Shopify product ID (numeric string)
  buttonText?: string;
  showPrice?: boolean;
  price?: string | null;
  isLoading?: boolean;
  className?: string;
}

export const ShopifyCourseBuyButton: React.FC<ShopifyCourseBuyButtonProps> = ({
  productId,
  buttonText = "Buy Now",
  showPrice = false,
  price = null,
  isLoading = false,
  className = "",
}) => {
  const componentId = `course-buy-button-${productId}`;

  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const ShopifyBuyInit = () => {
      const client = (window as any).ShopifyBuy.buildClient({
        domain: "shop.thetismedical.com",
        storefrontAccessToken: "784883c28d6484a8804b44ae00adfb99",
      });

      (window as any).ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (!document.getElementById(componentId)) return;

        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(componentId),
          moneyFormat: "%C2%A3%7B%7Bamount%7D%7D",
          options: {
            product: {
              contents: {
                img: false,
                title: false,
                price: false,
                options: false,
                select: false,
                button: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                  "text-align": "left",
                },
                button: {
                  "font-family": "inherit",
                  "font-size": "16px",
                  "font-weight": "600",
                  "padding-top": "12px",
                  "padding-bottom": "12px",
                  ":hover": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "background-color": "hsl(161, 60%, 40%)",
                  ":focus": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "border-radius": "8px",
                  "padding-left": "24px",
                  "padding-right": "24px",
                },
              },
              text: {
                button: buttonText,
              },
            },
            cart: {
              styles: {
                button: {
                  "font-family": "inherit",
                  "font-size": "16px",
                  "padding-top": "12px",
                  "padding-bottom": "12px",
                  ":hover": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "background-color": "hsl(161, 60%, 40%)",
                  ":focus": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "border-radius": "8px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {
              styles: {
                toggle: {
                  "font-family": "inherit",
                  "background-color": "hsl(161, 60%, 40%)",
                  ":hover": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  ":focus": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                },
              },
            },
          },
        });
      });
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      script.onload = ShopifyBuyInit;
      document.head.appendChild(script);
    };

    if ((window as any).ShopifyBuy) {
      if ((window as any).ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    return () => {
      const existingScript = document.querySelector(
        `script[src="${scriptURL}"]`,
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [componentId, productId, buttonText]);

  return (
    <div className={className}>
      {showPrice && (
        <div className="mb-3 text-center">
          {isLoading
            ? (
              <div className="bg-muted mx-auto rounded w-20 h-6 animate-pulse" />
            )
            : price
            ? (
              <div className="font-semibold text-foreground text-2xl">
                {price}
              </div>
            )
            : null}
        </div>
      )}
      <div id={componentId} />
    </div>
  );
};
