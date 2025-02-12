import { useState } from "react";
import { Input } from "@thetis/ui/input";
import { Button } from "../ui/button";
import { subscribePatient } from "./api/subscribe";

export default function MiniSubscribe() {
  const [email, setEmail] = useState("");

  console.log(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    console.log("Starting submission process with email:", email);

    if (!email) return;

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
    } catch (error) {
      console.error("Detailed error:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Actually update the email state
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="rounded-md h-12"
        onChange={handleChange}
        required
      />
      <Button
        className="px-2 rounded-md w-fit h-12 text-nowrap"
        size="lg"
        type="submit"
      >
        Get the eBook
      </Button>
    </form>
  );
}
