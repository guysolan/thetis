import { Link } from "@react-email/components";
import React from "react";

const Unsubscribe = () => {
  return (
    <div className="mx-auto mt-8 pb-2 max-w-md text-gray-600 text-xs text-center">
      <hr className="border-gray-200" />

      <p className="mt-4">
        To unsubscribe from future emails, please{" "}
        <Link
          href="https://UNSUBSCRIBE_INSTANTLY.ai"
          className="text-gray-500 underline underline-offset-1"
        >
          click here
        </Link>
      </p>
    </div>
  );
};

export default Unsubscribe;
