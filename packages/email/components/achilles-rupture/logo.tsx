import React from "react";
import { Link, Img } from "@react-email/components";

const Logo = () => {
  return (
    <div className="text-center">
      <Link
        className={"inline-block text-black"}
        href="https://achilles-rupture.com"
      >
        <span style={{ display: "inline-block", verticalAlign: "middle" }}>
          <Img
            src="https://achilles-rupture.com/favicons/android-chrome-192x192.png"
            alt="Achilles Rupture"
            width="32"
            height="32"
            className="rounded-lg"
          />
        </span>{" "}
        <b style={{ verticalAlign: "middle" }}>Achilles Rupture</b>
      </Link>
    </div>
  );
};

export default Logo;
