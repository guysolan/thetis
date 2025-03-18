import React from "react";
import { Img, Section } from "@react-email/components";

export default function InBedImage() {
  return (
    <Section style={{ textAlign: "center" }} className="w-full text-center">
      <div
        style={{
          textAlign: "center",
          margin: "0 auto",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <Img
          src="https://thetismedical.com/images/night_splint_square_small.jpg"
          alt="Achilles tendon rupture night splint"
          width="300"
          height="300"
          className="mx-auto rounded-lg"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "300px",
            width: "100%",
            borderRadius: "8px",
            height: "auto",
          }}
        />
      </div>
    </Section>
  );
}
