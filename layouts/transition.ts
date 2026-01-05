import { quickSpring } from '@constants/easings'
import { interpolate } from 'react-native-reanimated'
import type { BlankStackNavigationOptions } from 'react-native-screen-transitions/blank-stack'
import { useUnistyles } from 'react-native-unistyles'

export const screenTransition = (gestures: boolean = true): BlankStackNavigationOptions => {
  const { theme } = useUnistyles()

  return {
    experimental_enableHighRefreshRate: true,
    gestureEnabled: gestures,
    gestureDirection: ['horizontal'],
    screenStyleInterpolator: ({ layouts: { screen }, progress }) => {
      'worklet'

      const translateX = interpolate(progress, [0, 1, 2], [screen.width / 2, 0, -screen.width / 2], 'clamp')
      const opacity = interpolate(progress, [0, 1, 2], [0, 1, 0], 'clamp')

      return {
        contentStyle: {
          transform: [{ translateX }],
          overflow: 'hidden',
          opacity: opacity,
        },
        overlayStyle: {
          opacity: opacity,
          backgroundColor: theme.colors.background,
        },
      }
    },
    transitionSpec: {
      open: quickSpring,
      close: quickSpring,
    },
  }
}
