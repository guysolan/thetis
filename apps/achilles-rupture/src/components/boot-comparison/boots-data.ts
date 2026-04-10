/**
 * Walking boot comparison data. Prices/specs cite retailer or manufacturer
 * pages checked April 2026 — always re-verify before treating as current.
 */

export type PriorityId =
  | "budget"
  | "lightweight"
  | "showering"
  | "ankleAngle"
  | "romLater"
  | "simplicity";

export type BootFamily = "wedge-cam" | "hinged-rom";

export function bootFamilyLabel(f: BootFamily): string {
  return f === "wedge-cam" ? "Wedge CAM walker" : "Hinged ROM boot";
}

/** External reference (manufacturer page, retailer cart, or literature). */
export interface LinkRef {
  label: string;
  url: string;
}

export interface VerifiedSpec {
  label: string;
  value: string;
  citation: LinkRef;
}

export interface BootModel {
  id: string;
  shortName: string;
  fullName: string;
  tagline: string;
  family: BootFamily;
  mechanism:
    | "Heel wedges (step-down)"
    | "Wedges + pneumatic shell (typical)"
    | "Hinge + dial (continuous)"
    | "Hinge + uprights (ROM settings)";
  /** Short lines for the comparison table */
  costUK: string;
  costUS: string;
  weightFeel: "Lighter" | "Medium" | "Heavier";
  waterproof: string;
  availability: string;
  summary: string;
  pros: string[];
  cautions: string[];
  evidenceNote: string;
  match: Record<PriorityId, number>;
  /** Primary product / IFU / brand pages (usually no consumer price). */
  manufacturerSources: LinkRef[];
  /** Where the table price ranges came from (retailer listings, April 2026). */
  priceCitations: LinkRef[];
  /** ISO-style month for price snapshot */
  priceChecked: string;
  /** Optional specs copied from cited pages (weight, ROM degrees, etc.) */
  verifiedSpecs?: VerifiedSpec[];
  /** PubMed / trial links backing clinical statements in copy */
  clinicalReferences?: LinkRef[];
  /** When prices are not tied to one SKU (e.g. generic class). */
  pricingNote?: string;
}

export const PRIORITIES: {
  id: PriorityId;
  label: string;
  hint: string;
}[] = [
  {
    id: "budget",
    label: "Lowest total cost",
    hint: "Boot + wedges/liners — not the only factor, but it matters.",
  },
  {
    id: "lightweight",
    label: "As light as possible",
    hint: "Easier day-to-day carrying and less back/hip drag from bulk.",
  },
  {
    id: "showering",
    label: "Easier shower / water",
    hint: "Waterproof liner vs relying on a limb cover — trade-offs apply.",
  },
  {
    id: "ankleAngle",
    label: "Most accurate ankle angle",
    hint: "Hinge boots tend to hold more true ankle plantarflexion on imaging.",
  },
  {
    id: "romLater",
    label: "Controlled motion later on",
    hint: "Unlocking a safe range in later weeks when your protocol allows.",
  },
  {
    id: "simplicity",
    label: "Simplest adjustments",
    hint:
      "Pull a wedge vs learning dial settings — both work if you follow your team.",
  },
];

const ELLISON_2017: LinkRef = {
  label:
    "Ellison et al., 2017 — boot equinus on weight-bearing imaging (PubMed)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28842105/",
};

const UKSTAR: LinkRef = {
  label: "Costa et al. UKSTAR trial summary (PubMed)",
  url: "https://pubmed.ncbi.nlm.nih.gov/33153987/",
};

const BAXTER_2022: LinkRef = {
  label: "Baxter et al., 2022 — Achilles loading in boots (PMC)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9661566/",
};

