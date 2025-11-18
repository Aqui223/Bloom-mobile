import { Button, Icon } from "@components/ui";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { styles } from "./Header.styles";
import React, { useEffect } from "react";
import { useInsets } from "@hooks";
import { quickSpring } from "@constants/easings";
import useAuthStore from "@stores/auth";

export default function AuthHeader({ navigation }): React.JSX.Element {
	const realIndex = navigation.getState().index;

	const { index, setIndex } = useAuthStore();
	const insets = useInsets();

	const back = () => {
		setIndex(Math.max(0, index - 1));
		navigation.goBack();
	};

	const animatedViewStyle = useAnimatedStyle(() => ({
		opacity: withSpring(index === 0 ? 0 : 1, quickSpring),
		transform: [{ translateY: withSpring(index === 0 ? "-20%" : "0%", quickSpring) }],
	}));

	useEffect(() => {
		setIndex(realIndex);
	}, []);

	useEffect(() => {
		if (realIndex > index) setIndex(realIndex);
	}, [realIndex]);

	return (
		<Animated.View style={[styles.header(insets.top), animatedViewStyle]}>
			<Button onPress={back} variant='icon' icon={<Icon icon='chevron.left' size={26} />} />
		</Animated.View>
	);
}
