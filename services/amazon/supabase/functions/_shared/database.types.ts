export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      amazon_reports: {
        Row: {
          account_reserve_level: number | null;
          beginning_balance: number | null;
          country: string | null;
          created_at: string | null;
          currency: string | null;
          deposit_date: string | null;
          expenses_amazon_fees: number | null;
          expenses_cost_of_advertising: number | null;
          expenses_fba_fees: number | null;
          expenses_promo_rebates: number | null;
          expenses_total: number | null;
          id: number;
          marketplace_name: string | null;
          net_proceeds: number | null;
          refunds_refunded_expenses: number | null;
          refunds_refunded_sales: number | null;
          refunds_total: number | null;
          region: string | null;
          report_document_id: string;
          report_id: string;
          sales_inventory_reimbursements: number | null;
          sales_other: number | null;
          sales_product_charges: number | null;
          sales_shipping: number | null;
          sales_tax: number | null;
          sales_total: number | null;
          settlement_end_date: string | null;
          settlement_id: string;
          settlement_start_date: string | null;
          storage_path: string;
        };
        Insert: {
          account_reserve_level?: number | null;
          beginning_balance?: number | null;
          country?: string | null;
          created_at?: string | null;
          currency?: string | null;
          deposit_date?: string | null;
          expenses_amazon_fees?: number | null;
          expenses_cost_of_advertising?: number | null;
          expenses_fba_fees?: number | null;
          expenses_promo_rebates?: number | null;
          expenses_total?: number | null;
          id?: number;
          marketplace_name?: string | null;
          net_proceeds?: number | null;
          refunds_refunded_expenses?: number | null;
          refunds_refunded_sales?: number | null;
          refunds_total?: number | null;
          region?: string | null;
          report_document_id: string;
          report_id: string;
          sales_inventory_reimbursements?: number | null;
          sales_other?: number | null;
          sales_product_charges?: number | null;
          sales_shipping?: number | null;
          sales_tax?: number | null;
          sales_total?: number | null;
          settlement_end_date?: string | null;
          settlement_id: string;
          settlement_start_date?: string | null;
          storage_path: string;
        };
        Update: {
          account_reserve_level?: number | null;
          beginning_balance?: number | null;
          country?: string | null;
          created_at?: string | null;
          currency?: string | null;
          deposit_date?: string | null;
          expenses_amazon_fees?: number | null;
          expenses_cost_of_advertising?: number | null;
          expenses_fba_fees?: number | null;
          expenses_promo_rebates?: number | null;
          expenses_total?: number | null;
          id?: number;
          marketplace_name?: string | null;
          net_proceeds?: number | null;
          refunds_refunded_expenses?: number | null;
          refunds_refunded_sales?: number | null;
          refunds_total?: number | null;
          region?: string | null;
          report_document_id?: string;
          report_id?: string;
          sales_inventory_reimbursements?: number | null;
          sales_other?: number | null;
          sales_product_charges?: number | null;
          sales_shipping?: number | null;
          sales_tax?: number | null;
          sales_total?: number | null;
          settlement_end_date?: string | null;
          settlement_id?: string;
          settlement_start_date?: string | null;
          storage_path?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]][
      "CompositeTypes"
    ]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][
    CompositeTypeName
  ]
  : PublicCompositeTypeNameOrOptions extends
    keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
