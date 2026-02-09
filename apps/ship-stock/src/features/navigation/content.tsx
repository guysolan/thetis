import type { LucideIcon } from "lucide-react";
import {
  Box,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FactoryIcon,
  Grid3X3,
  Layers,
  MapPin,
  Package,
  Send,
  ShoppingBag,
  ShoppingCart,
  ToyBrick,
  Users,
  Wrench,
} from "lucide-react";

export interface NavTab {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface NavFeature {
  name: string;
  slug: string;
  href: string;
  description: string;
  icon: React.ReactElement;
  tabs: NavTab[];
  /** Optional list of bullet points for the home page card */
  content?: { items: string[] };
}

export const features: Record<string, NavFeature> = {
  orders: {
    name: "Orders",
    slug: "orders",
    href: "/home/orders",
    description: "Buy, sell and ship orders.",
    icon: <ShoppingBag />,
    tabs: [
      { value: "all", label: "All", icon: Grid3X3 },
      { value: "build", label: "Builds", icon: Package },
      { value: "buy", label: "Purchases", icon: ShoppingCart },
      { value: "sell", label: "Sales", icon: ShoppingCart },
      { value: "ship", label: "Shipments", icon: Send },
      { value: "count", label: "Stocktakes", icon: ClipboardList },
    ],
    content: {
      items: ["Create and track orders", "Sell, buy, build, ship, count", "Link to inventory"],
    },
  },
  build: {
    name: "Build",
    slug: "build",
    href: "/home/build",
    description: "Keep track of the items we buy and sell.",
    icon: <ToyBrick />,
    tabs: [
      { value: "part", label: "Parts", icon: Box },
      { value: "product", label: "Products", icon: Package },
      { value: "service", label: "Services", icon: Wrench },
      { value: "package", label: "Packages", icon: Layers },
    ],
    content: {
      items: ["Parts, products, services", "Packages and bundles", "Item catalog"],
    },
  },
  stock: {
    name: "Stock",
    slug: "stock",
    href: "/home/stock",
    description: "Try not to lose track of things.",
    icon: <FactoryIcon />,
    tabs: [
      { value: "all", label: "All", icon: Grid3X3 },
      { value: "product", label: "Products", icon: Package },
      { value: "part", label: "Parts", icon: Box },
    ],
    content: {
      items: ["Stock by location", "History and reorder plans", "Calculators"],
    },
  },
  directory: {
    name: "Directory",
    slug: "directory",
    href: "/home/directory",
    description: "Who's who.",
    icon: <BriefcaseBusiness />,
    tabs: [
      { value: "companies", label: "Companies", icon: Building2 },
      { value: "contacts", label: "Contacts", icon: Users },
      { value: "addresses", label: "Addresses", icon: MapPin },
    ],
    content: {
      items: ["Companies", "Contacts", "Addresses"],
    },
  },
};

/** Look up a feature by its URL slug (e.g. "orders", "build") */
export function getFeatureBySlug(slug: string): NavFeature | undefined {
  return Object.values(features).find((f) => f.slug === slug);
}

/** Resolve a tab value to its human-readable label within a feature */
export function getTabLabel(featureSlug: string, tabValue: string): string | undefined {
  const feature = getFeatureBySlug(featureSlug);
  return feature?.tabs.find((t) => t.value === tabValue)?.label;
}
