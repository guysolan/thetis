import React from "react";
import { Link, Img } from "@react-email/components";
const Logo = () => {
  return (
    <div className="text-center">
      <Link
        className={"inline-block text-black"}
        href="https://thetismedical.com"
      >
        <span style={{ display: "inline-block", verticalAlign: "middle" }}>
          <Img
            src="https://thetismedical.com/favicon/android-chrome-192x192.png"
            alt="Thetis Medical"
            width="32"
            height="32"
            className="rounded-lg"
          />
        </span>{" "}
        <b style={{ verticalAlign: "middle" }}>Thetis Medical</b>
      </Link>
    </div>
  );
};

export default Logo;
