import { create } from "zustand";

type AuthStore = {
 index: number | null,
 setIndex: (newIndex: number) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  index: 0,
  setIndex: (newIndex) => set({ index: newIndex})
}));

export default useAuthStore;
