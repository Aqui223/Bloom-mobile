import React, { useEffect } from "react";
import { Button, Icon } from "@components/ui";
import { ROUTES } from "@constants/routes";
import { styles } from "./Footer.styles";
import { useInsets } from "@hooks";
import { useUnistyles } from "react-native-unistyles";
import useAuthStore from "@stores/auth";
import Animated, { useAnimatedStyle, interpolateColor, interpolate, withSpring, useSharedValue } from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import { getFadeIn, getFadeOut, layoutAnimationSpringy } from "@constants/animations";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function AuthFooter({ navigation }): React.JSX.Element {
	const insets = useInsets();
	const { theme } = useUnistyles();
	const { index, emailValid, otp } = useAuthStore();
	const progress = useSharedValue(0);
	const { progress: progressKeyboard, height } = useReanimatedKeyboardAnimation();
	const labelProgress = useSharedValue(1);

	const firstScreen = index === 0;
	const label = firstScreen ? "Продолжить с Почтой" : "Продолжить";

	const navigateMap = [() => navigation.navigate(ROUTES.auth.signup.email), () => navigation.navigate(ROUTES.auth.signup.otp)];

	const disabledMap = [false, !emailValid, otp.length >= 1];

	const progMap = [0, emailValid ? 2 : 1, otp.length >= 6 ? 2 : 1];

	const onPress = () => navigateMap[index]?.();
	const disabled = disabledMap[index] ?? false;
	const progValue = progMap[index];

	const animatedButtonStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(progress.value, [0, 1, 2], [theme.colors.foreground, theme.colors.foreground, theme.colors.primary]),
	}));

	const animatedViewStyle = useAnimatedStyle(
		() => ({
			transform: [{ translateY: height.value }],
			paddingBottom: interpolate(progressKeyboard.value, [0, 1], [insets.bottom, theme.spacing.lg], "clamp"),
		}),
		[index]
	);

	const animatedLabelStyle = useAnimatedStyle(
		() => ({
			color: interpolateColor(labelProgress.value, [0, 1, 2], [theme.colors.text, theme.colors.secondaryText, theme.colors.white]),
		}),
		[index]
	);

	useEffect(() => {
		labelProgress.value = withSpring(progValue, quickSpring);
		progress.value = withSpring(progValue, quickSpring);
	}, [index, emailValid, otp]);

	return (
		<Animated.View style={[styles.footer, animatedViewStyle]}>
			<AnimatedButton
				disabled={disabled}
				onPress={onPress}
				icon={
					firstScreen && (
						<Animated.View entering={getFadeIn()} exiting={getFadeOut()}>
							<Icon key='footerIcon' size={28} color={theme.colors.text} icon='at' />
						</Animated.View>
					)
				}
				size='xl'
				variant='textIcon'
				style={animatedButtonStyle}
			>
				<Animated.View layout={layoutAnimationSpringy} style={styles.partsContainer}>
					{label.split(" ").map((part, i) => (
						<Animated.Text
							key={i}
							entering={getFadeIn()}
							exiting={getFadeOut()}
							layout={layoutAnimationSpringy}
							style={[styles.buttonLabel, animatedLabelStyle]}
						>
							{part}{" "}
						</Animated.Text>
					))}
				</Animated.View>
			</AnimatedButton>
		</Animated.View>
	);
}
