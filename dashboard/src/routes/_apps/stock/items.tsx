import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Sheet from '@/components/Sheet.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import ItemComponentsForm from '@/features/items/components/ItemComponentsForm.tsx'
import { useSelectItemsView } from '@/features/items/api/selectItemsView.ts'
import DeleteDialog from '@/components/DeleteDialog.tsx'
import { ItemForm } from '@/features/items/components/ItemForm.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import PageTitle from '@/components/PageTitle.tsx'
import { ItemView } from '@/features/items/types.ts'
import { SheetClose, SheetFooter } from '@/components/ui/sheet.tsx'
import { useDeleteItem } from '@/features/items/api/deleteItem.ts'
const ItemsPage = () => {
  const { data: itemsView } = useSelectItemsView()
  const { mutate: deleteItem } = useDeleteItem()

  return (
    <>
      <PageTitle title="Items">
        <Sheet
          trigger={<Button variant="default">New Item</Button>}
          title="Edit"
        >
          <ItemForm item={null} />
        </Sheet>
      </PageTitle>

      <section className="flex flex-col gap-4">
        {itemsView.map((item: ItemView) => (
          <Card key={item.item_id} className="flex flex-col">
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
              <CardTitle className="flex flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
                {item.item_name}
                <Badge>{item.item_type}</Badge>
              </CardTitle>
              <div className="flex flex-row flex-shrink gap-2">
                <Sheet
                  trigger={<Button variant="outline">Edit</Button>}
                  title="Edit"
                  footer={
                    <SheetClose asChild>
                      <DeleteDialog
                        deleteFunction={() =>
                          deleteItem(item.item_id as number)
                        }
                      />
                    </SheetClose>
                  }
                >
                  <ItemForm item={item} />
                </Sheet>
              </div>
            </CardHeader>
            {item.item_type === 'product' &&
              item.components &&
              item.components.length > 0 && (
                <CardContent className="flex-grow">
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component Name</TableHead>
                        <TableHead>Quantity per Item</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.components.map((c: any) => (
                        <TableRow key={String(c.component_id)}>
                          <TableCell>{c.component_name}</TableCell>
                          <TableCell>{c.component_quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Sheet
                    trigger={
                      <Button
                        size="lg"
                        className="gap-x-2 mt-4 w-full"
                        variant="secondary"
                      >
                        <Pencil size={16} />
                        Edit Components
                      </Button>
                    }
                    title={item.item_name}
                    description={`Make changes to the ${item.item_name} details here. Click save when you're done.`}
                  >
                    <ItemComponentsForm
                      defaultValues={{
                        item_components: item.components.map((ic: any) => ({
                          quantity: ic.quantity,
                          parent_item_id: String(item.item_id),
                          component_id: String(ic.component_id),
                        })),
                      }}
                    />
                  </Sheet>
                </CardContent>
              )}
          </Card>
        ))}
      </section>
    </>
  )
}

export const Route = createFileRoute('/_apps/stock/items')({
  component: ItemsPage,
})
