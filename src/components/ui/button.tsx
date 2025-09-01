import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-solar-yellow-400 hover:bg-solar-yellow-500 text-solar-dark-800",
        destructive: "bg-red-500 hover:bg-red-600 text-white",
        outline: "border border-solar-dark-300 bg-transparent hover:bg-solar-dark-100 dark:border-solar-dark-600 dark:hover:bg-solar-dark-800",
        secondary: "bg-solar-dark-200 hover:bg-solar-dark-300 text-solar-dark-800 dark:bg-solar-dark-700 dark:hover:bg-solar-dark-600 dark:text-white",
        ghost: "hover:bg-solar-dark-100 hover:text-solar-dark-800 dark:hover:bg-solar-dark-800 dark:hover:text-white",
        link: "text-solar-yellow-500 underline-offset-4 hover:underline",
        success: "bg-solar-green-500 hover:bg-solar-green-600 text-white",
        warning: "bg-solar-amber-500 hover:bg-solar-amber-600 text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
