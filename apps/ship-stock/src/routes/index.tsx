import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { content } from "../features/website/content";
import { Button } from "@thetis/ui/button";
import {
  CheckCircle,
  Package,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const ShipStockHome = () => {
  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-b from-secondary/30 to-background pt-16 pb-24">
        <div className="mx-auto px-4 max-w-6xl">
          <div className="py-16 text-center">
            <h1 className="bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-6 font-bold text-transparent text-xl">
              {content.banner.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-gray-700 text-xl">
              {content.banner.description}
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/home">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/10 border-primary text-primary"
                asChild
              >
                <a href="#features">Watch Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section with Cards */}
      <div className="py-20">
        <div className="mx-auto px-4 max-w-6xl">
          <h2 className="mb-4 font-bold text-3xl text-center">
            Common Challenges
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-center">
            Businesses face these inventory management problems every day
          </p>
          <div className="gap-6 grid md:grid-cols-3">
            {Object.entries(content.problems).map(([key, problem]) => (
              <Card
                key={key}
                className="bg-white shadow hover:shadow-lg border-none transition-all"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-xl">
                    {problem.tagline}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="py-2 pl-4 border-primary/20 border-l-4 text-gray-600 italic">
                    "{problem.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Highlight Section */}
      <div className="bg-muted/30 py-20" id="features">
        <div className="mx-auto px-4 max-w-6xl">
          <h2 className="mb-4 font-bold text-3xl text-center">Key Benefits</h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-center">
            Ship Stock provides powerful solutions to streamline your inventory
            management
          </p>
          <div className="gap-8 grid md:grid-cols-3">
            {Object.entries(content.benefits).map(([key, benefit]) => (
              <Card
                key={key}
                className="hover:shadow-md border-none overflow-hidden transition-all"
              >
                <div className="bg-primary h-2" />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {key === "stock" && (
                      <Package className="w-6 h-6 text-primary" />
                    )}
                    {key === "documents" && (
                      <FileText className="w-6 h-6 text-primary" />
                    )}
                    {key === "build" && (
                      <BarChart3 className="w-6 h-6 text-primary" />
                    )}
                    <CardTitle>{benefit.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.bullets.map((bullet, index) => (
                      <li
                        key={`${index}-${bullet}`}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="mx-auto px-4 max-w-6xl">
          <h2 className="mb-4 font-bold text-3xl text-center">
            What Our Users Say
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-center">
            Businesses of all sizes trust Ship Stock for their inventory
            management
          </p>
          <div className="gap-6 grid md:grid-cols-2">
            <Card className="bg-white shadow border-none">
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-600 italic">
                  "Ship Stock transformed our inventory management. We've
                  reduced stockouts by 85% and our team saves 15 hours every
                  week on paperwork."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/20 rounded-full w-10 h-10 font-bold text-primary">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-gray-500 text-sm">
                      Operations Manager, TechRetail
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow border-none">
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-600 italic">
                  "The document management feature alone has saved us countless
                  hours. Being able to link invoices directly to inventory items
                  is a game-changer."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/20 rounded-full w-10 h-10 font-bold text-primary">
                    MS
                  </div>
                  <div>
                    <p className="font-medium">Mike Smith</p>
                    <p className="text-gray-500 text-sm">
                      CEO, Manufacturing Solutions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="mx-auto px-4 max-w-6xl text-center">
          <h2 className="mb-6 font-bold text-3xl">
            Ready to streamline your inventory management?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-700 text-lg">
            Join thousands of businesses that have transformed their operations
            with Ship Stock
          </p>
          <Button size="lg" asChild>
            <Link to="/home">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: ShipStockHome,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      message: "Hello, world!",
    };
  },
});
