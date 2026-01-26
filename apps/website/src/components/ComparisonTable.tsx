"use client";

import React from "react";
import { Check, Droplets, Moon, Shield, Weight, Wind, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/config/languages";

interface ComparisonTableProps {
  lang?: Lang;
  className?: string;
}

const content = {
  en: {
    title: "Night Splint vs. Sleeping in Your Boot",
    subtitle:
      "80% of patients struggle to sleep when wearing their boot at night",
    splint: "Thetis Night Splint",
    boot: "Medical Boot",
    features: [
      {
        name: "Comfortable sleep",
        splint: true,
        boot: false,
        icon: Moon,
      },
      {
        name: "Lightweight",
        splint: true,
        splintNote: "< 200g",
        boot: false,
        bootNote: "1.5kg+",
        icon: Weight,
      },
      {
        name: "Breathable",
        splint: true,
        boot: false,
        icon: Wind,
      },
      {
        name: "Washable liner",
        splint: true,
        boot: false,
        icon: Droplets,
      },
      {
        name: "Maintains healing position",
        splint: true,
        boot: true,
        icon: Shield,
      },
      {
        name: "Easy to put on/remove",
        splint: true,
        boot: false,
      },
      {
        name: "Partner-friendly",
        splint: true,
        splintNote: "No bulk in bed",
        boot: false,
      },
      {
        name: "Can be used for showering",
        splint: true,
        boot: false,
      },
    ],
    conclusion: "Join 5,000+ patients who sleep better with the Night Splint",
  },
  de: {
    title: "Nachtschiene vs. Schlafen im Stiefel",
    subtitle:
      "80% der Patienten berichten von schlechtem Schlaf, wenn sie nachts ihren Stiefel tragen",
    splint: "Thetis Nachtschiene",
    boot: "Medizinischer Stiefel",
    features: [
      {
        name: "Bequemer Schlaf",
        splint: true,
        boot: false,
        icon: Moon,
      },
      {
        name: "Leichtgewicht",
        splint: true,
        splintNote: "< 200g",
        boot: false,
        bootNote: "1,5kg+",
        icon: Weight,
      },
      {
        name: "Atmungsaktiv",
        splint: true,
        boot: false,
        icon: Wind,
      },
      {
        name: "Waschbares Futter",
        splint: true,
        boot: false,
        icon: Droplets,
      },
      {
        name: "Erhält Heilungsposition",
        splint: true,
        boot: true,
        icon: Shield,
      },
      {
        name: "Einfach an-/auszuziehen",
        splint: true,
        boot: false,
      },
      {
        name: "Partnerfreundlich",
        splint: true,
        splintNote: "Kein Volumen im Bett",
        boot: false,
      },
      {
        name: "Kann zum Duschen verwendet werden",
        splint: true,
        boot: false,
      },
    ],
    conclusion:
      "Schließen Sie sich 5.000+ Patienten an, die mit der Nachtschiene besser schlafen",
  },
  fr: {
    title: "Attelle de Nuit vs. Dormir avec la Botte",
    subtitle:
      "80% des patients signalent un mauvais sommeil lorsqu'ils portent leur botte la nuit",
    splint: "Attelle de Nuit Thetis",
    boot: "Botte Médicale",
    features: [
      {
        name: "Sommeil confortable",
        splint: true,
        boot: false,
        icon: Moon,
      },
      {
        name: "Léger",
        splint: true,
        splintNote: "< 200g",
        boot: false,
        bootNote: "1,5kg+",
        icon: Weight,
      },
      {
        name: "Respirant",
        splint: true,
        boot: false,
        icon: Wind,
      },
      {
        name: "Doublure lavable",
        splint: true,
        boot: false,
        icon: Droplets,
      },
      {
        name: "Maintient la position de guérison",
        splint: true,
        boot: true,
        icon: Shield,
      },
      {
        name: "Facile à mettre/enlever",
        splint: true,
        boot: false,
      },
      {
        name: "Adapté au partenaire",
        splint: true,
        splintNote: "Pas de volume au lit",
        boot: false,
      },
      {
        name: "Utilisable pour la douche",
        splint: true,
        boot: false,
      },
    ],
    conclusion:
      "Rejoignez 5 000+ patients qui dorment mieux avec l'Attelle de Nuit",
  },
  es: {
    title: "Férula Nocturna vs. Dormir con la Bota",
    subtitle:
      "El 80% de los pacientes reportan mal sueño cuando usan su bota por la noche",
    splint: "Férula Nocturna Thetis",
    boot: "Bota Médica",
    features: [
      {
        name: "Sueño cómodo",
        splint: true,
        boot: false,
        icon: Moon,
      },
      {
        name: "Ligera",
        splint: true,
        splintNote: "< 200g",
        boot: false,
        bootNote: "1,5kg+",
        icon: Weight,
      },
      {
        name: "Transpirable",
        splint: true,
        boot: false,
        icon: Wind,
      },
      {
        name: "Forro lavable",
        splint: true,
        boot: false,
        icon: Droplets,
      },
      {
        name: "Mantiene posición de curación",
        splint: true,
        boot: true,
        icon: Shield,
      },
      {
        name: "Fácil de poner/quitar",
        splint: true,
        boot: false,
      },
      {
        name: "Amigable con la pareja",
        splint: true,
        splintNote: "Sin volumen en la cama",
        boot: false,
      },
      {
        name: "Se puede usar para ducharse",
        splint: true,
        boot: false,
      },
    ],
    conclusion:
      "Únete a 5.000+ pacientes que duermen mejor con la Férula Nocturna",
  },
  it: {
    title: "Férula Notturna vs. Dormire con lo Stivale",
    subtitle:
      "L'80% dei pazienti segnala un sonno scarso quando indossa lo stivale di notte",
    splint: "Férula Notturna Thetis",
    boot: "Stivale Medico",
    features: [
      {
        name: "Sonno confortevole",
        splint: true,
        boot: false,
        icon: Moon,
      },
      {
        name: "Leggera",
        splint: true,
        splintNote: "< 200g",
        boot: false,
        bootNote: "1,5kg+",
        icon: Weight,
      },
      {
        name: "Traspirante",
        splint: true,
        boot: false,
        icon: Wind,
      },
      {
        name: "Fodera lavabile",
        splint: true,
        boot: false,
        icon: Droplets,
      },
      {
        name: "Mantiene posizione di guarigione",
        splint: true,
        boot: true,
        icon: Shield,
      },
      {
        name: "Facile da mettere/togliere",
        splint: true,
        boot: false,
      },
      {
        name: "Amico del partner",
        splint: true,
        splintNote: "Nessun ingombro a letto",
        boot: false,
      },
      {
        name: "Può essere usata per la doccia",
        splint: true,
        boot: false,
      },
    ],
    conclusion:
      "Unisciti a 5.000+ pazienti che dormono meglio con la Férula Notturna",
  },
};

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  lang = "en",
  className,
}) => {
  const t = content[lang];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-bold text-neutral-900 dark:text-neutral-100 text-2xl md:text-3xl">
          {t.title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          {t.subtitle}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-neutral-50 dark:bg-neutral-800 p-4 border-neutral-200 dark:border-neutral-700 border-b text-left">
                Feature
              </th>
              <th className="bg-primary/10 p-4 border-primary/20 border-b text-center">
                <div className="font-semibold text-primary">{t.splint}</div>
              </th>
              <th className="bg-neutral-100 dark:bg-neutral-800 p-4 border-neutral-200 dark:border-neutral-700 border-b text-center">
                <div className="font-semibold text-neutral-600 dark:text-neutral-400">
                  {t.boot}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {t.features.map((feature, index) => (
              <tr
                key={index}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border-neutral-100 dark:border-neutral-800 border-b transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {feature.icon && (
                      <feature.icon className="w-4 h-4 text-neutral-400" />
                    )}
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {feature.name}
                    </span>
                  </div>
                </td>
                <td className="bg-primary/5 p-4 text-center">
                  <div className="flex flex-col items-center">
                    {feature.splint
                      ? <Check className="w-5 h-5 text-primary" />
                      : <X className="w-5 h-5 text-neutral-300" />}
                    {feature.splintNote && (
                      <span className="mt-1 text-neutral-500 text-xs">
                        {feature.splintNote}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    {feature.boot
                      ? <Check className="w-5 h-5 text-primary" />
                      : <X className="w-5 h-5 text-red-400" />}
                    {feature.bootNote && (
                      <span className="mt-1 text-neutral-500 text-xs">
                        {feature.bootNote}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 font-medium text-primary text-center">
        {t.conclusion}
      </p>
    </div>
  );
};

export default ComparisonTable;
