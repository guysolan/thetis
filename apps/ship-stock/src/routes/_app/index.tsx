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

import React from "react";

const ShipStockHome = () => {
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Stock Management</h1>
      <p className="mb-6">
        Ship Stock is a notion style stock management app which ties documents
        (invoices, purchase orders etc) to items in your inventory.
      </p>
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
