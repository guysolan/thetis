import React from "react";
import { User2, Info } from "lucide-react";

export default function TreatmentOutcomes() {
  // Constants for outcomes based on research data
  const TOTAL_PEOPLE = 100;
  const SURGICAL_RERUPTURE_RATE = 2.3; // 2.3%
  const SURGICAL_INFECTION_RATE = 2.8; // 2.8%
  const SURGICAL_OTHER_COMPLICATIONS = 4.9 - 2.8; // Other complications (total 4.9% minus infection)

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
  const surgicalSuccess =
    TOTAL_PEOPLE -
    surgicalReruptures -
    surgicalInfections -
    surgicalOtherComplications;

  const nonsurgicalReruptures = Math.round(
    TOTAL_PEOPLE * (NONSURGICAL_RERUPTURE_RATE / 100),
  );
  const nonsurgicalComplications = Math.round(
    TOTAL_PEOPLE * (NONSURGICAL_COMPLICATION_RATE / 100),
  );
  const nonsurgicalSuccess =
    TOTAL_PEOPLE - nonsurgicalReruptures - nonsurgicalComplications;

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
                <User2
                  key={`person-${v_index}`}
                  className={`w-5 h-5 m-0.5 transition-transform hover:scale-125 ${v_colorMap[v_outcome]}`}
                  fill="currentColor"
                />
              );
            })}
        </div>
      ));
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 font-bold text-2xl text-center">
        Treatment Outcomes per 100 Patients
      </h2>

      <div className="flex md:flex-row flex-col justify-center gap-8">
        {/* Surgical Treatment */}
        <div className="flex-1 bg-white shadow-sm hover:shadow-md p-5 border border-gray-200 rounded-xl transition-shadow">
          <h3 className="mb-4 font-bold text-lg text-center">
            Surgical Treatment
          </h3>

          <div className="mb-5">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
              {renderPeopleGrid({
                success: surgicalSuccess,
                rerupture: surgicalReruptures,
                infection: surgicalInfections,
                otherComplication: surgicalOtherComplications,
              })}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 rounded-full w-4 h-4"></div>
              <span>
                Re-ruptures: {surgicalReruptures} patients (
                {SURGICAL_RERUPTURE_RATE}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500 rounded-full w-4 h-4"></div>
              <span>
                Infections: {surgicalInfections} patients (
                {SURGICAL_INFECTION_RATE}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-500 rounded-full w-4 h-4"></div>
              <span>
                Other complications: {surgicalOtherComplications} patients (
                {SURGICAL_OTHER_COMPLICATIONS.toFixed(1)}%)
                <span className="block mt-1 ml-2 text-gray-500 text-xs">
                  E.g., nerve damage, blood clots, wound healing issues
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-600 rounded-full w-4 h-4"></div>
              <span>Successful recovery: {surgicalSuccess} patients</span>
            </div>
          </div>
        </div>

        {/* Non-Surgical Treatment */}
        <div className="flex-1 bg-white shadow-sm hover:shadow-md p-5 border border-gray-200 rounded-xl transition-shadow">
          <h3 className="mb-4 font-bold text-lg text-center">
            Non-Surgical Treatment
          </h3>

          <div className="mb-5">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
              {renderPeopleGrid({
                success: nonsurgicalSuccess,
                rerupture: nonsurgicalReruptures,
                complication: nonsurgicalComplications,
              })}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 rounded-full w-4 h-4"></div>
              <span>
                Re-ruptures: {nonsurgicalReruptures} patients (
                {NONSURGICAL_RERUPTURE_RATE}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-500 rounded-full w-4 h-4"></div>
              <span>
                Complications: {nonsurgicalComplications} patients (
                {NONSURGICAL_COMPLICATION_RATE}%)
                <span className="block mt-1 ml-2 text-gray-500 text-xs">
                  E.g., skin pressure, muscle atrophy, joint stiffness
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-600 rounded-full w-4 h-4"></div>
              <span>Successful recovery: {nonsurgicalSuccess} patients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 py-2 w-full text-gray-600 text-xs text-center italic">
        Source: Meta-analysis of 29 studies including 15,862 patients (Ochen et
        al., 2019)
      </div>
    </div>
  );
}
