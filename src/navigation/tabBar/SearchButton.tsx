import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { styles } from "./TabBar.styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Icon } from "@components/ui";
import useTabBarStore from "@stores/tabBar";
import { useUnistyles } from "react-native-unistyles";
import { springyTabBar } from "@constants/animations";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarSearchButton(): React.JSX.Element {
	const opacity = useSharedValue(1);
	const { isSearch, setIsSearch } = useTabBarStore();
	const { width } = useWindowDimensions();
	const { theme } = useUnistyles();

	const searchReachWidth = width - 48 - theme.spacing.md - theme.spacing.xxxl * 2;

	const AnimatedPressableStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		width: withSpring(isSearch ? searchReachWidth : 54, springyTabBar),
		height: withSpring(isSearch ? 48 : 54, springyTabBar),
	}));

	const pressableOpacity = (out: boolean = false) => {
		opacity.value = withSpring(out ? 1 : 0.5, springyTabBar);
	};

	return (
		<AnimatedPressable
			onPress={() => setIsSearch(!isSearch)}
			style={[styles.searchButton, AnimatedPressableStyle]}
			onTouchStart={() => pressableOpacity()}
			onTouchEnd={() => pressableOpacity(true)}
		>
			<Icon icon='magnifyingglass' size={30} />
		</AnimatedPressable>
	);
}
