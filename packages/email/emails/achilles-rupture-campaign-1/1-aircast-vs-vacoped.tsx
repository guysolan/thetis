import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Tailwind from "../../components/achilles-rupture/tailwind";
import Footer from "../../components/achilles-rupture/footer";

export const MyEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Achilles Rupture Update: Aircast vs VACOped Comparison</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans">
          <Container className="mx-auto my-[20px] p-[20px] rounded w-full max-w-[600px]">
            <Section className="flex justify-center mt-[32px]">
              <Img
                src="https://achilles-rupture.com/images/achilles-rupture-logo-no-padding.svg"
                width="40"
                height="40"
                alt="Achilles Ruptures"
                className="my-0"
              />
            </Section>

            <Heading className="mx-0 my-[30px] p-0 font-normal text-[24px] text-black text-center">
              The Boot Battle: Aircast vs VACOped
            </Heading>

            <Section className="bg-indigo-50 my-6 p-6 rounded-sm">
              <Text className="text-[14px] text-black leading-[24px]">
                Ever wondered if your Achilles rupture patients would achieve
                better outcomes with a VACOped versus an Aircast + wedges? Here
                is a comprehensive head-to-head comparison of these walking boot
                options, featuring:
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>
                  Daily activity ratings: walking, showering, sleeping & driving
                </li>
                <li>
                  Detailed clinical comparison: ankle position & mechanism
                </li>
                <li>Patient selection guide: who should choose which boot</li>
                <li>Essential recovery products for optimal outcomes</li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                💰 Cost Comparison
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                Both boots support early weightbearing, but differ significantly
                in price:
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>VACOped: Premium price point at $375</li>
                <li>Aircast: Cost-effective at $150 + wedges</li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                🦿 VACOped Boot Analysis
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                The VACOped claims to be the gold standard in Achilles rupture
                management:
              </Text>
              <Section className="bg-indigo-50 my-4 p-6 rounded-sm">
                <Heading className="mb-2 font-semibold text-[16px] text-indigo-700">
                  How It Works: VACOped's Dynamic Recovery System
                </Heading>
                <Text className="text-[14px] text-black leading-[24px]">
                  The VACOped uses a hinged mechanism that allows controlled
                  movement within a range, rather than locking the ankle in a
                  fixed position. This means:
                </Text>
                <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                  <li>
                    Achieves 48° of ankle plantarflexion, closer to cast
                    immobilization (56°)
                  </li>
                  <li>
                    Provides true ankle equinus rather than midfoot compensation
                  </li>
                  <li>Better preserves tendon length during healing</li>
                  <li>
                    Dynamic movement helps prevent muscle wasting and stiffness
                  </li>
                </ul>
              </Section>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>
                  Vacuum-bead liner for pressure relief and swelling reduction
                </li>
                <li>
                  Waterproof design (though fiddly to use - requires removing
                  inner lining and using a backup liner)
                </li>
                <li>
                  May provide improved walking mechanics with pronounced rocker
                  design
                </li>
                <li>30% lower tendon loading during ambulation</li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                👢 Aircast Boot Analysis
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                The Aircast offers a practical alternative with its own
                advantages:
              </Text>
              <Section className="bg-indigo-50 my-4 p-6 rounded-sm">
                <Heading className="mb-2 font-semibold text-[16px] text-indigo-700">
                  How It Works: Aircast's Wedge System
                </Heading>
                <Text className="text-[14px] text-black leading-[24px]">
                  The Aircast uses a series of removable wedges to adjust the
                  ankle position:
                </Text>
                <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                  <li>
                    Wedges create equinus appearance through midfoot bending
                    rather than true ankle equinus
                  </li>
                  <li>
                    Achieves only 28° of ankle plantarflexion (vs. 56° in cast)
                  </li>
                  <li>
                    May not provide sufficient tendon shortening for optimal
                    healing
                  </li>
                  <li>
                    Step-by-step approach with fixed positions between
                    adjustments
                  </li>
                </ul>
              </Section>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>Lightweight design</li>
                <li>Simple wedge-based adjustment mechanism</li>
                <li>Widely available in clinical settings</li>
                <li>Requires waterproof cover for showering</li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                ⭐ Daily Activity Ratings
              </Heading>
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="p-3 border border-[#eaeaea] text-left">
                      Activity
                    </th>
                    <th className="p-3 border border-[#eaeaea] text-left">
                      Aircast
                    </th>
                    <th className="p-3 border border-[#eaeaea] text-left">
                      VACOped
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Walking
                    </td>
                    <td className="p-3 border border-[#eaeaea]">★★★☆☆</td>
                    <td className="p-3 border border-[#eaeaea]">★★★★★</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Showering
                    </td>
                    <td className="p-3 border border-[#eaeaea]">★★☆☆☆</td>
                    <td className="p-3 border border-[#eaeaea]">★★★★★</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Sleeping
                    </td>
                    <td className="p-3 border border-[#eaeaea]">★☆☆☆☆</td>
                    <td className="p-3 border border-[#eaeaea]">★☆☆☆☆</td>
                  </tr>
                </tbody>
              </table>
              <Text className="mt-2 text-[12px] text-gray-600">
                Note: Neither boot is recommended for sleeping. Use the{" "}
                <Link
                  href="https://thetismedical.com/splint"
                  className="text-indigo-600"
                >
                  Achilles Rupture Splint
                </Link>{" "}
                for optimal night-time comfort.
              </Text>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                📊 Patient Activity Analysis
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                Based on our comprehensive analysis, here's how each boot
                performs in daily activities:
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>
                  <strong>Walking:</strong>{" "}
                  VACOped's hinged mechanism and pronounced rocker design
                  enables better heel-to-toe movement while preserving muscle
                  function
                </li>
                <li>
                  <strong>Sleeping:</strong>{" "}
                  Neither boot is recommended for sleep - the Achilles Rupture
                  Splint provides optimal comfort and support for nighttime use
                </li>
                <li>
                  <strong>Showering:</strong>{" "}
                  The VACOped has built-in waterproofing (though fiddly to use -
                  requires removing inner lining and using a backup liner),
                  while the Aircast requires a waterproof cover
                </li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                📋 Clinical Comparison Table
              </Heading>
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="p-3 border border-[#eaeaea] text-left">
                      Feature
                    </th>
                    <th className="p-3 border border-[#eaeaea] text-left">
                      Aircast
                    </th>
                    <th className="p-3 border border-[#eaeaea] text-left">
                      VACOped
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Price
                    </td>
                    <td className="p-3 border border-[#eaeaea]">
                      $150 + wedges
                    </td>
                    <td className="p-3 border border-[#eaeaea]">$375</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Ankle Position
                    </td>
                    <td className="p-3 border border-[#eaeaea]">
                      28° plantarflexion (midfoot compensation)
                    </td>
                    <td className="p-3 border border-[#eaeaea]">
                      48° true ankle plantarflexion
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Mechanism
                    </td>
                    <td className="p-3 border border-[#eaeaea]">
                      Wedge-based adjustment
                    </td>
                    <td className="p-3 border border-[#eaeaea]">
                      Hinge-based ROM control
                    </td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Waterproof
                    </td>
                    <td className="p-3 border border-[#eaeaea]">No</td>
                    <td className="p-3 border border-[#eaeaea]">
                      Yes (requires removing inner lining and using backup
                      liner)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#eaeaea] font-medium">
                      Weight
                    </td>
                    <td className="p-3 border border-[#eaeaea]">Lighter</td>
                    <td className="p-3 border border-[#eaeaea]">Heavier</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                🎯 Who Should Choose Which Boot?
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                <strong>Choose VACOped if:</strong>
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>
                  You need superior walking mechanics and dynamic movement
                </li>
                <li>Waterproofing is important for your lifestyle</li>
                <li>Cost is not a primary concern</li>
              </ul>
              <Text className="mt-4 text-[14px] text-black leading-[24px]">
                <strong>Choose Aircast if:</strong>
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>Cost is a significant factor</li>
                <li>You prefer simpler adjustment mechanisms</li>
              </ul>
            </Section>

            <Section className="my-6">
              <Heading className="mb-4 font-semibold text-[18px] text-indigo-700">
                🛠️ Essential Recovery Products
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                To optimize your recovery journey, consider these complementary
                products:
              </Text>
              <ul className="pl-4 text-[14px] text-black leading-[24px] list-disc">
                <li>
                  <strong>Achilles Rupture Night Splint:</strong>{" "}
                  Essential for comfortable sleep and maintaining proper tendon
                  length
                </li>
                <li>
                  <strong>EVENup Shoe Leveler:</strong>{" "}
                  Prevents back, hip, and knee pain by balancing height
                  difference
                </li>
                <li>
                  <strong>Limbo Waterproof Cover:</strong>{" "}
                  Essential for Aircast users during showering
                </li>
                <li>
                  <strong>Merino Wool Socks:</strong>{" "}
                  Helps manage temperature and moisture for optimal comfort
                </li>
              </ul>
              <Text className="mt-4 text-[14px] text-black leading-[24px]">
                <strong>Bonus Tip:</strong>{" "}
                For showering, place a chair in your shower and use either the
                {" "}
                <Link
                  href="https://thetismedical.com/splint"
                  className="text-indigo-600"
                >
                  Achilles Rupture Splint
                </Link>{" "}
                or Limbo waterproof cover for added safety and comfort.
              </Text>
            </Section>

            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded font-semibold text-[12px] text-white text-center no-underline"
                href="https://achilles-rupture.com/articles/aircast-vs-vacoped"
              >
                Read Full Article
              </Button>
            </Section>

            <Text className="text-[14px] text-black leading-[24px]">
              Warm regards,
              <br />
              The Achilles Ruptures Research Team
            </Text>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MyEmail;
