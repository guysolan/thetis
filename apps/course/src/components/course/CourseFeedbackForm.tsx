import { useState } from "react";
import { Button } from "@thetis/ui/button";
import { Input } from "@thetis/ui/input";
import { Textarea } from "@thetis/ui/textarea";
import { Label } from "@thetis/ui/label";
import { Check, Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqdlqay";

export default function CourseFeedbackForm() {
    const [courseHelp, setCourseHelp] = useState("");
    const [backToSport, setBackToSport] = useState("");
    const [improvements, setImprovements] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("_subject", "Achilles Recovery Course Feedback");
            formData.append("Did the course help?", courseHelp);
            formData.append("Are you back to sport?", backToSport);
            formData.append("What could be better in the course?", improvements);

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to submit feedback");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="my-8 p-6 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl text-center">
                <Check className="mx-auto mb-4 w-12 h-12 text-primary" />
                <p className="mb-2 font-semibold text-foreground text-lg">
                    Thank you for your feedback!
                </p>
                <p className="text-muted-foreground">
                    Your response helps us improve the course for others.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="my-8 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="course-help">Did the course help?</Label>
                <Input
                    id="course-help"
                    type="text"
                    value={courseHelp}
                    onChange={(e) => setCourseHelp(e.target.value)}
                    placeholder="e.g. Yes, the boot progression was really clear"
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="back-to-sport">Are you back to sport?</Label>
                <Input
                    id="back-to-sport"
                    type="text"
                    value={backToSport}
                    onChange={(e) => setBackToSport(e.target.value)}
                    placeholder="e.g. Not yet, but I'm running again"
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="improvements">What could be better in the course?</Label>
                <Textarea
                    id="improvements"
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    placeholder="Any suggestions for improvement..."
                    rows={4}
                    className="w-full"
                />
            </div>

            {error && (
                <p className="text-destructive text-sm">{error}</p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Feedback"
                )}
            </Button>
        </form>
    );
}
