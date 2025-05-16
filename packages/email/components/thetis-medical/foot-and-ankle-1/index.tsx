import React from "react";
import { Heading, Html, Section, Body } from "@react-email/components";
import Tailwind from "../tailwind";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";

import Head from "../head";
import InBedImage from "../in-bed-image";
import SimplyBrilliant from "./simply-brilliant";
import LearnMoreButton from "./learn-more-button";
import WantItForYourPatients from "../want-it-for-your-patients";

interface Props {
  heading1: React.ReactNode;
  heading2: React.ReactNode;
}

export const FootAndAnkle1 = ({ heading1, heading2 }: Props) => {
  return (
    <Tailwind>
      <Html style={{ margin: 0, padding: 0 }}>
        <Head />
        <Body
          style={{
            backgroundColor: "rgb(229, 243, 236)",
            backgroundImage:
              "linear-gradient(to bottom, rgb(229, 243, 236) 0%, rgb(255, 255, 255) 50%)",
            margin: "0 auto",
            padding: 0,
            maxWidth: "600px",
            width: "100%",
          }}
        >
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

          <InBedImage />

          <SimplyBrilliant />

          <LearnMoreButton />

          <WantItForYourPatients />

          <Footer />

          <Unsubscribe />
        </Body>
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle1;
