"use client"

import * as React from "react"
import Link from "next/link"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  Plus
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/cn"

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  category: {
    name: string
    icon: string
    color: string
  }
  account: {
    name: string
  }
  date: string
  tags?: string[]
}

export interface RecentTransactionsProps {
  transactions: Transaction[]
  loading?: boolean
  className?: string
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Aujourd'hui"
  if (diffDays === 2) return "Hier"
  if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).format(date)
}

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'income':
      return <ArrowDownLeft className="h-4 w-4 text-success" />
    case 'expense':
      return <ArrowUpRight className="h-4 w-4 text-danger" />
    case 'transfer':
      return <ArrowUpRight className="h-4 w-4 text-primary" />
    default:
      return null
  }
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
      {/* Category Icon */}
      <div 
        className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-medium"
        style={{ backgroundColor: transaction.category.color }}
      >
        <span className="text-lg">{transaction.category.icon}</span>
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {transaction.description}
          </h4>
          {getTransactionIcon(transaction.type)}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.category.name}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.account.name}
          </span>
        </div>
        {transaction.tags && transaction.tags.length > 0 && (
          <div className="flex items-center space-x-1 mt-1">
            {transaction.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="ghost" size="sm" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {transaction.tags.length > 2 && (
              <span className="text-xs text-gray-400">
                +{transaction.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Amount and Date */}
      <div className="text-right">
        <p className={cn(
          "text-sm font-semibold tabular-nums",
          transaction.type === 'income' 
            ? "text-success" 
            : transaction.type === 'expense'
            ? "text-danger"
            : "text-gray-900 dark:text-white"
        )}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formatDate(transaction.date)}
        </p>
      </div>

      {/* More Actions */}
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  transactions, 
  loading = false,
  className 
}) => {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transactions récentes</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/transactions">
                Voir tout
              </Link>
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <ArrowUpRight className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune transaction
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Commencez par ajouter votre première transaction pour voir vos finances prendre forme.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une transaction
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {transactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentTransactions