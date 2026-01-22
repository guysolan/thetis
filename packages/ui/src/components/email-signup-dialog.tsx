"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
        data: { email: string; ruptureDate: Date },
    ) => void | Promise<void>;
    /** Callback when dialog open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Controlled open state */
    open?: boolean;
    /** Default trigger button text */
    triggerText?: string;
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
}: EmailSignupDialogProps) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [ruptureDate, setRuptureDate] = React.useState<Date | undefined>(
        undefined,
    );
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled
        ? (newOpen: boolean) => onOpenChange?.(newOpen)
        : setInternalOpen;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !ruptureDate) return;

        setIsSubmitting(true);
        try {
            await onSubmit?.({ email, ruptureDate });
            setOpen(false);
            // Reset form
            setEmail("");
            setRuptureDate(undefined);
        } catch (error) {
            console.error("Error submitting email signup:", error);
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
