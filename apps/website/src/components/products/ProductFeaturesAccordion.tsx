"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/config/languages";

interface Feature {
    title: string;
    description: string;
}

interface ProductFeaturesAccordionProps {
    features: Feature[];
    lang?: Lang;
    className?: string;
}

export function ProductFeaturesAccordion({
    features,
    lang = "en",
    className,
}: ProductFeaturesAccordionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item expanded by default

    const toggleFeature = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className={cn("space-y-2", className)}>
            {features.map((feature, index) => {
                const isExpanded = expandedIndex === index;

                return (
                    <div
                        key={index}
                        className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden transition-all"
                    >
                        <button
                            onClick={() => toggleFeature(index)}
                            className="flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 p-4 w-full transition-colors"
                        >
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-left">
                                {feature.title}
                            </span>
                            {isExpanded
                                ? (
                                    <ChevronUp className="ml-4 w-5 h-5 text-neutral-500 shrink-0" />
                                )
                                : (
                                    <ChevronDown className="ml-4 w-5 h-5 text-neutral-500 shrink-0" />
                                )}
                        </button>
                        {isExpanded && (
                            <div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400 text-sm">
                                {feature.description}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
