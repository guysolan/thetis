import { createFileRoute } from '@tanstack/react-router'
import PageTitle from '../../../components/PageTitle'

export const Route = createFileRoute('/_apps/stock/settings')({
  component: () => (
    <>
      <PageTitle title="Settings"></PageTitle>
    </>
  ),
})