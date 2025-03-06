import { useState } from "react";
import { Input } from "@thetis/ui/input";
import { Button } from "../ui/button";
import { subscribePatient } from "./api/subscribe";
import { Check, Download } from "lucide-react";

export default function MiniSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    console.log("Starting submission process with email:", email);

    if (!email) return;

    setIsSubmitting(true);
    const pdfUrl = "/documents/Achilles_Tendon_Rupture_eBook.pdf";
    console.log("Attempting to download PDF from:", pdfUrl);

    try {
      // Step 1: Add to mailing list
      console.log("Adding to mailing list...");
      await subscribePatient(email);
      console.log("Successfully added to mailing list");

      // Clear the email input
      setEmail("");

      // Step 2: Trigger PDF download
      console.log("Creating download link...");
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Achilles_Tendon_Rupture_eBook.pdf";
      link.style.display = "none";
      console.log("Download link created:", link.href);

      document.body.appendChild(link);
      console.log("Link added to document");

      link.click();
      console.log("Download triggered");

      document.body.removeChild(link);
      console.log("Cleanup completed");

      // Show success state
      setIsSuccess(true);

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Detailed error:", error);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Actually update the email state
    // Reset success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <div className="print:hidden">
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-md h-12"
          onChange={handleChange}
          value={email}
          required
          disabled={isSubmitting}
        />
        <Button
          className="flex items-center gap-2 px-2 rounded-md w-fit h-12 text-nowrap"
          size="lg"
          type="submit"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <span className="animate-pulse">Downloading...</span>
            </>
          ) : isSuccess ? (
            <>
              <Check size={16} />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Get the eBook</span>
            </>
          )}
        </Button>
      </form>

      {isSuccess && (
        <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
          <Check size={14} />
          <span>eBook downloaded! Check your downloads folder.</span>
        </div>
      )}
    </div>
  );
}
