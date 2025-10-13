"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const inputVariants = cva(
  "flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-300 dark:border-gray-600 focus-visible:border-primary",
        error: "border-danger focus-visible:ring-danger",
        success: "border-success focus-visible:ring-success",
      },
      inputSize: {
        default: "h-12 px-4 py-3",
        sm: "h-9 px-3 py-2 text-xs",
        lg: "h-14 px-6 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  error?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant, 
    inputSize,
    leftIcon, 
    rightIcon, 
    label, 
    error, 
    hint,
    ...props 
  }, ref) => {
    const hasError = !!error
    const inputVariant = hasError ? 'error' : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, inputSize, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p className={cn(
            "text-xs",
            error ? "text-danger" : "text-muted-foreground"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Currency Input Component
export interface CurrencyInputProps extends Omit<InputProps, 'type'> {
  currency?: string
  value?: number
  onValueChange?: (value: number | undefined) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currency = "€", value, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(
      value ? value.toString() : ""
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Remove non-numeric characters except decimal point
      const numericValue = inputValue.replace(/[^0-9.,]/g, '').replace(',', '.')
      
      setDisplayValue(numericValue)
      
      const parsedValue = parseFloat(numericValue)
      onValueChange?.(isNaN(parsedValue) ? undefined : parsedValue)
    }

    React.useEffect(() => {
      setDisplayValue(value ? value.toString() : "")
    }, [value])

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        rightIcon={<span className="text-sm font-medium">{currency}</span>}
        className={cn("tabular-nums", props.className)}
      />
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

// Number Input Component
export interface NumberInputProps extends Omit<InputProps, 'type'> {
  value?: number
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onValueChange, min, max, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const numericValue = parseFloat(inputValue)
      
      if (inputValue === '') {
        onValueChange?.(undefined)
        return
      }
      
      if (!isNaN(numericValue)) {
        let finalValue = numericValue
        
        if (min !== undefined && finalValue < min) finalValue = min
        if (max !== undefined && finalValue > max) finalValue = max
        
        onValueChange?.(finalValue)
      }
    }

    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        value={value ?? ""}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className={cn("tabular-nums", props.className)}
      />
    )
  }
)
NumberInput.displayName = "NumberInput"

export { Input, CurrencyInput, NumberInput, inputVariants }