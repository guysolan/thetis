import React from "react";
import { Button } from "@react-email/components";

const LearnMoreButton = () => {
  return (
    <div className="mx-auto text-center">
      <Button
        href="https://thetismedical.com/"
        className="bg-emerald-600/90 mb-8 px-6 md:px-8 py-3 md:py-4 rounded-lg md:w-auto font-bold text-white text-base md:text-lg hover:scale-105 transition-transform transform"
        title="Learn more about the Achilles Rupture Night Splint"
      >
        <span className="mr-2">🚀</span> Discover More →
      </Button>
    </div>
  );
};

export default LearnMoreButton;
