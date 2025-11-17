import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Icon } from "@components/ui";
import { ROUTES } from "@constants/routes";
import { styles } from "./Footer.styles";
import { useInsets } from "@hooks";
import { useUnistyles } from "react-native-unistyles";
import useAuthStore from "@stores/auth";
import Animated, { useAnimatedStyle, interpolateColor, withSpring, useSharedValue } from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import { getFadeIn, getFadeOut, layoutAnimationSpringy } from "@constants/animations";

const AnimatedButton = Animated.createAnimatedComponent(Button);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function AuthFooter({ navigation }): React.JSX.Element {
	const insets = useInsets();
	const { theme } = useUnistyles();
	const { index } = useAuthStore();
	const progress = useSharedValue(0);

	const animatedMailButtonStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(progress.value, [0, 1], [theme.colors.foreground, theme.colors.primary]),
		};
	});

	useEffect(() => {
		progress.value = withSpring(index === 0 ? 0 : 1, quickSpring);
	}, [index]);

	return (
		<View style={styles.footer(insets.bottom)}>
			<AnimatedButton
				labelStyle={styles.buttonLabel}
				onPress={() => navigation.navigate(ROUTES.auth.signup.email)}
				icon={
					index === 0 && (
						<AnimatedIcon
							entering={getFadeIn()}
							exiting={getFadeOut()}
							size={28}
							color={theme.colors.text}
							icon='at'
						/>
					)
				}
				label={index === 0 ? "Продолжить с Почтой" : "Продолжить"}
				size='xl'
				variant='textIcon'
				style={animatedMailButtonStyle}
			/>
		</View>
	);
}
