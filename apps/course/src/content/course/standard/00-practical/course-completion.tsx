import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "course-completion",
    title: "Congratulations!",
    description:
        "You've completed the Achilles Recovery Course. Here's your certificate.",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "You've reached the end of the Achilles Recovery Course. You've learned about emergency care, boot progression, physiotherapy, return to sport, and long-term care. Well done for sticking with it.",
    blocks: [
        {
            type: "certificate",
        },
        {
            type: "card",
            title: "What's next?",
            description: "Keep applying what you've learned.",
            variant: "highlight",
            content: [
                {
                    type: "list",
                    style: "bullet",
                    items: [
                        "**Continue strengthening** — your tendon benefits from ongoing strength work",
                        "**Share your progress** — help others by leaving feedback below",
                        "**Refer back to the course** — use the appendix and lessons whenever you need a refresher",
                    ],
                },
            ],
        },
    ],
};
