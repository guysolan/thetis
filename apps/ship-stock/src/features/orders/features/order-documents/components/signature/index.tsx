import dayjs from "dayjs";
import signature from "./signature.png";

const Signature = () => {
  return (
    <div className="flex flex-col gap-4 mt-6 max-w-2xl">
      <p className="font-medium text-neutral-700 text-sm uppercase">
        I DECLARE ALL THE INFORMATION CONTAINED IN THIS INVOICE IS TRUE AND
        CORRECT TO THE BEST OF MY KNOWLEDGE.
      </p>
      <div className="flex flex-col gap-1 mt-2">
        <p className="text-neutral-600 text-sm">
          <span className="font-medium">Signed:</span> Guy Solan
        </p>
        <p className="text-neutral-600 text-sm">
          <span className="font-medium">Date:</span>{" "}
          {dayjs().format("DD MMM YYYY")}
        </p>
      </div>
      <img
        height="50"
        width="120"
        src={signature}
        alt="Signature"
        className="mt-1"
      />
    </div>
  );
};

export default Signature;
