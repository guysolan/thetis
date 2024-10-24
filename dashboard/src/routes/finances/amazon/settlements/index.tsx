import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Euro, FolderArchive, FolderOpen } from "lucide-react";
import { useDownloadFolder } from "@/features/amazon/api/useDownloadFolder";

const AmazonFinancialReports = () => {
  const { mutate: downloadFolder } = useDownloadFolder();
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {[{
          countries: ["US", "MX", "CA"],
          code: "NA",
          name: "North America",
          icon: <DollarSign size={32} />,
        }, {
          countries: ["IT", "GB", "DE", "SE", "FR"],
          code: "EUR",
          name: "Europe",
          icon: <Euro size={32} />,
        }].map((region) => (
          <Card key={region.code}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center gap-2 w-full text-xl">
                {region.name} Settlements
                {region.icon}

              </CardTitle>
            </CardHeader>
            <CardContent>
          
              <div className="flex flex-wrap gap-2">
                {region.countries.map((country) => (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => downloadFolder(country)}
                  >
                    <FolderArchive size={16} /> Download {country}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="default">
                <Link
                  to="/finances/amazon/settlements/$region"
                  params={{ region: region.code }}
                >
                  Next
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/finances/amazon/settlements/")({
  component: AmazonFinancialReports,
});
