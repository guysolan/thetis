import React from "react";
import { Link, Img } from "@react-email/components";

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 48 }: LogoProps) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link
        style={{ display: "inline-block", textDecoration: "none" }}
        href="https://thetismedical.com"
      >
        <Img
          src="https://thetismedical.com/thetis-logo.png"
          alt="Thetis Medical"
          width={size}
          height={size}
          style={{ borderRadius: "8px" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
