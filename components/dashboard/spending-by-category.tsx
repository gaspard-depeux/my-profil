"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/cn"

export interface CategorySpending {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
  icon: string
  transactionCount: number
}

export interface SpendingByCategoryProps {
  data: CategorySpending[]
  loading?: boolean
  className?: string
}

type ChartType = 'pie' | 'bar'

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{data.icon}</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {data.name}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Montant:</span>
            <span className="font-semibold tabular-nums">{formatCurrency(data.amount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Pourcentage:</span>
            <span className="font-semibold">{data.percentage.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Transactions:</span>
            <span className="font-semibold">{data.transactionCount}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const CategoryItem: React.FC<{ category: CategorySpending; rank: number }> = ({ 
  category, 
  rank 
}) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {/* Rank */}
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium">
        {rank}
      </div>

      {/* Category Icon */}
      <div 
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: category.color }}
      >
        <span className="text-sm">{category.icon}</span>
      </div>

      {/* Category Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {category.name}
          </h4>
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrency(category.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color 
                }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {category.percentage.toFixed(1)}%
            </span>
          </div>
          <Badge variant="ghost" size="sm">
            {category.transactionCount} transactions
          </Badge>
        </div>
      </div>
    </div>
  )
}

const SpendingByCategory: React.FC<SpendingByCategoryProps> = ({ 
  data, 
  loading = false,
  className 
}) => {
  const [chartType, setChartType] = React.useState<ChartType>('pie')
  
  // Sort data by amount for better visualization
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => b.amount - a.amount)
  }, [data])

  // Take top 5 categories for chart, group others
  const chartData = React.useMemo(() => {
    if (sortedData.length <= 5) return sortedData

    const top4 = sortedData.slice(0, 4)
    const others = sortedData.slice(4)
    const othersTotal = others.reduce((sum, item) => sum + item.amount, 0)
    const othersPercentage = others.reduce((sum, item) => sum + item.percentage, 0)

    return [
      ...top4,
      {
        id: 'others',
        name: 'Autres',
        amount: othersTotal,
        percentage: othersPercentage,
        color: '#9CA3AF',
        icon: '📦',
        transactionCount: others.reduce((sum, item) => sum + item.transactionCount, 0)
      }
    ]
  }, [sortedData])

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3">
                  <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Dépenses par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune dépense
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Vos dépenses par catégorie apparaîtront ici une fois que vous aurez ajouté des transactions.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dépenses par catégorie</CardTitle>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
            <Button
              variant={chartType === 'pie' ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType('pie')}
              className="text-xs"
            >
              Pie
            </Button>
            <Button
              variant={chartType === 'bar' ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType('bar')}
              className="text-xs"
            >
              Bar
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Top catégories
            </h4>
            {sortedData.slice(0, 5).map((category, index) => (
              <CategoryItem 
                key={category.id} 
                category={category} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpendingByCategory