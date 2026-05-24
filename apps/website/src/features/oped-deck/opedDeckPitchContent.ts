import {
  opedAnnualRupturesTotal,
  opedMarketBreakdown,
  opedSplintSales,
  opedSplintSalesTotal,
} from "@/features/oped-deck/opedDeckContent";
import {
  sleepSurveyHeadlineStats,
  sleepSurveyTotal,
} from "@/content/trade/sleepSurveyData";
import { tradePageContent } from "@/content/trade/tradePageContent";
import { tradePatentPortfolio } from "@/content/trade/tradePatentTimeline";
import { splintRegulatorySections } from "@/content/trade/splintRegulatoryProfile";
import { aeWaitComparison } from "@/content/evidence/evidenceStudies";

export const OPED_DECK_SLIDE_COUNT = 11;
export const OPED_DECK_APPENDIX_SLIDE_COUNT = 1;

const t = tradePageContent.en;

export const opedPitchVision = {
  eyebrow: "OPED Medical × Thetis Medical",
  title: "Completing the 24-Hour Cycle of Achilles Recovery",
  subtitle: "A strategic portfolio extension for OPED & VACOped",
  tagline: "VACOped for the Day. Thetis for the Night.",
} as const;

export const opedPitchWhyOped = {
  title: "Why OPED should care",
  headline: "You already own the day",
  intro:
    "VACOped is the gold standard for daytime Achilles rehabilitation. The missing piece is not another boot - it is what happens when patients take the boot off at night.",
  bullets: [
    "Thetis does not compete with VACOped or EVENup",
    "It completes the stack your reps already sell",
    "One conversation, three products, zero gap in the pathway",
  ],
} as const;

export const opedPitchDayStack = {
  eyebrow: "Achilles Rupture · OPED",
  title: "Patients trust VACOped + EVENup",
  intro:
    "OPED already gives patients the best daytime Achilles recovery. VACOped immobilises and protects; EVENup balances gait. Together, they are the gold standard.",
  products: [
    {
      name: "VACOped",
      role: "Day · immobilisation",
      detail:
        "Protected weight-bearing and angle control - the foundation every ATR patient needs",
      image: "/images/catalogue-products/vacoped-angle-changing.png",
      imageAlt: "OPED VACOped walking boot with adjustable angle",
    },
    {
      name: "EVENup",
      role: "Day · gait balance",
      detail:
        "Shoe leveller for the uninjured foot - patients ask for it and reps already sell it with every boot",
      image: "/images/catalogue-products/even-up.png",
      imageAlt: "OPED EVENup shoe leveler worn with a walking boot",
    },
  ],
} as const;

export const opedPitchPatientComplaint = {
  eyebrow: "The night problem",
  title: "Patients struggle at night",
  intro:
    "Matthew Solan, a foot and ankle surgeon, saw the same problem in clinic: patients were protected in the boot by day but could not sleep in it at night.",
  surveyLead: "We surveyed Achilles rupture patients. 77% said the boot was:",
  complaintThemes: [
    { id: "hot", label: "Hot" },
    { id: "heavy", label: "Heavy" },
    { id: "uncomfortable", label: "Uncomfortable" },
    { id: "unhygienic", label: "Unhygienic" },
  ],
} as const;

export const opedPitchNightGap = {
  title: "The 12-hour compliance void",
  headline: "77% struggle to sleep in the boot",
  intro:
    `In our survey of ${sleepSurveyTotal} Achilles rupture patients, 77% reported sleep difficulty in a walking boot. ${sleepSurveyHeadlineStats.adjustedOrRemovedPct}% removed or adjusted the boot at night.`,
  stats: [
    { value: "77%", label: "Struggled to sleep in the boot" },
    {
      value: `${sleepSurveyHeadlineStats.adjustedOrRemovedPct}%`,
      label: "Removed or adjusted boot at night",
    },
    { value: "~2.5 kg", label: "Typical walking boot weight" },
  ],
  themes: ["Too hot", "Too bulky", "Dirty after daytime wear"],
} as const;

