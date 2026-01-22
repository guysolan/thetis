import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Tailwind from "../components/achilles-rupture/tailwind";
import Footer from "../components/achilles-rupture/footer";
import Unsubscribe from "../components/achilles-rupture/unsubscribe";

interface RecoveryTipsEmailProps {
  recipientName?: string;
  unsubscribeUrl?: string;
}

export const RecoveryTipsEmail = ({
  recipientName = "there",
  unsubscribeUrl = "https://thetismedical.com/unsubscribe",
}: RecoveryTipsEmailProps) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>
        Essential recovery tips and product recommendations for your Achilles
        rupture recovery journey
      </Preview>
      <Tailwind>
        <Body className="bg-gray-50 mx-auto my-auto font-sans">
          <Container className="bg-white shadow-lg mx-auto my-[40px] p-[40px] rounded-lg max-w-[600px]">
            {/* Header */}
            <Section className="mb-8 text-center">
              <Heading className="m-0 font-bold text-[28px] text-gray-900">
                Your Achilles Recovery Guide
              </Heading>
              <Text className="mt-2 mb-0 text-[16px] text-gray-600">
                Essential tips and products for a successful recovery
              </Text>
            </Section>

            {/* Greeting */}
            <Section className="mt-8">
              <Text className="text-[16px] text-gray-700 leading-[26px]">
                Hi {recipientName},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[26px]">
                Recovering from an Achilles rupture can feel overwhelming, but
                with the right approach and products, you can make significant
                progress. Here are some essential tips and recommendations based
                on what thousands of patients have found most helpful.
              </Text>
            </Section>

            {/* Recovery Tips Section */}
            <Section className="mt-8">
              <Heading className="mb-4 font-semibold text-[20px] text-gray-900">
                💡 Essential Recovery Tips
              </Heading>

              <Text className="mb-3 text-[15px] text-gray-700 leading-[24px]">
                <strong>1. Protect Your Tendon at Night</strong>
                <br />
                Your Achilles tendon is most vulnerable during sleep when you
                can't control your foot position. Sleeping without protection
                risks re-rupture and can undo weeks of healing. Always use a
                boot or specialized night splint when sleeping.
              </Text>

              <Text className="mb-3 text-[15px] text-gray-700 leading-[24px]">
                <strong>2. Elevate and Ice Regularly</strong>
                <br />
                Elevate your leg above heart level for 20-30 minutes several
                times a day, especially in the first few weeks. Combine with ice
                packs to reduce swelling and pain.
              </Text>

              <Text className="mb-3 text-[15px] text-gray-700 leading-[24px]">
                <strong>3. Follow Your Surgeon's Protocol</strong>
                <br />
                Every recovery is unique. Stick to your surgeon's specific
                weight-bearing and movement guidelines. Don't rush the process -
                healing takes time.
              </Text>

              <Text className="mb-3 text-[15px] text-gray-700 leading-[24px]">
                <strong>4. Prepare for Each Phase</strong>
                <br />
                Recovery happens in phases: non-weight bearing, partial weight
                bearing, and full weight bearing. Understanding what to expect
                in each phase helps you prepare mentally and physically.
              </Text>
            </Section>

            {/* Best Products Section */}
            <Section className="bg-gray-50 mt-8 p-6 rounded-lg">
              <Heading className="mb-4 font-semibold text-[20px] text-gray-900">
                🛒 Best Products for Achilles Rupture Recovery
              </Heading>

              <Text className="mb-4 text-[15px] text-gray-700 leading-[24px]">
                Based on feedback from thousands of patients, here are the
                products that make the biggest difference:
              </Text>

              <ul className="m-0 mb-4 pl-4 text-[15px] text-gray-700 leading-[26px] list-disc">
                <li>
                  <strong>Walking Boot:</strong>{" "}
                  Essential for protection during the day. Your surgeon will
                  recommend a specific type.
                </li>
                <li>
                  <strong>Crutches:</strong>{" "}
                  Necessary for non-weight bearing phases. Consider padded grips
                  for comfort.
                </li>
                <li>
                  <strong>Shoe Leveler:</strong>{" "}
                  Prevents back, hip, and shoulder pain by equalizing leg length
                  when wearing a boot.
                </li>
                <li>
                  <strong>Waterproof Boot Cover:</strong>{" "}
                  Allows safe showering without removing your boot.
                </li>
                <li>
                  <strong>Night Splint:</strong>{" "}
                  Lightweight alternative to sleeping in your heavy boot (see
                  below).
                </li>
              </ul>
            </Section>

            {/* Night Splint Promotion */}
            <Section className="mt-8 pl-6 border-brand-600 border-l-4">
              <Heading className="mb-3 font-semibold text-[20px] text-gray-900">
                🌙 Sleep Better with Our Night Splint
              </Heading>
              <Text className="mb-4 text-[15px] text-gray-700 leading-[24px]">
                Sleeping in a heavy walking boot (1.5kg+) is miserable. That's
                why we created the Thetis Night Splint - a lightweight,
                breathable alternative that provides the same tendon protection
                with dramatically better comfort.
              </Text>
              <Text className="mb-4 text-[15px] text-gray-700 leading-[24px]">
                <strong>Key Benefits:</strong>
              </Text>
              <ul className="m-0 mb-4 pl-4 text-[15px] text-gray-700 leading-[26px] list-disc">
                <li>
                  Lightweight (under 200g) - a fraction of your boot's weight
                </li>
                <li>Breathable - no more sweating through the night</li>
                <li>Maintains correct plantarflexion angle for healing</li>
                <li>
                  Surgeon-approved design with zero re-ruptures in 5,000+
                  patients
                </li>
                <li>Washable liner for hygiene</li>
              </ul>
              <Section className="my-6 text-center">
                <Button
                  className="bg-brand-600 hover:bg-brand-700 px-8 py-4 rounded-lg font-semibold text-[16px] text-white text-center no-underline"
                  href="https://thetismedical.com/achilles-rupture-splint"
                >
                  Learn More About the Night Splint
                </Button>
              </Section>
              <Text className="text-[13px] text-gray-600 italic leading-[20px]">
                Always check with your surgeon before using any splint at home.
              </Text>
            </Section>

            {/* Course Promotion */}
            <Section className="mt-8 pl-6 border-brand-600 border-l-4">
              <Heading className="mb-3 font-semibold text-[20px] text-gray-900">
                📚 Complete Your Recovery with Our Course
              </Heading>
              <Text className="mb-4 text-[15px] text-gray-700 leading-[24px]">
                Recovery is more than just products - it's about understanding
                what to expect, when to progress, and how to work with your care
                team. Our comprehensive Achilles Recovery Course guides you
                through every phase of recovery.
              </Text>
              <Text className="mb-4 text-[15px] text-gray-700 leading-[24px]">
                <strong>What's Included:</strong>
              </Text>
              <ul className="m-0 mb-4 pl-4 text-[15px] text-gray-700 leading-[26px] list-disc">
                <li>
                  31 easily digestible lessons covering your entire recovery
                </li>
                <li>Step-by-step guidance for each recovery phase</li>
                <li>Physiotherapy exercises with clear illustrations</li>
                <li>Questions to ask your surgeon at each stage</li>
                <li>Boot comparison guide to help you choose the right one</li>
                <li>Product recommendations and recovery tips</li>
                <li>
                  Timeline-based content that matches your recovery progress
                </li>
              </ul>
              <Section className="my-6 text-center">
                <Button
                  className="bg-brand-600 hover:bg-brand-700 px-8 py-4 rounded-lg font-semibold text-[16px] text-white text-center no-underline"
                  href="https://guide.thetismedical.com"
                >
                  Explore the Recovery Course
                </Button>
              </Section>
            </Section>

            {/* Closing */}
            <Section className="mt-8 pt-6 border-gray-200 border-t">
              <Text className="text-[16px] text-gray-700 leading-[26px]">
                Remember, recovery is a marathon, not a sprint. Be patient with
                yourself, follow your surgeon's guidance, and use the right
                tools to support your healing.
              </Text>
              <Text className="mt-4 text-[16px] text-gray-700 leading-[26px]">
                If you have any questions about your recovery, feel free to
                reply to this email. We're here to help.
              </Text>
              <Text className="mt-4 text-[16px] text-gray-700 leading-[26px]">
                Wishing you a successful recovery,
                <br />
                <strong>The Thetis Medical Team</strong>
              </Text>
            </Section>

            <Unsubscribe />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RecoveryTipsEmail;
