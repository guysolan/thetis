"use client";

import React, { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface SubscribeBlockFormProps {
    variant?: "section" | "compact";
    source?: string;
}

export function SubscribeBlockForm({
    variant = "section",
    source = "subscribe_block",
}: SubscribeBlockFormProps) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // Normalize email to lowercase
            const normalizedEmail = email.toLowerCase().trim();
            const phoneNumber = phone.trim() || null;

            // Upsert user to Supabase thetis database
            const { data, error: supabaseError } = await supabase
                .from("users")
                .upsert(
                    {
                        email: normalizedEmail,
                        phone: phoneNumber,
                        email_course_enabled: true,
                        updated_at: new Date().toISOString(),
                    },
                    {
                        onConflict: "email",
                    },
                )
                .select();

            if (supabaseError) {
                console.error("Supabase error:", supabaseError);
                throw new Error("Failed to save your information");
            }

            setIsSubmitted(true);
            // Reset form after success
            setTimeout(() => {
                setEmail("");
                setPhone("");
                setIsSubmitted(false);
            }, 3000);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Error subscribing:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div
                className={cn(
                    "border border-primary/20 dark:border-primary/30 rounded-xl",
                    variant === "section" &&
                        "bg-primary/5 dark:bg-primary/10 py-8 md:py-10 px-6 md:px-8",
                    variant === "compact" &&
                        "bg-primary/5 dark:bg-primary/10 p-5",
                )}
            >
                <div className="flex items-center gap-2 text-primary">
                    <Mail className="w-4 h-4" />
                    <p className="font-medium text-sm">
                        You're subscribed! Check your inbox.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section
            className={cn(
                "border border-primary/20 dark:border-primary/30 rounded-xl",
                variant === "section" &&
                    "bg-primary/5 dark:bg-primary/10 py-8 md:py-10 px-6 md:px-8",
                variant === "compact" && "bg-primary/5 dark:bg-primary/10 p-5",
            )}
        >
            <div
                className={cn(
                    "flex flex-col gap-4",
                    variant === "section" ? "max-w-xl" : "max-w-md",
                )}
            >
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-primary/10 dark:bg-primary/20 rounded-lg w-9 h-9 shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            Get recovery tips by email & SMS
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Free guidance. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex sm:flex-row flex-col gap-2 w-full"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        autoComplete="email"
                        disabled={isSubmitting}
                        className="flex-1 bg-white dark:bg-neutral-800 disabled:opacity-50 px-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-0 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm"
                    />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone (optional)"
                        autoComplete="tel"
                        disabled={isSubmitting}
                        className="flex-1 bg-white dark:bg-neutral-800 disabled:opacity-50 px-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-0 sm:max-w-[140px] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            buttonVariants({
                                variant: "default",
                                size: "default",
                            }),
                            "shrink-0 disabled:opacity-50",
                        )}
                    >
                        {isSubmitting
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : (
                                "Subscribe"
                            )}
                    </button>
                </form>

                {error && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
}
