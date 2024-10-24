import React from 'react'
import dayjs from 'dayjs'
import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import AmazonReportById from '@/features/amazon/components/AmazonReportById'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
const AmazonSettlementReport = () => {
  const { report } = Route.useSearch()
  console.log(report)
  const { countryCode } = Route.useParams()

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>Current Time: {dayjs().toString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <AmazonReportById countryCode={countryCode} report={report} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() =>
              supabase.functions.invoke('google-upload-amazon-report', {
                body: {
                  countryCode,
                  reportDocumentId: report?.reportDocumentId,
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
  '/finances/amazon/settlements/$countryCode/$reportType/summary',
)({
  component: AmazonSettlementReport,
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || '',
    }
  },
})
