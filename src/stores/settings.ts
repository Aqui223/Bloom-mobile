import { create } from 'zustand'

type UseSettingsScreenStore = {
  snapEndPosition: number
  setSnapEndPosition: (snapEndPosition: number) => void
}

const useSettingsScreenStore = create<UseSettingsScreenStore>((set) => ({
  snapEndPosition: 0,
  setSnapEndPosition: (snapEndPosition) => set({ snapEndPosition }),
}))

export default useSettingsScreenStore
