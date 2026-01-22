"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";

// Type for Supabase client (to avoid importing @supabase/supabase-js in shared package)
// Using any to allow flexibility with different Supabase client versions
type SupabaseClient = any;

export interface EmailSignupDialogProps {
    /** Custom trigger element - defaults to a button with "Get Recovery Emails" */
    trigger?: React.ReactNode;
    /** Additional class names for the trigger */
    triggerClassName?: string;
    /** Title text for the dialog */
    title?: string;
    /** Description text for the dialog */
    description?: string;
    /** Label for the email input */
    emailLabel?: string;
    /** Placeholder for the email input */
    emailPlaceholder?: string;
    /** Label for the date picker */
    dateLabel?: string;
    /** Placeholder for the date picker */
    datePlaceholder?: string;
    /** Submit button text */
    submitText?: string;
    /** Callback when form is submitted */
    onSubmit?: (
        data: { email: string; phone?: string; ruptureDate: Date },
    ) => void | Promise<void>;
    /** Show phone input field */
    showPhone?: boolean;
    /** Label for the phone input */
    phoneLabel?: string;
    /** Placeholder for the phone input */
    phonePlaceholder?: string;
    /** Callback when dialog open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Controlled open state */
    open?: boolean;
    /** Default trigger button text */
    triggerText?: string;
    /** Optional Supabase client for direct database integration */
    supabaseClient?: SupabaseClient;
}

function EmailSignupDialog({
    trigger,
    triggerClassName,
    title = "Get Free Recovery Tips",
    description =
        "Receive personalized recovery guidance timed to your injury date. We'll send you the right information exactly when you need it.",
    emailLabel = "Email Address",
    emailPlaceholder = "you@example.com",
    dateLabel = "When did you rupture your Achilles?",
    datePlaceholder = "Pick a date",
    submitText = "Subscribe to Recovery Emails",
    onSubmit,
    onOpenChange,
    open: controlledOpen,
    triggerText = "Get Recovery Emails",
    showPhone = false,
    phoneLabel = "Phone (optional, for SMS tips)",
    phonePlaceholder = "+1 (555) 123-4567",
    supabaseClient,
}: EmailSignupDialogProps) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [ruptureDate, setRuptureDate] = React.useState<Date | undefined>(
        undefined,
    );
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState("");

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled
        ? (newOpen: boolean) => onOpenChange?.(newOpen)
        : setInternalOpen;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !ruptureDate) return;

        setIsSubmitting(true);
        setError("");

        try {
            // If custom onSubmit is provided, use it
            if (onSubmit) {
                await onSubmit({
                    email,
                    phone: phone.trim() || undefined,
                    ruptureDate,
                });
            } else if (supabaseClient) {
                // Use Supabase client directly
                const normalizedEmail = email.toLowerCase().trim();
                const phoneNumber = phone.trim() || null;
                const ruptureDateStr = ruptureDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

                // Note: We don't include 'id' - it will auto-generate via DEFAULT gen_random_uuid()
                const { data, error: supabaseError } = await supabaseClient
                    .from("users")
                    .upsert(
                        {
                            email: normalizedEmail,
                            phone: phoneNumber,
                            rupture_date: ruptureDateStr,
                            email_course_enabled: true,
                            updated_at: new Date().toISOString(),
                        },
                        {
                            onConflict: "email",
                            ignoreDuplicates: false, // Update if exists
                        },
                    )
                    .select();

                if (supabaseError) {
                    console.error("Supabase error:", supabaseError);
                    throw new Error(
                        supabaseError.message ||
                            "Failed to save your information",
                    );
                }

                if (!data) {
                    throw new Error("No data returned from Supabase");
                }
            } else {
                throw new Error(
                    "Either onSubmit callback or supabaseClient must be provided",
                );
            }

            setOpen(false);
            // Reset form
            setEmail("");
            setPhone("");
            setRuptureDate(undefined);
        } catch (error) {
            console.error("Error submitting email signup:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className={cn("gap-2", triggerClassName)}>
                        <Mail className="w-4 h-4" />
                        {triggerText}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email-signup-email">{emailLabel}</Label>
                        <Input
                            id="email-signup-email"
                            type="email"
                            placeholder={emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11"
                            autoComplete="email"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    {showPhone && (
                        <div className="space-y-2">
                            <Label htmlFor="email-signup-phone">
                                {phoneLabel}
                            </Label>
                            <Input
                                id="email-signup-phone"
                                type="tel"
                                placeholder={phonePlaceholder}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-11"
                                autoComplete="tel"
                                disabled={isSubmitting}
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label>{dateLabel}</Label>
                        <Popover
                            open={calendarOpen}
                            onOpenChange={setCalendarOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "justify-start w-full h-11 font-normal text-left",
                                        !ruptureDate && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 w-4 h-4" />
                                    {ruptureDate
                                        ? (
                                            format(ruptureDate, "PPP")
                                        )
                                        : <span>{datePlaceholder}</span>}
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
                                        date < new Date("2020-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    {error && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="w-full h-11"
                        disabled={!email || !ruptureDate || isSubmitting}
                    >
                        {isSubmitting
                            ? (
                                <span className="animate-pulse">
                                    Submitting...
                                </span>
                            )
                            : (
                                <>
                                    <Mail className="mr-2 w-4 h-4" />
                                    {submitText}
                                </>
                            )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

EmailSignupDialog.displayName = "EmailSignupDialog";

export { EmailSignupDialog };
