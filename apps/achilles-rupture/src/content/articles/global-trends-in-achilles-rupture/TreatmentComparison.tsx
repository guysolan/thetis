import React from "react";
import {
  AlertTriangle,
  Bandage,
  CheckCircle,
  Scale,
  Scissors,
  X,
} from "lucide-react";

export default function TreatmentComparison() {
  return (
    <div className="bg-white shadow-md mx-auto my-8 p-4 sm:p-6 border border-gray-200 rounded-sm w-full">
      <h2 className="mb-6 font-bold text-2xl text-center">
        Surgical vs. Non-Surgical Treatment
      </h2>

      {/* Main comparison container */}
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        {/* Non-Surgical Column */}
        <div className="flex-1">
          <div className="bg-blue-50 p-5 border-2 border-blue-200 rounded-sm h-full">
            <div className="flex justify-center mb-4">
              <Bandage className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="mb-4 font-bold text-blue-800 text-xl text-center">
              Non-Surgical
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="mb-2 font-semibold text-lg">Treatment</h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>Functional bracing</li>
                  <li>Structured rehabilitation</li>
                  <li>Progressive loading protocols</li>
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-2 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Advantages
                </h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>No surgical risks</li>
                  <li>
                    <strong>Lower complication rates (1.6%)</strong>
                  </li>
                  <li>No hospitalization required</li>
                  <li>Good for patients over 40</li>
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-2 font-semibold text-lg">
                  <X className="w-5 h-5 text-red-600" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>Re-rupture rate: 3.9%</li>
                  <li>Requires strict adherence to protocol</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Surgical Column */}
        <div className="flex-1">
          <div className="bg-gray-50 p-5 border-2 border-gray-200 rounded-sm h-full">
            <div className="flex justify-center mb-4">
              <Scissors className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="mb-4 font-bold text-gray-800 text-xl text-center">
              Surgical
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="mb-2 font-semibold text-lg">Treatment</h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>Open or minimally invasive repair</li>
                  <li>Tendon suturing</li>
                  <li>Staged rehabilitation</li>
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-2 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Advantages
                </h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>Lower re-rupture rate (2.3%)</li>
                  <li>Better for young, athletic patients</li>
                  <li>May allow earlier return to sport</li>
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-2 font-semibold text-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Risks
                </h4>
                <ul className="space-y-2 pl-5 text-base list-disc">
                  <li>
                    <strong>Infection risk (2.8%)</strong>
                  </li>
                  <li>
                    <strong>Higher overall complication rate (4.9%)</strong>
                  </li>
                  <li>Nerve injury potential</li>
                  <li>Scar tissue formation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Research Finding */}
      <div className="bg-green-50 mt-8 p-6 border-2 border-green-200 rounded-sm w-full text-center">
        <div className="flex justify-center mb-2">
          <Scale className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="mb-3 font-bold text-green-800 text-2xl">
          Key Finding: Equivalent Outcomes
        </h2>
        <p className="text-lg">
          When patients are appropriately selected, both approaches yield
          <span className="font-bold">equivalent long-term results</span>{" "}
          in terms of functional recovery and re-rupture rates.
        </p>
      </div>

      {/* Decision Factors - Simplified */}
      <div className="flex flex-col items-center mt-6 p-4">
        <h3 className="mb-3 font-semibold text-xl text-center">
          Treatment selection should consider: age, activity level, and personal
          preference
        </h3>
      </div>
    </div>
  );
}
