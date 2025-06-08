// data.ts
import type {
    Country,
    EquipmentTag,
    EquipmentUsage,
    JourneyDataPoint,
    Stage,
    TimelineComparison,
    WalkingAid,
} from "./types";

export const countries: Country[] = [
    { id: "usa", name: "USA", flagCode: "us" },
    { id: "canada", name: "Canada", flagCode: "ca" },
    { id: "australia", name: "Australia", flagCode: "au" },
    { id: "uk", name: "UK", flagCode: "gb" },
    { id: "germany", name: "Germany", flagCode: "de" },
    { id: "france", name: "France", flagCode: "fr" },
];

export const stages: Stage[] = [
    {
        id: "injury",
        title: "Injury Occurrence",
        icon: "injury",
        description: "Initial rupture and immediate symptoms",
        timeframe: "Day 0",
    },
    {
        id: "initial-evaluation",
        title: "Initial Evaluation",
        icon: "hospital",
        description: "First medical assessment and immediate care",
        timeframe: "Day 0-1",
    },
    {
        id: "imaging",
        title: "Imaging & Diagnosis",
        icon: "ultrasound",
        description: "Confirming the rupture through medical imaging",
        timeframe: "Day 0-14",
    },
    {
        id: "specialist",
        title: "Specialist Referral",
        icon: "doctor",
        description: "Consultation with orthopedic specialist",
        timeframe: "Week 1-4",
    },
    {
        id: "treatment-decision",
        title: "Treatment Decision",
        icon: "decision",
        description: "Choosing between surgical and non-surgical approaches",
        timeframe: "Week 1-4",
    },
    {
        id: "surgery",
        title: "Surgery (if chosen)",
        icon: "surgery",
        description: "Surgical repair of the ruptured tendon",
        timeframe: "Week 1-8",
    },
    {
        id: "immobilization",
        title: "Boot/Immobilization & Rehab",
        icon: "boot",
        description: "Progressive recovery and rehabilitation",
        timeframe: "Week 0-12",
    },
    {
        id: "return",
        title: "Return to Sport",
        icon: "sport",
        description: "Resuming normal activities and sports",
        timeframe: "Month 6-12",
    },
];

