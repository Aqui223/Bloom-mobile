import React from "react";
import { Pressable } from "react-native";
import { styles } from "./Message.styles";
import Animated, { Easing, FadeIn, LayoutAnimationConfig, useSharedValue, withTiming } from "react-native-reanimated";
import type { Message } from "@interfaces";
import MessageBubble from "./MessageBubble";
import MessageStatus from "./MessageStatus";

type MessageProps = {
	message: Message | null;
	seen?: boolean;
	isLast?: boolean;
	shift?: number;
	messagesLenght?: number;
	isGroupStart?: boolean,
	isGroupEnd?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Message({ message, seen, isLast, isGroupStart, isGroupEnd }: MessageProps): React.JSX.Element {

	return (
		<AnimatedPressable
			entering={FadeIn}
			style={styles.messageWrapper(message?.isMe)}
		>
			<MessageBubble message={message} />
			<LayoutAnimationConfig skipEntering skipExiting>
				<MessageStatus message={message} isLast={isLast} seen={seen} />
			</LayoutAnimationConfig>
		</AnimatedPressable>
	);
}
