import React from "react";
import FAQs, { type FAQCategory } from "@thetis/ui/faqs";

const aircastVsVacopedFaqs: FAQCategory[] = [
  {
    category: "Walking Boots",
    questions: [
      {
        question:
          "What is the most important piece of equipment for Achilles rupture recovery?",
        answer:
          "The walking boot is considered the cornerstone of recovery. Clinical research, including the UKSTAR trial (2020), shows that early protected weight-bearing in a suitable boot leads to better outcomes and faster recovery. Both the Aircast and VACOped boots are effective options, with the choice depending on your specific needs and budget.",
      },
      {
        question: "How long should I wear the walking boot?",
        answer:
          "Typically, patients wear the walking boot for 8-10 weeks, with gradual adjustments to the plantarflexion angle. Your healthcare provider will guide you through the specific timeline based on your healing progress. The boot should be worn day and night, except when using the night splint for sleeping.",
      },
      {
        question: "How do I know which walking boot is right for me?",
        answer:
          "The choice between Aircast and VACOped depends on several factors: budget (Aircast is more affordable), need for waterproofing (VACOped is waterproof by design), desired level of adjustability, availability in your area, and your healthcare provider's recommendation. For a detailed comparison, see our Aircast vs VACOped comparison guide.",
      },
    ],
  },
  {
    category: "Night Splint",
    questions: [
      {
        question: "Is it safe to sleep without the boot?",
        answer:
          "While the boot provides excellent protection, it's not ideal for sleeping. The Thetis Medical night splint is specifically designed for nighttime use, maintaining the correct plantarflexed position while being more comfortable than the boot. It's the only splint specifically designed for Achilles rupture on the market.",
      },
      {
        question: "Do I need both the boot and the night splint?",
        answer:
          "Yes, they serve different purposes. The boot is for daytime use and walking, while the night splint is specifically designed for sleeping. The night splint is more comfortable for sleep and prevents the issues associated with sleeping in a boot (like dirty sheets and overheating).",
      },
    ],
  },
  {
    category: "Elevation & Recovery",
    questions: [
      {
        question: "How important is elevation during recovery?",
        answer:
          "Elevation is crucial, especially in the early stages. UK rehabilitation guidelines recommend elevating the affected limb above heart level. One established protocol prescribes 23 hours/day with the ankle above chest level for the first week, followed by 12 hours/day at heart level for the next week. This helps reduce swelling and promote healing.",
      },
      {
        question: "Can I exercise while wearing the walking boot?",
        answer:
          "Yes, but only with your healthcare provider's approval. The boot allows for controlled weight-bearing and movement, which is part of the early rehabilitation process. However, the type and intensity of exercise should be carefully guided by your medical team to prevent re-injury.",
      },
    ],
  },
  {
    category: "Additional Equipment",
    questions: [
      {
        question: "How do I shower with the walking boot?",
        answer:
          "You'll need a waterproof boot cover to protect your boot and any dressings during showering. NHS guidelines specifically recommend using waterproof covers to prevent infection and maintain boot integrity. The VACOped boot is waterproof by design, while the Aircast requires a separate waterproof cover.",
      },
      {
        question: "What is the EVENup Shoe Leveler and why do I need it?",
        answer:
          "The EVENup Shoe Leveler addresses the leg-length discrepancy caused by wearing a walking boot. Research shows that even a 1cm height difference can significantly impact gait mechanics and increase the risk of secondary injuries. The EVENup attaches to your uninjured foot's shoe to maintain proper alignment and prevent back, hip, and knee pain.",
      },
      {
        question: "Are ergonomic crutch handles worth the investment?",
        answer:
          "Yes, clinical studies have shown significant benefits. A 2021 study in the Journal of Rehabilitation Medicine found that anatomically shaped cuffs and grips led to: 40% reduction in forearm pain, 35% decrease in paresthesia, and improved comfort and confidence during walking.",
      },
    ],
  },
];

const AircastVsVacopedFAQs = () => {
  return <FAQs faqs={aircastVsVacopedFaqs} className="sm:px-2 py-4 w-full" />;
};

export default AircastVsVacopedFAQs;
