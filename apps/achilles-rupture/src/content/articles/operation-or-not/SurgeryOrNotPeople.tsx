import React from "react";
import { UserRound } from "lucide-react";

export default function SurgeryOrNotPeople() {
  // Constants for outcomes based on research data
  const TOTAL_PEOPLE = 100;
  const SURGICAL_RERUPTURE_RATE = 2.3; // 2.3%
  const SURGICAL_INFECTION_RATE = 2.8; // 2.8%
  const SURGICAL_OTHER_COMPLICATIONS = 4.9 - 2.8; // Complications (total 4.9% minus infection)

  const NONSURGICAL_RERUPTURE_RATE = 3.9; // 3.9%
  const NONSURGICAL_COMPLICATION_RATE = 1.6; // 1.6%

  // Calculate numbers for visualization
  const surgicalReruptures = Math.round(
    TOTAL_PEOPLE * (SURGICAL_RERUPTURE_RATE / 100),
  );
  const surgicalInfections = Math.round(
    TOTAL_PEOPLE * (SURGICAL_INFECTION_RATE / 100),
  );
  const surgicalOtherComplications = Math.round(
    TOTAL_PEOPLE * (SURGICAL_OTHER_COMPLICATIONS / 100),
  );
  const surgicalSuccess = TOTAL_PEOPLE -
    surgicalReruptures -
    surgicalInfections -
    surgicalOtherComplications;

  const nonsurgicalReruptures = Math.round(
    TOTAL_PEOPLE * (NONSURGICAL_RERUPTURE_RATE / 100),
  );
  const nonsurgicalComplications = Math.round(
    TOTAL_PEOPLE * (NONSURGICAL_COMPLICATION_RATE / 100),
  );
  const nonsurgicalSuccess = TOTAL_PEOPLE - nonsurgicalReruptures -
    nonsurgicalComplications;

  // Helper function to render people icons in a 10x10 grid
  const renderPeopleGrid = (outcomes) => {
    // Create a flat array of all people with their outcome types
    const v_allPeople = [];

    Object.entries(outcomes).forEach(([outcome, count]) => {
      for (let i = 0; i < count; i++) {
        v_allPeople.push(outcome);
      }
    });

    // Create 10 rows of 10 people
    return Array(10)
      .fill(0)
      .map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center">
          {Array(10)
            .fill(0)
            .map((_, colIndex) => {
              const v_index = rowIndex * 10 + colIndex;
              const v_outcome = v_allPeople[v_index] || "success";
              const v_colorMap = {
                success: "text-gray-600",
                rerupture: "text-red-500",
                infection: "text-yellow-500",
                otherComplication: "text-purple-500",
                complication: "text-purple-500",
              };

              return (
                <UserRound
                  key={`person-${v_index}`}
                  className={`w-4 h-4 md:w-5 md:h-5 m-0.5 transition-transform hover:scale-125 ${
                    v_colorMap[v_outcome]
                  }`}
                  stroke="currentColor"
                />
              );
            })}
        </div>
      ));
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 font-bold text-2xl md:text-3xl text-center">
        Treatment Outcomes per 100 Patients
      </h2>

      {/* VS Divider for Mobile - Shown at top on mobile, hidden on desktop */}
      <div className="md:hidden flex justify-center mb-4">
        <div className="bg-gray-100 px-4 py-2 rounded-full font-bold text-xl">
          VS
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center md:items-center gap-6 md:gap-0">
        {/* Surgical Treatment */}
        <div className="flex-1 bg-white shadow-sm hover:shadow-md p-4 md:p-5 border border-gray-200 rounded-sm transition-shadow">
          <h3 className="mb-3 md:mb-4 font-bold text-xl md:text-2xl text-center">
            Surgical Treatment
          </h3>

          <div className="mb-4 md:mb-5">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-4 rounded-sm">
              {renderPeopleGrid({
                success: surgicalSuccess,
                rerupture: surgicalReruptures,
                infection: surgicalInfections,
                otherComplication: surgicalOtherComplications,
              })}
            </div>
          </div>

          <div className="space-y-1 mt-3 text-base md:text-lg">
            <div className="flex justify-between">
              <span className="font-semibold">Re-ruptures:</span>
              <span>
                {surgicalReruptures} ({SURGICAL_RERUPTURE_RATE}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Infections:</span>
              <span>
                {surgicalInfections} ({SURGICAL_INFECTION_RATE}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Complications:</span>
              <span>
                {surgicalOtherComplications} (
                {SURGICAL_OTHER_COMPLICATIONS.toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Success:</span>
              <span>{surgicalSuccess}</span>
            </div>
          </div>
        </div>

        {/* VS Divider - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-col justify-center items-center mx-2 md:mx-6">
          <div className="bg-gray-100 px-6 py-4 rounded-full font-bold text-3xl">
            VS
          </div>
        </div>

        {/* Non-Surgical Treatment */}
        <div className="flex-1 bg-white shadow-sm hover:shadow-md p-4 md:p-5 border border-gray-200 rounded-sm transition-shadow">
          <h3 className="mb-3 md:mb-4 font-bold text-xl md:text-2xl text-center">
            Non-Surgical Treatment
          </h3>

          <div className="mb-4 md:mb-5">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-4 rounded-sm">
              {renderPeopleGrid({
                success: nonsurgicalSuccess,
                rerupture: nonsurgicalReruptures,
                complication: nonsurgicalComplications,
              })}
            </div>
          </div>

          <div className="space-y-1 mt-3 text-base md:text-lg">
            <div className="flex justify-between">
              <span className="font-semibold">Re-ruptures:</span>
              <span>
                {nonsurgicalReruptures} ({NONSURGICAL_RERUPTURE_RATE}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Complications:</span>
              <span>
                {nonsurgicalComplications} ({NONSURGICAL_COMPLICATION_RATE}%)
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Success:</span>
              <span>{nonsurgicalSuccess}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Key */}
      <div className="bg-white mx-auto mt-6 md:mt-8 p-4 md:p-5 border border-gray-200 rounded-sm max-w-3xl">
        <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 rounded-full w-4 md:w-6 h-4 md:h-6" />
            <span className="font-medium">Re-ruptures</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 rounded-full w-4 md:w-6 h-4 md:h-6" />
            <span className="font-medium">Infections</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-500 rounded-full w-4 md:w-6 h-4 md:h-6" />
            <span className="font-medium">Complications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-600 rounded-full w-4 md:w-6 h-4 md:h-6" />
            <span className="font-medium">Success</span>
          </div>
        </div>
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-gray-200 border-t">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="text-xs md:text-sm">
              <span className="block mb-1 font-semibold">
                Surgical complications:
              </span>
              <span className="text-gray-600">
                Nerve damage, blood clots, wound healing
              </span>
            </div>
            <div className="text-xs md:text-sm">
              <span className="block mb-1 font-semibold">
                Non-surgical complications:
              </span>
              <span className="text-gray-600">
                Skin pressure, muscle atrophy, stiffness
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4 py-2 w-full text-gray-600 text-xs md:text-base text-center">
        Source: Meta-analysis of 29 studies including 15,862 patients (Ochen et
        al., 2019)
      </div>
    </div>
  );
}
