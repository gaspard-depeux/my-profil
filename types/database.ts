export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          onboarding_completed: boolean
          preferences: Json | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          preferences?: Json | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          preferences?: Json | null
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'checking' | 'savings' | 'credit_card'
          balance: number
          currency: string
          color: string
          icon: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'checking' | 'savings' | 'credit_card'
          balance: number
          currency?: string
          color: string
          icon: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'checking' | 'savings' | 'credit_card'
          balance?: number
          currency?: string
          color?: string
          icon?: string
          is_active?: boolean
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          account_id: string
          amount: number
          type: 'income' | 'expense' | 'transfer'
          category_id: string | null
          description: string | null
          date: string
          is_recurring: boolean
          recurring_frequency: 'daily' | 'weekly' | 'monthly' | null
          tags: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          amount: number
          type: 'income' | 'expense' | 'transfer'
          category_id?: string | null
          description?: string | null
          date: string
          is_recurring?: boolean
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | null
          tags?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
          amount?: number
          type?: 'income' | 'expense' | 'transfer'
          category_id?: string | null
          description?: string | null
          date?: string
          is_recurring?: boolean
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | null
          tags?: string[] | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string | null
          name: string
          type: 'income' | 'expense'
          icon: string
          color: string
          parent_id: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          type: 'income' | 'expense'
          icon: string
          color: string
          parent_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          type?: 'income' | 'expense'
          icon?: string
          color?: string
          parent_id?: string | null
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          target_amount: number
          current_amount: number
          deadline: string | null
          category: 'vacation' | 'emergency' | 'purchase' | 'savings' | 'custom'
          icon: string
          color: string
          is_completed: boolean
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          target_amount: number
          current_amount?: number
          deadline?: string | null
          category: 'vacation' | 'emergency' | 'purchase' | 'savings' | 'custom'
          icon: string
          color: string
          is_completed?: boolean
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_amount?: number
          current_amount?: number
          deadline?: string | null
          category?: 'vacation' | 'emergency' | 'purchase' | 'savings' | 'custom'
          icon?: string
          color?: string
          is_completed?: boolean
          created_at?: string
          completed_at?: string | null
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string
          amount: number
          period: 'weekly' | 'monthly'
          start_date: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          amount: number
          period?: 'weekly' | 'monthly'
          start_date: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          amount?: number
          period?: 'weekly' | 'monthly'
          start_date?: string
          is_active?: boolean
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          description: string
          icon: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          description: string
          icon: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          description?: string
          icon?: string
          earned_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          level: number
          xp: number
          streak_days: number
          last_activity_date: string | null
          total_saved: number
          goals_completed: number
        }
        Insert: {
          id?: string
          user_id: string
          level?: number
          xp?: number
          streak_days?: number
          last_activity_date?: string | null
          total_saved?: number
          goals_completed?: number
        }
        Update: {
          id?: string
          user_id?: string
          level?: number
          xp?: number
          streak_days?: number
          last_activity_date?: string | null
          total_saved?: number
          goals_completed?: number
        }
      }
      ai_interactions: {
        Row: {
          id: string
          user_id: string
          message: string
          response: string
          context: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          response: string
          context?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          response?: string
          context?: Json | null
          created_at?: string
        }
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