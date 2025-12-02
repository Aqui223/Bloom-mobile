import React from "react";
import { styles } from "./Password.styles";
import AuthTitleTemplate from "@components/auth/titleTemplate";
import AuthEmailInput from "@components/auth/email/Input";
import { ActionText } from "@components/ui";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useInsets } from "@hooks";

export default function SignupPassword(): React.JSX.Element {
	const keyboard = useReanimatedKeyboardAnimation();
	const insets = useInsets();

	const animatedStyles = useAnimatedStyle(() => {
	  return { transform: [{ translateY: ( keyboard.height.value + insets.top) / 2 }] };
	});

	return (
		<Animated.View style={[styles.container(52 + insets.bottom), animatedStyles]}>
			<AuthTitleTemplate icon="lock" title='Пароль и ник' />
            <AuthEmailInput/>
            <ActionText actionText="синхранизации ключей" children="Пароль должен состоять из 8-64 любых символов. Он используется для"/>
		</Animated.View>
	);
}


