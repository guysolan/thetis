import React from "react";

const FootAndAnkleBullets = () => {
  return (
    <div className="flex flex-col gap-y-4 my-8 px-4">
      <div className="flex justify-start items-center gap-x-3 text-gray-800 text-base">
        <img
          src="/images/bed-icon.png"
          alt="Bed icon"
          width={20}
          height={20}
          style={{ width: 20, height: 20 }}
          className="text-emerald-600"
        />
        <span>Maximizes Patient Comfort</span>
      </div>
      <div className="bg-gray-200 w-full h-px" />
      <div className="flex justify-start items-center gap-x-3 text-gray-800 text-base">
        <img
          src="/images/stethoscope-icon.png"
          alt="Stethoscope icon"
          width={20}
          height={20}
          style={{ width: 20, height: 20 }}
          className="text-emerald-600"
        />
        <span>Designed with Foot & Ankle Surgeons</span>
      </div>
      <div className="bg-gray-200 w-full h-px" />
      <div className="flex justify-start items-center gap-x-3 text-gray-800 text-base">
        <img
          src="/images/shield-check-icon.png"
          alt="Shield check icon"
          width={20}
          height={20}
          style={{ width: 20, height: 20 }}
          className="text-emerald-600"
        />
        <span>FDA Approved for Achilles Rupture</span>
      </div>
    </div>
  );
};

export default FootAndAnkleBullets;
