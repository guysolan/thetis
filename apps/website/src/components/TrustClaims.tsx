import React from "react";
import type { Lang } from "@/config/languages";
import { cn } from "@/lib/utils";

interface TrustClaimsProps {
    lang?: Lang;
    align?: "left" | "center";
    variant?: "compact" | "expanded";
}

const content = {
    en: {
        guarantee: "100% Satisfaction Guarantee Or Your Money Back!",
        freeShipping: "Free shipping included",
        shipsIn24Hours: "Ships in 24 hours",
        patientsTrust: "5,000+ Patients Trust Thetis",
    },
    de: {
        guarantee: "100% Zufriedenheitsgarantie oder Geld zurück!",
        freeShipping: "Kostenloser Versand inklusive",
        shipsIn24Hours: "Versand innerhalb von 24 Stunden",
        patientsTrust: "5.000+ Patienten vertrauen Thetis",
    },
    fr: {
        guarantee: "Garantie de satisfaction à 100% ou remboursement!",
        freeShipping: "Livraison gratuite incluse",
        shipsIn24Hours: "Expédition sous 24 heures",
        patientsTrust: "5 000+ patients font confiance à Thetis",
    },
    es: {
        guarantee: "¡Garantía de satisfacción del 100% o su dinero de vuelta!",
        freeShipping: "Envío gratis incluido",
        shipsIn24Hours: "Envío en 24 horas",
        patientsTrust: "5.000+ pacientes confían en Thetis",
    },
    it: {
        guarantee: "Garanzia di soddisfazione al 100% o rimborso!",
        freeShipping: "Spedizione gratuita inclusa",
        shipsIn24Hours: "Spedizione entro 24 ore",
        patientsTrust: "5.000+ pazienti si fidano di Thetis",
    },
};

export function TrustClaims({
    lang = "en",
    variant = "compact",
    align = "center",
}: TrustClaimsProps) {
    const t = content[lang];

    return variant === "compact"
        ? (
            <div
                className={cn(
                    "bg-neutral-50 dark:bg-neutral-800 px-3 py-2 rounded-lg",
                    align === "left" ? "text-left" : "text-center",
                )}
            >
                <p
                    className={cn(
                        "font-semibold text-neutral-900 dark:text-neutral-100 text-xs leading-tight",
                        align === "left" ? "text-left" : "text-center",
                    )}
                >
                    {t.guarantee}
                </p>
                <div
                    className={cn(
                        "flex flex-wrap gap-3 mt-1.5 text-xs",
                        align === "left"
                            ? "justify-start items-start"
                            : "justify-center items-center",
                    )}
                >
                    <span className="font-medium text-primary">
                        ✓ {t.freeShipping}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="font-medium text-primary">
                        ✓ {t.shipsIn24Hours}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="font-semibold text-primary">
                        {t.patientsTrust}
                    </span>
                </div>
            </div>
        )
        : (
            <div
                className={cn(
                    "space-y-2 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 rounded-lg",
                    align === "left" ? "text-left" : "text-center",
                )}
            >
                <p
                    className={cn(
                        "font-semibold text-neutral-900 dark:text-neutral-100 text-sm",
                        align === "left" ? "text-left" : "text-center",
                    )}
                >
                    {t.guarantee}
                </p>
                <div
                    className={cn(
                        "flex flex-wrap gap-x-4 gap-y-2 text-xs",
                        align === "left"
                            ? "justify-start items-start"
                            : "justify-center items-center",
                    )}
                >
                    <span className="font-medium text-primary">
                        ✓ {t.freeShipping}
                    </span>
                    <span className="font-medium text-primary">
                        ✓ {t.shipsIn24Hours}
                    </span>
                    <span className="font-semibold text-primary">
                        {t.patientsTrust}
                    </span>
                </div>
            </div>
        );
}

export default TrustClaims;