export const opedPitchBehaviourRisk = {
  title: "The unprotected hours",
  headline: "When the boot comes off, protection stops",
  intro:
    "The clinical risk is not daytime VACOped performance. It is what happens when patients sleep without adequate plantarflexion protection.",
  scenarios: [
    {
      label: "Boot removed at night",
      detail: "Patients loosen straps or take the boot off to sleep",
    },
    {
      label: "Midnight bathroom trip",
      detail: "Sudden weight-bearing without controlled plantarflexion",
    },
    {
      label: "Involuntary movement",
      detail: "Sleep movement can force the ankle toward dorsiflexion",
    },
  ],
} as const;

export const opedPitchProtocol = {
  title: "The complete OPED recovery stack",
  headline: "Boot + EVENup. The splint is the obvious third.",
  intro:
    "Patients already ask for EVENup - it solves gait and back pain while booted, and OPED reps sell it every day. But the problem that keeps them awake is the boot at night. Once a patient is on VACOped and EVENup, the Thetis splint is not a hard sell - it is the missing piece they are already searching for.",
  punchline:
    "OPED already owns the first two products. Patients want EVENup - but they need the splint more. Bundle all three and the value proposition sells itself.",
  dayStackLabel: "Day · OPED already owns this",
  nightLabel: "Night · what patients need most",
  cards: [
    {
      role: "Day · immobilisation",
      product: "VACOped",
      detail:
        "Protected weight-bearing and angle control - the foundation every ATR patient needs",
      patientNote: "Prescribed at rupture",
      image: "/images/catalogue-products/vacoped-angle-changing.png",
      imageAlt: "OPED VACOped walking boot with adjustable angle",
      emphasis: "base" as const,
    },
    {
      role: "Day · gait balance",
      product: "EVENup",
      detail:
        "Shoe leveler for the uninjured foot - patients actively seek this and reps already cross-sell it with every boot",
      patientNote: "Patients want this",
      image: "/images/catalogue-products/even-up.png",
      imageAlt: "OPED EVENup shoe leveler worn with a walking boot",
      emphasis: "day" as const,
    },
    {
      role: "Night · the obvious add-on",
      product: "Achilles Splint",
      detail:
        "~200 g, breathable, locked at ~30° plantarflexion - the product patients care about most once they hit the sleep problem",
      patientNote: "Patients need this most",
      image: "/images/night_splint_bed_top_square.jpg",
      imageAlt: "Thetis Achilles rupture night splint in bed",
      emphasis: "hero" as const,
    },
  ],
  pullQuote: {
    quote:
      "I would also suggest searching for the Evenup Shoe Balancer on Amazon: another helpful product but one that makes walking with a CAM boot a bit easier. This splint is exactly what the boot cannot do - let you sleep.",
    name: "M. D. Taylor",
    country: "US",
    stars: 5,
  },
} as const;

export const opedPitchProduct = {
  title: "The Thetis ATR Splint",
  headline: "Purpose-built for Achilles rupture",
  stats: [
    { value: "~200 g", label: "Device weight" },
    { value: "~90%", label: "Lighter than a boot" },
    { value: "30°", label: "Plantarflexion" },
    { value: "4", label: "SKU variants" },
  ],
  features: [
    "Open, breathable design for sleep and hygiene",
    "Maintains plantarflexion when VACOped is off",
    "Patented mechanism - not a generic night splint",
  ],
} as const;

export const opedPitchDifferentiation = {
  title: "Why it is different",
  intro:
    "Thetis is clinically distinct from the products patients and payers already encounter.",
  notItems: [
    "Not a plantar fasciitis splint",
    "Not a boot replacement for weight-bearing",
    "Not a comfort accessory",
  ],
  isItem:
    "An ATR-specific rest, sleep, and hygiene orthosis that maintains plantarflexion when VACOped is off",
} as const;

