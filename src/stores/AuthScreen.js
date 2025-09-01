import { create } from "zustand";

const useAuthScreenStore = create((set) => ({
  activeSlide: 0,
  setActiveSlide: (newActiveSlide) => set({ activeSlide: newActiveSlide }),
}));

export default useAuthScreenStore;
