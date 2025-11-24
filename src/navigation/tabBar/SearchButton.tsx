import React from "react";
import { Pressable } from "react-native";
import { styles } from "./TabBar.styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Icon } from "@components/ui";
import { springy } from "@constants/animations";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarSearchButton(): React.JSX.Element {
	const scale = useSharedValue(1);

	const AnimatedPressableStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const iconScale = (out: boolean = false) => {
		scale.value = withSpring(out ? 1 : 1.1, springy);
	};

	return (
		<AnimatedPressable style={[styles.searchButton, AnimatedPressableStyle]} onPressIn={() => iconScale()} onPressOut={() => iconScale(true)}>
			<Icon icon='magnifyingglass' size={30} />
		</AnimatedPressable>
	);
}
