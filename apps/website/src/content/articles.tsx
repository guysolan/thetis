import AircastVsAchilles from "../assets/blog/aircast-vs-vacoped.png";
import AchillesDrawing from "../assets/drawings/achilles-drawing.svg";
import {
  Hourglass,
  Calendar,
  Stethoscope,
  Activity,
  HelpCircle,
  CircleX,
  Heart,
  Shield,
} from "lucide-react";
export const articles = [
  {
    href: "/FAQs/achilles-rupture-timeline",
    title: "Achilles Rupture Timeline",
    description:
      "Explore a detailed timeline outlining the treatment and recovery journey of an Achilles Tendon Rupture, from the moment of injury to regaining unrestricted activity. Discover the crucial phases and milestones along the way.",
    tags: [
      { words: "Treatment", color: "bg-orange-200" },
      { words: "Recovery", color: "bg-purple-200" },
    ],
    image: AchillesDrawing,
    icon: <Calendar />,
  },
  {
    href: "/FAQs/achilles-tear-treatment",
    title: "Torn Achilles Treatment Pathway",
    description:
      "Navigate through a comprehensive guide dedicated to understanding the treatment options for a ruptured Achilles tendon. Delve into aspects like surgical considerations, post-surgery pain management, and the path to recovery.",
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: <Activity />,
  },
  {
    href: "/FAQs/is-my-achilles-ruptured",
    title: "Is My Achilles Ruptured?",
    description:
      "Uncover all you need to determine if you have experienced a ruptured Achilles tendon. Learn about the causes, symptoms, and the severity of the injury.",
    tags: [{ words: "Diagnosis", color: "bg-rose-100" }],
    icon: <Stethoscope />,
  },

  {
    href: "/FAQs/torn-achilles-recovery",
    title: "Torn Achilles Recovery",
    description:
      "Find a comprehensive resource on torn Achilles recovery, covering aspects such as recovery duration with or without surgery, casts versus boots, and sleep considerations during recovery.",
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: <Hourglass />,
  },
  {
    href: "/FAQs/what-happens-if-my-achilles-is-ruptured",
    title: "What Happens If My Achilles Is Ruptured?",
    description:
      "Gain insights about what to expect if you have a ruptured Achilles tendon, including initial treatment in A&E, physiotherapy recommendations, and the number of required check-ups.",
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: <HelpCircle />,
  },
  {
    href: "/blog/aircast-vs-vacoped",
    title: "The Best Boot for Recovery: Aircast vs Vacoped",
    description:
      "Learn how to select the most suitable boot for your Achilles rupture recovery by considering design, comfort, functionality, and cost factors.",
    tags: [{ words: "Equipment", color: "bg-sky-200" }],
    image: AircastVsAchilles,
    icon: <CircleX />,
  },
  {
    href: "/FAQs/life-after-achilles-rupture",
    title: "Life After Achilles Rupture",
    description:
      "Discover insights on life after an Achilles rupture, including when you can resume walking, working, and engaging in sports.",
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: <Heart />,
  },
];
