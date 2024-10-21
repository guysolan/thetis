import { useAmazonReportById } from '../api/getAmazonReportById';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableFooter, TableHeader, TableRow } from '@/components/ui/table';
const AmazonReportById = (
    { countryCode, reportId }: { countryCode: string; reportId: string },
) => {
    const { data } = useAmazonReportById(
        reportId,
        countryCode,
    );
    return (
        <>
          {data && (
            <div className="space-y-4">
              <Table>
                <TableCaption>Amazon Settlement Report Summary</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(data.amountTypeSum).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                      <TableCell className="text-right">{value !== null ? `$${value.toFixed(2)}` : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total Amount</TableCell>
                    <TableCell className="text-right">{data.totalAmount !== null ? `$${data.totalAmount.toFixed(2)}` : 'N/A'}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </>
    );
};

export default AmazonReportById;
