import { normalSpring } from '@constants/animations'
import type { Message } from '@interfaces'
import formatSentTime from '@lib/formatSentTime'
import { useEffect, useLayoutEffect } from 'react'
import { Text, View, type ViewStyle } from 'react-native'
import Animated, { interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { styles } from './Message.styles'

interface MessageBubbleProps {
  message: Message | null
  seen: boolean
  shouldAnimate: boolean // <--- Важный проп
  mountFinished: boolean
}

export default function MessageBubble({ message, shouldAnimate, mountFinished }: MessageBubbleProps) {
  const isMe: boolean = message?.isMe

  const progress = useSharedValue(shouldAnimate ? 0 : 1)

  const animatedStyle = useAnimatedStyle((): ViewStyle => {
    return {
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [isMe ? 100 : -100, 0]),
        },
        {
          scale: interpolate(progress.value, [0, 1], [0.5, 1]),
        },
      ],
    }
  })

  useLayoutEffect(() => {
    if (shouldAnimate) {
      progress.value = 0
      progress.value = withSpring(1, normalSpring)
    }
  }, [shouldAnimate])

  return (
    <Animated.View style={[styles.message(isMe, mountFinished), animatedStyle]}>
      <View style={styles.messageContent}>
        <Text style={[styles.text(isMe)]}>
          {message?.content}
          <Text>{'         '}</Text>
        </Text>
        <Animated.Text style={[styles.secondaryText(isMe)]}>{formatSentTime(message?.date)}</Animated.Text>
      </View>
    </Animated.View>
  )
}