export const opedPitchAdoptionPathways = {
  title: "Proven adoption pathways",
  intro:
    "Thetis is already live through reimbursement, NHS acute pathways, Canadian distributor bundles, and low-cost hospital outreach - each replicable through OPED's existing accounts.",
  pathways: [
    {
      id: "germany",
      flag: "🇩🇪",
      region: "Germany · reimbursement",
      headline: "The channel already exists",
      body:
        "German statutory insurers already reimburse night splints prescribed alongside a walking boot - but listed devices are usually plantar fasciitis splints with dorsiflexion and a rigid wedge around the back of the calf.",
      highlight:
        "Thetis maintains ~30° plantarflexion - the clinically correct direction for ATR. With a national partner, we can pursue Hilfsmittel listing for the right device through the same reimbursement channel.",
      imageCaption:
        "Typical reimbursed plantar fasciitis night splint - dorsiflexion wedge at the back of the leg, not designed for ATR",
    },
    {
      id: "uk-nhs",
      flag: "🇬🇧",
      region: "United Kingdom · NHS acute pathway",
      headline: "Splint instead of plaster in A&E",
      body:
        "Royal Surrey NHS Trust and Epsom & St Helier University Hospitals use the Thetis splint in place of plaster casts on the acute pathway - faster specialist review and a better patient experience. The same model is live at St John & St Elizabeth Hospital.",
      hospitals: [
        "Royal Surrey NHS Trust",
        "Epsom & St Helier University Hospitals",
        "St John & St Elizabeth Hospital",
      ],
      stats: [
        {
          value: `${aeWaitComparison.meanDays[1]} days`,
          label: "Mean A&E to specialist (splint pathway)",
        },
        {
          value: `${aeWaitComparison.meanDays[0]} days`,
          label: "With traditional plaster cast",
        },
        {
          value: "3.7 days",
          label: "Mean time to definitive treatment plan (Royal Surrey QIP)",
        },
      ],
      evidenceHref: "/evidence#trauma-splint-qip",
      evidenceLabel: "View Royal Surrey QIP on thetismedical.com/evidence",
    },
    {
      id: "canada",
      flag: "🇨🇦",
      region: "Canada · distributor channels",
      headline: "Bundled through orthopaedic supply",
      body:
        "Canadian patients access the splint through established orthopaedic distributors - bundled alongside boot and recovery products rather than as a standalone DTC purchase.",
      channels: [
        {
          name: "Ortho Active",
          note: "Bundled recovery packs via orthopaedic sales reps",
        },
        {
          name: "OrthoRx",
          note: "Direct clinic and patient supply",
        },
      ],
      stat: {
        value: "~200",
        label: "Splints sold per year in Canada today",
      },
    },
    {
      id: "outreach",
      flag: "🇬🇧",
      region: "Hospital outreach · low-cost growth",
      headline: "Fliers & clinician visits drive local spikes",
      body:
        "Patient flyers in fracture clinics and A&E - paired with in-person hospital visits - have produced measurable sales spikes at those sites in the UK. We already visit hospitals; OPED reps can run the same play alongside VACOped accounts.",
      tactics: [
        "Patient flyers in fracture clinic waiting areas",
        "Clinician leave-behinds at foot & ankle MDTs",
        "Localised sales uplift after each hospital visit",
      ],
    },
  ],
} as const;

export const opedPitchBundle = {
  title: "The VACOped 24/7 bundle",
  intro:
    "VACOped by day. EVENup for gait. Thetis splint at night. One stack - with demand already proven across four routes to market.",
  bundleName: "VACOped 24/7 Premium Recovery Pack",
  bundleItems: ["VACOped boot", "EVENup shoe leveler", "Thetis ATR splint"],
  salesChannels: [
    {
      flag: "🇩🇪",
      market: "Germany",
      channel: "Reimbursed",
      detail:
        "Statutory insurers already reimburse night splints with a walking boot - list the right ATR device through existing Hilfsmittel channels.",
    },
    {
      flag: "🇨🇦🇦🇺",
      market: "Canada & Australia",
      channel: "Physios, shops & distributors",
      detail:
        "Already resold through physio clinics, orthopaedic retailers, and distributor partners - ready to formalise inside the bundle.",
    },
    {
      flag: "🇺🇸",
      market: "United States",
      channel: "Online · direct to patient",
      detail:
        "~$15k/month in US online sales already - patients find us when the boot stops them sleeping.",
    },
    {
      flag: "🇬🇧",
      market: "United Kingdom",
      channel: "NHS fracture clinics",
      detail:
        "Live on NHS acute pathways - fracture clinic teams and foot & ankle surgeons are already asking for it.",
    },
  ],
} as const;

