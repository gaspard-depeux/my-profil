"use client"

import * as React from "react"
import { Root, Indicator } from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-1000 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
        gradient: "bg-gradient-to-r from-primary to-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof progressVariants> {
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"]
  showLabel?: boolean
  label?: string
  animated?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof Root>,
  ProgressProps
>(({ 
  className, 
  value, 
  size, 
  variant, 
  showLabel, 
  label, 
  animated = true,
  ...props 
}, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0)

  React.useEffect(() => {
    if (animated && value !== undefined && value !== null) {
      const timer = setTimeout(() => setAnimatedValue(value), 100)
      return () => clearTimeout(timer)
    } else if (value !== undefined && value !== null) {
      setAnimatedValue(value)
    }
  }, [value, animated])

  const displayValue = animated ? animatedValue : (value ?? 0)

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {label}
          </span>
          {showLabel && (
            <span className="text-sm text-muted-foreground tabular-nums">
              {Math.round(displayValue)}%
            </span>
          )}
        </div>
      )}
      <Root
        ref={ref}
        className={cn(progressVariants({ size, className }))}
        {...props}
      >
        <Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ 
            transform: `translateX(-${100 - displayValue}%)`,
            transition: animated ? 'transform 1000ms ease-out' : 'none'
          }}
        />
      </Root>
    </div>
  )
})
Progress.displayName = "Progress"

// Circular Progress Component
export interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gradient'
  showLabel?: boolean
  label?: string
  className?: string
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    value, 
    size = 120, 
    strokeWidth = 8, 
    variant = 'default', 
    showLabel, 
    label,
    className 
  }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    const getStrokeColor = () => {
      switch (variant) {
        case 'success': return '#10B981'
        case 'warning': return '#F59E0B'
        case 'danger': return '#EF4444'
        case 'gradient': return 'url(#gradient)'
        default: return '#6366F1'
      }
    }

    return (
      <div ref={ref} className={cn("relative inline-flex items-center justify-center", className)}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {variant === 'gradient' && (
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          )}
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {(showLabel || label) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tabular-nums">
              {Math.round(value)}%
            </span>
            {label && (
              <span className="text-xs text-muted-foreground text-center">
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress, progressVariants }