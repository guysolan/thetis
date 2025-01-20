import { HeartHandshake, Handshake, Box, Zap, Moon } from "lucide-react";
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
    title: "Night Splint",
    description: "Sleep comfortably while your achilles rupture heals.",
    href: "/night-splint",
    image: nightSplintImage,
    icon: <Moon size={20} />,
    variant: "outline",
  },
  {
    title: "Trauma Splint",
    description: "Start recovering quicker after an Achilles rupture",
    href: "/trauma-splint",
    image: traumaSplintImage,
    icon: <Zap size={20} />,
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
  { title: "Professionals", href: "professionals" },
  { title: "Sitemap", href: "sitemap" },
  { title: "Achilles Ruptures", href: "achilles-ruptures" },
  { title: "Recovery Pathway", href: "recovery-pathway" },
  { title: "Evidence Based Recovery", href: "evidence-based-recovery" },
  ...videoPages,
  ...partnerLinks,
  ...productLinks,
];
