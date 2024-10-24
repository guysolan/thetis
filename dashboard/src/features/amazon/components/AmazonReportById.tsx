import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const formatCurrency = (num: number, currency: string) => {
  return `${Number(num ?? 0).toFixed(2)} ${currency}`;
};
export type AmazonReport = {
  createdTime: string;
  dataEndTime: string;
  dataStartTime: string;
  marketplaceIds: string[];
  processingEndTime: string;
  processingStartTime: string;
  processingStatus: string;
  reportDocumentId: string;
  reportId: string;
  reportType: string;
};

export type ReportSearch = {
  report: AmazonReport;
};

type SummaryData = {
  settlementId: string;
  settlementStartDate: string;
  settlementEndDate: string;
  depositDate: string;
  totalAmount: number;
  currency: string;
  marketplace: string;
  location: string;
  summary: Record<string, number>;
  metadata: {
    transactionTypes: string[];
    marketplaces: string[];
    feeTypes: string[];
    promotionTypes: string[];
    directPaymentTypes: string[];
  };
  sampleData: any[]; // Type can be more specific if needed
};

const AmazonReportById = ({ summary }: { summary: SummaryData }) => {
  const settlementDetails = [
    { label: "Settlement ID", value: summary.settlementId },
    {
      label: "Start Date",
      value: new Date(summary.settlementStartDate).toLocaleString(),
    },
    {
      label: "End Date",
      value: new Date(summary.settlementEndDate).toLocaleString(),
    },
    {
      label: "Deposit Date",
      value: new Date(summary.depositDate).toLocaleString(),
    },
    { label: "Currency", value: summary.currency },
  ];

  const financialSummary = [
    {
      label: "Beginning Balance",
      value: summary.summary.previousReserveAmount,
    },
    { label: "Sales", value: summary.summary.sales },
    {
      label: "Product Charges",
      value: summary.summary.salesProductCharges,
      indent: true,
    },
    { label: "Shipping", value: summary.summary.salesShipping, indent: true },
    { label: "Refunds", value: summary.summary.refunds },
    {
      label: "Fees and Expenses",
      value: summary.summary.netProceeds - summary.summary.sales -
        summary.summary.refunds,
    },
    {
      label: "Account Level Reserve",
      value: summary.summary.currentReserveAmount,
    },
    { label: "Net Proceeds", value: summary.summary.netProceeds },
  ];



  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Settlement Detail for {summary.marketplace}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {settlementDetails.map(({ label, value }) => (
                <TableRow key={label}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialSummary.map(({ label, value, indent }) => (
                <TableRow key={label}>
                  <TableCell className={`font-medium ${indent ? "pl-8" : ""}`}>
                    {label}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(value, summary.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmazonReportById;
