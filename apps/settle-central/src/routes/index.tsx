import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";

const AmazonFinancialReports = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Months</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button asChild variant="default">
                <Link to="/months">Months</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settlements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button asChild variant="default">
                <Link to="/settlements">Settlements</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button asChild variant="default">
                <Link to="/instructions">Instructions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: AmazonFinancialReports,
});
