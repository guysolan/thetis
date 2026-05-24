import type { Lang } from "@/config/languages.ts";
import {
  sleepSurveyHeadlineStats,
  sleepSurveyTotal,
} from "@/content/trade/sleepSurveyData";

export type TradePageContent = {
  meta: { title: string; description: string };
  landing: {
    title: string;
    tagline: string;
    treatmentNote: string;
    badges: [string, string, string];
    productImageAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
  };
  stats: { value: string; label: string }[];
  regulatory: {
    title: string;
    intro: string;
    items: string[];
    footnote: string;
  };
  pathway: {
    title: string;
    intro: string;
    dayLabel: string;
    dayText: string;
    nightLabel: string;
    nightText: string;
    note: string;
  };
  product: {
    title: string;
    intro: string;
    features: string[];
  };
  indications: {
    title: string;
    forTitle: string;
    forItems: string[];
    notForTitle: string;
    notForItems: string[];
  };
  specs: {
    title: string;
    rows: { label: string; value: string }[];
  };
  skus: {
    title: string;
    intro: string;
    catalogHeaders: [string, string, string];
    mixRecommendation: string;
  };
  partnership: {
    title: string;
    models: { title: string; description: string }[];
  };
  ip: {
    title: string;
    intro: string;
    portfolioTitle: string;
  };
  territories: {
    title: string;
    openTitle: string;
    openItems: string[];
    existingTitle: string;
    existingNote: string;
  };
  support: {
    title: string;
    items: string[];
    reimbursementTitle: string;
    reimbursementBody: string;
    pricingNote: string;
  };
  downloads: {
    title: string;
    productTitle: string;
    clinicalTitle: string;
    regulatoryNote: string;
  };
  cta: {
    title: string;
    description: string;
    partner: string;
    splint: string;
  };
  sleepSurvey: {
    title: string;
    intro: string;
    stats: { value: string; label: string; variant?: "default" | "warn" }[];
    source: string;
  };
  evidence: {
    title: string;
    intro: string;
    aeTitle: string;
    aeBody: string;
    safetyTitle: string;
    sourcesTitle: string;
    safetyBody: string;
    evidenceLink: string;
    evidenceLinkLabel: string;
  };
  market: {
    title: string;
    intro: string;
    bullets: string[];
    incidenceLink: string;
    incidenceLinkLabel: string;
  };
  commercial: {
    title: string;
    intro: string;
    tableHeaders: [string, string, string];
    marketsFootnote: string;
  };
  pricing: {
    title: string;
    intro: string;
    patientRrpTitle: string;
    patientRrpBody: string;
    hospitalRrpTitle: string;
    hospitalRrpBody: string;
    marginTitle: string;
    marginBody: string;
    manufacturingTitle: string;
    manufacturingBody: string;
  };
  channels: {
    title: string;
    intro: string;
    partners: { name: string; country: string }[];
    directNote: string;
  };
  testimonials: {
    athletesTitle: string;
    patientsTitle: string;
    cliniciansTitle: string;
  };
};

