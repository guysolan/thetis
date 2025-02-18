import React from "react";
import {
  Heading,
  Html,
  Section,
  Button,
  Link,
  Img,
} from "@react-email/components";
import Tailwind from "../tailwind";
import HighlightedSpan from "../highlighted-span";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";
import Head from "../head";
import MorePatientReviewsButton from "./more-patient-reviews-button";

interface Props {
  quote: React.ReactNode;
  author: React.ReactNode;
}

export const FootAndAnkle4 = ({ quote, author }: Props) => {
  return (
    <Tailwind>
      <Html
        style={{
          background: "linear-gradient(to bottom, #e5f3ec 0%, #ffffff 50%)",
        }}
        className="mx-auto max-w-xl"
      >
        <Head />

        <Heading
          as="h1"
          className="text-gray-900 text-3xl lg:text-4xl text-center"
        >
          Want better <HighlightedSpan>Patient Satisfaction</HighlightedSpan>?
        </Heading>
        {/* Quote Section */}
        <Section className="px-8 py-10">
          <div className="relative mx-auto pl-6 border-gray-300 border-l-4 max-w-2xl">
            <span className="-top-2 -left-3 absolute font-serif text-gray-300 text-7xl">
              "
            </span>
            <blockquote className="mb-4 font-serif text-gray-900 text-2xl lg:text-3xl leading-relaxed">
              {quote}
            </blockquote>
            <div className="mt-6">
              <Heading as="h2" className="font-medium text-gray-800 text-xl">
                — {author}
              </Heading>
            </div>
          </div>
        </Section>

        <MorePatientReviewsButton />

        <Footer align="center" />

        <Unsubscribe align="center" />
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle4;
