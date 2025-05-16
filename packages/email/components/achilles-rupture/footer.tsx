import * as React from "react";
import { Text, Link } from "@react-email/components";

export default function Footer() {
  return (
    <Text className="mt-4 text-[12px] text-gray-500 text-center">
      © {new Date().getFullYear()} Achilles Ruptures Research Team. All rights
      reserved.{" "}
    </Text>
  );
}