export const opedPitchCommercial = {
  title: "Bundle revenue opportunity",
  headline: "Every VACOped + EVENup sale is a missed splint sale",
  intro:
    "OPED reps already cross-sell EVENup with every VACOped. Adding the Thetis splint to that same conversation is the obvious third product - no new sales motion required.",
  bundleName: "VACOped 24/7 Premium Recovery Pack",
  bundleItems: ["VACOped boot", "EVENup shoe leveler", "Thetis ATR splint"],
  revenueStats: [
    { value: "145,000", label: "Annual ruptures in 6 key markets" },
    { value: "~€80", label: "Thetis splint patient price" },
    { value: "~€11.6M", label: "Annual revenue potential at full penetration" },
    {
      value: "<1.5%",
      label: "Current market penetration - the upside is enormous",
    },
  ],
  bundleNote:
    "At even 10% penetration of the addressable market, a bundled offer generates ~€1.2M additional splint revenue annually - before accounting for premium bundle pricing or reimbursement uplift.",
} as const;

export const opedPitchDistributorProof = {
  title: "Bundle logic already works",
  intro:
    "Strong distributors already combine complementary recovery products rather than selling isolated SKUs.",
  partners: [
    {
      name: "SwiftBrace / Ortho Active",
      country: "Canada",
      note: "Live Thetis distribution partner",
    },
    {
      name: "Club Warehouse",
      country: "Australia",
      note: "Orthopaedic supply channel",
    },
    {
      name: "Ortho Direct",
      country: "Portugal",
      note: "Boot + recovery ecosystem",
    },
  ],
  message:
    "OPED would formalise what successful distributors already do - a bundled day/night recovery offer.",
} as const;

export const opedPitchSales = {
  title: "Sales traction",
  headline: "2,000+ splints sold per year",
  intro:
    "Proven demand in direct and partner channels - before a national OPED integration.",
  stats: [
    { value: "2,000+", label: "Total annual splints", highlight: true },
    {
      value: opedSplintSales.us.toLocaleString("en-GB"),
      label: "United States",
    },
    {
      value: opedSplintSales.uk.toLocaleString("en-GB"),
      label: "United Kingdom",
    },
    { value: opedSplintSales.ca.toLocaleString("en-GB"), label: "Canada" },
  ],
  note:
    "Additional volume through NHS contracts, EU channels, and other territories.",
} as const;

export const opedPitchUnmetDemand = {
  title: "Requests we cannot fulfil",
  headline: "Demand exceeds current distribution",
  body:
    "Each year we receive many enquiries from patients and foot & ankle surgeons who want the splint for their patients - often after reading our blog, course, or patient stories. Where we have no local distributor or shipping route, we have to turn them away.",
  markets: ["Germany", "France", "Spain", "Italy", "Nordics"],
} as const;

export const opedPitchMarketOpportunity = {
  title: "The addressable gap",
  headline: `${
    opedAnnualRupturesTotal.toLocaleString("en-GB")
  } ruptures a year. We reach fewer than 1.5%.`,
  intro:
    "Across just six key markets, over 145,000 patients rupture their Achilles every year. Most are given a VACOped or equivalent boot. Almost none are given a night splint.",
  breakdown: opedMarketBreakdown,
  totalRuptures: opedAnnualRupturesTotal,
  totalSales: opedSplintSalesTotal,
  penetrationPct: ((opedSplintSalesTotal / opedAnnualRupturesTotal) * 100)
    .toFixed(1),
  unreachedPct: (100 - (opedSplintSalesTotal / opedAnnualRupturesTotal) * 100)
    .toFixed(1),
  unreachedCount: opedAnnualRupturesTotal - opedSplintSalesTotal,
  urgencyNote:
    "Every month without distribution is ~12,000 patients sleeping unprotected in Germany, France, and other blocked markets alone.",
} as const;

export const opedPitchMarketing = {
  title: "Marketing engine",
  headline: "Demand generation, not just a SKU",
  channels: [
    "Direct-to-consumer on thetismedical.com",
    "Amazon and marketplace listings",
    "NHS hospital supply and clinician wholesale",
  ],
  content: [
    "{blogCount}+ SEO blog posts on splint use, boot sleep, and ATR recovery",
    "Achilles rupture recovery course",
    "Learn hub, FAQs, and clinical resources",
  ],
} as const;

