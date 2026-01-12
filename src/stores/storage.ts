import type { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'

type StorageState = {
  mmkv: MMKV | null
  setMMKV: (newMMKV: MMKV) => void
}

const useStorageStore = create<StorageState>((set) => ({
  mmkv: null,
  setMMKV: (newMMKV) => set({ mmkv: newMMKV }),
}))

export default useStorageStore
