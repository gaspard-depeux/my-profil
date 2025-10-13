"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const cardVariants = cva(
  "rounded-2xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
        elevated: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg",
        glass: "glass dark:glass-dark border-gray-200/30 dark:border-gray-700/30",
        gradient: "flowtrack-gradient text-white border-transparent shadow-lg hover:shadow-xl",
        success: "success-gradient text-white border-transparent shadow-lg hover:shadow-xl",
        warning: "warning-gradient text-white border-transparent shadow-lg hover:shadow-xl",
        danger: "danger-gradient text-white border-transparent shadow-lg hover:shadow-xl",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        scale: "hover:scale-[1.02]",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "none",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hover, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// FlowTrack specific card variants
const StatsCard = React.forwardRef<HTMLDivElement, CardProps & {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}>(({ title, value, change, icon, trend, className, ...props }, ref) => (
  <Card
    ref={ref}
    variant="elevated"
    hover="lift"
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      {icon && (
        <div className="text-muted-foreground">
          {icon}
        </div>
      )}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      {change !== undefined && (
        <p className={cn(
          "text-xs flex items-center mt-1",
          trend === 'up' ? "text-success" : 
          trend === 'down' ? "text-danger" : 
          "text-muted-foreground"
        )}>
          {trend === 'up' && "↗"}
          {trend === 'down' && "↘"}
          {change > 0 ? '+' : ''}{change}%
          <span className="ml-1 text-muted-foreground">vs mois dernier</span>
        </p>
      )}
    </CardContent>
  </Card>
))
StatsCard.displayName = "StatsCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  StatsCard,
  cardVariants
}