export const journeyData: JourneyDataPoint[] = [
    // Injury
    {
        stageId: "injury",
        countryId: "usa",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians:
            "Initially self-managed; may seek telehealth guidance from:",
    },
    {
        stageId: "injury",
        countryId: "canada",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians: "Initially self-managed; may contact telehealth services",
    },
    {
        stageId: "injury",
        countryId: "australia",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians:
            "Initially self-managed; may contact team physiotherapist if during organized sports",
    },
    {
        stageId: "injury",
        countryId: "uk",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians: "Initially self-managed; may contact NHS 111",
    },
    {
        stageId: "injury",
        countryId: "germany",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians:
            "Initially self-managed; may contact Hausarzt (family doctor)",
    },
    {
        stageId: "injury",
        countryId: "france",
        timing: "Day 0",
        description:
            "Sports/exertion; sudden 'pop' with pain. No equipment used.",
        clinicians:
            "Initially self-managed; may contact médecin traitant (primary care doctor)",
    },

    // Initial Evaluation
    {
        stageId: "initial-evaluation",
        countryId: "usa",
        timing: "Same day in ER/Urgent Care",
        equipment:
            "Either below-knee plaster backslab or CAM boot with heel wedges. Crutches for non-weight-bearing.",
        clinicians:
            "Emergency medicine physicians, PAs, or NPs. Teaching hospitals may involve podiatrists or orthopedic residents.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "canada",
        timing: "Same day in ER/GP evaluation",
        equipment:
            "Below-knee plaster backslab most common. Some centers use removable boots. Crutches for non-weight-bearing.",
        clinicians:
            "Emergency physicians, family physicians, or nurse practitioners.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "australia",
        timing: "Same day in ER/GP",
        equipment:
            "Traditionally plaster backslab, though some centers now use removable boots. Crutches for non-weight-bearing.",
        clinicians: "Emergency physicians, GPs, or advanced practice nurses.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "uk",
        timing: "Same day via GP/A&E",
        equipment:
            "Varies: plaster backslab, Thetis splint, or removable boot. Some use splint and boot combination. Crutches for non-weight-bearing.",
        clinicians:
            "A&E doctors, emergency nurse practitioners, or GPs. Some A&Es have dedicated fracture clinics.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "germany",
        timing: "Immediate evaluation in ER or direct orthopaedic referral",
        equipment:
            "Preference for VACOped boot when available, otherwise plaster backslab. Crutches for non-weight-bearing.",
        clinicians:
            "Unfallchirurgen (trauma surgeons) often directly involved, even in emergency settings.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "france",
        timing: "Same day in ER or GP",
        equipment:
            "Traditional plaster backslab most common, though some centers use VACOped boots. Crutches for non-weight-bearing.",
        clinicians:
            "Emergency physicians or GPs. Sometimes direct referral to orthopedic specialists.",
    },

    // Imaging
    {
        stageId: "imaging",
        countryId: "usa",
        timing: "Same day or within 1-2 days.",
        description:
            "MRI preferred for detailed assessment (approximately 70% of cases); ultrasound used in some centers (30% of cases).",
        clinicians:
            "Radiologists interpret imaging. Orthopedic surgeons review results.",
    },
    {
        stageId: "imaging",
        countryId: "canada",
        timing: "Within 1-14 days depending on urgency and location.",
        description:
            "Ultrasound is standard (80% of cases); MRI reserved for complex cases (20% of cases).",
        clinicians:
            "Radiologists perform interpretation. Public system may have longer wait times for non-urgent MRI.",
    },
    {
        stageId: "imaging",
        countryId: "australia",
        timing: "Within 1-7 days.",
        description:
            "Ultrasound preferred (75% of cases); MRI for complex cases (25% of cases).",
        clinicians:
            "Radiologists and sonographers perform and interpret imaging.",
    },
    {
        stageId: "imaging",
        countryId: "uk",
        timing: "Can range from same day to 3 weeks in NHS system.",
        description:
            "Ultrasound is standard (85% of cases); MRI less commonly used initially (15% of cases).",
        clinicians:
            "Radiologists and sonographers. NHS wait times vary significantly by region.",
    },
    {
        stageId: "imaging",
        countryId: "germany",
        timing: "Usually within 1-5 days.",
        description:
            "Ultrasound is standard (70% of cases); MRI for complex cases (30% of cases).",
        clinicians:
            "Radiologists (Radiologen) work closely with orthopedic specialists.",
    },
    {
        stageId: "imaging",
        countryId: "france",
        timing: "Typically within 1-7 days.",
        description:
            "Ultrasound initially (80% of cases); MRI if needed for surgical planning (20% of cases).",
        clinicians: "Radiologists (radiologues) perform and interpret imaging.",
    },

    // Specialist
    {
        stageId: "specialist",
        countryId: "usa",
        timing: "Within 1-10 days depending on insurance and location.",
        description:
            "Consultation with orthopedic surgeon or sports medicine specialist.",
        clinicians:
            "Orthopedic surgeons specializing in foot/ankle or sports medicine. Some regions use podiatric surgeons (DPMs).",
    },
    {
        stageId: "specialist",
        countryId: "canada",
        timing: "Within 1-3 weeks depending on province and urgency.",
        description:
            "Referral to orthopedic surgeon for assessment and treatment planning.",
        clinicians:
            "Orthopedic surgeons, often with foot/ankle specialization.",
    },
    {
        stageId: "specialist",
        countryId: "australia",
        timing: "Within 1-2 weeks.",
        description: "Orthopedic consultation for treatment planning.",
        clinicians:
            "Orthopedic surgeons, often with sports medicine or foot/ankle specialization.",
    },
    {
        stageId: "specialist",
        countryId: "uk",
        timing: "Can range from 1-4 weeks in NHS system.",
        description: "Referral to orthopedic team via fracture clinic pathway.",
        clinicians:
            "Orthopedic consultants and registrars. Some centers have specialized foot/ankle consultants.",
    },
    {
        stageId: "specialist",
        countryId: "germany",
        timing: "Usually within 1-5 days.",
        description: "Direct consultation with orthopedic specialist.",
        clinicians:
            "Orthopäden (orthopedic specialists) or Unfallchirurgen (trauma surgeons) with specific training in tendon injuries.",
    },
    {
        stageId: "specialist",
        countryId: "france",
        timing: "Typically within 1-10 days.",
        description:
            "Consultation with orthopedic surgeon for treatment planning.",
        clinicians:
            "Chirurgiens orthopédistes (orthopedic surgeons), often with specialization in sports medicine or foot/ankle.",
    },

    // Treatment Decision
    {
        stageId: "treatment-decision",
        countryId: "usa",
        timing: "During specialist consultation",
        description:
            "Shared decision-making with ~60-70% receiving surgery, higher rates for athletes and younger patients.",
        clinicians:
            "Orthopedic surgeons or podiatric surgeons (DPMs) lead decision-making. Insurance coverage may influence options.",
    },
    {
        stageId: "treatment-decision",
        countryId: "canada",
        timing: "During specialist consultation",
        description:
            "~50-60% receive surgery. Growing trend toward non-surgical management for appropriate cases.",
        clinicians:
            "Orthopedic surgeons lead decision-making. Multidisciplinary approach in academic centers.",
    },
    {
        stageId: "treatment-decision",
        countryId: "australia",
        timing: "During specialist consultation",
        description:
            "~40-50% receive surgery. Strong trend toward non-surgical management based on recent research.",
        clinicians:
            "Orthopedic surgeons lead decision-making with physiotherapist input on rehabilitation potential.",
    },
    {
        stageId: "treatment-decision",
        countryId: "uk",
        timing: "During specialist consultation",
        description:
            "~30-40% receive surgery in NHS. Strong preference for non-surgical management following UK STAR trial results.",
        clinicians:
            "Orthopedic consultants lead decision-making. Specialized physiotherapists often involved in non-surgical pathway discussions.",
    },
    {
        stageId: "treatment-decision",
        countryId: "germany",
        timing: "During specialist consultation",
        description:
            "~70-80% receive surgery. Strong preference for surgical management, especially for active patients.",
        clinicians:
            "Orthopedic specialists make recommendations with integrated rehabilitation planning.",
    },
    {
        stageId: "treatment-decision",
        countryId: "france",
        timing: "During specialist consultation",
        description:
            "~60-70% receive surgery. Decision heavily influenced by patient's activity level and goals.",
        clinicians:
            "Orthopedic surgeons lead decision-making with multidisciplinary input in specialized centers.",
    },

    // Surgery
    {
        stageId: "surgery",
        countryId: "usa",
        timing: "Within 1-2 weeks of decision, if chosen.",
        description:
            "Minimally invasive techniques growing in popularity (~30-40% of cases).",
        equipment: "Outpatient procedure with regional or general anesthesia.",
        clinicians:
            "Orthopedic surgeons or podiatric surgeons (DPMs) perform the procedure.",
    },
    {
        stageId: "surgery",
        countryId: "canada",
        timing: "Within 2-6 weeks of decision, if chosen.",
        description:
            "Open repair most common (~80%); minimally invasive techniques limited to specialized centers.",
        equipment:
            "Typically inpatient with overnight stay; regional or general anesthesia.",
        clinicians: "Orthopedic surgeons perform the procedure.",
    },
    {
        stageId: "surgery",
        countryId: "australia",
        timing:
            "Within 1-2 weeks in private system; 2-4 weeks in public system.",
        description:
            "Mix of open (~70%) and minimally invasive (~30%) techniques.",
        equipment:
            "Often outpatient procedure; some cases require overnight stay.",
        clinicians: "Orthopedic surgeons perform the procedure.",
    },
    {
        stageId: "surgery",
        countryId: "uk",
        timing: "Within 1-2 weeks for acute cases if surgery chosen.",
        description:
            "Open repair most common in NHS (~85%); minimally invasive options limited to specialized centers.",
        equipment:
            "Often day surgery with regional anesthesia; some cases require overnight stay.",
        clinicians:
            "Orthopedic consultants or specialized foot/ankle surgeons perform the procedure.",
    },
    {
        stageId: "surgery",
        countryId: "germany",
        timing: "Usually within 1 week of decision.",
        description:
            "Mix of techniques with growing adoption of minimally invasive approaches (~40%).",
        equipment:
            "Often inpatient with 2-3 day stay; regional or general anesthesia.",
        clinicians:
            "Orthopedic specialists or trauma surgeons perform the procedure.",
    },
    {
        stageId: "surgery",
        countryId: "france",
        timing: "Within 1-2 weeks of decision.",
        description:
            "Open repair most common (~75%); minimally invasive techniques in specialized centers.",
        equipment:
            "Typically inpatient with 1-2 day stay; regional or general anesthesia.",
        clinicians: "Orthopedic surgeons perform the procedure.",
    },

    // Immobilization & Rehab
    {
        stageId: "immobilization",
        countryId: "usa",
        timing: "Week 0-12",
        description:
            "Early controlled motion in ~70% of centers. Non-weight-bearing period typically 2-4 weeks.",
        equipment:
            "Removable boot with heel wedges. ~20% still use plaster for initial 2 weeks post-surgery.",
        clinicians:
            "Physical therapists lead rehabilitation with regular orthopedic follow-up.",
    },
    {
        stageId: "immobilization",
        countryId: "canada",
        timing: "Week 0-12",
        description:
            "Mix of early motion (~60%) and traditional protocols. Non-weight-bearing typically 4-6 weeks.",
        equipment:
            "Removable boot with decreasing heel wedges. ~30% still use plaster for initial period.",
        clinicians:
            "Physiotherapists manage rehabilitation with periodic orthopedic follow-up.",
    },
    {
        stageId: "immobilization",
        countryId: "australia",
        timing: "Week 0-12",
        description:
            "Early controlled motion in ~65% of centers. Non-weight-bearing typically 2-4 weeks.",
        equipment:
            "Removable boot with adjustable heel wedges. ~15% still use plaster initially.",
        clinicians:
            "Physiotherapists lead rehabilitation with orthopedic follow-up at key milestones.",
    },
    {
        stageId: "immobilization",
        countryId: "uk",
        timing: "Week 0-12",
        description:
            "Early weight-bearing in ~75% of centers following UK STAR trial influence.",
        equipment:
            "Removable boot with heel wedges. VACOped boots in ~30% of centers. ~10% still use plaster initially.",
        clinicians:
            "Physiotherapists manage rehabilitation. Extended scope physiotherapists may lead entire non-surgical pathway in some centers.",
    },
    {
        stageId: "immobilization",
        countryId: "germany",
        timing: "Week 0-12",
        description:
            "Structured rehabilitation with precise protocols. Non-weight-bearing typically 2-4 weeks.",
        equipment:
            "VACOped boots common (~70%), allowing controlled range of motion. ~5% still use plaster initially.",
        clinicians:
            "Physiotherapists work closely with orthopedic specialists throughout rehabilitation.",
    },
    {
        stageId: "immobilization",
        countryId: "france",
        timing: "Week 0-12",
        description:
            "Mix of traditional and accelerated protocols. Non-weight-bearing typically 3-6 weeks.",
        equipment:
            "Removable boot or VACOped (~40%). ~25% still use plaster for initial 2-3 weeks.",
        clinicians:
            "Kinésithérapeutes lead rehabilitation with regular orthopedic follow-up.",
    },

    // Return to Sport
    {
        stageId: "return",
        countryId: "usa",
        timing: "Month 6-12",
        description:
            "Progressive return to sports with ~80% returning to previous level. Average return to running at 6-7 months.",
        equipment:
            "Supportive athletic footwear. ~30% use ankle braces or compression sleeves initially.",
        clinicians:
            "Physical therapists guide return-to-sport protocols. Sports medicine physicians provide clearance.",
    },
    {
        stageId: "return",
        countryId: "canada",
        timing: "Month 6-12",
        description:
            "Gradual return with ~75% returning to previous level. Average return to running at 7-8 months.",
        equipment: "Supportive footwear. ~25% use compression sleeves.",
        clinicians:
            "Physiotherapists guide return-to-sport progression. Sports medicine physicians may provide final clearance.",
    },
    {
        stageId: "return",
        countryId: "australia",
        timing: "Month 6-12",
        description:
            "Structured return with ~75% returning to previous level. Average return to running at 6-7 months.",
        equipment:
            "Supportive footwear. ~40% use compression garments during activity.",
        clinicians: "Sports physiotherapists lead return-to-sport protocols.",
    },
    {
        stageId: "return",
        countryId: "uk",
        timing: "Month 6-12",
        description:
            "Gradual return with ~70% returning to previous level. Average return to running at 7-9 months.",
        equipment:
            "Supportive footwear. ~20% use compression sleeves during high-impact activities.",
        clinicians:
            "Physiotherapists guide return-to-sport progression. Some specialized centers offer biomechanical assessment.",
    },
    {
        stageId: "return",
        countryId: "germany",
        timing: "Month 6-9",
        description:
            "Structured return with ~85% returning to previous level. Average return to running at 6 months.",
        equipment: "Supportive footwear with consideration for biomechanics.",
        clinicians:
            "Physiotherapists and sports medicine specialists collaborate on return-to-sport protocols.",
    },
    {
        stageId: "return",
        countryId: "france",
        timing: "Month 6-9",
        description:
            "Progressive return with ~80% returning to previous level. Average return to running at 6-7 months.",
        equipment:
            "Supportive footwear. ~35% use compression garments during initial return.",
        clinicians:
            "Kinésithérapeutes specializing in sports rehabilitation guide return-to-sport progression.",
    },
];

