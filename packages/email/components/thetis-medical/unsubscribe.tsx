import { Link } from "@react-email/components";
import React from "react";

const DEFAULT_UNSUBSCRIBE_URL = "https://thetismedical.com/unsubscribe";

interface UnsubscribeProps {
  align?: "left" | "center";
  /**
   * Override when the sending tool provides its own opt-out link. Cold outreach
   * sent through Instantly should pass that campaign's merge tag so the opt-out
   * lands in Instantly's suppression list — these recipients are not in
   * public.users, so the default page cannot suppress them.
   */
  href?: string;
}

const Unsubscribe = (
  { align = "center", href = DEFAULT_UNSUBSCRIBE_URL }: UnsubscribeProps,
) => {
  return (
    <div
      className={`mx-auto mt-8 pb-2 max-w-md text-gray-600 text-xs ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <hr className="border-gray-200" />

      <p className="mt-4">
        To unsubscribe from future emails, please{" "}
        <Link
          href={href}
          className="text-gray-500 underline underline-offset-1"
        >
          click here
        </Link>
      </p>
    </div>
  );
};

export default Unsubscribe;
