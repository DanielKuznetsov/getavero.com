export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string
          email_address: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          email_address?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          email_address?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
        }
        Relationships: []
      }
      dish_categories: {
        Row: {
          created_at: string
          id: string
          name: string | null
          restaurant_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          restaurant_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dish_categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          add_extra: Json | null
          add_toppings: Json | null
          choose_option: Json | null
          choose_pasta: Json | null
          choose_salad: Json | null
          choose_soda: Json | null
          choose_topping: Json | null
          created_at: string
          description: string | null
          dish_category_id: string | null
          general_pizza_mod: Json | null
          id: string
          name: string | null
          remove_toppings: Json | null
          restaurant_id: string | null
          salad_toppings_mod: Json | null
        }
        Insert: {
          add_extra?: Json | null
          add_toppings?: Json | null
          choose_option?: Json | null
          choose_pasta?: Json | null
          choose_salad?: Json | null
          choose_soda?: Json | null
          choose_topping?: Json | null
          created_at?: string
          description?: string | null
          dish_category_id?: string | null
          general_pizza_mod?: Json | null
          id?: string
          name?: string | null
          remove_toppings?: Json | null
          restaurant_id?: string | null
          salad_toppings_mod?: Json | null
        }
        Update: {
          add_extra?: Json | null
          add_toppings?: Json | null
          choose_option?: Json | null
          choose_pasta?: Json | null
          choose_salad?: Json | null
          choose_soda?: Json | null
          choose_topping?: Json | null
          created_at?: string
          description?: string | null
          dish_category_id?: string | null
          general_pizza_mod?: Json | null
          id?: string
          name?: string | null
          remove_toppings?: Json | null
          restaurant_id?: string | null
          salad_toppings_mod?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "dishes_dish_category_id_fkey"
            columns: ["dish_category_id"]
            isOneToOne: false
            referencedRelation: "dish_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dishes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          created_on: string | null
          customer_id: string | null
          delivery_address: string | null
          delivery_instructions: string | null
          gratuity: string | null
          id: string
          invoice_processing_fee: string | null
          order_itself: Json | null
          order_status: string | null
          order_type: string | null
          payment_method: string | null
          prepared_by: string | null
          quote_number: string | null
          subtotal: string | null
          tax: string | null
          total: string | null
        }
        Insert: {
          created_at?: string
          created_on?: string | null
          customer_id?: string | null
          delivery_address?: string | null
          delivery_instructions?: string | null
          gratuity?: string | null
          id?: string
          invoice_processing_fee?: string | null
          order_itself?: Json | null
          order_status?: string | null
          order_type?: string | null
          payment_method?: string | null
          prepared_by?: string | null
          quote_number?: string | null
          subtotal?: string | null
          tax?: string | null
          total?: string | null
        }
        Update: {
          created_at?: string
          created_on?: string | null
          customer_id?: string | null
          delivery_address?: string | null
          delivery_instructions?: string | null
          gratuity?: string | null
          id?: string
          invoice_processing_fee?: string | null
          order_itself?: Json | null
          order_status?: string | null
          order_type?: string | null
          payment_method?: string | null
          prepared_by?: string | null
          quote_number?: string | null
          subtotal?: string | null
          tax?: string | null
          total?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          business_address: string | null
          business_email_address: string | null
          business_name: string | null
          business_phone_number: string | null
          created_at: string
          id: string
        }
        Insert: {
          business_address?: string | null
          business_email_address?: string | null
          business_name?: string | null
          business_phone_number?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          business_address?: string | null
          business_email_address?: string | null
          business_name?: string | null
          business_phone_number?: string | null
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          id: number
          todo: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          todo?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          todo?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          clerk_email: string | null
          clerk_id: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          clerk_email?: string | null
          clerk_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          clerk_email?: string | null
          clerk_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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