export const opedPitchPatientQuotes = [
  {
    quote:
      "The Splint should be a Dr recommended accessory at the time a boot is prescribed.",
    name: "Faustine",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Sleeping in the boot is even harder than walking in it. This is exactly what the splint is designed to solve.",
    name: "M. D. Taylor",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Finally got the restful sleep I needed. The cast and heavy dirty boot made sleep tough. If you're recovering from an Achilles rupture, buy this immediately.",
    name: "Chad",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "It felt like a torture chamber at night. At the 2-week mark my doctor approved this and I am sleeping 6–8 hours a night. It is priceless.",
    name: "Afantee",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Far preferable to (not) sleeping in The Boot. Sleep is critical to recovery.",
    name: "Dennis",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Wearing it at other odd times that the boot is inconvenient gives me confidence I won't unexpectedly pull my foot upwards.",
    name: "Anonymous",
    country: "GB",
    stars: 5,
  },
  {
    quote: "Warum gibt es die nicht hier in den Sanitätshäusern?",
    name: "Bixi",
    country: "DE",
    translation: "Why isn't this available in medical supply stores here?",
    stars: 5,
  },
  {
    quote:
      "Sollte in allen Sanitätshäusern im Regal liegen und auch empfohlen werden, denn guter Schlaf trägt erheblich zur Regeneration bei.",
    name: "Sven",
    country: "DE",
    translation:
      "Should be on every medical supply store shelf and recommended - good sleep contributes enormously to recovery.",
    stars: 5,
  },
] as const;

export const opedPitchAthleteQuotes = [
  {
    quote:
      "I was told I had a complete tear. I refused surgery and was put in a cam boot. Finding the splint online, I tried it. Visiting back with the surgeon he said it is healing and I should start rehab straight away. I believe the splint helped me greatly.",
    name: "Rick Las",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Prior to this injury I was very active with decent balance and leg strength. The splint combined with the iWalk let me cook, clean, and carry things - a little less of an imposition on my spouse.",
    name: "Dennis Kitch",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "Great product to use about five or six weeks into a ruptured Achilles injury instead of the heavy clumsy boot. Keeps the foot in a great healing position and you get a good night's rest.",
    name: "Thomas J.",
    country: "US",
    stars: 5,
  },
  {
    quote:
      "My husband's orthopedic surgeon suggested this night splint. It worked great to keep his Achilles immobilised while sleeping. He said it was comfortable to sleep in as well.",
    name: "Kelly West",
    country: "US",
    stars: 5,
  },
] as const;

export const opedPitchClinicianQuotes = [
  {
    name: "Mr James Davis",
    role: "Past President, BOFAS",
    quote:
      "When I tore my own Achilles tendon, the hardest part was wearing the hospital boot in bed. This splint is certain to improve the recovery experience for patients.",
  },
  {
    name: "Dr Robbie Ray",
    role: "Foot & Ankle Surgeon",
    quote:
      "A game-changer in my practice. The splint's design prioritizes both comfort and functionality, enabling controlled, progressive recovery.",
  },
  {
    name: "Professor Matthew Welck",
    role: "Foot & Ankle Surgeon, RNOH",
    quote:
      "Patients sometimes find sleeping in a boot uncomfortable, and having an alternative, more lightweight option is well received.",
  },
] as const;

/** Short pull-quotes used inline on specific slides */
export const opedPitchPullQuotes = {
  nightGap: {
    quote:
      "I didn't get any sleep for the first 1½ months in my heavy boot. I decided to buy this so I could try to get some sleep.",
    name: "Kaylin",
    country: "US",
    stars: 5,
  },
  behaviourRisk: {
    quote:
      "I completely ruptured my Achilles. The boot was making sleep impossible - it felt like a torture chamber at night.",
    name: "Afantee",
    country: "US",
    stars: 5,
  },
  bundleSlide: {
    quote:
      "My surgeon suggested this night splint alongside the boot. It worked great to keep his Achilles immobilised while sleeping.",
    name: "Kelly West",
    country: "US",
    stars: 5,
  },
} as const;

export const opedPitchClinical = {
  title: "Clinically proven safety",
  intro:
    "Over 5,000 splints in use - zero reported re-ruptures. Post-market surveillance confirms night-time injury risk below 0.1% (95% CI).",
  stats: [
    { value: "5,000+", label: "Splints sold & tracked" },
    { value: "0", label: "Reported re-ruptures" },
    { value: "<0.1%", label: "Night injury risk upper bound (95% CI)" },
  ],
  body:
    "Recovery-period safety assessment recorded comparable protection to a walking boot with substantially better comfort for sleep (Sleeping safe and sound, BOFAS 2024).",
  surveillance:
    "EU MDR post-market surveillance (2022–2025) on 5,000+ splints sold shows the same safety profile: zero reported re-ruptures, with a 95% confidence interval upper bound for night-time injury below 0.1%.",
  sources: [
    "BOFAS 2024 - Sleeping safe and sound",
    "BOFAS 2023 - Mother Knows Best",
    "Post-market surveillance - EU MDR vigilance (2022–2025)",
  ],
} as const;

