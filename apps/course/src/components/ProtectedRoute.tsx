import { Navigate } from "@tanstack/react-router";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useEnrollment, type CourseType } from "@/hooks/use-enrollment";
import { Loader2 } from "lucide-react";

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
  const { hasAccess, loading: enrollmentLoading, enrollments } = useEnrollment();

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

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/claim" />;
  }

  if (requiredCourse && email && !enrollmentLoading) {
    const access = hasAccess(requiredCourse);
    if (!access) {
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