export const timelineComparison: TimelineComparison[] = [
    // Imaging
    { stageId: "imaging", countryId: "usa", daysToComplete: 1 },
    { stageId: "imaging", countryId: "canada", daysToComplete: 14 },
    { stageId: "imaging", countryId: "australia", daysToComplete: 7 },
    { stageId: "imaging", countryId: "uk", daysToComplete: 21 },
    { stageId: "imaging", countryId: "germany", daysToComplete: 5 },
    { stageId: "imaging", countryId: "france", daysToComplete: 7 },

    // Specialist
    { stageId: "specialist", countryId: "usa", daysToComplete: 10 },
    { stageId: "specialist", countryId: "canada", daysToComplete: 21 },
    { stageId: "specialist", countryId: "australia", daysToComplete: 14 },
    { stageId: "specialist", countryId: "uk", daysToComplete: 28 },
    { stageId: "specialist", countryId: "germany", daysToComplete: 5 },
    { stageId: "specialist", countryId: "france", daysToComplete: 10 },

    // Surgery
    { stageId: "surgery", countryId: "usa", daysToComplete: 10 },
    { stageId: "surgery", countryId: "canada", daysToComplete: 42 },
    { stageId: "surgery", countryId: "australia", daysToComplete: 14 },
    { stageId: "surgery", countryId: "uk", daysToComplete: 10 },
    { stageId: "surgery", countryId: "germany", daysToComplete: 7 },
    { stageId: "surgery", countryId: "france", daysToComplete: 10 },

    // Return to Sport
    { stageId: "return", countryId: "usa", daysToComplete: 270 }, // 9 months
    { stageId: "return", countryId: "canada", daysToComplete: 270 },
    { stageId: "return", countryId: "australia", daysToComplete: 270 },
    { stageId: "return", countryId: "uk", daysToComplete: 270 },
    { stageId: "return", countryId: "germany", daysToComplete: 225 }, // 7.5 months
    { stageId: "return", countryId: "france", daysToComplete: 225 },
];

