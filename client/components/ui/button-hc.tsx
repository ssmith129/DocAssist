import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-hc-primary text-white hover:opacity-90 focus:ring-blue-200",
        destructive: "bg-hc-error text-white hover:opacity-90 focus:ring-red-200",
        outline: "border-2 border-hc-primary bg-transparent text-hc-primary hover:bg-hc-primary hover:text-white focus:ring-blue-200",
        secondary: "bg-gray-100 text-hc-primary hover:bg-gray-200 focus:ring-gray-200",
        ghost: "text-hc-primary hover:bg-gray-100 focus:ring-gray-200",
        link: "text-hc-primary underline-offset-4 hover:underline focus:ring-blue-200",
        success: "bg-hc-success text-white hover:opacity-90 focus:ring-green-200",
        warning: "bg-hc-warning text-white hover:opacity-90 focus:ring-yellow-200",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
      priority: {
        high: "ring-4 ring-blue-100 border-2 border-blue-300",
        normal: "",
        low: "opacity-75",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      priority: "normal",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  tooltipText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      priority,
      asChild = false,
      loading = false,
      loadingText = "Loading...",
      iconLeft,
      iconRight,
      children,
      disabled,
      "aria-label": ariaLabel,
      title,
      tooltipText,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    
    const isDisabled = disabled || loading;
    
    // Enhanced accessibility props
    const accessibilityProps = {
      "aria-disabled": isDisabled,
      "aria-busy": loading,
      "aria-label": ariaLabel || (loading ? loadingText : undefined),
      title: title || tooltipText || ariaLabel,
      tabIndex: isDisabled ? -1 : 0,
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, priority, className }))}
        ref={ref}
        disabled={isDisabled}
        {...accessibilityProps}
        {...props}
      >
        {loading && (
          <Loader2 
            className="mr-2 h-4 w-4 animate-spin" 
            aria-hidden="true"
          />
        )}
        {!loading && iconLeft && (
          <span className="mr-2" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {loading ? loadingText : children}
        {!loading && iconRight && (
          <span className="ml-2" aria-hidden="true">
            {iconRight}
          </span>
        )}
        {/* Screen reader only loading announcement */}
        {loading && (
          <span className="sr-only" aria-live="polite">
            Loading, please wait
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// Specialized healthcare button variants
export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="default"
      priority="high"
      {...props}
    >
      {children}
    </Button>
  )
);

export const EmergencyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="destructive"
      priority="high"
      className={cn("pulse-critical", className)}
      {...props}
    >
      {children}
    </Button>
  )
);

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      {...props}
    >
      {children}
    </Button>
  )
);

PrimaryButton.displayName = "PrimaryButton";
EmergencyButton.displayName = "EmergencyButton";
SecondaryButton.displayName = "SecondaryButton";

export { Button, buttonVariants };
