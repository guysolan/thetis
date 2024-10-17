import { createFileRoute } from '@tanstack/react-router'
import PageTitle from '../../components/PageTitle'

export const Route = createFileRoute('/_dashboard/settings')({
  component: () => (
    <>
      <PageTitle title="Settings"></PageTitle>
    </>
  ),
})
