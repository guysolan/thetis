import { createFileRoute, Navigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useEnrollment } from "@/hooks/use-enrollment";
import { supabase } from "@/lib/supabase"; // Still needed for enrollment check
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/claim")({
    component: ClaimPage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            email: (search.email as string) || "",
            order: (search.order as string) || "",
        };
    },
});

function ClaimPage() {
    const {
        email: currentEmail,
        loading: authLoading,
        signIn,
        isAuthenticated,
    } = useSimpleAuth();
    const { hasAccess, loading: enrollmentLoading } = useEnrollment();
    const { email: prefillEmail, order } = useSearch({ from: "/claim" });
    const [email, setEmail] = useState(prefillEmail || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [orderValid, setOrderValid] = useState<boolean | null>(null);
    const [hasPurchase, setHasPurchase] = useState<boolean | null>(null);
    const [hasAttemptedValidation, setHasAttemptedValidation] = useState(false);
    const [enrollmentInfo, setEnrollmentInfo] = useState<
        {
            courseType: string;
            orderNumber: string;
        } | null
    >(null);

    // If we have both email and order from URL, verify the order
    // If not, we'll allow manual email entry (skip order verification)
    const hasOrderParams = Boolean(prefillEmail && order);

    // Check if email has a purchase (enrollment)
    useEffect(() => {
        const checkPurchase = async () => {
            const emailToCheck = email.toLowerCase().trim();
            if (!emailToCheck) {
                setVerifying(false);
                setHasPurchase(null);
                return;
            }

            try {
                // Check if enrollment exists for this email (with or without order number)
                let query = supabase
                    .from("enrollments")
                    .select("course_type, shopify_order_number, status")
                    .eq("shopify_customer_email", emailToCheck)
                    .eq("status", "active")
                    .limit(1);

                // If we have order params, also match by order number
                if (hasOrderParams && order) {
                    const orderNumber = order.startsWith("#")
                        ? order
                        : `#${order}`;
                    query = query.eq("shopify_order_number", orderNumber);
                }

                const { data, error } = await query.maybeSingle();

                // Debug logging
                console.log("Claim page - checking purchase:", {
                    email: emailToCheck,
                    hasOrderParams,
                    order,
                    data,
                    error,
                });

                if (error || !data) {
                    // No purchase found
                    console.log("No purchase found:", error);
                    setHasPurchase(false);
                    if (hasOrderParams) {
                        setOrderValid(false);
                    }
                } else {
                    // Purchase found!
                    console.log("Purchase found!", data);
                    setHasPurchase(true);
                    setOrderValid(true);
                    setEnrollmentInfo({
                        courseType: data.course_type,
                        orderNumber: data.shopify_order_number,
                    });
                }
            } catch (err) {
                console.error("Failed to check purchase:", err);
                setHasPurchase(false);
                if (hasOrderParams) {
                    setOrderValid(false);
                }
            } finally {
                setVerifying(false);
            }
        };

        // Only check if we have an email (from params or user input)
        if (email) {
            checkPurchase();
        } else {
            setVerifying(false);
        }
    }, [email, hasOrderParams, order]);

    // If logged in and already has access, redirect to home
    useEffect(() => {
        if (
            !authLoading && !enrollmentLoading && isAuthenticated &&
            hasAccess("standard")
        ) {
            window.location.href = "/";
        }
    }, [isAuthenticated, authLoading, enrollmentLoading, hasAccess]);

    // After successful claim, redirect to home
    useEffect(() => {
        if (success && isAuthenticated) {
            // Small delay to show success message
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        }
    }, [success, isAuthenticated]);

    // Removed auto-claim - user must click button to validate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setHasAttemptedValidation(true);
        setLoading(true);

        const emailToCheck = email.toLowerCase().trim();
        if (!emailToCheck) {
            setError("Please enter your email address.");
            setLoading(false);
            return;
        }

        // Check if email has purchase
        try {
            let query = supabase
                .from("enrollments")
                .select("course_type, shopify_order_number, status")
                .or(`shopify_customer_email.eq.${emailToCheck},user_email.eq.${emailToCheck}`)
                .eq("status", "active")
                .limit(1);

            // If we have order params, also match by order number
            if (hasOrderParams && order) {
                const orderNumber = order.startsWith("#") ? order : `#${order}`;
                query = query.eq("shopify_order_number", orderNumber);
            }

            const { data, error: checkError } = await query.maybeSingle();

            if (checkError || !data) {
                // No purchase found - show error
                setError(
                    "No purchase found for this email. Please check your email or contact support.",
                );
                setLoading(false);
                return;
            }

            // Purchase found - sign them in
            signIn(emailToCheck);
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            console.error("Failed to validate purchase:", err);
            setError(
                "An error occurred while validating your purchase. Please try again.",
            );
            setLoading(false);
        }
    };

    if (authLoading || enrollmentLoading || verifying) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-muted-foreground">
                                {verifying
                                    ? "Verifying your order..."
                                    : "Loading..."}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show error if order verification failed (only when we had order params)
    if (orderValid === false && hasOrderParams) {
        return (
            <div className="flex justify-center items-center bg-muted/30 min-h-[80vh]">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-destructive" />
                            <CardTitle>Order Not Found</CardTitle>
                        </div>
                        <CardDescription>
                            We couldn't find an order matching your email and
                            order number.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="mb-2 font-medium text-sm">Details:</p>
                            {prefillEmail && (
                                <p className="text-muted-foreground text-sm">
                                    Email: {prefillEmail}
                                </p>
                            )}
                            {order && (
                                <p className="text-muted-foreground text-sm">
                                    Order: {order}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground text-sm">
                                This could mean:
                            </p>
                            <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                                <li>
                                    The order hasn't been processed yet (wait a
                                    few minutes)
                                </li>
                                <li>The email or order number doesn't match</li>
                                <li>
                                    The order doesn't contain a course product
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button asChild>
                                <Link
                                    to="/claim"
                                    search={{ email: "", order: "" }}
                                >
                                    Try Again
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="https://thetismedical.com">
                                    Back to Website
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex justify-center items-center bg-muted/30 min-h-[80vh]">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle>Welcome!</CardTitle>
                        <CardDescription>
                            Redirecting to your course...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center bg-muted/30 min-h-[80vh]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        {hasOrderParams
                            ? "Thanks for your purchase!"
                            : "Access Your Course"}
                    </CardTitle>
                    <CardDescription>
                        {hasPurchase && enrollmentInfo
                            ? `We found your ${enrollmentInfo.courseType} course purchase (${enrollmentInfo.orderNumber}). Click below to access your course!`
                            : hasPurchase
                            ? `We found your course purchase. Click below to access your course!`
                            : hasOrderParams
                            ? `Order ${order} is ready. Enter your email to access your course.`
                            : "Enter your email to access your purchased course."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-sm"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed"
                                placeholder="you@example.com"
                            />
                            {hasPurchase && (
                                <p className="mt-1 text-primary text-xs">
                                    ✓ Purchase found! Click below to access your
                                    course.
                                </p>
                            )}
                        </div>

                        {error && hasAttemptedValidation && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}
                        {!hasPurchase && email && !verifying &&
                            hasAttemptedValidation && !error && (
                            <p className="mt-1 text-destructive text-xs">
                                No purchase found for this email. Please check
                                your email or contact support.
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading || !email.trim()}
                        >
                            {loading
                                ? "Validating..."
                                : hasPurchase
                                ? "Access Your Course"
                                : "Validate Email"}
                        </Button>

                        {hasPurchase && enrollmentInfo && (
                            <div className="bg-primary/10 p-4 rounded-lg">
                                <p className="mb-1 font-medium text-sm">
                                    Your {enrollmentInfo.courseType}{" "}
                                    course is ready!
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Order: {enrollmentInfo.orderNumber}
                                </p>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
