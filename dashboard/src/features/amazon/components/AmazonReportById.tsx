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
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-bold text-2xl">Settlement Details</h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Settlement ID</TableCell>
                      <TableCell>{data.settlementId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Start Date</TableCell>
                      <TableCell>{new Date(data.settlementStartDate).toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">End Date</TableCell>
                      <TableCell>{new Date(data.settlementEndDate).toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deposit Date</TableCell>
                      <TableCell>{new Date(data.depositDate).toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Currency</TableCell>
                      <TableCell>{data.currency}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>


              <div className="space-y-4">
                <h2 className="font-bold text-2xl">Marketplaces</h2>
                <ul className="list-disc list-inside">
                  {data.marketplaces.filter(Boolean).map((marketplace, index) => (
                    <li key={index}>{marketplace}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-bold text-2xl">Summary</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.summary).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className='capitalize'>{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                        <TableCell className="text-right">{`${data.currency} ${value.toFixed(2)}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell className="font-bold">Total Amount</TableCell>
                      <TableCell className="text-right font-bold">{`${data.currency} ${data.totalAmount.toFixed(2)}`}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          )}
        </>
    );
};

export default AmazonReportById;
