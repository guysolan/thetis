import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center disabled:opacity-50 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-semibold hover:scale-[1.02] transition-colors cursor-pointer disabled:pointer-events-none",
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
          "bg-primary/10 dark:bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:bg-neutral-50 dark:text-neutral-900",
        link: "text-bg underline-offset-4 !underline",
      },
      size: {
        default: "h-10 rounded-sm px-4 py-2 text-base",
        md: "h-10 rounded-sm px-4 py-2 text-base",
        xs: "rounded-sm px-2 py-1 text-xs w-fit",
        sm: "h-9 rounded-sm px-3 text-sm w-fit",
        lg: "md:h-12 rounded-sm md:px-8 text-base h-10 px-6",
        xl: "h-14 px-10 text-lg rounded-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

type ButtonElementProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonProps
>;
type AnchorElementProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ButtonProps
>;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & (ButtonElementProps & AnchorElementProps)
>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }

    if (href) {
      const { onClick, type, ...anchorProps } = props as AnchorElementProps & {
        onClick?: () => void;
        type?: string;
      };
      return (
        <a
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...anchorProps}
        />
      );
    }

    const buttonProps = props as ButtonElementProps;
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...buttonProps}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
