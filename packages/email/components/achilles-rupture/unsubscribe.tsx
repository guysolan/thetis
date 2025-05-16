import * as React from "react";
import { Text, Link } from "@react-email/components";

export default function Unsubscribe() {
  return (
    <Text className="mt-8 text-[12px] text-gray-500 text-center">
      If you no longer wish to receive these updates,{" "}
      <Link
        href="https://achilles-ruptures.com/unsubscribe"
        className="text-brand-600 underline"
      >
        click here to unsubscribe
      </Link>
      .
    </Text>
  );
}
