import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Image path - copied to public/images
const achillesRopeEndsImage = "/images/achilles-rope-ends-pointed-down.png";

export default function ConfusedSection() {
    return (
        <div className="md:p-12">
            <div className="flex lg:flex-row-reverse flex-col items-center gap-8">
                {/* Content Side */}
                <div className="flex-1">
                    <p className="mb-4 font-medium text-primary text-sm uppercase tracking-widest">
                        I'M CONFUSED
                    </p>
                    <h3 className="mb-4 font-bold text-neutral-900 text-2xl md:text-3xl">
                        No patient can remember everything their surgeon and
                        physio says
                    </h3>
                    <p className="mb-6 font-semibold text-neutral-700 text-lg">
                        Get step by step guidance back to health.
                    </p>

                    <div className="bg-primary/5 mb-6 p-4 border border-primary/20 rounded-lg">
                        <p className="mb-2 font-semibold text-neutral-900">
                            Early recovery goal:
                        </p>
                        <p className="text-neutral-700">
                            Keep the ends close and protected
                        </p>
                    </div>

                    <p className="mb-6 font-semibold text-neutral-900 text-lg">
                        Don't risk not knowing.
                    </p>

                    <div className="flex sm:flex-row flex-col gap-4 mb-6">
                        <a
                            href="/course/standard"
                            className={cn(
                                buttonVariants({
                                    variant: "default",
                                    size: "lg",
                                }),
                                "justify-center bg-primary",
                            )}
                        >
                            Buy Now (£29)
                        </a>
                        <a
                            href="/course"
                            className="inline-flex justify-center items-center font-semibold text-primary text-lg hover:underline"
                        >
                            Get Email Course Free
                        </a>
                    </div>

                    <div className="pt-6 border-neutral-200 border-t">
                        <p className="mb-2 text-neutral-600 text-sm">
                            Related resources:
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <a
                                href="/course"
                                className="text-primary hover:underline"
                            >
                                View All Courses
                            </a>
                            <span className="text-neutral-300">•</span>
                            <a
                                href="/course/standard"
                                className="text-primary hover:underline"
                            >
                                Standard Course
                            </a>
                            <span className="text-neutral-300">•</span>
                            <a
                                href="/course/premium"
                                className="text-primary hover:underline"
                            >
                                Premium Course
                            </a>
                            <span className="text-neutral-300">•</span>
                            <a
                                href="/evidence-based-recovery"
                                className="text-primary hover:underline"
                            >
                                Evidence-Based Recovery
                            </a>
                            <span className="text-neutral-300">•</span>
                            <a
                                href="/research"
                                className="text-primary hover:underline"
                            >
                                Research
                            </a>
                        </div>
                    </div>
                </div>

                {/* Image Side */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <div className="bg-neutral-50 p-6 rounded-lg">
                        <img
                            src={achillesRopeEndsImage}
                            alt="Achilles tendon healing positions diagram showing foot neutral vs pointed down positions"
                            className="rounded-lg w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
