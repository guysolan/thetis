"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight, Gift, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExitIntentPopupProps {
  className?: string;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showPopup = useCallback(() => {
    if (hasShown) return;

    // Check if user has dismissed before (stored in localStorage)
    const dismissed = localStorage.getItem("exitPopupDismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Don't show if dismissed within last 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    setIsVisible(true);
    setHasShown(true);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("exitPopupDismissed", Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call - replace with actual email signup
    try {
      // You would replace this with your actual email signup API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      localStorage.setItem("exitPopupDismissed", Date.now().toString());

      // Redirect to course signup after short delay
      setTimeout(() => {
        window.location.href = "/course/emails";
      }, 2000);
    } catch (error) {
      console.error("Failed to submit email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Exit intent detection - when mouse leaves viewport at top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Also trigger on back button attempt (mobile-friendly)
    const handlePopState = () => {
      showPopup();
    };

    // Delay adding listeners to avoid immediate triggering
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("popstate", handlePopState);
    }, 5000); // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showPopup]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "z-50 fixed inset-0 flex justify-center items-center bg-black/60 p-4 animate-in duration-300 fade-in",
        className,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-in duration-300 zoom-in-95">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="top-4 right-4 z-10 absolute text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Gift className="w-8 h-8" />
            </div>
          </div>
          <h2 className="mb-2 font-bold text-2xl">
            Wait! Don't leave empty-handed
          </h2>
          <p className="text-primary-foreground/80">
            Get our free recovery email course
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted
            ? (
              <div className="py-4 text-center">
                <div className="flex justify-center items-center bg-primary/20 dark:bg-primary/30 mx-auto mb-4 rounded-full w-16 h-16">
                  <Mail className="w-8 h-8 text-primary dark:text-primary/80" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                  You're all set!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Redirecting you to the course...
                </p>
              </div>
            )
            : (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Week-by-week recovery guidance timed to your injury
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Expert tips on what to expect at each stage
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Completely free - no strings attached
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="dark:bg-neutral-800 px-4 py-3 border border-neutral-300 focus:border-transparent dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 bg-primary hover:bg-primary/90 py-3 w-full text-primary-foreground"
                  >
                    {isSubmitting
                      ? (
                        "Signing up..."
                      )
                      : (
                        <>
                          Get Free Course
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                  </Button>
                </form>

                <button
                  onClick={handleClose}
                  className="mt-3 w-full text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 dark:text-neutral-400 text-sm text-center transition-colors"
                >
                  No thanks, I'll figure it out myself
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
