import * as React from "react";
import { Tailwind as BaseTailwind } from "@react-email/components";

export default function Tailwind({ children }: { children: React.ReactNode }) {
  return (
    <BaseTailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: {
                50: "#f0f9ff",
                100: "#e0f2fe",
                200: "#bae6fd",
                300: "#7dd3fc",
                400: "#38bdf8",
                500: "#0ea5e9",
                600: "#0284c7",
                700: "#0369a1",
                800: "#075985",
                900: "#0c4a6e",
              },
            },
            fontFamily: {
              sans: ["Inter", "system-ui", "sans-serif"],
            },
          },
        },
      }}
    >
      {children}
    </BaseTailwind>
  );
}
