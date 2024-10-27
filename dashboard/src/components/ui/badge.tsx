import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center opacity-80 px-2.5 py-0.5 rounded-full focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:ring-offset-2 font-normal text-xs uppercase transition-colors focus:outline-none hover:no-underline",
	{
		variants: {
			variant: {
				default:
					"bg-zinc-900 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900",
				secondary:
					"bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100",
				destructive:
					"bg-red-500 text-white dark:bg-red-700",
				outline:
					"border border-zinc-200 text-zinc-950 dark:border-zinc-800 dark:text-zinc-100",
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
