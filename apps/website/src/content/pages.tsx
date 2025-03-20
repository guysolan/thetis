import {
  HeartHandshake,
  Handshake,
  Box,
  Zap,
  Moon,
  Stethoscope,
  Microscope,
  Mail,
  Star,
} from "lucide-react";
import nightSplintImage from "./night_splint_bed_side.jpg";
import traumaSplintImage from "./trauma_splint.jpg";

type Link = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variant: "default" | "outline";
  image?: ImageMetadata;
};

export const productLinks: Link[] = [
  {
    title: "Achilles Rupture Splint",
    description:
      "Recovery quicker and more comfortably from achilles tendon rupture.",
    href: "/night-splint",
    image: nightSplintImage,
    icon: <Moon size={20} />,
    variant: "outline",
  },
  {
    title: "Reviews",
    description: "Read what our customers have to say about our products.",
    href: "/reviews",
    icon: <Star size={20} />,
    variant: "outline",
  },
];

export const partnerLinks: Link[] = [
  {
    title: "Our Partners",
    description: "Our partners are the best in the business.",
    href: "/partners",
    icon: <HeartHandshake size={20} />,
    variant: "default",
  },

  {
    title: "Professionals",
    description: "Join other clinicians improving patient recovery.",
    href: "/professionals",
    icon: <Stethoscope size={20} />,
    variant: "outline",
  },
  {
    title: "Evidence",
    description:
      "Proven to shorten time to care and improve patient experience.",
    href: "/evidence",
    icon: <Microscope size={20} />,
    variant: "outline",
  },
];

export const contactLinks: Link[] = [
  {
    title: "Contact Us",
    description: "Contact us for more information.",
    href: "/contact",
    icon: <Mail size={20} />,
    variant: "default",
  },
  {
    title: "Become a Partner",
    description: "Become a partner and help us spread the word.",
    href: "/become-a-partner",
    icon: <Handshake size={20} />,
    variant: "outline",
  },
  {
    title: "Order Wholesale",
    description: "Order wholesale products for your clinic.",
    href: "/order-wholesale",
    icon: <Box size={20} />,
    variant: "outline",
  },
];

// const professionalLinks: Link[] = [
//   {
//     title: "Professionals",
//     description: "Professionals are the best in the business.",
//     href: "/professionals",
//     icon: <Stethoscope size={20} />,
//     variant: "default",
//   },
//   {
//     title: "Evidence",
//     description:
//       "Evidence for Thetis Medical's Achilles Rupture Night Splint and Trauma Splint.",
//     href: "/evidence",
//     icon: <Microscope size={20} />,
//     variant: "outline",
//   },
// ];

export const videoPages = [
  {
    title: "Night Splint Instructions",
    href: "video/night-splint-instructions",
  },
  {
    title: "Trauma Splint Application",
    href: "video/trauma-splint-application",
  },
  {
    title: "Night Splint Presentation",
    href: "video/night-splint-presentation",
  },
];

export const pages = [
  { title: "Home", href: "" },
  { title: "Night Splint", href: "night-splint" },
  { title: "Trauma Splint", href: "trauma-splint" },

  { title: "Sitemap", href: "sitemap" },
  { title: "Achilles Ruptures", href: "achilles-ruptures" },
  { title: "Recovery Pathway", href: "recovery-pathway" },
  { title: "Evidence Based Recovery", href: "evidence-based-recovery" },
  // ...professionalLinks,
  ...videoPages,
  ...partnerLinks,
  ...productLinks,
  ...contactLinks,
];
