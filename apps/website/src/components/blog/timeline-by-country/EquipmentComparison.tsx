type Equipment = {
  countryId: string;
  crutches: string;
  kneeScooter: string;
  evenUp: string;
  nightSplint: string;
  walkingBoot: string;
};

export const equipment: Equipment[] = [
  {
    countryId: "usa",
    walkingBoot:
      "Standard CAM boot with heel wedges. Typically prescribed by emergency physicians, orthopedic surgeons, or podiatrists (DPMs). VACOped hinged boots less common than in Europe.",
    crutches:
      "Used initially during non‑weight-bearing and early partial weight-bearing phases. Typically prescribed by emergency physicians, orthopedic surgeons, or podiatrists (DPMs). Physical therapists provide gait training.",
    kneeScooter:
      "Occasionally offered as an alternative. Often recommended by physical therapists for patients struggling with crutches. May be covered by insurance with prior authorization or available for rental.",
    evenUp:
      "Often recommended once transitioning from boot to shoes for leg length/gait balance. Typically suggested by physical therapists or podiatrists to prevent compensatory gait issues.",
    nightSplint:
      "Available for purchase from medical suppliers and some clinics. Helps maintain tendon position during sleep and reduce morning stiffness. Often recommended by orthopedic surgeons, podiatrists, or physical therapists during weeks 4-12 of recovery.",
  },
  {
    countryId: "canada",
    walkingBoot:
      "Removable CAM boots with heel wedges common. Some centers use VACOped hinged boots for better range of motion control. Prescribed by orthopedic surgeons or sports medicine physicians.",
    crutches:
      "Standard during initial non‑weight-bearing phase. Prescribed by emergency physicians or orthopedic surgeons. Physiotherapists provide gait training and safety instruction.",
    kneeScooter:
      "Sometimes available as an alternative to crutches. May be recommended by physiotherapists for patients with balance issues or upper body weakness. Often available for rental rather than purchase.",
    evenUp:
      "May be provided to help maintain balance during boot use. Typically recommended by physiotherapists during transition from boot to normal footwear to prevent compensatory gait patterns.",
    nightSplint:
      "Available for purchase from some clinics. Used to prevent plantar flexion contracture during sleep. Usually recommended by orthopedic surgeons or physiotherapists during the immobilization phase.",
  },
  {
    countryId: "australia",
    walkingBoot:
      "Combination of standard CAM boots and VACOped hinged boots depending on center. VACOped more common in specialized sports medicine clinics for controlled ankle mobilization.",
    crutches:
      "Commonly used in early rehab. Provided in emergency departments or fracture clinics. Physiotherapists provide gait training and safety instruction.",
    kneeScooter:
      "Sometimes available for enhanced mobility. Often recommended by physiotherapists for patients who struggle with crutches. Typically available for rental through medical supply companies.",
    evenUp:
      "May be introduced later to improve gait symmetry. Usually recommended by physiotherapists during transition from boot to normal footwear.",
    nightSplint:
      "Available for purchase from some clinics. Recommended to maintain optimal tendon position overnight. Often suggested by orthopedic surgeons or sports physiotherapists to prevent morning stiffness and maintain tendon length.",
  },
  {
    countryId: "uk",
    walkingBoot:
      "Varies by center. VACOped hinged boots increasingly common in NHS trusts with specialized Achilles clinics. Traditional CAM boots still used in many general orthopedic departments.",
    crutches:
      "Initially required. Provided by A&E departments or fracture clinics. Physiotherapists provide gait training and safety instruction.",
    kneeScooter:
      "Sometimes offered as an alternative. May be recommended by physiotherapists for patients with balance issues or longer non-weight-bearing periods. Limited availability through NHS; often privately rented.",
    evenUp:
      "Often used during boot phases and transition to normal shoes to maintain leg length and prevent compensatory gait issues. Typically recommended by physiotherapists or podiatrists within the NHS.",
    nightSplint:
      "Available in some A&E departments and can be purchased from clinics. Helps prevent tendon shortening during sleep and reduces morning pain. Often recommended by orthopedic consultants or specialized physiotherapists during weeks 2-12 of recovery.",
  },
  {
    countryId: "germany",
    walkingBoot:
      "Strong preference for VACOped hinged boots over standard CAM boots. Considered superior for controlled mobilization and rehabilitation. Widely available through public health insurance.",
    crutches:
      "Standard during early phases. Provided at initial treatment. Physiotherapists provide detailed gait training with emphasis on proper technique.",
    kneeScooter:
      "Offered in some centers. May be recommended by physiotherapists for patients with specific mobility needs. Sometimes covered by health insurance with proper documentation.",
    evenUp:
      "Commonly recommended when transitioning to normal footwear to ensure a balanced gait. Typically suggested by physiotherapists or orthopedic specialists to prevent compensatory movement patterns.",
    nightSplint:
      "Not commonly provided as part of standard care. May be available through private purchase. Occasionally recommended by orthopedic specialists for patients with significant morning stiffness or calf tightness.",
  },
  {
    countryId: "france",
    walkingBoot:
      "VACOped hinged boots widely used in specialized centers. Considered standard for Achilles rupture management. Allows for controlled dorsiflexion while limiting plantar flexion.",
    crutches:
      "Used initially until full weight-bearing is achieved. Provided at initial treatment. Kinésithérapeutes provide gait training with emphasis on energy conservation.",
    kneeScooter:
      "May be used as an alternative if balance is an issue. Sometimes recommended by kinésithérapeutes for patients with specific mobility needs. Limited availability through public healthcare; often privately purchased.",
    evenUp:
      "Frequently recommended to correct any leg length discrepancies during rehab and after boot removal. Typically suggested by kinésithérapeutes or podologues (podiatrists) to optimize gait mechanics.",
    nightSplint:
      "Not typically included in standard treatment protocols. Occasionally recommended for private purchase. May be suggested by orthopedic surgeons or kinésithérapeutes for patients with persistent calf tightness or sleep disruption due to positioning.",
  },
];

