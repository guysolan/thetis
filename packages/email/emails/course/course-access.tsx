import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Tailwind from "../../components/course/tailwind";
import Footer from "../../components/course/footer";
import Logo from "../../components/course/logo";

interface CourseAccessEmailProps {
  customerEmail: string;
  orderNumber: string;
  courseType: string;
  claimUrl: string;
}

export const CourseAccessEmail = ({
  customerEmail = "customer@example.com",
  orderNumber = "1234",
  courseType = "Standard",
  claimUrl = "https://course.thetismedical.com/claim?email=customer@example.com&order=1234",
}: CourseAccessEmailProps) => {
  const courseName = courseType === "premium" 
    ? "Premium Recovery Course" 
    : "Achilles Recovery Course";

  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Your {courseName} is ready - set up your account now!</Preview>
      <Tailwind>
        <Body className="bg-gray-50 mx-auto my-auto font-sans">
          <Container className="mx-auto my-[40px] p-[40px] bg-white rounded-lg shadow-lg max-w-[600px]">
            {/* Logo */}
            <Section className="text-center mb-8">
              <Logo size={56} />
            </Section>

            {/* Header */}
            <Section className="bg-gradient-to-r from-primary-600 to-primary-700 -mx-[40px] -mt-[8px] px-[40px] py-8 text-center">
              <Heading className="text-white text-[28px] font-bold m-0">
                🎉 Your Course is Ready!
              </Heading>
              <Text className="text-primary-100 text-[16px] mt-2 mb-0">
                Thank you for your purchase
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mt-8">
              <Text className="text-gray-700 text-[16px] leading-[26px]">
                Hi there,
              </Text>
              <Text className="text-gray-700 text-[16px] leading-[26px]">
                Great news! Your order <strong>#{orderNumber}</strong> has been confirmed, 
                and your <strong>{courseName}</strong> is ready to access.
              </Text>
              <Text className="text-gray-700 text-[16px] leading-[26px]">
                Click the button below to set up your account and start your recovery journey:
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center my-8">
              <Button
                className="bg-primary-600 hover:bg-primary-700 px-8 py-4 rounded-lg font-semibold text-[16px] text-white text-center no-underline"
                href={claimUrl}
              >
                Access Your Course Now
              </Button>
            </Section>

            {/* What's Included */}
            <Section className="bg-primary-50 rounded-lg p-6 my-6">
              <Heading className="text-primary-800 text-[18px] font-semibold m-0 mb-4">
                What's included in your course:
              </Heading>
              <ul className="pl-4 text-[14px] text-gray-700 leading-[24px] list-disc m-0">
                <li>31 easily digestible lessons</li>
                <li>Step-by-step recovery guidance</li>
                <li>Physio exercises with illustrations</li>
                <li>Questions for your surgeon</li>
                <li>Boot comparison guide</li>
                <li>Product recommendations</li>
              </ul>
            </Section>

            {/* Quick Setup */}
            <Section className="my-6">
              <Heading className="text-gray-800 text-[18px] font-semibold mb-4">
                Quick Setup (takes 30 seconds):
              </Heading>
              <Text className="text-gray-700 text-[14px] leading-[24px] m-0">
                <strong>1.</strong> Click the button above
                <br />
                <strong>2.</strong> Create a password for your account
                <br />
                <strong>3.</strong> Start learning!
              </Text>
            </Section>

            {/* Help Text */}
            <Section className="border-t border-gray-200 pt-6 mt-6">
              <Text className="text-gray-500 text-[14px] leading-[22px]">
                If the button doesn't work, copy and paste this link into your browser:
              </Text>
              <Text className="text-primary-600 text-[12px] break-all">
                {claimUrl}
              </Text>
            </Section>

            {/* Account Info */}
            <Section className="bg-gray-100 rounded-lg p-4 my-6">
              <Text className="text-gray-600 text-[14px] m-0">
                <strong>Your email:</strong> {customerEmail}
                <br />
                <strong>Order number:</strong> #{orderNumber}
              </Text>
            </Section>

            {/* Sign off */}
            <Text className="text-gray-700 text-[16px] leading-[26px]">
              We're here to support you every step of the way. If you have any questions, 
              just reply to this email.
            </Text>
            <Text className="text-gray-700 text-[16px] leading-[26px]">
              Wishing you a speedy recovery,
              <br />
              <strong>The Thetis Medical Team</strong>
            </Text>

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CourseAccessEmail;
