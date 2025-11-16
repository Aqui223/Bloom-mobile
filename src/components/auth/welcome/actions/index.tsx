import { Button } from "@components/ui";
import { Icon, Separator } from "@components/ui";
import { useInsets } from "@hooks";
import React, { useEffect } from "react";
import { Image, Platform } from "react-native";
import { styles } from "./Actions.styles";
import { useUnistyles } from "react-native-unistyles";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { ROUTES } from "@constants/routes";
import { layoutAnimationSpringy, springyChar, getFadeIn, getFadeOut } from "@constants/animations";
import { quickSpring } from "@constants/easings";

const AnimatedButton = Animated.createAnimatedComponent(Button);
const AnimatedSeparator = Animated.createAnimatedComponent(Separator);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function AuthActions({ navigation }): React.JSX.Element {
	const insets = useInsets();
	const { theme } = useUnistyles();
	const progress = useSharedValue(0);

	const iOS = Platform.OS === "ios";
	const currentRoute = navigation.getState()?.index;

	const focusedIcon = iOS ? (
		<Icon size={28} icon='apple.logo' color={theme.colors.background} />
	) : (
		<Image style={styles.imageIcon} source={require("@assets/logos/google.webp")} />
	);

	const animatedMailButtonStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(progress.value, [0, 1], [theme.colors.foreground, theme.colors.primary]),
		};
	});

	useEffect(() => {
		progress.value = withSpring(currentRoute === 0 ? 0 : 1, quickSpring);
	}, [currentRoute]);

	return (
		<Animated.View layout={layoutAnimationSpringy} style={styles.actionsContainer(insets.bottom)}>
			{currentRoute === 0 && (
				<>
					<AnimatedButton
						style={styles.button(true)}
						labelStyle={styles.buttonLabel(true)}
						icon={focusedIcon}
						entering={getFadeIn(springyChar(0))}
						exiting={getFadeOut(springyChar(0))}
						label={iOS ? "Продолжить с Apple" : "Продолжить с Google"}
						size='xl'
						variant='textIcon'
					/>

					<AnimatedSeparator
						entering={getFadeIn(springyChar(1))}
						exiting={getFadeOut(springyChar(1))}
						label='ИЛИ'
						style={styles.separatorContainer}
					/>

					<AnimatedButton
						entering={getFadeIn(springyChar(2))}
						exiting={getFadeOut(springyChar(2))}
						icon={<Icon size={28} icon='apple.logo' />}
						label={!iOS ? "Продолжить с Apple" : "Продолжить с Google"}
						size='xl'
						variant='textIcon'
					/>
				</>
			)}

			<AnimatedButton
				style={animatedMailButtonStyle}
				layout={layoutAnimationSpringy}
				onPress={() => navigation.navigate(ROUTES.auth.signup.email)}
				icon={currentRoute === 0 && <AnimatedIcon entering={getFadeIn(springyChar(0))} exiting={getFadeOut(springyChar(0))} size={28} icon='at' />}
				label={currentRoute === 0 ? "Продолжить с Почтой" : "Продолжить"}
				size='xl'
				variant='textIcon'
			/>
		</Animated.View>
	);
}
