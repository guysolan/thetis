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
      item_changes: {
        Row: {
          id: number
          item_id: number
          quantity_change: number
          warehouse_id: number | null
        }
        Insert: {
          id?: number
          item_id: number
          quantity_change: number
          warehouse_id?: number | null
        }
        Update: {
          id?: number
          item_id?: number
          quantity_change?: number
          warehouse_id?: number | null
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
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_changes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "warehouse_items"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouse_inventory_value"
            referencedColumns: ["warehouse_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouse_items"
            referencedColumns: ["warehouse_id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_changes_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses_view"
            referencedColumns: ["warehouse_id"]
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
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "warehouse_items"
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
            referencedRelation: "items_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "item_components_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "warehouse_items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      items: {
        Row: {
          id: number
          name: string
          price: number
          type: Database["public"]["Enums"]["item_type"]
        }
        Insert: {
          id?: number
          name: string
          price: number
          type: Database["public"]["Enums"]["item_type"]
        }
        Update: {
          id?: number
          name?: string
          price?: number
          type?: Database["public"]["Enums"]["item_type"]
        }
        Relationships: []
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
          id: number
          order_date: string
          order_type: Database["public"]["Enums"]["order_type"]
        }
        Insert: {
          carriage?: number
          id?: number
          order_date?: string
          order_type: Database["public"]["Enums"]["order_type"]
        }
        Update: {
          carriage?: number
          id?: number
          order_date?: string
          order_type?: Database["public"]["Enums"]["order_type"]
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      item_quantities: {
        Row: {
          item_id: number | null
          item_name: string | null
          total_quantity: number | null
          warehouse_quantities: Json | null
        }
        Relationships: []
      }
      items_view: {
        Row: {
          components: Json | null
          item_id: number | null
          item_name: string | null
          item_price: number | null
          item_type: Database["public"]["Enums"]["item_type"] | null
        }
        Relationships: []
      }
      orders_view: {
        Row: {
          carriage: number | null
          items: Json | null
          order_date: string | null
          order_id: number | null
          order_type: Database["public"]["Enums"]["order_type"] | null
          total_value: number | null
        }
        Relationships: []
      }
      warehouse_inventory_value: {
        Row: {
          total_inventory_value: number | null
          warehouse_id: number | null
          warehouse_name: string | null
        }
        Relationships: []
      }
      warehouse_items: {
        Row: {
          item_id: number | null
          item_name: string | null
          item_price: number | null
          item_quantity: number | null
          item_type: Database["public"]["Enums"]["item_type"] | null
          item_value: number | null
          warehouse_id: number | null
          warehouse_name: string | null
        }
        Relationships: []
      }
      warehouses_view: {
        Row: {
          items: Json | null
          warehouse_created_at: string | null
          warehouse_id: number | null
          warehouse_name: string | null
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
          warehouse_id: number
        }[]
      }
      insert_order: {
        Args: {
          in_order_type: string
          in_order_date: string
          in_order_items: Json
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
      insert_order_item:
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
          warehouse_id: number
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
      item_type: "product" | "part" | "service"
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

