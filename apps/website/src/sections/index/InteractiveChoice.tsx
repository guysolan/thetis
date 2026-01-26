import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CantSleepSection from "./CantSleepSection";
import ConfusedSection from "./ConfusedSection";

type Choice = "sleep" | "confused" | null;

export default function InteractiveChoice() {
    const [selectedChoice, setSelectedChoice] = useState<Choice>(null);

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto px-4 max-w-7xl">
                {/* Question */}
                <div className="mb-12 text-center">
                    <p className="mb-6 font-semibold text-neutral-900 dark:text-neutral-100 text-xl md:text-2xl">
                        What is your biggest issue right now with your Achilles
                        rupture recovery:
                    </p>
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setSelectedChoice("sleep")}
                            className={cn(
                                "px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all",
                                selectedChoice === "sleep"
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-neutral-900 border-primary/30 hover:border-primary hover:bg-primary/5",
                            )}
                        >
                            I can't Sleep
                        </button>
                        <span className="font-medium text-neutral-600">or</span>
                        <button
                            type="button"
                            onClick={() => setSelectedChoice("confused")}
                            className={cn(
                                "px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all",
                                selectedChoice === "confused"
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-neutral-900 border-primary/30 hover:border-primary hover:bg-primary/5",
                            )}
                        >
                            I'm Confused
                        </button>
                    </div>
                </div>

                {/* Sections Container - Show only selected solution */}
                {selectedChoice === null
                    ? (
                        // Show both when nothing is selected
                        <div className="flex flex-col gap-12">
                            <CantSleepSection />
                            <ConfusedSection />
                        </div>
                    )
                    : (
                        // Show only the selected solution
                        <div
                            className="flex flex-col gap-12"
                            role="status"
                            aria-live="polite"
                            aria-label="Solution section"
                        >
                            {selectedChoice === "sleep" && <CantSleepSection />}
                            {selectedChoice === "confused" && (
                                <ConfusedSection />
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}
