import React, { useEffect, useRef } from "react";
import { ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from "react-native-reanimated";
import { useInsets } from "@hooks";
import { styles } from "./TabBarContainer.styles";
import { springyTabBar } from "@constants/animations";
import useTabBarStore from "@stores/tabBar";
import { TabValue } from "@interfaces";
import { TAB_COLORS } from "@constants/tabBar";

type TabBarIndicatorProps = {
	index?: number;
	routes?: TabValue[];
};

export default function TabBarIndicator({ index = 0, routes }: TabBarIndicatorProps): React.JSX.Element {
	const insets = useInsets();
	const prevIndex = useRef(index);
	const { isSearch } = useTabBarStore();

	const x = useSharedValue(0);
	const scaleX = useSharedValue(1);
	const scaleY = useSharedValue(1);
	const colorProgress = useSharedValue(0);

	const tabWidth = 70;
	const tabsCount = routes?.length
	const TAB_COLORS_RES = TAB_COLORS(true)

	useEffect(() => {
		if (tabsCount <= 0) return;

		const target = tabWidth * index;
		prevIndex.current = index;

		x.value = withSpring(target, springyTabBar);

		scaleX.value = withSpring(1.2, springyTabBar, () => {
			scaleX.value = withSpring(1, springyTabBar);
		});

		scaleY.value = withSpring(0.875, springyTabBar, () => {
			scaleY.value = withSpring(1, springyTabBar);
		});

		colorProgress.value = withSpring(Object.keys(TAB_COLORS_RES).indexOf(routes[index]), springyTabBar)
	}, [index, tabsCount]);

	const animatedStyle = useAnimatedStyle(
		(): ViewStyle => ({
			transform: [
				{ translateX: x.value },
				{ scaleX: scaleX.value },
				{ scaleY: scaleY.value },
				{ scale: withSpring(isSearch ? 0.5 : 1, springyTabBar) },
			],
			opacity: withSpring(isSearch ? 0 : 1, springyTabBar),
			backgroundColor: interpolateColor(colorProgress.value, routes.map((e) => Object.keys(TAB_COLORS_RES).indexOf(e)), Object.values(TAB_COLORS_RES) )
		})
	);

	return <Animated.View style={[styles.indicator, animatedStyle, { width: tabWidth, bottom: insets.bottom }]} />;
}
