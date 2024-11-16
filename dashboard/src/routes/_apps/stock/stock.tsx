import { createFileRoute } from '@tanstack/react-router'
import Sheet from '@/components/Sheet'
import { selectStockpilesQueryOptions } from '@/features/stockpiles/api/selectStockpiles'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/PageTitle'
import AddressForm from '@/features/stockpiles/components/AddressForm'
import AmazonStock from '@/features/stockpiles/components/AmazonWarehouses'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddressStock from '@/features/stockpiles/components/AddressStock'

const ItemsPage = () => {
  return (
    <>
      <PageTitle title="Stock">
        <Sheet
          trigger={<Button>New Address</Button>}
          title="New address"
          description="Add a new address to your system."
        >
          <AddressForm operation="insert" address={null} />
        </Sheet>
      </PageTitle>

      <Tabs defaultValue="stockpiles" className="w-full">
        <TabsList>
          <TabsTrigger value="stockpiles">Stock</TabsTrigger>
          <TabsTrigger value="amazon">Amazon</TabsTrigger>
        </TabsList>

        <TabsContent value="stockpiles">
          <AddressStock />
        </TabsContent>

        <TabsContent value="amazon">
          <AmazonStock />
        </TabsContent>
      </Tabs>
    </>
  )
}

export const Route = createFileRoute('/_apps/stock/stock')({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectStockpilesQueryOptions())
  },
})
