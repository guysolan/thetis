import React from "react";
import { Heading, Html, Img, Link } from "@react-email/components";
import Tailwind from "../tailwind";
import HighlightedSpan from "../highlighted-span";
import Unsubscribe from "../unsubscribe";
import Footer from "../footer";
import Head from "../head";
import InBedImage from "./in-bed-image";
import SimplyBrilliant from "./simply-brilliant";
import LearnMoreButton from "./learn-more-button";
import FootAndAnkleBullets from "./foot-and-ankle-bullets";
import WantItForYourPatients from "./want-it-for-your-patients";

interface Props {
  heading1: React.ReactNode;
  heading2: React.ReactNode;
}

export const FootAndAnkle1 = ({ heading1, heading2 }: Props) => {
  return (
    <Tailwind>
      <Html className="mx-auto max-w-lg">
        <Head />
        <Heading as="h1" className="text-2xl lg:text-3xl text-center">
          {heading1}
        </Heading>
        <hr className="border-gray-300" />

        <Heading as="h2" className="mt-4 px-4 text-lg md:text-xl text-center">
          {heading2}
        </Heading>

        <InBedImage />

        <SimplyBrilliant />

        <LearnMoreButton />

        <FootAndAnkleBullets />

        <WantItForYourPatients />

        <Footer align="center" />

        <Unsubscribe align="center" />
      </Html>
    </Tailwind>
  );
};

export default FootAndAnkle1;
