import type { Message as MessageType } from '@interfaces'
import { Pressable } from 'react-native'
import Animated, { LayoutAnimationConfig } from 'react-native-reanimated'
import { styles } from './Message.styles'
import MessageBubble from './MessageBubble'
import MessageStatus from './MessageStatus'

interface MessageProps {
  message: MessageType | null
  seen: boolean
  paddingBottom: number
  groupEnd: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Message({ message, seen, paddingBottom, groupEnd }: MessageProps) {
  return (
    <AnimatedPressable style={[styles.messageWrapper(message?.isMe, paddingBottom)]}>
      <MessageBubble message={message} />

      <LayoutAnimationConfig skipEntering skipExiting>
        {groupEnd && <MessageStatus message={message} seen={seen} />}
      </LayoutAnimationConfig>
    </AnimatedPressable>
  )
}
