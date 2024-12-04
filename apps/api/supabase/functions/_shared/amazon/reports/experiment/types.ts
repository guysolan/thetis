export interface Summary {
    beginning_balance: number;
    account_reserve_level: number;
    sales: {
        total: number;
        product_charges: number;
        tax: number;
        shipping: number;
        inventory_reimbursements: number;
    };
    refunds: {
        total: number;
        fees: number;
        product_charges: number;
        tax: number;
        shipping: number;
    };
    expenses: {
        total: number;
        fba_fees: number;
        amazon_fees: number;
        promo_rebates: number;
    };
}
