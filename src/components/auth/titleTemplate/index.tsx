import { Icon } from '@components/ui'
import type { ICONS } from '@constants/icons'
import { Text, View, type ViewStyle } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './TitleTemplate.styles'

interface TitleTemplateProps {
  icon: keyof typeof ICONS
  title: string
}

export default function AuthTitleTemplate({ icon, title }: TitleTemplateProps) {
  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation()
  const { theme } = useUnistyles()

  const animatedViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [{ scale: interpolate(keyboardProgress.value, [0, 1], [1, 0.5], 'clamp') }],
      transformOrigin: 'center bottom 0px',
    }),
  )
  return (
    <View style={styles.titleContainer}>
      <Animated.View style={animatedViewStyle}>
        <Icon icon={icon} color={theme.colors.primary} size={108} />
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
