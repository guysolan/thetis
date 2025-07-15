import React from "react";
import FAQs from "../../../components/FAQs";
import type { FAQItem } from "../../../components/FAQs";

const walkingFaqs: FAQItem[] = [
    {
        question:
            "What should I consider when choosing a walking boot after Achilles rupture surgery?",
        answer:
            "When choosing a walking boot after Achilles rupture surgery, prioritize support, comfort, adjustability, and how well it aligns with your recovery phase. A well-designed boot usually includes a sturdy outer shell for protection, a cushioned interior for comfort, and adjustable straps to accommodate swelling. Some models also feature a curved sole to encourage a more natural walking motion while easing strain on your tendon. Options like the Vacoped or Aircast boots come with specific advantages. The Vacoped, for instance, offers controlled ankle movement and can be adjusted as you progress through recovery. Always stick to your healthcare provider's recommendations regarding weight-bearing and boot usage to ensure a smooth and safe healing process.",
    },
    {
        question:
            "What's the best way to manage pain and swelling after Achilles rupture surgery?",
        answer:
            "To help manage pain and swelling after Achilles rupture surgery, focus on keeping your leg elevated and using ice regularly. Elevating your leg above heart level - especially during the first few days - can significantly reduce swelling and ease discomfort. Use pillows to support your leg while you rest or sleep. For icing, apply an ice pack for 20–30 minutes every 2 hours. Always wrap the ice pack in a thin cloth to protect your skin. Over-the-counter pain relievers like ibuprofen can help with mild discomfort, but your doctor might prescribe stronger medications if needed during the early recovery period. It's crucial to follow your surgeon's post-operative care instructions closely. If you're ever unsure or have concerns about managing pain or swelling, don't hesitate to contact your healthcare provider.",
    },
    {
        question:
            "What are the best exercises to regain balance and strength after transitioning out of a walking boot?",
        answer:
            "To rebuild balance and strength after transitioning out of a walking boot following Achilles rupture surgery, it's important to focus on exercises that target stability, coordination, and muscle rebuilding. Start with single-leg balance exercises: stand on your recovering leg for 30 seconds, and as your stability improves, gradually increase the duration. Incorporating calf raises is another key step - begin with both legs, then progress to single-leg raises to strengthen the calf muscles effectively. For improving coordination and balance, try heel-to-toe walking in a straight line. Perform these exercises with caution, and whenever possible, work with a physical therapist to ensure proper technique and to avoid placing too much strain on your healing tendon. Always stick to your doctor or therapist's guidance for a safe and steady recovery.",
    },
];

const WalkingFAQs = () => {
    return <FAQs faqs={walkingFaqs} className="sm:px-2 py-4 w-full" />;
};

export default WalkingFAQs;
