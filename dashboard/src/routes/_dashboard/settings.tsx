import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/settings')({
  component: () => <div>Hello /_dashboard/settings!</div>,
})
