import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, { interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { quickSpring } from "@constants/easings";
import Icon from "@components/ui/Icon";
import { styles } from "./TabBar.styles";

interface TabBarItemProps {
	route: { name: "tab_chats" | "tab_search" | "tab_settings" };
	focused: boolean;
	onPress: () => void;
}

const TAB_ICONS = {
	tab_chats: "message",
	tab_search: "compass",
	tab_settings: "gear",
} as const;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarItem({ route, focused, onPress }: TabBarItemProps): React.JSX.Element {
	const { theme } = useUnistyles();
	const color = useSharedValue(0.35);
	const scale = useSharedValue(1);

	const tabColor = {
		tab_chats: theme.colors.primary,
		tab_search: theme.colors.yellow,
		tab_settings: theme.colors.purple,
	}[route.name];

	const iconScale = (out: boolean = false) => {
		scale.value = withSpring(out ? 1 : 1.1, quickSpring);
	};

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const animatedProps = useAnimatedProps(() => ({
		fill: interpolateColor(color.value, [1, 2], [theme.colors.text, tabColor]),
	}));

	useEffect(() => {
		color.value = withSpring(focused ? 2 : 1, quickSpring);
	}, [focused]);

	return (
		<AnimatedPressable style={[styles.tabBarItem, animatedStyle]} onPress={onPress} onPressIn={() => iconScale()} onPressOut={() => iconScale(true)}>
			<Icon animatedProps={animatedProps} size={30} icon={TAB_ICONS[route.name]} />
		</AnimatedPressable>
	);
}
