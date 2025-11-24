import { create } from "zustand";

type TabBarStore = {
	tabBarHeight: number;
	isSearch: boolean;
	searchValue: string;
	setTabBarHeight: (tabBarHeight: number) => void;
	setIsSearch: (isSearch: boolean) => void;
	setSearchValue: (searchValue: string) => void;
};

const useTabBarStore = create<TabBarStore>(set => ({
	tabBarHeight: 0,
	isSearch: false,
	searchValue: "",
	setTabBarHeight: tabBarHeight => set({ tabBarHeight }),
	setIsSearch: isSearch => set({ isSearch }),
	setSearchValue: searchValue => set({ searchValue }),
}));

export default useTabBarStore;
