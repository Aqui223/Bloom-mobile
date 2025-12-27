import React, { useEffect, useRef } from "react";
import { ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor, SharedValue } from "react-native-reanimated";
import { styles } from "./TabBarContainer.styles";
import { springyTabBar } from "@constants/animations";
import { TabValue } from "@interfaces";
import { TAB_COLORS } from "@constants/tabBar";

type TabBarIndicatorProps = {
	index: number;
	routes: TabValue[];
	tabBarWidth: SharedValue<number>;
	x: SharedValue<number>;
	colorProgress: SharedValue<number>;
};

export default function TabBarIndicator({ index = 0, routes, tabBarWidth, x, colorProgress }: TabBarIndicatorProps): React.JSX.Element {
	const prevIndex = useRef<number>(index);
	const scaleX = useSharedValue<number>(1);
	const scaleY = useSharedValue<number>(1);

	const tabsCount = routes?.length
	const TAB_COLORS_RES = TAB_COLORS(true)

	useEffect(() => {
		if (tabsCount <= 0) return;

		const target = (tabBarWidth.get() / 4 - 4.5) * index;
		prevIndex.current = index;

		x.value = withSpring(target, springyTabBar);

		scaleX.value = withSpring(1.2, springyTabBar, () => {
			scaleX.value = withSpring(1, springyTabBar);
		});

		scaleY.set(withSpring(0.8, springyTabBar, () => {
			scaleY.value = withSpring(1, springyTabBar);
		}));

		colorProgress.value = withSpring(Object.keys(TAB_COLORS_RES).indexOf(routes[index]), springyTabBar)
	}, [index, tabsCount]);

	const animatedStyle = useAnimatedStyle(
		(): ViewStyle => ({
			transform: [
				{ translateX: x.get() },
				{ scaleX: scaleX.get() },
				{ scaleY: scaleX.get() },
			],
			width: tabBarWidth.get() / 4 + 5,
			backgroundColor: interpolateColor(colorProgress.get(), routes.map((e) => Object.keys(TAB_COLORS_RES).indexOf(e)), Object.values(TAB_COLORS_RES) )
		})
	);

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
}
