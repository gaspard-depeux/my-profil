"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white hover:bg-primary-dark",
        secondary: "border-transparent bg-secondary text-white hover:bg-secondary-dark",
        success: "border-transparent bg-success text-white hover:bg-green-600",
        warning: "border-transparent bg-warning text-white hover:bg-orange-600",
        danger: "border-transparent bg-danger text-white hover:bg-red-600",
        outline: "border-gray-300 text-foreground hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
        ghost: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        // Category-specific variants
        income: "border-transparent bg-success text-white",
        expense: "border-transparent bg-danger text-white",
        savings: "border-transparent bg-purple-500 text-white",
        // Status variants
        active: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        inactive: "border-transparent bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
        pending: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        completed: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, removable, onRemove, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(badgeVariants({ variant, size }), className)} 
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && (
          <button
            onClick={onRemove}
            className="ml-1 rounded-full hover:bg-black/20 p-0.5 transition-colors"
            type="button"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Badge.displayName = "Badge"

// Category Badge Component
export interface CategoryBadgeProps extends Omit<BadgeProps, 'variant'> {
  category: {
    name: string
    color: string
    icon?: string
  }
  type?: 'income' | 'expense' | 'transfer'
}

const CategoryBadge = React.forwardRef<HTMLDivElement, CategoryBadgeProps>(
  ({ category, type, className, ...props }, ref) => {
    const getVariant = () => {
      if (type === 'income') return 'income'
      if (type === 'expense') return 'expense'
      return 'default'
    }

    return (
      <Badge
        ref={ref}
        variant={getVariant()}
        className={cn(className)}
        style={{ backgroundColor: category.color }}
        {...props}
      >
        {category.icon && <span className="mr-1">{category.icon}</span>}
        {category.name}
      </Badge>
    )
  }
)
CategoryBadge.displayName = "CategoryBadge"

// Status Badge Component
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'on-track' | 'behind' | 'exceeded'
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const getVariant = () => {
      switch (status) {
        case 'active':
        case 'completed':
        case 'on-track':
          return 'active'
        case 'inactive':
          return 'inactive'
        case 'pending':
        case 'behind':
          return 'pending'
        case 'exceeded':
          return 'danger'
        default:
          return 'default'
      }
    }

    const getLabel = () => {
      switch (status) {
        case 'active': return 'Actif'
        case 'inactive': return 'Inactif'
        case 'pending': return 'En attente'
        case 'completed': return 'Terminé'
        case 'on-track': return 'Sur la bonne voie'
        case 'behind': return 'En retard'
        case 'exceeded': return 'Dépassé'
        default: return status
      }
    }

    return (
      <Badge
        ref={ref}
        variant={getVariant()}
        {...props}
      >
        {getLabel()}
      </Badge>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { Badge, CategoryBadge, StatusBadge, badgeVariants }