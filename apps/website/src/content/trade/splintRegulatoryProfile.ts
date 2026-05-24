/** Splint regulatory registrations and documentation (Thetis Medical Ltd). */

export const splintFdaEstablishmentNumber = "3022381831";
export const splintFdaListingNumber = "D470976";

export const splintRegulatorySections = [
  {
    title: "Documentation & quality",
    items: [
      {
        label: "Technical documentation",
        detail:
          "Technical file, Declaration of Conformity, IFU, and risk management summary",
      },
      {
        label: "Post-market surveillance",
        detail: "Vigilance and complaint handling processes in place",
      },
      {
        label: "Manufacturing",
        detail: "Designed and manufactured in the United Kingdom",
      },
    ],
  },
  {
    title: "EU & UK",
    items: [
      {
        label: "UKCA & CE marking",
        detail: "Class I medical device under EU/UK MDR",
      },
      {
        label: "EUDAMED",
        detail: "Registered in the EU medical devices database",
      },
      {
        label: "EC-REP",
        detail: "EU Authorised Representative appointed",
      },
      {
        label: "MHRA",
        detail: "UK manufacturer registered with MHRA",
      },
      {
        label: "UDI (GS1)",
        detail: "Unique Device Identifier assigned - traceable per unit",
      },
    ],
  },
  {
    title: "Global markets",
    items: [
      {
        label: "FDA (United States)",
        detail:
          `510(k) exempt · establishment ${splintFdaEstablishmentNumber} · listing ${splintFdaListingNumber}`,
      },
      {
        label: "MDEL (Canada)",
        detail: "Health Canada Medical Device Establishment Licence registered",
      },
      {
        label: "TGA (Australia)",
        detail:
          "Included on the Australian Register of Therapeutic Goods (ARTG)",
      },
      {
        label: "Läkemedelsverket (Sweden)",
        detail: "Registered with Sweden's Medical Products Agency",
      },
      {
        label: "INFARMED (Portugal)",
        detail:
          "Registered with Portugal's national medicines and health products authority",
      },
    ],
  },
] as const;

/** Flat list for pages that need a single grid (e.g. trade). */
export const splintRegulatoryPortfolio = splintRegulatorySections.flatMap(
  (section) => section.items,
);
