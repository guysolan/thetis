import React from "react";
import FAQs, { type FAQCategory } from "@thetis/ui/faqs";

const globalTrendsFaqs: FAQCategory[] = [
  {
    category: "Incidence & Risk Factors",
    questions: [
      {
        question: "How common are Achilles tendon ruptures?",
        answer:
          "The incidence of Achilles tendon ruptures has more than tripled over recent decades, rising from 11 to 37 cases per 100,000 people. This makes it a significant public health concern, with the Achilles being the strongest yet most frequently ruptured tendon in the human body.",
      },
      {
        question: "Who is most at risk of an Achilles tendon rupture?",
        answer:
          "The peak incidence occurs between ages 30-39, with men being significantly more likely to experience a rupture than women (ratio of 4.83:1). Recreational athletes are at higher risk compared to both sedentary individuals and elite athletes, likely due to inconsistent training, inadequate warm-up, and improper technique.",
      },
      {
        question: "What causes Achilles tendon ruptures?",
        answer:
          "Sports activities remain the leading cause, accounting for about 60% of all ruptures. However, non-sports-related ruptures are increasing at a faster rate due to factors like aging population, increased obesity, sedentary lifestyles, and underlying medical conditions like diabetes and hypertension. The distribution of sports-related injuries is relatively even across different sports.",
      },
      {
        question: "What role does tendon degeneration play in ruptures?",
        answer:
          "Histological examination reveals that 97% of ruptured Achilles tendons show signs of pre-existing degeneration, including hypoxic degenerative tendinopathy, myxoid degeneration, tenonolipomatosis, and calcific tendinopathy. This indicates that most ruptures occur in tendons that were already weakened before the acute injury.",
      },
    ],
  },
  {
    category: "Treatment Options",
    questions: [
      {
        question: "Is surgery always necessary for Achilles tendon ruptures?",
        answer:
          "No, modern research shows that when patients are appropriately selected, surgical and non-surgical treatments often yield equivalent outcomes in terms of re-rupture rates and functional recovery. Non-surgical treatment has comparable re-rupture rates when combined with a structured rehabilitation program, particularly when emphasizing early functional rehabilitation.",
      },
      {
        question: "What are the benefits of non-surgical treatment?",
        answer:
          "Non-surgical treatment offers several advantages: lower risk of complications (no infection, nerve injury, or wound healing problems), reduced costs, and comparable re-rupture rates when combined with proper rehabilitation. It avoids the risks associated with surgery while maintaining good outcomes, making it an acceptable alternative for many patients.",
      },
      {
        question: "What are the risks of surgical treatment?",
        answer:
          "Surgical treatment carries risks including post-operative infection, deep vein thrombosis (DVT) from immobilization, potential sural nerve injury, and formation of post-operative adhesions that can limit ankle motion. These complications are significantly more common with surgical treatment compared to conservative management.",
      },
      {
        question: "What surgical techniques are available?",
        answer:
          "Various surgical approaches exist, including open surgery, minimally invasive techniques, and reconstructive procedures. For chronic ruptures, techniques such as flexor hallucis longus tendon transfer can be used. Studies comparing open and minimally invasive surgery have shown no significant differences in clinical outcomes, though each approach has its specific indications.",
      },
    ],
  },
  {
    category: "Recovery & Rehabilitation",
    questions: [
      {
        question: "What is the best approach to rehabilitation?",
        answer:
          "Early functional rehabilitation, involving controlled movement and weight-bearing sooner after injury, has shown improved outcomes compared to prolonged immobilization. However, 'slowed recovery' protocols, which emphasize a more gradual progression, have demonstrated better long-term results than very aggressive early mobilization. The key is finding the right balance for each patient.",
      },
      {
        question: "How long does recovery typically take?",
        answer:
          "Recovery programs should be individualized based on factors like age, activity level, injury severity, and treatment approach (surgical vs. non-surgical). The rehabilitation process typically spans several months, with the most critical healing phase occurring in the first 12 weeks. The entire recovery process may take 6-12 months for full return to activity.",
      },
      {
        question: "What factors influence rehabilitation success?",
        answer:
          "Success in rehabilitation depends on multiple factors including patient compliance, timing of intervention, appropriate progression of activities, and individual healing capacity. The program should be tailored to the patient's specific needs and modified based on their response to treatment.",
      },
    ],
  },
  {
    category: "Emerging Technologies",
    questions: [
      {
        question:
          "What new technologies are being developed for Achilles tendon treatment?",
        answer:
          "Several promising technologies are emerging: Shear Wave Elastography for early detection of tendon degeneration, Exosome Therapy for promoting tissue healing, and Mesenchymal Stem Cells (MSCs) for tendon regeneration. These technologies are currently being investigated in clinical trials and show potential for improving treatment outcomes.",
      },
      {
        question: "How can early detection help prevent ruptures?",
        answer:
          "Technologies like Shear Wave Elastography allow for early detection of tendon degeneration before a rupture occurs, potentially enabling preventative measures and reducing the risk of complete rupture. This is particularly important given that 97% of ruptures occur in already degenerated tendons.",
      },
      {
        question: "What role do stem cells play in treatment?",
        answer:
          "Mesenchymal Stem Cells (MSCs) are being investigated for tendon regeneration engineering. Research shows promise in using MSCs to promote healing and improve tissue quality. Additionally, exosome-educated macrophages have shown potential in promoting early Achilles tendon healing.",
      },
      {
        question: "What other innovative treatments are being studied?",
        answer:
          "Current research includes investigating platelet-rich plasma treatments, computer-assisted gait analysis for rehabilitation monitoring, and various tissue engineering approaches. These innovations aim to improve both the biological healing process and functional recovery outcomes.",
      },
    ],
  },
  {
    category: "Research & Statistics",
    questions: [
      {
        question: "How has research on Achilles tendon injuries evolved?",
        answer:
          "Scientific interest has grown significantly, with the annual number of published studies increasing more than fivefold between 2000 (54 papers) and 2021 (287 papers). The field has a high H-index of 126, indicating highly influential research and growing clinical importance.",
      },
      {
        question: "Which countries lead in Achilles tendon research?",
        answer:
          "The United States leads global research efforts (31.30% of publications), followed by England (11.84%) and China (10.07%). European institutions are particularly strong in this field, with 7 of the top 10 research institutions being located in Europe. This global research effort is driving advancements in understanding and treatment.",
      },
      {
        question: "What are the current research trends?",
        answer:
          "Recent research has focused on re-rupture prevention, exosome therapy, acute Achilles tendon rupture management, and preventing tendon adhesions. There's also increasing interest in minimally invasive surgical techniques, heterotopic ossification, and tendon regeneration using stem cells.",
      },
    ],
  },
];

const GlobalTrendsFAQs = () => {
  return <FAQs faqs={globalTrendsFaqs} className="sm:px-2 py-4 w-full" />;
};

export default GlobalTrendsFAQs;
