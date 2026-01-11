import type { Message as MessageType } from '@interfaces'
import { Pressable } from 'react-native'
import { styles } from './Message.styles'
import MessageBubble from './MessageBubble'

interface MessageProps {
  message: MessageType | null
  seen: boolean
  paddingBottom: number
  groupEnd: boolean
}

export default function Message({ message, seen, paddingBottom, groupEnd }: MessageProps) {
  return (
    <Pressable style={[styles.messageWrapper(message?.isMe, paddingBottom)]}>
      <MessageBubble message={message} />
    </Pressable>
  )
}
