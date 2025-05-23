export const options = {
    product: {
        styles: {
            product: {
                "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                },
            },
            title: {
                "font-family": "Raleway, sans-serif",
                "font-weight": "semibold",
                color: "#000000",
            },
            button: {
                "font-family": "Raleway, sans-serif",
                "font-size": "20px",
                "font-weight": "500",
                "padding-top": "20px",
                "padding-bottom": "20px",
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
        contents: {
            img: false,
            title: false,
            price: false,
        },
        text: {
            button: "Add to cart",
        },
        googleFonts: ["Raleway"],
    },
    productSet: {
        styles: {
            products: {
                "margin-top": "0px",
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
            quantityInput: {
                "font-size": "16px",
                "padding-top": "16px",
                "padding-bottom": "16px",
            },
            title: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "bold",
                "font-size": "26px",
                color: "#4c4c4c",
            },
            price: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "18px",
                color: "#4c4c4c",
            },
            compareAt: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.299999999999999px",
                color: "#4c4c4c",
            },
            unitPrice: {
                "font-family": "Helvetica Neue, sans-serif",
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
                display: "flex",
                gap: "10px",
                "margin-top": "0px",
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
};
