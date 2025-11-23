import { create } from "zustand";

type TokenTriggerStore = {
    counter: number;
    setCounter: (newCounter: number) => void
}

const useTokenTriggerStore = create<TokenTriggerStore>((set) => ({
  counter: 0,
  setCounter: (newCounter) => set({ counter: newCounter }),
}));

export default useTokenTriggerStore;