export const insights = [
    "The recovery timeline is remarkably similar across countries, with most differences being in healthcare system access rather than medical approach.",
    "Germany and France appear to favor the VACOped boot system, which may offer more precise control than standard CAM/Aircast boots.",
    "The UK NHS system shows the longest potential delays for specialist referral (up to 6 weeks).",
    "Return to sport timelines are consistent (6-12 months) across all countries, suggesting this is based on biological healing rather than healthcare differences.",
    "Splints are more commonly used in the UK and US healthcare systems, while being less prevalent in continental European approaches.",
];

export const potentialInaccuracies = [
    "This data is based on typical pathways and may not reflect significant regional variations within countries, especially between major urban centers and rural areas.",
    "Treatment approaches can vary substantially between individual hospitals and clinicians even within the same region, which this overview cannot fully capture.",
    "The comparison relies partly on anecdotal evidence from practitioners rather than comprehensive statistical data across all healthcare facilities.",
    "Access to specialized equipment like VACOped boots may be inconsistent even within countries where they're described as common.",
    "Wait times for specialist referrals are presented as ranges but can vary dramatically based on local healthcare system capacity and patient prioritization.",
];

export const equipmentTags: EquipmentTag[] = [
    {
        id: "vacoped",
        name: "VACOped Boot",
        description: "Premium adjustable boot with precise angle control",
        color: "blue",
    },
    {
        id: "thetis-splint",
        name: "Thetis Splint",
        description: "Specialized splint for maintaining ankle position",
        color: "green",
    },
    {
        id: "cam-boot",
        name: "CAM Boot with Wedges",
        description: "Standard removable boot with adjustable wedges",
        color: "gray",
    },
    {
        id: "basic-boot",
        name: "Basic Boot with Wedges",
        description: "Basic removable boot with manual wedge adjustment",
        color: "yellow",
    },
    {
        id: "plaster-cast",
        name: "Plaster Cast/Backslab",
        description: "Traditional non-removable plaster immobilization",
        color: "white",
    },
];

export const equipmentUsage: EquipmentUsage[] = [
    // Initial Evaluation stage
    {
        equipmentId: "vacoped",
        countryId: "germany",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "vacoped",
        countryId: "france",
        stageId: "initial-evaluation",
        isCommon: false,
    },
    {
        equipmentId: "thetis-splint",
        countryId: "uk",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "cam-boot",
        countryId: "usa",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "cam-boot",
        countryId: "australia",
        stageId: "initial-evaluation",
        isCommon: false,
    },
    {
        equipmentId: "basic-boot",
        countryId: "uk",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "plaster-cast",
        countryId: "uk",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "plaster-cast",
        countryId: "usa",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    {
        equipmentId: "plaster-cast",
        countryId: "canada",
        stageId: "initial-evaluation",
        isCommon: true,
    },
    // Add more equipment usage data for other stages...
];
