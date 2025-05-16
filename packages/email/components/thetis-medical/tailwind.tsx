import * as React from "react";
import { Tailwind } from "@react-email/components";

const TailwindConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: {
                50: "#f2f9f6",
                100: "#e5f3ec",
                200: "#cce7d9",
                300: "#b2dbc6",
                400: "#66c49d",
                500: "#2ea06d",
                600: "#288c5f",
                700: "#236f4c",
                800: "#1a4733",
                950: "#0d231a",
                DEFAULT: "#2ea06d",
              },
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
};

export default TailwindConfig;
