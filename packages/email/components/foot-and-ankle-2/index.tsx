import React from "react";
import { Heading, Html, Section } from "@react-email/components";
import Tailwind from "../tailwind";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";
import Head from "../head";
import InBedImage from "./in-bed-image";
import SeeTheProductButton from "./night-splint-button";
import FootAndAnkleBullets from "./foot-and-ankle-bullets";
import WantItForYourPatients from "../want-it-for-your-patients";

interface Props {
  heading1: React.ReactNode;
  heading2: React.ReactNode;
}

export const FootAndAnkle2 = ({ heading1, heading2 }: Props) => {
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

        <InBedImage />

        <FootAndAnkleBullets />

        <SeeTheProductButton />

        <WantItForYourPatients />

        <Footer />

        <Unsubscribe />
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle2;
