import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AmazonFinancialReports = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {['NA', 'EUR'].map((country) => (
          <Card key={country}>
            <CardHeader>
              <CardTitle>{country} Settlements</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default">
                <Link to='/finances/amazon/settlements/$region' params={{region:country}}>
                  {country} Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/finances/amazon/settlements/')({
  component: AmazonFinancialReports,
})
