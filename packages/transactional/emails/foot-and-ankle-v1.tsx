import {
  Button,
  Head,
  Font,
  Heading,
  Html,
  Img,
  Link,
} from "@react-email/components";
import * as React from "react";
import Tailwind from "../components/Tailwind";
import HighlightedSpan from "../components/HighlightedSpan";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <Font
            fontFamily="Raleway"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/raleway/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Heading as="h1">
          {recipientName ? `${recipientName}, would` : "Would"} you sleep in
          your <HighlightedSpan>Rain Boots? 😮</HighlightedSpan>
        </Heading>
        <Heading as="h2">
          The <HighlightedSpan>Only</HighlightedSpan> Night Splint for Achilles
          Tendon Rupture
        </Heading>
        <ul className="flex flex-col gap-y-2">
          <li>Sleep Easy</li>
          <li>Designed with Surgeons</li>
          <li>Made in the UK 🇬🇧</li>
        </ul>

        <div className="inline-block bg-brand-100 px-3 py-1 border-2 border-brand-400 rounded-full font-bold text-brand-600">
          <i>NEW in USA 🇺🇸</i>
        </div>
        <div className="relative my-4">
          <Img
            src="https://thetismedical.com/images/night_splint_bed_top_square.jpg"
            alt="Achilles tendon rupture night splint"
            width="300"
            height="300"
            className="rounded-lg"
          />

          <Button
            href="https://patient-watch.com"
            className="bg-emerald-600 hover:bg-emerald-700 mt-4 px-6 py-3 rounded-lg font-bold text-white"
          >
            See the Night Splint
          </Button>
        </div>

        <p>
          Any questions? Please email our founder{" "}
          <Link className="text-brand-600" href="mailto:guy@thetismedical.com">
            guy@thetismedical.com
          </Link>
          .
        </p>
        <p>Guy Solan - Founder</p>

        <div className="flex items-center gap-2">
          <Img
            src="https://thetismedical.com/images/logo-black.svg"
            alt="Thetis Medical"
            width="40"
            height="40"
            className="rounded-lg"
          />
          <b>
            <Link className="text-black" href="https://thetismedical.com">
              Thetis Medical
            </Link>
          </b>
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          <p>
            This email was sent to {"{"}email{"}"}.{" "}
            <Link
              href="https://unsubscribe.resend.com/"
              className="text-gray-600 underline"
            >
              Unsubscribe
            </Link>
          </p>
        </div>
      </Html>
    </Tailwind>
  );
};

export default MyEmail;
