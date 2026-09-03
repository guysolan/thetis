import * as React from "react";
import { Link, Text } from "@react-email/components";

const DEFAULT_UNSUBSCRIBE_URL = "https://thetismedical.com/unsubscribe";

interface UnsubscribeProps {
  /** Signed one-click link where available; falls back to the page where a recipient enters their email. */
  href?: string;
}

export default function Unsubscribe(
  { href = DEFAULT_UNSUBSCRIBE_URL }: UnsubscribeProps,
) {
  return (
    <Text className="mt-8 text-[12px] text-gray-500 text-center">
      If you no longer wish to receive these updates,{" "}
      <Link href={href} className="text-brand-600 underline">
        click here to unsubscribe
      </Link>
      .
    </Text>
  );
}
