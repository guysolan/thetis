import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center opacity-80 px-2.5 py-0.5 rounded-full focus:ring-2 focus:ring-neutral-950 dark:focus:ring-neutral-300 focus:ring-offset-2 font-normal text-xs uppercase transition-colors focus:outline-none hover:no-underline",
	{
		variants: {
			variant: {
				default:
					"bg-neutral-900 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900",
				secondary:
					"bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100",
				destructive:
					"bg-red-500 text-white dark:bg-red-700",
				outline:
					"border border-neutral-200 text-neutral-950 dark:border-neutral-800 dark:text-neutral-100",
				success:
					"bg-green-500 text-white dark:bg-green-700",
				warning:
					"bg-yellow-500 text-white dark:bg-yellow-700",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
