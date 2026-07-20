export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      failure_modes: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          pilot_id: string | null
          severity: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          pilot_id?: string | null
          severity?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          pilot_id?: string | null
          severity?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "failure_modes_pilot_id_fkey"
            columns: ["pilot_id"]
            isOneToOne: false
            referencedRelation: "pilots"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          language: string | null
          query: string | null
          raw: Json | null
          seen_date: string | null
          social_image: string | null
          source_country: string | null
          taxonomy_tags: string[] | null
          title: string | null
          tone: number | null
          uid: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          language?: string | null
          query?: string | null
          raw?: Json | null
          seen_date?: string | null
          social_image?: string | null
          source_country?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          tone?: number | null
          uid: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          language?: string | null
          query?: string | null
          raw?: Json | null
          seen_date?: string | null
          social_image?: string | null
          source_country?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          tone?: number | null
          uid?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      patents: {
        Row: {
          abstract: string | null
          citations: number | null
          countries: string[] | null
          cpc_classes: string[] | null
          created_at: string
          family_id: string | null
          id: string
          orgs: string[] | null
          publication_number: string | null
          taxonomy_tags: string[] | null
          title: string | null
          uid: string
          updated_at: string
          url: string | null
          year: number | null
        }
        Insert: {
          abstract?: string | null
          citations?: number | null
          countries?: string[] | null
          cpc_classes?: string[] | null
          created_at?: string
          family_id?: string | null
          id?: string
          orgs?: string[] | null
          publication_number?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          uid: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Update: {
          abstract?: string | null
          citations?: number | null
          countries?: string[] | null
          cpc_classes?: string[] | null
          created_at?: string
          family_id?: string | null
          id?: string
          orgs?: string[] | null
          publication_number?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          uid?: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      pilots: {
        Row: {
          country: string | null
          created_at: string
          description: string | null
          end_date: string | null
          evidence_uid: string | null
          failure_mode_count: number | null
          fleet_size: number | null
          gap_categories: string[] | null
          id: string
          investment_usd: number | null
          latitude: number | null
          location: string | null
          longitude: number | null
          name: string
          partners: string[] | null
          power_kw: number | null
          start_date: string | null
          status: string | null
          updated_at: string
          v2x_type: string[] | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          evidence_uid?: string | null
          failure_mode_count?: number | null
          fleet_size?: number | null
          gap_categories?: string[] | null
          id?: string
          investment_usd?: number | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name: string
          partners?: string[] | null
          power_kw?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          v2x_type?: string[] | null
        }
        Update: {
          country?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          evidence_uid?: string | null
          failure_mode_count?: number | null
          fleet_size?: number | null
          gap_categories?: string[] | null
          id?: string
          investment_usd?: number | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name?: string
          partners?: string[] | null
          power_kw?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          v2x_type?: string[] | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          abstract: string | null
          citations: number | null
          countries: string[] | null
          created_at: string
          doi: string | null
          id: string
          orgs: string[] | null
          source: string | null
          taxonomy_tags: string[] | null
          title: string | null
          uid: string
          updated_at: string
          url: string | null
          year: number | null
        }
        Insert: {
          abstract?: string | null
          citations?: number | null
          countries?: string[] | null
          created_at?: string
          doi?: string | null
          id?: string
          orgs?: string[] | null
          source?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          uid: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Update: {
          abstract?: string | null
          citations?: number | null
          countries?: string[] | null
          created_at?: string
          doi?: string | null
          id?: string
          orgs?: string[] | null
          source?: string | null
          taxonomy_tags?: string[] | null
          title?: string | null
          uid?: string
          updated_at?: string
          url?: string | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      corpus_summary: {
        Row: {
          failure_modes: number | null
          news: number | null
          patents: number | null
          pilots: number | null
          publications: number | null
        }
        Relationships: []
      }
      news_by_country: {
        Row: {
          count: number | null
          country: string | null
        }
        Relationships: []
      }
      news_by_domain: {
        Row: {
          count: number | null
          domain: string | null
        }
        Relationships: []
      }
      patents_by_year: {
        Row: {
          count: number | null
          year: number | null
        }
        Relationships: []
      }
      patents_themes: {
        Row: {
          count: number | null
          theme: string | null
        }
        Relationships: []
      }
      patents_top_countries: {
        Row: {
          count: number | null
          country: string | null
        }
        Relationships: []
      }
      patents_top_orgs: {
        Row: {
          count: number | null
          name: string | null
        }
        Relationships: []
      }
      publications_by_year: {
        Row: {
          count: number | null
          year: number | null
        }
        Relationships: []
      }
      publications_themes: {
        Row: {
          count: number | null
          theme: string | null
        }
        Relationships: []
      }
      publications_top_countries: {
        Row: {
          count: number | null
          country: string | null
        }
        Relationships: []
      }
      publications_top_orgs: {
        Row: {
          count: number | null
          name: string | null
        }
        Relationships: []
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
