import React from "react";
import { Pressable } from "react-native";
import { styles } from "./Message.styles";
import Animated, { LayoutAnimationConfig } from "react-native-reanimated";
import type { Message } from "@interfaces";
import MessageBubble from "./MessageBubble";
import MessageStatus from "./MessageStatus";
import { getFadeIn } from "@constants/animations";

type MessageProps = {
  message: Message | null;
  seen?: boolean;
  isLast?: boolean;
  prevItem?: Message;
  nextItem?: Message;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Message({
  message,
  seen,
  isLast,
  prevItem,
  nextItem,
}: MessageProps): React.JSX.Element {
  const CHAT_TIME_WINDOW = 5 * 60 * 1000;

  const isGroupStart =
    !prevItem ||
    prevItem.author_id !== message.author_id ||
    new Date(message.date).getTime() - new Date(prevItem.date).getTime() > CHAT_TIME_WINDOW;

  const isGroupEnd =
    !nextItem ||
    nextItem.author_id !== message.author_id ||
    new Date(nextItem.date).getTime() - new Date(message.date).getTime() > CHAT_TIME_WINDOW;

  return (
    <AnimatedPressable entering={getFadeIn()} style={[styles.messageWrapper(message?.isMe)]}>
      <MessageBubble message={message} />
      <LayoutAnimationConfig skipEntering skipExiting>
        <MessageStatus message={message} isLast={isLast} seen={seen} />
      </LayoutAnimationConfig>
    </AnimatedPressable>
  );
}
