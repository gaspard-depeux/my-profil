"use client"

import * as React from "react"
import StatsCards, { StatsData } from "@/components/dashboard/stats-cards"
import BalanceChart, { BalanceData } from "@/components/dashboard/balance-chart"
import RecentTransactions, { Transaction } from "@/components/dashboard/recent-transactions"
import SpendingByCategory, { CategorySpending } from "@/components/dashboard/spending-by-category"

// Mock data - will be replaced with real API calls
const mockStatsData: StatsData = {
  totalBalance: 4250.50,
  monthlyIncome: 3200.00,
  monthlyExpenses: 2450.75,
  monthlySavings: 749.25,
  balanceChange: 12.5,
  incomeChange: 5.2,
  expenseChange: -8.3,
  savingsChange: 18.7,
}

const mockBalanceData: BalanceData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  
  return {
    date: date.toISOString().split('T')[0],
    balance: 4000 + Math.random() * 500 + i * 10,
    income: Math.random() * 200 + 100,
    expenses: Math.random() * 150 + 80,
  }
})

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Courses Carrefour',
    amount: 87.45,
    type: 'expense',
    category: {
      name: 'Alimentation',
      icon: '🛒',
      color: '#EF4444'
    },
    account: {
      name: 'Compte courant'
    },
    date: new Date().toISOString(),
    tags: ['courses', 'alimentaire']
  },
  {
    id: '2',
    description: 'Salaire Octobre',
    amount: 3200.00,
    type: 'income',
    category: {
      name: 'Salaire',
      icon: '💼',
      color: '#10B981'
    },
    account: {
      name: 'Compte courant'
    },
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    description: 'Essence Total',
    amount: 65.20,
    type: 'expense',
    category: {
      name: 'Transport',
      icon: '⛽',
      color: '#F59E0B'
    },
    account: {
      name: 'Compte courant'
    },
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    description: 'Netflix',
    amount: 15.99,
    type: 'expense',
    category: {
      name: 'Divertissement',
      icon: '🎬',
      color: '#8B5CF6'
    },
    account: {
      name: 'Compte courant'
    },
    date: new Date(Date.now() - 259200000).toISOString(),
    tags: ['abonnement']
  },
  {
    id: '5',
    description: 'Virement épargne',
    amount: 500.00,
    type: 'transfer',
    category: {
      name: 'Épargne',
      icon: '🏦',
      color: '#6366F1'
    },
    account: {
      name: 'Livret A'
    },
    date: new Date(Date.now() - 345600000).toISOString(),
  }
]

const mockCategorySpending: CategorySpending[] = [
  {
    id: '1',
    name: 'Alimentation',
    amount: 450.30,
    percentage: 35.2,
    color: '#EF4444',
    icon: '🛒',
    transactionCount: 12
  },
  {
    id: '2',
    name: 'Transport',
    amount: 280.50,
    percentage: 21.9,
    color: '#F59E0B',
    icon: '⛽',
    transactionCount: 8
  },
  {
    id: '3',
    name: 'Logement',
    amount: 320.00,
    percentage: 25.0,
    color: '#3B82F6',
    icon: '🏠',
    transactionCount: 3
  },
  {
    id: '4',
    name: 'Divertissement',
    amount: 125.75,
    percentage: 9.8,
    color: '#8B5CF6',
    icon: '🎬',
    transactionCount: 7
  },
  {
    id: '5',
    name: 'Santé',
    amount: 95.20,
    percentage: 7.4,
    color: '#10B981',
    icon: '🏥',
    transactionCount: 4
  }
]

export default function DashboardClientPage() {
  const [loading, setLoading] = React.useState(true)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bonjour Marie 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Voici un aperçu de vos finances pour ce mois-ci.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards data={mockStatsData} loading={loading} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Chart - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <BalanceChart data={mockBalanceData} loading={loading} />
        </div>

        {/* Spending by Category - Takes 1/3 of the width */}
        <div className="lg:col-span-1">
          <SpendingByCategory data={mockCategorySpending} loading={loading} />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={mockTransactions} loading={loading} />

      {/* AI Insight Card (placeholder for now) */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              💡 Conseil du jour
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vous avez dépensé 30% de moins en sorties ce mois-ci par rapport au mois dernier ! 
              Continuez comme ça, vous êtes sur la bonne voie pour atteindre votre objectif d'épargne.
            </p>
            <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
              Discuter avec l'assistant →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