export const opedPitchIp = {
  title: "Intellectual property",
  intro: t.ip.intro,
  portfolioTitle: t.ip.portfolioTitle,
  portfolio: tradePatentPortfolio,
  message:
    "Design and utility protection supports distribution, white-label, and in-region manufacturing under licence - without starting from a blank IP slate.",
  licenceNote:
    "Full portfolio schedule and filing status available to qualified partners under NDA.",
} as const;

export const opedPitchRegulatory = {
  title: "Regulatory & quality",
  intro:
    "Class I device - cleared, documented, and registered across OPED's core markets.",
  sections: splintRegulatorySections,
  footnote:
    "Full technical file and registration certificates available to qualified partners under NDA.",
} as const;

export const opedPitchSkus = {
  title: "Operational simplicity",
  headline: "4 SKUs. Easy to stock. Easy to bundle.",
  mix: t.skus.mixRecommendation,
  variants: ["Small Left", "Small Right", "Large Left", "Large Right"],
} as const;

export const opedPitchEconomics = {
  title: "Scalable economics",
  headline: "Margin expansion at OPED scale",
  points: [
    {
      label: "Patient RRP",
      value: "€79.99 in target EU markets",
    },
    {
      label: "Hospital / NHS",
      value: "£28–£60 per unit historic range",
    },
    {
      label: "OPED advantage",
      value:
        "Significant margin expansion via global supply chain, material sourcing, and injection-moulding scale",
    },
  ],
} as const;

export const opedPitchInvitation = {
  title: "Let's complete the stack together",
  headline: "Licence or acquire - your structure, our shared goal",
  fomo:
    "If a boot competitor integrates Thetis first, they own the day/night category. OPED can take it instead - with a device that is already proven, cleared, and loved by patients.",
  ask:
    "Guy Solan is open to a formal discussion under NDA: clinical evidence, IP, manufacturing, and either a licence or acquisition.",
  cta:
    "Partnership enquiry - we will share the full data room and manufacturing roadmap.",
  partnerHref: "/become-a-partner",
} as const;

export const opedPitchPrototypeOrigin = {
  title: "Many prototypes. One purpose-built answer.",
  intro:
    "Guy tried lots of designs at university, moving from borrowed 3D printer parts and hand-sewn straps to the form that worked best: a left/right top-of-leg splint with an organic plastic shell, locked around ~30° plantarflexion for sleep.",
  headline: "From clinical problem to finished device",
  clinicianQuote: {
    quote:
      "Every foot and ankle surgeon knows patients don't like sleeping in their boot. My colleague even built his own splint.",
    name: "Matthew Solan",
    role: "Foot & Ankle Surgeon",
  },
  stats: [
    { value: "400+", label: "3D-printed prototypes" },
    { value: "100+", label: "People tested in development" },
  ],
  story: [
    "Clinical brief: protect plantarflexion when the boot comes off at night",
    "400+ prototypes across different shapes, straps, and shell geometries",
    "Best form: left/right top-of-leg splint with an organic plastic shell",
    "Seven generations refined with feedback from 100+ rupture patients",
  ],
  imageAlt:
    "Seven Thetis Achilles night splint prototypes from first 3D-printed frame to finished product",
} as const;

