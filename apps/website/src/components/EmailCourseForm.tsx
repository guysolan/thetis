"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subscribePatient } from "@/components/subscribe/api/subscribe";
import { Mail } from "lucide-react";

export function EmailCourseForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ruptureDate, setRuptureDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            // Subscribe to email list
            await subscribePatient(email);
            // TODO: Store name and rupture date for email course scheduling
            console.log(
                "Name:",
                name,
                "Email:",
                email,
                "Rupture Date:",
                ruptureDate,
            );
            setIsSubmitted(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Error submitting form:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 p-8 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <p className="mb-2 font-semibold text-green-800 dark:text-green-200 text-lg">
                    Thank you!
                </p>
                <p className="text-green-700 dark:text-green-300">
                    We've received your information. Check your email for
                    confirmation.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md">
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder="Your name"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label
                    htmlFor="ruptureDate"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Achilles Rupture Date
                </label>
                <input
                    id="ruptureDate"
                    type="date"
                    value={ruptureDate}
                    onChange={(e) => setRuptureDate(e.target.value)}
                    required
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                />
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                        {error}
                    </p>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="gap-2 w-full"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? (
                        "Submitting..."
                    )
                    : (
                        <>
                            <Mail className="w-4 h-4" />
                            Sign Up Free
                        </>
                    )}
            </Button>
        </form>
    );
}