const en: TradePageContent = {
  meta: {
    title: "Achilles Night Splint — Trade & Distribution",
    description:
      "Partner with Thetis Medical to distribute the Achilles rupture night splint. Product overview, SKUs, clinical pathway, and downloads for manufacturers and distributors.",
  },
  landing: {
    title: "Achilles Tendon Rupture Splint",
    tagline: "Would you sleep in rain boots?",
    treatmentNote: "Applicable to both conservative and surgical treatment",
    badges: [
      "The world's only plantarflexion splint",
      "Patented design",
      "Designed with and loved by foot & ankle surgeons",
    ],
    productImageAlt:
      "Thetis Achilles rupture night splint — plantarflexion for sleep",
  },
  hero: {
    eyebrow: "B2B · Manufacturers & distributors",
    title: "Achilles rupture night splint",
    subtitle:
      "A CE-marked medical device for overseas distribution and licensing. Complements walking boots — same 30° healing angle, ~90% lighter for sleep and hygiene.",
    primaryCta: "Partnership enquiry",
  },
  stats: [
    { value: "2,000+", label: "Splints sold per year" },
    { value: "30°", label: "Plantarflexion" },
    { value: "~200g", label: "Device weight" },
    { value: "4", label: "SKU variants" },
  ],
  regulatory: {
    title: "Regulatory & quality",
    intro:
      "Key registration and documentation points for distributor due diligence. Full technical file available to qualified partners on request.",
    items: [
      "Class I medical device · CE / UKCA marked under EU MDR",
      "EUDAMED registered",
      "EU Authorised Representative (EC-REP) appointed",
      "UDI assigned (GS1) — traceable per unit",
      "Declaration of Conformity, IFU, and labelling artwork on request",
      "Medical-grade materials; biocompatible patient-contact components",
      "Designed and manufactured in the United Kingdom",
      "MHRA-registered manufacturer (UK responsible person)",
      "Post-market surveillance and vigilance processes in place",
    ],
    footnote:
      "Declaration of Conformity, technical documentation, risk management summary, and quality agreements are shared with qualified distribution partners on request (NDA if required).",
  },
  sleepSurvey: {
    title: "Patient need — sleep in the boot",
    intro:
      `In a survey of ${sleepSurveyTotal} patients with Achilles tendon rupture, sleep quality was a major unmet need during boot immobilisation.`,
    stats: [
      {
        value: `${sleepSurveyHeadlineStats.struggledPct}%`,
        label: "Reported sleep difficulty in the boot",
      },
      {
        value: `${sleepSurveyHeadlineStats.adjustedOrRemovedPct}%`,
        label: "Took off or adjusted the boot at night",
        variant: "warn",
      },
    ],
    source:
      `Thetis Medical patient survey (n=${sleepSurveyTotal}, Achilles tendon rupture).`,
  },
  pathway: {
    title: "Clinical pathway — complements your boot line",
    intro:
      "Patients are typically immobilised in a walking boot (e.g. VACOped, Aircast) during the day. The Thetis splint is prescribed for night-time and rest — not a replacement for the boot.",
    dayLabel: "Day",
    dayText: "Walking boot — mobilisation & protection",
    nightLabel: "Night / rest",
    nightText: "Thetis splint — sleep, hygiene, boot compliance",
    note:
      "Aligns with early protected weight-bearing and night-time immobilisation protocols used in modern Achilles rupture care.",
  },
  product: {
    title: "Product summary",
    intro:
      "Thetis Medical Achilles Rupture Splint (night splint). Designed specifically for complete Achilles tendon rupture — not general ankle instability or tendinopathy.",
    features: [
      "Maintains ~30° plantarflexion for tendon protection",
      "~200g — approximately 90% lighter than a walking boot",
      "Open design — breathability and hygiene vs sleeping in a boot",
      "Quick application — adjustable straps, left/right and two sizes",
      "Used by hospitals, foot & ankle centres, and distributors internationally",
    ],
  },
  indications: {
    title: "Indications & contraindications",
    forTitle: "Intended use",
    forItems: [
      "Achilles tendon rupture (complete tear)",
      "Surgical or conservative (non-operative) treatment pathways",
      "Within 12 weeks of injury or surgery",
      "Night-time and rest immobilisation alongside walking boot care",
    ],
    notForTitle: "Not intended for",
    notForItems: ["Achilles tendinitis or tendinopathy alone"],
  },
  evidence: {
    title: "Clinical evidence & NHS pathways",
    intro:
      "Our products are supported by clinical quality improvement work and real-world safety data — summarised on our public evidence page.",
    aeTitle: "UK public healthcare — A&E and acute pathways",
    aeBody:
      "In UK NHS settings, the Achilles rupture splint is used in emergency and acute pathways to maintain plantarflexion while patients move from A&E to specialist review — reducing reliance on plaster rooms and speeding the pathway to a definitive boot and treatment plan. In other deployments it is supplied alongside our patient recovery course and educational materials (companion to the printed recovery guide where hospitals use it).",
    sourcesTitle: "Published sources",
    safetyTitle: "Night-time safety vs walking boot",
    safetyBody:
      "Recovery-period safety assessment across 5,000+ patients recorded: with 95% confidence, risk of injury while using the Thetis splint at night is less than 0.1% — comparable protection to a walking boot with substantially better comfort for sleep (see Sleeping safe and sound, BOFAS 2024). Patient experience and satisfaction in recovery is reported separately in Mother Knows Best (BOFAS 2023).",
    evidenceLink: "/evidence",
    evidenceLinkLabel: "Full evidence & studies",
  },
  market: {
    title: "Growing market",
    intro:
      "National registries report rising incidence (about 8 → 42 per 100,000, 1994–2021), linked to active ageing and sport.",
    bullets: [
      "Large boot cohort in the first 12 weeks post-injury",
      "Strong night-splint attach — boot sleep is a common pain point",
      "Highest rates in Scandinavian and Western European data",
    ],
    incidenceLink: "/research/incidence",
    incidenceLinkLabel: "Global incidence trends (interactive report)",
  },
  commercial: {
    title: "Priority markets — incidence",
    intro:
      "Germany, France, Spain, Italy, Poland, and the Nordics are primary targets for national distribution. Incidence figures are from published registries and research in our global incidence report; where no national registry exists we show a conservative estimate.",
    tableHeaders: ["Market", "Incidence", "Est. annual ruptures"],
    marketsFootnote:
      "Annual ruptures ≈ population × incidence per 100,000 (midpoint where a range is shown). Incidence from published registries; Spain, Italy, and Poland estimated where no national rupture registry is in our dataset.",
  },
  pricing: {
    title: "Pricing & commercial terms",
    intro:
      "Reference price points from our current channels. Full wholesale price lists are shared after partner qualification.",
    patientRrpTitle: "Patient retail (RRP)",
    patientRrpBody:
      "Typical consumer list price in target EU markets (Amazon / clinic): €79.99 in Germany, France, Spain, Italy, and the Nordics; 349 zł in Poland (~€80 equivalent).",
    hospitalRrpTitle: "Hospital / NHS supply",
    hospitalRrpBody:
      "£28–£60 per unit — historic range we have sold to NHS hospitals and trusts, depending on volume and contract terms.",
    marginTitle: "Distributor margin",
    marginBody:
      "Gross margin vs local patient RRP on standard wholesale for qualified partners. Volume and exclusivity affect buy price; price lists after qualification.",
    manufacturingTitle: "Manufacture under licence",
    manufacturingBody:
      "License Thetis IP for in-region production (see intellectual property) — lower landed cost, stronger margins, and shorter lead times than import-only. Regulatory, quality, and brand support included.",
  },
  channels: {
    title: "Current sales channels",
    intro:
      "We sell direct-to-consumer online (UK, US, and other regions) and through named distribution partners. National distribution is open for Germany, France, Spain, Poland, the Nordics, and Italy.",
    partners: [
      { name: "SwiftBrace / Ortho Active", country: "Canada" },
      { name: "Ortho Direct", country: "Portugal" },
      { name: "Club Warehouse", country: "Australia" },
    ],
    directNote:
      "UK and Ireland: mix of NHS hospital supply, clinician wholesale, and direct patient orders. We also work with hospital trusts and foot & ankle centres.",
  },
  testimonials: {
    athletesTitle: "Athletes",
    patientsTitle: "Patients",
    cliniciansTitle: "Clinicians",
  },
  specs: {
    title: "Technical overview",
    rows: [
      {
        label: "Device type",
        value: "Night splint / orthosis (Achilles rupture)",
      },
      {
        label: "Regulatory",
        value:
          "Class I · CE / UKCA · EUDAMED · EC-REP · UDI — see Regulatory & quality above",
      },
      {
        label: "Manufacture",
        value: "Designed and manufactured in the United Kingdom",
      },
      { label: "Manufacturer", value: "Thetis Medical Ltd (UK)" },
    ],
  },
  skus: {
    title: "Ordering & SKUs",
    intro:
      "Four sellable variants (Small / Large × Left / Right). Contact us for territorial pricing, MOQ, and pack sizes.",
    catalogHeaders: ["Product", "SKU", "GTIN / EAN"],
    mixRecommendation:
      "For initial stock, we suggest ordering roughly 2 large splints for every 1 small — Achilles rupture is more common in men, who typically need the large size. Adjust for your customer mix and left/right balance.",
  },
  ip: {
    title: "Intellectual property",
    intro:
      "Thetis Medical owns a growing patent and design portfolio covering the Achilles rupture night splint - relevant for distribution, white-label, and in-region manufacturing under licence. UK and US design protection is in place; US and European utility patents are in late-stage examination.",
    portfolioTitle: "Portfolio at a glance",
  },
  partnership: {
    title: "Partnership models",
    models: [
      {
        title: "National distribution",
        description:
          "Exclusive or non-exclusive import and resale in your territory. We support marketing, training, and patient materials.",
      },
      {
        title: "License / white label",
        description:
          "License Thetis IP to manufacture locally (or co-brand) for foot & ankle or trauma portfolios — reduces unit cost and can lift margin above import-only distribution.",
      },
    ],
  },
  territories: {
    title: "Territories",
    openTitle: "Exclusive distribution available",
    openItems: [
      "Germany",
      "France",
      "Spain",
      "Poland",
      "Nordics (SE, DK, FI, NO)",
      "Italy",
    ],
    existingTitle: "Active distributor partners",
    existingNote:
      "See current sales channels above. No national distributor yet in DE / FR / IT.",
  },
  support: {
    title: "What we provide partners",
    items: [
      "IFU, brochures, patient flier, and clinician leave-behinds (downloads below)",
      "Quality improvement and patient education PDFs",
      "Regulatory documentation pack (on request under NDA if required)",
      "Training on fitting, sizing, and pathway positioning",
      "Co-marketing for launch in your territory",
      "Reimbursement and insurance coding support where applicable (e.g. Germany)",
      "Dedicated B2B contact and quarterly business reviews",
    ],
    reimbursementTitle: "Reimbursement & insurance codes",
    reimbursementBody:
      "In markets where the splint is prescribed or claimed through statutory or private insurance, we help partners secure appropriate reimbursement. In Germany, we can support obtaining Hilfsmittel (aid) codes and payer-specific listing — including documentation for hospital, outpatient, and retail pharmacy channels. Similar pathways may be appropriate in other EU territories; ask us for advice on your market.",
    pricingNote:
      "Standard distributor terms target ~50% gross margin at local RRP. Wholesale price lists, exclusivity, and logistics are shared after qualification.",
  },
  downloads: {
    title: "Downloads",
    productTitle: "Product & patient materials",
    clinicalTitle: "Clinical & quality materials",
    regulatoryNote:
      "Full regulatory dossier (DoC, IFU, UDI data, labelling) available to qualified distribution partners on request.",
  },
  cta: {
    title: "Next steps",
    description:
      "Meet us at OT World or book a call. We will send commercial terms before your internal review meeting.",
    partner: "Partnership enquiry",
    splint: "View consumer product page",
  },
};

