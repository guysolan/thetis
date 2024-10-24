import React from 'react'
import dayjs from 'dayjs'
import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useAmazonReportById } from '../../../../../../features/amazon/api/getAmazonReportById'

const AmazonSettlementReport = () => {
  const { report } = Route.useSearch()
  const { countryCode } = Route.useParams()
  const { data, isLoading, error } = useAmazonReportById(
    countryCode,
    report.reportDocumentId,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>Current Time: {dayjs().toString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(data[0] || {}).map((key) => (
                  <TableHead key={key}>{key.replaceAll('"','')}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row)?.map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{typeof value === 'string' ? value.replaceAll('"','').replaceAll("\\",'') : value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() =>
              supabase.functions.invoke('google-upload-amazon-report', {
                body: {
                  reportDocumentId: report?.reportDocumentId,
                  countryCode,
                },
              })
            }
          >
            Add to Google Drive
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { ReportSearch } from '@/features/amazon/components/AmazonReportById'

export const Route = createFileRoute(
  '/finances/amazon/settlements/$countryCode/$reportType/table',
)({
  component: AmazonSettlementReport,
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || '',
    }
  },
})
