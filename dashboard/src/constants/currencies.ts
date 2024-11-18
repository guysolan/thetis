export type Currency = Database["public"]["Enums"]["currency_type"];

import { Database } from "../database.types";

type CurrencyConfig = {
    symbol: string;
    code: string;
    name: string;
    decimal_digits: number;
    decimal_separator: string;
    thousands_separator: string;
};

export const currencies: Record<Currency, CurrencyConfig> = {
    USD: {
        symbol: "$",
        code: "USD",
        name: "US Dollar",
        decimal_digits: 2,
        decimal_separator: ".",
        thousands_separator: ",",
    },
    GBP: {
        symbol: "£",
        code: "GBP",
        name: "British Pound",
        decimal_digits: 2,
        decimal_separator: ".",
        thousands_separator: ",",
    },
    EUR: {
        symbol: "€",
        code: "EUR",
        name: "Euro",
        decimal_digits: 2,
        decimal_separator: ",",
        thousands_separator: ".",
    },
    AUD: {
        symbol: "A$",
        code: "AUD",
        name: "Australian Dollar",
        decimal_digits: 2,
        decimal_separator: ".",
        thousands_separator: ",",
    },
    CAD: {
        symbol: "C$",
        code: "CAD",
        name: "Canadian Dollar",
        decimal_digits: 2,
        decimal_separator: ".",
        thousands_separator: ",",
    },
    JPY: {
        symbol: "¥",
        code: "JPY",
        name: "Japanese Yen",
        decimal_digits: 0,
        decimal_separator: ".",
        thousands_separator: ",",
    },
    NZD: {
        symbol: "NZ$",
        code: "NZD",
        name: "New Zealand Dollar",
        decimal_digits: 2,
        decimal_separator: ".",
        thousands_separator: ",",
    },
} as const;

export const currencyKeys = Object.keys(currencies);

export const formatCurrency = (amount: number, currencyCode: Currency) => {
    // Validate currency code
    if (!currencies[currencyCode]) {
        console.error(`Invalid currency code: ${currencyCode}`);
        return undefined;
    }

    // Validate amount is a number
    if (typeof Number(amount) !== "number" || isNaN(Number(amount))) {
        console.error("Amount must be a valid number");
        return undefined;
    }

    const currency = currencies[currencyCode];
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: currency.decimal_digits,
            maximumFractionDigits: currency.decimal_digits,
        }).format(amount);
    } catch (error) {
        throw new Error(`Failed to format currency: ${error.message}`);
    }
};
