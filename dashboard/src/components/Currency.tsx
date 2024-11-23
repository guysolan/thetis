import { Currency as CurrencyType, formatCurrency, CurrencyFormatError } from '../constants/currencies';

interface CurrencyProps {
    amount: number;
    currency: CurrencyType;
}

export function Currency({ amount, currency }: CurrencyProps) {
    const result = formatCurrency(amount, currency);

    if (typeof result !== 'string') {
        switch (result.type) {
            case 'INVALID_CURRENCY':
                return <span className="text-red-500">Invalid currency</span>;
            case 'INVALID_AMOUNT':
                return <span className="text-red-500">Invalid amount</span>;
            case 'FORMAT_ERROR':
                return <span className="text-red-500">Format error</span>;
        }
    }

    return <span>{result}</span>;
}
