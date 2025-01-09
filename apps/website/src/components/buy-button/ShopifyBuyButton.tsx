import React, { useEffect, useState } from "react";

// Add types for Shopify Buy SDK
declare global {
  interface Window {
    ShopifyBuy: {
      buildClient: (config: {
        domain: string;
        storefrontAccessToken: string;
      }) => any;
      UI: {
        onReady: (client: any) => Promise<any>;
      };
    };
  }
}

interface ShopifyBuyButtonProps {
  variantId: string;
  productId?: string;
  position?: "left" | "right";
  size?: "small" | "large";
}

const ShopifyBuyButton: React.FC<ShopifyBuyButtonProps> = ({
  variantId,
  productId = "8572432253256",
  position = "left",
  size = "large",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const componentId = `product-component-${position}-${size}-${variantId}`;

  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const ShopifyBuyInit = () => {
      const client = window.ShopifyBuy.buildClient({
        domain: "f560c3-4.myshopify.com",
        storefrontAccessToken: "784883c28d6484a8804b44ae00adfb99",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        if (!document.getElementById(componentId)) return;

        ui.createComponent("product", {
          id: productId,
          variantId: variantId,
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
                button: {
                  "font-family": "Raleway, sans-serif",
                  "font-size": "16px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                  ":hover": {
                    "background-color": "#29A37C",
                  },
                  "background-color": "#29A37C",
                  ":focus": {
                    "background-color": "#29A37C",
                  },
                  "border-radius": "40px",
                  "padding-left": "60px",
                  "padding-right": "60px",
                },
              },
              text: {
                button: "Add to cart",
              },
            },
          },
        });
        setIsLoaded(true);
      });
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      script.onload = () => {
        ShopifyBuyInit();
      };
      document.head.appendChild(script);
    };

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
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
  }, [componentId, productId, variantId]);

  return <div id={componentId}>{!isLoaded && <div>Loading...</div>}</div>;
};

export default ShopifyBuyButton;
