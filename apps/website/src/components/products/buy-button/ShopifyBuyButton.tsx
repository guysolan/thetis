import React, { useEffect } from "react";

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
  const componentId = `product-component-${position}-${size}-${variantId}`;

  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const ShopifyBuyInit = () => {
      const client = (window as any).ShopifyBuy.buildClient({
        domain: "thetismedical.myshopify.com",
        storefrontAccessToken: "784883c28d6484a8804b44ae00adfb99",
      });

      (window as any).ShopifyBuy.UI.onReady(client).then((ui: any) => {
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
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                  "text-align": "left",
                },
                title: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "semibold",
                  color: "#000000",
                },
                button: {
                  "font-family": "Raleway, sans-serif",
                  "font-size": "20px",
                  "font-weight": "600",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  ":hover": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "background-color": "hsl(161, 60%, 40%)",
                  ":focus": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "border-radius": "12px",
                  "padding-left": "24px",
                  "padding-right": "24px",
                  "align-self": "flex-start",
                },
                quantityInput: {
                  "font-size": "16px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                },
                price: {
                  "font-family": "Raleway, sans-serif",
                  color: "#000000",
                },
                compareAt: {
                  "font-family": "Raleway, sans-serif",
                  color: "#000000",
                },
                unitPrice: {
                  "font-family": "Raleway, sans-serif",
                  color: "#000000",
                },
              },
              text: {
                button: "Add to cart",
              },
              googleFonts: ["Raleway"],
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "500",
                  "font-size": "16px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                  "background-color": "hsl(161, 60%, 40%)",
                  ":hover": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  ":focus": {
                    "background-color": "hsl(161, 60%, 40%, 0.9)",
                  },
                  "border-radius": "40px",
                  "padding-left": "60px",
                  "padding-right": "60px",
                },
                quantityInput: {
                  "font-size": "16px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                },
                title: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "bold",
                  "font-size": "26px",
                  color: "#4c4c4c",
                },
                price: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "normal",
                  "font-size": "18px",
                  color: "#4c4c4c",
                },
                compareAt: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.299999999999999px",
                  color: "#4c4c4c",
                },
                unitPrice: {
                  "font-family": "Raleway, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.299999999999999px",
                  color: "#4c4c4c",
                },
              },
              googleFonts: ["Raleway"],
              text: {
                button: "Add to cart",
              },
            },
            option: {
              styles: {
                label: {
                  "font-family": "Raleway, sans-serif",
                  "font-size": "16px",
                },
                wrapper: {
                  gap: "10px",
                  "margin-top": "10px",
                  "text-align": "left",
                  width: "100%",
                  display: "flex",
                  "justify-content": "flex-start",
                },
              },
              contents: {
                select: false,
                button: true,
              },
              googleFonts: ["Raleway"],
              text: {
                button: "{{value}}",
              },
            },
            cart: {
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
                },
                title: {
                  color: "#000000",
                },
                header: {
                  color: "#000000",
                },
                lineItems: {
                  color: "#000000",
                },
                subtotalText: {
                  color: "#000000",
                },
                subtotal: {
                  color: "#000000",
                },
                notice: {
                  color: "#000000",
                },
                currency: {
                  color: "#000000",
                },
                close: {
                  color: "#000000",
                  ":hover": {
                    color: "#000000",
                  },
                },
                empty: {
                  color: "#000000",
                },
                noteDescription: {
                  color: "#000000",
                },
                discountText: {
                  color: "#000000",
                },
                discountIcon: {
                  fill: "#000000",
                },
                discountAmount: {
                  color: "#000000",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
              googleFonts: ["Raleway"],
            },
            toggle: {
              styles: {
                toggle: {
                  "font-family": "Raleway, sans-serif",
                  "background-color": "#29A37C",
                  ":hover": {
                    "background-color": "#29A37C",
                  },
                  ":focus": {
                    "background-color": "#29A37C",
                  },
                },
                count: {
                  "font-size": "24px",
                },
              },
              googleFonts: ["Raleway"],
            },
            lineItem: {
              styles: {
                variantTitle: {
                  color: "#000000",
                },
                title: {
                  color: "#000000",
                },
                price: {
                  color: "#000000",
                },
                fullPrice: {
                  color: "#000000",
                },
                discount: {
                  color: "#000000",
                },
                discountIcon: {
                  fill: "#000000",
                },
                quantity: {
                  color: "#000000",
                },
                quantityIncrement: {
                  color: "#000000",
                  "border-color": "#000000",
                },
                quantityDecrement: {
                  color: "#000000",
                  "border-color": "#000000",
                },
                quantityInput: {
                  color: "#000000",
                  "border-color": "#000000",
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
  }, [componentId, productId, variantId]);

  return (
    <div className="relative flex flex-col justify-start items-start mx-0 w-fit">
      <div id={componentId} />
    </div>
  );
};

export default ShopifyBuyButton;
