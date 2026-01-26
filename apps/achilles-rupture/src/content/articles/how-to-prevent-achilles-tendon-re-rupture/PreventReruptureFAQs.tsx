import React from "react";
import FAQs from "../../../components/FAQs";
import type { FAQItem } from "../../../components/FAQs";

const PreventReruptureFAQs: React.FC = () => {
    const faqData: FAQItem[] = [
        {
            question:
                "What are the signs that my Achilles tendon is healing well during recovery?",
            answer:
                "Healing progress for your Achilles tendon often shows up in a few noticeable ways: less pain, reduced swelling, and better ankle mobility. You might also feel your calf muscles getting stronger and find it easier to put weight on the injured leg, but only as recommended by your healthcare provider. Another encouraging sign is being able to do your rehab exercises with little to no discomfort.\n\nKeep a close eye on these changes and make sure to attend regular check-ins with your doctor or physical therapist. Recovery takes time, so it's crucial to pace yourself and avoid jumping back into activities that could overwork your tendon. Slow and steady wins this race!",
        },
        {
            question:
                "When is it safe to move from low-impact activities to high-impact sports after an Achilles tendon rupture?",
            answer:
                "The timing for moving from low-impact activities like swimming or cycling to high-impact sports such as running or jumping depends on how well your recovery is progressing and whether you've hit key milestones. Generally, most people can begin low-impact exercises around 12 to 16 weeks after surgery, as long as they've regained enough ankle strength and range of motion.\n\nHigh-impact sports, on the other hand, are usually safe to resume no earlier than 20 weeks post-injury. However, this is only advisable if you've met certain rehab goals, like achieving full ankle mobility, building strong calf muscles, and being able to perform pain-free heel raises. A step-by-step return-to-sport plan is crucial, and you should keep an eye out for any pain or signs of re-injury during this phase.",
        },
        {
            question:
                "What lifestyle habits can help protect your Achilles tendon and prevent re-injury?",
            answer:
                "To take care of your Achilles tendon and lower the chance of re-injury, focus on a few essential habits. Start by keeping a healthy weight, as this helps reduce the stress placed on the tendon. Incorporate low-impact activities like swimming or cycling into your routine - they're great for building strength and flexibility without putting too much pressure on the tendon. Always remember to gradually increase your activity levels and include proper warm-up and cool-down sessions to avoid unnecessary strain.\n\nYou can also strengthen the tendon over time with exercises like heel raises and calf stretches. These moves are simple but effective for improving resilience. Another important step is wearing supportive shoes with good cushioning. This helps absorb impact and reduces strain whether you're exercising or just going about your day. These small adjustments can make a big difference in protecting your tendon and keeping injuries at bay.",
        },
    ];

    return <FAQs faqs={faqData} />;
};

export default PreventReruptureFAQs;
