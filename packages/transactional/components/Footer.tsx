import { Link } from "@react-email/components";
import { Img } from "@react-email/components";
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center gap-2">
      <Img
        src="https://thetismedical.com/images/logo-black.svg"
        alt="Thetis Medical"
        width="40"
        height="40"
        className="rounded-lg"
      />
      <b>
        <Link className="text-black" href="https://thetismedical.com">
          Thetis Medical
        </Link>
      </b>
    </div>
  );
};

export default Footer;
