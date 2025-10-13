/**
 * Date formatting and manipulation utilities for FlowTrack
 */

// Simple date utilities without external dependencies

// Helper functions
const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
}

const isThisWeek = (date: Date): boolean => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  return date >= startOfWeek && date <= endOfWeek
}

const isThisMonth = (date: Date): boolean => {
  const today = new Date()
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

const isThisYear = (date: Date): boolean => {
  const today = new Date()
  return date.getFullYear() === today.getFullYear()
}

export const formatDate = (
  date: Date | string,
  formatStr: string = 'dd/MM/yyyy'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  
  if (formatStr === 'dd/MM/yyyy') {
    return `${day}/${month}/${year}`
  }
  
  return dateObj.toLocaleDateString('fr-FR')
}

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (isToday(dateObj)) {
    return "Aujourd'hui"
  }
  
  if (isYesterday(dateObj)) {
    return "Hier"
  }
  
  if (isThisWeek(dateObj)) {
    return dateObj.toLocaleDateString('fr-FR', { weekday: 'long' })
  }
  
  if (isThisMonth(dateObj)) {
    return dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
  }
  
  if (isThisYear(dateObj)) {
    return dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
  }
  
  return dateObj.toLocaleDateString('fr-FR')
}

export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'il y a quelques secondes'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `il y a ${diffInMonths} mois`
  }
  
  const diffInYears = Math.floor(diffInMonths / 12)
  return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`
}

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('fr-FR') + ' à ' + dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export const getMonthName = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

export const getStartOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const getEndOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  return new Date(date.setDate(diff))
}

export const getEndOfWeek = (date: Date = new Date()): Date => {
  const startOfWeek = getStartOfWeek(new Date(date))
  return new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000)
}

export const getDaysInMonth = (date: Date = new Date()): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const isWeekend = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const day = dateObj.getDay()
  return day === 0 || day === 6
}

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export const diffInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const generateDateRange = (
  start: Date,
  end: Date,
  interval: 'day' | 'week' | 'month' = 'day'
): Date[] => {
  const dates: Date[] = []
  const current = new Date(start)
  
  while (current <= end) {
    dates.push(new Date(current))
    
    switch (interval) {
      case 'day':
        current.setDate(current.getDate() + 1)
        break
      case 'week':
        current.setDate(current.getDate() + 7)
        break
      case 'month':
        current.setMonth(current.getMonth() + 1)
        break
    }
  }
  
  return dates
}