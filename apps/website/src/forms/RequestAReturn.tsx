import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@thetis/ui/label";
import { Button } from "@thetis/ui/button";
import { Input } from "@thetis/ui/input";
import { Textarea } from "@thetis/ui/textarea";
import { Checkbox } from "@thetis/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";
import { Card, CardContent } from "@thetis/ui/card";
import { Alert, AlertDescription } from "@thetis/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@thetis/ui/form";
import { AlertCircle, HelpCircle, Info } from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    orderId: z.string().regex(/^\d{4}$/, "Order ID must be a 4-digit number"),
    country: z.string().min(1, "Please select your country"),
    returnReason: z.string().min(1, "Please select a return reason"),
    comfortIssues: z.array(z.string()).optional(),
    damageDescription: z.string().optional(),
    acceptablePrice: z.string().optional(),
    otherReason: z.string().optional(),
    otherComfortReason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export type FormStage = "info" | "reason" | "details" | "submit" | "complete";

interface RequestAReturnProps {
    initialStage?: FormStage;
}

export default function RequestAReturn(
    { initialStage = "info" }: RequestAReturnProps,
) {
    const [stage, setStage] = useState<FormStage>(initialStage);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            orderId: "",
            country: "",
            returnReason: "",
            comfortIssues: [],
            damageDescription: "",
            acceptablePrice: "",
            otherReason: "",
            otherComfortReason: "",
        },
    });

    const formData = form.watch();

    // Load form data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("returnFormData");

        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                form.reset(parsedData);
            } catch (error) {
                console.error("Error loading saved form data:", error);
            }
        }
    }, [form]);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("returnFormData", JSON.stringify(formData));
        localStorage.setItem("returnFormStage", stage);
    }, [formData, stage]);

    // Update URL when stage changes
    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("stage", stage);
        window.history.replaceState({}, "", url.toString());
    }, [stage]);

    const handleComfortIssueToggle = (issue: string) => {
        const currentIssues = formData.comfortIssues || [];
        const newIssues = currentIssues.includes(issue)
            ? currentIssues.filter((i: string) => i !== issue)
            : [...currentIssues, issue];
        form.setValue("comfortIssues", newIssues);
    };

    const canProceedToReason = () => {
        const { email, orderId, country } = formData;
        const hasRequiredFields = email && orderId && country;

        // Basic validation checks
        const isEmailValid = email?.includes("@") &&
            email?.includes(".");
        const isOrderIdValid = orderId && /^\d{4}$/.test(orderId);
        const isCountryValid = country &&
            (country === "uk" || country === "usa");

        return hasRequiredFields && isEmailValid && isOrderIdValid &&
            isCountryValid;
    };

    const canProceedToDetails = () => {
        return formData.returnReason &&
            formData.returnReason !== "not-approved";
    };

    const canSubmit = () => {
        if (formData.returnReason === "uncomfortable") {
            return (formData.comfortIssues?.length || 0) > 0;
        }
        if (formData.returnReason === "damaged") {
            return (formData.damageDescription?.trim() || "") !== "";
        }
        if (formData.returnReason === "expensive") {
            return (formData.acceptablePrice?.trim() || "") !== "";
        }
        if (formData.returnReason === "other") {
            return (formData.otherReason?.trim() || "") !== "";
        }
        return false;
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Prepare the form data for Formspree
            const formDataToSend = new FormData();
            formDataToSend.append("email", data.email);
            formDataToSend.append("order-id", data.orderId);
            formDataToSend.append(
                "country",
                data.country === "uk" ? "United Kingdom" : "United States",
            );
            formDataToSend.append("return-reason", data.returnReason);

            // Add additional details based on return reason
            if (data.returnReason === "uncomfortable") {
                formDataToSend.append(
                    "comfort-issues",
                    (data.comfortIssues || []).join(", "),
                );
                if (data.otherComfortReason) {
                    formDataToSend.append(
                        "other-comfort-reason",
                        data.otherComfortReason,
                    );
                }
            } else if (data.returnReason === "damaged") {
                formDataToSend.append(
                    "damage-description",
                    data.damageDescription || "",
                );
            } else if (data.returnReason === "expensive") {
                formDataToSend.append(
                    "acceptable-price",
                    data.acceptablePrice || "",
                );
            } else if (data.returnReason === "other") {
                formDataToSend.append("other-reason", data.otherReason || "");
            }

            const response = await fetch("https://formspree.io/f/xrgwkooy", {
                method: "POST",
                body: formDataToSend,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStage("complete");
            } else {
                throw new Error("Failed to submit form");
            }
        } catch (error) {
            setSubmitError(
                "Failed to submit your return request. Please try again.",
            );
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStageTitle = () => {
        switch (stage) {
            case "info":
                return "Contact Information";
            case "reason":
                return "Reason for Return";
            case "details":
                return "Additional Details";
            case "submit":
                return "Review & Submit";
            case "complete":
                return "Return Request Submitted";
            default:
                return "Request a Return";
        }
    };

    const getStageDescription = () => {
        switch (stage) {
            case "info":
                return "Please provide your contact information and order details. We'll use this to verify your purchase and process your return.";
            case "reason":
                return "Let us know why you'd like to return the splint. This helps us improve our products and provide better support.";
            case "details":
                return "Please provide additional details about your return. The more specific you can be, the faster we can process your return.";
            case "submit":
                return "Please review your information before submitting. You'll receive a confirmation email with return instructions.";
            case "complete":
                return "Thank you! We'll process your return request and get back to you within 24 hours with detailed return instructions.";
            default:
                return "Please fill out the form below and we'll get back to you with return instructions.";
        }
    };

    const getFAQContent = () => {
        switch (stage) {
            case "info":
                return {
                    title:
                        "Your order ID can be found in the confirmation email we sent when you placed your order. It's a 4-digit number like #1234.",
                    items: [] as string[],
                };
            case "reason":
                return null;
            case "details":
                return {
                    title:
                        "Photos help us understand your return better and process it faster. Clear images of any damage, fit issues, or problems will help us provide better support and potentially offer solutions before processing your return.",
                    items: [] as string[],
                };
            default:
                return null;
        }
    };

    const renderInfoStage = () => (
        <div className="space-y-6">
            <div className="gap-6 grid md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Business Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Order ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., 1234"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg">Country</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem
                                    value="uk"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">United Kingdom</span>
                                </SelectItem>
                                <SelectItem
                                    value="usa"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">United States</span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button
                onClick={async () => {
                    const isValid = await form.trigger([
                        "email",
                        "orderId",
                        "country",
                    ]);
                    if (isValid) {
                        setStage("reason");
                    }
                }}
                disabled={!canProceedToReason()}
                className="bg-primary hover:bg-primary/90 hover:shadow-md px-8 py-5 rounded-lg w-full md:w-auto font-medium text-white text-lg transition-all"
            >
                Continue
            </Button>
        </div>
    );

    const renderReasonStage = () => (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="returnReason"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg">
                            Reason for Return
                        </FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem
                                    value="uncomfortable"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">
                                        The splint was uncomfortable
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="damaged"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">
                                        The splint was damaged
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="not-approved"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">
                                        The splint was not approved by my care
                                        team
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="expensive"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">
                                        The splint was too expensive
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="other"
                                    className="py-3 text-base"
                                >
                                    <span className="pl-6">Other</span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {formData.returnReason === "not-approved" && (
                <Alert className="flex bg-red-50 border-red-200">
                    <div className="pt-1 min-w-8">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <AlertDescription className="text-red-800 text-lg">
                        We always recommend checking with your care team before
                        purchasing. Unfortunately, we cannot accept returns when
                        the product was not approved by your healthcare
                        provider.
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => setStage("info")}
                    className="px-8 py-5 rounded-lg font-medium text-lg"
                >
                    Back
                </Button>
                {formData.returnReason &&
                    formData.returnReason !== "not-approved" && (
                    <Button
                        onClick={() => setStage("details")}
                        className="bg-primary hover:bg-primary/90 hover:shadow-md px-8 py-5 rounded-lg w-full md:w-auto font-medium text-white text-lg transition-all"
                    >
                        Continue
                    </Button>
                )}
            </div>
        </div>
    );

    const renderDetailsStage = () => (
        <div className="space-y-6">
            {formData.returnReason === "uncomfortable" && (
                <div className="space-y-4">
                    <Label className="text-lg">
                        What made the splint uncomfortable?
                    </Label>
                    <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                        {[
                            "Dug into toe",
                            "Straps too tight",
                            "Curve of the splint not fit my leg",
                            "Held foot at too extreme angle",
                            "Straps touched scar",
                        ].map((issue) => (
                            <div
                                key={issue}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={issue}
                                    checked={(formData.comfortIssues || [])
                                        .includes(
                                            issue,
                                        )}
                                    onCheckedChange={() =>
                                        handleComfortIssueToggle(issue)}
                                />
                                <Label htmlFor={issue} className="text-lg">
                                    {issue}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <FormField
                        control={form.control}
                        name="otherComfortReason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">
                                    Other reason (optional)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Please describe any other comfort issues..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}

            {formData.returnReason === "damaged" && (
                <FormField
                    control={form.control}
                    name="damageDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                What was wrong with the splint?
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please describe the damage or issue..."
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {formData.returnReason === "expensive" && (
                <FormField
                    control={form.control}
                    name="acceptablePrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                What would be an acceptable price for you?
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., $150, £120"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {formData.returnReason === "other" && (
                <FormField
                    control={form.control}
                    name="otherReason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Please specify your reason for return
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please describe your reason for return..."
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {/* File Upload Section */}
            <div className="form-group">
                <Label htmlFor="photos" className="text-lg">
                    Upload Photos (Optional)
                </Label>
                <div className="relative">
                    <input
                        id="photos"
                        name="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="flex justify-center items-center bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 focus-within:border-primary rounded-md focus-within:ring-2 focus-within:ring-primary w-full h-12 text-lg transition-colors">
                        <span className="text-gray-500">Choose files...</span>
                    </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                    Photos help us understand your return better and process it
                    faster.
                </p>
            </div>

            <div className="flex gap-2">
                <Button
                    className="px-8 py-5 rounded-lg font-medium text-lg"
                    variant="outline"
                    onClick={() => setStage("reason")}
                >
                    Back
                </Button>
                <Button
                    onClick={() => setStage("submit")}
                    disabled={!canSubmit()}
                    className="bg-primary hover:bg-primary/90 hover:shadow-md px-8 py-5 rounded-lg w-full md:w-auto font-medium text-white text-lg transition-all"
                >
                    Continue
                </Button>
            </div>
        </div>
    );

    const renderSubmitStage = () => (
        <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="mb-4 font-semibold text-lg">Summary</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-base">
                    <div>
                        <span className="font-medium">Email:</span>{" "}
                        {formData.email}
                    </div>
                    <div>
                        <span className="font-medium">Order ID:</span>{" "}
                        {formData.orderId}
                    </div>
                    <div>
                        <span className="font-medium">Country:</span>{" "}
                        {formData.country === "uk"
                            ? "United Kingdom"
                            : "United States"}
                    </div>
                    <div>
                        <span className="font-medium">Reason:</span>{" "}
                        {formData.returnReason === "uncomfortable" &&
                            "The splint was uncomfortable"}
                        {formData.returnReason === "damaged" &&
                            "The splint was damaged"}
                        {formData.returnReason === "expensive" &&
                            "The splint was too expensive"}
                        {formData.returnReason === "other" && "Other"}
                    </div>
                </div>

                {/* Additional Details Section */}
                {formData.returnReason === "uncomfortable" &&
                    (formData.comfortIssues?.length || 0) > 0 && (
                    <div className="mt-4 pt-4 border-gray-200 border-t">
                        <span className="font-medium">Comfort Issues:</span>
                        <ul className="mt-2 text-gray-700 text-sm list-disc list-inside">
                            {(formData.comfortIssues || []).map((issue) => (
                                <li key={issue}>{issue}</li>
                            ))}
                        </ul>
                        {formData.otherComfortReason && (
                            <div className="mt-2">
                                <span className="font-medium">Other:</span>{" "}
                                {formData.otherComfortReason}
                            </div>
                        )}
                    </div>
                )}

                {formData.returnReason === "damaged" &&
                    formData.damageDescription && (
                    <div className="mt-4 pt-4 border-gray-200 border-t">
                        <span className="font-medium">Damage Description:</span>
                        <p className="mt-2 text-gray-700 text-sm">
                            {formData.damageDescription}
                        </p>
                    </div>
                )}

                {formData.returnReason === "expensive" &&
                    formData.acceptablePrice && (
                    <div className="mt-4 pt-4 border-gray-200 border-t">
                        <span className="font-medium">Acceptable Price:</span>
                        <p className="mt-2 text-gray-700 text-sm">
                            {formData.acceptablePrice}
                        </p>
                    </div>
                )}

                {formData.returnReason === "other" && formData.otherReason && (
                    <div className="mt-4 pt-4 border-gray-200 border-t">
                        <span className="font-medium">Other Reason:</span>
                        <p className="mt-2 text-gray-700 text-sm">
                            {formData.otherReason}
                        </p>
                    </div>
                )}
            </div>

            <Alert className="bg-amber-50 border-amber-200">
                <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-600 text-lg">
                        Please ensure your return meets our requirements:
                    </span>
                </div>
                <AlertDescription className="font-medium text-amber-800 text-base">
                    <ul className="space-y-1 mt-2 list-disc list-inside">
                        <li>Straps are not stretched or curling</li>
                        <li>No skin residue on straps or foam</li>
                        <li>All packaging and parts included</li>
                    </ul>
                </AlertDescription>
            </Alert>

            {submitError && (
                <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-800 text-lg">
                        {submitError}
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => setStage("details")}
                    disabled={isSubmitting}
                    className="px-8 py-5 rounded-lg font-medium text-lg"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 hover:shadow-md px-8 py-5 rounded-lg w-full md:w-auto font-medium text-white text-lg transition-all"
                >
                    {isSubmitting ? "Submitting..." : "Submit Return Request"}
                </Button>
            </div>
        </div>
    );

    const renderCompleteStage = () => (
        <div className="space-y-6">
            <div className="bg-primary/10 p-6 border border-primary/30 rounded-lg">
                <h3 className="mb-3 font-semibold text-primary text-lg">
                    ✅ Return Request Submitted Successfully
                </h3>
                <p className="text-neutral-700">
                    Thank you for your return request. We'll review it and get
                    back to you within 24 hours.
                </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="mb-3 font-semibold text-lg">
                    Return Instructions
                </h3>
                <div className="text-gray-700 text-lg">
                    <p className="font-medium">Return to:</p>
                    <p>Guy Solan</p>
                    {formData.country === "uk"
                        ? (
                            <>
                                <p>Park House,</p>
                                <p>Stilemans,</p>
                                <p>Hascombe Rd,</p>
                                <p>Godalming,</p>
                                <p>Surrey,</p>
                                <p>GU8 4AB</p>
                                <p className="mt-2">+44 7561 788783</p>
                            </>
                        )
                        : (
                            <>
                                <p>472 Amherst St.</p>
                                <p>Unit 7649000</p>
                                <p>Nashua</p>
                                <p>NH 03063</p>
                                <p className="mt-2">+1 781-491-0874</p>
                            </>
                        )}
                </div>
                <p className="mt-3 text-gray-600 text-lg">
                    💰 You will be refunded after receipt of the product. We aim
                    to process refunds within 7 days.
                </p>
            </div>

            <Button
                onClick={() => {
                    setStage("info");
                    form.reset({
                        email: "",
                        orderId: "",
                        country: "",
                        returnReason: "",
                        comfortIssues: [],
                        damageDescription: "",
                        acceptablePrice: "",
                        otherReason: "",
                        otherComfortReason: "",
                    });
                }}
                className="bg-primary hover:bg-primary/90 hover:shadow-md px-8 py-5 rounded-lg w-full md:w-auto font-medium text-white text-lg transition-all"
            >
                Submit Another Return
            </Button>
        </div>
    );

    // Modern stepper design
    const renderProgressIndicator = () => {
        if (stage === "complete") return null;

        const stages = [
            { key: "info", label: "Contact Info" },
            { key: "reason", label: "Return Reason" },
            { key: "details", label: "Details" },
            { key: "submit", label: "Review & Submit" },
        ];
        const currentIndex = stages.findIndex((s) => s.key === stage);

        return (
            <nav aria-label="Progress" className="mb-8">
                <ol className="flex justify-center items-center">
                    {stages.map((stageItem, index) => (
                        <li
                            key={stageItem.key}
                            className={`relative ${
                                index !== stages.length - 1
                                    ? "pr-8 sm:pr-20"
                                    : ""
                            }`}
                        >
                            <div className="z-10 relative flex flex-col items-center">
                                <div
                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                        index < currentIndex
                                            ? "border-primary bg-primary"
                                            : index === currentIndex
                                            ? "border-primary bg-primary"
                                            : "border-gray-300 bg-white"
                                    }`}
                                >
                                    {index < currentIndex
                                        ? (
                                            <svg
                                                className="w-5 h-5 text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )
                                        : (
                                            <span
                                                className={`text-sm font-medium ${
                                                    index === currentIndex
                                                        ? "text-white"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {index + 1}
                                            </span>
                                        )}
                                </div>
                                <span
                                    className={`mt-2 text-xs font-medium ${
                                        index <= currentIndex
                                            ? "text-gray-900"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {stageItem.label}
                                </span>
                            </div>
                            {index !== stages.length - 1 && (
                                <div
                                    className={`absolute top-4 left-8 -ml-px h-0.5 w-full z-0 ${
                                        index < currentIndex
                                            ? "bg-primary/70"
                                            : "bg-gray-300"
                                    }`}
                                />
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    };

    return (
        <div className="mx-auto w-full max-w-4xl">
            <Card className="bg-white shadow-lg border-0 w-full">
                <CardContent className="p-8 w-full">
                    <div className="space-y-8 w-full">
                        <div>
                            <h2 className="font-semibold text-neutral-950 text-2xl md:text-3xl leading-[105%]">
                                {getStageTitle()}
                            </h2>
                            <p className="mt-2 text-gray-800 text-lg leading-relaxed">
                                {getStageDescription()}
                            </p>
                        </div>

                        {renderProgressIndicator()}

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {stage === "info" && renderInfoStage()}
                                {stage === "reason" && renderReasonStage()}
                                {stage === "details" && renderDetailsStage()}
                                {stage === "submit" && renderSubmitStage()}
                                {stage === "complete" && renderCompleteStage()}
                            </form>
                        </Form>

                        {/* FAQ/Help Section */}
                        {stage !== "complete" && getFAQContent() && (
                            <div className="bg-blue-50 mt-8 p-4 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
                                    <p className="text-blue-800 text-sm leading-relaxed">
                                        {getFAQContent()?.title}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
