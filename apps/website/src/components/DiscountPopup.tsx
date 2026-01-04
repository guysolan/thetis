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
import { Calendar } from "@thetis/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Mail, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DiscountPopupProps {
    onEmailSubmit?: (email: string) => Promise<void>;
    onCourseSignup?: (email: string, ruptureDate: Date) => Promise<void>;
}

export function DiscountPopup({
    onEmailSubmit,
    onCourseSignup,
}: DiscountPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"discount" | "course">("discount");
    const [email, setEmail] = useState("");
    const [ruptureDate, setRuptureDate] = useState<Date | undefined>(undefined);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            // Move to course signup step
            setStep("course");
        } catch (error) {
            console.error("Failed to submit email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !ruptureDate) return;

        setIsSubmitting(true);
        try {
            await onCourseSignup?.(email, ruptureDate);
            handleClose();
        } catch (error) {
            console.error("Failed to sign up for course:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkipCourse = () => {
        handleClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && handleClose()}
        >
            <DialogContent className="sm:max-w-md">
                {step === "discount"
                    ? (
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
                    )
                    : (
                        <>
                            <DialogHeader>
                                <div className="flex justify-center items-center bg-primary/10 mx-auto mb-3 rounded-full w-12 h-12">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <DialogTitle className="text-xl text-center">
                                    Free Recovery Email Course
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    Get personalized recovery guidance timed to
                                    your injury date
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={handleCourseSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="course-email">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="course-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>
                                        When did you rupture your Achilles?
                                    </Label>
                                    <Popover
                                        open={calendarOpen}
                                        onOpenChange={setCalendarOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "justify-start w-full font-normal text-left",
                                                    !ruptureDate &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 w-4 h-4" />
                                                {ruptureDate
                                                    ? format(ruptureDate, "PPP")
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="p-0 w-auto"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={ruptureDate}
                                                onSelect={(date) => {
                                                    setRuptureDate(date);
                                                    setCalendarOpen(false);
                                                }}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("2020-01-01")}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2 text-neutral-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">✓</span>
                                        Week-by-week tips for your injury stage
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">✓</span>
                                        Expert guidance on what to expect
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">✓</span>
                                        Completely free, no strings attached
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isSubmitting || !email ||
                                            !ruptureDate}
                                    >
                                        {isSubmitting
                                            ? "Signing up..."
                                            : "Subscribe to Course"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleSkipCourse}
                                        disabled={isSubmitting}
                                    >
                                        Skip
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
            </DialogContent>
        </Dialog>
    );
}

export default DiscountPopup;
