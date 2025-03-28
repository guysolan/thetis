export interface Summary {
    settlement_id: string;
    marketplace_name: string;
    settlement_start_date: string;
    settlement_end_date: string;
    deposit_date: string;
    net_proceeds: number;
    beginning_balance: number;
    account_reserve_level: number;
    currency: string;
    region: string;
    country: string;
    sales: {
        total: number;
        product_charges: number;
        tax: number;
        shipping: number;
        inventory_reimbursements: number;
        other: number;
    };
    refunds: {
        total: number;
        refunded_sales: number;
        refunded_expenses: number;
    };
    expenses: {
        total: number;
        fba_fees: number;
        amazon_fees: number;
        promo_rebates: number;
        cost_of_advertising: number;
    };
}