const de: TradePageContent = {
  ...en,
  meta: {
    title: "Achilles-Nachtschiene — Handel & Distribution",
    description:
      "Partnerschaft mit Thetis Medical für den Vertrieb der Achillessehnenruptur-Nachtschiene. Produktübersicht, SKUs, klinischer Pfad und Downloads.",
  },
  hero: {
    eyebrow: "B2B · Hersteller & Händler",
    title: "Achillessehnenruptur-Nachtschiene",
    subtitle:
      "CE-gekennzeichnetes Medizinprodukt für internationalen Vertrieb und Lizenzierung. Ergänzt Gehstützen — gleicher 30°-Winkel, ~90 % leichter für Schlaf und Hygiene.",
    primaryCta: "Partnerschaftsanfrage",
  },
  pathway: {
    title: "Klinischer Pfad — ergänzt Ihre Stiefel-Linie",
    intro:
      "Tagsüber tragen Patienten typischerweise einen Gehstiefel (z. B. VACOped, Aircast). Die Thetis-Schiene ist für Nacht und Ruhe vorgesehen — kein Ersatz für den Stiefel.",
    dayLabel: "Tag",
    dayText: "Gehstiefel — Mobilisation & Schutz",
    nightLabel: "Nacht / Ruhe",
    nightText: "Thetis-Schiene — Schlaf, Hygiene, Compliance",
    note:
      "Entspricht frühen Belastungsprotokollen, wenn der Operateur die Nachtschiene neben dem Stiefel freigibt.",
  },
  territories: {
    ...en.territories,
    openTitle: "Vertrieb verfügbar (Exklusivgespräche offen)",
    openItems: ["Deutschland", "Frankreich", "Italien"],
    existingNote:
      "UK, Irland, Kanada, Australien, Portugal — noch kein nationaler Partner in DE / FR / IT.",
  },
  support: {
    ...en.support,
    items: [
      "IFU, Broschüren, Patientenflyer und Kliniker-Materialien (Downloads unten)",
      "Qualitätsverbesserungs- und Patientenaufklärungs-PDFs",
      "Regulatorisches Dossier (auf Anfrage, ggf. unter NDA)",
      "Schulung zu Anpassung, Größen und Positionierung im Versorgungspfad",
      "Co-Marketing für Ihren Marktstart",
      "Erstattungs- und Hilfsmittelnummern-Support (z. B. Deutschland)",
      "Fester B2B-Ansprechpartner und quartalsweise Business Reviews",
    ],
    reimbursementTitle: "Erstattung & Versicherungscodes",
    reimbursementBody:
      "Wo die Schiene über gesetzliche oder private Krankenversicherung erstattet wird, unterstützen wir qualifizierte Partner bei passenden Produkt- und Abrechnungscodes. In Deutschland helfen wir bei Hilfsmittel-Positionsnummern und kassenspezifischer Listung — inkl. Unterlagen für Klinik, ambulante Versorgung und Sanitätshaus. Vergleichbare Wege können in anderen EU-Märkten bestehen; sprechen Sie uns für Ihr Gebiet an.",
  },
  cta: {
    title: "Nächste Schritte",
    description:
      "Treffen Sie uns auf der OT World oder buchen Sie ein Gespräch. Kommerzielle Konditionen senden wir vor Ihrem internen Review.",
    partner: "Partnerschaftsanfrage",
    splint: "Produktseite ansehen",
  },
};

