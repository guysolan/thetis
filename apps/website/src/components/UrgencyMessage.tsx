"use client";

import React, { useState, useEffect } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/config/languages";

interface UrgencyMessageProps {
  lang?: Lang;
  className?: string;
  variant?: "default" | "compact" | "banner";
}

const content = {
  en: {
    title: "Every night matters",
    message: "The sooner you order, the more comfortable nights you'll have during recovery",
    nights: "nights of better sleep",
    action: "Order today for",
    suffix: "more restful nights",
    shipsWithin: "Ships within 24 hours",
  },
  de: {
    title: "Jede Nacht zählt",
    message: "Je früher Sie bestellen, desto mehr komfortable Nächte haben Sie während der Genesung",
    nights: "Nächte besseren Schlafs",
    action: "Bestellen Sie heute für",
    suffix: "mehr erholsame Nächte",
    shipsWithin: "Versand innerhalb von 24 Stunden",
  },
  fr: {
    title: "Chaque nuit compte",
    message: "Plus vous commandez tôt, plus vous aurez de nuits confortables pendant la récupération",
    nights: "nuits de meilleur sommeil",
    action: "Commandez aujourd'hui pour",
    suffix: "plus de nuits reposantes",
    shipsWithin: "Expédié sous 24 heures",
  },
  es: {
    title: "Cada noche cuenta",
    message: "Cuanto antes ordenes, más noches cómodas tendrás durante la recuperación",
    nights: "noches de mejor sueño",
    action: "Ordena hoy para",
    suffix: "más noches de descanso",
    shipsWithin: "Envío en 24 horas",
  },
  it: {
    title: "Ogni notte conta",
    message: "Prima ordini, più notti comode avrai durante il recupero",
    nights: "notti di sonno migliore",
    action: "Ordina oggi per",
    suffix: "più notti di riposo",
    shipsWithin: "Spedizione entro 24 ore",
  },
};

const UrgencyMessage: React.FC<UrgencyMessageProps> = ({
  lang = "en",
  className,
  variant = "default",
}) => {
  const t = content[lang];
  
  // Calculate approximate recovery nights remaining (typical recovery is 12-16 weeks)
  // This creates a sense of urgency without being manipulative
  const recoveryWeeks = 12;
  const nightsOfRecovery = recoveryWeeks * 7;

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-center gap-3",
          className
        )}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex-shrink-0">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            {t.title}: {t.message}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-amber-700 dark:text-amber-400",
          className
        )}
      >
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">{t.shipsWithin}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 text-base mb-1">
            {t.title}
          </h4>
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            {t.message}
          </p>
          <div className="flex items-center gap-2 mt-2 text-amber-700 dark:text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{t.shipsWithin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyMessage;

