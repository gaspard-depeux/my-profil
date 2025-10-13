import { 
  Transaction, 
  Goal, 
  Budget, 
  Category, 
  Account, 
  User,
  UserStats,
  AIInteraction,
  TransactionFormData,
  GoalFormData,
  BudgetFormData,
  TransactionFilters,
  DashboardStats,
  SpendingByCategory,
  BalanceHistory,
  AIInsight,
  ChatMessage
} from './models'

// API endpoint types
export interface APIEndpoints {
  // Auth
  '/api/auth/login': {
    POST: {
      body: { email: string; password: string }
      response: { user: User; session: any }
    }
  }
  '/api/auth/signup': {
    POST: {
      body: { email: string; password: string; fullName: string }
      response: { user: User; session: any }
    }
  }
  '/api/auth/logout': {
    POST: {
      response: { success: boolean }
    }
  }

  // User
  '/api/user/profile': {
    GET: {
      response: User
    }
    PUT: {
      body: Partial<User>
      response: User
    }
  }
  '/api/user/stats': {
    GET: {
      response: UserStats
    }
  }

  // Accounts
  '/api/accounts': {
    GET: {
      response: Account[]
    }
    POST: {
      body: Omit<Account, 'id' | 'user_id' | 'created_at'>
      response: Account
    }
  }
  '/api/accounts/[id]': {
    GET: {
      response: Account
    }
    PUT: {
      body: Partial<Account>
      response: Account
    }
    DELETE: {
      response: { success: boolean }
    }
  }

  // Transactions
  '/api/transactions': {
    GET: {
      query?: TransactionFilters & {
        page?: number
        limit?: number
        sortBy?: 'date' | 'amount' | 'category'
        sortOrder?: 'asc' | 'desc'
      }
      response: {
        transactions: Transaction[]
        pagination: {
          page: number
          limit: number
          total: number
          totalPages: number
        }
      }
    }
    POST: {
      body: TransactionFormData
      response: Transaction
    }
  }
  '/api/transactions/[id]': {
    GET: {
      response: Transaction
    }
    PUT: {
      body: Partial<TransactionFormData>
      response: Transaction
    }
    DELETE: {
      response: { success: boolean }
    }
  }
  '/api/transactions/bulk': {
    POST: {
      body: { transactions: TransactionFormData[] }
      response: { created: Transaction[]; errors: string[] }
    }
    DELETE: {
      body: { ids: string[] }
      response: { deleted: number; errors: string[] }
    }
  }
  '/api/transactions/import': {
    POST: {
      body: FormData // CSV file
      response: { 
        preview: Transaction[]
        mapping: Record<string, string>
        totalRows: number 
      }
    }
  }
  '/api/transactions/export': {
    GET: {
      query: TransactionFilters & { format: 'csv' | 'pdf' }
      response: Blob
    }
  }

  // Categories
  '/api/categories': {
    GET: {
      response: Category[]
    }
    POST: {
      body: Omit<Category, 'id' | 'user_id'>
      response: Category
    }
  }
  '/api/categories/[id]': {
    PUT: {
      body: Partial<Category>
      response: Category
    }
    DELETE: {
      response: { success: boolean }
    }
  }

  // Goals
  '/api/goals': {
    GET: {
      response: Goal[]
    }
    POST: {
      body: GoalFormData
      response: Goal
    }
  }
  '/api/goals/[id]': {
    GET: {
      response: Goal
    }
    PUT: {
      body: Partial<GoalFormData>
      response: Goal
    }
    DELETE: {
      response: { success: boolean }
    }
  }
  '/api/goals/[id]/contribute': {
    POST: {
      body: { amount: number; fromAccountId?: string }
      response: Goal
    }
  }

  // Budgets
  '/api/budgets': {
    GET: {
      response: Budget[]
    }
    POST: {
      body: BudgetFormData
      response: Budget
    }
  }
  '/api/budgets/[id]': {
    PUT: {
      body: Partial<BudgetFormData>
      response: Budget
    }
    DELETE: {
      response: { success: boolean }
    }
  }

