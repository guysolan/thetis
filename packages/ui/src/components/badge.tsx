import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
	"inline-flex items-center px-2.5 py-0.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-xs transition-colors",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-primary/10 text-primary hover:bg-primary/20",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground border-border",
				success:
					"border-transparent bg-green-500 text-white hover:bg-green-500/80",
				warning:
					"border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
				muted:
					"border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, children, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props}>
			{children}
		</div>
	);
}

export { Badge, badgeVariants };
