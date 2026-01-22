"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WelcomePopupProps {
  className?: string;
  delaySeconds?: number;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ 
  className,
  delaySeconds = 5 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user has already seen this popup
    const hasSeenPopup = localStorage.getItem("welcomePopupSeen");
    if (hasSeenPopup) {
      const seenTime = parseInt(hasSeenPopup, 10);
      // Don't show if seen within last 30 days
      if (Date.now() - seenTime < 30 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  // Handle escape key and body scroll
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

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("welcomePopupSeen", Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      if (phone.trim()) formData.append("phone", phone.trim());
      formData.append("_subject", "New Newsletter Signup");
      formData.append("source", "welcome_popup");

      const response = await fetch("https://formspree.io/f/xbjvlval", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setIsSubmitted(true);
      localStorage.setItem("welcomePopupSeen", Date.now().toString());
      
      // Close after showing success
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error subscribing:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "z-[100] fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm animate-in duration-300 fade-in",
        className,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative bg-white dark:bg-neutral-900 shadow-2xl m-4 rounded-2xl w-full max-w-lg overflow-hidden animate-in duration-300 zoom-in-95 slide-in-from-bottom-4">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="top-4 right-4 z-10 absolute hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image/gradient section */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent px-8 pt-12 pb-6">
          <div className="flex justify-center items-center bg-white dark:bg-neutral-800 shadow-lg mx-auto mb-4 rounded-2xl w-20 h-20">
            <img 
              src="/images/night_splint_square_small.jpg" 
              alt="Thetis Medical"
              className="rounded-xl w-16 h-16 object-cover"
            />
          </div>
          <h2 className="font-bold text-neutral-900 dark:text-neutral-100 text-2xl text-center">
            Welcome to Thetis Medical
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-center">
            Join 10,000+ people recovering from Achilles injuries
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSubmitted ? (
            <div className="py-4 text-center">
              <div className="flex justify-center items-center bg-primary/10 dark:bg-primary/20 mx-auto mb-4 rounded-full w-16 h-16">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                You're on the list!
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Check your inbox—and phone—for recovery tips and exclusive offers.
              </p>
            </div>
          ) : (
            <>
              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8 shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Free recovery tips & exercises
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8 shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Tips via email & SMS—we'll never spam you
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8 shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Expert guidance from foot & ankle surgeons
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    autoComplete="email"
                    className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (optional, for SMS tips)"
                    autoComplete="tel"
                    className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                  />
                </div>

                {error && (
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="gap-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Get Free Recovery Tips
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <button
                onClick={handleClose}
                className="mt-4 w-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-sm text-center transition-colors"
              >
                No thanks, I'll recover on my own
              </button>

              <p className="mt-4 text-neutral-400 dark:text-neutral-500 text-xs text-center">
                We'll email and text recovery tips. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
