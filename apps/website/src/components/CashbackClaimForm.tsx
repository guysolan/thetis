"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Banknote, Check, Loader2 } from "lucide-react";

type PaymentMethod = "paypal" | "bank";
type Currency = "GBP" | "USD";

export function CashbackClaimForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
    const [currency, setCurrency] = useState<Currency>("GBP");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [bankDetails, setBankDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (paymentMethod === "paypal" && !paypalEmail) {
            setError("Please enter your PayPal email address");
            return;
        }

        if (paymentMethod === "bank" && !bankDetails) {
            setError("Please enter your bank details");
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit to Formspree contact form
            const formData = new FormData();
            formData.append("_subject", `Cashback Claim Request - ${name}`);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("type", "cashback_claim");
            formData.append("currency", currency);
            formData.append("amount", currency === "GBP" ? "£10" : "$15");
            formData.append("payment_method", paymentMethod);

            if (paymentMethod === "paypal") {
                formData.append("paypal_email", paypalEmail);
            } else {
                formData.append("bank_details", bankDetails);
            }

            const response = await fetch("https://formspree.io/f/xrgwkooy", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to submit claim");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
            console.error("Error submitting claim:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-primary/10 dark:bg-primary/20 p-8 border border-primary/20 dark:border-primary/30 rounded-lg text-center">
                <Check className="mx-auto mb-4 w-12 h-12 text-primary" />
                <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                    Claim Submitted!
                </p>
                <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                    Your cashback claim has been received. We'll process your
                    payment within 7-10 business days.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    You'll receive a confirmation email at{" "}
                    <strong>{email}</strong> once payment is sent.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder="Your full name"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Email (from your review submission){" "}
                    <span className="text-red-500">*</span>
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
                <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
                    Use the same email you submitted your review with
                </p>
            </div>

            <div>
                <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
                    Preferred Currency <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="currency"
                            value="GBP"
                            checked={currency === "GBP"}
                            onChange={() => setCurrency("GBP")}
                            className="focus:ring-primary w-4 h-4 text-primary"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            £10 GBP
                        </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="currency"
                            value="USD"
                            checked={currency === "USD"}
                            onChange={() => setCurrency("USD")}
                            className="focus:ring-primary w-4 h-4 text-primary"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            $15 USD
                        </span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
                    Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                            className="focus:ring-primary w-4 h-4 text-primary"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            PayPal
                        </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === "bank"}
                            onChange={() => setPaymentMethod("bank")}
                            className="focus:ring-primary w-4 h-4 text-primary"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            Bank Transfer
                        </span>
                    </label>
                </div>
            </div>

            {paymentMethod === "paypal" && (
                <div>
                    <label
                        htmlFor="paypalEmail"
                        className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                    >
                        PayPal Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="paypalEmail"
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        required={paymentMethod === "paypal"}
                        className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                        placeholder="paypal@email.com"
                    />
                </div>
            )}

            {paymentMethod === "bank" && (
                <div>
                    <label
                        htmlFor="bankDetails"
                        className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                    >
                        Bank Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="bankDetails"
                        value={bankDetails}
                        onChange={(e) => setBankDetails(e.target.value)}
                        required={paymentMethod === "bank"}
                        rows={4}
                        className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                        placeholder="Account name:&#10;Sort code:&#10;Account number:&#10;(or IBAN for international transfers)"
                    />
                    <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
                        Your bank details are securely transmitted and only used
                        for this payment
                    </p>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
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
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    )
                    : (
                        <>
                            <Banknote className="w-4 h-4" />
                            Claim {currency === "GBP" ? "£10" : "$15"} Cashback
                        </>
                    )}
            </Button>

            <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
                Cashback is only available for approved video reviews. If your
                review hasn't been approved yet, please wait for our
                confirmation email.
            </p>
        </form>
    );
}