export const opedPitchDesignReviews = {
  title: "Live sales prove demand",
  intro:
    "Launched in 2022. Over 5,000 sold. Refined through 400+ prototypes into a left/right top-of-leg shell built for ATR sleep protection.",
  productListing: {
    badge: "5,000+ Better Rested Patients",
    title: "The Only Splint for Achilles Tendon Rupture",
    description:
      "Finally, a comfortable solution for sleep. Designed alongside surgeons to protect your healing Achilles tendon while you get the rest you need.",
    rating: 4.1,
    price: "€79.99",
  },
  reviewSnapshot: {
    average: "4.1",
    totalRatings: "303",
    distribution: [
      { stars: 5, percent: 60 },
      { stars: 4, percent: 14 },
      { stars: 3, percent: 8 },
      { stars: 2, percent: 7 },
      { stars: 1, percent: 11 },
    ],
    filters: [
      { label: "All reviews", count: 303, active: true },
      { label: "Amazon", count: 266, active: false },
      { label: "Reviews", count: 25, active: false },
      { label: "Testimonials", count: 12, active: false },
    ],
    showing: "Showing 5 of 303 reviews",
  },
  stats: [
    { value: "4.1", label: "Average rating (global)" },
    { value: "89", label: "Reviews mention comfort" },
    { value: "122", label: "Reviews mention sleep vs boot" },
    { value: "60%", label: "Five-star ratings (combined)" },
  ],
  strengthsTitle: "What works - keep this",
  strengths: [
    {
      label: "Lightweight vs the boot",
      detail:
        "Patients consistently choose it over sleeping in a CAM boot - lighter, cooler, and easier to tolerate for 6–8 hours.",
    },
    {
      label: "Maintains plantarflexion",
      detail:
        "Core clinical job is done: foot stays pointed, tendon protected, boot can come off at night.",
    },
    {
      label: "Quick to apply",
      detail: "Seconds to put on and remove - important at 2am bathroom trips.",
    },
    {
      label: "Stays secure when adjusted",
      detail:
        "Many reviewers sleep through the night once strap tension and a sock layer are dialled in.",
    },
  ],
  improvementsTitle: "What to improve - OPED redesign brief",
  improvements: [
    {
      label: "Shin & forefoot padding",
      detail:
        "Most common 4-star feedback: more cushioning at the shin and front of the foot.",
    },
    {
      label: "Strap & edge finishing",
      detail:
        "Occasional reports of Velcro edges or stiff front lip - solvable with OPED materials and moulding QA.",
    },
    {
      label: "Heel cup retention",
      detail:
        "Some users want a more locked-in heel - a minor geometry change in a v2 tool.",
    },
    {
      label: "COGS at volume",
      detail:
        "Price sensitivity in reviews reflects small-batch manufacturing today - not the product concept.",
    },
  ],
  featuredReviews: [
    {
      stars: 5,
      title: "Comfortable and fit great",
      quote:
        "Perfect for sleeping. It's comfortable and fit perfectly. Also stayed in place while sleeping. I felt like my ankle was supported better in this than the boot.",
      name: "Shannon",
      country: "US",
      theme: "strength",
    },
    {
      stars: 4,
      title: "Helpful but can use some design tweaks",
      quote:
        "Very helpful for wearing during sleep. Sometimes the heel cup would slip out - could use a better design for that. The front piece can be a bit hard on the front of the foot.",
      name: "Amazon reviewer",
      country: "US",
      theme: "improve",
    },
    {
      stars: 5,
      title: "Works perfect overnight",
      quote:
        "The straps are comfortable and stay on overnight. Great alternative to having to sleep in a boot every night.",
      name: "Miguel",
      country: "US",
      theme: "strength",
    },
    {
      stars: 3,
      title: "Excellent idea - comfort can improve",
      quote:
        "Excellent idea but the splint isn't wide enough and doesn't have enough cushioning. It could be so much better if redesigned and comfort improved.",
      name: "Amazon reviewer",
      country: "GB",
      theme: "improve",
    },
  ],
  opedOpportunity:
    "An OPED-branded v2 - retooled padding, strap hardware, and injection-moulding at scale - turns honest 4-star design feedback into a 5-star bundled offer.",
} as const;

export const opedPitchDesignImprovements = {
  title: "How OPED can make it better",
  intro:
    "The reviews validate the category. The criticism is mostly execution detail - exactly where OPED's design, materials, tooling, and manufacturing scale can improve the product.",
} as const;

export const opedPitchPossibleImprovements = {
  eyebrow: "Possible improvements",
  title: "From 4.1 to 4.9 stars",
  intro:
    "Guy has ideas from all the feedback collected across 5,000+ patients and 300+ product reviews. He is happy to share the full improvement plan and work alongside OPED R&D on a v2.",
  currentRating: "4.1",
  targetRating: "4.9",
  body:
    "The reviews validate the category. The criticism is mostly execution detail - padding, strap hardware, heel retention - exactly where OPED's materials, tooling, and injection-moulding scale can close the gap.",
  points: [
    "Structured themes from patient, surgeon, and Amazon review analysis",
    "Prioritised redesign brief ready for OPED industrial design",
    "Guy available to collaborate through tooling, QA, and launch sign-off",
  ],
} as const;

