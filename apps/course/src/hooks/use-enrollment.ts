import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSimpleAuth } from "./use-simple-auth";

type CourseType = "standard" | "premium" | "essentials" | "professionals";

const COURSE_SLUGS = ["standard_course", "premium_course"];

/** Maps product_slug to display course_type */
function slugToCourseType(slug: string): CourseType {
    return slug === "premium_course" ? "premium" : "standard";
}

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
        if (authLoading) return;
        if (!email) {
            setEnrollments([]);
            setLoading(false);
            return;
        }

        const fetchEnrollments = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("purchases")
                    .select(
                        "id, product_slug, status, purchased_at, shopify_order_number",
                    )
                    .eq("shopify_customer_email", email.toLowerCase())
                    .eq("status", "active")
                    .in("product_slug", COURSE_SLUGS);

                if (error) {
                    console.error("Error fetching purchases (course):", error);
                    setEnrollments([]);
                } else {
                    const mapped: Enrollment[] = (data || []).map((p) => ({
                        id: p.id,
                        course_type: slugToCourseType(p.product_slug),
                        status: p.status,
                        purchased_at: p.purchased_at,
                        shopify_order_number: p.shopify_order_number,
                    }));
                    setEnrollments(mapped);
                    if (process.env.NODE_ENV === "development") {
                        console.log("Enrollments loaded (from purchases):", {
                            userEmail: email,
                            enrollments: mapped,
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch purchases (course):", err);
                setEnrollments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [email, authLoading]);

    const hasAccess = (courseType: CourseType): boolean => {
        const effective: CourseType =
            courseType === "essentials"
                ? "standard"
                : courseType === "professionals"
                    ? "premium"
                    : courseType;
        return enrollments.some(
            (e) => e.course_type === effective && e.status === "active",
        );
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
