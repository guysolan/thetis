import type { SectionContent } from "@/components/course/types";
import RecoveryRoadmap4Phases from "@/assets/recovery-roadmap-4-phases.png";

export const metadata = {
    slug: "recovery-roadmap",
    title: "The Achilles Recovery Roadmap",
    description: "An overview of the 4 phases of your recovery journey",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Recovery is a marathon. We divide the 9–12 month journey into four phases based on criteria, not just the calendar.",
    blocks: [
        {
            type: "image",
            src: RecoveryRoadmap4Phases,
            alt: "Infographic showing the 4 phases of Achilles recovery: Protection (Weeks 0-8), Transition (Weeks 8-12), Capacity (Weeks 12-26), and Return to Sport (Weeks 26+)",
            caption: "The 4 phases of recovery — from protection to return to sport",
        },
        {
            type: "section",
            title: "The 4 Phases of Recovery",
            content: [
                {
                    type: "table",
                    headers: ["Phase", "Focus", "Key Milestone"],
                    rows: [
                        [
                            "**1: Protection**",
                            "Protecting the healing tendon.",
                            "End of boot protocol (Wk 8-10)",
                        ],
                        [
                            "**2: Transition**",
                            "Learning to walk normally.",
                            "Pain-free walking (Wk 10-12)",
                        ],
                        [
                            "**3: Capacity**",
                            "Single-leg strength.",
                            "25 Single-leg heel raises",
                        ],
                        [
                            "**4: Return to Sport**",
                            "Power and impact.",
                            "Full competition (6-12m)",
                        ],
                    ],
                },
            ],
        },
        {
            type: "alert",
            variant: "info",
            title: "Criteria over Calendar",
            content:
                "If it takes you longer to meet a milestone, that's fine. Moving fast is risky; moving well is the goal.",
        },
    ],
};