export const BOOTS: BootModel[] = [
  {
    id: "aircast-airselect",
    shortName: "Aircast AirSelect",
    fullName: "Aircast AirSelect Elite (+ Achilles wedge kit)",
    tagline: "Widely used wedge CAM boot — light and straightforward.",
    family: "wedge-cam",
    mechanism: "Heel wedges (step-down)",
    costUK:
      "Boot ~£120–165 inc VAT (size-dependent); Aircast heel wedges (01K) often £25–40 extra",
    costUS:
      "Boot ~$120–168 retail; Aircast heel wedges (01K) ~$38 on DonJoyStore",
    weightFeel: "Lighter",
    waterproof: "No — use a waterproof limb cover for showering.",
    availability: "Very common (many hospitals issue this or an equivalent).",
    summary:
      "Foam wedges under the heel create fixed plantarflexion steps. You remove wedges on your clinician’s schedule — never faster than prescribed.",
    pros: [
      "Usually among the lighter commonly prescribed CAM options",
      "Simple wedge removal — easy to explain in clinic",
      "Often lower purchase cost than hinged systems",
      "Overlapping Duplex aircells for fit and swelling (per manufacturer)",
    ],
    cautions: [
      "Wedge-based walkers can show less true ankle plantarflexion on imaging than cast-like positions — see Ellison et al. reference below",
      "Not waterproof; plan for shower strategy",
      "Gait can feel stiff until you adapt",
      "Sleeping in it is miserable for many people — discuss night protection",
    ],
    evidenceNote:
      "UKSTAR: long-term outcomes align when rehab is taken seriously — brand matters less than protocol.",
    manufacturerSources: [
      {
        label: "Enovis — Aircast AirSelect Elite (product)",
        url: "https://enovis.com/products/aircast/airselect-elite",
      },
      {
        label:
          "DonJoyStore — Aircast heel wedges 01K (indications / stacking angles)",
        url: "https://www.donjoystore.com/aircast-heel-wedge",
      },
    ],
    priceCitations: [
      {
        label: "UK: Medisupplies — AirSelect Elite from £120 (Apr 2026 cart)",
        url:
          "https://www.medisupplies.co.uk/Supports-Braces/Ankle-Supports-and-Ankle-Braces/Aircast-AirSelect-Elite-Walking-Cast-with-comfort-Aircells",
      },
      {
        label: "UK: Health and Care — AirSelect Elite £134.99",
        url:
          "https://www.healthandcare.co.uk/all-walker-boots/aircast-airselect-elite-walker-boot.html",
      },
      {
        label: "US: DonJoyStore — AirSelect Elite ~$121",
        url: "https://www.donjoystore.com/aircast-airselect-elite",
      },
      {
        label: "US: DonJoyStore — heel wedges 01K ~$37.98",
        url: "https://www.donjoystore.com/aircast-heel-wedge",
      },
    ],
    priceChecked: "2026-04",
    verifiedSpecs: [
      {
        label: "Published boot weight (medium, supplier spec)",
        value: "1.185 kg",
        citation: {
          label: "Medisupplies — AirSelect Elite listing",
          url:
            "https://www.medisupplies.co.uk/Supports-Braces/Ankle-Supports-and-Ankle-Braces/Aircast-AirSelect-Elite-Walking-Cast-with-comfort-Aircells",
        },
      },
    ],
    clinicalReferences: [ELLISON_2017, UKSTAR],
    match: {
      budget: 92,
      lightweight: 95,
      showering: 28,
      ankleAngle: 48,
      romLater: 35,
      simplicity: 90,
    },
  },
  {
    id: "vacoped",
    shortName: "OPED VACOped",
    fullName: "VACOped Achilles orthosis",
    tagline: "Hinged boot with vacuum liner — heavier, highly adjustable.",
    family: "hinged-rom",
    mechanism: "Hinge + dial (continuous)",
    costUK: "~£252 inc VAT (MedicalSupplies UK, size bands)",
    costUS: "~$275 (OPED Medical US shop, size-dependent)",
    weightFeel: "Heavier",
    waterproof:
      "Possible with spare liner / manufacturer shower guidance — confirm in IFU.",
    availability:
      "Less universal; some patients self-fund or receive via specialist clinics.",
    summary:
      "A side hinge dials plantarflexion in smaller steps and can allow controlled range inside limits your protocol sets.",
    pros: [
      "Cast-near true ankle plantarflexion in published imaging comparisons (see Ellison et al.)",
      "Continuous angle changes instead of wedge “jumps”",
      "Vacuum-bead liner moulds for snug fit (manufacturer)",
      "Later ROM options when your team allows hinge unlock",
    ],
    cautions: [
      "Higher cost and weight than most wedge CAM walkers",
      "Many people need EVENup on the other shoe",
      "Water use needs liner logistics",
      "Still uncomfortable for sleeping — same night-splint conversation as any boot",
    ],
    evidenceNote:
      "Biomechanics differs by boot class (Baxter et al.); day-to-day success still hinges on adherence.",
    manufacturerSources: [
      {
        label: "OPED International — VACOped",
        url: "https://oped-international.com/products/vacoped-boot/",
      },
      {
        label: "OPED UK — VACOped",
        url: "https://oped-uk.com/products/vacoped-boot/",
      },
      {
        label: "OPED Medical (US) — VACOped Achilles orthosis",
        url:
          "https://opedmedical.com/products/vacoped-achilles-injury-fracture-orthosis/",
      },
    ],
    priceCitations: [
      {
        label: "UK: MedicalSupplies — VACOped £251.99 inc VAT",
        url:
          "https://www.medicalsupplies.co.uk/oped-vacoped-achilles-tendon-walking-boot.html",
      },
      {
        label: "UK: Health and Care — VACOped £251.99",
        url:
          "https://www.healthandcare.co.uk/all-walker-boots/oped-vacoped-walking-boot-for-achilles-tendon-rupture.html",
      },
      {
        label: "US: OPED Medical — VACOped $275",
        url:
          "https://opedmedical.com/products/vacoped-achilles-injury-fracture-orthosis/",
      },
    ],
    priceChecked: "2026-04",
    verifiedSpecs: [
      {
        label: 'Product weight (supplier table: "Weight")',
        value: "6 lb (~2.7 kg)",
        citation: {
          label: "OPED Medical — VACOped product page",
          url:
            "https://opedmedical.com/products/vacoped-achilles-injury-fracture-orthosis/",
        },
      },
    ],
    clinicalReferences: [ELLISON_2017, BAXTER_2022, UKSTAR],
    match: {
      budget: 35,
      lightweight: 38,
      showering: 72,
      ankleAngle: 94,
      romLater: 92,
      simplicity: 58,
    },
  },
  {
    id: "generic-cam-wedge",
    shortName: "Generic wedge CAM walker",
    fullName: "Hospital-issue / budget CAM boot (wedge-based)",
    tagline: "Varies by brand — same broad idea as Aircast-style care.",
    family: "wedge-cam",
    mechanism: "Heel wedges (step-down)",
    costUK: "~£40–100 retail for unbranded / budget CAM walkers (illustrative)",
    costUS: "~$45–95 retail for unbranded / budget CAM walkers (illustrative)",
    weightFeel: "Medium",
    waterproof: "Usually no — assume cover unless your model says otherwise.",
    availability: "Often what you are given first in A&E or fracture clinic.",
    summary:
      "Many centres use non-premium rigid walkers with a similar wedge-stack concept. Quality of liners and straps varies — focus on secure equinus and skin checks.",
    pros: [
      "Lowest cost if you are buying out of pocket",
      "Familiar wedge protocol you can map to Aircast-style teaching materials",
      "Often in stock quickly from medical suppliers",
    ],
    cautions: [
      "Fit and liner quality vary — poor fit causes rubbing and puts you off wearing it",
      "Same imaging caveats as other wedge designs (Ellison et al.)",
      "You may upgrade later — only with your clinician re-setting your angle",
    ],
    evidenceNote:
      "Trials compare casting vs functional bracing — not every no-name SKU.",
    manufacturerSources: [
      {
        label: "NHS — broken ankle / recovery context (not a product page)",
        url: "https://www.nhs.uk/conditions/broken-ankle/",
      },
      {
        label:
          "Enovis — walking boot category (examples of branded CAM walkers)",
        url: "https://enovis.com/products",
      },
    ],
    priceCitations: [],
    pricingNote:
      "No single manufacturer page. Ranges are illustrative snapshots from pharmacy and marketplace CAM walkers (UK/US, early 2026) — confirm load rating, fit, and wedge compatibility with your clinician.",
    priceChecked: "2026-04",
    clinicalReferences: [ELLISON_2017, UKSTAR],
    match: {
      budget: 98,
      lightweight: 68,
      showering: 25,
      ankleAngle: 45,
      romLater: 30,
      simplicity: 85,
    },
  },
  {
    id: "donjoy-maxtrax",
    shortName: "DonJoy MaxTrax Air",
    fullName: "DonJoy / ProCare MaxTrax Air Ankle Walker",
    tagline:
      "Pneumatic liner CAM walker from DJO / Enovis — common fracture-clinic option.",
    family: "wedge-cam",
    mechanism: "Heel wedges (step-down)",
    costUK:
      "~£99–130 inc VAT (e.g. Health and Care DonJoy MaxTrax listings; size & model vary)",
    costUS:
      "~$72–88 on Vitality Medical / DonJoyStore (Apr 2026); other dealers vary",
    weightFeel: "Medium",
    waterproof: "No — shower cover or seated washing as usual.",
    availability:
      "Common in US / EU supply chains; many fracture clinics use DJO-branded walkers.",
    summary:
      "Rigid shell with inflatable chambers for oedema; Achilles care still uses removable heel wedges (often Aircast 01K or universal wedge kits) per your protocol — same schedule discipline as other CAM boots.",
    pros: [
      "Often cheaper than premium CAM or hinged systems at retail",
      "Aircells help maintain contact as swelling changes (manufacturer)",
      "Maps onto wedge-removal protocols written for other walkers",
    ],
    cautions: [
      "Same imaging caveat class as other wedge designs (Ellison et al.)",
      "Sub-models and heights differ — confirm you have Achilles-appropriate wedges",
      "Not interchangeable mid-protocol with a hinged boot without professional angle matching",
    ],
    evidenceNote: "UKSTAR compares pathways — not each catalogue number.",
    manufacturerSources: [
      {
        label: "Enovis Europe — MaxTrax Air (specs / IFU links)",
        url:
          "https://enovis-medtech.eu/en_US/MaxTrax-Air-MaxTrax-Air-Ankle-74591.html",
      },
      {
        label: "DonJoyStore — MaxTrax Air Ankle Walker",
        url: "https://www.donjoystore.com/donjoy-maxtrax-air-ankle-walker",
      },
    ],
    priceCitations: [
      {
        label:
          "UK: Health and Care — DonJoy MaxTrax walker £98.99 inc VAT (verify Fixed vs Air SKU on page)",
        url:
          "https://www.healthandcare.co.uk/ankle-braces/donjoy-maxtrax-fixed-ankle-walker.html",
      },
      {
        label: "US: Vitality Medical — ProCare MaxTrax Air ~$72",
        url:
          "https://www.vitalitymedical.com/djo-procare-maxtrax-air-ankle-walker.html",
      },
      {
        label:
          "US: DonJoyStore — MaxTrax Air Ankle Walker $87.76 (Apr 2026 listing)",
        url: "https://www.donjoystore.com/donjoy-maxtrax-air-ankle-walker",
      },
    ],
    priceChecked: "2026-04",
    pricingNote:
      "UK cart link is DonJoy “MaxTrax Fixed” (£98.99, Health and Care); US links are MaxTrax Air (pneumatic). Match the SKU your clinic named.",
    clinicalReferences: [ELLISON_2017, UKSTAR],
    match: {
      budget: 88,
      lightweight: 70,
      showering: 27,
      ankleAngle: 48,
      romLater: 36,
      simplicity: 86,
    },
  },
  {
    id: "ossur-rebound-air",
    shortName: "Össur Rebound Air",
    fullName: "Össur Rebound Air Walker (tall / circumferential)",
    tagline:
      "Össur pneumatic CAM walker; add branded wedge kit for Achilles programmes.",
    family: "wedge-cam",
    mechanism: "Wedges + pneumatic shell (typical)",
    costUK: "~£100 inc VAT (Health and Care); Össur wedge kit often ~£36 extra",
    costUS: "~$88–119 from Rehab-store (high-top SKUs, size-dependent)",
    weightFeel: "Medium",
    waterproof: "No — plan a limb bag or keep the boot dry.",
    availability:
      "Common brand internationally; model / liner names vary by region.",
    summary:
      "Integrated pump and valve for the liner; Achilles pathways use Össur wedge packs with this chassis — follow your team’s wedge schedule.",
    pros: [
      "Circumferential shell and air adjustment (Össur marketing / IFU)",
      "Competitive retail pricing versus flagship Aircast in some markets",
    ],
    cautions: [
      "Still wedge-CAM imaging biology — not a hinge boot on X-ray",
      "Low-top vs tall and liner choice change fit",
      "Add-on wedges are a separate line item in many shops",
    ],
    evidenceNote:
      "Brand evidence for Achilles is mostly pathway-level, not head-to-head RCTs for every SKU.",
    manufacturerSources: [
      {
        label: "Össur US — Rebound Air Walker",
        url:
          "https://www.ossur.com/en-us/bracing-and-supports/foot-and-ankle/rebound-air-walker",
      },
      {
        label: "Health and Care — universal wedges for Rebound Air (accessory)",
        url:
          "https://www.healthandcare.co.uk/all-walker-boots/universal-wedges-for-the-rebound-air-walker-boot.html",
      },
    ],
    priceCitations: [
      {
        label: "UK: Health and Care — Rebound Air £99.96 inc VAT",
        url:
          "https://www.healthandcare.co.uk/all-walker-boots/ossur-rebound-air-walker-boot.html",
      },
      {
        label: "UK: Health and Care — wedge kit £36 inc VAT",
        url:
          "https://www.healthandcare.co.uk/all-walker-boots/universal-wedges-for-the-rebound-air-walker-boot.html",
      },
      {
        label: "US: Rehab-store — Rebound Air high-top ~$88+",
        url: "https://www.rehab-store.com/p-ossur-rebound-air-walker-boot.html",
      },
    ],
    priceChecked: "2026-04",
    verifiedSpecs: [
      {
        label: "Weight (retailer-published specification)",
        value: "2 kg",
        citation: {
          label: "Health and Care — Rebound Air listing",
          url:
            "https://www.healthandcare.co.uk/all-walker-boots/ossur-rebound-air-walker-boot.html",
        },
      },
    ],
    clinicalReferences: [ELLISON_2017, UKSTAR],
    match: {
      budget: 78,
      lightweight: 72,
      showering: 26,
      ankleAngle: 50,
      romLater: 38,
      simplicity: 82,
    },
  },
  {
    id: "maxtrax-air-rom",
    shortName: "MaxTrax Air ROM",
    fullName: "DonJoy MaxTrax Air ROM walker",
    tagline:
      "Hinged DJO/ProCare walker — ROM stops in 7.5° steps; distinct from wedge-only MaxTrax Air.",
    family: "hinged-rom",
    mechanism: "Hinge + uprights (ROM settings)",
    costUK: "~£150–220 from UK dealers when stocked (import parity varies)",
    costUS:
      "~$260–296 (Medical Department Store & Rehab-store Apr 2026 listings)",
    weightFeel: "Medium",
    waterproof: "Generally no — same caveats as other rigid walkers.",
    availability:
      "Orthopaedic / sports-medicine suppliers; less common than basic MaxTrax Air.",
    summary:
      "Manufacturer copy: protected ROM from 45° plantarflexion to 30° dorsiflexion in 7.5° increments, with pneumatic liner — verify angles against YOUR protocol, not this page.",
    pros: [
      "True hinge-based progression for teams that prescribe ROM walkers",
      "Often cheaper retail than VACOped in US snapshots",
      "Same Enovis service ecosystem as other MaxTrax lines",
    ],
    cautions: [
      "Not the same vacuum liner system as VACOped",
      "Wide US price spread by dealer — shop authorised sellers",
      "You must learn hinge locks with your clinician — beginner errors change tendon load",
    ],
    evidenceNote:
      "Family-level biomechanics (wedge vs rigid posterior strut) are in Baxter et al.; this SKU is not individually trial-backed.",
    manufacturerSources: [
      {
        label: "Enovis Europe — MaxTrax ROM Air (features / ROM increments)",
        url: "https://enovis-medtech.eu/en_US/MaxTrax-ROM-Air-73930.html",
      },
      {
        label: "DonJoyStore — MaxTrax ROM Air Walker",
        url: "https://www.donjoystore.com/donjoy-maxtrax-rom-air-walker",
      },
    ],
    priceCitations: [
      {
        label:
          "US: Medical Department Store — MaxTrax Air ROM (SKU 11-1381) $259.97",
        url:
          "https://www.medicaldepartmentstore.com/Ankle-Walker-Boot-p/11-1381.htm",
      },
      {
        label: "US: Rehab-store — MaxTrax Air ROM ~$295 (size SKUs 11-1381-x)",
        url:
          "https://www.rehab-store.com/p-donjoy-maxtrax-air-rom-walker-cast-boot.html",
      },
    ],
    priceChecked: "2026-04",
    verifiedSpecs: [
      {
        label: "ROM hinge range (manufacturer marketing copy)",
        value:
          "45° plantarflexion to 30° dorsiflexion, 7.5° increments (locks at 0–30° steps)",
        citation: {
          label: "DonJoyStore — MaxTrax ROM Air description",
          url: "https://www.donjoystore.com/donjoy-maxtrax-rom-air-walker",
        },
      },
    ],
    clinicalReferences: [ELLISON_2017, BAXTER_2022, UKSTAR],
    match: {
      budget: 58,
      lightweight: 58,
      showering: 32,
      ankleAngle: 78,
      romLater: 84,
      simplicity: 62,
    },
  },
];
