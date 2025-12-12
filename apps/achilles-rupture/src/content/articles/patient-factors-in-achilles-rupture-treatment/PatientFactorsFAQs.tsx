import React from "react";
import FAQs from "../../../components/FAQs";
import type { FAQItem } from "../../../components/FAQs";

const InfluencialResearchFAQs: React.FC = () => {
    const faqData: FAQItem[] = [
        {
            question:
                "What should I consider when deciding between surgery and non-surgical treatment for an Achilles rupture?",
            answer:
                "When choosing between surgery and non-surgical treatment for an Achilles rupture, a few important factors need to be considered. One of the main aspects is the size of the gap between the torn ends of the tendon, which is usually evaluated with an ultrasound. If the gap is large, surgery might be suggested to bring the ends back together. That said, surgery doesn't make the tendon any stronger, and recovery times for both surgical and non-surgical approaches are generally comparable.\n\nNon-surgical treatment is often the more common route. This method typically involves wearing a specialized boot that keeps your foot in a tip-toe position, allowing the tendon to heal on its own. Your doctor will assess the severity of the rupture, your activity level, and your personal health goals to help you decide the most suitable path for your recovery.",
        },
        {
            question:
                "What are the benefits of starting movement early after an Achilles tendon injury?",
            answer:
                "Starting movement soon after an Achilles tendon injury can make a big difference in the recovery process. Studies indicate that early mobilization can help minimize muscle loss, boost blood circulation to the injured area, and speed up the return to everyday activities. It has also been associated with improved long-term results and higher satisfaction among patients compared to keeping the area immobilized for extended periods.\n\nThat said, the right approach varies from person to person. It's crucial to work with a healthcare professional to develop a recovery plan that fits your specific situation and ensures safe and steady progress.",
        },
        {
            question:
                "What are the latest treatments and technologies improving Achilles tendon healing and recovery?",
            answer:
                "Emerging therapies and technologies are reshaping how Achilles tendon injuries are treated, focusing on speeding up recovery and improving overall results. Collagen-based implants, including bioinductive devices, are designed to encourage the tendon's natural repair process. At the same time, advancements in plasma treatments, such as helium plasma jets, are helping to regenerate tissue more efficiently and shorten recovery periods.\n\nNew methods like nanotechnology are being explored for delivering drugs directly to the affected area, which can help reduce scar tissue and support better healing. On top of that, stem cell therapies and growth factors like insulin-like growth factor-1 (IGF-1) are being used to stimulate regenerative healing. Together, these advanced treatments aim to not only speed up recovery but also help patients regain full function more effectively.",
        },
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
        {
            question:
                "How does nutrition impact Achilles tendon healing and recovery?",
            answer:
                "Nutrition plays a crucial role in tendon healing and recovery. Protein is essential for tissue repair, so make sure you're getting enough lean meats, fish, eggs, or plant-based proteins. Vitamin C is important for collagen synthesis, which is the main component of tendons. Include plenty of fruits and vegetables in your diet to support this process.\n\nOmega-3 fatty acids found in fish, nuts, and seeds can help reduce inflammation and support healing. Zinc and copper are also important minerals for tissue repair. Staying well-hydrated is crucial too, as water helps transport nutrients to the injured area and supports overall tissue health. Consider working with a nutritionist to create a diet plan that supports your recovery goals.",
        },
        {
            question:
                "What role does mental health play in Achilles tendon recovery?",
            answer:
                "Mental health significantly impacts physical recovery from an Achilles tendon injury. The recovery process can be frustrating and emotionally challenging, especially for active individuals who are used to regular exercise. Stress and anxiety can actually slow down the healing process by affecting your immune system and sleep quality.\n\nIt's important to set realistic expectations and celebrate small progress milestones. Consider working with a sports psychologist or counsellor who can help you develop coping strategies. Mindfulness practices like meditation can help manage stress and maintain a positive outlook. Remember that recovery is a marathon, not a sprint, and taking care of your mental health is just as important as your physical rehabilitation.",
        },
        {
            question:
                "How do age and activity level affect Achilles tendon recovery outcomes?",
            answer:
                "Age and activity level can significantly influence Achilles tendon recovery outcomes. Younger patients generally have better blood supply and more active healing processes, which can lead to faster recovery times. However, younger patients may also be more prone to re-injury if they return to activity too quickly.\n\nHighly active individuals often have better baseline fitness and muscle strength, which can support recovery, but they may also face greater challenges with patience during the rehabilitation process. Older adults may need more time for healing and should focus on maintaining overall fitness through low-impact activities. Regardless of age or activity level, following your healthcare provider's guidance and being patient with the process is key to successful recovery.",
        },
    ];

    return <FAQs faqs={faqData} />;
};

export default InfluencialResearchFAQs;
