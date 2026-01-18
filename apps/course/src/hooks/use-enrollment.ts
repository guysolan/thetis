import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSimpleAuth } from "./use-simple-auth";

type CourseType = "standard" | "premium" | "essentials" | "professionals";

interface Enrollment {
    id: string;
    course_type: CourseType;
    status: string;
    purchased_at: string;
    shopify_order_number?: string;
}

export function useEnrollment() {
    const { email, loading: authLoading } = useSimpleAuth();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait for auth to finish loading before checking enrollments
        if (authLoading) {
            return;
        }

        if (!email) {
            setEnrollments([]);
            setLoading(false);
            return;
        }

        // Fetch enrollments by email
        const fetchEnrollments = async () => {
            setLoading(true);

            try {
                // Query by both shopify_customer_email and user_email to handle all cases
                const { data, error } = await supabase
                    .from("enrollments")
                    .select(
                        "id, course_type, status, purchased_at, shopify_order_number",
                    )
                    .or(`shopify_customer_email.eq.${email.toLowerCase()},user_email.eq.${email.toLowerCase()}`)
                    .eq("status", "active");

                if (error) {
                    console.error("Error fetching enrollments:", error);
                    setEnrollments([]);
                } else {
                    setEnrollments(data || []);
                    // Debug logging
                    if (process.env.NODE_ENV === "development") {
                        console.log("Enrollments loaded:", {
                            userEmail: email,
                            enrollments: data || [],
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch enrollments:", err);
                setEnrollments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [email, authLoading]);

    const hasAccess = (courseType: CourseType): boolean => {
        const hasAccessResult = enrollments.some(
            (e) => e.course_type === courseType && e.status === "active",
        );

        // Debug logging in development
        if (process.env.NODE_ENV === "development") {
            console.log("hasAccess check:", {
                courseType,
                enrollments,
                hasAccessResult,
            });
        }

        return hasAccessResult;
    };

    const getEnrollments = (): Enrollment[] => {
        return enrollments;
    };

    return {
        enrollments,
        loading,
        hasAccess,
        getEnrollments,
    };
}
