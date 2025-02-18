import React from "react";
import Logo from "./Logo";

const Footer = ({ align = "center" }: { align?: "left" | "center" }) => {
  return (
    <div>
      <p className={`font-medium ${align === "center" ? "text-center" : ""}`}>
        <span className="font-normal">Guy Solan</span> - Founder
      </p>
      <Logo />
    </div>
  );
};

export default Footer;
