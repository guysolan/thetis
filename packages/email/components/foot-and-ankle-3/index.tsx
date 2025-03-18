import React from "react";
import { Heading, Html, Section, Img } from "@react-email/components";
import Tailwind from "../tailwind";
import HighlightedSpan from "../highlighted-span";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";
import Head from "../head";
import MoreSurgeonReviewsButton from "./more-surgeon-reviews-button";

interface Props {
  quote: React.ReactNode;
  author: React.ReactNode;
  title: React.ReactNode;
}

export const FootAndAnkle3 = ({ quote, author, title }: Props) => {
  return (
    <Tailwind>
      <Html
        style={{
          background: "linear-gradient(to bottom, #e5f3ec 0%, #ffffff 50%)",
        }}
        className="mx-auto max-w-xl"
      >
        <Head />

        <Section className="px-6 py-4">
          <Heading
            as="h1"
            className="mb-2 font-bold text-gray-900 text-3xl lg:text-4xl text-center"
            style={{ marginBottom: "12px" }}
          >
            A New <HighlightedSpan>Favorite</HighlightedSpan> with{" "}
            <HighlightedSpan>Foot and Ankle</HighlightedSpan> Surgeons 👨‍⚕️
          </Heading>

          <Heading
            as="h2"
            className="mb-6 font-medium text-gray-700 text-xl text-center"
            style={{ marginBottom: "24px" }}
          >
            The innovative night splint transforming patient recovery
          </Heading>
        </Section>

        {/* Quote Section - Redesigned to be more professional */}
        <Section className="mb-6 px-6">
          <div
            className="bg-gray-50 mx-auto p-6 pt-2 text-center"
            style={{
              backgroundColor: "#f9fafb",
              padding: "24px",
              borderLeft: "4px solid #059669",
            }}
          >
            <blockquote
              className="mx-0 mb-4 font-medium text-gray-700 text-xl italic"
              style={{
                marginBottom: "16px",
                fontStyle: "italic",
                lineHeight: "1.6",
              }}
            >
              "{quote}"
            </blockquote>

            <div className="bg-emerald-600 mx-auto w-1/2 h-0.5" />

            <div className="flex flex-col items-center">
              <p className="mb-0 font-bold text-gray-900 text-lg">{author}</p>
              <p className="mt-0 pt-2 text-emerald-800 text-sm">{title}</p>
            </div>
          </div>
        </Section>

        <MoreSurgeonReviewsButton />

        <Footer />

        <Unsubscribe />
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle3;
