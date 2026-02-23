import type { SectionContent } from "@/components/course/types";
// IMAGE TO UPDATE: recovery-roadmap-4-phases.png — update to show 4 Stages (not Phases): Stage 1 Protection, Stage 2 Transition, Stage 3 Capacity, Stage 4 Return to Sport
import RecoveryRoadmap4Phases from "@/assets/recovery-roadmap-4-phases.png";

export const metadata = {
    slug: "recovery-roadmap",
    title: "The Achilles Recovery Roadmap",
    description: "An overview of the 4 stages of your recovery journey",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "Recovery is a marathon. Whether you've just been diagnosed or you're further along, this page gives you the full picture. We divide the 9–12 month journey into four stages based on criteria, not just the calendar.",
    blocks: [
        {
            type: "image",
            src: RecoveryRoadmap4Phases,
            alt: "Infographic showing the 4 stages of Achilles recovery: Stage 1 Immobilization (weeks 0-6), Stage 2 Post-immobilization (weeks 6-12), Stage 3 Single leg capacity (weeks 18-24), Stage 4 Power development (weeks 24+)",
            caption: "The 4 stages of recovery — from immobilization to return to sport",
        },
        {
            type: "section",
            title: "The 4 Stages at a Glance",
            content: [
                {
                    type: "text",
                    content:
                        "Each stage has a clear focus and a key milestone. You move on when you meet the criteria, not just when the calendar says.",
                },
                {
                    type: "card",
                    title: "Stage 1: Protection — ~10 weeks (weeks 0–10)",
                    description: "In the boot: protecting the healing tendon",
                    variant: "highlight",
                    content: [
                        {
                            type: "text",
                            content:
                                "Your foot stays pointed down in the boot. Most protocols keep maximum angle until **week 5**, when wedge removal or hinge adjustment typically begins. Boot removal timing varies by protocol (often week 8–12).",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** End of boot protocol",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 2: Transition — ~2 weeks (weeks 10–12)",
                    description: "Out of the boot: rebuilding a normal walking pattern",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "First steps in shoes (often with a heel lift), rebuilding confidence and a normal walking pattern. Physiotherapy usually starts in this stage. Targets include **15+ double-leg heel raises**, 1.4x body weight strength (isometric), balance training.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** Pain-free walking, 15+ double-leg heel raises",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 3: Capacity — ~14 weeks (weeks 12–26)",
                    description: "Building single-leg strength and capacity",
                    variant: "default",
                    content: [
                        {
                            type: "text",
                            content:
                                "Progressive strengthening, gait preparation, plyometric preparation. Targets include 15 single-leg heel raises (mid-point). The main target: enough strength to move safely to higher-impact activity.",
                        },
                        {
                            type: "text",
                            content: "**Key milestone:** 25+ single-leg heel raises, ready for Stage 4",
                        },
                    ],
                },
                {
                    type: "card",
                    title: "Stage 4: Return to Sport — weeks 26+",
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
