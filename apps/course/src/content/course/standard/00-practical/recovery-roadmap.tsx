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
        "Recovery is a marathon. Whether you've just been diagnosed or you're further along, this page gives you the full picture. We divide the 9–12 month journey into four phases based on criteria, not just the calendar.",
    blocks: [
        {
            type: "image",
            src: RecoveryRoadmap4Phases,
            alt: "Infographic showing the 4 phases of Achilles recovery: Protection (Weeks 0-10), Transition (Weeks 10-12), Capacity (Weeks 12-26), and Return to Sport (Weeks 26+)",
            caption: "The 4 phases of recovery — from protection to return to sport",
        },
        {
            type: "section",
            title: "The 4 Phases at a Glance",
            content: [
                {
                    type: "text",
                    content:
                        "Each phase has a clear focus and a key milestone. You move on when you meet the criteria, not just when the calendar says.",
                },
                {
                    type: "card",
                    title: "1. Protection — Weeks 0–10",
                    description: "In the boot: protecting the healing tendon",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your foot stays pointed down in the boot. Most protocols keep maximum angle until **week 5**, when wedge removal or hinge adjustment typically begins. The boot usually comes off around **week 10**.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** End of boot protocol (week 8–10)",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "2. Transition — Weeks 10–12",
                    description: "Out of the boot: learning to walk normally",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "First steps in shoes (often with a heel lift), rebuilding confidence and a normal walking pattern. Physiotherapy usually starts in this phase.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** Pain-free walking (week 10–12)",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "3. Capacity — Weeks 12–26",
                    description: "Building single-leg strength",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Progressive strengthening, balance, and function. The main target: enough strength to move safely to higher-impact activity.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** 25 single-leg heel raises",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "4. Return to Sport — Week 26+",
                    description: "Power, impact, and full competition",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Running, jumping, and sport-specific training. Return to full competition is typically 6–12 months after injury.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** Full return to sport (when criteria met)",
                        },
                    ],
                },
                {
                    type: "alert",
                    variant: "info",
                    title: "Week 5: a common pinch point",
                    content:
                        "Around **week 5** most protocols start lowering your heel (wedge removal or hinge adjustment). It often **feels tighter or more uncomfortable** as the foot comes down — that's normal. Don't rush; follow your team's schedule.",
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
