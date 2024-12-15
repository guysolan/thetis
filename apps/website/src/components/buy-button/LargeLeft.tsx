// BuyButton.jsx
import React, { useEffect } from "react";

const BuyButton = () => {
  const componentId = "product-component-1734121818550";

  useEffect(() => {
    const loadScript = () => {
      const scriptURL =
        "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      script.onload = ShopifyBuyInit;
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(script);
    };

    const ShopifyBuyInit = () => {
      const client = window.ShopifyBuy.buildClient({
        domain: "f560c3-4.myshopify.com",
        storefrontAccessToken: "784883c28d6484a8804b44ae00adfb99",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "8572432253256",
          variantId: "47494539673928",
          node: document.getElementById(componentId),
          moneyFormat: "%C2%A3%7B%7Bamount%7D%7D",
          options: {
            product: {
              contents: {
                img: false,
                imgWithCarousel: false,
                select: false,
                button: true,
                title: false,
                price: false,
                description: false,
                buttonWithQuantity: false,
                quantity: false,
                options: false,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "50px",
                  },
                },
              },
            },
          },
        });
      });
    };

    // Initialize the Buy Button
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    // Cleanup function
    return () => {
      // Optional: Add cleanup if needed
      const existingScript = document.querySelector(
        `script[src="${scriptURL}"]`,
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div id={componentId}></div>;
};

export default BuyButton;
