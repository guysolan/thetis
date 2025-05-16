import React from "react";
import { Heading, Html, Img, Link, Section } from "@react-email/components";
import Tailwind from "../tailwind";
import HighlightedSpan from "../highlighted-span";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";
import Head from "../head";
import InBedImage from "./in-bed-image";
import GetSampleButton from "./get-sample-button";

interface Props {
  heading1: React.ReactNode;
  heading2: React.ReactNode;
}

export const FootAndAnkle5 = ({ heading1, heading2 }: Props) => {
  return (
    <Tailwind>
      <Html
        style={{
          background: "linear-gradient(to bottom, #e5f3ec 0%, #ffffff 50%)",
        }}
        className="mx-auto max-w-xl"
      >
        <Head />
        <Section className="flex flex-col justify-center items-center gap-y-4 px-4 py-4">
          <Heading
            as="h1"
            className="mb-4 font-bold text-gray-900 text-3xl lg:text-4xl text-center"
          >
            {heading1}
          </Heading>

          <Heading as="h2" className="text-gray-700 text-xl text-center">
            {heading2}
          </Heading>
        </Section>

        <Section className="flex flex-col justify-center items-center gap-y-4 px-4 py-4">
          <InBedImage />

          <GetSampleButton />
        </Section>

        <Footer align="center" />

        <Unsubscribe align="center" />
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle5;
