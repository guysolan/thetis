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
];

const ExercisesFAQs = () => {
    return <FAQs faqs={exercisesFaqs} className="sm:px-2 py-4 w-full" />;
};

export default ExercisesFAQs;
