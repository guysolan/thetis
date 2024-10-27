import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_apps/finances')({
  component: () => <Outlet />,
  errorComponent: ({ error, reset }) => (
    <div>
      {error.message}
      <Button onClick={reset}>Reset</Button>
    </div>
  ),
})
