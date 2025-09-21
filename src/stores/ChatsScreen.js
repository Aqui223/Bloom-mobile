import { create } from "zustand";

const useChatsScreenStore = create((set) => ({
  focused: false,
  setFocused: (newFocused) => set({ focused: newFocused }),
  headerHeight: 0,
  setHeaderHeight: (newHeaderHeight) => set({ headerHeight: newHeaderHeight }),
  query: "",
  setQuery: (newQuery) => set({ query: newQuery }),
}));

export default useChatsScreenStore;
