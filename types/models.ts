import { Database } from './database'

// Extract table types
export type User = Database['public']['Tables']['users']['Row']
export type Account = Database['public']['Tables']['accounts']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Goal = Database['public']['Tables']['goals']['Row']
export type Budget = Database['public']['Tables']['budgets']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserStats = Database['public']['Tables']['user_stats']['Row']
export type AIInteraction = Database['public']['Tables']['ai_interactions']['Row']

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type AccountInsert = Database['public']['Tables']['accounts']['Insert']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type GoalInsert = Database['public']['Tables']['goals']['Insert']
export type BudgetInsert = Database['public']['Tables']['budgets']['Insert']
export type AchievementInsert = Database['public']['Tables']['achievements']['Insert']
export type UserStatsInsert = Database['public']['Tables']['user_stats']['Insert']
export type AIInteractionInsert = Database['public']['Tables']['ai_interactions']['Insert']

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type AccountUpdate = Database['public']['Tables']['accounts']['Update']
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type GoalUpdate = Database['public']['Tables']['goals']['Update']
export type BudgetUpdate = Database['public']['Tables']['budgets']['Update']
export type AchievementUpdate = Database['public']['Tables']['achievements']['Update']
export type UserStatsUpdate = Database['public']['Tables']['user_stats']['Update']
export type AIInteractionUpdate = Database['public']['Tables']['ai_interactions']['Update']

// Extended types with computed properties
export interface TransactionWithCategory extends Transaction {
  category?: Category
  account?: Account
}

export interface GoalWithProgress extends Goal {
  progress: number
  daysLeft: number | null
  onTrack: boolean
  monthlyTarget?: number
}

export interface BudgetWithSpent extends Budget {
  spent: number
  remaining: number
  percentage: number
  status: 'ok' | 'warning' | 'danger'
  category?: Category
}

export interface CategoryWithStats extends Category {
  totalSpent?: number
  transactionCount?: number
  averageAmount?: number
}

// Dashboard data types
export interface DashboardStats {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlySavings: number
  incomeChange: number
  expenseChange: number
  savingsChange: number
}

export interface SpendingByCategory {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  color: string
  icon: string
}

export interface BalanceHistory {
  date: string
  balance: number
  income: number
  expenses: number
}

// AI Chat types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: {
    transactions?: Transaction[]
    goals?: Goal[]
    budgets?: Budget[]
    stats?: UserStats
  }
}

export interface AIInsight {
  id: string
  type: 'tip' | 'warning' | 'celebration' | 'suggestion'
  title: string
  message: string
  icon: string
  priority: 'low' | 'medium' | 'high'
  actionable: boolean
  action?: {
    label: string
    type: 'create_goal' | 'adjust_budget' | 'view_transactions' | 'custom'
    data?: any
  }
}

// Gamification types
export interface LevelInfo {
  currentLevel: number
  currentXP: number
  nextLevelXP: number
  progress: number
  title: string
}

export interface AchievementType {
  id: string
  name: string
  description: string
  icon: string
  category: 'savings' | 'goals' | 'streak' | 'spending' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  condition: {
    type: string
    value: number
    period?: string
  }
}

// Form types
export interface TransactionFormData {
  amount: number
  type: 'income' | 'expense' | 'transfer'
  categoryId: string
  accountId: string
  description?: string
  date: Date
  tags?: string[]
  isRecurring?: boolean
  recurringFrequency?: 'daily' | 'weekly' | 'monthly'
}

export interface GoalFormData {
  title: string
  description?: string
  targetAmount: number
  deadline?: Date
  category: 'vacation' | 'emergency' | 'purchase' | 'savings' | 'custom'
  icon: string
  color: string
  initialContribution?: number
}

export interface BudgetFormData {
  categoryId: string
  amount: number
  period: 'weekly' | 'monthly'
  startDate: Date
}

// Utility types
export type TransactionType = 'income' | 'expense' | 'transfer'
export type AccountType = 'checking' | 'savings' | 'credit_card'
export type GoalCategory = 'vacation' | 'emergency' | 'purchase' | 'savings' | 'custom'
export type BudgetPeriod = 'weekly' | 'monthly'
export type RecurringFrequency = 'daily' | 'weekly' | 'monthly'

// Filter types
export interface TransactionFilters {
  accountIds?: string[]
  categoryIds?: string[]
  type?: TransactionType
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
  tags?: string[]
  search?: string
}

export interface DateRange {
  from: Date
  to: Date
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Theme types
export interface ThemePreferences {
  mode: 'light' | 'dark' | 'system'
  accentColor: string
  currency: string
  language: string
  notifications: {
    budgetAlerts: boolean
    goalReminders: boolean
    weeklyReports: boolean
    achievements: boolean
  }
}

// Onboarding types
export interface OnboardingData {
  personalInfo: {
    fullName: string
    dateOfBirth?: Date
    currency: string
  }
  financialInfo: {
    monthlyIncome?: number
    mainExpenseCategories: string[]
    savingsGoal?: number
  }
  preferences: {
    budgetingExperience: 'beginner' | 'intermediate' | 'advanced'
    primaryGoals: string[]
    notificationPreferences: ThemePreferences['notifications']
  }
}

export type { Database as default }