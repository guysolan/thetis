import React from "react";
import FAQs from "../../../components/FAQs";
import type { FAQItem } from "../../../components/FAQs";

const aircastVsVacopedFaqs: FAQItem[] = [
  {
    question:
      "What is the most important piece of equipment for Achilles rupture recovery?",
    answer:
      "The walking boot is considered essential for recovery. The UKSTAR trial (2020) found that early protected weight-bearing in a functional brace is a safe alternative to plaster casting. Both the Aircast and VACOped boots are commonly used options, with the choice depending on your specific needs, budget, and healthcare provider's recommendation.",
  },
  {
    question: "How long should I wear the walking boot?",
    answer:
      "Most rehabilitation protocols recommend wearing the walking boot for 8-10 weeks. The SMART Method protocol suggests full equinus (30° plantarflexion) for the first 5 weeks, followed by gradual reduction in plantarflexion angle. Your healthcare provider will guide you through the specific timeline based on your healing progress. The boot should be worn during the day, while a night splint is recommended for sleeping.",
  },
  {
    question: "How do I know which walking boot is right for me?",
    answer:
      "Consider these factors when choosing between Aircast and VACOped: budget (Aircast is more affordable at £121 vs VACOped at £302), need for waterproofing (VACOped is waterproof by design), desired level of adjustability, availability in your area, and your healthcare provider's recommendation. Research suggests both boots can be effective, with the choice often depending on individual circumstances.",
  },
  {
    question: "Can I drive while wearing the walking boot?",
    answer:
      "Neither boot is recommended for driving. If you must drive, you should only do so in an automatic car using your non-injured foot for the pedals. You must check with your insurance provider and doctor first, as driving with a walking boot may invalidate your insurance and could be dangerous. Never drive if you feel unsafe or if your doctor advises against it. The Aircast's lighter weight may make it slightly more manageable, but both boots can significantly affect your ability to drive safely.",
  },
  {
    question: "How often should I adjust the boot's angle?",
    answer:
      "The adjustment schedule depends on your rehabilitation protocol. The SMART Method suggests maintaining 30° plantarflexion for the first 5 weeks, then gradually reducing the angle. For Aircast users, this means removing wedges, while VACOped users can make micro-adjustments through the ROM control system. Always follow your healthcare provider's specific instructions.",
  },
  {
    question: "Is it safe to sleep without the boot?",
    answer:
      "While the boot provides protection, it's not comfortable for sleeping. The Thetis Medical night splint is specifically designed for nighttime use, maintaining a plantarflexed position while being more comfortable than the boot. It's important to maintain proper positioning during sleep to protect the healing tendon.",
  },
  {
    question: "Do I need both the boot and the night splint?",
    answer:
      "Yes, they serve different purposes. The boot is for daytime use and walking, while the night splint is designed for sleeping. The night splint is more comfortable for sleep and helps prevent issues associated with sleeping in a boot, such as overheating and discomfort.",
  },
  {
    question: "What angle should the night splint be set to?",
    answer:
      "The recommended angle varies by protocol, but typically starts at 15-25° plantarflexion. Your healthcare provider will specify the exact angle based on your injury and recovery stage. The angle may be adjusted as your recovery progresses.",
  },
  {
    question: "How do I shower with the walking boot?",
    answer:
      "For the Aircast, you'll need a waterproof boot cover to protect the boot and any dressings. The VACOped is waterproof by design, though it requires removing the inner lining. Always ensure your foot and any wounds stay dry.",
  },
  {
    question: "What is the EVENup Shoe Leveler and why do I need it?",
    answer:
      "The EVENup Shoe Leveler helps address the leg-length discrepancy caused by wearing a walking boot. Research suggests that even small height differences can affect gait mechanics. The EVENup attaches to your uninjured foot's shoe to help maintain proper alignment and may help prevent secondary injuries to the back, hips, and knees.",
  },
  {
    question: "Do I need crutches with the walking boot?",
    answer:
      "Most patients use crutches initially, even with the walking boot. The duration varies by protocol and individual progress. Some rehabilitation protocols suggest using crutches for the first 2-4 weeks, gradually transitioning to full weight-bearing. Always follow your healthcare provider's specific instructions.",
  },
  {
    question: "How do I prevent pressure sores from the boot?",
    answer:
      "Both boots have features to help prevent pressure sores: the Aircast uses air-filled bladders, while the VACOped uses a vacuum-bead liner. Regular skin checks, proper boot fitting, and using appropriate socks can help prevent pressure sores. If you notice any skin issues, contact your healthcare provider immediately.",
  },
  {
    question: "When can I start physical therapy?",
    answer:
      "Physical therapy typically begins after the initial immobilization period, usually around 6-8 weeks post-injury. However, some protocols include early gentle exercises. Your healthcare provider will determine the appropriate timing based on your healing progress and the specific rehabilitation protocol being followed.",
  },
  {
    question: "How long until I can return to sports?",
    answer:
      "Return to sports timing varies significantly based on the sport, your fitness level, and healing progress. Most protocols suggest a minimum of 4-6 months before returning to high-impact activities. Your healthcare provider and physical therapist will guide you through a gradual return-to-sport program.",
  },
  {
    question: "What are the signs of a re-rupture?",
    answer:
      "Signs of re-rupture may include: a popping sound, sudden pain in the Achilles area, inability to push off with the affected foot, and difficulty walking. If you experience any of these symptoms, seek immediate medical attention. Re-rupture rates are generally low but can occur if the tendon is stressed too early.",
  },
];

const AircastVsVacopedFAQs = () => {
  return <FAQs faqs={aircastVsVacopedFaqs} className="sm:px-2 py-4 w-full" />;
};

export default AircastVsVacopedFAQs;
