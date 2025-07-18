import {
  Box,
  ClipboardCheck,
  Handshake,
  HeartHandshake,
  Mail,
  Microscope,
  Moon,
  Rewind,
  Star,
  Stethoscope,
} from "lucide-react";
import nightSplintImage from "./night_splint_bed_side.jpg";

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
    href: "/splint",
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
    title: "Professionals",
    description: "Join other clinicians improving patient recovery.",
    href: "/professionals",
    icon: <Stethoscope size={20} />,
    variant: "default",
  },
  {
    title: "Our Partners",
    description: "Our partners are the best in the business.",
    href: "/partners",
    icon: <HeartHandshake size={20} />,
    variant: "outline",
  },
  {
    title: "Our Research",
    description: "Our analysis of Achilles Rupture Recovery.",
    href: "/research",
    icon: <Microscope size={20} />,
    variant: "outline",
  },
  {
    title: "Evidence",
    description:
      "Proven to shorten time to care and improve patient experience.",
    href: "/evidence",
    icon: <ClipboardCheck size={20} />,
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
  {
    title: "Request a Return",
    description: "Request a return for your product.",
    href: "/request-a-return",
    icon: <Rewind size={20} />,
    variant: "outline",
  },
];

export const videoPages = [
  {
    title: "Splint Instructions",
    href: "video/night-splint-instructions",
  },
  {
    title: "Splint Presentation",
    href: "video/night-splint-presentation",
  },
];

export const faqLinks = [
  { href: "/achilles-ruptures", title: "Achilles Ruptures" },
  {
    href: "/FAQs/achilles-rupture-timeline",
    title: "Achilles Rupture Timeline",
  },
  {
    href: "/FAQs/is-my-achilles-ruptured",
    title: "Is my Achilles Ruptured?",
  },
  {
    href: "/FAQs/what-happens-if-my-achilles-is-ruptured?",
    title: "What happens if my Achilles is ruptured?",
  },
  {
    href: "/FAQs/achilles-tear-treatment",
    title: "Achilles Tear Treatment",
  },
  {
    href: "/FAQs/torn-achilles-recovery",
    title: "Torn Achilles Recovery",
  },
  {
    href: "/FAQs/life-after-achilles-rupture",
    title: "Life After Achilles Rupture",
  },
  { href: "/evidence-based-recovery", title: "Evidence Based Recovery" },
];

export const legalLinks = [
  { href: "/returns-policy", title: "Returns Policy" },
  { href: "/sitemap", title: "Sitemap" },
];

export const pages = [
  { title: "Home", href: "" },
  { title: "Splint", href: "night-splint" },
  { title: "Trauma Splint", href: "trauma-splint" },

  { title: "Sitemap", href: "sitemap" },
  { title: "Achilles Ruptures", href: "achilles-ruptures" },
  { title: "Recovery Pathway", href: "recovery-pathway" },
  { title: "Evidence Based Recovery", href: "evidence-based-recovery" },
  ...videoPages,
  ...partnerLinks,
  ...productLinks,
  ...contactLinks,
];
