import { BookOpen, GraduationCap, Video, Check } from "lucide-react";

export const courseData = {
    standard: {
        title: "Recovery Standard Course",
        badge: "Standard Course",
        badgeColor: "bg-primary/10 text-primary",
        description:
            "31 lessons covering every stage of Achilles rupture recovery. Expert guidance, physio exercises, and practical tips. Start your journey with confidence.",
        price: "£29.99",
        icon: BookOpen,
        features: [
            "31 easy-to-digest lessons",
            "Questions for your surgeon",
            "Physio exercises with illustrations",
            "Product recommendations",
            "Boot comparison guide (Aircast vs VACOped)",
            "Sleep and washing solutions",
            "Week-by-week recovery timeline",
            "What's normal vs what's urgent",
        ],
        whatYoullLearn: [
            {
                title: "Week 0: Emergency Care",
                description:
                    "What just happened, A&E expectations, blood clot prevention, and choosing your walking boot.",
            },
            {
                title: "Week 1-2: Home Setup",
                description:
                    "Setting up your recovery station, elevation techniques, sleeping solutions, and what's normal vs urgent.",
            },
            {
                title: "Week 3-6: First Movements",
                description:
                    "Safe exercises, early mobility within your boot, and progressive weight bearing.",
            },
            {
                title: "Week 7+: Return to Activity",
                description:
                    "Transitioning out of the boot, building strength, and returning to normal life.",
            },
        ],
    },
    premium: {
        title: "Premium Recovery Course",
        badge: "Premium Course",
        badgeColor:
            "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
        description:
            "Expert-led video lessons and personalized guidance for those who want the best possible recovery. From specialist surgeons and elite sports physios.",
        price: "£99",
        icon: GraduationCap,
        features: [
            "Everything in Standard (31 lessons)",
            "Specialist surgeon video lessons",
            "8 recovery hacks from elite athletes",
            "Return-to-sport protocols",
            "Personalized exercise progressions",
            "Direct access to recovery experts",
            "Community support forum",
            "Priority email support",
        ],
        videoTopics: [
            {
                title: "Surgery vs Conservative Treatment",
                description:
                    "Expert surgeon explains when surgery is truly needed and when conservative treatment works best.",
            },
            {
                title: "Optimal Rehabilitation Protocols",
                description:
                    "Evidence-based exercise progressions for each stage of recovery.",
            },
            {
                title: "Return to Sport Assessment",
                description:
                    "How to know when you're truly ready to return to running and sport.",
            },
            {
                title: "Preventing Re-rupture",
                description:
                    "Key strategies to minimize your risk of re-injury long-term.",
            },
        ],
    },
};

