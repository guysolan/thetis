import React from "react";
import { Microscope, FlaskConical, Dna } from "lucide-react";

export default function EmergingTechnologies() {
  return (
    <div className="my-6 w-full">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        {/* Shear Wave Elastography */}
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Microscope className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="mb-2 font-bold text-lg text-center">
            Shear Wave Elastography
          </h3>
          <p className="text-sm text-center">
            Advanced imaging that measures tendon stiffness to detect early
            degeneration before symptoms appear.
          </p>
        </div>

        {/* Exosome Therapy */}
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-center mb-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <FlaskConical className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="mb-2 font-bold text-lg text-center">
            Exosome Therapy
          </h3>
          <p className="text-sm text-center">
            Cell-derived vesicles that carry healing factors to accelerate
            tissue repair and reduce inflammation.
          </p>
        </div>

        {/* Mesenchymal Stem Cells */}
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-center mb-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Dna className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="mb-2 font-bold text-lg text-center">
            Mesenchymal Stem Cells
          </h3>
          <p className="text-sm text-center">
            Multipotent cells that can transform into tendon tissue and enhance
            the natural healing process.
          </p>
        </div>
      </div>
    </div>
  );
}
