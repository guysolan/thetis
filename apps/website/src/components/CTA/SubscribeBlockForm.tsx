"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
    hasAnySubscription,
    markEmailAsSubscribed,
} from "@/lib/subscription-storage";

type Lang = "en" | "de" | "fr" | "es" | "it";

const translations = {
    en: {
        subscribed: "You're subscribed! Check your inbox.",
        title: "Get recovery tips by email & SMS",
        subtitle: "Free guidance. Unsubscribe anytime.",
        emailPlaceholder: "Email",
        phonePlaceholder: "Phone (optional)",
        subscribe: "Subscribe",
        errorRequired: "Please enter your email address",
        errorGeneric: "Something went wrong. Please try again.",
    },
    de: {
        subscribed: "Sie sind angemeldet! Überprüfen Sie Ihren Posteingang.",
        title: "Erhalten Sie Genesungstipps per E-Mail & SMS",
        subtitle: "Kostenlose Anleitung. Jederzeit abmelden.",
        emailPlaceholder: "E-Mail",
        phonePlaceholder: "Telefon (optional)",
        subscribe: "Anmelden",
        errorRequired: "Bitte geben Sie Ihre E-Mail-Adresse ein",
        errorGeneric: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
    },
    fr: {
        subscribed: "Vous êtes inscrit ! Vérifiez votre boîte de réception.",
        title: "Recevez des conseils de récupération par email & SMS",
        subtitle: "Conseils gratuits. Désabonnez-vous à tout moment.",
        emailPlaceholder: "Email",
        phonePlaceholder: "Téléphone (optionnel)",
        subscribe: "S'inscrire",
        errorRequired: "Veuillez entrer votre adresse email",
        errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
    },
    es: {
        subscribed: "¡Estás suscrito! Revisa tu bandeja de entrada.",
        title: "Recibe consejos de recuperación por email y SMS",
        subtitle: "Orientación gratuita. Cancela cuando quieras.",
        emailPlaceholder: "Email",
        phonePlaceholder: "Teléfono (opcional)",
        subscribe: "Suscribirse",
        errorRequired: "Por favor ingresa tu dirección de email",
        errorGeneric: "Algo salió mal. Por favor intenta de nuevo.",
    },
    it: {
        subscribed: "Sei iscritto! Controlla la tua casella di posta.",
        title: "Ricevi consigli di recupero via email e SMS",
        subtitle: "Guida gratuita. Annulla l'iscrizione in qualsiasi momento.",
        emailPlaceholder: "Email",
        phonePlaceholder: "Telefono (opzionale)",
        subscribe: "Iscriviti",
        errorRequired: "Per favore inserisci il tuo indirizzo email",
        errorGeneric: "Qualcosa è andato storto. Per favore riprova.",
    },
};

interface SubscribeBlockFormProps {
    variant?: "section" | "compact";
    source?: string;
    lang?: Lang;
}

export function SubscribeBlockForm({
    variant = "section",
    source = "subscribe_block",
    lang = "en",
}: SubscribeBlockFormProps) {
    const t = translations[lang] || translations.en;
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

    useEffect(() => {
        // Check if user has already subscribed
        setIsAlreadySubscribed(hasAnySubscription());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError(t.errorRequired);
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
                        ignoreDuplicates: false, // Update if exists
                    },
                )
                .select();

            if (supabaseError) {
                console.error("Supabase error:", supabaseError);
                throw new Error(
                    supabaseError.message || "Failed to save your information",
                );
            }

            if (!data) {
                throw new Error("No data returned from Supabase");
            }

            // Mark email as subscribed in localStorage
            markEmailAsSubscribed(normalizedEmail);
            setIsAlreadySubscribed(true);

            setIsSubmitted(true);
            // Reset form after success
            setTimeout(() => {
                setEmail("");
                setPhone("");
                setIsSubmitted(false);
            }, 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t.errorGeneric,
            );
            console.error("Error subscribing:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show subscribed message if user has already subscribed
    if (isAlreadySubscribed || isSubmitted) {
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
                        {t.subscribed}
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
                            {t.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {t.subtitle}
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
                        placeholder={t.emailPlaceholder}
                        autoComplete="email"
                        disabled={isSubmitting}
                        className="flex-1 bg-white dark:bg-neutral-800 disabled:opacity-50 px-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-0 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm"
                    />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        autoComplete="tel"
                        disabled={isSubmitting}
                        className="flex-1 bg-white dark:bg-neutral-800 disabled:opacity-50 px-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-0 max-w-[140px] sm:max-w-[200px] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm"
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
                                t.subscribe
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

// Default export for Astro compatibility
export default SubscribeBlockForm;
