import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { useDownloadFolder } from "@/features/amazon/api/useDownloadFolder";

const AmazonFinancialReports = () => {
  const { mutate: downloadFolder } = useDownloadFolder();
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {["NA", "EUR"].map((country) => (
          <Card key={country}>
            <CardHeader>
              <CardTitle>{country} Settlements</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default">
                <Link
                  to="/finances/amazon/settlements/$region"
                  params={{ region: country }}
                >
                  {country} Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("US")}
        >
          <FolderOpen size={16} /> Download US
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("CA")}
        >
          <FolderOpen size={16} /> Download US
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("GB")}
        >
          <FolderOpen size={16} /> Download GB
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("DE")}
        >
          <FolderOpen size={16} /> Download DE
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("IT")}
        >
          <FolderOpen size={16} /> Download IT
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadFolder("FR")}
        >
          <FolderOpen size={16} /> Download FR
        </Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/finances/amazon/settlements/")({
  component: AmazonFinancialReports,
});
