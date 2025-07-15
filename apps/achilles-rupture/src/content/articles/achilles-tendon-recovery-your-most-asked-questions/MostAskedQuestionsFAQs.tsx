import React from "react";
import FAQs from "../../../components/FAQs";
import type { FAQItem } from "../../../components/FAQs";

const exercisesFaqs: FAQItem[] = [
    {
        question: "How can I know if my Achilles rupture recovery is on track?",
        answer:
            "Tracking your recovery progress after an Achilles rupture is an essential part of ensuring proper healing. Typically, recovery can take anywhere from 6 weeks to 6 months, depending on factors like the injury's severity and whether you opted for surgical or non-surgical treatment. Be mindful of signs that you might be pushing yourself too hard, such as excessive pain, swelling, or unusual sensations like a popping feeling during rehabilitation exercises. Conversely, if you're not noticing any improvements in mobility or strength after several weeks, it might mean you're not progressing as quickly as you should. To recover effectively, stick to your physical therapy routine and check in regularly with your healthcare provider. They can help fine-tune your recovery plan to match your progress. Listening to your body and following a well-structured plan will help you heal safely and avoid unnecessary setbacks.",
    },
    {
        question:
            "How do I know when to stop an exercise during Achilles recovery?",
        answer:
            "If you experience sharp pain, persistent swelling, a feeling of instability in your ankle, or unusual sensations like numbness or tingling during your Achilles recovery, it's important to stop exercising right away. These symptoms might indicate that your body needs more rest or that the activity is too demanding for your current stage of healing. Should you hear a popping sound or feel sudden, severe pain while exercising, it's crucial to stop immediately and reach out to your doctor or physical therapist. Paying attention to your body and taking gradual steps in your recovery are essential for healing safely and effectively.",
    },
    {
        question:
            "How do age and fitness level impact recovery from an Achilles tendon rupture?",
        answer:
            "Age and physical condition significantly influence how well and how quickly someone bounces back from an Achilles tendon rupture. Older adults often face longer recovery periods and may experience lasting challenges, like reduced strength and mobility. For instance, individuals over 60 might need 12 months or more to return to their best possible function, compared to younger people. Meanwhile, having a good fitness level before the injury can make a noticeable difference. People who were active and fit prior to their injury generally recover faster and are able to resume their regular routines more quickly. Maintaining an active lifestyle before an injury not only builds resilience but also helps improve the recovery process.",
    },
    {
        question:
            "What should I consider when choosing between surgery and non-surgical treatment for an Achilles tendon rupture?",
        answer:
            "When choosing between surgical and non-surgical treatments for an Achilles tendon rupture, it's essential to consider factors like your activity level, age, and overall health. Surgery is often preferred by athletes or individuals with physically demanding routines because it can reduce the risk of re-rupture and might lead to a stronger tendon. On the other hand, non-surgical treatments, paired with proper rehabilitation, can deliver similar results for many people. Studies suggest that both methods can achieve comparable long-term outcomes. Ultimately, the choice comes down to your personal recovery goals and what fits your lifestyle. Discuss your options with your healthcare provider to determine the best path for you.",
    },
    {
        question:
            "What should I consider when choosing an orthopedic boot for Achilles tendon recovery?",
        answer:
            "Selecting the right orthopedic boot plays a key role in recovering from an Achilles tendon injury. You'll want a boot that offers solid immobilization, adjustable motion settings, and lasting comfort. Some models even come with features like an articulating ankle or tailored support for tendon repair, which can make a big difference during recovery. Popular options like the VACOped and the Ossur Rebound Air Walker are often recommended because they can adjust to various recovery phases. Before choosing a boot, make sure to consult your healthcare provider. They'll help you pick one that suits your specific injury, recovery plan, and daily routine.",
    },
    {
        question:
            "What are the best exercises to safely support recovery and prevent re-injury during each phase of Achilles tendon healing?",
        answer:
            "During the first six weeks of recovery, the focus is on gentle range-of-motion exercises to keep the joint from becoming stiff. This might include passive ankle movements and light stretches for plantarflexion. It's important to avoid putting any weight on the injured leg unless your doctor specifically clears you to do so. From weeks six to twelve, you can begin incorporating strengthening and balance exercises into your routine. These might include heel raises, resistance band stretches, and balance drills. These activities are designed to help rebuild strength and improve stability as the tendon continues to heal. As you move into the final stage of recovery (three to six months), the priority shifts to functional and sport-specific exercises. This phase might involve eccentric heel drops, light plyometric movements, and drills tailored to your sport or daily activities. Throughout every stage of recovery, maintaining calf strength and flexibility through exercises like heel raises and stretches is key to reducing the risk of re-injury. Always follow your healthcare provider's advice and listen to your body to ensure you're progressing safely.",
    },
];

const ExercisesFAQs = () => {
    return <FAQs faqs={exercisesFaqs} className="sm:px-2 py-4 w-full" />;
};

export default ExercisesFAQs;
