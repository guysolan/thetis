import { useState } from "react";
import { Input } from "@thetis/ui/input";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import { markEmailAsSubscribed } from "@/lib/subscription-storage";
import { Check, Download } from "lucide-react";

export default function MiniSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    console.log("Starting submission process with email:", email);

    if (!email) return;

    setIsSubmitting(true);
    setError("");
    const pdfUrl = "/documents/Achilles_Tendon_Rupture_eBook.pdf";
    console.log("Attempting to download PDF from:", pdfUrl);

    try {
      // Step 1: Add to mailing list using Supabase
      console.log("Adding to mailing list...");
      const normalizedEmail = email.toLowerCase().trim();

      // Note: We don't include 'id' - it will auto-generate via DEFAULT gen_random_uuid()
      const { data, error: supabaseError } = await supabase
        .from("users")
        .upsert(
          {
            email: normalizedEmail,
            email_course_enabled: true,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "email",
            ignoreDuplicates: false, // Update if exists
          },
        )
        .select();

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw new Error("Failed to save your information");
      }

      // Mark email as subscribed in localStorage
      markEmailAsSubscribed(normalizedEmail);

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
      setError(
        error instanceof Error
          ? error.message
          : "There was an error processing your request. Please try again.",
      );
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
          {isSubmitting
            ? (
              <>
                <span className="animate-pulse">Downloading...</span>
              </>
            )
            : isSuccess
            ? (
              <>
                <Check size={16} />
                <span>Downloaded!</span>
              </>
            )
            : (
              <>
                <Download size={16} />
                <span>Get the eBook</span>
              </>
            )}
        </Button>
      </form>

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">
          <span>{error}</span>
        </div>
      )}
      {isSuccess && (
        <div className="flex items-center gap-1 mt-2 text-primary text-sm">
          <Check size={14} />
          <span>eBook downloaded! Check your downloads folder.</span>
        </div>
      )}
    </div>
  );
}
