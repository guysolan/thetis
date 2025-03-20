import React from "react";
import { Button, Section } from "@react-email/components";

const SeeTheProductButton = () => {
  return (
    <Section className="flex flex-col items-center mb-4">
      <div className="flex justify-center">
        <Button
          href="https://patient-watch.com/request-sample"
          className="bg-emerald-600 hover:bg-emerald-700 shadow-md mb-4 px-6 md:px-8 py-3 md:py-4 rounded-lg md:w-auto font-bold text-white text-base md:text-lg hover:scale-105 transition duration-300 ease-in-out transform"
        >
          Get a Sample 📦
        </Button>
      </div>
      <p className="mt-2 text-gray-600 text-sm text-center italic">
        Hurry, we are giving away 10 samples for free!
      </p>
    </Section>
  );
};

export default SeeTheProductButton;
