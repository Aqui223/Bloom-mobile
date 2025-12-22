import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { styles } from "./Message.styles";
import Animated, { AnimatedRef, Easing, FadeIn, LayoutAnimationConfig, SharedValue, useAnimatedRef, useSharedValue, withTiming } from "react-native-reanimated";
import type { Message } from "@interfaces";
import MessageBubble from "./MessageBubble";
import MessageStatus from "./MessageStatus";

type MessageProps = {
	message: Message | null;
	seen?: boolean;
	isLast?: boolean;
	isGroupStart?: boolean,
	isGroupEnd?: boolean;
	messageRef?: AnimatedRef<Animated.View>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Message({ message, seen, isLast, isGroupStart, isGroupEnd, messageRef }: MessageProps): React.JSX.Element {

	return (
		<AnimatedPressable
			entering={FadeIn}
			ref={messageRef}
			style={styles.messageWrapper(message?.isMe)}
		>
			<MessageBubble message={message} />
			<LayoutAnimationConfig skipEntering skipExiting>
				<MessageStatus message={message} isLast={isLast} seen={seen} />
			</LayoutAnimationConfig>
		</AnimatedPressable>
	);
}
