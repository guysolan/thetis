import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@thetis/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@thetis/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@thetis/ui/table";

const Instructions = () => {
  return (
    <div className="flex flex-col mx-auto p-6 max-w-3xl">
      <h1 className="mb-8 font-bold text-zinc-900 text-3xl">Instructions</h1>
      <Card>
        <CardHeader>
          <CardTitle>VAT</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quarter</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Q1</TableCell>
                <TableCell>March 1</TableCell>
                <TableCell>May 31</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Q2</TableCell>
                <TableCell>June 1</TableCell>
                <TableCell>August 31</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Q3</TableCell>
                <TableCell>September 1</TableCell>
                <TableCell>November 30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Q4</TableCell>
                <TableCell>December 1</TableCell>
                <TableCell>February 28/29</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="w-full" value="paypal">
          <AccordionTrigger>Paypal</AccordionTrigger>
          <AccordionContent>
            <p>
              Go to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.paypal.com/reports/ppbalance"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                reports/ppbalance
              </a>{" "}
              and click on "Transfer" in the left sidebar.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="wise">
          <AccordionTrigger>Wise</AccordionTrigger>
          <AccordionContent>
            <p>
              Go to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://wise.com/balances/statements/standard"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                balances/statements/standard
              </a>{" "}
              and click on "Transfer" in the left sidebar.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="revolut">
          <AccordionTrigger>Revolut</AccordionTrigger>
          <AccordionContent>
            <p>
              Go to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://business.revolut.com/transactions"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                transactions
              </a>{" "}
              and click on "Transfer" in the left sidebar.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amazon">
          <AccordionTrigger>Amazon Seller Central</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              Go to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sellercentral.amazon.com/payments/allstatements/index.html"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                payments/allstatements/index.html
              </a>
            </p>
            <p>
              or go to{" "}
              <Link
                to="/finances/amazon/settlements"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Settlements
              </Link>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shopify">
          <AccordionTrigger>Shopify</AccordionTrigger>
          <AccordionContent>
            <p>
              Go to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://admin.shopify.com/store/f560c3-4/payments/payouts?link_source=search&selectedView=all"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                payments/payouts
              </a>{" "}
              and export the payout data.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const Route = createFileRoute("/instructions")({
  component: Instructions,
});
