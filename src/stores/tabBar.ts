import { create } from "zustand";

type TabBarStore = {
    tabBarHeight: number;
    setTabBarHeight: (newTabBarHeight: number) => void
}

const useTabBarStore = create<TabBarStore>((set) => ({
  tabBarHeight: 0,
  setTabBarHeight: (newTabBarHeight) => set({ tabBarHeight: newTabBarHeight }),
}));

export default useTabBarStore;
