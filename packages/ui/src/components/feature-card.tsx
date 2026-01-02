"use client";

import * as React from "react";
import { cn } from "../utils";

export interface FeatureCardProps {
    /** Title of the feature */
    title: string;
    /** Description of the feature */
    description: string;
    /** Icon component to display */
    icon?: React.ReactNode;
    /** Visual variant */
    variant?: "default" | "bordered" | "filled";
    /** Additional className */
    className?: string;
}

function FeatureCard({
    title,
    description,
    icon,
    variant = "default",
    className,
}: FeatureCardProps) {
    const variantStyles = {
        default: "bg-card border border-border",
        bordered:
            "bg-white dark:bg-neutral-800 border border-border hover:border-primary/50 transition-colors",
        filled: "bg-muted",
    };

    return (
        <div
            className={cn(
                "flex items-start gap-4 p-6 rounded-xl",
                variantStyles[variant],
                className,
            )}
        >
            {icon && (
                <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12 shrink-0">
                    <div className="w-6 h-6 text-primary">{icon}</div>
                </div>
            )}
            <div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