  // Dashboard
  '/api/dashboard/stats': {
    GET: {
      query?: { period?: 'week' | 'month' | 'year' }
      response: DashboardStats
    }
  }
  '/api/dashboard/spending-by-category': {
    GET: {
      query?: { period?: 'week' | 'month' | 'year' }
      response: SpendingByCategory[]
    }
  }
  '/api/dashboard/balance-history': {
    GET: {
      query?: { 
        period?: 'week' | 'month' | 'year'
        accountIds?: string[]
      }
      response: BalanceHistory[]
    }
  }

  // AI Assistant
  '/api/ai/chat': {
    POST: {
      body: { 
        message: string
        context?: {
          includeTransactions?: boolean
          includeGoals?: boolean
          includeBudgets?: boolean
          includeStats?: boolean
        }
      }
      response: {
        message: string
        suggestions?: string[]
        actions?: Array<{
          type: string
          label: string
          data: any
        }>
      }
    }
  }
  '/api/ai/insights': {
    GET: {
      response: AIInsight[]
    }
  }
  '/api/ai/daily-tip': {
    GET: {
      response: {
        tip: string
        category: string
        actionable: boolean
      }
    }
  }

  // Analytics
  '/api/analytics/trends': {
    GET: {
      query?: {
        period?: 'month' | 'quarter' | 'year'
        categoryIds?: string[]
      }
      response: {
        income: Array<{ date: string; amount: number }>
        expenses: Array<{ date: string; amount: number }>
        savings: Array<{ date: string; amount: number }>
        categories: Array<{
          categoryId: string
          name: string
          data: Array<{ date: string; amount: number }>
        }>
      }
    }
  }
  '/api/analytics/forecast': {
    GET: {
      query?: { months?: number }
      response: {
        balanceProjection: Array<{ date: string; balance: number }>
        scenarios: {
          optimistic: number
          realistic: number
          pessimistic: number
        }
      }
    }
  }

  // Gamification
  '/api/gamification/achievements': {
    GET: {
      response: {
        earned: Achievement[]
        available: Achievement[]
      }
    }
  }
  '/api/gamification/level': {
    GET: {
      response: {
        currentLevel: number
        currentXP: number
        nextLevelXP: number
        progress: number
        title: string
      }
    }
  }

  // Notifications
  '/api/notifications': {
    GET: {
      response: Array<{
        id: string
        type: 'budget_alert' | 'goal_reminder' | 'achievement' | 'insight'
        title: string
        message: string
        read: boolean
        createdAt: string
        data?: any
      }>
    }
  }
  '/api/notifications/[id]/read': {
    POST: {
      response: { success: boolean }
    }
  }
}

// Helper types for API calls
export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type APIRequest<
  TEndpoint extends keyof APIEndpoints,
  TMethod extends keyof APIEndpoints[TEndpoint]
> = APIEndpoints[TEndpoint][TMethod] extends { body: infer TBody }
  ? { body: TBody }
  : APIEndpoints[TEndpoint][TMethod] extends { query: infer TQuery }
  ? { query?: TQuery }
  : {}

export type APIResponse<
  TEndpoint extends keyof APIEndpoints,
  TMethod extends keyof APIEndpoints[TEndpoint]
> = APIEndpoints[TEndpoint][TMethod] extends { response: infer TResponse }
  ? TResponse
  : never

// Generic API error type
export interface APIError {
  message: string
  code?: string
  details?: any
  statusCode: number
}

// API client configuration
export interface APIClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  retries?: number
}

// Webhook types (for real-time updates)
export interface WebhookEvent {
  type: 'transaction_created' | 'transaction_updated' | 'goal_completed' | 'budget_exceeded' | 'achievement_earned'
  data: any
  timestamp: string
  userId: string
}

export default APIEndpoints