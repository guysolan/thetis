import { Link } from "@react-email/components";
import React from "react";

const Unsubscribe = ({ align = "center" }: { align?: "left" | "center" }) => {
  return (
    <div
      className={`mt-8 mx-auto text-gray-500 max-w-md text-xs ${align === "center" ? "text-center" : ""}`}
    >
      <hr className="border-gray-200" />

      <p className="mt-4">
        To unsubscribe from future emails, please{" "}
        <Link
          href="https://unsubscribe.resend.com/"
          className="text-gray-500 underline underline-offset-1"
        >
          click here
        </Link>
      </p>
    </div>
  );
};

export default Unsubscribe;
