import React from "react";
import FAQs from "@/components/ui/faqs";
import type { FAQCategory } from "@/components/ui/faqs";
import {
  retailPrice,
  hcpcsCode,
  altCptCode,
  shippingCostsUS,
} from "@/data/splintPricing";

const hospitalFaqs: FAQCategory[] = [
  {
    category: "Product Information",
    questions: [
      {
        question: "What is an Achilles Rupture Splint?",
        answer:
          "Our Achilles Rupture Splint is a medical device designed to support and protect the Achilles tendon during recovery from injury or surgery. It holds the foot in plantarflexion (pointing toes downward) which helps avoid Achilles tendon lengthening and prevents re-ruptures.",
      },
      {
        question: "What are the key use cases for the splint?",
        answer: (
          <>
            <p>
              Our Achilles Rupture Splint serves two critical functions in the
              treatment pathway:
            </p>
            <ol className="space-y-3 mt-3 pl-5 list-decimal">
              <li>
                <strong>ER Immediate Care:</strong> Can be used in emergency
                settings as an initial treatment option instead of applying a
                cast, providing immediate stabilization while being more
                comfortable for patients
              </li>
              <li>
                <strong>Night Splint During Recovery:</strong> Used during weeks
                2-12 of recovery to maintain proper foot position during sleep,
                complementing daytime boot treatment
              </li>
            </ol>
            <p className="mt-3">
              This dual functionality makes it versatile across different
              departments and treatment stages.
            </p>
          </>
        ),
      },
      {
        question: "How does the splint maintain the correct healing position?",
        answer:
          "The splint holds the foot at a 150-degree angle, which is the optimal position for Achilles tendon healing. This matches the angle achieved with a hinged boot or wedges, ensuring proper recovery throughout the healing period.",
      },
      {
        question: "Where should hospitals store the splints?",
        answer: (
          <>
            <p>
              Hospitals have two main options for storing and distributing
              splints:
            </p>
            <ul className="mt-3 pl-5 list-disc">
              <li>
                <strong>Emergency Department:</strong> Keep a supply in the ER
                for immediate use when diagnosing Achilles tendon ruptures,
                allowing immediate treatment without the need for casting
              </li>
              <li>
                <strong>Fracture Clinic/Orthopedic Department:</strong> Store
                inventory here for follow-up appointments, where splints can be
                either:
                <ul className="mt-2 pl-5 list-disc">
                  <li>
                    Provided to patients as part of their treatment plan
                    (billable to insurance)
                  </li>
                  <li>
                    Sold directly to patients at the suggested retail price
                  </li>
                </ul>
              </li>
            </ul>
            <p className="mt-3">
              Many facilities choose to maintain inventory in both locations to
              provide comprehensive care throughout the patient journey.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: "Resale & Reimbursement",
    questions: [
      {
        question: "How do hospitals benefit financially?",
        answer: (
          <>
            <p className="mb-4">
              Hospitals can generate revenue in two primary ways:
            </p>
            <ol className="space-y-3 pl-5 list-decimal">
              <li>
                <strong>Insurance Reimbursement:</strong> Bill using HCPCS code
                {hcpcsCode} or CPT code {altCptCode}
              </li>
              <li>
                <strong>Direct Patient Sales:</strong> Sell to patients at the
                suggested retail price of ${retailPrice} per splint
              </li>
            </ol>
          </>
        ),
      },
      {
        question: "What are the reimbursement details?",
        answer: (
          <>
            <p>
              Our Achilles splints are classified as an Ankle Control Orthosis
              and eligible for insurance reimbursement.
            </p>
            <p className="mt-3">
              <strong>HCPCS Code:</strong> {hcpcsCode}
            </p>
            <p className="mt-1">
              <strong>Alternative Coding:</strong> Procedure code {altCptCode}{" "}
              may also be applicable depending on the specific treatment
              scenario.
            </p>

            <i className="mt-3">
              Always verify current reimbursement policies with specific
              insurance providers as rates may vary.
            </i>
          </>
        ),
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "Shipping & Delivery Information",
        answer: (
          <>
            <p>
              Standard shipping times are 5-10 business days for continental US
              addresses. Expedited shipping options are available upon request.
            </p>
            <p className="mt-3">Shipping costs for US orders are:</p>
            <ul className="mt-2 pl-5 list-disc">
              <li>Starter Pack (18 units): ${shippingCostsUS["18"]}</li>
              <li>Standard Pack (36 units): ${shippingCostsUS["36"]}</li>
              <li>Department Pack (72 units): ${shippingCostsUS["72"]}</li>
            </ul>
            <p className="mt-3">
              International shipping is available for an additional fee. Please
              contact us for details.
            </p>
          </>
        ),
      },
      {
        question: "Customizing Your Order",
        answer: (
          <>
            <p>
              Need a different mix of sizes? We can customize your order to
              match your facility's specific needs.
            </p>
            <p className="mt-3">
              Contact our healthcare team at{" "}
              <a
                href="mailto:info@thetismedical.com"
                className="text-primary hover:underline"
              >
                info@thetismedical.com
              </a>{" "}
              to discuss custom configurations.
            </p>
          </>
        ),
      },
      {
        question: "Do you offer bulk discounts beyond the listed packs?",
        answer:
          "Yes, for orders larger than our standard packs, we offer additional volume discounts. Please contact our healthcare sales team directly at info@thetismedical.com to discuss your specific requirements and to receive a customized quote.",
      },
    ],
  },
  {
    category: "Implementation & Support",
    questions: [
      {
        question: "Do you provide staff training materials?",
        answer:
          "Yes, we provide comprehensive training materials for your clinical staff, including fitting guides, usage instructions, and patient education resources. These materials help ensure proper implementation and maximize patient compliance.",
      },
      {
        question: "Do you offer warranty or replacement options?",
        answer:
          "Yes, all our splints come with a manufacturer warranty. We also offer replacement options in case of sizing issues or product defects.",
      },
    ],
  },
];

const HospitalFAQs = () => {
  return <FAQs faqs={hospitalFaqs} />;
};

export default HospitalFAQs;
