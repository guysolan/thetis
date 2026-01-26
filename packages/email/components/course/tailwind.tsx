import * as React from "react";
import { Tailwind as BaseTailwind } from "@react-email/components";

export default function Tailwind({ children }: { children: React.ReactNode }) {
  return (
    <BaseTailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: {
                50: "#f5f3ff",
                100: "#ede9fe",
                200: "#ddd6fe",
                300: "#c4b5fd",
                400: "#a78bfa",
                500: "#8b5cf6",
                600: "#7c3aed",
                700: "#6d28d9",
                800: "#5b21b6",
                900: "#4c1d95",
              },
            },
            fontFamily: {
              sans: ["Raleway", "system-ui", "sans-serif"],
            },
          },
        },
      }}
    >
      {children}
    </BaseTailwind>
  );
}
