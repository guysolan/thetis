import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSimpleAuth } from "./use-simple-auth";

export type CourseType =
  | "standard"
  | "premium"
  | "essentials"
  | "professionals"
  | "plantar-fasciitis";

const COURSE_SLUGS = [
  "standard_course",
  "premium_course",
  "plantar_fasciitis_course",
];

function slugToCourseType(slug: string): CourseType {
  if (slug === "premium_course") return "premium";
  if (slug === "plantar_fasciitis_course") return "plantar-fasciitis";
  return "standard";
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
    let effective: CourseType;
    switch (courseType) {
      case "essentials":
        effective = "standard";
        break;
      case "professionals":
        effective = "premium";
        break;
      default:
        effective = courseType;
    }
    return enrollments.some(
      (e) => e.course_type === effective && e.status === "active",
    );
  };

  /** True when the user has at least one active course purchase. */
  const hasAnyCourseAccess = (): boolean => {
    return enrollments.some((e) => e.status === "active");
  };

  const getEnrollments = (): Enrollment[] => {
    return enrollments;
  };

  return {
    enrollments,
    loading,
    hasAccess,
    hasAnyCourseAccess,
    getEnrollments,
  };
}
