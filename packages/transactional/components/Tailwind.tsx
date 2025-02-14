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
                50: "hsl(161, 40%, 95%)",
                100: "hsl(161, 45%, 90%)",
                200: "hsl(161, 50%, 80%)",
                300: "hsl(161, 55%, 70%)",
                400: "hsl(161, 60%, 55%)",
                500: "hsl(161, 60%, 40%)",
                600: "hsl(161, 60%, 35%)",
                700: "hsl(161, 55%, 30%)",
                800: "hsl(161, 50%, 20%)",
                950: "hsl(161, 45%, 10%)",
                DEFAULT: "hsl(161, 60%, 40%)",
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
