import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
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
  settlement_id: string;
  settlement_start_date: string;
  settlement_end_date: string;
  deposit_date: string;
  net_proceeds: string;
  marketplace_name: string;
  sales: {
    total: number;
    product_charges: number;
    tax: number;
    shipping: number;
    inventory_reimbursements: number;
  };
  refunds: {
    total: number;
    refunded_expenses: number;
    refunded_sales: number;
  };
  expenses: {
    total: number;
    amazon_fees: number;
    fba_fees: number;
  };
  account_reserve_level: number;
  beginning_balance: number;
};

const AmazonReportById = ({ summary }: { summary: SummaryData }) => {
  const settlementDetails = [
    { label: "Settlement ID", value: summary.settlement_id },
    { label: "Settlement Start Date", value: summary.settlement_start_date },
    { label: "Settlement End Date", value: summary.settlement_end_date },
    { label: "Deposit Date", value: summary.deposit_date },
    {
      label: "Net Proceeds",
      value: formatCurrency(parseFloat(summary.net_proceeds), "USD"),
    },
    { label: "Marketplace Name", value: summary.marketplace_name },
  ];

  const financialSummary = [
    { label: "Sales Total", value: summary.sales.total },
    {
      label: "Product Charges",
      value: summary.sales.product_charges,
      indent: true,
    },
    { label: "Tax", value: summary.sales.tax, indent: true },
    { label: "Shipping", value: summary.sales.shipping, indent: true },
    {
      label: "Inventory Reimbursements",
      value: summary.sales.inventory_reimbursements,
      indent: true,
    },
    { label: "Refunds Total", value: summary.refunds.total },
    {
      label: "Refunded Expenses",
      value: summary.refunds.refunded_expenses,
      indent: true,
    },
    {
      label: "Refunded Sales",
      value: summary.refunds.refunded_sales,
      indent: true,
    },
    { label: "Expenses Total", value: summary.expenses.total },
    { label: "Amazon Fees", value: summary.expenses.amazon_fees, indent: true },
    { label: "FBA Fees", value: summary.expenses.fba_fees, indent: true },
    { label: "Account Reserve Level", value: summary.account_reserve_level },
    { label: "Beginning Balance", value: summary.beginning_balance },
  ];

  return (
    <div className="space-y-8">
      <CardTitle>Settlement Detail for {summary.marketplace_name}</CardTitle>
      <Table>
        <TableBody>
          {settlementDetails.map(({ label, value }) => (
            <TableRow key={label}>
              <TableCell className="font-medium text-left">{label}</TableCell>
              <TableCell className="text-right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CardTitle>Financial Summary</CardTitle>
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
              <TableCell
                className={`text-left  ${indent ? "pl-8 font-light" : "font-medium"}`}
              >
                {label}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(value, "USD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AmazonReportById;
