import { Link } from "@react-email/components";
import React from "react";

const Unsubscribe = () => {
  return (
    <div className="mt-8 text-gray-500 text-sm">
      <p>
        To unsubscribe from future emails, please{" "}
        <Link
          href="https://unsubscribe.resend.com/"
          className="text-gray-600 underline"
        >
          click here
        </Link>
      </p>
    </div>
  );
};

export default Unsubscribe;
