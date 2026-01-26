import { Navigate } from "@tanstack/react-router";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useEnrollment } from "@/hooks/use-enrollment";
import { Loader2 } from "lucide-react";

type CourseType = "standard" | "premium" | "essentials" | "professionals";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredCourse?: CourseType;
    requireAuth?: boolean;
}

export function ProtectedRoute({
    children,
    requiredCourse,
    requireAuth = true,
}: ProtectedRouteProps) {
    const { email, loading: authLoading, isAuthenticated } = useSimpleAuth();
    const { hasAccess, loading: enrollmentLoading, enrollments } =
        useEnrollment();

    // Show loading state
    if (authLoading || enrollmentLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Require authentication - redirect to claim page
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/claim" />;
    }

    // Require course enrollment - redirect back to home page
    // Only check if we're done loading and have an email
    if (requiredCourse && email && !enrollmentLoading) {
        const access = hasAccess(requiredCourse);
        if (!access) {
            // Debug logging in development
            if (process.env.NODE_ENV === "development") {
                console.log("ProtectedRoute: Access denied", {
                    requiredCourse,
                    email,
                    enrollments,
                    enrollmentCount: enrollments.length,
                    hasAccess: access,
                });
            }
            return <Navigate to="/" />;
        }
    }

    return <>{children}</>;
}
