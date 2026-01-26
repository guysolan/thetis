import * as React from "react";
import { Text, Link } from "@react-email/components";

export default function Footer() {
  return (
    <Text className="mt-8 text-[12px] text-gray-500 text-center">
      © {new Date().getFullYear()} Thetis Medical. All rights reserved.
      <br />
      <Link
        href="https://thetismedical.com"
        className="text-primary-600 underline"
      >
        thetismedical.com
      </Link>
    </Text>
  );
}
