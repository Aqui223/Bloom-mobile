import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { styles } from "./Message.styles";
import Animated, { Easing, FadeIn, LayoutAnimationConfig, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import type { MessageInterface } from "@interfaces";
import MessageBubble from "./MessageBubble";
import MessageStatus from "./MessageStatus";
import { springy } from "@constants/animations";

type MessageProps = {
	message: MessageInterface | null;
	seen?: boolean;
	isLast?: boolean;
	shift?: number;
	messagesLenght?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Message({ message, seen, isLast, shift, messagesLenght }: MessageProps): React.JSX.Element {
	const scale = useSharedValue(1);

	const translate = useSharedValue(shift - 16);

	const isMe: boolean = message?.isMe;

	const onPress = (out: boolean = false) => {
		scale.value = withTiming(out ? 1 : 0.95, { easing: Easing.inOut(Easing.ease), duration: 300 });
	};

	const animatedPressabelStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: -translate.value,
			},
		],
	}));

	useEffect(() => {
		translate.value = 0;
		translate.value = withSpring(shift - 16, springy);
	}, [messagesLenght]);

	useEffect(() => {
		translate.value = withSpring(shift - 16, springy);
	}, [shift]);

	return (
		<AnimatedPressable
			entering={FadeIn}
			onPressIn={() => onPress()}
			onPressOut={() => onPress(true)}
			style={[styles.messageWrapper(isMe), animatedPressabelStyles]}
		>
			<MessageBubble message={message} />
			<LayoutAnimationConfig skipEntering skipExiting>
				<MessageStatus message={message} isLast={isLast} isMe={isMe} seen={seen} />
			</LayoutAnimationConfig>
		</AnimatedPressable>
	);
}
