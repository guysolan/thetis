import { createFileRoute } from '@tanstack/react-router'
import Sheet from '@/components/Sheet'
import { Button } from '@thetis/ui/button'
import { Tabs, TabsContent, TabsTrigger } from '@thetis/ui/tabs'
import CompanyContactForm from '@/features/contacts/components/CompanyContactForm'
import AddressForm from '@/features/stockpiles/components/AddressForm'
import CompanyForm from '@/features/companies/components/CompanyForm'
import LayoutPopover from '../../components/LayoutPopover'
import Companies from '../../features/companies/components/Companies'
import Contacts from '../../features/contacts/components/Contacts'
import Addresses from '../../features/stockpiles/components/Addresses'
import TabsHeader from '@/components/TabsHeader'
import PageHeader from '@/components/PageHeader'
import { features } from '@/features/navigation/content'

const tabConfig = features.directory.tabs

type DirectoryTab = (typeof tabConfig)[number]['value']

export const Route = createFileRoute('/home/directory')({
  component: DirectoryPage,
  validateSearch: (search: Record<string, unknown>): { tab: DirectoryTab } => ({
    tab: (tabConfig.some(t => t.value === search.tab) ? search.tab : 'companies') as DirectoryTab,
  }),
})

function DirectoryPage() {
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
      <PageHeader title="Directory">
        <LayoutPopover />
        <Sheet
          trigger={<Button variant="outline">New Company</Button>}
          title="New Company"
          description="Add a new company to your system."
        >
          <CompanyForm />
        </Sheet>
        <Sheet
          trigger={<Button variant="outline">New Contact</Button>}
          title="New Contact"
          description="Add a new contact to your system."
        >
          <CompanyContactForm contact={null} operation="insert" />
        </Sheet>
        <Sheet
          trigger={<Button variant="outline">New Address</Button>}
          title="New Address"
          description="Add a new address to your system."
        >
          <AddressForm operation="insert" address={null} />
        </Sheet>
      </PageHeader>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsHeader tabsList={tabsList} />

        <TabsContent value="companies">
          <Companies />
        </TabsContent>

        <TabsContent value="contacts">
          <Contacts />
        </TabsContent>

        <TabsContent value="addresses">
          <Addresses />
        </TabsContent>
      </Tabs>
    </>
  )
}
