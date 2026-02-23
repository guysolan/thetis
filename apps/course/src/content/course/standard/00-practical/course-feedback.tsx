import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "course-feedback",
    title: "Course Feedback",
    description:
        "Share your experience — did the course help? We'd love to hear from you.",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Your feedback helps us improve the course and helps others know what to expect. Please take a moment to share your experience.",
    blocks: [
        {
            type: "course-feedback-form",
        },
    ],
};
