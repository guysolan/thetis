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
        timeframe: "Week 1-6",
    },
    {
        id: "treatment-decision",
        title: "Treatment Decision",
        icon: "decision",
        description: "Choosing between surgical and non-surgical approaches",
        timeframe: "Week 1-6",
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
            "Either below-knee plaster backslab or immediate CAM boot with heel wedges. Crutches provided for non-weight-bearing.",
        clinicians:
            "Emergency medicine physicians, physician assistants (PAs), or nurse practitioners (NPs). In some cases, podiatrists (DPMs) or orthopedic residents may be involved in the initial assessment, especially in teaching hospitals.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "canada",
        timing: "Same day in ER/GP evaluation",
        equipment:
            "Below-knee plaster backslab most common. Some centers use removable boots initially. Crutches provided for non-weight-bearing.",
        clinicians:
            "Emergency physicians, family physicians, or nurse practitioners. Orthopedic residents may be consulted in larger hospitals.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "australia",
        timing: "Same day in ER/GP",
        equipment:
            "Below-knee plaster backslab traditionally used, though some centers now use removable boots initially. Crutches provided for non-weight-bearing.",
        clinicians:
            "Emergency physicians, GPs, or advanced practice nurses. Some sports medicine clinics may have physiotherapists involved in initial assessment.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "uk",
        timing: "Same day via GP/A&E",
        equipment:
            "Varies by center: traditional plaster backslab, Thetis Medical night splint, or removable boot. Some centers use combination of night splint and boot. Crutches provided for non-weight-bearing.",
        clinicians:
            "A&E doctors, emergency nurse practitioners, or GPs. Some A&E departments have dedicated fracture clinics with specialized nurses or physiotherapists.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "germany",
        timing: "Immediate evaluation in ER or direct orthopaedic referral",
        equipment:
            "Preference for VACOped boot when available, otherwise plaster backslab. Crutches provided for non-weight-bearing.",
        clinicians:
            "Unfallchirurgen (trauma surgeons) are often directly involved in initial assessment, even in emergency settings. Orthopedic specialists may be consulted early.",
    },
    {
        stageId: "initial-evaluation",
        countryId: "france",
        timing: "Same day in ER or GP",
        equipment:
            "Traditional plaster backslab most common, though some centers use VACOped boots. Crutches provided for non-weight-bearing.",
        clinicians:
            "Emergency physicians or general practitioners. In some cases, direct referral to orthopedic specialists (chirurgiens orthopédistes) may occur.",
    },

    // Imaging
    {
        stageId: "imaging",
        countryId: "usa",
        timing: "Same day or within 1-2 days.",
        description:
            "MRI or ultrasound to confirm diagnosis and assess severity.",
        clinicians:
            "Radiologists interpret imaging. Orthopedic surgeons or podiatrists (DPMs) may order and review results. Sports medicine physicians may be involved in athletic populations.",
    },
    {
        stageId: "imaging",
        countryId: "canada",
        timing: "Within 1-14 days depending on urgency and location.",
        description: "Ultrasound is common; MRI may be used in complex cases.",
        clinicians:
            "Radiologists perform interpretation. Orthopedic surgeons review results. Wait times for non-urgent MRI can be longer in public healthcare system.",
    },
    {
        stageId: "imaging",
        countryId: "australia",
        timing: "Within 1-7 days.",
        description: "Ultrasound is preferred; MRI for complex cases.",
        clinicians:
            "Radiologists and sonographers perform and interpret imaging. Sports medicine physicians may expedite imaging for athletes.",
    },
    {
        stageId: "imaging",
        countryId: "uk",
        timing: "Can range from same day to 3 weeks in NHS system.",
        description:
            "Ultrasound is standard; MRI less commonly used initially.",
        clinicians:
            "Radiologists and sonographers. Some specialized musculoskeletal radiologists in larger centers. Extended scope physiotherapists may be involved in requesting imaging.",
    },
    {
        stageId: "imaging",
        countryId: "germany",
        timing: "Usually within 1-5 days.",
        description: "Ultrasound is standard; MRI for complex cases.",
        clinicians:
            "Radiologists (Radiologen) work closely with orthopedic specialists. Integrated care model means faster access to specialized imaging.",
    },
    {
        stageId: "imaging",
        countryId: "france",
        timing: "Typically within 1-7 days.",
        description:
            "Ultrasound initially; MRI if needed for surgical planning.",
        clinicians:
            "Radiologists (radiologues) perform and interpret imaging. Close coordination with orthopedic specialists.",
    },

    // Specialist
    {
        stageId: "specialist",
        countryId: "usa",
        timing: "Within 1-10 days depending on insurance and location.",
        description:
            "Consultation with orthopedic surgeon or sports medicine specialist.",
        clinicians:
            "Orthopedic surgeons specializing in foot/ankle or sports medicine. In some regions, podiatric surgeons (DPMs) may manage Achilles ruptures. Physical therapists may be consulted early for pre-surgical assessment.",
    },
    {
        stageId: "specialist",
        countryId: "canada",
        timing: "Within 1-3 weeks depending on province and urgency.",
        description:
            "Referral to orthopedic surgeon for assessment and treatment planning.",
        clinicians:
            "Orthopedic surgeons, often with foot/ankle specialization. Sports medicine physicians may be involved for athletic populations. Physiotherapists may be consulted for pre-treatment assessment.",
    },
    {
        stageId: "specialist",
        countryId: "australia",
        timing: "Within 1-2 weeks.",
        description: "Orthopedic consultation for treatment planning.",
        clinicians:
            "Orthopedic surgeons, often with sports medicine or foot/ankle specialization. Physiotherapists may be involved in early assessment.",
    },
    {
        stageId: "specialist",
        countryId: "uk",
        timing: "Can range from 1-6 weeks in NHS system.",
        description: "Referral to orthopedic team via fracture clinic pathway.",
        clinicians:
            "Orthopedic consultants and registrars. Some centers have specialized foot/ankle consultants. Extended scope physiotherapists may be involved in fracture clinics and help manage non-surgical cases.",
    },
    {
        stageId: "specialist",
        countryId: "germany",
        timing: "Usually within 1-5 days.",
        description: "Direct consultation with orthopedic specialist.",
        clinicians:
            "Orthopäden (orthopedic specialists) or Unfallchirurgen (trauma surgeons) with specific training in tendon injuries. Integrated approach with physiotherapists (Physiotherapeuten).",
    },
    {
        stageId: "specialist",
        countryId: "france",
        timing: "Typically within 1-10 days.",
        description:
            "Consultation with orthopedic surgeon for treatment planning.",
        clinicians:
            "Chirurgiens orthopédistes (orthopedic surgeons), often with specialization in sports medicine or foot/ankle. Kinésithérapeutes (physiotherapists) may be consulted early.",
    },

    // Treatment Decision
    {
        stageId: "treatment-decision",
        countryId: "usa",
        timing: "During specialist consultation",
        description:
            "Shared decision-making between surgeon and patient, considering age, activity level, and comorbidities.",
        clinicians:
            "Orthopedic surgeons or podiatric surgeons (DPMs) lead decision-making. Physical therapists may provide input on rehabilitation considerations. Insurance coverage may influence options.",
    },
    {
        stageId: "treatment-decision",
        countryId: "canada",
        timing: "During specialist consultation",
        description:
            "Discussion of surgical vs. non-surgical approaches based on evidence and patient factors.",
        clinicians:
            "Orthopedic surgeons lead decision-making. Physiotherapists may be consulted for input on non-surgical management. Multidisciplinary approach in academic centers.",
    },
    {
        stageId: "treatment-decision",
        countryId: "australia",
        timing: "During specialist consultation",
        description:
            "Evidence-based discussion of options, with growing trend toward non-surgical management.",
        clinicians:
            "Orthopedic surgeons lead decision-making. Physiotherapists often involved in discussions about rehabilitation potential with each approach.",
    },
    {
        stageId: "treatment-decision",
        countryId: "uk",
        timing: "During specialist consultation",
        description:
            "Growing preference for non-surgical management in NHS, with surgical options for specific cases.",
        clinicians:
            "Orthopedic consultants lead decision-making. Specialized physiotherapists often involved in non-surgical pathway discussions. Multidisciplinary approach in specialized centers.",
    },
    {
        stageId: "treatment-decision",
        countryId: "germany",
        timing: "During specialist consultation",
        description:
            "Detailed discussion of options with tendency toward surgical management for active patients.",
        clinicians:
            "Orthopedic specialists make recommendations. Physiotherapists provide input on rehabilitation considerations. Integrated approach between surgical and rehabilitation teams.",
    },
    {
        stageId: "treatment-decision",
        countryId: "france",
        timing: "During specialist consultation",
        description:
            "Discussion of options with consideration of patient's activity level and goals.",
        clinicians:
            "Orthopedic surgeons lead decision-making. Kinésithérapeutes may be consulted for rehabilitation planning. Multidisciplinary approach in specialized centers.",
    },

    // Surgery
    {
        stageId: "surgery",
        countryId: "usa",
        timing: "Within 1-2 weeks of decision, if chosen.",
        description:
            "Minimally invasive or open repair techniques depending on surgeon preference and case complexity.",
        equipment:
            "Various surgical approaches; typically outpatient procedure with regional or general anesthesia.",
        clinicians:
            "Orthopedic surgeons or podiatric surgeons (DPMs) perform the procedure. Anesthesiologists, surgical nurses, and physician assistants (PAs) assist. Physical therapists often consult pre-discharge.",
    },
    {
        stageId: "surgery",
        countryId: "canada",
        timing: "Within 2-6 weeks of decision, if chosen.",
        description:
            "Open repair most common; some centers offer minimally invasive techniques.",
        equipment:
            "Typically inpatient with overnight stay; regional or general anesthesia.",
        clinicians:
            "Orthopedic surgeons perform the procedure. Anesthesiologists and surgical team assist. Physiotherapists provide post-operative guidance before discharge.",
    },
    {
        stageId: "surgery",
        countryId: "australia",
        timing:
            "Within 1-2 weeks of decision in private system; 2-4 weeks in public system.",
        description:
            "Open or minimally invasive techniques depending on surgeon preference.",
        equipment:
            "Often outpatient procedure; some cases require overnight stay.",
        clinicians:
            "Orthopedic surgeons perform the procedure. Anesthesiologists and surgical team assist. Physiotherapists provide early post-operative guidance.",
    },
    {
        stageId: "surgery",
        countryId: "uk",
        timing: "Within 1-2 weeks for acute cases if surgery chosen.",
        description:
            "Open repair most common in NHS; some specialized centers offer minimally invasive options.",
        equipment:
            "Often day surgery with regional anesthesia; some cases require overnight stay.",
        clinicians:
            "Orthopedic consultants or specialized foot/ankle surgeons perform the procedure. Anesthesiologists and surgical team assist. Physiotherapists provide post-operative guidance.",
    },
    {
        stageId: "surgery",
        countryId: "germany",
        timing: "Usually within 1 week of decision.",
        description:
            "Various techniques available; strong emphasis on surgical precision.",
        equipment:
            "Often inpatient with 2-3 day stay; regional or general anesthesia.",
        clinicians:
            "Orthopedic specialists or trauma surgeons perform the procedure. Anesthesiologists and surgical team assist. Physiotherapists begin early mobilization protocols during hospital stay.",
    },
    {
        stageId: "surgery",
        countryId: "france",
        timing: "Within 1-2 weeks of decision.",
        description:
            "Open repair most common; some specialized centers offer minimally invasive techniques.",
        equipment:
            "Typically inpatient with 1-2 day stay; regional or general anesthesia.",
        clinicians:
            "Orthopedic surgeons perform the procedure. Anesthesiologists and surgical team assist. Kinésithérapeutes begin early rehabilitation during hospital stay.",
    },

    // Immobilization & Rehab
    {
        stageId: "immobilization",
        countryId: "usa",
        timing: "Week 0-12",
        description:
            "Progressive protocol with early controlled motion. Transition from non-weight-bearing to full weight-bearing over 6-12 weeks.",
        equipment:
            "Removable boot with heel wedges that are progressively removed. Transition to supportive shoes with heel lifts.",
        clinicians:
            "Physical therapists lead rehabilitation with regular orthopedic or podiatric follow-up. Athletic trainers may be involved for athletes. Some centers offer specialized Achilles rehabilitation programs.",
    },
    {
        stageId: "immobilization",
        countryId: "canada",
        timing: "Week 0-12",
        description:
            "Structured rehabilitation protocol with gradual increase in weight-bearing and range of motion.",
        equipment:
            "Removable boot with decreasing heel wedges. Transition to supportive footwear around week 8-10.",
        clinicians:
            "Physiotherapists manage rehabilitation with periodic orthopedic follow-up. Public healthcare may limit number of covered physiotherapy sessions.",
    },
    {
        stageId: "immobilization",
        countryId: "australia",
        timing: "Week 0-12",
        description:
            "Early controlled motion protocols becoming more common. Progressive weight-bearing based on healing.",
        equipment:
            "Removable boot with adjustable heel wedges. Transition to normal footwear with heel lifts.",
        clinicians:
            "Physiotherapists lead rehabilitation with orthopedic follow-up at key milestones. Sports physiotherapists often involved for athletic populations.",
    },
    {
        stageId: "immobilization",
        countryId: "uk",
        timing: "Week 0-12",
        description:
            "Structured rehabilitation with emphasis on functional recovery. Early weight-bearing becoming more common.",
        equipment:
            "Removable boot with heel wedges. VACOped boots used in some centers. Transition to normal footwear with heel raises.",
        clinicians:
            "Physiotherapists manage rehabilitation through NHS or private practice. Extended scope physiotherapists may lead entire non-surgical pathway in some centers. Orthopedic follow-up at key milestones.",
    },
    {
        stageId: "immobilization",
        countryId: "germany",
        timing: "Week 0-12",
        description:
            "Structured rehabilitation with precise protocols. Emphasis on quality of movement and functional recovery.",
        equipment:
            "VACOped boots common, allowing controlled range of motion. Transition to normal footwear with supportive insoles.",
        clinicians:
            "Physiotherapists work closely with orthopedic specialists throughout rehabilitation. Heilpraktiker (natural health practitioners) may provide complementary treatments in some cases.",
    },
    {
        stageId: "immobilization",
        countryId: "france",
        timing: "Week 0-12",
        description:
            "Structured rehabilitation with emphasis on functional recovery and gait retraining.",
        equipment:
            "Removable boot or VACOped with progressive reduction in plantar flexion. Transition to normal footwear with heel raises.",
        clinicians:
            "Kinésithérapeutes lead rehabilitation with regular orthopedic follow-up. Podologues (podiatrists) may provide gait analysis and custom insoles during later stages.",
    },

    // Return to Sport
    {
        stageId: "return",
        countryId: "usa",
        timing: "Month 6-12",
        description:
            "Progressive return to sports with emphasis on strength, power, and sport-specific movements.",
        equipment:
            "Supportive athletic footwear. Some use ankle braces or compression sleeves initially.",
        clinicians:
            "Physical therapists guide return-to-sport protocols. Sports medicine physicians or orthopedic surgeons provide clearance. Athletic trainers often involved for competitive athletes. Some utilize specialized return-to-sport testing.",
    },
    {
        stageId: "return",
        countryId: "canada",
        timing: "Month 6-12",
        description:
            "Gradual return to sports with functional testing to ensure readiness.",
        equipment:
            "Supportive footwear. Compression sleeves sometimes recommended.",
        clinicians:
            "Physiotherapists guide return-to-sport progression. Sports medicine physicians may provide final clearance for competitive athletes. Strength and conditioning specialists sometimes involved.",
    },
    {
        stageId: "return",
        countryId: "australia",
        timing: "Month 6-12",
        description:
            "Structured return to sport with emphasis on preventing re-injury.",
        equipment:
            "Supportive footwear. Compression garments common during activity.",
        clinicians:
            "Sports physiotherapists lead return-to-sport protocols. Exercise physiologists may be involved for high-level athletes. Orthopedic surgeons provide final clearance.",
    },
    {
        stageId: "return",
        countryId: "uk",
        timing: "Month 6-12",
        description:
            "Gradual return to sports with functional assessment to determine readiness.",
        equipment:
            "Supportive footwear. Some use compression sleeves during high-impact activities.",
        clinicians:
            "Physiotherapists guide return-to-sport progression. Sports medicine physicians may be involved for competitive athletes. Some specialized centers offer biomechanical assessment before return to high-impact sports.",
    },
    {
        stageId: "return",
        countryId: "germany",
        timing: "Month 6-9",
        description:
            "Structured return to sport with emphasis on movement quality and strength.",
        equipment: "Supportive footwear with consideration for biomechanics.",
        clinicians:
            "Physiotherapists and sports medicine specialists collaborate on return-to-sport protocols. Biomechanical assessment often performed before full return to high-impact activities.",
    },
    {
        stageId: "return",
        countryId: "france",
        timing: "Month 6-9",
        description: "Progressive return to sports with functional testing.",
        equipment:
            "Supportive footwear. Some use compression garments during initial return.",
        clinicians:
            "Kinésithérapeutes specializing in sports rehabilitation guide return-to-sport progression. Médecins du sport (sports medicine doctors) may provide final clearance for competitive athletes.",
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
    "Night splints are more commonly used in the UK and US healthcare systems, while being less prevalent in continental European approaches.",
];

export const potentialInaccuracies = [
    "The data suggests Germany has a stronger preference for surgical management than other countries, which may be overstated.",
    "The distinction between 'backslab' and 'backslap' appears inconsistent in the original text - 'backslab' is the correct medical term.",
    "The timeline for imaging in the UK (2-4 weeks delay) seems longer than typical clinical practice, especially for suspected Achilles ruptures.",
    "The data may not fully capture regional variations within each country, particularly between urban and rural healthcare settings.",
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
        name: "Thetis Night Splint",
        description: "Specialized night splint for maintaining ankle position",
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