const fr: TradePageContent = {
  ...en,
  meta: {
    title: "Attelle de nuit Achille — Commerce & distribution",
    description:
      "Partenariat Thetis Medical pour distribuer l'attelle de nuit pour rupture d'Achille. Aperçu produit, SKU, parcours clinique et téléchargements.",
  },
  hero: {
    eyebrow: "B2B · Fabricants & distributeurs",
    title: "Attelle de nuit — rupture d'Achille",
    subtitle:
      "Dispositif médical marqué CE pour distribution et licence à l'international. Complète les bottes de marche — même angle 30°, ~90 % plus léger pour le sommeil.",
    primaryCta: "Demande de partenariat",
  },
  pathway: {
    title: "Parcours clinique — complète votre ligne de bottes",
    intro:
      "Le jour, les patients portent une botte de marche (ex. VACOped, Aircast). L'attelle Thetis est pour la nuit et le repos — pas un remplacement de la botte.",
    dayLabel: "Jour",
    dayText: "Botte de marche — mobilisation & protection",
    nightLabel: "Nuit / repos",
    nightText: "Attelle Thetis — sommeil, hygiène, observance",
    note:
      "Aligné avec les protocoles de mise en charge précoce lorsque l'équipe autorise l'attelle de nuit avec la botte.",
  },
  territories: {
    ...en.territories,
    openTitle: "Distribution disponible (exclusivité en discussion)",
    openItems: ["Allemagne", "France", "Italie"],
    existingNote:
      "Royaume-Uni, Irlande, Canada, Australie, Portugal — pas encore de partenaire national en DE / FR / IT.",
  },
  cta: {
    title: "Étapes suivantes",
    description:
      "Rencontrez-nous à OT World ou planifiez un appel. Conditions commerciales envoyées avant votre revue interne.",
    partner: "Demande de partenariat",
    splint: "Voir la page produit",
  },
};

