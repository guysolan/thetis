import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center disabled:opacity-50 rounded-lg focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-semibold transition-colors cursor-pointer disabled:pointer-events-none hover:scale-[1.02] focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "!bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-black text-black bg-background hover:bg-accent hover:text-accent-foreground dark:text-neutral-50 dark:border-neutral-50",
        secondary:
          "bg-primary/10 dark:bg-primary/10 border border-primary/25 text-neutral-800 hover:bg-primary/20",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:bg-neutral-50 dark:text-neutral-900",
        link: "text-bg underline-offset-4 !underline",
      },
      size: {
        default: "h-10 rounded-md px-4 py-2 text-base",
        md: "h-10 rounded-md px-4 py-2 text-base",
        xs: "rounded-md px-2 py-1 text-xs w-fit",
        sm: "h-9 rounded-md px-3 text-sm w-fit",
        lg: "md:h-12 rounded-lg md:px-8 text-base h-10 px-6",
        xl: "h-14 px-10 text-lg rounded-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
