import {
  Button,
  Head,
  Font,
  Heading,
  Html,
  Img,
} from "@react-email/components";
import * as React from "react";
import Tailwind from "../components/Tailwind";
import HighlightedSpan from "../components/HighlightedSpan";

export const MyEmail = () => {
  const colors = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  return (
    <Tailwind>
      <Html>
        <Head>
          <Font
            fontFamily="Raleway"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/raleway/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Heading as="h1">Brand Color Palette</Heading>
        <div>
          {colors.map((shade) => (
            <div
              key={shade}
              className={`w-64 h-16 bg-emerald-${shade} flex items-center justify-center mb-2 rounded`}
            >
              <span
                className={`${shade >= 500 ? "text-white" : "text-black"} font-bold`}
              >
                emerald-{shade}
              </span>
            </div>
          ))}
        </div>
      </Html>
    </Tailwind>
  );
};

export default MyEmail;
