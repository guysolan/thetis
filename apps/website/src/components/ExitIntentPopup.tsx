"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExitIntentPopupProps {
  className?: string;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

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

  const handleViewCourse = () => {
    localStorage.setItem("exitPopupDismissed", Date.now().toString());
    window.location.href = "/course";
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
        "z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 animate-in duration-200 fade-in",
        className,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-sm overflow-hidden animate-in duration-200 zoom-in-95">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="top-3 right-3 z-10 absolute hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-5 text-center">
            <div className="flex justify-center items-center bg-primary/10 dark:bg-primary/20 mx-auto mb-3 rounded-full w-10 h-10">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
              Master Your Achilles Recovery
            </h2>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
              31 expert lessons covering every phase
            </p>
            <p className="mt-2 font-medium text-primary text-xs">
              Join 10,000+ people following Thetis recovery advice
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-5 text-sm">
            <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300">
              <span className="flex-shrink-0 font-medium text-primary text-xs">
                ✓
              </span>
              Week-by-week recovery guidance
            </div>
            <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300">
              <span className="flex-shrink-0 font-medium text-primary text-xs">
                ✓
              </span>
              Exercises with illustrations
            </div>
            <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300">
              <span className="flex-shrink-0 font-medium text-primary text-xs">
                ✓
              </span>
              Questions for your surgeon
            </div>
          </div>

          <Button
            onClick={handleViewCourse}
            className="gap-2 w-full"
          >
            View Recovery Course
            <ArrowRight className="w-4 h-4" />
          </Button>

          <button
            onClick={handleClose}
            className="mt-4 w-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xs text-center transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