const it: TradePageContent = {
  ...en,
  meta: {
    title: "Stecca notturna Achille — Commercio & distribuzione",
    description:
      "Partnership con Thetis Medical per distribuire la stecca notturna per rottura di Achille. Panoramica prodotto, SKU, percorso clinico e download.",
  },
  hero: {
    eyebrow: "B2B · Produttori & distributori",
    title: "Stecca notturna — rottura di Achille",
    subtitle:
      "Dispositivo medico con marcatura CE per distribuzione e licenza all'estero. Completa gli stivali da deambulazione — stesso angolo 30°, ~90% più leggera per il sonno.",
    primaryCta: "Richiesta partnership",
  },
  pathway: {
    title: "Percorso clinico — complementa la linea stivali",
    intro:
      "Di giorno i pazienti usano uno stivale (es. VACOped, Aircast). La stecca Thetis è per la notte e il riposo — non sostituisce lo stivale.",
    dayLabel: "Giorno",
    dayText: "Stivale — mobilizzazione e protezione",
    nightLabel: "Notte / riposo",
    nightText: "Stecca Thetis — sonno, igiene, compliance",
    note:
      "Allineato ai protocolli di carico precoce quando il team medico approva la stecca notturna con lo stivale.",
  },
  territories: {
    ...en.territories,
    openTitle: "Distribuzione disponibile (esclusiva in discussione)",
    openItems: ["Germania", "Francia", "Italia"],
    existingNote:
      "UK, Irlanda, Canada, Australia, Portogallo — nessun partner nazionale ancora in DE / FR / IT.",
  },
  cta: {
    title: "Prossimi passi",
    description:
      "Incontriamoci a OT World o prenota una call. Termini commerciali inviati prima della revisione interna.",
    partner: "Richiesta partnership",
    splint: "Vedi pagina prodotto",
  },
};

const es: TradePageContent = {
  ...en,
  meta: {
    title: "Férula nocturna de Aquiles — Comercio y distribución",
    description:
      "Asóciese con Thetis Medical para distribuir la férula nocturna para rotura de Aquiles.",
  },
  hero: {
    ...en.hero,
    eyebrow: "B2B · Fabricantes y distribuidores",
    primaryCta: "Consulta de partnership",
  },
};

export const tradePageContent: Record<Lang, TradePageContent> = {
  en,
  de,
  fr,
  es,
  it,
};
