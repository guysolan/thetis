"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { markEmailAsSubscribed } from "@/lib/subscription-storage";
import { trackEmailSignup } from "@/lib/analytics";

const REDIRECT_URL = "/splint-customer/course";

export default function SplintCustomerEmailForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email?.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      const { error: supabaseError } = await supabase
        .from("users")
        .upsert(
          {
            email: normalizedEmail,
            email_course_enabled: false,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "email",
            ignoreDuplicates: false,
          },
        )
        .select();

      if (supabaseError) {
        throw new Error(supabaseError.message || "Failed to save your information");
      }

      markEmailAsSubscribed(normalizedEmail);
      trackEmailSignup("splint_customer");

      window.location.href = REDIRECT_URL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto w-full max-w-md">
      <div className="flex sm:flex-row flex-col gap-3">
        <div className="relative flex-1">
          <Mail className="top-1/2 left-3 absolute w-4 h-4 text-neutral-400 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email"
            autoComplete="email"
            disabled={isSubmitting}
            className="bg-white dark:bg-neutral-800 disabled:opacity-50 py-3 pr-4 pl-10 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "gap-2 shrink-0 disabled:opacity-50",
          )}
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
        </button>
      </div>
      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
    </form>
  );
}
