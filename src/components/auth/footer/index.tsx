import { Button, Icon } from '@components/ui'
import { getFadeIn, getFadeOut, layoutAnimationSpringy } from '@constants/animations'
import { useAuthFooter, useInsets } from '@hooks'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './Footer.styles'

const AnimatedButton = Animated.createAnimatedComponent(Button)

export default function AuthFooter() {
  const insets = useInsets()
  const { theme } = useUnistyles()
  const { index, label, isDisabled, progress, handlePress } = useAuthFooter()
  const { progress: keyboardProgress, height: keyboardHeight } = useReanimatedKeyboardAnimation()

  const animatedButtonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1, 2, 3],
      [theme.colors.foregroundTransparent, theme.colors.foregroundTransparent, theme.colors.primary, theme.colors.red],
    ),
  }))

  const animatedViewStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: keyboardHeight.value }],
    paddingBottom: keyboardProgress.get() >= 0.1 ? theme.spacing.lg : insets.bottom,
    paddingHorizontal: keyboardProgress.get() >= 0.1 ? theme.spacing.lg : theme.spacing.xxxl,
  }))

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1, 2, 3],
      [theme.colors.text, theme.colors.secondaryText, theme.colors.white, theme.colors.white],
    ),
  }))

  return (
    <Animated.View style={[styles.footer, animatedViewStyle]}>
      <AnimatedButton
        disabled={isDisabled}
        onPress={handlePress}
        size="xl"
        variant="textIcon"
        style={animatedButtonStyle}
        icon={
          index === 0 && (
            <Animated.View entering={getFadeIn()} exiting={getFadeOut()}>
              <Icon key="at-icon" size={26} color={theme.colors.text} icon="at" />
            </Animated.View>
          )
        }
      >
        <Animated.View layout={layoutAnimationSpringy} style={styles.partsContainer}>
          {label.split(' ').map((part) => (
            <Animated.Text
              key={part}
              entering={getFadeIn()}
              exiting={getFadeOut()}
              layout={layoutAnimationSpringy}
              style={[styles.buttonLabel, animatedLabelStyle]}
            >
              {part}{' '}
            </Animated.Text>
          ))}
        </Animated.View>
      </AnimatedButton>
    </Animated.View>
  )
}
