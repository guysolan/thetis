import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NightSplintBedImage from "@/assets/night-splint/achilles_rupture_night_splint_bed_thetis_medical.jpg";

// Ensure we can access the image src
const nightSplintImageSrc =
    typeof NightSplintBedImage === "object" && "src" in NightSplintBedImage
        ? NightSplintBedImage.src
        : NightSplintBedImage;

export default function CantSleepSection() {
    return (
        <div className="md:p-12">
            <div className="flex lg:flex-row flex-col items-center gap-8">
                {/* Content Side */}
                <div className="flex-1">
                    <p className="mb-4 font-medium text-primary text-sm uppercase tracking-widest">
                        I CAN'T SLEEP
                    </p>
                    <h3 className="mb-4 font-bold text-neutral-900 text-2xl md:text-3xl">
                        80% of patients struggle to sleep in the boot
                    </h3>
                    <p className="mb-6 font-semibold text-neutral-700 text-lg">
                        The only safe solution:
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-shrink-0 justify-center items-center bg-primary/10 rounded-full w-8 h-8">
                                <span className="font-bold text-primary">
                                    ✓
                                </span>
                            </div>
                            <p className="font-semibold text-neutral-900">
                                Trusted by surgeons
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-shrink-0 justify-center items-center bg-primary/10 rounded-full w-8 h-8">
                                <span className="font-bold text-primary">
                                    ✓
                                </span>
                            </div>
                            <p className="font-semibold text-neutral-900">
                                Loved by 5000+ patients
                            </p>
                        </div>
                    </div>

                    <p className="mb-6 font-semibold text-neutral-900 text-lg">
                        Would you sleep in your wellies?
                    </p>

                    <p className="mb-6 text-neutral-600">
                        p.s. It also works for showering!{" "}
                        <a
                            href="/washing-with-torn-achilles"
                            className="font-semibold text-primary hover:text-primary/80 underline"
                        >
                            Learn More
                        </a>
                    </p>

                    <div className="flex sm:flex-row flex-col gap-4 mb-6">
                        <a
                            href="/achilles-rupture-splint"
                            className={cn(
                                buttonVariants({
                                    variant: "default",
                                    size: "lg",
                                }),
                                "justify-center",
                            )}
                        >
                            Shop Night Splint
                        </a>
                        <a
                            href="/sleeping-with-torn-achilles"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                }),
                                "justify-center",
                            )}
                        >
                            Learn About Sleeping
                        </a>
                    </div>

                    <div className="pt-6 border-neutral-200 border-t">
                        <p className="mb-2 text-neutral-600 text-sm">
                            Related resources:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href="/reviews"
                                className="text-primary text-sm hover:underline"
                            >
                                Read Reviews
                            </a>
                            <span className="text-neutral-300">•</span>
                            <a
                                href="/achilles-rupture-splint#faqs"
                                className="text-primary text-sm hover:underline"
                            >
                                FAQs
                            </a>
                        </div>
                    </div>
                </div>

                {/* Image Side */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img
                        src={nightSplintImageSrc}
                        alt="Thetis Night Splint in bed - patient sleeping comfortably"
                        className="shadow-lg rounded-lg w-full"
                    />
                </div>
            </div>
        </div>
    );
}
