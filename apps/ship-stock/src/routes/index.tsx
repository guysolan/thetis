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

const ShipStockHome = () => {
  return (
    <>
      <div className="mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="mb-6 font-bold text-4xl">{content.banner.title}</h1>
          <p className="mx-auto mb-6 max-w-2xl text-xl">
            {content.banner.description}
          </p>
          <Button size="lg" asChild>
            <Link to="/home">Try it Out</Link>
          </Button>
        </div>

        {/* Problems Section */}
        <div className="bg-muted/30 py-12">
          <h2 className="mb-12 font-bold text-3xl text-center">
            Common Challenges
          </h2>
          <div className="gap-6 grid md:grid-cols-3">
            {Object.entries(content.problems).map(([key, problem]) => (
              <Card key={key} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle>{problem.tagline}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    {problem.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-12">
          <h2 className="mb-12 font-bold text-3xl text-center">Key Benefits</h2>
          <div className="gap-6 grid md:grid-cols-3">
            {Object.entries(content.benefits).map(([key, benefit]) => (
              <Card key={key} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 pl-6 list-disc">
                    {benefit.bullets.map((bullet, index) => (
                      <li key={`${index}-${bullet}`}>{bullet}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
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
