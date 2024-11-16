export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string | null
          code: string | null
          company_id: number | null
          country: string | null
          created_at: string
          holds_stock: boolean | null
          id: number
          is_active: boolean | null
          is_default_billing: boolean | null
          is_default_shipping: boolean | null
          line_1: string | null
          line_2: string | null
          name: string | null
          region: string | null
        }
        Insert: {
          city?: string | null
          code?: string | null
          company_id?: number | null
          country?: string | null
          created_at?: string
          holds_stock?: boolean | null
          id?: number
          is_active?: boolean | null
          is_default_billing?: boolean | null
          is_default_shipping?: boolean | null
          line_1?: string | null
          line_2?: string | null
          name?: string | null
          region?: string | null
        }
        Update: {
          city?: string | null
          code?: string | null
          company_id?: number | null
          country?: string | null
          created_at?: string
          holds_stock?: boolean | null
          id?: number
          is_active?: boolean | null
          is_default_billing?: boolean | null
          is_default_shipping?: boolean | null
          line_1?: string | null
          line_2?: string | null
          name?: string | null
          region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      amazon_reports: {
        Row: {
          created_at: string
          id: number
          report_id: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          id?: number
          report_id: string
          storage_path: string
        }
        Update: {
          created_at?: string
          id?: number
          report_id?: string
          storage_path?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_number: string | null
          created_at: string
          id: number
          name: string
          tax_number: string | null
        }
        Insert: {
          company_number?: string | null
          created_at?: string
          id?: number
          name: string
          tax_number?: string | null
        }
        Update: {
          company_number?: string | null
          created_at?: string
          id?: number
          name?: string
          tax_number?: string | null
        }
        Relationships: []
      }
      company_users: {
        Row: {
          company_id: number
          is_admin: boolean | null
          user_id: number
        }
        Insert: {
          company_id: number
          is_admin?: boolean | null
          user_id: number
        }
        Update: {
          company_id?: number
          is_admin?: boolean | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company_id: number | null
          created_at: string
          email: string | null
          id: number
          is_default: boolean | null
          name: string
          phone: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          is_default?: boolean | null
          name: string
          phone?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          is_default?: boolean | null
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      default_company: {
        Row: {
          company_id: number
          user_id: number
        }
        Insert: {
          company_id: number
          user_id: number
        }
        Update: {
          company_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "default_company_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "default_company_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      item_changes: {
        Row: {
          address_id: number | null
          id: number
          item_id: number
          quantity_change: number
        }
        Insert: {
          address_id?: number | null
          id?: number
          item_id: number
          quantity_change: number
        }
        Update: {
          address_id?: number | null
          id?: number
          item_id?: number
          quantity_change?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_changes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item_quantities"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_changes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_changes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_changes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address_inventory_value"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "stockpiles"
            referencedColumns: ["stockpile_id"]
          },
        ]
      }
      item_components: {
        Row: {
          component_id: number
          component_quantity: number
          item_id: number
        }
        Insert: {
          component_id: number
          component_quantity: number
          item_id: number
        }
        Update: {
          component_id?: number
          component_quantity?: number
          item_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "item_quantities"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item_quantities"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_components_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
        ]
      }
      items: {
        Row: {
          company_id: number | null
          country_of_origin: string | null
          depth: number | null
          height: number | null
          hs_code: number | null
          id: number
          name: string
          price: number
          sku: string | null
          type: Database["public"]["Enums"]["item_type"]
          weight: number | null
          width: number | null
        }
        Insert: {
          company_id?: number | null
          country_of_origin?: string | null
          depth?: number | null
          height?: number | null
          hs_code?: number | null
          id?: number
          name: string
          price: number
          sku?: string | null
          type: Database["public"]["Enums"]["item_type"]
          weight?: number | null
          width?: number | null
        }
        Update: {
          company_id?: number | null
          country_of_origin?: string | null
          depth?: number | null
          height?: number | null
          hs_code?: number | null
          id?: number
          name?: string
          price?: number
          sku?: string | null
          type?: Database["public"]["Enums"]["item_type"]
          weight?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_changes: {
        Row: {
          item_change_id: number
          order_id: number
          price: number | null
          tax: number | null
        }
        Insert: {
          item_change_id: number
          order_id: number
          price?: number | null
          tax?: number | null
        }
        Update: {
          item_change_id?: number
          order_id?: number
          price?: number | null
          tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_changes_item_change_id_fkey"
            columns: ["item_change_id"]
            isOneToOne: false
            referencedRelation: "item_changes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_changes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_changes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_view"
            referencedColumns: ["order_id"]
          },
        ]
      }
      orders: {
        Row: {
          carriage: number
          company_id: number | null
          currency: Database["public"]["Enums"]["currency_type"]
          from_billing_address_id: number | null
          from_company_id: number | null
          from_contact_id: number | null
          from_shipping_address_id: number | null
          id: number
          order_date: string
          order_type: Database["public"]["Enums"]["order_type"]
          to_billing_address_id: number | null
          to_company_id: number | null
          to_contact_id: number | null
          to_shipping_address_id: number | null
        }
        Insert: {
          carriage?: number
          company_id?: number | null
          currency?: Database["public"]["Enums"]["currency_type"]
          from_billing_address_id?: number | null
          from_company_id?: number | null
          from_contact_id?: number | null
          from_shipping_address_id?: number | null
          id?: number
          order_date?: string
          order_type: Database["public"]["Enums"]["order_type"]
          to_billing_address_id?: number | null
          to_company_id?: number | null
          to_contact_id?: number | null
          to_shipping_address_id?: number | null
        }
        Update: {
          carriage?: number
          company_id?: number | null
          currency?: Database["public"]["Enums"]["currency_type"]
          from_billing_address_id?: number | null
          from_company_id?: number | null
          from_contact_id?: number | null
          from_shipping_address_id?: number | null
          id?: number
          order_date?: string
          order_type?: Database["public"]["Enums"]["order_type"]
          to_billing_address_id?: number | null
          to_company_id?: number | null
          to_contact_id?: number | null
          to_shipping_address_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_from_billing_address_id_fkey"
            columns: ["from_billing_address_id"]
            isOneToOne: false
            referencedRelation: "address_inventory_value"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_from_billing_address_id_fkey"
            columns: ["from_billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_from_billing_address_id_fkey"
            columns: ["from_billing_address_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_from_billing_address_id_fkey"
            columns: ["from_billing_address_id"]
            isOneToOne: false
            referencedRelation: "stockpiles"
            referencedColumns: ["stockpile_id"]
          },
          {
            foreignKeyName: "orders_from_company_id_fkey"
            columns: ["from_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_from_contact_id_fkey"
            columns: ["from_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_from_shipping_address_id_fkey"
            columns: ["from_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "address_inventory_value"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_from_shipping_address_id_fkey"
            columns: ["from_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_from_shipping_address_id_fkey"
            columns: ["from_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_from_shipping_address_id_fkey"
            columns: ["from_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "stockpiles"
            referencedColumns: ["stockpile_id"]
          },
          {
            foreignKeyName: "orders_to_billing_address_id_fkey"
            columns: ["to_billing_address_id"]
            isOneToOne: false
            referencedRelation: "address_inventory_value"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_to_billing_address_id_fkey"
            columns: ["to_billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_to_billing_address_id_fkey"
            columns: ["to_billing_address_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_to_billing_address_id_fkey"
            columns: ["to_billing_address_id"]
            isOneToOne: false
            referencedRelation: "stockpiles"
            referencedColumns: ["stockpile_id"]
          },
          {
            foreignKeyName: "orders_to_company_id_fkey"
            columns: ["to_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_to_contact_id_fkey"
            columns: ["to_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_to_shipping_address_id_fkey"
            columns: ["to_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "address_inventory_value"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_to_shipping_address_id_fkey"
            columns: ["to_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_to_shipping_address_id_fkey"
            columns: ["to_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "items_by_address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "orders_to_shipping_address_id_fkey"
            columns: ["to_shipping_address_id"]
            isOneToOne: false
            referencedRelation: "stockpiles"
            referencedColumns: ["stockpile_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          updated_at: string
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: never
          updated_at?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          id?: never
          updated_at?: string
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      address_inventory_value: {
        Row: {
          address_id: number | null
          address_name: string | null
          total_inventory_value: number | null
        }
        Relationships: []
      }
      item_quantities: {
        Row: {
          item_id: number | null
          item_name: string | null
          total_quantity: number | null
          warehouse_quantities: Json | null
        }
        Relationships: []
      }
      items_by_address: {
        Row: {
          address_id: number | null
          address_name: string | null
          item_id: number | null
          item_name: string | null
          item_price: number | null
          item_quantity: number | null
          item_type: Database["public"]["Enums"]["item_type"] | null
          item_value: number | null
        }
        Relationships: []
      }
      items_view: {
        Row: {
          components: Json | null
          country_of_origin: string | null
          depth: number | null
          height: number | null
          hs_code: number | null
          item_id: number | null
          item_name: string | null
          item_price: number | null
          item_type: Database["public"]["Enums"]["item_type"] | null
          sku: string | null
          weight: number | null
          width: number | null
        }
        Relationships: []
      }
      orders_view: {
        Row: {
          carriage: number | null
          currency: Database["public"]["Enums"]["currency_type"] | null
          from_billing_address: Json | null
          from_company: Json | null
          from_contact: Json | null
          from_shipping_address: Json | null
          items: Json | null
          order_date: string | null
          order_id: number | null
          order_type: Database["public"]["Enums"]["order_type"] | null
          to_billing_address: Json | null
          to_company: Json | null
          to_contact: Json | null
          to_shipping_address: Json | null
          total_value: number | null
        }
        Relationships: []
      }
      stockpiles: {
        Row: {
          items: Json | null
          stockpile_created_at: string | null
          stockpile_id: number | null
          stockpile_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_shipment: {
        Args: {
          p_carriage: number
          p_item_changes: Json
        }
        Returns: number
      }
      delete_order: {
        Args: {
          in_order_id: number
        }
        Returns: undefined
      }
      insert_item_changes: {
        Args: {
          in_data: Json
        }
        Returns: {
          id: number
          item_id: number
          quantity_change: number
          address_id: number
        }[]
      }
      insert_order:
        | {
            Args: {
              in_order_type: string
              in_order_date: string
              in_order_items: Json
              in_company_id?: number
              in_from_company_id?: number
              in_to_company_id?: number
              in_from_contact_id?: number
              in_to_contact_id?: number
              in_from_billing_address_id?: number
              in_from_shipping_address_id?: number
              in_to_billing_address_id?: number
              in_to_shipping_address_id?: number
              in_currency?: Database["public"]["Enums"]["currency_type"]
              in_carriage?: number
            }
            Returns: {
              order_id: number
              item_change_id: number
              item_id: number
              quantity_change: number
              address_id: number
              item_price: number
              item_tax: number
            }[]
          }
        | {
            Args: {
              in_order_type: string
              in_order_date: string
              in_order_items: Json
              in_from_company_id?: number
              in_to_company_id?: number
              in_from_billing_address_id?: number
              in_from_shipping_address_id?: number
              in_to_billing_address_id?: number
              in_to_shipping_address_id?: number
            }
            Returns: {
              order_id: number
              item_change_id: number
              item_id: number
              quantity_change: number
              address_id: number
              item_price: number
              item_tax: number
            }[]
          }
        | {
            Args: {
              in_order_type: string
              in_order_date: string
              in_order_items: Json
              in_from_company_id?: number
              in_to_company_id?: number
              in_from_contact_id?: number
              in_to_contact_id?: number
              in_from_billing_address_id?: number
              in_from_shipping_address_id?: number
              in_to_billing_address_id?: number
              in_to_shipping_address_id?: number
              in_currency?: Database["public"]["Enums"]["currency_type"]
              in_carriage?: number
            }
            Returns: {
              order_id: number
              item_change_id: number
              item_id: number
              quantity_change: number
              address_id: number
              item_price: number
              item_tax: number
            }[]
          }
      insert_order_item:
        | {
            Args: {
              in_order_id: number
              in_item_id: number
              in_quantity_change: number
              in_address_id: number
              in_item_price: number
              in_item_tax: number
            }
            Returns: {
              order_id: number
              item_change_id: number
              item_id: number
              quantity_change: number
              address_id: number
              item_price: number
              item_tax: number
            }[]
          }
        | {
            Args: {
              in_order_id: number
              in_item_id: number
              in_quantity_change: number
              in_warehouse_id: number
              in_item_price: number
              in_item_tax: number
            }
            Returns: {
              order_id: number
              item_change_id: number
              item_id: number
              quantity_change: number
              warehouse_id: number
              item_price: number
              item_tax: number
            }[]
          }
      insert_order_items: {
        Args: {
          in_data: Json
        }
        Returns: {
          order_id: number
          item_change_id: number
          item_id: number
          quantity_change: number
          address_id: number
          item_price: number
          item_tax: number
        }[]
      }
      insert_stocktake_changes: {
        Args: {
          data: Json
        }
        Returns: {
          stocktake_id: number
          item_change_id: number
          item_id: number
          quantity_change: number
          warehouse_id: number
        }[]
      }
      process_order: {
        Args: {
          p_order_type: Database["public"]["Enums"]["order_type"]
          p_order_items: Json
        }
        Returns: number
      }
      stocktake: {
        Args: {
          p_warehouse_id: number
          p_items: Json
        }
        Returns: number
      }
      upsert_item_with_components: {
        Args: {
          p_name: string
          p_price: number
          p_type: Database["public"]["Enums"]["item_type"]
          p_components: Json
          p_id?: number
        }
        Returns: number
      }
    }
    Enums: {
      currency_type: "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "NZD" | "USD"
      item_type: "product" | "part" | "service" | "package"
      order_type: "purchase" | "sale" | "shipment" | "stocktake" | "build"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

