import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { features } from "../../features/navigation/content";
import PageHeader from "@/components/PageHeader";

const ShipStockHome = () => {
  return (
    <>
      <PageHeader
        title="Stock Management"
        description="Ship Stock is a notion style stock management app which ties documents (invoices, purchase orders etc) to items in your inventory."
      />
      <div className="gap-6 grid md:grid-cols-2">
        {Object.entries(features).map(([key, feature]) => (
          <Link key={key} to={feature.href}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon} {feature.name}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {feature.content?.items?.length ? (
                  <ul className="space-y-2 pl-6 list-disc">
                    {feature.content.items.map((item, index) => (
                      <li key={`${index}-${item}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export const Route = createFileRoute("/home/")({
  component: ShipStockHome,
});
