import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { jobs } from "../../features/navigation/content";
import { content } from "../../features/website/content";

const ShipStockHome = () => {
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Stock Management</h1>
      <p className="mb-6">
        Ship Stock is a notion style stock management app which ties documents
        (invoices, purchase orders etc) to items in your inventory.
      </p>
      <h1 className="mb-6 font-bold text-3xl">{content.banner.title}</h1>
      <p className="mb-6">{content.banner.description}</p>
      <div className="gap-6 grid md:grid-cols-2">
        {Object.entries(jobs).map(([key, job]) => (
          <Link key={key} to={job.href}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {job.icon} {job.name}
                </CardTitle>
                <CardDescription>{job.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 pl-6 list-disc">
                  {job.content.items.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 mb-6 font-bold text-2xl">Key Benefits</h2>
      <div className="gap-6 grid md:grid-cols-2">
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
    </>
  );
};

export const Route = createFileRoute("/_app/")({
  component: ShipStockHome,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      message: "Hello, world!",
    };
  },
});
