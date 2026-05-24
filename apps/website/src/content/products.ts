import { getSplintReviewsHref } from "./routes";

export const products = [
  {
    href: "/splint",
    title: "Achilles Rupture Splint",
    description:
      "An Achilles rupture splint to make sleeping more pleasant and bearable and increase the speed of patients being seen by a specialist.",
  },
  {
    href: getSplintReviewsHref("en"),
    title: "Reviews",
    description:
      "Reviews from Athletes, Surgeons and patients who have used the Achilles Rupture Splint.",
  },
];
