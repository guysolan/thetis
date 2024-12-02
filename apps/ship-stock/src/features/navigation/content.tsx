import {
  BriefcaseBusiness,
  FactoryIcon,
  ShoppingBag,
  ToyBrick,
} from "lucide-react";

export const features = {
  orders: {
    name: "Orders",
    href: "/home/orders",
    description: "Buy, sell and ship orders.",
    icon: <ShoppingBag />,
    external: false,
    content: {
      items: [
        "Manage purchases, sales, and shipments",
        "Track order details and item changes",
        "Monitor order history and values",
      ],
    },
  },
  build: {
    name: "Build",
    href: "/home/build",
    description: "Keep track of the items we buy and sell.",
    icon: <ToyBrick />,
    external: false,
    content: {
      items: [
        "Manage parts, products, services, and packages",
        "Track item details, prices, and components",
        "Monitor stock levels across stockpiles",
      ],
    },
  },
  stock: {
    name: "Stock",
    href: "/home/stock",
    description: "Try not to lose track of things.",
    icon: <FactoryIcon />,
    external: false,
    content: {
      items: [
        "Manage stockpiles and locations",
        "Conduct and record stocktakes",
        "Track inventory values and movements",
      ],
    },
  },
  directory: {
    name: "Directory",
    href: "/home/directory",
    description: "Who's who.",
    icon: <BriefcaseBusiness />,
    external: false,
    content: {
      items: [
        "Manage companies and contacts",
        "Track addresses and locations",
        "Maintain business relationships",
      ],
    },
  },
};
