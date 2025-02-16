import React from "react";
import { Link } from "@react-email/components";

const WantItForYourPatients = () => {
  return (
    <p className="bg-gray-100 mb-8 px-4 py-2 text-sm md:text-base text-center">
      Want to make it available for your patients?
      <br />
      Contact our founder{" "}
      <Link
        className="font-medium text-brand-600"
        href="mailto:guy@thetismedical.com"
      >
        guy@thetismedical.com
      </Link>
    </p>
  );
};

export default WantItForYourPatients;
