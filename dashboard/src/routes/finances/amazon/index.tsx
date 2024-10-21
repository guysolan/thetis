import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAmazonReports } from '../../../features/amazon/api/selectAmazonReports'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // Adding 1 because getMonth() returns 0-11

const AmazonFinancialReports = () => {
  const { data: reports } = useAmazonReports();
  console.log(reports);
  const years = Array.from({ length: currentYear - 2021 }, (_, i) => currentYear - i)


  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>
      {years.map((year) => (
        <div key={year} className="mb-8">
          <h2 className="mb-4 font-bold text-xl">{year}</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {months.map((month, index) => (
              <Card key={`${year}-${month}`}>
                <CardHeader>
                  <CardTitle>{month}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      asChild
                      variant="default"
                      disabled={year === currentYear && index + 1 > currentMonth}
                    >
                      <Link to={`/finances/amazon/${year}/${index + 1}`}>
                        Report
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      disabled={year === currentYear && index + 1 > currentMonth}
                    >
                      <Link to={`/finances/amazon/${year}/${index + 1}`}>
                        Transactions
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Route = createFileRoute('/finances/amazon/')({
  component: AmazonFinancialReports
})
