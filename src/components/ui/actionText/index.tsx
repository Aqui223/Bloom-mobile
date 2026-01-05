import React from 'react'
import { type GestureResponderEvent, Text, type TextProps } from 'react-native'
import { styles } from './ActionText.styles'

type ActionTextProps = Omit<TextProps, 'children'> & {
  text: string
  actionText?: string
  onPress?: (event: GestureResponderEvent) => void
}

export default function ActionText({ text, actionText, onPress, style, ...props }: ActionTextProps) {
  if (!actionText) {
    return <Text style={styles.text}>{text}</Text>
  }

  const parts = text.split(actionText)

  return (
    <Text style={[styles.text, style]} {...props}>
      {parts[0]}
      <Text style={[styles.actionText, style]} onPress={onPress}>
        {' '}
        {actionText}{' '}
      </Text>
      {parts[1]}
    </Text>
  )
}
