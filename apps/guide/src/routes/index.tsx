import { createFileRoute, Link } from "@tanstack/react-router";
import { sections } from "@/content/course/sections";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCheck,
  CheckCircle2,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@thetis/ui/button";
import { Logo } from "@thetis/ui/logo";
import { Input } from "@thetis/ui/input";
import { Label } from "@thetis/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { useState } from "react";

const courses = [
  {
    title: "Essentials",
    description:
      "31 easily digestable lessons to guide you through each stage of recovery.",
    price: 29,
    features: [
      "Questions for your surgeon",
      "Physio Exercises",
      "Illustrations for easy understanding",
      "Product recommendations",
    ],
    link: "/essentials",
    buttonText: "Start Now",
  },
  {
    title: "Professionals",
    description:
      "Advanced recovery strategies and expert-led video lessons for elite results.",
    price: 99,
    features: [
      "Everything in Essentials",
      "Specialist Surgeon video lessons",
      "8 recovery hacks",
    ],
    link: "/professionals",
    buttonText: "Go Pro",
  },
];

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const totalSections = sections.length;
  const [email, setEmail] = useState("");
  const [ruptureDate, setRuptureDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    console.log("Subscribing:", { email, ruptureDate });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-5xl">
        {/* Hero */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 mb-6 px-4 py-1.5 rounded-full font-medium text-primary text-sm uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            Recovery Programs
          </div>
          <h1 className="mb-6 font-bold text-foreground text-4xl md:text-6xl tracking-tight">
            Simplify your <span className="text-primary">Recovery</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
            Choose the program that best fits your journey back to life, work,
            and sport after an Achilles rupture.
          </p>
        </div>

        {/* Options */}
        <div className="gap-8 grid md:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.link}
              to={course.link}
              className="group relative flex flex-col bg-card hover:bg-muted/30 p-8 border border-border hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-300"
            >
              <div className="mb-6">
                <h2 className="mb-2 font-bold group-hover:text-primary text-2xl transition-colors">
                  {course.title}
                </h2>
                <p className="text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-8">
                  {course.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="flex justify-center items-center bg-primary/10 rounded-full w-5 h-5 text-primary">
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-auto pt-6 border-border/50 border-t">
                <span className="font-semibold text-foreground text-lg">
                  £{course.price}
                </span>
                <div className="flex items-center gap-2 font-medium text-primary text-sm transition-transform group-hover:translate-x-1">
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Email Signup Section */}
        <div className="mt-16 pt-8 border-border/50 border-t">
          <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col items-start sm:items-end gap-4 max-w-xl"
          >
            <div className="flex-1 w-full">
              <Label
                htmlFor="email"
                className="block mb-1.5 font-semibold text-foreground text-sm"
              >
                Get free recovery tips
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/90 focus:border-primary rounded-sm focus:ring-primary h-11"
                required
              />
            </div>
            <div className="w-full sm:w-44">
              <Label
                htmlFor="rupture-date"
                className="block mb-1.5 font-semibold text-foreground text-sm"
              >
                Rupture date
              </Label>
              <Input
                id="rupture-date"
                type="date"
                value={ruptureDate}
                onChange={(e) => setRuptureDate(e.target.value)}
                className="bg-white/90 focus:border-primary rounded-sm focus:ring-primary h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="px-6 rounded-sm h-11 shrink-0"
            >
              <Mail className="mr-2 w-4 h-4" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
