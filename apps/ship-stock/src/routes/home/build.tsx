import { createFileRoute } from '@tanstack/react-router'
import Sheet from '@/components/Sheet.tsx'
import { Tabs, TabsContent, TabsTrigger } from '@thetis/ui/tabs'
import { Button } from '@thetis/ui/button'
import { ItemForm } from '@/features/items/components/ItemForm.tsx'
import LayoutPopover from '../../components/LayoutPopover'
import { itemTypes } from '../../features/items/types'
import Items from '../../features/items/components/Item'
import TabsHeader from '@/components/TabsHeader'
import PageHeader from '@/components/PageHeader'
import { features } from '@/features/navigation/content'

const tabConfig = features.build.tabs

type BuildTab = (typeof tabConfig)[number]['value']

export const Route = createFileRoute('/home/build')({
  component: ItemsPage,
  validateSearch: (search: Record<string, unknown>): { tab: BuildTab } => ({
    tab: (tabConfig.some(t => t.value === search.tab) ? search.tab : 'part') as BuildTab,
  }),
})

function ItemsPage() {
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate({ search: { tab: value }, replace: true })
    }
  }

  const tabsList = tabConfig.map(({ value, label, icon: Icon }) => (
    <TabsTrigger key={value} value={value}>
      <Icon size={16} className="shrink-0" />
      <span>{label}</span>
    </TabsTrigger>
  ))

  return (
    <>
      <PageHeader title="Build">
        <LayoutPopover />
        <Sheet trigger={<Button variant="default">New Item</Button>} title="Edit">
          <ItemForm item={null} />
        </Sheet>
      </PageHeader>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsHeader tabsList={tabsList} />
        {itemTypes.map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Items itemType={tabValue} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
