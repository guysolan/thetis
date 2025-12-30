const getCheckoutLink = async (size: "large" | "small", side: string) => {
    if (size === "large" && side === "right") {
        return "https://shop.thetismedical.com/cart/47494539608392:1?channel=buy_button";
    }
    if (size === "large" && side === "left") {
        return "https://shop.thetismedical.com/cart/47494539673928:1?channel=buy_button";
    }
    if (size === "small" && side === "right") {
        return "https://shop.thetismedical.com/cart/47494539641160:1?channel=buy_button";
    }
    if (size === "small" && side === "left") {
        return "https://shop.thetismedical.com/cart/47494539706696:1?channel=buy_button";
    }
    return null;
};

export default getCheckoutLink;
