import React from "react";
import FAQs from "./FAQs";
import type { FAQItem } from "./FAQs";

const EquipmentFAQs: React.FC = () => {
    const faqData: FAQItem[] = [
        {
            question: "Why is the night splint essential for recovery?",
            answer:
                'The Thetis night splint solves the #1 complaint during recovery: sleeping in a heavy boot. Benefits include:\n\n• Lightweight (unlike the boot)\n• Allows air circulation to prevent sweating\n• Easy to adjust for comfort\n• Only takes seconds to put on/remove\n\n"I\'ve been able to sleep well and the splint has remained secure. The recovery of my Achilles tendon remains on track too." - Patient review',
        },
        {
            question: "Is the Thetis splint worth the investment?",
            answer:
                'Patients consistently report it\'s worth every penny. Here\'s what they say:\n\n• "This product works perfect to keep my foot in forward flexion as I sleep" - Rob\n• "It was fantastic being able to remove the boot and sleep comfortably" - Anas\n• "This splint has been a very worthwhile purchase" - Patient\n• "It\'s a good example of a small company that\'s identified a problem and provided a solution" - Patient\n\nConsider this: One night of poor sleep affects your recovery. The splint pays for itself in better healing outcomes.',
        },
        {
            question: "What do surgeons say about the night splint?",
            answer:
                'Leading foot and ankle surgeons strongly recommend it:\n\n"When I tore my own Achilles tendon, the hardest part of the recovery was having to wear the hospital boot in bed at night for many weeks. It is fantastic that Thetis Medical have produced this night-splint. It is certain to improve the recovery experience for patients." - Mr James Davis, Past President of BOFAS\n\n"I have found the Thetis splint particularly effective in bridging the gap between immobilization and active recovery." - Dr Robbie Ray, Foot and Ankle Surgeon',
        },
        {
            question: "Can I use the night splint immediately after injury?",
            answer:
                'Always consult your surgeon first. Most patients start using it after:\n\n• Initial cast removal (usually 2 weeks)\n• When transitioning to a boot\n• With surgeon approval for night-time use\n\n⚠️ Never use for weight bearing - night time and resting only\n\n"Although this splint is intended for night use only. I used it day and night for immobilization in my first 4 weeks after Achilles repair" - Thomas',
        },
        {
            question: "What about other recovery equipment priorities?",
            answer:
                "Essential items (first 2 weeks):\n• Walking boot (foundation of recovery)\n• Night splint (for sleep from week 2-3)\n• Waterproof cover (infection prevention)\n• EVENup leveler (prevent back pain)\n\nComfort upgrades (weeks 3-12):\n• Crutch handles (40% pain reduction)\n• Elevation wedge (swelling control)\n• Merino socks (temperature regulation)",
        },
        {
            question: "How long will I need these items?",
            answer:
                'Recovery timelines vary, but typical usage:\n\n• Boot: 8-12 weeks full time\n• Night splint: 3-6 months (longer for comfort)\n• EVENup: As long as wearing boot\n• Crutches: 2-8 weeks depending on protocol\n\n"I certainly recommend this product over cast or slab after achilles repair if the surgeon prefers non weight bearing early post op." - Thomas',
        },
    ];

    return <FAQs faqs={faqData} />;
};

export default EquipmentFAQs;
