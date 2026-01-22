"use client";

import { ReviewCard } from "./ReviewCard";
import { patients } from "./content/patients";
import { Star } from "lucide-react";

export default function FeaturedReviews() {
    const featuredReviews = patients
        .filter((review) => review.is_pinned)
        .slice(0, 3)
        .map((review) => ({
            ...review,
            description: review.description || "Verified Patient",
            image: review.image || null,
        }));

    return (
        <section className="bg-gradient-to-b from-white to-neutral-50 py-16 md:py-24">
            <div className="mx-auto px-4 max-w-7xl">
                {/* Header with Trust Signals */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 mb-4 px-4 py-2 rounded-full">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className="fill-yellow-400 w-5 h-5 text-yellow-400"
                                />
                            ))}
                        </div>
                        <span className="font-bold text-primary text-lg">
                            4.9/5
                        </span>
                    </div>
                    <h2 className="mb-4 font-bold text-neutral-900 text-3xl md:text-4xl">
                        Trusted by 5,000+ Patients
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-neutral-600 text-lg">
                        Real reviews from real patients who've found better
                        sleep and faster recovery
                    </p>
                </div>

                {/* Featured Reviews Grid */}
                <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {featuredReviews.map((review, index) => (
                        <ReviewCard
                            key={review.name || index}
                            review={review}
                        />
                    ))}
                </div>

                {/* View All Reviews CTA */}
                <div className="text-center">
                    <a
                        href="/reviews"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                    >
                        View All Reviews
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
