import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import XMLViewer from 'react-xml-viewer'
import { useAmazonReportByIdAsXML } from '../../../../../features/amazon/api/downloadAmazonReportByIdAsXml'
const AmazonSettlementReport = () => {
  const { countryCode, reportId } = Route.useParams()
  const {
    data: xmlData,
    isLoading,
    error,
  } = useAmazonReportByIdAsXML(reportId, countryCode)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <XMLViewer xml={xmlData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute(
  '/finances/amazon/settlements/$countryCode/$reportId/xml',
)({
  component: AmazonSettlementReport,
})
