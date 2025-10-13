"use client"

import * as React from "react"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react"
import { StatsCard } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

export interface StatsData {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlySavings: number
  balanceChange: number
  incomeChange: number
  expenseChange: number
  savingsChange: number
}

export interface StatsCardsProps {
  data: StatsData
  loading?: boolean
  className?: string
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const getTrendIcon = (change: number) => {
  if (change > 0) return <ArrowUpRight className="h-3 w-3" />
  if (change < 0) return <ArrowDownRight className="h-3 w-3" />
  return <Minus className="h-3 w-3" />
}

const getTrend = (change: number, isExpense = false): 'up' | 'down' | 'neutral' => {
  if (change === 0) return 'neutral'
  
  // For expenses, negative change is good (less spending)
  if (isExpense) {
    return change < 0 ? 'up' : 'down'
  }
  
  // For income and savings, positive change is good
  return change > 0 ? 'up' : 'down'
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  data, 
  loading = false,
  className 
}) => {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-base animate-pulse">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {/* Total Balance */}
      <StatsCard
        title="Solde total"
        value={formatCurrency(data.totalBalance)}
        change={data.balanceChange}
        trend={getTrend(data.balanceChange)}
        icon={<Wallet className="h-5 w-5" />}
        className="relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-12 -mt-12" />
      </StatsCard>

      {/* Monthly Income */}
      <StatsCard
        title="Revenus du mois"
        value={formatCurrency(data.monthlyIncome)}
        change={data.incomeChange}
        trend={getTrend(data.incomeChange)}
        icon={<TrendingUp className="h-5 w-5" />}
        className="relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-success/10 to-transparent rounded-full -mr-12 -mt-12" />
      </StatsCard>

      {/* Monthly Expenses */}
      <StatsCard
        title="Dépenses du mois"
        value={formatCurrency(data.monthlyExpenses)}
        change={data.expenseChange}
        trend={getTrend(data.expenseChange, true)}
        icon={<TrendingDown className="h-5 w-5" />}
        className="relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-danger/10 to-transparent rounded-full -mr-12 -mt-12" />
      </StatsCard>

      {/* Monthly Savings */}
      <StatsCard
        title="Économies du mois"
        value={formatCurrency(data.monthlySavings)}
        change={data.savingsChange}
        trend={getTrend(data.savingsChange)}
        icon={<PiggyBank className="h-5 w-5" />}
        className="relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-12 -mt-12" />
      </StatsCard>
    </div>
  )
}

export default StatsCards