import React from "react";
import type { Country } from "./types";
import { getCountryById, getUnicodeFlagIcon } from "./utils";
import {
  AlignJustify,
  SmilePlus,
  Grid,
  Briefcase,
  Stethoscope,
  Footprints,
} from "lucide-react";

interface EquipmentComparisonProps {
  selectedCountries: string[];
  countries: Country[];
  equipment: Equipment[];
}

interface EquipmentSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  dataKey: keyof Equipment;
}

export const EquipmentComparison: React.FC<EquipmentComparisonProps> = ({
  selectedCountries,
  countries,
}) => {
  const equipmentSections: EquipmentSection[] = [
    {
      id: "boot",
      title: "Walking Boot",
      dataKey: "walkingBoot",
      icon: <Footprints size={24} />,
    },
    {
      id: "crutches",
      title: "Crutches",
      dataKey: "crutches",
      icon: <Stethoscope size={24} />,
    },
    {
      id: "kneeScooter",
      title: "Knee Scooter",
      dataKey: "kneeScooter",
      icon: <SmilePlus size={24} />,
    },
    {
      id: "evenUp",
      title: "Even Up Inserts",
      dataKey: "evenUp",
      icon: <Grid size={24} />,
    },
    {
      id: "nightSplint",
      title: "Thetis Night Splint",
      dataKey: "nightSplint",
      icon: <Briefcase size={24} />,
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="mb-6 font-bold text-2xl">Recovery Equipment Comparison</h2>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {equipmentSections.map((section) => (
          <div
            key={section.id}
            className="bg-gray-50 p-6 border border-gray-200 rounded-lg"
          >
            <h3 className="flex items-center gap-2 mb-4 font-semibold text-xl">
              <span className="text-primary">{section.icon}</span>
              {section.title}
            </h3>

            <div className="space-y-4">
              {selectedCountries.map((countryId) => {
                const country = getCountryById(countryId, countries);
                const equipmentData = equipment.find(
                  (e) => e.countryId === countryId,
                );

                if (!country || !equipmentData) return null;

                return (
                  <div key={countryId} className="flex items-start gap-2">
                    <span className="mt-1 flag-icon">
                      {getUnicodeFlagIcon(country.flagCode)}
                    </span>
                    <div>
                      <p className="font-medium">{country.name}:</p>
                      <p>{equipmentData[section.dataKey]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
