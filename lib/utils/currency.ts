/**
 * Currency formatting utilities for FlowTrack
 */

export const formatCurrency = (
  amount: number,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    showSign?: boolean
  } = {}
): string => {
  const {
    currency = 'EUR',
    locale = 'fr-FR',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSign = false
  } = options

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  })

  const formatted = formatter.format(Math.abs(amount))
  
  if (showSign && amount !== 0) {
    return amount > 0 ? `+${formatted}` : `-${formatted}`
  }
  
  return formatted
}

export const formatCompactCurrency = (amount: number, currency = 'EUR'): string => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  })
  
  return formatter.format(amount)
}

export const parseCurrency = (value: string): number | null => {
  // Remove currency symbols and spaces
  const cleaned = value.replace(/[€$£¥\s]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  
  return isNaN(parsed) ? null : parsed
}

export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
    CHF: 'CHF',
    CAD: 'C$',
  }
  
  return symbols[currency] || currency
}

export const formatPercentage = (
  value: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    showSign?: boolean
  } = {}
): string => {
  const {
    minimumFractionDigits = 1,
    maximumFractionDigits = 1,
    showSign = false
  } = options

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  })

  const formatted = formatter.format(value / 100)
  
  if (showSign && value !== 0) {
    return value > 0 ? `+${formatted}` : formatted
  }
  
  return formatted
}