import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LayoutView = 'table' | 'cards'

interface LayoutStore {
  view: LayoutView
  setView: (view: LayoutView) => void
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      view: 'table',
      setView: (view) => set({ view }),
    }),
    {
      name: 'layout-storage',
    }
  )
) 