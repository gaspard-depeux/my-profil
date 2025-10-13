"use client"

import * as React from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface BalanceData {
  date: string
  balance: number
  income: number
  expenses: number
}

export interface BalanceChartProps {
  data: BalanceData[]
  loading?: boolean
  className?: string
}

type Period = '30d' | '90d' | '1y'

const periodLabels = {
  '30d': '30 jours',
  '90d': '3 mois',
  '1y': '1 an'
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).format(date)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          {formatDate(label)}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {entry.name === 'balance' ? 'Solde' :
                 entry.name === 'income' ? 'Revenus' : 'Dépenses'}
              </span>
            </div>
            <span className="text-sm font-medium tabular-nums">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const BalanceChart: React.FC<BalanceChartProps> = ({ 
  data, 
  loading = false,
  className 
}) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>('30d')
  const [chartType, setChartType] = React.useState<'line' | 'area'>('area')

  // Filter data based on selected period
  const filteredData = React.useMemo(() => {
    const now = new Date()
    const daysToSubtract = selectedPeriod === '30d' ? 30 : 
                          selectedPeriod === '90d' ? 90 : 365
    
    const cutoffDate = new Date(now.getTime() - daysToSubtract * 24 * 60 * 60 * 1000)
    
    return data.filter(item => new Date(item.date) >= cutoffDate)
  }, [data, selectedPeriod])

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Évolution du solde</CardTitle>
          <div className="flex items-center space-x-2">
            {/* Period selector */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              {(Object.keys(periodLabels) as Period[]).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="text-xs"
                >
                  {periodLabels[period]}
                </Button>
              ))}
            </div>
            
            {/* Chart type toggle */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              <Button
                variant={chartType === 'area' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('area')}
                className="text-xs"
              >
                Area
              </Button>
              <Button
                variant={chartType === 'line' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('line')}
                className="text-xs"
              >
                Line
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  className="text-xs text-gray-500"
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  className="text-xs text-gray-500"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#balanceGradient)"
                  name="balance"
                />
              </AreaChart>
            ) : (
              <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  className="text-xs text-gray-500"
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  className="text-xs text-gray-500"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#6366F1', strokeWidth: 2 }}
                  name="balance"
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="expenses"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Solde</span>
          </div>
          {chartType === 'line' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-success" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-danger" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Dépenses</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceChart