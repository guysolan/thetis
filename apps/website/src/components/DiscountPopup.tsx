"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@thetis/ui/dialog";
import { Button } from "@thetis/ui/button";
import { Input } from "@thetis/ui/input";
import { Label } from "@thetis/ui/label";
import { Sparkles } from "lucide-react";

interface DiscountPopupProps {
    onEmailSubmit?: (email: string) => Promise<void>;
}

export function DiscountPopup({
    onEmailSubmit,
}: DiscountPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup
        const hasSeenPopup = localStorage.getItem("discountPopupSeen");
        if (hasSeenPopup) {
            // Check if it was dismissed more than 7 days ago
            const dismissedTime = parseInt(hasSeenPopup, 10);
            const daysSinceDismissed = (Date.now() - dismissedTime) /
                (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) {
                return;
            }
        }

        // Show popup after 3 seconds on page
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("discountPopupSeen", Date.now().toString());
    };

    const handleDiscountSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            await onEmailSubmit?.(email);
            setIsSubmitted(true);
            // Close after short delay
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error("Failed to submit email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && handleClose()}
        >
            <DialogContent className="sm:max-w-md">
                {isSubmitted
                    ? (
                        <div className="py-6 text-center">
                            <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-neutral-900 text-lg">
                                Check your email!
                            </h3>
                            <p className="text-neutral-500 text-sm">
                                Your 10% discount code is on its way.
                            </p>
                        </div>
                    )
                    : (
                        <>
                            <DialogHeader>
                                <div className="flex justify-center items-center bg-primary/10 mx-auto mb-3 rounded-full w-12 h-12">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <DialogTitle className="text-xl text-center">
                                    Save 10% on Your First Order!
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    Enter your email to receive a special
                                    discount code
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={handleDiscountSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting || !email}
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : "Get My 10% Discount"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="py-2 w-full text-neutral-500 hover:text-neutral-700 text-sm text-center underline underline-offset-2"
                                >
                                    No thanks
                                </button>
                            </form>
                        </>
                    )}
            </DialogContent>
        </Dialog>
    );
}

export default DiscountPopup;
