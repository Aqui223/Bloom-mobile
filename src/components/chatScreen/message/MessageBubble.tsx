import React from 'react'
import { useUnistyles } from 'react-native-unistyles'
import type { Message } from '@interfaces'
import { ViewStyle, Text, View } from 'react-native'
import Animated, { AnimatedStyle } from 'react-native-reanimated'
import { styles } from './Message.styles'
import ReplyBlock from '../replyBlock'
import formatSentTime from '@lib/formatSentTime'

type MessageBubbleProps = {
  message: Message | null
  style?: AnimatedStyle<ViewStyle>
}

export default function MessageBubble({ message, style }: MessageBubbleProps): React.JSX.Element {
  const { theme } = useUnistyles()

  const isMe: boolean = message?.isMe

  return (
    <Animated.View style={[styles.message(isMe), style]}>
      <ReplyBlock isMe={isMe} message={message.reply_to} />

      <View style={styles.messageContent}>
        <Text style={styles.text(isMe)}>
          {message?.content}
          <Text>{'         '}</Text>
        </Text>
        <Text style={styles.secondaryText(isMe)}>{formatSentTime(message?.date)}</Text>
      </View>
    </Animated.View>
  )
}
