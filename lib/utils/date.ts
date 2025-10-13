/**
 * Date formatting and manipulation utilities for FlowTrack
 */

import { format, formatDistanceToNow, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from 'date-fns'
import { fr } from 'date-fns/locale'

export const formatDate = (
  date: Date | string,
  formatStr: string = 'dd/MM/yyyy'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: fr })
}

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isToday(dateObj)) {
    return "Aujourd'hui"
  }
  
  if (isYesterday(dateObj)) {
    return "Hier"
  }
  
  if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE', { locale: fr })
  }
  
  if (isThisMonth(dateObj)) {
    return format(dateObj, 'dd MMM', { locale: fr })
  }
  
  if (isThisYear(dateObj)) {
    return format(dateObj, 'dd MMM', { locale: fr })
  }
  
  return format(dateObj, 'dd/MM/yyyy', { locale: fr })
}

export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { 
    addSuffix: true, 
    locale: fr 
  })
}

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'dd/MM/yyyy à HH:mm', { locale: fr })
}

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'HH:mm', { locale: fr })
}

export const getMonthName = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMMM yyyy', { locale: fr })
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