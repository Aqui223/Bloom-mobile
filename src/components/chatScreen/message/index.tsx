import type { Message as MessageType } from '@interfaces'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import MessageBubble from './Bubble'
import { styles } from './Message.styles'
import StatusBubble from './StatusBubble'

interface MessageProps {
  message: MessageType | null
  seen: boolean
  marginBottom: number
  shouldAnimate: boolean
}

export default function Message({ message, seen, marginBottom, shouldAnimated }: MessageProps) {
  const [mountFinished, setMountFinished] = useState(false)

  const messageTime = new Date(message.date).getTime()

  // Анимируем ТОЛЬКО если сообщение новее, чем момент открытия чата
  const shouldAnimate = messageTime > shouldAnimated

  useEffect(() => {
    setMountFinished(shouldAnimate ? false : true)
  }, [message?.nonce])

  return (
    <Pressable style={[styles.messageWrapper(message?.isMe, marginBottom)]}>
      <StatusBubble setMountFinished={setMountFinished} isActive={shouldAnimate} />
      <MessageBubble message={message} mountFinished={mountFinished} shouldAnimate={shouldAnimate} seen={seen} />
    </Pressable>
  )
}
