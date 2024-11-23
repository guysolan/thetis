import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OrderSettings {
  currency: string
  vat: string
  packaged: boolean
}

interface OrderSettingsStore {
  settings: OrderSettings
  updateSettings: (updates: Partial<OrderSettings>) => void
}

export const useOrderSettings = create<OrderSettingsStore>()(
  persist(
    (set) => ({
      settings: {
        currency: 'USD',
        vat: '20',
        packaged: false,
      },
      updateSettings: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...updates,
          },
        })),
    }),
    {
      name: 'order-settings',
    }
  )
)