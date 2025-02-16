import React from "react";
import { Button } from "@react-email/components";

const LearnMoreButton = () => {
  return (
    <div className="flex justify-center">
      <Button
        href="https://patient-watch.com"
        className="bg-emerald-600 hover:bg-emerald-700 mb-8 px-6 md:px-8 py-3 md:py-4 rounded-lg md:w-auto font-bold text-white text-base md:text-lg"
      >
        Learn More →
      </Button>
    </div>
  );
};

export default LearnMoreButton;
