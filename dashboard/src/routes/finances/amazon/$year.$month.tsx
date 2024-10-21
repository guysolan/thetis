import { createFileRoute } from '@tanstack/react-router'

import { useAmazonFinances } from '@/features/amazon/api/selectAmazonFinances'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Transaction = {
    sellingPartnerMetadata: {
        sellingPartnerId: string;
        marketplaceId: string;
        accountType: string;
    };
    transactionType: string;
    transactionId: string;
    transactionStatus: string;
    relatedIdentifiers: Array<{
        relatedIdentifierName: string;
        relatedIdentifierValue: string;
    }>;
    totalAmount: {
        currencyAmount: number;
        currencyCode: string;
    };
    description: string;
    postedDate: string;
    marketplaceDetails: {
        marketplaceId: string;
        marketplaceName: string;
    };
    items: Array<{
        description: string | null;
        totalAmount: {
            currencyAmount: number;
            currencyCode: string;
        };
        relatedIdentifiers: Array<{
            itemRelatedIdentifierName: string;
            itemRelatedIdentifierValue: string;
        }>;
        breakdowns: Array<{
            breakdownType: string;
            breakdownAmount: {
                currencyAmount: number;
                currencyCode: string;
            };
            breakdowns: Array<{
                breakdownType: string;
                breakdownAmount: {
                    currencyAmount: number;
                    currencyCode: string;
                };
                breakdowns?: Array<{
                    breakdownType: string;
                    breakdownAmount: {
                        currencyAmount: number;
                        currencyCode: string;
                    };
                }>;
            }> | null;
        }>;
        contexts: Array<{
            asin: string | null;
            quantityShipped: number;
            sku: string | null;
            fulfillmentNetwork: string | null;
            contextType: string;
        }>;
    }>;
    breakdowns: Array<{
        breakdownType: string;
        breakdownAmount: {
            currencyAmount: number;
            currencyCode: string;
        };
        breakdowns: Array<{
            breakdownType: string;
            breakdownAmount: {
                currencyAmount: number;
                currencyCode: string;
            };
            breakdowns: null;
        }> | [];
    }>;
    contexts: null;
};

const AmazonFinancesTable = ({ year, month }: { year: number, month: number }) => {
  const { data: transactions } = useAmazonFinances(year, month);

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
  };

  const totalAmount = transactions.reduce((sum: number, transaction: Transaction) => sum + transaction.totalAmount.currencyAmount, 0);
  const currencyCode = transactions[0]?.totalAmount.currencyCode || 'USD';

  return (
    <Table>
      <TableCaption>Amazon Financial Transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
          <TableHead className="text-right">Product Sales</TableHead>
          <TableHead className="text-right">Fees</TableHead>
          <TableHead className="text-right">Other</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => {
          const productCharges = transaction.breakdowns.find(breakdown => breakdown.breakdownType === 'ProductCharges')?.breakdownAmount || { currencyAmount: 0, currencyCode: transaction.totalAmount.currencyCode };
          const amazonFees = transaction.breakdowns.find(breakdown => breakdown.breakdownType === 'AmazonFees')?.breakdownAmount || { currencyAmount: 0, currencyCode: transaction.totalAmount.currencyCode };
          const otherAmount = transaction.totalAmount.currencyAmount - productCharges.currencyAmount - amazonFees.currencyAmount;

          return (
            <TableRow key={transaction.transactionId}>
              <TableCell>{new Date(transaction.postedDate).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.items?.map(item => item.description).join(', ')}</TableCell>
              <TableCell><Badge variant="outline">{transaction.transactionType}</Badge></TableCell>
              <TableCell className="text-right">{formatCurrency(transaction.totalAmount.currencyAmount, transaction.totalAmount.currencyCode)}</TableCell>
              <TableCell className="text-right">{formatCurrency(productCharges.currencyAmount, productCharges.currencyCode)}</TableCell>
              <TableCell className="text-right">{formatCurrency(amazonFees.currencyAmount, amazonFees.currencyCode)}</TableCell>
              <TableCell className="text-right">{formatCurrency(otherAmount, transaction.totalAmount.currencyCode)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{formatCurrency(totalAmount, currencyCode)}</TableCell>
          <TableCell colSpan={3}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

const AmazonFinancesPage = () => {
  const { year, month } = Route.useParams();
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Report</h1>
      <AmazonFinancesTable year={Number(year)} month={Number(month)} />
    </div>
  )
}

export const Route = createFileRoute('/finances/amazon/$year/$month')({
  component: AmazonFinancesPage,
})
