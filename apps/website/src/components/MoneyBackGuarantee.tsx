"use client";

import React from "react";
import { RotateCcw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/config/languages";

interface MoneyBackGuaranteeProps {
  lang?: Lang;
  className?: string;
  variant?: "badge" | "full" | "inline";
}

const content = {
  en: {
    badge: "30-Day Money-Back Guarantee",
    title: "Risk-Free Purchase",
    description:
      "Not right for you? Return it within 30 days for a full refund. Just keep it in resellable condition.",
    conditions:
      "Product must be in original, unopened packaging or lightly used in resellable condition.",
    cta: "Shop with confidence",
  },
  de: {
    badge: "30-Tage-Geld-zurück-Garantie",
    title: "Risikofreier Kauf",
    description:
      "Nicht das Richtige für Sie? Senden Sie es innerhalb von 30 Tagen für eine volle Rückerstattung zurück. Halten Sie es einfach in verkaufsfähigem Zustand.",
    conditions:
      "Produkt muss in der Originalverpackung oder leicht gebraucht in verkaufsfähigem Zustand sein.",
    cta: "Kaufen Sie mit Vertrauen",
  },
  fr: {
    badge: "Garantie de remboursement de 30 jours",
    title: "Achat sans risque",
    description:
      "Pas fait pour vous ? Retournez-le dans les 30 jours pour un remboursement complet. Gardez-le simplement en état de revente.",
    conditions:
      "Le produit doit être dans son emballage d'origine ou légèrement utilisé en état de revente.",
    cta: "Achetez en toute confiance",
  },
  es: {
    badge: "Garantía de devolución de 30 días",
    title: "Compra sin riesgo",
    description:
      "¿No es para ti? Devuélvelo en 30 días para un reembolso completo. Solo mantenlo en condición de reventa.",
    conditions:
      "El producto debe estar en su empaque original o ligeramente usado en condición de reventa.",
    cta: "Compra con confianza",
  },
  it: {
    badge: "Garanzia di rimborso di 30 giorni",
    title: "Acquisto senza rischi",
    description:
      "Non fa per te? Restituiscilo entro 30 giorni per un rimborso completo. Basta tenerlo in condizioni di rivendita.",
    conditions:
      "Il prodotto deve essere nella confezione originale o leggermente usato in condizioni di rivendita.",
    cta: "Acquista con fiducia",
  },
};

const MoneyBackGuarantee: React.FC<MoneyBackGuaranteeProps> = ({
  lang = "en",
  className,
  variant = "badge",
}) => {
  const t = content[lang];

  if (variant === "badge") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-primary dark:text-primary/80",
          className,
        )}
      >
        <Shield className="flex-shrink-0 w-4 h-4" />
        <span className="font-medium text-sm">{t.badge}</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-3 py-1.5 border border-primary/30 dark:border-primary/40 rounded-full",
          className,
        )}
      >
        <Shield className="w-4 h-4 text-primary dark:text-primary/80" />
        <span className="font-medium text-primary dark:text-primary/80 text-sm">
          {t.badge}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary/10 dark:from-primary/20 to-primary/5 dark:to-primary/10 p-4 border border-primary/30 dark:border-primary/40 rounded-xl",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-shrink-0 justify-center items-center bg-primary/20 dark:bg-primary/30 rounded-full w-10 h-10">
          <RotateCcw className="w-5 h-5 text-primary dark:text-primary/80" />
        </div>
        <div>
          <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-base">
            {t.title}
          </h4>
          <p className="mb-2 text-neutral-700 dark:text-neutral-300 text-sm">
            {t.description}
          </p>
          <p className="text-primary/70 dark:text-primary/60 text-xs">
            {t.conditions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyBackGuarantee;
