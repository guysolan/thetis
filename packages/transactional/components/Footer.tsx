import { Link } from "@react-email/components";
import { Img } from "@react-email/components";
import React from "react";

const Footer = ({ align = "center" }: { align?: "left" | "center" }) => {
  return (
    <div>
      <p className={`font-medium ${align === "center" ? "text-center" : ""}`}>
        <span className="font-normal">Guy Solan</span> - Founder
      </p>
      <Link
        className={`text-black flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}
        href="https://thetismedical.com"
      >
        <Img
          src="https://thetismedical.com/images/logo-black.svg"
          alt="Thetis Medical"
          width="32"
          height="32"
          className="rounded-lg"
        />
        <b>Thetis Medical</b>
      </Link>
    </div>
  );
};

export default Footer;