export const opedPitchPartnershipOptions = {
  title: "Partnership with OPED",
  intro: "Two options on the table: licence or acquisition.",
  founderNote:
    "Guy Solan invented the splint and is the sole employee at Thetis Medical. The business is profitable and needs no outside funding. He now runs another company and is looking for a partner that can take the product to more patients.",
  proposalTitle: "Proposal",
  proposal: [
    "Rebrand and industrial redesign under OPED design language",
    "Manufacturing cost target of €7–8 per unit at OPED scale",
    "Launch in Germany and through OPED's global partner network",
    "Launch the VACOped 24/7 Premium Recovery Pack (boot + EVENup + splint) in every market",
  ],
  options: [
    {
      id: "license",
      label: "Option 1",
      title: "Licence",
      summary:
        "OPED licences Thetis IP and regulatory assets. Thetis supports the transition; OPED owns manufacturing, brand, and distribution.",
      points: [
        "Royalty or per-unit licence fee",
        "Know-how transfer and clinical support",
        "Fastest path to market under OPED branding",
      ],
    },
    {
      id: "buy",
      label: "Option 2",
      title: "Acquire",
      summary:
        "OPED acquires the splint business outright - IP, regulatory files, customer base, and manufacturing.",
      points: [
        "Full ownership of category and margin",
        "Single integration, no ongoing royalty",
        "Guy steps back after handover; assets fold into OPED",
      ],
    },
  ],
} as const;

export const opedPitchSalesChart = {
  title: "Splints sold per year",
  subtitle: "Growth achieved with ~90% of sales direct to patients.",
  history: [
    { year: "2022", units: 350 },
    { year: "2023", units: 900 },
    { year: "2024", units: 1650 },
    { year: "2025", units: 2100 },
    { year: "2026", units: 2600 },
  ],
  projection: {
    year: "2027",
    yearLabel: "2027 (OPED)",
    units: 5000,
  },
} as const;

export const opedPitchNhsEvidence = {
  title: "How it works in the NHS",
  intro:
    "NHS trusts use the splint instead of a plaster cast on the acute pathway - replacing plaster in A&E and getting patients to specialist review faster.",
  headline: "Splint instead of plaster in A&E",
  body:
    "NHS trusts use the Thetis splint on the acute pathway - replacing plaster casts and getting patients to specialist review faster.",
} as const;

export const opedPitchSalesProof = {
  title: "Launched online - and into NHS hospitals",
  intro:
    "Over 90% of units sell direct-to-consumer: patients find us at night when the boot stops them sleeping. We also supply NHS hospitals that use the splint instead of plaster cast on the acute pathway - cutting days off time to specialist review.",
  channels: [
    {
      value: "90%+",
      label: "Sold direct-to-consumer",
      detail: "Patients search when the boot stops them sleeping",
    },
    {
      value: "NHS",
      label: "Hospital acute pathway",
      detail: "Splint instead of plaster cast in A&E",
    },
  ],
  nhs: {
    headline: "Splint instead of plaster in A&E",
    body:
      "Royal Surrey NHS Trust, Epsom & St Helier University Hospitals, and St John & St Elizabeth Hospital use the Thetis splint on the acute pathway - replacing plaster casts and getting patients to specialist review faster.",
    evidenceHref: "/evidence#trauma-splint-qip",
    evidenceLabel: "Full evidence at thetismedical.com/evidence",
  },
} as const;

export const opedPitchWhyOpedNow = {
  title: "Why now",
  intro:
    "Thetis is profitable and growing without outside funding. Guy Solan invented the splint and is the sole employee. He now runs another company and wants to hand the product to a partner that can reach more patients.",
  growthPoints: [
    {
      label: "Steady unit growth",
      value: "350 → 2,600 units (2022–2026), before OPED distribution",
    },
    {
      label: "90% direct to patient",
      value:
        "~90% sold direct to patients today - OPED can unlock clinical and wholesale channels",
    },
    {
      label: "Proven pull-through",
      value:
        "Patients search online when clinics don't stock it - OPED removes that friction",
    },
  ],
} as const;
